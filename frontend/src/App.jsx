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

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí puedes manejar el envío del formulario
    alert('¡Mensaje enviado! Te contactaré pronto.')
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
            <h2>Anorak Dev</h2>
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
          <h1>Hola, soy <span className="highlight">Desarrollador Full Stack</span></h1>
          <p className="hero-description">
            Creo aplicaciones web modernas, escalables y funcionales utilizando las últimas tecnologías.
            Especializado en React, Node.js y arquitecturas cloud-native.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">Ver mis proyectos</a>
            <a href="#contact" className="btn btn-secondary">Hablemos</a>
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
                Cuando no estoy programando, me gusta mantenerme actualizado con las últimas tendencias tecnológicas,
                contribuir a proyectos open source y compartir conocimientos con la comunidad.
              </p>
            </div>
            <div className="about-stats animate-fade-right">
              <div className="stat-item">
                <span className="stat-number">25+</span>
                <span className="stat-label">Proyectos Completados</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">3+</span>
                <span className="stat-label">Años de Experiencia</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-label">Tecnologías Dominadas</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Proyectos Entregados</span>
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
                <span className="skill-tag">React</span>
                <span className="skill-tag">Vue.js</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">HTML5</span>
                <span className="skill-tag">CSS3</span>
                <span className="skill-tag">SASS</span>
                <span className="skill-tag">Tailwind CSS</span>
                <span className="skill-tag">Vite</span>
                <span className="skill-tag">Webpack</span>
              </div>
            </div>
            <div className="skill-category animate-fade-up" style={{animationDelay: '0.2s'}}>
              <h3>⚙️ Backend</h3>
              <div className="skill-tags">
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Express</span>
                <span className="skill-tag">Python</span>
                <span className="skill-tag">Django</span>
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">PostgreSQL</span>
                <span className="skill-tag">MySQL</span>
                <span className="skill-tag">REST APIs</span>
                <span className="skill-tag">GraphQL</span>
                <span className="skill-tag">JWT</span>
              </div>
            </div>
            <div className="skill-category animate-fade-up" style={{animationDelay: '0.4s'}}>
              <h3>☁️ DevOps & Tools</h3>
              <div className="skill-tags">
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">AWS</span>
                <span className="skill-tag">Git</span>
                <span className="skill-tag">GitHub Actions</span>
                <span className="skill-tag">Linux</span>
                <span className="skill-tag">Nginx</span>
                <span className="skill-tag">VS Code</span>
                <span className="skill-tag">Postman</span>
                <span className="skill-tag">Figma</span>
                <span className="skill-tag">Jest</span>
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
              <h3>🛒 E-Commerce Platform</h3>
              <p>
                Plataforma de comercio electrónico completa con carrito de compras, 
                sistema de pagos, panel de administración y gestión de inventario.
                Incluye autenticación, roles de usuario y dashboard analítico.
              </p>
              <div className="project-tech">
                <span className="tech-tag">React</span>
                <span className="tech-tag">Node.js</span>
                <span className="tech-tag">MongoDB</span>
                <span className="tech-tag">Stripe</span>
                <span className="tech-tag">JWT</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/tu-usuario/ecommerce" className="btn btn-small">Ver código</a>
                <a href="https://ecommerce-demo.com" className="btn btn-small">Demo</a>
              </div>
            </div>
            
            <div className="project-card animate-fade-up" style={{animationDelay: '0.2s'}}>
              <h3>📱 Social Media App</h3>
              <p>
                Aplicación social con funciones de posts, comentarios, likes, 
                chat en tiempo real, notificaciones push y sistema de seguidores.
                Implementada con arquitectura escalable y real-time features.
              </p>
              <div className="project-tech">
                <span className="tech-tag">Vue.js</span>
                <span className="tech-tag">Socket.io</span>
                <span className="tech-tag">Express</span>
                <span className="tech-tag">PostgreSQL</span>
                <span className="tech-tag">Redis</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/tu-usuario/social-app" className="btn btn-small">Ver código</a>
                <a href="https://social-demo.com" className="btn btn-small">Demo</a>
              </div>
            </div>
            
            <div className="project-card animate-fade-up" style={{animationDelay: '0.4s'}}>
              <h3>📊 Analytics Dashboard</h3>
              <p>
                Dashboard analítico con visualización de datos en tiempo real,
                reportes customizables, filtros avanzados y exportación de datos.
                Optimizado para grandes volúmenes de información.
              </p>
              <div className="project-tech">
                <span className="tech-tag">React</span>
                <span className="tech-tag">D3.js</span>
                <span className="tech-tag">Python</span>
                <span className="tech-tag">FastAPI</span>
                <span className="tech-tag">Docker</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/tu-usuario/analytics" className="btn btn-small">Ver código</a>
                <a href="https://analytics-demo.com" className="btn btn-small">Demo</a>
              </div>
            </div>

            <div className="project-card animate-fade-up" style={{animationDelay: '0.6s'}}>
              <h3>🎵 Music Streaming Platform</h3>
              <p>
                Plataforma de streaming de música con reproductores, playlists,
                búsqueda avanzada, recomendaciones personalizadas y sistema de subscripciones.
                Audio optimizado y experiencia mobile-first.
              </p>
              <div className="project-tech">
                <span className="tech-tag">Next.js</span>
                <span className="tech-tag">GraphQL</span>
                <span className="tech-tag">Node.js</span>
                <span className="tech-tag">MongoDB</span>
                <span className="tech-tag">AWS S3</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/tu-usuario/music-platform" className="btn btn-small">Ver código</a>
                <a href="https://music-demo.com" className="btn btn-small">Demo</a>
              </div>
            </div>

            <div className="project-card animate-fade-up" style={{animationDelay: '0.8s'}}>
              <h3>🏠 Smart Home IoT System</h3>
              <p>
                Sistema IoT para hogares inteligentes con control de dispositivos,
                automatización, monitoreo de sensores y dashboard de control remoto.
                Incluye app móvil y notificaciones en tiempo real.
              </p>
              <div className="project-tech">
                <span className="tech-tag">React Native</span>
                <span className="tech-tag">MQTT</span>
                <span className="tech-tag">Python</span>
                <span className="tech-tag">Raspberry Pi</span>
                <span className="tech-tag">InfluxDB</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/tu-usuario/smart-home" className="btn btn-small">Ver código</a>
                <a href="https://smarthome-demo.com" className="btn btn-small">Demo</a>
              </div>
            </div>

            <div className="project-card animate-fade-up" style={{animationDelay: '1s'}}>
              <h3>💰 Cryptocurrency Tracker</h3>
              <p>
                Aplicación para seguimiento de criptomonedas con gráficos interactivos,
                alertas de precios, portfolio personal y análisis técnico.
                Datos en tiempo real desde múltiples exchanges.
              </p>
              <div className="project-tech">
                <span className="tech-tag">TypeScript</span>
                <span className="tech-tag">Chart.js</span>
                <span className="tech-tag">WebSocket</span>
                <span className="tech-tag">Redis</span>
                <span className="tech-tag">Docker</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/tu-usuario/crypto-tracker" className="btn btn-small">Ver código</a>
                <a href="https://crypto-demo.com" className="btn btn-small">Demo</a>
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
              <a href="mailto:tu@email.com" className="contact-link">
                <span>📧</span>
                <span>tu@email.com</span>
              </a>
              <a href="https://linkedin.com/in/tu-perfil" className="contact-link">
                <span>💼</span>
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/tu-usuario" className="contact-link">
                <span>🐱</span>
                <span>GitHub</span>
              </a>
              <a href="https://twitter.com/tu-usuario" className="contact-link">
                <span>🐦</span>
                <span>Twitter</span>
              </a>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Asunto</label>
                <input type="text" id="subject" name="subject" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Mensaje</label>
                <textarea id="message" name="message" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Anorak Dev. Diseñado y desarrollado con ❤️</p>
        </div>
      </footer>
    </div>
  )
}

export default App