import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

const QUICK_REPLIES = [
  { label: '🌐 Website Development', key: 'website' },
  { label: '📈 SEO Services', key: 'seo' },
  { label: '📱 Social Media', key: 'social media' },
  { label: '🛒 E-Commerce', key: 'e-commerce' },
  { label: '💰 Pricing', key: 'pricing' },
  { label: '📞 Free Consultation', key: 'consultation' },
];

const AUTO_REPLIES = {
  website: {
    text: 'We build fast, modern websites — Landing Pages, Business Sites, WordPress & Shopify Stores.\n\n✅ Mobile Responsive\n✅ SEO Optimised\n✅ Starting from ₹8,000\n\nWant a free quote?',
    action: { label: 'Get Free Quote', href: '/contact' },
  },
  seo: {
    text: 'Our SEO services help you rank #1 on Google!\n\n✅ On-Page & Off-Page SEO\n✅ Technical SEO Audit\n✅ Average 2X traffic in 3 months\n✅ From ₹7,000/month',
    action: { label: 'View SEO Services', href: '/services/seo-services' },
  },
  'social media': {
    text: 'We manage your brand across Instagram, Facebook & YouTube.\n\n✅ Content Creation & Posting\n✅ Reels & Video Production\n✅ Paid Ad Campaigns\n✅ From ₹5,000/month',
    action: { label: 'View Social Media Plans', href: '/services/social-media-marketing' },
  },
  'e-commerce': {
    text: 'Grow your marketplace sales on Amazon, Flipkart & Meesho!\n\n✅ Product Listing Optimisation\n✅ Account Management\n✅ Sponsored Ads Setup\n✅ From ₹6,000/month',
    action: { label: 'View E-Commerce Service', href: '/services/ecommerce-solutions' },
  },
  pricing: {
    text: 'Our packages are designed for every budget:\n\n💼 Website — ₹8,000+\n📊 SEO — ₹7,000/month\n📱 Social Media — ₹5,000/month\n🛒 E-Commerce — ₹6,000/month\n\nCustom packages available on request!',
    action: { label: 'Get Custom Quote', href: '/contact' },
  },
  consultation: {
    text: 'Book a FREE 30-minute strategy call with our digital experts!\n\n✅ No commitment required\n✅ Tailored plan for your business\n✅ Real advice, not a sales pitch',
    action: { label: '📅 Book Free Consultation', href: '/contact' },
  },
  hello: { text: 'Hello! 👋 Welcome to DigionTop. How can I help you grow your business today?' },
  hi: { text: 'Hi there! 👋 Great to have you here. What digital service are you looking for?' },
  contact: {
    text: 'Here\'s how to reach us:\n\n📧 digiontop.agency@gmail.com\n📞 +91 9217594664\n📞 +91 7303769921\n🕐 Mon–Sat · 10AM–7PM IST',
    action: { label: 'Go to Contact Page', href: '/contact' },
  },
  default: {
    text: 'Thanks for your message! 🙏\n\nOur team will get back to you shortly. For immediate help, feel free to call us or book a free consultation.',
    action: { label: '📅 Book Free Consultation', href: '/contact' },
  },
};

function getReply(msg) {
  const l = msg.toLowerCase();
  if (l.includes('website') || l.includes('web') || l.includes('wordpress') || l.includes('shopify')) return AUTO_REPLIES.website;
  if (l.includes('seo') || l.includes('google') || l.includes('rank')) return AUTO_REPLIES.seo;
  if (l.includes('social') || l.includes('instagram') || l.includes('facebook') || l.includes('reel')) return AUTO_REPLIES['social media'];
  if (l.includes('ecommerce') || l.includes('amazon') || l.includes('flipkart') || l.includes('meesho')) return AUTO_REPLIES['e-commerce'];
  if (l.includes('pric') || l.includes('cost') || l.includes('package') || l.includes('rate') || l.includes('charge')) return AUTO_REPLIES.pricing;
  if (l.includes('consult') || l.includes('call') || l.includes('book') || l.includes('free') || l.includes('meet')) return AUTO_REPLIES.consultation;
  if (l.includes('hello') || l.includes('helo') || l.includes('hii')) return AUTO_REPLIES.hello;
  if (l.includes('hi') || l.includes('hey') || l.includes('namaste')) return AUTO_REPLIES.hi;
  if (l.includes('contact') || l.includes('phone') || l.includes('email') || l.includes('number')) return AUTO_REPLIES.contact;
  return AUTO_REPLIES.default;
}

function now() {
  const d = new Date();
  return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{
    from: 'bot',
    text: 'Hello! 👋 I\'m Digi, your DigionTop Assistant.\n\nI can help you with our services, pricing, or book a free consultation. What are you looking for today?',
    time: now(),
    id: 0,
  }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const [quickVisible, setQuickVisible] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 350); }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  function sendMessage(text) {
    if (!text.trim()) return;
    setQuickVisible(false);
    const userMsg = { from: 'user', text: text.trim(), time: now(), id: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const reply = getReply(text);
      setTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: reply.text, action: reply.action || null, time: now(), id: Date.now() + 1 }]);
      if (!open) setUnread(n => n + 1);
    }, 800 + Math.random() * 500);
  }

  function handleSubmit(e) { e.preventDefault(); sendMessage(input); }

  return (
    <>
      {/* FAB */}
      <button className={`cb-fab${open ? ' cb-fab--open' : ''}`} onClick={() => setOpen(v => !v)} aria-label="Chat with us">
        {open
          ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <img src="/ai-bot.png" alt="AI Chat" className="cb-fab__robot" />
        }
        {!open && unread > 0 && <span className="cb-badge">{unread}</span>}
      </button>

      {/* Window */}
      <div className={`cb-window${open ? ' cb-window--open' : ''}`}>

        {/* Header */}
        <div className="cb-header">
          <div className="cb-header__left">
            <div className="cb-header__avatar-wrap">
              <img src="/ai-bot.png" alt="Digi" className="cb-header__avatar-img" />
              <span className="cb-header__dot" />
            </div>
            <div className="cb-header__info">
              <p className="cb-header__name">Digi</p>
              <p className="cb-header__sub">DigionTop Assistant · Online</p>
            </div>
          </div>
          <button className="cb-header__close" onClick={() => setOpen(false)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Messages */}
        <div className="cb-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`cb-msg cb-msg--${msg.from}`}>
              {msg.from === 'bot' && <img src="/ai-bot.png" alt="Digi" className="cb-msg__avatar-img" />}
              <div className="cb-msg__wrap">
                <div className="cb-bubble">
                  {msg.text.split('\n').map((line, i) => (
                    <span key={i}>{line}{i < msg.text.split('\n').length - 1 && <br />}</span>
                  ))}
                  {msg.action && (
                    <a href={msg.action.href} className="cb-action-btn">{msg.action.label} →</a>
                  )}
                </div>
                <span className="cb-time">{msg.time}</span>
              </div>
            </div>
          ))}

          {typing && (
            <div className="cb-msg cb-msg--bot">
              <img src="/ai-bot.png" alt="Digi" className="cb-msg__avatar-img" />
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
            <p className="cb-quick__label">Quick options:</p>
            <div className="cb-quick__grid">
              {QUICK_REPLIES.map(q => (
                <button key={q.key} className="cb-quick-btn" onClick={() => sendMessage(q.label.replace(/^[^\s]+\s/, ''))}>{q.label}</button>
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
