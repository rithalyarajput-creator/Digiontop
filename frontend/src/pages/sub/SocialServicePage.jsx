import { useParams, Navigate } from 'react-router-dom'
import {
  FiShare2, FiEdit3, FiMail, FiCalendar, FiUsers, FiSearch, FiType,
} from 'react-icons/fi'
import MarketplacePage from './MarketplacePage'
import Seo from '../../components/Seo'
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

/* Unique per-slug SEO, keyed by the same slugs as SOCIAL_SERVICES. */
const SEO = {
  'social-media-marketing': {
    title: 'Social Media Marketing Services for Brands',
    description: 'Strategy, content planning, brand-awareness campaigns and audience targeting that build real relationships and grow your business. Talk to our social team.',
  },
  'content-marketing': {
    title: 'Content Marketing Services & Strategy',
    description: 'Blog, website and brand-story content built on a strategy that grows organic traffic, builds authority and generates leads. Ask us for a content plan today.',
  },
  'email-marketing': {
    title: 'Email Marketing Services & Campaigns',
    description: 'Newsletters, promotional emails and automated sequences that nurture leads, lift retention and drive repeat sales. Get an email campaign plan for your list.',
  },
  'social-media-management': {
    title: 'Social Media Management for Growing Brands',
    description: 'Content scheduling, publishing, profile optimisation, community engagement and monthly reports, handled for you. Let us run your socials while you work.',
  },
  'influencer-marketing': {
    title: 'Influencer Marketing Agency for Brands',
    description: 'Creator research, outreach, UGC and campaign management that put your brand in front of engaged, trusting audiences. Start an influencer campaign with us.',
  },
  'seo-content-writing': {
    title: 'SEO Content Writing & Optimisation',
    description: 'Keyword-researched blogs, landing pages and product descriptions optimised to rank on Google and win qualified traffic. Get SEO content that earns rankings.',
  },
  copywriting: {
    title: 'Copywriting Services That Drive Action',
    description: 'Website, sales page, landing page, ad and email copy written to hold attention, prove value and convert readers into buyers. Get copy that sells for you.',
  },
}

export default function SocialServicePage() {
  const { slug } = useParams()
  const data = SOCIAL_SERVICES[slug]
  if (!data) return <Navigate to="/services/social-media-marketing" replace />
  const seo = SEO[slug]
  return (
    <>
      {seo && (
        <Seo
          title={seo.title}
          description={seo.description}
          path={`/services/social/${slug}`}
        />
      )}
      <MarketplacePage icon={ICONS[slug]} heroImg="/images/social-hero.webp" category="Social Media & Content" {...data} />
    </>
  )
}
