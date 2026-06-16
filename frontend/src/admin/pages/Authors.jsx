import { useEffect, useState } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiUser } from 'react-icons/fi';
import { apiGet, apiPost, apiPut, apiDelete } from '../api';

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
        const updated = await apiPut('/authors', { id: editId, ...buildPayload() });
        setItems((prev) => prev.map((x) => (x.id === editId ? updated : x)));
      } else {
        const created = await apiPost('/authors', buildPayload());
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
      const updated = await apiPut('/authors', { id: a.id, is_active: !a.is_active });
      setItems((prev) => prev.map((x) => (x.id === a.id ? updated : x)));
    } catch (err) {
      alert(err.message);
    }
  }

  async function remove(a) {
    if (!confirm(`Delete author "${a.name}"?`)) return;
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
          <div className="blogedit__row">
            <label className="admin-field"><span>Author Name *</span>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </label>
            <label className="admin-field"><span>Email</span>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </label>
          </div>

          <label className="admin-field"><span>Profile Image URL</span>
            <input value={form.avatar_url} onChange={(e) => setForm({ ...form, avatar_url: e.target.value })} placeholder="https://…" />
          </label>
          {form.avatar_url && (
            <div className="admin-avatar-preview"><img src={form.avatar_url} alt="preview" /></div>
          )}

          <label className="admin-field"><span>Bio</span>
            <textarea rows="3" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          </label>

          <p className="admin-section-title" style={{ fontSize: 14, marginBottom: 4 }}>Social Media Links</p>
          <div className="blogedit__row">
            <label className="admin-field"><span>Instagram</span>
              <input value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} placeholder="https://instagram.com/…" />
            </label>
            <label className="admin-field"><span>Facebook</span>
              <input value={form.facebook} onChange={(e) => setForm({ ...form, facebook: e.target.value })} placeholder="https://facebook.com/…" />
            </label>
          </div>
          <div className="blogedit__row">
            <label className="admin-field"><span>LinkedIn</span>
              <input value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} placeholder="https://linkedin.com/in/…" />
            </label>
            <label className="admin-field"><span>Twitter / X</span>
              <input value={form.twitter} onChange={(e) => setForm({ ...form, twitter: e.target.value })} placeholder="https://x.com/…" />
            </label>
          </div>

          <label className="admin-checkbox">
            <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
            <span>Active (visible on website)</span>
          </label>

          <div className="admin-form__actions">
            <button type="button" className="admin-btn" onClick={() => { setShowForm(false); setEditId(null); }}>Cancel</button>
            <button type="submit" className="admin-btn admin-btn--primary">Save Author</button>
          </div>
        </form>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Author</th><th>Email</th><th>Blogs</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {loading && <tr><td colSpan="5" className="admin-table__empty">Loading…</td></tr>}
            {!loading && items.length === 0 && <tr><td colSpan="5" className="admin-table__empty">No authors yet. Add one above.</td></tr>}
            {items.map((a) => (
              <tr key={a.id}>
                <td>
                  <div className="admin-author-cell">
                    <div className="admin-avatar">
                      {a.avatar_url ? <img src={a.avatar_url} alt={a.name} /> : <FiUser />}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700 }}>{a.name}</div>
                      <div className="admin-muted" style={{ maxWidth: 220 }}>{a.bio || '—'}</div>
                    </div>
                  </div>
                </td>
                <td>{a.email || '—'}</td>
                <td><span className="admin-badge admin-badge--contacted">{a.blog_count ?? 0} blogs</span></td>
                <td>
                  <button
                    className={`admin-badge admin-badge--${a.is_active ? 'converted' : 'closed'}`}
                    onClick={() => toggleStatus(a)}
                    title="Click to toggle"
                  >
                    {a.is_active ? 'Active' : 'Inactive'}
                  </button>
                </td>
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
