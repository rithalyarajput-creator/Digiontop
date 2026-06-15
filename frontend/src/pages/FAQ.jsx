import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiMinus } from 'react-icons/fi';
import '../styles/FAQ.css';

/* ─── FAQ Data ─── */
const faqs = [
  {
    id: 1,
    question: 'How long does it take to build a website?',
    answer:
      'Timeline depends on the type of website. A standard business website typically takes 7–14 business days from brief to launch. A Shopify e-commerce store usually takes 10–21 business days depending on the number of products and custom features. A focused landing page is the fastest — we can deliver those in 3–5 business days. We always share a clear project timeline before work begins so you know exactly what to expect.',
  },
  {
    id: 2,
    question: 'How soon will I see results from SEO?',
    answer:
      'SEO is a long-term investment and honest timelines matter. Most businesses start seeing meaningful organic growth within 3–6 months of consistent work. That said, some technical improvements and quick wins — like fixing crawl errors, improving page speed, or targeting low-competition keywords — can show early signals within 4–8 weeks. We track and report progress from day one so you can see the momentum building even before the big results arrive.',
  },
  {
    id: 3,
    question: 'Do you offer a free consultation?',
    answer:
      'Yes, absolutely. Every new client engagement starts with a free 30-minute strategy call. During this call we listen to your business goals, assess your current digital presence, and identify the highest-impact areas to focus on. There is no sales pressure — just an honest conversation. If we are a good fit, we will put together a custom plan. If not, we will point you in the right direction.',
  },
  {
    id: 4,
    question: 'Do I need to sign a long-term contract?',
    answer:
      'No. We believe in earning your business every single month — not locking you in. Our services run on a flexible monthly retainer model with no long-term commitments required. If you ever decide to pause or stop, all we ask for is 15 days notice. Your campaigns, reports, and assets always remain yours. We are confident our work will speak for itself.',
  },
  {
    id: 5,
    question: 'Can you work with businesses outside major cities?',
    answer:
      'Yes — and this is one of our core strengths. DigionTop is a fully remote agency, which means we work with businesses across all of India, regardless of location. Whether you are based in Mumbai, Jaipur, Coimbatore, or a smaller Tier-2 or Tier-3 city, we can serve you just as effectively as any local agency. All communication, reporting, and collaboration happens online through calls, emails, and shared dashboards.',
  },
  {
    id: 6,
    question: 'What platforms do you build websites on?',
    answer:
      'We build on the platform that best fits your business needs and budget. Our primary platforms are WordPress (ideal for business websites, blogs, and content-driven sites), Shopify (our go-to for e-commerce brands), and custom HTML/CSS/JavaScript for lightweight, high-performance landing pages or unique requirements. We assess your goals during the consultation and recommend the right platform — we never push a technology that does not serve your business.',
  },
  {
    id: 7,
    question: 'Do you manage Amazon and Flipkart accounts entirely?',
    answer:
      'Yes. Our marketplace management service is end-to-end. We handle everything — account setup and health monitoring, product listing creation and optimisation, keyword research for search ranking, A+ content and storefront design, sponsored ad campaigns (PPC), review management, and monthly performance reporting. You stay informed without having to manage the complexity yourself. We act as your dedicated marketplace team.',
  },
  {
    id: 8,
    question: 'How will I know if my SEO campaigns are working?',
    answer:
      'Transparency is non-negotiable at DigionTop. Every month you receive a detailed performance report covering keyword rankings, organic traffic growth, backlinks acquired, technical health scores, and key conversions. Alongside the report, we schedule a monthly review call to walk you through the numbers, explain what we did, what worked, what we are adjusting, and what is planned for the next month. You will always have full visibility and never be left guessing.',
  },
  {
    id: 9,
    question: 'What makes DigionTop different from other digital agencies?',
    answer:
      'A few things set us apart. First, we are remote-first — our lean structure means zero agency overheads, and every rupee you spend goes into actual work, not office rent or account managers who just forward emails. Second, we offer all digital services under one roof — SEO, social media, website development, and marketplace management — so your strategy is unified, not fragmented across multiple vendors. Third, we operate with full transparency: clear pricing, real reports, honest advice, and no lock-in contracts. We grow when you grow.',
  },
  {
    id: 10,
    question: 'How do I get started with DigionTop?',
    answer:
      'Getting started is simple. Book a free 30-minute consultation through our contact page or by calling us directly. On the call, we learn about your business, your goals, and your current challenges. Within 24 hours of that call, we will send you a custom plan with recommended services, a clear scope of work, and transparent pricing. Once you approve, we kick off within days. No long onboarding delays — we move as fast as your business needs.',
  },
];

/* ─── Single Accordion Item ─── */
function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
      <button
        className="faq-item__trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        id={`faq-trigger-${item.id}`}
      >
        <span className="faq-item__question">{item.question}</span>
        <span className="faq-item__icon" aria-hidden="true">
          {isOpen ? <FiMinus size={20} /> : <FiPlus size={20} />}
        </span>
      </button>

      <div
        className="faq-item__body"
        id={`faq-answer-${item.id}`}
        role="region"
        aria-labelledby={`faq-trigger-${item.id}`}
      >
        <p className="faq-item__answer">{item.answer}</p>
      </div>
    </div>
  );
}

/* ─── Page Component ─── */
export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <main className="faq-page">
      {/* ══════════════════════════════════════
          1. PAGE HERO
      ══════════════════════════════════════ */}
      <section className="faq-hero">
        <div className="faq-hero__overlay" />
        <div className="faq-hero__content">
          <h1 className="faq-hero__heading">Frequently Asked Questions</h1>
          <nav className="faq-hero__breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="faq-hero__breadcrumb-link">Home</Link>
            <span className="faq-hero__breadcrumb-sep" aria-hidden="true">/</span>
            <span className="faq-hero__breadcrumb-current">FAQ</span>
          </nav>
          <p className="faq-hero__sub">
            Honest answers to the questions we hear most often.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. FAQ ACCORDION
      ══════════════════════════════════════ */}
      <section className="faq-section">
        <div className="faq-container">
          <div className="faq-section__header">
            <span className="faq-label">Got Questions?</span>
            <h2 className="faq-section__heading">Everything You Need to Know</h2>
            <p className="faq-section__sub">
              Can't find what you're looking for? Reach out — we respond within one business day.
            </p>
          </div>

          <div className="faq-accordion" role="list">
            {faqs.map((item) => (
              <FAQItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. CTA BANNER
      ══════════════════════════════════════ */}
      <section className="faq-cta">
        <div className="faq-container">
          <div className="faq-cta__inner">
            <div className="faq-cta__text">
              <h2 className="faq-cta__heading">Still Have Questions? Let's Talk.</h2>
              <p className="faq-cta__sub">
                Book a free 30-minute strategy call and get straight answers from our team — no
                scripts, no pressure, just real advice tailored to your business.
              </p>
            </div>
            <Link to="/contact" className="faq-cta__btn">
              Book Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
