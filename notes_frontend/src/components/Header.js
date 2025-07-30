import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { AuthContext } from "../AuthContext";

/**
 * PUBLIC_INTERFACE
 * App header/navbar: brand, navigation, theme toggle, user info
 */
export function Header({ onLogout }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  return (
    <header className="header" data-testid="app-header">
      <div style={{ display: "flex", alignItems: "center" }}>
        <span title="Notes" style={{
          fontWeight: 700, fontSize: "1.75rem", color: "var(--primary)", letterSpacing: "-1.5px"
        }}>📝 NotesApp</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
        <button
          className="icon-btn"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          data-testid="toggle-theme"
          style={{ fontSize: "1.25em", color: "var(--primary)" }}
          onClick={toggleTheme}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        {user &&
          <span style={{ color: "var(--text-secondary)", fontWeight: 500, marginRight: "0.8em" }}>
            Hello, {user.name}
          </span>
        }
        {user &&
          <button className="btn btn-outline" style={{ fontSize: "1em", padding: "0.35em 1em" }} onClick={onLogout}>
            Logout
          </button>
        }
      </div>
    </header>
  );
}
