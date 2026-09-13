import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import "../src/styles/variables.css";
import "../src/styles/globals.css";
import { AuthProvider } from "./context/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <BrowserRouter>

      <AuthProvider>
        <App></App>
      </AuthProvider>

    </BrowserRouter>

  </React.StrictMode>
);