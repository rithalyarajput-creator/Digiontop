import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { FiMonitor, FiSmartphone, FiSearch, FiShare2, FiShoppingBag, FiPenTool, FiTrendingUp } from 'react-icons/fi';
import { useSettings } from '../context/SettingsContext';
import { SERVICES_MENU } from '../data/servicesMenu';
import '../styles/Navbar.css';

/* icon key -> react-icon for the services mega menu */
const CAT_ICONS = {
  web: FiMonitor,
  app: FiSmartphone,
  seo: FiSearch,
  social: FiShare2,
  ecommerce: FiShoppingBag,
  branding: FiPenTool,
  ads: FiTrendingUp,
};

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
  const [megaCat, setMegaCat]             = useState(0); // hovered category index in services mega
  const [mobCat, setMobCat]               = useState(null); // expanded category heading in mobile drawer
  const hoverTimeout = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
    setMobCat(null);
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
          <img src={(settings.logo_header || "/images/logo-header.webp").replace(/\/images\/(logo-\w+)\.(png|jpe?g)$/i, "/images/$1.webp")} alt={settings.site_name || "DigionTop"} />
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

                    {/* LEFT — category list */}
                    <div className="navbar__mega-side">
                      <p className="navbar__mega-side-label">Our Services</p>
                      {servicesMenu.map((col, i) => {
                        const CatIcon = CAT_ICONS[col.icon] || FiMonitor;
                        return (
                          <button
                            type="button"
                            key={col.heading}
                            className={`navbar__mega-cat${i === megaCat ? ' navbar__mega-cat--active' : ''}`}
                            onMouseEnter={() => setMegaCat(i)}
                            onClick={() => setMegaCat(i)}
                          >
                            <span className="navbar__mega-cat-ico"><CatIcon /></span>
                            <span className="navbar__mega-cat-info">
                              <span className="navbar__mega-cat-name">{col.heading}</span>
                              <span className="navbar__mega-cat-count">{col.items.length} services</span>
                            </span>
                            <span className="navbar__mega-cat-arrow">›</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* RIGHT — selected category detail */}
                    <div className="navbar__mega-panel" key={servicesMenu[megaCat].heading}>
                      <div className="navbar__mega-panel-head">
                        {/* Only render when the category actually has artwork —
                            an <img> with no src shows a broken-image icon. */}
                        {servicesMenu[megaCat].image && (
                          <img src={servicesMenu[megaCat].image} alt="" className="navbar__mega-panel-img" />
                        )}
                        <div>
                          <span className="navbar__mega-panel-title navbar__mega-panel-title--static">
                            {servicesMenu[megaCat].heading}
                          </span>
                          <p className="navbar__mega-panel-tag">{servicesMenu[megaCat].tagline}</p>
                        </div>
                      </div>

                      <p className="navbar__mega-panel-label">Popular in {servicesMenu[megaCat].heading}</p>
                      <ul className="navbar__mega-panel-list">
                        {servicesMenu[megaCat].items.map(item => (
                          <li key={item.label}>
                            <Link to={item.path} className="navbar__mega-link">
                              <span className="navbar__mega-dot" />{item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>

                      <Link to={servicesMenu[megaCat].link} className="navbar__mega-viewall">
                        View All {servicesMenu[megaCat].heading} <span>→</span>
                      </Link>
                    </div>

                    {/* Bottom yellow bar — quick links */}
                    <div className="navbar__mega-bar">
                      <Link to="/why-us" className="navbar__mega-bar-link">Why Choose Us</Link>
                      <Link to="/portfolio" className="navbar__mega-bar-link">Our Projects</Link>
                      <Link to="/blog" className="navbar__mega-bar-link">Blog</Link>
                      <Link to="/contact" className="navbar__mega-bar-link">Get Free Consultation</Link>
                      <Link to="/portfolio" className="navbar__mega-bar-link navbar__mega-bar-link--all">
                        Explore All <span>→</span>
                      </Link>
                    </div>
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
            <img src={(settings.logo_header || "/images/logo-header.webp").replace(/\/images\/(logo-\w+)\.(png|jpe?g)$/i, "/images/$1.webp")} alt={settings.site_name || "DigionTop"} />
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
                    {servicesMenu.map(col => {
                      const open = mobCat === col.heading;
                      return (
                        <div key={col.heading} className="navbar__drawer-cat">
                          <button
                            type="button"
                            className={`navbar__drawer-sub-heading navbar__drawer-sub-heading--toggle${open ? ' navbar__drawer-sub-heading--open' : ''}`}
                            onClick={() => setMobCat(p => p === col.heading ? null : col.heading)}
                          >
                            {col.heading}
                            <span className={`navbar__arrow${open ? ' navbar__arrow--up' : ''}`}>&#9660;</span>
                          </button>
                          {open && col.items.map(item => (
                            <Link key={item.label} to={item.path} className="navbar__drawer-sub-link"
                              onClick={() => setMenuOpen(false)}>
                              › {item.label}
                            </Link>
                          ))}
                        </div>
                      );
                    })}
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
