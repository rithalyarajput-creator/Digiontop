import { useEffect, useState } from 'react';
import { FiTrash2, FiEdit2, FiPlus } from 'react-icons/fi';
import { apiGet, apiPost, apiPut, apiDelete } from '../api';

const EMPTY = {
  client_name: '', client_role: '', client_location: '',
  testimonial_text: '', rating: 5, is_featured: false,
};

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  async function load() {
    try { setItems(await apiGet('/testimonials')); }
    catch (err) { setError(err.message); }
  }
  useEffect(() => { load(); }, []);

  function startNew() { setForm(EMPTY); setEditId(null); setShowForm(true); }
  function startEdit(t) { setForm({ ...t }); setEditId(t.id); setShowForm(true); }

  async function save(e) {
    e.preventDefault();
    try {
      if (editId) await apiPut('/testimonials', { id: editId, ...form });
      else await apiPost('/testimonials', form);
      setShowForm(false);
      load();
    } catch (err) { alert(err.message); }
  }

  async function remove(id) {
    if (!confirm('Delete this testimonial?')) return;
    try { await apiDelete(`/testimonials?id=${id}`); load(); }
    catch (err) { alert(err.message); }
  }

  return (
    <div>
      <div className="admin-page-head">
        <h1 className="admin-page-title">Testimonials</h1>
        <button className="admin-btn admin-btn--primary" onClick={startNew}><FiPlus /> Add</button>
      </div>
      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      {showForm && (
        <form className="admin-form admin-form--card" onSubmit={save}>
          <label className="admin-field"><span>Client Name</span>
            <input value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} required /></label>
          <label className="admin-field"><span>Role</span>
            <input value={form.client_role || ''} onChange={(e) => setForm({ ...form, client_role: e.target.value })} /></label>
          <label className="admin-field"><span>Location</span>
            <input value={form.client_location || ''} onChange={(e) => setForm({ ...form, client_location: e.target.value })} /></label>
          <label className="admin-field"><span>Testimonial</span>
            <textarea rows="4" value={form.testimonial_text} onChange={(e) => setForm({ ...form, testimonial_text: e.target.value })} required /></label>
          <label className="admin-field"><span>Rating (1-5)</span>
            <input type="number" min="1" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} /></label>
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
          <thead><tr><th>Client</th><th>Role</th><th>Rating</th><th>Featured</th><th>Actions</th></tr></thead>
          <tbody>
            {items.length === 0 && <tr><td colSpan="5" className="admin-table__empty">None yet.</td></tr>}
            {items.map((t) => (
              <tr key={t.id}>
                <td>{t.client_name}<div className="admin-muted">{t.client_location}</div></td>
                <td>{t.client_role || '—'}</td>
                <td>{'★'.repeat(t.rating)}</td>
                <td>{t.is_featured ? 'Yes' : 'No'}</td>
                <td className="admin-actions">
                  <button className="admin-icon-btn" onClick={() => startEdit(t)}><FiEdit2 /></button>
                  <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => remove(t.id)}><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
