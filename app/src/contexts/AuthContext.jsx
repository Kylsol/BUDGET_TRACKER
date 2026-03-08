import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const AUTH_KEY = "budget_tracker_auth_v1";
const SESSION_MINUTES = 60;

function loadAuth() {
  try {
    const raw = sessionStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);

    if (!parsed || typeof parsed !== "object") return null;

    if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
      sessionStorage.removeItem(AUTH_KEY);
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function saveAuth(data) {
  try {
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(data));
  } catch {
    // ignore storage errors
  }
}

export function AuthProvider({ children }) {
  const loaded = loadAuth();

  const [user, setUser] = useState(loaded?.user ?? null);
  const [token, setToken] = useState(loaded?.token ?? null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user && token) {
      saveAuth({
        user,
        token,
        expiresAt: Date.now() + SESSION_MINUTES * 60 * 1000,
      });
    } else {
      sessionStorage.removeItem(AUTH_KEY);
    }
  }, [user, token]);

  function register({ name, email, password, role = "user" }) {
    setError("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      return false;
    }

    const fakeToken = `demo-jwt-${crypto.randomUUID()}`;

    setUser({
      name: name.trim(),
      email: email.trim(),
      role,
    });
    setToken(fakeToken);
    return true;
  }

  function login({ email, password }) {
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return false;
    }

    const fakeToken = `demo-jwt-${crypto.randomUUID()}`;

    setUser({
      name: "Demo User",
      email: email.trim(),
      role: email.trim().toLowerCase() === "admin@budgettracker.com" ? "admin" : "user",
    });
    setToken(fakeToken);
    return true;
  }

  function logout() {
    setUser(null);
    setToken(null);
    setError("");
    sessionStorage.removeItem(AUTH_KEY);
  }

  const isAuthenticated = !!user && !!token;

  const value = useMemo(
    () => ({
      user,
      token,
      error,
      isAuthenticated,
      register,
      login,
      logout,
    }),
    [user, token, error, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}