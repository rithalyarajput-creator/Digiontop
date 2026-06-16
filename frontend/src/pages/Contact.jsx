import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';
import '../styles/Contact.css';

const INITIAL_FORM = { name: '', phone: '', service: '' };

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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.name,
          phone: form.phone,
          service: form.service,
          email: '',
          message: `Service interest: ${form.service}`,
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      setForm(INITIAL_FORM);
    } catch {
      setError('Something went wrong. Please call us directly.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="contact-page">

      {/* ══ HERO SECTION — Split layout ══ */}
      <section className="contact-split">
        <div className="contact-split__inner">

          {/* LEFT */}
          <div className="contact-split__left">
            <span className="contact-split__badge">Start a Project</span>
            <h1 className="contact-split__heading">
              Let's Build Your<br />Digital Future
            </h1>
            <p className="contact-split__sub">
              Ready to launch your next project? Fill out the form or reach out
              directly to start a conversation about your business needs and how
              we can help you grow.
            </p>

            <div className="contact-split__info">
              <a href="tel:+919217594664" className="contact-split__info-item">
                <span className="contact-split__info-icon"><FiPhone /></span>
                <span>+91 9217594664</span>
              </a>
              <a href="tel:+917303769921" className="contact-split__info-item">
                <span className="contact-split__info-icon"><FiPhone /></span>
                <span>+91 7303769921</span>
              </a>
              <div className="contact-split__info-item">
                <span className="contact-split__info-icon"><FiMapPin /></span>
                <span>Pan India — Remote Agency</span>
              </div>
              <a href="mailto:digiontop.agency@gmail.com" className="contact-split__info-item">
                <span className="contact-split__info-icon"><FiMail /></span>
                <span>digiontop.agency@gmail.com</span>
              </a>
            </div>
          </div>

          {/* RIGHT — Clean form card */}
          <div className="contact-split__form-card">
            <div className="contact-split__form-top">
              <div className="contact-split__form-fields">
                <div className="contact-split__field">
                  <label className="contact-split__label">Your Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    className="contact-split__input"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="contact-split__field">
                  <label className="contact-split__label">Your Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Email"
                    className="contact-split__input"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="contact-split__field">
                  <label className="contact-split__label">Services</label>
                  <div className="contact-split__select-wrap">
                    <select
                      name="service"
                      className="contact-split__select"
                      value={form.service}
                      onChange={handleChange}
                    >
                      <option value="">Select a service</option>
                      <option value="Website Development">Website Development</option>
                      <option value="SEO Services">SEO Services</option>
                      <option value="Social Media Marketing">Social Media Marketing</option>
                      <option value="E-Commerce Solutions">E-Commerce Solutions</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {submitted ? (
              <div className="contact-split__success">
                <FiCheckCircle size={22} />
                <span>Message sent! We'll reply within 24 hours.</span>
              </div>
            ) : (
              <button
                className="contact-split__submit"
                onClick={handleSubmit}
                disabled={submitting}
              >
                <span className="contact-split__submit-icon">
                  <FiSend size={16} />
                </span>
                {submitting ? 'Sending…' : 'Submit'}
              </button>
            )}
            {error && <p className="contact-split__error">{error}</p>}
          </div>

        </div>
      </section>

    </main>
  );
}
