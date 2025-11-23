import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Cadastro from "./pages/cadastro/Cadastro.jsx";
import Busca from "./pages/busca/Busca.jsx";
import Paciente from "./pages/conta/paciente/Paciente.jsx";
import Psicologo from "./pages/conta/psicologo/Psicologo.jsx";
import ChatScreen from "./pages/chat/Chat.jsx";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/busca" element={<Busca />} />
      <Route path="/conta/paciente" element={<Paciente />} />
      <Route path="/conta/psicologo" element={<Psicologo />} />
      <Route path="/chat" element={<ChatScreen />} />
    </Routes>
  );
}
