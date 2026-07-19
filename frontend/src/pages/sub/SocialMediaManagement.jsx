import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiGrid, FiCalendar, FiMessageSquare, FiClock, FiTrendingUp, FiCheckCircle,
  FiCheck, FiArrowRight, FiArrowUpRight, FiEdit3,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/SmmPages.css'

const FAQS = [
  { q: 'What does social media management include?', a: 'Everything hands-off: content calendar, posting, community replies, story management and monthly reporting, your socials fully run for you.' },
  { q: 'How many posts per month?', a: 'Depends on your plan, we build a consistent cadence across platforms that keeps you visible without overwhelming your audience.' },
  { q: 'Do you reply to comments and DMs?', a: 'Yes, community management is core. We engage your audience promptly and on-brand.' },
  { q: 'Can I approve posts before they go live?', a: 'Of course, you get a calendar to review and approve, or you can let us run fully autonomously.' },
  { q: 'Which platforms do you manage?', a: 'Instagram, Facebook, LinkedIn and more, a coordinated presence wherever your customers are.' },
]

const INCLUDES = [
  { icon: <FiCalendar />, t: 'Content Calendar', d: 'A planned, approved schedule so nothing is ever posted last-minute.' },
  { icon: <FiEdit3 />, t: 'Post Creation', d: 'On-brand graphics, captions and reels produced consistently.' },
  { icon: <FiMessageSquare />, t: 'Community Replies', d: 'Comments and DMs answered promptly to build loyal followers.' },
  { icon: <FiTrendingUp />, t: 'Monthly Reporting', d: 'Clear insights on growth, reach and engagement each month.' },
]

export default function SocialMediaManagement() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="sm">
      <Seo
        title="Social Media Management Services"
        description="Content calendars, on-brand posts and reels, daily community replies and monthly reports: your social accounts fully handled. Get a free sample content plan."
        path="/services/social/social-media-management"
      />
      <section className="sm-hero">
        <div className="sm-container sm-hero__inner">
          <div className="sm-hero__text" data-aos="fade-right">
            <span className="sm-tag"><FiGrid /> Social Media Management</span>
            <h1 className="sm-hero__title">Your Socials, <span>Fully Handled</span></h1>
            <p className="sm-hero__sub">Consistent posting, engaging content and active community management, we run your social media end-to-end so you can focus on your business.</p>
            <div className="sm-hero__cta">
              <Link to="/contact" className="sm-btn sm-btn--solid">Hand It Over to Us <FiArrowRight /></Link>
              <Link to="/contact" className="sm-btn sm-btn--ghost">See a Sample Plan</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sm-inc">
        <div className="sm-container">
          <div className="sm-head" data-aos="fade-up">
            <span className="sm-eyebrow">What's Included</span>
            <h2>A Complete, Hands-Off Service</h2>
          </div>
          <div className="sm-inc__grid">
            {INCLUDES.map((c, i) => (
              <div className="sm-inc__card" key={c.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="sm-inc__icon">{c.icon}</span>
                <h3>{c.t}</h3><p>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sm-band">
        <div className="sm-container sm-band__inner" data-aos="fade-up">
          <div><b>Zero</b><span>Effort From You</span></div>
          <div><b>Consistent</b><span>On-Brand Posting</span></div>
          <div><b>Active</b><span>Community Engagement</span></div>
        </div>
      </section>

      <ServiceFaq service="Social Media Management" faqs={FAQS} />

      <section className="sm-cta">
        <div className="sm-container">
          <div className="sm-cta__box" data-aos="zoom-in">
            <FiGrid className="sm-cta__ic" />
            <h2>Ready to Stop Worrying About Posting?</h2>
            <p>Let us run your social media completely, get a free sample content plan to see how it works.</p>
            <Link to="/contact" className="sm-btn sm-btn--light">Get My Free Plan <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
