import React, { useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * Modal dialog wrapper. Uses portal patterns and accessibility best practices.
 * Renders dialog with children and basic header/actions.
 * Props:
 *  - open: boolean (show/hide)
 *  - onClose: () => void
 *  - title: modal title
 *  - children: modal body
 *  - actions: node (footer actions/buttons)
 */
export function Modal({ open, onClose, title, children, actions }) {
  useEffect(() => {
    // Close on ESC
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose} style={{zIndex:9999}}>
      <div className="modal" tabIndex={-1} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={title || "Dialog"}>
        {title && <div className="modal-header">{title}</div>}
        <div className="modal-content">{children}</div>
        {actions && <div className="modal-actions">{actions}</div>}
      </div>
    </div>
  );
}
