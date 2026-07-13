import { useEffect } from 'react';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

/**
 * Replacement for window.confirm() — a styled modal that matches the admin panel.
 *
 * Usage (with the useConfirm hook below):
 *   const { confirm, dialog } = useConfirm();
 *   ...
 *   if (!(await confirm({ title: 'Delete this post?', danger: true }))) return;
 *   ...
 *   return (<div>…{dialog}</div>);
 */
export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  message = '',
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  danger = true,
  onConfirm,
  onCancel,
}) {
  // Escape closes; Enter confirms.
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === 'Escape') onCancel();
      if (e.key === 'Enter') onConfirm();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onConfirm, onCancel]);

  if (!open) return null;

  return (
    <div className="admin-confirm" onClick={onCancel}>
      <div className="admin-confirm__box" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button type="button" className="admin-confirm__close" onClick={onCancel} aria-label="Close">
          <FiX />
        </button>

        <div className={`admin-confirm__icon${danger ? ' admin-confirm__icon--danger' : ''}`}>
          <FiAlertTriangle />
        </div>

        <h3 className="admin-confirm__title">{title}</h3>
        {message && <p className="admin-confirm__text">{message}</p>}

        <div className="admin-confirm__actions">
          <button type="button" className="admin-sbtn" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`admin-sbtn ${danger ? 'admin-sbtn--danger' : 'admin-sbtn--primary'}`}
            onClick={onConfirm}
            autoFocus
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
