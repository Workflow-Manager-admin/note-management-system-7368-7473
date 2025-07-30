import React, { createContext, useState, useEffect, useCallback } from "react";

// PUBLIC_INTERFACE
export const AuthContext = createContext();

/**
 * AuthProvider for managing user authentication state.
 * Uses localStorage to persist session (mock for demo).
 * Exposes: user, login, logout, isAuthenticated
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // On mount, check localStorage for session:
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // PUBLIC_INTERFACE
  const login = useCallback(async ({ email, password }) => {
    // Fake API - replace with real auth API logic as needed
    if (email && password) {
      const mockUser = { email, name: email.split("@")[0] };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      return { success: true };
    }
    return { success: false, error: "Email/password required" };
  }, []);

  // PUBLIC_INTERFACE
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
