import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * NotesList displays a search bar and a grid of NoteCards.
 * Props:
 *  - notes: array of note objects
 *  - onSelect: func(note)
 *  - selectedId: selected note id
 *  - onEdit: func(note)
 *  - onDelete: func(note)
 *  - searchQuery: string
 *  - onSearch: func(query)
 */
export function NotesList({
  notes, onSelect, selectedId, onEdit, onDelete, searchQuery, onSearch
}) {
  const [input, setInput] = useState(searchQuery || "");

  const handleInput = e => {
    setInput(e.target.value);
    onSearch && onSearch(e.target.value);
  };

  return (
    <div style={{ width: "100%", flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: "1.6rem" }}>
        <input
          className="input"
          style={{ maxWidth: 360, flex: 1 }}
          type="search"
          placeholder="Search notes..." aria-label="Search notes"
          value={input}
          onChange={handleInput}
        />
        <span style={{ color: "var(--text-secondary)", fontSize: "0.98em" }}>
          {notes.length} note{notes.length !== 1 && "s"}
        </span>
      </div>
      <div style={{
        display: "flex", flexWrap: "wrap", gap: "1.2rem 1rem", alignItems: "flex-start"
      }}>
        {notes.length === 0
          ? <div style={{ color: "var(--text-secondary)", marginTop: "2.4em" }}>No notes found.</div>
          : notes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              selected={selectedId === note.id}
              onClick={() => onSelect(note)}
              onEdit={() => onEdit(note)}
              onDelete={() => onDelete(note)}
            />
          ))
        }
      </div>
    </div>
  );
}

function NoteCard({ note, selected, onClick, onEdit, onDelete }) {
  const created = new Date(note.createdAt);
  const updated = note.updatedAt && note.updatedAt !== note.createdAt
    ? new Date(note.updatedAt)
    : null;
  return (
    <div
      className={`note-card${selected ? " selected" : ""}`}
      tabIndex={0}
      onClick={onClick}
      role="button"
      aria-pressed={selected}
      aria-label={`Note: ${note.title}`}
      data-testid="note-card"
    >
      <div className="note-title">{note.title}</div>
      <div className="note-meta">
        <span style={{ marginRight: "0.8rem" }}>🗂 {note.category || "Uncategorized"}</span>
        <span style={{ color: "var(--text-secondary)" }}>
          {updated
            ? "Edited " + updated.toLocaleString()
            : "Created " + created.toLocaleString()}
        </span>
      </div>
      <div className="note-content">
        {(note.content || "").slice(0, 160)}
        {note.content && note.content.length > 160 && "…"}
      </div>
      <div className="note-actions">
        <button className="note-action-btn" title="Edit" aria-label="Edit Note" onClick={e => { e.stopPropagation(); onEdit(); }}>✏️</button>
        <button className="note-action-btn" title="Delete" aria-label="Delete Note" onClick={e => { e.stopPropagation(); onDelete(); }}>🗑️</button>
      </div>
    </div>
  );
}
