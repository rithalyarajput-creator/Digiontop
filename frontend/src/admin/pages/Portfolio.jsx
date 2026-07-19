import { useEffect, useState } from 'react';
import { FiTrash2, FiEdit2, FiPlus } from 'react-icons/fi';
import { apiGet, apiPost, apiPut, apiDelete } from '../api';
import { useConfirm } from '../components/useConfirm';

const EMPTY = {
  title: '', category: 'General', description: '',
  image_url: '', client_name: '', results: '', is_featured: false,
};

export default function Portfolio() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const { confirm, dialog } = useConfirm();

  async function load() {
    try { setItems(await apiGet('/portfolio')); }
    catch (err) { setError(err.message); }
  }
  useEffect(() => { load(); }, []);

  function startNew() { setForm(EMPTY); setEditId(null); setShowForm(true); }
  function startEdit(p) { setForm({ ...p }); setEditId(p.id); setShowForm(true); }

  async function save(e) {
    e.preventDefault();
    try {
      if (editId) await apiPut('/portfolio', { id: editId, ...form });
      else await apiPost('/portfolio', form);
      setShowForm(false);
      setError('');
      load();
    } catch (err) { setError(err.message); }
  }

  async function remove(id) {
    const ok = await confirm({
      title: 'Delete this portfolio item?',
      message: 'This project will be permanently removed from your portfolio. This action cannot be undone.',
      confirmLabel: 'Delete item',
      danger: true,
    });
    if (!ok) return;
    try { await apiDelete(`/portfolio?id=${id}`); load(); }
    catch (err) { setError(err.message); }
  }

  return (
    <div>
      <div className="admin-page-head">
        <h1 className="admin-page-title">Portfolio</h1>
        <button className="admin-btn admin-btn--primary" onClick={startNew}><FiPlus /> Add</button>
      </div>
      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      {showForm && (
        <form className="admin-form admin-form--card" onSubmit={save}>
          <label className="admin-field"><span>Title</span>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></label>
          <label className="admin-field"><span>Category</span>
            <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></label>
          <label className="admin-field"><span>Client Name</span>
            <input value={form.client_name || ''} onChange={(e) => setForm({ ...form, client_name: e.target.value })} /></label>
          <label className="admin-field"><span>Description</span>
            <textarea rows="3" value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
          <label className="admin-field"><span>Results / Metrics</span>
            <textarea rows="2" value={form.results || ''} onChange={(e) => setForm({ ...form, results: e.target.value })} /></label>
          <label className="admin-field"><span>Image URL</span>
            <input value={form.image_url || ''} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://…" /></label>
          <label className="admin-checkbox">
            <input type="checkbox" checked={!!form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} /> Featured
          </label>
          <div className="admin-form__actions">
            <button type="button" className="admin-btn" onClick={() => setShowForm(false)}>Cancel</button>
            <button type="submit" className="admin-btn admin-btn--primary">Save</button>
          </div>
        </form>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Title</th><th>Category</th><th>Client</th><th>Featured</th><th>Actions</th></tr></thead>
          <tbody>
            {items.length === 0 && <tr><td colSpan="5" className="admin-table__empty">None yet.</td></tr>}
            {items.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.category}</td>
                <td>{p.client_name || '-'}</td>
                <td>{p.is_featured ? 'Yes' : 'No'}</td>
                <td className="admin-actions">
                  <button className="admin-icon-btn" onClick={() => startEdit(p)}><FiEdit2 /></button>
                  <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => remove(p.id)}><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {dialog}
    </div>
  );
}
