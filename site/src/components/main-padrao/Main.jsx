import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Main.scss";

export default function Main(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthRoute = [
    "/login",
    "/cadastro",
    "/paginaUsuario",
    "/agendamentos",
  ].some((route) => location.pathname.startsWith(route));
  const isUserPage = location.pathname.startsWith("/paginaUsuario");
  const isAgendamentosPage = location.pathname.startsWith("/agendamentos");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
    setMobileMenuOpen(false);
  };

  const irParaLogin = (e) => {
    e.preventDefault();
    navigate("/login/usuario");
  };

  const irParaCadastro = (e) => {
    e.preventDefault();
    navigate("/cadastro");
  };

  const irParaHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const irParaAgendamentos = (e) => {
    e.preventDefault();
    navigate("/agendamentos");
  };

    const irParaPaginaUsuario = (e) => {
    e.preventDefault();
    navigate("/paginaUsuario");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <main className="project-main">
      <header className={`main-header ${scrolled ? "scrolled" : ""}`}>
        <div className="container header-container">
          <div onClick={irParaHome} className="brand-wrapper">
            <i className="fas fa-heart brand-icon pulse"></i>
            <h1 className="brand-title">PsicoAcolher</h1>
          </div>

          {!isAuthRoute && (
            <div className="desktop-nav">
              <div
                onClick={() =>
                  location.pathname === "/"
                    ? window.scrollTo(0, 0)
                    : irParaHome()
                }
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                Início
                <span className="nav-underline"></span>
              </div>
              <div
                onClick={() => scrollToSection("como-funciona")}
                className="nav-link"
              >
                Como Funciona
                <span className="nav-underline"></span>
              </div>
              <div
                onClick={() => scrollToSection("profissionais")}
                className="nav-link"
              >
                Profissionais
                <span className="nav-underline"></span>
              </div>
              <div
                onClick={() => scrollToSection("depoimentos")}
                className="nav-link"
              >
                Depoimentos
                <span className="nav-underline"></span>
              </div>
              <div
                onClick={() => scrollToSection("sobre")}
                className="nav-link"
              >
                Sobre Nós
                <span className="nav-underline"></span>
              </div>
            </div>
          )}

          <div className="action-buttons">
            {!isAuthRoute && (
              <div onClick={irParaCadastro} className="btn btn-primary btn-cta">
                Cadastrar
              </div>
            )}

            {!isAuthRoute && (
              <div
                onClick={irParaLogin}
                className="btn btn-outline-primary btn-login"
              >
                Login
              </div>
            )}

            {isUserPage && (
              <div
                onClick={irParaAgendamentos}
                className="btn btn-outline-primary btn-login"
              >
                Meus Agendamentos
              </div>
            )}

            {isAgendamentosPage && (
              <div
                onClick={irParaPaginaUsuario}
                className="btn btn-outline-primary btn-login"
              >
                Agendar Consulta
              </div>
            )}

            {!isAuthRoute && (
              <button
                className="mobile-menu-toggle"
                onClick={toggleMobileMenu}
                aria-label="Menu"
              >
                <i
                  className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"}`}
                ></i>
              </button>
            )}
          </div>
        </div>

        {!isAuthRoute && (
          <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
            <div
              onClick={() =>
                location.pathname === "/" ? window.scrollTo(0, 0) : irParaHome()
              }
              className={`nav-link mobile-link ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              Início
              <span className="nav-underline"></span>
            </div>
            <div
              onClick={() => scrollToSection("como-funciona")}
              className="nav-link mobile-link"
            >
              Como Funciona
              <span className="nav-underline"></span>
            </div>
            <div
              onClick={() => scrollToSection("profissionais")}
              className="nav-link mobile-link"
            >
              Profissionais
              <span className="nav-underline"></span>
            </div>
            <div
              onClick={() => scrollToSection("depoimentos")}
              className="nav-link mobile-link"
            >
              Depoimentos
              <span className="nav-underline"></span>
            </div>
            <div
              onClick={() => scrollToSection("sobre")}
              className="nav-link mobile-link"
            >
              Sobre Nós
              <span className="nav-underline"></span>
            </div>
          </div>
        )}
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
            <div
              className="social-icon"
              onClick={() => window.open("#", "_blank")}
            >
              <i className="fab fa-facebook-f"></i>
            </div>
            <div
              className="social-icon"
              onClick={() => window.open("#", "_blank")}
            >
              <i className="fab fa-twitter"></i>
            </div>
            <div
              className="social-icon"
              onClick={() => window.open("#", "_blank")}
            >
              <i className="fab fa-instagram"></i>
            </div>
            <div
              className="social-icon"
              onClick={() => window.open("#", "_blank")}
            >
              <i className="fab fa-linkedin-in"></i>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function SocialIcon({ href, icon }) {
  return (
    <a href={href} className="social-icon" aria-label={icon}>
      <i className={`fab fa-${icon}`}></i>
    </a>
  );
}
