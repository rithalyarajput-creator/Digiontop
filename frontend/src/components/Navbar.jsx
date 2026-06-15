import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const servicesMenu = [
  {
    heading: 'Web Services',
    items: [
      { label: 'Website Development', path: '/services/website-development' },
      { label: 'WordPress Development', path: '/services/website-development' },
      { label: 'Shopify Store Development', path: '/services/website-development' },
    ],
  },
  {
    heading: 'Marketing',
    items: [
      { label: 'SEO Services', path: '/services/seo-services' },
      { label: 'Social Media Marketing', path: '/services/social-media-marketing' },
      { label: 'Pay Per Click (PPC)', path: '/services/seo-services' },
      { label: 'Instagram Marketing', path: '/services/social-media-marketing' },
      { label: 'Facebook Marketing', path: '/services/social-media-marketing' },
      { label: 'YouTube Marketing', path: '/services/social-media-marketing' },
    ],
  },
  {
    heading: 'Social Media',
    items: [
      { label: 'Platform Handling', path: '/services/social-media-marketing' },
      { label: 'Reels & Video Creation', path: '/services/social-media-marketing' },
      { label: 'Influencer Reels', path: '/services/social-media-marketing' },
      { label: 'UGC Video Content', path: '/services/social-media-marketing' },
      { label: 'Content Posting & Scheduling', path: '/services/social-media-marketing' },
      { label: 'Social Media Strategy', path: '/services/social-media-marketing' },
    ],
  },
  {
    heading: 'E-Commerce',
    items: [
      { label: 'E-Commerce Solutions', path: '/services/ecommerce-solutions' },
      { label: 'Amazon Listing', path: '/services/ecommerce-solutions' },
      { label: 'Flipkart & Meesho', path: '/services/ecommerce-solutions' },
    ],
  },
];

const workMenu = [
  { label: 'Website Mockups', path: '/work' },
  { label: 'Reels & Videos', path: '/work' },
  { label: 'Social Media Posts', path: '/work' },
  { label: 'Logo & Branding', path: '/work' },
  { label: 'SEO Case Studies', path: '/work' },
  { label: 'All Projects', path: '/work' },
];

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services', mega: true },
  { label: 'Work', path: '/work', dropdown: true },
  { label: 'Why Us', path: '/why-us' },
  { label: 'Industries', path: '/industries' },
  { label: 'Blog', path: '/blog' },
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const hoverTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleEnter = useCallback((key) => {
    clearTimeout(hoverTimeout.current);
    setActiveDropdown(key);
  }, []);

  const handleLeave = useCallback(() => {
    hoverTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  }, []);

  const handleMobileToggle = (key) => {
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__wrapper">
        {/* Logo — left */}
        <Link to="/" className="navbar__logo">
          <img src="/images/logo-header.png" alt="DigionTop Logo" />
        </Link>

        <div className="navbar__container">
          {/* Hamburger */}
          <button
            className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
          </button>

          {/* Nav Links */}
          <div className={`navbar__menu${menuOpen ? ' navbar__menu--open' : ''}`}>
            <ul className="navbar__list">
              {navLinks.map((link) => {
                if (link.mega) {
                  return (
                    <li
                      key={link.label}
                      className="navbar__item navbar__item--mega"
                      onMouseEnter={() => handleEnter('services')}
                      onMouseLeave={handleLeave}
                    >
                      <button
                        className={`navbar__link${isActive(link.path) ? ' navbar__link--active' : ''}`}
                        onClick={() => handleMobileToggle('services')}
                      >
                        {link.label}
                        <span className={`navbar__arrow${activeDropdown === 'services' ? ' navbar__arrow--up' : ''}`}>&#9660;</span>
                      </button>
                      {/* Mega Menu */}
                      <div
                        className={`navbar__mega${activeDropdown === 'services' ? ' navbar__mega--open' : ''}`}
                        onMouseEnter={() => handleEnter('services')}
                        onMouseLeave={handleLeave}
                      >
                        {servicesMenu.map((col) => (
                          <div className="navbar__mega-col" key={col.heading}>
                            <p className="navbar__mega-heading">{col.heading}</p>
                            <ul className="navbar__mega-list">
                              {col.items.map((item) => (
                                <li key={item.label}>
                                  <Link to={item.path} className="navbar__mega-link">
                                    <span className="navbar__mega-arrow">›</span>
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </li>
                  );
                }

                if (link.dropdown) {
                  return (
                    <li
                      key={link.label}
                      className="navbar__item navbar__item--dropdown"
                      onMouseEnter={() => handleEnter('work')}
                      onMouseLeave={handleLeave}
                    >
                      <button
                        className={`navbar__link${isActive(link.path) ? ' navbar__link--active' : ''}`}
                        onClick={() => handleMobileToggle('work')}
                      >
                        {link.label}
                        <span className={`navbar__arrow${activeDropdown === 'work' ? ' navbar__arrow--up' : ''}`}>&#9660;</span>
                      </button>
                      <ul
                        className={`navbar__dropdown${activeDropdown === 'work' ? ' navbar__dropdown--open' : ''}`}
                        onMouseEnter={() => handleEnter('work')}
                        onMouseLeave={handleLeave}
                      >
                        {workMenu.map((item) => (
                          <li key={item.label} className="navbar__dropdown-item">
                            <Link to={item.path} className="navbar__dropdown-link">{item.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }

                return (
                  <li key={link.label} className="navbar__item">
                    <Link
                      to={link.path}
                      className={`navbar__link${isActive(link.path) ? ' navbar__link--active' : ''}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* CTA Button — right, outside pill */}
        <Link to="/contact" className="navbar__cta">
          <span className="navbar__cta-arrow">&#8594;</span>
          Get Free Consultation
        </Link>
      </div>
    </nav>
  );
}
