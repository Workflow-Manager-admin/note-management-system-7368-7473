import React, { useContext } from "react";
import "./App.css";
import "./theme.css";
import { ThemeProvider } from "./ThemeContext";
import { AuthProvider, AuthContext } from "./AuthContext";
import { NotesProvider } from "./NotesContext";
import { LoginPage } from "./pages/LoginPage";
import { NotesPage } from "./pages/NotesPage";

/**
 * PUBLIC_INTERFACE
 * The main App component for NotesApp.
 * Handles authentication, note context, and routing.
 */
function App() {
  // Consume auth context for login status
  const { isAuthenticated, login } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <LoginPage onLogin={login} />;
  }
  return (
    <NotesProvider>
      <NotesPage />
    </NotesProvider>
  );
}

// PUBLIC_INTERFACE
// Wrap with Theme and Auth providers. (Entry point for index.js)
function AppWithProviders() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default AppWithProviders;
