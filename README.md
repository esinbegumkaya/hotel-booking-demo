# Hotel Booking Demo (Selenium)

Simple hotel booking demo application designed for **API and Selenium UI automation testing**.

This project was created as part of an academic test automation assignment and focuses on
stable UI structure, mock APIs, and testability rather than visual design.

---

## Features

- Simple hotel booking flow
- Mock REST API using `json-server`
- Selenium-friendly UI with stable `data-testid` attributes
- No authentication, popups, or dynamic DOM
- Suitable for both **local execution** and **public deployment**

---

## Local Development

### Local URLs
- UI: http://localhost:3000
- Mock API: http://localhost:3001

### Requirements
- Node.js 16+ (Node 18+ recommended)

### Install & Run

```bash
npm install
npm run api      # starts json-server on port 3001
npm run ui       # serves the static UI on port 3000

# Or run both together:
npm run dev
