"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { User, login as apiLogin, logout as apiLogout, signup as apiSignup, me } from "../services/auth";

type Ctx = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, role: User["role"]) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // try restore session from cookie
  useEffect(() => {
    me().then(res => setUser(res.user)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await apiLogin(email, password);
    setUser(res.user);
  };

  const signup = async (email: string, password: string, role: User["role"]) => {
    const res = await apiSignup(email, password, role);
    setUser(res.user);
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
