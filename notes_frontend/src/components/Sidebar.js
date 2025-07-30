import React from "react";

/**
 * PUBLIC_INTERFACE
 * Sidebar listing categories/folders. Emits category click or add note action.
 * Props:
 *  - categories: array of category strings ("All" ... )
 *  - selected: currently selected category
 *  - onSelect: func(category)
 *  - onAddNote: func()
 */
export function Sidebar({ categories, selected, onSelect, onAddNote }) {
  return (
    <aside className="sidebar" data-testid="sidebar">
      <div>
        <button className="btn" style={{ width: "90%", margin: "0 5% 1rem 5%" }}
          onClick={() => onAddNote()} data-testid="sidebar-add-btn">
          ＋ Add Note
        </button>
      </div>
      <nav style={{ display: "flex", flexDirection: "column", padding: "0 1rem" }}>
        {categories.map(cat => (
          <SidebarCategory
            key={cat}
            label={cat}
            selected={cat === selected}
            onClick={() => onSelect(cat)}
          />
        ))}
      </nav>
    </aside>
  );
}

function SidebarCategory({ label, selected, onClick }) {
  return (
    <button
      className="btn"
      style={{
        background: selected ? "var(--primary)" : "transparent",
        color: selected ? "#fff" : "var(--text-primary)",
        marginBottom: "0.55rem",
        border: "none",
        fontWeight: 500,
        padding: "0.65rem 1rem",
        boxShadow: selected ? "0 2px 8px var(--primary, #1976d2)16" : "none",
        cursor: "pointer",
        borderRadius: "0.45rem",
        fontSize: "1rem",
        transition: "background 0.16s"
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
