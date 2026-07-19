import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Anonymous visitor tracking for our own admin Analytics page.
// Records one pageview per route (with time-on-page for the previous one),
// posting to /api/stats?type=track. No personal data — just a random session
// id kept in sessionStorage, the path, and the referrer.

function getSessionId() {
  try {
    let sid = sessionStorage.getItem('dt_sid');
    if (!sid) {
      sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem('dt_sid', sid);
    }
    return sid;
  } catch {
    return null;
  }
}

function send(path, durationMs) {
  const body = JSON.stringify({
    sid: getSessionId(),
    path,
    ref: document.referrer || '',
    duration: durationMs || 0,
  });
  // sendBeacon survives page unload; fetch is the fallback for route changes.
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/stats?type=track', new Blob([body], { type: 'application/json' }));
      return;
    }
  } catch {}
  fetch('/api/stats?type=track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {});
}

export default function usePageTracking() {
  const { pathname } = useLocation();
  const enteredAt = useRef(Date.now());
  const prevPath = useRef(null);

  // On every route change, record the view. The duration belongs to the
  // *previous* path (how long they stayed there before navigating away).
  useEffect(() => {
    const now = Date.now();
    if (prevPath.current !== null) {
      send(prevPath.current, now - enteredAt.current);
    } else {
      // First landing — record it immediately with 0 duration.
      send(pathname, 0);
    }
    prevPath.current = pathname;
    enteredAt.current = now;
  }, [pathname]);

  // When the tab closes / user leaves, flush the current page's duration.
  useEffect(() => {
    const flush = () => {
      if (document.visibilityState === 'hidden' && prevPath.current) {
        send(prevPath.current, Date.now() - enteredAt.current);
        enteredAt.current = Date.now();
      }
    };
    document.addEventListener('visibilitychange', flush);
    return () => document.removeEventListener('visibilitychange', flush);
  }, []);
}
