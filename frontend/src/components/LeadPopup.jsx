import { useEffect, useState } from 'react';
import { trackLead } from '../utils/metaPixel';
import './LeadPopup.css';

const SERVICES = [
  'Website Development',
  'SEO Services',
  'Social Media Marketing',
  'Performance Ads',
  'E-Commerce Solutions',
  'Branding & Design',
  'Not sure yet',
];

const INITIAL = { name: '', email: '', company: '', phone: '', help: '' };
const SEEN_KEY = 'dt_lead_popup_seen';

export default function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  // Open once, 6s after the visitor lands — unless they've already seen it this session.
  useEffect(() => {
    try { if (sessionStorage.getItem(SEEN_KEY)) return; } catch {}
    const t = setTimeout(() => {
      setOpen(true);
      try { sessionStorage.setItem(SEEN_KEY, '1'); } catch {}
    }, 6000);
    return () => clearTimeout(t);
  }, []);

  // Lock body scroll while open + close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open]);

  function change(e) {
    const { name, value } = e.target;
    if (name === 'phone') {
      setForm((p) => ({ ...p, phone: value.replace(/\D/g, '').slice(0, 10) }));
      return;
    }
    setForm((p) => ({ ...p, [name]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    setError('');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.name,
          businessName: form.company,
          email: form.email,
          phone: form.phone ? `+91 ${form.phone}` : '',
          service: form.help,
          message: 'Requested a free strategy audit via popup.',
          source: 'lead-popup',
        }),
      });
      if (!res.ok) throw new Error();
      trackLead();
      setDone(true);
    } catch {
      setError('Something went wrong. Please try again or call us.');
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div className="lpop" role="dialog" aria-modal="true" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div className="lpop__card">
        <button className="lpop__close" onClick={() => setOpen(false)} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        {done ? (
          <div className="lpop__done">
            <div className="lpop__done-icon">✓</div>
            <h3>Thank you!</h3>
            <p>We’ve received your details and will reply within one business day with your free strategy audit.</p>
            <button className="lpop__btn" onClick={() => setOpen(false)}>Close</button>
          </div>
        ) : (
          <>
            <span className="lpop__eyebrow">Free Strategy Audit</span>
            <h2 className="lpop__title">Get Your Free Growth Score</h2>
            <p className="lpop__sub">A senior strategist sends back a numbered audit of where you stand and the growth we can target in your first 90 days. No obligation.</p>

            <form className="lpop__form" onSubmit={submit} noValidate>
              <label className="lpop__field">
                <span>Full Name <b>*</b></span>
                <input name="name" value={form.name} onChange={change} placeholder="Full name" required />
              </label>
              <label className="lpop__field">
                <span>Work Email <b>*</b></span>
                <input type="email" name="email" value={form.email} onChange={change} placeholder="you@company.com" required />
              </label>
              <label className="lpop__field">
                <span>Company <b>*</b></span>
                <input name="company" value={form.company} onChange={change} placeholder="Company name" required />
              </label>
              <div className="lpop__row">
                <label className="lpop__field">
                  <span>Phone <b>*</b></span>
                  <span className="lpop__phone">
                    <span className="lpop__cc">+91</span>
                    <input name="phone" value={form.phone} onChange={change} placeholder="Phone" inputMode="numeric" required />
                  </span>
                </label>
                <label className="lpop__field">
                  <span>Help With</span>
                  <select name="help" value={form.help} onChange={change}>
                    <option value="">Select</option>
                    {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </label>
              </div>

              {error && <p className="lpop__error">{error}</p>}
              <button type="submit" className="lpop__btn" disabled={submitting}>
                {submitting ? 'Sending…' : 'Get My Free Score'}
              </button>
              <p className="lpop__note">We reply within one business day. No spam, ever.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
