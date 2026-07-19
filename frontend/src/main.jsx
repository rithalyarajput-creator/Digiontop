import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import 'aos/dist/aos.css'
import App from './App.jsx'
import { SettingsProvider } from './context/SettingsContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <SettingsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SettingsProvider>
    </HelmetProvider>
  </React.StrictMode>,
)

// Tell the build-time prerenderer (see vite.config.js) that the app has painted
// and its HTML is ready to be captured. Harmless in the browser.
requestAnimationFrame(() => {
  document.dispatchEvent(new Event('prerender-ready'))
})

// Registering a service worker is what makes browsers offer "Install app" /
// "Add to Home Screen" for the site (a PWA requirement alongside the
// manifest). See public/sw.js for why it doesn't cache anything.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}
