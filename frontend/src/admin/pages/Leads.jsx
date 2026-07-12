import { useEffect, useMemo, useState } from 'react';
import { FiTrash2, FiSearch, FiDownload, FiCheck, FiEye, FiX, FiInbox } from 'react-icons/fi';
import { apiGet, apiPut, apiDelete } from '../api';

const STATUSES = ['new', 'contacted', 'converted', 'closed'];

/* status → shopify pill badge tone */
const STATUS_TONE = {
  new: 'admin-sbadge--warning',
  contacted: 'admin-sbadge--info',
  converted: 'admin-sbadge--success',
  closed: 'admin-sbadge--neutral',
};

function statusBadgeClass(status) {
  return `admin-sbadge ${STATUS_TONE[status] || 'admin-sbadge--neutral'}`;
}

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

function truncateMessage(text, wordCount = 8) {
  if (!text) return '—';
  const words = text.split(/\s+/);
  const truncated = words.slice(0, wordCount).join(' ');
  return words.length > wordCount ? truncated + '…' : truncated;
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
  const conversion = leads.length ? Math.round((counts.converted || 0) / leads.length * 100) : 0;

  const tabs = [
    { key: '', label: 'All', count: leads.length },
    ...STATUSES.map((s) => ({ key: s, label: s.charAt(0).toUpperCase() + s.slice(1), count: counts[s] || 0 })),
  ];

  return (
    <div>
      <div className="admin-shop-head">
        <h1>Contact Form Leads</h1>
        <div className="admin-shop-head__actions">
          <button type="button" className="admin-sbtn" onClick={exportCsv} disabled={!filtered.length}>
            <FiDownload /> Export CSV
          </button>
        </div>
      </div>

      {error && <div className="admin-salert">{error}</div>}

      {/* Stats row — hairline grid */}
      <div className="admin-metrics-grid">
        <div className="admin-metric">
          <p className="admin-metric__label">Total</p>
          <p className="admin-metric__value">{leads.length}</p>
        </div>
        <div className="admin-metric">
          <p className="admin-metric__label">New</p>
          <p className="admin-metric__value" style={{ color: '#d72c0d' }}>{counts.new || 0}</p>
        </div>
        <div className="admin-metric">
          <p className="admin-metric__label">Converted</p>
          <p className="admin-metric__value" style={{ color: '#1a7a2e' }}>{counts.converted || 0}</p>
        </div>
        <div className="admin-metric">
          <p className="admin-metric__label">Conversion Rate</p>
          <p className="admin-metric__value" style={{ color: '#005bd3' }}>{conversion}%</p>
        </div>
      </div>

      {/* Single card: tabs + search + table */}
      <div className="admin-card">
        <div className="admin-stabs">
          {tabs.map((t) => (
            <button
              key={t.key || 'all'}
              type="button"
              className={`admin-stab${filter === t.key ? ' admin-stab--active' : ''}`}
              onClick={() => setFilter(t.key)}
            >
              {t.label} <span className="admin-stab__count">({t.count})</span>
            </button>
          ))}
        </div>

        <div className="admin-card__search">
          <FiSearch />
          <input
            type="text"
            placeholder="Search by name, email, phone or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button type="button" className="admin-sfilter__clear" onClick={() => setSearch('')}>Clear</button>
          )}
        </div>

        <div className="admin-card__scroll">
          <table className="admin-shop-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Service</th>
                <th>Message</th>
                <th>Status</th>
                <th>Date</th>
                <th className="is-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan="7" className="admin-shop-table__empty">Loading…</td></tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan="7" className="admin-shop-table__empty">
                    <FiInbox style={{ fontSize: 32, color: '#c9cccf', display: 'block', margin: '0 auto 0.5rem' }} />
                    No leads found
                  </td>
                </tr>
              )}
              {!loading && filtered.map((l) => (
                <tr key={l.id}>
                  <td>
                    <button type="button" className="admin-shop-table__link" onClick={() => setSelectedLead(l)}>
                      {l.full_name || '—'}
                    </button>
                    {l.email && <p className="admin-shop-table__sub">{l.email}</p>}
                  </td>
                  <td className="is-muted">{l.phone || '—'}</td>
                  <td>{l.service_interested || '—'}</td>
                  <td className="is-muted admin-lead-snippet">{truncateMessage(l.message)}</td>
                  <td><span className={statusBadgeClass(l.status)}>{l.status || 'new'}</span></td>
                  <td className="is-muted">
                    {fmtDate(l.created_at)}
                    <p className="admin-shop-table__sub">{fmtTime(l.created_at)}</p>
                  </td>
                  <td className="is-right">
                    <div className="admin-srow-actions">
                      <button type="button" className="admin-slink-btn" title="View details" onClick={() => setSelectedLead(l)}>
                        <FiEye /> View
                      </button>
                      <button type="button" className="admin-slink-btn admin-slink-btn--muted" title="Mark as converted" onClick={() => updateStatus(l.id, 'converted')}>
                        <FiCheck /> Convert
                      </button>
                      <button type="button" className="admin-slink-btn admin-slink-btn--danger" title="Delete" onClick={() => remove(l.id)}>
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

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="admin-modal-overlay" onClick={() => setSelectedLead(null)}>
          <div className="admin-smodal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-smodal__header">
              <div>
                <h2>{selectedLead.full_name || 'Lead details'}</h2>
                {selectedLead.business_name && <p>{selectedLead.business_name}</p>}
              </div>
              <button type="button" className="admin-smodal__close" onClick={() => setSelectedLead(null)} title="Close">
                <FiX />
              </button>
            </div>

            <div className="admin-smodal__body">
              <div className="admin-smodal__grid">
                <div className="admin-smodal__field">
                  <span className="admin-smodal__label">Email</span>
                  <a href={`mailto:${selectedLead.email}`} className="admin-smodal__link">{selectedLead.email || '—'}</a>
                </div>
                <div className="admin-smodal__field">
                  <span className="admin-smodal__label">Phone</span>
                  <a href={`tel:${(selectedLead.phone || '').replace(/\s/g, '')}`} className="admin-smodal__link">{selectedLead.phone || '—'}</a>
                </div>
                <div className="admin-smodal__field">
                  <span className="admin-smodal__label">Service</span>
                  <span className="admin-smodal__value">{selectedLead.service_interested || '—'}</span>
                </div>
                <div className="admin-smodal__field">
                  <span className="admin-smodal__label">Received on</span>
                  <span className="admin-smodal__value">{fmtDate(selectedLead.created_at)} · {fmtTime(selectedLead.created_at)}</span>
                </div>
              </div>

              <div className="admin-smodal__field admin-smodal__field--full">
                <span className="admin-smodal__label">Message</span>
                <p className="admin-smodal__message">{selectedLead.message || '—'}</p>
              </div>

              <div className="admin-smodal__field admin-smodal__field--full">
                <span className="admin-smodal__label">Status</span>
                <div className="admin-smodal__status">
                  <span className={statusBadgeClass(selectedLead.status)}>{selectedLead.status || 'new'}</span>
                  <select
                    className="admin-sselect"
                    value={selectedLead.status}
                    onChange={(e) => { updateStatus(selectedLead.id, e.target.value); setSelectedLead({ ...selectedLead, status: e.target.value }); }}
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="admin-smodal__footer">
              <button type="button" className="admin-sbtn" onClick={() => setSelectedLead(null)}>Close</button>
              <button
                type="button"
                className="admin-sbtn admin-sbtn--primary"
                onClick={() => { updateStatus(selectedLead.id, 'converted'); setSelectedLead(null); }}
              >
                Mark as converted
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
