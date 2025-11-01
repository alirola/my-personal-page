import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';
import { MongoClient } from 'mongodb';

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors({
	origin: 'http://localhost:5173',
	method: ['GET', 'POST', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Origin', 'Accept', 'Authorization', 'X-Admin-Token'],
	credentials: true
}));

const ADMIN_CODE = process.env.ADMIN_CODE || 'abrir';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '1a2b3c4d';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mpp_user:mpp_password@localhost:27017/mpp_db?authSource=admin';

let db;
const client = new MongoClient(MONGODB_URI);

try {
	await client.connect();
	db = client.db('mpp_db');
	console.log('✅ Conectado a MongoDB');
	await db.collection('downloads').createIndex({ timestamp: -1 });
	await db.collection('downloads').createIndex({ country: 1 });
  	await db.collection('downloads').createIndex({ ip: 1 });
}catch(err){
	console.error('❌ Error conectando a MongoDB');
	process.exit(1);
}

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Origin, Accept, Authorization, X-Admin-Token')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

app.post('/api/auth' ,express.json(), (req, res) => {
	const { code } = req.body || {}
	if (code && code === ADMIN_CODE) {
		return res.json({ token: ADMIN_TOKEN})
	}
	return res.status(401).json({ error: 'invalid_code' })
})

function requireAdmin(req, res, next) {
	const auth = req.headers.authorization || ''
	const bearer = auth && auth.toLowerCase().startsWith('bearer ') ? auth.split(' ')[1] : null
	const headerToken = req.headers['x-admin-token']
	const token = bearer || headerToken
	if (!token || token !== ADMIN_TOKEN) {
		return res.status(401).json({ error: 'unauthorized' })
	}
	next()
}

app.post('/api/track-download', express.text({ type: '*/*' }), async (req, res) => {
  try {
    // extraer IP real (X-Forwarded-For si existe)
    const xf = (req.headers['x-forwarded-for'] || '').toString();
    const ip = xf ? xf.split(',')[0].trim() : (req.socket.remoteAddress || req.ip);

    // intentar parsear body (si es JSON)
    let body = {};
    try {
      body = req.body ? JSON.parse(req.body) : {};
    } catch (err) {
      // no JSON, ignore
    }

    // buscar geolocalización simple por IP (ip-api.com, sin API key)
    let geo = { country: null, region: null, city: null };
    try {
      const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city,query`);
      const geoJson = await geoRes.json();
      if (geoJson && geoJson.status === 'success') {
        geo = { country: geoJson.country, region: geoJson.regionName, city: geoJson.city };
      }
    } catch (err) {
      // ignore geo lookup failures
    }

	const normalizeIp = (s='') => s.replace('::ffff:', '')
    const isPrivateIp = (addr='') => {
      const a = normalizeIp(addr)
      return a === '::1' || a.startsWith('127.') || a.startsWith('10.') || a.startsWith('192.168.') || /^172\.(1[6-9]|2\d|3[0-1])\./.test(a)
    }
    if (!geo.country) {
      if (isPrivateIp(ip)) {
        geo.country = 'local'
        geo.region = null
        geo.city = null
      }
    }

    const document = {
		event: body.event || 'download_cv',
		timestamp: new Date(),
		ip,
		country: geo.country,
		region: geo.region,
		city: geo.city,
		userAgent: req.headers['user-agent'] || null,
		referrer: req.headers.referrer || body.referrer || null,
		extra: body
	};

	await db.collection('downloads').insertOne(document);
	console.log(`📥 Descarga registrada: ${ip} (${geo.country || 'unknown'})`);

    res.status(204).end();
  } catch (err) {
    console.error('Error track-download:', err);
    res.status(500).json({ error: 'internal_error' });
  }
});

app.get('/api/downloads', requireAdmin, async (req, res) => {
  try {
    const records = await db.collection('downloads')
      .find({})
      .sort({ timestamp: -1 })
      .limit(1000)
      .toArray();
    const formattedRecords = records.map(record => ({
      event: record.event,
      timestamp: record.timestamp.toISOString(),
      ip: record.ip,
      country: record.country,
      region: record.region,
      city: record.city,
      userAgent: record.userAgent,
      referrer: record.referrer,
      extra: record.extra
    }));

    res.json({ total: formattedRecords.length, records: formattedRecords });
  } catch (err) {
    console.error('Error /api/downloads:', err);
    res.status(500).json({ error: 'internal_error' });
  }
});

app.get('/api/downloads/stats', requireAdmin, async (req, res) => {
  try {
    const total = await db.collection('downloads').countDocuments();

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const dateStats = await db.collection('downloads').aggregate([
      { $match: { timestamp: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]).toArray();

    const byDate = {};
    dateStats.forEach(item => {
      byDate[item._id] = item.count;
    });

    const countryStats = await db.collection('downloads').aggregate([
      { $match: { country: { $ne: null } } },
      {
        $group: {
          _id: "$country",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]).toArray();

    const byCountry = {};
    countryStats.forEach(item => {
      byCountry[item._id] = item.count;
    });

    res.json({ total, byDate, byCountry });
  } catch (err) {
    console.error('Error /api/downloads/stats:', err);
    res.status(500).json({ error: 'internal_error' });
  }
});

app.get('/', (req, res) => {
  res.send('API funcionando');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend en puerto ${PORT}`);
});

process.on('SIGINT', async () => {
	console.log('Cerrando conexión MongoDB...');
	await client.close();
	process.exit(0);
});
