import { useParams, Navigate } from 'react-router-dom'
import {
  FiSmartphone, FiTablet, FiLayers, FiCloud, FiCode, FiBox, FiServer,
} from 'react-icons/fi'
import MarketplacePage from './MarketplacePage'
import { MOBILE_SERVICES } from '../../data/mobileServices'

const ICONS = {
  'mobile-app': <FiSmartphone />,
  ios: <FiTablet />,
  android: <FiSmartphone />,
  flutter: <FiLayers />,
  cloud: <FiCloud />,
  api: <FiCode />,
  saas: <FiBox />,
  devops: <FiServer />,
}

export default function MobileServicePage() {
  const { slug } = useParams()
  const data = MOBILE_SERVICES[slug]
  if (!data) return <Navigate to="/services/mobile-software" replace />
  return <MarketplacePage icon={ICONS[slug]} {...data} />
}
