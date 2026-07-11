import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiMail, FiSend, FiZap, FiUsers, FiTrendingUp, FiRepeat,
  FiCheck, FiArrowRight, FiArrowUpRight, FiInbox,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/SmmPages.css'

const FAQS = [
  { q: 'Does email marketing still work?', a: 'It\'s one of the highest-ROI channels there is — often ₹40+ back for every ₹1 spent. It nurtures leads and drives repeat sales like nothing else.' },
  { q: 'Do you build the email flows?', a: 'Yes — welcome series, abandoned cart, re-engagement and promotional flows are all set up and automated.' },
  { q: 'Which platforms do you use?', a: 'Mailchimp, Klaviyo, Brevo and more — we work with your stack or recommend the best fit.' },
  { q: 'Will you write and design the emails?', a: 'Completely done-for-you — copy, design and testing so your emails get opened and clicked.' },
  { q: 'How do you grow my list?', a: 'Lead magnets, popups and opt-in strategy that turn website visitors into subscribers you can sell to.' },
]

const FLOWS = [
  { icon: <FiUsers />, t: 'Welcome & Onboarding', d: 'Turn new subscribers into buyers with a warm, converting first impression.' },
  { icon: <FiRepeat />, t: 'Abandoned Cart Recovery', d: 'Automatically win back lost sales with timely, persuasive reminders.' },
  { icon: <FiZap />, t: 'Promotional Campaigns', d: 'Launches, offers and newsletters that drive clicks and revenue.' },
  { icon: <FiTrendingUp />, t: 'Re-Engagement Flows', d: 'Bring dormant subscribers back and keep your list profitable.' },
]

export default function EmailMarketing() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="em">
      <section className="em-hero">
        <div className="em-container em-hero__inner">
          <div className="em-hero__text" data-aos="fade-right">
            <span className="em-tag"><FiMail /> Email Marketing</span>
            <h1 className="em-hero__title">The Channel That <span>Pays You Back</span></h1>
            <p className="em-hero__sub">Automated email flows and campaigns that nurture leads, recover lost sales and drive repeat revenue — the highest-ROI channel, done for you.</p>
            <div className="em-hero__cta">
              <Link to="/contact" className="em-btn em-btn--solid">Start Emailing <FiArrowRight /></Link>
              <Link to="/contact" className="em-btn em-btn--ghost">Free Email Audit</Link>
            </div>
          </div>
          {/* inbox mock */}
          <div className="em-inbox" data-aos="fade-left">
            <div className="em-inbox__head"><FiInbox /> Inbox <span className="em-inbox__badge">3 new</span></div>
            {[{ s: 'Your order is on the way', o: '68% open' }, { s: 'You left something behind…', o: '54% open' }, { s: 'Flat 30% OFF ends tonight', o: '61% open' }].map((m, i) => (
              <div className={`em-inbox__mail${i === 0 ? ' unread' : ''}`} key={i}>
                <span className="em-inbox__dot" />
                <div><b>{m.s}</b><small>{m.o}</small></div>
                <FiSend className="em-inbox__go" />
              </div>
            ))}
            <div className="em-inbox__foot"><FiTrendingUp /> ₹42 back per ₹1 spent</div>
          </div>
        </div>
      </section>

      <section className="em-flows">
        <div className="em-container">
          <div className="em-head" data-aos="fade-up">
            <span className="em-eyebrow">Automated Flows</span>
            <h2>Emails That Sell While You Sleep</h2>
          </div>
          <div className="em-flows__grid">
            {FLOWS.map((f, i) => (
              <div className="em-flow" key={f.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="em-flow__icon">{f.icon}</span>
                <h3>{f.t}</h3><p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="em-band">
        <div className="em-container em-band__inner" data-aos="fade-up">
          <div><b>₹42:1</b><span>Average Email ROI</span></div>
          <div><b>Auto</b><span>Flows That Run 24/7</span></div>
          <div><b>Done</b><span>Copy & Design For You</span></div>
        </div>
      </section>

      <ServiceFaq service="Email Marketing" faqs={FAQS} />

      <section className="em-cta">
        <div className="em-container">
          <div className="em-cta__box" data-aos="zoom-in">
            <FiMail className="em-cta__ic" />
            <h2>Ready to Turn Emails Into Revenue?</h2>
            <p>Get a free email audit — we'll show you the flows and campaigns leaking money and how to fix them.</p>
            <Link to="/contact" className="em-btn em-btn--light">Get My Free Audit <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
