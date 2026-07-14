import React from 'react';
import './GoogleReviewCard.css';

/* ── Google-review style card ──────────────────────────────────────────────
   Shared by the homepage slider (Home.jsx) and the /testimonials grid
   (Testimonials.jsx). Both must render the identical card, so the markup,
   the helpers and the .tcard* CSS all live here — not duplicated per page.
   The pages own their own layout (track vs grid); this owns the card.       */

/* Google-ish avatar palette — colour is derived deterministically from the name */
const AVATAR_COLORS = ['#d93025', '#1a73e8', '#1e8e3e', '#9334e6', '#e8710a', '#12857f'];

export const avatarColor = (name = '') => {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
};

export const initialOf = (name = '') => (name.trim()[0] || '?').toUpperCase();

/* "3 days ago" / "2 weeks ago" / "5 months ago" — returns '' if no usable date */
export const timeAgo = (value) => {
  if (!value) return '';
  const then = new Date(value);
  if (Number.isNaN(then.getTime())) return '';
  const secs = Math.floor((Date.now() - then.getTime()) / 1000);
  if (secs < 60) return 'just now';
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  for (const [label, size] of units) {
    const n = Math.floor(secs / size);
    if (n >= 1) return `${n} ${label}${n > 1 ? 's' : ''} ago`;
  }
  return 'just now';
};

const NEW_WINDOW_MS = 14 * 24 * 60 * 60 * 1000;
export const isRecent = (value) => {
  if (!value) return false;
  const then = new Date(value);
  if (Number.isNaN(then.getTime())) return false;
  return Date.now() - then.getTime() < NEW_WINDOW_MS;
};

/* When a review was actually left (falls back to when it was added) */
export const reviewDate = (r) => (r && (r.reviewed_at || r.created_at)) || null;

/* Newest review first — by reviewed_at, falling back to created_at. */
export const sortNewestFirst = (list) => {
  const when = (r) => new Date(reviewDate(r) || 0).getTime();
  return [...list].sort((a, b) => when(b) - when(a));
};

/* Real 4-colour Google "G" — inline SVG, no remote asset */
export const GoogleG = () => (
  <svg className="tcard__glogo" viewBox="0 0 48 48" width="20" height="20" aria-hidden="true" focusable="false">
    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
    <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
    <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
  </svg>
);

const GoogleReviewCard = ({ review: t }) => {
  const when = reviewDate(t);
  const ago = timeAgo(when);
  const sub = [t.client_role, t.client_location].filter(Boolean).join(' • ');

  return (
    <div className="tcard">
      <div className="tcard__head">
        {t.avatar_url ? (
          <img className="tcard__avatar" src={t.avatar_url} alt="" loading="lazy" />
        ) : (
          <span
            className="tcard__avatar tcard__avatar--initial"
            style={{ background: avatarColor(t.client_name || '') }}
            aria-hidden="true"
          >
            {initialOf(t.client_name || '')}
          </span>
        )}
        <div className="tcard__ident">
          <span className="tcard__name">{t.client_name}</span>
          {sub && <span className="tcard__sub">{sub}</span>}
        </div>
        <GoogleG />
      </div>

      <div className="tcard__meta">
        <span className="tcard__stars" aria-label={`${t.rating || 5} out of 5 stars`}>
          {'★'.repeat(t.rating || 5)}
        </span>
        {ago && <span className="tcard__time">{ago}</span>}
        {isRecent(when) && <span className="tcard__new">NEW</span>}
      </div>

      <p className="tcard__text">{t.testimonial_text}</p>
    </div>
  );
};

export default GoogleReviewCard;
