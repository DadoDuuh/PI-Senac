import "./Psicologo.scss";
import lapisIcon from "../../../assets/images/lapis-icon.svg";
import NavCategoria from "../../../components/nav-categoria";
import React, { useEffect, useState } from "react";
import ModalPadrao from "../../../components/modal-padrao";
import { buscarPerfilPsicologo } from "../../../api/psicologoApi";
import { useNavigate } from "react-router-dom";

export default function Psicologo() {
  const [modalOpen, setModalOpen] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);
  const [modalAnotacoesOpen, setModalAnotacoesOpen] = useState(false);
  const [consultaAnotacaoSelecionada, setConsultaAnotacaoSelecionada] =
    useState(null);
  const navigate = useNavigate();
  const [psicologo, setPsicologo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Busca dados do psicólogo ao carregar a página
  useEffect(() => {
    async function carregarPerfil() {
      try {
        const usuarioId = localStorage.getItem('usuarioId');
        if (!usuarioId) {
          navigate('/login');
          return;
        }
        const dados = await buscarPerfilPsicologo(usuarioId);
        setPsicologo(dados);
      } catch (error) {
        alert("Erro ao carregar seus dados");
      } finally {
        setLoading(false);
      }
    } carregarPerfil();
  }, [navigate]);

  function abrirModalConfirmar(consulta) {
    setConsultaSelecionada(consulta);
    setModalOpen(true);
  }

  function fecharModal() {
    setModalOpen(false);
    setConsultaSelecionada(null);
  }

  function abrirModalAnotacoes(consulta) {
    setConsultaAnotacaoSelecionada(consulta);
    setModalAnotacoesOpen(true);
  }

  function fecharModalAnotacoes() {
    setModalAnotacoesOpen(false);
    setConsultaAnotacaoSelecionada(null);
  }

  const consultasProximas = [
    {
      id: 1,
      nome: "Fulano da Silva",
      especialidade: "Ansiedade e Depressão",
      data: "15/05/2023 às 14:00",
      duracao: "50 min",
      tipo: "Online - PsicoAcolher",
      foto: "https://i.pravatar.cc/150?img=12",
      acoes: ["Acessar chat", "Iniciar consulta", "Reagendar", "Cancelar"],
    },
    {
      id: 2,
      nome: "Sicrano Beltrano",
      especialidade: "Ansiedade e Depressão",
      data: "16/05/2023 às 15:00",
      duracao: "50 min",
      tipo: "Online - PsicoAcolher",
      foto: "https://i.pravatar.cc/150?img=32",
      acoes: ["Acessar chat", "Iniciar consulta", "Reagendar", "Cancelar"],
    },
  ];

  const consultasSolicitacoes = [
    {
      id: 1,
      nome: "Fulano da Silva",
      especialidade: "Ansiedade e Depressão",
      data: "15/05/2023 às 14:00",
      duracao: "50 min",
      tipo: "Online - PsicoAcolher",
      foto: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 2,
      nome: "Sicrano Beltrano",
      especialidade: "Ansiedade e Depressão",
      data: "16/05/2023 às 15:00",
      duracao: "50 min",
      tipo: "Online - PsicoAcolher",
      foto: "https://i.pravatar.cc/150?img=32",
    },
  ];

  const consultasHistorico = [
    {
      id: 101,
      nome: "Paciente Maria Souza",
      especialidade: "Terapia Cognitiva",
      data: "28/03/2023 às 10:00",
      duracao: "50 min",
      tipo: "Online - PsicoAcolher",
      foto: "https://i.pravatar.cc/150?img=47",
      status: "Finalizada",
    },
    {
      id: 102,
      nome: "Paciente João Ferreira",
      especialidade: "Psicanálise",
      data: "10/03/2023 às 09:00",
      duracao: "50 min",
      tipo: "Presencial - Av. Paulista, 900",
      foto: "https://i.pravatar.cc/150?img=58",
      status: "Finalizada",
    },
  ];

  let usuarioObj = {
    id: 1,
    nome: psicologo?.nome,
    fotoPerfil: "https://i.pravatar.cc/300?img=5",
    categorias: ["Ansiedade", "Depressão", "Autoestima"],
    voluntariaDesde: 2022,
    aceitandoNovasSolicitacoes: true,
    biografia:
      "Especialista em ansiedade e depressão, com abordagem humanista e 10 anos de experiência clínica.",
    consultasProximas: [
      {
        id: 1,
        nome: "Fulano da Silva",
        especialidade: "Ansiedade e Depressão",
        data: "15/05/2023 às 14:00",
        duracao: "50 min",
        tipo: "Online - PsicoAcolher",
        foto: "https://i.pravatar.cc/150?img=12",
        acoes: ["Acessar chat", "Iniciar consulta", "Reagendar", "Cancelar"],
      },
      {
        id: 2,
        nome: "Sicrano Beltrano",
        especialidade: "Ansiedade e Depressão",
        data: "16/05/2023 às 15:00",
        duracao: "50 min",
        tipo: "Online - PsicoAcolher",
        foto: "https://i.pravatar.cc/150?img=32",
        acoes: ["Acessar chat", "Iniciar consulta", "Reagendar", "Cancelar"],
      },
    ],

    consultasHistorico: [
      {
        id: 101,
        nome: "Paciente Maria Souza",
        especialidade: "Terapia Cognitiva",
        data: "28/03/2023 às 10:00",
        duracao: "50 min",
        tipo: "Online - PsicoAcolher",
        foto: "https://i.pravatar.cc/150?img=47",
        status: "Finalizada",
        acoes: ["Ver detalhes"],
      },
      {
        id: 102,
        nome: "Paciente João Ferreira",
        especialidade: "Psicanálise",
        data: "10/03/2023 às 09:00",
        duracao: "50 min",
        tipo: "Presencial - Av. Paulista, 900",
        foto: "https://i.pravatar.cc/150?img=58",
        status: "Finalizada",
        acoes: ["Ver detalhes"],
      },
    ],
  };

  function renderProximasConsultas() {
    return (
      <>
        {consultasProximas.map((consulta) => (
          <div key={consulta.id} className="consulta-card">
            <div className="profissional-info">
              <img
                src={consulta.foto}
                alt={consulta.nome}
                className="foto-profissional"
              />
              <div>
                <h3>{consulta.nome}</h3>

                <p className="data">
                  <i className="icon-calendar"></i> {consulta.data}
                </p>

                <p className="info">
                  {consulta.duracao} · {consulta.tipo}
                </p>
              </div>
            </div>

            <div className="acoes">
              {consulta.acoes.map((acao, index) => (
                <button
                  key={index}
                  className={`btn-${acao.toLowerCase().replace(" ", "-")}`}
                >
                  {acao}
                </button>
              ))}
            </div>
          </div>
        ))}
      </>
    );
  }

  function ModalAnotacoesConteudo({ consulta, onClose }) {
    return (
      <div className="modal-container">
        <h2 className="title">Anotações de {consulta.nome}</h2>

        <p className="texto-explicativo">
          Use esta área para realizar anotações importantes sobre o paciente
          para consultas futuras.
        </p>

        <p className="data-select">
          <i className="icon-calendar"></i> Consulta realizada em{" "}
          <strong>{consulta.data}</strong>
        </p>

        <label className="label">Anotações</label>

        <textarea
          className="input textarea-anotacoes"
          placeholder="Digite aqui..."
        />

        <div className="buttons-row">
          <button className="btn-cancelar" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-confirmar">Salvar</button>
        </div>
      </div>
    );
  }

  function ModalConfirmarConteudo({ consulta, onClose }) {
    return (
      <div className="modal-container">
        <h2 className="title">Agendamento de consulta</h2>

        <p className="texto-explicativo">
          Para confirmar o agendamento da consulta, por favor, insira o link da
          reunião que o paciente deverá entrar no horário solicitado.
        </p>

        <p className="data-select">
          <i className="icon-calendar"></i> Consulta a ser realizada em{" "}
          <strong>{consulta.data}</strong>
        </p>

        <label className="label">
          Link da reunião a ser enviada para o paciente
        </label>
        <input type="text" className="input" placeholder="Link" />

        <div className="buttons-row">
          <button className="btn-cancelar" onClick={onClose}>
            Cancelar
          </button>

          <button className="btn-confirmar">Enviar</button>
        </div>
      </div>
    );
  }

  function renderSolicitacoesConsultas() {
    return (
      <>
        {consultasSolicitacoes.map((consulta) => (
          <div key={consulta.id} className="consulta-card">
            <div className="profissional-info">
              <img src={consulta.foto} alt="" className="foto-profissional" />
              <div>
                <h3>{consulta.nome}</h3>
                <p className="data">
                  <i className="icon-calendar" /> {consulta.data}
                </p>
                <p className="info">{consulta.duracao}</p>
                <p className="info">{consulta.tipo}</p>
              </div>
            </div>

            <div className="acoes">
              <button className="btn-acessar">Acessar chat</button>

              <button
                className="btn-confirmar"
                onClick={() => abrirModalConfirmar(consulta)}
              >
                Confirmar
              </button>

              <button className="btn-cancelar">Cancelar</button>
            </div>
          </div>
        ))}
      </>
    );
  }

  function renderHistorico() {
    return (
      <>
        {consultasHistorico.map((consulta) => (
          <div key={consulta.id} className="consulta-card">
            <div className="profissional-info">
              <img
                src={consulta.foto}
                alt={consulta.nome}
                className="foto-profissional"
              />

              <div>
                <h3>{consulta.nome}</h3>
                <p className="especialidade">{consulta.especialidade}</p>

                <p className="data">
                  <i className="icon-calendar"></i> {consulta.data}
                </p>

                <p className="info">
                  {consulta.duracao} · {consulta.tipo}
                </p>

                <p
                  className="info"
                  style={{ marginTop: "6px", color: "#6c757d" }}
                >
                  ✔ Finalizada
                </p>
              </div>
            </div>

            <div className="acoes">
              <button
                className="btn-ver-detalhes"
                onClick={() => abrirModalAnotacoes(consulta)}
              >
                Anotações
              </button>

              <button className="btn-ver-detalhes">Acessar chat</button>
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <div className="conta-page">
      <header className="conta-header">
        <div className="container-contas">
          <div className="container-perfil">
            <img
              className="img-perfil"
              src={usuarioObj.fotoPerfil}
              alt={usuarioObj.nome}
            />
            <img className="img-lapis" src={lapisIcon} alt="" />
          </div>

          <div className="usu-info">
            <div className="top-row">
              <h1>{usuarioObj.nome}</h1>

              <div className="tags">
                {usuarioObj.categorias.slice(0, 3).map((cat, i) => (
                  <span key={i} className="tag">
                    {cat}
                  </span>
                ))}

                <span className="tag tag-plus">+</span>
              </div>
            </div>

            <p className="subtitle">
              Voluntária desde {usuarioObj.voluntariaDesde}
            </p>

            <div className="actions-row">
              <button className="btn-detalhes">Mais detalhes</button>

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  defaultChecked={usuarioObj.aceitandoNovasSolicitacoes}
                />
                <span>Aceitando novas solicitações</span>
              </label>
            </div>

            <div className="biografia-wrapper">
              <h3 className="bio-title">Biografia</h3>

              <div className="bio-card">
                <p>{usuarioObj.biografia}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="conta-container">
        <section className="agenda-section">
          <h2>Minhas consultas</h2>
          <p className="subtitle">
            Acompanhe suas consultas agendadas e histórico
          </p>

          <NavCategoria
            categorias={{
              "Próximas consultas": {
                nome: <p style={{ margin: 0 }}>Próximas consultas</p>,
                conteudo: renderProximasConsultas,
              },
              "Solicitação de consultas": {
                nome: <p style={{ margin: 0 }}>Solicitação de consultas</p>,
                conteudo: renderSolicitacoesConsultas,
              },
              Histórico: {
                nome: (
                  <p style={{ margin: 0 }}>
                    Histórico <span className="badge">2</span>
                  </p>
                ),
                conteudo: renderHistorico,
              },
            }}
          />
        </section>
      </main>
      <ModalPadrao isOpen={modalOpen} onClose={fecharModal}>
        {consultaSelecionada && (
          <ModalConfirmarConteudo
            consulta={consultaSelecionada}
            onClose={fecharModal}
          />
        )}
      </ModalPadrao>
      <ModalPadrao isOpen={modalAnotacoesOpen} onClose={fecharModalAnotacoes}>
        {consultaAnotacaoSelecionada && (
          <ModalAnotacoesConteudo
            consulta={consultaAnotacaoSelecionada}
            onClose={fecharModalAnotacoes}
          />
        )}
      </ModalPadrao>
    </div>
  );
}
