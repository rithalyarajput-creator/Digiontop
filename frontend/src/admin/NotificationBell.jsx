import { useEffect, useRef, useState } from 'react';
import { FiBell, FiInbox, FiMail } from 'react-icons/fi';
import { apiGet } from './api';

const SEEN_KEY = 'digiontop_notif_seen_at';

function timeAgo(dateStr) {
  const d = new Date(dateStr);
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) +
    ' · ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

export default function NotificationBell() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  // First visit on a device has no watermark. Starting at 0 would mark every
  // historical lead as "new" (an 11-count badge on a fresh login), so treat
  // everything that already exists as seen and only flag what arrives after.
  const [seenAt, setSeenAt] = useState(() => {
    const stored = Number(localStorage.getItem(SEEN_KEY));
    if (stored) return stored;
    const now = Date.now();
    localStorage.setItem(SEEN_KEY, String(now));
    return now;
  });
  const ref = useRef(null);

  async function load() {
    try {
      const data = await apiGet('/stats');
      setItems(data.notifications || []);
    } catch {}
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 60000); // refresh every minute
    return () => clearInterval(t);
  }, []);

  // close on outside click
  useEffect(() => {
    function onClick(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const unseen = items.filter((n) => new Date(n.created_at).getTime() > seenAt).length;

  // How many were unseen at the moment the panel was opened. Kept separate from
  // `unseen` so the "N new" header and the highlighted rows don't vanish the
  // instant you open the panel — you get to actually see what's new.
  const [unseenOnOpen, setUnseenOnOpen] = useState(0);
  const [seenAtOnOpen, setSeenAtOnOpen] = useState(0);

  function toggle() {
    const next = !open;
    if (next) {
      // freeze the current unseen state for display, then mark everything seen
      setUnseenOnOpen(unseen);
      setSeenAtOnOpen(seenAt);
      const now = Date.now();
      localStorage.setItem(SEEN_KEY, String(now));
      setSeenAt(now);
    }
    setOpen(next);
  }

  return (
    <div className="admin-notif" ref={ref}>
      <button className="admin-notif__btn" onClick={toggle} aria-label="Notifications">
        <FiBell />
        {unseen > 0 && <span className="admin-notif__badge admin-notif__badge--unseen">{unseen}</span>}
      </button>

      {open && (
        <div className="admin-notif__panel">
          <div className="admin-notif__head">
            <span>Notifications</span>
            {unseenOnOpen > 0 && <span className="admin-notif__count">{unseenOnOpen} new</span>}
          </div>
          <div className="admin-notif__list">
            {items.length === 0 && <div className="admin-notif__empty">No notifications yet.</div>}
            {items.map((n, i) => {
              const isUnseen = new Date(n.created_at).getTime() > seenAtOnOpen;
              return (
                <div key={i} className={`admin-notif__item${isUnseen ? ' admin-notif__item--unseen' : ''}`}>
                  <span className={`admin-notif__icon admin-notif__icon--${n.type}`}>
                    {n.type === 'newsletter' ? <FiMail /> : <FiInbox />}
                  </span>
                  <div className="admin-notif__body">
                    <p className="admin-notif__title">{n.title}</p>
                    <p className="admin-notif__sub">{n.sub} · {timeAgo(n.created_at)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
