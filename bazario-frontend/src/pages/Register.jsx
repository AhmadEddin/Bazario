import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name,email, password, role}),
      });
       if (!res.ok) {
        setError( "registration failed");
        return;
      }
      else {
        alert("Registration successful!");
      navigate("/login");
      }
     
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="page-container">
      <div className="form-card">
        <h1 className="page-title">
          Create Account at <span className="brand-text">Bazario</span>
        </h1>
        <p className="page-subtitle">Join us and start shopping</p>

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="input-field"
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="input-field"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input-field"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="role">
              Account Type
            </label>
            <select
              id="role"
              className="select-field"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <button type="submit" className="primary-btn">
            Create Account
          </button>
        </form>

        <p className="footer-text">
          Already have an account?{" "}
          <span className="text-link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}