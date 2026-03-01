export async function fetchLatestRates(base = "USD") {
  const res = await fetch(`https://api.frankfurter.dev/latest?base=${base}`);
  if (!res.ok) throw new Error("Failed to fetch exchange rates");
  return res.json();
}