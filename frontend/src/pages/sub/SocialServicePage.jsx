import { useParams, Navigate } from 'react-router-dom'
import {
  FiShare2, FiEdit3, FiMail, FiCalendar, FiUsers, FiSearch, FiType,
} from 'react-icons/fi'
import MarketplacePage from './MarketplacePage'
import { SOCIAL_SERVICES } from '../../data/socialServices'

const ICONS = {
  'social-media-marketing': <FiShare2 />,
  'content-marketing': <FiEdit3 />,
  'email-marketing': <FiMail />,
  'social-media-management': <FiCalendar />,
  'influencer-marketing': <FiUsers />,
  'seo-content-writing': <FiSearch />,
  copywriting: <FiType />,
}

export default function SocialServicePage() {
  const { slug } = useParams()
  const data = SOCIAL_SERVICES[slug]
  if (!data) return <Navigate to="/services/social-media-marketing" replace />
  return <MarketplacePage icon={ICONS[slug]} heroImg="/images/social-hero.png" {...data} />
}
