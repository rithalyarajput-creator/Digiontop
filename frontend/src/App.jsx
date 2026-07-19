import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import WhatsAppButton from './components/WhatsAppButton';
import MobileCTABar from './components/MobileCTABar';
import LeadPopup from './components/LeadPopup';
import AdminApp from './admin/AdminApp';
import usePageTracking from './hooks/usePageTracking';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const WebDevelopment = lazy(() => import('./pages/WebDevelopment'));
const ShopifyDevelopment = lazy(() => import('./pages/ShopifyDevelopment'));
const CreativeBranding = lazy(() => import('./pages/CreativeBranding'));
const BrandingIdentity = lazy(() => import('./pages/sub/BrandingIdentity'));
const UiUxDesign = lazy(() => import('./pages/sub/UiUxDesign'));
const VideoProduction = lazy(() => import('./pages/sub/VideoProduction'));
const DigitalStrategy = lazy(() => import('./pages/sub/DigitalStrategy'));
const AnalyticsInsights = lazy(() => import('./pages/sub/AnalyticsInsights'));
const LogoDesign = lazy(() => import('./pages/sub/LogoDesign'));
const GraphicDesign = lazy(() => import('./pages/sub/GraphicDesign'));
const CroServices = lazy(() => import('./pages/sub/CroServices'));
const EcommercePage = lazy(() => import('./pages/EcommercePage'));
const EcomServicePage = lazy(() => import('./pages/sub/EcomServicePage'));
const MobileSoftware = lazy(() => import('./pages/MobileSoftware'));
const MobileServicePage = lazy(() => import('./pages/sub/MobileServicePage'));
const SocialServicePage = lazy(() => import('./pages/sub/SocialServicePage'));
const PpcPage = lazy(() => import('./pages/sub/PpcPage'));
const SEOServices = lazy(() => import('./pages/SEOServices'));
const LocalSeo = lazy(() => import('./pages/sub/LocalSeo'));
const TechnicalSeo = lazy(() => import('./pages/sub/TechnicalSeo'));
const EcommerceSeo = lazy(() => import('./pages/sub/EcommerceSeo'));
const EnterpriseSeo = lazy(() => import('./pages/sub/EnterpriseSeo'));
const LinkBuilding = lazy(() => import('./pages/sub/LinkBuilding'));
const SeoAudit = lazy(() => import('./pages/sub/SeoAudit'));
const GoogleAds = lazy(() => import('./pages/sub/GoogleAds'));
const MetaAds = lazy(() => import('./pages/sub/MetaAds'));
const LinkedInAds = lazy(() => import('./pages/sub/LinkedInAds'));
const YouTubeAds = lazy(() => import('./pages/sub/YouTubeAds'));
const SocialAds = lazy(() => import('./pages/sub/SocialAds'));
const SocialMediaMarketing = lazy(() => import('./pages/sub/SocialMediaMarketing'));
const ContentMarketing = lazy(() => import('./pages/sub/ContentMarketing'));
const EmailMarketing = lazy(() => import('./pages/sub/EmailMarketing'));
const SocialMediaManagement = lazy(() => import('./pages/sub/SocialMediaManagement'));
const InfluencerMarketing = lazy(() => import('./pages/sub/InfluencerMarketing'));
const SeoContentWriting = lazy(() => import('./pages/sub/SeoContentWriting'));
const Copywriting = lazy(() => import('./pages/sub/Copywriting'));
const CustomWebsite = lazy(() => import('./pages/sub/CustomWebsite'));
const BusinessWebsite = lazy(() => import('./pages/sub/BusinessWebsite'));
const WordPressDev = lazy(() => import('./pages/sub/WordPressDev'));
const WebApp = lazy(() => import('./pages/sub/WebApp'));
const WooCommerce = lazy(() => import('./pages/sub/WooCommerce'));
const WebsiteRedesign = lazy(() => import('./pages/sub/WebsiteRedesign'));
const LandingPage = lazy(() => import('./pages/sub/LandingPage'));
const MobileApp = lazy(() => import('./pages/sub/MobileApp'));
const IosApp = lazy(() => import('./pages/sub/IosApp'));
const AndroidApp = lazy(() => import('./pages/sub/AndroidApp'));
const FlutterApp = lazy(() => import('./pages/sub/FlutterApp'));
const CloudSolutions = lazy(() => import('./pages/sub/CloudSolutions'));
const ApiDevelopment = lazy(() => import('./pages/sub/ApiDevelopment'));
const SaasDevelopment = lazy(() => import('./pages/sub/SaasDevelopment'));
const DevOpsServices = lazy(() => import('./pages/sub/DevOpsServices'));
const AmazonListing = lazy(() => import('./pages/sub/AmazonListing'));
const FlipkartListing = lazy(() => import('./pages/sub/FlipkartListing'));
const MeeshoListing = lazy(() => import('./pages/sub/MeeshoListing'));
const ProductSeo = lazy(() => import('./pages/sub/ProductSeo'));
const ProductImage = lazy(() => import('./pages/sub/ProductImage'));
const CatalogManagement = lazy(() => import('./pages/sub/CatalogManagement'));
const AccountManagement = lazy(() => import('./pages/sub/AccountManagement'));
const GrowthConsulting = lazy(() => import('./pages/sub/GrowthConsulting'));
const SocialMedia = lazy(() => import('./pages/SocialMedia'));
const WhyUs = lazy(() => import('./pages/WhyUs'));
const Industries = lazy(() => import('./pages/Industries'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const Work = lazy(() => import('./pages/Work'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const NotFound = lazy(() => import('./pages/NotFound'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instant, not smooth: a smooth scroll animates up from wherever the
    // previous page had scrolled to, so the new page briefly renders
    // mid-way down before sliding into view. Every navigation should land
    // at the top immediately.
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PublicSite() {
  usePageTracking();
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Suspense fallback={<div className="route-loading"><span className="route-loading__spinner" /></div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services/website-development" element={<WebDevelopment />} />
        <Route path="/services/custom-website" element={<CustomWebsite />} />
        <Route path="/services/business-website" element={<BusinessWebsite />} />
        <Route path="/services/wordpress-development" element={<WordPressDev />} />
        <Route path="/services/custom-web-application" element={<WebApp />} />
        <Route path="/services/woocommerce-development" element={<WooCommerce />} />
        <Route path="/services/website-redesign" element={<WebsiteRedesign />} />
        <Route path="/services/landing-page-design" element={<LandingPage />} />
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
        <Route path="/services/ecom/amazon" element={<AmazonListing />} />
        <Route path="/services/ecom/flipkart" element={<FlipkartListing />} />
        <Route path="/services/ecom/meesho" element={<MeeshoListing />} />
        <Route path="/services/ecom/product-seo" element={<ProductSeo />} />
        <Route path="/services/ecom/product-image" element={<ProductImage />} />
        <Route path="/services/ecom/catalog-management" element={<CatalogManagement />} />
        <Route path="/services/ecom/account-management" element={<AccountManagement />} />
        <Route path="/services/ecom/growth-consulting" element={<GrowthConsulting />} />
        <Route path="/services/ecom/:slug" element={<EcomServicePage />} />
        <Route path="/services/mobile-software" element={<MobileSoftware />} />
        <Route path="/services/mobile/mobile-app" element={<MobileApp />} />
        <Route path="/services/mobile/ios" element={<IosApp />} />
        <Route path="/services/mobile/android" element={<AndroidApp />} />
        <Route path="/services/mobile/flutter" element={<FlutterApp />} />
        <Route path="/services/mobile/cloud" element={<CloudSolutions />} />
        <Route path="/services/mobile/api" element={<ApiDevelopment />} />
        <Route path="/services/mobile/saas" element={<SaasDevelopment />} />
        <Route path="/services/mobile/devops" element={<DevOpsServices />} />
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
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
      <Footer />
      <ChatBot />
      <WhatsAppButton />
      <MobileCTABar />
      <LeadPopup />
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
