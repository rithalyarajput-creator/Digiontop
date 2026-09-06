import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiClipboard, FiSearch, FiZap, FiLink, FiFileText, FiSmartphone,
  FiCheck, FiArrowRight, FiArrowUpRight, FiPieChart, FiAlertTriangle,
  FiCode, FiFile, FiEye, FiShield, FiList,
  FiBriefcase, FiMapPin, FiTool, FiGlobe, FiShoppingBag,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import SeoAuditTool from '../../components/SeoAuditTool'
import Seo from '../../components/Seo'
import '../../styles/SeoAudit.css'

const FAQS = [
  { q: 'What is an SEO audit?', a: 'An SEO audit is a detailed review of a website’s technical, content, on-page, and search-related elements. It helps identify problems, opportunities, and areas that may need improvement to create a stronger SEO foundation.' },
  { q: 'Is the SEO audit really free?', a: 'The instant audit tool above is completely free and reviews key on-page and technical signals right away. A deeper, manual technical audit, covering competitors, backlinks, and full crawl analysis, is a separate paid deliverable if your website needs it.' },
  { q: 'How long does an SEO audit take?', a: 'The time depends on the website’s size, number of pages, technical complexity, and depth of analysis required. A basic review can be quicker, while larger websites may require more detailed crawling and investigation.' },
  { q: 'Will an SEO audit guarantee higher rankings?', a: 'No. An audit identifies issues and opportunities, but it cannot guarantee rankings. Search performance depends on many factors, including competition, content quality, technical health, relevance, and Google’s ranking systems.' },
  { q: 'What happens after the SEO audit?', a: 'After the audit, you can prioritize the recommendations and create an SEO action plan. Depending on your requirements, the next step may include technical fixes, on-page optimization, content improvements, link building, or ongoing SEO.' },
]

const COVERAGE = [
  { icon: <FiCode />, t: 'Technical SEO Audit', d: 'We check important technical elements such as crawlability, indexing, broken links, redirects, sitemap, robots.txt, canonicalization, HTTPS, and mobile usability. Google recommends making important pages and resources accessible for crawling and using sitemaps to help Google discover important URLs.' },
  { icon: <FiFileText />, t: 'On-Page SEO Audit', d: 'Our on-page SEO audit reviews titles, headings, content, URLs, internal links, image optimization, keyword relevance, and other page-level elements. The goal is to understand whether your pages clearly communicate their topics and provide useful information to visitors.' },
  { icon: <FiZap />, t: 'Website Speed Review', d: 'We review page performance and identify areas that may affect loading experience. Google provides tools such as PageSpeed Insights and the Core Web Vitals report to help website owners understand page performance.' },
  { icon: <FiFile />, t: 'Content Audit', d: 'We review your existing content to identify pages that may need improvement, expansion, updating, consolidation, or better search intent alignment. Useful, reliable, people-first content is one of Google’s core SEO recommendations.' },
  { icon: <FiSearch />, t: 'Keyword & Search Visibility', d: 'We examine your existing keyword targeting and identify opportunities where your pages may be better aligned with relevant searches.' },
  { icon: <FiSmartphone />, t: 'Mobile SEO Review', d: 'We check how your website performs and appears across mobile devices, including usability, layout, navigation, and other important areas.' },
]

const WHY_US = [
  { icon: <FiCheck />, t: 'Clear Findings Instead of Complicated Reports', d: 'An SEO audit should help you understand what needs attention. We keep our recommendations practical and explain the issues in simple language.' },
  { icon: <FiSearch />, t: 'Detailed Website Review', d: 'We look beyond surface-level SEO issues and review important technical, content, on-page, and user-experience elements.' },
  { icon: <FiPieChart />, t: 'Priority-Based Recommendations', d: 'Not every issue has the same importance. We help organize findings according to what should be addressed first.' },
  { icon: <FiEye />, t: 'Easy-to-Understand Insights', d: 'You don’t need to be an SEO expert to understand your audit. We explain the main issues and recommended next steps clearly.' },
  { icon: <FiShield />, t: 'No Unrealistic Promises', d: 'An audit can identify opportunities, but it cannot guarantee a specific Google ranking. Google itself advises being cautious about SEOs who promise first-place rankings.' },
]

const PROCESS = [
  { n: '01', t: 'Website Discovery', d: 'We understand your website, business type, services, target audience, and current search goals.', icon: <FiSearch /> },
  { n: '02', t: 'Website Crawling', d: 'We examine important website URLs and identify technical and structural issues that may require attention.', icon: <FiLink /> },
  { n: '03', t: 'SEO Analysis', d: 'We review technical SEO, on-page elements, content, keywords, links, mobile usability, and other relevant areas.', icon: <FiClipboard /> },
  { n: '04', t: 'Competitor Review', d: 'Where appropriate, we compare your website with relevant competitors to identify potential content, keyword, and optimization opportunities.', icon: <FiPieChart /> },
  { n: '05', t: 'Issue Prioritization', d: 'We organize important findings so you can understand which problems deserve attention first.', icon: <FiList /> },
  { n: '06', t: 'Action Plan', d: 'You receive practical recommendations that can be used to improve the website and plan your next SEO steps.', icon: <FiCheck /> },
]

const LEARN = [
  { icon: <FiZap />, t: 'Technical Issues', d: 'Find problems related to crawling, indexing, redirects, broken pages, sitemap configuration, and other technical elements.' },
  { icon: <FiFileText />, t: 'On-Page Problems', d: 'Understand whether your titles, headings, content, URLs, images, and internal links are properly optimized.' },
  { icon: <FiFile />, t: 'Content Opportunities', d: 'Identify pages with thin, outdated, repetitive, or poorly targeted content that may benefit from improvement.' },
  { icon: <FiSearch />, t: 'Keyword Opportunities', d: 'Discover whether your important pages are targeting relevant search terms and whether additional opportunities exist.' },
]

const BENEFITS = [
  { icon: <FiAlertTriangle />, t: 'Identify Hidden Problems', d: 'Some SEO issues are not obvious when simply browsing a website. An audit can uncover technical and structural problems that require attention.' },
  { icon: <FiLink />, t: 'Improve Website Structure', d: 'A better-organized website can make navigation easier for users and help search engines understand relationships between pages.' },
  { icon: <FiPieChart />, t: 'Find Optimization Opportunities', d: 'An audit can reveal areas where existing pages, content, keywords, and technical elements can be improved.' },
  { icon: <FiClipboard />, t: 'Create a Clear SEO Roadmap', d: 'Instead of making random changes, you can use audit findings to create a more organized optimization plan.' },
  { icon: <FiCheck />, t: 'Make Better SEO Decisions', d: 'A professional review gives you useful information before committing to larger SEO activities.' },
]

const WHO_FOR = [
  { icon: <FiBriefcase />, t: 'Small Businesses', d: 'Understand the current condition of your website before investing in ongoing SEO.' },
  { icon: <FiZap />, t: 'Startups', d: 'Identify technical and content issues early while building your online presence.' },
  { icon: <FiShoppingBag />, t: 'E-commerce Websites', d: 'Review product pages, categories, internal linking, indexing, and technical website structure.' },
  { icon: <FiMapPin />, t: 'Local Businesses', d: 'Find opportunities to improve website visibility for location-based searches.' },
  { icon: <FiTool />, t: 'Service Businesses', d: 'Evaluate important service pages and identify content and on-page optimization opportunities.' },
  { icon: <FiGlobe />, t: 'Existing Websites', d: 'If your traffic or visibility has changed, an audit can help identify areas that deserve further investigation.' },
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'SEO Audit',
  provider: { '@type': 'ProfessionalService', name: 'DigionTop', url: 'https://www.digiontop.com' },
  areaServed: 'Delhi, India',
  description: 'Free SEO audit service covering technical SEO, on-page SEO, website speed, content, keyword visibility, and mobile SEO review.',
}

export default function SeoAudit() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="aud">
      <Seo
        title="Free SEO Audit Service in Delhi | Check Your Website"
        description="Get a free SEO audit service in Delhi to identify technical, on-page, content, keyword, and website issues with practical SEO recommendations."
        path="/services/seo-audit"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      {/* HERO */}
      <section className="aud-hero">
        <div className="aud-container aud-hero__inner">
          <div className="aud-hero__text" data-aos="fade-right">
            <h1 className="aud-hero__title">Free SEO Audit Service in Delhi for <span>Your Website</span></h1>
            <p className="aud-hero__sub">
              Is your website getting less traffic than expected, or are your important pages struggling to appear in
              search results? Our free SEO audit service in Delhi helps you understand the key areas that may need
              improvement before you invest in a complete SEO campaign.
            </p>
            <p className="aud-hero__sub">
              We review important aspects of your website, including technical health, on-page optimization, content,
              keywords, internal linking, mobile experience, and search visibility. The purpose of an audit is not to
              promise rankings, but to identify practical opportunities and issues that can be addressed through a clear
              SEO strategy. Google recommends checking how search engines crawl, index, and understand your website,
              while Search Console can help website owners monitor their performance in Google Search.
            </p>
            <div className="aud-hero__cta">
              <a href="#free-seo-audit" className="aud-btn aud-btn--solid">Get Your Free SEO Audit <FiArrowRight /></a>
              <a href="#free-seo-audit" className="aud-btn aud-btn--ghost">Check My Website</a>
            </div>
            <div className="aud-hero__trust">
              <span><FiCheck /> No-Obligation Website Review</span>
              <span><FiCheck /> Practical SEO Recommendations</span>
              <span><FiCheck /> Easy-to-Understand Audit</span>
            </div>
          </div>
        </div>
      </section>

      {/* FREE INSTANT AUDIT TOOL — the free scope of this page is exactly this
          automated check; a deeper manual/technical audit is a separate paid
          deliverable (see the "Is the SEO audit really free?" FAQ below). */}
      <div id="free-seo-audit">
        <SeoAuditTool />
      </div>

      {/* WHAT OUR AUDIT COVERS */}
      <section className="aud-areas">
        <div className="aud-container">
          <div className="aud-head" data-aos="fade-up">
            <h2>What Our SEO Audit Covers</h2>
            <p className="aud-head__sub">Our SEO audit services are designed to give you a clear picture of your website's current SEO condition. Instead of focusing only on one issue, we review multiple areas that can influence search visibility and user experience.</p>
          </div>
          <div className="aud-sol-grid">
            {COVERAGE.map((c, i) => (
              <div className="aud-sol" key={c.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="aud-sol__icon">{c.icon}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="aud-areas aud-areas--alt">
        <div className="aud-container">
          <div className="aud-head" data-aos="fade-up">
            <h2>Why Choose Our SEO Audit?</h2>
          </div>
          <div className="aud-sol-grid aud-sol-grid--center-last">
            {WHY_US.map((c, i) => (
              <div className="aud-sol" key={c.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="aud-sol__icon">{c.icon}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS (dark timeline) */}
      <section className="aud-process">
        <div className="aud-container">
          <div className="aud-head aud-head--light" data-aos="fade-up">
            <h2>Our SEO Audit Process</h2>
          </div>
          <div className="aud-process__grid">
            {PROCESS.map((s, i) => (
              <div className="aud-process__step" key={s.t} data-aos="fade-up" data-aos-delay={i * 60}>
                <span className="aud-process__num">{s.n}</span>
                <span className="aud-process__icon">{s.icon}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU CAN LEARN */}
      <section className="aud-areas">
        <div className="aud-container">
          <div className="aud-head" data-aos="fade-up">
            <h2>What You Can Learn From an SEO Audit</h2>
          </div>
          <div className="aud-sol-grid">
            {LEARN.map((c, i) => (
              <div className="aud-sol" key={c.t} data-aos="fade-up" data-aos-delay={(i % 4) * 70}>
                <span className="aud-sol__icon">{c.icon}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="aud-areas aud-areas--alt">
        <div className="aud-container">
          <div className="aud-head" data-aos="fade-up">
            <h2>Benefits of a Professional SEO Audit</h2>
          </div>
          <div className="aud-mini-grid">
            {BENEFITS.map((b, i) => (
              <div className="aud-mini" key={b.t} data-aos="fade-up" data-aos-delay={(i % 3) * 60}>
                <span className="aud-mini__icon">{b.icon}</span>
                <div><h3>{b.t}</h3><p>{b.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO SHOULD GET ONE */}
      <section className="aud-areas">
        <div className="aud-container">
          <div className="aud-head" data-aos="fade-up">
            <h2>Who Should Get an SEO Audit?</h2>
          </div>
          <div className="aud-mini-grid">
            {WHO_FOR.map((b, i) => (
              <div className="aud-mini" key={b.t} data-aos="fade-up" data-aos-delay={(i % 3) * 60}>
                <span className="aud-mini__icon">{b.icon}</span>
                <div><h3>{b.t}</h3><p>{b.d}</p></div>
              </div>
            ))}
          </div>
          <p className="aud-note">
            Explore our related services:{' '}
            <Link to="/services/seo-services">SEO Services</Link>,{' '}
            <Link to="/services/technical-seo">Technical SEO</Link>,{' '}
            <Link to="/services/local-seo">Local SEO</Link>,{' '}
            <Link to="/services/ecommerce-seo">Ecommerce SEO</Link>,{' '}
            <Link to="/services/link-building">Link Building</Link>,{' '}
            <Link to="/services/website-redesign">Website Redesign</Link>,{' '}
            <Link to="/services/website-development">Website Development</Link>, and{' '}
            <Link to="/services/enterprise-seo">Enterprise SEO</Link>.
          </p>
        </div>
      </section>

      {/* WHAT YOU RECEIVE */}
      <section className="aud-deliver">
        <div className="aud-container aud-deliver__inner">
          <div data-aos="fade-right">
            <span className="aud-eyebrow aud-eyebrow--light">What You Receive</span>
            <h2>A Clear, Practical Audit Report</h2>
            <a href="#free-seo-audit" className="aud-btn aud-btn--solid">Get Your Free SEO Audit <FiArrowUpRight /></a>
          </div>
          <ul className="aud-deliver__list" data-aos="fade-left">
            {['Website Overview', 'Technical Findings', 'On-Page Insights', 'Content Opportunities', 'Priority Recommendations', 'Next-Step Strategy'].map((x) => (
              <li key={x}><FiCheck /> {x}</li>
            ))}
          </ul>
        </div>
      </section>

      <ServiceFaq service="SEO Audit Services" faqs={FAQS} />

      <section className="aud-cta">
        <div className="aud-container">
          <div className="aud-cta__box" data-aos="zoom-in">
            <FiAlertTriangle className="aud-cta__ic" />
            <h2>Find Your Website's SEO Opportunities</h2>
            <p>
              Don't make SEO changes without understanding what your website actually needs. Our free SEO audit service
              in Delhi gives you a practical starting point to identify important issues, understand improvement
              opportunities, and plan your next SEO steps.
            </p>
            <div className="aud-hero__cta">
              <a href="#free-seo-audit" className="aud-btn aud-btn--light">Get Your Free SEO Audit <FiArrowRight /></a>
              <Link to="/contact" className="aud-btn aud-btn--ghost">Request Website Analysis</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
