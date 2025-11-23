import React from "react";
import "./Cadastro.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cadastroPsicologo } from "../../api/psicologoApi";
import { cadastroPaciente } from "../../api/pacienteApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Cadastro() {
  const navigate = useNavigate();
  const [isPsicologo, setIsPsicologo] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthDate: "",
    cpf: "",
    crp: "",
  });

  function maskCPF(value) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .substring(0, 14);
  }

  function maskPhone(value) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .substring(0, 15);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    let maskedValue = value;

    if (name === "cpf") maskedValue = maskCPF(value);
    if (name === "phone") maskedValue = maskPhone(value);

    setFormData((prev) => ({
      ...prev,
      [name]: maskedValue,
    }));
  };

  async function cadastroClick(e) {
    e.preventDefault();
    console.log(formData);

    try {
      if (formData.password !== formData.confirmPassword) {
        toast.error("As senhas não coincidem!");
        return;
      }

      if (isPsicologo) {
        await cadastroPsicologo(
          formData.name,
          formData.crp,
          formData.email,
          formData.password
        );

        toast.success("Cadastro de psicólogo realizado com sucesso!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        await cadastroPaciente(
          formData.name,
          formData.cpf,
          formData.email,
          formData.password,
          formData.phone
        );

        toast.success("Cadastro de paciente realizado com sucesso!");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      console.error(err);

      const mensagemErro =
        err.response?.data?.erro ||
        "Não foi possível realizar o cadastro. Tente novamente.";

      toast.error(mensagemErro);
    }
  }

  document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const btn = document.querySelector("#send");
      btn?.click();
    }
  });

  const irParaLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const toggleUserType = () => {
    setIsPsicologo(!isPsicologo);

    setFormData((prev) => ({
      ...prev,
      crp: isPsicologo ? "" : prev.crp,
      cpf: !isPsicologo ? "" : prev.cpf,
    }));
  };

  return (
    <div className="register-page">
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="animated-card">
        <div className="text-center mb-4">
          <h3 className="animated-text">Crie sua conta</h3>
          <p className="welcome-text">
            {isPsicologo
              ? "Cadastro para Psicólogos Voluntários"
              : "Cadastro para Pacientes"}
          </p>
        </div>

        <form>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Nome Completo
            </label>
            <input
              type="text"
              className="form-control input-field"
              id="name"
              name="name"
              placeholder="Seu nome completo"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              type="email"
              className="form-control input-field"
              id="email"
              name="email"
              placeholder="seuemail@exemplo.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Senha</label>
                <input
                  type="password"
                  className="form-control input-field"
                  name="password"
                  placeholder="Crie uma senha"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Confirmar Senha</label>
                <input
                  type="password"
                  className="form-control input-field"
                  name="confirmPassword"
                  placeholder="Confirme sua senha"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Telefone</label>
                <input
                  type="tel"
                  className="form-control input-field"
                  name="phone"
                  placeholder="(00) 00000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              {!isPsicologo && (
                <div className="form-group">
                  <label className="form-label">CPF</label>
                  <input
                    type="text"
                    className="form-control input-field"
                    name="cpf"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              {isPsicologo && (
                <div className="form-group">
                  <label className="form-label">
                    CRP (Registro Profissional)
                  </label>
                  <input
                    type="text"
                    className="form-control input-field"
                    name="crp"
                    placeholder="Seu n.º de registro no CRP"
                    value={formData.crp}
                    onChange={handleChange}
                    required
                  />
                  <small className="text-muted">Formato: XX/XXXXXX</small>
                </div>
              )}
            </div>
          </div>

          <div className="form-group form-check mb-4">
            <input
              type="checkbox"
              className="form-check-input"
              id="terms"
              required
            />
            <label className="form-check-label" htmlFor="terms">
              Eu concordo com os{" "}
              <a href="#" className="animated-link">
                Termos de Serviço
              </a>{" "}
              e{" "}
              <a href="#" className="animated-link">
                Política de Privacidade
              </a>
            </label>
          </div>

          <button
            onClick={cadastroClick}
            id="send"
            type="submit"
            className="btn btn-primary w-100 animated-button"
          >
            {isPsicologo
              ? "Cadastrar como Psicólogo"
              : "Cadastrar como Paciente"}
          </button>

          <div className="text-center mt-3">
            <button
              type="button"
              className="toggle-user-type"
              onClick={toggleUserType}
            >
              {isPsicologo
                ? "Quero me cadastrar como paciente"
                : "Sou psicólogo voluntário e quero me cadastrar"}
            </button>
          </div>

          <hr className="my-4 animated-hr" />

          <p className="text-center mb-0">
            Já tem uma conta?{" "}
            <a href="" onClick={irParaLogin} className="animated-link">
              Faça login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
