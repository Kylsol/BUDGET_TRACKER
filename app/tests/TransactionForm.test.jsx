import { test, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BudgetProvider } from "../src/contexts/BudgetContext.jsx";
import TransactionForm from "../src/components/TransactionForm.jsx";

beforeEach(() => {
  sessionStorage.clear();
  localStorage.clear();
  vi.stubGlobal("crypto", {
    randomUUID: () => "test-id-123"
  });
});

test("adds an expense transaction", async () => {
  const user = userEvent.setup();

  render(
    <BudgetProvider>
      <TransactionForm />
    </BudgetProvider>
  );

  await user.type(screen.getByPlaceholderText(/25.50/i), "45");
  await user.type(screen.getByPlaceholderText(/optional/i), "Groceries");
  await user.click(screen.getByRole("button", { name: /add/i }));

  expect(localStorage.getItem("budget_tracker_v1")).toContain("Groceries");
});