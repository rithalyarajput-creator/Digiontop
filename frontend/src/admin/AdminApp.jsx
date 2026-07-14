import { useState } from 'react';
import { Routes, Route, NavLink, Navigate, Link } from 'react-router-dom';
import {
  FiGrid, FiInbox, FiFileText, FiStar, FiHelpCircle,
  FiLogOut, FiMenu, FiUsers, FiTag, FiSettings, FiX, FiMail, FiLock, FiShield,
} from 'react-icons/fi';
import { getToken, clearToken, getUser, can, isOwner } from './api';
import AdminLogin from './AdminLogin';
import NotificationBell from './NotificationBell';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import BlogList from './pages/BlogList';
import BlogEdit from './pages/BlogEdit';
import TestimonialsAdmin from './pages/Testimonials';
import FAQ from './pages/FAQ';
import Authors from './pages/Authors';
import Categories from './pages/Categories';
import Newsletter from './pages/Newsletter';
import Settings from './pages/Settings';
import Users from './pages/Users';
import './admin.css';

/* Shown when someone reaches a route they don't hold. The menu never links here,
   but a typed URL or a stale bookmark can — and the server would 403 anyway. */
function NoAccess() {
  return (
    <div className="admin-noaccess">
      <FiLock className="admin-noaccess__icon" />
      <h1>You don't have access to this section</h1>
      <p>
        Your account hasn't been given permission for this part of the admin panel.
        Ask the site owner if you think you should have it.
      </p>
      <Link className="admin-sbtn admin-sbtn--primary" to="/admin">Back to dashboard</Link>
    </div>
  );
}

/* Route guard. Convenience only — every endpoint is enforced server-side too. */
function Protected({ section, owner, children }) {
  const allowed = owner ? isOwner() : (!section || can(section));
  if (!allowed) return <NoAccess />;
  return children;
}

export default function AdminApp() {
  const [authed, setAuthed] = useState(!!getToken());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  const user = getUser();

  // A token from before team accounts existed (or a corrupt entry) leaves us with
  // no identity at all. Rather than white-screen, force a clean re-login.
  if (!user) {
    clearToken();
    return <AdminLogin onLogin={() => setAuthed(true)} />;
  }

  function handleLogout() { clearToken(); setAuthed(false); }

  const owner = user.super === true;
  const close = () => setSidebarOpen(false);
  const linkClass = ({ isActive }) => `admin-navlink${isActive ? ' admin-navlink--active' : ''}`;

  // Which sections this user holds — drives both the menu and the guards.
  const showBlog = can('blog');
  const showLeads = can('leads');
  const showNewsletter = can('newsletter');
  const showReviews = can('reviews');
  const showFaq = can('faq');
  const showSettings = can('settings');

  // Don't leave an orphan group heading with nothing under it.
  const showContentGroup = showBlog;
  const showLeadsGroup = showLeads || showNewsletter;
  const showSiteGroup = showReviews || showFaq || showSettings;

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className={`admin-sidebar${sidebarOpen ? ' admin-sidebar--open' : ''}`}>
        <div className="admin-sidebar__brand">
          <img src="/images/logo-footer.webp" alt="DigionTop" style={{ height: '36px', width: 'auto', display: 'block' }} />
        </div>

        <nav className="admin-sidebar__nav">

          {/* Dashboard — always available */}
          <NavLink to="/admin" end className={linkClass} onClick={close}>
            <FiGrid /> <span>Dashboard</span>
          </NavLink>

          {showContentGroup && <div className="admin-sidebar__label">Content</div>}
          {showBlog && (
            <>
              <NavLink to="/admin/blog" className={linkClass} onClick={close}>
                <FiFileText /> <span>Blog Posts</span>
              </NavLink>
              <NavLink to="/admin/authors" className={linkClass} onClick={close}>
                <FiUsers /> <span>Authors</span>
              </NavLink>
              <NavLink to="/admin/categories" className={linkClass} onClick={close}>
                <FiTag /> <span>Categories</span>
              </NavLink>
            </>
          )}

          {showLeadsGroup && <div className="admin-sidebar__label">Leads</div>}
          {showLeads && (
            <NavLink to="/admin/leads" className={linkClass} onClick={close}>
              <FiInbox /> <span>Form Leads</span>
            </NavLink>
          )}
          {showNewsletter && (
            <NavLink to="/admin/newsletter" className={linkClass} onClick={close}>
              <FiMail /> <span>Newsletter</span>
            </NavLink>
          )}

          {showSiteGroup && <div className="admin-sidebar__label">Site</div>}
          {showReviews && (
            <NavLink to="/admin/reviews" className={linkClass} onClick={close}>
              <FiStar /> <span>Reviews</span>
            </NavLink>
          )}
          {showFaq && (
            <NavLink to="/admin/faq" className={linkClass} onClick={close}>
              <FiHelpCircle /> <span>FAQs</span>
            </NavLink>
          )}
          {showSettings && (
            <NavLink to="/admin/settings" className={linkClass} onClick={close}>
              <FiSettings /> <span>Settings</span>
            </NavLink>
          )}

          {/* Team — owner only. Never grantable. */}
          {owner && <div className="admin-sidebar__label">Team</div>}
          {owner && (
            <NavLink to="/admin/users" className={linkClass} onClick={close}>
              <FiShield /> <span>Users</span>
            </NavLink>
          )}

          <button className="admin-navlink admin-navlink--logout" onClick={handleLogout}>
            <FiLogOut /> <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="admin-overlay" onClick={close} />}

      <div className="admin-main">
        <header className="admin-topbar">
          <button className="admin-topbar__menu" onClick={() => setSidebarOpen(v => !v)}>
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </button>
          <span className="admin-topbar__title">DigionTop Admin</span>
          <div className="admin-topbar__right">
            <NotificationBell />
            <span className="admin-topbar__user">
              {user.name || user.username}
              <span className="admin-topbar__role">{owner ? 'Owner' : 'Team'}</span>
            </span>
          </div>
        </header>

        <main className="admin-content">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="leads" element={<Protected section="leads"><Leads /></Protected>} />
            <Route path="blog" element={<Protected section="blog"><BlogList /></Protected>} />
            <Route path="blog/new" element={<Protected section="blog"><BlogEdit /></Protected>} />
            <Route path="blog/edit/:id" element={<Protected section="blog"><BlogEdit /></Protected>} />
            <Route path="authors" element={<Protected section="blog"><Authors /></Protected>} />
            <Route path="categories" element={<Protected section="blog"><Categories /></Protected>} />
            <Route path="newsletter" element={<Protected section="newsletter"><Newsletter /></Protected>} />
            <Route path="reviews" element={<Protected section="reviews"><TestimonialsAdmin /></Protected>} />
            <Route path="faq" element={<Protected section="faq"><FAQ /></Protected>} />
            <Route path="settings" element={<Protected section="settings"><Settings /></Protected>} />
            <Route path="users" element={<Protected owner><Users /></Protected>} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
