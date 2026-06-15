import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">

          {/* Column 1: About */}
          <div className="footer-col footer-col--about">
            <div className="footer-logo">
              <img src="/images/logo-footer.png" alt="DigionTop Logo" height="48" />
            </div>
            <p className="footer-tagline">Reach More. Grow Faster. Stay On Top.</p>
            <div className="footer-contact">
              <p>
                <span className="footer-contact__label">Email:</span>{" "}
                <a href="mailto:digiontop.agency@gmail.com" className="footer-link">
                  digiontop.agency@gmail.com
                </a>
              </p>
              <p>
                <span className="footer-contact__label">Phone:</span>{" "}
                <a href="tel:+919217594664" className="footer-link">+91 9217594664</a>
                {" | "}
                <a href="tel:+917303769921" className="footer-link">+91 7303769921</a>
              </p>
            </div>
            <div className="footer-socials">
              <a
                href="https://www.instagram.com/digiontop"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/digiontop"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.linkedin.com/company/digiontop"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Column 2: Our Services */}
          <div className="footer-col">
            <h3 className="footer-heading">Our Services</h3>
            <ul className="footer-list">
              <li><Link to="/services/website-development" className="footer-link">Website Development</Link></li>
              <li><Link to="/services/website-development" className="footer-link">WordPress Dev</Link></li>
              <li><Link to="/services/website-development" className="footer-link">Shopify Store Dev</Link></li>
              <li><Link to="/services/seo-services" className="footer-link">SEO Services</Link></li>
              <li><Link to="/services/social-media-marketing" className="footer-link">Social Media Marketing</Link></li>
              <li><Link to="/services/ecommerce-solutions" className="footer-link">E-Commerce Solutions</Link></li>
              <li><Link to="/services/ecommerce-solutions" className="footer-link">Amazon Listing</Link></li>
              <li><Link to="/services/ecommerce-solutions" className="footer-link">Flipkart &amp; Meesho Listings</Link></li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="footer-col">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-list">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/services/website-development" className="footer-link">Services</Link></li>
              <li><Link to="/faq" className="footer-link">FAQ</Link></li>
              <li><Link to="/why-us" className="footer-link">Why Choose Us</Link></li>
              <li><Link to="/testimonials" className="footer-link">Testimonials</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
              <li><Link to="/contact" className="footer-link footer-link--cta">Book Free Consultation</Link></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="footer-col">
            <h3 className="footer-heading">Legal</h3>
            <ul className="footer-list">
              <li><Link to="/contact" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/contact" className="footer-link">Terms of Service</Link></li>
              <li><Link to="/contact" className="footer-link">Refund Policy</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
            <div className="footer-hours">
              <h4 className="footer-hours__title">Working Hours</h4>
              <p className="footer-hours__text">Mon – Sat</p>
              <p className="footer-hours__text">10:00 AM – 7:00 PM IST</p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom__inner">
          <p className="footer-bottom__text">
            &copy; 2025 DigionTop. All Rights Reserved. | Designed &amp; Developed by DigionTop | Digital Marketing Agency India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
