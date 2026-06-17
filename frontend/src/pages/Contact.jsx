import React, { useState } from 'react';
import {
  FiPhone, FiMail, FiMessageCircle, FiFacebook,
  FiInstagram, FiYoutube, FiCheckCircle,
} from 'react-icons/fi';
import { useSettings } from '../context/SettingsContext';
import '../styles/Contact.css';

const INITIAL = { firstName: '', lastName: '', email: '', phone: '', message: '' };

export default function Contact() {
  const { settings } = useSettings();
  const [form, setForm] = useState(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: `${form.firstName} ${form.lastName}`,
          email: form.email,
          phone: form.phone,
          message: form.message,
          service: '',
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
      <section className="contact-wrap">
        <h1 className="contact-page__heading">Contact Us</h1>
        <div className="contact-wrap__inner">

          {/* ── LEFT — Form ── */}
          <div className="contact-form-side">
            {/* Floating astronaut rocket — top-left */}
            <img src="/images/rocket-astronaut.png" alt="" className="contact-form-side__rocket" />
            <h2 className="contact-form-side__title">Send us a message</h2>
            <p className="contact-form-side__sub">
              Do you have a question? A complaint? Or need any help to choose the
              right product from Zalam. Feel free to contact us.
            </p>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              {/* Row 1: First + Last */}
              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label>First Name</label>
                  <input
                    name="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact-form__field">
                  <label>Last Name</label>
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Row 2: Email + Phone */}
              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label>Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact-form__field">
                  <label>Phone</label>
                  <div className="contact-form__phone-wrap">
                    <span className="contact-form__dial">+91</span>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Message */}
              <div className="contact-form__field contact-form__field--full">
                <label>Message</label>
                <textarea
                  name="message"
                  placeholder="Enter your message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {submitted ? (
                <div className="contact-form__success">
                  <FiCheckCircle size={20} />
                  <span>Message sent! We'll reply within 24 hours.</span>
                </div>
              ) : (
                <button
                  type="submit"
                  className="contact-form__submit"
                  disabled={submitting}
                >
                  {submitting ? 'Sending…' : 'Send a Message'}
                </button>
              )}
              {error && <p className="contact-form__error">{error}</p>}
            </form>
          </div>

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
                {settings.social_youtube && <a href={settings.social_youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><FiYoutube /></a>}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Video banner — above footer */}
      <section className="contact-video">
        <video
          className="contact-video__media"
          src="/contact-banner.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </section>
    </main>
  );
}
