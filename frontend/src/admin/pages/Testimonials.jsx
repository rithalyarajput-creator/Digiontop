import { useEffect, useState, useRef } from 'react';
import { FiTrash2, FiEdit2, FiPlus, FiStar } from 'react-icons/fi';
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

/* Deterministic colour for the initial-letter fallback avatar */
const AVATAR_COLORS = ['#5b8def', '#e8710a', '#0f9d58', '#db4437', '#8e44ad', '#00838f', '#c2185b', '#5d6d7e'];
function avatarColor(name) {
  const s = String(name || '?');
  let hash = 0;
  for (let i = 0; i < s.length; i += 1) hash = (hash * 31 + s.charCodeAt(i)) % 997;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}
function initial(name) {
  const s = String(name || '').trim();
  return s ? s[0].toUpperCase() : '?';
}

/* "2026-07-13T00:00:00Z" -> "2026-07-13" for <input type="date"> */
function toDateInput(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function formatDate(value) {
  if (!value) return '-';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '-';
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}

const EMPTY = {
  client_name: '', client_role: '', client_location: '',
  testimonial_text: '', rating: 5, is_featured: false,
  avatar_url: '', reviewed_at: '',
};

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [hoverStar, setHoverStar] = useState(0);
  const fileRef = useRef(null);
  const { confirm, dialog } = useConfirm();

  async function load() {
    try { setItems(await apiGet('/testimonials')); }
    catch (err) { setError(err.message); }
  }
  useEffect(() => { load(); }, []);

  function startNew() {
    setForm({ ...EMPTY, reviewed_at: toDateInput(new Date()) });
    setEditId(null);
    setShowForm(true);
  }

  function startEdit(t) {
    setForm({
      client_name: t.client_name || '',
      client_role: t.client_role || '',
      client_location: t.client_location || '',
      testimonial_text: t.testimonial_text || '',
      rating: Number(t.rating) || 5,
      is_featured: !!t.is_featured,
      avatar_url: t.avatar_url || '',
      reviewed_at: toDateInput(t.reviewed_at),
    });
    setEditId(t.id);
    setShowForm(true);
  }

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

  function buildPayload() {
    return {
      client_name: form.client_name,
      client_role: form.client_role || '',
      client_location: form.client_location || '',
      testimonial_text: form.testimonial_text,
      rating: Number(form.rating) || 5,
      is_featured: !!form.is_featured,
      avatar_url: form.avatar_url || null,
      reviewed_at: form.reviewed_at ? new Date(`${form.reviewed_at}T12:00:00`).toISOString() : null,
    };
  }

  async function save(e) {
    e.preventDefault();
    try {
      if (editId) await apiPut('/testimonials', { id: editId, ...buildPayload() });
      else await apiPost('/testimonials', buildPayload());
      setShowForm(false);
      setEditId(null);
      setForm(EMPTY);
      setError('');
      load();
    } catch (err) { setError(err.message); }
  }

  async function remove(id) {
    const ok = await confirm({
      title: 'Delete this review?',
      message: 'This review will be permanently removed from your site. This action cannot be undone.',
      confirmLabel: 'Delete review',
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

  const active = hoverStar || Number(form.rating) || 0;

  return (
    <div>
      <div className="admin-shop-head">
        <h1>Reviews</h1>
        <div className="admin-shop-head__actions">
          <button className="admin-sbtn admin-sbtn--primary" onClick={startNew}><FiPlus /> Add review</button>
        </div>
      </div>

      {error && <div className="admin-salert">{error}</div>}

      {showForm && (
        <form className="admin-card admin-sform" onSubmit={save}>
          <div className="admin-card__header">
            <h2>{editId ? 'Edit review' : 'New review'}</h2>
          </div>
          <div className="admin-card__body">
            <div className="admin-sform__grid">
              <label className="admin-sfield"><span>Name *</span>
                <input value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} required />
              </label>
              <label className="admin-sfield"><span>Review Date</span>
                <input type="date" value={form.reviewed_at} onChange={(e) => setForm({ ...form, reviewed_at: e.target.value })} />
              </label>
            </div>

            <div className="admin-sfield">
              <span>Photo (optional)</span>
              <div className="admin-review-avatar">
                {form.avatar_url
                  ? <div className="admin-sform__preview"><img src={form.avatar_url} alt="preview" /></div>
                  : (
                    <div
                      className="admin-review-initial admin-review-initial--lg"
                      style={{ background: avatarColor(form.client_name) }}
                      aria-hidden="true"
                    >
                      {initial(form.client_name)}
                    </div>
                  )}
              </div>
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
              <p className="admin-review-hint">
                No photo? A coloured circle with the first letter of the name is shown instead.
              </p>
            </div>

            <label className="admin-sfield"><span>Or paste an Image URL</span>
              <input value={form.avatar_url || ''} onChange={(e) => setForm({ ...form, avatar_url: e.target.value })} placeholder="https://…" />
            </label>

            <div className="admin-sfield">
              <span>Star Rating</span>
              <div className="admin-stars-pick" onMouseLeave={() => setHoverStar(0)}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`admin-stars-pick__btn${n <= active ? ' is-on' : ''}`}
                    onClick={() => setForm({ ...form, rating: n })}
                    onMouseEnter={() => setHoverStar(n)}
                    aria-label={`${n} star${n > 1 ? 's' : ''}`}
                    title={`${n} star${n > 1 ? 's' : ''}`}
                  >
                    <FiStar />
                  </button>
                ))}
                <span className="admin-stars-pick__val">{Number(form.rating) || 0} / 5</span>
              </div>
            </div>

            <label className="admin-sfield"><span>Review *</span>
              <textarea rows="4" value={form.testimonial_text} onChange={(e) => setForm({ ...form, testimonial_text: e.target.value })} required />
            </label>

            <div className="admin-sform__grid">
              <label className="admin-sfield"><span>Role</span>
                <input value={form.client_role || ''} onChange={(e) => setForm({ ...form, client_role: e.target.value })} />
              </label>
              <label className="admin-sfield"><span>Location</span>
                <input value={form.client_location || ''} onChange={(e) => setForm({ ...form, client_location: e.target.value })} />
              </label>
            </div>

            <label className="admin-scheck">
              <input type="checkbox" checked={!!form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} />
              <span>Featured</span>
            </label>
          </div>
          <div className="admin-sform__actions">
            <button type="button" className="admin-sbtn" onClick={() => { setShowForm(false); setEditId(null); }}>Cancel</button>
            <button type="submit" className="admin-sbtn admin-sbtn--primary">Save review</button>
          </div>
        </form>
      )}

      <div className="admin-card admin-card__scroll">
        <table className="admin-shop-table admin-table-reviews">
          <thead>
            <tr>
              <th>Reviewer</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Date</th>
              <th>Featured</th>
              <th className="is-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr><td colSpan="6" className="admin-shop-table__empty">No reviews yet.</td></tr>
            )}
            {items.map((t) => (
              <tr key={t.id}>
                <td>
                  <div className="admin-shop-table__media">
                    <div className="admin-shop-table__thumb">
                      {t.avatar_url
                        ? <img src={t.avatar_url} alt={t.client_name} />
                        : (
                          <span className="admin-review-initial" style={{ background: avatarColor(t.client_name) }}>
                            {initial(t.client_name)}
                          </span>
                        )}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p className="admin-shop-table__name admin-shop-table__trunc">
                        {/^https?:\/\//i.test(t.client_name || '') ? 'Google reviewer' : (t.client_name || '-')}
                      </p>
                      <p className="admin-shop-table__sub admin-shop-table__trunc">
                        {[t.client_role, t.client_location].filter(Boolean).join(' · ') || '-'}
                      </p>
                    </div>
                  </div>
                </td>
                <td>{stars(t.rating)}</td>
                <td className="is-muted">
                  <span className="admin-shop-table__trunc" style={{ display: 'block' }}>
                    {t.testimonial_text}
                  </span>
                </td>
                <td className="is-muted">{formatDate(t.reviewed_at)}</td>
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
