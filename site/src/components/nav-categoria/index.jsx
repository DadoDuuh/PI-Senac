import { useState } from "react";
import "./index.scss";

export default function NavCategoria({ categorias }) {
  const nomesCategorias = Object.keys(categorias);

  const [categoriaAtiva, setCategoriaAtiva] = useState(nomesCategorias[0]);

  const handleCategoriaClick = (nome) => {
    setCategoriaAtiva(nome);
  };

  return (
    <div className="nav-categoria">
      <div className="tabs">
        {nomesCategorias.map((nome) => (
          <button
            key={nome}
            className={`tab ${categoriaAtiva === nome ? "active" : ""}`}
            onClick={() => handleCategoriaClick(nome)}
          >
            {categorias[nome].nome}
          </button>
        ))}
      </div>

      <div className="conteudo-categoria">
        {categorias[categoriaAtiva].conteudo()}
      </div>
    </div>
  );
}
