import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [openCol, setOpenCol] = useState(null);
  const [subMsg, setSubMsg] = useState("");
  const [subbing, setSubbing] = useState(false);

  const toggleCol = (key) => setOpenCol((prev) => (prev === key ? null : key));

  async function handleSubscribe(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubbing(true);
    setSubMsg("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "footer" }),
      });
      if (!res.ok) throw new Error();
      setSubMsg("Subscribed! Thank you.");
      setEmail("");
    } catch {
      setSubMsg("Could not subscribe. Try again.");
    } finally {
      setSubbing(false);
    }
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">

          {/* Column 1: About */}
          <div className="footer-col footer-col--about">
            <div className="footer-logo">
              <img src="/images/logo-footer.png" alt="DigionTop" />
            </div>
            <p className="footer-desc">Digital Marketing Agency</p>
            <p className="footer-about-text">
              We help brands rank higher, grow faster and generate more revenue with result driven digital marketing strategies.
            </p>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <span className="footer-contact-icon">✉</span>
                <a href="mailto:digiontop.agency@gmail.com" className="footer-link">digiontop.agency@gmail.com</a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">✆</span>
                <span className="footer-link">+91 9217594664 &nbsp;|&nbsp; +91 7303769921</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">⊙</span>
                <span className="footer-link">India</span>
              </div>
            </div>
            <div className="footer-follow">
              <p className="footer-follow-label">Follow Us</p>
              <div className="footer-socials">
                <a href="https://www.instagram.com/digiontop.agency?igsh=aHc1Mmo2eGN1b2dn" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Instagram"><FaInstagram /></a>
                <a href="https://www.facebook.com/share/14eaPvHNx9A/" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Facebook"><FaFacebookF /></a>
                <a href="https://www.youtube.com/@digiontop" target="_blank" rel="noopener noreferrer" className="footer-social-icon footer-social-icon--yt" aria-label="YouTube"><FaYoutube /></a>
              </div>
            </div>
          </div>

          {/* Column 2: Our Services */}
          <div className={`footer-col footer-col--accordion${openCol === 'services' ? ' footer-col--open' : ''}`}>
            <h3 className="footer-heading" onClick={() => toggleCol('services')}>
              Our Services
              <span className="footer-heading-arrow">&#9660;</span>
            </h3>
            <ul className="footer-list">
              <li><Link to="/services/website-development" className="footer-link"><span className="footer-arrow">&#8250;</span> Website Development</Link></li>
              <li><Link to="/services/website-development" className="footer-link"><span className="footer-arrow">&#8250;</span> WordPress Development</Link></li>
              <li><Link to="/services/website-development" className="footer-link"><span className="footer-arrow">&#8250;</span> Shopify Store Development</Link></li>
              <li><Link to="/services/seo-services" className="footer-link"><span className="footer-arrow">&#8250;</span> SEO Services</Link></li>
              <li><Link to="/services/social-media-marketing" className="footer-link"><span className="footer-arrow">&#8250;</span> Social Media Marketing</Link></li>
              <li><Link to="/services/ecommerce-solutions" className="footer-link"><span className="footer-arrow">&#8250;</span> E-Commerce Solutions</Link></li>
              <li><Link to="/services/ecommerce-solutions" className="footer-link"><span className="footer-arrow">&#8250;</span> Amazon Listing</Link></li>
              <li><Link to="/services/ecommerce-solutions" className="footer-link"><span className="footer-arrow">&#8250;</span> Flipkart &amp; Meesho Listings</Link></li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className={`footer-col footer-col--accordion${openCol === 'quick' ? ' footer-col--open' : ''}`}>
            <h3 className="footer-heading" onClick={() => toggleCol('quick')}>
              Quick Links
              <span className="footer-heading-arrow">&#9660;</span>
            </h3>
            <ul className="footer-list">
              <li><Link to="/" className="footer-link"><span className="footer-arrow">&#8250;</span> Home</Link></li>
              <li><Link to="/about" className="footer-link"><span className="footer-arrow">&#8250;</span> About Us</Link></li>
              <li><Link to="/services/website-development" className="footer-link"><span className="footer-arrow">&#8250;</span> Services</Link></li>
              <li><Link to="/faq" className="footer-link"><span className="footer-arrow">&#8250;</span> FAQ</Link></li>
              <li><Link to="/why-us" className="footer-link"><span className="footer-arrow">&#8250;</span> Why Choose Us</Link></li>
              <li><Link to="/testimonials" className="footer-link"><span className="footer-arrow">&#8250;</span> Testimonials</Link></li>
              <li><Link to="/contact" className="footer-link"><span className="footer-arrow">&#8250;</span> Contact Us</Link></li>
              <li><Link to="/contact" className="footer-link footer-link--cta"><span className="footer-arrow">&#8250;</span> Book Free Consultation</Link></li>
            </ul>
          </div>

          {/* Column 4: Get In Touch + Newsletter + Working Hours */}
          <div className="footer-col">
            <h3 className="footer-heading">Get In Touch</h3>
            <div className="footer-touch-box">
              <span className="footer-touch-icon">🎧</span>
              <div>
                <p className="footer-touch-title">Have Questions?</p>
                <p className="footer-touch-sub">We're here to help you!</p>
              </div>
            </div>

            <div className="footer-divider"></div>

            <h3 className="footer-heading footer-heading--newsletter">Newsletter</h3>
            <p className="footer-newsletter-text">Subscribe to get updates, tips &amp; offers in your inbox.</p>
            <form className="footer-newsletter" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="footer-newsletter-input"
                required
              />
              <button className="footer-newsletter-btn" type="submit" aria-label="Subscribe" disabled={subbing}>
                {subbing ? "…" : "Subscribe"}
              </button>
            </form>
            {subMsg && <p className="footer-newsletter-msg">{subMsg}</p>}

          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom__inner">
          <span className="footer-bottom__copy">&copy; 2025 <strong>DigionTop</strong>. All Rights Reserved.</span>
          <span className="footer-bottom__mission">
            <span className="footer-bottom__shield">🛡</span> Your Growth. Our Mission.
          </span>
          <span className="footer-bottom__payments">
            <span className="footer-bottom__we-accept">We Accept</span>
            <span className="footer-payment-badge">VISA</span>
            <span className="footer-payment-badge footer-payment-badge--mc">●●</span>
            <span className="footer-payment-badge">UPI</span>
            <span className="footer-payment-badge">PayPal</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
