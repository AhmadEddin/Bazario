"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";

export default function SignupPage() {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [err, setErr] = useState("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    try {
      await signup(email, password, role);
      router.push("/");
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <main style={{ maxWidth: 360, margin: "40px auto" }}>
      <h1>Signup</h1>
      <form onSubmit={onSubmit}>
        <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <select value={role} onChange={e => setRole(e.target.value as any)}>
          <option value="buyer">buyer</option>
          <option value="seller">seller</option>
        </select>
        <button type="submit">Create account</button>
        {err && <p style={{color:"crimson"}}>{err}</p>}
      </form>
    </main>
  );
}
