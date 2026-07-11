import { useState } from 'react';
import { FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';
import { apiPost, setToken } from './api';
import './admin.css';

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await apiPost('/auth/login', { username, password });
      if (data && data.token) {
        setToken(data.token);
        if (onLogin) onLogin();
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login__shell">

        {/* ── LEFT — animated brand panel ── */}
        <div className="admin-login__left">
          <span className="admin-login__orb admin-login__orb--1" />
          <span className="admin-login__orb admin-login__orb--2" />
          <span className="admin-login__orb admin-login__orb--3" />
          <span className="admin-login__stars" aria-hidden="true" />

          <div className="admin-login__left-content">
            <div className="admin-login__logo-card">
              <img src="/favicon-192.png" alt="DigionTop" />
            </div>
            <h2 className="admin-login__left-title">
              One Dashboard to <span>Stay On Top</span><br />of Your Entire Website
            </h2>
            <p className="admin-login__left-sub">
              Manage blogs, leads, testimonials, portfolio &amp; settings —
              everything for digiontop.com in one place.
            </p>
            <div className="admin-login__dots">
              <span className="admin-login__dot admin-login__dot--active" />
              <span className="admin-login__dot" />
              <span className="admin-login__dot" />
            </div>
          </div>
        </div>

        {/* ── RIGHT — form panel ── */}
        <div className="admin-login__right">
          <div className="admin-login__right-top">
            <img src="/favicon-192.png" alt="DigionTop" className="admin-login__mini-logo" />
          </div>

          <form className="admin-login__form" onSubmit={handleSubmit}>
            <h1 className="admin-login__title">Welcome back to DigionTop!</h1>
            <p className="admin-login__subtitle">Please enter your details to sign in to the admin panel</p>

            {error && <div className="admin-login__error">{error}</div>}

            <label className="admin-field">
              <span>Username</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                autoComplete="username"
                required
              />
            </label>

            <label className="admin-field">
              <span>Password</span>
              <span className="admin-field__pass">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button type="button" className="admin-field__toggle" onClick={() => setShowPass(v => !v)} aria-label={showPass ? 'Hide password' : 'Show password'}>
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </span>
            </label>

            <button className="admin-login__submit" type="submit" disabled={loading}>
              {loading ? 'Signing in…' : <>Sign In <FiArrowRight /></>}
            </button>
          </form>

          <div className="admin-login__right-bottom">
            <span>© 2026 DigionTop</span>
            <span>Your Growth. Our Mission.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
