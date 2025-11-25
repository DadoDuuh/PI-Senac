import "./Paciente.scss";
import lapisIcon from "../../../assets/images/lapis-icon.svg";
import NavCategoria from "../../../components/nav-categoria";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscarPerfilPaciente } from "../../../api/pacienteApi";
import {
  buscarConsultasPaciente,
  cancelarConsulta,
  reagendarConsulta,
} from "../../../api/consultaApi";

import {
  buscarPsicologoPorId,
} from "../../../api/psicologoApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Paciente() {
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [psicologoSelecionado, setPsicologoSelecionado] = useState(null);
  const [consultaId, setConsultaId] = useState(null);
  const [dataHoraSelecionada, setDataHoraSelecionada] = useState("");


  // Busca dados do paciente ao carregar a página
  useEffect(() => {
    async function carregarDados() {
      try {
        const usuarioId = localStorage.getItem("usuarioId");
        if (!usuarioId) {
          navigate("/login");
          return;
        }

        // Busca perfil do paciente
        const dadosPaciente = await buscarPerfilPaciente(usuarioId);
        setPaciente(dadosPaciente);

        // Busca consultas do paciente
        const dadosConsultas = await buscarConsultasPaciente(usuarioId);
        console.log("Consultas do paciente:", dadosConsultas);
        setConsultas(dadosConsultas);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        toast.error("Erro ao carregar seus dados");
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [navigate]);

  // Próximas consultas CONFIRMADAS/PENDENTES
  const consultasProximas = consultas.filter(c =>
    (c.status === 'confirmado' || c.status === 'pendente') && new Date(c.data_hora) > new Date()
  );

  // Histórico de consultas CONFIRMADAS/CANCELADAS
  const consultasHistorico = consultas.filter(c =>
    (c.status === 'confirmado' && new Date(c.data_hora) <= new Date()) || c.status === 'cancelado'
  );

  const handleChat = (consulta) => {
    navigate("/chat", { state: { consulta } });
  }

  const handleCancelar = async (agendamentoId) => {
    if (!window.confirm("Tem certeza que deseja cancelar esta consulta?")) {
      return;
    }

    try {
      await cancelarConsulta(agendamentoId);

      toast.success("Consulta cancelada com sucesso!");

      // Recarrega as consultas
      const usuarioId = localStorage.getItem("usuarioId");
      const dadosConsultas = await buscarConsultasPaciente(usuarioId);
      setConsultas(dadosConsultas);
    } catch (error) {
      console.error("Erro ao cancelar:", error);
      toast.error("Erro ao cancelar consulta");
    }
  };

  const handleReagendar = async (psicologoId, consultaId) => {
    setConsultaId(consultaId);
    setPsicologoSelecionado(await buscarPsicologoPorId(psicologoId))
    setModalOpen(true);
  };

  // Confirmação de reagendamento
  const confirmarReagendamento = async (consultaId) => {
    try {
      if (!dataHoraSelecionada) {
        toast.error("Por favor, selecione uma data e horário");
        return;
      }
      const usuarioId = localStorage.getItem("usuarioId");

      await reagendarConsulta(
        usuarioId,
        consultaId,
        dataHoraSelecionada
      );

      toast.success(
        "Consulta reagendada com sucesso! Aguarde a confirmação do psicólogo."
      );

      setModalOpen(false);
      setDataHoraSelecionada("");

      navigate("/conta/paciente", { state: { atualizar: true } });
    } catch (error) {
      console.error("Erro ao agendar:", error);
      toast.error("Erro ao agendar consulta. Tente novamente.");
    }
  };

  const handleIniciarConsulta = (linkAtendimento) => {
    if (linkAtendimento) {
      window.open(linkAtendimento, "_blank");
    } else {
      toast.warning("Link de atendimento ainda não foi enviado pelo psicólogo");
    }
  };

  const formatarDataHora = (dataHora) => {
    const data = new Date(dataHora);
    return data.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  function renderProximasConsultas() {
    if (consultasProximas.length === 0) {
      return (
        <div style={{ padding: "2rem", textAlign: "center", color: "#665" }}>
          <p>Você não tem consultas agendadas.</p>
          <button
            onClick={() => navigate("/busca")}
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Agendar Consulta
          </button>
        </div>
      );
    }

    return (
      <>
        {consultasProximas.map((consulta) => (
          <div key={consulta.id} className="consulta-card">
            <div className="profissional-info">
              <img
                src={`https://i.pravatar.cc/150?img=${consulta.psicologo_id}`}
                alt={consulta.psicologo_nome}
                className="foto-profissional"
              />
              <div>
                <h3>{consulta.psicologo_nome}</h3>
                <p className="especialidade">{consulta.especialidade}</p>
                <p className="data">
                  <i className="icon-calendar"></i>{" "}
                  {formatarDataHora(consulta.data_hora)}
                </p>
                <p className="info">
                  50 min ·{" "}
                  {consulta.link_atendimento
                    ? "Online - PsicoAcolher"
                    : "Aguardando confirmação"}
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

              <button
                className="btn-reagendar"
                onClick={() => handleReagendar(consulta.psicologo_id, consulta.id)}
              >
                Reagendar
              </button>

              {consulta.link_atendimento && (
                <button
                  className="btn-iniciar-consulta"
                  onClick={() =>
                    handleIniciarConsulta(consulta.link_atendimento)
                  }
                >
                  Iniciar consulta
                </button>
              )}

              <button
                className="btn-acessar-chat"
                onClick={() => handleChat(consulta)}
              >
                Acessar chat
              </button>
            </div>
          </div>
        ))}
      </>
    );
  }

  function renderHistorico() {
    if (consultasHistorico.length === 0) {
      return (
        <div style={{ padding: "2rem", textAlign: "center", color: "#665" }}>
          <p>Você ainda não tem consultas finalizadas.</p>
        </div>
      );
    }

    return (
      <>
        {consultasHistorico.map((consulta) => (
          <div key={consulta.id} className="consulta-card">
            <div className="profissional-info">
              <img
                src={`https://i.pravatar.cc/150?img=${consulta.psicologo_id}`}
                alt={consulta.psicologo_nome}
                className="foto-profissional"
              />
              <div>
                <h3>{consulta.psicologo_nome}</h3>
                <p className="data">
                  <i className="icon-calendar"></i> {formatarDataHora(consulta.data_hora)}
                </p>
                <p className="info">
                  50 min · Online
                </p>
                <p
                  className="info"
                  style={{
                    marginTop: "6px", color: "#6c757d"
                  }}
                >
                  {consulta.status === 'cancelado' ? '❌ Cancelada' : '✔ Finalizada'}
                </p>
              </div>
            </div>

            <div className="acoes">
              <button
                className="btn-ver-detalhes"
                onClick={() => toast.info('Funcionalidade em desenvolvimento')}
              >
                Ver detalhes
              </button>
              <button
                className="btn-acessar-chat"
                onClick={() =>
                  handleChat(consulta)}
              >
                Acessar chat
              </button>
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
      <ToastContainer position="top-right" autoClose={2500} />

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
            <h1>{paciente?.nome || "Paciente"}</h1>
            <p className="subtitle">Membro desde 2025</p>
            <button className="btn-detalhes">Mais detalhes</button>
          </div>
        </div>
      </header>

      <main className="conta-container">
        <section className="agenda-section">
          <h2>Meus Agendamentos</h2>
          <p className="subtitle">
            Acompanhe suas consultas agendadas e histórico
          </p>

          <NavCategoria
            categorias={{
              "Próximas consultas": {
                nome: (
                  <div>
                    <p style={{ margin: 0 }}>
                      Próximas consultas
                      {consultasProximas.length > 0 && (
                        <span className="badge">{consultasProximas.length}</span>
                      )}
                    </p>
                  </div>
                ),
                conteudo: renderProximasConsultas,
              },
              "Histórico": {
                nome: (
                  <div>
                    <p style={{ margin: 0 }}>
                      Histórico
                      {consultasHistorico.length > 0 && (
                        <span className="badge">{consultasHistorico.length}</span>
                      )}
                    </p>
                  </div>
                ),
                conteudo: renderHistorico,
              },
            }}
          />
        </section>
      </main>

      {modalOpen && psicologoSelecionado && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Reagendar Consulta</h2>
            <h3>{psicologoSelecionado.name}</h3>
            <p>{psicologoSelecionado.specialty}</p>

            <label>Selecione data e horário:</label>
            <input
              type="datetime-local"
              value={dataHoraSelecionada}
              onChange={(e) => setDataHoraSelecionada(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
            />

            <div className="modal-actions">
              <button onClick={() => setModalOpen(false)}>Cancelar</button>
              <button onClick={() => confirmarReagendamento(consultaId)}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
