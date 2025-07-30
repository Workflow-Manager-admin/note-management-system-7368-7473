import React, { useState, useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { AuthContext } from "../AuthContext";

/**
 * PUBLIC_INTERFACE
 * LoginPage renders a sign-in form.
 * Props:
 *  - onLogin: func({email, password})
 */
export function LoginPage({ onLogin }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = e => setValues(v => ({ ...v, [e.target.name]: e.target.value }));

  // Try login
  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    const result = await onLogin(values);
    if (!result.success) setError(result.error || "Login failed");
  };

  return (
    <div className="app-root" style={{
      alignItems: "center", justifyContent: "center", minHeight: "100vh", display: "flex"
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          minWidth: 330,
          background: "var(--bg-secondary)",
          borderRadius: "1.3rem",
          padding: "2.6rem 2.4rem 2rem 2.4rem",
          boxShadow: "0 4px 32px rgba(25, 118, 210, 0.11)",
          border: "1.5px solid var(--border-color)",
          display: "flex", flexDirection: "column", alignItems: "stretch",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
          <span className="title" style={{ color: "var(--primary)" }}>📝 NotesApp</span>
          <button
            className="icon-btn"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            style={{ fontSize: "1.18em", color: "var(--primary)" }}
            type="button"
            onClick={toggleTheme}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
        <label htmlFor="email" style={{ fontWeight: 500 }}>Email</label>
        <input
          className="input"
          style={{ marginBottom: "1rem" }}
          type="email"
          name="email"
          id="email"
          required
          autoFocus
          autoComplete="username"
          value={values.email}
          onChange={handleChange}
        />
        <label htmlFor="password" style={{ fontWeight: 500 }}>Password</label>
        <input
          className="input"
          style={{ marginBottom: "1.4rem" }}
          type="password"
          name="password"
          id="password"
          required
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange}
        />
        <button className="btn btn-accent" type="submit" style={{ width: "100%" }}>
          Login
        </button>
        {error &&
          <div style={{ color: "var(--accent)", margin: "1rem 0 0 0", fontWeight: 400 }}>
            {error}
          </div>
        }
      </form>
    </div>
  );
}
