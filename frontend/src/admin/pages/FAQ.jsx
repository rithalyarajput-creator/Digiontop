import { useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { apiGet, apiPost, apiPut, apiDelete } from '../api';

const EMPTY = {
  question: '', answer: '', category: 'General', sort_order: 0, is_active: true,
};

export default function FAQ() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  async function load() {
    try { setItems(await apiGet('/faq')); }
    catch (err) { setError(err.message); }
  }
  useEffect(() => { load(); }, []);

  function startNew() { setForm(EMPTY); setEditId(null); setShowForm(true); }
  function startEdit(f) { setForm({ ...f }); setEditId(f.id); setShowForm(true); }

  async function save(e) {
    e.preventDefault();
    try {
      if (editId) await apiPut('/faq', { id: editId, ...form });
      else await apiPost('/faq', form);
      setShowForm(false);
      load();
    } catch (err) { alert(err.message); }
  }

  async function remove(id) {
    if (!confirm('Delete this FAQ?')) return;
    try { await apiDelete(`/faq?id=${id}`); load(); }
    catch (err) { alert(err.message); }
  }

  return (
    <div>
      <div className="admin-page-head">
        <h1 className="admin-page-title">FAQs</h1>
        <button className="admin-btn admin-btn--primary" onClick={startNew}><FiPlus /> Add FAQ</button>
      </div>
      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      {showForm && (
        <form className="admin-form admin-form--card" onSubmit={save}>
          <label className="admin-field"><span>Question</span>
            <input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required /></label>
          <label className="admin-field"><span>Answer</span>
            <textarea rows={4} value={form.answer || ''} onChange={(e) => setForm({ ...form, answer: e.target.value })} /></label>
          <label className="admin-field"><span>Category</span>
            <input value={form.category || 'General'} onChange={(e) => setForm({ ...form, category: e.target.value })} /></label>
          <label className="admin-field"><span>Sort Order</span>
            <input type="number" value={form.sort_order ?? 0} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} /></label>
          <label className="admin-checkbox">
            <input type="checkbox" checked={!!form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /> Active
          </label>
          <div className="admin-form__actions">
            <button type="button" className="admin-btn" onClick={() => setShowForm(false)}>Cancel</button>
            <button type="submit" className="admin-btn admin-btn--primary">Save</button>
          </div>
        </form>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Category</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr><td colSpan="4" className="admin-table__empty">No FAQs yet.</td></tr>
            )}
            {items.map((f) => (
              <tr key={f.id}>
                <td>{f.question}<div className="admin-muted">{f.answer ? f.answer.slice(0, 80) + (f.answer.length > 80 ? '…' : '') : '—'}</div></td>
                <td>{f.category || '—'}</td>
                <td>{f.is_active ? 'Yes' : 'No'}</td>
                <td className="admin-actions">
                  <button className="admin-icon-btn" onClick={() => startEdit(f)}><FiEdit2 /></button>
                  <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => remove(f.id)}><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
