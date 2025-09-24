'use client';
import { useEffect, useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

type User = { id: string; email: string; role: 'buyer' | 'seller' };

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'buyer'|'seller'>('buyer');
  const [log, setLog] = useState<string>('');

  async function call(path: string, opts: RequestInit = {}) {
    const res = await fetch(`${API}${path}`, {
      ...opts,
      headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
      credentials: 'include', // send/receive httpOnly cookie
    });
    const text = await res.text();
    let data: any = text;
    try { data = JSON.parse(text); } catch {}
    if (!res.ok) throw new Error(data?.message || String(text));
    return data;
  }

  async function loadMe() {
    try {
      const d = await call('/auth/me');
      setUser(d.user);
      setLog('Loaded session via /auth/me');
    } catch (e: any) {
      setUser(null);
      setLog(`Not logged in (${e.message})`);
    }
  }

  async function doSignup(e: React.FormEvent) {
    e.preventDefault();
    try {
      const d = await call('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, role }),
      });
      setUser(d.user);
      setLog('Signed up + logged in');
    } catch (e: any) {
      setLog(`Signup failed: ${e.message}`);
    }
  }

  async function doLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const d = await call('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setUser(d.user);
      setLog('Logged in');
    } catch (e: any) {
      setLog(`Login failed: ${e.message}`);
    }
  }

  async function doLogout() {
    try {
      await call('/auth/logout', { method: 'POST' });
      setUser(null);
      setLog('Logged out');
    } catch (e: any) {
      setLog(`Logout failed: ${e.message}`);
    }
  }

  async function loadProducts() {
    try {
      const d = await call('/products');
      setLog(`Products OK: ${Array.isArray(d) ? d.length : 0} items`);
    } catch (e: any) {
      setLog(`Products failed: ${e.message}`);
    }
  }

  useEffect(() => { loadMe(); }, []);

  return (
    <main style={{ maxWidth: 520, margin: '32px auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Bazario – Auth Test</h1>

      <section style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8, marginBottom: 16 }}>
        <p><b>Status:</b> {user ? `Logged in as ${user.email} (${user.role})` : 'Guest (not logged in)'}</p>
        <button onClick={loadMe} style={{ marginRight: 8 }}>Check /auth/me</button>
        <button onClick={loadProducts}>Call /products</button>
      </section>

      <form onSubmit={doSignup} style={{ display: 'grid', gap: 8, padding: 12, border: '1px solid #ddd', borderRadius: 8, marginBottom: 16 }}>
        <h3>Signup</h3>
        <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <select value={role} onChange={e=>setRole(e.target.value as 'buyer'|'seller')}>
          <option value="buyer">buyer</option>
          <option value="seller">seller</option>
        </select>
        <button type="submit">Create account</button>
      </form>

      <form onSubmit={doLogin} style={{ display: 'grid', gap: 8, padding: 12, border: '1px solid #ddd', borderRadius: 8, marginBottom: 16 }}>
        <h3>Login</h3>
        <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>

      <button onClick={doLogout}>Logout</button>

      <pre style={{ whiteSpace: 'pre-wrap', background: '#fafafa', padding: 12, marginTop: 16, borderRadius: 8 }}>
        {log}
      </pre>
    </main>
  );
}
