import React, { createContext, useState, useEffect, useCallback } from "react";

// PUBLIC_INTERFACE
export const ThemeContext = createContext();

/**
 * ThemeProvider for switching between light/dark themes and updating CSS custom properties.
 * Sets --primary, --secondary, --accent colors based on theme.
 */
export function ThemeProvider({ children }) {
  // Use system preference as initial theme, or default to light
  const [theme, setTheme] = useState(() => {
    const stored = window.localStorage.getItem("theme");
    if (stored) return stored;
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  // PUBLIC_INTERFACE
  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);

    // Set brand-specific colors via custom properties
    const root = document.documentElement;
    // palette per provided reqs:
    // Blue: #1976d2 (primary), Pink: #ff4081 (accent), Gray: #424242 (secondary)
    root.style.setProperty("--primary", "#1976d2");
    root.style.setProperty("--accent", "#ff4081");
    root.style.setProperty("--secondary", "#424242");

    // For dark theme, adapt text background
    if (theme === "dark") {
      root.style.setProperty("--bg-primary", "#181a1b");
      root.style.setProperty("--bg-secondary", "#23272a");
      root.style.setProperty("--text-primary", "#ffffff");
      root.style.setProperty("--text-secondary", "#9ca3af");
      root.style.setProperty("--note-bg", "#23272a");
      root.style.setProperty("--input-bg", "#22254b");
    } else {
      root.style.setProperty("--bg-primary", "#fff");
      root.style.setProperty("--bg-secondary", "#f8f9fa");
      root.style.setProperty("--text-primary", "#191b22");
      root.style.setProperty("--text-secondary", "#424242");
      root.style.setProperty("--note-bg", "#f4f6fa");
      root.style.setProperty("--input-bg", "#f4f6fa");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
