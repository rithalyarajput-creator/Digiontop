import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

const QUICK_REPLIES = [
  { label: 'Website Development', key: 'website' },
  { label: 'SEO Services',        key: 'seo' },
  { label: 'Social Media',        key: 'social media' },
  { label: 'E-Commerce',          key: 'e-commerce' },
  { label: 'Pricing',             key: 'pricing' },
  { label: 'Free Consultation',   key: 'consultation' },
];

const REPLIES = {
  website: {
    text: 'We design and build high-performance websites tailored to your business.\n\nLanding pages, business sites, WordPress, and Shopify stores — all mobile-first and SEO-ready. Packages start from Rs. 8,000.\n\nWould you like a free quote?',
    action: { label: 'Get Free Quote', href: '/contact' },
  },
  seo: {
    text: 'Our SEO strategies are built to rank your business at the top of Google search results.\n\nWe cover on-page, off-page, and technical SEO — with most clients seeing a 2x traffic increase within 90 days. Plans from Rs. 7,000/month.',
    action: { label: 'View SEO Services', href: '/services/seo-services' },
  },
  'social media': {
    text: 'We manage your brand presence across Instagram, Facebook, and YouTube.\n\nFrom content creation and reel production to paid ad campaigns — we handle it all. Plans start from Rs. 5,000/month.',
    action: { label: 'View Social Media Plans', href: '/services/social-media-marketing' },
  },
  'e-commerce': {
    text: 'We help you scale your sales on Amazon, Flipkart, and Meesho.\n\nOur team handles product listing optimisation, account management, and sponsored ad campaigns — starting at Rs. 6,000/month.',
    action: { label: 'View E-Commerce Service', href: '/services/ecommerce-solutions' },
  },
  pricing: {
    text: 'Our packages are structured to suit every budget:\n\nWebsite Development — from Rs. 8,000\nSEO Services — from Rs. 7,000/month\nSocial Media Management — from Rs. 5,000/month\nE-Commerce Management — from Rs. 6,000/month\n\nCustom packages are available on request.',
    action: { label: 'Get Custom Quote', href: '/contact' },
  },
  consultation: {
    text: 'Book a free 30-minute strategy session with our digital marketing experts.\n\nNo commitment required. You will receive a tailored roadmap for your business with actionable steps — completely free.',
    action: { label: 'Book Free Consultation', href: '/contact' },
  },
  hello: { text: 'Hello! Welcome to DigionTop. How can we help you grow your business today?' },
  hi:    { text: 'Hi there! Great to have you here. What digital service can we assist you with?' },
  contact: {
    text: 'You can reach our team through any of the following:\n\nEmail: digiontop.agency@gmail.com\nPhone: +91 9217594664\nPhone: +91 7303769921\n\nAvailable Monday to Saturday, 10 AM to 7 PM IST.',
    action: { label: 'Go to Contact Page', href: '/contact' },
  },
  default: {
    text: 'Thank you for reaching out to DigionTop.\n\nOur team will respond to your query shortly. For immediate assistance, please call us or book a free consultation — we are happy to help.',
    action: { label: 'Book Free Consultation', href: '/contact' },
  },
};

function getReply(msg) {
  const l = msg.toLowerCase();
  if (l.includes('website') || l.includes('web') || l.includes('wordpress') || l.includes('shopify')) return REPLIES.website;
  if (l.includes('seo') || l.includes('google') || l.includes('rank') || l.includes('search')) return REPLIES.seo;
  if (l.includes('social') || l.includes('instagram') || l.includes('facebook') || l.includes('reel')) return REPLIES['social media'];
  if (l.includes('ecommerce') || l.includes('amazon') || l.includes('flipkart') || l.includes('meesho')) return REPLIES['e-commerce'];
  if (l.includes('pric') || l.includes('cost') || l.includes('package') || l.includes('rate') || l.includes('charge')) return REPLIES.pricing;
  if (l.includes('consult') || l.includes('call') || l.includes('book') || l.includes('free') || l.includes('meet')) return REPLIES.consultation;
  if (l.includes('hello') || l.includes('helo') || l.includes('hii') || l.includes('namaste')) return REPLIES.hello;
  if (l.includes('hi') || l.includes('hey')) return REPLIES.hi;
  if (l.includes('contact') || l.includes('phone') || l.includes('email') || l.includes('number')) return REPLIES.contact;
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
    text: 'Welcome to DigionTop. I am Digi, your digital assistant.\n\nI can help you explore our services, check pricing, or schedule a free consultation. How can I assist you today?',
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
