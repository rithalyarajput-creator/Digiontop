import { useState } from 'react'
import { FiPlus, FiMinus, FiCheckCircle, FiArrowRight } from 'react-icons/fi'
import './ServiceFaq.css'

const INITIAL = { firstName: '', lastName: '', company: '', website: '', email: '', phone: '', message: '', consent: false }

/* Reusable section for service pages: left FAQs (SEO-friendly) + right lead form.
   `service` = service name (used in form heading + lead source).
   `faqs` = [{ q, a }]  */
export default function ServiceFaq({ service = 'this service', faqs = [] }) {
  const [open, setOpen] = useState(0)
  const [form, setForm] = useState(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function change(e) {
    const { name, value, type, checked } = e.target
    if (name === 'phone') { setForm((p) => ({ ...p, phone: value.replace(/\D/g, '').slice(0, 10) })); return }
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }))
  }

  async function submit(e) {
    e.preventDefault()
    setError('')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError('Please enter a valid email address.'); return }
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: `${form.firstName} ${form.lastName}`.trim(),
          businessName: form.company,
          email: form.email,
          phone: form.phone ? `+91 ${form.phone}` : '',
          service,
          message: `${form.message}${form.website ? `\nWebsite: ${form.website}` : ''}`,
          source: `service-page: ${service}`,
        }),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true); setForm(INITIAL)
    } catch { setError('Something went wrong. Please call us directly.') }
    finally { setSubmitting(false) }
  }

  if (!faqs.length) return null

  return (
    <section className="sfaq">
      <div className="sfaq__inner">
        {/* LEFT — FAQs */}
        <div className="sfaq__left" data-aos="fade-up">
          <span className="sfaq__tag">Question &amp; Answer</span>
          <h2 className="sfaq__title">Frequently <span>Asked Questions</span></h2>
          <p className="sfaq__sub">Real questions clients ask about {service.toLowerCase()} before getting started.</p>
          <div className="sfaq__list">
            {faqs.map((f, i) => (
              <div className={`sfaq__item${open === i ? ' is-open' : ''}`} key={f.q}>
                <button className="sfaq__q" onClick={() => setOpen(open === i ? -1 : i)}>
                  {f.q}<span className="sfaq__icon">{open === i ? <FiMinus /> : <FiPlus />}</span>
                </button>
                <div className="sfaq__a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — lead form */}
        <div className="sfaq__form-wrap" data-aos="fade-up" data-aos-delay="100">
          {submitted ? (
            <div className="sfaq__success">
              <FiCheckCircle size={28} />
              <h3>Thank you!</h3>
              <p>We've received your details and will reply within one business day.</p>
            </div>
          ) : (
            <form className="sfaq__form" onSubmit={submit}>
              <h3 className="sfaq__form-title">Get a Free {service} Consultation</h3>
              <p className="sfaq__form-sub">Tell us about your business — we'll reply within one business day with a clear plan.</p>
              <div className="sfaq__row">
                <input name="firstName" value={form.firstName} onChange={change} placeholder="First Name*" required />
                <input name="lastName" value={form.lastName} onChange={change} placeholder="Last Name*" required />
              </div>
              <div className="sfaq__row">
                <input name="company" value={form.company} onChange={change} placeholder="Company / Organization*" required />
                <input name="website" value={form.website} onChange={change} placeholder="Website" />
              </div>
              <div className="sfaq__row">
                <input type="email" name="email" value={form.email} onChange={change} placeholder="Email Address*" required />
                <span className="sfaq__phone"><span className="sfaq__cc">+91</span><input name="phone" value={form.phone} onChange={change} placeholder="Phone" inputMode="numeric" /></span>
              </div>
              <textarea name="message" value={form.message} onChange={change} rows="3" placeholder="Tell us about your business" />
              <label className="sfaq__consent">
                <input type="checkbox" name="consent" checked={form.consent} onChange={change} required />
                I consent to receive notifications and promotional messages
              </label>
              {error && <p className="sfaq__error">{error}</p>}
              <button type="submit" className="sfaq__btn" disabled={submitting}>
                {submitting ? 'Sending…' : <>Get Free Consultation <FiArrowRight /></>}
              </button>
              <p className="sfaq__note">Need quick assistance? Reach us at <strong>digiontop.agency@gmail.com</strong></p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
