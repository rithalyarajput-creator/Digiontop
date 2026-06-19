import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { SERVICES_MENU } from '../data/servicesMenu';
import '../styles/Navbar.css';

const servicesMenu = SERVICES_MENU;

const workMenu = [
  { label: 'Website Mockups', path: '/work' },
  { label: 'Reels & Videos', path: '/work' },
  { label: 'Social Media Posts', path: '/work' },
  { label: 'Logo & Branding', path: '/work' },
  { label: 'SEO Case Studies', path: '/work' },
  { label: 'All Projects', path: '/work' },
];

const navLinks = [
  { label: 'Home',       path: '/' },
  { label: 'About',      path: '/about' },
  { label: 'Services',   path: '/services', mega: true },
  { label: 'Projects',   path: '/portfolio' },
  { label: 'Why Us',     path: '/why-us' },
  { label: 'Industries', path: '/industries' },
  { label: 'Blog',       path: '/blog' },
  { label: 'Contact',    path: '/contact' },
];

export default function Navbar() {
  const location = useLocation();
  const { settings } = useSettings();
  const [menuOpen, setMenuOpen]           = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled]           = useState(false);
  const hoverTimeout = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  /* Lock body scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const handleEnter  = useCallback((key) => { clearTimeout(hoverTimeout.current); setActiveDropdown(key); }, []);
  const handleLeave  = useCallback(() => { hoverTimeout.current = setTimeout(() => setActiveDropdown(null), 150); }, []);
  const toggleMobile = (key) => setActiveDropdown(p => p === key ? null : key);

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__wrapper">

        {/* ── Logo (always left) ── */}
        <Link to="/" className="navbar__logo">
          <img src={settings.logo_header || "/images/logo-header.png"} alt={settings.site_name || "DigionTop"} />
        </Link>

        {/* ── Desktop center pill ── */}
        <div className="navbar__container">
          <ul className="navbar__list">
            {navLinks.filter(l => l.label !== 'Contact').map((link) => {
              if (link.mega) return (
                <li key={link.label} className="navbar__item navbar__item--mega"
                  onMouseEnter={() => handleEnter('services')} onMouseLeave={handleLeave}>
                  <button className={`navbar__link${isActive(link.path) ? ' navbar__link--active' : ''}`}
                    onClick={() => toggleMobile('services')}>
                    {link.label}
                    <span className={`navbar__arrow${activeDropdown === 'services' ? ' navbar__arrow--up' : ''}`}>&#9660;</span>
                  </button>
                  <div className={`navbar__mega${activeDropdown === 'services' ? ' navbar__mega--open' : ''}`}
                    onMouseEnter={() => handleEnter('services')} onMouseLeave={handleLeave}>
                    {servicesMenu.map(col => (
                      <div className="navbar__mega-col" key={col.heading}>
                        <p className="navbar__mega-heading">{col.heading}</p>
                        <ul className="navbar__mega-list">
                          {col.items.map(item => (
                            <li key={item.label}>
                              <Link to={item.path} className="navbar__mega-link">
                                <span className="navbar__mega-arrow">›</span>{item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </li>
              );
              if (link.dropdown) return (
                <li key={link.label} className="navbar__item navbar__item--dropdown"
                  onMouseEnter={() => handleEnter('work')} onMouseLeave={handleLeave}>
                  <button className={`navbar__link${isActive(link.path) ? ' navbar__link--active' : ''}`}
                    onClick={() => toggleMobile('work')}>
                    {link.label}
                    <span className={`navbar__arrow${activeDropdown === 'work' ? ' navbar__arrow--up' : ''}`}>&#9660;</span>
                  </button>
                  <ul className={`navbar__dropdown${activeDropdown === 'work' ? ' navbar__dropdown--open' : ''}`}
                    onMouseEnter={() => handleEnter('work')} onMouseLeave={handleLeave}>
                    {workMenu.map(item => (
                      <li key={item.label} className="navbar__dropdown-item">
                        <Link to={item.path} className="navbar__dropdown-link">{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
              return (
                <li key={link.label} className="navbar__item">
                  <Link to={link.path} className={`navbar__link${isActive(link.path) ? ' navbar__link--active' : ''}`}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── Right: desktop CTA + hamburger ── */}
        <div className="navbar__right">
          {/* Desktop CTA only */}
          <Link to="/contact" className="navbar__cta navbar__cta--desktop">
            <span className="navbar__cta-arrow">&#8594;</span>
            Get Free Consultation
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
          </button>
        </div>
      </div>

      {/* ── Mobile drawer + overlay are rendered into <body> via a portal
            so they escape the sticky navbar's stacking context and always
            cover the full viewport from the very top, even when scrolled. ── */}
      {createPortal(
        <>
      {/* ── Mobile drawer overlay ── */}
      <div className={`navbar__overlay${menuOpen ? ' navbar__overlay--open' : ''}`}
        onClick={() => setMenuOpen(false)} />

      {/* ── Mobile slide-in drawer (from RIGHT) ── */}
      <div className={`navbar__drawer${menuOpen ? ' navbar__drawer--open' : ''}`}>

        {/* Drawer header */}
        <div className="navbar__drawer-head">
          <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
            <img src={settings.logo_header || "/images/logo-header.png"} alt={settings.site_name || "DigionTop"} />
          </Link>
          <button className="navbar__drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Drawer links */}
        <nav className="navbar__drawer-nav">
          {navLinks.map((link) => {
            if (link.mega) return (
              <div key={link.label} className="navbar__drawer-group">
                <button className="navbar__drawer-link navbar__drawer-link--toggle"
                  onClick={() => toggleMobile('services')}>
                  {link.label}
                  <span className={`navbar__arrow${activeDropdown === 'services' ? ' navbar__arrow--up' : ''}`}>&#9660;</span>
                </button>
                {activeDropdown === 'services' && (
                  <div className="navbar__drawer-sub">
                    {servicesMenu.map(col => (
                      <div key={col.heading}>
                        <p className="navbar__drawer-sub-heading">{col.heading}</p>
                        {col.items.map(item => (
                          <Link key={item.label} to={item.path} className="navbar__drawer-sub-link"
                            onClick={() => setMenuOpen(false)}>
                            › {item.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
            if (link.dropdown) return (
              <div key={link.label} className="navbar__drawer-group">
                <button className="navbar__drawer-link navbar__drawer-link--toggle"
                  onClick={() => toggleMobile('work')}>
                  {link.label}
                  <span className={`navbar__arrow${activeDropdown === 'work' ? ' navbar__arrow--up' : ''}`}>&#9660;</span>
                </button>
                {activeDropdown === 'work' && (
                  <div className="navbar__drawer-sub">
                    {workMenu.map(item => (
                      <Link key={item.label} to={item.path} className="navbar__drawer-sub-link"
                        onClick={() => setMenuOpen(false)}>
                        › {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
            return (
              <Link key={link.label} to={link.path}
                className={`navbar__drawer-link${isActive(link.path) ? ' navbar__drawer-link--active' : ''}`}
                onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA inside drawer */}
        <div className="navbar__drawer-footer">
          <Link to="/contact" className="navbar__drawer-cta" onClick={() => setMenuOpen(false)}>
            <span>&#8594;</span> Get Free Consultation
          </Link>
          <p className="navbar__drawer-tagline">India's #1 Digital Marketing Agency</p>
        </div>
      </div>
        </>,
        document.body
      )}
    </nav>
  );
}
