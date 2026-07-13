import React, { useState } from 'react';
import Seo from '../components/Seo';
import { Link } from 'react-router-dom';
import { FiPlus, FiMinus, FiMessageCircle } from 'react-icons/fi';
import '../styles/FAQ.css';

/* ─── FAQ Categories with Questions ─── */
const FAQ_DATA = [
  {
    category: 'General Information',
    items: [
      {
        id: 1,
        question: 'What types of services does DigionTop offer?',
        answer:
          'DigionTop offers a complete suite of digital marketing services: Website Development (WordPress, Shopify, custom), SEO Services, Social Media Marketing (Instagram, Facebook, YouTube), E-Commerce Management (Amazon, Flipkart, Meesho), Content Creation, and Paid Advertising. We handle your entire online presence under one roof.',
      },
      {
        id: 2,
        question: 'Is DigionTop a remote agency?',
        answer:
          'Yes — DigionTop is 100% remote-first. Our specialists are distributed across India, which means we can serve clients in any city or town without location constraints. All communication, reporting, and collaboration happens online through calls, emails, and shared dashboards.',
      },
      {
        id: 3,
        question: 'What makes DigionTop different from other agencies?',
        answer:
          'Three things set us apart: (1) Remote-first lean structure — every rupee goes into actual work, not office rent. (2) Full-service under one roof — no fragmented vendors. (3) Radical transparency — real reports, honest advice, no lock-in contracts. We grow when you grow.',
      },
    ],
  },
  {
    category: 'Products and Availability',
    items: [
      {
        id: 4,
        question: 'What platforms do you build websites on?',
        answer:
          'We build on WordPress (business websites, blogs), Shopify (e-commerce), and custom HTML/CSS/JS (landing pages, unique requirements). We assess your goals during the consultation and recommend the right platform — we never push a technology that does not serve your business.',
      },
      {
        id: 5,
        question: 'Do you manage Amazon and Flipkart accounts?',
        answer:
          'Yes — end-to-end. We handle account setup, product listing creation and optimisation, keyword research, A+ content, sponsored ad campaigns (PPC), review management, and monthly performance reporting. You stay informed without managing the complexity yourself.',
      },
    ],
  },
  {
    category: 'Ordering and Payment',
    items: [
      {
        id: 6,
        question: 'Do I need to sign a long-term contract?',
        answer:
          'No. We believe in earning your business every month — not locking you in. Our services run on a flexible monthly retainer model. If you ever decide to pause or stop, all we ask for is 15 days notice. Your campaigns, reports, and assets always remain yours.',
      },
      {
        id: 7,
        question: 'What are your pricing packages?',
        answer:
          'Our packages start at: Website from ₹8,000 · SEO from ₹7,000/month · Social Media from ₹5,000/month · E-Commerce management from ₹6,000/month. Custom packages are available for businesses with specific or combined needs. Book a free call and we will create a plan that fits your budget.',
      },
    ],
  },
  {
    category: 'Account & Profile',
    items: [
      {
        id: 8,
        question: 'Do you offer a free consultation?',
        answer:
          'Yes, absolutely. Every new client engagement starts with a free 30-minute strategy call. We listen to your business goals, assess your current digital presence, and identify the highest-impact areas. There is no sales pressure — just an honest conversation.',
      },
      {
        id: 9,
        question: 'How do I get started?',
        answer:
          'Book a free 30-minute consultation through our Contact page or call us directly. Within 24 hours of that call, we will send you a custom plan with recommended services, clear scope, and transparent pricing. Once you approve, we kick off within days.',
      },
    ],
  },
  {
    category: 'Delivery',
    items: [
      {
        id: 10,
        question: 'How long does it take to build a website?',
        answer:
          'A standard business website: 7–14 business days. A Shopify e-commerce store: 10–21 days. A focused landing page: 3–5 days. We always share a clear project timeline before work begins so you know exactly what to expect.',
      },
      {
        id: 11,
        question: 'How soon will I see results from SEO?',
        answer:
          'Most businesses start seeing meaningful organic growth within 3–6 months. Some technical improvements and quick wins can show early signals within 4–8 weeks. We track and report progress from day one so you can see momentum building even before the big results arrive.',
      },
      {
        id: 12,
        question: 'How will I know if my campaigns are working?',
        answer:
          'Every month you receive a detailed performance report covering keyword rankings, organic traffic growth, backlinks, technical health scores, and key conversions. We also schedule a monthly review call to walk you through the numbers. You will never be left guessing.',
      },
    ],
  },
];

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
      <button
        className="faq-item__trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="faq-item__question">{item.question}</span>
        <span className="faq-item__icon" aria-hidden="true">
          {isOpen ? <FiMinus size={18} /> : <FiPlus size={18} />}
        </span>
      </button>
      <div className={`faq-item__body${isOpen ? ' faq-item__body--open' : ''}`}>
        <p className="faq-item__answer">{item.answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('General Information');
  const [openId, setOpenId] = useState(2);

  const currentItems = FAQ_DATA.find(c => c.category === activeCategory)?.items || [];

  return (
    <main className="faq-page">
      <Seo
        title="Digital Marketing FAQs — Pricing, Timelines & Process"
        description="Answers to common questions about our website, SEO, social media and Amazon/Flipkart services — pricing, delivery timelines, contracts and reporting. Still unsure? Ask us."
        path="/faq"
      />
      {/* Hero */}
      <section className="faq-hero">
        <div className="faq-hero__content">
          <h1 className="faq-hero__heading">FAQs</h1>
          <nav className="faq-hero__breadcrumb">
            <Link to="/" className="faq-hero__breadcrumb-link">Home</Link>
            <span className="faq-hero__breadcrumb-sep">/</span>
            <span className="faq-hero__breadcrumb-current">FAQs</span>
          </nav>
        </div>
      </section>

      {/* Main layout */}
      <section className="faq-section">
        <div className="faq-container">
          <div className="faq-layout">

            {/* LEFT SIDEBAR */}
            <aside className="faq-sidebar">
              <nav className="faq-sidebar__nav">
                {FAQ_DATA.map(cat => (
                  <button
                    key={cat.category}
                    className={`faq-sidebar__item${activeCategory === cat.category ? ' faq-sidebar__item--active' : ''}`}
                    onClick={() => { setActiveCategory(cat.category); setOpenId(null); }}
                  >
                    {cat.category}
                  </button>
                ))}
              </nav>

              {/* Contact card */}
              <div className="faq-sidebar__contact">
                <div className="faq-sidebar__contact-icon">
                  <FiMessageCircle size={28} />
                </div>
                <p className="faq-sidebar__contact-title">You have different questions?</p>
                <p className="faq-sidebar__contact-sub">Our team will answer all your questions. We ensure a quick response.</p>
                <Link to="/contact" className="faq-sidebar__contact-btn">Contact Us</Link>
              </div>
            </aside>

            {/* RIGHT ACCORDION */}
            <div className="faq-accordion">
              {currentItems.map(item => (
                <FAQItem
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => setOpenId(prev => prev === item.id ? null : item.id)}
                />
              ))}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
