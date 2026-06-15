import { useEffect, useState } from 'react';
import { FiInbox, FiFileText, FiStar, FiBriefcase } from 'react-icons/fi';
import { apiGet } from '../api';

export default function Dashboard() {
  const [stats, setStats] = useState({ leads: 0, blog: 0, testimonials: 0, portfolio: 0 });
  const [recent, setRecent] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const [leads, blog, testimonials, portfolio] = await Promise.all([
          apiGet('/leads'),
          apiGet('/blog'),
          apiGet('/testimonials'),
          apiGet('/portfolio'),
        ]);
        setStats({
          leads: leads.length,
          blog: blog.length,
          testimonials: testimonials.length,
          portfolio: portfolio.length,
        });
        setRecent(leads.slice(0, 5));
      } catch (err) {
        setError(err.message);
      }
    })();
  }, []);

  const cards = [
    { label: 'Total Leads', value: stats.leads, icon: <FiInbox /> },
    { label: 'Blog Posts', value: stats.blog, icon: <FiFileText /> },
    { label: 'Testimonials', value: stats.testimonials, icon: <FiStar /> },
    { label: 'Portfolio Items', value: stats.portfolio, icon: <FiBriefcase /> },
  ];

  return (
    <div>
      <h1 className="admin-page-title">Dashboard</h1>
      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      <div className="admin-stats">
        {cards.map((c) => (
          <div className="admin-stat-card" key={c.label}>
            <div className="admin-stat-card__icon">{c.icon}</div>
            <div>
              <div className="admin-stat-card__value">{c.value}</div>
              <div className="admin-stat-card__label">{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="admin-section-title">Recent Leads</h2>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Service</th><th>Status</th><th>Date</th></tr>
          </thead>
          <tbody>
            {recent.length === 0 && (
              <tr><td colSpan="5" className="admin-table__empty">No leads yet.</td></tr>
            )}
            {recent.map((l) => (
              <tr key={l.id}>
                <td>{l.full_name}</td>
                <td>{l.email}</td>
                <td>{l.service_interested || '—'}</td>
                <td><span className={`admin-badge admin-badge--${l.status}`}>{l.status}</span></td>
                <td>{new Date(l.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
