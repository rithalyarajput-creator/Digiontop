import { Link } from 'react-router-dom'
import {
  FiMonitor, FiSmartphone, FiSearch, FiShare2, FiShoppingBag, FiPenTool, FiTrendingUp, FiArrowUpRight,
} from 'react-icons/fi'
import { SERVICES_MENU } from '../data/servicesMenu'
import './RelatedServices.css'

const CAT_ICONS = {
  web: FiMonitor, app: FiSmartphone, seo: FiSearch, social: FiShare2,
  ecommerce: FiShoppingBag, branding: FiPenTool, ads: FiTrendingUp,
}

/* Shows the other services inside the same category.
   `categoryHeading` must match a heading in SERVICES_MENU.
   `activePath` (optional) highlights/excludes the current page. */
export default function RelatedServices({ categoryHeading, activePath }) {
  // Removed from all service pages per request — render nothing.
  return null

  // eslint-disable-next-line no-unreachable
  const cat = SERVICES_MENU.find((c) => c.heading === categoryHeading)
  if (!cat) return null
  const Icon = CAT_ICONS[cat.icon] || FiMonitor
  const items = cat.items.filter((it) => it.path !== activePath)

  return (
    <section className="rels">
      <div className="rels__inner" data-aos="fade-up">
        <span className="rels__pill"><Icon /> Other {cat.heading} Services</span>
        <p className="rels__intro">
          Explore the full range of {cat.heading.toLowerCase()} services we offer, most clients
          grow into more as their business scales.
        </p>
        <div className="rels__grid">
          {items.map((it) => (
            <Link to={it.path} className="rels__card" key={it.label}>
              <span className="rels__card-name">{it.label}</span>
              <span className="rels__card-arrow"><FiArrowUpRight /></span>
            </Link>
          ))}
        </div>
        <Link to={cat.link} className="rels__viewall">View All {cat.heading} <FiArrowUpRight /></Link>
      </div>
    </section>
  )
}
