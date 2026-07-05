import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowUpRight, FiPlay, FiVideo, FiShoppingBag, FiTrendingUp,
  FiEdit3, FiMonitor, FiHeart, FiMessageCircle, FiSend, FiStar,
  FiChevronUp, FiChevronDown, FiSearch,
} from 'react-icons/fi';
import { motion, useInView } from 'framer-motion';
import SocialReelsSection from '../components/SocialReelsSection';
import '../styles/Portfolio.css';

/* ──────────────────────────────────────────────────────────────
   DigionTop — Standalone Portfolio Page  (route: /portfolio)
   White background · yellow accents · no navbar/footer
   Cards slide in alternately from LEFT / RIGHT, very smooth.

   HOW TO ADD REAL IMAGES LATER:
   Each item below has an `image` field (currently empty '').
   Drop your file in:  frontend/public/images/portfolio/
   then set e.g.  image: '/images/portfolio/my-reel.png'
   When image is empty, a branded animated placeholder is shown.
   ────────────────────────────────────────────────────────────── */

const SECTIONS = [
  {
    id: 'ecommerce',
    eyebrow: 'E-Commerce',
    title: 'Online Stores That Sell',
    text: 'High-converting product pages & stores built on Shopify, WooCommerce & more.',
    Icon: FiShoppingBag,
    accent: '#5b3bff',
    ratio: 'wide',
    mockup: 'ecommerce',
    items: [
      { id: 'e1', title: 'Amshine Jewels', tag: 'Jewellery E-Commerce', image: '/images/work/amshine-jewels.png', link: 'https://amshinejewels.com' },
      { id: 'e2', title: 'Blameless', tag: 'Skincare E-Commerce', image: '/images/work/blameless-skincare.png', link: 'https://blameless.in' },
      { id: 'e3', title: 'Toreto', tag: 'Electronics E-Commerce', image: '/images/work/toreto.png', link: 'https://toreto.in' },
    ],
  },
  {
    id: 'posts',
    eyebrow: 'Social Media Posts',
    title: 'Creative Posts That Convert',
    text: 'Scroll-stopping creative posts designed to grab attention and grow brands.',
    Icon: FiStar,
    accent: '#e1306c',
    ratio: 'square',
    mockup: 'post',
    items: [
      { id: 'po1', title: 'Sunscreen Awareness', tag: 'Creative Post', image: '/images/work/post-1.jpg' },
      { id: 'po2', title: 'Brand Campaign', tag: 'Creative Post', image: '/images/work/post-2.jpg' },
      { id: 'po3', title: 'Jhumka Collection', tag: 'Product Creative', image: '/images/work/creative-jhumka.jpg' },
      { id: 'po4', title: 'Microwave Bowl Set', tag: 'Product Creative', image: '/images/work/creative-2.jpg' },
      { id: 'po5', title: 'Gold Hair Clips', tag: 'Product Creative', image: '/images/work/creative-hairclip.jpg' },
      { id: 'po6', title: 'Traditional Jewellery', tag: 'Product Creative', image: '/images/work/creative-tradition.jpg' },
    ],
  },
  {
    id: 'landing',
    eyebrow: 'Websites',
    title: 'Websites We\'ve Built',
    text: 'Live websites we\'ve designed & developed for real businesses — click any to visit.',
    Icon: FiMonitor,
    accent: '#00c2ff',
    ratio: 'wide',
    mockup: 'landing',
    /* Real client websites — `link` makes the card clickable. */
    items: [
      { id: 'p1', title: 'Smile Dental Care Centre', tag: 'Healthcare Website', image: '/images/work/smile-dental.png', link: 'https://smiledentalcarecentre.com' },
      { id: 'p2', title: 'Baid Stock Broking', tag: 'Finance Website', image: '/images/work/baid-finance.png', link: 'https://baidstockbroking.com' },
      { id: 'p3', title: 'Delhi Dental Implants', tag: 'Dental Clinic', image: '/images/work/delhi-dental.png' },
      { id: 'p4', title: 'Delhi Dentist', tag: 'Dental Healthcare', image: '/images/work/delhi-dentist.png' },
      { id: 'p5', title: 'Lightboard Signage', tag: 'Business Website', image: '/images/work/lightboard-signage.png' },
      { id: 'p6', title: 'Stressless Learner', tag: 'Education', image: '/images/work/stressless-learner.png' },
      { id: 'p7', title: 'Rithala Village', tag: 'Information & Community', image: '/images/work/rithala-village.png' },
    ],
  },
];

export default function Portfolio() {
  return (
    <main className="pf">
      {/* ── About / Hero ── */}
      <section className="pf-hero">
        {/* animated background */}
        <div className="pf-hero__bg">
          <span className="pf-orb pf-orb--1" />
          <span className="pf-orb pf-orb--2" />
          <span className="pf-orb pf-orb--3" />
          <div className="pf-hero__dots" />
        </div>

        {/* floating sparkles */}
        <motion.span className="pf-spark pf-spark--a" animate={{ y: [0, -14, 0], rotate: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}><FiStar /></motion.span>
        <motion.span className="pf-spark pf-spark--b" animate={{ y: [0, 16, 0], rotate: [0, -25, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}><FiStar /></motion.span>
        <motion.span className="pf-spark pf-spark--c" animate={{ y: [0, -12, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}><FiStar /></motion.span>

        <div className="pf-hero__inner">
          <motion.img
            src="/images/logo-header.png"
            alt="DigionTop"
            className="pf-hero__logo"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />

          <motion.span
            className="pf-hero__eyebrow"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <FiStar /> Our Portfolio <FiStar />
          </motion.span>

          {/* word-by-word reveal heading */}
          <h1 className="pf-hero__title">
            <motion.span
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.3 } } }}
              initial="hidden"
              animate="show"
            >
              {['Taking', 'Your', 'Business'].map((w) => (
                <motion.span
                  key={w}
                  className="pf-word"
                  variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}{' '}
                </motion.span>
              ))}
              <motion.span
                className="pf-word pf-hero__ontop"
                variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                On Top
                <motion.svg className="pf-underline" viewBox="0 0 300 18" preserveAspectRatio="none">
                  <motion.path
                    d="M3,13 C70,3 230,3 297,11"
                    fill="none"
                    stroke="#F5A800"
                    strokeWidth="5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.1, duration: 0.8, ease: 'easeInOut' }}
                  />
                </motion.svg>
                <motion.span
                  className="pf-rocket"
                  initial={{ opacity: 0, x: -10, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                ><FiArrowUpRight /></motion.span>
              </motion.span>
            </motion.span>
          </h1>

          {/* glass about card */}
          <motion.div
            className="pf-hero__about"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <p className="pf-hero__lead">
              <strong>Digion</strong><strong className="pf-hero__gold">Top</strong> means taking
              your business <strong className="pf-hero__hl">digitally ON TOP</strong>.
            </p>
            <p>
              We're a full-service digital marketing agency. Your growth is our top priority —
              through websites, reels, SEO, branding and e-commerce, we put your brand
              <strong className="pf-hero__hl"> #1</strong> on Google and across social media.
            </p>
            <p className="pf-hero__tagline">“Your Business, Our Top Priority.”</p>
          </motion.div>

          {/* animated count-up stats */}
          <div className="pf-hero__stats">
            <HeroStat num={120} suffix="+" label="Projects" delay={0.9} />
            <HeroStat num={50} suffix="+" label="Brands" delay={1.0} />
            <HeroStat num={95} suffix="%" label="Happy Clients" delay={1.1} />
            <HeroStat num={8} suffix="M+" label="Reach" delay={1.2} />
          </div>
        </div>

        <motion.div
          className="pf-hero__scroll"
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span>Scroll to explore</span>
          <span className="pf-hero__scroll-arrow"><FiChevronDown /></span>
        </motion.div>
      </section>

      {/* ── Sections ── */}
      {SECTIONS.map((sec) => (
        <Section key={sec.id} section={sec} />
      ))}

      {/* ── Social / Reels (same as Home) ── */}
      <SocialReelsSection />

      {/* ── CTA ── */}
      <section className="pf-cta">
        <motion.div
          className="pf-cta__box"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Let's take <span>your business on top.</span></h2>
          <p>Get a free strategy consultation with the DigionTop team today.</p>
          <Link to="/contact" className="pf-cta__btn">
            Start Your Project <FiArrowUpRight />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}

/* ── A category section ──────────────────────────────────────── */
function Section({ section }) {
  if (section.ratio === 'phone') return <ReelsSection section={section} />;
  if (section.ratio === 'logobrand') return <LogoSection section={section} />;

  return (
    <section className="pf-section" id={section.id}>
      <motion.div
        className="pf-section__head"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.55 }}
      >
        <span className="pf-section__eyebrow" style={{ color: section.accent }}>
          <span className="pf-section__icon" style={{ background: `${section.accent}1a` }}>
            <section.Icon />
          </span>
          {section.eyebrow}
        </span>
        <h2 className="pf-section__title">{section.title}</h2>
        <p className="pf-section__text">{section.text}</p>
      </motion.div>

      <div className={`pf-grid pf-grid--${section.ratio}`}>
        {section.items.map((item, i) => (
          <Card
            key={item.id}
            item={item}
            section={section}
            fromLeft={i % 2 === 0}
          />
        ))}
      </div>
    </section>
  );
}

/* ── REELS: split layout — text left, scrollable iPhone right ── */
function ReelsSection({ section }) {
  const [active, setActive] = useState(0);
  const total = section.items.length;
  const reel = section.items[active];
  const accent = section.accent;

  const go = (dir) => {
    setActive((a) => (a + dir + total) % total);
  };

  return (
    <section className="pf-reels" id={section.id}>
      <div className="pf-reels__bg" style={{ background: `radial-gradient(circle at 80% 20%, ${accent}14, transparent 55%)` }} />

      {/* LEFT — heading + content */}
      <motion.div
        className="pf-reels__left"
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="pf-section__eyebrow" style={{ color: accent }}>
          <span className="pf-section__icon" style={{ background: `${accent}1a` }}><section.Icon /></span>
          {section.eyebrow}
        </span>
        <h2 className="pf-reels__title">{section.title}</h2>
        <p className="pf-reels__text">{section.text}</p>

        {/* count badges */}
        <div className="pf-reels__counts">
          <div className="pf-reels__count">
            <b style={{ color: accent }}>{total}+</b>
            <span>Top Reels Created</span>
          </div>
          <div className="pf-reels__count">
            <b style={{ color: accent }}>4K</b>
            <span>HD Quality</span>
          </div>
          <div className="pf-reels__count">
            <b style={{ color: accent }}>10M+</b>
            <span>Total Views</span>
          </div>
        </div>

        {/* now playing + scroll hint */}
        <div className="pf-reels__now">
          <span className="pf-reels__now-label" style={{ color: accent }}>Now Playing</span>
          <span className="pf-reels__now-title">{reel.title}</span>
          <span className="pf-reels__now-tag">{reel.tag} · {reel.views} views</span>
        </div>

        <div className="pf-reels__nav">
          <button className="pf-reels__navbtn" onClick={() => go(-1)} aria-label="Previous reel"><FiChevronUp /></button>
          <span className="pf-reels__scrollhint">
            Reel <b>{active + 1}</b> / {total} — scroll to see more
          </span>
          <button className="pf-reels__navbtn" onClick={() => go(1)} aria-label="Next reel"><FiChevronDown /></button>
        </div>
      </motion.div>

      {/* RIGHT — iPhone mockup */}
      <motion.div
        className="pf-reels__right"
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Iphone
          items={section.items}
          active={active}
          accent={accent}
          onScroll={go}
          onDot={setActive}
        />
      </motion.div>
    </section>
  );
}

/* ── Pure-CSS iPhone with vertically scrolling reels ─────────── */
function Iphone({ items, active, accent, onScroll, onDot }) {
  const lock = useRef(false);

  const handleWheel = (e) => {
    e.preventDefault();
    if (lock.current) return;
    lock.current = true;
    onScroll(e.deltaY > 0 ? 1 : -1);
    setTimeout(() => { lock.current = false; }, 600);
  };

  // simple touch swipe
  const touchY = useRef(0);
  const onTouchStart = (e) => { touchY.current = e.touches[0].clientY; };
  const onTouchEnd = (e) => {
    const dy = touchY.current - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 40) onScroll(dy > 0 ? 1 : -1);
  };

  return (
    <div className="pf-iphone-wrap">
      <div className="pf-iphone">
        {/* side buttons */}
        <span className="pf-iphone__btn pf-iphone__btn--mute" />
        <span className="pf-iphone__btn pf-iphone__btn--up" />
        <span className="pf-iphone__btn pf-iphone__btn--down" />
        <span className="pf-iphone__btn pf-iphone__btn--power" />

        <div
          className="pf-iphone__screen"
          onWheel={handleWheel}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* dynamic island / notch */}
          <span className="pf-iphone__island" />

          {/* sliding reel track */}
          <div
            className="pf-iphone__track"
            style={{ transform: `translateY(-${active * 100}%)` }}
          >
            {items.map((item, i) => (
              <div className="pf-reel" key={item.id} style={{ background: `linear-gradient(160deg, ${accent}, ${shade(accent)})` }}>
                {item.src ? (
                  item.type === 'image' ? (
                    <img src={item.src} alt={item.title} className="pf-reel__media" />
                  ) : (
                    <video
                      className="pf-reel__media"
                      src={item.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                    />
                  )
                ) : (
                  <div className="pf-reel__placeholder">
                    <span className="pf-reel__big-icon"><FiPlay /></span>
                  </div>
                )}

                {/* reel UI overlay */}
                <div className="pf-reel__overlay">
                  <div className="pf-reel__side">
                    <span className="pf-reel__act"><FiHeart /><i>{item.views}</i></span>
                    <span className="pf-reel__act"><FiMessageCircle /><i>1.2K</i></span>
                    <span className="pf-reel__act"><FiSend /><i>Share</i></span>
                  </div>
                  <div className="pf-reel__caption">
                    <span className="pf-reel__handle">@digiontop</span>
                    <span className="pf-reel__desc">{item.title} · {item.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* progress dots */}
          <div className="pf-iphone__dots">
            {items.map((it, i) => (
              <button
                key={it.id}
                className={`pf-iphone__dot${i === active ? ' is-active' : ''}`}
                onClick={() => onDot(i)}
                aria-label={`Go to reel ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* soft glow under phone */}
      <div className="pf-iphone__glow" style={{ background: `radial-gradient(ellipse, ${accent}55, transparent 70%)` }} />
    </div>
  );
}

/* ── LOGO & BRANDING: top marquee + split text/visual below ──── */
function LogoSection({ section }) {
  const accent = section.accent;
  const strip = [...section.items, ...section.items]; // duplicate for seamless loop

  return (
    <section className="pf-logo" id={section.id}>
      {/* top sliding logo strip (right → left) */}
      <div className="pf-logo__marquee">
        <div className="pf-logo__track">
          {strip.map((b, i) => (
            <div className="pf-logo__chip" key={b.id + '-' + i}>
              {b.image ? (
                <img src={b.image} alt={b.title} className="pf-logo__chip-img" />
              ) : (
                <>
                  <span className="pf-logo__chip-badge" style={{ borderColor: accent, color: accent }}>
                    {b.title.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                  </span>
                  <span className="pf-logo__chip-name">{b.title}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* split: big text left, animated visual right */}
      <div className="pf-logo__split">
        <motion.div
          className="pf-logo__left"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="pf-section__eyebrow" style={{ color: accent }}>
            <span className="pf-section__icon" style={{ background: `${accent}1a` }}><section.Icon /></span>
            {section.eyebrow}
          </span>
          <h2 className="pf-logo__title">
            Logo<br />Design<span style={{ color: accent }}>.</span>
          </h2>
          <p className="pf-logo__text">{section.text}</p>

          <ul className="pf-logo__list">
            <li><span style={{ background: accent }} />Custom wordmarks & monograms</li>
            <li><span style={{ background: accent }} />Full brand identity kits</li>
            <li><span style={{ background: accent }} />Logo animation & social assets</li>
          </ul>

          <div className="pf-logo__counts">
            <div><b style={{ color: accent }}>{section.items.length}+</b><span>Brands Designed</span></div>
            <div><b style={{ color: accent }}>100%</b><span>Custom Made</span></div>
          </div>

          <Link to="/contact" className="pf-logo__btn" style={{ background: accent }}>
            Get Your Logo <FiArrowUpRight />
          </Link>
        </motion.div>

        {/* right — animated logo showcase grid */}
        <motion.div
          className="pf-logo__right"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pf-logo__showcase" style={{ '--accent': accent }}>
            {section.items.slice(0, 6).map((b, i) => (
              <motion.div
                className="pf-logo__tile"
                key={b.id}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                whileHover={{ y: -6 }}
              >
                {b.image ? (
                  <img src={b.image} alt={b.title} />
                ) : (
                  <>
                    <span className="pf-logo__tile-badge" style={{ borderColor: accent, color: accent }}>
                      {b.title.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                    </span>
                    <span className="pf-logo__tile-name">{b.title}</span>
                    <span className="pf-logo__tile-tag">{b.tag}</span>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Single card: slides in from left or right ───────────────── */
function Card({ item, section, fromLeft }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const accent = section.accent;
  const isLive = Boolean(item.link);

  const Tag = isLive ? motion.a : motion.div;
  const linkProps = isLive
    ? { href: item.link, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Tag
      ref={ref}
      {...linkProps}
      className={`pf-card pf-card--${section.ratio} pf-card--${section.mockup}${isLive ? ' pf-card--live' : ''}`}
      initial={{ opacity: 0, x: fromLeft ? -90 : 90 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
    >
      <div className="pf-card__media">
        {item.image ? (
          <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
        ) : (
          <Mockup type={section.mockup} item={item} accent={accent} Icon={section.Icon} />
        )}
        {isLive && <span className="pf-card__live" style={{ background: accent }}>Live <FiArrowUpRight /></span>}
        <span className="pf-card__shine" />
      </div>
      <div className="pf-card__body">
        <span className="pf-card__title">{item.title}</span>
        <span className="pf-card__tag" style={{ color: accent }}>{item.tag}</span>
      </div>
    </Tag>
  );
}

/* ── Mockups (pure SVG/CSS — no emojis, no images) ───────────── */
function BrowserBar({ accent, label }) {
  return (
    <div className="pf-mk__bar">
      <span className="pf-mk__dot" />
      <span className="pf-mk__dot" />
      <span className="pf-mk__dot" />
      <span className="pf-mk__addr" style={{ color: accent }}>{label}</span>
    </div>
  );
}

function Mockup({ type, item, accent, Icon }) {
  let url;
  if (item.link) {
    try { url = new URL(item.link).hostname.replace('www.', ''); } catch { url = item.link; }
  } else {
    url = 'digiontop.com/' + item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  if (type === 'logo') {
    // clean monogram-style logo presentation
    const initials = item.title.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
    return (
      <div className="pf-mk pf-mk--logo">
        <div className="pf-mk__logo-badge" style={{ borderColor: accent }}>
          <span className="pf-mk__logo-initials" style={{ color: accent }}>{initials}</span>
          <Icon className="pf-mk__logo-mark" style={{ color: accent }} />
        </div>
        <span className="pf-mk__logo-name">{item.title}</span>
        <span className="pf-mk__logo-line" style={{ background: accent }} />
      </div>
    );
  }

  if (type === 'seo') {
    // Google-style search result with a #1 ranking
    return (
      <div className="pf-mk pf-mk--seo">
        <BrowserBar accent={accent} label="google.com" />
        <div className="pf-mk__seo-body">
          <div className="pf-mk__seo-search">
            <FiSearch className="pf-mk__seo-icon" />
            <span className="pf-mk__seo-query">{item.title.replace(/"/g, '')}</span>
          </div>
          <div className="pf-mk__seo-result pf-mk__seo-result--top" style={{ borderColor: accent }}>
            <span className="pf-mk__seo-rank" style={{ background: accent }}>1</span>
            <div className="pf-mk__seo-lines">
              <span className="pf-mk__seo-title" />
              <span className="pf-mk__seo-url" />
              <span className="pf-mk__seo-text" />
            </div>
          </div>
          {[2, 3].map((n) => (
            <div className="pf-mk__seo-result" key={n}>
              <span className="pf-mk__seo-rank pf-mk__seo-rank--dim">{n}</span>
              <div className="pf-mk__seo-lines">
                <span className="pf-mk__seo-title" />
                <span className="pf-mk__seo-text" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'ecommerce') {
    // browser + product grid
    return (
      <div className="pf-mk pf-mk--shop">
        <BrowserBar accent={accent} label={url} />
        <div className="pf-mk__shop-body">
          <div className="pf-mk__shop-nav">
            <span className="pf-mk__shop-logo" style={{ background: accent }}><Icon /></span>
            <span className="pf-mk__shop-links"><i /><i /><i /></span>
            <span className="pf-mk__shop-cart" style={{ borderColor: accent }}><FiShoppingBag /></span>
          </div>
          <div className="pf-mk__shop-grid">
            {[0, 1, 2, 3].map((n) => (
              <div className="pf-mk__product" key={n}>
                <span className="pf-mk__product-img" style={{ background: `${accent}22` }} />
                <span className="pf-mk__product-line" />
                <span className="pf-mk__product-price" style={{ color: accent }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // default: landing page mockup
  return (
    <div className="pf-mk pf-mk--landing">
      <BrowserBar accent={accent} label={url} />
      <div className="pf-mk__land-body">
        <div className="pf-mk__land-nav">
          <span className="pf-mk__land-logo" style={{ background: accent }} />
          <span className="pf-mk__land-menu"><i /><i /><i /></span>
        </div>
        <div className="pf-mk__land-hero">
          <span className="pf-mk__land-h1" />
          <span className="pf-mk__land-h2" />
          <span className="pf-mk__land-btn" style={{ background: accent }} />
        </div>
        <div className="pf-mk__land-cards">
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}

/* ── Animated count-up hero stat ─────────────────────────────── */
function HeroStat({ num, suffix, label, delay }) {
  const [value, setValue] = useState(0);

  React.useEffect(() => {
    let raf;
    const startDelay = setTimeout(() => {
      const start = performance.now();
      const duration = 1300;
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(eased * num));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay * 1000);
    return () => { clearTimeout(startDelay); cancelAnimationFrame(raf); };
  }, [num, delay]);

  return (
    <motion.div
      className="pf-stat"
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
    >
      <b>{value}{suffix}</b>
      <span>{label}</span>
    </motion.div>
  );
}

/* darken a hex color a bit for the gradient end */
function shade(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, (n >> 16) - 45);
  const g = Math.max(0, ((n >> 8) & 0xff) - 45);
  const b = Math.max(0, (n & 0xff) - 45);
  return `rgb(${r},${g},${b})`;
}
