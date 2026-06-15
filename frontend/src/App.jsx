import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import WebsiteDevelopment from './pages/WebsiteDevelopment';
import SEOServices from './pages/SEOServices';
import SocialMedia from './pages/SocialMedia';
import ECommerce from './pages/ECommerce';
import WhyUs from './pages/WhyUs';
import Industries from './pages/Industries';
import Testimonials from './pages/Testimonials';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services/website-development" element={<WebsiteDevelopment />} />
        <Route path="/services/seo-services" element={<SEOServices />} />
        <Route path="/services/social-media-marketing" element={<SocialMedia />} />
        <Route path="/services/ecommerce-solutions" element={<ECommerce />} />
        <Route path="/why-us" element={<WhyUs />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
