# Technology Capacity & Budget Forecasting Tool

A **MERN-based decision support platform** that helps leadership answer:

> **“Can we deliver this with our current capacity and budget?”**

The system models **capacity, demand, cost, and risk** across multiple scenarios (Normal / Best / Worst) to support **strategic hiring, vendor, and budget decisions**.

---

## 🔴 Business Problem

Engineering leadership and finance teams often struggle with:
- Lack of visibility into future delivery capacity
- Reactive hiring decisions
- Budget overruns
- No structured way to simulate best/worst-case scenarios

This leads to:
- Missed delivery timelines
- Unplanned vendor spending
- Poor resource utilization

---

## 🧠 Solution Overview

This project provides a **forward-looking capacity and budget forecasting engine** that:
- Models **skill-based demand vs capacity**
- Calculates **delivery gaps**
- Recommends **Hire / Vendor / Absorb**
- Forecasts **monthly & total cost**
- Simulates **Best / Normal / Worst case scenarios**
- Visualizes everything in an **executive dashboard**

---

## ✨ Key Features

### 📊 Capacity Planning
- Skill-wise capacity calculation using utilization
- Multi-skill employee support

### 📈 Demand Forecasting
- Project-based demand modeling
- Monthly PM (person-month) demand by skill

### ⚖️ Gap Analysis
- Demand vs capacity comparison
- Risk classification (LOW / MEDIUM / HIGH)

### 🧠 Hiring vs Vendor Decisions
- Rule-based recommendations
- Hiring lead time awareness
- Short-term vs long-term demand logic

### 💰 Cost Forecasting
- Monthly & total cost calculation
- Employee vs vendor cost comparison
- Configurable cost multipliers

### 🔮 Scenario Simulation
- NORMAL / BEST / WORST case simulations
- Capacity degradation or improvement
- Cost inflation or optimization

### 🎯 Executive Dashboard
- KPI summary cards
- Capacity vs Demand charts
- Cost breakdown charts
- Scenario toggle

---

## 🏗️ System Architecture

### High-Level Architecture

┌───────────────┐
│ React UI │
│ (Dashboard) │
└───────▲───────┘
│ REST API
┌───────┴───────┐
│ Node.js + │
│ Express API │
└───────▲───────┘
│
┌───────┴────────────────────────────┐
│ Business Logic Engines │
│ │
│ Capacity Engine │
│ Demand Engine │
│ Gap Analysis Engine │
│ Decision Engine │
│ Cost Forecast Engine │
│ Scenario Simulation Engine │
└───────▲────────────────────────────┘
│
┌───────┴───────┐
│ MongoDB │
│ (Employees, │
│ Projects, │
│ Configs) │
└───────────────┘


---

### Mermaid Diagram (GitHub-supported)

```mermaid
graph TD
    UI[React Dashboard]
    API[Node.js + Express]
    CAP[Capacity Engine]
    DEM[Demand Engine]
    GAP[Gap Engine]
    DEC[Decision Engine]
    COST[Cost Engine]
    SCN[Scenario Engine]
    DB[(MongoDB)]

    UI --> API
    API --> CAP
    API --> DEM
    CAP --> GAP
    DEM --> GAP
    GAP --> DEC
    DEC --> COST
    COST --> SCN
    SCN --> API
    API --> DB

🧩 Tech Stack
Frontend

React

Axios

Recharts

Backend

Node.js

Express

Mongoose

Database

MongoDB


tech-capacity-forecasting/
│
├── backend/
│   ├── node_modules/
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── assumptions.js
│   │   │
│   │   ├── engines/
│   │   │   ├── capacity.engine.js
│   │   │   ├── cost.engine.js
│   │   │   ├── decision.engine.js
│   │   │   ├── demand.engine.js
│   │   │   ├── gap.engine.js
│   │   │   └── scenario.engine.js
│   │   │
│   │   ├── models/
│   │   │   ├── CostConfig.js
│   │   │   ├── Employee.js
│   │   │   ├── ProjectDemand.js
│   │   │   └── Scenario.js
│   │   │
│   │   ├── routes/
│   │   │   └── forecast.routes.js
│   │   │
│   │   └── app.js
│   │
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── node_modules/
│   │
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   │
│   ├── src/
│   │   ├── components/
│   │   │   └── Dashboard.js
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   │
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
├── employees.json
├── project_demands.json
│
└── README.md


🚀 How to Run Locally
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm start


Open in browser:

http://localhost:3000


## 📌 Configurable Assumptions

- **Default utilization:** 80%
- **Hiring lead time:** 2 months
- **Vendor cost multiplier:** 1.8×
- **Forecast horizon:** 6 months

---

## 🎯 Use Cases

- Engineering capacity planning  
- Budget and cost forecasting  
- Hiring roadmap planning  
- Vendor vs in-house decision making  
- PMO / CTO reporting dashboards  
- Scenario-based strategic planning  

---

## 🧠 What This Project Demonstrates

- Business-first engineering mindset  
- Strong system design and architecture  
- Clean separation of concerns  
- Data-driven decision modeling  
- End-to-end MERN stack development  
- Executive-level dashboarding  
