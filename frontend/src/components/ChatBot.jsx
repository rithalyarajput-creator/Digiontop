import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

const BOT_AVATAR = '🤖';

const QUICK_REPLIES = [
  'Website Development',
  'SEO Services',
  'Social Media Marketing',
  'E-Commerce Solutions',
  'Pricing & Packages',
  'Book Free Consultation',
];

const AUTO_REPLIES = {
  'website development': {
    text: 'We build fast, modern websites — landing pages, business sites, WordPress & Shopify stores. Starting from ₹8,000.\n\n👉 Want a free quote?',
    action: { label: 'Get Quote', href: '/contact' },
  },
  'seo': {
    text: 'Our SEO services help you rank #1 on Google! We do on-page, off-page & technical SEO.\n\n📈 Average 2X traffic growth in 3 months.',
    action: { label: 'Learn More', href: '/services/seo-services' },
  },
  'social media': {
    text: 'We manage Instagram, Facebook & LinkedIn for your brand — content, ads & community management.\n\n📱 Starting from ₹5,000/month.',
    action: { label: 'View Service', href: '/services/social-media-marketing' },
  },
  'e-commerce': {
    text: 'We handle Amazon, Flipkart & Meesho listings, ads & account management to grow your marketplace sales.',
    action: { label: 'View Service', href: '/services/ecommerce-solutions' },
  },
  'pricing': {
    text: 'Our packages start from:\n• Website: ₹8,000+\n• SEO: ₹7,000/month\n• Social Media: ₹5,000/month\n• E-Commerce: ₹6,000/month\n\nCustom packages available!',
    action: { label: 'Get Custom Quote', href: '/contact' },
  },
  'consultation': {
    text: 'Great! Book a FREE 30-minute strategy call with our team. We\'ll analyze your business and suggest the best digital marketing plan.',
    action: { label: 'Book Now', href: '/contact' },
  },
  'hello': { text: 'Hello! 👋 How can I help you today? I can tell you about our services, pricing, or help you book a free consultation.' },
  'hi': { text: 'Hi there! 👋 Welcome to DigionTop. What are you looking for today?' },
  'contact': {
    text: '📞 You can reach us at:\n• Email: digiontop.agency@gmail.com\n• Phone: +91 9217594664\n• Hours: Mon–Sat, 10AM–7PM IST',
    action: { label: 'Contact Page', href: '/contact' },
  },
  'default': {
    text: 'Thanks for your message! Our team will get back to you shortly.\n\n📞 For immediate help, call +91 9217594664 or book a free consultation.',
    action: { label: 'Book Free Consultation', href: '/contact' },
  },
};

function getReply(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes('website') || lower.includes('web')) return AUTO_REPLIES['website development'];
  if (lower.includes('seo') || lower.includes('google') || lower.includes('rank')) return AUTO_REPLIES['seo'];
  if (lower.includes('social') || lower.includes('instagram') || lower.includes('facebook')) return AUTO_REPLIES['social media'];
  if (lower.includes('ecommerce') || lower.includes('amazon') || lower.includes('flipkart') || lower.includes('meesho')) return AUTO_REPLIES['e-commerce'];
  if (lower.includes('pric') || lower.includes('cost') || lower.includes('package') || lower.includes('rate')) return AUTO_REPLIES['pricing'];
  if (lower.includes('consult') || lower.includes('call') || lower.includes('book') || lower.includes('free')) return AUTO_REPLIES['consultation'];
  if (lower.includes('hello') || lower.includes('helo')) return AUTO_REPLIES['hello'];
  if (lower.includes('hi') || lower.includes('hey') || lower.includes('hii')) return AUTO_REPLIES['hi'];
  if (lower.includes('contact') || lower.includes('phone') || lower.includes('email')) return AUTO_REPLIES['contact'];
  return AUTO_REPLIES['default'];
}

function Message({ msg }) {
  return (
    <div className={`cb-msg cb-msg--${msg.from}`}>
      {msg.from === 'bot' && <span className="cb-avatar">{BOT_AVATAR}</span>}
      <div className="cb-bubble">
        <p className="cb-text">{msg.text}</p>
        {msg.action && (
          <a href={msg.action.href} className="cb-action-btn">{msg.action.label} →</a>
        )}
        <span className="cb-time">{msg.time}</span>
      </div>
    </div>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: 'Hi! 👋 I\'m Digi, your DigionTop assistant.\n\nHow can I help you grow your business today?',
      time: now(),
      id: 0,
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  function now() {
    const d = new Date();
    return d.getHours().toString().padStart(2,'0') + ':' + d.getMinutes().toString().padStart(2,'0');
  }

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  function sendMessage(text) {
    if (!text.trim()) return;
    const userMsg = { from: 'user', text: text.trim(), time: now(), id: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const reply = getReply(text);
      setTyping(false);
      setMessages((prev) => [...prev, {
        from: 'bot',
        text: reply.text,
        action: reply.action || null,
        time: now(),
        id: Date.now() + 1,
      }]);
      if (!open) setUnread((n) => n + 1);
    }, 900 + Math.random() * 400);
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      {/* Floating button */}
      <button
        className={`cb-fab${open ? ' cb-fab--open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
        )}
        {!open && unread > 0 && <span className="cb-badge">{unread}</span>}
      </button>

      {/* Chat window */}
      <div className={`cb-window${open ? ' cb-window--open' : ''}`}>
        {/* Header */}
        <div className="cb-header">
          <div className="cb-header__info">
            <span className="cb-header__avatar">🤖</span>
            <div>
              <p className="cb-header__name">Digi — DigionTop Assistant</p>
              <p className="cb-header__status"><span className="cb-dot"></span> Online · Replies instantly</p>
            </div>
          </div>
          <button className="cb-header__close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
        </div>

        {/* Messages */}
        <div className="cb-messages">
          {messages.map((msg) => <Message key={msg.id} msg={msg} />)}
          {typing && (
            <div className="cb-msg cb-msg--bot">
              <span className="cb-avatar">{BOT_AVATAR}</span>
              <div className="cb-bubble cb-bubble--typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick replies */}
        <div className="cb-quick">
          {QUICK_REPLIES.map((q) => (
            <button key={q} className="cb-quick-btn" onClick={() => sendMessage(q)}>{q}</button>
          ))}
        </div>

        {/* Input */}
        <form className="cb-input-row" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="cb-input"
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="cb-send" type="submit" aria-label="Send" disabled={!input.trim()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </form>
      </div>
    </>
  );
}
