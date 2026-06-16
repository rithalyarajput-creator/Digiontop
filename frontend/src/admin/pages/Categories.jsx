import { useEffect, useState } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiTag } from 'react-icons/fi';
import { apiGet, apiPost, apiPut, apiDelete } from '../api';

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
}

const EMPTY = { name: '', slug: '', description: '', image_url: '', is_active: true };

export default function Categories() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);
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

  function update(field, value) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'name' && !slugTouched) next.slug = slugify(value);
      return next;
    });
  }

  function startNew() { setForm(EMPTY); setEditId(null); setSlugTouched(false); setShowForm(true); }
  function startEdit(c) {
    setForm({ name: c.name, slug: c.slug || '', description: c.description || '', image_url: c.image_url || '', is_active: c.is_active !== false });
    setEditId(c.id); setSlugTouched(true); setShowForm(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    try {
      if (editId) {
        const updated = await apiPut('/categories', { id: editId, ...form });
        setItems((prev) => prev.map((x) => (x.id === editId ? updated : x)));
      } else {
        const created = await apiPost('/categories', form);
        setItems((prev) => [...prev, created].sort((a, b) => a.name.localeCompare(b.name)));
      }
      setShowForm(false); setForm(EMPTY); setEditId(null);
    } catch (err) {
      alert(err.message);
    }
  }

  async function toggleStatus(c) {
    try {
      const updated = await apiPut('/categories', { id: c.id, is_active: !c.is_active });
      setItems((prev) => prev.map((x) => (x.id === c.id ? updated : x)));
    } catch (err) {
      alert(err.message);
    }
  }

  async function remove(c) {
    if (!confirm(`Delete category "${c.name}"?`)) return;
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
        <button className="admin-btn admin-btn--primary" onClick={startNew}><FiPlus /> Add Category</button>
      </div>

      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      {showForm && (
        <form className="admin-form admin-form--card" onSubmit={handleSave}>
          <div className="blogedit__row">
            <label className="admin-field"><span>Category Name *</span>
              <input value={form.name} onChange={(e) => update('name', e.target.value)} required />
            </label>
            <label className="admin-field"><span>Slug</span>
              <input value={form.slug} onChange={(e) => { setSlugTouched(true); update('slug', e.target.value); }} placeholder="auto-generated" />
            </label>
          </div>

          <label className="admin-field"><span>Description</span>
            <textarea rows="2" value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Short description of this category…" />
          </label>

          <label className="admin-field"><span>Category Image URL</span>
            <input value={form.image_url} onChange={(e) => update('image_url', e.target.value)} placeholder="https://…" />
          </label>
          {form.image_url && (
            <div className="admin-cat-img-preview"><img src={form.image_url} alt="preview" /></div>
          )}

          <label className="admin-checkbox">
            <input type="checkbox" checked={form.is_active} onChange={(e) => update('is_active', e.target.checked)} />
            <span>Active</span>
          </label>

          <div className="admin-form__actions">
            <button type="button" className="admin-btn" onClick={() => { setShowForm(false); setEditId(null); }}>Cancel</button>
            <button type="submit" className="admin-btn admin-btn--primary">Save Category</button>
          </div>
        </form>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Category</th><th>Slug</th><th>Blogs</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {loading && <tr><td colSpan="5" className="admin-table__empty">Loading…</td></tr>}
            {!loading && items.length === 0 && <tr><td colSpan="5" className="admin-table__empty">No categories.</td></tr>}
            {items.map((c) => (
              <tr key={c.id}>
                <td>
                  <div className="admin-author-cell">
                    <div className="admin-avatar admin-avatar--square">
                      {c.image_url ? <img src={c.image_url} alt={c.name} /> : <FiTag />}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700 }}>{c.name}</div>
                      <div className="admin-muted" style={{ maxWidth: 220 }}>{c.description || '—'}</div>
                    </div>
                  </div>
                </td>
                <td style={{ color: '#888' }}>{c.slug || '—'}</td>
                <td><span className="admin-badge admin-badge--contacted">{c.blog_count ?? 0} blogs</span></td>
                <td>
                  <button
                    className={`admin-badge admin-badge--${c.is_active ? 'converted' : 'closed'}`}
                    onClick={() => toggleStatus(c)}
                    title="Click to toggle"
                  >
                    {c.is_active ? 'Active' : 'Inactive'}
                  </button>
                </td>
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
