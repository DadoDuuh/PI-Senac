import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cadastro.scss";

export default function Cadastro() {
  const navigate = useNavigate();
  const [isPsicologo, setisPsicologo] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthDate: "",
    crp: "",
  });

  const irParaLogin = (e) => {
    navigate("/login/usuario");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de cadastro aqui
    if (isPsicologo) {
      console.log("Cadastro de psicólogo:", formData);
    } else {
      console.log("Cadastro de paciente:", formData);
    }
    navigate("/login");
  };

  const toggleUserType = () => {
    setisPsicologo(!isPsicologo);
    // Limpa o campo CRP ao alternar
    setFormData((prev) => ({ ...prev, crp: "" }));
  };

  return (
    <div className="register-page">
      <div className="animated-card">
        <div className="text-center mb-4">
          <h3 className="animated-text">Crie sua conta</h3>
          <p className="welcome-text">
            {isPsicologo
              ? "Cadastro para Psicólogos Voluntários"
              : "Cadastro para Pacientes"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
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
                <label htmlFor="password" className="form-label">
                  Senha
                </label>
                <input
                  type="password"
                  className="form-control input-field"
                  id="password"
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
                <label htmlFor="confirmPassword" className="form-label">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  className="form-control input-field"
                  id="confirmPassword"
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
                <label htmlFor="phone" className="form-label">
                  Telefone
                </label>
                <input
                  type="tel"
                  className="form-control input-field"
                  id="phone"
                  name="phone"
                  placeholder="(00) 00000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="birthDate" className="form-label">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  className="form-control input-field"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {isPsicologo && (
            <div className="form-group">
              <label htmlFor="crp" className="form-label">
                CRP (Registro Profissional)
              </label>
              <input
                type="text"
                className="form-control input-field"
                id="crp"
                name="crp"
                placeholder="Seu número de registro no CRP"
                value={formData.crp}
                onChange={handleChange}
                required={isPsicologo}
              />
              <small className="text-muted">Formato: XX/XXXXXX</small>
            </div>
          )}

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
