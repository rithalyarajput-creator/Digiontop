import { useEffect, useState, useRef } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiTag } from 'react-icons/fi';
import { apiGet, apiPost, apiPut, apiDelete } from '../api';
import { useConfirm } from '../components/useConfirm';

/* Resize + compress an image file in the browser, return { mime, base64 } */
function compressImage(file, maxWidth = 600, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxWidth / img.width);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve({ mime: 'image/jpeg', base64: dataUrl.split(',')[1] });
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read image')); };
    img.src = url;
  });
}

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
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);
  const { confirm, dialog } = useConfirm();

  async function handleImageUpload(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Please choose an image file.'); return; }
    setError('');
    setUploading(true);
    try {
      const { mime, base64 } = await compressImage(file);
      const resp = await apiPost('/cms?resource=media', { filename: file.name, mime, data: base64 });
      if (resp && resp.url) {
        setForm((p) => ({ ...p, image_url: resp.url }));
      } else {
        setError('Upload failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  }

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
    setError('');
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
      setError(err.message);
    }
  }

  async function toggleStatus(c) {
    try {
      const updated = await apiPut('/cms?resource=categories', { id: c.id, is_active: !c.is_active });
      setItems((prev) => prev.map((x) => (x.id === c.id ? updated : x)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(c) {
    const ok = await confirm({
      title: `Delete category "${c.name}"?`,
      message: 'This category will be permanently removed. This action cannot be undone.',
      confirmLabel: 'Delete category',
      danger: true,
    });
    if (!ok) return;
    try {
      await apiDelete(`/cms?resource=categories&id=${c.id}`);
      setItems((prev) => prev.filter((x) => x.id !== c.id));
    } catch (err) {
      setError(err.message);
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

            <div className="admin-sfield">
              <span>Category Image</span>
              {form.image_url && (
                <div className="admin-sform__preview"><img src={form.image_url} alt="preview" /></div>
              )}
              <div className="admin-supload">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  className="admin-sbtn admin-sbtn--primary"
                  onClick={() => fileRef.current && fileRef.current.click()}
                  disabled={uploading}
                >
                  {uploading ? 'Uploading…' : 'Upload from Computer'}
                </button>
                {form.image_url && !uploading && (
                  <button type="button" className="admin-sbtn" onClick={() => update('image_url', '')}>
                    Remove
                  </button>
                )}
              </div>
            </div>

            <label className="admin-sfield"><span>Or paste an Image URL</span>
              <input value={form.image_url} onChange={(e) => update('image_url', e.target.value)} placeholder="https://…" />
            </label>

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

      {dialog}
    </div>
  );
}
