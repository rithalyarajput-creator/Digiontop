import { useEffect, useState } from 'react';
import { FiPlus, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { apiGet, apiPost, apiPut, apiDelete } from '../api';

const EMPTY = { name: '', email: '', bio: '', avatar_url: '' };

export default function Authors() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      setItems(await apiGet('/authors'));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function startNew() { setForm(EMPTY); setEditId(null); setShowForm(true); }
  function startEdit(a) { setForm({ ...EMPTY, ...a }); setEditId(a.id); setShowForm(true); }

  async function handleSave(e) {
    e.preventDefault();
    try {
      if (editId) {
        const updated = await apiPut('/authors', { id: editId, ...form });
        setItems((prev) => prev.map((x) => (x.id === editId ? updated : x)));
      } else {
        const created = await apiPost('/authors', form);
        setItems((prev) => [...prev, created].sort((a, b) => a.name.localeCompare(b.name)));
      }
      setShowForm(false);
      setForm(EMPTY);
      setEditId(null);
    } catch (err) {
      alert(err.message);
    }
  }

  async function remove(a) {
    if (!confirm('Delete author?')) return;
    try {
      await apiDelete(`/authors?id=${a.id}`);
      setItems((prev) => prev.filter((x) => x.id !== a.id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <div className="admin-page-head">
        <h1 className="admin-page-title">Authors</h1>
        <button className="admin-btn admin-btn--primary" onClick={startNew}><FiPlus /> Add Author</button>
      </div>

      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      {showForm && (
        <form className="admin-form admin-form--card" onSubmit={handleSave}>
          <label className="admin-field"><span>Name *</span>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </label>
          <label className="admin-field"><span>Email</span>
            <input type="email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label className="admin-field"><span>Avatar URL</span>
            <input value={form.avatar_url || ''} onChange={(e) => setForm({ ...form, avatar_url: e.target.value })} placeholder="https://…" />
          </label>
          <label className="admin-field"><span>Bio</span>
            <textarea rows="3" value={form.bio || ''} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          </label>
          <div className="admin-form__actions">
            <button type="button" className="admin-btn" onClick={() => { setShowForm(false); setEditId(null); }}>Cancel</button>
            <button type="submit" className="admin-btn admin-btn--primary">Save</button>
          </div>
        </form>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Email</th><th>Bio</th><th>Actions</th></tr></thead>
          <tbody>
            {loading && <tr><td colSpan="4" className="admin-table__empty">Loading…</td></tr>}
            {!loading && items.length === 0 && <tr><td colSpan="4" className="admin-table__empty">No authors yet. Add one above.</td></tr>}
            {items.map((a) => (
              <tr key={a.id}>
                <td style={{ fontWeight: 700 }}>{a.name}</td>
                <td>{a.email || '—'}</td>
                <td><div className="admin-muted" style={{ maxWidth: 260 }}>{a.bio || '—'}</div></td>
                <td className="admin-actions">
                  <button className="admin-icon-btn" onClick={() => startEdit(a)}><FiEdit2 /></button>
                  <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => remove(a)}><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
