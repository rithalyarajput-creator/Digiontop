import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import { apiGet, apiPut, apiDelete } from '../api';

const STATUS_TABS = [
  { key: 'all', label: 'All' },
  { key: 'published', label: 'Published' },
  { key: 'draft', label: 'Draft' },
  { key: 'scheduled', label: 'Scheduled' },
];

function statusClass(s) {
  if (s === 'published') return 'converted';
  if (s === 'scheduled') return 'contacted';
  return 'new';
}

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [cats, setCats] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // filters
  const [search, setSearch] = useState('');
  const [statusTab, setStatusTab] = useState('all');
  const [catFilter, setCatFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [sort, setSort] = useState('latest');

  // bulk
  const [selected, setSelected] = useState(new Set());

  async function load() {
    setLoading(true);
    try {
      const [p, c, a] = await Promise.all([
        apiGet('/blog'),
        apiGet('/categories').catch(() => []),
        apiGet('/authors').catch(() => []),
      ]);
      setPosts(p);
      setCats(c);
      setAuthors(a);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    let list = [...posts];
    if (statusTab !== 'all') list = list.filter((p) => p.status === statusTab);
    if (catFilter) list = list.filter((p) => p.category === catFilter);
    if (authorFilter) list = list.filter((p) => p.author === authorFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => (p.title || '').toLowerCase().includes(q));
    }
    list.sort((a, b) => {
      const da = new Date(a.created_at).getTime();
      const db = new Date(b.created_at).getTime();
      return sort === 'latest' ? db - da : da - db;
    });
    return list;
  }, [posts, statusTab, catFilter, authorFilter, search, sort]);

  async function changeStatus(post, status) {
    try {
      await apiPut('/blog', { id: post.id, status });
      setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, status } : p)));
    } catch (err) {
      alert(err.message);
    }
  }

  async function remove(id) {
    if (!confirm('Delete this post?')) return;
    try {
      await apiDelete(`/blog?id=${id}`);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  // ── Bulk actions ──
  function toggleSelect(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
  function toggleSelectAll() {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map((p) => p.id)));
  }

  async function bulkStatus(status) {
    const ids = [...selected];
    if (!ids.length) return;
    try {
      await Promise.all(ids.map((id) => apiPut('/blog', { id, status })));
      setPosts((prev) => prev.map((p) => (selected.has(p.id) ? { ...p, status } : p)));
      setSelected(new Set());
    } catch (err) {
      alert(err.message);
    }
  }

  async function bulkDelete() {
    const ids = [...selected];
    if (!ids.length) return;
    if (!confirm(`Delete ${ids.length} selected post(s)?`)) return;
    try {
      await Promise.all(ids.map((id) => apiDelete(`/blog?id=${id}`)));
      setPosts((prev) => prev.filter((p) => !selected.has(p.id)));
      setSelected(new Set());
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <div className="admin-page-head">
        <h1 className="admin-page-title">Blog Posts</h1>
        <Link to="/admin/blog/new" className="admin-btn admin-btn--primary"><FiPlus /> New Post</Link>
      </div>

      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      {/* Status tabs */}
      <div className="admin-tabs">
        {STATUS_TABS.map((t) => {
          const count = t.key === 'all' ? posts.length : posts.filter((p) => p.status === t.key).length;
          return (
            <button
              key={t.key}
              className={`admin-tab${statusTab === t.key ? ' admin-tab--active' : ''}`}
              onClick={() => setStatusTab(t.key)}
            >
              {t.label} <span className="admin-tab__count">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Filter bar */}
      <div className="admin-filterbar">
        <div className="admin-search">
          <FiSearch />
          <input
            type="text"
            placeholder="Search by title…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className="admin-select">
          <option value="">All Categories</option>
          {cats.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
        <select value={authorFilter} onChange={(e) => setAuthorFilter(e.target.value)} className="admin-select">
          <option value="">All Authors</option>
          {authors.map((a) => <option key={a.id} value={a.name}>{a.name}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="admin-select">
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="admin-bulkbar">
          <span>{selected.size} selected</span>
          <button className="admin-btn admin-btn--sm" onClick={() => bulkStatus('published')}>Publish</button>
          <button className="admin-btn admin-btn--sm" onClick={() => bulkStatus('draft')}>Draft</button>
          <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={bulkDelete}>Delete</button>
        </div>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: 36 }}>
                <input
                  type="checkbox"
                  checked={filtered.length > 0 && selected.size === filtered.length}
                  onChange={toggleSelectAll}
                />
              </th>
              <th>Title</th><th>Category</th><th>Author</th><th>Status</th><th>Views</th><th>Date</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan="8" className="admin-table__empty">Loading…</td></tr>}
            {!loading && filtered.length === 0 && (
              <tr><td colSpan="8" className="admin-table__empty">No posts found.</td></tr>
            )}
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>
                  <input type="checkbox" checked={selected.has(p.id)} onChange={() => toggleSelect(p.id)} />
                </td>
                <td>{p.title}</td>
                <td>{p.category || '—'}</td>
                <td>{p.author || '—'}</td>
                <td>
                  <select
                    className={`admin-status-select admin-status-select--${statusClass(p.status)}`}
                    value={p.status}
                    onChange={(e) => changeStatus(p, e.target.value)}
                  >
                    <option value="draft">draft</option>
                    <option value="published">published</option>
                    <option value="scheduled">scheduled</option>
                  </select>
                </td>
                <td>{p.views ?? 0}</td>
                <td>{new Date(p.created_at).toLocaleDateString()}</td>
                <td className="admin-actions">
                  <Link to={`/admin/blog/edit/${p.id}`} className="admin-icon-btn" title="Edit"><FiEdit2 /></Link>
                  <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => remove(p.id)} title="Delete"><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
