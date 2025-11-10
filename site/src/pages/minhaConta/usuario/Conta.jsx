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
        <p>teste</p>
      </main>
    </div>
  );
}
