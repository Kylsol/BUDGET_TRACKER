# Budget Tracker (React SPA)

A responsive **budget tracking single-page application (SPA)** built with **React, React Router, and Context API**.
The application allows users to record income and expenses, view summarized totals, and compare exchange rates using a public API.

This project was developed as a **frontend capstone project** and demonstrates modern React development practices including authentication, protected routes, API integration, testing, and deployment.

---

# Live Demo

**Live Application (Vercel)**
[https://your-vercel-link.vercel.app](https://your-vercel-link.vercel.app)

**GitHub Repository**
[https://github.com/Kylsol/BUDGET_TRACKER](https://github.com/Kylsol/BUDGET_TRACKER)

---

# Project Purpose

Many people do not consistently track their spending. Transactions happen throughout the day, and it becomes difficult to understand where money is going.

This application solves that problem by providing a **simple and lightweight budgeting interface** where users can:

• Record income and expense transactions
• View totals grouped by currency
• Filter spending by category
• Compare exchange rates for different currencies

The application focuses on **clarity and simplicity**, making it suitable for students and young adults who want an easy way to monitor their finances.

---

# Key Features

### Transaction Management

Users can add and delete transactions including:

• income or expense type
• amount
• currency
• category
• optional notes

Transactions are stored locally so data persists between sessions.

---

### Dashboard

The dashboard provides a quick overview of:

• total income and expenses
• totals grouped by currency
• number of recorded transactions

This allows users to quickly see their financial activity.

---

### Insights (Exchange Rates)

The Insights page connects to the **Frankfurter Exchange Rates API** to display current currency exchange rates.

Users can compare their base currency against other currencies.

---

### Profile Settings

The profile page allows users to:

• select a base currency for transactions
• clear stored transactions
• view account role information

Admin users have permission to clear all stored transactions.

---

### Authentication

The application includes a frontend authentication flow.

Users can:

• register a new account
• log in
• log out

Protected routes ensure that only authenticated users can access the budgeting features.

---

### Role-Based Permissions

Two user roles exist:

User
Standard access to all budgeting features.

Admin
Additional permission to clear all transactions.

Role information is stored in authentication state and used to control access to certain actions.

---

# Application Routes

| Route           | Description                |
| --------------- | -------------------------- |
| `/login`        | User login page            |
| `/register`     | User registration page     |
| `/`             | Dashboard overview         |
| `/transactions` | Add and view transactions  |
| `/insights`     | Currency exchange insights |
| `/profile`      | User settings              |
| `*`             | 404 Not Found page         |

Protected routes require authentication before access.

---

# Technology Stack

Frontend Framework
React (Vite)

Routing
React Router

State Management
React Context API

Programming Language
JavaScript

Styling
CSS (mobile-first responsive design)

Testing
Vitest
React Testing Library

API Integration
Frankfurter Exchange Rates API

Deployment
Vercel

Version Control
Git + GitHub

---

# State Management Architecture

The application uses both **global state and local state**.

### Global State (React Context)

AuthContext
Manages authentication state including:

• current user
• token
• authentication status
• user role
• login and logout functions

BudgetContext
Manages financial data including:

• transactions
• categories
• currency settings
• transaction creation and deletion

---

### Local Component State

Local state is used for UI-specific data such as:

• form inputs
• filter selections
• loading states
• API response data
• error messages

This combination keeps the application organized while allowing components to remain reusable.

---

# API Integration

This project integrates the **Frankfurter Exchange Rates API**.

API Base URL
[https://api.frankfurter.dev](https://api.frankfurter.dev)

Example endpoint

```
https://api.frankfurter.dev/latest?base=USD
```

The Insights page fetches exchange rates and displays conversions relative to the selected base currency.

---

# Security Considerations

The application includes several frontend security practices.

• user input validation
• avoidance of unsafe HTML rendering
• authentication token stored in session storage
• logout clears authentication state
• protected routes prevent unauthorized access

Because this project is **frontend-only**, authentication is implemented as a demonstration of token-based authentication concepts. A production application would require a backend service to securely issue and validate JWT tokens.

---

# Testing

Testing is implemented using **Vitest and React Testing Library**.

The test suite verifies:

• protected route behavior
• authentication validation
• transaction form functionality

Run tests with:

```
npm run test
```

---

# Installation and Setup

Clone the repository

```
git clone https://github.com/Kylsol/BUDGET_TRACKER.git
```

Navigate to the project folder

```
cd BUDGET_TRACKER/app
```

Install dependencies

```
npm install
```

Run the development server

```
npm run dev
```

The application will run at

```
http://localhost:5173
```

---

# Deployment

The application is deployed using **Vercel**.

Deployment configuration includes:

• automatic builds from GitHub
• SPA routing configuration
• production build optimization

Vercel automatically rebuilds the application when new commits are pushed to the repository.

---

# Project Structure

```
src
  components
    Header.jsx
    Nav.jsx
    ProtectedRoute.jsx
    TransactionForm.jsx
    TransactionItem.jsx

  contexts
    AuthContext.jsx
    BudgetContext.jsx

  pages
    Dashboard.jsx
    Transactions.jsx
    Insights.jsx
    Profile.jsx
    Login.jsx
    Register.jsx
    NotFound.jsx

  styles
    app.css

tests
  routes.test.jsx
  auth.test.jsx
  TransactionForm.test.jsx
```

---

# Known Limitations

• authentication is simulated in the frontend
• transactions are stored in local storage rather than a database
• editing existing transactions is not yet implemented

---

# Future Improvements

Possible enhancements include:

• backend API with real JWT authentication
• database persistence for user data
• recurring transactions
• advanced financial analytics
• category spending charts
• multi-user budgeting features

---

# Author

Kyle Solomons
Software Engineering / Graphic Design

GitHub
[https://github.com/Kylsol](https://github.com/Kylsol)