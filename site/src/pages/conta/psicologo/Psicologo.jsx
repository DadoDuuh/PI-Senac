import "./Psicologo.scss";
import lapisIcon from "../../../assets/images/lapis-icon.svg";
import NavCategoria from "../../../components/nav-categoria";
import React, { useEffect, useState } from "react";
import ModalPadrao from "../../../components/modal-padrao";
import { buscarPerfilPsicologo } from "../../../api/psicologoApi";
import { useNavigate } from "react-router-dom";
import {
  buscarConsultasPsicologo,
  cancelarConsulta,
  confirmarConsulta
} from "../../../api/consultaApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Psicologo() {
  const navigate = useNavigate();
  const [psicologo, setPsicologo] = useState(null);
  const [pacientes, setPacientes] = useState(null);
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);
  const [modalAnotacoesOpen, setModalAnotacoesOpen] = useState(false);
  const [consultaAnotacaoSelecionada, setConsultaAnotacaoSelecionada] =
    useState(null);

  // Busca dados do psicólogo ao carregar a página
  useEffect(() => {
    async function carregarPerfil() {
      try {
        const usuarioId = localStorage.getItem('usuarioId');
        if (!usuarioId) {
          navigate('/login');
          return;
        }

        const dadosPsicologo = await buscarPerfilPsicologo(usuarioId);
        setPsicologo(dadosPsicologo);

        const dadosConsultas = await buscarConsultasPsicologo(usuarioId);
        console.log("Consultas do psicólogo:", dadosConsultas);
        console.log("Quantidade de consultas:", dadosConsultas.length);

        // Log de cada consulta
        dadosConsultas.forEach((c, i) => {
          console.log(`Consulta ${i + 1}:`, {
            id: c.id,
            paciente: c.paciente_nome,
            data: c.data_hora,
            status: c.status,
            link: c.link_atendimento
          });
        });

        setConsultas(dadosConsultas);

      } catch (error) {
        toast.error("Erro ao carregar seus dados");
      } finally {
        setLoading(false);
      }
    }
    carregarPerfil();
  }, [navigate]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const usuarioId = localStorage.getItem('usuarioId');
        if (!usuarioId) {
          navigate('/login');
          return;
        }
        const dadosPacientes = await buscarConsultasPsicologo(usuarioId);
        console.log("🔍 Pacientes do banco:", dadosPacientes);

        // Mocks:
        const gerarConsistente = (id, max) => {
          return (id * 7 + 13) % max;
        };

        const pacientesFormatados = dadosPacientes.map(paciente => ({
          id: paciente.id,
          name: paciente.nome,
          data: "28/03/2023 às 10:00",
          image: `https://i.pravatar.cc/300?img=${paciente.id}`,
          verified: true
        }));
        console.log("✅ Pacientes formatados:", pacientesFormatados);
        setPacientes(pacientesFormatados);
      } catch (error) {
        console.error("Erro ao carregar pacientes:", error);
      }
    }
    carregarDados();
  }, []);

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

  // Próximas consultas [confirmadas]:
  const consultasProximas = consultas.filter(c =>
      c.status === 'confirmado' && new Date(c.data_hora) > new Date()
  );

  // Histórico de consultas [realizadas]:
  const consultasHistorico = consultas.filter(c =>
      c.status === 'confirmado' && new Date(c.data_hora) <= new Date()
  );

  // Solicitações de consulta pendentes [de confirmação]
  const consultasSolicitacoes = consultas.filter(c =>
      c.status === 'pendente'
  );

  const handleCancelar = async (agendamentoId) => {
    if (!window.confirm("Tem certeza que deseja cancelar esta consulta?")) {
      return;
    }

    try {
      await cancelarConsulta(agendamentoId);
      toast.success("Consulta cancelada com sucesso!");

      // Recarrega as consultas
      const usuarioId = localStorage.getItem('usuarioId');
      const dadosConsultas = await buscarConsultasPsicologo(usuarioId);
      setConsultas(dadosConsultas);
    } catch (error) {
      console.error("Erro ao cancelar:", error);
      toast.error("Erro ao cancelar consulta");
    }
  };

  const handleIniciarConsulta = (linkAtendimento) => {
    if (linkAtendimento) {
      window.open(linkAtendimento, '_blank');
    } else {
      toast.warning("Consulta ainda não foi confirmada");
    }
  };

  const formatarDataHora = (dataHora) => {
    const data = new Date(dataHora);
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  let usuarioObj = {
    id: 1,
    nome: psicologo?.nome || "Sicrana",
    fotoPerfil: "https://i.pravatar.cc/300?img=5",
    categorias: ["Ansiedade", "Depressão", "Autoestima"],
    voluntariaDesde: 2022,
    aceitandoNovasSolicitacoes: true,
    biografia:
      "Especialista em ansiedade e depressão, com abordagem humanista e 10 anos de experiência clínica.",
  };

  function renderProximasConsultas() {
    return (
      <>
        {consultasProximas.map((consulta) => (
          <div key={consulta.id} className="consulta-card">
            <div className="profissional-info">
              <img
                  src={`https://i.pravatar.cc/150?img=${consulta.paciente_id}`}
                  alt={consulta.paciente_nome}
                  className="foto-profissional"
              />
              <div>
                <h3>{consulta.paciente_nome}</h3>
                <p className="data">
                  <i className="icon-calendar"></i> {formatarDataHora(consulta.data_hora)}
                </p>
                <p className="info">
                  50 min · {consulta.link_atendimento ? 'Online - PsicoAcolher' : 'Aguardando confirmação'}
                </p>
              </div>
            </div>

            <div className="acoes">
              <button
                  className="btn-cancelar"
                  onClick={() => handleCancelar(consulta.id)}
              >
                Cancelar
              </button>

              {consulta.link_atendimento && (
                  <button
                      className="btn-iniciar-consulta"
                      onClick={() => handleIniciarConsulta(consulta.link_atendimento)}
                  >
                    Iniciar consulta
                  </button>
              )}

              <button
                  className="btn-acessar-chat"
                  onClick={() => navigate('/chat')}
              >
                Acessar chat
              </button>
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
    const [linkAtendimento, setLinkAtendimento] = useState('');

    const handleConfirmar = async () => {
      try {
        if (!linkAtendimento.trim()) {
          toast.warning("Por favor, insira o link da reunião");
          return;
        }

        await confirmarConsulta(consulta.id, linkAtendimento);
        toast.success("Consulta confirmada com sucesso!");

        // Recarrega consultas
        const usuarioId = localStorage.getItem('usuarioId');
        const dadosConsultas = await buscarConsultasPsicologo(usuarioId);
        setConsultas(dadosConsultas);

        onClose();
      } catch (error) {
        console.error("Erro ao confirmar:", error);
        toast.error("Erro ao confirmar consulta");
      }
    };

    return (
      <div className="modal-container">
        <h2 className="title">Agendamento de consulta</h2>

        <p className="texto-explicativo">
          Para confirmar o agendamento da consulta, por favor, insira o link da
          reunião que o paciente deverá entrar no horário solicitado.
        </p>

        <p className="data-select">
          <i className="icon-calendar"></i> Consulta a ser realizada em{" "}
          <strong>{formatarDataHora(consulta.data_hora)}</strong>
        </p>

        <p className="data-select">
          <strong>Paciente:</strong> {consulta.paciente_nome}
        </p>

        <label className="label">
          Link da reunião a ser enviada para o paciente
        </label>
        <input
            type="url"
            className="input"
            placeholder="https://meet.google.com/..."
            value={linkAtendimento}
            onChange={(e) => setLinkAtendimento(e.target.value)}
        />

        <div className="buttons-row">
          <button className="btn-cancelar" onClick={onClose}>
            Cancelar
          </button>

          <button className="btn-confirmar" onClick={handleConfirmar}>
            Confirmar e Enviar</button>
        </div>
      </div>
    );
  }

  function renderSolicitacoesConsultas() {
    if (consultasSolicitacoes.length === 0) {
      return (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#665' }}>
            <p>Não há solicitações pendentes no momento.</p>
          </div>
      );
    }

    return (
      <>
        {consultasSolicitacoes.map((consulta) => (
          <div key={consulta.id} className="consulta-card">
            <div className="profissional-info">
              <img
                  src={ `https://i.pravatar.cc/150?img=${consulta.paciente_id}` }
                  alt="{consulta.paciente_nome}"
                  className="foto-profissional"
              />
              <div>
                <h3>{consulta.paciente_nome}</h3>
                <p className="data">
                  <i className="icon-calendar" /> {formatarDataHora(consulta.data_hora)}
                </p>
                <p className="info">50 min · Aguardando confirmação</p>
              </div>
            </div>

            <div className="acoes">
              <button
                  className="btn-acessar"
                  onClick={() => navigate('/chat')}
              >
                Acessar chat
              </button>

              <button
                className="btn-confirmar"
                onClick={() => abrirModalConfirmar(consulta)}
              >
                Confirmar
              </button>

              <button
                  className="btn-cancelar"
                  onClick={() => handleCancelar(consulta.id)}
              >
                Recusar
              </button>
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
                  src={`https://i.pravatar.cc/150?img=${consulta.paciente_id}`}
                  alt={consulta.paciente_nome}
                  className="foto-profissional"
              />
              <div>
                <h3>{consulta.paciente_nome}</h3>
                <p className="especialidade">{consulta.especialidade}</p>
                <p className="data">
                  <i className="icon-calendar"></i> {formatarDataHora(consulta.data_hora)}
                </p>
                <p className="info">
                  50 min · {consulta.link_atendimento ? 'Online' : 'Presencial'}
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

              <button
                  className="btn-ver-detalhes"
                  onClick={() => navigate('/chat')}
              >Acessar chat</button>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (loading) {
    return (
        <div className="conta-page">
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <p>Carregando...</p>
          </div>
        </div>
    );
  }

  return (
    <div className="conta-page">
      <header className="conta-header">
        <div className="container-contas">
          <div className="container-perfil">
            <img
              className="img-perfil"
              src="https://i.pinimg.com/736x/47/30/38/473038bf60343d88ccb4188c0df1c544.jpg"
              alt=""
            />
            <img className="img-lapis" src={lapisIcon} alt="" />
          </div>

          <div className="usu-info">
            <div className="top-row">
              <h1>{psicologo?.nome || "Psicólogo"}</h1>

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
