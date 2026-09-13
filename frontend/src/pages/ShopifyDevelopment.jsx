import { useEffect } from 'react'
import Seo from '../components/Seo'
import { Helmet } from 'react-helmet-async'
import { FaRocket } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiArrowRight, FiArrowUpRight, FiCheck,
  FiShoppingBag, FiLayout, FiSmartphone, FiGrid, FiCreditCard, FiTruck,
  FiTrendingUp, FiZap, FiSearch, FiActivity,
  FiTarget, FiPenTool, FiUsers, FiHeart, FiHome,
} from 'react-icons/fi'
import ServiceFaq from '../components/ServiceFaq'
import '../styles/ShopifyDevelopment.css'

const FAQS = [
  { q: 'How long does it take to build a Shopify store?', a: 'The timeline depends on the number of products, pages, design requirements, integrations, content, and customization needed. After understanding your requirements, we can provide a practical development timeline and project milestones.' },
  { q: 'Can you create a custom Shopify store?', a: 'Yes. Our custom Shopify store development can include customized layouts, sections, product pages, collections, navigation, integrations, and other features based on your brand and ecommerce requirements.' },
  { q: 'Can you set up payments and shipping?', a: 'Yes. We can assist with suitable payment gateway configuration, shipping zones, delivery options, and related integrations. The available options depend on your target market, business model, location, and Shopify setup.' },
  { q: 'Can you improve an existing Shopify store?', a: 'Yes. We can redesign and optimize an existing store by improving its visual presentation, navigation, product pages, mobile experience, performance, SEO elements, and conversion-focused sections.' },
  { q: 'Is Shopify good for ecommerce businesses?', a: 'Shopify provides tools for building and managing online stores, including products, collections, checkout, themes, apps, and ecommerce functionality. The right setup depends on your products, business model, target customers, and required features.' },
]

const OFFER = [
  { icon: <FiShoppingBag />, title: 'Custom Shopify Store Development', desc: 'Create a Shopify store around your brand, products, audience, and business goals. Our custom Shopify store development approach focuses on unique layouts, organized product presentation, simple navigation, and a smooth shopping journey.' },
  { icon: <FiLayout />, title: 'Shopify Store Design', desc: 'Your online store should create a strong first impression. Our Shopify store design combines modern visuals, clear product sections, professional branding, easy navigation, and conversion-focused layouts.' },
  { icon: <FiGrid />, title: 'Shopify Ecommerce Development', desc: 'From product catalogs to checkout and customer accounts, we can build the important components of your store. Our Shopify ecommerce development approach keeps the shopping experience simple and practical.' },
  { icon: <FiCreditCard />, title: 'Payment Gateway Integration', desc: 'Make checkout easier by connecting suitable payment options for your target customers. We can assist with payment gateway configuration and integration based on your business and market requirements.' },
  { icon: <FiTruck />, title: 'Shipping & Delivery Setup', desc: 'Configure shipping zones, delivery options, rates, and suitable logistics integrations so customers can understand delivery information during their purchase journey.' },
  { icon: <FiActivity />, title: 'Shopify App Integration', desc: 'Connect useful apps and tools for reviews, email marketing, customer support, analytics, inventory, marketing automation, and other ecommerce requirements.' },
  { icon: <FiSearch />, title: 'Shopify SEO Optimization', desc: 'A well-structured store can provide a stronger foundation for search visibility. Our Shopify SEO optimization approach considers page titles, descriptions, URLs, product pages, collections, internal links, and other relevant SEO elements.' },
  { icon: <FiZap />, title: 'Shopify Speed Optimization', desc: 'Performance matters for ecommerce users. Our Shopify speed optimization approach focuses on images, theme elements, scripts, apps, and other factors that may affect the storefront experience.' },
]

const WHY = [
  { icon: <FiPenTool />, title: 'Custom Store Experience', desc: 'Instead of relying on a generic appearance, we plan the storefront around your brand identity, products, customers, and business objectives. Our custom Shopify store development approach gives you flexibility to create sections, layouts, product presentations, and features suited to your store.' },
  { icon: <FiUsers />, title: 'Better Shopping Experience', desc: 'Our Shopify store design focuses on clear navigation, organized categories, useful product information, visible CTAs, and a smoother path from product discovery to checkout.' },
  { icon: <FiSearch />, title: 'Search-Friendly Structure', desc: 'Our Shopify SEO optimization approach helps organize important storefront elements such as titles, descriptions, product information, collections, and canonical settings. Shopify officially supports SEO metadata including title tags, meta descriptions, and canonical URLs.' },
  { icon: <FiZap />, title: 'Performance-Focused Store', desc: 'A fast storefront can provide a better customer experience. Our Shopify speed optimization work considers unnecessary apps, large media files, theme elements, and scripts that can affect performance. Shopify also recommends building themes with performance in mind.' },
]

const PROCESS = [
  { n: '01', t: 'Business & Store Planning', d: 'We understand your products, target customers, brand style, competitors, required features, and ecommerce goals.' },
  { n: '02', t: 'Store Structure', d: 'We plan the homepage, product pages, collections, navigation, customer journey, and important supporting pages.' },
  { n: '03', t: 'Design & Theme Customization', d: 'We create the visual direction and customize the storefront around your brand. The design focuses on product visibility, usability, mobile experience, and clear calls to action.' },
  { n: '04', t: 'Store Development', d: 'We configure products, collections, navigation, pages, apps, payment options, shipping settings, and other required ecommerce features.' },
  { n: '05', t: 'Testing & Optimization', d: 'We test the store across devices, check product pages, cart functionality, forms, navigation, links, checkout flow, and important performance elements.' },
  { n: '06', t: 'Launch & Support', d: 'After final approval, we prepare the store for launch and provide guidance for managing products, content, orders, and future updates.' },
]

const FEATURES = [
  'Premium homepage', 'Product pages', 'Collection pages', 'Product filters', 'Shopping cart', 'Checkout setup',
  'Payment gateway integration', 'Shipping configuration', 'Customer reviews', 'Wishlist functionality',
  'WhatsApp integration', 'Social media integration', 'Analytics setup', 'Email marketing tools',
  'FAQ section', 'Blog section', 'Basic SEO setup', 'Mobile optimization',
]

const WHO_FOR = [
  { icon: <FiShoppingBag />, title: 'Fashion & Apparel Brands', desc: 'Create attractive product pages and organized collections that make browsing easier for customers.' },
  { icon: <FiHeart />, title: 'Beauty & Cosmetics Businesses', desc: 'Showcase products with clean layouts, helpful information, reviews, and a smooth purchasing experience.' },
  { icon: <FiHome />, title: 'Home & Lifestyle Brands', desc: 'Organize large product catalogs into clear collections and navigation structures.' },
  { icon: <FiZap />, title: 'D2C & Startup Brands', desc: 'Launch a professional ecommerce store with the flexibility to add products, marketing tools, integrations, and new features as the business grows.' },
  { icon: <FiTrendingUp />, title: 'Growing Ecommerce Businesses', desc: 'Improve an existing Shopify store with better design, performance, product organization, functionality, and customer experience.' },
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Shopify Development',
  provider: { '@type': 'ProfessionalService', name: 'DigionTop', url: 'https://www.digiontop.com' },
  areaServed: 'Delhi, India',
  description: 'Shopify development services including custom store design, ecommerce development, payment gateway integration, shipping setup, app integration, SEO, and speed optimization.',
}

export default function ShopifyDevelopment() {
  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 })
  }, [])

  return (
    <main className="sf">
      <Seo
        title="Shopify Development Service in Delhi | Ecommerce"
        description="Get Shopify development service in Delhi with custom store design, ecommerce features, payment setup, SEO, speed optimization, and support."
        path="/services/shopify-development"
      />
      <Helmet>
        <meta property="og:title" content="Shopify Development Service in Delhi | Ecommerce" />
        <meta property="og:description" content="Attractive storefronts, easy shopping experiences, secure integrations, mobile responsiveness, and scalable ecommerce solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.digiontop.com/services/shopify-development" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      {/* HERO */}
      <section className="sf-hero">
        <div className="sf-hero__glow" />
        <div className="sf-container sf-hero__inner">
          <div className="sf-hero__content" data-aos="fade-up">
            <span className="sf-tag"><FiShoppingBag /> Shopify Store Development</span>
            <h1 className="sf-hero__title">Shopify Development Service in <span>Delhi</span></h1>
            <p className="sf-hero__sub">
              Build a professional online store that looks unique, works smoothly, and is designed around your
              products and customers. Our Shopify development service in Delhi focuses on attractive storefronts,
              easy shopping experiences, secure integrations, mobile responsiveness, SEO-ready structure, and
              scalable ecommerce solutions.
            </p>
            <div className="sf-hero__actions">
              <Link to="/contact" className="sf-btn sf-btn--primary">Start Your Shopify Store <FiArrowRight /></Link>
              <Link to="/contact" className="sf-btn sf-btn--ghost">Get a Free Consultation</Link>
            </div>
            <div className="sf-hero__chips">
              <span><FiCheck /> Custom Store Design</span>
              <span><FiCheck /> Mobile Responsive</span>
              <span><FiCheck /> Secure Payments</span>
              <span><FiCheck /> SEO-Ready</span>
              <span><FiCheck /> Fast Performance</span>
              <span><FiCheck /> Scalable Ecommerce</span>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLETE SHOPIFY SOLUTIONS */}
      <section className="sf-offer" id="sf-offer">
        <div className="sf-container">
          <div className="sf-head" data-aos="fade-up">
            <span className="sf-eyebrow">What We Offer</span>
            <h2 className="sf-h2">Complete Shopify Solutions for Your Online Store</h2>
          </div>
          <div className="sf-offer__grid">
            {OFFER.map((o, i) => (
              <div className="sf-card" key={o.title} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="sf-card__icon">{o.icon}</span>
                <h3>{o.title}</h3>
                <p>{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="sf-why">
        <div className="sf-container">
          <div className="sf-head" data-aos="fade-up">
            <span className="sf-eyebrow">Why Choose DigionTop?</span>
            <h2 className="sf-h2">Why Choose Our Shopify Development Services?</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginTop: 14 }}>
              Our Shopify development service in Delhi combines design, ecommerce functionality, usability, and
              technical planning. We create stores that are easier for customers to browse and easier for business
              owners to manage.
            </p>
          </div>
          <div className="sf-why__grid">
            {WHY.map((w, i) => (
              <div className="sf-why__card" key={w.title} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="sf-why__icon">{w.icon}</span>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="sf-process">
        <div className="sf-container">
          <div className="sf-head sf-head--light" data-aos="fade-up">
            <span className="sf-eyebrow sf-eyebrow--light">Our Process</span>
            <h2 className="sf-h2 sf-h2--light">Our Shopify Development Process</h2>
          </div>
          <div className="sf-process__track">
            {PROCESS.map((s, i) => (
              <div className="sf-step" key={s.n} data-aos="fade-up" data-aos-delay={i * 60}>
                <span className="sf-step__num">{s.n}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOUR STORE CAN INCLUDE */}
      <section className="sf-features">
        <div className="sf-container">
          <div className="sf-head" data-aos="fade-up">
            <span className="sf-eyebrow sf-eyebrow--light">What's Included</span>
            <h2 className="sf-h2 sf-h2--light">What Your Shopify Store Can Include</h2>
          </div>
          <div className="sf-features__grid">
            {FEATURES.map((f, i) => (
              <div className="sf-feature" key={f} data-aos="fade-up" data-aos-delay={(i % 4) * 50}>
                <FiCheck /> {f}
              </div>
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, textAlign: 'center', maxWidth: 640, margin: '26px auto 0' }}>
            Our Shopify ecommerce development approach can be adapted according to your product range, business
            model, customer journey, and future requirements.
          </p>
        </div>
      </section>

      {/* WHO WE HELP */}
      <section className="sf-why">
        <div className="sf-container">
          <div className="sf-head" data-aos="fade-up">
            <span className="sf-eyebrow">Who We Help</span>
            <h2 className="sf-h2">Who We Help</h2>
          </div>
          <div className="sf-mini-grid">
            {WHO_FOR.map((w, i) => (
              <div className="sf-mini" key={w.title} data-aos="fade-up" data-aos-delay={(i % 3) * 60}>
                <span className="sf-mini__icon">{w.icon}</span>
                <div><h3>{w.title}</h3><p>{w.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILT FOR ECOMMERCE GROWTH */}
      <section className="sf-intro">
        <div className="sf-container">
          <div className="sf-intro__card" data-aos="fade-up">
            <span className="sf-intro__quote" aria-hidden="true">&ldquo;</span>
            <span className="sf-eyebrow">Built for Ecommerce Growth</span>
            <h2 className="sf-h2">Practical, Standards-Based Shopify Development</h2>
            <p className="sf-intro__lead">
              A Shopify store should support both your customers and your business operations. We focus on clear
              product presentation, simple navigation, mobile usability, useful integrations, and a practical
              structure that can support future marketing.
            </p>
            <p className="sf-intro__lead">
              Shopify's own documentation recommends customizable, fast, accessible, and discoverable themes, while
              its SEO guidance covers metadata and canonical URLs. We also avoid unnecessary or deceptive
              development practices and focus on straightforward implementation that serves the store and its
              customers.
            </p>
          </div>
          <p className="sf-note">
            Our <Link to="/services/ecommerce-seo">ongoing ecommerce SEO services</Link> pick up where Shopify SEO
            setup leaves off, this page covers building and structuring the store itself; ecommerce SEO is the
            continued strategy for any ecommerce site, Shopify or otherwise. Explore our other related services:{' '}
            <Link to="/services/custom-website">Custom Website Development</Link>,{' '}
            <Link to="/services/wordpress-development">WordPress Website Development</Link>,{' '}
            <Link to="/services/custom-web-application">Custom Web Applications</Link>,{' '}
            <Link to="/services/website-redesign">Website Redesign</Link>,{' '}
            <Link to="/services/technical-seo">Technical SEO</Link>,{' '}
            <Link to="/services/local-seo">Local SEO</Link>,{' '}
            <Link to="/services/google-ads">Google Ads</Link>, and{' '}
            <Link to="/services/social-media-marketing">Social Media Marketing</Link>.
          </p>
        </div>
      </section>

      {/* RESULTS & TRUST */}
      <section>
        <div className="sf-container">
          <div className="sf-trustbox" data-aos="fade-up">
            <h2>Results &amp; Trust</h2>
            <p>
              Every ecommerce project has different products, customers, goals, and starting points. We focus on
              creating a professional storefront, smoother customer journeys, organized product presentation,
              reliable functionality, and a strong foundation for future marketing.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ + lead form */}
      <ServiceFaq service="Shopify Store Development" faqs={FAQS} />

      {/* GOAL + CTA */}
      <section className="sf-cta">
        <div className="sf-container">
          <div className="sf-cta__box" data-aos="zoom-in">
            <span className="sf-cta__rocket"><FaRocket /></span>
            <h2>Ready to Launch Your Shopify Store?</h2>
            <p>
              Create an online store that represents your brand professionally and gives customers a simple, smooth
              path from product discovery to purchase.
            </p>
            <div className="sf-hero__actions">
              <Link to="/contact" className="sf-btn sf-btn--light">Start Your Shopify Project <FiArrowUpRight /></Link>
              <Link to="/contact" className="sf-btn sf-btn--ghost-l">Get a Free Consultation</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
