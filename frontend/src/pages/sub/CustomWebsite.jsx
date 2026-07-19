import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiCode, FiZap, FiSmartphone, FiLayers, FiLock, FiTrendingUp,
  FiCheck, FiArrowRight, FiArrowUpRight, FiCpu, FiFeather,
  FiShield, FiUsers,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/WebDevPages.css'

const FAQS = [
  { q: 'What is a custom website?', a: 'A site built from scratch to fit your exact brand, goals and features, no templates, no compromises. Fully yours, fully flexible.' },
  { q: 'How long does it take to build?', a: 'Most custom sites take 3–6 weeks depending on pages, features and integrations. We share a clear timeline upfront.' },
  { q: 'Will my site be fast and SEO-ready?', a: 'Yes, clean code, optimised images and SEO best-practices are built in so you rank and load fast from day one.' },
  { q: 'Is it mobile-friendly?', a: 'Every site is fully responsive, pixel-perfect on phones, tablets and desktops.' },
  { q: 'Do I own the website fully?', a: 'Completely, full ownership of code, design and content, with no lock-ins.' },
]

const FEATURES = [
  { icon: <FiFeather />, t: 'Bespoke Design', d: 'A unique design crafted around your brand, not a recycled template.' },
  { icon: <FiZap />, t: 'Blazing Fast', d: 'Clean, optimised code that loads in under 2 seconds.' },
  { icon: <FiSmartphone />, t: 'Fully Responsive', d: 'Pixel-perfect across every screen size and device.' },
  { icon: <FiTrendingUp />, t: 'SEO-Ready', d: 'Built to rank with clean structure and on-page SEO baked in.' },
  { icon: <FiLock />, t: 'Secure & Scalable', d: 'SSL, best-practice security and room to grow as you scale.' },
  { icon: <FiLayers />, t: 'CMS & Integrations', d: 'Easy-to-edit content plus any tools your business needs.' },
]

const PROCESS = [
  { n: '01', t: 'Discovery & Wireframes', d: 'We map your pages, user journeys and conversion goals, then wireframe every screen before a single line of code is written.' },
  { n: '02', t: 'Bespoke UI Design', d: 'Your brand becomes a real design system, type scale, colour tokens and components, signed off in Figma before build.' },
  { n: '03', t: 'React / Next.js Build', d: 'We code it as reusable components with server-side rendering, clean semantic markup and a headless CMS you can actually edit.' },
  { n: '04', t: 'QA, Launch & Handover', d: 'Lighthouse, cross-browser and mobile testing, then deploy to Vercel with analytics, sitemaps and full code ownership handed to you.' },
]

const STACK = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Framer Motion', 'Sanity CMS', 'Vercel', 'Figma', 'Vite']

const WHY = [
  { icon: <FiFeather />, t: 'Zero Templates', d: 'Every layout is designed from a blank canvas around your brand, no WordPress theme wearing your logo.' },
  { icon: <FiZap />, t: 'Next.js Performance', d: 'SSR, image optimisation and code-splitting give you Core Web Vitals scores in the green from launch day.' },
  { icon: <FiShield />, t: 'You Own the Code', d: 'The full React codebase is pushed to your repo, no page-builder lock-in, no licence fees, no hostage situation.' },
  { icon: <FiUsers />, t: 'One Dedicated Team', d: 'The same designer and developer stay on your project end to end, so nothing gets lost in a hand-off.' },
]

export default function CustomWebsite() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="wd">
      <Seo
        title="Custom Website Development Services"
        description="Bespoke websites built in React and Next.js, no templates, sub-2-second loads, SEO-ready and fully responsive, with the code handed over to you. Start your project today."
        path="/services/custom-website"
      />
      <section className="wd-hero wd-hero--dark">
        <div className="wd-hero__grid" />
        <div className="wd-container wd-hero__inner">
          <div className="wd-hero__text" data-aos="fade-right">
            <span className="wd-tag wd-tag--light"><FiCode /> Custom Website Development</span>
            <h1 className="wd-hero__title wd-hero__title--light">Websites Built<br /><span>Exactly for You</span></h1>
            <p className="wd-hero__sub wd-hero__sub--light">No templates. We design and code custom, high-converting websites tailored to your brand, your goals and your customers, fast, secure and SEO-ready.</p>
            <div className="wd-hero__cta">
              <Link to="/contact" className="wd-btn wd-btn--solid">Start My Website <FiArrowRight /></Link>
              <Link to="/contact" className="wd-btn wd-btn--ghost-l">Get a Free Quote</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="wd-features">
        <div className="wd-container">
          <div className="wd-head" data-aos="fade-up">
            <span className="wd-eyebrow">Why Custom</span>
            <h2>Everything a Great Website Needs</h2>
          </div>
          <div className="wd-features__grid">
            {FEATURES.map((f, i) => (
              <div className="wd-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="wd-feature__icon">{f.icon}</span>
                <h3>{f.t}</h3><p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wd-process">
        <div className="wd-container">
          <div className="wd-head" data-aos="fade-up">
            <span className="wd-eyebrow">Our Process</span>
            <h2>How We Build</h2>
          </div>
          <div className="wd-process__track">
            {PROCESS.map((s, i) => (
              <div className="wd-step" key={s.n} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="wd-step__num">{s.n}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wd-stack">
        <div className="wd-container">
          <div className="wd-head" data-aos="fade-up">
            <span className="wd-eyebrow">Tech Stack</span>
            <h2>Built With Modern Tech</h2>
          </div>
          <div className="wd-stack__grid" data-aos="fade-up">
            {STACK.map(t => (<span className="wd-chip" key={t}>{t}</span>))}
          </div>
        </div>
      </section>

      <section className="wd-why">
        <div className="wd-container">
          <div className="wd-head" data-aos="fade-up">
            <span className="wd-eyebrow">Why Us</span>
            <h2>Why Businesses Choose Us</h2>
          </div>
          <div className="wd-why__grid">
            {WHY.map((w, i) => (
              <div className="wd-why__card" key={w.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="wd-why__ic">{w.icon}</span>
                <h3>{w.t}</h3><p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq service="Custom Website Development" faqs={FAQS} />

      <section className="wd-cta">
        <div className="wd-container">
          <div className="wd-cta__box" data-aos="zoom-in">
            <FiCode className="wd-cta__ic" />
            <h2>Ready to Build Something Great?</h2>
            <p>Get a free quote and timeline for your custom website, no obligation, just a clear plan.</p>
            <Link to="/contact" className="wd-btn wd-btn--light">Get My Free Quote <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
