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
      setItems(await apiGet('/cms?resource=categories'));
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
        const updated = await apiPut('/cms?resource=categories', { id: editId, ...form });
        setItems((prev) => prev.map((x) => (x.id === editId ? updated : x)));
      } else {
        const created = await apiPost('/cms?resource=categories', form);
        setItems((prev) => [...prev, created].sort((a, b) => a.name.localeCompare(b.name)));
      }
      setShowForm(false); setForm(EMPTY); setEditId(null);
    } catch (err) {
      alert(err.message);
    }
  }

  async function toggleStatus(c) {
    try {
      const updated = await apiPut('/cms?resource=categories', { id: c.id, is_active: !c.is_active });
      setItems((prev) => prev.map((x) => (x.id === c.id ? updated : x)));
    } catch (err) {
      alert(err.message);
    }
  }

  async function remove(c) {
    if (!confirm(`Delete category "${c.name}"?`)) return;
    try {
      await apiDelete(`/cms?resource=categories&id=${c.id}`);
      setItems((prev) => prev.filter((x) => x.id !== c.id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <div className="admin-shop-head">
        <h1>Categories</h1>
        <div className="admin-shop-head__actions">
          <button className="admin-sbtn admin-sbtn--primary" onClick={startNew}><FiPlus /> Add category</button>
        </div>
      </div>

      {error && <div className="admin-salert">{error}</div>}

      {showForm && (
        <form className="admin-card admin-sform" onSubmit={handleSave}>
          <div className="admin-card__header">
            <h2>{editId ? 'Edit category' : 'New category'}</h2>
          </div>
          <div className="admin-card__body">
            <div className="admin-sform__grid">
              <label className="admin-sfield"><span>Category Name *</span>
                <input value={form.name} onChange={(e) => update('name', e.target.value)} required />
              </label>
              <label className="admin-sfield"><span>Slug</span>
                <input value={form.slug} onChange={(e) => { setSlugTouched(true); update('slug', e.target.value); }} placeholder="auto-generated" />
              </label>
            </div>

            <label className="admin-sfield"><span>Description</span>
              <textarea rows="2" value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Short description of this category…" />
            </label>

            <label className="admin-sfield"><span>Category Image URL</span>
              <input value={form.image_url} onChange={(e) => update('image_url', e.target.value)} placeholder="https://…" />
            </label>
            {form.image_url && (
              <div className="admin-sform__preview"><img src={form.image_url} alt="preview" /></div>
            )}

            <label className="admin-scheck">
              <input type="checkbox" checked={form.is_active} onChange={(e) => update('is_active', e.target.checked)} />
              <span>Active</span>
            </label>
          </div>
          <div className="admin-sform__actions">
            <button type="button" className="admin-sbtn" onClick={() => { setShowForm(false); setEditId(null); }}>Cancel</button>
            <button type="submit" className="admin-sbtn admin-sbtn--primary">Save category</button>
          </div>
        </form>
      )}

      <div className="admin-card">
        <table className="admin-shop-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Slug</th>
              <th>Blogs</th>
              <th>Status</th>
              <th className="is-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan="5" className="admin-shop-table__empty">Loading…</td></tr>}
            {!loading && items.length === 0 && (
              <tr><td colSpan="5" className="admin-shop-table__empty">No categories found.</td></tr>
            )}
            {!loading && items.map((c) => (
              <tr key={c.id}>
                <td>
                  <div className="admin-shop-table__media">
                    <div className="admin-shop-table__thumb admin-shop-table__thumb--square">
                      {c.image_url ? <img src={c.image_url} alt={c.name} /> : <FiTag />}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p className="admin-shop-table__name">{c.name}</p>
                      <p className="admin-shop-table__sub admin-shop-table__trunc">{c.description || '—'}</p>
                    </div>
                  </div>
                </td>
                <td className="is-muted">{c.slug || '—'}</td>
                <td className="is-muted">{c.blog_count ?? 0}</td>
                <td>
                  <button
                    className={`admin-sbadge admin-sbadge--${c.is_active ? 'success' : 'neutral'}`}
                    onClick={() => toggleStatus(c)}
                    title="Click to toggle"
                  >
                    {c.is_active ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="is-right">
                  <div className="admin-srow-actions">
                    <button className="admin-sicon" onClick={() => startEdit(c)} title="Edit"><FiEdit2 /></button>
                    <button className="admin-sicon admin-sicon--danger" onClick={() => remove(c)} title="Delete"><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
