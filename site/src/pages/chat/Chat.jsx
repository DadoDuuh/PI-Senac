import React, { useState } from "react";
import "./Chat.scss";
import balaoChat from "../../assets/images/balao-chat-icon.svg";
import denunciaIcon from "../../assets/images/denuncia-icon.svg";
import ModalDenuncia from "../../components/modal-denuncia";

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "me",
      text: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
    },
    {
      id: 2,
      sender: "me",
      text: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
    },
    {
      id: 3,
      sender: "other",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur placerat, felis eu cursus eleifend, turpis risus blandit dui, id pretium dui tellus quis nulla. Nulla pulvinar leo enim, eget pharetra massa pellentesque et. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean dictum enim neque, et tempor ipsum pretium sit amet.",
    },
    {
      id: 4,
      sender: "other",
      text: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
    },
  ]);

  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "me", text: input },
    ]);
    setInput("");
  };

  return (
    <div className="page-chat">
      {showModal && <ModalDenuncia close={() => setShowModal(false)} />}

      <header className="appointments-header">
        <div className="container">
          <img src={balaoChat} alt="" />
          <div>
            <h1>Chat de conversação</h1>
            <p className="subtitle">
              Os nossos funcionários nunca pedirão documentos pessoais ou
              informações sensíveis durante a conversa. O espaço é totalmente
              confidencial e dedicado apenas ao seu cuidado.
            </p>
          </div>
        </div>
      </header>

      <div className="chat-wrapper">
        <aside className="chat-sidebar">
          <h3>Conversas</h3>
          <div className="contact-item">Dra. Ana Silva</div>
          <div className="contact-item selected">Dr. Carlos Mendes</div>
        </aside>

        <main className="chat-main">
          <header className="chat-header">
            <div className="chat-user">Dr. Carlos Mendes</div>

            <button className="report-btn" onClick={() => setShowModal(true)}>
              <span>Denunciar</span>
              <img src={denunciaIcon} alt="" />
            </button>
          </header>

          <div className="messages-area">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <footer className="chat-input-area">
            <input
              type="text"
              placeholder="Mensagem"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage} className="send-btn">
              ➤
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
}
