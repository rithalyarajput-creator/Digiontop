import { useEffect, useState } from 'react';
import { FiTrash2, FiEdit2, FiPlus, FiEye, FiEyeOff } from 'react-icons/fi';
import { apiGet, apiPost, apiPut, apiDelete } from '../api';
import { useConfirm } from '../components/useConfirm';

const EMPTY = {
  title: '', tag: 'Instagram', views: '',
  video_url: '', thumb_url: '', instagram_url: '',
  sort_order: 0, is_active: true,
};

const TAGS = ['Instagram', 'Reels', 'YouTube', 'Facebook'];

/* Manages the reels shown in the "We Create Reels That Go Viral" section.
   Add as many as you like — on mobile the strip scrolls through all of them. */
export default function Reels() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const { confirm, dialog } = useConfirm();

  async function load() {
    try { setItems(await apiGet('/cms?resource=reels&all=1')); }
    catch (err) { setError(err.message); }
  }
  useEffect(() => { load(); }, []);

  function startNew() { setForm(EMPTY); setEditId(null); setShowForm(true); }
  function startEdit(r) { setForm({ ...EMPTY, ...r }); setEditId(r.id); setShowForm(true); }

  async function save(e) {
    e.preventDefault();
    try {
      const body = { ...form, sort_order: Number(form.sort_order) || 0 };
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
        These reels appear in the “We Create Reels That Go Viral” section. Add as many as
        you like — on mobile, visitors scroll sideways through all of them.
      </p>
      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      {showForm && (
        <form className="admin-form admin-form--card" onSubmit={save}>
          <label className="admin-field"><span>Title</span>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="e.g. Brand Reel" /></label>
          <label className="admin-field"><span>Platform Tag</span>
            <select value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })}>
              {TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select></label>
          <label className="admin-field"><span>Views (shown on the card, e.g. 12K)</span>
            <input value={form.views || ''} onChange={(e) => setForm({ ...form, views: e.target.value })} placeholder="12K" /></label>
          <label className="admin-field"><span>Video URL (mp4 — plays automatically on the card)</span>
            <input value={form.video_url || ''} onChange={(e) => setForm({ ...form, video_url: e.target.value })} placeholder="https://… or /reel2.mp4" /></label>
          <label className="admin-field"><span>Thumbnail Image URL (used if there is no video)</span>
            <input value={form.thumb_url || ''} onChange={(e) => setForm({ ...form, thumb_url: e.target.value })} placeholder="https://…" /></label>
          {form.thumb_url && (
            <img src={form.thumb_url} alt="Thumbnail preview" style={{ maxWidth: 120, borderRadius: 8, border: '1px solid #e3e6ee' }} />
          )}
          <label className="admin-field"><span>Instagram Reel Link (optional — clicking the card opens it)</span>
            <input value={form.instagram_url || ''} onChange={(e) => setForm({ ...form, instagram_url: e.target.value })} placeholder="https://www.instagram.com/reel/…" /></label>
          <label className="admin-field"><span>Sort Order (lower = shown first)</span>
            <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} /></label>
          <label className="admin-checkbox">
            <input type="checkbox" checked={!!form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /> Visible on website
          </label>
          <div className="admin-form__actions">
            <button type="button" className="admin-btn" onClick={() => setShowForm(false)}>Cancel</button>
            <button type="submit" className="admin-btn admin-btn--primary">Save</button>
          </div>
        </form>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Title</th><th>Tag</th><th>Views</th><th>Media</th><th>Visible</th><th>Actions</th></tr></thead>
          <tbody>
            {items.length === 0 && <tr><td colSpan="6" className="admin-table__empty">None yet. Click “Add Reel” to add your first one.</td></tr>}
            {items.map((r) => (
              <tr key={r.id}>
                <td>{r.title}</td>
                <td>{r.tag}</td>
                <td>{r.views || '-'}</td>
                <td>{r.video_url ? 'Video' : (r.thumb_url ? 'Image' : '-')}</td>
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
