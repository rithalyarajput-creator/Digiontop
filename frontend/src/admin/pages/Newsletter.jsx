import { useEffect, useMemo, useState } from 'react';
import { FiTrash2, FiSearch, FiDownload } from 'react-icons/fi';
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

  const activeCount = useMemo(() => subs.filter((s) => s.is_active !== false).length, [subs]);
  const inactiveCount = subs.length - activeCount;

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
      <div className="admin-shop-head">
        <h1>Newsletter</h1>
        <div className="admin-shop-head__actions">
          <button className="admin-sbtn" onClick={exportCsv} disabled={!subs.length}><FiDownload /> Export CSV</button>
        </div>
      </div>

      {error && <div className="admin-salert">{error}</div>}

      <div className="admin-metrics-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="admin-metric">
          <p className="admin-metric__label">Total Subscribers</p>
          <p className="admin-metric__value">{subs.length.toLocaleString('en-IN')}</p>
        </div>
        <div className="admin-metric">
          <p className="admin-metric__label">Active</p>
          <p className="admin-metric__value" style={{ color: '#1a7a2e' }}>{activeCount.toLocaleString('en-IN')}</p>
        </div>
        <div className="admin-metric">
          <p className="admin-metric__label">Inactive</p>
          <p className="admin-metric__value" style={{ color: '#616161' }}>{inactiveCount.toLocaleString('en-IN')}</p>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card__search">
          <FiSearch />
          <input type="text" placeholder="Search subscribers…" value={search} onChange={(e) => setSearch(e.target.value)} />
          {search && (
            <button type="button" className="admin-sbtn admin-sbtn--sm" onClick={() => setSearch('')}>Clear</button>
          )}
        </div>

        {selected.size > 0 && (
          <div className="admin-card__bulk">
            <span>{selected.size} selected</span>
            <button className="admin-sbtn admin-sbtn--sm admin-sbtn--danger" onClick={bulkDelete}>Delete selected</button>
          </div>
        )}

        <table className="admin-shop-table">
          <thead>
            <tr>
              <th style={{ width: 40 }}>
                <input type="checkbox" checked={filtered.length > 0 && selected.size === filtered.length} onChange={toggleSelectAll} />
              </th>
              <th style={{ width: 40 }}>#</th>
              <th>Email</th>
              <th>Status</th>
              <th>Source</th>
              <th>Subscribed</th>
              <th className="is-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan="7" className="admin-shop-table__empty">Loading…</td></tr>}
            {!loading && filtered.length === 0 && (
              <tr><td colSpan="7" className="admin-shop-table__empty">No subscribers found.</td></tr>
            )}
            {!loading && filtered.map((s, i) => (
              <tr key={s.id}>
                <td><input type="checkbox" checked={selected.has(s.id)} onChange={() => toggleSelect(s.id)} /></td>
                <td className="is-muted">{i + 1}</td>
                <td><span className="admin-shop-table__name">{s.email}</span></td>
                <td>
                  {s.is_active === false
                    ? <span className="admin-sbadge admin-sbadge--neutral">Inactive</span>
                    : <span className="admin-sbadge admin-sbadge--success">Active</span>}
                </td>
                <td><span className="admin-sbadge admin-sbadge--neutral">{s.source || 'website'}</span></td>
                <td className="is-muted">{new Date(s.created_at).toLocaleDateString()}</td>
                <td className="is-right">
                  <div className="admin-srow-actions">
                    <button className="admin-sicon admin-sicon--danger" onClick={() => remove(s.id)} title="Remove"><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
