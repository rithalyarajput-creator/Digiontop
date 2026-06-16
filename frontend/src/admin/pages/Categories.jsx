import { useEffect, useState } from 'react';
import { FiPlus, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { apiGet, apiPost, apiPut, apiDelete } from '../api';

export default function Categories() {
  const [items, setItems] = useState([]);
  const [newName, setNewName] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      setItems(await apiGet('/categories'));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function add(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    try {
      const created = await apiPost('/categories', { name: newName.trim() });
      setItems((prev) => [...prev, created].sort((a, b) => a.name.localeCompare(b.name)));
      setNewName('');
    } catch (err) {
      alert(err.message);
    }
  }

  function startEdit(c) { setEditId(c.id); setEditName(c.name); }

  async function saveEdit(c) {
    if (!editName.trim()) return;
    try {
      const updated = await apiPut('/categories', { id: c.id, name: editName.trim() });
      setItems((prev) => prev.map((x) => (x.id === c.id ? updated : x)));
      setEditId(null);
    } catch (err) {
      alert(err.message);
    }
  }

  async function remove(c) {
    if (!confirm('Delete category?')) return;
    try {
      await apiDelete(`/categories?id=${c.id}`);
      setItems((prev) => prev.filter((x) => x.id !== c.id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <div className="admin-page-head">
        <h1 className="admin-page-title">Categories</h1>
      </div>

      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      <form className="admin-form admin-form--card" onSubmit={add} style={{ maxWidth: 480 }}>
        <h2 className="admin-section-title" style={{ marginTop: 0 }}>Add New Category</h2>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            style={{ flex: 1, padding: '10px 14px', border: '1px solid #e0e0e0', borderRadius: 8, fontSize: 14 }}
            placeholder="Category name..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button type="submit" className="admin-btn admin-btn--primary"><FiPlus /> Add</button>
        </div>
      </form>

      <div className="admin-table-wrap" style={{ marginTop: 20 }}>
        <table className="admin-table">
          <thead><tr><th>#</th><th>Category Name</th><th>Slug</th><th>Actions</th></tr></thead>
          <tbody>
            {loading && <tr><td colSpan="4" className="admin-table__empty">Loading…</td></tr>}
            {!loading && items.length === 0 && <tr><td colSpan="4" className="admin-table__empty">No categories.</td></tr>}
            {items.map((c, i) => (
              <tr key={c.id}>
                <td style={{ color: '#888', width: 40 }}>{i + 1}</td>
                <td>
                  {editId === c.id ? (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input
                        style={{ padding: '6px 10px', border: '1px solid #F5A800', borderRadius: 6, fontSize: 14 }}
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        autoFocus
                      />
                      <button className="admin-btn admin-btn--primary" style={{ padding: '6px 14px' }} onClick={() => saveEdit(c)}>Save</button>
                      <button className="admin-btn" style={{ padding: '6px 14px' }} onClick={() => setEditId(null)}>Cancel</button>
                    </div>
                  ) : (
                    <span style={{ fontWeight: 600 }}>{c.name}</span>
                  )}
                </td>
                <td style={{ color: '#888' }}>{c.slug || '—'}</td>
                <td className="admin-actions">
                  <button className="admin-icon-btn" onClick={() => startEdit(c)}><FiEdit2 /></button>
                  <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => remove(c)}><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
