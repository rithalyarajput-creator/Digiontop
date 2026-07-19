import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

const QUICK_REPLIES = [
  { label: 'How can you help?', key: 'help' },
  { label: 'Contact Number',    key: 'contact' },
  { label: 'Free Consultation', key: 'consultation' },
  { label: 'Website',              key: 'website' },
  { label: 'SEO',                  key: 'seo' },
  { label: 'Social Media',         key: 'social media' },
  { label: 'Ads',                  key: 'ads' },
];

const AUDIT_ACTION  = { label: 'Get Free Consultation', href: '/contact' };
const CALL_ACTION   = { label: 'Call +91 92175 94664', href: 'tel:+919217594664' };

/* Short, website-only answers. Kept 1–3 lines each. */
const REPLIES = {
  help: {
    text: 'We help you grow online!\nWebsites, SEO, Social Media, Ads, E-Commerce & Branding.\nWhat are you looking for?',
    action: AUDIT_ACTION,
  },
  website: {
    text: 'We build fast, mobile-first websites that convert.\nGet a free quote, no obligation!',
    action: AUDIT_ACTION,
  },
  shopify: {
    text: 'High-converting Shopify stores, setup, payments & speed.\nGet a free quote, no obligation!',
    action: AUDIT_ACTION,
  },
  seo: {
    text: 'We rank you #1 on Google, on-page, technical & local SEO.\nGet a free quote, no obligation!',
    action: AUDIT_ACTION,
  },
  'social media': {
    text: 'Instagram, Facebook & more, content, reels & growth.\nGet a free quote, no obligation!',
    action: AUDIT_ACTION,
  },
  'e-commerce': {
    text: 'Amazon, Flipkart & Meesho, listings, SEO & ads.\nGet a free quote, no obligation!',
    action: AUDIT_ACTION,
  },
  ads: {
    text: 'High-ROI Google & Meta ads that bring real leads.\nGet a free quote, no obligation!',
    action: AUDIT_ACTION,
  },
  branding: {
    text: 'Logo, brand identity & creatives that stand out.\nGet a free quote, no obligation!',
    action: AUDIT_ACTION,
  },
  pricing: {
    text: 'Pricing depends on your needs and goals.\nEvery business is unique!\nBook a free consultation to get a custom quote.',
    action: AUDIT_ACTION,
  },
  consultation: {
    text: 'Book a FREE 30-min strategy call.\nWe’ll share a clear plan to grow your business, no cost.',
    action: AUDIT_ACTION,
  },
  contact: {
    text: 'Phone: +91 92175 94664\nEmail: digiontop.agency@gmail.com\nMon–Sat, 10 AM – 7 PM.',
    action: CALL_ACTION,
  },
  timing: {
    text: 'We’re available Mon–Sat, 10 AM – 7 PM IST.\nFill the form anytime, we reply within 1 business day.',
    action: AUDIT_ACTION,
  },
  location: {
    text: 'We’re a remote-first agency based in Delhi, serving businesses across all of India.',
    action: AUDIT_ACTION,
  },
  hello:  { text: 'Hi! I’m Digi. How can I help you today?', action: AUDIT_ACTION },
  thanks: { text: 'You’re welcome! Anything else I can help with?', action: AUDIT_ACTION },
  default: {
    text: 'I can help with Websites, SEO, Social Media, Ads & Pricing.\nWhat would you like to know?',
    action: AUDIT_ACTION,
  },
};

function getReply(msg) {
  const l = msg.toLowerCase();
  if (l.includes('help') || l.includes('what do you') || l.includes('what can') || l.includes('services') || l.includes('service')) return REPLIES.help;
  if (l.includes('shopify')) return REPLIES.shopify;
  if (l.includes('website') || l.includes('web ') || l.includes('webite') || l.includes('wordpress') || l.includes('app') || l.includes('landing')) return REPLIES.website;
  if (l.includes('seo') || l.includes('google') || l.includes('rank') || l.includes('traffic') || l.includes('search')) return REPLIES.seo;
  if (l.includes('social') || l.includes('instagram') || l.includes('insta') || l.includes('facebook') || l.includes('reel') || l.includes('youtube')) return REPLIES['social media'];
  if (l.includes('ecommerce') || l.includes('e-commerce') || l.includes('amazon') || l.includes('flipkart') || l.includes('meesho') || l.includes('marketplace')) return REPLIES['e-commerce'];
  if (l.includes('ads') || l.includes('ppc') || l.includes('meta') || l.includes('lead') || l.includes('campaign')) return REPLIES.ads;
  if (l.includes('brand') || l.includes('logo') || l.includes('design') || l.includes('creative') || l.includes('identity')) return REPLIES.branding;
  if (l.includes('pric') || l.includes('cost') || l.includes('package') || l.includes('rate') || l.includes('charge') || l.includes('budget') || l.includes('kitna') || l.includes('paisa') || l.includes('fees')) return REPLIES.pricing;
  if (l.includes('consult') || l.includes('call') || l.includes('book') || l.includes('meet') || l.includes('free') || l.includes('audit') || l.includes('quote')) return REPLIES.consultation;
  if (l.includes('contact') || l.includes('phone') || l.includes('email') || l.includes('number') || l.includes('reach') || l.includes('whatsapp')) return REPLIES.contact;
  if (l.includes('time') || l.includes('open') || l.includes('hour') || l.includes('when') || l.includes('available')) return REPLIES.timing;
  if (l.includes('where') || l.includes('location') || l.includes('address') || l.includes('city') || l.includes('office')) return REPLIES.location;
  if (l.includes('thank') || l.includes('thx')) return REPLIES.thanks;
  if (l.includes('hello') || l.includes('helo') || l.includes('hii') || l.includes('namaste') || l.includes('hi') || l.includes('hey')) return REPLIES.hello;
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
    text: 'Hi! I’m Digi from DigionTop.\nHow can I help you today?',
    action: AUDIT_ACTION,
    time: getTime(),
    id: 0,
  }]);
  const [input,   setInput]   = useState('');
  const [typing,  setTyping]  = useState(false);
  // Starts at 0: the badge should mean "someone replied to you", not sit at 1
  // from the first page load counting a greeting nobody sent.
  const [unread,  setUnread]  = useState(0);
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
                Online, DigionTop Assistant
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
