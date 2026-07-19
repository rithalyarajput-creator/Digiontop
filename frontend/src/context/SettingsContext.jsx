import { createContext, useContext, useEffect, useState } from 'react';

const SettingsContext = createContext({});

export const DEFAULT_SETTINGS = {
  site_name: 'DigionTop',
  tagline: 'Digital Marketing Agency',
  description: 'We help brands rank higher, grow faster and generate more revenue with result driven digital marketing strategies.',
  contact_email: 'digiontop.agency@gmail.com',
  contact_phone: '+91 9217594664',
  contact_phone2: '+91 7303769921',
  logo_header: '/images/logo-header.webp',
  logo_footer: '/images/logo-footer.webp',
  favicon: '/favicon.png',
  social_facebook: 'https://www.facebook.com/share/14eaPvHNx9A/',
  social_instagram: 'https://www.instagram.com/digiontop.agency',
  social_linkedin: 'https://www.linkedin.com/company/digiontop/',
  social_twitter: 'https://x.com/digiontopagency',
  social_youtube: 'https://www.youtube.com/@digiontop',
  seo_meta_title: 'DigionTop — #1 Digital Marketing Agency in India',
  seo_meta_description: 'Result-driven SEO, social media, web development & e-commerce marketing for businesses across India.',
};

// Every social profile link on the site (footer, contact, blog share icons)
// reads its URL from settings — tagging it here, once, means Google
// Analytics can tell "someone came from our Instagram bio link" apart from
// generic social referral traffic, without touching every <a> individually.
const UTM_PLATFORM = {
  social_facebook: 'facebook',
  social_instagram: 'instagram',
  social_linkedin: 'linkedin',
  social_twitter: 'twitter',
  social_youtube: 'youtube',
};

function withUtm(url, source) {
  if (!url) return url;
  try {
    const u = new URL(url);
    if (!u.searchParams.has('utm_source')) {
      u.searchParams.set('utm_source', source);
      u.searchParams.set('utm_medium', 'social');
      u.searchParams.set('utm_campaign', 'social_profile');
    }
    return u.toString();
  } catch {
    return url; // not a valid absolute URL — leave it untouched
  }
}

function tagSocialLinks(obj) {
  const tagged = { ...obj };
  for (const [key, source] of Object.entries(UTM_PLATFORM)) {
    if (tagged[key]) tagged[key] = withUtm(tagged[key], source);
  }
  return tagged;
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => tagSocialLinks(DEFAULT_SETTINGS));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data) return;
        // Only let the saved settings override a default when they actually
        // carry a value. A blank field in the DB (e.g. social_linkedin never
        // filled in the admin) must NOT wipe out a sensible default like our
        // LinkedIn URL — otherwise the icon would silently disappear again.
        const merged = { ...DEFAULT_SETTINGS };
        for (const [k, v] of Object.entries(data)) {
          if (v !== '' && v !== null && v !== undefined) merged[k] = v;
        }
        setSettings(tagSocialLinks(merged));
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  // Apply favicon globally. NOTE: per-page <title> and <meta description>
  // are handled by react-helmet-async (components/Seo.jsx) — do NOT set them
  // here or it would override every page with the same global values.
  useEffect(() => {
    if (settings.favicon) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = settings.favicon;
    }
  }, [settings.favicon]);

  return (
    <SettingsContext.Provider value={{ settings, loaded, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
