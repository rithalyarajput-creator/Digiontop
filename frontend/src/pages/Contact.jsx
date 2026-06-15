import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiMail,
  FiPhone,
  FiClock,
  FiUser,
  FiBriefcase,
  FiAtSign,
  FiSmartphone,
  FiMessageSquare,
  FiChevronDown,
  FiCheckCircle,
  FiSend,
} from 'react-icons/fi';
import '../styles/Contact.css';

/* ─── Contact info data ─── */
const infoCards = [
  {
    icon: <FiMail size={28} />,
    title: 'Email Us',
    lines: ['digiontop.agency@gmail.com'],
    href: 'mailto:digiontop.agency@gmail.com',
    linkLabel: 'Send an Email',
  },
  {
    icon: <FiPhone size={28} />,
    title: 'Call Us',
    lines: ['+91 9217594664', '+91 7303769921'],
    href: 'tel:+919217594664',
    linkLabel: 'Call Now',
  },
  {
    icon: <FiClock size={28} />,
    title: 'Business Hours',
    lines: ['Monday – Saturday', '10:00 AM – 7:00 PM IST'],
    href: null,
    linkLabel: null,
  },
];

/* ─── Initial form state ─── */
const INITIAL_FORM = {
  fullName: '',
  businessName: '',
  email: '',
  phone: '',
  service: '',
  budget: '',
  message: '',
  source: '',
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      // API base comes from the VITE_API_URL env var so the form can reach the
      // PHP admin which is hosted on a separate domain from this Vercel frontend.
      const apiBase = import.meta.env.VITE_API_URL || '/api';
      const res = await fetch(`${apiBase}/contact.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      setSubmitted(true);
      setForm(INITIAL_FORM);
    } catch (err) {
      setError(
        'Something went wrong. Please try again or email us directly at digiontop.agency@gmail.com'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="contact-page">
      {/* ══════════════════════════════════════
          1. PAGE HERO
      ══════════════════════════════════════ */}
      <section className="contact-hero">
        <div className="contact-hero__overlay" />
        <div className="contact-hero__content">
          <h1 className="contact-hero__heading">
            Let's Build Something Great Together
          </h1>
          <p className="contact-hero__sub">
            Tell us about your business and we will craft a digital strategy
            that delivers real, measurable results.
          </p>
          <nav className="contact-hero__breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="contact-hero__breadcrumb-link">Home</Link>
            <span className="contact-hero__breadcrumb-sep" aria-hidden="true">/</span>
            <span className="contact-hero__breadcrumb-current">Contact</span>
          </nav>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. CONTACT INFO CARDS
      ══════════════════════════════════════ */}
      <section className="contact-info">
        <div className="contact-container">
          <div className="contact-info__grid">
            {infoCards.map((card) => (
              <div key={card.title} className="contact-info-card">
                <div className="contact-info-card__icon">{card.icon}</div>
                <h3 className="contact-info-card__title">{card.title}</h3>
                <div className="contact-info-card__lines">
                  {card.lines.map((line) => (
                    <p key={line} className="contact-info-card__line">{line}</p>
                  ))}
                </div>
                {card.href && (
                  <a
                    href={card.href}
                    className="contact-info-card__link"
                  >
                    {card.linkLabel}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. FORM + MAP
      ══════════════════════════════════════ */}
      <section className="contact-main">
        <div className="contact-container">
          <div className="contact-main__grid">

            {/* ── LEFT: FORM ── */}
            <div className="contact-form-wrap">
              <span className="contact-label">Get In Touch</span>
              <h2 className="contact-form-wrap__heading">
                Start Your Digital Growth Journey
              </h2>
              <p className="contact-form-wrap__sub">
                Fill in the details below and our team will reach out within
                24 hours with a tailored plan for your business.
              </p>

              {/* Success banner */}
              {submitted && (
                <div className="contact-success" role="alert">
                  <FiCheckCircle size={24} />
                  <div>
                    <strong>Message Sent!</strong>
                    <p>
                      Thank you for reaching out. Our team will get back to
                      you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {/* Error banner */}
              {error && (
                <div className="contact-error" role="alert">
                  <p>{error}</p>
                </div>
              )}

              <form
                className="contact-form"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Row 1: Full Name + Business Name */}
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label htmlFor="fullName" className="contact-form__label">
                      <FiUser size={14} />
                      Full Name <span className="contact-form__required">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      className="contact-form__input"
                      placeholder="Rahul Sharma"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="businessName" className="contact-form__label">
                      <FiBriefcase size={14} />
                      Business Name
                      <span className="contact-form__optional"> (optional)</span>
                    </label>
                    <input
                      id="businessName"
                      name="businessName"
                      type="text"
                      className="contact-form__input"
                      placeholder="Your Company Pvt. Ltd."
                      value={form.businessName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Row 2: Email + Phone */}
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label htmlFor="email" className="contact-form__label">
                      <FiAtSign size={14} />
                      Email Address <span className="contact-form__required">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="contact-form__input"
                      placeholder="rahul@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="phone" className="contact-form__label">
                      <FiSmartphone size={14} />
                      Phone Number <span className="contact-form__required">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="contact-form__input"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Row 3: Service + Budget */}
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label htmlFor="service" className="contact-form__label">
                      <FiChevronDown size={14} />
                      Service Interested In <span className="contact-form__required">*</span>
                    </label>
                    <div className="contact-form__select-wrap">
                      <select
                        id="service"
                        name="service"
                        className="contact-form__select"
                        value={form.service}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>Select a service…</option>
                        <option value="Website Development">Website Development</option>
                        <option value="SEO Services">SEO Services</option>
                        <option value="Social Media Marketing">Social Media Marketing</option>
                        <option value="E-Commerce Solutions">E-Commerce Solutions</option>
                        <option value="Other">Other</option>
                      </select>
                      <FiChevronDown className="contact-form__select-icon" size={16} />
                    </div>
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="budget" className="contact-form__label">
                      <FiChevronDown size={14} />
                      Your Budget Range <span className="contact-form__required">*</span>
                    </label>
                    <div className="contact-form__select-wrap">
                      <select
                        id="budget"
                        name="budget"
                        className="contact-form__select"
                        value={form.budget}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>Select a range…</option>
                        <option value="Below 10K">Below ₹10,000</option>
                        <option value="10K-25K">₹10,000 – ₹25,000</option>
                        <option value="25K-50K">₹25,000 – ₹50,000</option>
                        <option value="50K+">₹50,000+</option>
                        <option value="Not Sure">Not Sure Yet</option>
                      </select>
                      <FiChevronDown className="contact-form__select-icon" size={16} />
                    </div>
                  </div>
                </div>

                {/* Tell Us About Your Business */}
                <div className="contact-form__field contact-form__field--full">
                  <label htmlFor="message" className="contact-form__label">
                    <FiMessageSquare size={14} />
                    Tell Us About Your Business <span className="contact-form__required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="contact-form__textarea"
                    rows={5}
                    placeholder="Briefly describe your business, your current challenges, and what you're hoping to achieve with digital marketing…"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* How Did You Hear About Us */}
                <div className="contact-form__field contact-form__field--full">
                  <label htmlFor="source" className="contact-form__label">
                    <FiChevronDown size={14} />
                    How Did You Hear About Us?
                  </label>
                  <div className="contact-form__select-wrap">
                    <select
                      id="source"
                      name="source"
                      className="contact-form__select"
                      value={form.source}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select an option…</option>
                      <option value="Google">Google</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Referral">Referral</option>
                      <option value="Other">Other</option>
                    </select>
                    <FiChevronDown className="contact-form__select-icon" size={16} />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="contact-form__submit"
                  disabled={submitting || submitted}
                >
                  {submitting ? (
                    <>
                      <span className="contact-form__spinner" />
                      Sending…
                    </>
                  ) : submitted ? (
                    <>
                      <FiCheckCircle size={18} />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <FiSend size={18} />
                      Send My Message — Our Team Will Reply Within 24 Hours
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* ── RIGHT: MAP PLACEHOLDER ── */}
            <div className="contact-map-wrap">
              <span className="contact-label">Our Location</span>
              <h2 className="contact-map-wrap__heading">Find Us Online, Serve You Anywhere</h2>
              <p className="contact-map-wrap__sub">
                We are a fully remote digital agency serving clients across
                India and beyond. No commute needed — just reach out and we
                will come to you.
              </p>

              {/* Map placeholder */}
              <div className="contact-map-placeholder" aria-label="Map placeholder">
                <div className="contact-map-placeholder__inner">
                  <div className="contact-map-placeholder__pin">
                    <FiPhone size={32} />
                  </div>
                  <p className="contact-map-placeholder__text">
                    Remote-first agency<br />Serving all of India
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-map-placeholder__link"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>

              {/* Quick contact tiles */}
              <div className="contact-map-tiles">
                <a href="mailto:digiontop.agency@gmail.com" className="contact-map-tile">
                  <FiMail size={20} />
                  <span>digiontop.agency@gmail.com</span>
                </a>
                <a href="tel:+919217594664" className="contact-map-tile">
                  <FiPhone size={20} />
                  <span>+91 9217594664</span>
                </a>
                <a href="tel:+917303769921" className="contact-map-tile">
                  <FiPhone size={20} />
                  <span>+91 7303769921</span>
                </a>
                <div className="contact-map-tile contact-map-tile--static">
                  <FiClock size={20} />
                  <span>Mon–Sat · 10AM–7PM IST</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
