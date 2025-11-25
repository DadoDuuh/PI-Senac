import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Chat.scss";
import balaoChat from "../../assets/images/balao-chat-icon.svg";
import denunciaIcon from "../../assets/images/denuncia-icon.svg";
import ModalDenuncia from "../../components/modal-denuncia";
import { buscarMensagens, enviarMensagem, criarChat, buscarChat, buscarConversas } from "../../api/chatApi.js";
import { buscarPsicologoPorId } from "../../api/psicologoApi.js";
import { buscarPacientePorId } from "../../api/pacienteApi.js";

export default function ChatScreen() {
  const { state } = useLocation();
  const [chatId, setChatId] = useState();
  const [chatData, setChatData] = useState();
  const [usuarioTipo, setUsuarioTipo] = useState(localStorage.getItem("tipo"));
  const [conversas, setConversas] = useState([]);

  useEffect(() => {
    async function carregar() {

      const conversasBrutas = await buscarConversas(
        usuarioTipo === "psicologo" ? null : state.consulta.paciente_id,
        usuarioTipo === "psicologo" ? state.consulta.psicologo_id : null
      );

      const dados = await Promise.all(
        conversasBrutas.map(async (c) => {
          if (usuarioTipo === "psicologo") {
            const paciente = await buscarPacientePorId(c.paciente_id);
            return { ...c, nome: paciente.nome };
          } else {
            const psicologo = await buscarPsicologoPorId(c.psicologo_id);
            return { ...c, nome: psicologo.nome };
          }
        })
      );

      setConversas(dados);

      const chat = await buscarChat(state);

      if (!chat || chat.length === 0) {
        setChatData = await criarChat(state.consulta);
        setChatId(chatData.id);
      }

      setChatId(chat.id);

      const mensagens = await buscarMensagens(chat);

      setMessages(mensagens);
    }
    carregar();
  }, [state]);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);

  const sendMessage = async () => {

    await enviarMensagem({
      sender: usuarioTipo,
      chat_id: chatId,
      mensagem: input,
    });

    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: usuarioTipo,
        mensagem: input
      },
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
        {/* <aside className="chat-sidebar">
          <h3>Conversas</h3>
          {conversas.map((conversa) => (
            <button
              key={conversa.id}
              className={`contact-item ${chatId === conversa.id ? "selected" : ""}`}
              onClick={async () => {
                setChatId(conversa.id);
                const mensagens = await buscarMensagens(conversa);
                setMessages(mensagens);
              }}
            >
              {conversa.nome}</button>
          ))}
        </aside> */}

        <main className="chat-main">
          <header className="chat-header">
            <div className="chat-user">Dr. Carlos Mendes</div>

            <button className="report-btn" onClick={() => setShowModal(true)}>
              <span>Denunciar</span>
              <img src={denunciaIcon} alt="" />
            </button>
          </header>

          <div className="messages-area">
            {messages.map((msg) => {
              const classe = msg.sender === usuarioTipo ? "me" : "other";

              return (
                <div key={msg.id} className={`message ${classe}`}>
                  {msg.mensagem}
                </div>
              )
            })}
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
