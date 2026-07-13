import { useParams, Navigate } from 'react-router-dom'
import {
  FiShoppingCart, FiShoppingBag, FiPackage, FiSearch, FiImage, FiGrid, FiUserCheck, FiTrendingUp,
} from 'react-icons/fi'
import MarketplacePage from './MarketplacePage'
import { ECOM_SERVICES } from '../../data/ecomServices'

const ICONS = {
  amazon: <FiShoppingCart />,
  flipkart: <FiShoppingBag />,
  meesho: <FiPackage />,
  'product-seo': <FiSearch />,
  'product-image': <FiImage />,
  'catalog-management': <FiGrid />,
  'account-management': <FiUserCheck />,
  'growth-consulting': <FiTrendingUp />,
}

// Per-slug SEO copy. This component is a shared template rendered for
// /services/ecom/:slug, so title/description/canonical must come from the slug.
const SEO_META = {
  amazon: {
    title: 'Amazon Product Listing Services',
    description: 'Optimised Amazon listings — keyword-rich titles, bullet points, descriptions, backend search terms and category setup that win the buy box. Get your products selling today.',
  },
  flipkart: {
    title: 'Flipkart Product Listing Services',
    description: 'Flipkart listing setup, title optimisation, category mapping and product SEO that improve discoverability and drive more orders. Book a free listing review with our team.',
  },
  meesho: {
    title: 'Meesho Product Listing & Catalog Services',
    description: 'Meesho product uploads, catalog setup and listing optimisation built for faster approvals and wider reach on India\'s fastest-growing marketplace. Start selling more today.',
  },
  'product-seo': {
    title: 'Marketplace Product SEO Services',
    description: 'Keyword research, title and description optimisation, backend keywords and competitor analysis that lift product rankings across Amazon, Flipkart and Meesho. Rank higher today.',
  },
  'product-image': {
    title: 'Product Image Editing & Infographics',
    description: 'Marketplace-compliant product photography edits, lifestyle shots and feature infographics that build buyer trust and turn product views into sales. See what we can create.',
  },
  'catalog-management': {
    title: 'E-Commerce Catalog Management Services',
    description: 'Bulk product uploads, catalog optimisation, inventory updates and ongoing data maintenance across every marketplace — fully managed for you. Keep your catalog effortless.',
  },
  'account-management': {
    title: 'Marketplace Account Management Services',
    description: 'End-to-end seller account management — setup, product uploads, listing maintenance and performance monitoring on Amazon, Flipkart and Meesho. Let us run your marketplace.',
  },
  'growth-consulting': {
    title: 'E-Commerce Growth Consulting Services',
    description: 'Data-driven marketplace growth strategy — competitor analysis, product performance reviews and sales scaling plans for online sellers. Build a smarter growth plan with us.',
  },
}

export default function EcomServicePage() {
  const { slug } = useParams()
  const data = ECOM_SERVICES[slug]
  if (!data) return <Navigate to="/services/ecommerce-solutions" replace />
  const meta = SEO_META[slug]
  return (
    <MarketplacePage
      icon={ICONS[slug]}
      heroImg="/images/ecom-hero.webp"
      category="E-Commerce Solutions"
      seoPath={`/services/ecom/${slug}`}
      seoTitle={meta?.title}
      seoDescription={meta?.description}
      {...data}
    />
  )
}
