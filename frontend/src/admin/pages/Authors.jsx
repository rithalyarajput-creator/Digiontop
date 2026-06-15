import { useEffect, useState } from 'react';
import { FiPlus, FiTrash2, FiEdit2 } from 'react-icons/fi';

const STORAGE_KEY = 'digiontop_authors';

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
}
function save(arr) { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }

const EMPTY = { name: '', bio: '', email: '' };

export default function Authors() {
  const [items, setItems] = useState(load);
  const [form, setForm] = useState(EMPTY);
  const [editIdx, setEditIdx] = useState(null);
  const [showForm, setShowForm] = useState(false);

  function startNew() { setForm(EMPTY); setEditIdx(null); setShowForm(true); }
  function startEdit(i) { setForm({ ...items[i] }); setEditIdx(i); setShowForm(true); }

  function handleSave(e) {
    e.preventDefault();
    const next = [...items];
    if (editIdx !== null) next[editIdx] = form;
    else next.push({ ...form, id: Date.now() });
    save(next); setItems(next); setShowForm(false); setForm(EMPTY);
  }

  function remove(i) {
    if (!confirm('Delete author?')) return;
    const next = items.filter((_, idx) => idx !== i);
    save(next); setItems(next);
  }

  return (
    <div>
      <div className="admin-page-head">
        <h1 className="admin-page-title">Authors</h1>
        <button className="admin-btn admin-btn--primary" onClick={startNew}><FiPlus /> Add Author</button>
      </div>

      {showForm && (
        <form className="admin-form admin-form--card" onSubmit={handleSave}>
          <label className="admin-field"><span>Name *</span>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          </label>
          <label className="admin-field"><span>Email</span>
            <input type="email" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} />
          </label>
          <label className="admin-field"><span>Bio</span>
            <textarea rows="3" value={form.bio || ''} onChange={e => setForm({ ...form, bio: e.target.value })} />
          </label>
          <div className="admin-form__actions">
            <button type="button" className="admin-btn" onClick={() => setShowForm(false)}>Cancel</button>
            <button type="submit" className="admin-btn admin-btn--primary">Save</button>
          </div>
        </form>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Email</th><th>Bio</th><th>Actions</th></tr></thead>
          <tbody>
            {items.length === 0 && <tr><td colSpan="4" className="admin-table__empty">No authors yet. Add one above.</td></tr>}
            {items.map((a, i) => (
              <tr key={a.id || i}>
                <td style={{ fontWeight: 700 }}>{a.name}</td>
                <td>{a.email || '—'}</td>
                <td><div className="admin-muted" style={{ maxWidth: 260 }}>{a.bio || '—'}</div></td>
                <td className="admin-actions">
                  <button className="admin-icon-btn" onClick={() => startEdit(i)}><FiEdit2 /></button>
                  <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => remove(i)}><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
