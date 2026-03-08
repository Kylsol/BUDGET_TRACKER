import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import { BudgetProvider } from "./contexts/BudgetContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import "./styles/app.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <BudgetProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </BudgetProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);