import { useEffect, useState } from 'react';
import { FiTrash2, FiEdit2, FiPlus, FiEye, FiEyeOff, FiUpload } from 'react-icons/fi';
import { apiGet, apiPost, apiPut, apiDelete } from '../api';
import { useConfirm } from '../components/useConfirm';

const EMPTY = {
  title: '', tag: 'Instagram', views: '',
  video_url: '', thumb_url: '', instagram_url: '',
  sort_order: 0, is_active: true,
};

const MAX_VIDEO_BYTES = 3 * 1024 * 1024; // ~3MB — the serverless upload ceiling

/* Read a file as base64 (no compression — used for videos) */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

/* Resize + compress an image file in the browser, return { mime, base64 } */
function compressImage(file, maxWidth = 480, quality = 0.85) {
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

/* Manages the reels shown in the "We Create Reels That Go Viral" section.
   Add as many as you like — the site pages through them with arrows on
   desktop and swipes through them on mobile. */
export default function Reels() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState('');
  const { confirm, dialog } = useConfirm();

  async function load() {
    try { setItems(await apiGet('/cms?resource=reels&all=1')); }
    catch (err) { setError(err.message); }
  }
  useEffect(() => { load(); }, []);

  function startNew() { setForm(EMPTY); setEditId(null); setShowForm(true); }
  function startEdit(r) { setForm({ ...EMPTY, ...r }); setEditId(r.id); setShowForm(true); }

  async function handleVideoUpload(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('video/')) { setError('Please choose a video file (mp4).'); return; }
    if (file.size > MAX_VIDEO_BYTES) {
      setError('Video is too large — keep it under 3 MB (compress it or trim the length).');
      return;
    }
    setError('');
    setUploading('video');
    try {
      const base64 = await fileToBase64(file);
      const resp = await apiPost('/cms?resource=media', { filename: file.name, mime: file.type, data: base64 });
      if (resp && resp.url) setForm((p) => ({ ...p, video_url: resp.url }));
      else setError('Upload failed. Please try again.');
    } catch (err) {
      setError(err.message || 'Upload failed.');
    } finally {
      setUploading('');
    }
  }

  async function handleThumbUpload(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Please choose an image file.'); return; }
    setError('');
    setUploading('thumb');
    try {
      const { mime, base64 } = await compressImage(file);
      const resp = await apiPost('/cms?resource=media', { filename: file.name, mime, data: base64 });
      if (resp && resp.url) setForm((p) => ({ ...p, thumb_url: resp.url }));
      else setError('Upload failed. Please try again.');
    } catch (err) {
      setError(err.message || 'Upload failed.');
    } finally {
      setUploading('');
    }
  }

  async function save(e) {
    e.preventDefault();
    if (!form.video_url && !form.thumb_url) {
      setError('Upload a reel video (or at least a thumbnail image) first.');
      return;
    }
    try {
      const body = { ...form, title: form.title.trim() || 'Reel', sort_order: Number(form.sort_order) || 0 };
      if (editId) await apiPut('/cms?resource=reels', { id: editId, ...body });
      else await apiPost('/cms?resource=reels', body);
      setShowForm(false);
      setError('');
      load();
    } catch (err) { setError(err.message); }
  }

  async function toggleActive(r) {
    try {
      await apiPut('/cms?resource=reels', { id: r.id, is_active: !r.is_active });
      load();
    } catch (err) { setError(err.message); }
  }

  async function remove(id) {
    const ok = await confirm({
      title: 'Delete this reel?',
      message: 'This reel will be permanently removed from the website. This action cannot be undone.',
      confirmLabel: 'Delete reel',
      danger: true,
    });
    if (!ok) return;
    try { await apiDelete(`/cms?resource=reels&id=${id}`); load(); }
    catch (err) { setError(err.message); }
  }

  return (
    <div>
      <div className="admin-page-head">
        <h1 className="admin-page-title">Reels</h1>
        <button className="admin-btn admin-btn--primary" onClick={startNew}><FiPlus /> Add Reel</button>
      </div>
      <p className="admin-page-sub">
        These reels appear in the “We Create Reels That Go Viral” section. Upload the reel
        video and paste its Instagram link — that's it.
      </p>
      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      {showForm && (
        <form className="admin-form admin-form--card" onSubmit={save}>
          <label className="admin-field"><span>Reel Video (mp4, under 3 MB)</span>
            <label className="admin-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', width: 'fit-content' }}>
              <FiUpload /> {uploading === 'video' ? 'Uploading…' : (form.video_url ? 'Change Video' : 'Upload Video')}
              <input type="file" accept="video/mp4,video/webm,video/quicktime" onChange={handleVideoUpload} style={{ display: 'none' }} />
            </label>
          </label>
          {form.video_url && (
            <video src={form.video_url} muted loop autoPlay playsInline style={{ maxWidth: 140, borderRadius: 8, border: '1px solid #e3e6ee' }} />
          )}
          <label className="admin-field"><span>Instagram Reel Link (clicking the reel opens it)</span>
            <input value={form.instagram_url || ''} onChange={(e) => setForm({ ...form, instagram_url: e.target.value })} placeholder="https://www.instagram.com/reel/…" /></label>
          <label className="admin-field"><span>Thumbnail Image (optional — used if there is no video)</span>
            <label className="admin-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', width: 'fit-content' }}>
              <FiUpload /> {uploading === 'thumb' ? 'Uploading…' : (form.thumb_url ? 'Change Image' : 'Upload Image')}
              <input type="file" accept="image/*" onChange={handleThumbUpload} style={{ display: 'none' }} />
            </label>
          </label>
          {form.thumb_url && (
            <img src={form.thumb_url} alt="Thumbnail preview" style={{ maxWidth: 100, borderRadius: 8, border: '1px solid #e3e6ee' }} />
          )}
          <label className="admin-field"><span>Title (optional)</span>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Brand Reel" /></label>
          <div className="admin-form__actions">
            <button type="button" className="admin-btn" onClick={() => setShowForm(false)}>Cancel</button>
            <button type="submit" className="admin-btn admin-btn--primary" disabled={!!uploading}>Save</button>
          </div>
        </form>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Title</th><th>Tag</th><th>Media</th><th>Instagram</th><th>Visible</th><th>Actions</th></tr></thead>
          <tbody>
            {items.length === 0 && <tr><td colSpan="6" className="admin-table__empty">None yet. Click “Add Reel” to add your first one.</td></tr>}
            {items.map((r) => (
              <tr key={r.id}>
                <td>{r.title}</td>
                <td>{r.tag}</td>
                <td>{r.video_url ? 'Video' : (r.thumb_url ? 'Image' : '-')}</td>
                <td>{r.instagram_url ? <a href={r.instagram_url} target="_blank" rel="noopener noreferrer">Open</a> : '-'}</td>
                <td>
                  <button
                    className="admin-icon-btn"
                    title={r.is_active ? 'Visible — click to hide' : 'Hidden — click to show'}
                    onClick={() => toggleActive(r)}
                  >
                    {r.is_active ? <FiEye /> : <FiEyeOff />}
                  </button>
                </td>
                <td className="admin-actions">
                  <button className="admin-icon-btn" onClick={() => startEdit(r)}><FiEdit2 /></button>
                  <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => remove(r.id)}><FiTrash2 /></button>
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
