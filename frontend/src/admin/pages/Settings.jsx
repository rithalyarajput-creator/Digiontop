import { useEffect, useState } from 'react';
import {
  FiSave, FiImage, FiInfo, FiShare2, FiSearch, FiSettings, FiDownload, FiUpload, FiDatabase,
} from 'react-icons/fi';
import { apiGet, apiPut, getToken, isOwner } from '../api';

const TABS = [
  { key: 'branding', label: 'Branding', icon: <FiImage /> },
  { key: 'info', label: 'Website Info', icon: <FiInfo /> },
  { key: 'social', label: 'Social Media', icon: <FiShare2 /> },
  { key: 'seo', label: 'SEO', icon: <FiSearch /> },
  { key: 'system', label: 'System', icon: <FiSettings /> },
];

export default function Settings() {
  const [form, setForm] = useState({});
  const [tab, setTab] = useState('branding');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);
  const [backingUp, setBackingUp] = useState(false);

  useEffect(() => {
    apiGet('/settings')
      .then((d) => setForm(d))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const set = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  async function handleSave(e) {
    e?.preventDefault();
    setSaving(true);
    setError('');
    try {
      const updated = await apiPut('/settings', form);
      setForm(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function exportBackup() {
    const blob = new Blob([JSON.stringify(form, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `digiontop-settings-backup.json`; a.click();
    URL.revokeObjectURL(url);
  }

  /* The full-site backup is large and needs the admin Authorization header
     (unlike a plain <a href>), so it's fetched as a blob and saved manually
     rather than reusing apiGet, which parses the response as JSON. */
  async function downloadFullBackup() {
    setBackingUp(true);
    setError('');
    try {
      const res = await fetch('/api/settings?action=full-backup', {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Backup failed (${res.status})`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `digiontop-full-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setBackingUp(false);
    }
  }

  function importBackup(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        setForm((p) => ({ ...p, ...data }));
        setError('');
        setNotice('Backup loaded into the form. Click "Save Settings" to apply.');
      } catch {
        setNotice('');
        setError('Invalid backup file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  if (loading) return <p className="admin-muted">Loading settings…</p>;

  return (
    <div>
      <div className="admin-page-head">
        <h1 className="admin-page-title">Website Settings</h1>
        <button className="admin-btn admin-btn--primary" onClick={handleSave} disabled={saving}>
          <FiSave /> {saving ? 'Saving…' : 'Save Settings'}
        </button>
      </div>

      {error && <div className="admin-alert admin-alert--error">{error}</div>}
      {notice && <div className="admin-alert admin-alert--success">{notice}</div>}
      {saved && (
        <div style={{ background: '#d6f5dd', color: '#1a9e4b', padding: '12px 16px', borderRadius: 8, marginBottom: 20, fontWeight: 600 }}>
          Settings saved & applied across the website!
        </div>
      )}

      {/* Tabs */}
      <div className="admin-tabs">
        {TABS.map((t) => (
          <button key={t.key} className={`admin-tab${tab === t.key ? ' admin-tab--active' : ''}`} onClick={() => setTab(t.key)}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <form className="admin-form" onSubmit={handleSave}>

        {/* ── BRANDING ── */}
        {tab === 'branding' && (
          <div className="admin-form--card">
            <h2 className="blogedit__section-title">Branding & Logos</h2>
            <p className="admin-muted" style={{ marginBottom: 14 }}>Paste image URLs. Recommended: transparent PNG logos, square favicon (32×32 or 64×64).</p>

            <ImgField label="Header Logo URL" value={form.logo_header} onChange={(v) => set('logo_header', v)} ratio="logo" />
            <ImgField label="Footer Logo URL" value={form.logo_footer} onChange={(v) => set('logo_footer', v)} ratio="logo" />
            <ImgField label="Favicon URL" value={form.favicon} onChange={(v) => set('favicon', v)} ratio="square" />
          </div>
        )}

        {/* ── WEBSITE INFO ── */}
        {tab === 'info' && (
          <div className="admin-form--card">
            <h2 className="blogedit__section-title">Website Information</h2>
            <label className="admin-field"><span>Website Name</span>
              <input value={form.site_name || ''} onChange={(e) => set('site_name', e.target.value)} />
            </label>
            <label className="admin-field"><span>Tagline</span>
              <input value={form.tagline || ''} onChange={(e) => set('tagline', e.target.value)} />
            </label>
            <label className="admin-field"><span>Website Description</span>
              <textarea rows="3" value={form.description || ''} onChange={(e) => set('description', e.target.value)} />
            </label>
            <div className="blogedit__row">
              <label className="admin-field"><span>Contact Email</span>
                <input type="email" value={form.contact_email || ''} onChange={(e) => set('contact_email', e.target.value)} />
              </label>
              <label className="admin-field"><span>Contact Phone</span>
                <input value={form.contact_phone || ''} onChange={(e) => set('contact_phone', e.target.value)} />
              </label>
            </div>
            <label className="admin-field"><span>Secondary Phone</span>
              <input value={form.contact_phone2 || ''} onChange={(e) => set('contact_phone2', e.target.value)} />
            </label>
          </div>
        )}

        {/* ── SOCIAL ── */}
        {tab === 'social' && (
          <div className="admin-form--card">
            <h2 className="blogedit__section-title">Social Media Links</h2>
            <p className="admin-muted" style={{ marginBottom: 14 }}>These appear in the footer & across the website automatically. Leave blank to hide.</p>
            <label className="admin-field"><span>Facebook</span>
              <input value={form.social_facebook || ''} onChange={(e) => set('social_facebook', e.target.value)} placeholder="https://facebook.com/…" />
            </label>
            <label className="admin-field"><span>Instagram</span>
              <input value={form.social_instagram || ''} onChange={(e) => set('social_instagram', e.target.value)} placeholder="https://instagram.com/…" />
            </label>
            <label className="admin-field"><span>LinkedIn</span>
              <input value={form.social_linkedin || ''} onChange={(e) => set('social_linkedin', e.target.value)} placeholder="https://linkedin.com/company/…" />
            </label>
            <label className="admin-field"><span>X (Twitter)</span>
              <input value={form.social_twitter || ''} onChange={(e) => set('social_twitter', e.target.value)} placeholder="https://x.com/…" />
            </label>
            <label className="admin-field"><span>YouTube</span>
              <input value={form.social_youtube || ''} onChange={(e) => set('social_youtube', e.target.value)} placeholder="https://youtube.com/@…" />
            </label>
          </div>
        )}

        {/* ── SEO ── */}
        {tab === 'seo' && (
          <div className="admin-form--card">
            <h2 className="blogedit__section-title">Global SEO Settings</h2>
            <label className="admin-field"><span>Default Meta Title</span>
              <input value={form.seo_meta_title || ''} onChange={(e) => set('seo_meta_title', e.target.value)} maxLength={70} />
              <small style={{ color: (form.seo_meta_title || '').length > 60 ? '#e53935' : '#888' }}>{(form.seo_meta_title || '').length}/60 chars</small>
            </label>
            <label className="admin-field"><span>Default Meta Description</span>
              <textarea rows="2" value={form.seo_meta_description || ''} onChange={(e) => set('seo_meta_description', e.target.value)} maxLength={170} />
              <small style={{ color: (form.seo_meta_description || '').length > 160 ? '#e53935' : '#888' }}>{(form.seo_meta_description || '').length}/160 chars</small>
            </label>
            <ImgField label="Open Graph / Social Share Image URL" value={form.seo_og_image} onChange={(v) => set('seo_og_image', v)} ratio="og" />
            <label className="admin-field"><span>Twitter / X Handle</span>
              <input value={form.seo_twitter_handle || ''} onChange={(e) => set('seo_twitter_handle', e.target.value)} placeholder="@digiontop" />
            </label>

            <div className="admin-seo-links">
              <a href="/robots.txt" target="_blank" rel="noreferrer" className="admin-btn admin-btn--sm">View robots.txt</a>
              <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="admin-btn admin-btn--sm">View sitemap.xml</a>
            </div>
            <p className="admin-muted" style={{ marginTop: 10 }}>robots.txt &amp; sitemap.xml are auto-generated from your published blogs &amp; pages.</p>
          </div>
        )}

        {/* ── SYSTEM ── */}
        {tab === 'system' && (
          <>
            <div className="admin-form--card">
              <h2 className="blogedit__section-title">robots.txt (custom override)</h2>
              <label className="admin-field"><span>Custom robots.txt (leave blank for auto)</span>
                <textarea rows="6" value={form.robots_txt || ''} onChange={(e) => set('robots_txt', e.target.value)}
                  placeholder={'User-agent: *\nAllow: /\nDisallow: /admin'} style={{ fontFamily: 'monospace', fontSize: 13 }} />
              </label>
            </div>

            <div className="admin-form--card">
              <h2 className="blogedit__section-title">Backup &amp; Restore</h2>
              <p className="admin-muted" style={{ marginBottom: 14 }}>Download a JSON backup of all settings, or restore from a file.</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button type="button" className="admin-btn" onClick={exportBackup}><FiDownload /> Export Backup</button>
                <label className="admin-btn" style={{ cursor: 'pointer' }}>
                  <FiUpload /> Import Backup
                  <input type="file" accept="application/json" onChange={importBackup} style={{ display: 'none' }} />
                </label>
              </div>
            </div>

            {isOwner() && (
              <div className="admin-form--card">
                <h2 className="blogedit__section-title">Full Website Backup</h2>
                <p className="admin-muted" style={{ marginBottom: 14 }}>
                  Download everything, blog posts, leads, reviews, FAQs, categories, authors,
                  settings and all uploaded images, as one file. Owner only.
                </p>
                <button type="button" className="admin-btn admin-btn--primary" onClick={downloadFullBackup} disabled={backingUp}>
                  <FiDatabase /> {backingUp ? 'Preparing backup…' : 'Download Full Backup'}
                </button>
              </div>
            )}

            <div className="admin-form--card">
              <h2 className="blogedit__section-title">Security &amp; Performance</h2>
              <ul className="admin-feature-list">
                <li>✓ Secure JWT admin login (8-hour sessions)</li>
                <li>✓ Parameterized SQL queries (injection-safe)</li>
                <li>✓ Activity logging on settings changes</li>
                <li>✓ Image URLs (CDN-friendly, optimized delivery)</li>
                <li>✓ Mobile responsive admin &amp; website</li>
                <li>✓ Auto-generated robots.txt &amp; XML sitemap</li>
              </ul>
            </div>
          </>
        )}

        <div className="admin-form__actions" style={{ justifyContent: 'flex-start' }}>
          <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
            <FiSave /> {saving ? 'Saving…' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}

function ImgField({ label, value, onChange, ratio }) {
  const previewClass =
    ratio === 'square' ? 'admin-img-prev admin-img-prev--square'
    : ratio === 'og' ? 'admin-img-prev admin-img-prev--og'
    : 'admin-img-prev admin-img-prev--logo';
  return (
    <label className="admin-field">
      <span>{label}</span>
      <input value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="https://… or /images/…" />
      {value && (
        <div className={previewClass}>
          <img src={value} alt="preview" />
        </div>
      )}
    </label>
  );
}
