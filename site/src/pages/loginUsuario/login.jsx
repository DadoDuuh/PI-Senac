import React from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const irParaCadastro = (e) => {
    e.preventDefault();
    navigate("/cadastro");
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center min-vh-100">
      <div className="card animated-card p-4">
        <div className="text-center mb-4">
          <h3 className="fw-bold animated-text">Login</h3>
          <p className="text-muted mb-0 welcome-text">
            Bem-vindo ao PsicoAcolher
          </p>
        </div>

        <form>
          <div className="mb-3 form-group">
            <label htmlFor="email" className="form-label fw-semibold">
              E-mail
            </label>
            <input
              type="email"
              className="form-control input-field"
              id="email"
              placeholder="seuemail@exemplo.com"
              required
            />
          </div>
          <div className="mb-3 form-group">
            <label htmlFor="senha" className="form-label fw-semibold">
              Senha
            </label>
            <input
              type="password"
              className="form-control input-field"
              id="senha"
              placeholder="Digite sua senha"
              required
            />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="lembrar"
              />
              <label className="form-check-label">Lembrar-me</label>
            </div>
            <a href="#" className="animated-link">
              Esqueci minha senha
            </a>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold animated-button"
          >
            Entrar
          </button>
        </form>

        <hr className="my-4 animated-hr" />

        <p className="text-center text-muted mb-0">
          Ainda não tem uma conta?{" "}
          <a onClick={irParaCadastro} href="#" className="animated-link">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}
