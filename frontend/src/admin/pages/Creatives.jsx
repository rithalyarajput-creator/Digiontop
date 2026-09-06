import { useEffect, useState } from 'react';
import { FiTrash2, FiEdit2, FiPlus, FiEye, FiEyeOff, FiUpload } from 'react-icons/fi';
import { apiGet, apiPost, apiPut, apiDelete } from '../api';
import { useConfirm } from '../components/useConfirm';

const EMPTY = { title: '', tag: 'Product Creative', image_url: '', sort_order: 0, is_active: true };

/* Resize + compress an image file in the browser, return { mime, base64 } */
function compressImage(file, maxWidth = 900, quality = 0.85) {
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

/* Manages the graphics shown in the "Creative Posts That Convert" row on
   /portfolio. Exactly 3 show at a time — visitors page through the rest
   with the left/right arrows or a swipe. */
export default function Creatives() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const { confirm, dialog } = useConfirm();

  async function load() {
    try { setItems(await apiGet('/cms?resource=creatives&all=1')); }
    catch (err) { setError(err.message); }
  }
  useEffect(() => { load(); }, []);

  function startNew() { setForm({ ...EMPTY, sort_order: items.length }); setEditId(null); setShowForm(true); }
  function startEdit(c) { setForm({ ...EMPTY, ...c }); setEditId(c.id); setShowForm(true); }

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
      if (resp && resp.url) setForm((p) => ({ ...p, image_url: resp.url }));
      else setError('Upload failed. Please try again.');
    } catch (err) {
      setError(err.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  async function save(e) {
    e.preventDefault();
    if (!form.image_url) { setError('Upload a graphic first.'); return; }
    try {
      const body = { ...form, title: form.title.trim() || 'Creative', sort_order: Number(form.sort_order) || 0 };
      if (editId) await apiPut('/cms?resource=creatives', { id: editId, ...body });
      else await apiPost('/cms?resource=creatives', body);
      setShowForm(false);
      setError('');
      load();
    } catch (err) { setError(err.message); }
  }

  async function toggleActive(c) {
    try {
      await apiPut('/cms?resource=creatives', { id: c.id, is_active: !c.is_active });
      load();
    } catch (err) { setError(err.message); }
  }

  async function remove(id) {
    const ok = await confirm({
      title: 'Delete this graphic?',
      message: 'This graphic will be permanently removed from the website. This action cannot be undone.',
      confirmLabel: 'Delete graphic',
      danger: true,
    });
    if (!ok) return;
    try { await apiDelete(`/cms?resource=creatives&id=${id}`); load(); }
    catch (err) { setError(err.message); }
  }

  return (
    <div>
      <div className="admin-page-head">
        <h1 className="admin-page-title">Creatives</h1>
        <button className="admin-btn admin-btn--primary" onClick={startNew}><FiPlus /> Add Graphic</button>
      </div>
      <p className="admin-page-sub">
        These show in the "Creative Posts That Convert" row on the Projects page. Add as many
        as you like — visitors always see 3 at a time and use the arrows or a swipe for the rest.
      </p>
      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      {showForm && (
        <form className="admin-form admin-form--card" onSubmit={save}>
          <label className="admin-field"><span>Graphic (square works best)</span>
            <label className="admin-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', width: 'fit-content' }}>
              <FiUpload /> {uploading ? 'Uploading…' : (form.image_url ? 'Change Graphic' : 'Upload Graphic')}
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            </label>
          </label>
          {form.image_url && (
            <img src={form.image_url} alt="Preview" style={{ maxWidth: 160, borderRadius: 8, border: '1px solid #e3e6ee' }} />
          )}
          <label className="admin-field"><span>Title</span>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Jhumka Collection" /></label>
          <label className="admin-field"><span>Tag (shown under the title)</span>
            <input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} placeholder="e.g. Product Creative" /></label>
          <label className="admin-field"><span>Order (lower shows first)</span>
            <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} /></label>
          <div className="admin-form__actions">
            <button type="button" className="admin-btn" onClick={() => setShowForm(false)}>Cancel</button>
            <button type="submit" className="admin-btn admin-btn--primary" disabled={uploading}>Save</button>
          </div>
        </form>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Graphic</th><th>Title</th><th>Tag</th><th>Order</th><th>Visible</th><th>Actions</th></tr></thead>
          <tbody>
            {items.length === 0 && <tr><td colSpan="6" className="admin-table__empty">None yet. Click “Add Graphic” to add your first one.</td></tr>}
            {items.map((c) => (
              <tr key={c.id}>
                <td>{c.image_url ? <img src={c.image_url} alt="" style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 8 }} /> : '-'}</td>
                <td>{c.title}</td>
                <td>{c.tag}</td>
                <td>{c.sort_order}</td>
                <td>
                  <button
                    className="admin-icon-btn"
                    title={c.is_active ? 'Visible — click to hide' : 'Hidden — click to show'}
                    onClick={() => toggleActive(c)}
                  >
                    {c.is_active ? <FiEye /> : <FiEyeOff />}
                  </button>
                </td>
                <td className="admin-actions">
                  <button className="admin-icon-btn" onClick={() => startEdit(c)}><FiEdit2 /></button>
                  <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => remove(c.id)}><FiTrash2 /></button>
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
