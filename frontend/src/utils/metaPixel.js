// Fires a Meta Pixel standard event. Safe to call even when fbq hasn't
// loaded (adblockers, slow network) — it just no-ops instead of throwing.
export function trackLead() {
  try {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead');
    }
  } catch {}
}
