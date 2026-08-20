import type { Role } from "../data/campusData";

const apiBaseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type LoginResult = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: Role;
    department?: string;
    status: string;
  };
};

export async function fetchApiHealth() {
  const response = await fetch(`${apiBaseUrl}/health`);
  if (!response.ok) {
    throw new Error("API health check failed.");
  }
  return response.json() as Promise<ApiResponse<{ service: string; timestamp: string }>>;
}

export async function loginWithBackend(email: string, password: string) {
  const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Backend login failed.");
  }

  return response.json() as Promise<ApiResponse<LoginResult>>;
}

export { apiBaseUrl };
