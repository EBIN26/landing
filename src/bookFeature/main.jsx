// webb/landing/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PlayProvider } from "./contexts/Play";
import "./index.css";
import { BrowserRouter } from "react-router-dom"; // <-- Import

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- Wrap App */}
      <PlayProvider>
        <App />
      </PlayProvider>
    </BrowserRouter>
  </React.StrictMode>
);