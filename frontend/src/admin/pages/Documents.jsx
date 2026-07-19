import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import {
  FiPlus, FiTrash2, FiEdit2, FiLock, FiUnlock, FiSearch, FiEye,
  FiDownload, FiFileText, FiImage, FiFile, FiKey, FiUpload,
} from 'react-icons/fi';
import { apiGet, apiPost, apiPut, apiDelete } from '../api';
import { useConfirm } from '../components/useConfirm';

/* The private document vault.

   Two locks: the admin session (owner-only, enforced server-side) and, on top of
   it, a passphrase exchanged for a 30-minute token. That token lives in React
   state and NOWHERE else — not localStorage, not sessionStorage. Reloading the
   page therefore re-locks the vault, which is the entire point: an unattended
   logged-in laptop must not expose a proforma. */

const MAX_BYTES = 3 * 1024 * 1024; // ~3MB; base64 inflation puts the server cap at 4MB of payload

const ALLOWED_MIME = [
  'application/pdf',
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

const ACCEPT = '.pdf,.jpg,.jpeg,.png,.webp,.gif,.doc,.docx,.xls,.xlsx';

const CATEGORY_SUGGESTIONS = ['Proforma', 'Invoice', 'Agreement', 'Registration', 'Tax'];

const EMPTY_FORM = { title: '', category: '', notes: '' };
const EMPTY_PASS = { current: '', next: '', confirm: '' };

/* ── helpers ─────────────────────────────────────────────────────────────── */

function isWord(mime) {
  return mime === 'application/msword' ||
    mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
}
function isExcel(mime) {
  return mime === 'application/vnd.ms-excel' ||
    mime === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
}

/** File-type icon + the colour class that tints it. */
function DocIcon({ mime }) {
  if (mime === 'application/pdf') {
    return <span className="admin-docs-icon admin-docs-icon--pdf"><FiFileText /></span>;
  }
  if (String(mime).startsWith('image/')) {
    return <span className="admin-docs-icon admin-docs-icon--img"><FiImage /></span>;
  }
  if (isWord(mime)) {
    return <span className="admin-docs-icon admin-docs-icon--word"><FiFileText /></span>;
  }
  if (isExcel(mime)) {
    return <span className="admin-docs-icon admin-docs-icon--excel"><FiFile /></span>;
  }
  return <span className="admin-docs-icon"><FiFile /></span>;
}

function formatSize(bytes) {
  const n = Number(bytes);
  if (!n || n < 0) return '-';
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(value) {
  if (!value) return '-';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '-';
  return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
}

/** Read a File as raw base64 — no canvas, no re-encode. A proforma must arrive
    byte-identical, so this is deliberately NOT the image uploader's path. */
function readBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      const comma = result.indexOf(',');
      if (comma === -1) { reject(new Error('Could not read that file.')); return; }
      resolve(result.slice(comma + 1)); // strip the "data:<mime>;base64," prefix
    };
    reader.onerror = () => reject(new Error('Could not read that file.'));
    reader.readAsDataURL(file);
  });
}

/* ── lock screen ─────────────────────────────────────────────────────────── */

function LockScreen({ onUnlock, expired }) {
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const resp = await apiPost('/cms?resource=docs&action=unlock', { passphrase });
      if (!resp || !resp.token) throw new Error('Unlock failed. Please try again.');
      onUnlock(resp.token);
      // deliberately do not clear `passphrase` — the component unmounts anyway
    } catch (err) {
      // Wrong passphrase: show the server's message and LEAVE the field alone.
      setError(err.message || 'Unlock failed.');
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="admin-shop-head">
        <h1>Documents</h1>
      </div>

      <div className="admin-card admin-docs-lock">
        <div className="admin-card__body">
          <div className="admin-docs-lock__badge"><FiLock /></div>
          <h2 className="admin-docs-lock__title">This vault is locked</h2>
          <p className="admin-docs-lock__text">
            Your private business documents, proformas, invoices and agreements, are kept
            behind a second passphrase, separate from your admin login.
          </p>

          {expired && (
            <div className="admin-salert admin-docs-lock__alert">
              Session expired, enter the passphrase again.
            </div>
          )}
          {error && <div className="admin-salert admin-docs-lock__alert">{error}</div>}

          <form className="admin-docs-lock__form" onSubmit={submit}>
            <label className="admin-sfield">
              <span>Passphrase</span>
              <input
                type="password"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                placeholder="Enter the vault passphrase"
                autoFocus
                autoComplete="off"
              />
            </label>
            <button
              type="submit"
              className="admin-sbtn admin-sbtn--primary admin-docs-lock__btn"
              disabled={busy || !passphrase}
            >
              <FiUnlock /> {busy ? 'Unlocking…' : 'Unlock'}
            </button>
          </form>

          <p className="admin-docs-lock__hint">
            The vault locks itself again after 30 minutes, and whenever this page is reloaded.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── main page ───────────────────────────────────────────────────────────── */

export default function Documents() {
  // The vault token. Memory only — never written to localStorage/sessionStorage.
  const [vaultToken, setVaultToken] = useState(null);
  const [expired, setExpired] = useState(false);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const [showPass, setShowPass] = useState(false);
  const [pass, setPass] = useState(EMPTY_PASS);
  const [passError, setPassError] = useState('');
  const [passOk, setPassOk] = useState('');
  const [passBusy, setPassBusy] = useState(false);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const fileRef = useRef(null);
  const { confirm, dialog } = useConfirm();

  /* Drop back to the lock screen. Used both by "Lock now" and by any call that
     comes back with locked:true — the admin session stays intact either way. */
  const lock = useCallback((wasExpired) => {
    setVaultToken(null);
    setExpired(!!wasExpired);
    setItems([]);
    setShowForm(false);
    setShowPass(false);
    setForm(EMPTY_FORM);
    setPass(EMPTY_PASS);
    setEditId(null);
    setFile(null);
    setError('');
  }, []);

  /** Route an error: a vault 401 re-locks, anything else is shown inline. */
  const handleError = useCallback((err, set) => {
    if (err && err.locked) { lock(true); return; }
    set(err.message || 'Something went wrong.');
  }, [lock]);

  const load = useCallback(async (token) => {
    setLoading(true);
    setError('');
    try {
      const rows = await apiGet('/cms?resource=docs', token);
      setItems(Array.isArray(rows) ? rows : []);
    } catch (err) {
      if (err && err.locked) { lock(true); return; }
      setError(err.message || 'Could not load documents.');
    } finally {
      setLoading(false);
    }
  }, [lock]);

  useEffect(() => {
    if (vaultToken) load(vaultToken);
  }, [vaultToken, load]);

  /* Belt-and-braces auto-lock: the token is good for 30 minutes server-side, so
     re-lock the UI at the same moment rather than waiting for a call to fail. */
  useEffect(() => {
    if (!vaultToken) return undefined;
    const timer = setTimeout(() => lock(true), 30 * 60 * 1000);
    return () => clearTimeout(timer);
  }, [vaultToken, lock]);

  function handleUnlock(token) {
    setExpired(false);
    setVaultToken(token);
  }

  /* ── upload / edit ─────────────────────────────────────────────────────── */

  function startNew() {
    setForm(EMPTY_FORM);
    setEditId(null);
    setFile(null);
    setError('');
    setShowForm(true);
  }

  function startEdit(d) {
    setForm({ title: d.title || '', category: d.category || '', notes: d.notes || '' });
    setEditId(d.id);
    setFile(null);
    setError('');
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditId(null);
    setForm(EMPTY_FORM);
    setFile(null);
  }

  function pickFile(e) {
    const chosen = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!chosen) return;

    // Client-side gates. The server enforces both again (415 / 413) — this is
    // only here so the owner finds out before waiting on a 3MB upload.
    if (!ALLOWED_MIME.includes(chosen.type)) {
      setFile(null);
      setError('Only PDF, image, Word and Excel files are allowed.');
      return;
    }
    if (chosen.size > MAX_BYTES) {
      setFile(null);
      setError(`That file is ${formatSize(chosen.size)}. The maximum is about 3 MB.`);
      return;
    }
    setError('');
    setFile(chosen);
    // Offer the filename as the title if the owner hasn't typed one.
    setForm((p) => (p.title ? p : { ...p, title: chosen.name.replace(/\.[^.]+$/, '') }));
  }

  async function save(e) {
    e.preventDefault();
    setError('');

    if (!form.title.trim()) { setError('A title is required.'); return; }

    // Editing only ever touches metadata — the bytes are immutable.
    if (editId) {
      setSaving(true);
      try {
        const updated = await apiPut('/cms?resource=docs', {
          id: editId,
          title: form.title.trim(),
          category: form.category.trim() || null,
          notes: form.notes.trim() || null,
        }, vaultToken);
        setItems((prev) => prev.map((x) => (x.id === editId ? updated : x)));
        closeForm();
      } catch (err) {
        handleError(err, setError);
      } finally {
        setSaving(false);
      }
      return;
    }

    if (!file) { setError('Please choose a file to upload.'); return; }

    setSaving(true);
    try {
      const data = await readBase64(file); // raw bytes, no compression
      const created = await apiPost('/cms?resource=docs', {
        title: form.title.trim(),
        category: form.category.trim() || null,
        notes: form.notes.trim() || null,
        filename: file.name,
        mime: file.type,
        data,
      }, vaultToken);
      setItems((prev) => [created, ...prev]);
      closeForm();
    } catch (err) {
      // Surfaces the server's own 413/415 message if the client check was bypassed.
      handleError(err, setError);
    } finally {
      setSaving(false);
    }
  }

  async function remove(d) {
    const ok = await confirm({
      title: `Delete "${d.title}"?`,
      message: 'This document and its file will be permanently deleted. This cannot be undone.',
      confirmLabel: 'Delete document',
      danger: true,
    });
    if (!ok) return;
    try {
      await apiDelete(`/cms?resource=docs&id=${d.id}`, vaultToken);
      setItems((prev) => prev.filter((x) => x.id !== d.id));
    } catch (err) {
      handleError(err, setError);
    }
  }

  /* The browser fetches these directly, so the token rides in the query string —
     the backend accepts `vt` as an alias for the X-Vault-Token header. */
  function fileUrl(d, download) {
    const base = `/api/cms?resource=docs&id=${d.id}&vt=${encodeURIComponent(vaultToken || '')}`;
    return download ? `${base}&download=1` : base;
  }

  /* ── change passphrase ─────────────────────────────────────────────────── */

  async function savePassphrase(e) {
    e.preventDefault();
    setPassError('');
    setPassOk('');

    if (pass.next.length < 6) {
      setPassError('New passphrase must be at least 6 characters.');
      return;
    }
    if (pass.next !== pass.confirm) {
      setPassError('The two new passphrases do not match.');
      return;
    }

    setPassBusy(true);
    try {
      await apiPut('/cms?resource=docs&action=passphrase',
        { current: pass.current, next: pass.next }, vaultToken);
      setPass(EMPTY_PASS);
      setPassOk('Passphrase updated. Use the new one next time the vault locks.');
    } catch (err) {
      // A wrong *current* passphrase is a plain 401 without locked:true, so it
      // lands here as an inline message rather than re-locking the vault.
      handleError(err, setPassError);
    } finally {
      setPassBusy(false);
    }
  }

  /* ── filtering ─────────────────────────────────────────────────────────── */

  const categories = useMemo(() => {
    const set = new Set();
    items.forEach((d) => { if (d.category) set.add(d.category); });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [items]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((d) => {
      if (category && d.category !== category) return false;
      if (!q) return true;
      return (
        String(d.title || '').toLowerCase().includes(q) ||
        String(d.category || '').toLowerCase().includes(q) ||
        String(d.filename || '').toLowerCase().includes(q)
      );
    });
  }, [items, search, category]);

  /* ── render ────────────────────────────────────────────────────────────── */

  if (!vaultToken) return <LockScreen onUnlock={handleUnlock} expired={expired} />;

  return (
    <div>
      <div className="admin-shop-head">
        <h1>Documents</h1>
        <div className="admin-shop-head__actions">
          <button className="admin-sbtn" onClick={() => { setShowPass((v) => !v); setPassError(''); setPassOk(''); }}>
            <FiKey /> Change passphrase
          </button>
          <button className="admin-sbtn" onClick={() => lock(false)} title="Lock the vault now">
            <FiLock /> Lock now
          </button>
          <button className="admin-sbtn admin-sbtn--primary" onClick={startNew}>
            <FiPlus /> Upload document
          </button>
        </div>
      </div>

      <p className="admin-docs-note">
        <FiUnlock /> Vault unlocked. It locks itself again after 30 minutes of the session, or
        as soon as you reload this page.
      </p>

      {error && <div className="admin-salert">{error}</div>}

      {showPass && (
        <form className="admin-card admin-sform" onSubmit={savePassphrase}>
          <div className="admin-card__header">
            <h2>Change vault passphrase</h2>
          </div>
          <div className="admin-card__body">
            {passError && <div className="admin-salert">{passError}</div>}
            {passOk && <div className="admin-docs-ok">{passOk}</div>}

            <label className="admin-sfield">
              <span>Current passphrase</span>
              <input
                type="password" autoComplete="off" value={pass.current}
                onChange={(e) => setPass({ ...pass, current: e.target.value })} required
              />
            </label>
            <div className="admin-sform__grid">
              <label className="admin-sfield">
                <span>New passphrase (min 6 characters)</span>
                <input
                  type="password" autoComplete="new-password" value={pass.next}
                  onChange={(e) => setPass({ ...pass, next: e.target.value })} required
                />
              </label>
              <label className="admin-sfield">
                <span>Confirm new passphrase</span>
                <input
                  type="password" autoComplete="new-password" value={pass.confirm}
                  onChange={(e) => setPass({ ...pass, confirm: e.target.value })} required
                />
              </label>
            </div>
          </div>
          <div className="admin-sform__actions">
            <button type="button" className="admin-sbtn" onClick={() => { setShowPass(false); setPass(EMPTY_PASS); }}>
              Cancel
            </button>
            <button type="submit" className="admin-sbtn admin-sbtn--primary" disabled={passBusy}>
              {passBusy ? 'Saving…' : 'Update passphrase'}
            </button>
          </div>
        </form>
      )}

      {showForm && (
        <form className="admin-card admin-sform" onSubmit={save}>
          <div className="admin-card__header">
            <h2>{editId ? 'Edit document' : 'Upload document'}</h2>
          </div>
          <div className="admin-card__body">
            <div className="admin-sform__grid">
              <label className="admin-sfield">
                <span>Title *</span>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Proforma, Acme Pvt Ltd"
                  required
                />
              </label>
              <label className="admin-sfield">
                <span>Category</span>
                <input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  list="admin-docs-categories"
                  placeholder="Proforma, Invoice, Agreement…"
                />
                <datalist id="admin-docs-categories">
                  {CATEGORY_SUGGESTIONS.map((c) => <option key={c} value={c} />)}
                  {categories
                    .filter((c) => !CATEGORY_SUGGESTIONS.includes(c))
                    .map((c) => <option key={c} value={c} />)}
                </datalist>
              </label>
            </div>

            <label className="admin-sfield">
              <span>Notes</span>
              <textarea
                rows="3" value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Anything you want to remember about this document."
              />
            </label>

            {editId ? (
              <p className="admin-docs-hint">
                The file itself can't be changed. Delete this document and upload it again to replace it.
              </p>
            ) : (
              <div className="admin-sfield">
                <span>File *</span>
                <div className="admin-supload">
                  <input
                    ref={fileRef} type="file" accept={ACCEPT}
                    onChange={pickFile} style={{ display: 'none' }}
                  />
                  <button
                    type="button" className="admin-sbtn"
                    onClick={() => fileRef.current && fileRef.current.click()}
                    disabled={saving}
                  >
                    <FiUpload /> Choose file
                  </button>
                  {file ? (
                    <span className="admin-docs-file">
                      <DocIcon mime={file.type} />
                      <span>{file.name}</span>
                      <span className="admin-docs-file__size">{formatSize(file.size)}</span>
                    </span>
                  ) : (
                    <span className="admin-docs-hint">
                      PDF, image, Word or Excel. Maximum about 3 MB.
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="admin-sform__actions">
            <button type="button" className="admin-sbtn" onClick={closeForm} disabled={saving}>Cancel</button>
            <button type="submit" className="admin-sbtn admin-sbtn--primary" disabled={saving}>
              {saving
                ? (editId ? 'Saving…' : 'Uploading…')
                : (editId ? 'Save changes' : 'Upload document')}
            </button>
          </div>
        </form>
      )}

      <div className="admin-card">
        <div className="admin-card__header">
          <h2>All documents</h2>
          <div className="admin-docs-filters">
            <div className="admin-card__search">
              <FiSearch />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search title, category or filename…"
              />
            </div>
            <select
              className="admin-card__filter"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All categories</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="admin-card__scrollx">
          <table className="admin-shop-table">
            <thead>
              <tr>
                <th>Document</th>
                <th>Category</th>
                <th className="is-right">Size</th>
                <th>Added</th>
                <th className="is-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan="5" className="admin-shop-table__empty">Loading…</td></tr>
              )}

              {!loading && items.length === 0 && (
                <tr>
                  <td colSpan="5" className="admin-shop-table__empty">
                    No documents yet. Upload a proforma, invoice or agreement to get started.
                  </td>
                </tr>
              )}

              {!loading && items.length > 0 && filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="admin-shop-table__empty">
                    No documents match that search.
                  </td>
                </tr>
              )}

              {!loading && filtered.map((d) => (
                <tr key={d.id}>
                  <td>
                    <div className="admin-shop-table__media">
                      <DocIcon mime={d.mime} />
                      <div style={{ minWidth: 0 }}>
                        <p className="admin-shop-table__name">{d.title}</p>
                        <p className="admin-shop-table__sub admin-shop-table__trunc">{d.filename}</p>
                        {d.notes && <p className="admin-docs-notes">{d.notes}</p>}
                      </div>
                    </div>
                  </td>
                  <td>
                    {d.category
                      ? <span className="admin-sbadge admin-sbadge--info">{d.category}</span>
                      : <span className="is-muted">, </span>}
                  </td>
                  <td className="is-right is-muted">{formatSize(d.size_bytes)}</td>
                  <td className="is-muted">{formatDate(d.created_at)}</td>
                  <td className="is-right">
                    <div className="admin-srow-actions">
                      <a
                        className="admin-sicon" title="View"
                        href={fileUrl(d, false)} target="_blank" rel="noreferrer"
                      >
                        <FiEye />
                      </a>
                      <a
                        className="admin-sicon" title="Download"
                        href={fileUrl(d, true)} target="_blank" rel="noreferrer"
                      >
                        <FiDownload />
                      </a>
                      <button className="admin-sicon" onClick={() => startEdit(d)} title="Edit">
                        <FiEdit2 />
                      </button>
                      <button
                        className="admin-sicon admin-sicon--danger"
                        onClick={() => remove(d)} title="Delete"
                      >
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

      {dialog}
    </div>
  );
}
