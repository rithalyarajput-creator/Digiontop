import { useEffect, useState, useRef } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiUser } from 'react-icons/fi';
import { apiGet, apiPost, apiPut, apiDelete } from '../api';

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

const EMPTY = {
  name: '', email: '', bio: '', avatar_url: '',
  instagram: '', facebook: '', linkedin: '', twitter: '',
  is_active: true,
};

// social_links is stored as a JSON string in DB
function parseSocial(str) {
  try { return str ? JSON.parse(str) : {}; } catch { return {}; }
}

export default function Authors() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

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
        setForm((p) => ({ ...p, avatar_url: resp.url }));
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
      setItems(await apiGet('/cms?resource=authors'));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function startNew() { setForm(EMPTY); setEditId(null); setShowForm(true); }

  function startEdit(a) {
    const social = parseSocial(a.social_links);
    setForm({
      name: a.name || '', email: a.email || '', bio: a.bio || '', avatar_url: a.avatar_url || '',
      instagram: social.instagram || '', facebook: social.facebook || '',
      linkedin: social.linkedin || '', twitter: social.twitter || '',
      is_active: a.is_active !== false,
    });
    setEditId(a.id);
    setShowForm(true);
  }

  function buildPayload() {
    const social_links = JSON.stringify({
      instagram: form.instagram || '', facebook: form.facebook || '',
      linkedin: form.linkedin || '', twitter: form.twitter || '',
    });
    return {
      name: form.name, email: form.email, bio: form.bio,
      avatar_url: form.avatar_url, social_links, is_active: form.is_active,
    };
  }

  async function handleSave(e) {
    e.preventDefault();
    try {
      if (editId) {
        const updated = await apiPut('/cms?resource=authors', { id: editId, ...buildPayload() });
        setItems((prev) => prev.map((x) => (x.id === editId ? updated : x)));
      } else {
        const created = await apiPost('/cms?resource=authors', buildPayload());
        setItems((prev) => [...prev, created].sort((a, b) => a.name.localeCompare(b.name)));
      }
      setShowForm(false);
      setForm(EMPTY);
      setEditId(null);
    } catch (err) {
      alert(err.message);
    }
  }

  async function toggleStatus(a) {
    try {
      const updated = await apiPut('/cms?resource=authors', { id: a.id, is_active: !a.is_active });
      setItems((prev) => prev.map((x) => (x.id === a.id ? updated : x)));
    } catch (err) {
      alert(err.message);
    }
  }

  async function remove(a) {
    if (!confirm(`Delete author "${a.name}"?`)) return;
    try {
      await apiDelete(`/cms?resource=authors&id=${a.id}`);
      setItems((prev) => prev.filter((x) => x.id !== a.id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <div className="admin-shop-head">
        <h1>Authors</h1>
        <div className="admin-shop-head__actions">
          <button className="admin-sbtn admin-sbtn--primary" onClick={startNew}><FiPlus /> Add author</button>
        </div>
      </div>

      {error && <div className="admin-salert">{error}</div>}

      {showForm && (
        <form className="admin-card admin-sform" onSubmit={handleSave}>
          <div className="admin-card__header">
            <h2>{editId ? 'Edit author' : 'New author'}</h2>
          </div>
          <div className="admin-card__body">
            <div className="admin-sform__grid">
              <label className="admin-sfield"><span>Author Name *</span>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </label>
              <label className="admin-sfield"><span>Email</span>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </label>
            </div>

            <div className="admin-sfield">
              <span>Profile Image</span>
              {form.avatar_url && (
                <div className="admin-sform__preview"><img src={form.avatar_url} alt="preview" /></div>
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
                {form.avatar_url && !uploading && (
                  <button type="button" className="admin-sbtn" onClick={() => setForm({ ...form, avatar_url: '' })}>
                    Remove
                  </button>
                )}
              </div>
            </div>

            <label className="admin-sfield"><span>Or paste an Image URL</span>
              <input value={form.avatar_url} onChange={(e) => setForm({ ...form, avatar_url: e.target.value })} placeholder="https://…" />
            </label>

            <label className="admin-sfield"><span>Bio</span>
              <textarea rows="3" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
            </label>

            <p className="admin-sform__section">Social Media Links</p>
            <div className="admin-sform__grid">
              <label className="admin-sfield"><span>Instagram</span>
                <input value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} placeholder="https://instagram.com/…" />
              </label>
              <label className="admin-sfield"><span>Facebook</span>
                <input value={form.facebook} onChange={(e) => setForm({ ...form, facebook: e.target.value })} placeholder="https://facebook.com/…" />
              </label>
            </div>
            <div className="admin-sform__grid">
              <label className="admin-sfield"><span>LinkedIn</span>
                <input value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} placeholder="https://linkedin.com/in/…" />
              </label>
              <label className="admin-sfield"><span>Twitter / X</span>
                <input value={form.twitter} onChange={(e) => setForm({ ...form, twitter: e.target.value })} placeholder="https://x.com/…" />
              </label>
            </div>

            <label className="admin-scheck">
              <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
              <span>Active (visible on website)</span>
            </label>
          </div>
          <div className="admin-sform__actions">
            <button type="button" className="admin-sbtn" onClick={() => { setShowForm(false); setEditId(null); }}>Cancel</button>
            <button type="submit" className="admin-sbtn admin-sbtn--primary">Save author</button>
          </div>
        </form>
      )}

      <div className="admin-card">
        <table className="admin-shop-table">
          <thead>
            <tr>
              <th>Author</th>
              <th>Email</th>
              <th>Blogs</th>
              <th>Status</th>
              <th className="is-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan="5" className="admin-shop-table__empty">Loading…</td></tr>}
            {!loading && items.length === 0 && (
              <tr><td colSpan="5" className="admin-shop-table__empty">No authors yet.</td></tr>
            )}
            {!loading && items.map((a) => (
              <tr key={a.id}>
                <td>
                  <div className="admin-shop-table__media">
                    <div className="admin-shop-table__thumb">
                      {a.avatar_url ? <img src={a.avatar_url} alt={a.name} /> : <FiUser />}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p className="admin-shop-table__name">{a.name}</p>
                      <p className="admin-shop-table__sub admin-shop-table__trunc">{a.bio || '—'}</p>
                    </div>
                  </div>
                </td>
                <td className="is-muted">{a.email || '—'}</td>
                <td className="is-muted">{a.blog_count ?? 0}</td>
                <td>
                  <button
                    className={`admin-sbadge admin-sbadge--${a.is_active ? 'success' : 'neutral'}`}
                    onClick={() => toggleStatus(a)}
                    title="Click to toggle"
                  >
                    {a.is_active ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="is-right">
                  <div className="admin-srow-actions">
                    <button className="admin-sicon" onClick={() => startEdit(a)} title="Edit"><FiEdit2 /></button>
                    <button className="admin-sicon admin-sicon--danger" onClick={() => remove(a)} title="Delete"><FiTrash2 /></button>
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
