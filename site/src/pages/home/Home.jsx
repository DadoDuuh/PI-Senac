import React from "react";
import "./Home.scss"; // Arquivo separado para os estilos customizados
import "@fortawesome/fontawesome-free/css/all.min.css";

function Home() {
  return (
    <div className="font-sans text-dark">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h2 className="display-5 fw-bold mb-3">
                Cuidando da sua saúde mental com afeto e profissionalismo
              </h2>
              <p className="lead mb-4">
                Acesso gratuito a psicólogos qualificados para quem precisa de
                apoio emocional mas não pode arcar com os custos tradicionais.
              </p>
              <div className="d-grid gap-2 d-sm-flex">
                <a
                  href="#agendar"
                  className="btn btn-light text-primary fw-bold"
                >
                  Agendar Consulta
                </a>
                <a href="#" className="btn btn-outline-light fw-bold">
                  Saiba Mais
                </a>
              </div>
            </div>
            <div className="col-md-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e"
                alt="Psicóloga conversando com paciente"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5 bg-light">
        <div className="container text-center mb-5">
          <h2 className="fw-bold mb-3">Como Funciona</h2>
          <p className="lead text-secondary">
            Um processo simples para você receber o atendimento psicológico que
            precisa
          </p>
        </div>
        <div className="container">
          <div className="row g-4">
            {[
              {
                icon: "fas fa-user-plus",
                title: "1. Cadastro Simples",
                text: "Faça seu cadastro rápido e informe brevemente sobre suas necessidades para encontrarmos o profissional ideal.",
              },
              {
                icon: "fas fa-calendar-check",
                title: "2. Agendamento",
                text: "Escolha o horário que melhor se adapta à sua rotina entre as disponibilidades dos nossos psicólogos voluntários.",
              },
              {
                icon: "fas fa-video",
                title: "3. Atendimento Online",
                text: "Receba o link da sua sessão por e-mail e converse com seu psicólogo no conforto da sua casa, de forma segura e sigilosa.",
              },
            ].map((step, index) => (
              <div className="col-md-4" key={index}>
                <div className="feature-card p-4 bg-white rounded shadow-sm text-center h-100">
                  <div
                    className="bg-primary bg-opacity-10 rounded-circle d-inline-flex justify-content-center align-items-center mb-3"
                    style={{ width: "64px", height: "64px" }}
                  >
                    <i className={`${step.icon} text-primary fs-4`}></i>
                  </div>
                  <h5 className="fw-bold">{step.title}</h5>
                  <p className="text-muted">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Psicólogos */}
      <section className="py-5">
        <div className="container text-center mb-5">
          <h2 className="fw-bold mb-3">Nossos Psicólogos Voluntários</h2>
          <p className="lead text-secondary">
            Profissionais qualificados e comprometidos com o bem-estar emocional
          </p>
        </div>
        <div className="container">
          <div className="row g-4">
            {[
              {
                name: "Dra. Ana Silva",
                subtitle: "Psicóloga Clínica",
                image:
                  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
                tags: ["Ansiedade", "Depressão", "Autoestima"],
                stars: 4.5,
                description:
                  "Especialista em ansiedade e depressão, com abordagem humanista e 10 anos de experiência clínica.",
              },
              {
                name: "Dr. Carlos Mendes",
                subtitle: "Psicólogo Cognitivo-Comportamental",
                image:
                  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                tags: ["TCC", "Fobias", "Estresse"],
                stars: 5,
                description:
                  "Especializado em TCC para transtornos de ansiedade e fobias, com foco em soluções práticas.",
              },
              {
                name: "Dra. Mariana Oliveira",
                subtitle: "Psicóloga Infantil",
                image:
                  "https://images.unsplash.com/photo-1643297654416-05795d62e39c?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                tags: ["Crianças", "Família", "Atenção"],
                stars: 4.5,
                description:
                  "Atua com foco em crianças e adolescentes, promovendo o desenvolvimento emocional saudável em ambiente familiar.",
              },
            ].map((prof, index) => (
              <div className="col-md-4" key={index}>
                <div className="psychologist-card bg-white rounded shadow-sm overflow-hidden h-100">
                  <img
                    src={prof.image}
                    alt={prof.name}
                    className="w-100"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h5 className="fw-bold">{prof.name}</h5>
                        <p className="text-primary mb-1">{prof.subtitle}</p>
                      </div>
                      <div className="text-warning">
                        {[...Array(Math.floor(prof.stars))].map((_, i) => (
                          <i key={i} className="fas fa-star"></i>
                        ))}
                        {prof.stars % 1 !== 0 && (
                          <i className="fas fa-star-half-alt"></i>
                        )}
                      </div>
                    </div>
                    <p className="text-muted">{prof.description}</p>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {prof.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="badge bg-primary bg-opacity-10 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a href="#agendar" className="btn btn-primary w-100">
                      Agendar Consulta
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-5 bg-light">
        <div className="container text-center mb-5">
          <h2 className="fw-bold mb-3">Depoimentos</h2>
          <p className="lead text-secondary">
            O que nossos usuários dizem sobre o PsicoAcolher
          </p>
        </div>
        <div className="container">
          <div className="row g-4 justify-content-center">
            {[
              {
                name: "Juliana Martins",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
                text: "O atendimento foi humanizado e me ajudou muito a enfrentar momentos difíceis. Recomendo demais!",
              },
              {
                name: "Lucas Pereira",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
                text: "Encontrei profissionais qualificados e consegui agendar a consulta com facilidade, mesmo com minha rotina corrida.",
              },
              {
                name: "Ana Clara",
                image: "https://randomuser.me/api/portraits/women/68.jpg",
                text: "O serviço gratuito fez toda a diferença para mim, que não tinha condições de pagar um psicólogo particular.",
              },
            ].map((depo, index) => (
              <div className="col-md-4" key={index}>
                <div className="testimonial-card bg-white p-4 rounded shadow-sm h-100 d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={depo.image}
                      alt={depo.name}
                      className="rounded-circle me-3"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                    />
                    <h6 className="mb-0 fw-bold">{depo.name}</h6>
                  </div>
                  <p className="text-muted flex-grow-1">"{depo.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
