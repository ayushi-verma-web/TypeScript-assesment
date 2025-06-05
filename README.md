# Rick & Morty Info App

This is a simple single-page application built with **React 18**, **TypeScript**, and **Vite** that fetches and displays paginated character data from the [Rick & Morty API](https://rickandmortyapi.com/documentation). It supports routing, server state management, and state persistence using the **TanStack** suite.

### 🚀 Live Demo

🔗 [rickmortyinfoapp.netlify.app](https://rickmortyinfoapp.netlify.app)

---

## ✨ Features

- ✅ Paginated character listing
- ✅ Persistent page state via URL (survives refresh + shareable links)
- ✅ Character details view on separate route
- ✅ Refresh button to re-fetch current page
- ✅ Responsive layout using Tailwind CSS
- ✅ Type-safe API integration

---

## 🛠 Tech Stack

- **React 18**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **TanStack Query** – for data fetching & caching
- **TanStack Table** – for dynamic table rendering
- **TanStack Router** – for routing (planned / partially used)
- **Rick and Morty API** – public REST API

---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/rick-morty-info-app.git
cd rick-morty-info-app

# Install dependencies
npm install

# Run the dev server
npm run dev
