import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const servicesLinks = [
  { label: 'Website Development', path: '/services/website-development' },
  { label: 'SEO Services', path: '/services/seo-services' },
  { label: 'Social Media Marketing', path: '/services/social-media-marketing' },
  { label: 'E-Commerce Solutions', path: '/services/ecommerce-solutions' },
];

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services', dropdown: true },
  { label: 'Why Us', path: '/why-us' },
  { label: 'Industries', path: '/industries' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isServicesActive = () =>
    servicesLinks.some((s) => location.pathname.startsWith(s.path)) ||
    location.pathname.startsWith('/services');

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <img src="/images/logo-header.png" alt="DigionTop Logo" height="48" />
        </Link>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
        </button>

        {/* Nav Links */}
        <div className={`navbar__menu${menuOpen ? ' navbar__menu--open' : ''}`}>
          <ul className="navbar__list">
            {navLinks.map((link) =>
              link.dropdown ? (
                <li
                  key={link.label}
                  className="navbar__item navbar__item--dropdown"
                  ref={dropdownRef}
                >
                  <button
                    className={`navbar__link navbar__dropdown-toggle${
                      isServicesActive() ? ' navbar__link--active' : ''
                    }`}
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen}
                  >
                    {link.label}
                    <span className={`navbar__arrow${dropdownOpen ? ' navbar__arrow--up' : ''}`}>
                      &#9660;
                    </span>
                  </button>

                  <ul className={`navbar__dropdown${dropdownOpen ? ' navbar__dropdown--open' : ''}`}>
                    {servicesLinks.map((s) => (
                      <li key={s.label} className="navbar__dropdown-item">
                        <Link
                          to={s.path}
                          className={`navbar__dropdown-link${
                            location.pathname === s.path ? ' navbar__dropdown-link--active' : ''
                          }`}
                        >
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={link.label} className="navbar__item">
                  <Link
                    to={link.path}
                    className={`navbar__link${isActive(link.path) ? ' navbar__link--active' : ''}`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* CTA Button */}
          <Link to="/contact" className="navbar__cta">
            <span className="navbar__cta-arrow">&#8594;</span>
            Get Free Consultation
          </Link>
        </div>
      </div>
    </nav>
  );
}
