import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Main.scss";

export default function Main(props) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const irParaLogin = (e) => {
    e.preventDefault();
    navigate("/login/usuario");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <main className="project-main">
      <header className={`main-header ${scrolled ? "scrolled" : ""}`}>
        <div className="container header-container">
          <div className="brand-wrapper">
            <i className="fas fa-heart brand-icon pulse"></i>
            <h1 className="brand-title">PsicoAcolher</h1>
          </div>

          <nav className="desktop-nav">
            <NavLink href="#" text="Início" active />
            <NavLink href="#" text="Como Funciona" />
            <NavLink href="#" text="Profissionais" />
            <NavLink href="#" text="Depoimentos" />
            <NavLink href="#" text="Sobre Nós" />
          </nav>

          <div className="action-buttons">
            <a
              onClick={irParaLogin}
              href="#"
              className="btn btn-outline-primary btn-login"
            >
              Login
            </a>
            <a href="#agendar" className="btn btn-primary btn-cta">
              Agendar Consulta
            </a>
            <button
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Menu"
            >
              <i
                className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"}`}
              ></i>
            </button>
          </div>
        </div>

        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          <NavLink href="#" text="Início" mobile />
          <NavLink href="#" text="Como Funciona" mobile />
          <NavLink href="#" text="Profissionais" mobile />
          <NavLink href="#" text="Depoimentos" mobile />
          <NavLink href="#" text="Sobre Nós" mobile />
        </div>
      </header>

      {props.children}

      <footer className="main-footer">
        <div className="container footer-content">
          <div className="footer-info">
            <h5 className="footer-title">PsicoAcolher</h5>
            <p className="footer-copyright">
              © {new Date().getFullYear()} PsicoAcolher. Todos os direitos
              reservados.
            </p>
          </div>
          <div className="social-links">
            <SocialIcon href="#" icon="facebook-f" />
            <SocialIcon href="#" icon="twitter" />
            <SocialIcon href="#" icon="instagram" />
            <SocialIcon href="#" icon="linkedin-in" />
          </div>
        </div>
      </footer>
    </main>
  );
}

function NavLink({ href, text, active = false, mobile = false }) {
  return (
    <a
      href={href}
      className={`nav-link ${active ? "active" : ""} ${
        mobile ? "mobile-link" : ""
      }`}
    >
      {text}
      <span className="nav-underline"></span>
    </a>
  );
}

function SocialIcon({ href, icon }) {
  return (
    <a href={href} className="social-icon" aria-label={icon}>
      <i className={`fab fa-${icon}`}></i>
    </a>
  );
}
