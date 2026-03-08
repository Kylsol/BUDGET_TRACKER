const API_BASE =
  import.meta.env.VITE_EXCHANGE_API_BASE || "https://api.frankfurter.dev";

/**
 * Fetch latest exchange rates using the Frankfurter API
 * @param {string} base - Base currency (default: USD)
 * @returns {Promise<Object>} Exchange rate data
 */
export async function fetchLatestRates(base = "USD") {
  try {
    const url = `${API_BASE}/latest?base=${encodeURIComponent(base)}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Exchange rate request failed (${res.status})`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Frankfurter API error:", err);
    throw err;
  }
}