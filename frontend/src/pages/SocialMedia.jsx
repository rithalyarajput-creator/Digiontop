// SocialMedia.jsx
// Install deps if not present:
//   npm install react-icons aos
// Then in main.jsx/main.tsx add:
//   import 'aos/dist/aos.css'
//   import AOS from 'aos'; AOS.init({ duration: 700, once: true });

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

import {
  FiArrowRight,
  FiZap,
  FiHeart,
  FiTrendingUp,
  FiUsers,
  FiMessageCircle,
  FiVideo,
  FiBarChart2,
  FiTarget,
} from 'react-icons/fi'
import {
  RiInstagramLine,
  RiFacebookCircleLine,
  RiLinkedinBoxLine,
  RiYoutubeLine,
  RiTwitterXLine,
  RiPinterestLine,
} from 'react-icons/ri'
import {
  HiOutlineLightBulb,
  HiOutlineUserGroup,
  HiOutlineSpeakerphone,
} from 'react-icons/hi'
import { MdOutlineAutoGraph, MdOutlineCampaign } from 'react-icons/md'
import ServiceWork from '../components/ServiceWork'
import ServiceFaq from '../components/ServiceFaq'
import RelatedServices from '../components/RelatedServices'
import '../styles/Services.css'

const SM_FAQS = [
  { q: 'How soon will social media marketing show results?', a: 'Engagement and reach often improve within the first 30 days; consistent growth and conversions build over 60–90 days.' },
  { q: 'Which platforms do you manage?', a: 'Instagram, Facebook, LinkedIn, YouTube, X and more — content, reels, posts, community and paid campaigns.' },
  { q: 'Do you create the content too?', a: 'Yes — strategy, creative posts, reels, captions, and scheduling are all handled by our team.' },
  { q: 'Do you run paid ad campaigns?', a: 'Yes, we run high-ROAS paid social campaigns alongside organic growth.' },
  { q: 'Is there a long-term contract?', a: 'No lock-in. We work flexibly and earn your trust with real engagement and growth.' },
]

/* ── Social Media Services ── */
const SOCIAL_SERVICES = [
  {
    icon: <MdOutlineCampaign size={26} />,
    iconBg: '#FFF0F6',
    iconColor: '#DB2777',
    title: 'Social Media Strategy & Planning',
    desc: 'A custom 90-day social strategy aligned to your business goals — platform selection, content pillars, posting cadence, and KPIs defined upfront.',
    features: ['Platform audit & competitor analysis', 'Audience persona development', 'Content pillar framework', 'Monthly content calendars'],
  },
  {
    icon: <RiInstagramLine size={26} />,
    iconBg: '#FFF0F6',
    iconColor: '#E1306C',
    title: 'Instagram Marketing',
    desc: 'Feed posts, Reels, Stories, and Highlights crafted to grow a loyal audience, boost engagement, and drive profile link clicks and DMs.',
    features: ['Reels & short-form video', 'Story sequences & polls', 'Hashtag research & rotation', 'Shopping tag integration'],
  },
  {
    icon: <RiFacebookCircleLine size={26} />,
    iconBg: '#EBF2FF',
    iconColor: '#1877F2',
    title: 'Facebook Marketing & Ads',
    desc: 'Organic page management combined with laser-targeted paid campaigns to build community, generate leads, and drive local awareness.',
    features: ['Page content management', 'Facebook Ads (reach, leads, sales)', 'Custom audience retargeting', 'Messenger automation'],
  },
  {
    icon: <RiLinkedinBoxLine size={26} />,
    iconBg: '#EBF5FF',
    iconColor: '#0A66C2',
    title: 'LinkedIn Marketing',
    desc: 'B2B authority building through thought-leadership content, executive personal branding, and LinkedIn Ads targeting decision-makers.',
    features: ['Company page management', 'Executive profile optimisation', 'Lead gen forms & LinkedIn Ads', 'Newsletter & article publishing'],
  },
  {
    icon: <FiVideo size={26} />,
    iconBg: '#FFF0F0',
    iconColor: '#FF0000',
    title: 'YouTube & Video Marketing',
    desc: 'End-to-end video production and YouTube SEO to build a channel that drives long-term awareness and organic search traffic.',
    features: ['Video scripting & production', 'YouTube SEO & thumbnail design', 'Short-form content (Shorts)', 'Channel management'],
  },
  {
    icon: <RiTwitterXLine size={26} />,
    iconBg: '#F0F4FF',
    iconColor: '#0F172A',
    title: 'X (Twitter) Marketing',
    desc: 'Build a real-time brand voice on X with trending content, strategic thread posting, and community engagement that drives brand recall.',
    features: ['Thread creation & publishing', 'Trending hashtag participation', 'Community management', 'X Ads campaigns'],
  },
  {
    icon: <FiUsers size={26} />,
    iconBg: '#FFF3CC',
    iconColor: '#c47f00',
    title: 'Influencer Marketing',
    desc: 'End-to-end influencer campaign management — from finding the right creators to negotiating deals, briefing, and measuring real-world ROI.',
    features: ['Micro & macro influencer outreach', 'Campaign briefing & management', 'UGC (user-generated content)', 'Performance tracking'],
  },
  {
    icon: <FiBarChart2 size={26} />,
    iconBg: '#F0FDF4',
    iconColor: '#059669',
    title: 'Paid Social Campaigns',
    desc: 'Full-funnel paid social across Meta, TikTok, LinkedIn, and Pinterest — creative-led campaigns optimised for your specific conversion objective.',
    features: ['Creative design & copywriting', 'Audience & lookalike targeting', 'A/B ad testing', 'ROAS-focused optimisation'],
  },
]

/* ── Platform logos for marquee / display ── */
const PLATFORMS = [
  { icon: <RiInstagramLine size={28} />, name: 'Instagram', color: '#E1306C' },
  { icon: <RiFacebookCircleLine size={28} />, name: 'Facebook', color: '#1877F2' },
  { icon: <RiLinkedinBoxLine size={28} />, name: 'LinkedIn', color: '#0A66C2' },
  { icon: <RiYoutubeLine size={28} />, name: 'YouTube', color: '#FF0000' },
  { icon: <RiTwitterXLine size={28} />, name: 'X', color: '#0F172A' },
  { icon: <RiPinterestLine size={28} />, name: 'Pinterest', color: '#E60023' },
]

/* ── Component ── */
export default function SocialMedia() {
  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 })
  }, [])

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="svc-hero svc-hero--split">
        <div className="container">
          <div className="svc-hero__split">
            <div className="svc-hero__left" data-aos="fade-right">
              <div className="svc-hero__tag svc-hero__tag--purple">
                <HiOutlineSpeakerphone size={13} /> Social Media Marketing
              </div>

              <h1 className="svc-hero__title svc-hero__title--dark">
                Build a Brand People{' '}
                <span style={{
                  background: 'linear-gradient(135deg,#FFD24A,#F5A800)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  Love & Follow
                </span>
              </h1>

              <p className="svc-hero__subtitle svc-hero__subtitle--slate">
                Strategic social media management and paid campaigns that grow engaged communities,
                amplify your message, and turn followers into loyal customers across every platform.
              </p>

              <div className="svc-hero__actions">
                <Link to="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '13px 26px', borderRadius: '12px', background: 'linear-gradient(135deg,#FFD24A,#F5A800)',
                  color: '#fff', fontWeight: 700, fontSize: '15px', textDecoration: 'none',
                  boxShadow: '0 6px 24px rgba(245,168,0,0.4)',
                }}>
                  Get a Free Social Audit <FiArrowRight size={16} />
                </Link>
                <Link to="/portfolio" className="btn btn-outline" style={{ borderColor: '#F5A800', color: '#c47f00' }}>
                  See Case Studies
                </Link>
              </div>

              <div className="svc-hero__stats svc-hero__stats--light" style={{ justifyContent: 'flex-start' }}>
                {[
                  { num: '10M+', label: 'Total Reach' },
                  { num: '6', label: 'Platforms' },
                  { num: '4x', label: 'Engagement Lift' },
                ].map((s) => (
                  <div key={s.num} style={{ textAlign: 'center' }}>
                    <div className="svc-hero__stat-num svc-hero__stat-num--dark" style={{ color: '#c47f00' }}>{s.num}</div>
                    <div className="svc-hero__stat-label svc-hero__stat-label--dark">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="svc-hero__right" data-aos="fade-left">
              <img src="/images/social-hero.webp" alt="Social media growth" loading="eager" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 8 Social Media Services ───────────────────────── */}
      <section className="section svc-section--white">
        <div className="container">
          <div className="svc-section-header" data-aos="fade-up">
            <span className="section-tag" style={{ background: '#FFF3CC', color: '#c47f00' }}>
              What We Offer
            </span>
            <div className="divider divider-center" style={{ background: 'linear-gradient(90deg,#FFD24A,#F5A800)' }} />
            <h2 className="h2" style={{ marginTop: '20px', marginBottom: '14px' }}>
              Every Platform. Every Format. Every Result.
            </h2>
            <p className="body-md" style={{ maxWidth: '560px', margin: '0 auto' }}>
              From organic content strategy to high-ROAS paid campaigns — we manage your
              complete social media presence so you can focus on running your business.
            </p>
          </div>

          <div className="svc-cards-grid">
            {SOCIAL_SERVICES.map((item, i) => (
              <div
                key={item.title}
                className="svc-card"
                data-aos="fade-up"
                data-aos-delay={i * 55}
                style={{ '--card-accent': item.iconColor }}
              >
                <div
                  className="svc-card__icon-wrap"
                  style={{ background: item.iconBg, color: item.iconColor }}
                >
                  {item.icon}
                </div>
                <h3 className="svc-card__title">{item.title}</h3>
                <p className="svc-card__desc">{item.desc}</p>
                <ul className="svc-card__features">
                  {item.features.map((f) => (
                    <li key={f} className="svc-card__feature">
                      <FiHeart
                        className="svc-card__feature-icon"
                        size={13}
                        color={item.iconColor}
                        fill={item.iconColor}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Social Media Matters (mini trust section) ── */}
      <section className="section svc-section--dark">
        <div className="container">
          <div className="svc-section-header" data-aos="fade-up">
            <span className="section-tag" style={{ background: '#FFF3CC', color: '#c47f00' }}>
              Why It Works
            </span>
            <div className="divider divider-center" style={{ background: 'linear-gradient(90deg,#FFD24A,#F5A800)' }} />
            <h2 className="h2" style={{ marginTop: '20px', marginBottom: '14px' }}>
              Social Media is Where Decisions Are Made
            </h2>
            <p className="body-md" style={{ maxWidth: '560px', margin: '0 auto' }}>
              Your customers scroll before they buy. Be where they scroll — with content that
              stops the thumb, builds trust, and drives action.
            </p>
          </div>

          <div className="svc-checklist-grid">
            {[
              {
                icon: <FiUsers size={20} />,
                label: '5 Billion Social Media Users',
                detail: 'More than 60% of the world\'s population is active on at least one social platform.',
              },
              {
                icon: <FiTarget size={20} />,
                label: 'Hyper-Targeted Reach',
                detail: 'Reach people by age, interest, behaviour, job title, and location with precision impossible on any other channel.',
              },
              {
                icon: <FiMessageCircle size={20} />,
                label: 'Direct Conversation with Customers',
                detail: 'Social lets you respond to feedback, handle objections, and build relationships at scale in real time.',
              },
              {
                icon: <HiOutlineLightBulb size={20} />,
                label: 'Compound Brand Awareness',
                detail: 'Consistent organic presence compounds over time — a single viral post can reach millions for zero ad spend.',
              },
              {
                icon: <MdOutlineAutoGraph size={20} />,
                label: 'Measurable ROI',
                detail: 'Every impression, click, and conversion tracked — know exactly what your social spend is returning.',
              },
              {
                icon: <HiOutlineUserGroup size={20} />,
                label: 'Community = Loyalty',
                detail: 'Brands with engaged communities enjoy higher LTV, lower churn, and powerful word-of-mouth referral.',
              },
            ].map((item, i) => (
              <div
                key={item.label}
                className="svc-checklist-item"
                data-aos="fade-up"
                data-aos-delay={i * 70}
              >
                <div className="svc-checklist-icon" style={{ background: '#FFF3CC' }}>
                  <span style={{ color: '#c47f00' }}>{item.icon}</span>
                </div>
                <div className="svc-checklist-text">
                  <strong>{item.label}</strong>
                  <span>{item.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Work (real reels + posts) ────────────────── */}
      <ServiceWork
        accent="#7C3AED"
        accentSoft="#F5F3FF"
        heading="Reels & Posts We've Created"
        subtitle="Real short-form videos and creative posts we've produced for brands across India."
      />

      {/* FAQ + lead form */}
      <ServiceFaq service="Social Media Marketing" faqs={SM_FAQS} />

      {/* Related services */}
      <RelatedServices categoryHeading="Social Media & Content" />

      {/* ── CTA Banner ───────────────────────────────────── */}
      <section className="svc-cta">
        <div className="container">
          <div
            className="svc-cta__inner"
            data-aos="zoom-in"
            style={{ background: 'linear-gradient(145deg,#14182b 0%,#1f2540 100%)' }}
          >
            <div className="svc-cta__blob svc-cta__blob--1" />
            <div className="svc-cta__blob svc-cta__blob--2" />
            <div className="svc-cta__content">
              <div className="svc-cta__badge" style={{ background: 'linear-gradient(135deg,#FFD24A,#F5A800)' }}>
                <FiZap size={12} /> Social Growth Package
              </div>
              <h2 className="svc-cta__title">
                Stop Posting &amp; Hoping.<br />Start Growing with a Strategy.
              </h2>
              <p className="svc-cta__subtitle">
                Get a free social media audit — we will analyse your current profiles,
                identify content gaps, and show you exactly how to grow your audience in 30 days.
              </p>
              <div className="svc-cta__actions">
                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '14px 30px', borderRadius: '12px',
                    background: 'linear-gradient(135deg,#FFD24A,#F5A800)',
                    color: '#fff', fontWeight: 700, fontSize: '15px', textDecoration: 'none',
                    boxShadow: '0 6px 20px rgba(245,168,0,0.45)',
                  }}
                >
                  Get Free Social Audit <FiArrowRight size={17} />
                </Link>
                <Link to="/portfolio" className="btn btn-ghost" style={{ fontSize: '15px', padding: '14px 30px' }}>
                  See Our Work
                </Link>
              </div>
              <div className="svc-cta__trust">
                <span>No commitment</span>
                <span>100% Free</span>
                <span>All major platforms</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
