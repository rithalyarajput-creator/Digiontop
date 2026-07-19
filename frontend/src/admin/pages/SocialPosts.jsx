import { useEffect, useMemo, useState } from 'react';
import {
  FiPlus, FiTrash2, FiEdit2, FiExternalLink, FiHeart, FiEye,
  FiInstagram, FiFacebook, FiLinkedin, FiYoutube, FiTwitter, FiShare2,
} from 'react-icons/fi';
import { apiGet, apiPost, apiPut, apiDelete } from '../api';
import { useConfirm } from '../components/useConfirm';

const fmt = (n) => (n ?? 0).toLocaleString('en-IN');

const PLATFORMS = [
  { key: 'instagram', label: 'Instagram', icon: FiInstagram, color: '#E1306C' },
  { key: 'facebook', label: 'Facebook', icon: FiFacebook, color: '#1877F2' },
  { key: 'linkedin', label: 'LinkedIn', icon: FiLinkedin, color: '#0A66C2' },
  { key: 'youtube', label: 'YouTube', icon: FiYoutube, color: '#FF0000' },
  { key: 'twitter', label: 'Twitter / X', icon: FiTwitter, color: '#111' },
  { key: 'other', label: 'Other', icon: FiShare2, color: '#666' },
];
const PLATFORM_MAP = PLATFORMS.reduce((a, p) => { a[p.key] = p; return a; }, {});

const EMPTY = {
  platform: 'instagram', posted_at: '', caption: '', post_url: '',
  likes: '', views: '', comments: '', shares: '', notes: '',
};

function fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d)) return '—';
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function SocialPosts() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { confirm, dialog } = useConfirm();

  async function load() {
    setLoading(true);
    try {
      setItems(await apiGet('/cms?resource=social'));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  // Per-platform totals for the summary cards.
  const summary = useMemo(() => {
    const acc = {};
    for (const p of PLATFORMS) acc[p.key] = { posts: 0, likes: 0, views: 0 };
    for (const it of items) {
      const k = acc[it.platform] ? it.platform : 'other';
      acc[k].posts += 1;
      acc[k].likes += it.likes || 0;
      acc[k].views += it.views || 0;
    }
    return acc;
  }, [items]);

  const filtered = useMemo(
    () => (filter === 'all' ? items : items.filter((i) => i.platform === filter)),
    [items, filter]
  );

  function startNew() { setForm(EMPTY); setEditId(null); setShowForm(true); setError(''); }
  function startEdit(p) {
    setForm({
      platform: p.platform || 'instagram',
      posted_at: p.posted_at ? p.posted_at.slice(0, 10) : '',
      caption: p.caption || '', post_url: p.post_url || '',
      likes: p.likes ?? '', views: p.views ?? '',
      comments: p.comments ?? '', shares: p.shares ?? '',
      notes: p.notes || '',
    });
    setEditId(p.id);
    setShowForm(true);
    setError('');
  }

  async function handleSave(e) {
    e.preventDefault();
    setError('');
    const payload = { ...form, posted_at: form.posted_at || null };
    try {
      if (editId) {
        const updated = await apiPut('/cms?resource=social', { id: editId, ...payload });
        setItems((prev) => prev.map((x) => (x.id === editId ? updated : x)));
      } else {
        const created = await apiPost('/cms?resource=social', payload);
        setItems((prev) => [created, ...prev]);
      }
      setShowForm(false);
      setForm(EMPTY);
      setEditId(null);
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(p) {
    const ok = await confirm({
      title: 'Delete this post entry?',
      message: 'This social post record will be permanently removed.',
      confirmLabel: 'Delete',
      danger: true,
    });
    if (!ok) return;
    try {
      await apiDelete(`/cms?resource=social&id=${p.id}`);
      setItems((prev) => prev.filter((x) => x.id !== p.id));
    } catch (err) {
      setError(err.message);
    }
  }

  // The single best-performing post (by likes) — quick "kaunsa chala" answer.
  const topPost = useMemo(() => {
    if (!items.length) return null;
    return [...items].sort((a, b) => (b.likes || 0) - (a.likes || 0))[0];
  }, [items]);

  return (
    <div>
      <div className="admin-shop-head">
        <h1>Social Posts</h1>
        <div className="admin-shop-head__actions">
          <button className="admin-sbtn admin-sbtn--primary" onClick={startNew}><FiPlus /> Add post</button>
        </div>
      </div>

      {error && <div className="admin-salert">{error}</div>}

      {/* Per-platform summary cards */}
      <div className="admin-stats">
        {PLATFORMS.filter((p) => summary[p.key].posts > 0).map((p) => {
          const Icon = p.icon;
          const s = summary[p.key];
          return (
            <div className="admin-stat-card" key={p.key}>
              <span className="admin-stat-card__icon" style={{ color: p.color }}><Icon /></span>
              <div>
                <div className="admin-stat-card__value">{fmt(s.posts)}</div>
                <div className="admin-stat-card__label">
                  {p.label} · {fmt(s.likes)} likes
                </div>
              </div>
            </div>
          );
        })}
        {items.length === 0 && !loading && (
          <div className="admin-stat-card">
            <span className="admin-stat-card__icon"><FiShare2 /></span>
            <div>
              <div className="admin-stat-card__value">0</div>
              <div className="admin-stat-card__label">No posts tracked yet</div>
            </div>
          </div>
        )}
      </div>

      {topPost && (
        <div className="admin-salert" style={{ background: '#fff8e6', color: '#7a5c00', border: '1px solid #ffe4a3' }}>
          🏆 Top post so far: <strong>{PLATFORM_MAP[topPost.platform]?.label || topPost.platform}</strong>
          {' '}— {fmt(topPost.likes)} likes{topPost.caption ? ` · "${topPost.caption.slice(0, 60)}"` : ''}
        </div>
      )}

      {showForm && (
        <form className="admin-card admin-sform" onSubmit={handleSave}>
          <div className="admin-card__header">
            <h2>{editId ? 'Edit post' : 'Add social post'}</h2>
          </div>
          <div className="admin-card__body">
            <div className="admin-sform__grid">
              <label className="admin-sfield"><span>Platform *</span>
                <select value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })}>
                  {PLATFORMS.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
                </select>
              </label>
              <label className="admin-sfield"><span>Posted on</span>
                <input type="date" value={form.posted_at} onChange={(e) => setForm({ ...form, posted_at: e.target.value })} />
              </label>
            </div>

            <label className="admin-sfield"><span>Caption / what the post was about</span>
              <textarea rows="2" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} placeholder="e.g. Diwali offer reel, client success story…" />
            </label>

            <label className="admin-sfield"><span>Post link</span>
              <input value={form.post_url} onChange={(e) => setForm({ ...form, post_url: e.target.value })} placeholder="https://…" />
            </label>

            <p className="admin-sform__section">Performance</p>
            <div className="admin-sform__grid">
              <label className="admin-sfield"><span>Likes</span>
                <input type="number" min="0" value={form.likes} onChange={(e) => setForm({ ...form, likes: e.target.value })} />
              </label>
              <label className="admin-sfield"><span>Views / Reach</span>
                <input type="number" min="0" value={form.views} onChange={(e) => setForm({ ...form, views: e.target.value })} />
              </label>
            </div>
            <div className="admin-sform__grid">
              <label className="admin-sfield"><span>Comments</span>
                <input type="number" min="0" value={form.comments} onChange={(e) => setForm({ ...form, comments: e.target.value })} />
              </label>
              <label className="admin-sfield"><span>Shares</span>
                <input type="number" min="0" value={form.shares} onChange={(e) => setForm({ ...form, shares: e.target.value })} />
              </label>
            </div>

            <label className="admin-sfield"><span>Notes (optional)</span>
              <input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Any note for yourself" />
            </label>
          </div>
          <div className="admin-sform__actions">
            <button type="button" className="admin-sbtn" onClick={() => { setShowForm(false); setEditId(null); }}>Cancel</button>
            <button type="submit" className="admin-sbtn admin-sbtn--primary">{editId ? 'Save changes' : 'Add post'}</button>
          </div>
        </form>
      )}

      {/* Platform filter */}
      <div className="admin-pills" style={{ marginTop: 4 }}>
        <button type="button" className={`admin-pill${filter === 'all' ? ' admin-pill--active' : ''}`} onClick={() => setFilter('all')}>
          All ({items.length})
        </button>
        {PLATFORMS.filter((p) => summary[p.key].posts > 0).map((p) => (
          <button key={p.key} type="button" className={`admin-pill${filter === p.key ? ' admin-pill--active' : ''}`} onClick={() => setFilter(p.key)}>
            {p.label} ({summary[p.key].posts})
          </button>
        ))}
      </div>

      <div className="admin-card">
        <div className="admin-card__scrollx">
          <table className="admin-shop-table">
            <thead>
              <tr>
                <th>Platform</th>
                <th>Post</th>
                <th>Date</th>
                <th className="is-right">Likes</th>
                <th className="is-right">Views</th>
                <th className="is-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan="6" className="admin-shop-table__empty">Loading…</td></tr>}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan="6" className="admin-shop-table__empty">No posts tracked yet. Click “Add post” to start.</td></tr>
              )}
              {!loading && filtered.map((p) => {
                const plat = PLATFORM_MAP[p.platform] || PLATFORM_MAP.other;
                const Icon = plat.icon;
                return (
                  <tr key={p.id}>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600, color: plat.color }}>
                        <Icon /> {plat.label}
                      </span>
                    </td>
                    <td>
                      <div style={{ minWidth: 0 }}>
                        <p className="admin-shop-table__name admin-shop-table__trunc">{p.caption || '—'}</p>
                        {p.post_url && (
                          <a href={p.post_url} target="_blank" rel="noreferrer" className="admin-shop-table__sub" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            View post <FiExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="is-muted">{fmtDate(p.posted_at)}</td>
                    <td className="is-right"><FiHeart style={{ verticalAlign: -1 }} /> {fmt(p.likes)}</td>
                    <td className="is-right"><FiEye style={{ verticalAlign: -1 }} /> {fmt(p.views)}</td>
                    <td className="is-right">
                      <div className="admin-srow-actions">
                        <button className="admin-sicon" onClick={() => startEdit(p)} title="Edit"><FiEdit2 /></button>
                        <button className="admin-sicon admin-sicon--danger" onClick={() => remove(p)} title="Delete"><FiTrash2 /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {dialog}
    </div>
  );
}
