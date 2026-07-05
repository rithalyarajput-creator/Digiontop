import { useState } from 'react';
import { apiPost, setToken } from './api';
import './admin.css';

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
      <form className="admin-login__card" onSubmit={handleSubmit}>
        <div className="admin-login__brand">
          <img src="/images/logo-header.webp" alt="DigionTop" style={{ height: '60px', width: 'auto', display: 'block', margin: '0 auto 8px' }} />
          <p className="admin-login__subtitle">Admin Panel</p>
        </div>

        {error && <div className="admin-login__error">{error}</div>}

        <label className="admin-field">
          <span>Username</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </label>

        <label className="admin-field">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        <button className="admin-btn admin-btn--primary admin-login__submit" type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
