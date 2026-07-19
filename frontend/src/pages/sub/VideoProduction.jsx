import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiArrowRight, FiArrowUpRight, FiPlay, FiVideo, FiFilm, FiCheck, FiEdit3, FiSend, FiEdit } from 'react-icons/fi'
import ServiceWork from '../../components/ServiceWork'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/SubService.css'

const SERVICES = ['Promotional Videos', 'Product Videos', 'Social Media Reels', 'Corporate Videos', 'Motion Graphics', 'Advertisement Videos', 'Brand Story Videos']

const STAGES = [
  { icon: <FiEdit />, title: 'Script', desc: 'We start with a tight, hook-first script, the first 3 seconds are written to stop the scroll, with a clear message and call-to-action mapped to your goal (reel, ad film, or product video).' },
  { icon: <FiVideo />, title: 'Shoot', desc: 'Production day with proper lighting, framing, and multiple takes/angles, studio or on-location, covering B-roll, product close-ups, talking-head, and lifestyle shots as the concept demands.' },
  { icon: <FiEdit3 />, title: 'Edit', desc: 'Pacing, sound design, colour grading, captions, and motion graphics are layered in, cutting for retention on Reels/Shorts or for persuasion on ad films and product videos.' },
  { icon: <FiSend />, title: 'Deliver', desc: 'Final files exported in platform-ready formats and aspect ratios (9:16, 1:1, 16:9) with captions, thumbnails, and revision rounds so it\'s ready to publish or run as an ad.' },
]

const FAQS = [
  { q: 'What types of videos do you produce?', a: 'We produce Instagram/YouTube Reels, paid ad films, product demo and showcase videos, brand story and corporate videos, and motion graphics/explainer animations, each edited for the platform it\'s built for.' },
  { q: 'How long does a video project take?', a: 'A single reel or short product video typically takes 3-5 business days from script to final delivery. Ad films or multi-video packages with on-location shoots usually take 1-2 weeks depending on shoot days and revision rounds.' },
  { q: 'Do you handle filming, or only editing?', a: 'Both. We can shoot from scratch, script, on-location or studio filming, lighting, and direction, or work purely on post-production if you already have raw footage that needs editing, grading, and motion graphics.' },
  { q: 'Can you edit raw footage we already shot?', a: 'Yes. Send us your raw clips and we\'ll handle the full edit, cutting, pacing, colour correction, sound design, captions, and motion graphics, to turn it into a polished, publish-ready video.' },
  { q: 'What formats and aspect ratios do you deliver?', a: 'We deliver in whatever your platforms need, vertical 9:16 for Reels/Shorts/Stories, square 1:1 for feed posts, and horizontal 16:9 for YouTube and websites, plus caption files and thumbnails on request.' },
  { q: 'How many revisions are included?', a: 'Every video package includes revision rounds so we can fine-tune pacing, music, text, and colour before final delivery. We work with you until the video matches the brief and is ready to publish or run as an ad.' },
]

export default function VideoProduction() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="ss">
      <Seo
        title="Video Production Services for Brands & Ads"
        description="Reels, product videos, ad films and motion graphics: scripted, shot, edited and delivered in every aspect ratio your platforms need. Start your video project."
        path="/services/video-production"
      />
      {/* dark cinematic hero */}
      <section className="vp-hero">
        <div className="vp-hero__glow" />
        <div className="ss-container" style={{ position: 'relative', textAlign: 'center' }} data-aos="fade-up">
          <span className="ss-tag" style={{ background: 'rgba(245,168,0,0.15)', borderColor: 'rgba(245,168,0,0.4)', color: '#FFD874' }}><FiVideo /> Video Production</span>
          <h1 className="ss-hero__title" style={{ color: '#fff', maxWidth: 880, margin: '0 auto 18px' }}>Professional Videos That <span>Capture Attention &amp; Drive Results</span></h1>
          <p className="ss-hero__sub" style={{ color: 'rgba(255,255,255,0.7)', margin: '0 auto 28px' }}>High-quality video content designed to engage audiences, strengthen your brand, and improve marketing performance.</p>
          <div className="ss-hero__actions" style={{ justifyContent: 'center' }}>
            <Link to="/contact" className="ss-btn ss-btn--primary">Create My Video <FiArrowRight /></Link>
          </div>
          <div className="vp-play"><FiPlay /></div>
        </div>
      </section>

      <section className="ss-sec">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Our Services</span><h2 className="ss-h2">Video Content That Performs</h2></div>
          <div className="ss-list">
            {SERVICES.map((s) => <div className="ss-list__item" key={s} data-aos="fade-up"><span className="ss-list__dot"><FiFilm size={14} /></span>{s}</div>)}
          </div>
        </div>
      </section>

      <ServiceWork accent="#F5A800" accentSoft="#FFF3CC" heading="Reels & Videos We've Produced" subtitle="Real short-form video content we've created for brands." />

      {/* Production timeline: Script -> Shoot -> Edit -> Deliver */}
      <section className="vp-block">
        <div className="ss-container">
          <div className="vp-head" data-aos="fade-up">
            <span className="ss-eyebrow">How We Work</span>
            <h2 className="ss-h2">From Script to Screen in 4 Stages</h2>
          </div>
          <div className="vp-timeline">
            {STAGES.map((s, i) => (
              <div className="vp-timeline__stage" key={s.title} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="vp-timeline__marker">
                  <span className="vp-timeline__circle">{s.icon}</span>
                  {i < STAGES.length - 1 && <span className="vp-timeline__line" />}
                </div>
                <div className="vp-timeline__body">
                  <span className="vp-timeline__num">0{i + 1}</span>
                  <h3 className="vp-timeline__title">{s.title}</h3>
                  <p className="vp-timeline__desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq service="Video Production" faqs={FAQS} />

      <section className="ss-cta">
        <div className="ss-container"><div className="ss-cta__box" data-aos="zoom-in">
          <h2>Let's Create Videos That Convert</h2>
          <p>Engage your audience with professional video content built to grow your brand.</p>
          <Link to="/contact" className="ss-btn">Start Your Video Project <FiArrowUpRight /></Link>
        </div></div>
      </section>
    </main>
  )
}
