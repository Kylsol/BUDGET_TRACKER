import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { BudgetProvider } from "./contexts/BudgetContext.jsx";
import "./styles/app.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BudgetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BudgetProvider>
  </React.StrictMode>
);