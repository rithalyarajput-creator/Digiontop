import { useEffect, useMemo, useState } from 'react';
import { FiTrash2, FiSearch, FiDownload, FiCheck } from 'react-icons/fi';
import { apiGet, apiPut, apiDelete } from '../api';

const STATUSES = ['new', 'contacted', 'converted', 'closed'];

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      setLeads(await apiGet('/leads'));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    let list = [...leads];
    if (filter) list = list.filter((l) => l.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((l) =>
        (l.full_name || '').toLowerCase().includes(q) ||
        (l.email || '').toLowerCase().includes(q) ||
        (l.phone || '').toLowerCase().includes(q) ||
        (l.service_interested || '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [leads, filter, search]);

  async function updateStatus(id, status) {
    try {
      await apiPut('/leads', { id, status });
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    } catch (err) {
      alert(err.message);
    }
  }

  async function remove(id) {
    if (!confirm('Delete this lead?')) return;
    try {
      await apiDelete(`/leads?id=${id}`);
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  function exportCsv() {
    const header = 'Name,Email,Phone,Service,Budget,Message,Status,Date\n';
    const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const body = filtered.map((l) =>
      [l.full_name, l.email, l.phone, l.service_interested, l.budget_range, l.message, l.status,
       new Date(l.created_at).toLocaleString()].map(esc).join(',')
    ).join('\n');
    const blob = new Blob([header + body], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'contact-leads.csv'; a.click();
    URL.revokeObjectURL(url);
  }

  const counts = STATUSES.reduce((acc, s) => { acc[s] = leads.filter((l) => l.status === s).length; return acc; }, {});

  return (
    <div>
      <div className="admin-page-head">
        <h1 className="admin-page-title">Contact Form Leads</h1>
        <button className="admin-btn" onClick={exportCsv} disabled={!filtered.length}><FiDownload /> Export CSV</button>
      </div>

      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      {/* Status tabs */}
      <div className="admin-tabs">
        <button className={`admin-tab${filter === '' ? ' admin-tab--active' : ''}`} onClick={() => setFilter('')}>
          All <span className="admin-tab__count">{leads.length}</span>
        </button>
        {STATUSES.map((s) => (
          <button key={s} className={`admin-tab${filter === s ? ' admin-tab--active' : ''}`} onClick={() => setFilter(s)}>
            {s} <span className="admin-tab__count">{counts[s] || 0}</span>
          </button>
        ))}
      </div>

      <div className="admin-filterbar">
        <div className="admin-search">
          <FiSearch />
          <input type="text" placeholder="Search name, email, phone, service…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Phone</th><th>Service</th><th>Message</th><th>Status</th><th>Date</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan="8" className="admin-table__empty">Loading…</td></tr>}
            {!loading && filtered.length === 0 && (
              <tr><td colSpan="8" className="admin-table__empty">No leads found.</td></tr>
            )}
            {filtered.map((l) => (
              <tr key={l.id}>
                <td>{l.full_name || '—'}{l.business_name ? <div className="admin-muted">{l.business_name}</div> : null}</td>
                <td>{l.email}</td>
                <td>{l.phone || '—'}</td>
                <td>{l.service_interested || '—'}</td>
                <td><div className="admin-muted" style={{ maxWidth: 220 }} title={l.message}>{l.message || '—'}</div></td>
                <td>
                  <select
                    className={`admin-status-select admin-status-select--${l.status}`}
                    value={l.status}
                    onChange={(e) => updateStatus(l.id, e.target.value)}
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td>{new Date(l.created_at).toLocaleDateString()}</td>
                <td className="admin-actions">
                  {l.status === 'new' && (
                    <button className="admin-icon-btn" title="Mark as Contacted" onClick={() => updateStatus(l.id, 'contacted')}>
                      <FiCheck />
                    </button>
                  )}
                  <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => remove(l.id)} title="Delete">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
