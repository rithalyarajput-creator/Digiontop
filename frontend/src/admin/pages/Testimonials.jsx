import { useEffect, useState } from 'react';
import { FiTrash2, FiEdit2, FiPlus } from 'react-icons/fi';
import { apiGet, apiPost, apiPut, apiDelete } from '../api';
import { useConfirm } from '../components/useConfirm';

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
  const { confirm, dialog } = useConfirm();

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
      setError('');
      load();
    } catch (err) { setError(err.message); }
  }

  async function remove(id) {
    const ok = await confirm({
      title: 'Delete this testimonial?',
      message: 'This testimonial will be permanently removed from your site. This action cannot be undone.',
      confirmLabel: 'Delete testimonial',
      danger: true,
    });
    if (!ok) return;
    try { await apiDelete(`/testimonials?id=${id}`); load(); }
    catch (err) { setError(err.message); }
  }

  function stars(n) {
    const filled = Math.max(0, Math.min(5, Number(n) || 0));
    return (
      <span className="admin-shop-table__stars">
        {'★'.repeat(filled)}
        {filled < 5 && <i>{'★'.repeat(5 - filled)}</i>}
      </span>
    );
  }

  return (
    <div>
      <div className="admin-shop-head">
        <h1>Testimonials</h1>
        <div className="admin-shop-head__actions">
          <button className="admin-sbtn admin-sbtn--primary" onClick={startNew}><FiPlus /> Add testimonial</button>
        </div>
      </div>

      {error && <div className="admin-salert">{error}</div>}

      {showForm && (
        <form className="admin-card admin-sform" onSubmit={save}>
          <div className="admin-card__header">
            <h2>{editId ? 'Edit testimonial' : 'New testimonial'}</h2>
          </div>
          <div className="admin-card__body">
            <div className="admin-sform__grid">
              <label className="admin-sfield"><span>Client Name</span>
                <input value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} required /></label>
              <label className="admin-sfield"><span>Role</span>
                <input value={form.client_role || ''} onChange={(e) => setForm({ ...form, client_role: e.target.value })} /></label>
            </div>
            <div className="admin-sform__grid">
              <label className="admin-sfield"><span>Location</span>
                <input value={form.client_location || ''} onChange={(e) => setForm({ ...form, client_location: e.target.value })} /></label>
              <label className="admin-sfield"><span>Rating (1-5)</span>
                <input type="number" min="1" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} /></label>
            </div>
            <label className="admin-sfield"><span>Testimonial</span>
              <textarea rows="4" value={form.testimonial_text} onChange={(e) => setForm({ ...form, testimonial_text: e.target.value })} required /></label>
            <label className="admin-scheck">
              <input type="checkbox" checked={!!form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} />
              <span>Featured</span>
            </label>
          </div>
          <div className="admin-sform__actions">
            <button type="button" className="admin-sbtn" onClick={() => setShowForm(false)}>Cancel</button>
            <button type="submit" className="admin-sbtn admin-sbtn--primary">Save</button>
          </div>
        </form>
      )}

      <div className="admin-card">
        <table className="admin-shop-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Role</th>
              <th>Rating</th>
              <th>Featured</th>
              <th className="is-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr><td colSpan="5" className="admin-shop-table__empty">No testimonials yet.</td></tr>
            )}
            {items.map((t) => (
              <tr key={t.id}>
                <td>
                  <p className="admin-shop-table__name">{t.client_name}</p>
                  {t.client_location && <p className="admin-shop-table__sub">{t.client_location}</p>}
                </td>
                <td className="is-muted">{t.client_role || '—'}</td>
                <td>{stars(t.rating)}</td>
                <td>
                  {t.is_featured
                    ? <span className="admin-sbadge admin-sbadge--success">Featured</span>
                    : <span className="admin-sbadge admin-sbadge--neutral">No</span>}
                </td>
                <td className="is-right">
                  <div className="admin-srow-actions">
                    <button className="admin-sicon" onClick={() => startEdit(t)} title="Edit"><FiEdit2 /></button>
                    <button className="admin-sicon admin-sicon--danger" onClick={() => remove(t.id)} title="Delete"><FiTrash2 /></button>
                  </div>
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
