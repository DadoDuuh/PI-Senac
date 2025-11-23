import "./Login.scss";

import Storage from "local-storage";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { loginUsuario } from "../../api/usuarioApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [cpf, setCpf] = useState("");
  const [celular, setCelular] = useState("");

  function maskCPF(value) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .substring(0, 14);
  }

  function maskCelular(value) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .substring(0, 15);
  }

  const irParaCadastro = (e) => {
    e.preventDefault();
    navigate("/cadastro");
  };

  async function entrarClick(e) {
    e.preventDefault();

    try {
      const resultado = await loginUsuario(email, senha);

      localStorage.setItem("token", resultado.token);
      localStorage.setItem("usuarioId", resultado.usuarioId);
      localStorage.setItem("tipo", resultado.tipo);

      Storage("usuario-logado", resultado);

      if (resultado.tipo === "paciente") {
        navigate("/busca");
      } else if (resultado.tipo === "psicologo") {
        navigate("/conta/psicologo");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Email ou senha inválidos");
      } else if (err.response?.status === 404) {
        toast.error("Usuário não encontrado");
      } else {
        toast.error("Erro ao fazer login.");
      }
    }
  }

  document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const btn = document.querySelector("#send");
      btn.click();
    }
  });

  return (
    <div className="login-page d-flex align-items-center justify-content-center min-vh-100">
      <ToastContainer />

      <div className="card animated-card p-4">
        <div className="text-center mb-4">
          <h3 className="fw-bold animated-text">Login</h3>
          <p className="text-muted mb-0 welcome-text">
            Bem-vindo ao PsicoAcolher
          </p>
        </div>

        <form>
          <div className="mb-3 form-group">
            <label className="form-label fw-semibold">CPF</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(maskCPF(e.target.value))}
              className="form-control input-field"
              placeholder="000.000.000-00"
              maxLength={14}
            />
          </div>

          <div className="mb-3 form-group">
            <label className="form-label fw-semibold">Celular</label>
            <input
              type="text"
              value={celular}
              onChange={(e) => setCelular(maskCelular(e.target.value))}
              className="form-control input-field"
              placeholder="(00) 00000-0000"
              maxLength={15}
            />
          </div>

          <div className="mb-3 form-group">
            <label htmlFor="email" className="form-label fw-semibold">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="form-control input-field"
              id="senha"
              placeholder="Digite sua senha"
              required
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <a href="#" className="animated-link">
              Esqueci minha senha
            </a>
          </div>

          <button
            onClick={entrarClick}
            id="send"
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
