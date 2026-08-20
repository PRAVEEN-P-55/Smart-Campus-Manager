import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <section className="mx-auto max-w-5xl rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
          PS-1 Smart Campus Management Platform
        </p>
        <h1 className="mt-3 text-3xl font-bold">Smart Campus Manager</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          React, TypeScript, Vite, and Tailwind are scaffolded. Feature work starts in
          the next milestone.
        </p>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
