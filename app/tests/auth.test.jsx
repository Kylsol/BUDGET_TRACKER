import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../src/contexts/AuthContext.jsx";
import Login from "../src/pages/Login.jsx";

test("shows validation error when login fields are empty", async () => {
  const user = userEvent.setup();

  render(
    <AuthProvider>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </AuthProvider>
  );

  await user.click(screen.getByRole("button", { name: /login/i }));
  expect(screen.getByText(/email and password are required/i)).toBeInTheDocument();
});