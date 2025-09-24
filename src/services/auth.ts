import api from "../lib/api";

export type User = { id: string; email: string; role: "buyer" | "seller" };

export async function signup(email: string, password: string, role: User["role"]) {
  const { data } = await api.post("/auth/signup", { email, password, role });
  return data as { user: User; message: string };
}

export async function login(email: string, password: string) {
  const { data } = await api.post("/auth/login", { email, password });
  return data as { user: User; message: string };
}

export async function logout() {
  const { data } = await api.post("/auth/logout");
  return data as { message: string };
}

export async function me() {
  const { data } = await api.get("/auth/me"); 
  return data as { user: User };
}
