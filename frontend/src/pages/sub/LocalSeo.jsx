import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiMapPin, FiStar, FiSearch, FiTrendingUp,
  FiCheck, FiArrowRight,
  FiFolder, FiGlobe, FiFileText, FiTarget, FiEye, FiCheckCircle, FiBarChart2,
  FiClipboard, FiSettings, FiActivity, FiRefreshCw, FiUsers, FiShield,
  FiCoffee, FiHeart, FiScissors, FiHome, FiTool, FiBriefcase,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/LocalSeo.css'

const FAQS = [
  { q: 'What is Local SEO?', a: 'Local SEO helps businesses improve their visibility for searches connected to a specific location. It can involve Google Business Profile optimization, local keywords, website optimization, citations, reviews, and other relevant local search activities.' },
  { q: 'Is Local SEO useful for small businesses?', a: 'Yes. Local SEO can be especially useful for businesses that serve a specific city, neighborhood, or service area. It helps them improve their online presence and connect with potential customers who are searching for relevant local products or services.' },
  { q: 'How long does Local SEO take to show results?', a: 'The timeline varies depending on competition, location, website condition, business profile quality, and other factors. Some improvements may appear sooner, while stronger local visibility generally requires consistent optimization and monitoring.' },
  { q: 'Does Google Business Profile help Local SEO?', a: 'A complete and accurate Google Business Profile is an important part of a local search strategy. It gives customers useful information about your business and helps establish your presence across Google’s local search ecosystem.' },
  { q: 'Can Local SEO guarantee top Google rankings?', a: 'No. Search rankings depend on many factors and can change over time. A professional strategy should focus on improving relevance, local visibility, website quality, customer experience, and genuine business growth rather than promising specific rankings.' },
]

const SOLUTIONS = [
  { icon: <FiMapPin />, t: 'Google Business Profile Optimization', d: 'Your Google Business Profile is an important part of your local presence. We help optimize relevant business information, categories, services, descriptions, photos, and other profile elements to create a complete and useful business listing.' },
  { icon: <FiSearch />, t: 'Local Keyword Research', d: 'We identify relevant location-based search terms related to your services and target areas. This helps create a strategy around the searches your potential customers may use when looking for a local business.' },
  { icon: <FiFolder />, t: 'Local Citations', d: 'Consistent business information across relevant online directories can support a stronger local presence. We review important business details such as name, address, phone number, and website information.' },
  { icon: <FiGlobe />, t: 'Local Website Optimization', d: 'Your website should clearly communicate what you offer and where you serve customers. We optimize relevant pages, headings, content, internal links, and location-focused information where appropriate.' },
  { icon: <FiStar />, t: 'Online Reviews', d: 'Reviews can influence how potential customers perceive a local business. We help create a structured approach for managing and encouraging genuine customer feedback while keeping the process natural and customer-focused.' },
  { icon: <FiFileText />, t: 'Local Content Strategy', d: 'We identify content opportunities that are relevant to your local audience. Location-focused service pages, useful guides, FAQs, and other relevant content can help your website provide more value to local visitors.' },
]

const WHY_US = [
  { icon: <FiTarget />, t: 'Customized Local Strategy', d: 'We build your strategy around your business type, target locations, services, competition, and customer search behavior.' },
  { icon: <FiEye />, t: 'Better Local Visibility', d: 'Our approach focuses on improving relevant local signals so your business has a stronger presence across important search touchpoints.' },
  { icon: <FiCheckCircle />, t: 'Consistent Business Information', d: 'Accurate and consistent business details make it easier for customers to understand and contact your business across online platforms.' },
  { icon: <FiBarChart2 />, t: 'Clear Reporting', d: 'You should understand what work is being completed and how your local search presence is developing. We provide clear and practical reporting.' },
]

const PROCESS = [
  { n: '01', t: 'Discover', d: 'We learn about your business, services, target locations, customers, competitors, and current local search presence.', icon: <FiSearch /> },
  { n: '02', t: 'Audit', d: 'We review your website, Google Business Profile, local listings, citations, reviews, keywords, and other relevant local SEO factors.', icon: <FiClipboard /> },
  { n: '03', t: 'Research', d: 'We identify relevant local keywords and analyze how customers search for businesses and services in your target areas.', icon: <FiTrendingUp /> },
  { n: '04', t: 'Optimize', d: 'We improve relevant website pages, business profile information, local signals, content, and other areas based on the strategy.', icon: <FiSettings /> },
  { n: '05', t: 'Monitor', d: 'We track relevant local search performance, website activity, visibility, and other agreed indicators.', icon: <FiActivity /> },
  { n: '06', t: 'Improve', d: 'We use performance insights to refine the strategy and identify new opportunities for stronger local visibility.', icon: <FiRefreshCw /> },
]

const STRENGTHEN = [
  { icon: <FiMapPin />, t: 'Google Business Profile', d: 'We help make your business profile complete, accurate, and useful for potential customers searching for your services.' },
  { icon: <FiFileText />, t: 'Location-Based Website Content', d: 'We create or optimize relevant website content that clearly communicates your services and the areas you serve.' },
  { icon: <FiFolder />, t: 'Local Search Signals', d: 'We review important local signals, including business information, citations, reviews, website content, and other relevant factors.' },
  { icon: <FiUsers />, t: 'Customer-Focused Optimization', d: 'Local search is ultimately about connecting customers with businesses. We focus on making your online information clear, useful, and easy to act on.' },
]

const BENEFITS = [
  { icon: <FiUsers />, t: 'Reach Nearby Customers', d: 'Improve your chances of being discovered by people searching for relevant products and services in your target area.' },
  { icon: <FiEye />, t: 'Increase Local Visibility', d: 'Build a stronger presence across location-based searches and important local search platforms.' },
  { icon: <FiTrendingUp />, t: 'Generate More Enquiries', d: 'Better local visibility can create more opportunities for calls, website visits, enquiries, and bookings.' },
  { icon: <FiShield />, t: 'Build Customer Trust', d: 'Complete business information, genuine reviews, and useful content can help potential customers feel more confident.' },
  { icon: <FiBarChart2 />, t: 'Support Long-Term Growth', d: 'Consistent local optimization can help establish a stronger digital foundation for your business.' },
]

const INDUSTRIES = [
  { icon: <FiCoffee />, t: 'Restaurants & Cafes', d: 'Help nearby customers discover your location, services, menu information, and business details.' },
  { icon: <FiHeart />, t: 'Clinics & Healthcare Businesses', d: 'Improve local visibility for relevant services while making important business information easier to find.' },
  { icon: <FiScissors />, t: 'Beauty & Salon Businesses', d: 'Reach customers searching for beauty, salon, and personal care services in your target area.' },
  { icon: <FiHome />, t: 'Hotels & Hospitality', d: 'Improve local visibility for customers researching accommodation and hospitality services.' },
  { icon: <FiTool />, t: 'Home Service Businesses', d: 'Connect with customers searching for local professionals and services in their area.' },
  { icon: <FiBriefcase />, t: 'Professional Services', d: 'Build local visibility for agencies, consultants, legal services, and other professional businesses.' },
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Local SEO',
  provider: { '@type': 'ProfessionalService', name: 'DigionTop', url: 'https://www.digiontop.com' },
  areaServed: 'Delhi, India',
  description: 'Local SEO services including Google Business Profile optimization, local keyword research, citations, local website optimization, review management, and local content strategy.',
}

export default function LocalSeo() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])

  return (
    <main className="lseo">
      <Seo
        title="Local SEO Services Delhi - Grow Your Local Business"
        description="Get professional Local SEO Services Delhi to improve local visibility, reach nearby customers, generate enquiries, and grow your business online."
        path="/services/local-seo"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      {/* ── HERO ── */}
      <section className="lseo-hero">
        <div className="lseo-hero__inner">
          <div className="lseo-hero__text" data-aos="fade-right">
            <h1 className="lseo-hero__title">Local SEO Services Delhi for <span>Better Local Visibility</span></h1>
            <p className="lseo-hero__sub">
              Want your business to appear when local customers search for your products or services on Google? Our Local
              SEO Services Delhi help businesses improve their local online visibility, reach nearby customers, and create
              more opportunities for calls, enquiries, visits, and conversions.
            </p>
            <p className="lseo-hero__sub">
              We create a customized local search strategy based on your business type, target location, competition, and
              audience. From <Link to="/services/seo-services">Google Business Profile optimization</Link> to local keyword
              targeting, citations, reviews, and location-focused website improvements, our approach focuses on making your
              business easier to discover when customers are ready to take action.
            </p>
            <div className="lseo-hero__cta">
              <Link to="/contact" className="lseo-btn lseo-btn--solid">Get Free Local SEO Consultation <FiArrowRight /></Link>
              <Link to="/contact" className="lseo-btn lseo-btn--ghost">Talk to an SEO Expert</Link>
            </div>
            <div className="lseo-hero__trust">
              <span><FiCheck /> Location-Focused Strategy</span>
              <span><FiCheck /> Google Business Profile Optimization</span>
              <span><FiCheck /> Transparent SEO Reporting</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPLETE LOCAL SEO SOLUTIONS ── */}
      <section className="lseo-factors">
        <div className="lseo-container">
          <div className="lseo-head" data-aos="fade-up">
            <h2>Complete Local SEO Solutions for Your Business</h2>
            <p className="lseo-head__sub">Our local SEO services are designed to help businesses strengthen their presence in location-based searches. We focus on the local signals that can help customers discover and understand your business online.</p>
          </div>
          <div className="lseo-sol-grid">
            {SOLUTIONS.map((s, i) => (
              <div className="lseo-sol" key={s.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="lseo-sol__icon">{s.icon}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section className="lseo-factors lseo-factors--alt">
        <div className="lseo-container">
          <div className="lseo-head" data-aos="fade-up">
            <h2>Why Choose Our Local SEO Services?</h2>
            <p className="lseo-head__sub">Local SEO is not simply about adding a city name to every page. Your location, services, customers, competitors, website, and local search behavior all influence the strategy.</p>
          </div>
          <div className="lseo-sol-grid">
            {WHY_US.map((s, i) => (
              <div className="lseo-sol" key={s.t} data-aos="fade-up" data-aos-delay={(i % 4) * 70}>
                <span className="lseo-sol__icon">{s.icon}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS (dark timeline) ── */}
      <section className="lseo-steps">
        <div className="lseo-container">
          <div className="lseo-head lseo-head--light" data-aos="fade-up">
            <h2>Our Local SEO Process</h2>
            <p className="lseo-head__sub lseo-head__sub--light">We follow a structured process to understand your local market, identify opportunities, optimize important assets, and monitor performance.</p>
          </div>
          <div className="lseo-steps__grid">
            {PROCESS.map((s, i) => (
              <div className="lseo-step" key={s.t} data-aos="fade-up" data-aos-delay={i * 60}>
                <span className="lseo-step__n">{s.n}</span>
                <span className="lseo-step__icon">{s.icon}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STRENGTHEN LOCAL PRESENCE ── */}
      <section className="lseo-gbp">
        <div className="lseo-container">
          <div className="lseo-head" data-aos="fade-up">
            <h2>How We Strengthen Your Local Presence</h2>
          </div>
          <div className="lseo-strengthen-grid">
            {STRENGTHEN.map((s, i) => (
              <div className="lseo-sol" key={s.t} data-aos="fade-up" data-aos-delay={(i % 4) * 70}>
                <span className="lseo-sol__icon">{s.icon}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="lseo-factors lseo-factors--alt">
        <div className="lseo-container">
          <div className="lseo-head" data-aos="fade-up">
            <h2>Benefits of Local SEO for Your Business</h2>
          </div>
          <div className="lseo-mini-grid">
            {BENEFITS.map((b, i) => (
              <div className="lseo-mini" key={b.t} data-aos="fade-up" data-aos-delay={(i % 3) * 60}>
                <span className="lseo-mini__icon">{b.icon}</span>
                <div>
                  <h3>{b.t}</h3>
                  <p>{b.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="lseo-factors">
        <div className="lseo-container">
          <div className="lseo-head" data-aos="fade-up">
            <h2>Local SEO for Different Businesses</h2>
          </div>
          <div className="lseo-mini-grid">
            {INDUSTRIES.map((b, i) => (
              <div className="lseo-mini" key={b.t} data-aos="fade-up" data-aos-delay={(i % 3) * 60}>
                <span className="lseo-mini__icon">{b.icon}</span>
                <div>
                  <h3>{b.t}</h3>
                  <p>{b.d}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="lseo-related">
            Explore our related services:{' '}
            <Link to="/services/seo-services">SEO Services</Link>,{' '}
            <Link to="/services/seo-audit">Free SEO Audit</Link>,{' '}
            <Link to="/services/technical-seo">Technical SEO</Link>,{' '}
            <Link to="/services/website-development">Website Design</Link>,{' '}
            <Link to="/services/website-redesign">Website Redesign</Link>,{' '}
            <Link to="/services/google-ads">Google Ads</Link>,{' '}
            <Link to="/services/social-media-marketing">Social Media Marketing</Link>, and{' '}
            <Link to="/services/enterprise-seo">Enterprise SEO</Link>.
          </p>
        </div>
      </section>

      <ServiceFaq service="Local SEO" faqs={FAQS} />

      {/* ── CTA ── */}
      <section className="lseo-cta">
        <div className="lseo-container">
          <div className="lseo-cta__box" data-aos="zoom-in">
            <FiMapPin className="lseo-cta__pin" />
            <h2>Ready to Grow Your Local Visibility?</h2>
            <p>
              Your potential customers are searching for businesses like yours every day. Make it easier for them to
              discover your services, understand what you offer, and take the next step. Our Local SEO Services Delhi are
              designed to strengthen your local online presence through a practical, customer-focused strategy.
            </p>
            <div className="lseo-hero__cta" style={{ justifyContent: 'center' }}>
              <Link to="/contact" className="lseo-btn lseo-btn--light">Get Your Free Local SEO Consultation <FiArrowRight /></Link>
              <Link to="/contact" className="lseo-btn lseo-btn--ghost" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>Contact Our Team</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
