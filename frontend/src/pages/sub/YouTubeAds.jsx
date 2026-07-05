import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiYoutube, FiPlay, FiEye, FiTarget, FiTrendingUp, FiSkipForward,
  FiCheck, FiArrowRight, FiArrowUpRight, FiVideo,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/YouTubeAds.css'

const FAQS = [
  { q: 'How are YouTube ads priced?', a: 'You typically pay only when someone watches or engages — so budget goes to genuinely interested viewers, not wasted impressions.' },
  { q: 'Do you produce the video ad?', a: 'We can create or guide your video creative — a strong hook in the first 5 seconds is the difference between skipped and watched.' },
  { q: 'What ad formats do you use?', a: 'Skippable in-stream, non-skippable, bumper (6s), in-feed and Shorts ads — matched to your goal, from awareness to conversions.' },
  { q: 'Can YouTube ads drive sales, not just views?', a: 'Yes — with proper targeting, remarketing and clear CTAs, YouTube drives measurable leads and sales, not just brand awareness.' },
  { q: 'How do you target viewers?', a: 'By interests, keywords, topics, specific channels/videos, and remarketing to people who visited your site or watched your content.' },
]

const FORMATS = [
  { icon: <FiPlay />, t: 'Skippable In-Stream', d: 'Ads before/during videos — you pay when viewers actually watch or click.' },
  { icon: <FiSkipForward />, t: 'Bumper Ads (6s)', d: 'Short, punchy, unskippable brand moments that stick in memory.' },
  { icon: <FiVideo />, t: 'In-Feed & Shorts', d: 'Native discovery ads in search, feed and the fast-growing Shorts surface.' },
  { icon: <FiTarget />, t: 'Remarketing Ads', d: 'Re-engage people who watched your videos or visited your site.' },
]

export default function YouTubeAds() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="yt">
      {/* HERO — video player theme */}
      <section className="yt-hero">
        <div className="yt-container yt-hero__inner">
          <div className="yt-hero__text" data-aos="fade-right">
            <span className="yt-tag"><FiYoutube /> YouTube Advertising</span>
            <h1 className="yt-hero__title">Get Watched.<br /><span>Get Remembered.</span></h1>
            <p className="yt-hero__sub">Video ad campaigns that grab attention in the first 5 seconds, build your brand and drive real action — across YouTube and Shorts.</p>
            <div className="yt-hero__cta">
              <Link to="/contact" className="yt-btn yt-btn--solid">Launch Video Ads <FiArrowRight /></Link>
              <Link to="/contact" className="yt-btn yt-btn--ghost">Free Video Strategy</Link>
            </div>
          </div>
          {/* video player mock */}
          <div className="yt-player" data-aos="fade-left">
            <div className="yt-player__screen">
              <span className="yt-player__play"><FiPlay /></span>
              <span className="yt-player__adtag">Ad · 0:05</span>
              <span className="yt-player__skip"><FiSkipForward /> Skip</span>
            </div>
            <div className="yt-player__ctrl"><span className="yt-player__prog"><i /></span></div>
            <div className="yt-player__meta">
              <div className="yt-player__ava" />
              <div><b>Your Brand Ad</b><small><FiEye /> 1.2M views · High retention</small></div>
            </div>
          </div>
        </div>
      </section>

      {/* formats */}
      <section className="yt-formats">
        <div className="yt-container">
          <div className="yt-head" data-aos="fade-up">
            <span className="yt-eyebrow">Ad Formats</span>
            <h2>The Right Format for Every Goal</h2>
          </div>
          <div className="yt-formats__grid">
            {FORMATS.map((f, i) => (
              <div className="yt-format" key={f.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="yt-format__icon">{f.icon}</span>
                <h3>{f.t}</h3><p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* band */}
      <section className="yt-band">
        <div className="yt-container yt-band__inner" data-aos="fade-up">
          <div><FiEye /><b>Pay-Per-View</b><span>Budget only on real watches</span></div>
          <div><FiTarget /><b>Laser Targeting</b><span>Interests, keywords & remarketing</span></div>
          <div><FiTrendingUp /><b>Full Funnel</b><span>Awareness to conversions</span></div>
        </div>
      </section>

      <ServiceFaq service="YouTube Advertising" faqs={FAQS} />

      <section className="yt-cta">
        <div className="yt-container">
          <div className="yt-cta__box" data-aos="zoom-in">
            <FiYoutube className="yt-cta__ic" />
            <h2>Ready to Go Viral With Purpose?</h2>
            <p>Get a free YouTube ads strategy — we'll map the formats, targeting and creative to grow your brand.</p>
            <Link to="/contact" className="yt-btn yt-btn--light">Get My Free Strategy <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
