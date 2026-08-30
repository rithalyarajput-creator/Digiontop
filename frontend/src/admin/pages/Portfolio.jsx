import { useEffect, useState } from 'react';
import { FiTrash2, FiEdit2, FiPlus, FiExternalLink, FiUpload, FiStar, FiHome } from 'react-icons/fi';
import { apiGet, apiPost, apiPut, apiDelete } from '../api';
import { useConfirm } from '../components/useConfirm';
import RichEditor from '../components/RichEditor';

/* Resize + compress an image file in the browser, return { mime, base64 } */
function compressImage(file, maxWidth = 1200, quality = 0.82) {
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
  return String(text).toLowerCase().trim()
    .replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}

const EMPTY = {
  title: '', category: 'Website', description: '',
  image_url: '', feature_image_url: '', link_url: '', logo_url: '',
  slug: '', content: '', client_name: '', results: '', is_featured: false,
};

const HOME_LIMIT = 3; // the home page shows three websites

/* Websites shown on the Projects page, on the home page (the three ticked
   "Show on Home"), and each with its own case-study page at /case-study/:slug. */
export default function Portfolio() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState('');
  const { confirm, dialog } = useConfirm();

  const featuredCount = items.filter((p) => p.is_featured).length;

  // which: 'image_url' (full-page mockup), 'feature_image_url' (case-study
  // hero) or 'logo_url' (small brand mark)
  async function handleUpload(e, which) {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Please choose an image file.'); return; }
    setError('');
    setUploading(which);
    try {
      const { mime, base64 } = await compressImage(file, which === 'logo_url' ? 320 : 1400);
      const resp = await apiPost('/cms?resource=media', { filename: file.name, mime, data: base64 });
      if (resp && resp.url) setForm((p) => ({ ...p, [which]: resp.url }));
      else setError('Upload failed. Please try again.');
    } catch (err) {
      setError(err.message || 'Upload failed.');
    } finally {
      setUploading('');
    }
  }

  async function load() {
    try { setItems(await apiGet('/portfolio')); }
    catch (err) { setError(err.message); }
  }
  useEffect(() => { load(); }, []);

  function startNew() { setForm(EMPTY); setEditId(null); setError(''); setShowForm(true); }
  function startEdit(p) { setForm({ ...EMPTY, ...p }); setEditId(p.id); setError(''); setShowForm(true); }

  async function save(e) {
    e.preventDefault();
    try {
      const body = { ...form, slug: slugify(form.slug || form.title) };
      if (editId) await apiPut('/portfolio', { id: editId, ...body });
      else await apiPost('/portfolio', body);
      setShowForm(false);
      setError('');
      load();
    } catch (err) { setError(err.message); }
  }

  /* Tick / untick "Show on Home" straight from the list. */
  async function toggleHome(p) {
    if (!p.is_featured && featuredCount >= HOME_LIMIT) {
      setError(`The home page shows ${HOME_LIMIT} websites. Untick one first, then tick this.`);
      return;
    }
    setError('');
    try {
      await apiPut('/portfolio', { id: p.id, is_featured: !p.is_featured });
      load();
    } catch (err) { setError(err.message); }
  }

  async function remove(id) {
    const ok = await confirm({
      title: 'Delete this website?',
      message: 'This website and its case study will be permanently removed from the site. This action cannot be undone.',
      confirmLabel: 'Delete website',
      danger: true,
    });
    if (!ok) return;
    try { await apiDelete(`/portfolio?id=${id}`); load(); }
    catch (err) { setError(err.message); }
  }

  return (
    <div>
      <div className="admin-page-head">
        <h1 className="admin-page-title">Websites</h1>
        <button className="admin-btn admin-btn--primary" onClick={startNew}><FiPlus /> Add Website</button>
      </div>
      <p className="admin-page-sub">
        Every website here appears on the Projects page and gets its own case-study page.
        Tick <strong>Home</strong> on any {HOME_LIMIT} to feature them on the home page
        ({featuredCount}/{HOME_LIMIT} picked).
      </p>
      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      {showForm && (
        <form className="admin-form admin-form--card" onSubmit={save}>
          <label className="admin-field"><span>Brand / Website Name</span>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="e.g. Chai Tadkaa" /></label>

          <label className="admin-field"><span>Category</span>
            <input value={form.category || ''} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. E-Commerce" /></label>

          <label className="admin-field"><span>Live Website URL</span>
            <input value={form.link_url || ''} onChange={(e) => setForm({ ...form, link_url: e.target.value })} placeholder="https://example.com" /></label>

          <label className="admin-field"><span>Case study URL (auto from the name)</span>
            <input value={form.slug || ''} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder={slugify(form.title) || 'chai-tadkaa'} />
            <small className="admin-muted">digiontop.com/case-study/{slugify(form.slug || form.title) || '…'}</small></label>

          <label className="admin-field"><span>Short description (shown under the title)</span>
            <textarea rows="2" value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>

          <div className="admin-field">
            <span>Full Website Mockup (long screenshot — scrolls on hover)</span>
            <label className="admin-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', width: 'fit-content' }}>
              <FiUpload /> {uploading === 'image_url' ? 'Uploading…' : (form.image_url ? 'Change Mockup' : 'Upload Mockup')}
              <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'image_url')} style={{ display: 'none' }} />
            </label>
            {form.image_url && <img src={form.image_url} alt="Mockup preview" style={{ display: 'block', marginTop: 10, maxWidth: 200, borderRadius: 8, border: '1px solid #e3e6ee' }} />}
          </div>

          <div className="admin-field">
            <span>Feature Image (banner at the top of the case study)</span>
            <label className="admin-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', width: 'fit-content' }}>
              <FiUpload /> {uploading === 'feature_image_url' ? 'Uploading…' : (form.feature_image_url ? 'Change Feature Image' : 'Upload Feature Image')}
              <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'feature_image_url')} style={{ display: 'none' }} />
            </label>
            {form.feature_image_url && <img src={form.feature_image_url} alt="Feature preview" style={{ display: 'block', marginTop: 10, maxWidth: 260, borderRadius: 8, border: '1px solid #e3e6ee' }} />}
          </div>

          <div className="admin-field">
            <span>Brand Logo (optional)</span>
            <label className="admin-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', width: 'fit-content' }}>
              <FiUpload /> {uploading === 'logo_url' ? 'Uploading…' : (form.logo_url ? 'Change Logo' : 'Upload Logo')}
              <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'logo_url')} style={{ display: 'none' }} />
            </label>
            {form.logo_url && <img src={form.logo_url} alt="Logo preview" style={{ display: 'block', marginTop: 10, maxWidth: 90, maxHeight: 48, objectFit: 'contain', borderRadius: 6, border: '1px solid #e3e6ee' }} />}
          </div>

          <div className="admin-field">
            <span>Case Study (the write-up: challenge, solution, results)</span>
            <RichEditor
              value={form.content || ''}
              onChange={(html) => setForm((p) => ({ ...p, content: html }))}
              placeholder="Write the case study — what the client needed, what you built, and the results…"
            />
          </div>

          <label className="admin-checkbox">
            <input
              type="checkbox"
              checked={!!form.is_featured}
              onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
            /> Show on home page (any {HOME_LIMIT})
          </label>

          <div className="admin-form__actions">
            <button type="button" className="admin-btn" onClick={() => setShowForm(false)}>Cancel</button>
            <button type="submit" className="admin-btn admin-btn--primary" disabled={!!uploading}>Save</button>
          </div>
        </form>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Website</th>
              <th>Category</th>
              <th>Home</th>
              <th>Case Study</th>
              <th>Live URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && <tr><td colSpan="6" className="admin-table__empty">None yet. Click “Add Website” to add your first one.</td></tr>}
            {items.map((p) => (
              <tr key={p.id}>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                    {p.logo_url
                      ? <img src={p.logo_url} alt="" style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: 6, background: '#f2f4f8', flexShrink: 0 }} />
                      : <span style={{ width: 32, height: 32, borderRadius: 6, background: '#f2f4f8', display: 'grid', placeItems: 'center', fontWeight: 800, color: '#7a8194', flexShrink: 0 }}>{(p.title || '?')[0].toUpperCase()}</span>}
                    <span>
                      <strong>{p.title}</strong>
                      {p.image_url && <img src={p.image_url} alt="" style={{ display: 'block', width: 56, marginTop: 4, borderRadius: 3, border: '1px solid #e3e6ee' }} />}
                    </span>
                  </span>
                </td>
                <td>{p.category || '-'}</td>
                <td>
                  <button
                    className="admin-icon-btn"
                    title={p.is_featured ? 'Showing on home — click to remove' : 'Click to show on the home page'}
                    onClick={() => toggleHome(p)}
                    style={p.is_featured ? { color: '#F5A800' } : undefined}
                  >
                    {p.is_featured ? <FiStar /> : <FiHome />}
                  </button>
                </td>
                <td>
                  {p.slug
                    ? <a href={`/case-study/${p.slug}`} target="_blank" rel="noopener noreferrer">View</a>
                    : '-'}
                </td>
                <td>
                  {p.link_url
                    ? <a href={p.link_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>Visit <FiExternalLink /></a>
                    : '-'}
                </td>
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
