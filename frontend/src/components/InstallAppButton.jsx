import { useEffect, useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import './InstallAppButton.css';

const DISMISSED_KEY = 'dt_install_dismissed';

/**
 * Floating "Install App" button, only rendered when the browser has actually
 * fired beforeinstallprompt (i.e. the site is installable and not already
 * installed). Chrome/Edge on Android and desktop support this; iOS Safari
 * never fires it (Apple requires the manual Share > Add to Home Screen flow
 * instead, so there's nothing to hook here for iOS).
 */
export default function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [dismissed, setDismissed] = useState(() => {
    try { return sessionStorage.getItem(DISMISSED_KEY) === '1'; } catch { return false; }
  });

  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    const onInstalled = () => setDeferredPrompt(null);
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (!deferredPrompt || dismissed) return null;

  async function handleInstall() {
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  }

  function handleDismiss() {
    setDismissed(true);
    try { sessionStorage.setItem(DISMISSED_KEY, '1'); } catch {}
  }

  return (
    <button type="button" className="install-fab" onClick={handleInstall} title="Install DigionTop app">
      <FiDownload />
      <span>Install App</span>
      <span
        className="install-fab__close"
        role="button"
        aria-label="Dismiss"
        onClick={(e) => { e.stopPropagation(); handleDismiss(); }}
      >
        ×
      </span>
    </button>
  );
}
