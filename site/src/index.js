import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import Routes from "./routes.js";
import Main from "./components/main-padrao/Main.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Main>
        <Routes />
      </Main>
    </BrowserRouter>
  </React.StrictMode>
);
