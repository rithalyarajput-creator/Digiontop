import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiTerminal, FiCode, FiZap, FiActivity, FiArrowRight,
  FiArrowUpRight, FiCpu, FiLayers, FiShield, FiRefreshCw,
  FiCompass, FiGitBranch, FiAlertTriangle, FiSmartphone,
  FiSearch, FiGitPullRequest, FiMap, FiLink2, FiCheckCircle,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/TechnicalSeo.css'

const FAQS = [
  { q: 'What is technical SEO?', a: 'Technical SEO focuses on improving the technical elements of a website that help search engines crawl, understand, and index its pages. It can include website structure, redirects, indexing, sitemaps, canonicalization, mobile usability, and other technical factors.' },
  { q: 'Why does a website need a technical SEO audit?', a: 'A technical SEO audit can help identify problems that may be difficult to notice during normal website use. Issues with crawling, indexing, redirects, duplicate URLs, or website structure can affect how search engines access and understand important pages.' },
  { q: 'How often should technical SEO be checked?', a: 'The frequency depends on the website size and how often it changes. Websites with regular development updates, new pages, migrations, or major structural changes may benefit from more frequent technical reviews and monitoring.' },
  { q: 'Can technical SEO improve Google rankings?', a: 'Technical SEO can help create a stronger foundation for search visibility by addressing problems that affect crawling, indexing, accessibility, and page experience. However, rankings depend on many factors, so no specific ranking improvement can be guaranteed.' },
  { q: 'Do new websites need technical SEO?', a: 'Yes. Reviewing technical SEO during the early stages of a website can help identify structural, indexing, sitemap, mobile, and URL-related issues before the website grows larger and becomes more difficult to manage.' },
]

const SOLUTIONS = [
  { icon: <FiLayers />, t: 'Website Technical SEO', d: 'Covers website architecture, crawl paths, indexing signals, redirects, broken links, canonical URLs, XML sitemaps, robots.txt and mobile usability, so search engines can discover important pages more efficiently.' },
  { icon: <FiCompass />, t: 'Crawlability & Indexing', d: 'We review whether important pages can be crawled and indexed properly, and check for unwanted blocks, indexing issues, duplicate URLs and other signals that may prevent search engines from understanding your website correctly.' },
  { icon: <FiGitBranch />, t: 'Website Structure', d: 'A logical website hierarchy helps connect related pages and makes important content easier to discover. We review categories, navigation, internal links, URLs and page relationships.' },
  { icon: <FiAlertTriangle />, t: 'Technical Errors', d: 'We identify issues such as broken links, incorrect redirects, server-related errors, duplicate URLs and other technical problems that may affect website accessibility.' },
  { icon: <FiSmartphone />, t: 'Mobile Experience', d: 'Your website should work properly across different screen sizes. We review mobile usability and identify technical or layout-related issues that could create a poor experience for mobile visitors.' },
]

const WHY_US = [
  { icon: <FiSearch />, t: 'Detailed Website Analysis', d: 'We do not recommend random technical changes. We first understand your website structure, current problems, business goals and search visibility before creating an optimization plan.' },
  { icon: <FiCheckCircle />, t: 'Practical Recommendations', d: 'Every website has different technical requirements. We prioritize issues based on relevance and potential impact rather than trying to change everything at once.' },
  { icon: <FiActivity />, t: 'Clear Communication', d: 'Technical SEO can be difficult to understand. We explain important issues in simple language so you know what needs attention and why.' },
  { icon: <FiRefreshCw />, t: 'Continuous Improvement', d: 'Technical optimization is not always a one-time task. Website changes, migrations, new pages, plugins and CMS updates can introduce new issues that may need ongoing monitoring.' },
]

const PROCESS = [
  { n: '01', t: 'Website Crawl', d: 'We examine the website to identify technical errors, broken links, indexing problems, duplicate URLs and structural issues.' },
  { n: '02', t: 'Technical Analysis', d: 'We review the findings and identify which issues require immediate attention and which can be handled later.' },
  { n: '03', t: 'Strategy Planning', d: 'We create a practical roadmap covering technical improvements, priorities, recommendations and implementation requirements.' },
  { n: '04', t: 'Optimization', d: 'Relevant technical improvements are implemented across the website based on the approved strategy.' },
  { n: '05', t: 'Testing', d: 'We check important changes to make sure pages, links, redirects, indexing signals and other elements are working correctly.' },
  { n: '06', t: 'Monitoring', d: 'We monitor the website after implementation and identify additional opportunities for improvement.' },
]

const AREAS = [
  { icon: <FiCompass />, t: 'Crawling', d: 'Help search engines discover important pages while reducing unnecessary crawling paths.' },
  { icon: <FiSearch />, t: 'Indexing', d: 'Review whether important pages are eligible for indexing and whether unwanted pages are being indexed.' },
  { icon: <FiGitPullRequest />, t: 'Canonicalization', d: 'Check canonical signals and identify potential duplicate URL problems.' },
  { icon: <FiRefreshCw />, t: 'Redirects', d: 'Review incorrect, broken or unnecessary redirects and improve URL handling where required.' },
  { icon: <FiMap />, t: 'XML Sitemap', d: 'Check whether the sitemap contains the right URLs and is configured correctly.' },
  { icon: <FiLink2 />, t: 'Internal Linking', d: 'Improve connections between relevant pages to support navigation and content discovery.' },
]

const BENEFITS = [
  { t: 'Small Businesses', d: 'Improve the technical foundation of your website before investing heavily in content and other marketing activities.' },
  { t: 'E-commerce Websites', d: 'Manage large numbers of product, category, filter and pagination URLs more effectively.' },
  { t: 'Service Businesses', d: 'Keep important service pages accessible, structured and technically optimized.' },
  { t: 'Large Websites', d: 'Identify technical problems that can become difficult to manage as the number of pages increases.' },
  { t: 'New Websites', d: 'Build a cleaner technical foundation from the beginning.' },
  { t: 'Website Redesigns', d: 'Review technical SEO before and after major website structure or URL changes.' },
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Technical SEO',
  provider: { '@type': 'ProfessionalService', name: 'DigionTop', url: 'https://www.digiontop.com' },
  areaServed: 'IN',
  description: 'Technical SEO services covering crawling, indexing, canonicalization, redirects, sitemap, internal linking and website speed optimization for businesses across India.',
}

export default function TechnicalSeo() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="tseo">
      <Seo
        title="Technical SEO Services in India | DigionTop"
        description="Fix crawling, indexing, site speed & structure issues with DigionTop's technical SEO services in India. Get a detailed technical SEO audit today."
        path="/services/technical-seo"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      {/* HERO — terminal theme */}
      <section className="tseo-hero">
        <div className="tseo-hero__grid" />
        <div className="tseo-container tseo-hero__inner">
          <div className="tseo-hero__text" data-aos="fade-right">
            <span className="tseo-tag"><FiTerminal /> Technical SEO</span>
            <h1 className="tseo-hero__title">Technical SEO Services for a <span>Stronger Website</span></h1>
            <p className="tseo-hero__sub">A technically healthy website gives search engines a better foundation to crawl, understand and index your important pages. DigionTop's technical SEO service focuses on identifying website issues that may affect search visibility, user experience and organic performance.</p>
            <div className="tseo-hero__cta">
              <Link to="/contact" className="tseo-btn tseo-btn--solid">Get a Technical SEO Audit <FiArrowRight /></Link>
              <Link to="/contact" className="tseo-btn tseo-btn--ghost">Talk to an SEO Expert</Link>
            </div>
            <div className="tseo-hero__trust">
              <span>Detailed Website Analysis</span>
              <span className="tseo-hero__dot" aria-hidden="true">•</span>
              <span>Technical Issue Identification</span>
              <span className="tseo-hero__dot" aria-hidden="true">•</span>
              <span>Practical SEO Recommendations</span>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLETE TECHNICAL SEO SOLUTIONS */}
      <section className="tseo-fixes">
        <div className="tseo-container">
          <div className="tseo-head" data-aos="fade-up">
            <span className="tseo-eyebrow">// solutions</span>
            <h2>Complete Technical SEO Solutions for Your Website</h2>
            <p className="tseo-head__sub">Technical SEO involves the behind-the-scenes elements that help search engines access and understand your website. DigionTop's approach starts with identifying technical problems and then prioritizing improvements according to their potential impact.</p>
          </div>
          <div className="tseo-fixes__grid">
            {SOLUTIONS.map((f, i) => (
              <div className="tseo-fix" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="tseo-fix__icon">{f.icon}</span>
                <h3>{f.t}</h3><p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIT + SPEED */}
      <section className="tseo-fixes tseo-fixes--alt">
        <div className="tseo-container">
          <div className="tseo-head" data-aos="fade-up">
            <span className="tseo-eyebrow">// audit &amp; speed</span>
            <h2>Technical SEO Services That Fix Website Issues</h2>
            <p className="tseo-head__sub">
              DigionTop's technical SEO services focus on the technical foundation of your website rather than simply adding more keywords. We review crawling, indexing, redirects, canonicalization, sitemap configuration, internal linking, structured data and other relevant technical elements based on your website's requirements. Google explains that canonicalization helps determine the representative URL when multiple URLs contain similar or duplicate content.
            </p>
          </div>
          <div className="tseo-fixes__grid tseo-fixes__grid--2">
            <div className="tseo-fix" data-aos="fade-up">
              <span className="tseo-fix__icon"><FiSearch /></span>
              <h3>Technical SEO Audit</h3>
              <p>Our <Link to="/services/seo-services">SEO audit services</Link> help identify technical weaknesses across your website: crawling, indexing, page errors, redirects, metadata, internal links, sitemap configuration and other important technical areas, organized by priority so the most important issues are addressed first.</p>
            </div>
            <div className="tseo-fix" data-aos="fade-up" data-aos-delay="70">
              <span className="tseo-fix__icon"><FiZap /></span>
              <h3>Website Speed Optimization</h3>
              <p>Our website speed optimization work focuses on identifying performance-related issues that can affect page experience: page resources, loading behavior, mobile performance and other factors that may need technical improvement, for a faster, more efficient site.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="tseo-fixes">
        <div className="tseo-container">
          <div className="tseo-head" data-aos="fade-up">
            <span className="tseo-eyebrow">// why us</span>
            <h2>Why Choose Our Technical SEO Approach?</h2>
          </div>
          <div className="tseo-fixes__grid">
            {WHY_US.map((f, i) => (
              <div className="tseo-fix" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="tseo-fix__icon">{f.icon}</span>
                <h3>{f.t}</h3><p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="tseo-process">
        <div className="tseo-container">
          <div className="tseo-head" data-aos="fade-up">
            <span className="tseo-eyebrow">// how it works</span>
            <h2>Our Technical SEO Process</h2>
          </div>
          <div className="tseo-process__grid">
            {PROCESS.map((p, i) => (
              <div className="tseo-process__step" key={p.n} data-aos="fade-up" data-aos-delay={(i % 6) * 60}>
                <span className="tseo-process__num">{p.n}</span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNICAL AREAS */}
      <section className="tseo-fixes tseo-fixes--alt">
        <div className="tseo-container">
          <div className="tseo-head" data-aos="fade-up">
            <span className="tseo-eyebrow">// coverage</span>
            <h2>Technical Areas We Can Improve</h2>
          </div>
          <div className="tseo-mini-grid">
            {AREAS.map((a, i) => (
              <div className="tseo-mini" key={a.t} data-aos="fade-up" data-aos-delay={(i % 3) * 60}>
                <span className="tseo-mini__icon">{a.icon}</span>
                <div>
                  <h3>{a.t}</h3>
                  <p>{a.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO BENEFITS */}
      <section className="tseo-fixes">
        <div className="tseo-container">
          <div className="tseo-head" data-aos="fade-up">
            <span className="tseo-eyebrow">// who it is for</span>
            <h2>Who Can Benefit From Technical SEO?</h2>
          </div>
          <div className="tseo-benefits">
            {BENEFITS.map((b) => (
              <div className="tseo-benefit" key={b.t}>
                <h3>{b.t}</h3>
                <p>{b.d}</p>
              </div>
            ))}
          </div>
          <p className="tseo-benefits__note">Google recommends careful URL mapping, redirects, sitemap updates and monitoring during significant site moves — see our <Link to="/services/website-redesign">website redesign services</Link> if you are planning one.</p>
        </div>
      </section>

      {/* CWV band */}
      <section className="tseo-cwv">
        <div className="tseo-container tseo-cwv__inner">
          <div data-aos="fade-right">
            <span className="tseo-eyebrow tseo-eyebrow--light">// core web vitals</span>
            <h2>We Get You Into the Green</h2>
            <p>Page experience is a confirmed ranking factor. We push every metric past Google's threshold, measurably.</p>
          </div>
          <div className="tseo-meters" data-aos="fade-left">
            {[{ k: 'LCP', v: 'Largest Contentful Paint', p: 96 }, { k: 'CLS', v: 'Cumulative Layout Shift', p: 99 }, { k: 'INP', v: 'Interaction to Next Paint', p: 94 }].map((m) => (
              <div className="tseo-meter" key={m.k}>
                <div className="tseo-meter__top"><b>{m.k}</b><span>{m.p}</span></div>
                <div className="tseo-meter__track"><span style={{ width: `${m.p}%` }} /></div>
                <small>{m.v}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq service="Technical SEO" faqs={FAQS} />

      <section className="tseo-cta">
        <div className="tseo-container">
          <div className="tseo-cta__box" data-aos="zoom-in">
            <FiActivity className="tseo-cta__ic" />
            <h2>Build a Stronger Technical Foundation</h2>
            <p>Your website needs more than attractive design and good content. It also needs a strong technical foundation that lets search engines access and understand your important pages. DigionTop's technical SEO service is designed to identify technical problems, prioritize improvements and create a healthier foundation for long-term organic visibility.</p>
            <div className="tseo-hero__cta" style={{ justifyContent: 'center' }}>
              <Link to="/contact" className="tseo-btn tseo-btn--light">Get Your Technical SEO Audit <FiArrowUpRight /></Link>
              <Link to="/contact" className="tseo-btn tseo-btn--ghost">Contact Our SEO Team</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
