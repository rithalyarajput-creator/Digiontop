import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiChevronRight, FiArrowRight, FiArrowUpRight, FiExternalLink, FiCheckCircle } from 'react-icons/fi';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import '../styles/CaseStudy.css';

/* Sidebar lead form — same offer as the blog sidebar, styled for this page. */
function LeadForm({ source }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setSending(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.name, phone: form.phone, email: form.email,
          message: `Lead from case study: ${source}`, source: 'case-study',
        }),
      });
    } catch {
      /* The lead is lost, but never leave the visitor staring at a dead form. */
    } finally {
      setSent(true);
      setSending(false);
    }
  }

  return (
    <div className="cs-lead">
      <h3 className="cs-lead__title">Grow Your Business</h3>
      <p className="cs-lead__sub">Get a free marketing strategy. No commitment needed.</p>
      {sent ? (
        <div className="cs-lead__success">
          <FiCheckCircle size={20} /> <span>Thanks! We'll reach out soon.</span>
        </div>
      ) : (
        <form onSubmit={submit} className="cs-lead__form">
          <input type="text" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input type="tel" placeholder="Mobile Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          <input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <button type="submit" disabled={sending}>
            {sending ? 'Sending…' : <>Get Free Strategy <FiArrowRight /></>}
          </button>
        </form>
      )}
      <ul className="cs-lead__perks">
        <li><FiCheckCircle /> Free Consultation</li>
        <li><FiCheckCircle /> No Commitment</li>
        <li><FiCheckCircle /> Expert Team</li>
      </ul>
    </div>
  );
}

/* One client project, written up in the admin panel under
   Projects → Websites. Route: /case-study/:slug */
export default function CaseStudy() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [more, setMore] = useState([]);
  const [state, setState] = useState('loading'); // loading | ready | missing

  useEffect(() => {
    let cancelled = false;
    setState('loading');
    fetch(`/api/portfolio?slug=${encodeURIComponent(slug)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((row) => {
        if (cancelled) return;
        setItem(row);
        setState('ready');
        window.scrollTo({ top: 0 });
      })
      .catch(() => { if (!cancelled) setState('missing'); });

    fetch('/api/portfolio')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((rows) => {
        if (cancelled || !Array.isArray(rows)) return;
        setMore(rows.filter((r) => r.slug && r.slug !== slug).slice(0, 3));
      })
      .catch(() => {});

    return () => { cancelled = true; };
  }, [slug]);

  if (state === 'loading') {
    return <main className="cs"><div className="cs__loading">Loading…</div></main>;
  }

  if (state === 'missing' || !item) {
    return (
      <main className="cs">
        <div className="cs__missing">
          <h1>Case study not found</h1>
          <p>This project may have been moved or removed.</p>
          <Link to="/portfolio" className="cs__btn">See all our work <FiArrowUpRight /></Link>
        </div>
      </main>
    );
  }

  const host = (item.link_url || '').replace(/^https?:\/\//, '').replace(/\/$/, '');
  const hero = item.feature_image_url || item.image_url || '';

  return (
    <main className="cs">
      <Seo
        title={`${item.title} Case Study`}
        description={item.description || `How DigionTop designed and built ${item.title}${item.category ? ` — a ${item.category} project` : ''}.`}
        path={`/case-study/${item.slug}`}
        image={hero || undefined}
        type="article"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: item.title,
          description: item.description || '',
          genre: item.category || 'Web Development',
          url: `https://www.digiontop.com/case-study/${item.slug}`,
          image: hero || undefined,
          creator: { '@type': 'Organization', name: 'DigionTop', url: 'https://www.digiontop.com/' },
        }}
      />

      {/* ── Dark hero: breadcrumbs, brand name, one-line description ── */}
      <header className="cs__hero">
        <div className="cs__inner">
          <nav className="cs__crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <FiChevronRight />
            <Link to="/portfolio">Case Studies</Link>
            {item.category && (
              <>
                <FiChevronRight />
                <span>{item.category}</span>
              </>
            )}
            <FiChevronRight />
            <span className="cs__crumbs-current">{item.title}</span>
          </nav>

          <h1 className="cs__title">{item.title}</h1>
          {item.description && <p className="cs__lead">{item.description}</p>}
        </div>

        {/* Feature image overlaps the hero, the way the reference does */}
        {hero && (
          <div className="cs__feature">
            <div className="cs__inner">
              <img src={hero} alt={item.title} width="1200" height="675" />
            </div>
          </div>
        )}
      </header>

      {/* ── Body: write-up on the left, lead form on the right ── */}
      <section className="cs__body">
        <div className="cs__inner cs__split">
          <div className="cs__content-col">
            {item.content
              ? <div className="cs__content" dangerouslySetInnerHTML={{ __html: item.content }} />
              : <p className="cs__content cs__content--empty">The write-up for this project is coming soon.</p>}

            {item.link_url && (
              <a className="cs__btn" href={item.link_url} target="_blank" rel="noopener noreferrer">
                Visit {host || 'the live site'} <FiExternalLink />
              </a>
            )}
          </div>

          <aside className="cs__side">
            <LeadForm source={item.title} />
          </aside>
        </div>
      </section>

      {/* ── More work ── */}
      {more.length > 0 && (
        <section className="cs__more">
          <div className="cs__inner">
            <h2 className="cs__h2">More of our work</h2>
            <div className="cs__grid">
              {more.map((m) => (
                <Link key={m.id} to={`/case-study/${m.slug}`} className="cs__card">
                  <div className="cs__card-shot">
                    {m.feature_image_url || m.image_url
                      ? <img src={m.feature_image_url || m.image_url} alt={m.title} loading="lazy" />
                      : <span className="cs__card-blank">{(m.title || '?')[0]}</span>}
                  </div>
                  <div className="cs__card-body">
                    <span className="cs__card-title">{m.title}</span>
                    <span className="cs__card-tag">{m.category || 'Website'}</span>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/portfolio" className="cs__morelink">See all projects <FiArrowUpRight /></Link>
          </div>
        </section>
      )}
    </main>
  );
}
