import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiSearch, FiFileText, FiCheckCircle, FiEdit3, FiEye } from 'react-icons/fi';
import { apiGet, apiPut, apiDelete } from '../api';
import { useConfirm } from '../components/useConfirm';

const fmt = (n) => (n ?? 0).toLocaleString('en-IN');

const STATUS_TABS = [
  { key: 'all', label: 'All' },
  { key: 'published', label: 'Published' },
  { key: 'draft', label: 'Draft' },
  { key: 'scheduled', label: 'Scheduled' },
];

function statusVariant(s) {
  if (s === 'published') return 'success';
  if (s === 'scheduled') return 'info';
  return 'warning';
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

  // Total views comes from /stats (a plain SUM across all posts) rather than
  // summing `posts` client-side, so the card stays accurate even when a
  // status/category filter narrows what's in the table below.
  const [totalViews, setTotalViews] = useState(0);

  const { confirm, dialog } = useConfirm();

  async function load() {
    setLoading(true);
    try {
      const [p, c, a] = await Promise.all([
        apiGet('/blog'),
        apiGet('/cms?resource=categories').catch(() => []),
        apiGet('/cms?resource=authors').catch(() => []),
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

  useEffect(() => {
    load();
    apiGet('/stats').then((d) => setTotalViews(d?.counts?.totalViews ?? 0)).catch(() => {});
  }, []);

  const statCounts = useMemo(() => ({
    total: posts.length,
    published: posts.filter((p) => p.status === 'published').length,
    draft: posts.filter((p) => p.status === 'draft').length,
    scheduled: posts.filter((p) => p.status === 'scheduled').length,
  }), [posts]);

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

  const hasFilters = Boolean(search.trim() || catFilter || authorFilter || statusTab !== 'all');

  function clearFilters() {
    setSearch('');
    setCatFilter('');
    setAuthorFilter('');
    setStatusTab('all');
  }

  async function changeStatus(post, status) {
    try {
      await apiPut('/blog', { id: post.id, status });
      setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, status } : p)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(id) {
    const ok = await confirm({
      title: 'Delete this post?',
      message: 'This blog post will be permanently removed. This action cannot be undone.',
      confirmLabel: 'Delete',
      danger: true,
    });
    if (!ok) return;
    try {
      await apiDelete(`/blog?id=${id}`);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message);
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
      setError(err.message);
    }
  }

  async function bulkDelete() {
    const ids = [...selected];
    if (!ids.length) return;
    const ok = await confirm({
      title: `Delete ${ids.length} selected post${ids.length === 1 ? '' : 's'}?`,
      message: 'These blog posts will be permanently removed. This action cannot be undone.',
      confirmLabel: `Delete ${ids.length} post${ids.length === 1 ? '' : 's'}`,
      danger: true,
    });
    if (!ok) return;
    try {
      await Promise.all(ids.map((id) => apiDelete(`/blog?id=${id}`)));
      setPosts((prev) => prev.filter((p) => !selected.has(p.id)));
      setSelected(new Set());
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <div className="admin-shop-head">
        <h1>Blog posts</h1>
        <Link to="/admin/blog/new" className="admin-sbtn admin-sbtn--primary">Add blog post</Link>
      </div>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <span className="admin-stat-card__icon"><FiFileText /></span>
          <div>
            <div className="admin-stat-card__value">{fmt(statCounts.total)}</div>
            <div className="admin-stat-card__label">Total Blogs</div>
          </div>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-card__icon"><FiCheckCircle /></span>
          <div>
            <div className="admin-stat-card__value">{fmt(statCounts.published)}</div>
            <div className="admin-stat-card__label">Published</div>
          </div>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-card__icon"><FiEdit3 /></span>
          <div>
            <div className="admin-stat-card__value">{fmt(statCounts.draft)}</div>
            <div className="admin-stat-card__label">Drafts</div>
          </div>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-card__icon"><FiEye /></span>
          <div>
            <div className="admin-stat-card__value">{fmt(totalViews)}</div>
            <div className="admin-stat-card__label">Total Traffic (Views)</div>
          </div>
        </div>
      </div>

      {error && <div className="admin-salert">{error}</div>}

      <div className="admin-card">
        {/* Status tabs */}
        <div className="admin-card__tabs">
          {STATUS_TABS.map((t) => {
            const count = t.key === 'all' ? posts.length : posts.filter((p) => p.status === t.key).length;
            const active = statusTab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                className={`admin-card__tab${active ? ' admin-card__tab--active' : ''}`}
                onClick={() => setStatusTab(t.key)}
              >
                {t.label}
                <span className="admin-card__tab-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Search + filters */}
        <div className="admin-card__search">
          <FiSearch />
          <input
            type="text"
            placeholder="Search blog posts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className="admin-card__filter">
            <option value="">All categories</option>
            {cats.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          <select value={authorFilter} onChange={(e) => setAuthorFilter(e.target.value)} className="admin-card__filter">
            <option value="">All authors</option>
            {authors.map((a) => <option key={a.id} value={a.name}>{a.name}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="admin-card__filter">
            <option value="latest">Latest first</option>
            <option value="oldest">Oldest first</option>
          </select>
          {hasFilters && (
            <button type="button" className="admin-card__clear" onClick={clearFilters}>Clear</button>
          )}
        </div>

        {/* Bulk action bar */}
        {selected.size > 0 && (
          <div className="admin-card__bulk">
            <span>{selected.size} selected</span>
            <div className="admin-shop-head__actions">
              <button type="button" className="admin-sbtn admin-sbtn--sm" onClick={() => bulkStatus('published')}>Publish</button>
              <button type="button" className="admin-sbtn admin-sbtn--sm" onClick={() => bulkStatus('draft')}>Draft</button>
              <button type="button" className="admin-sbtn admin-sbtn--sm admin-sbtn--danger" onClick={bulkDelete}>Delete</button>
            </div>
          </div>
        )}

        <div className="admin-card__scrollx">
          <table className="admin-shop-table">
            <thead>
              <tr>
                <th className="admin-shop-table__check">
                  <input
                    type="checkbox"
                    checked={filtered.length > 0 && selected.size === filtered.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>Post</th>
                <th>Status</th>
                <th>Author</th>
                <th>Date</th>
                <th className="is-right">Views</th>
                <th className="is-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan="7" className="admin-shop-table__empty">Loading…</td></tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan="7" className="admin-shop-empty">
                    <div className="admin-shop-empty__icon"><FiFileText /></div>
                    <p className="admin-shop-empty__title">No blog posts found</p>
                    <p className="admin-shop-empty__text">
                      {hasFilters ? 'No posts match your current filters.' : 'Create your first blog post to get started.'}
                    </p>
                    {hasFilters ? (
                      <button type="button" className="admin-sbtn" onClick={clearFilters}>Clear filters</button>
                    ) : (
                      <Link to="/admin/blog/new" className="admin-sbtn admin-sbtn--primary">Add blog post</Link>
                    )}
                  </td>
                </tr>
              )}
              {!loading && filtered.map((p) => (
                <tr key={p.id}>
                  <td className="admin-shop-table__check">
                    <input type="checkbox" checked={selected.has(p.id)} onChange={() => toggleSelect(p.id)} />
                  </td>
                  <td>
                    <div className="admin-shop-table__media">
                      <span className="admin-shop-table__thumb admin-shop-table__thumb--square">
                        {p.image_url
                          ? <img src={p.image_url} alt="" loading="lazy" />
                          : <FiFileText />}
                      </span>
                      <div style={{ minWidth: 0 }}>
                        <Link
                          to={`/admin/blog/edit/${p.id}`}
                          className="admin-shop-table__link admin-shop-table__trunc"
                          style={{ display: 'block' }}
                        >
                          {p.title}
                        </Link>
                        {p.category && <p className="admin-shop-table__sub">{p.category}</p>}
                      </div>
                    </div>
                  </td>
                  <td>
                    <select
                      className={`admin-sbadge admin-sbadge--${statusVariant(p.status)} admin-sbadge-select`}
                      value={p.status}
                      onChange={(e) => changeStatus(p, e.target.value)}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                  </td>
                  <td className="is-muted">{p.author || '—'}</td>
                  <td className="is-muted">
                    {new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                  </td>
                  <td className="is-right is-muted">{(p.views ?? 0).toLocaleString()}</td>
                  <td className="is-right">
                    <div className="admin-srow-actions">
                      <Link to={`/admin/blog/edit/${p.id}`} className="admin-sicon" title="Edit"><FiEdit2 /></Link>
                      <button
                        type="button"
                        className="admin-sicon admin-sicon--danger"
                        onClick={() => remove(p.id)}
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {dialog}
    </div>
  );
}
