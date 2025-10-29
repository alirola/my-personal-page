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
					<img src="../images/icons/react.svg" alt="React" className="w-5 h-5"
					style={{ width: '20px', height: '20px' }}/>
					React
				</span>
                <span className="skill-tag">
					<img src="../images/icons/javascript.svg" alt="Javascript" className="w-5 h-5"
					style={{ width: '20px', height: '20px' }}/>
					Javascript
				</span>
                <span className="skill-tag">
					<img src="../images/icons/typescript.svg" alt="Typescript" className="w-5 h-5"
					style={{ width: '20px', height: '20px' }}/>
					Typescript
				</span>
                <span className="skill-tag">
					<img src="../images/icons/html.svg" alt="HTML" className="w-5 h-5"
					style={{ width: '20px', height: '20px' }}/>
					HTML5
				</span>
                <span className="skill-tag">
					<img src="../images/icons/css.svg" alt="CSS" className="w-5 h-5"
					style={{ width: '20px', height: '20px' }}/>
					CSS3
				</span>
                <span className="skill-tag">
					<img src="../images/icons/tailwind.svg" alt="Tailwind" className="w-5 h-5"
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
					<img src="../images/icons/node.svg" alt="Node" className="w-5 h-5"
					style={{ width: '20px', height: '20px' }}/>
					Node.js
				</span>
                <span className="skill-tag">
					<img src="../images/icons/express.png" alt="Express" className="w-5 h-5"
					style={{ width: '20px', height: '20px' }}/>
					Express
				</span>
				<span className="skill-tag">
					<img src="../images/icons/fastify.svg" alt="Fastify" className="w-5 h-5"
					style={{ width: '20px', height: '20px' }}/>
					Fastify
				</span>
				<span className="skill-tag">
					<img src="../images/icons/django.svg" alt="Django" className="w-5 h-5"
					style={{ width: '20px', height: '20px' }}/>
					Django
				</span>
                <span className="skill-tag">
					<img src="../images/icons/mongodb.svg" alt="Mongodb" className="w-5 h-5"
					style={{ width: '30px', height: '30px' }}/>
					MongoDB
				</span>
                <span className="skill-tag">
					<img src="../images/icons/postgres.svg" alt="Postgres" className="w-5 h-5"
					style={{ width: '30px', height: '30px' }}/>
					PostgreSQL
				</span>
                <span className="skill-tag">
					<img src="../images/icons/rest_api.svg" alt="RESTAPIS" className="w-5 h-5"
					style={{ width: '20px', height: '20px' }}/>
					REST APIs
				</span>
                <span className="skill-tag">
					<img src="../images/icons/jwt.svg" alt="JWT" className="w-5 h-5"
					style={{ width: '20px', height: '20px' }}/>
					JWT
				</span>
              </div>
            </div>
            <div className="skill-category animate-fade-up" style={{animationDelay: '0.4s'}}>
              <h3>☁️ DevOps & Tools</h3>
              	<div className="skill-tags">
					<span className="skill-tag">
						<img src="../images/icons/docker.svg" alt="Docker" className="w-5 h-5"
						style={{ width: '20px', height: '20px' }}/>
						Docker
					</span>
					<span className="skill-tag">
						<img src="../images/icons/git.svg" alt="Git" className="w-5 h-5"
						style={{ width: '20px', height: '20px' }}/>
						Git
					</span>
					<span className="skill-tag">
						<img src="../images/icons/linux.svg" alt="Linux" className="w-5 h-5"
						style={{ width: '20px', height: '20px' }}/>
						Linux
					</span>
					<span className="skill-tag">
						<img src="../images/icons/nginx.svg" alt="Nginx" className="w-5 h-5"
						style={{ width: '20px', height: '20px' }}/>
						Nginx
					</span>
					<span className="skill-tag">
						<img src="../images/icons/vscode.svg" alt="VSCode" className="w-5 h-5"
						style={{ width: '20px', height: '20px' }}/>
						VS Code
					</span>
					<span className="skill-tag">
						<img src="../images/icons/postman.svg" alt="Postman" className="w-5 h-5"
						style={{ width: '20px', height: '20px' }}/>
						Postman
					</span>
					<span className="skill-tag">
						<img src="../images/icons/railway.svg" alt="Railway" className="w-5 h-5"
						style={{ width: '30px', height: '30px' }}/>
						Railway
					</span>
					<span className="skill-tag">
						<img src="../images/icons/vercel.svg" alt="Vercel" className="w-5 h-5"
						style={{ width: '20px', height: '20px' }}/>
						Vercel
					</span>
				</div>
            </div>
			<div className="skill-category animate-fade-up" style={{animationDelay: '0.4s'}}>
              <h3>🛡️ Ciberseguridad</h3>
              	<div className="skill-tags">
					<span className="skill-tag">
						<img src="../images/icons/nmap.svg" alt="Nmap" className="w-5 h-5"
						style={{ width: '20px', height: '20px' }}/>
						Nmap
					</span>
					<span className="skill-tag">
						<img src="../images/icons/burpsuite.svg" alt="Burpsuite" className="w-5 h-5"
						style={{ width: '20px', height: '20px' }}/>
						Burpsuite
					</span>
					<span className="skill-tag">
						<img src="../images/icons/wireshark.png" alt="Wireshark" className="w-5 h-5"
						style={{ width: '20px', height: '20px' }}/>
						Wireshark
					</span>
					<span className="skill-tag">
						<img src="../images/icons/osint.png" alt="Osint" className="w-5 h-5"
						style={{ width: '20px', height: '20px' }}/>
						OSINT Tools
					</span>
					<span className="skill-tag">
						<img src="../images/icons/owasp.svg" alt="Owasp" className="w-5 h-5"
						style={{ width: '20px', height: '20px' }}/>
						OWASP TOP 10
					</span>
				</div>
            </div>
			<div className="skill-category animate-fade-up" style={{animationDelay: '0.4s'}}>
              <h3>🧑🏼‍💻 Lenguajes</h3>
              	<div className="skill-tags">
					<span className="skill-tag">
						<img src="../images/icons/c.png" alt="C" className="w-5 h-5"
						style={{ width: '20px', height: '20px' }}/>
						C
					</span>
					<span className="skill-tag">
						<img src="../images/icons/c++.svg" alt="C++" className="w-5 h-5"
						style={{ width: '20px', height: '20px' }}/>
						C++
					</span>
					<span className="skill-tag">
						<img src="../images/icons/python.svg" alt="Wireshark" className="w-5 h-5"
						style={{ width: '20px', height: '20px' }}/>
						Python
					</span>
					<span className="skill-tag">
						<img src="../images/icons/javascript.svg" alt="Javascript" className="w-5 h-5"
						style={{ width: '20px', height: '20px' }}/>
						Javascript
					</span>
					<span className="skill-tag">
						<img src="../images/icons/typescript.svg" alt="Typescript" className="w-5 h-5"
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
							<img src="../images/icons/c.png" alt="C" 
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
							<img src="../images/icons/react.svg" alt="React" 
							className="w-5 h-5"
							style={{ width: '20px', height: '20px' }}/>
							React
						</span>
						<span className="tech-tag">
							<img src="../images/icons/node.svg" alt="Node" 
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
							<img src="../images/icons/postgres.svg" alt="Postgres" 
							className="w-5 h-5"
							style={{ width: '20px', height: '20px' }}/>
							Postgresql
						</span>
						<span className="tech-tag">
							<img src="../images/icons/express.png" alt="Express" 
							className="w-5 h-5"
							style={{ width: '20px', height: '20px' }}/>
							Express
						</span>
						<span className="tech-tag">
							<img src="../images/icons/jwt.svg" alt="JWT" 
							className="w-5 h-5"
							style={{ width: '20px', height: '20px' }}/>
							JWT
						</span>
						<span className="tech-tag">
							<img src="../images/icons/vercel.svg" alt="vercel" 
							className="w-5 h-5"
							style={{ width: '20px', height: '20px' }}/>
							Vercel
						</span>
						<span className="tech-tag">
							<img src="../images/icons/railway.svg" alt="railway" 
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
							<img src="../images/icons/react.svg" alt="React" 
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
							<img src="../images/icons/vercel.svg" alt="vercel" 
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
						src="../images/gmail.png" 
						alt="Email" 
						style={{ width: '30px', height: '30px' }}
						/>
				</span>
                <span>Email</span>
              </a>
              <a href="https://linkedin.com/in/alexlirola" className="contact-link" target="_blank">
                <span>
					<img 
						src="../images/linkedin.png" 
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
						src="../images/github.png" 
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
						src="../images/gorjeo.png" 
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

export default App