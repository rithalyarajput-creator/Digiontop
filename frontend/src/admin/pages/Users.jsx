import { useEffect, useState } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiKey, FiUser, FiCopy, FiX } from 'react-icons/fi';
import { apiGet, apiPost, apiPut, apiDelete, SECTIONS, SECTION_LABELS } from '../api';
import { useConfirm } from '../components/useConfirm';

const EMPTY = { full_name: '', username: '', password: '', perms: [] };

/* `permissions` comes back from the API as a comma-separated string. */
function parsePerms(str) {
  return String(str || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function formatDate(v) {
  if (!v) return '—';
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function Users() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  // Shown exactly once, right after creating a user / resetting a password.
  const [credentials, setCredentials] = useState(null);
  const [copied, setCopied] = useState(false);
  const { confirm, dialog } = useConfirm();

  async function load() {
    setLoading(true);
    try {
      const rows = await apiGet('/cms?resource=users');
      setItems(Array.isArray(rows) ? rows : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function startNew() {
    setForm(EMPTY);
    setEditId(null);
    setCredentials(null);
    setError('');
    setShowForm(true);
  }

  function startEdit(u) {
    setForm({
      full_name: u.full_name || '',
      username: u.username || '',
      password: '',
      perms: parsePerms(u.permissions),
    });
    setEditId(u.id);
    setCredentials(null);
    setError('');
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditId(null);
    setForm(EMPTY);
  }

  function togglePerm(key) {
    setForm((p) => ({
      ...p,
      perms: p.perms.includes(key) ? p.perms.filter((x) => x !== key) : [...p.perms, key],
    }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setError('');

    if (!editId && String(form.password).length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (editId && form.password && String(form.password).length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setSaving(true);
    try {
      if (editId) {
        const payload = {
          id: editId,
          full_name: form.full_name,
          permissions: form.perms,
        };
        // Only send a password when the owner actually typed one — omitting it
        // leaves the existing password untouched.
        if (form.password) payload.password = form.password;

        const updated = await apiPut('/cms?resource=users', payload);
        setItems((prev) => prev.map((x) => (x.id === editId ? updated : x)));
        if (form.password) {
          setCredentials({
            username: updated.username,
            password: form.password,
            reset: true,
          });
        }
        closeForm();
      } else {
        const created = await apiPost('/cms?resource=users', {
          username: form.username.trim(),
          password: form.password,
          full_name: form.full_name,
          permissions: form.perms,
        });
        setItems((prev) => [...prev, created]);
        setCredentials({
          username: created.username,
          password: form.password,
          reset: false,
        });
        closeForm();
      }
      setCopied(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(u) {
    if (u.is_super) return; // backend rejects this anyway
    if (u.is_active) {
      const ok = await confirm({
        title: `Disable "${u.username}"?`,
        message: 'They will be signed out and will not be able to log in again until you re-enable the account.',
        confirmLabel: 'Disable user',
        danger: true,
      });
      if (!ok) return;
    }
    setError('');
    try {
      const updated = await apiPut('/cms?resource=users', { id: u.id, is_active: !u.is_active });
      setItems((prev) => prev.map((x) => (x.id === u.id ? updated : x)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function resetPassword(u) {
    startEdit(u);
    setError('');
  }

  async function remove(u) {
    if (u.is_super) return;
    const ok = await confirm({
      title: `Delete user "${u.username}"?`,
      message: 'This team account will be permanently removed and they will lose access immediately. This action cannot be undone.',
      confirmLabel: 'Delete user',
      danger: true,
    });
    if (!ok) return;
    setError('');
    try {
      await apiDelete(`/cms?resource=users&id=${u.id}`);
      setItems((prev) => prev.filter((x) => x.id !== u.id));
    } catch (err) {
      setError(err.message);
    }
  }

  function copyCredentials() {
    if (!credentials) return;
    const text = `Username: ${credentials.username}\nPassword: ${credentials.password}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => setCopied(true),
        () => setCopied(false)
      );
    }
  }

  const editingUser = editId ? items.find((x) => x.id === editId) : null;

  return (
    <div>
      <div className="admin-shop-head">
        <h1>Users</h1>
        <div className="admin-shop-head__actions">
          <button className="admin-sbtn admin-sbtn--primary" onClick={startNew}><FiPlus /> Add user</button>
        </div>
      </div>

      {error && <div className="admin-salert">{error}</div>}

      {/* One-time credential handoff — shown once, never stored, never re-shown. */}
      {credentials && (
        <div className="admin-card admin-users-cred">
          <div className="admin-card__header">
            <h2>{credentials.reset ? 'Password reset' : 'User created'}</h2>
            <button className="admin-sicon" onClick={() => setCredentials(null)} title="Dismiss"><FiX /></button>
          </div>
          <div className="admin-card__body">
            <p className="admin-users-cred__note">
              Copy these now and hand them over — the password is shown <strong>once</strong> and cannot be
              retrieved again. If it is lost, use “Reset password” to set a new one.
            </p>
            <div className="admin-users-cred__grid">
              <div>
                <span className="admin-users-cred__label">Username</span>
                <code className="admin-users-cred__value">{credentials.username}</code>
              </div>
              <div>
                <span className="admin-users-cred__label">Password</span>
                <code className="admin-users-cred__value">{credentials.password}</code>
              </div>
            </div>
            <div className="admin-users-cred__actions">
              <button type="button" className="admin-sbtn admin-sbtn--sm" onClick={copyCredentials}>
                <FiCopy /> {copied ? 'Copied' : 'Copy'}
              </button>
              <button type="button" className="admin-sbtn admin-sbtn--sm" onClick={() => setCredentials(null)}>
                I've saved it
              </button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <form className="admin-card admin-sform" onSubmit={handleSave}>
          <div className="admin-card__header">
            <h2>{editId ? `Edit user${editingUser ? ` — ${editingUser.username}` : ''}` : 'New user'}</h2>
          </div>
          <div className="admin-card__body">
            <div className="admin-sform__grid">
              <label className="admin-sfield"><span>Full name</span>
                <input
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                  placeholder="e.g. Priya Sharma"
                />
              </label>
              <label className="admin-sfield"><span>Username *</span>
                <input
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  placeholder="They sign in with this"
                  autoComplete="off"
                  required
                  disabled={!!editId}
                />
              </label>
            </div>

            <label className="admin-sfield">
              <span>{editId ? 'New password' : 'Password *'}</span>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder={editId ? 'Leave blank to keep current password' : 'At least 8 characters'}
                autoComplete="new-password"
                minLength={8}
                required={!editId}
              />
            </label>

            <p className="admin-sform__section">Sections this user can open</p>
            <div className="admin-users-perms">
              {SECTIONS.map((s) => (
                <label key={s.key} className="admin-scheck admin-users-perm">
                  <input
                    type="checkbox"
                    checked={form.perms.includes(s.key)}
                    onChange={() => togglePerm(s.key)}
                  />
                  <span>
                    <strong>{s.label}</strong>
                    <em className="admin-users-perm__hint">{s.hint}</em>
                  </span>
                </label>
              ))}
            </div>
            <p className="admin-users-note">
              Unticked sections are hidden from their menu and refused by the server. Managing users is
              reserved for the owner account and cannot be granted to anyone else.
            </p>
          </div>
          <div className="admin-sform__actions">
            <button type="button" className="admin-sbtn" onClick={closeForm}>Cancel</button>
            <button type="submit" className="admin-sbtn admin-sbtn--primary" disabled={saving}>
              {saving ? 'Saving…' : editId ? 'Save user' : 'Create user'}
            </button>
          </div>
        </form>
      )}

      <div className="admin-card">
        <table className="admin-shop-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Sections</th>
              <th>Status</th>
              <th>Created</th>
              <th className="is-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan="6" className="admin-shop-table__empty">Loading…</td></tr>}
            {!loading && items.length === 0 && (
              <tr><td colSpan="6" className="admin-shop-table__empty">No users yet.</td></tr>
            )}
            {!loading && items.map((u) => {
              const perms = parsePerms(u.permissions);
              return (
                <tr key={u.id} className={u.is_super ? 'admin-users-row--owner' : undefined}>
                  <td>
                    <div className="admin-shop-table__media">
                      <div className="admin-shop-table__thumb"><FiUser /></div>
                      <div style={{ minWidth: 0 }}>
                        <p className="admin-shop-table__name">{u.full_name || u.username}</p>
                        <p className="admin-shop-table__sub">@{u.username}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`admin-sbadge admin-sbadge--${u.is_super ? 'info' : 'neutral'}`}>
                      {u.is_super ? 'Owner' : 'Team'}
                    </span>
                  </td>
                  <td>
                    {u.is_super ? (
                      <span className="admin-sbadge admin-sbadge--info">All sections</span>
                    ) : perms.length === 0 ? (
                      <span className="is-muted">No sections</span>
                    ) : (
                      <span className="admin-users-pills">
                        {perms.map((p) => (
                          <span key={p} className="admin-sbadge admin-sbadge--neutral">
                            {SECTION_LABELS[p] || p}
                          </span>
                        ))}
                      </span>
                    )}
                  </td>
                  <td>
                    {u.is_super ? (
                      <span className="admin-sbadge admin-sbadge--success">Active</span>
                    ) : (
                      <button
                        className={`admin-sbadge admin-sbadge--${u.is_active ? 'success' : 'neutral'}`}
                        onClick={() => toggleStatus(u)}
                        title="Click to toggle"
                      >
                        {u.is_active ? 'Active' : 'Disabled'}
                      </button>
                    )}
                  </td>
                  <td className="is-muted">{formatDate(u.created_at)}</td>
                  <td className="is-right">
                    <div className="admin-srow-actions">
                      {u.is_super ? (
                        <span className="admin-users-owner-note">Owner account</span>
                      ) : (
                        <>
                          <button className="admin-sicon" onClick={() => startEdit(u)} title="Edit"><FiEdit2 /></button>
                          <button className="admin-sicon" onClick={() => resetPassword(u)} title="Reset password"><FiKey /></button>
                          <button className="admin-sicon admin-sicon--danger" onClick={() => remove(u)} title="Delete"><FiTrash2 /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {dialog}
    </div>
  );
}
