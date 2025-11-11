import "./Conta.scss";
import lapisIcon from "../../../assets/images/lapis-icon.svg";

export default function ContaUsuario() {
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

          <div className="tabs">
            <button className="tab active">Próximas consultas</button>
            <button className="tab">
              Histórico <span className="badge">2</span>
            </button>
          </div>

          <div className="consulta-card">
            <div className="profissional-info">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2"
                alt="Foto Dra Ana"
                className="foto-profissional"
              />
              <div>
                <h3>Dra. Ana Silva</h3>
                <p className="especialidade">Ansiedade e Depressão</p>
                <p className="data">
                  <i className="icon-calendar"></i> 15/05/2023 às 14:00
                </p>
                <p className="info">50 min · Online - PsicoAcolher</p>
              </div>
            </div>

            <div className="acoes">
              <button className="btn-cancelar">Cancelar</button>
              <button className="btn-reagendar">Reagendar</button>
              <button className="btn-iniciar">Iniciar consulta</button>
              <button className="btn-chat">Acessar chat</button>
            </div>
          </div>

          <div className="consulta-card">
            <div className="profissional-info">
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d"
                alt="Foto Dr Carlos"
                className="foto-profissional"
              />
              <div>
                <h3>Dr. Carlos Mendes</h3>
                <p className="especialidade">Ansiedade e Depressão</p>
                <p className="data">
                  <i className="icon-calendar"></i> 15/05/2023 às 14:00
                </p>
                <p className="info">
                  50 min · Presencial - Rua das Flores, 195
                </p>
              </div>
            </div>

            <div className="acoes">
              <button className="btn-cancelar">Cancelar</button>
              <button className="btn-reagendar">Reagendar</button>
              <button className="btn-chat">Acessar chat</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
