import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import WhatsAppButton from './components/WhatsAppButton';
import MobileCTABar from './components/MobileCTABar';
import AdminApp from './admin/AdminApp';

import Home from './pages/Home';
import About from './pages/About';
import WebDevelopment from './pages/WebDevelopment';
import ShopifyDevelopment from './pages/ShopifyDevelopment';
import CreativeBranding from './pages/CreativeBranding';
import BrandingIdentity from './pages/sub/BrandingIdentity';
import UiUxDesign from './pages/sub/UiUxDesign';
import VideoProduction from './pages/sub/VideoProduction';
import DigitalStrategy from './pages/sub/DigitalStrategy';
import AnalyticsInsights from './pages/sub/AnalyticsInsights';
import LogoDesign from './pages/sub/LogoDesign';
import GraphicDesign from './pages/sub/GraphicDesign';
import CroServices from './pages/sub/CroServices';
import EcommercePage from './pages/EcommercePage';
import EcomServicePage from './pages/sub/EcomServicePage';
import MobileSoftware from './pages/MobileSoftware';
import MobileServicePage from './pages/sub/MobileServicePage';
import SocialServicePage from './pages/sub/SocialServicePage';
import PpcPage from './pages/sub/PpcPage';
import SEOServices from './pages/SEOServices';
import LocalSeo from './pages/sub/LocalSeo';
import TechnicalSeo from './pages/sub/TechnicalSeo';
import EcommerceSeo from './pages/sub/EcommerceSeo';
import EnterpriseSeo from './pages/sub/EnterpriseSeo';
import LinkBuilding from './pages/sub/LinkBuilding';
import SeoAudit from './pages/sub/SeoAudit';
import GoogleAds from './pages/sub/GoogleAds';
import MetaAds from './pages/sub/MetaAds';
import LinkedInAds from './pages/sub/LinkedInAds';
import YouTubeAds from './pages/sub/YouTubeAds';
import SocialAds from './pages/sub/SocialAds';
import SocialMediaMarketing from './pages/sub/SocialMediaMarketing';
import ContentMarketing from './pages/sub/ContentMarketing';
import EmailMarketing from './pages/sub/EmailMarketing';
import SocialMediaManagement from './pages/sub/SocialMediaManagement';
import InfluencerMarketing from './pages/sub/InfluencerMarketing';
import SeoContentWriting from './pages/sub/SeoContentWriting';
import Copywriting from './pages/sub/Copywriting';
import SocialMedia from './pages/SocialMedia';
import WhyUs from './pages/WhyUs';
import Industries from './pages/Industries';
import Testimonials from './pages/Testimonials';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Work from './pages/Work';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function PublicSite() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services/website-development" element={<WebDevelopment />} />
        <Route path="/services/web-development" element={<WebDevelopment />} />
        <Route path="/services/shopify-development" element={<ShopifyDevelopment />} />
        <Route path="/services/creative-branding" element={<CreativeBranding />} />
        <Route path="/services/branding-identity" element={<BrandingIdentity />} />
        <Route path="/services/ui-ux-design" element={<UiUxDesign />} />
        <Route path="/services/video-production" element={<VideoProduction />} />
        <Route path="/services/digital-strategy" element={<DigitalStrategy />} />
        <Route path="/services/analytics-insights" element={<AnalyticsInsights />} />
        <Route path="/services/logo-design" element={<LogoDesign />} />
        <Route path="/services/graphic-design" element={<GraphicDesign />} />
        <Route path="/services/cro-services" element={<CroServices />} />
        <Route path="/services/seo-services" element={<SEOServices />} />
        <Route path="/services/local-seo" element={<LocalSeo />} />
        <Route path="/services/technical-seo" element={<TechnicalSeo />} />
        <Route path="/services/ecommerce-seo" element={<EcommerceSeo />} />
        <Route path="/services/enterprise-seo" element={<EnterpriseSeo />} />
        <Route path="/services/link-building" element={<LinkBuilding />} />
        <Route path="/services/seo-audit" element={<SeoAudit />} />
        <Route path="/services/social-media-marketing" element={<SocialMedia />} />
        <Route path="/services/ecommerce-solutions" element={<EcommercePage />} />
        <Route path="/services/ecom/:slug" element={<EcomServicePage />} />
        <Route path="/services/mobile-software" element={<MobileSoftware />} />
        <Route path="/services/mobile/:slug" element={<MobileServicePage />} />
        <Route path="/services/social/social-media-marketing" element={<SocialMediaMarketing />} />
        <Route path="/services/social/content-marketing" element={<ContentMarketing />} />
        <Route path="/services/social/email-marketing" element={<EmailMarketing />} />
        <Route path="/services/social/social-media-management" element={<SocialMediaManagement />} />
        <Route path="/services/social/influencer-marketing" element={<InfluencerMarketing />} />
        <Route path="/services/social/seo-content-writing" element={<SeoContentWriting />} />
        <Route path="/services/social/copywriting" element={<Copywriting />} />
        <Route path="/services/social/:slug" element={<SocialServicePage />} />
        <Route path="/services/ppc" element={<PpcPage />} />
        <Route path="/services/google-ads" element={<GoogleAds />} />
        <Route path="/services/meta-ads" element={<MetaAds />} />
        <Route path="/services/social-advertising" element={<SocialAds />} />
        <Route path="/services/linkedin-ads" element={<LinkedInAds />} />
        <Route path="/services/youtube-ads" element={<YouTubeAds />} />
        <Route path="/why-us" element={<WhyUs />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/work" element={<Work />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <ChatBot />
      <WhatsAppButton />
      <MobileCTABar />
    </>
  );
}

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Admin runs standalone (no public Navbar/Footer).
  if (pathname.startsWith('/admin')) {
    return (
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    );
  }

  return <PublicSite />;
}

export default App;
