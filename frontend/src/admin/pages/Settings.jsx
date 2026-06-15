import { useState } from 'react';
import { FiSave } from 'react-icons/fi';

const STORAGE_KEY = 'digiontop_settings';
function loadSettings() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}

export default function Settings() {
  const [form, setForm] = useState(() => ({
    site_name: 'DigionTop',
    site_email: 'digiontop.agency@gmail.com',
    phone1: '+91 9217594664',
    phone2: '+91 7303769921',
    instagram: 'https://www.instagram.com/digiontop.agency',
    facebook: 'https://www.facebook.com/share/14eaPvHNx9A/',
    youtube: 'https://www.youtube.com/@digiontop',
    ...loadSettings(),
  }));
  const [saved, setSaved] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div>
      <div className="admin-page-head">
        <h1 className="admin-page-title">Settings</h1>
      </div>

      {saved && (
        <div style={{ background: '#d6f5dd', color: '#1a9e4b', padding: '12px 16px', borderRadius: 8, marginBottom: 20, fontWeight: 600 }}>
          Settings saved successfully!
        </div>
      )}

      <form className="admin-form" onSubmit={handleSave}>
        <div className="admin-form--card">
          <h2 className="blogedit__section-title">Site Info</h2>
          <label className="admin-field"><span>Site Name</span>
            <input value={form.site_name} onChange={e => setForm({ ...form, site_name: e.target.value })} />
          </label>
          <label className="admin-field"><span>Contact Email</span>
            <input type="email" value={form.site_email} onChange={e => setForm({ ...form, site_email: e.target.value })} />
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <label className="admin-field"><span>Phone 1</span>
              <input value={form.phone1} onChange={e => setForm({ ...form, phone1: e.target.value })} />
            </label>
            <label className="admin-field"><span>Phone 2</span>
              <input value={form.phone2} onChange={e => setForm({ ...form, phone2: e.target.value })} />
            </label>
          </div>
        </div>

        <div className="admin-form--card">
          <h2 className="blogedit__section-title">Social Media Links</h2>
          <label className="admin-field"><span>Instagram URL</span>
            <input value={form.instagram} onChange={e => setForm({ ...form, instagram: e.target.value })} />
          </label>
          <label className="admin-field"><span>Facebook URL</span>
            <input value={form.facebook} onChange={e => setForm({ ...form, facebook: e.target.value })} />
          </label>
          <label className="admin-field"><span>YouTube URL</span>
            <input value={form.youtube} onChange={e => setForm({ ...form, youtube: e.target.value })} />
          </label>
        </div>

        <div className="admin-form__actions" style={{ justifyContent: 'flex-start' }}>
          <button type="submit" className="admin-btn admin-btn--primary">
            <FiSave /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
