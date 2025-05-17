import "./Main.scss";

export default function Main(props) {
  return (
    <main className="project-main">
      <header className="bg-white shadow-sm sticky-top z-3">
        <div className="container py-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <i className="fas fa-heart text-primary fs-4 me-2"></i>
            <h1 className="h5 fw-bold text-primary mb-0">PsicoAcolher</h1>
          </div>
          <nav className="d-none d-md-flex gap-4">
            <a href="#" className="text-primary fw-medium text-decoration-none">
              Início
            </a>
            <a href="#" className="text-secondary text-decoration-none">
              Como Funciona
            </a>
            <a href="#" className="text-secondary text-decoration-none">
              Profissionais
            </a>
            <a href="#" className="text-secondary text-decoration-none">
              Depoimentos
            </a>
            <a href="#" className="text-secondary text-decoration-none">
              Sobre Nós
            </a>
          </nav>
          <div className="d-flex align-items-center gap-2">
            <a href="#" className="btn btn-outline-primary">
              Login
            </a>
            <a href="#agendar" className="btn btn-primary">
              Agendar Consulta
            </a>
            <button className="btn d-md-none text-secondary">
              <i className="fas fa-bars fs-5"></i>
            </button>
          </div>
        </div>
      </header>
      {props.children}
      <footer className="bg-primary text-white py-4 mt-5">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="mb-3 mb-md-0">
            <h5 className="fw-bold">PsicoAcolher</h5>
            <p className="mb-0">
              © 2025 PsicoAcolher. Todos os direitos reservados.
            </p>
          </div>
          <div className="d-flex gap-3">
            <a
              href="#"
              className="text-white text-decoration-none"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f fs-5"></i>
            </a>
            <a
              href="#"
              className="text-white text-decoration-none"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter fs-5"></i>
            </a>
            <a
              href="#"
              className="text-white text-decoration-none"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram fs-5"></i>
            </a>
            <a
              href="#"
              className="text-white text-decoration-none"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in fs-5"></i>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
