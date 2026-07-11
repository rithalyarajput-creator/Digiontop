// SEOServices.jsx
// Install deps if not present:
//   npm install react-icons aos
// Then in main.jsx/main.tsx add:
//   import 'aos/dist/aos.css'
//   import AOS from 'aos'; AOS.init({ duration: 700, once: true });

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import AOS from 'aos'
import 'aos/dist/aos.css'

import {
  FiSearch,
  FiTrendingUp,
  FiLink,
  FiMapPin,
  FiArrowRight,
  FiZap,
  FiFileText,
  FiGlobe,
} from 'react-icons/fi'
import {
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineDocumentSearch,
  HiOutlinePresentationChartLine,
} from 'react-icons/hi'
import { RiSearchEyeLine } from 'react-icons/ri'
import { MdOutlineSpeed, MdOutlineAutoGraph } from 'react-icons/md'
import { BsGraphUpArrow } from 'react-icons/bs'
import ServiceWork from '../components/ServiceWork'
import ServiceFaq from '../components/ServiceFaq'
import RelatedServices from '../components/RelatedServices'
import '../styles/Services.css'

const SEO_FAQS = [
  { q: 'How long before SEO shows results?', a: 'Most clients see first measurable movement in 30–90 days; full compounding growth typically lands by month 3–6 depending on competition.' },
  { q: 'Do you guarantee #1 rankings?', a: 'No honest agency can guarantee exact positions, but our data-driven SEO consistently drives 2x+ organic traffic growth for clients.' },
  { q: 'What does your SEO include?', a: 'On-page, technical, local & content SEO — keyword research, optimization, link building, Search Console setup, and performance tracking.' },
  { q: 'Do you require a long-term contract?', a: 'No lock-in. SEO compounds over time, and clients stay because the results keep growing.' },
  { q: 'Will I get reports?', a: 'Yes — clear monthly reports on rankings, traffic, and what we did to grow them.' },
]

/* ── SEO Services Data ── */
const SEO_SERVICES = [
  {
    icon: <FiSearch size={26} />,
    iconBg: '#FFF6E0',
    iconColor: '#C78700',
    title: 'Technical SEO Audit & Fixes',
    desc: 'Deep crawl of your entire site to identify and fix crawl errors, broken links, duplicate content, and indexation issues that block rankings.',
    features: ['Crawlability & indexation fix', 'Site architecture review', 'Redirect chain resolution', 'Structured data implementation'],
  },
  {
    icon: <HiOutlineDocumentSearch size={26} />,
    iconBg: '#FFF6E0',
    iconColor: '#C78700',
    title: 'Keyword Research & Mapping',
    desc: 'Data-driven keyword discovery using intent clustering to map the right terms to the right pages — driving qualified traffic that converts.',
    features: ['Competitor gap analysis', 'Long-tail keyword discovery', 'Search intent classification', 'Content cluster mapping'],
  },
  {
    icon: <FiFileText size={26} />,
    iconBg: '#FFF6E0',
    iconColor: '#C78700',
    title: 'On-Page Optimisation',
    desc: 'Every meta tag, heading structure, and internal link optimised to signal relevance and authority to Google — systematically, at scale.',
    features: ['Title & meta description rewrites', 'Heading hierarchy (H1–H4)', 'Image alt text & compression', 'Internal linking strategy'],
  },
  {
    icon: <FiLink size={26} />,
    iconBg: '#FFF6E0',
    iconColor: '#C78700',
    title: 'Link Building & Digital PR',
    desc: 'White-hat authority building through guest posts, digital PR campaigns, and HARO outreach to earn links from relevant, high-DA domains.',
    features: ['Guest post outreach', 'HARO & journalist pitching', 'Broken link reclamation', 'Brand mention link building'],
  },
  {
    icon: <FiMapPin size={26} />,
    iconBg: '#FFF6E0',
    iconColor: '#C78700',
    title: 'Local SEO',
    desc: 'Dominate "near me" searches and Google Maps rankings with Google Business Profile optimisation, local citations, and review management.',
    features: ['Google Business Profile setup', 'NAP citation building', 'Review generation strategy', 'Local schema markup'],
  },
  {
    icon: <MdOutlineSpeed size={26} />,
    iconBg: '#FFF6E0',
    iconColor: '#C78700',
    title: 'Core Web Vitals & Speed SEO',
    desc: 'Page experience is a ranking factor. We optimise LCP, CLS, FID, and overall speed to give you a technical edge over competitors.',
    features: ['LCP / CLS / FID fixes', 'Image & font optimisation', 'CDN configuration', 'Server response time tuning'],
  },
  {
    icon: <FiGlobe size={26} />,
    iconBg: '#FFF6E0',
    iconColor: '#F5A800',
    title: 'E-Commerce SEO',
    desc: 'Product and category page optimisation, faceted navigation handling, and schema markup to drive high-intent buyers straight to your listings.',
    features: ['Product schema & rich snippets', 'Category page optimisation', 'Faceted URL management', 'Review schema integration'],
  },
  {
    icon: <BsGraphUpArrow size={26} />,
    iconBg: '#FFF6E0',
    iconColor: '#C78700',
    title: 'SEO Reporting & Analytics',
    desc: 'Crystal-clear monthly reports showing rank movements, traffic growth, conversions, and the direct ROI of your SEO investment.',
    features: ['Rank tracker dashboards', 'GA4 & Search Console reports', 'Competitor benchmark tracking', 'Monthly strategy review calls'],
  },
]

/* ── SEO Process Steps ── */
const SEO_PROCESS = [
  {
    step: '01',
    label: 'Step One',
    title: 'Audit & Research',
    desc: 'We run a 150-point technical audit alongside in-depth keyword research and competitor analysis to understand exactly where you stand and what opportunities exist.',
    tags: ['Site Crawl', 'Keyword Research', 'Competitor Gap', 'Opportunity Map'],
    accent: '#C78700',
  },
  {
    step: '02',
    label: 'Step Two',
    title: 'Strategy & Roadmap',
    desc: 'Your findings are turned into a prioritised 90-day SEO roadmap with clear milestones, target keywords, and content requirements mapped to business goals.',
    tags: ['90-Day Roadmap', 'Priority Matrix', 'Content Plan', 'KPI Setting'],
    accent: '#C78700',
  },
  {
    step: '03',
    label: 'Step Three',
    title: 'On-Page Fixes',
    desc: 'We systematically optimise every page — titles, meta descriptions, headings, internal links, structured data — ensuring Google fully understands your content.',
    tags: ['Title Tags', 'Schema Markup', 'Internal Links', 'Image SEO'],
    accent: '#C78700',
  },
  {
    step: '04',
    label: 'Step Four',
    title: 'Content Creation',
    desc: 'Expert SEO writers produce authoritative, search-optimised content — blogs, pillar pages, and landing pages — that attract backlinks and rank for target keywords.',
    tags: ['Pillar Pages', 'Blog Articles', 'FAQ Content', 'Link Bait Assets'],
    accent: '#F5A800',
  },
  {
    step: '05',
    label: 'Step Five',
    title: 'Monitor & Report',
    desc: 'We track every keyword, every backlink, and every conversion, sharing clear monthly reports and adjusting the strategy based on live data.',
    tags: ['Rank Tracking', 'GA4 Reports', 'Link Monitoring', 'Strategy Refinement'],
    accent: '#C78700',
  },
]

/* ── Component ── */
export default function SEOServices() {
  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 })
  }, [])

  return (
    <>
      <Seo title="SEO Services in India — Rank #1 on Google | DigionTop" description="Data-driven SEO services that rank your business #1 on Google. On-page, technical, local & content SEO with a 2x traffic lift in 90 days. Get a free SEO audit." path="/services/seo" />
      {/* ── Hero — simple centered ─────────────────────────── */}
      <section className="svc-hero svc-hero--center">
        <div className="container">
          <div className="svc-hero__centered" data-aos="fade-up">
            <div className="svc-hero__tag svc-hero__tag--light">
              <RiSearchEyeLine size={13} /> Search Engine Optimisation
            </div>

            <h1 className="svc-hero__title svc-hero__title--dark">
              Rank Higher.{' '}
              <span className="gradient-text">Get Found.</span>
              {' '}Grow Faster.
            </h1>

            <p className="svc-hero__subtitle svc-hero__subtitle--slate">
              Data-driven SEO strategies that push your website to Page 1, drive qualified
              organic traffic, and compound your growth month after month — without paid ads.
            </p>

            <div className="svc-hero__actions">
              <Link to="/contact" className="btn btn--yellow">
                Get Free SEO Audit <FiArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Talk to an SEO Expert
              </Link>
            </div>

            <div className="svc-hero__stats svc-hero__stats--light">
              {[
                { num: '500%', label: 'Avg Traffic Growth' },
                { num: '90 Days', label: 'First Results' },
                { num: '#1', label: 'Rankings Achieved' },
              ].map((s) => (
                <div key={s.num} style={{ textAlign: 'center' }}>
                  <div className="svc-hero__stat-num svc-hero__stat-num--dark">{s.num}</div>
                  <div className="svc-hero__stat-label svc-hero__stat-label--dark">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 8 SEO Service Types ───────────────────────────── */}
      <section className="section svc-section--white">
        <div className="container">
          <div className="svc-section-header" data-aos="fade-up">
            <span className="section-tag">Our SEO Services</span>
            <div className="divider divider-center" />
            <h2 className="h2" style={{ marginTop: '20px', marginBottom: '14px' }}>
              Full-Spectrum SEO, Zero Guesswork
            </h2>
            <p className="body-md" style={{ maxWidth: '560px', margin: '0 auto' }}>
              Every angle of your search visibility covered — from technical foundations
              to content authority to local dominance.
            </p>
          </div>

          <div className="svc-cards-grid">
            {SEO_SERVICES.map((item, i) => (
              <div
                key={item.title}
                className="svc-card"
                data-aos="fade-up"
                data-aos-delay={i * 55}
              >
                <div
                  className="svc-card__icon-wrap"
                  style={{ background: item.iconBg, color: item.iconColor }}
                >
                  {item.icon}
                </div>
                <h3 className="svc-card__title">{item.title}</h3>
                <p className="svc-card__desc">{item.desc}</p>
                <ul className="svc-card__features">
                  {item.features.map((f) => (
                    <li key={f} className="svc-card__feature">
                      <FiSearch
                        className="svc-card__feature-icon"
                        size={13}
                        color={item.iconColor}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our SEO Process ───────────────────────────────── */}
      <section className="section svc-section--dark">
        <div className="container">
          <div className="svc-section-header" data-aos="fade-up">
            <span className="section-tag">How We Work</span>
            <div className="divider divider-center" />
            <h2 className="h2" style={{ marginTop: '20px', marginBottom: '14px' }}>
              Our Proven 5-Step SEO Process
            </h2>
            <p className="body-md" style={{ maxWidth: '560px', margin: '0 auto' }}>
              A transparent, repeatable framework that has delivered consistent Page 1 rankings
              across 200+ websites and dozens of industries.
            </p>
          </div>

          {/* Timeline */}
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div className="svc-timeline">
              {SEO_PROCESS.map((step, i) => (
                <div
                  key={step.step}
                  className="svc-timeline-step"
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                >
                  <div
                    className="svc-timeline__num"
                    style={{ borderColor: step.accent, color: step.accent }}
                  >
                    {step.step}
                  </div>
                  <div className="svc-timeline__content">
                    <div className="svc-timeline__label" style={{ color: step.accent }}>
                      {step.label}
                    </div>
                    <h3 className="svc-timeline__title">{step.title}</h3>
                    <p className="svc-timeline__desc">{step.desc}</p>
                    <div className="svc-timeline__tags">
                      {step.tags.map((t) => (
                        <span
                          key={t}
                          className="svc-timeline__tag"
                          style={{ background: `${step.accent}12`, color: step.accent }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Work (real reels + posts) ────────────────── */}
      <ServiceWork
        accent="#F5A800"
        accentSoft="#FFF6E0"
        heading="Content That Ranks & Converts"
        subtitle="Real reels and creative posts we've produced for brands we help grow."
      />

      {/* FAQ + lead form */}
      <ServiceFaq service="SEO Services" faqs={SEO_FAQS} />

      {/* Related services */}
      <RelatedServices categoryHeading="SEO & Search Marketing" />

      {/* ── CTA Banner ───────────────────────────────────── */}
      <section className="svc-cta">
        <div className="container">
          <div className="svc-cta__inner" data-aos="zoom-in">
            <div className="svc-cta__blob svc-cta__blob--1" />
            <div className="svc-cta__blob svc-cta__blob--2" />
            <div className="svc-cta__content">
              <div className="svc-cta__badge">
                <HiOutlinePresentationChartLine size={14} /> Free SEO Report
              </div>
              <h2 className="svc-cta__title">
                See Exactly Why You Are<br />Not Ranking — For Free
              </h2>
              <p className="svc-cta__subtitle">
                We will run a full technical SEO audit on your website and send you a
                personalised report identifying your biggest ranking opportunities.
              </p>
              <div className="svc-cta__actions">
                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '14px 30px', borderRadius: '12px', background: '#F5A800',
                    color: '#1a1a1a', fontWeight: 700, fontSize: '15px', textDecoration: 'none',
                    boxShadow: '0 6px 20px rgba(245,168,0,0.4)',
                  }}
                >
                  Claim Free SEO Audit <FiArrowRight size={17} />
                </Link>
                <Link to="/contact" className="btn btn-ghost" style={{ fontSize: '15px', padding: '14px 30px' }}>
                  Book a Strategy Call
                </Link>
              </div>
              <div className="svc-cta__trust">
                <span>No commitment</span>
                <span>100% Free</span>
                <span>Delivered in 48 hrs</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
