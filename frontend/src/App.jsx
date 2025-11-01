import { useEffect, useState } from 'react'
import '../css/App.css'


function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      
      setScrollProgress(progress)
      setIsHeaderScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDownloadCV = (e) => {
    const href = '/curriculum/CVFinal.pdf'
    const backendTrackUrl = window.location.hostname === 'localhost'
    ? `${window.location.protocol}//${window.location.hostname}:8080/api/track-download`
    : 'https://comunidad-vecinos-production.up.railway.app/api/track-download'

    // preparar payload mínimo
    const payload = {
      event: 'download_cv',
      path: href,
      timestamp: Date.now()
    }

    // intentar enviar evento a GA4
    if (window.gtag) {
      window.gtag('event', 'download_cv', {
        event_category: 'engagement',
        event_label: 'cv_download',
        value: 1,
        transport_type: 'beacon'
      })
    }

    // siempre intentar enviar un beacon a nuestro backend (respaldo)
    try {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' })
      navigator.sendBeacon(backendTrackUrl, blob)
    } catch (err) {
      // si sendBeacon no funciona, intentar fetch asíncrono (no bloquear)
      fetch(backendTrackUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'omit'
      }).catch(() => {})
    }

    // controlar la descarga / redirección
    e.preventDefault()
    // esperar breve para aumentar probabilidad de entrega de beacon/gtag
    setTimeout(() => {
      // abrimos en nueva pestaña si target _blank, o forzamos descarga
      const a = document.createElement('a')
      a.href = href
      a.setAttribute('download', '')
      a.rel = 'noopener noreferrer'
      document.body.appendChild(a)
      a.click()
      a.remove()
    }, 200)
  }

  return (
    <div className="app">
      {/* Scroll Progress Indicator */}
      <div 
        className="scroll-indicator" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Particles */}
      <div className="particles">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${Math.random() * 10 + 15}s`
            }}
          />
        ))}
      </div>

      {/* Header/Navigation */}
      <header className={`header ${isHeaderScrolled ? 'scrolled' : ''}`}>
        <nav className="nav">
          <div className="nav-brand">
            <h2>AnoraK Dev</h2>
          </div>
          <ul className="nav-links">
            <li><a href="#about">Sobre mí</a></li>
            <li><a href="#skills">Habilidades</a></li>
            <li><a href="#projects">Proyectos</a></li>
            <li><a href="#contact">Contacto</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Hola, soy Alex Lirola <span className="highlight">Desarrollador Full Stack</span></h1>
          <p className="hero-description">
            apasionado por crear aplicaciones web eficientes, seguras y con un buen diseño.
            Trabajo con React, Node.js y Express, y actualmente estoy aprendiendo nuevas tecnologías para seguir creciendo como desarrollador.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">Ver mis proyectos</a>
            <a href="#contact" className="btn btn-secondary">Hablemos</a>
            <a
                href="/curriculum/CVFinal.pdf"
                target='_blank'
                className="btn btn-secondary"
                onClick={handleDownloadCV}
                download
            >
                Descarga mi currículum
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2>Sobre mí</h2>
          <div className="about-content">
            <div className="about-text animate-fade-left">
              <p>
                Soy un desarrollador full-stack apasionado por crear soluciones digitales que marquen la diferencia.
                Con más de 3 años de experiencia, me especializo en el desarrollo de aplicaciones web modernas,
                APIs robustas y experiencias de usuario excepcionales.
              </p>
              <p>
                Mi enfoque se centra en escribir código limpio, escalable y mantenible, siempre siguiendo las
                mejores prácticas de la industria. Disfruto trabajando en equipo y enfrentando nuevos desafíos
                que me permitan seguir creciendo profesionalmente.
              </p>
              <p>
                Cuando no estoy programando, me encontrarás resolviendo máquinas en HackTheBox y practicando técnicas de pentesting en mi laboratorio local.
              </p>
            </div>
            <div className="about-stats animate-fade-right">
              <div className="stat-item">
                <span className="stat-number">20+</span>
                <span className="stat-label">Proyectos Completados</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1,5+</span>
                <span className="stat-label">Años de Experiencia</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">20+</span>
                <span className="stat-label">Tecnologías Dominadas entre Desarrollo y Pentesting</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10+</span>
                <span className="stat-label">Laboratorios de Pentesting</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <h2>Habilidades Técnicas</h2>
          <div className="skills-grid">
            <div className="skill-category animate-fade-up">
              <h3>🎨 Frontend</h3>
              <div className="skill-tags">
                <span className="skill-tag">
                    <img src="/images/icons/react.svg" alt="React" className="w-5 h-5"
                    style={{ width: '20px', height: '20px' }}/>
                    React
                </span>
                <span className="skill-tag">
                    <img src="/images/icons/javascript.svg" alt="Javascript" className="w-5 h-5"
                    style={{ width: '20px', height: '20px' }}/>
                    Javascript
                </span>
                <span className="skill-tag">
                    <img src="/images/icons/typescript.svg" alt="Typescript" className="w-5 h-5"
                    style={{ width: '20px', height: '20px' }}/>
                    Typescript
                </span>
                <span className="skill-tag">
                    <img src="/images/icons/html.svg" alt="HTML" className="w-5 h-5"
                    style={{ width: '20px', height: '20px' }}/>
                    HTML5
                </span>
                <span className="skill-tag">
                    <img src="/images/icons/css.svg" alt="CSS" className="w-5 h-5"
                    style={{ width: '20px', height: '20px' }}/>
                    CSS3
                </span>
                <span className="skill-tag">
                    <img src="/images/icons/tailwind.svg" alt="Tailwind" className="w-5 h-5"
                    style={{ width: '20px', height: '20px' }}/>
                    Tailwind CSS
                </span>
                <span className="skill-tag">
                    <img src="vite.svg" alt="Vite" className="w-5 h-5"
                    style={{ width: '20px', height: '20px' }}/>
                    Vite
                </span>
              </div>
            </div>
            <div className="skill-category animate-fade-up" style={{animationDelay: '0.2s'}}>
              <h3>⚙️ Backend</h3>
              <div className="skill-tags">
                <span className="skill-tag">
                    <img src="/images/icons/node.svg" alt="Node" className="w-5 h-5"
                    style={{ width: '20px', height: '20px' }}/>
                    Node.js
                </span>
                <span className="skill-tag">
                    <img src="/images/icons/express.png" alt="Express" className="w-5 h-5"
                    style={{ width: '20px', height: '20px' }}/>
                    Express
                </span>
                <span className="skill-tag">
                    <img src="/images/icons/fastify.svg" alt="Fastify" className="w-5 h-5"
                    style={{ width: '20px', height: '20px' }}/>
                    Fastify
                </span>
                <span className="skill-tag">
                    <img src="/images/icons/django.svg" alt="Django" className="w-5 h-5"
                    style={{ width: '20px', height: '20px' }}/>
                    Django
                </span>
                <span className="skill-tag">
                    <img src="/images/icons/mongodb.svg" alt="Mongodb" className="w-5 h-5"
                    style={{ width: '30px', height: '30px' }}/>
                    MongoDB
                </span>
                <span className="skill-tag">
                    <img src="/images/icons/postgres.svg" alt="Postgres" className="w-5 h-5"
                    style={{ width: '30px', height: '30px' }}/>
                    PostgreSQL
                </span>
                <span className="skill-tag">
                    <img src="/images/icons/rest_api.svg" alt="RESTAPIS" className="w-5 h-5"
                    style={{ width: '20px', height: '20px' }}/>
                    REST APIs
                </span>
                <span className="skill-tag">
                    <img src="/images/icons/jwt.svg" alt="JWT" className="w-5 h-5"
                    style={{ width: '20px', height: '20px' }}/>
                    JWT
                </span>
              </div>
            </div>
            <div className="skill-category animate-fade-up" style={{animationDelay: '0.4s'}}>
              <h3>☁️ DevOps & Tools</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">
                        <img src="/images/icons/docker.svg" alt="Docker" className="w-5 h-5"
                        style={{ width: '20px', height: '20px' }}/>
                        Docker
                    </span>
                    <span className="skill-tag">
                        <img src="/images/icons/git.svg" alt="Git" className="w-5 h-5"
                        style={{ width: '20px', height: '20px' }}/>
                        Git
                    </span>
                    <span className="skill-tag">
                        <img src="/images/icons/linux.svg" alt="Linux" className="w-5 h-5"
                        style={{ width: '20px', height: '20px' }}/>
                        Linux
                    </span>
                    <span className="skill-tag">
                        <img src="/images/icons/nginx.svg" alt="Nginx" className="w-5 h-5"
                        style={{ width: '20px', height: '20px' }}/>
                        Nginx
                    </span>
                    <span className="skill-tag">
                        <img src="/images/icons/vscode.svg" alt="VSCode" className="w-5 h-5"
                        style={{ width: '20px', height: '20px' }}/>
                        VS Code
                    </span>
                    <span className="skill-tag">
                        <img src="/images/icons/postman.svg" alt="Postman" className="w-5 h-5"
                        style={{ width: '20px', height: '20px' }}/>
                        Postman
                    </span>
                    <span className="skill-tag">
                        <img src="/images/icons/railway.svg" alt="Railway" className="w-5 h-5"
                        style={{ width: '30px', height: '30px' }}/>
                        Railway
                    </span>
                    <span className="skill-tag">
                        <img src="/images/icons/vercel.svg" alt="Vercel" className="w-5 h-5"
                        style={{ width: '20px', height: '20px' }}/>
                        Vercel
                    </span>
                </div>
            </div>
            <div className="skill-category animate-fade-up" style={{animationDelay: '0.4s'}}>
              <h3>🛡️ Ciberseguridad</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">
                        <img src="/images/icons/nmap.svg" alt="Nmap" className="w-5 h-5"
                        style={{ width: '20px', height: '20px' }}/>
                        Nmap
                    </span>
                    <span className="skill-tag">
                        <img src="/images/icons/burpsuite.svg" alt="Burpsuite" className="w-5 h-5"
                        style={{ width: '20px', height: '20px' }}/>
                        Burpsuite
                    </span>
                    <span className="skill-tag">
                        <img src="/images/icons/wireshark.png" alt="Wireshark" className="w-5 h-5"
                        style={{ width: '20px', height: '20px' }}/>
                        Wireshark
                    </span>
                    <span className="skill-tag">
                        <img src="/images/icons/osint.png" alt="Osint" className="w-5 h-5"
                        style={{ width: '20px', height: '20px' }}/>
                        OSINT Tools
                    </span>
                    <span className="skill-tag">
                        <img src="/images/icons/owasp.svg" alt="Owasp" className="w-5 h-5"
                        style={{ width: '20px', height: '20px' }}/>
                        OWASP TOP 10
                    </span>
                </div>
            </div>
            <div className="skill-category animate-fade-up" style={{animationDelay: '0.4s'}}>
              <h3>🧑🏼‍💻 Lenguajes</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">
                        <img src="/images/icons/c.png" alt="C" className="w-5 h-5"
                        style={{ width: '20px', height: '20px' }}/>
                        C
                    </span>
                    <span className="skill-tag">
                        <img src="/images/icons/c++.svg" alt="C++" className="w-5 h-5"
                        style={{ width: '20px', height: '20px' }}/>
                        C++
                    </span>
                    <span className="skill-tag">
                        <img src="/images/icons/python.svg" alt="Wireshark" className="w-5 h-5"
                        style={{ width: '20px', height: '20px' }}/>
                        Python
                    </span>
                    <span className="skill-tag">
                        <img src="/images/icons/javascript.svg" alt="Javascript" className="w-5 h-5"
                        style={{ width: '20px', height: '20px' }}/>
                        Javascript
                    </span>
                    <span className="skill-tag">
                        <img src="/images/icons/typescript.svg" alt="Typescript" className="w-5 h-5"
                        style={{ width: '20px', height: '20px' }}/>
                        Typescript
                    </span>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2>Mis Proyectos</h2>
            <div className="projects-grid">
                <div className="project-card animate-fade-up">
                    <h3>👨‍💻Minishell</h3>
                    <p>
                        Un shell de Unix/Linux completamente funcional implementado 
                        desde cero en C. Soporta ejecución de comandos, pipes, 
                        redirecciones, variables de entorno y más.
                        Proyecto hecho en conjunto con compañeros del campus.
                    </p>
                    <div className="project-tech">
                        <span className="tech-tag">
                            <img src="/images/icons/c.png" alt="C" 
                            className="w-5 h-5"
                            style={{ width: '20px', height: '20px' }}/>
                            C
                        </span>
                    </div>
                    <div className="project-links">
                        <a href="https://github.com/alirola/minishell" className="btn btn-small" target='_blank'>Ver código</a>
                    </div>
                </div>
                
                <div className="project-card animate-fade-up">
                    <h3>🏢Página de gestión de comunidad de vecinos</h3>
                    <p>
                        Plataforma de gestión comunitaria con funciones como tablón de anuncios,
                         indidencias, reservas para la pista de padel, función de aplicación móvil, etc.
                    </p>
                    <div className="project-tech">
                        <span className="tech-tag">
                            <img src="/images/icons/react.svg" alt="React" 
                            className="w-5 h-5"
                            style={{ width: '20px', height: '20px' }}/>
                            React
                        </span>
                        <span className="tech-tag">
                            <img src="/images/icons/node.svg" alt="Node" 
                            className="w-5 h-5"
                            style={{ width: '20px', height: '20px' }}/>
                            Node.js
                        </span>
                        <span className="tech-tag">
                            <img src="vite.svg" alt="Vite" 
                            className="w-5 h-5"
                            style={{ width: '20px', height: '20px' }}/>
                            Vite
                        </span>
                        <span className="tech-tag">
                            <img src="/images/icons/postgres.svg" alt="Postgres" 
                            className="w-5 h-5"
                            style={{ width: '20px', height: '20px' }}/>
                            Postgresql
                        </span>
                        <span className="tech-tag">
                            <img src="/images/icons/express.png" alt="Express" 
                            className="w-5 h-5"
                            style={{ width: '20px', height: '20px' }}/>
                            Express
                        </span>
                        <span className="tech-tag">
                            <img src="/images/icons/jwt.svg" alt="JWT" 
                            className="w-5 h-5"
                            style={{ width: '20px', height: '20px' }}/>
                            JWT
                        </span>
                        <span className="tech-tag">
                            <img src="/images/icons/vercel.svg" alt="vercel" 
                            className="w-5 h-5"
                            style={{ width: '20px', height: '20px' }}/>
                            Vercel
                        </span>
                        <span className="tech-tag">
                            <img src="/images/icons/railway.svg" alt="railway" 
                            className="w-5 h-5"
                            style={{ width: '20px', height: '20px' }}/>
                            Railway
                        </span>
                    </div>
                    <div className="project-links">
                        <a href="https://demo-comunidad.vercel.app/" className="btn btn-small" target='_blank'>Demo</a>
                        <span>usuario: demo@demo.com contraseña: 1234</span>
                    </div>
                </div>

                <div className="project-card animate-fade-up">
                    <h3>Esta misma página web</h3>
                    <p>
                        Página web creada con la intencion de presentarme como programador y adentrarme al mundo laboral enseñando mis skills.
                    </p>
                    <div className="project-tech">
                        <span className="tech-tag">
                            <img src="/images/icons/react.svg" alt="React" 
                            className="w-5 h-5"
                            style={{ width: '20px', height: '20px' }}/>
                            React
                        </span>
                        <span className="tech-tag">
                            <img src="vite.svg" alt="Vite" 
                            className="w-5 h-5"
                            style={{ width: '20px', height: '20px' }}/>
                            Vite
                        </span>
                        <span className="tech-tag">
                            <img src="/images/icons/vercel.svg" alt="vercel" 
                            className="w-5 h-5"
                            style={{ width: '20px', height: '20px' }}/>
                            Vercel
                        </span>
                    </div>
                    <div className="project-links">
                        <a href="https://github.com/alirola/my-personal-page" className="btn btn-small" target='_blank'>Ver código</a>
                    </div>
                </div>
              </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>¡Hablemos!</h2>
          <div className="contact-content">
            <p>
              ¿Tienes un proyecto en mente? ¿Quieres colaborar o simplemente charlar sobre tecnología?
              Me encantaría conocer tus ideas y ver cómo puedo ayudarte a hacerlas realidad.
            </p>
            
            <div className="contact-links">
              <a href="mailto:allife2004.AL@gmail.com" className="contact-link" target="_blank">
                <span>
                    <img 
                        src="/images/gmail.png" 
                        alt="Email" 
                        style={{ width: '30px', height: '30px' }}
                        />
                </span>
                <span>Email</span>
              </a>
              <a href="https://linkedin.com/in/alexlirola" className="contact-link" target="_blank">
                <span>
                    <img 
                        src="/images/linkedin.png" 
                        alt="Linkedin" 
                        style={{ width: '30px', height: '30px' }}
                        />
                </span>
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/alirola" className="contact-link" target="_blank">
                <span>
                    <span>
                    <img 
                        src="/images/github.png" 
                        alt="github" 
                        style={{ width: '30px', height: '30px' }}
                        />
                </span>
                </span>
                <span>GitHub</span>
              </a>
              <a href="https://x.com/anorak1854" className="contact-link" target="_blank">
                <span>
                    <img 
                        src="/images/gorjeo.png" 
                        alt="X" 
                        style={{ width: '30px', height: '30px' }}
                        />
                </span>
                <span>X</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 AnoraK Dev. Diseñado y desarrollado con ❤️</p>
        </div>
      </footer>
    </div>
  )
}


// --- INICIO: panel secreto (añadido) ---

const secretPath = '/secretstatepanel'
const backendBase = window.location.hostname === 'localhost' 
  ? `${window.location.protocol}//${window.location.hostname}:8080`
  : 'https://comunidad-vecinos-production.up.railway.app'

function AdminLogin({ onSuccess }) {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const submit = async () => {
    setError(null)
    setLoading(true)
    try {
      const res = await fetch(`${backendBase}/api/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
        credentials: 'omit'
      })
      if (!res.ok) throw new Error('Código inválido')
      const data = await res.json()
      if (!data.token) throw new Error('No token recibido')
      localStorage.setItem('admin_token', data.token)
      onSuccess(data.token)
    } catch (err) {
      console.error(err)
      setError('Código incorrecto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ width: 420, maxWidth: '95%', padding: 24, background: '#0f0f0f', borderRadius: 8 }}>
      <h2 style={{ color: '#fff', marginBottom: 12 }}>Panel privado</h2>
      <p style={{ color: '#ccc', marginBottom: 12 }}>Introduce el código secreto para acceder a las estadísticas.</p>
      {error && <div style={{ color: 'salmon', marginBottom: 8 }}>{error}</div>}
      <input
        type="password"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Código secreto"
        style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #333', marginBottom: 12, background: '#111', color: '#fff' }}
      />
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn btn-primary" onClick={submit} disabled={loading}>{loading ? 'Entrando…' : 'Entrar'}</button>
        <button className="btn btn-secondary" onClick={() => { setCode(''); setError(null) }}>Limpiar</button>
      </div>
    </div>
  )
}

function SimpleBarChart({ items = {} }) {
  const entries = Object.entries(items).sort((a,b) => a[0].localeCompare(b[0]))
  if (!entries.length) return <div style={{ color:'#888' }}>No hay datos</div>
  const max = Math.max(...entries.map(([,v]) => v), 1)
  return (
    <div style={{ display:'flex', gap:8, alignItems:'end', height:120, overflowX:'auto', paddingTop:6 }}>
      {entries.map(([k,v]) => (
        <div key={k} style={{ width: 64, textAlign:'center' }}>
          <div title={`${k}: ${v}`} style={{
            height: `${(v / max) * 100}%`,
            background: 'linear-gradient(180deg,#646cff,#535bf2)',
            borderRadius:6,
            marginBottom:6
          }} />
          <div style={{ fontSize:11, color:'#ddd', wordBreak:'break-word' }}>{k}</div>
        </div>
      ))}
    </div>
  )
}

const fmtDate = (iso) => {
  try { return new Date(iso).toLocaleString() } catch { return iso }
}
const truncate = (s, n = 60) => s ? (s.length > n ? s.slice(0, n-1) + '…' : s) : '-'

function SecretPanel() {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || '')
  const [stats, setStats] = useState(null)
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token) return
    fetchStats(token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const fetchStats = async (tkn) => {
    setError(null)
    setLoading(true)
    try {
      const headers = { Authorization: `Bearer ${tkn}` }
      const [sRes, rRes] = await Promise.all([
        fetch(`${backendBase}/api/downloads/stats`, { headers, credentials: 'omit' }),
        fetch(`${backendBase}/api/downloads`, { headers, credentials: 'omit' })
      ])
      if (!sRes.ok || !rRes.ok) throw new Error('No autorizado o error servidor')
      const s = await sRes.json()
      const r = await rRes.json()
      setStats(s)
      setRecent(r.records ? r.records.slice(-50).reverse() : [])
    } catch (err) {
      console.error(err)
      setError('Error al cargar estadísticas (token inválido o servidor).')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    setToken('')
    setStats(null)
    setRecent([])
  }

  if (!token) {
    return <AdminLogin onSuccess={(t) => setToken(t)} />
  }

  return (
    <div style={{ padding: 20, maxWidth: 1100, width: '95%', color: '#ddd' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2>Estadísticas privadas</h2>
        <div>
          <button className="btn btn-secondary" onClick={() => fetchStats(token)} style={{ marginRight: 8 }}>Refrescar</button>
          <button className="btn btn-secondary" onClick={logout}>Cerrar sesión</button>
        </div>
      </div>

      {loading && <div>Cargando…</div>}
      {error && <div style={{ color: 'salmon' }}>{error}</div>}

      {stats && (
        <>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 18 }}>
            <div style={{ padding: 16, background: 'rgba(26,26,26,0.8)', borderRadius: 12 }}>
              <strong>Total descargas</strong>
              <div style={{ fontSize: 28, color: '#646cff' }}>{stats.total}</div>
            </div>
            <div style={{ flex: 1, minWidth: 320, padding: 16, background: 'rgba(26,26,26,0.8)', borderRadius: 12 }}>
              <strong>Por fecha</strong>
              <SimpleBarChart items={stats.byDate} />
            </div>
            <div style={{ flex: 1, minWidth: 260, padding: 16, background: 'rgba(26,26,26,0.8)', borderRadius: 12 }}>
              <strong>Por país</strong>
              <SimpleBarChart items={stats.byCountry} />
            </div>
          </div>

          <h4>Últimas descargas</h4>
          <div style={{ maxHeight: 300, overflow: 'auto', background: 'rgba(20,20,20,0.8)', padding: 8, borderRadius: 8 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#ddd' }}>
              <thead>
                <tr style={{ textAlign: 'left', color: '#ccc', fontSize: 13 }}>
                  <th style={{ padding: 6 }}>Fecha</th>
                  <th style={{ padding: 6 }}>IP</th>
                  <th style={{ padding: 6 }}>País</th>
				  <th style={{ padding: 6 }}>Región</th>
				  <th style={{ padding: 6 }}>Ciudad</th>
                  <th style={{ padding: 6 }}>Referrer</th>
				  <th style={{ padding: 6 }}>UA</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r, i) => (
                  <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: 6, fontSize: 13 }}>{fmtDate(r.timestamp)}</td>
                    <td style={{ padding: 6, fontSize: 13 }}>{r.ip}</td>
                    <td style={{ padding: 6, fontSize: 13 }}>{r.country || 'unknown'}</td>
+                   <td style={{ padding: 6, fontSize: 13 }}>{r.region || '-'}</td>
+                   <td style={{ padding: 6, fontSize: 13 }}>{r.city || '-'}</td>
+                   <td style={{ padding: 6, fontSize: 13 }}>{truncate(r.referrer, 80)}</td>
+                   <td style={{ padding: 6, fontSize: 13 }}>{truncate(r.userAgent, 80)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

// --- FIN: panel secreto (añadido) ---

export default function AppWrapper() {
  if (window.location.pathname === secretPath) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#070707' }}>
        <SecretPanel />
      </div>
    )
  }
  return <App />
}