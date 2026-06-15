import { useState } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import {
  FiGrid, FiInbox, FiFileText, FiStar, FiBriefcase, FiLogOut, FiMenu,
} from 'react-icons/fi';
import { getToken, clearToken } from './api';
import AdminLogin from './AdminLogin';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import BlogList from './pages/BlogList';
import BlogEdit from './pages/BlogEdit';
import Testimonials from './pages/Testimonials';
import Portfolio from './pages/Portfolio';
import './admin.css';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: <FiGrid />, end: true },
  { to: '/admin/leads', label: 'Leads', icon: <FiInbox /> },
  { to: '/admin/blog', label: 'Blog Posts', icon: <FiFileText /> },
  { to: '/admin/testimonials', label: 'Testimonials', icon: <FiStar /> },
  { to: '/admin/portfolio', label: 'Portfolio', icon: <FiBriefcase /> },
];

export default function AdminApp() {
  const [authed, setAuthed] = useState(!!getToken());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!authed) {
    return <AdminLogin onLogin={() => setAuthed(true)} />;
  }

  function handleLogout() {
    clearToken();
    setAuthed(false);
  }

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar${sidebarOpen ? ' admin-sidebar--open' : ''}`}>
        <div className="admin-sidebar__brand">
          <img src="/images/logo-footer.png" alt="DigionTop" style={{ height: '44px', width: 'auto', display: 'block' }} />
        </div>
        <nav className="admin-sidebar__nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `admin-navlink${isActive ? ' admin-navlink--active' : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon} <span>{item.label}</span>
            </NavLink>
          ))}
          <button className="admin-navlink admin-navlink--logout" onClick={handleLogout}>
            <FiLogOut /> <span>Logout</span>
          </button>
        </nav>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button className="admin-topbar__menu" onClick={() => setSidebarOpen((v) => !v)}>
            <FiMenu />
          </button>
          <span className="admin-topbar__title">DigionTop Admin</span>
          <span className="admin-topbar__user">digiontop_admin</span>
        </header>

        <main className="admin-content">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="leads" element={<Leads />} />
            <Route path="blog" element={<BlogList />} />
            <Route path="blog/new" element={<BlogEdit />} />
            <Route path="blog/edit/:id" element={<BlogEdit />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
