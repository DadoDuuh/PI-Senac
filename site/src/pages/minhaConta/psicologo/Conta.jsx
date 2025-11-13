import "./Conta.scss";
import lapisIcon from "../../../assets/images/lapis-icon.svg";
import NavCategoria from "../../../components/nav-categoria";

export default function ContaPsicologo() {
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
  ];

  const usuarioObj = {
    id: 1,
    nome: "Fulana da Silva",
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
                  ✔ Finalizada
                </p>
              </div>
            </div>

            <div className="acoes">
              <button className="btn-ver-detalhes">Ver detalhes</button>
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
                conteudo: () => <p>Em desenvolvimento...</p>,
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
    </div>
  );
}
