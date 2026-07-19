import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiEye, FiUsers, FiClock, FiMonitor, FiSmartphone, FiGlobe,
  FiFileText, FiTrendingUp, FiBarChart2,
} from 'react-icons/fi';
import { apiGet } from '../api';

const fmt = (n) => (n ?? 0).toLocaleString('en-IN');

const RANGES = [
  { key: 1, label: 'Today' },
  { key: 7, label: 'Last 7 days' },
  { key: 30, label: 'Last 30 days' },
  { key: 90, label: 'Last 90 days' },
  { key: 365, label: 'This year' },
];

function fmtDuration(ms) {
  if (!ms || ms < 1000) return '0s';
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const rs = s % 60;
  return rs ? `${m}m ${rs}s` : `${m}m`;
}

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// A country code → flag emoji + name. Falls back to the raw code.
function country(code) {
  if (!code || code === '—') return { flag: '🌐', name: 'Unknown' };
  const flag = code.replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
  let name = code;
  try { name = new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code; } catch {}
  return { flag, name };
}

export default function Analytics() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    setLoading(true);
    apiGet(`/stats?type=analytics&days=${days}`)
      .then((d) => { if (alive) { setData(d); setError(''); } })
      .catch((e) => { if (alive) setError(e.message); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [days]);

  const t = data?.totals || {};
  const byDay = data?.byDay || [];
  const maxBar = useMemo(() => Math.max(1, ...byDay.map((b) => b.views)), [byDay]);

  return (
    <div>
      <div className="admin-shop-head">
        <h1>Analytics</h1>
      </div>

      {/* Range pills */}
      <div className="admin-pills">
        {RANGES.map((r) => (
          <button
            key={r.key}
            type="button"
            onClick={() => setDays(r.key)}
            className={`admin-pill${days === r.key ? ' admin-pill--active' : ''}`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {error && <div className="admin-salert">{error}</div>}
      {loading && <p className="admin-muted" style={{ margin: '12px 0' }}>Loading analytics…</p>}

      {/* Summary cards */}
      <div className="admin-stats">
        <div className="admin-stat-card">
          <span className="admin-stat-card__icon"><FiEye /></span>
          <div>
            <div className="admin-stat-card__value">{fmt(t.views)}</div>
            <div className="admin-stat-card__label">Total Page Views</div>
          </div>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-card__icon"><FiUsers /></span>
          <div>
            <div className="admin-stat-card__value">{fmt(t.visitors)}</div>
            <div className="admin-stat-card__label">Unique Visitors</div>
          </div>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-card__icon"><FiClock /></span>
          <div>
            <div className="admin-stat-card__value">{fmtDuration(t.avg_ms)}</div>
            <div className="admin-stat-card__label">Avg. Time on Page</div>
          </div>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-card__icon"><FiBarChart2 /></span>
          <div>
            <div className="admin-stat-card__value">
              {t.visitors ? (t.views / t.visitors).toFixed(1) : '0'}
            </div>
            <div className="admin-stat-card__label">Pages / Visitor</div>
          </div>
        </div>
      </div>

      {/* Traffic over time */}
      <div className="admin-card">
        <div className="admin-card__header">
          <h2><FiTrendingUp /> Traffic over time</h2>
        </div>
        <div style={{ padding: '18px 22px' }}>
          {byDay.length > 0 ? (
            <svg viewBox={`0 0 ${Math.max(byDay.length * 20, 40)} 120`} preserveAspectRatio="none"
                 role="img" style={{ width: '100%', height: 160 }}>
              <title>Page views per day</title>
              {byDay.map((b, i) => {
                const h = (b.views / maxBar) * 104;
                return (
                  <rect key={b.day} x={i * 20 + 4} y={112 - h} width={12}
                        height={Math.max(h, 1)} rx={2} fill="#F5A800" />
                );
              })}
              <line x1="0" y1="113" x2={byDay.length * 20} y2="113" stroke="#eee" strokeWidth="1" />
            </svg>
          ) : (
            <p className="admin-muted">No visitor data for this range yet.</p>
          )}
        </div>
      </div>

      {/* Top pages + Top blogs */}
      <div className="admin-dash-cols">
        <div className="admin-card">
          <div className="admin-card__header">
            <h2><FiFileText /> Top pages</h2>
          </div>
          <div className="admin-card__scroll">
            <table className="admin-shop-table">
              <thead>
                <tr><th>Page</th><th className="is-right">Visitors</th><th className="is-right">Views</th></tr>
              </thead>
              <tbody>
                {(data?.topPages || []).length === 0 && (
                  <tr><td colSpan="3" className="admin-shop-table__empty">No data yet</td></tr>
                )}
                {(data?.topPages || []).map((p) => (
                  <tr key={p.path}>
                    <td className="admin-shop-table__trunc" style={{ maxWidth: 220 }}>{p.path}</td>
                    <td className="is-right is-muted">{fmt(p.visitors)}</td>
                    <td className="is-right">{fmt(p.views)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card__header">
            <h2><FiTrendingUp /> Top ranking blogs</h2>
            <Link to="/admin/blog" className="admin-card__link">View all</Link>
          </div>
          <div className="admin-card__scroll">
            <table className="admin-shop-table">
              <thead>
                <tr><th>#</th><th>Title</th><th className="is-right">Views</th></tr>
              </thead>
              <tbody>
                {(data?.topBlogs || []).length === 0 && (
                  <tr><td colSpan="3" className="admin-shop-table__empty">No published blogs yet</td></tr>
                )}
                {(data?.topBlogs || []).map((b, i) => (
                  <tr key={b.id}>
                    <td className="is-muted">{i + 1}</td>
                    <td>
                      <Link to={`/admin/blog/edit/${b.id}`} className="admin-shop-table__link admin-shop-table__trunc" style={{ display: 'block', maxWidth: 200 }}>
                        {b.title}
                      </Link>
                      {b.category && <p className="admin-shop-table__sub">{b.category}</p>}
                    </td>
                    <td className="is-right">{fmt(b.views)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Countries + Devices/Browsers */}
      <div className="admin-dash-cols">
        <div className="admin-card">
          <div className="admin-card__header">
            <h2><FiGlobe /> Where visitors come from</h2>
          </div>
          <div className="admin-card__scroll">
            <table className="admin-shop-table">
              <thead>
                <tr><th>Country</th><th className="is-right">Views</th></tr>
              </thead>
              <tbody>
                {(data?.topCountries || []).length === 0 && (
                  <tr><td colSpan="2" className="admin-shop-table__empty">No data yet</td></tr>
                )}
                {(data?.topCountries || []).map((row) => {
                  const c = country(row.country);
                  return (
                    <tr key={row.country}>
                      <td>{c.flag} {c.name}</td>
                      <td className="is-right">{fmt(row.views)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card__header">
            <h2><FiMonitor /> Devices &amp; browsers</h2>
          </div>
          <div style={{ padding: '14px 22px 20px' }}>
            <p className="admin-metric__label" style={{ marginBottom: 8 }}>Device</p>
            {(data?.byDevice || []).map((d) => (
              <div key={d.device} className="admin-analytics-row">
                <span>{d.device === 'mobile' ? <FiSmartphone /> : <FiMonitor />} {d.device}</span>
                <strong>{fmt(d.views)}</strong>
              </div>
            ))}
            {(data?.byDevice || []).length === 0 && <p className="admin-muted">No data yet</p>}

            <p className="admin-metric__label" style={{ margin: '16px 0 8px' }}>Browser</p>
            {(data?.byBrowser || []).map((b) => (
              <div key={b.browser} className="admin-analytics-row">
                <span>{b.browser}</span>
                <strong>{fmt(b.views)}</strong>
              </div>
            ))}
            {(data?.byBrowser || []).length === 0 && <p className="admin-muted">No data yet</p>}
          </div>
        </div>
      </div>

      {/* Traffic sources */}
      <div className="admin-card">
        <div className="admin-card__header">
          <h2><FiGlobe /> Traffic sources (referrers)</h2>
        </div>
        <div className="admin-card__scroll">
          <table className="admin-shop-table">
            <thead>
              <tr><th>Source</th><th className="is-right">Views</th></tr>
            </thead>
            <tbody>
              {(data?.topReferrers || []).length === 0 && (
                <tr><td colSpan="2" className="admin-shop-table__empty">No data yet</td></tr>
              )}
              {(data?.topReferrers || []).map((r) => (
                <tr key={r.referrer}>
                  <td className="admin-shop-table__trunc" style={{ maxWidth: 320 }}>{r.referrer}</td>
                  <td className="is-right">{fmt(r.views)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live recent visits */}
      <div className="admin-card">
        <div className="admin-card__header">
          <h2><FiUsers /> Recent visits</h2>
        </div>
        <div className="admin-card__scroll">
          <table className="admin-shop-table">
            <thead>
              <tr>
                <th>Page</th><th>Location</th><th>Device</th><th className="is-right">When</th>
              </tr>
            </thead>
            <tbody>
              {(data?.recent || []).length === 0 && (
                <tr><td colSpan="4" className="admin-shop-table__empty">No visits recorded yet</td></tr>
              )}
              {(data?.recent || []).map((v, i) => {
                const c = country(v.country);
                return (
                  <tr key={i}>
                    <td className="admin-shop-table__trunc" style={{ maxWidth: 200 }}>{v.path}</td>
                    <td className="is-muted">{c.flag} {v.city || c.name}</td>
                    <td className="is-muted">{v.device} · {v.browser}</td>
                    <td className="is-right is-muted">{timeAgo(v.created_at)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
