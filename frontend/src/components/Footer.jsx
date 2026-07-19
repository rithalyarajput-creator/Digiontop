import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FiMail, FiPhone, FiMapPin, FiHeadphones, FiShield } from "react-icons/fi";
import { useSettings } from "../context/SettingsContext";
import "../styles/Footer.css";

const Footer = () => {
  const { settings } = useSettings();
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
      const res = await fetch("/api/cms?resource=newsletter", {
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
              <img src={(settings.logo_footer || "/images/logo-footer.webp").replace(/\/images\/(logo-\w+)\.(png|jpe?g)$/i, "/images/$1.webp")} alt={settings.site_name || "DigionTop"} />
            </div>
            <p className="footer-desc">{settings.tagline || "Digital Marketing Agency"}</p>
            <p className="footer-about-text">
              {settings.description || "We help brands rank higher, grow faster and generate more revenue with result driven digital marketing strategies."}
            </p>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <span className="footer-contact-icon"><FiMail /></span>
                <a href={`mailto:${settings.contact_email || "digiontop.agency@gmail.com"}`} className="footer-link">{settings.contact_email || "digiontop.agency@gmail.com"}</a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon"><FiPhone /></span>
                <span className="footer-link">{settings.contact_phone || "+91 9217594664"}{settings.contact_phone2 ? <> &nbsp;|&nbsp; {settings.contact_phone2}</> : null}</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon"><FiMapPin /></span>
                <span className="footer-link">India</span>
              </div>
            </div>
            <div className="footer-follow">
              <p className="footer-follow-label">Follow Us</p>
              <div className="footer-socials">
                {settings.social_instagram && <a href={settings.social_instagram} target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Instagram"><FaInstagram /></a>}
                {settings.social_facebook && <a href={settings.social_facebook} target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Facebook"><FaFacebookF /></a>}
                {settings.social_linkedin && <a href={settings.social_linkedin} target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="LinkedIn"><FaLinkedinIn /></a>}
                {settings.social_twitter && <a href={settings.social_twitter} target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="X"><FaXTwitter /></a>}
                {settings.social_youtube && <a href={settings.social_youtube} target="_blank" rel="noopener noreferrer" className="footer-social-icon footer-social-icon--yt" aria-label="YouTube"><FaYoutube /></a>}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
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
              <span className="footer-touch-icon"><FiHeadphones /></span>
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
            <span className="footer-bottom__shield"><FiShield /></span> Your Growth. Our Mission.
          </span>
          <span className="footer-bottom__links">
            <Link to="/about" className="footer-bottom__link">About</Link>
            <span className="footer-bottom__sep">•</span>
            <Link to="/contact" className="footer-bottom__link">Contact</Link>
            <span className="footer-bottom__sep">•</span>
            <span className="footer-bottom__flag">Proudly Made in India</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
