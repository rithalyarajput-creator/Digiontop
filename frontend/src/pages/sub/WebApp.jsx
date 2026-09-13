import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiCpu, FiDatabase, FiLock, FiZap, FiRefreshCw, FiLayers,
  FiCheck, FiArrowRight, FiArrowUpRight, FiGrid,
  FiShield, FiTrendingUp, FiUsers, FiBriefcase,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/WebDevPages.css'

const FAQS = [
  { q: 'What is a custom web application?', a: 'A custom web application is software created specifically for a business or product. It can include dashboards, portals, CRM systems, booking platforms, management tools, or other features designed around specific workflows and user requirements.' },
  { q: 'Why choose a custom application instead of ready-made software?', a: 'Custom applications allow businesses to build features around their own processes instead of changing workflows to match generic software. They can also provide greater flexibility for integrations, user roles, automation, and future feature development.' },
  { q: 'Can you integrate third-party tools?', a: 'Yes. We can connect applications with payment gateways, CRMs, communication platforms, analytics tools, maps, and other APIs. The required integration depends on the tools you currently use and the functionality your application needs.' },
  { q: 'Will the application be mobile-friendly?', a: 'Yes. The interface can be designed to work across supported devices and screen sizes. During development, we consider responsive layouts, navigation, forms, dashboards, and other important interactions to provide a practical user experience.' },
  { q: 'Can you maintain the application after launch?', a: 'Yes. Ongoing support can include bug fixes, security updates, performance improvements, monitoring, technical troubleshooting, and new feature development. Support requirements can be planned according to the complexity and technology used.' },
]

const SOLUTIONS = [
  { icon: <FiCpu />, t: 'Custom Web Application Development', d: 'Every business has different workflows and requirements. Our custom web application development approach creates dashboards, portals, management systems, booking platforms, CRM solutions, and other applications around your actual business processes.' },
  { icon: <FiGrid />, t: 'Custom Dashboards', d: 'Get a centralized system where your team can manage important information, activities, users, and reports. Our custom dashboards are designed around the data and workflows your business uses every day.' },
  { icon: <FiLock />, t: 'Secure User Authentication', d: 'Different users may need different permissions. We can build secure login systems, user roles, access controls, and authentication features to help protect application data and give users access to the right information.' },
  { icon: <FiRefreshCw />, t: 'API Integration Services', d: 'Connect your application with the tools your business already uses. Our API integration services can connect payment gateways, CRMs, communication platforms, analytics tools, maps, and other third-party systems.' },
  { icon: <FiDatabase />, t: 'Scalable Web Applications', d: 'Your application should be able to support future growth. We create scalable web applications with structured databases, efficient architecture, and technology choices that can adapt as your users and requirements increase.' },
  { icon: <FiLayers />, t: 'Cloud Deployment & Support', d: 'We can prepare applications for reliable cloud deployment with monitoring, backups, performance considerations, and ongoing support. This helps your team focus on using the application while technical improvements can be handled as needed.' },
]

const WHY = [
  { icon: <FiUsers />, t: 'Built Around Your Workflow', d: 'Instead of forcing your business to adjust to ready-made software, our custom web application development process is based on your specific operations, users, data, and business requirements.' },
  { icon: <FiShield />, t: 'Security From the Beginning', d: 'Security should be considered during development, not added at the end. We can include authentication, role-based access, protected data handling, and other appropriate security measures based on your application requirements.' },
  { icon: <FiGrid />, t: 'Easy-to-Use Interfaces', d: 'Complex systems do not have to feel complicated. We focus on clear navigation, organized dashboards, logical user flows, and simple interfaces so your team can use important features efficiently.' },
  { icon: <FiTrendingUp />, t: 'Ready for Future Growth', d: 'A growing business may need new users, modules, integrations, reports, or automation later. Our scalable web applications approach keeps future expansion in mind during the initial architecture and development stages.' },
]

const PROCESS = [
  { n: '01', t: 'Discovery & Requirement Planning', d: 'We understand your business process, target users, problems, required features, user roles, integrations, and expected outcomes before development begins.' },
  { n: '02', t: 'Architecture & UX Planning', d: 'We plan the database structure, application flow, user journeys, modules, permissions, and interface before moving into development.' },
  { n: '03', t: 'UI/UX Design', d: 'We create practical screens and user flows that make the application easy to understand and use across supported devices.' },
  { n: '04', t: 'Development & Integration', d: 'Our team develops the application modules and connects required third-party tools. API integration services can be added for payments, CRM, communication, analytics, or other systems.' },
  { n: '05', t: 'Testing & Optimization', d: 'We test functionality, user permissions, forms, integrations, responsiveness, performance, and important application workflows before launch.' },
  { n: '06', t: 'Deployment & Support', d: 'After final testing, the application is deployed to the selected environment. We can also provide maintenance, updates, troubleshooting, and future feature development.' },
]

const BUILD_LIST = [
  'CRM and customer management systems', 'Business management platforms', 'Booking and appointment systems',
  'Employee or staff portals', 'Client dashboards', 'Inventory management systems',
  'Learning management platforms', 'Membership portals', 'SaaS applications', 'Custom admin panels',
]

const WHO_FOR = [
  { icon: <FiZap />, t: 'Startups', d: 'Build a digital product around your idea with the flexibility to add features as your user base and business requirements grow.' },
  { icon: <FiLayers />, t: 'Small & Medium Businesses', d: 'Replace repetitive manual work with a centralized system for managing customers, operations, bookings, records, or internal workflows.' },
  { icon: <FiBriefcase />, t: 'Service Businesses', d: 'Create client portals, booking systems, dashboards, or automated workflows that make daily operations easier for your team and customers.' },
  { icon: <FiTrendingUp />, t: 'Growing Enterprises', d: 'Develop a platform that connects multiple teams, systems, users, and business processes through one centralized solution.' },
]

const INTEGRATIONS = [
  'Payment gateways', 'CRM systems', 'WhatsApp and communication tools', 'Email and SMS services',
  'Analytics platforms', 'Maps and location services', 'Business APIs', 'Cloud services',
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Custom Web Application Development',
  provider: { '@type': 'ProfessionalService', name: 'DigionTop', url: 'https://www.digiontop.com' },
  areaServed: 'Delhi, India',
  description: 'Custom web application development services including dashboards, secure authentication, API integrations, scalable architecture, and cloud deployment.',
}

export default function WebApp() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="cwa">
      <Seo
        title="Custom Web Application Service in Delhi | Development"
        description="Build secure and scalable web applications in Delhi with custom dashboards, API integrations, user roles, modern development, and ongoing support."
        path="/services/custom-web-application"
      />
      <Helmet>
        <meta property="og:title" content="Custom Web Application Service in Delhi | Development" />
        <meta property="og:description" content="Secure development, intuitive interfaces, API connectivity, and scalable architecture built specifically for your business." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.digiontop.com/services/custom-web-application" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      {/* HERO */}
      <section className="cwa-hero cwa-hero--dark">
        <div className="cwa-hero__grid" />
        <div className="cwa-container cwa-hero__inner">
          <div className="cwa-hero__text" data-aos="fade-right">
            <span className="cwa-tag cwa-tag--light"><FiCpu /> Custom Web Application</span>
            <h1 className="cwa-hero__title cwa-hero__title--light">Custom Web Application Service in <span>Delhi</span></h1>
            <p className="cwa-hero__sub cwa-hero__sub--light">
              Build a powerful web application designed around your business workflow, users, and goals. Our custom
              web application service in Delhi focuses on secure development, intuitive interfaces, reliable
              performance, API connectivity, scalable architecture, and features built specifically for your business.
            </p>
            <div className="cwa-hero__cta">
              <Link to="/contact" className="cwa-btn cwa-btn--solid">Get a Free Consultation <FiArrowRight /></Link>
              <Link to="/contact" className="cwa-btn cwa-btn--ghost-l">Discuss Your Project</Link>
            </div>
            <div className="cwa-hero__trust">
              <span><FiCheck /> Custom-Built Solutions</span>
              <span><FiCheck /> Secure Authentication</span>
              <span><FiCheck /> API Integrations</span>
              <span><FiCheck /> Scalable Architecture</span>
              <span><FiCheck /> Cloud-Ready Development</span>
            </div>
          </div>
        </div>
      </section>

      {/* WEB APPLICATIONS BUILT AROUND YOUR BUSINESS */}
      <section className="cwa-features">
        <div className="cwa-container">
          <div className="cwa-head" data-aos="fade-up">
            <span className="cwa-eyebrow">Capabilities</span>
            <h2>Web Applications Built Around Your Business</h2>
          </div>
          <div className="cwa-features__grid">
            {SOLUTIONS.map((f, i) => (
              <div className="cwa-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="cwa-feature__icon">{f.icon}</span>
                <h3>{f.t}</h3><p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="cwa-why">
        <div className="cwa-container">
          <div className="cwa-head" data-aos="fade-up">
            <span className="cwa-eyebrow">Why Us</span>
            <h2>Why Choose Our Web Application Services?</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginTop: 14 }}>
              Our custom web application service in Delhi is focused on solving real business problems rather than
              simply creating another digital interface. We first understand your workflow and then plan the right
              features, user experience, technology, and integrations.
            </p>
          </div>
          <div className="cwa-why__grid">
            {WHY.map((w, i) => (
              <div className="cwa-why__card" key={w.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="cwa-why__ic">{w.icon}</span>
                <h3>{w.t}</h3><p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="cwa-process">
        <div className="cwa-container">
          <div className="cwa-head" data-aos="fade-up">
            <span className="cwa-eyebrow">Our Process</span>
            <h2>Our Web Application Development Process</h2>
          </div>
          <div className="cwa-process__track">
            {PROCESS.map((s, i) => (
              <div className="cwa-step" key={s.n} data-aos="fade-up" data-aos-delay={i * 60}>
                <span className="cwa-step__num">{s.n}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT CAN WE BUILD */}
      <section className="cwa-stack">
        <div className="cwa-container">
          <div className="cwa-head" data-aos="fade-up">
            <span className="cwa-eyebrow">What Can We Build?</span>
            <h2>Solutions For Different Business Requirements</h2>
          </div>
          <div className="cwa-stack__grid" data-aos="fade-up">
            {BUILD_LIST.map((t) => (<span className="cwa-chip" key={t}>{t}</span>))}
          </div>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, textAlign: 'center', maxWidth: 620, margin: '26px auto 0' }}>
            Each application is planned according to your business process, users, data, and required functionality.
          </p>
        </div>
      </section>

      {/* WHO CAN BENEFIT */}
      <section className="cwa-features">
        <div className="cwa-container">
          <div className="cwa-head" data-aos="fade-up">
            <h2>Who Can Benefit From Custom Applications?</h2>
          </div>
          <div className="cwa-mini-grid">
            {WHO_FOR.map((w, i) => (
              <div className="cwa-mini" key={w.t} data-aos="fade-up" data-aos-delay={(i % 3) * 60}>
                <span className="cwa-mini__icon">{w.icon}</span>
                <div><h3>{w.t}</h3><p>{w.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY & INTEGRATIONS */}
      <section className="cwa-stack">
        <div className="cwa-container">
          <div className="cwa-head" data-aos="fade-up">
            <span className="cwa-eyebrow">Technology &amp; Integrations</span>
            <h2>The Stack Matches Your Application's Needs</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginTop: 14 }}>
              The technology stack should match the application's actual requirements. Depending on the project,
              development can involve modern frontend frameworks, backend technologies, databases, APIs, cloud
              infrastructure, and third-party integrations. Our API integration services help connect different
              systems so your application can work as part of your broader digital ecosystem.
            </p>
          </div>
          <div className="cwa-stack__grid" data-aos="fade-up">
            {INTEGRATIONS.map((t) => (<span className="cwa-chip" key={t}>{t}</span>))}
          </div>
          <p className="cwa-note">
            Explore our related services: <Link to="/services/custom-website">Custom Website Development</Link>,{' '}
            <Link to="/services/website-development">Website Development</Link>,{' '}
            <Link to="/services/ecommerce-solutions">Ecommerce Website Development</Link>,{' '}
            <Link to="/services/seo-services">SEO Services</Link>,{' '}
            <Link to="/services/technical-seo">Technical SEO</Link>,{' '}
            <Link to="/services/google-ads">Google Ads</Link>, and{' '}
            <Link to="/services/social-media-marketing">Social Media Marketing</Link>.
          </p>
        </div>
      </section>

      {/* RESULTS & TRUST */}
      <section className="cwa-band">
        <div className="cwa-container">
          <div className="cwa-trustbox" data-aos="fade-up">
            <h2>Results &amp; Trust</h2>
            <p>
              Every web application project has different goals, technical requirements, and expected outcomes. We
              focus on clear planning, transparent communication, reliable development, security-conscious
              implementation, and a solution that can support your business operations.
            </p>
          </div>
        </div>
      </section>

      <ServiceFaq service="Custom Web Application" faqs={FAQS} />

      <section className="cwa-cta">
        <div className="cwa-container">
          <div className="cwa-cta__box" data-aos="zoom-in">
            <FiCpu className="cwa-cta__ic" />
            <h2>Have a Web App Idea?</h2>
            <p>
              Turn your business workflow or product idea into a practical digital application. Share your
              requirements with us and we can discuss the features, technology, development approach, and next steps.
            </p>
            <div className="cwa-hero__cta">
              <Link to="/contact" className="cwa-btn cwa-btn--light">Discuss Your Project <FiArrowUpRight /></Link>
              <Link to="/contact" className="cwa-btn cwa-btn--ghost-l">Get a Free Consultation</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
