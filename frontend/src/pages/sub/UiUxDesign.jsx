import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiArrowRight, FiArrowUpRight, FiCheck, FiLayout, FiSmartphone, FiGrid, FiPenTool, FiSearch, FiMap, FiTarget, FiTrendingUp, FiX } from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/SubService.css'

const SERVICES = [
  { icon: <FiLayout />, t: 'Website UI Design' }, { icon: <FiSmartphone />, t: 'Mobile App UI Design' },
  { icon: <FiGrid />, t: 'Dashboard & Admin Panel Design' }, { icon: <FiPenTool />, t: 'Wireframing & Prototyping' },
  { icon: <FiSearch />, t: 'User Experience Research' }, { icon: <FiMap />, t: 'User Journey Mapping' },
  { icon: <FiTarget />, t: 'Landing Page Design' }, { icon: <FiTrendingUp />, t: 'Interface Optimization' },
]
const BENEFITS = ['Better User Experience', 'Higher Engagement', 'Improved Conversion Rates', 'Stronger Brand Perception', 'Reduced User Frustration', 'Increased Customer Retention']

const WITHOUT_UX = [
  'Screens get built straight from guesses, then get reworked after launch',
  'Users abandon signup and checkout flows with no clear reason why',
  'Every stakeholder has an opinion, so decisions stall on personal taste',
  'Support tickets pile up asking "how do I even do this?"',
  'Redesigns happen reactively, after conversion has already dropped',
]
const WITH_UX = [
  'Low-fidelity wireframes validate layout and flow before any code is written',
  'Interactive prototypes get tested with real users, so friction is caught early',
  'User research (interviews, surveys, analytics) replaces guesswork with evidence',
  'Usability testing surfaces confusing steps before they cost you customers',
  'Every design decision ties back to a documented user need, not opinion',
]

const FAQS = [
  { q: 'What is the difference between UI and UX design?', a: 'UX (user experience) is the research, wireframing and flow-planning that makes a product easy and logical to use. UI (user interface) is the visual layer, colours, typography, spacing and components. We handle both, starting with UX so the interface is built on a foundation that actually works.' },
  { q: 'Do you create wireframes before the final design?', a: 'Yes. Every project starts with low-fidelity wireframes that map out layout, hierarchy and user flow. This lets you approve structure and navigation before we invest time in visual design, saving revisions later.' },
  { q: 'What is a clickable prototype and do I get one?', a: 'A clickable prototype is an interactive mockup you can click through like a real app or website before development starts. We build these for key flows so you and your team can experience the product and catch issues early.' },
  { q: 'How does user research work, do you talk to my actual customers?', a: 'Where possible, yes. We run user interviews, surveys and review analytics/heatmaps from your existing product. If you\'re pre-launch, we use competitor analysis and target-persona research to guide decisions instead.' },
  { q: 'What is usability testing and why does it matter?', a: 'Usability testing means putting real users (or target-persona testers) in front of the design and watching them try to complete tasks. It reveals confusing steps, unclear labels and drop-off points before launch, issues that are far cheaper to fix in design than after development.' },
  { q: 'How long does a typical UI/UX project take?', a: 'A single landing page or small app flow usually takes 1-2 weeks from research to final UI. Full websites or multi-screen apps typically take 3-6 weeks depending on the number of flows, revision rounds and whether user testing is included.' },
]

export default function UiUxDesign() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="ss">
      <Seo
        title="UI/UX Design Services for Web & Mobile Apps"
        description="User research, wireframes, clickable prototypes and polished UI for websites, apps and dashboards, tested with real users. Book a free UI/UX consultation."
        path="/services/ui-ux-design"
      />
      <section className="ss-hero" style={{ textAlign: 'center' }}>
        <span className="ss-hero__orb ss-hero__orb--1" /><span className="ss-hero__orb ss-hero__orb--2" />
        <div className="ss-container" style={{ position: 'relative' }} data-aos="fade-up">
          <span className="ss-tag"><FiLayout /> UI/UX Design</span>
          <h1 className="ss-hero__title" style={{ maxWidth: 820, margin: '0 auto 18px' }}>Design Experiences That <span>Users Love</span></h1>
          <p className="ss-hero__sub" style={{ margin: '0 auto 28px' }}>A great digital product isn't just about looks, it's about seamless experiences that help users find what they need quickly. We design intuitive interfaces that boost satisfaction and results.</p>
          <div className="ss-hero__actions" style={{ justifyContent: 'center' }}>
            <Link to="/contact" className="ss-btn ss-btn--primary">Design My Product <FiArrowRight /></Link>
            <Link to="/contact" className="ss-btn ss-btn--ghost">Free Consultation</Link>
          </div>
        </div>
      </section>

      <section className="ss-sec">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Our UI/UX Services</span><h2 className="ss-h2">Interfaces Built Around Your Users</h2></div>
          <div className="uiux-grid">
            {SERVICES.map((s, i) => (
              <div className="uiux-card" key={s.t} data-aos="fade-up" data-aos-delay={(i % 4) * 60}>
                <span className="uiux-card__icon">{s.icon}</span><h3>{s.t}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ss-sec ss-sec--soft">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Benefits</span><h2 className="ss-h2">Why Professional UI/UX Pays Off</h2></div>
          <div className="ss-benefits">{BENEFITS.map((b) => <span className="ss-benefit" key={b} data-aos="zoom-in"><FiCheck /> {b}</span>)}</div>
        </div>
      </section>

      <section className="ss-sec">
        <div className="ss-container ss-head" data-aos="fade-up">
          <span className="ss-eyebrow">Our Approach</span>
          <h2 className="ss-h2">Beautiful Meets Functional</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: 14 }}>We combine creativity, usability, and business strategy to design digital experiences that not only look beautiful but also perform effectively and drive growth.</p>
        </div>
      </section>

      <section className="ux-block">
        <div className="ss-container">
          <div className="ux-head" data-aos="fade-up">
            <span className="ss-eyebrow">The Real Difference</span>
            <h2 className="ss-h2">Guesswork vs. Research-Driven Design</h2>
          </div>
          <div className="ux-compare">
            <div className="ux-compare__col ux-compare__col--without" data-aos="fade-up">
              <h3 className="ux-compare__title"><FiX /> Without UX</h3>
              <ul className="ux-compare__list">
                {WITHOUT_UX.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="ux-compare__col ux-compare__col--with" data-aos="fade-up" data-aos-delay="100">
              <h3 className="ux-compare__title"><FiCheck /> With Our UX</h3>
              <ul className="ux-compare__list">
                {WITH_UX.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ServiceFaq service="UI/UX Design" faqs={FAQS} />

      <section className="ss-cta">
        <div className="ss-container"><div className="ss-cta__box" data-aos="zoom-in">
          <h2>Create Better User Experiences</h2>
          <p>Transform your website or application into a powerful digital experience that keeps users engaged and drives growth.</p>
          <Link to="/contact" className="ss-btn">Start Your UI/UX Project <FiArrowUpRight /></Link>
        </div></div>
      </section>
    </main>
  )
}
