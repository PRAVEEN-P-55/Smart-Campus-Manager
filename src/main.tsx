import React from "react";
import { createRoot } from "react-dom/client";
import { campusSummary } from "./data/campusData";
import "./styles.css";

function App() {
  return (
    <main className="app-page">
      <section className="app-container app-panel">
        <div className="app-panel-header">
          <div>
            <p className="app-eyebrow">PS-1 Smart Campus Management Platform</p>
            <h1 className="app-title text-balance">Smart Campus Manager</h1>
            <p className="app-copy">
              The design system foundation is ready for a clean, responsive campus SaaS
              dashboard.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="app-button-primary">Primary action</button>
            <button className="app-button-secondary">Secondary</button>
          </div>
        </div>

        <div className="app-card-grid">
          {[
            ["Students", campusSummary.studentCount.toLocaleString("en-IN"), "app-badge-info"],
            ["Faculty", campusSummary.facultyCount.toLocaleString("en-IN"), "app-badge-success"],
            ["Events", campusSummary.activeEvents.toLocaleString("en-IN"), "app-badge-warning"],
            ["Alerts", campusSummary.unreadNotifications.toLocaleString("en-IN"), "app-badge-danger"]
          ].map(([label, value, badgeClass]) => (
            <article className="app-stat-card" key={label}>
              <span className={`app-badge ${badgeClass}`}>Foundation</span>
              <p className="mt-4 text-sm font-semibold text-muted">{label}</p>
              <p className="mt-1 text-3xl font-bold">{value}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
