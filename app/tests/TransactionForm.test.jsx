import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Transactions from "../src/pages/Transactions.jsx";
import { BudgetProvider } from "../src/contexts/BudgetContext.jsx";

test("adds a transaction and shows it in the list", async () => {
  const user = userEvent.setup();

  render(
    <BudgetProvider>
      <MemoryRouter>
        <Transactions />
      </MemoryRouter>
    </BudgetProvider>
  );

  await user.type(screen.getByLabelText(/amount/i), "10");
  await user.click(screen.getByRole("button", { name: /add/i }));

  expect(screen.getByText(/10\.00/i)).toBeInTheDocument();
});