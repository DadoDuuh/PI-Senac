import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home.jsx";
import Login from "./pages/loginUsuario/Login.jsx";
import Cadastro from "./pages/cadastro/Cadastro.jsx";
import PaginaUsuario from "./pages/paginaUsuario/PaginaUsuario.jsx";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login/usuario" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/paginaUsuario" element={<PaginaUsuario />} />
    </Routes>
  );
}
