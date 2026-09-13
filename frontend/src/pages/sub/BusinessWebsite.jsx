import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Seo from '../../components/Seo'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiBriefcase, FiPhone, FiUsers, FiAward, FiTrendingUp, FiStar,
  FiCheck, FiArrowRight, FiArrowUpRight, FiMapPin,
  FiShield, FiZap, FiCheckCircle, FiSmartphone,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/WebDevPages.css'

const FAQS = [
  { q: 'What is a business website?', a: 'A business website is an online presence that introduces your company, services, products, team, contact information, and other important details. It can also help customers make enquiries, call your business, request information, or book a service.' },
  { q: 'How many pages does a business website need?', a: 'The number of pages depends on your business and services. A typical website may include Home, About, Services, individual service pages, Contact, and optional Blog, Portfolio, FAQ, or Location pages.' },
  { q: 'Can the website generate leads?', a: 'Yes. A lead generation website can include enquiry forms, WhatsApp buttons, phone numbers, booking options, and clear calls to action. The exact setup depends on how customers normally contact your business.' },
  { q: 'Will the website work on mobile devices?', a: 'Yes. Our responsive website development approach ensures the website adapts to smartphones, tablets, laptops, and desktop screens. We test important layouts, navigation, forms, buttons, and content presentation before launch.' },
  { q: 'Can I update the website myself?', a: 'Yes. We can provide a suitable CMS or manageable website setup so you can update supported content such as services, images, contact details, and blog posts without needing a developer for every change.' },
]

const SOLUTIONS = [
  { icon: <FiBriefcase />, t: 'Professional Business Website Design', d: 'A professional website should represent your brand clearly and give visitors confidence. Our professional business website design focuses on clean layouts, strong visual hierarchy, simple navigation, and clear information about your products or services.' },
  { icon: <FiPhone />, t: 'Lead Generation Website', d: 'Your website should help turn visitors into enquiries. We create a lead generation website with clear calls to action, enquiry forms, click-to-call options, WhatsApp integration, and strategically placed contact sections.' },
  { icon: <FiSmartphone />, t: 'Responsive Website Development', d: 'Customers can visit your website from phones, tablets, laptops, or desktops. Our responsive website development approach ensures your pages, menus, forms, images, and buttons adapt smoothly to different screen sizes.' },
  { icon: <FiMapPin />, t: 'Local SEO Ready Website', d: 'For businesses targeting customers in specific areas, your website needs a strong local foundation. We structure important business information, service pages, location details, and contact information to support your local marketing efforts.' },
  { icon: <FiUsers />, t: 'Clear Service Pages', d: 'Every important service deserves a dedicated and easy-to-understand page. We organize your services with clear headings, benefits, supporting information, FAQs, and calls to action so visitors can quickly understand what you offer.' },
  { icon: <FiStar />, t: 'Reviews & Trust Elements', d: 'Customer reviews, certifications, experience, portfolio examples, and business credentials can help visitors feel more confident. We create suitable sections where genuine trust signals can be presented clearly.' },
]

const WHY = [
  { icon: <FiBriefcase />, t: 'Professional Business Website Design', d: 'A professional business website design gives your brand a stronger online presence and helps customers understand your business quickly. We focus on a clean interface, readable content, consistent branding, and useful page structure.' },
  { icon: <FiPhone />, t: 'Built for Enquiries', d: 'We plan important pages around the actions you want visitors to take. Contact forms, phone numbers, WhatsApp buttons, service pages, and clear CTAs can be positioned where they make sense within the customer journey.' },
  { icon: <FiSmartphone />, t: 'Mobile-Friendly Experience', d: 'A website should remain easy to use on smaller screens. Our responsive website development focuses on readable text, touch-friendly buttons, simple navigation, and properly arranged content across devices.' },
  { icon: <FiCheckCircle />, t: 'Easy to Update', d: 'Your business information may change over time. We can use a suitable CMS or website setup that allows your team to update services, images, contact information, blogs, and other suitable content without unnecessary complexity.' },
]

const PROCESS = [
  { n: '01', t: 'Business Discovery', d: 'We understand your business, services, ideal customers, competitors, goals, and the type of enquiries you want to generate.' },
  { n: '02', t: 'Sitemap & Structure', d: 'We plan the main pages, service sections, navigation, enquiry paths, and content hierarchy so every important page has a clear purpose.' },
  { n: '03', t: 'Wireframe & Design', d: 'We create the page layout and visual direction around your brand, customer journey, important information, and conversion goals.' },
  { n: '04', t: 'Website Development', d: 'The approved design is developed into a responsive website with forms, contact options, integrations, content sections, and required functionality.' },
  { n: '05', t: 'Testing & Optimization', d: 'We check mobile responsiveness, navigation, forms, buttons, links, page performance, content presentation, and important technical elements.' },
  { n: '06', t: 'Launch & Support', d: 'After final approval, we prepare the website for launch and provide guidance for future content updates and improvements.' },
]

const INCLUDE_LIST = [
  'Home page', 'About Us page', 'Service pages', 'Contact page', 'Lead enquiry forms', 'WhatsApp integration',
  'Click-to-call buttons', 'Customer reviews', 'Portfolio or case studies', 'Blog section',
  'Location information', 'Google Analytics integration', 'Google Business Profile support', 'SEO-ready page structure',
]

const WHO_FOR = [
  { icon: <FiMapPin />, t: 'Local Businesses', d: 'Create a strong online presence where nearby customers can understand your services, find your contact details, and take action.' },
  { icon: <FiZap />, t: 'Startups', d: 'Launch with a modern website that communicates your new brand clearly and gives you room to add pages and features later.' },
  { icon: <FiAward />, t: 'Service Providers', d: 'Present your expertise through dedicated service pages, clear benefits, FAQs, contact options, and strong calls to action.' },
  { icon: <FiTrendingUp />, t: 'Growing Businesses', d: 'Upgrade your online presence with a scalable website that can support SEO, advertising, social media traffic, content marketing, and future expansion.' },
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Business Website Development',
  provider: { '@type': 'ProfessionalService', name: 'DigionTop', url: 'https://www.digiontop.com' },
  areaServed: 'Delhi, India',
  description: 'Business website development services including professional design, lead generation features, responsive development, local SEO readiness, and clear service pages.',
}

export default function BusinessWebsite() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="biz">
      <Seo
        title="Business Website Service in Delhi | Web Development"
        description="Get a business website service in Delhi with professional design, responsive development, lead generation features, SEO-ready structure, and support."
        path="/services/business-website"
      />
      <Helmet>
        <meta property="og:title" content="Business Website Service in Delhi | Web Development" />
        <meta property="og:description" content="Professional, responsive, trustworthy websites that clearly present your services and make it easier for visitors to contact you." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.digiontop.com/services/business-website" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      {/* HERO */}
      <section className="biz-hero biz-hero--light">
        <div className="biz-container biz-hero__inner">
          <div className="biz-hero__text" data-aos="fade-right">
            <span className="biz-tag"><FiBriefcase /> Business Website Development</span>
            <h1 className="biz-hero__title">Business Website Service in <span>Delhi</span></h1>
            <p className="biz-hero__sub">
              Your website is often the first place customers learn about your business. Our business website
              service in Delhi helps you build a professional, responsive, trustworthy website that clearly presents
              your services and makes it easier for visitors to contact you.
            </p>
            <div className="biz-hero__cta">
              <Link to="/contact" className="biz-btn biz-btn--solid">Build My Business Website <FiArrowRight /></Link>
              <Link to="/contact" className="biz-btn biz-btn--ghost">Get a Free Consultation</Link>
            </div>
            <div className="biz-hero__trust">
              <span><FiCheck /> Professional Design</span>
              <span><FiCheck /> Mobile Responsive</span>
              <span><FiCheck /> Lead Generation Ready</span>
              <span><FiCheck /> SEO-Friendly Structure</span>
              <span><FiCheck /> Fast Performance</span>
              <span><FiCheck /> Easy to Manage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Which service is the right fit — avoids this page and /custom-website
          competing for the same searches (see internal-linking note in the spec). */}
      <div className="biz-container">
        <p className="biz-fit">
          Need a fully custom design with advanced features? See our{' '}
          <Link to="/services/custom-website">Custom Website Development</Link> service.
        </p>
      </div>

      {/* BUILD A WEBSITE THAT WORKS FOR YOUR BUSINESS */}
      <section className="biz-features">
        <div className="biz-container">
          <div className="biz-head" data-aos="fade-up">
            <span className="biz-eyebrow">What You Get</span>
            <h2>Build a Website That Works for Your Business</h2>
          </div>
          <div className="biz-features__grid">
            {SOLUTIONS.map((f, i) => (
              <div className="biz-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="biz-feature__icon">{f.icon}</span>
                <h3>{f.t}</h3><p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="biz-why">
        <div className="biz-container">
          <div className="biz-head" data-aos="fade-up">
            <span className="biz-eyebrow">Why Us</span>
            <h2>Why Choose Our Business Website Services?</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginTop: 14 }}>
              Our business website service in Delhi focuses on more than making a website look attractive. We
              consider your customers, services, business goals, user journey, and conversion opportunities while
              planning the website.
            </p>
          </div>
          <div className="biz-why__grid">
            {WHY.map((w, i) => (
              <div className="biz-why__card" key={w.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="biz-why__ic">{w.icon}</span>
                <h3>{w.t}</h3><p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="biz-process">
        <div className="biz-container">
          <div className="biz-head" data-aos="fade-up">
            <span className="biz-eyebrow">Our Process</span>
            <h2>Our Business Website Development Process</h2>
          </div>
          <div className="biz-process__track">
            {PROCESS.map((s, i) => (
              <div className="biz-step" key={s.n} data-aos="fade-up" data-aos-delay={i * 60}>
                <span className="biz-step__num">{s.n}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOUR BUSINESS WEBSITE CAN INCLUDE */}
      <section className="biz-stack">
        <div className="biz-container">
          <div className="biz-head" data-aos="fade-up">
            <span className="biz-eyebrow">What's Included</span>
            <h2>What Your Business Website Can Include</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginTop: 14 }}>
              Your website can be structured around the requirements of your business and may include:
            </p>
          </div>
          <div className="biz-stack__grid" data-aos="fade-up">
            {INCLUDE_LIST.map((t) => (<span className="biz-chip" key={t}>{t}</span>))}
          </div>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, textAlign: 'center', maxWidth: 640, margin: '26px auto 0' }}>
            A lead generation website can be especially useful when your main goal is enquiries, calls, bookings,
            consultations, or customer requests.
          </p>
        </div>
      </section>

      {/* WHO WE HELP */}
      <section className="biz-features">
        <div className="biz-container">
          <div className="biz-head" data-aos="fade-up">
            <h2>Who We Help</h2>
          </div>
          <div className="biz-mini-grid">
            {WHO_FOR.map((w, i) => (
              <div className="biz-mini" key={w.t} data-aos="fade-up" data-aos-delay={(i % 3) * 60}>
                <span className="biz-mini__icon">{w.icon}</span>
                <div><h3>{w.t}</h3><p>{w.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILT FOR VISIBILITY & GROWTH */}
      <section className="biz-why">
        <div className="biz-container">
          <div className="biz-head" data-aos="fade-up">
            <span className="biz-eyebrow">Visibility &amp; Growth</span>
            <h2>Built for Visibility &amp; Growth</h2>
          </div>
          <div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center' }} data-aos="fade-up">
            <p style={{ color: 'var(--muted)', lineHeight: 1.75, marginBottom: 16 }}>
              A good business website should provide useful information while making it easy for visitors to
              understand what you offer. Google recommends clear, descriptive website content and a people-first
              approach rather than content created mainly to manipulate search rankings.
            </p>
            <p style={{ color: 'var(--muted)', lineHeight: 1.75 }}>
              We can structure your website around useful service information, logical navigation, descriptive page
              content, internal linking opportunities, and clear business information. A{' '}
              <Link to="/services/local-seo">local SEO ready website</Link> can also provide a stronger foundation
              for location-focused marketing.
            </p>
          </div>
          <p className="biz-note">
            Explore our related services: <Link to="/services/custom-website">Custom Website Development</Link>,{' '}
            <Link to="/services/wordpress-development">WordPress Website Development</Link>,{' '}
            <Link to="/services/custom-web-application">Custom Web Applications</Link>,{' '}
            <Link to="/services/website-redesign">Website Redesign</Link>,{' '}
            <Link to="/services/seo-services">SEO Services</Link>,{' '}
            <Link to="/services/local-seo">Local SEO</Link>,{' '}
            <Link to="/services/google-ads">Google Ads</Link>, and{' '}
            <Link to="/services/social-media-marketing">Social Media Marketing</Link>.
          </p>
        </div>
      </section>

      {/* RESULTS & TRUST */}
      <section className="biz-band">
        <div className="biz-container">
          <div className="biz-trustbox" data-aos="fade-up">
            <h2>Results &amp; Trust</h2>
            <p>
              Every business website has different goals and requirements. We focus on creating a professional
              online presence, clear customer journeys, useful service pages, strong enquiry opportunities, and a
              website structure that can support future marketing.
            </p>
          </div>
        </div>
      </section>

      <ServiceFaq service="Business Website Development" faqs={FAQS} />

      <section className="biz-cta">
        <div className="biz-container">
          <div className="biz-cta__box" data-aos="zoom-in">
            <FiBriefcase className="biz-cta__ic" />
            <h2>Ready to Build Your Business Website?</h2>
            <p>
              Give your business a professional online presence that builds trust, explains your services clearly,
              and makes it easier for customers to contact you.
            </p>
            <div className="biz-hero__cta">
              <Link to="/contact" className="biz-btn biz-btn--light">Get a Free Consultation <FiArrowUpRight /></Link>
              <Link to="/contact" className="biz-btn biz-btn--ghost-l">Build My Business Website</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
