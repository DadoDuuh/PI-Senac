import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscarPerfilPaciente } from "../../api/pacienteApi";
import { agendarConsulta } from "../../api/consultaApi";
import "./Busca.scss";
import { psicologosDisponiveis } from "../../api/psicologoApi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Busca() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [paciente, setPaciente] = useState(null);
  const [psicologos, setPsicologos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [psicologoSelecionado, setPsicologoSelecionado] = useState(null);
  const [dataHoraSelecionada, setDataHoraSelecionada] = useState("");

  // Busca dados do paciente ao carregar a página
  useEffect(() => {
    async function carregarPerfil() {
      try {
        const usuarioId = localStorage.getItem("usuarioId");
        if (!usuarioId) {
          navigate("/login");
          return;
        }
        const dados = await buscarPerfilPaciente(usuarioId);
        setPaciente(dados);
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
        const dadosPsicologos = await psicologosDisponiveis();
        console.log("🔍 Psicólogos do banco:", dadosPsicologos);

        // Mocks:
        const abordagens = [
          "Sistêmica",
          "TCC",
          "Humanista",
          "Cognitivo-Comportamental",
          "Psicanálise",
        ];
        const gerarConsistente = (id, max) => {
          return (id * 7 + 13) % max;
        };

        const psicologosFormatados = dadosPsicologos.map((psi) => ({
          id: psi.id,
          name: psi.nome,
          specialty: psi.especialidade,
          approach: abordagens[gerarConsistente(psi.id, abordagens.length)],
          experience: `${gerarConsistente(psi.id, 30) + 1} anos`,
          image: `https://i.pravatar.cc/300?img=${psi.id}`,
          rating: (4.5 + gerarConsistente(psi.id, 10) / 20).toFixed(1),
          availableSlots: ["Seg 14:00", "Qua 10:00", "Sex 16:00"],
          price: "Gratuito",
          verified: true,
        }));
        console.log("✅ Psicólogos formatados:", psicologosFormatados);
        setPsicologos(psicologosFormatados);
      } catch (error) {
        console.error("Erro ao carregar psicólogos:", error);
      }
    }

    carregarDados();
  }, []);

  const specialties = [
    { value: "all", label: "Todas Especialidades" },
    { value: "Ansiedade e Depressão", label: "Ansiedade e Depressão" },
    { value: "TCC", label: "TCC" },
    { value: "Infantil", label: "Infantil" },
    { value: "Casais e Família", label: "Casais e Família" },
  ];

  const filteredpsicologos = psicologos.filter((psychologist) => {
    const matchesSearch =
      psychologist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      psychologist.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === "all" ||
      psychologist.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  // Abre modal de agendamento
  const handleSchedule = (psychologist) => {
    setPsicologoSelecionado(psychologist);
    setModalOpen(true);
  };

  // Confirmação de agendamento
  const confirmarAgendamento = async () => {
    try {
      if (!dataHoraSelecionada) {
        toast.error("Por favor, selecione uma data e horário");
        return;
      }
      const usuarioId = localStorage.getItem("usuarioId");

      await agendarConsulta(
        usuarioId,
        psicologoSelecionado.id,
        dataHoraSelecionada
      );

      toast.success(
        "Consulta agendada com sucesso! Aguarde a confirmação do psicólogo."
      );

      setModalOpen(false);
      setPsicologoSelecionado(null);
      setDataHoraSelecionada("");

      navigate("/conta/paciente");
    } catch (error) {
      console.error("Erro ao agendar:", error);
      toast.error("Erro ao agendar consulta. Tente novamente.");
    }
  };

  if (loading) {
    return (
      <div className="patient-home">
        <div className="loading-container">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="patient-home">
      <ToastContainer position="top-right" autoClose={2500} />

      <header className="patient-header">
        <div className="container">
          {paciente && <h2>Olá, {paciente.nome}!</h2>}
          <h1>Encontre seu Psicólogo</h1>
          <p className="subtitle">
            Agende sua consulta com um de nossos profissionais voluntários
          </p>

          <div className="search-filter-container">
            <div className="search-bar">
              <i className="fas fa-search"></i>
              <input
                type="text"
                readOnly
                placeholder="Buscar por nome ou especialidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-dropdown">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                {specialties.map((specialty) => (
                  <option key={specialty.value} value={specialty.value}>
                    {specialty.label}
                  </option>
                ))}
              </select>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
        </div>
      </header>

      <main className="psicologos-list">
        <div className="container pt-3 pb-5">
          {filteredpsicologos.length > 0 ? (
            <div className="psicologos-grid">
              {filteredpsicologos.map((psychologist) => (
                <div key={psychologist.id} className="psychologist-card">
                  <div className="psychologist-header">
                    <img
                      src={psychologist.image}
                      alt={psychologist.name}
                      className="psychologist-image"
                    />
                    <div className="psychologist-info">
                      <h3>{psychologist.name}</h3>
                      {psychologist.verified && (
                        <span className="verified-badge">
                          <i className="fas fa-check-circle"></i> Verificado
                        </span>
                      )}
                      <div className="rating">
                        <i className="fas fa-star"></i>
                        <span>{psychologist.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="psychologist-details">
                    <div className="detail-item">
                      <i className="fas fa-briefcase-medical"></i>
                      <span>{psychologist.specialty}</span>
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-graduation-cap"></i>
                      <span>{psychologist.approach}</span>
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-clock"></i>
                      <span>{psychologist.experience} de experiência</span>
                    </div>
                  </div>

                  <div className="availability">
                    <h4>Horários Disponíveis:</h4>
                    <div className="slots-container">
                      {psychologist.availableSlots.map((slot, index) => (
                        <button key={index} className="time-slot">
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="psychologist-footer">
                    <span className="price">{psychologist.price}</span>
                    <button
                      className="btn-schedule"
                      onClick={() => handleSchedule(psychologist)}
                    >
                      Agendar Consulta
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <i className="fas fa-user-md"></i>
              <h3>Nenhum psicólogo encontrado</h3>
              <p>Tente ajustar seus critérios de busca</p>
            </div>
          )}
        </div>
      </main>

      {modalOpen && psicologoSelecionado && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Agendar Consulta</h2>
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
              <button onClick={confirmarAgendamento}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
