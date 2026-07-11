import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiInbox, FiFileText, FiTag, FiUsers, FiMail,
  FiEye, FiEdit, FiClock, FiCheckCircle, FiTrendingUp,
} from 'react-icons/fi';
import { apiGet } from '../api';

const fmt = (n) => (n ?? 0).toLocaleString('en-IN');

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

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

  const cards = [
    { label: 'Published Blogs', value: c.blogPublished, icon: <FiCheckCircle />, to: '/admin/blog' },
    { label: 'Draft Blogs', value: c.blogDraft, icon: <FiEdit />, to: '/admin/blog' },
    { label: 'Scheduled Blogs', value: c.blogScheduled, icon: <FiClock />, to: '/admin/blog' },
    { label: 'Total Blog Views', value: c.totalViews, icon: <FiEye /> },
    { label: 'Categories', value: c.categories, icon: <FiTag />, to: '/admin/categories' },
    { label: 'Authors', value: c.authors, icon: <FiUsers />, to: '/admin/authors' },
    { label: 'Newsletter Subscribers', value: c.subscribers, icon: <FiMail />, to: '/admin/newsletter' },
    { label: 'Contact Form Leads', value: c.leads, icon: <FiInbox />, to: '/admin/leads' },
  ];

  return (
    <div>
      <h1 className="admin-page-title">Dashboard</h1>
      <p className="admin-muted" style={{ marginTop: -6, marginBottom: 22 }}>
        Welcome back! Here's an overview of your website's performance.
      </p>
      {error && <div className="admin-alert admin-alert--error">{error}</div>}
      {loading && <p className="admin-muted">Loading dashboard…</p>}

      {/* Stat cards */}
      <div className="admin-stats admin-stats--wide">
        {cards.map((card) => {
          const inner = (
            <>
              <div className="admin-stat-card__icon">{card.icon}</div>
              <div>
                <div className="admin-stat-card__value">{fmt(card.value)}</div>
                <div className="admin-stat-card__label">{card.label}</div>
              </div>
            </>
          );
          return card.to ? (
            <Link to={card.to} className="admin-stat-card admin-stat-card--link" key={card.label}>{inner}</Link>
          ) : (
            <div className="admin-stat-card" key={card.label}>{inner}</div>
          );
        })}
      </div>

      {/* Two-column activity */}
      <div className="admin-dash-grid">
        {/* Recent Blog Activity */}
        <div className="admin-dash-col">
          <div className="admin-page-head">
            <h2 className="admin-section-title"><FiFileText /> Recent Blog Activity</h2>
            <Link to="/admin/blog" className="admin-btn admin-btn--sm">View all</Link>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Title</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {(!data?.recentBlogs || data.recentBlogs.length === 0) && (
                  <tr><td colSpan="3" className="admin-table__empty">No blogs yet.</td></tr>
                )}
                {data?.recentBlogs?.map((b) => (
                  <tr key={b.id}>
                    <td><Link to={`/admin/blog/edit/${b.id}`} className="admin-link">{b.title}</Link></td>
                    <td><span className={`admin-badge admin-badge--${statusClass(b.status)}`}>{b.status}</span></td>
                    <td>{new Date(b.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Leads */}
        <div className="admin-dash-col">
          <div className="admin-page-head">
            <h2 className="admin-section-title"><FiInbox /> Recent Leads Activity</h2>
            <Link to="/admin/leads" className="admin-btn admin-btn--sm">View all</Link>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Service</th><th>Status</th></tr></thead>
              <tbody>
                {(!data?.recentLeads || data.recentLeads.length === 0) && (
                  <tr><td colSpan="3" className="admin-table__empty">No leads yet.</td></tr>
                )}
                {data?.recentLeads?.map((l) => (
                  <tr key={l.id}>
                    <td>{l.full_name || '—'}</td>
                    <td>{l.service_interested || '—'}</td>
                    <td><span className={`admin-badge admin-badge--${l.status}`}>{l.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Top Performing Blogs */}
      <div className="admin-page-head" style={{ marginTop: 28 }}>
        <h2 className="admin-section-title"><FiTrendingUp /> Top Performing Blogs</h2>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>#</th><th>Title</th><th>Category</th><th>Views</th></tr></thead>
          <tbody>
            {(!data?.topBlogs || data.topBlogs.length === 0) && (
              <tr><td colSpan="4" className="admin-table__empty">No published blogs yet.</td></tr>
            )}
            {data?.topBlogs?.map((b, i) => (
              <tr key={b.id}>
                <td>{i + 1}</td>
                <td><Link to={`/admin/blog/edit/${b.id}`} className="admin-link">{b.title}</Link></td>
                <td>{b.category || '—'}</td>
                <td><span className="admin-badge admin-badge--converted"><FiEye style={{ marginRight: 4 }} />{fmt(b.views)}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function statusClass(status) {
  if (status === 'published') return 'converted';
  if (status === 'scheduled') return 'contacted';
  return 'new';
}
