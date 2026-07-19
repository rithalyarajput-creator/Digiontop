import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiCheckCircle, FiAlertTriangle, FiXCircle, FiArrowRight,
  FiSearch, FiRefreshCw, FiZap,
} from 'react-icons/fi'

/* Free instant SEO audit — the lead magnet.
   POSTs { url, name, email, phone } to /api/contact?action=audit and renders exactly what comes back. */

const INITIAL = { url: '', name: '', email: '', phone: '' }

// The API fetches the visitor's own site, so this can take ~12s. Cycle reassuring
// status lines rather than leaving a bare spinner that reads as "broken".
const STAGES = [
  'Fetching your page…',
  'Reading your title and meta description…',
  'Checking headings and image alt text…',
  'Inspecting HTTPS, mobile and canonical tags…',
  'Looking for schema and social previews…',
  'Scoring your page…',
  'Almost there, building your report…',
]

const RANK = { fail: 0, warn: 1, pass: 2 }

const ICONS = {
  pass: <FiCheckCircle />,
  warn: <FiAlertTriangle />,
  fail: <FiXCircle />,
}

function band(score) {
  if (score >= 80) return 'good'
  if (score >= 50) return 'mid'
  return 'bad'
}

function verdict(score) {
  if (score >= 80) return 'Strong, a few easy wins left.'
  if (score >= 50) return 'Needs work, fixable issues are costing you rankings.'
  return 'Critical, your page has serious SEO problems.'
}

export default function SeoAuditTool() {
  const [form, setForm] = useState(INITIAL)
  const [loading, setLoading] = useState(false)
  const [stage, setStage] = useState(0)
  const [error, setError] = useState('')
  const [report, setReport] = useState(null)
  const reportRef = useRef(null)

  // Advance the reassurance copy while the request is in flight.
  useEffect(() => {
    if (!loading) { setStage(0); return }
    const id = setInterval(() => {
      setStage((s) => Math.min(s + 1, STAGES.length - 1))
    }, 1800)
    return () => clearInterval(id)
  }, [loading])

  useEffect(() => {
    if (report && reportRef.current) {
      reportRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [report])

  function change(e) {
    const { name, value } = e.target
    if (name === 'phone') { setForm((p) => ({ ...p, phone: value.replace(/[^\d+\s-]/g, '').slice(0, 16) })); return }
    setForm((p) => ({ ...p, [name]: value }))
  }

  async function submit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      // Audit rides on the contact route: Vercel's Hobby plan caps the project
      // at 12 serverless functions and we're at the ceiling.
      const res = await fetch('/api/contact?action=audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: form.url.trim(),
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
        }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        // Surface the backend's human-readable message as-is; keep the form filled in.
        setError((data && data.error) || 'Something went wrong. Please try again.')
        return
      }
      setReport(data)
    } catch {
      setError('Could not reach our server. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setReport(null)
    setError('')
    setForm(INITIAL)
  }

  /* ---------------- REPORT ---------------- */
  if (report) {
    const checks = [...(report.checks || [])].sort(
      (a, b) => (RANK[a.status] ?? 3) - (RANK[b.status] ?? 3)
    )
    const counts = {
      fail: checks.filter((c) => c.status === 'fail').length,
      warn: checks.filter((c) => c.status === 'warn').length,
      pass: checks.filter((c) => c.status === 'pass').length,
    }
    const b = band(report.score)

    return (
      <section className="aud-tool" ref={reportRef}>
        <div className="aud-container">
          <div className="aud-report">
            {/* score hero */}
            <div className="aud-report__top">
              <div className={`aud-report__score ${b}`}>
                <b>{report.score}</b>
                <span>/100</span>
              </div>
              <div className="aud-report__meta">
                <span className="aud-eyebrow">Your SEO Score</span>
                <h2 className={`aud-report__verdict ${b}`}>{verdict(report.score)}</h2>
                <p className="aud-report__url">{report.url}</p>
                {report.title && (
                  <p className="aud-report__line"><strong>Title found:</strong> {report.title}</p>
                )}
                {report.description && (
                  <p className="aud-report__line"><strong>Description found:</strong> {report.description}</p>
                )}
                <div className="aud-report__counts">
                  <span className="bad">{counts.fail} failed</span>
                  <span className="mid">{counts.warn} warnings</span>
                  <span className="good">{counts.pass} passed</span>
                </div>
              </div>
            </div>

            {/* checks */}
            <ul className="aud-checks">
              {checks.map((c) => (
                <li className={`aud-check ${c.status}`} key={c.label}>
                  <span className={`aud-check__ic ${c.status}`}>{ICONS[c.status] || ICONS.warn}</span>
                  <div className="aud-check__body">
                    <h3>{c.label}</h3>
                    <p className="aud-check__detail">{c.detail}</p>
                    {c.fix ? (
                      <p className="aud-check__fix"><strong>What to do:</strong> {c.fix}</p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="aud-report__cta">
              <h3>Want us to fix these for you?</h3>
              <p>Our SEO team can implement every fix above, and go far deeper with a full 150-point audit.</p>
              <div className="aud-report__actions">
                <Link to="/contact" className="aud-btn aud-btn--solid">Talk to an SEO Expert <FiArrowRight /></Link>
                <button type="button" className="aud-btn aud-btn--ghost" onClick={reset}>
                  <FiRefreshCw /> Check another website
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  /* ---------------- FORM ---------------- */
  return (
    <section className="aud-tool">
      <div className="aud-container">
        <div className="aud-tool__card">
          <div className="aud-tool__head">
            <span className="aud-tag"><FiZap /> Free &amp; Instant</span>
            <h2>Get Your Free SEO Report in Seconds</h2>
            <p>Enter your website and we&apos;ll scan it live, score out of 100, every issue we find, and exactly how to fix it. No cost, no credit card.</p>
          </div>

          <form className="aud-form" onSubmit={submit}>
            <label className="aud-field aud-field--wide">
              <span>Website URL <i>*</i></span>
              <input
                name="url" value={form.url} onChange={change}
                placeholder="yourwebsite.com" required disabled={loading}
                autoComplete="url" inputMode="url"
              />
            </label>
            <label className="aud-field">
              <span>Name <i>*</i></span>
              <input
                name="name" value={form.name} onChange={change}
                placeholder="Your name" required disabled={loading} autoComplete="name"
              />
            </label>
            <label className="aud-field">
              <span>Email <i>*</i></span>
              <input
                type="email" name="email" value={form.email} onChange={change}
                placeholder="you@company.com" required disabled={loading} autoComplete="email"
              />
            </label>
            <label className="aud-field aud-field--wide">
              <span>Phone <em>(optional)</em></span>
              <input
                name="phone" value={form.phone} onChange={change}
                placeholder="+91 98765 43210" disabled={loading} autoComplete="tel" inputMode="tel"
              />
            </label>

            {error && (
              <p className="aud-form__error" role="alert">
                <FiAlertTriangle /> {error}
              </p>
            )}

            <button type="submit" className="aud-form__btn" disabled={loading}>
              {loading ? <><span className="aud-spinner" /> Auditing your site…</> : <><FiSearch /> Get My Free SEO Report</>}
            </button>

            {loading ? (
              <div className="aud-progress" aria-live="polite">
                <div className="aud-progress__bar"><span /></div>
                <p className="aud-progress__stage">{STAGES[stage]}</p>
                <p className="aud-progress__note">This takes up to 15 seconds, we&apos;re loading your real page, not a cached copy.</p>
              </div>
            ) : (
              <p className="aud-form__note">Your report appears on this page instantly. We&apos;ll never spam you.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
