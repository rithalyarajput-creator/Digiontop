import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiShoppingBag, FiSearch, FiStar, FiTag, FiGrid,
  FiCheck, FiArrowRight, FiArrowUpRight, FiDollarSign,
  FiCode, FiFileText, FiLink2, FiRefreshCw, FiClipboard, FiTrendingUp,
  FiActivity, FiUsers, FiEye, FiBarChart2, FiDroplet, FiCpu, FiHome,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/EcommerceSeo.css'

const FAQS = [
  { q: 'What is ecommerce SEO?', a: 'Ecommerce SEO focuses on improving the organic visibility of online stores and their important pages. It can include product and category optimization, keyword research, technical SEO, internal linking, content optimization, and other search-focused activities.' },
  { q: 'Why is SEO important for an ecommerce website?', a: 'SEO can help shoppers discover your products through organic search. A well-optimized store can improve visibility across product and category searches, attract relevant visitors, and create additional opportunities for product views and purchases.' },
  { q: 'How long does ecommerce SEO take?', a: 'The timeline varies depending on competition, website size, product catalog, technical condition, content quality, and authority. Smaller improvements may appear earlier, while sustainable organic growth generally requires consistent optimization and monitoring.' },
  { q: 'Can SEO help product pages rank on Google?', a: 'Yes, properly optimized product pages can become eligible to appear for relevant searches. However, rankings depend on many factors, including relevance, competition, website quality, content, technical accessibility, and overall search demand.' },
  { q: 'Does ecommerce SEO work for large product websites?', a: 'Yes. Large stores can benefit from structured ecommerce SEO, especially when they have many products, categories, variants, or technical URLs. A scalable strategy can help manage site architecture, indexing, internal linking, and content more effectively.' },
]

const SOLUTIONS = [
  { icon: <FiShoppingBag />, t: 'Product Page SEO', d: 'Your product pages need clear, useful information that helps both shoppers and search engines understand what you sell. We optimize relevant elements such as product titles, descriptions, headings, URLs, images, internal links, and other on-page elements.' },
  { icon: <FiGrid />, t: 'Category Page SEO', d: 'Category pages can help customers discover groups of related products. We improve category structure, content, internal linking, headings, and other relevant elements to create a clearer shopping and search experience.' },
  { icon: <FiSearch />, t: 'Ecommerce Keyword Research', d: 'We identify relevant keywords around products, categories, brands, features, and customer searches. The strategy considers search intent and business relevance rather than focusing only on search volume.' },
  { icon: <FiCode />, t: 'Technical Ecommerce SEO', d: 'Our technical ecommerce SEO approach focuses on website architecture, crawlability, indexing, duplicate URLs, canonicalization, redirects, sitemaps, mobile usability, and other technical areas. Large ecommerce websites can have many product, category, filter, and variant URLs, so maintaining a clean structure is particularly important.' },
  { icon: <FiFileText />, t: 'Ecommerce Content SEO', d: 'Useful content can help shoppers understand products and make better purchasing decisions. We identify opportunities for buying guides, product information, FAQs, comparisons, and other relevant content.' },
  { icon: <FiLink2 />, t: 'Ecommerce Internal Linking', d: 'We improve relevant connections between products, categories, related products, guides, and other important pages to make navigation easier and help users discover more of your store.' },
]

const WHY_US = [
  { icon: <FiShoppingBag />, t: 'Product-Focused Approach', d: 'We consider your products, categories, variations, customer needs, and buying journey when planning your SEO strategy.' },
  { icon: <FiGrid />, t: 'Better Website Structure', d: 'A clear hierarchy between categories, subcategories, products, and supporting content can make your store easier to navigate and manage.' },
  { icon: <FiSearch />, t: 'Search Intent Focus', d: 'We focus on understanding whether users are researching, comparing, or ready to purchase so that relevant pages can target the right search intent.' },
  { icon: <FiRefreshCw />, t: 'Continuous Optimization', d: 'Ecommerce websites change regularly. New products, discontinued items, price changes, promotions, and website updates can create new SEO requirements.' },
]

const PROCESS = [
  { n: '01', t: 'Store Audit', d: 'We review your website structure, products, categories, technical health, content, indexing, internal links, and existing organic visibility.', icon: <FiClipboard /> },
  { n: '02', t: 'Keyword Research', d: 'We identify relevant commercial, transactional, informational, product, category, and long-tail search terms related to your store.', icon: <FiSearch /> },
  { n: '03', t: 'SEO Strategy', d: 'We create a roadmap for product pages, category pages, technical improvements, content, internal linking, and other relevant SEO activities.', icon: <FiTrendingUp /> },
  { n: '04', t: 'On-Page Optimization', d: 'We optimize important page elements including titles, descriptions, headings, URLs, content, images, and internal links.', icon: <FiTag /> },
  { n: '05', t: 'Technical Optimization', d: 'We address relevant technical issues involving crawling, indexing, duplicate URLs, redirects, canonical signals, sitemaps, and website performance.', icon: <FiCode /> },
  { n: '06', t: 'Monitor & Improve', d: 'We monitor relevant organic performance and use data to identify new opportunities and areas that require further optimization.', icon: <FiActivity /> },
]

const OPTIMIZE = [
  { icon: <FiTag />, t: 'Product Visibility', d: 'Help search engines and shoppers understand important product information through clear titles, descriptions, structured content, and relevant page elements.' },
  { icon: <FiGrid />, t: 'Category Optimization', d: 'Create useful category pages that help users browse products while providing clear context about the products included in each category.' },
  { icon: <FiCode />, t: 'Technical Foundation', d: 'A technically healthy ecommerce website can make it easier for search engines to crawl and understand your pages.' },
  { icon: <FiShoppingBag />, t: 'Shopping Experience', d: 'SEO should not make your website difficult to use. We focus on optimization while keeping navigation, readability, and the customer journey in mind.' },
]

const BENEFITS = [
  { icon: <FiSearch />, t: 'Increase Product Discovery', d: 'Improve your chances of appearing when potential customers search for products relevant to your store.' },
  { icon: <FiUsers />, t: 'Attract Relevant Shoppers', d: 'Reach people whose searches match your products, categories, and business offering.' },
  { icon: <FiEye />, t: 'Improve Organic Visibility', d: 'Build stronger search visibility across important product and category pages.' },
  { icon: <FiTrendingUp />, t: 'Support More Conversions', d: 'Better-targeted organic visitors can create additional opportunities for product views, enquiries, and purchases.' },
  { icon: <FiBarChart2 />, t: 'Build Long-Term Search Presence', d: 'Consistent optimization can help establish a stronger organic foundation as your ecommerce store grows.' },
]

const STORE_TYPES = [
  { icon: <FiShoppingBag />, t: 'Fashion & Clothing', d: 'Optimize product, category, brand, and style-focused pages for shoppers searching for clothing online.' },
  { icon: <FiDroplet />, t: 'Beauty & Cosmetics', d: 'Improve visibility around products, categories, ingredients, brands, and relevant customer searches.' },
  { icon: <FiCpu />, t: 'Electronics', d: 'Create a structured approach for product specifications, categories, brands, comparisons, and transactional searches.' },
  { icon: <FiHome />, t: 'Home & Furniture', d: 'Improve category and product discovery for customers searching for furniture, home products, and related solutions.' },
  { icon: <FiStar />, t: 'Jewellery', d: 'Build search visibility around product types, styles, materials, categories, and relevant purchase-focused searches.' },
  { icon: <FiGrid />, t: 'Multi-Category Stores', d: 'Create scalable SEO strategies for stores with large product catalogs and multiple categories.' },
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Ecommerce SEO',
  provider: { '@type': 'ProfessionalService', name: 'DigionTop', url: 'https://www.digiontop.com' },
  areaServed: 'Delhi, India',
  description: 'Ecommerce SEO services including product page optimization, category page SEO, technical ecommerce SEO, keyword research, content SEO, and internal linking for online stores.',
}

export default function EcommerceSeo() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="eseo">
      <Seo
        title="Ecommerce SEO Services in Delhi - Grow Online Sales"
        description="Improve product visibility, organic traffic, and online store growth with professional ecommerce SEO services in Delhi. Get a customized SEO strategy."
        path="/services/ecommerce-seo"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      {/* HERO */}
      <section className="eseo-hero">
        <div className="eseo-container eseo-hero__inner">
          <div className="eseo-hero__text" data-aos="fade-right">
            <h1 className="eseo-hero__title">Ecommerce SEO Services in Delhi for <span>Online Store Growth</span></h1>
            <p className="eseo-hero__sub">
              Your online store needs more than great products to attract customers. It needs to be visible when people
              are actively searching for the products you sell. Our ecommerce SEO services in Delhi help online stores
              improve organic visibility, attract relevant shoppers, and create more opportunities for product discovery
              and sales.
            </p>
            <p className="eseo-hero__sub">
              We create ecommerce SEO strategies based on your products, categories, customers, competitors, website
              structure, and search intent. From <Link to="/services/technical-seo">product page optimization</Link> and
              category structure to technical SEO, content, internal linking, and search visibility, our approach focuses
              on creating a stronger organic foundation for your online store.
            </p>
            <div className="eseo-hero__cta">
              <Link to="/contact" className="eseo-btn eseo-btn--solid">Get Free Ecommerce SEO Consultation <FiArrowRight /></Link>
              <Link to="/contact" className="eseo-btn eseo-btn--ghost">Talk to an SEO Expert</Link>
            </div>
            <div className="eseo-hero__mini">
              <div><FiCheck /><span>Product-Focused SEO Strategy</span></div>
              <div><FiCheck /><span>Technical &amp; On-Page Optimization</span></div>
              <div><FiCheck /><span>Search-Focused Growth</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLETE SEO SOLUTIONS */}
      <section className="eseo-pillars">
        <div className="eseo-container">
          <div className="eseo-head" data-aos="fade-up">
            <h2>Complete SEO Solutions for Ecommerce Websites</h2>
            <p className="eseo-head__sub">Our ecommerce SEO company in Delhi focuses on the areas that can make your online store easier to discover, understand, and navigate. We look beyond individual keywords and consider the complete shopping journey.</p>
          </div>
          <div className="eseo-pillars__grid">
            {SOLUTIONS.map((p, i) => (
              <div className="eseo-pillar" key={p.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="eseo-pillar__icon">{p.icon}</span>
                <h3>{p.t}</h3><p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="eseo-pillars eseo-pillars--alt">
        <div className="eseo-container">
          <div className="eseo-head" data-aos="fade-up">
            <h2>Why Choose Our Ecommerce SEO Strategy?</h2>
            <p className="eseo-head__sub">Every ecommerce website has different products, customers, competitors, and technical requirements. We create a strategy based on your store rather than applying the same checklist to every website.</p>
          </div>
          <div className="eseo-pillars__grid">
            {WHY_US.map((p, i) => (
              <div className="eseo-pillar" key={p.t} data-aos="fade-up" data-aos-delay={(i % 4) * 70}>
                <span className="eseo-pillar__icon">{p.icon}</span>
                <h3>{p.t}</h3><p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="eseo-process">
        <div className="eseo-container">
          <div className="eseo-head eseo-head--light" data-aos="fade-up">
            <h2>Our Ecommerce SEO Process</h2>
            <p className="eseo-head__sub eseo-head__sub--light">We follow a structured process to understand your store, identify opportunities, implement improvements, and monitor performance.</p>
          </div>
          <div className="eseo-process__grid">
            {PROCESS.map((s, i) => (
              <div className="eseo-process__step" key={s.t} data-aos="fade-up" data-aos-delay={i * 60}>
                <span className="eseo-process__num">{s.n}</span>
                <span className="eseo-process__icon">{s.icon}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPTIMIZE EVERY PART OF YOUR STORE */}
      <section className="eseo-pillars">
        <div className="eseo-container">
          <div className="eseo-head" data-aos="fade-up">
            <h2>Optimize Every Important Part of Your Store</h2>
          </div>
          <div className="eseo-pillars__grid">
            {OPTIMIZE.map((p, i) => (
              <div className="eseo-pillar" key={p.t} data-aos="fade-up" data-aos-delay={(i % 4) * 70}>
                <span className="eseo-pillar__icon">{p.icon}</span>
                <h3>{p.t}</h3><p>{p.d}</p>
              </div>
            ))}
          </div>
          <p className="eseo-note">
            Google's current ecommerce guidance continues to emphasize product information and structured data, including
            merchant listing information and product variants.
          </p>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="eseo-pillars eseo-pillars--alt">
        <div className="eseo-container">
          <div className="eseo-head" data-aos="fade-up">
            <h2>Benefits of Ecommerce SEO</h2>
          </div>
          <div className="eseo-mini-grid">
            {BENEFITS.map((b, i) => (
              <div className="eseo-mini" key={b.t} data-aos="fade-up" data-aos-delay={(i % 3) * 60}>
                <span className="eseo-mini__icon">{b.icon}</span>
                <div><h3>{b.t}</h3><p>{b.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORE TYPES */}
      <section className="eseo-pillars">
        <div className="eseo-container">
          <div className="eseo-head" data-aos="fade-up">
            <h2>Ecommerce SEO for Different Online Stores</h2>
          </div>
          <div className="eseo-mini-grid">
            {STORE_TYPES.map((b, i) => (
              <div className="eseo-mini" key={b.t} data-aos="fade-up" data-aos-delay={(i % 3) * 60}>
                <span className="eseo-mini__icon">{b.icon}</span>
                <div><h3>{b.t}</h3><p>{b.d}</p></div>
              </div>
            ))}
          </div>
          <p className="eseo-note">
            Building or setting up a Shopify store itself? See our{' '}
            <Link to="/services/shopify-development">Shopify development service</Link> — this page covers the
            ongoing SEO strategy for any ecommerce site. Explore our other related services:{' '}
            <Link to="/services/seo-services">SEO Services</Link>,{' '}
            <Link to="/services/seo-audit">Free SEO Audit</Link>,{' '}
            <Link to="/services/technical-seo">Technical SEO</Link>,{' '}
            <Link to="/services/local-seo">Local SEO</Link>,{' '}
            <Link to="/services/website-development">Website Design</Link>,{' '}
            <Link to="/services/website-redesign">Website Redesign</Link>,{' '}
            <Link to="/services/google-ads">Google Ads</Link>,{' '}
            <Link to="/services/social/content-marketing">Content Marketing</Link>, and{' '}
            <Link to="/services/enterprise-seo">Enterprise SEO</Link>.
          </p>
        </div>
      </section>

      <ServiceFaq service="Ecommerce SEO" faqs={FAQS} />

      <section className="eseo-cta">
        <div className="eseo-container">
          <div className="eseo-cta__box" data-aos="zoom-in">
            <FiDollarSign className="eseo-cta__ic" />
            <h2>Ready to Grow Your Online Store?</h2>
            <p>
              Your customers are already searching for products like yours. The right SEO strategy can help your store
              become more visible at different stages of the buying journey. Our ecommerce SEO services in Delhi are
              designed to improve product discovery, strengthen website visibility, and create a better organic foundation
              for your online store.
            </p>
            <div className="eseo-hero__cta" style={{ justifyContent: 'center' }}>
              <Link to="/contact" className="eseo-btn eseo-btn--light">Get Your Free Ecommerce SEO Consultation <FiArrowUpRight /></Link>
              <Link to="/contact" className="eseo-btn eseo-btn--ghost">Contact Our SEO Team</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
