import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Agendamentos.scss";

export default function Agendamentos() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");

  const appointments = {
    upcoming: [
      {
        id: 1,
        psychologist: "Dra. Ana Silva",
        specialty: "Ansiedade e Depressão",
        date: "15/05/2023",
        time: "14:00",
        duration: "50 min",
        modality: "Online",
        meetingLink: "https://meet.psicoacolher.com/123456",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
      },
      {
        id: 2,
        psychologist: "Dr. Carlos Mendes",
        specialty: "TCC",
        date: "20/05/2023",
        time: "10:30",
        duration: "50 min",
        modality: "Presencial",
        address: "Rua das Flores, 123 - Sala 302",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
      },
    ],
    past: [
      {
        id: 3,
        psychologist: "Dra. Mariana Oliveira",
        specialty: "Infantil",
        date: "01/05/2023",
        time: "16:00",
        duration: "50 min",
        modality: "Online",
        status: "Concluída",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1643297654416-05795d62e39c",
      },
      {
        id: 4,
        psychologist: "Dr. Rafael Costa",
        specialty: "Casais e Família",
        date: "25/04/2023",
        time: "18:00",
        duration: "50 min",
        modality: "Online",
        status: "Cancelada",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d",
      },
    ],
  };

  return (
    <div className="appointments-page">
      <header className="appointments-header">
        <div className="container">
          <h1>Meus Agendamentos</h1>
          <p className="subtitle">
            Acompanhe suas consultas agendadas e histórico
          </p>
        </div>
      </header>

      <main className="appointments-container">
        <div className="container">
          <div className="tabs-container">
            <button
              className={`tab-button ${
                activeTab === "upcoming" ? "active" : ""
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              Próximas Consultas
              <span className="badge">{appointments.upcoming.length}</span>
            </button>
            <button
              className={`tab-button ${activeTab === "past" ? "active" : ""}`}
              onClick={() => setActiveTab("past")}
            >
              Histórico
              <span className="badge">{appointments.past.length}</span>
            </button>
          </div>

          <div className="appointments-list">
            {appointments[activeTab].length > 0 ? (
              appointments[activeTab].map((appointment) => (
                <div key={appointment.id} className="appointment-card">
                  <div className="psychologist-info">
                    <img
                      src={appointment.image}
                      alt={appointment.psychologist}
                      className="psychologist-avatar"
                    />
                    <div className="details">
                      <h3>{appointment.psychologist}</h3>
                      <p className="specialty">{appointment.specialty}</p>
                      <div className="date-time">
                        <i className="fas fa-calendar-alt"></i>
                        <span>
                          {appointment.date} às {appointment.time}
                        </span>
                      </div>
                      <div className="duration">
                        <i className="fas fa-clock"></i>
                        <span>{appointment.duration}</span>
                      </div>
                      <div className="modality">
                        <i
                          className={`fas ${
                            appointment.modality === "Online"
                              ? "fa-video"
                              : "fa-map-marker-alt"
                          }`}
                        ></i>
                        <span>
                          {appointment.modality}
                          {appointment.modality === "Online" ? (
                            <button className="link-button">
                              Acessar sala
                            </button>
                          ) : (
                            <span className="address">
                              {appointment.address}
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="actions">
                    {activeTab === "upcoming" ? (
                      <>
                        <button className="btn-cancel">
                          <i className="fas fa-times"></i> Cancelar
                        </button>
                        <button className="btn-reschedule">
                          <i className="fas fa-calendar-alt"></i> Reagendar
                        </button>
                        {appointment.modality === "Online" && (
                          <button className="btn-start">
                            <i className="fas fa-video"></i> Iniciar Consulta
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="status">
                          <span
                            className={`status-badge ${
                              appointment.status === "Concluída"
                                ? "completed"
                                : "canceled"
                            }`}
                          >
                            {appointment.status}
                          </span>
                          {appointment.rating && (
                            <div className="rating">
                              <i className="fas fa-star"></i>
                              <span>{appointment.rating}</span>
                            </div>
                          )}
                        </div>
                        <button className="btn-feedback">
                          <i className="fas fa-comment-alt"></i> Deixar Feedback
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-appointments">
                <i className="fas fa-calendar-times"></i>
                <h3>
                  Nenhum agendamento{" "}
                  {activeTab === "upcoming" ? "futuro" : "no histórico"}
                </h3>
                <p>
                  {activeTab === "upcoming"
                    ? "Agende sua primeira consulta para começar seu cuidado psicológico"
                    : "Seus agendamentos concluídos aparecerão aqui"}
                </p>
                {activeTab === "upcoming" && (
                  <button
                    className="btn-schedule"
                    onClick={() => navigate("/agendar")}
                  >
                    Agendar Consulta
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
