import React, { useState } from "react";
import "./index.scss";

export default function ModalDenuncia({ close }) {
  const [telefone, setTelefone] = useState("");
  const [descricao, setDescricao] = useState("");

  const enviar = () => {
    console.log("Dados enviados:", { telefone, descricao });
    close();
  };

  const maskPhone = (value) => {
    value = value.replace(/\D/g, "");

    if (value.length <= 10) {
      return value
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      return value
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Denúncia de funcionário</h2>

        <p className="modal-desc">
          Atenção! Ao registrar uma denúncia contra um voluntário, você declara
          que possui provas que a justifiquem e deverá apresentá-las ao suporte,
          que entrará em contato após o envio da denúncia. Seja responsável e
          evite qualquer ação que possa prejudicar outras pessoas de forma
          intencional.
        </p>

        <label>Telefone para contato</label>
        <input
          type="text"
          placeholder="(00) 00000-0000"
          value={telefone}
          maxLength={15}
          onChange={(e) => setTelefone(maskPhone(e.target.value))}
        />

        <label>Descreva o problema que experienciou</label>
        <textarea
          placeholder="Digite aqui..."
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <div className="modal-actions">
          <button className="btn-cancelar" onClick={close}>
            Cancelar
          </button>

          <button className="btn-enviar" onClick={enviar}>
            Enviar denúncia
          </button>
        </div>
      </div>
    </div>
  );
}
