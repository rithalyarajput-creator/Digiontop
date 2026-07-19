import React, { useState } from 'react';
import Seo from '../components/Seo';
import {
  FiPhone, FiMail, FiMessageCircle, FiFacebook,
  FiInstagram, FiYoutube, FiCheckCircle, FiLinkedin,
} from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { useSettings } from '../context/SettingsContext';
import '../styles/About.css';   /* Contact form reuses the .about-lead__* base styles */
import '../styles/Contact.css';

const SERVICE_OPTIONS = [
  'Website Development', 'Shopify Store', 'SEO Services', 'Social Media Marketing',
  'Performance Ads', 'Branding & Design', 'E-Commerce Solutions',
];

const INITIAL = { firstName: '', lastName: '', company: '', website: '', email: '', phone: '', service: '', message: '', consent: false };

export default function Contact() {
  const { settings } = useSettings();
  const [form, setForm] = useState(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '').slice(0, 10);
      setForm((p) => ({ ...p, phone: digits }));
      return;
    }
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!form.firstName.trim()) {
      setError('First name is required.');
      return;
    }
    if (!form.lastName.trim()) {
      setError('Last name is required.');
      return;
    }
    if (!form.company.trim()) {
      setError('Company/Organization is required.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!form.service) {
      setError('Please select a service.');
      return;
    }
    if (!form.consent) {
      setError('Please check the consent checkbox to proceed.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: `${form.firstName} ${form.lastName}`.trim(),
          businessName: form.company,
          email: form.email,
          phone: form.phone ? `+91 ${form.phone}` : '',
          service: form.service,
          message: `${form.message}${form.website ? `\nWebsite: ${form.website}` : ''}`,
          source: 'contact-page',
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      setForm(INITIAL);
    } catch {
      setError('Something went wrong. Please call us directly.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="contact-page">
      <Seo title="Contact DigionTop, Get a Free Digital Marketing Quote" description="Get in touch with DigionTop for websites, SEO, social media & ads. Call +91 92175 94664 or fill the form for a free consultation. We reply within 1 business day." path="/contact" />
      <section className="contact-wrap">
        <h1 className="contact-page__heading">Contact Us</h1>
        <div className="contact-wrap__inner">

          {/* ── LEFT — Form (same design as About "Get your free proposal") ── */}
          <form className="about-lead__form contact-lead__form" onSubmit={handleSubmit} noValidate>
            {submitted ? (
              <div className="about-lead__success">
                <FiCheckCircle size={26} />
                <h3>Thank you!</h3>
                <p>We've received your message and will reply within one business day.</p>
              </div>
            ) : (
              <>
                <div className="about-lead__row">
                  <label>First Name <b>*</b><input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required /></label>
                  <label>Last Name <b>*</b><input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" required /></label>
                </div>
                <div className="about-lead__row">
                  <label>Company / Organization <b>*</b><input name="company" value={form.company} onChange={handleChange} placeholder="Company / Organization" required /></label>
                  <label>Website<input name="website" value={form.website} onChange={handleChange} placeholder="https://example.com" /></label>
                </div>
                <div className="about-lead__row">
                  <label>Email Address <b>*</b><input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@company.com" required /></label>
                  <label>Phone Number
                    <span className="about-lead__phone">
                      <span className="about-lead__cc">IN +91</span>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="9898989889" inputMode="numeric" />
                    </span>
                  </label>
                </div>
                <label className="about-lead__full">Services* (pick one)
                  <select name="service" value={form.service} onChange={handleChange} required>
                    <option value="">Services* (pick one or more)</option>
                    {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </label>
                <label className="about-lead__full">Message
                  <textarea name="message" value={form.message} onChange={handleChange} rows="4" placeholder="Tell us about your business" />
                </label>
                <label className="about-lead__consent">
                  <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} required />
                  I consent to receive notifications and promotional messages
                </label>
                {error && <p className="about-lead__error">{error}</p>}
                <button type="submit" className="about-lead__btn" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Get Free Consultation'}
                </button>
                <p className="about-lead__note">Need quick assistance? Reach us at <strong>+91 92175 94664</strong></p>
              </>
            )}
          </form>

          {/* ── RIGHT — Dark info card ── */}
          <div className="contact-info-card">
            <h3 className="contact-info-card__title">
              Hi! We are always here<br />to help you.
            </h3>

            <div className="contact-info-card__items">
              <a href={`tel:${(settings.contact_phone || '+919217594664').replace(/\s/g, '')}`} className="contact-info-card__item">
                <span className="contact-info-card__icon">
                  <FiPhone />
                </span>
                <div>
                  <p className="contact-info-card__item-label">Hotline</p>
                  <p className="contact-info-card__item-val">{settings.contact_phone || '+91 92175 94664'}</p>
                </div>
              </a>

              {settings.contact_phone2 && (
                <a href={`https://wa.me/${settings.contact_phone2.replace(/[^0-9]/g, '')}`} className="contact-info-card__item" target="_blank" rel="noreferrer">
                  <span className="contact-info-card__icon">
                    <FiMessageCircle />
                  </span>
                  <div>
                    <p className="contact-info-card__item-label">SMS / Whatsapp</p>
                    <p className="contact-info-card__item-val">{settings.contact_phone2}</p>
                  </div>
                </a>
              )}

              <a href={`mailto:${settings.contact_email || 'digiontop.agency@gmail.com'}`} className="contact-info-card__item">
                <span className="contact-info-card__icon">
                  <FiMail />
                </span>
                <div>
                  <p className="contact-info-card__item-label">Email</p>
                  <p className="contact-info-card__item-val">{settings.contact_email || 'digiontop.agency@gmail.com'}</p>
                </div>
              </a>
            </div>

            <div className="contact-info-card__social-section">
              <p className="contact-info-card__social-label">Connect with us</p>
              <div className="contact-info-card__socials">
                {settings.social_facebook && <a href={settings.social_facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><FiFacebook /></a>}
                {settings.social_instagram && <a href={settings.social_instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><FiInstagram /></a>}
                {settings.social_linkedin && <a href={settings.social_linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>}
                {settings.social_twitter && <a href={settings.social_twitter} target="_blank" rel="noreferrer" aria-label="X (Twitter)"><FaXTwitter /></a>}
                {settings.social_youtube && <a href={settings.social_youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><FiYoutube /></a>}
              </div>
            </div>

            <a
              href="https://g.page/r/CVXDeOcytLd6EBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-card__review"
            >
              <span className="contact-info-card__review-g" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
                  <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
                  <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"/>
                  <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
                </svg>
              </span>
              Leave us a Google Review
            </a>
          </div>

        </div>
      </section>
    </main>
  );
}
