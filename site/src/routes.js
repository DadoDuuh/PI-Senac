import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home.jsx";
import Login from "./pages/loginUsuario/Login.jsx";
import Cadastro from "./pages/cadastro/Cadastro.jsx";
import PaginaPaciente from "./pages/paginaPaciente/PaginaPaciente.jsx";
import Agendamentos from "./pages/Agendamentos/Agendamentos.jsx";
import ContaPaciente from "./pages/minhaConta/paciente/ContaPaciente.jsx";
import ContaPsicologo from "./pages/minhaConta/psicologo/ContaPsicologo.jsx";
import ChatScreen from "./pages/chat/Chat.jsx";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/paginaPaciente" element={<PaginaPaciente />} />
      <Route path="/Agendamentos" element={<Agendamentos />} />
      <Route path="/conta/paciente" element={<ContaPaciente />} />
      <Route path="/conta/psicologo" element={<ContaPsicologo />} />
      <Route path="/chat" element={<ChatScreen />} />
    </Routes>
  );
}
