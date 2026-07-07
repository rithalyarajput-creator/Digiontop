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
  social_linkedin: '',
  social_twitter: '',
  social_youtube: 'https://www.youtube.com/@digiontop',
  seo_meta_title: 'DigionTop — #1 Digital Marketing Agency in India',
  seo_meta_description: 'Result-driven SEO, social media, web development & e-commerce marketing for businesses across India.',
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data) setSettings((prev) => ({ ...prev, ...data })); })
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
