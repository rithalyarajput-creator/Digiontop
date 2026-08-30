import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiArrowUpRight, FiExternalLink } from 'react-icons/fi';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import '../styles/CaseStudy.css';

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

  return (
    <main className="cs">
      <Seo
        title={`${item.title} Case Study`}
        description={item.description || `How DigionTop designed and built ${item.title}${item.category ? ` — a ${item.category} project` : ''}.`}
        path={`/case-study/${item.slug}`}
        image={item.feature_image_url || item.image_url || undefined}
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
          image: item.feature_image_url || item.image_url || undefined,
          creator: { '@type': 'Organization', name: 'DigionTop', url: 'https://www.digiontop.com/' },
        }}
      />

      {/* ── Hero ── */}
      <header className="cs__hero">
        <div className="cs__inner">
          <Link to="/portfolio" className="cs__back"><FiArrowLeft /> All Projects</Link>

          <div className="cs__heading">
            {item.logo_url && <img src={item.logo_url} alt="" className="cs__logo" />}
            <div>
              {item.category && <span className="cs__eyebrow">{item.category}</span>}
              <h1 className="cs__title">{item.title}</h1>
            </div>
          </div>

          {item.description && <p className="cs__lead">{item.description}</p>}

          {item.link_url && (
            <a className="cs__btn" href={item.link_url} target="_blank" rel="noopener noreferrer">
              Visit {host || 'the live site'} <FiExternalLink />
            </a>
          )}
        </div>
      </header>

      {/* ── Feature image ── */}
      {item.feature_image_url && (
        <section className="cs__feature">
          <div className="cs__inner">
            <img src={item.feature_image_url} alt={item.title} loading="lazy" />
          </div>
        </section>
      )}

      {/* ── Write-up ── */}
      {item.content && (
        <section className="cs__body">
          <div className="cs__inner">
            <div className="cs__content" dangerouslySetInnerHTML={{ __html: item.content }} />
          </div>
        </section>
      )}

      {/* ── Full-page mockup ── */}
      {item.image_url && (
        <section className="cs__shot">
          <div className="cs__inner">
            <h2 className="cs__h2">The full page</h2>
            <div className="cs__browser">
              <div className="cs__bar">
                <span /><span /><span />
                <em>{host || 'digiontop.com'}</em>
              </div>
              <div className="cs__scroll">
                <img src={item.image_url} alt={`${item.title} full page`} loading="lazy" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── More work ── */}
      {more.length > 0 && (
        <section className="cs__more">
          <div className="cs__inner">
            <h2 className="cs__h2">More of our work</h2>
            <div className="cs__grid">
              {more.map((m) => (
                <Link key={m.id} to={`/case-study/${m.slug}`} className="cs__card">
                  <div className="cs__card-shot">
                    {m.image_url
                      ? <img src={m.image_url} alt={m.title} loading="lazy" />
                      : <span className="cs__card-blank">{(m.title || '?')[0]}</span>}
                  </div>
                  <div className="cs__card-body">
                    <span className="cs__card-title">{m.title}</span>
                    <span className="cs__card-tag">{m.category || 'Website'}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="cs__cta">
        <div className="cs__cta-box">
          <h2>Want a website like this?</h2>
          <p>Tell us about your business and we'll show you exactly what we'd build.</p>
          <Link to="/contact" className="cs__btn cs__btn--lg">Start Your Project <FiArrowUpRight /></Link>
        </div>
      </section>
    </main>
  );
}
