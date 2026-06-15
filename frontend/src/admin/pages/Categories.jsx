import { useState } from 'react';
import { FiPlus, FiTrash2, FiEdit2 } from 'react-icons/fi';

const STORAGE_KEY = 'digiontop_categories';
const DEFAULTS = ['General', 'SEO', 'Social Media', 'Website Development', 'E-Commerce', 'Digital Marketing', 'Case Study'];

function load() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return stored || DEFAULTS.map((n, i) => ({ id: i + 1, name: n }));
  } catch { return DEFAULTS.map((n, i) => ({ id: i + 1, name: n })); }
}
function save(arr) { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }

export default function Categories() {
  const [items, setItems] = useState(load);
  const [newName, setNewName] = useState('');
  const [editIdx, setEditIdx] = useState(null);
  const [editName, setEditName] = useState('');

  function add(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    const next = [...items, { id: Date.now(), name: newName.trim() }];
    save(next); setItems(next); setNewName('');
  }

  function startEdit(i) { setEditIdx(i); setEditName(items[i].name); }

  function saveEdit(i) {
    if (!editName.trim()) return;
    const next = items.map((c, idx) => idx === i ? { ...c, name: editName.trim() } : c);
    save(next); setItems(next); setEditIdx(null);
  }

  function remove(i) {
    if (!confirm('Delete category?')) return;
    const next = items.filter((_, idx) => idx !== i);
    save(next); setItems(next);
  }

  return (
    <div>
      <div className="admin-page-head">
        <h1 className="admin-page-title">Categories</h1>
      </div>

      <form className="admin-form admin-form--card" onSubmit={add} style={{ maxWidth: 480 }}>
        <h2 className="admin-section-title" style={{ marginTop: 0 }}>Add New Category</h2>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            className="admin-field"
            style={{ flex: 1, padding: '10px 14px', border: '1px solid #e0e0e0', borderRadius: 8, fontSize: 14 }}
            placeholder="Category name..."
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <button type="submit" className="admin-btn admin-btn--primary"><FiPlus /> Add</button>
        </div>
      </form>

      <div className="admin-table-wrap" style={{ marginTop: 20 }}>
        <table className="admin-table">
          <thead><tr><th>#</th><th>Category Name</th><th>Actions</th></tr></thead>
          <tbody>
            {items.length === 0 && <tr><td colSpan="3" className="admin-table__empty">No categories.</td></tr>}
            {items.map((c, i) => (
              <tr key={c.id}>
                <td style={{ color: '#888', width: 40 }}>{i + 1}</td>
                <td>
                  {editIdx === i ? (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input
                        style={{ padding: '6px 10px', border: '1px solid #F5A800', borderRadius: 6, fontSize: 14 }}
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        autoFocus
                      />
                      <button className="admin-btn admin-btn--primary" style={{ padding: '6px 14px' }} onClick={() => saveEdit(i)}>Save</button>
                      <button className="admin-btn" style={{ padding: '6px 14px' }} onClick={() => setEditIdx(null)}>Cancel</button>
                    </div>
                  ) : (
                    <span style={{ fontWeight: 600 }}>{c.name}</span>
                  )}
                </td>
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
