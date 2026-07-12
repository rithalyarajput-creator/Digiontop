import { useState } from 'react';
import { Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom';
import {
  FiGrid, FiInbox, FiFileText, FiStar, FiHelpCircle,
  FiLogOut, FiMenu, FiUsers, FiTag, FiSettings, FiX, FiMail,
} from 'react-icons/fi';
import { getToken, clearToken } from './api';
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
import './admin.css';

export default function AdminApp() {
  const [authed, setAuthed] = useState(!!getToken());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  function handleLogout() { clearToken(); setAuthed(false); }

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className={`admin-sidebar${sidebarOpen ? ' admin-sidebar--open' : ''}`}>
        <div className="admin-sidebar__brand">
          <img src="/images/logo-footer.webp" alt="DigionTop" style={{ height: '36px', width: 'auto', display: 'block' }} />
        </div>

        <nav className="admin-sidebar__nav">

          {/* Dashboard */}
          <NavLink to="/admin" end className={({ isActive }) => `admin-navlink${isActive ? ' admin-navlink--active' : ''}`} onClick={() => setSidebarOpen(false)}>
            <FiGrid /> <span>Dashboard</span>
          </NavLink>

          <div className="admin-sidebar__label">Content</div>
          <NavLink to="/admin/blog" className={({ isActive }) => `admin-navlink${isActive ? ' admin-navlink--active' : ''}`} onClick={() => setSidebarOpen(false)}>
            <FiFileText /> <span>Blog Posts</span>
          </NavLink>
          <NavLink to="/admin/authors" className={({ isActive }) => `admin-navlink${isActive ? ' admin-navlink--active' : ''}`} onClick={() => setSidebarOpen(false)}>
            <FiUsers /> <span>Authors</span>
          </NavLink>
          <NavLink to="/admin/categories" className={({ isActive }) => `admin-navlink${isActive ? ' admin-navlink--active' : ''}`} onClick={() => setSidebarOpen(false)}>
            <FiTag /> <span>Categories</span>
          </NavLink>

          <div className="admin-sidebar__label">Leads</div>
          <NavLink to="/admin/leads" className={({ isActive }) => `admin-navlink${isActive ? ' admin-navlink--active' : ''}`} onClick={() => setSidebarOpen(false)}>
            <FiInbox /> <span>Form Leads</span>
          </NavLink>
          <NavLink to="/admin/newsletter" className={({ isActive }) => `admin-navlink${isActive ? ' admin-navlink--active' : ''}`} onClick={() => setSidebarOpen(false)}>
            <FiMail /> <span>Newsletter</span>
          </NavLink>

          <div className="admin-sidebar__label">Site</div>
          <NavLink to="/admin/testimonials" className={({ isActive }) => `admin-navlink${isActive ? ' admin-navlink--active' : ''}`} onClick={() => setSidebarOpen(false)}>
            <FiStar /> <span>Testimonials</span>
          </NavLink>
          <NavLink to="/admin/faq" className={({ isActive }) => `admin-navlink${isActive ? ' admin-navlink--active' : ''}`} onClick={() => setSidebarOpen(false)}>
            <FiHelpCircle /> <span>FAQs</span>
          </NavLink>
          <NavLink to="/admin/settings" className={({ isActive }) => `admin-navlink${isActive ? ' admin-navlink--active' : ''}`} onClick={() => setSidebarOpen(false)}>
            <FiSettings /> <span>Settings</span>
          </NavLink>

          <button className="admin-navlink admin-navlink--logout" onClick={handleLogout}>
            <FiLogOut /> <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}

      <div className="admin-main">
        <header className="admin-topbar">
          <button className="admin-topbar__menu" onClick={() => setSidebarOpen(v => !v)}>
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </button>
          <span className="admin-topbar__title">DigionTop Admin</span>
          <div className="admin-topbar__right">
            <NotificationBell />
            <span className="admin-topbar__user">digiontop@2026</span>
          </div>
        </header>

        <main className="admin-content">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="leads" element={<Leads />} />
            <Route path="blog" element={<BlogList />} />
            <Route path="blog/new" element={<BlogEdit />} />
            <Route path="blog/edit/:id" element={<BlogEdit />} />
            <Route path="authors" element={<Authors />} />
            <Route path="categories" element={<Categories />} />
            <Route path="newsletter" element={<Newsletter />} />
            <Route path="testimonials" element={<TestimonialsAdmin />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
