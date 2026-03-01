import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../src/App.jsx";
import { BudgetProvider } from "../src/contexts/BudgetContext.jsx";

function renderAt(path) {
  return render(
    <BudgetProvider>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </BudgetProvider>
  );
}

test("renders Dashboard route", () => {
  renderAt("/");
  expect(screen.getByRole("heading", { name: /dashboard/i })).toBeInTheDocument();
});

test("renders NotFound on unknown route", () => {
  renderAt("/this-route-does-not-exist");
  expect(screen.getByRole("heading", { name: /not found/i })).toBeInTheDocument();
});