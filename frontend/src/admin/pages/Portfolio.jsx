import { Fragment, useEffect, useState } from 'react';
import { FiTrash2, FiEdit2, FiPlus, FiExternalLink, FiUpload, FiStar, FiHome } from 'react-icons/fi';
import { apiGet, apiPost, apiPut, apiDelete } from '../api';
import { useConfirm } from '../components/useConfirm';
import RichEditor from '../components/RichEditor';

/* The case-study hero image is always rendered 16:9, so cover-crop the upload
   to exactly that instead of letting the browser squash whatever was chosen. */
const FEATURE_W = 1200;
const FEATURE_H = 675;

function processImage(file, { width, height, maxWidth, quality = 0.85 }) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (width && height) {
        // Cover crop: fill the frame, centre what spills over.
        canvas.width = width;
        canvas.height = height;
        const scale = Math.max(width / img.width, height / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        ctx.drawImage(img, (width - w) / 2, (height - h) / 2, w, h);
      } else {
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
      resolve({ mime: 'image/jpeg', base64: canvas.toDataURL('image/jpeg', quality).split(',')[1] });
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
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState('');
  const { confirm, dialog } = useConfirm();

  const featuredCount = items.filter((p) => p.is_featured).length;

  // which: 'feature_image_url' (case-study hero, cropped 1200x675),
  // 'image_url' (long full-page mockup) or 'logo_url' (small brand mark)
  async function handleUpload(e, which) {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Please choose an image file.'); return; }
    setError('');
    setUploading(which);
    try {
      const opts = which === 'feature_image_url'
        ? { width: FEATURE_W, height: FEATURE_H }
        : { maxWidth: which === 'logo_url' ? 320 : 1400 };
      const { mime, base64 } = await processImage(file, opts);
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

  function startNew() { setForm(EMPTY); setEditId(null); setAdding(true); setError(''); }
  function startEdit(p) { setForm({ ...EMPTY, ...p }); setEditId(p.id); setAdding(false); setError(''); }
  function closeForm() { setEditId(null); setAdding(false); }

  async function save(e) {
    e.preventDefault();
    try {
      const body = { ...form, slug: slugify(form.slug || form.title) };
      if (editId) await apiPut('/portfolio', { id: editId, ...body });
      else await apiPost('/portfolio', body);
      closeForm();
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

  /* The add / edit form. Rendered inline under the row being edited. */
  function websiteForm() {
    return (
      <form className="admin-form admin-form--card" onSubmit={save}>
        <label className="admin-field"><span>Brand / Website Name</span>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="e.g. Chai Tadkaa" /></label>

        <label className="admin-field"><span>Description (one or two lines, shown under the title)</span>
          <textarea rows="3" value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Chai Tadkaa, a premium tea brand, needed a storefront that did more than list products." /></label>

        <div className="admin-field">
          <span>Feature Image — shown at the top of the case study (1200 × 675)</span>
          <label className="admin-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', width: 'fit-content' }}>
            <FiUpload /> {uploading === 'feature_image_url' ? 'Uploading…' : (form.feature_image_url ? 'Change Feature Image' : 'Upload Feature Image')}
            <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'feature_image_url')} style={{ display: 'none' }} />
          </label>
          <small className="admin-muted">Any image works — it is cropped to 1200 × 675 automatically.</small>
          {form.feature_image_url && <img src={form.feature_image_url} alt="Feature preview" style={{ display: 'block', marginTop: 10, width: 280, aspectRatio: '16 / 9', objectFit: 'cover', borderRadius: 8, border: '1px solid #e3e6ee' }} />}
        </div>

        <div className="admin-field">
          <span>Case Study — the write-up shown on the page</span>
          <RichEditor
            value={form.content || ''}
            onChange={(html) => setForm((p) => ({ ...p, content: html }))}
            placeholder="Challenge — what the client needed. Solution — what you built. Results — what it achieved."
          />
        </div>

        <label className="admin-field"><span>Category</span>
          <input value={form.category || ''} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. E-Commerce" /></label>

        <label className="admin-field"><span>Live Website URL</span>
          <input value={form.link_url || ''} onChange={(e) => setForm({ ...form, link_url: e.target.value })} placeholder="https://example.com" /></label>

        <label className="admin-field"><span>Case study URL (auto from the name)</span>
          <input value={form.slug || ''} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder={slugify(form.title) || 'chai-tadkaa'} />
          <small className="admin-muted">digiontop.com/case-study/{slugify(form.slug || form.title) || '…'}</small></label>

        <div className="admin-field">
          <span>Brand Logo — shown beside the name in this list</span>
          <label className="admin-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', width: 'fit-content' }}>
            <FiUpload /> {uploading === 'logo_url' ? 'Uploading…' : (form.logo_url ? 'Change Logo' : 'Upload Logo')}
            <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'logo_url')} style={{ display: 'none' }} />
          </label>
          {form.logo_url && <img src={form.logo_url} alt="Logo preview" style={{ display: 'block', marginTop: 10, maxWidth: 90, maxHeight: 48, objectFit: 'contain', borderRadius: 6, border: '1px solid #e3e6ee' }} />}
        </div>

        <div className="admin-field">
          <span>Full Website Mockup — the long screenshot on the Projects page</span>
          <label className="admin-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', width: 'fit-content' }}>
            <FiUpload /> {uploading === 'image_url' ? 'Uploading…' : (form.image_url ? 'Change Mockup' : 'Upload Mockup')}
            <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'image_url')} style={{ display: 'none' }} />
          </label>
          {form.image_url && <img src={form.image_url} alt="Mockup preview" style={{ display: 'block', marginTop: 10, maxWidth: 160, borderRadius: 8, border: '1px solid #e3e6ee' }} />}
        </div>

        <label className="admin-checkbox">
          <input
            type="checkbox"
            checked={!!form.is_featured}
            onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
          /> Show on home page (any {HOME_LIMIT})
        </label>

        <div className="admin-form__actions">
          <button type="button" className="admin-btn" onClick={closeForm}>Cancel</button>
          <button type="submit" className="admin-btn admin-btn--primary" disabled={!!uploading}>Save</button>
        </div>
      </form>
    );
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

      {adding && websiteForm()}

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
              <Fragment key={p.id}>
                <tr>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                      {p.logo_url
                        ? <img src={p.logo_url} alt="" style={{ width: 36, height: 36, objectFit: 'contain', borderRadius: 8, background: '#f2f4f8', flexShrink: 0 }} />
                        : <span style={{ width: 36, height: 36, borderRadius: 8, background: '#f2f4f8', display: 'grid', placeItems: 'center', fontWeight: 800, color: '#7a8194', flexShrink: 0 }}>{(p.title || '?')[0].toUpperCase()}</span>}
                      <strong>{p.title}</strong>
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
                {editId === p.id && (
                  <tr>
                    <td colSpan="6" style={{ background: '#f7f8fb' }}>{websiteForm()}</td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {dialog}
    </div>
  );
}
