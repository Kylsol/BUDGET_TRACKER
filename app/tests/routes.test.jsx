import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../src/App.jsx";
import { BudgetProvider } from "../src/contexts/BudgetContext.jsx";
import { AuthProvider } from "../src/contexts/AuthContext.jsx";

function renderAt(path) {
  return render(
    <AuthProvider>
      <BudgetProvider>
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>
      </BudgetProvider>
    </AuthProvider>
  );
}

test("redirects guests to login for protected route", () => {
  renderAt("/");
  expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
});

test("renders register route", () => {
  renderAt("/register");
  expect(screen.getByRole("heading", { name: /register/i })).toBeInTheDocument();
});