import { useEffect, useMemo, useState } from 'react';
import { FiTrash2, FiSearch, FiDownload } from 'react-icons/fi';
import { apiGet, apiDelete } from '../api';

export default function Newsletter() {
  const [subs, setSubs] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      setSubs(await apiGet('/newsletter'));
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

  async function remove(id) {
    if (!confirm('Remove this subscriber?')) return;
    try {
      await apiDelete(`/newsletter?id=${id}`);
      setSubs((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  function exportCsv() {
    const header = 'Email,Source,Subscribed On\n';
    const body = subs.map((s) => `${s.email},${s.source || ''},${new Date(s.created_at).toLocaleString()}`).join('\n');
    const blob = new Blob([header + body], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter-subscribers.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="admin-page-head">
        <h1 className="admin-page-title">Newsletter Subscribers</h1>
        <button className="admin-btn" onClick={exportCsv} disabled={!subs.length}><FiDownload /> Export CSV</button>
      </div>

      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      <div className="admin-filterbar">
        <div className="admin-search">
          <FiSearch />
          <input type="text" placeholder="Search by email…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <span className="admin-muted">{subs.length} total subscriber(s)</span>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>#</th><th>Email</th><th>Source</th><th>Subscribed On</th><th>Actions</th></tr></thead>
          <tbody>
            {loading && <tr><td colSpan="5" className="admin-table__empty">Loading…</td></tr>}
            {!loading && filtered.length === 0 && <tr><td colSpan="5" className="admin-table__empty">No subscribers yet.</td></tr>}
            {filtered.map((s, i) => (
              <tr key={s.id}>
                <td style={{ color: '#888', width: 40 }}>{i + 1}</td>
                <td style={{ fontWeight: 600 }}>{s.email}</td>
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
