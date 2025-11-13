import "./Conta.scss";
import lapisIcon from "../../../assets/images/lapis-icon.svg";
import NavCategoria from "../../../components/nav-categoria";

export default function ContaUsuario() {
  const consultasProximas = [
    {
      id: 1,
      nome: "Dra. Ana Silva",
      especialidade: "Ansiedade e Depressão",
      data: "15/05/2023 às 14:00",
      duracao: "50 min",
      tipo: "Online - PsicoAcolher",
      foto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
      acoes: ["Cancelar", "Reagendar", "Iniciar consulta", "Acessar chat"],
    },
    {
      id: 2,
      nome: "Dr. Carlos Mendes",
      especialidade: "Ansiedade e Depressão",
      data: "15/05/2023 às 14:00",
      duracao: "50 min",
      tipo: "Presencial - Rua das Flores, 195",
      foto: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
      acoes: ["Cancelar", "Reagendar", "Acessar chat"],
    },
  ];

  const consultasHistorico = [
    {
      id: 101,
      nome: "Dra. Fernanda Lima",
      especialidade: "Terapia Cognitiva",
      data: "28/03/2023 às 10:00",
      duracao: "50 min",
      tipo: "Online - PsicoAcolher",
      foto: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
      status: "Finalizada",
      acoes: ["Ver detalhes", "Repetir consulta", "Avaliar"],
    },
    {
      id: 102,
      nome: "Dr. João Pereira",
      especialidade: "Psicanálise",
      data: "10/03/2023 às 09:00",
      duracao: "50 min",
      tipo: "Presencial - Av. Paulista, 900",
      foto: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
      status: "Finalizada",
      acoes: ["Ver detalhes", "Repetir consulta", "Avaliar"],
    },
  ];

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
                <p className="especialidade">{consulta.especialidade}</p>
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
                  ✔ {consulta.status}
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
            <h1>Fulano da Silva</h1>
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
                    <p style={{ margin: 0 }}>Próximas consultas</p>
                  </div>
                ),
                conteudo: renderProximasConsultas,
              },
              Histórico: {
                nome: (
                  <div>
                    <p style={{ margin: 0 }}>
                      Histórico <span className="badge">2</span>
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
