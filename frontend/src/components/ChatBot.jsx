import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

const QUICK_REPLIES = [
  { label: '🎁 Free Brand Audit', key: 'audit' },
  { label: 'Website Development',  key: 'website' },
  { label: 'Shopify Store',        key: 'shopify' },
  { label: 'SEO Services',         key: 'seo' },
  { label: 'Social Media',         key: 'social media' },
  { label: 'E-Commerce',           key: 'e-commerce' },
  { label: 'Performance Ads',      key: 'ads' },
  { label: 'Branding & Design',    key: 'branding' },
  { label: 'Pricing',              key: 'pricing' },
];

const AUDIT_ACTION = { label: '🎁 Get My Free Brand Audit', href: '/contact' };

const REPLIES = {
  audit: {
    text: 'Great choice! 🎁 We offer a 100% FREE brand audit for your business.\n\nOur experts will review your website, SEO, social media & competitors — then send you a clear report with exactly what to fix to grow faster.\n\nNo cost, no commitment. Just fill the quick form and we will deliver your free audit within 1 business day.',
    action: AUDIT_ACTION,
  },
  website: {
    text: 'We build fast, modern, mobile-first websites that turn visitors into customers — business sites, WordPress, custom web apps & more.\n\n💰 Pricing: Business websites from ₹8,000 · Custom web apps quoted on scope.\n\nWant a free brand audit + custom quote for your website?',
    action: AUDIT_ACTION,
  },
  shopify: {
    text: 'We design high-converting Shopify stores — custom theme, product setup, payment & shipping integration, apps & speed optimisation.\n\n💰 Pricing: Shopify stores from ₹15,000 depending on products & features.\n\nLet us audit your store idea for free and send a tailored plan.',
    action: AUDIT_ACTION,
  },
  seo: {
    text: 'Our SEO ranks your business #1 on Google — on-page, technical, local & content SEO. Most clients see a 2x traffic lift within 90 days.\n\n💰 Pricing: SEO plans from ₹7,000/month.\n\nWant a FREE SEO audit of your website? We will show you exactly what is holding your rankings back.',
    action: AUDIT_ACTION,
  },
  'social media': {
    text: 'We grow your brand on Instagram, Facebook, YouTube & LinkedIn — content, reels, posts, community & paid campaigns.\n\n💰 Pricing: Social media management from ₹5,000/month.\n\nGet a free audit of your social pages and a 30-day growth plan.',
    action: AUDIT_ACTION,
  },
  'e-commerce': {
    text: 'We scale your sales on Amazon, Flipkart, Meesho & Shopify — product listing, SEO, catalog & sponsored ads.\n\n💰 Pricing: Marketplace management from ₹6,000/month.\n\nWant a free audit of your product listings? We will spot the quick wins.',
    action: AUDIT_ACTION,
  },
  ads: {
    text: 'High-ROI paid campaigns on Google & Meta — lead generation, conversion optimisation & retargeting that actually delivers customers.\n\n💰 Pricing: Ad management from ₹8,000/month + ad spend.\n\nGet a free audit of your current ads (or a fresh strategy).',
    action: AUDIT_ACTION,
  },
  branding: {
    text: 'Logos, brand identity, social creatives, packaging & marketing design that makes your brand memorable.\n\n💰 Pricing: Logo & identity from ₹4,000 · Monthly creative packs available.\n\nWant a free brand review? We will tell you how to look more premium.',
    action: AUDIT_ACTION,
  },
  pricing: {
    text: '💰 DigionTop pricing (starting from):\n\n• Website Development — ₹8,000\n• Shopify Store — ₹15,000\n• SEO Services — ₹7,000/month\n• Social Media — ₹5,000/month\n• E-Commerce Management — ₹6,000/month\n• Performance Ads — ₹8,000/month\n• Branding & Logo — ₹4,000\n\nFinal price depends on your needs. Get a free audit + exact custom quote.',
    action: AUDIT_ACTION,
  },
  consultation: {
    text: 'Book a FREE 30-minute strategy session with our experts. You will get a tailored roadmap + a free brand audit — completely free, no commitment.',
    action: AUDIT_ACTION,
  },
  hello: { text: 'Hello! 👋 Welcome to DigionTop. I can tell you about our services, pricing, or set up your FREE brand audit. What would you like?', action: AUDIT_ACTION },
  hi:    { text: 'Hi there! 👋 Great to have you here. Want me to explain our services, share pricing, or book your FREE brand audit?', action: AUDIT_ACTION },
  thanks: { text: 'You are welcome! 😊 Whenever you are ready, grab your free brand audit and we will help you grow.', action: AUDIT_ACTION },
  contact: {
    text: 'Here is how to reach DigionTop:\n\n📧 Email: digiontop.agency@gmail.com\n📞 Phone: +91 92175 94664\n\nAvailable Mon–Sat, 10 AM – 7 PM IST. Or just fill the form and we will call you.',
    action: { label: 'Go to Contact Page', href: '/contact' },
  },
  default: {
    text: 'Thanks for reaching out to DigionTop! 🚀\n\nI can help with Website Development, Shopify, SEO, Social Media, E-Commerce, Ads & Branding. The best first step is a FREE brand audit — we will review your business and show you how to grow.',
    action: AUDIT_ACTION,
  },
};

function getReply(msg) {
  const l = msg.toLowerCase();
  if (l.includes('audit') || l.includes('review') || l.includes('check my') || l.includes('analyse') || l.includes('analyze') || l.includes('free brand')) return REPLIES.audit;
  if (l.includes('shopify')) return REPLIES.shopify;
  if (l.includes('website') || l.includes('web ') || l.includes('webite') || l.includes('wordpress') || l.includes('app') || l.includes('landing')) return REPLIES.website;
  if (l.includes('seo') || l.includes('google') || l.includes('rank') || l.includes('traffic') || l.includes('search')) return REPLIES.seo;
  if (l.includes('social') || l.includes('instagram') || l.includes('insta') || l.includes('facebook') || l.includes('reel') || l.includes('youtube')) return REPLIES['social media'];
  if (l.includes('ecommerce') || l.includes('e-commerce') || l.includes('amazon') || l.includes('flipkart') || l.includes('meesho') || l.includes('marketplace')) return REPLIES['e-commerce'];
  if (l.includes('ads') || l.includes('ppc') || l.includes('google ads') || l.includes('meta') || l.includes('lead') || l.includes('campaign')) return REPLIES.ads;
  if (l.includes('brand') || l.includes('logo') || l.includes('design') || l.includes('creative') || l.includes('identity')) return REPLIES.branding;
  if (l.includes('pric') || l.includes('cost') || l.includes('package') || l.includes('rate') || l.includes('charge') || l.includes('budget') || l.includes('kitna') || l.includes('paisa')) return REPLIES.pricing;
  if (l.includes('consult') || l.includes('call') || l.includes('book') || l.includes('meet')) return REPLIES.consultation;
  if (l.includes('thank') || l.includes('thanks') || l.includes('thx')) return REPLIES.thanks;
  if (l.includes('hello') || l.includes('helo') || l.includes('hii') || l.includes('namaste')) return REPLIES.hello;
  if (l.includes('hi') || l.includes('hey')) return REPLIES.hi;
  if (l.includes('contact') || l.includes('phone') || l.includes('email') || l.includes('number') || l.includes('reach')) return REPLIES.contact;
  if (l.includes('free') || l.includes('offer')) return REPLIES.audit;
  return REPLIES.default;
}

function getTime() {
  const d = new Date();
  return d.getHours().toString().padStart(2,'0') + ':' + d.getMinutes().toString().padStart(2,'0');
}

export default function ChatBot() {
  const [open, setOpen]     = useState(false);
  const [messages, setMessages] = useState([{
    from: 'bot',
    text: 'Hi! 👋 I am Digi, your DigionTop assistant.\n\nI can explain our services, share pricing, and set up your 🎁 FREE Brand Audit. What would you like to know?',
    action: AUDIT_ACTION,
    time: getTime(),
    id: 0,
  }]);
  const [input,   setInput]   = useState('');
  const [typing,  setTyping]  = useState(false);
  const [unread,  setUnread]  = useState(1);
  const [quickVisible, setQuickVisible] = useState(true);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    if (open) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 300); }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  function sendMessage(text) {
    if (!text.trim()) return;
    setQuickVisible(false);
    setMessages(prev => [...prev, { from: 'user', text: text.trim(), time: getTime(), id: Date.now() }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const reply = getReply(text);
      setTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: reply.text, action: reply.action || null, time: getTime(), id: Date.now() + 1 }]);
      if (!open) setUnread(n => n + 1);
    }, 900 + Math.random() * 400);
  }

  function handleSubmit(e) { e.preventDefault(); sendMessage(input); }

  return (
    <>
      {/* ── FAB ── */}
      <button
        className={`cb-fab${open ? ' cb-fab--open' : ''}`}
        onClick={() => setOpen(v => !v)}
        aria-label="Chat with Digi"
      >
        {open
          ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <img src="/ai-bot.png" alt="Chat" className="cb-fab__robot" />
        }
        {!open && unread > 0 && <span className="cb-badge">{unread}</span>}
      </button>

      {/* ── Window ── */}
      <div className={`cb-window${open ? ' cb-window--open' : ''}`}>

        {/* Header */}
        <div className="cb-header">
          <div className="cb-header__bot">
            <div className="cb-header__img-wrap">
              <img src="/ai-bot.png" alt="Digi" className="cb-header__img" />
              <span className="cb-header__online" />
            </div>
            <div className="cb-header__info">
              <p className="cb-header__name">Digi</p>
              <p className="cb-header__status">
                <span className="cb-header__status-dot" />
                Online — DigionTop Assistant
              </p>
            </div>
          </div>
          <button className="cb-header__close" onClick={() => setOpen(false)} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Messages */}
        <div className="cb-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`cb-msg cb-msg--${msg.from}`}>
              {msg.from === 'bot' && (
                <img src="/ai-bot.png" alt="Digi" className="cb-msg__bot-img" />
              )}
              <div className="cb-msg__wrap">
                <div className="cb-bubble">
                  {msg.text.split('\n').map((line, i, arr) => (
                    <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                  ))}
                  {msg.action && (
                    <a href={msg.action.href} className="cb-action-btn">
                      {msg.action.label}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                  )}
                </div>
                <span className="cb-time">{msg.time}</span>
              </div>
            </div>
          ))}

          {typing && (
            <div className="cb-msg cb-msg--bot">
              <img src="/ai-bot.png" alt="Digi" className="cb-msg__bot-img" />
              <div className="cb-msg__wrap">
                <div className="cb-bubble cb-bubble--typing">
                  <span /><span /><span />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick replies */}
        {quickVisible && (
          <div className="cb-quick">
            <p className="cb-quick__label">Quick Options</p>
            <div className="cb-quick__grid">
              {QUICK_REPLIES.map(q => (
                <button
                  key={q.key}
                  className="cb-quick-btn"
                  onClick={() => sendMessage(q.label)}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <form className="cb-input-row" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="cb-input"
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button className="cb-send" type="submit" disabled={!input.trim()} aria-label="Send">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </form>

        <div className="cb-footer">Powered by <strong>DigionTop</strong></div>
      </div>
    </>
  );
}
