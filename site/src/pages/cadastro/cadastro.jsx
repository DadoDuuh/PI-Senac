import React from "react";
import "./Cadastro.scss";

import { cadastroPsicologo } from '../../api/psicologoApi';
import { cadastroUsuario } from '../../api/usuarioApi';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
  

  async function cadastroClick() {
    try {
      if(formData.password !== formData.confirmPassword) {
        alert("As senhas não coincidem!");
      }

      if(isPsicologo) {
        const r = await cadastroPsicologo(formData.nome, formData.crp, formData.email, formData.senha);

        Storage('psicologo-logado', r);
        
        navigate('/paginaPsicologo');
      }
      else {
        const r = await cadastroUsuario(formData.nome, formData.cpf, formData.email, formData.senha, formData.phone);

        Storage('usuario-logado', r);
        
        navigate('/paginaUsuario');
      }
    }
    catch (err) {
        if (err.response?.status === 401) {
          alert(err.response?.data.erro);
      }
    }
  }

  document.addEventListener("keypress", function  (e) {
    if(e.key === "Enter"){
        const btn = document.querySelector("#send");
        btn.click();
    }
  })

  const irParaLogin = (e) => {
    e.preventDefault();
    navigate("/login/usuario");
  };

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
    setIsPsicologo(!isPsicologo);
    // Limpa o campo que não será mais usado
    setFormData((prev) => ({ 
      ...prev, 
      crp: isPsicologo ? "" : prev.crp,
      cpf: !isPsicologo ? "" : prev.cpf 
    }));
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
              {!isPsicologo && (
                <div className="form-group">
                  <label htmlFor="cpf" className="form-label">
                    CPF
                  </label>
                  <input
                    type="text"
                    className="form-control input-field"
                    id="cpf"
                    name="cpf"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={handleChange}
                    required={!isPsicologo}
                  />
                </div>
              )}
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