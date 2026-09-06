import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiLayers, FiTrendingUp, FiUsers, FiGlobe, FiGitBranch,
  FiCheck, FiArrowRight, FiArrowUpRight, FiBarChart2, FiDatabase,
  FiCode, FiSearch, FiFileText, FiLink, FiList, FiZap,
  FiShoppingBag, FiBriefcase, FiMapPin,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/EnterpriseSeo.css'

const FAQS = [
  { q: 'What is enterprise SEO?', a: 'Enterprise SEO is a scalable search optimization approach designed for large or complex websites. It can involve technical SEO, website architecture, keyword mapping, content management, internal linking, international SEO, and ongoing performance monitoring.' },
  { q: 'How is enterprise SEO different from regular SEO?', a: 'Enterprise SEO usually involves greater website scale, more pages, multiple teams, complex technology, and broader business requirements. Because of this, enterprise SEO often requires stronger processes for prioritization, implementation, governance, and monitoring.' },
  { q: 'Can enterprise SEO work for ecommerce websites?', a: 'Yes. Large ecommerce websites can benefit from structured SEO for product pages, categories, filters, variants, internal links, technical crawling, indexing, and content. The strategy should be adapted to the store’s size and website architecture.' },
  { q: 'How long does enterprise SEO take?', a: 'The timeline depends on website size, technical complexity, competition, implementation resources, and business goals. Enterprise SEO is generally an ongoing process because large websites continuously change, expand, and require monitoring.' },
  { q: 'Can you guarantee first-page Google rankings?', a: 'No. Professional SEO should not guarantee specific rankings. Google states that no one can guarantee a first-place ranking, and SEO recommendations should be evaluated against official Search guidance.' },
]

const SOLUTIONS = [
  { icon: <FiCode />, t: 'Technical SEO at Scale', d: 'Large websites can develop complex crawling, indexing, duplicate URL, JavaScript, redirect, and sitemap issues. Our technical SEO for large websites approach identifies these issues and creates a prioritized roadmap for improvement.' },
  { icon: <FiSearch />, t: 'Enterprise Keyword Research', d: 'We research keywords across products, services, locations, categories, and customer journeys. Instead of targeting the same terms repeatedly, we create a structured keyword strategy that maps relevant search intent to appropriate pages.' },
  { icon: <FiLayers />, t: 'Website Architecture', d: 'A scalable website needs a logical structure that allows users and search engines to discover important pages. We review categories, subcategories, URLs, navigation, internal links, and page relationships.' },
  { icon: <FiFileText />, t: 'Content Optimization', d: 'Our enterprise content SEO approach reviews existing content and identifies opportunities to improve relevance, quality, search intent, and content coverage. We can also identify outdated, overlapping, thin, or underperforming pages that may need updating, consolidation, or a different strategic approach.' },
  { icon: <FiLink />, t: 'Internal Linking', d: 'We review internal links between important pages and identify opportunities to create stronger connections between related topics, categories, services, and supporting content.' },
  { icon: <FiGlobe />, t: 'Multi-Location & International SEO', d: 'Businesses operating across multiple cities, regions, or countries may require more structured SEO management. We can help review location pages, language variations, regional targeting, and relevant website structures. Google provides specific guidance for multilingual and multi-regional websites, including the use of localized versions and hreflang where appropriate.' },
]

const WHY_US = [
  { icon: <FiTrendingUp />, t: 'Scalable SEO Planning', d: 'We create strategies that can work across large numbers of pages, categories, products, services, or locations.' },
  { icon: <FiCode />, t: 'Technical Understanding', d: 'We focus on technical factors that can become more complex as websites grow, including crawling, indexing, duplicate URLs, redirects, JavaScript, and site architecture.' },
  { icon: <FiList />, t: 'Clear Priorities', d: 'Not every SEO issue deserves the same level of attention. We organize recommendations according to importance and potential business impact.' },
  { icon: <FiBarChart2 />, t: 'Business-Focused SEO', d: 'Our goal is to connect SEO activity with meaningful business objectives such as organic visibility, qualified traffic, leads, conversions, and revenue opportunities.' },
]

const PROCESS = [
  { n: '01', t: 'Discovery', d: 'We understand your website, business model, target markets, competitors, customer journey, and current SEO position.', icon: <FiSearch /> },
  { n: '02', t: 'Technical Audit', d: 'We analyze crawling, indexing, website architecture, page templates, redirects, sitemaps, internal links, and other technical areas.', icon: <FiCode /> },
  { n: '03', t: 'Keyword Mapping', d: 'We organize relevant keywords according to search intent, page type, business priority, location, product, or service.', icon: <FiDatabase /> },
  { n: '04', t: 'Strategy Development', d: 'We create a scalable SEO roadmap covering technical improvements, content, architecture, internal linking, and other relevant opportunities.', icon: <FiGitBranch /> },
  { n: '05', t: 'Implementation', d: 'We work through prioritized recommendations and coordinate improvements across relevant website sections.', icon: <FiCheck /> },
  { n: '06', t: 'Monitor & Scale', d: 'We monitor performance, identify new opportunities, and continuously refine the strategy as the website and business grow.', icon: <FiBarChart2 /> },
]

const FOCUS_AREAS = [
  { icon: <FiCode />, t: 'Crawl & Indexing', d: 'We identify barriers that can prevent search engines from efficiently discovering and understanding important pages.' },
  { icon: <FiLayers />, t: 'Site Architecture', d: 'We review the relationship between categories, subcategories, products, services, and supporting content to create a more logical structure.' },
  { icon: <FiFileText />, t: 'Content Governance', d: 'Large websites can accumulate outdated or overlapping content. We identify opportunities for updating, consolidating, improving, or managing content more effectively.' },
  { icon: <FiZap />, t: 'Performance & User Experience', d: 'We review important page experience and technical performance areas. Google recommends monitoring site performance through tools such as Search Console and Core Web Vitals.' },
]

const BENEFITS = [
  { icon: <FiLayers />, t: 'Manage SEO at Scale', d: 'Create structured processes for handling SEO across large websites and multiple page types.' },
  { icon: <FiTrendingUp />, t: 'Improve Organic Visibility', d: 'Identify opportunities across important products, services, categories, and informational pages.' },
  { icon: <FiCode />, t: 'Reduce Technical SEO Problems', d: 'Regular technical reviews can help identify issues before they become larger website-wide problems.' },
  { icon: <FiFileText />, t: 'Strengthen Content Performance', d: 'Improve content relevance, structure, and coverage based on search intent and user needs.' },
  { icon: <FiBarChart2 />, t: 'Support Business Growth', d: 'A well-planned organic strategy can create opportunities for qualified traffic, leads, conversions, and long-term visibility.' },
]

const WHO_FOR = [
  { icon: <FiBriefcase />, t: 'Large Corporations', d: 'Manage SEO across complex websites, departments, services, and large content libraries.' },
  { icon: <FiShoppingBag />, t: 'E-commerce Businesses', d: 'Optimize large product catalogs, categories, filters, variants, and supporting content.' },
  { icon: <FiMapPin />, t: 'Multi-Location Businesses', d: 'Build scalable search strategies across multiple cities, regions, or branches.' },
  { icon: <FiDatabase />, t: 'SaaS Companies', d: 'Improve organic visibility across product, feature, solution, comparison, and educational pages.' },
  { icon: <FiUsers />, t: 'Financial & Professional Businesses', d: 'Organize large content libraries and service pages around relevant search intent.' },
  { icon: <FiGlobe />, t: 'Global Organizations', d: 'Manage SEO requirements across multiple markets, languages, and regional websites.' },
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Enterprise SEO',
  provider: { '@type': 'ProfessionalService', name: 'DigionTop', url: 'https://www.digiontop.com' },
  areaServed: 'Delhi, India',
  description: 'Enterprise SEO services for large and complex websites, including technical SEO at scale, keyword mapping, site architecture, content governance, internal linking, and multi-location/international SEO.',
}

export default function EnterpriseSeo() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="ent">
      <Seo
        title="Enterprise SEO Services in Delhi | Scalable SEO Strategy"
        description="Get enterprise SEO services in Delhi designed for large websites, technical SEO, content optimization, site architecture, and scalable organic growth."
        path="/services/enterprise-seo"
      />
      <Helmet>
        <meta property="og:title" content="Enterprise SEO Services in Delhi | Scalable SEO Strategy" />
        <meta property="og:description" content="Technical SEO at scale, enterprise keyword research, site architecture, content governance, and multi-location/international SEO." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.digiontop.com/services/enterprise-seo" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      {/* HERO */}
      <section className="ent-hero">
        <div className="ent-container ent-hero__inner">
          <div className="ent-hero__text" data-aos="fade-right">
            <h1 className="ent-hero__title">Enterprise SEO Services in Delhi for <span>Scalable Organic Growth</span></h1>
            <p className="ent-hero__sub">
              Large websites often have hundreds or thousands of pages, multiple categories, different teams, and
              complex website structures. Managing SEO at this scale requires more than basic keyword optimization.
              Our enterprise SEO services in Delhi are designed to help larger businesses improve organic visibility
              through a structured, scalable, and data-driven SEO strategy.
            </p>
            <p className="ent-hero__sub">
              We focus on technical health, website architecture, content quality, keyword opportunities, internal
              linking, international or multi-location requirements, and performance monitoring. The strategy is
              built around your website's size, business goals, target audience, and existing SEO challenges. Google's
              Search Essentials emphasize helpful content, crawlable links, accessible pages, and appropriate
              technical practices as important foundations for search visibility.
            </p>
            <div className="ent-hero__cta">
              <Link to="/contact" className="ent-btn ent-btn--solid">Discuss Your Enterprise SEO Strategy <FiArrowRight /></Link>
              <Link to="/contact" className="ent-btn ent-btn--ghost">Request SEO Consultation</Link>
            </div>
            <div className="ent-hero__trust">
              <span><FiCheck /> Scalable SEO Strategy</span>
              <span><FiCheck /> Technical &amp; Content Optimization</span>
              <span><FiCheck /> Data-Focused Decision Making</span>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLETE ENTERPRISE SEO SOLUTIONS */}
      <section className="ent-caps">
        <div className="ent-container">
          <div className="ent-head" data-aos="fade-up">
            <h2>Complete Enterprise SEO Solutions</h2>
            <p className="ent-head__sub">Our enterprise SEO strategy is built to manage complex websites while keeping SEO priorities aligned with business objectives. We identify opportunities across technical SEO, content, architecture, and search performance.</p>
          </div>
          <div className="ent-sol-grid">
            {SOLUTIONS.map((c, i) => (
              <div className="ent-sol" key={c.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="ent-sol__icon">{c.icon}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="ent-caps ent-caps--alt">
        <div className="ent-container">
          <div className="ent-head" data-aos="fade-up">
            <h2>Why Choose Our Enterprise SEO Approach?</h2>
            <p className="ent-head__sub">Enterprise SEO requires coordination, prioritization, and scalable processes. The person identifying an SEO issue may not always be the person responsible for implementing the technical change, making clear documentation and prioritization especially important.</p>
          </div>
          <div className="ent-sol-grid">
            {WHY_US.map((c, i) => (
              <div className="ent-sol" key={c.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="ent-sol__icon">{c.icon}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS (dark timeline) */}
      <section className="ent-process">
        <div className="ent-container">
          <div className="ent-head ent-head--light" data-aos="fade-up">
            <h2>Our Enterprise SEO Process</h2>
          </div>
          <div className="ent-process__grid">
            {PROCESS.map((s, i) => (
              <div className="ent-process__step" key={s.t} data-aos="fade-up" data-aos-delay={i * 60}>
                <span className="ent-process__num">{s.n}</span>
                <span className="ent-process__icon">{s.icon}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS WE FOCUS ON */}
      <section className="ent-caps">
        <div className="ent-container">
          <div className="ent-head" data-aos="fade-up">
            <h2>Enterprise SEO Areas We Focus On</h2>
          </div>
          <div className="ent-sol-grid ent-sol-grid--4">
            {FOCUS_AREAS.map((c, i) => (
              <div className="ent-sol" key={c.t} data-aos="fade-up" data-aos-delay={(i % 4) * 70}>
                <span className="ent-sol__icon">{c.icon}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="ent-caps ent-caps--alt">
        <div className="ent-container">
          <div className="ent-head" data-aos="fade-up">
            <h2>Benefits of Enterprise SEO</h2>
          </div>
          <div className="ent-mini-grid">
            {BENEFITS.map((b, i) => (
              <div className="ent-mini" key={b.t} data-aos="fade-up" data-aos-delay={(i % 3) * 60}>
                <span className="ent-mini__icon">{b.icon}</span>
                <div><h3>{b.t}</h3><p>{b.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO CAN BENEFIT */}
      <section className="ent-caps">
        <div className="ent-container">
          <div className="ent-head" data-aos="fade-up">
            <h2>Who Can Benefit From Enterprise SEO?</h2>
          </div>
          <div className="ent-mini-grid">
            {WHO_FOR.map((b, i) => (
              <div className="ent-mini" key={b.t} data-aos="fade-up" data-aos-delay={(i % 3) * 60}>
                <span className="ent-mini__icon">{b.icon}</span>
                <div><h3>{b.t}</h3><p>{b.d}</p></div>
              </div>
            ))}
          </div>
          <p className="ent-note">
            Explore our related services:{' '}
            <Link to="/services/seo-services">SEO Services</Link>,{' '}
            <Link to="/services/technical-seo">Technical SEO</Link>,{' '}
            <Link to="/services/ecommerce-seo">Ecommerce SEO</Link>,{' '}
            <Link to="/services/local-seo">Local SEO</Link>,{' '}
            <Link to="/services/link-building">Link Building</Link>,{' '}
            <Link to="/services/seo-audit">Free SEO Audit</Link>,{' '}
            <Link to="/services/website-development">Website Development</Link>,{' '}
            <Link to="/services/website-redesign">Website Redesign</Link>, and{' '}
            <Link to="/contact">Contact Us</Link>.
          </p>
        </div>
      </section>

      <ServiceFaq service="Enterprise SEO" faqs={FAQS} />

      <section className="ent-cta">
        <div className="ent-container">
          <div className="ent-cta__box" data-aos="zoom-in">
            <FiLayers className="ent-cta__ic" />
            <h2>Scale Your Organic Search Strategy</h2>
            <p>
              Large websites need a structured SEO approach that can grow with the business. From technical
              improvements and content optimization to website architecture and performance monitoring, every part
              of the strategy should work together. Our enterprise SEO services in Delhi help businesses build a
              scalable SEO foundation focused on technical health, relevant content, search visibility, and
              long-term organic growth.
            </p>
            <div className="ent-hero__cta">
              <Link to="/contact" className="ent-btn ent-btn--light">Get Your Enterprise SEO Consultation <FiArrowUpRight /></Link>
              <Link to="/contact" className="ent-btn ent-btn--ghost">Talk to Our SEO Team</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
