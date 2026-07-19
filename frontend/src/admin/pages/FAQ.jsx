import { useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { apiGet, apiPost, apiPut, apiDelete } from '../api';
import { useConfirm } from '../components/useConfirm';

const EMPTY = {
  question: '', answer: '', category: 'General', sort_order: 0, is_active: true,
};

export default function FAQ() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const { confirm, dialog } = useConfirm();

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
      setError('');
      load();
    } catch (err) { setError(err.message); }
  }

  async function remove(id) {
    const ok = await confirm({
      title: 'Delete this FAQ?',
      message: 'This question and its answer will be permanently removed from your site. This action cannot be undone.',
      confirmLabel: 'Delete FAQ',
      danger: true,
    });
    if (!ok) return;
    try { await apiDelete(`/faq?id=${id}`); load(); }
    catch (err) { setError(err.message); }
  }

  return (
    <div>
      <div className="admin-shop-head">
        <h1>FAQs</h1>
        <div className="admin-shop-head__actions">
          <button className="admin-sbtn admin-sbtn--primary" onClick={startNew}><FiPlus /> Add FAQ</button>
        </div>
      </div>

      {error && <div className="admin-salert">{error}</div>}

      {showForm && (
        <form className="admin-card admin-sform" onSubmit={save}>
          <div className="admin-card__header">
            <h2>{editId ? 'Edit FAQ' : 'New FAQ'}</h2>
          </div>
          <div className="admin-card__body">
            <label className="admin-sfield"><span>Question</span>
              <input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required /></label>
            <label className="admin-sfield"><span>Answer</span>
              <textarea rows={4} value={form.answer || ''} onChange={(e) => setForm({ ...form, answer: e.target.value })} /></label>
            <div className="admin-sform__grid">
              <label className="admin-sfield"><span>Category</span>
                <input value={form.category || 'General'} onChange={(e) => setForm({ ...form, category: e.target.value })} /></label>
              <label className="admin-sfield"><span>Sort Order</span>
                <input type="number" value={form.sort_order ?? 0} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} /></label>
            </div>
            <label className="admin-scheck">
              <input type="checkbox" checked={!!form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
              <span>Active</span>
            </label>
          </div>
          <div className="admin-sform__actions">
            <button type="button" className="admin-sbtn" onClick={() => setShowForm(false)}>Cancel</button>
            <button type="submit" className="admin-sbtn admin-sbtn--primary">Save</button>
          </div>
        </form>
      )}

      <div className="admin-card">
        <table className="admin-shop-table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Category</th>
              <th>Status</th>
              <th className="is-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr><td colSpan="4" className="admin-shop-table__empty">No FAQs yet.</td></tr>
            )}
            {items.map((f) => (
              <tr key={f.id}>
                <td>
                  <p className="admin-shop-table__name admin-shop-table__trunc">{f.question}</p>
                  <p className="admin-shop-table__sub admin-shop-table__trunc">
                    {f.answer ? f.answer.slice(0, 80) + (f.answer.length > 80 ? '…' : '') : '-'}
                  </p>
                </td>
                <td>
                  <span className="admin-sbadge admin-sbadge--neutral">{f.category || 'General'}</span>
                </td>
                <td>
                  {f.is_active
                    ? <span className="admin-sbadge admin-sbadge--success">Active</span>
                    : <span className="admin-sbadge admin-sbadge--neutral">Inactive</span>}
                </td>
                <td className="is-right">
                  <div className="admin-srow-actions">
                    <button className="admin-sicon" onClick={() => startEdit(f)} title="Edit"><FiEdit2 /></button>
                    <button className="admin-sicon admin-sicon--danger" onClick={() => remove(f.id)} title="Delete"><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {dialog}
    </div>
  );
}
