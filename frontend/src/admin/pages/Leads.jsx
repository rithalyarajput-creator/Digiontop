import { useEffect, useMemo, useState } from 'react';
import { FiTrash2, FiSearch, FiDownload, FiCheck, FiEye, FiX, FiInbox } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { apiGet, apiPut, apiDelete } from '../api';
import { useConfirm } from '../components/useConfirm';

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

/* ---------------- WhatsApp helpers ----------------
   Leads store phones in messy shapes: "+91 9217594664", "9217594664",
   "+91-9217594664", "09217594664". wa.me wants digits only, country code
   included, no "+", no spaces, no leading zero. */
export function waNumber(phone) {
  if (!phone) return '';
  let digits = String(phone).replace(/\D/g, '');   // strip +, spaces, dashes, brackets
  digits = digits.replace(/^0+/, '');              // drop leading zero(s): 09217594664 → 9217594664
  if (/^[6-9]\d{9}$/.test(digits)) digits = `91${digits}`; // bare 10-digit Indian mobile → prefix 91
  if (digits.length < 10 || digits.length > 15) return ''; // implausible → no button
  return digits;
}

function firstNameOf(lead) {
  const name = (lead.full_name || '').trim();
  if (!name) return 'there';
  return name.split(/\s+/)[0];
}

function waLink(lead) {
  const num = waNumber(lead.phone);
  if (!num) return '';
  const service = (lead.service_interested || '').trim();
  const about = service ? ` about ${service}` : '';
  const text = `Hi ${firstNameOf(lead)}, this is DigionTop. Thanks for reaching out${about}. When is a good time for a quick call?`;
  return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
}

/* ---------------- Follow-up helpers ---------------- */
/* "YYYY-MM-DD" for a date <input>; backend may send an ISO timestamp */
function toDateInput(value) {
  if (!value) return '';
  const s = String(value);
  const m = s.match(/^(\d{4}-\d{2}-\d{2})/);
  if (m) return m[1];
  const d = new Date(s);
  if (isNaN(d)) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function todayKey() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/* due = follow-up date is today or already past */
function isDue(value) {
  const key = toDateInput(value);
  return !!key && key <= todayKey();
}

function fmtFollowUp(value) {
  const key = toDateInput(value);
  if (!key) return '';
  const [y, m, d] = key.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);

  /* notes + follow-up editor state (scoped to the open modal) */
  const [noteDraft, setNoteDraft] = useState('');
  const [followUpDraft, setFollowUpDraft] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(0);

  const { confirm, dialog } = useConfirm();

  function openLead(lead) {
    setSelectedLead(lead);
    setNoteDraft(lead.notes || '');
    setFollowUpDraft(toDateInput(lead.follow_up_at));
    setSavedAt(0);
  }

  function closeLead() {
    setSelectedLead(null);
    setSaving(false);
    setSavedAt(0);
  }

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
      setError(err.message);
    }
  }

  async function saveFollowUp() {
    if (!selectedLead) return;
    const id = selectedLead.id;
    const notes = noteDraft.trim() ? noteDraft : '';
    const follow_up_at = followUpDraft ? followUpDraft : null;  // null clears the reminder
    setSaving(true);
    setError('');
    try {
      await apiPut('/leads', { id, notes, follow_up_at });
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, notes, follow_up_at } : l)));
      setSelectedLead((prev) => (prev && prev.id === id ? { ...prev, notes, follow_up_at } : prev));
      setSavedAt(Date.now());
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function remove(id) {
    const ok = await confirm({
      title: 'Delete this lead?',
      message: 'This contact lead will be permanently removed. This action cannot be undone.',
      confirmLabel: 'Delete',
      danger: true,
    });
    if (!ok) return;
    try {
      await apiDelete(`/leads?id=${id}`);
      setLeads((prev) => prev.filter((l) => l.id !== id));
      if (selectedLead && selectedLead.id === id) closeLead();
    } catch (err) {
      setError(err.message);
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
  const dueCount = leads.filter((l) => isDue(l.follow_up_at)).length;

  const tabs = [
    { key: '', label: 'All', count: leads.length },
    ...STATUSES.map((s) => ({ key: s, label: s.charAt(0).toUpperCase() + s.slice(1), count: counts[s] || 0 })),
  ];

  const selectedWa = selectedLead ? waLink(selectedLead) : '';

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
      <div className="admin-metrics-grid admin-metrics-grid--5">
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
        <div className="admin-metric">
          <p className="admin-metric__label">Follow-ups due</p>
          <p className="admin-metric__value" style={{ color: dueCount ? '#b45309' : '#303030' }}>{dueCount}</p>
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
          <table className="admin-shop-table admin-table-leads">
            <thead>
              <tr>
                <th>Sender</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Date</th>
                <th className="is-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan="5" className="admin-shop-table__empty">Loading…</td></tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="admin-shop-table__empty">
                    <FiInbox style={{ fontSize: 32, color: '#c9cccf', display: 'block', margin: '0 auto 0.5rem' }} />
                    No leads found
                  </td>
                </tr>
              )}
              {!loading && filtered.map((l) => {
                const wa = waLink(l);
                const followUp = toDateInput(l.follow_up_at);
                const due = isDue(l.follow_up_at);
                return (
                  <tr key={l.id}>
                    <td>
                      <button type="button" className="admin-shop-table__link" onClick={() => openLead(l)}>
                        {l.full_name || '—'}
                      </button>
                      {l.email && <p className="admin-shop-table__sub">{l.email}</p>}
                    </td>
                    <td>
                      <p style={{ margin: 0, fontWeight: 500 }}>{l.service_interested || '—'}</p>
                      <p className="admin-shop-table__sub admin-lead-snippet">
                        {truncateMessage(l.message)}
                        {l.phone ? ` · ${l.phone}` : ''}
                      </p>
                    </td>
                    <td>
                      <span className={statusBadgeClass(l.status)}>{l.status || 'new'}</span>
                      {followUp && (
                        <span
                          className={`admin-followup${due ? ' admin-followup--due' : ''}`}
                          title={
                            (due ? 'Follow-up due ' : 'Follow-up on ') + followUp +
                            (l.notes ? `\n\nNote: ${l.notes}` : '')
                          }
                        >
                          {due ? '⏰ ' : ''}{fmtFollowUp(l.follow_up_at)}
                        </span>
                      )}
                    </td>
                    <td className="is-muted">
                      {fmtDate(l.created_at)}
                      <p className="admin-shop-table__sub">{fmtTime(l.created_at)}</p>
                    </td>
                    <td className="is-right">
                      <div className="admin-srow-actions">
                        {wa && (
                          <a
                            href={wa}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="admin-sicon admin-sicon--wa"
                            title={`WhatsApp ${l.full_name || l.phone}`}
                          >
                            <FaWhatsapp />
                          </a>
                        )}
                        <button type="button" className="admin-slink-btn" title="View details" onClick={() => openLead(l)}>
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="admin-modal-overlay" onClick={closeLead}>
          <div className="admin-smodal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-smodal__header">
              <div>
                <h2>{selectedLead.full_name || 'Lead details'}</h2>
                {selectedLead.business_name && <p>{selectedLead.business_name}</p>}
              </div>
              <button type="button" className="admin-smodal__close" onClick={closeLead} title="Close">
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

              {/* Notes + follow-up */}
              <div className="admin-smodal__field admin-smodal__field--full">
                <span className="admin-smodal__label">Notes</span>
                <label className="admin-sfield admin-lead-notes">
                  <textarea
                    rows={3}
                    placeholder="e.g. called, budget too low, follow up next month"
                    value={noteDraft}
                    onChange={(e) => { setNoteDraft(e.target.value); setSavedAt(0); }}
                  />
                </label>
              </div>

              <div className="admin-smodal__field admin-smodal__field--full">
                <span className="admin-smodal__label">Follow-up date</span>
                <div className="admin-lead-followup-row">
                  <label className="admin-sfield admin-lead-followup-date">
                    <input
                      type="date"
                      value={followUpDraft}
                      onChange={(e) => { setFollowUpDraft(e.target.value); setSavedAt(0); }}
                    />
                  </label>
                  {followUpDraft && (
                    <button
                      type="button"
                      className="admin-sbtn admin-sbtn--sm"
                      onClick={() => { setFollowUpDraft(''); setSavedAt(0); }}
                    >
                      Clear
                    </button>
                  )}
                  <button
                    type="button"
                    className="admin-sbtn admin-sbtn--primary admin-sbtn--sm"
                    onClick={saveFollowUp}
                    disabled={saving}
                  >
                    {saving ? 'Saving…' : 'Save'}
                  </button>
                  {savedAt > 0 && !saving && (
                    <span className="admin-lead-saved">Saved</span>
                  )}
                </div>
              </div>
            </div>

            <div className="admin-smodal__footer">
              {selectedWa && (
                <a
                  href={selectedWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-sbtn admin-sbtn--wa"
                >
                  <FaWhatsapp /> WhatsApp
                </a>
              )}
              <button type="button" className="admin-sbtn" onClick={closeLead}>Close</button>
              <button
                type="button"
                className="admin-sbtn admin-sbtn--primary"
                onClick={() => { updateStatus(selectedLead.id, 'converted'); closeLead(); }}
              >
                Mark as converted
              </button>
            </div>
          </div>
        </div>
      )}

      {dialog}
    </div>
  );
}
