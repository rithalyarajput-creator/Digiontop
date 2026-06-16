import { useEffect, useMemo, useState } from 'react';
import { FiTrash2, FiSearch, FiDownload, FiMail } from 'react-icons/fi';
import { apiGet, apiDelete } from '../api';

export default function Newsletter() {
  const [subs, setSubs] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(new Set());
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      setSubs(await apiGet('/cms?resource=newsletter'));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return subs;
    const q = search.toLowerCase();
    return subs.filter((s) => s.email.toLowerCase().includes(q));
  }, [subs, search]);

  function toggleSelect(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
  function toggleSelectAll() {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map((s) => s.id)));
  }

  async function remove(id) {
    if (!confirm('Remove this subscriber?')) return;
    try {
      await apiDelete(`/cms?resource=newsletter&id=${id}`);
      setSubs((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  async function bulkDelete() {
    const ids = [...selected];
    if (!ids.length) return;
    if (!confirm(`Delete ${ids.length} selected subscriber(s)?`)) return;
    try {
      await apiDelete(`/cms?resource=newsletter&ids=${ids.join(',')}`);
      setSubs((prev) => prev.filter((s) => !selected.has(s.id)));
      setSelected(new Set());
    } catch (err) {
      alert(err.message);
    }
  }

  function exportCsv() {
    const header = 'Email,Status,Source,Subscribed On\n';
    const body = subs.map((s) =>
      `${s.email},${s.is_active === false ? 'Inactive' : 'Active'},${s.source || ''},${new Date(s.created_at).toLocaleString()}`
    ).join('\n');
    const blob = new Blob([header + body], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'newsletter-subscribers.csv'; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="admin-page-head">
        <h1 className="admin-page-title">Newsletter Subscribers</h1>
        <button className="admin-btn" onClick={exportCsv} disabled={!subs.length}><FiDownload /> Export CSV</button>
      </div>

      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      {/* Total counter card */}
      <div className="admin-stats" style={{ marginBottom: 18 }}>
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon"><FiMail /></div>
          <div>
            <div className="admin-stat-card__value">{subs.length.toLocaleString('en-IN')}</div>
            <div className="admin-stat-card__label">Total Subscribers</div>
          </div>
        </div>
      </div>

      <div className="admin-filterbar">
        <div className="admin-search">
          <FiSearch />
          <input type="text" placeholder="Search by email…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {selected.size > 0 && (
        <div className="admin-bulkbar">
          <span>{selected.size} selected</span>
          <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={bulkDelete}>Delete Selected</button>
        </div>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: 36 }}>
                <input type="checkbox" checked={filtered.length > 0 && selected.size === filtered.length} onChange={toggleSelectAll} />
              </th>
              <th>#</th><th>Email</th><th>Status</th><th>Source</th><th>Subscribed On</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan="7" className="admin-table__empty">Loading…</td></tr>}
            {!loading && filtered.length === 0 && <tr><td colSpan="7" className="admin-table__empty">No subscribers yet.</td></tr>}
            {filtered.map((s, i) => (
              <tr key={s.id}>
                <td><input type="checkbox" checked={selected.has(s.id)} onChange={() => toggleSelect(s.id)} /></td>
                <td style={{ color: '#888', width: 40 }}>{i + 1}</td>
                <td style={{ fontWeight: 600 }}>{s.email}</td>
                <td><span className={`admin-badge admin-badge--${s.is_active === false ? 'closed' : 'converted'}`}>{s.is_active === false ? 'Inactive' : 'Active'}</span></td>
                <td><span className="admin-badge admin-badge--contacted">{s.source || 'website'}</span></td>
                <td>{new Date(s.created_at).toLocaleDateString()}</td>
                <td className="admin-actions">
                  <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => remove(s.id)} title="Remove"><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
