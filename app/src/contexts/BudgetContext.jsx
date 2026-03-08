import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext.jsx";

const BudgetContext = createContext(null);

export const currencyOptions = ["USD", "ZAR", "EUR", "GBP", "JPY", "AUD", "CAD"];
export const expenseCategories = ["Food", "Transport", "Rent", "Entertainment", "Other"];

function getStorageKey(user) {
  if (user?.email) {
    return `budget_tracker_${user.email}`;
  }
  return "budget_tracker_guest";
}

function loadState(storageKey) {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    if (!parsed || typeof parsed !== "object") return null;

    return {
      transactions: Array.isArray(parsed.transactions) ? parsed.transactions : [],
      settings:
        parsed.settings && typeof parsed.settings === "object"
          ? { baseCurrency: parsed.settings.baseCurrency || "USD" }
          : { baseCurrency: "USD" },
    };
  } catch {
    return null;
  }
}

function saveState(storageKey, state) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    // ignore quota / privacy mode errors
  }
}

export function BudgetProvider({ children }) {
  const { user } = useAuth();

  const storageKey = useMemo(() => getStorageKey(user), [user]);

  const [transactions, setTransactions] = useState([]);
  const [settings, setSettings] = useState({ baseCurrency: "USD" });

  useEffect(() => {
    const loaded = loadState(storageKey);

    setTransactions(loaded?.transactions ?? []);
    setSettings(loaded?.settings ?? { baseCurrency: "USD" });
  }, [storageKey]);

  useEffect(() => {
    saveState(storageKey, { transactions, settings });
  }, [storageKey, transactions, settings]);

  function addTransaction(tx) {
    setTransactions((prev) => [{ ...tx, id: crypto.randomUUID() }, ...prev]);
  }

  function deleteTransaction(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  function updateBaseCurrency(baseCurrency) {
    setSettings((prev) => ({ ...prev, baseCurrency }));
  }

  function clearAll() {
    setTransactions([]);
  }

  const value = useMemo(
    () => ({
      transactions,
      settings,
      expenseCategories,
      currencyOptions,
      addTransaction,
      deleteTransaction,
      updateBaseCurrency,
      clearAll,
    }),
    [transactions, settings]
  );

  return <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>;
}

export function useBudget() {
  const ctx = useContext(BudgetContext);
  if (!ctx) throw new Error("useBudget must be used within BudgetProvider");
  return ctx;
}