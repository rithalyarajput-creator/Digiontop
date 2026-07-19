import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiLinkedin, FiBriefcase, FiUsers, FiTarget, FiTrendingUp, FiMail,
  FiCheck, FiArrowRight, FiArrowUpRight, FiAward,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/LinkedInAds.css'

const FAQS = [
  { q: 'Is LinkedIn worth it for B2B?', a: 'For B2B, it\'s unmatched, you can target by job title, company, industry and seniority, putting your offer in front of exact decision-makers.' },
  { q: 'What campaign types work best?', a: 'Lead-gen forms, sponsored content and message ads. We pick the mix that fits your funnel and sales cycle.' },
  { q: 'LinkedIn ads are expensive, is the ROI there?', a: 'Cost-per-click is higher, but lead quality is far better. We optimise for cost-per-qualified-lead, not vanity clicks.' },
  { q: 'Do you write the ad copy and creative?', a: 'Yes, professional, on-brand copy and creative tuned for a B2B audience is included.' },
  { q: 'Can you target specific companies?', a: 'Absolutely, account-based targeting lets us reach named companies and the exact roles you sell to.' },
]

const TARGETS = [
  { icon: <FiBriefcase />, t: 'Job Title & Seniority' },
  { icon: <FiUsers />, t: 'Company Size & Industry' },
  { icon: <FiTarget />, t: 'Account-Based (ABM)' },
  { icon: <FiAward />, t: 'Skills & Interests' },
]

const CAMPAIGNS = [
  { icon: <FiMail />, t: 'Lead-Gen Forms', d: 'Pre-filled forms that capture decision-maker leads without leaving LinkedIn.' },
  { icon: <FiLinkedin />, t: 'Sponsored Content', d: 'Native posts that build authority and demand right in the professional feed.' },
  { icon: <FiTrendingUp />, t: 'Message & Conversation Ads', d: 'Personalised outreach that lands directly in the inbox of your ideal buyer.' },
]

export default function LinkedInAds() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="li">
      <Seo
        title="LinkedIn Ads Agency for B2B Lead Gen"
        description="Account-based LinkedIn campaigns targeted by job title, seniority and company, using lead-gen forms and sponsored content optimised for cost per qualified lead. Talk to us."
        path="/services/linkedin-ads"
      />
      {/* HERO — profile card theme */}
      <section className="li-hero">
        <div className="li-container li-hero__inner">
          <div className="li-hero__text" data-aos="fade-right">
            <span className="li-tag"><FiLinkedin /> LinkedIn Advertising</span>
            <h1 className="li-hero__title">Reach the People Who <span>Sign the Deal</span></h1>
            <p className="li-hero__sub">Precision B2B campaigns that put your offer in front of exact decision-makers, by title, company and industry, and turn them into qualified leads.</p>
            <div className="li-hero__cta">
              <Link to="/contact" className="li-btn li-btn--solid">Generate B2B Leads <FiArrowRight /></Link>
              <Link to="/contact" className="li-btn li-btn--ghost">Free B2B Strategy Call</Link>
            </div>
          </div>
        </div>
      </section>

      {/* campaigns */}
      <section className="li-camps">
        <div className="li-container">
          <div className="li-head" data-aos="fade-up">
            <span className="li-eyebrow">Campaigns We Run</span>
            <h2>Built for the B2B Buying Journey</h2>
          </div>
          <div className="li-camps__grid">
            {CAMPAIGNS.map((c, i) => (
              <div className="li-camp" key={c.t} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="li-camp__icon">{c.icon}</span>
                <h3>{c.t}</h3><p>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* band */}
      <section className="li-band">
        <div className="li-container li-band__inner" data-aos="fade-up">
          <h2>Fewer, Better Leads, Straight to Sales</h2>
          <div className="li-band__stats">
            <div><b>2.4x</b><span>Higher Lead Quality</span></div>
            <div><b>ABM</b><span>Account Targeting</span></div>
            <div><b>Full</b><span>CRM Integration</span></div>
          </div>
        </div>
      </section>

      <ServiceFaq service="LinkedIn Advertising" faqs={FAQS} />

      <section className="li-cta">
        <div className="li-container">
          <div className="li-cta__box" data-aos="zoom-in">
            <FiBriefcase className="li-cta__ic" />
            <h2>Ready to Fill Your Pipeline?</h2>
            <p>Get a free B2B strategy call, we'll map exactly how to reach and convert your ideal customers on LinkedIn.</p>
            <Link to="/contact" className="li-btn li-btn--light">Book Free Strategy Call <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
