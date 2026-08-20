import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 4000);
const appUrl = process.env.APP_URL ?? "http://localhost:5173";

app.use(
  cors({
    origin: appUrl,
    credentials: true,
  })
);
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({
    success: true,
    message: "Smart Campus Manager API is healthy.",
    data: {
      service: "smart-campus-manager-backend",
      timestamp: new Date().toISOString(),
    },
  });
});

app.get("/api", (_request, response) => {
  response.json({
    success: true,
    message: "Smart Campus Manager API",
    data: {
      version: "0.1.0",
      modules: [
        "auth",
        "users",
        "attendance",
        "assignments",
        "events",
        "placements",
        "announcements",
        "notifications",
        "analytics",
        "activity-logs",
      ],
    },
  });
});

app.use((_request, response) => {
  response.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

app.listen(port, () => {
  console.log(`Smart Campus Manager API running on http://localhost:${port}`);
});
