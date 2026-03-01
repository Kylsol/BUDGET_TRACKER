# Budget Tracker (React SPA) — MVP

A simple budget tracker single-page application (SPA) built with React.  
Users can add income/expense transactions, view totals by currency, change base currency preferences, and compare exchange rates using a public API.

## Purpose / Problem
Tracking spending and income gets messy fast when you have multiple transactions and currencies. This MVP provides a clean workflow to record transactions and view summarized totals, while also showing live exchange-rate comparisons for the user’s selected base currency.

## Technologies Used
- React (Vite)
- React Router (multi-route SPA)
- React Context API (global state)
- JavaScript
- CSS (mobile-first responsive styling)
- Vitest + React Testing Library (basic unit tests)
- Public REST API: Frankfurter (exchange rates)

## Features (MVP)
- Add transactions (income/expense) with amount + currency
- Expense categories (categories hidden for income)
- Dashboard totals grouped by currency
- Profile: change base currency (default for new transactions)
- Insights: compare exchange rates (base currency → selected currency)
- Local persistence using `localStorage` (transactions + settings)
- 4+ routes + 404 page
- Basic tests for routes and transaction add flow

## Routes
- `/` — Dashboard
- `/transactions` — Add + view transactions
- `/insights` — Exchange-rate comparison
- `/profile` — Base currency settings
- `*` — Not Found

## API Integration
**Frankfurter API (Public REST)**
- Base URL: `https://api.frankfurter.dev/v1`
- Endpoint used: `/latest?base=USD` (base currency changes dynamically)
- Used on the Insights page to display live conversion rates.

## Getting Started (Local Setup)
1) Install dependencies:
```bash
npm install