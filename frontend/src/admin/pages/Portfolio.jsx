import { useEffect, useState } from 'react';
import { FiTrash2, FiEdit2, FiPlus, FiExternalLink, FiUpload } from 'react-icons/fi';
import { apiGet, apiPost, apiPut, apiDelete } from '../api';
import { useConfirm } from '../components/useConfirm';

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

const EMPTY = {
  title: '', category: 'Website', description: '',
  image_url: '', link_url: '', logo_url: '',
  client_name: '', results: '', is_featured: false,
};

/* Manages the "Websites We've Built" cards on the public /portfolio page.
   Each row = one website card: name, live URL, mockup screenshot, logo. */
export default function Portfolio() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState('');
  const { confirm, dialog } = useConfirm();

  // which: 'image_url' (mockup, big) or 'logo_url' (small)
  async function handleUpload(e, which) {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Please choose an image file.'); return; }
    setError('');
    setUploading(which);
    try {
      const { mime, base64 } = await compressImage(file, which === 'logo_url' ? 320 : 1200);
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

  function startNew() { setForm(EMPTY); setEditId(null); setShowForm(true); }
  function startEdit(p) { setForm({ ...EMPTY, ...p }); setEditId(p.id); setShowForm(true); }

  async function save(e) {
    e.preventDefault();
    try {
      if (editId) await apiPut('/portfolio', { id: editId, ...form });
      else await apiPost('/portfolio', form);
      setShowForm(false);
      setError('');
      load();
    } catch (err) { setError(err.message); }
  }

  async function remove(id) {
    const ok = await confirm({
      title: 'Delete this website?',
      message: 'This website card will be permanently removed from the Projects page. This action cannot be undone.',
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
        These cards appear in the “Websites We've Built” section of the Projects page.
      </p>
      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      {showForm && (
        <form className="admin-form admin-form--card" onSubmit={save}>
          <label className="admin-field"><span>Website Name</span>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="e.g. Amshine Jewels" /></label>
          <label className="admin-field"><span>Category / Tag</span>
            <input value={form.category || ''} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Jewellery E-Commerce" /></label>
          <label className="admin-field"><span>Website URL (live link — card becomes clickable)</span>
            <input value={form.link_url || ''} onChange={(e) => setForm({ ...form, link_url: e.target.value })} placeholder="https://example.com" /></label>
          <label className="admin-field"><span>Website Mockup Image (screenshot shown on the card)</span>
            <label className="admin-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', width: 'fit-content' }}>
              <FiUpload /> {uploading === 'image_url' ? 'Uploading…' : (form.image_url ? 'Change Mockup' : 'Upload Mockup')}
              <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'image_url')} style={{ display: 'none' }} />
            </label>
          </label>
          {form.image_url && (
            <img src={form.image_url} alt="Mockup preview" style={{ maxWidth: 260, borderRadius: 8, border: '1px solid #e3e6ee' }} />
          )}
          <label className="admin-field"><span>Website Logo (optional, shown beside the name)</span>
            <label className="admin-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', width: 'fit-content' }}>
              <FiUpload /> {uploading === 'logo_url' ? 'Uploading…' : (form.logo_url ? 'Change Logo' : 'Upload Logo')}
              <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'logo_url')} style={{ display: 'none' }} />
            </label>
          </label>
          {form.logo_url && (
            <img src={form.logo_url} alt="Logo preview" style={{ maxWidth: 90, maxHeight: 48, borderRadius: 6, border: '1px solid #e3e6ee', objectFit: 'contain' }} />
          )}
          <label className="admin-field"><span>Description (optional)</span>
            <textarea rows="2" value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
          <div className="admin-form__actions">
            <button type="button" className="admin-btn" onClick={() => setShowForm(false)}>Cancel</button>
            <button type="submit" className="admin-btn admin-btn--primary" disabled={!!uploading}>Save</button>
          </div>
        </form>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Website</th><th>Category</th><th>Live URL</th><th>Mockup</th><th>Actions</th></tr></thead>
          <tbody>
            {items.length === 0 && <tr><td colSpan="5" className="admin-table__empty">None yet. Click “Add Website” to add your first one.</td></tr>}
            {items.map((p) => (
              <tr key={p.id}>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    {p.logo_url && <img src={p.logo_url} alt="" style={{ width: 24, height: 24, objectFit: 'contain', borderRadius: 4 }} />}
                    {p.title}
                  </span>
                </td>
                <td>{p.category}</td>
                <td>
                  {p.link_url
                    ? <a href={p.link_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>Visit <FiExternalLink /></a>
                    : '-'}
                </td>
                <td>{p.image_url ? <img src={p.image_url} alt="" style={{ width: 72, borderRadius: 4 }} /> : '-'}</td>
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
