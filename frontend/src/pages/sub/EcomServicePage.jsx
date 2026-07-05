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

export default function EcomServicePage() {
  const { slug } = useParams()
  const data = ECOM_SERVICES[slug]
  if (!data) return <Navigate to="/services/ecommerce-solutions" replace />
  return <MarketplacePage icon={ICONS[slug]} heroImg="/images/ecom-hero.webp" category="E-Commerce Solutions" {...data} />
}
