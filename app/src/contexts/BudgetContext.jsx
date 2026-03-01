import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const BudgetContext = createContext(null);

export const currencyOptions = ["USD", "ZAR", "EUR", "GBP", "JPY", "AUD", "CAD"];
export const expenseCategories = ["Food", "Transport", "Rent", "Entertainment", "Other"];

const STORAGE_KEY = "budget_tracker_v1";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);

    // basic shape validation (avoid app crashes if storage is corrupted)
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

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota / privacy mode errors
  }
}

export function BudgetProvider({ children }) {
  const loaded = loadState();

  const [transactions, setTransactions] = useState(loaded?.transactions ?? []);
  const [settings, setSettings] = useState(loaded?.settings ?? { baseCurrency: "USD" });

  // Persist whenever state changes
  useEffect(() => {
    saveState({ transactions, settings });
  }, [transactions, settings]);

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