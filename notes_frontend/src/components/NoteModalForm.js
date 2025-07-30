import React, { useState, useEffect } from "react";
import { Modal } from "./Modal";

/**
 * PUBLIC_INTERFACE
 * Modal dialog for creating/editing a note.
 * Props:
 *  - open: boolean
 *  - onClose: func()
 *  - onSubmit: func({title, content, category})
 *  - initial: {title, content, category}
 */
export function NoteModalForm({ open, onClose, onSubmit, initial }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [content, setContent] = useState(initial?.content || "");
  const [category, setCategory] = useState(initial?.category || "");
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(initial?.title || "");
    setContent(initial?.content || "");
    setCategory(initial?.category || "");
    setError("");
  }, [open, initial]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title can't be empty.");
      return;
    }
    onSubmit({ title, content, category });
  };

  return (
    <Modal open={open} onClose={onClose} title={initial ? "Edit Note" : "New Note"}
      actions={
        <>
          <button className="btn btn-accent" type="button" onClick={handleSubmit}>Save</button>
          <button className="btn btn-outline" type="button" onClick={onClose}>Cancel</button>
        </>
      }
    >
      <form onSubmit={handleSubmit} style={{ minWidth: 280, display: "flex", flexDirection: "column" }}>
        <input
          className="input"
          placeholder="Note title"
          autoFocus
          value={title}
          maxLength={64}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          className="input"
          placeholder="Category (folder)"
          value={category}
          maxLength={36}
          onChange={e => setCategory(e.target.value)}
        />
        <textarea
          className="textarea"
          placeholder="Write your note here..."
          rows={7}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        {error && <div style={{ color: "var(--accent)", fontWeight: 400, fontSize: "0.99em" }}>{error}</div>}
      </form>
    </Modal>
  );
}
