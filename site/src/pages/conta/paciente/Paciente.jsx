import "./Paciente.scss";
import lapisIcon from "../../../assets/images/lapis-icon.svg";
import NavCategoria from "../../../components/nav-categoria";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscarPerfilPaciente } from "../../../api/pacienteApi";
import { buscarConsultasPaciente, cancelarConsulta } from "../../../api/consultaApi";


export default function Paciente() {
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const usuarioId = localStorage.getItem('usuarioId');
        if (!usuarioId) {
          navigate('/login');
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
        alert("Erro ao carregar seus dados");
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, [navigate]);

  // Separa consultas em próximas e históricas
  const consultasProximas = consultas.filter(c =>
      c.status === 'confirmado' && new Date(c.data_hora) > new Date()
  );

  const consultasHistorico = consultas.filter(c =>
      c.status === 'confirmado' && new Date(c.data_hora) <= new Date()
  );

  const handleCancelar = async (agendamentoId) => {
    if (!window.confirm("Tem certeza que deseja cancelar esta consulta?")) {
      return;
    }

    try {
      await cancelarConsulta(agendamentoId);
      alert("Consulta cancelada com sucesso!");

      // Recarrega as consultas
      const usuarioId = localStorage.getItem('usuarioId');
      const dadosConsultas = await buscarConsultasPaciente(usuarioId);
      setConsultas(dadosConsultas);
    } catch (error) {
      console.error("Erro ao cancelar:", error);
      alert("Erro ao cancelar consulta");
    }
  };

  const handleIniciarConsulta = (linkAtendimento) => {
    if (linkAtendimento) {
      window.open(linkAtendimento, '_blank');
    } else {
      alert("Link de atendimento ainda não foi enviado pelo psicólogo");
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

  function renderProximasConsultas() {
    if (consultasProximas.length === 0) {
      return (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#665' }}>
            <p>Você não tem consultas agendadas.</p>
            <button
                onClick={() => navigate('/busca')}
                style={{
                  marginTop: '1rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
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

  function renderHistorico() {
    if (consultasHistorico.length === 0) {
      return (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#665' }}>
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
                    <p className="especialidade">{consulta.especialidade}</p>
                    <p className="data">
                      <i className="icon-calendar"></i> {formatarDataHora(consulta.data_hora)}
                    </p>
                    <p className="info">
                      50 min · {consulta.link_atendimento ? 'Online' : 'Presencial'}
                    </p>
                    <p className="info" style={{ marginTop: "6px", color: "#6c757d" }}>
                      ✔ Finalizada
                    </p>
                  </div>
                </div>

                <div className="acoes">
                  <button
                      className="btn-ver-detalhes"
                      onClick={() => alert('Funcionalidade em desenvolvimento')}
                  >
                    Ver detalhes
                  </button>
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
              <h1>{paciente?.nome || "Paciente"}</h1>
              <p className="subtitle">Membro desde 2022</p>
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
                  Histórico: {
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
      </div>
  );
}