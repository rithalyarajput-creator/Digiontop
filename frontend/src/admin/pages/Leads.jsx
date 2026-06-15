import { useEffect, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { apiGet, apiPut, apiDelete } from '../api';

const STATUSES = ['new', 'contacted', 'converted', 'closed'];

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await apiGet(filter ? `/leads?status=${filter}` : '/leads');
      setLeads(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [filter]);

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

  return (
    <div>
      <div className="admin-page-head">
        <h1 className="admin-page-title">Leads</h1>
        <select className="admin-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Phone</th><th>Service</th><th>Budget</th><th>Status</th><th>Date</th><th></th></tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan="8" className="admin-table__empty">Loading…</td></tr>}
            {!loading && leads.length === 0 && (
              <tr><td colSpan="8" className="admin-table__empty">No leads found.</td></tr>
            )}
            {leads.map((l) => (
              <tr key={l.id}>
                <td>{l.full_name}{l.business_name ? <div className="admin-muted">{l.business_name}</div> : null}</td>
                <td>{l.email}</td>
                <td>{l.phone || '—'}</td>
                <td>{l.service_interested || '—'}</td>
                <td>{l.budget_range || '—'}</td>
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
                <td>
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
