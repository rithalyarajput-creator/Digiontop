import { useEffect, useMemo, useState } from 'react';
import { FiTrash2, FiSearch, FiDownload, FiCheck, FiInbox, FiUserPlus, FiAward, FiPercent, FiEye, FiX } from 'react-icons/fi';
import { apiGet, apiPut, apiDelete } from '../api';

const STATUSES = ['new', 'contacted', 'converted', 'closed'];

/* clean date/time: "10 Jul 2026" + "4:32 PM" */
function fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d)) return '—';
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}
function fmtTime(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d)) return '';
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function truncateMessage(text, wordCount = 4) {
  if (!text) return '—';
  const words = text.split(/\s+/).slice(0, wordCount);
  const truncated = words.join(' ');
  return text.split(/\s+/).length > wordCount ? truncated + '...' : truncated;
}

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);

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

      {/* Analytics summary cards */}
      <div className="admin-stats admin-stats--wide" style={{ marginBottom: 22 }}>
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon"><FiInbox /></div>
          <div><div className="admin-stat-card__value">{leads.length}</div><div className="admin-stat-card__label">Total Leads</div></div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon"><FiUserPlus /></div>
          <div><div className="admin-stat-card__value">{counts.new || 0}</div><div className="admin-stat-card__label">New Leads</div></div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon"><FiAward /></div>
          <div><div className="admin-stat-card__value">{counts.converted || 0}</div><div className="admin-stat-card__label">Converted</div></div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon"><FiPercent /></div>
          <div><div className="admin-stat-card__value">{leads.length ? Math.round((counts.converted || 0) / leads.length * 100) : 0}%</div><div className="admin-stat-card__label">Conversion Rate</div></div>
        </div>
      </div>

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
        <table className="admin-table admin-table--leads">
          <thead>
            <tr><th>Name</th><th>Phone</th><th>Service</th><th>Message</th><th>Date</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan="6" className="admin-table__empty">Loading…</td></tr>}
            {!loading && filtered.length === 0 && (
              <tr><td colSpan="6" className="admin-table__empty">No leads found.</td></tr>
            )}
            {filtered.map((l) => (
              <tr key={l.id}>
                <td><strong>{l.full_name || '—'}</strong></td>
                <td>{l.phone || '—'}</td>
                <td>{l.service_interested || '—'}</td>
                <td className="admin-msg-preview">{truncateMessage(l.message)}</td>
                <td>{fmtDate(l.created_at)}</td>
                <td className="admin-actions-group">
                  <button className="admin-action-btn admin-action-btn--view" title="View Details" onClick={() => setSelectedLead(l)}>
                    <FiEye /> View
                  </button>
                  <button className="admin-action-btn admin-action-btn--convert" title="Mark as Converted" onClick={() => updateStatus(l.id, 'converted')}>
                    <FiCheck /> Convert
                  </button>
                  <button className="admin-action-btn admin-action-btn--delete" title="Delete" onClick={() => remove(l.id)}>
                    <FiTrash2/> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="admin-modal-overlay" onClick={() => setSelectedLead(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h2>Lead Details</h2>
              <button className="admin-modal__close" onClick={() => setSelectedLead(null)}>
                <FiX />
              </button>
            </div>
            <div className="admin-modal__body">
              <div className="admin-modal__row">
                <strong>Name:</strong> {selectedLead.full_name || '—'}
              </div>
              {selectedLead.business_name && (
                <div className="admin-modal__row">
                  <strong>Business:</strong> {selectedLead.business_name}
                </div>
              )}
              <div className="admin-modal__row">
                <strong>Email:</strong> {selectedLead.email || '—'}
              </div>
              <div className="admin-modal__row">
                <strong>Phone:</strong> {selectedLead.phone || '—'}
              </div>
              <div className="admin-modal__row">
                <strong>Website:</strong> {selectedLead.website || '—'}
              </div>
              <div className="admin-modal__row">
                <strong>Service:</strong> {selectedLead.service_interested || '—'}
              </div>
              <div className="admin-modal__row">
                <strong>Budget:</strong> {selectedLead.budget_range || '—'}
              </div>
              <div className="admin-modal__row">
                <strong>Message:</strong>
                <p>{selectedLead.message || '—'}</p>
              </div>
              <div className="admin-modal__row">
                <strong>Status:</strong>
                <select
                  className={`admin-status-select admin-status-select--${selectedLead.status}`}
                  value={selectedLead.status}
                  onChange={(e) => updateStatus(selectedLead.id, e.target.value)}
                >
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="admin-modal__row">
                <strong>Date:</strong> {fmtDate(selectedLead.created_at)} {fmtTime(selectedLead.created_at)}
              </div>
            </div>
            <div className="admin-modal__footer">
              <button className="admin-btn admin-btn--primary" onClick={() => { updateStatus(selectedLead.id, 'converted'); setSelectedLead(null); }}>Mark as Converted</button>
              <button className="admin-btn admin-btn--secondary" onClick={() => setSelectedLead(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
