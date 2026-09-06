import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
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
  FiCheck,
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
import ServiceFaq from '../components/ServiceFaq'
import RelatedServices from '../components/RelatedServices'
import '../styles/Services.css'

const SEO_FAQS = [
  { q: 'What does an SEO service include?', a: 'SEO services can include keyword research, technical optimization, on-page improvements, content optimization, local SEO, internal linking, off-page activities, performance monitoring, and ongoing strategy improvements based on the website’s needs.' },
  { q: 'How long does SEO take to show results?', a: 'SEO usually takes time because search visibility depends on factors such as competition, website condition, industry, content quality, and authority. Some improvements may appear earlier, while meaningful organic growth generally requires consistent optimization.' },
  { q: 'Is SEO suitable for small businesses?', a: 'Yes. SEO can be particularly useful for small businesses that want to reach customers searching for their products or services online. A focused strategy can target relevant keywords, locations, and customer needs without competing for every broad search.' },
  { q: 'Can SEO guarantee first-page Google rankings?', a: 'No professional SEO provider can guarantee specific Google rankings. Search results depend on many changing factors. A reliable SEO strategy should focus on improving website quality, relevance, visibility, and business outcomes rather than making unrealistic ranking promises.' },
  { q: 'How do you measure SEO performance?', a: 'SEO performance can be measured using relevant metrics such as organic traffic, keyword visibility, search impressions, clicks, conversions, enquiries, and leads. The most useful metrics depend on your website type and specific business objectives.' },
]

/* ── Complete SEO Solutions ── */
const SEO_SERVICES = [
  {
    icon: <FiSearch size={26} />,
    iconBg: '#FFF6E0',
    iconColor: '#C78700',
    title: 'Keyword Research',
    desc: 'We identify relevant search terms based on your audience, industry, competition, and search intent. This helps your website target queries that are genuinely connected to your products or services.',
  },
  {
    icon: <HiOutlineDocumentSearch size={26} />,
    iconBg: '#FFF6E0',
    iconColor: '#C78700',
    title: 'On-Page SEO',
    desc: 'Our on-page SEO services focus on improving titles, headings, content, URLs, internal links, images, and other important page elements to make your website easier to understand and navigate.',
  },
  {
    icon: <HiOutlineCog size={26} />,
    iconBg: '#FFF6E0',
    iconColor: '#C78700',
    title: 'Technical SEO',
    desc: 'Our technical SEO services help identify issues related to crawling, indexing, website structure, mobile usability, page speed, broken links, sitemaps, and other technical factors.',
    path: '/services/technical-seo',
  },
  {
    icon: <FiMapPin size={26} />,
    iconBg: '#FFF6E0',
    iconColor: '#C78700',
    title: 'Local SEO',
    desc: 'Our local SEO services help businesses improve their visibility for location-based searches. We can optimize local signals, Google Business Profile information, location pages, citations, and other relevant areas.',
    path: '/services/local-seo',
  },
  {
    icon: <FiFileText size={26} />,
    iconBg: '#FFF6E0',
    iconColor: '#C78700',
    title: 'Content SEO',
    desc: 'We help plan and optimize useful content around relevant topics, questions, and search intent. The focus is on creating content that provides genuine value while supporting your organic visibility.',
  },
  {
    icon: <FiLink size={26} />,
    iconBg: '#FFF6E0',
    iconColor: '#C78700',
    title: 'Off-Page SEO',
    desc: 'We work on relevant off-page activities that can support your website’s authority and online presence. The strategy focuses on quality and relevance rather than creating unnecessary links.',
    path: '/services/link-building',
  },
]

/* ── Why Choose Our SEO Service ── */
const WHY_US = [
  { icon: <HiOutlineCog size={26} />, iconBg: '#FFF6E0', iconColor: '#C78700', title: 'Customized SEO Strategy', desc: 'Your strategy is created according to your website, industry, competition, target audience, and business objectives.' },
  { icon: <RiSearchEyeLine size={26} />, iconBg: '#FFF6E0', iconColor: '#C78700', title: 'User-Focused Optimization', desc: 'We focus on improving search visibility while keeping the website useful, understandable, and easy for visitors to navigate.' },
  { icon: <HiOutlinePresentationChartLine size={26} />, iconBg: '#FFF6E0', iconColor: '#C78700', title: 'Transparent Approach', desc: 'You should know what is being worked on and why. Our process focuses on clear communication and understandable reporting.' },
  { icon: <MdOutlineAutoGraph size={26} />, iconBg: '#FFF6E0', iconColor: '#C78700', title: 'Continuous Improvement', desc: 'SEO is an ongoing process. We monitor performance, identify new opportunities, and refine the strategy as search behavior and business requirements change.' },
]

/* ── Our SEO Process ── */
const SEO_PROCESS = [
  { step: '01', label: 'Step One', title: 'Discover', desc: 'We learn about your business, target audience, website, competitors, services, and current search visibility.', accent: '#C78700' },
  { step: '02', label: 'Step Two', title: 'Analyze', desc: 'We review your website, keywords, content, technical SEO, competitors, and existing organic performance to identify strengths and improvement areas.', accent: '#C78700' },
  { step: '03', label: 'Step Three', title: 'Strategize', desc: 'We create a practical SEO roadmap based on your business priorities, search opportunities, competition, and website requirements.', accent: '#C78700' },
  { step: '04', label: 'Step Four', title: 'Optimize', desc: 'We implement relevant improvements across technical SEO, on-page elements, content, internal linking, local optimization, and other important areas.', accent: '#F5A800' },
  { step: '05', label: 'Step Five', title: 'Monitor', desc: 'We track relevant performance indicators such as organic visibility, traffic, keyword performance, and conversions where suitable.', accent: '#C78700' },
  { step: '06', label: 'Step Six', title: 'Improve', desc: 'We use performance insights to refine the strategy and identify new opportunities for sustainable organic growth.', accent: '#C78700' },
]

/* ── Our Approach to Search Engine Optimization ── */
const APPROACH = [
  { icon: <FiSearch size={26} />, iconBg: '#FFF6E0', iconColor: '#C78700', title: 'Focus on Search Intent', desc: 'Ranking for a keyword is only one part of SEO. We focus on understanding what users expect when they search and create or optimize pages accordingly.' },
  { icon: <HiOutlineCog size={26} />, iconBg: '#FFF6E0', iconColor: '#C78700', title: 'Build a Strong Technical Foundation', desc: 'A technically healthy website makes it easier for search engines to crawl, understand, and index your pages while also supporting a better user experience.' },
  { icon: <FiFileText size={26} />, iconBg: '#FFF6E0', iconColor: '#C78700', title: 'Create Relevant Content', desc: 'We focus on useful and relevant content rather than producing pages simply to increase the number of keywords on a website.' },
  { icon: <FiTrendingUp size={26} />, iconBg: '#FFF6E0', iconColor: '#C78700', title: 'Optimize for Continuous Growth', desc: 'Search results and customer behavior can change over time. Regular monitoring allows us to identify what is working and where further improvements may be needed.' },
]

/* ── How SEO Can Benefit Your Business ── */
const BENEFITS = [
  { icon: <FiTrendingUp size={26} />, iconBg: '#FFF6E0', iconColor: '#C78700', title: 'Increase Organic Visibility', desc: 'Improve your chances of appearing in searches that are relevant to your products and services.' },
  { icon: <RiSearchEyeLine size={26} />, iconBg: '#FFF6E0', iconColor: '#C78700', title: 'Attract Relevant Visitors', desc: 'Reach people who are actively looking for solutions related to what your business offers.' },
  { icon: <FiGlobe size={26} />, iconBg: '#FFF6E0', iconColor: '#C78700', title: 'Build Online Credibility', desc: 'Consistent search visibility, useful content, and a professional website can strengthen your digital presence.' },
  { icon: <BsGraphUpArrow size={26} />, iconBg: '#FFF6E0', iconColor: '#C78700', title: 'Generate More Opportunities', desc: 'Better visibility can create additional opportunities for enquiries, calls, bookings, and website conversions.' },
  { icon: <MdOutlineAutoGraph size={26} />, iconBg: '#FFF6E0', iconColor: '#C78700', title: 'Support Long-Term Growth', desc: 'A consistent SEO strategy can help build an organic foundation that supports your business over time.' },
]

/* ── SEO Solutions for Different Businesses ── */
const BUSINESSES = [
  { icon: <FiMapPin size={26} />, iconBg: '#FFF6E0', iconColor: '#C78700', title: 'Local Businesses', desc: 'Reach customers searching for products and services in your target location.' },
  { icon: <FiZap size={26} />, iconBg: '#FFF6E0', iconColor: '#C78700', title: 'Small Businesses', desc: 'Build stronger online visibility with a focused strategy suited to your budget and business goals.' },
  { icon: <FiGlobe size={26} />, iconBg: '#FFF6E0', iconColor: '#C78700', title: 'E-commerce Businesses', desc: 'Improve the organic visibility of product, category, and other important shopping pages.' },
  { icon: <MdOutlineSpeed size={26} />, iconBg: '#FFF6E0', iconColor: '#C78700', title: 'Startups', desc: 'Build an SEO foundation that supports discoverability as your business grows.' },
  { icon: <HiOutlineDocumentSearch size={26} />, iconBg: '#FFF6E0', iconColor: '#C78700', title: 'Service Businesses', desc: 'Target customers searching for specific services and solutions.' },
  { icon: <HiOutlineChartBar size={26} />, iconBg: '#FFF6E0', iconColor: '#C78700', title: 'Professional Businesses', desc: 'Improve visibility around your expertise, services, and important industry topics.' },
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'SEO Services',
  provider: { '@type': 'ProfessionalService', name: 'DigionTop', url: 'https://www.digiontop.com' },
  areaServed: 'Delhi, India',
  description: 'Complete SEO services including keyword research, on-page SEO, technical SEO, local SEO, content SEO, and off-page SEO for businesses of all sizes.',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: SEO_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

/* ── Component ── */
export default function SEOServices() {
  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 })
  }, [])

  const renderCard = (item, i) => {
    const CardTag = item.path ? Link : 'div'
    const cardProps = item.path ? { to: item.path } : {}
    return (
      <CardTag
        key={item.title}
        className="svc-card"
        data-aos="fade-up"
        data-aos-delay={i * 55}
        {...cardProps}
      >
        <div className="svc-card__icon-wrap" style={{ background: item.iconBg, color: item.iconColor }}>
          {item.icon}
        </div>
        <h3 className="svc-card__title">{item.title}</h3>
        <p className="svc-card__desc" style={{ marginBottom: 0 }}>{item.desc}</p>
      </CardTag>
    )
  }

  return (
    <>
      <Seo
        title="SEO Services in Delhi - Grow Your Business Online"
        description="Get professional SEO services in Delhi to improve online visibility, attract relevant traffic, and generate more business opportunities."
        path="/services/seo-services"
      />
      <Helmet>
        <meta property="og:title" content="SEO Services in Delhi - Grow Your Business Online" />
        <meta property="og:description" content="Customized SEO strategies covering keyword research, on-page, technical, local, content and off-page SEO." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.digiontop.com/services/seo-services" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* ── Hero — simple centered ─────────────────────────── */}
      <section className="svc-hero svc-hero--center">
        <div className="container">
          <div className="svc-hero__centered" data-aos="fade-up">
            <h1 className="svc-hero__title svc-hero__title--dark">
              Grow Your Business with Professional <span className="gradient-text">SEO Services</span> in Delhi
            </h1>

            <p className="svc-hero__subtitle svc-hero__subtitle--slate">
              Want your business to become more visible on Google and attract the right customers? Our SEO Service
              in Delhi helps businesses improve organic visibility, reach relevant audiences, and create sustainable
              opportunities through search.
            </p>
            <p className="svc-hero__subtitle svc-hero__subtitle--slate">
              We create customized SEO strategies based on your business goals, target audience, competitors,
              website performance, and search intent. From technical improvements and keyword research to content
              optimization and local visibility, our approach focuses on building a stronger search presence without
              relying on shortcuts or unrealistic ranking promises.
            </p>

            <div className="svc-hero__actions">
              <Link to="/contact" className="btn btn--yellow">
                Get Free SEO Consultation <FiArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Talk to an SEO Expert
              </Link>
            </div>

            <div className="svc-hero__trust">
              <span><FiCheck /> Customized SEO Strategies</span>
              <span><FiCheck /> Transparent Reporting</span>
              <span><FiCheck /> Long-Term Organic Growth</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Complete SEO Solutions ───────────────────────────── */}
      <section className="section svc-section--white">
        <div className="container">
          <div className="svc-section-header" data-aos="fade-up">
            <span className="section-tag">Our SEO Services</span>
            <div className="divider divider-center" />
            <h2 className="h2" style={{ marginTop: '20px', marginBottom: '14px' }}>
              Complete SEO Solutions for Your Business
            </h2>
            <p className="body-md" style={{ maxWidth: '620px', margin: '0 auto' }}>
              Our SEO company in Delhi provides a complete approach to search engine optimization. Instead of using
              the same strategy for every business, we identify the areas that can create the most relevant
              opportunities for your website.
            </p>
          </div>
          <div className="svc-cards-grid">
            {SEO_SERVICES.map(renderCard)}
          </div>
        </div>
      </section>

      {/* ── Why Choose Our SEO Service ───────────────────────── */}
      <section className="section svc-section--dark">
        <div className="container">
          <div className="svc-section-header" data-aos="fade-up">
            <span className="section-tag">Why DigionTop</span>
            <div className="divider divider-center" />
            <h2 className="h2" style={{ marginTop: '20px', marginBottom: '14px' }}>
              Why Choose Our SEO Service?
            </h2>
            <p className="body-md" style={{ maxWidth: '620px', margin: '0 auto' }}>
              SEO works differently for every website. Your industry, competitors, target customers, website
              structure, and business goals all influence the strategy. We focus on understanding these factors
              before recommending optimization activities.
            </p>
          </div>
          <div className="svc-cards-grid">
            {WHY_US.map(renderCard)}
          </div>
        </div>
      </section>

      {/* ── Our SEO Process ───────────────────────────────── */}
      <section className="section svc-section--white">
        <div className="container">
          <div className="svc-section-header" data-aos="fade-up">
            <span className="section-tag">How We Work</span>
            <div className="divider divider-center" />
            <h2 className="h2" style={{ marginTop: '20px', marginBottom: '14px' }}>
              Our SEO Process That Drives Growth
            </h2>
            <p className="body-md" style={{ maxWidth: '620px', margin: '0 auto' }}>
              We follow a structured process to understand your current position, identify opportunities, implement
              improvements, and monitor progress.
            </p>
          </div>

          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div className="svc-timeline">
              {SEO_PROCESS.map((step, i) => (
                <div key={step.step} className="svc-timeline-step" data-aos="fade-up" data-aos-delay={i * 80}>
                  <div className="svc-timeline__num" style={{ borderColor: step.accent, color: step.accent }}>
                    {step.step}
                  </div>
                  <div className="svc-timeline__content">
                    <div className="svc-timeline__label" style={{ color: step.accent }}>{step.label}</div>
                    <h3 className="svc-timeline__title">{step.title}</h3>
                    <p className="svc-timeline__desc" style={{ marginBottom: 0 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Approach to Search Engine Optimization ───────── */}
      <section className="section svc-section--dark">
        <div className="container">
          <div className="svc-section-header" data-aos="fade-up">
            <span className="section-tag">Our Philosophy</span>
            <div className="divider divider-center" />
            <h2 className="h2" style={{ marginTop: '20px', marginBottom: '14px' }}>
              Our Approach to Search Engine Optimization
            </h2>
          </div>
          <div className="svc-cards-grid">
            {APPROACH.map(renderCard)}
          </div>
        </div>
      </section>

      {/* ── How SEO Can Benefit Your Business ───────────────── */}
      <section className="section svc-section--white">
        <div className="container">
          <div className="svc-section-header" data-aos="fade-up">
            <span className="section-tag">Benefits</span>
            <div className="divider divider-center" />
            <h2 className="h2" style={{ marginTop: '20px', marginBottom: '14px' }}>
              How SEO Can Benefit Your Business
            </h2>
          </div>
          <div className="svc-cards-grid">
            {BENEFITS.map(renderCard)}
          </div>
        </div>
      </section>

      {/* ── SEO Solutions for Different Businesses ──────────── */}
      <section className="section svc-section--dark">
        <div className="container">
          <div className="svc-section-header" data-aos="fade-up">
            <span className="section-tag">Who We Help</span>
            <div className="divider divider-center" />
            <h2 className="h2" style={{ marginTop: '20px', marginBottom: '14px' }}>
              SEO Solutions for Different Businesses
            </h2>
            <p className="body-md" style={{ maxWidth: '620px', margin: '0 auto' }}>
              SEO can support businesses across different industries and stages of growth.
            </p>
          </div>
          <div className="svc-cards-grid">
            {BUSINESSES.map(renderCard)}
          </div>
          <p className="svc-note">
            Explore more: <Link to="/services/website-development">Website Development</Link>,{' '}
            <Link to="/industries">Industries We Serve</Link>, and{' '}
            <Link to="/contact">Contact Us</Link> for a free SEO consultation.
          </p>
        </div>
      </section>

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
              <h2 className="svc-cta__title">
                Ready to Improve Your Online Visibility?
              </h2>
              <p className="svc-cta__subtitle">
                Your customers are already searching online. A well-planned SEO strategy can help your business
                become more visible when those searches matter. Our SEO Service in Delhi is designed around your
                business, audience, competition, and growth objectives. Let's discuss your website and identify
                practical opportunities to improve its organic presence.
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
                  Get Your Free SEO Consultation <FiArrowRight size={17} />
                </Link>
                <Link to="/contact" className="btn btn-ghost" style={{ fontSize: '15px', padding: '14px 30px' }}>
                  Contact Our SEO Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
