import React, { useState, useContext, useMemo, useCallback } from "react";
import { AuthContext } from "../AuthContext";
import { NotesContext } from "../NotesContext";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { NotesList } from "../components/NotesList";
import { NoteModalForm } from "../components/NoteModalForm";

/**
 * PUBLIC_INTERFACE
 * Main notes page (post-login): sidebar, header, search, CRUD, modals
 */
export function NotesPage() {
  const { logout } = useContext(AuthContext);
  const {
    notes, loading,
    createNote, updateNote, deleteNote, searchNotes, getCategories,
  } = useContext(NotesContext);

  // State for UI controls
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalNote, setModalNote] = useState(null);

  const filteredNotes = useMemo(() => {
    let items = notes;
    if (selectedCategory !== "All") {
      items = items.filter(note => (note.category || "") === selectedCategory);
    }
    items = search ? searchNotes(search) : items;
    return items;
  }, [notes, searchNotes, search, selectedCategory]);

  // Handlers
  const handleAdd = () => {
    setModalNote(null);
    setShowModal(true);
  };
  const handleEdit = note => {
    setModalNote(note);
    setShowModal(true);
  };
  const handleDelete = async note => {
    if (window.confirm("Delete this note?")) {
      await deleteNote(note.id);
      setSelected(null);
    }
  };
  const handleModalSubmit = async (data) => {
    if (modalNote) {
      await updateNote(modalNote.id, data);
      setShowModal(false);
      setModalNote(null);
    } else {
      await createNote(data);
      setShowModal(false);
    }
  };

  return (
    <div className="app-root">
      <Header onLogout={logout} />
      <div className="body-flex" style={{ flex: 1, minHeight: 0 }}>
        <Sidebar
          categories={getCategories()}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          onAddNote={handleAdd}
        />
        <main className="main-content" role="main" style={{ flex: 1 }}>
          <NotesList
            notes={filteredNotes}
            selectedId={selected?.id}
            onSelect={setSelected}
            onEdit={handleEdit}
            onDelete={handleDelete}
            searchQuery={search}
            onSearch={setSearch}
          />
        </main>
      </div>
      <NoteModalForm
        open={showModal}
        onClose={() => { setShowModal(false); setModalNote(null); }}
        onSubmit={handleModalSubmit}
        initial={modalNote}
      />
    </div>
  );
}
