import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiFileText, FiInbox, FiTrendingUp } from 'react-icons/fi';
import { apiGet } from '../api';

const fmt = (n) => (n ?? 0).toLocaleString('en-IN');

const RANGES = [
  { key: 'today', label: 'Today', days: 1 },
  { key: '7d', label: 'Last 7 days', days: 7 },
  { key: '30d', label: 'Last 30 days', days: 30 },
  { key: 'month', label: 'This month', days: null },
  { key: 'year', label: 'This year', days: null },
];

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

function rangeBounds(key) {
  const today = startOfDay(new Date());
  const end = new Date(today);
  end.setHours(23, 59, 59, 999);
  let start;
  if (key === 'today') start = today;
  else if (key === '7d') start = new Date(today.getTime() - 6 * 86400000);
  else if (key === '30d') start = new Date(today.getTime() - 29 * 86400000);
  else if (key === 'month') start = new Date(today.getFullYear(), today.getMonth(), 1);
  else start = new Date(today.getFullYear(), 0, 1);
  return { start, end };
}

const fmtDate = (d) =>
  d.toLocaleDateString('en-IN', { month: 'short', day: '2-digit', year: 'numeric' });

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState('30d');

  useEffect(() => {
    (async () => {
      try {
        setData(await apiGet('/stats'));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const c = data?.counts || {};
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const { start, end } = useMemo(() => rangeBounds(range), [range]);

  // Lead activity for the selected range, derived client-side from the
  // notifications feed that /stats already returns (no extra API calls).
  const series = useMemo(() => {
    const leads = (data?.notifications || []).filter((n) => n.type === 'lead');
    const days = Math.max(1, Math.round((startOfDay(end) - start) / 86400000) + 1);
    const buckets = Array.from({ length: Math.min(days, 31) }, (_, i) => {
      const d = new Date(startOfDay(end).getTime() - (Math.min(days, 31) - 1 - i) * 86400000);
      return { date: d, count: 0 };
    });
    leads.forEach((l) => {
      const t = startOfDay(new Date(l.created_at)).getTime();
      const b = buckets.find((x) => x.date.getTime() === t);
      if (b) b.count += 1;
    });
    return buckets;
  }, [data, range, start, end]);

  const rangeLeads = series.reduce((s, b) => s + b.count, 0);
  const maxBar = Math.max(1, ...series.map((b) => b.count));

  return (
    <div>
      {/* Greeting */}
      <div className="admin-greeting">
        <h1>{greeting}, Admin</h1>
      </div>

      {/* Date range pills */}
      <div className="admin-pills">
        {RANGES.map((r) => (
          <button
            key={r.key}
            type="button"
            onClick={() => setRange(r.key)}
            className={`admin-pill${range === r.key ? ' admin-pill--active' : ''}`}
          >
            {r.label}
          </button>
        ))}
      </div>
      <p className="admin-pills__range">
        {fmtDate(start)} &ndash; {fmtDate(new Date())}
      </p>

      {error && <div className="admin-alert admin-alert--error">{error}</div>}
      {loading && <p className="admin-muted" style={{ marginBottom: 16 }}>Loading dashboard…</p>}

      {/* Primary metric — Total leads + activity chart */}
      <div className="admin-card admin-hero-card">
        <div style={{ padding: '1.25rem' }}>
          <p className="admin-hero-card__label">Total leads</p>
          <p className="admin-hero-card__value">{fmt(c.leads)}</p>
          <p className="admin-hero-card__meta">
            {fmt(rangeLeads)} in selected range
            {c.leadsNew > 0 ? ` · ${fmt(c.leadsNew)} new to action` : ''}
          </p>
        </div>
        <div className="admin-hero-card__chart">
          {series.length > 0 ? (
            <svg viewBox={`0 0 ${series.length * 20} 100`} preserveAspectRatio="none" role="img">
              <title>New leads per day</title>
              {series.map((b, i) => {
                const h = (b.count / maxBar) * 88;
                return (
                  <rect
                    key={b.date.toISOString()}
                    x={i * 20 + 4}
                    y={96 - h}
                    width={12}
                    height={Math.max(h, 1)}
                    rx={2}
                    fill="#2a9d3e"
                  />
                );
              })}
              <line x1="0" y1="97" x2={series.length * 20} y2="97" stroke="#f1f1f1" strokeWidth="1" />
            </svg>
          ) : (
            <div className="admin-hero-card__empty">No lead activity yet</div>
          )}
        </div>
      </div>

      {/* 4-column metrics grid */}
      <div className="admin-metrics-grid">
        <Link to="/admin/blog" className="admin-metric">
          <p className="admin-metric__label">Published blogs</p>
          <p className="admin-metric__value">{fmt(c.blogPublished)}</p>
          {c.blogDraft > 0 && <p className="admin-metric__hint">{fmt(c.blogDraft)} drafts pending</p>}
        </Link>
        <div className="admin-metric">
          <p className="admin-metric__label">Total blog views</p>
          <p className="admin-metric__value">{fmt(c.totalViews)}</p>
          <p className="admin-metric__sub">{fmt(c.blogTotal)} posts total</p>
        </div>
        <Link to="/admin/newsletter" className="admin-metric">
          <p className="admin-metric__label">Newsletter subscribers</p>
          <p className="admin-metric__value">{fmt(c.subscribers)}</p>
        </Link>
        <Link to="/admin/blog" className="admin-metric">
          <p className="admin-metric__label">Scheduled blogs</p>
          <p className="admin-metric__value">{fmt(c.blogScheduled)}</p>
          {c.blogScheduled > 0 && <p className="admin-metric__hint">Queued to publish</p>}
        </Link>
      </div>

      {/* Second metrics row */}
      <div className="admin-metrics-grid">
        <Link to="/admin/categories" className="admin-metric">
          <p className="admin-metric__label">Categories</p>
          <p className="admin-metric__value">{fmt(c.categories)}</p>
        </Link>
        <Link to="/admin/authors" className="admin-metric">
          <p className="admin-metric__label">Authors</p>
          <p className="admin-metric__value">{fmt(c.authors)}</p>
        </Link>
        <Link to="/admin/blog" className="admin-metric">
          <p className="admin-metric__label">Draft blogs</p>
          <p className="admin-metric__value">{fmt(c.blogDraft)}</p>
        </Link>
        <Link to="/admin/leads" className="admin-metric">
          <p className="admin-metric__label">New leads</p>
          <p className="admin-metric__value">{fmt(c.leadsNew)}</p>
          {c.leadsNew > 0 && <p className="admin-metric__hint">{fmt(c.leadsNew)} to follow up</p>}
        </Link>
      </div>

      {/* Recent blogs + recent leads */}
      <div className="admin-dash-cols">
        <div className="admin-card">
          <div className="admin-card__header">
            <h2><FiFileText /> Recent blog activity</h2>
            <Link to="/admin/blog" className="admin-card__link">View all blogs</Link>
          </div>
          <div className="admin-card__scroll">
            <table className="admin-shop-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th className="is-right">Date</th>
                </tr>
              </thead>
              <tbody>
                {(!data?.recentBlogs || data.recentBlogs.length === 0) && (
                  <tr>
                    <td colSpan="3" className="admin-shop-table__empty">No blogs yet</td>
                  </tr>
                )}
                {data?.recentBlogs?.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <Link to={`/admin/blog/edit/${b.id}`} className="admin-shop-table__link">{b.title}</Link>
                      {b.category && <p className="admin-shop-table__sub">{b.category}</p>}
                    </td>
                    <td>
                      <span className={`admin-sbadge admin-sbadge--${blogBadge(b.status)}`}>{b.status}</span>
                    </td>
                    <td className="is-right is-muted">
                      {new Date(b.created_at).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card__header">
            <h2><FiInbox /> Recent leads</h2>
            <Link to="/admin/leads" className="admin-card__link">View all leads</Link>
          </div>
          <div className="admin-card__scroll">
            <table className="admin-shop-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="is-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {(!data?.recentLeads || data.recentLeads.length === 0) && (
                  <tr>
                    <td colSpan="2" className="admin-shop-table__empty">No leads yet</td>
                  </tr>
                )}
                {data?.recentLeads?.map((l) => (
                  <tr key={l.id}>
                    <td>
                      <span style={{ fontWeight: 500 }}>{l.full_name || '—'}</span>
                      <p className="admin-shop-table__sub">{l.service_interested || 'General enquiry'}</p>
                    </td>
                    <td className="is-right">
                      <span className={`admin-sbadge admin-sbadge--${leadBadge(l.status)}`}>{l.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Top performing blogs */}
      <div className="admin-card">
        <div className="admin-card__header">
          <h2><FiTrendingUp /> Top performing blogs</h2>
          <Link to="/admin/blog" className="admin-card__link">View all blogs</Link>
        </div>
        <table className="admin-shop-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th className="is-right">Views</th>
            </tr>
          </thead>
          <tbody>
            {(!data?.topBlogs || data.topBlogs.length === 0) && (
              <tr>
                <td colSpan="4" className="admin-shop-table__empty">No published blogs yet</td>
              </tr>
            )}
            {data?.topBlogs?.map((b, i) => (
              <tr key={b.id}>
                <td className="admin-shop-table__rank">{i + 1}</td>
                <td>
                  <Link to={`/admin/blog/edit/${b.id}`} className="admin-shop-table__link">{b.title}</Link>
                </td>
                <td className="is-muted">{b.category || '—'}</td>
                <td className="is-right" style={{ fontWeight: 500 }}>{fmt(b.views)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function blogBadge(status) {
  if (status === 'published') return 'success';
  if (status === 'scheduled') return 'info';
  return 'neutral';
}

function leadBadge(status) {
  if (status === 'converted') return 'success';
  if (status === 'contacted') return 'info';
  if (status === 'new') return 'warning';
  return 'neutral';
}
