import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "./AuthContext";

// PUBLIC_INTERFACE
export const NotesContext = createContext();

const fakeApi = {
  // Simulate backend with localStorage
  getNotes: (userEmail) =>
    Promise.resolve(
      (JSON.parse(localStorage.getItem("notes-" + userEmail)) || [])
        .sort((a, b) => (b.updatedAt || b.createdAt) - (a.updatedAt || a.createdAt))
    ),
  saveNotes: (userEmail, notes) => {
    localStorage.setItem("notes-" + userEmail, JSON.stringify(notes));
    return Promise.resolve();
  }
};

/**
 * NotesProvider manages notes for the currently authenticated user.
 * Provides functions for CRUD and search.
 */
export function NotesProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load notes for this user
  useEffect(() => {
    let cancelled = false;
    if (user && user.email) {
      setLoading(true);
      fakeApi.getNotes(user.email).then((data) => {
        if (!cancelled) setNotes(Array.isArray(data) ? data : []);
        setLoading(false);
      });
    } else {
      setNotes([]);
    }
    return () => { cancelled = true; };
  }, [user]);

  // PUBLIC_INTERFACE
  const createNote = useCallback(async ({ title, content, category }) => {
    const now = Date.now();
    const id = "note-" + now + Math.random().toString(16).slice(2);
    const newNote = { id, title: title || "Untitled", content, category: category || "", createdAt: now, updatedAt: now };
    const updated = [newNote, ...notes];
    setNotes(updated);
    await fakeApi.saveNotes(user.email, updated);
    return newNote;
  }, [notes, user]);

  // PUBLIC_INTERFACE
  const updateNote = useCallback(async (noteId, { title, content, category }) => {
    const now = Date.now();
    setNotes((prev) => {
      const upd = prev.map(note =>
        note.id === noteId
          ? { ...note, title, content, category, updatedAt: now }
          : note
      );
      fakeApi.saveNotes(user.email, upd);
      return upd;
    });
  }, [user]);

  // PUBLIC_INTERFACE
  const deleteNote = useCallback(async (noteId) => {
    setNotes((prev) => {
      const filtered = prev.filter(note => note.id !== noteId);
      fakeApi.saveNotes(user.email, filtered);
      return filtered;
    });
  }, [user]);

  // PUBLIC_INTERFACE
  const searchNotes = useCallback((query) => {
    if (!query || query.trim() === "") return notes;
    const ql = query.toLowerCase();
    return notes.filter(
      note =>
        note.title.toLowerCase().includes(ql) ||
        note.content.toLowerCase().includes(ql) ||
        (note.category || "").toLowerCase().includes(ql)
    );
  }, [notes]);

  // PUBLIC_INTERFACE
  const getCategories = useCallback(() => {
    // Unique categories from notes
    const cats = [...new Set(notes.map(n => n.category).filter(Boolean))];
    return ["All", ...cats];
  }, [notes]);

  return (
    <NotesContext.Provider value={{
      notes, loading,
      createNote,
      updateNote,
      deleteNote,
      searchNotes,
      getCategories,
    }}>
      {children}
    </NotesContext.Provider>
  );
}
