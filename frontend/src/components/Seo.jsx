import { Helmet } from 'react-helmet-async';

const SITE = 'https://www.digiontop.com';
const DEFAULT_IMG = `${SITE}/images/home-banner.webp`;

/* Words that should keep their casing in breadcrumb labels */
const ACRONYMS = {
  seo: 'SEO', ppc: 'PPC', ui: 'UI', ux: 'UX', api: 'API', ios: 'iOS',
  saas: 'SaaS', devops: 'DevOps', faq: 'FAQ', cro: 'CRO', smm: 'SMM',
};

function crumbLabel(segment) {
  return segment
    .split('-')
    .map((w) => ACRONYMS[w] || w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/* BreadcrumbList structured data: Home → current page. Google shows these as
   breadcrumb trails in search results. */
function breadcrumbJson(path) {
  const segments = String(path).split('/').filter(Boolean);
  if (segments.length === 0) return null;
  const last = segments[segments.length - 1];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: crumbLabel(last), item: `${SITE}${path}` },
    ],
  };
}

/**
 * Per-page SEO. Renders <title>, meta description, canonical,
 * Open Graph + Twitter tags. Keeps titles under ~60 chars and
 * descriptions ~150-160 chars for best CTR in search results.
 */
export default function Seo({ title = 'DigionTop', description = '', path = '', image = DEFAULT_IMG, type = 'website', noIndex = false }) {
  const url = `${SITE}${path}`;
  const fullTitle = title.includes('DigionTop') ? title : `${title} | DigionTop`;
  const crumbs = noIndex ? null : breadcrumbJson(path);
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {crumbs && <script type="application/ld+json">{JSON.stringify(crumbs)}</script>}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="DigionTop" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
