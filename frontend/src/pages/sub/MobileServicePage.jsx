import { useParams, Navigate } from 'react-router-dom'
import {
  FiSmartphone, FiTablet, FiLayers, FiCloud, FiCode, FiBox, FiServer,
} from 'react-icons/fi'
import MarketplacePage from './MarketplacePage'
import Seo from '../../components/Seo'
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

/* Per-slug SEO copy. This component is a shared template rendered for
   /services/mobile/:slug, so title/description/canonical must come from the slug. */
const SEO_META = {
  'mobile-app': {
    title: 'Mobile App Development Company',
    description: 'Custom mobile apps for business, e-commerce and service booking — scalable, secure and cross-platform, built around your goals. Book a free app consultation.',
  },
  ios: {
    title: 'iOS App Development for iPhone & iPad',
    description: 'Custom iPhone and iPad apps built to Apple standards, with secure architecture, premium UI and full App Store deployment handled for you. Get a free consultation.',
  },
  android: {
    title: 'Android App Development Company',
    description: 'Feature-rich Android apps built for performance, security and reach — business apps, customer portals and API integrations, shipped to the Play Store. Talk to us.',
  },
  flutter: {
    title: 'Flutter App Development Services',
    description: 'One Flutter codebase running natively on Android and iOS — faster launches, lower cost and a consistent experience on every device. Get a free Flutter consultation.',
  },
  cloud: {
    title: 'Cloud Solutions & Migration Services',
    description: 'Cloud infrastructure setup, migration, hosting, server management and security that cut costs and scale with your business. Book a free cloud consultation today.',
  },
  api: {
    title: 'API Development & Integration Services',
    description: 'Secure custom REST APIs plus payment gateway, CRM and ERP integrations that connect your platforms and automate manual workflows. Get a free integration review.',
  },
  saas: {
    title: 'SaaS Application Development Company',
    description: 'Multi-tenant SaaS platforms, subscription billing, admin dashboards and customer portals built to scale into recurring revenue. Book a free SaaS product consultation.',
  },
  devops: {
    title: 'DevOps Services & CI/CD Automation',
    description: 'CI/CD pipelines, deployment automation, infrastructure management and monitoring that speed up releases and cut downtime. Get a free DevOps consultation today.',
  },
}

export default function MobileServicePage() {
  const { slug } = useParams()
  const data = MOBILE_SERVICES[slug]
  if (!data) return <Navigate to="/services/mobile-software" replace />
  const meta = SEO_META[slug]
  return (
    <>
      {meta && (
        <Seo
          title={meta.title}
          description={meta.description}
          path={`/services/mobile/${slug}`}
        />
      )}
      <MarketplacePage icon={ICONS[slug]} category="Mobile & Software" {...data} />
    </>
  )
}
