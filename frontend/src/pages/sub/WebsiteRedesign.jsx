import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiRefreshCw, FiZap, FiSmartphone, FiTrendingUp, FiEye, FiThumbsUp,
  FiCheck, FiArrowRight, FiArrowUpRight, FiShield, FiMapPin, FiBriefcase,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/WebDevPages.css'

const FAQS = [
  { q: 'When should I redesign my website?', a: 'Consider a redesign when your website looks outdated, works poorly on mobile devices, loads slowly, has confusing navigation, or no longer supports your business goals. A redesign can improve the overall user experience and website presentation.' },
  { q: 'Will redesigning my website affect SEO?', a: 'It can if important URLs, content, redirects, or technical settings are changed incorrectly. We review existing SEO elements and plan migration carefully. Google recommends mapping changed URLs and implementing appropriate permanent redirects when necessary.' },
  { q: 'How long does a website redesign take?', a: 'The timeline depends on website size, number of pages, design requirements, content, integrations, and development complexity. After reviewing your existing website and requirements, we can provide a practical project timeline.' },
  { q: 'Can you keep my existing website content?', a: 'Yes. We can retain valuable content and improve its structure, formatting, readability, and placement. Where necessary, we can also recommend content updates to make important pages clearer and more useful for visitors.' },
  { q: 'Will the redesigned website work on mobile?', a: 'Yes. Our mobile-friendly website design approach ensures the website adapts to different screen sizes. We test layouts, menus, buttons, forms, images, and important page elements across mobile, tablet, and desktop experiences.' },
]

const SOLUTIONS = [
  { icon: <FiEye />, t: 'Modern Website Redesign', d: 'A dated website can affect how visitors see your business. Our modern website redesign approach improves layouts, typography, navigation, visuals, and content presentation while keeping your brand identity in focus.' },
  { icon: <FiSmartphone />, t: 'Mobile-Friendly Website Design', d: 'Your customers may visit your website from different devices. Our mobile-friendly website design ensures important pages, menus, forms, buttons, and content work smoothly across smartphones, tablets, laptops, and desktops.' },
  { icon: <FiZap />, t: 'Website Performance Optimization', d: 'Slow pages can create a poor user experience. Our website performance optimization focuses on images, code, page structure, scripts, caching, and other technical elements that can affect loading speed.' },
  { icon: <FiThumbsUp />, t: 'SEO-Preserving Redesign', d: 'A redesign should not unnecessarily damage your existing search visibility. We review important URLs, content, metadata, internal links, and redirects before launching the redesigned website.' },
  { icon: <FiTrendingUp />, t: 'Conversion-Focused Structure', d: 'A beautiful website should also help visitors take action. We organize pages around clear messages, strong calls to action, easy navigation, contact forms, and important business information.' },
  { icon: <FiRefreshCw />, t: 'CMS & Easy Management', d: 'We can build the redesigned website with a suitable CMS so your team can update pages, images, services, blogs, and other content without depending on a developer for every small change.' },
]

const WHY = [
  { icon: <FiCheck />, t: 'Experienced Website Redesign Company in Delhi', d: 'As a website redesign company in Delhi, we focus on practical improvements instead of changing the design simply for the sake of making it look different. The goal is to create a website that feels current, professional, and useful.' },
  { icon: <FiEye />, t: 'Better User Experience', d: 'We simplify navigation, improve content placement, organize important information, and make key actions easier to find. A well-planned redesign can make it easier for visitors to understand your services.' },
  { icon: <FiSmartphone />, t: 'Mobile-First Experience', d: 'Our mobile-friendly website design approach considers smaller screens from the beginning. We focus on readable content, touch-friendly buttons, simple menus, responsive sections, and consistent functionality.' },
  { icon: <FiZap />, t: 'Improved Website Speed', d: 'We consider performance during the redesign rather than treating it as an afterthought. Our website performance optimization work can include media optimization, code improvements, script management, caching, and other relevant techniques.' },
]

const PROCESS = [
  { n: '01', t: 'Audit the Existing Website', d: 'We review your current pages, design, navigation, content, mobile experience, performance, technical elements, and conversion opportunities.' },
  { n: '02', t: 'Plan the New Structure', d: 'We create a clearer sitemap and decide which pages need to be retained, improved, combined, added, or reorganized.' },
  { n: '03', t: 'Design the New Experience', d: 'We create updated layouts, visual elements, content sections, navigation, forms, and calls to action based on your brand and business goals.' },
  { n: '04', t: 'Rebuild the Website', d: 'The approved design is developed into a responsive website with cleaner structure, improved functionality, and appropriate CMS or technology.' },
  { n: '05', t: 'SEO & Migration Checks', d: 'Before launch, we review important URLs, redirects, metadata, internal links, indexing settings, and other SEO elements. Google recommends URL mapping and appropriate permanent redirects when URLs change during a site move.' },
  { n: '06', t: 'Test & Launch', d: 'We test the redesigned website across devices and browsers, check forms and links, review performance, and prepare the final website for launch.' },
]

const IMPROVE_LIST = [
  'Outdated website design', 'Poor mobile experience', 'Slow-loading pages', 'Confusing navigation',
  'Weak calls to action', 'Old content structure', 'Difficult CMS management', 'Poor page hierarchy',
  'Broken or outdated links', 'Unclear service pages',
]

const WHO_FOR = [
  { icon: <FiMapPin />, t: 'Local Businesses', d: 'Improve your online presence with a professional website that clearly presents your services, contact details, location, and business information.' },
  { icon: <FiZap />, t: 'Startups', d: 'Create a modern digital presence that matches your new brand and gives your audience a better first impression.' },
  { icon: <FiBriefcase />, t: 'Service Businesses', d: 'Make your services easier to understand with dedicated pages, better navigation, lead forms, and clear calls to action.' },
  { icon: <FiTrendingUp />, t: 'Growing Brands', d: 'Upgrade an outdated website so it can better support SEO, advertising, content marketing, social media traffic, and future business growth.' },
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Website Redesign',
  provider: { '@type': 'ProfessionalService', name: 'DigionTop', url: 'https://www.digiontop.com' },
  areaServed: 'Delhi, India',
  description: 'Website redesign services including modern design, mobile-friendly development, performance optimization, SEO-preserving migration, and conversion-focused structure.',
}

export default function WebsiteRedesign() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="rd">
      <Seo
        title="Website Redesign Service in Delhi | Modern Web Design"
        description="Get website redesign service in Delhi to improve design, speed, mobile experience, SEO structure, navigation, and conversions for your business."
        path="/services/website-redesign"
      />
      <Helmet>
        <meta property="og:title" content="Website Redesign Service in Delhi | Modern Web Design" />
        <meta property="og:description" content="Transform old websites into modern, responsive, fast, user-friendly platforms designed around your business goals." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.digiontop.com/services/website-redesign" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      {/* HERO */}
      <section className="rd-hero rd-hero--light">
        <div className="rd-container rd-hero__inner">
          <div className="rd-hero__text" data-aos="fade-right">
            <span className="rd-tag"><FiRefreshCw /> Website Redesign</span>
            <h1 className="rd-hero__title">Website Redesign Service in <span>Delhi</span></h1>
            <p className="rd-hero__sub">
              Is your website outdated, slow, difficult to use, or not generating enough leads? Our website redesign
              service in Delhi helps transform old websites into modern, responsive, fast, user-friendly platforms
              designed around your business goals.
            </p>
            <div className="rd-hero__cta">
              <Link to="/contact" className="rd-btn rd-btn--solid">Redesign My Website <FiArrowRight /></Link>
              <Link to="/contact" className="rd-btn rd-btn--ghost">Get a Free Website Review</Link>
            </div>
            <div className="rd-hero__trust">
              <span><FiCheck /> Modern Design</span>
              <span><FiCheck /> Mobile Responsive</span>
              <span><FiCheck /> Faster Performance</span>
              <span><FiCheck /> SEO-Friendly</span>
              <span><FiCheck /> Conversion Focused</span>
              <span><FiCheck /> Easy to Manage</span>
            </div>
          </div>
        </div>
      </section>

      {/* GIVE YOUR OLD WEBSITE A BETTER DIGITAL EXPERIENCE */}
      <section className="rd-features">
        <div className="rd-container">
          <div className="rd-head" data-aos="fade-up">
            <span className="rd-eyebrow">What Changes</span>
            <h2>Give Your Old Website a Better Digital Experience</h2>
          </div>
          <div className="rd-features__grid">
            {SOLUTIONS.map((f, i) => (
              <div className="rd-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="rd-feature__icon">{f.icon}</span>
                <h3>{f.t}</h3><p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="rd-why">
        <div className="rd-container">
          <div className="rd-head" data-aos="fade-up">
            <span className="rd-eyebrow">Why Us</span>
            <h2>Why Choose Our Website Redesign Services?</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginTop: 14 }}>
              Our website redesign service in Delhi is focused on improving both appearance and functionality. We
              look at what is working on your current website, identify areas that need improvement, and plan the
              new experience around your customers and business objectives.
            </p>
          </div>
          <div className="rd-why__grid">
            {WHY.map((w, i) => (
              <div className="rd-why__card" key={w.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="rd-why__ic">{w.icon}</span>
                <h3>{w.t}</h3><p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="rd-process">
        <div className="rd-container">
          <div className="rd-head" data-aos="fade-up">
            <span className="rd-eyebrow">Our Process</span>
            <h2>Our Website Redesign Process</h2>
          </div>
          <div className="rd-process__track">
            {PROCESS.map((s, i) => (
              <div className="rd-step" key={s.n} data-aos="fade-up" data-aos-delay={i * 60}>
                <span className="rd-step__num">{s.n}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE CAN IMPROVE */}
      <section className="rd-stack">
        <div className="rd-container">
          <div className="rd-head" data-aos="fade-up">
            <span className="rd-eyebrow">What We Can Improve</span>
            <h2>Our SEO-Friendly Website Redesign Can Focus On</h2>
          </div>
          <div className="rd-stack__grid" data-aos="fade-up">
            {IMPROVE_LIST.map((t) => (<span className="rd-chip" key={t}>{t}</span>))}
          </div>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, textAlign: 'center', maxWidth: 620, margin: '26px auto 0' }}>
            We can also retain valuable existing content while improving its structure, readability, and presentation.
          </p>
        </div>
      </section>

      {/* WHO CAN BENEFIT */}
      <section className="rd-features">
        <div className="rd-container">
          <div className="rd-head" data-aos="fade-up">
            <h2>Who Can Benefit From a Website Redesign?</h2>
          </div>
          <div className="rd-mini-grid">
            {WHO_FOR.map((w, i) => (
              <div className="rd-mini" key={w.t} data-aos="fade-up" data-aos-delay={(i % 3) * 60}>
                <span className="rd-mini__icon">{w.icon}</span>
                <div><h3>{w.t}</h3><p>{w.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO & PERFORMANCE-FOCUSED REDESIGN */}
      <section className="rd-why">
        <div className="rd-container">
          <div className="rd-head" data-aos="fade-up">
            <span className="rd-eyebrow">SEO &amp; Performance</span>
            <h2>SEO &amp; Performance-Focused Redesign</h2>
          </div>
          <div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center' }} data-aos="fade-up">
            <p style={{ color: 'var(--muted)', lineHeight: 1.75, marginBottom: 16 }}>
              A website redesign should consider more than colors and layouts. Our{' '}
              <Link to="/services/technical-seo">SEO-friendly website redesign</Link> approach keeps important search
              and technical elements in mind while improving the user experience.
            </p>
            <p style={{ color: 'var(--muted)', lineHeight: 1.75, marginBottom: 16 }}>
              We review existing URLs and important pages before making structural changes. If URLs change, we plan
              relevant redirects and update internal links so users and search engines can reach the correct
              destinations. Google recommends mapping old URLs to new URLs and using server-side permanent redirects
              when appropriate.
            </p>
            <p style={{ color: 'var(--muted)', lineHeight: 1.75 }}>
              Our website performance optimization process also considers page speed, media, scripts, responsive
              behavior, and technical implementation to create a smoother browsing experience.
            </p>
          </div>
          <p className="rd-note">
            Explore our related services: <Link to="/services/custom-website">Custom Website Development</Link>,{' '}
            <Link to="/services/wordpress-development">WordPress Website Development</Link>,{' '}
            <Link to="/services/custom-web-application">Custom Web Applications</Link>,{' '}
            <Link to="/services/seo-services">SEO Services</Link>,{' '}
            <Link to="/services/technical-seo">Technical SEO</Link>,{' '}
            <Link to="/services/local-seo">Local SEO</Link>,{' '}
            <Link to="/services/ecommerce-seo">Ecommerce SEO</Link>, and{' '}
            <Link to="/services/google-ads">Google Ads</Link>.
          </p>
        </div>
      </section>

      {/* RESULTS & TRUST */}
      <section className="rd-band">
        <div className="rd-container">
          <div className="rd-trustbox" data-aos="fade-up">
            <h2>Results &amp; Trust</h2>
            <p>
              Every redesign project has different goals and starting conditions. We focus on measurable
              improvements such as better usability, clearer navigation, stronger presentation, improved
              performance, and a more effective customer journey.
            </p>
          </div>
        </div>
      </section>

      <ServiceFaq service="Website Redesign" faqs={FAQS} />

      <section className="rd-cta">
        <div className="rd-container">
          <div className="rd-cta__box" data-aos="zoom-in">
            <FiRefreshCw className="rd-cta__ic" />
            <h2>Ready for a Website Redesign?</h2>
            <p>
              Turn your outdated website into a modern digital experience that looks professional, works smoothly,
              and gives visitors a clearer path to contact your business.
            </p>
            <div className="rd-hero__cta">
              <Link to="/contact" className="rd-btn rd-btn--light">Get a Free Website Review <FiArrowUpRight /></Link>
              <Link to="/contact" className="rd-btn rd-btn--ghost-l">Redesign My Website</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
