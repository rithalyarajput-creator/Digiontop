import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiLink, FiTrendingUp, FiEdit3, FiMail, FiAward, FiCheck,
  FiArrowRight, FiArrowUpRight, FiGlobe, FiFileText, FiUsers,
  FiTarget, FiBarChart2, FiSearch, FiActivity, FiEye,
  FiBriefcase, FiShoppingBag, FiTool, FiZap,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/LinkBuilding.css'

const FAQS = [
  { q: 'What is link building in SEO?', a: 'Link building is the process of earning or acquiring relevant links from external websites to your content or pages. A professional strategy focuses on useful resources, relevant websites, genuine outreach, and sustainable relationships rather than creating large numbers of low-quality links.' },
  { q: 'Are backlinks still important for SEO?', a: 'Backlinks remain one part of the broader SEO landscape, but quality and relevance matter. A backlink strategy should work alongside useful content, technical SEO, website experience, and other optimization activities rather than being treated as the only ranking strategy.' },
  { q: 'How long does link building take?', a: 'The timeline depends on your industry, content, outreach opportunities, website authority, and publisher response rates. Some opportunities can be acquired relatively quickly, while stronger editorial relationships and high-quality placements may take more time.' },
  { q: 'Do you guarantee a specific number of backlinks?', a: 'We focus on the quality and relevance of opportunities rather than promising an arbitrary number of backlinks. The number of suitable opportunities can vary by industry, website, content quality, and publisher requirements.' },
  { q: 'Can low-quality backlinks hurt a website?', a: 'Manipulative or spammy link-building practices can create SEO risks. Google identifies practices such as automated link creation, excessive link exchanges, and links created primarily to manipulate rankings as examples of link spam.' },
]

const SOLUTIONS = [
  { icon: <FiEdit3 />, t: 'Guest Posting', d: 'We identify relevant publishing opportunities where useful, original content can provide value to the audience while creating an appropriate link opportunity for your website.' },
  { icon: <FiMail />, t: 'Digital PR & Outreach', d: 'Our digital PR link building approach focuses on finding relevant media, publication, and industry opportunities where your expertise, data, or content can contribute to a story or resource.' },
  { icon: <FiTarget />, t: 'Niche-Relevant Links', d: 'We focus on finding websites that are relevant to your industry or topic rather than collecting links from unrelated domains. Relevance helps ensure the link acquisition strategy makes sense from both a user and business perspective.' },
  { icon: <FiBarChart2 />, t: 'Competitor Backlink Analysis', d: 'We analyze competitor backlink profiles to discover potential opportunities, content gaps, industry publications, and websites that may be relevant to your own outreach strategy.' },
  { icon: <FiLink />, t: 'Broken Link Opportunities', d: 'We identify relevant broken resources where your useful content may provide a suitable replacement. The goal is to create genuine value for website owners and their visitors.' },
  { icon: <FiFileText />, t: 'Linkable Content', d: 'Strong content can create natural opportunities for other websites to reference your resources. We identify content formats such as guides, research, statistics, resources, and informative pages that may attract relevant mentions.' },
]

const WHY_US = [
  { icon: <FiTarget />, t: 'Quality Over Quantity', d: 'Building hundreds of irrelevant links is not the objective. We focus on opportunities that are relevant to your business, audience, and content.' },
  { icon: <FiGlobe />, t: 'Relevant Websites', d: 'We prioritize link opportunities that have a genuine connection to your industry, topic, audience, or content.' },
  { icon: <FiMail />, t: 'Natural Outreach', d: 'Our outreach focuses on useful content and genuine relationships rather than mass emails or automated link placement.' },
  { icon: <FiBarChart2 />, t: 'Competitor Research', d: 'Understanding where competitors earn relevant mentions can help uncover opportunities that may otherwise be difficult to identify.' },
  { icon: <FiFileText />, t: 'Transparent Reporting', d: 'You should know where links are being acquired and why those opportunities were selected. We provide clear reporting around completed activities.' },
]

const PROCESS = [
  { n: '01', t: 'Website Analysis', d: 'We review your website, existing backlinks, content, industry, competitors, and current authority profile.', icon: <FiSearch /> },
  { n: '02', t: 'Competitor Research', d: 'We study relevant competitor backlink profiles to identify potential websites, publications, resources, and content opportunities.', icon: <FiBarChart2 /> },
  { n: '03', t: 'Opportunity Research', d: 'We evaluate websites and opportunities based on relevance, quality, audience, content fit, and overall suitability.', icon: <FiTarget /> },
  { n: '04', t: 'Outreach', d: 'We contact relevant website owners, publishers, editors, or content teams with personalized outreach where appropriate.', icon: <FiMail /> },
  { n: '05', t: 'Content & Placement', d: 'When an opportunity is suitable, we create or provide useful content that fits the publisher’s audience and editorial requirements.', icon: <FiFileText /> },
  { n: '06', t: 'Monitor & Report', d: 'We track acquired links and maintain a clear record of the work completed so the strategy can be reviewed over time.', icon: <FiActivity /> },
]

const ETHICS = [
  { icon: <FiTarget />, t: 'Relevance First', d: 'A link should make sense in the context where it appears. We prioritize topical relevance instead of pursuing links simply because a website has high metrics.' },
  { icon: <FiFileText />, t: 'Useful Content', d: 'Content should provide genuine value to readers. A useful resource has a stronger reason to be referenced than content created only to place a backlink.' },
  { icon: <FiUsers />, t: 'Manual Outreach', d: 'We focus on personalized outreach instead of automated mass link-building systems.' },
  { icon: <FiTrendingUp />, t: 'Sustainable Growth', d: 'A strong backlink profile should develop through relevant mentions and valuable resources rather than shortcuts that can create unnecessary risk.' },
]

const BENEFITS = [
  { icon: <FiEye />, t: 'Improve Brand Discovery', d: 'Relevant mentions can introduce your business to new audiences who may not have discovered your website otherwise.' },
  { icon: <FiAward />, t: 'Strengthen Online Authority', d: 'A healthy backlink profile can support your website’s overall organic search strategy.' },
  { icon: <FiFileText />, t: 'Support Content Visibility', d: 'Quality external references can help valuable content gain more exposure across relevant websites and audiences.' },
  { icon: <FiUsers />, t: 'Build Industry Connections', d: 'Outreach can create relationships with publishers, businesses, creators, and websites within your industry.' },
  { icon: <FiTrendingUp />, t: 'Support Long-Term SEO', d: 'Link acquisition works best as part of a broader SEO strategy that also includes technical optimization, useful content, and strong website experience.' },
]

const BUSINESSES = [
  { icon: <FiBriefcase />, t: 'Small Businesses', d: 'Build relevant industry connections and improve your online presence with a focused link acquisition strategy.' },
  { icon: <FiShoppingBag />, t: 'E-commerce Websites', d: 'Promote useful product guides, category resources, buying guides, and other content that can attract relevant references.' },
  { icon: <FiTool />, t: 'Service Businesses', d: 'Build visibility around valuable service information, guides, case studies, and industry resources.' },
  { icon: <FiZap />, t: 'Startups', d: 'Develop early industry relationships and create content assets that can earn relevant mentions.' },
  { icon: <FiAward />, t: 'Agencies', d: 'Strengthen agency authority through industry resources, expert contributions, partnerships, and relevant publications.' },
  { icon: <FiGlobe />, t: 'B2B Businesses', d: 'Promote research, insights, reports, guides, and specialist content to relevant industry audiences.' },
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Link Building',
  provider: { '@type': 'ProfessionalService', name: 'DigionTop', url: 'https://www.digiontop.com' },
  areaServed: 'Delhi, India',
  description: 'Link building services including guest posting, digital PR and outreach, niche-relevant links, competitor backlink analysis, broken link opportunities, and linkable content strategy.',
}

export default function LinkBuilding() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="lb">
      <Seo
        title="Link Building Services in Delhi - Quality SEO Links"
        description="Get quality-focused link building services in Delhi to build relevant backlinks, strengthen online authority, and support your long-term SEO strategy."
        path="/services/link-building"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      {/* HERO */}
      <section className="lb-hero">
        <div className="lb-container lb-hero__inner">
          <div className="lb-hero__text" data-aos="fade-right">
            <h1 className="lb-hero__title">Link Building Services in Delhi — Build a <span>Stronger Website Authority</span></h1>
            <p className="lb-hero__sub">
              A website needs more than optimized pages and useful content to build a strong organic presence. Relevant
              links from credible websites can help users discover your brand and can support your website's overall
              authority. Our link building services in Delhi focus on earning relevant, quality-focused links through
              strategies aligned with your industry, content, and business goals.
            </p>
            <p className="lb-hero__sub">
              We don't believe in creating large numbers of low-quality links simply to increase backlink counts. Instead,
              we focus on relevance, editorial value, useful content, and sustainable link acquisition. Google
              specifically warns against link spam practices such as buying links for ranking purposes, excessive link
              exchanges, automated link creation, and low-quality directory or bookmark links.
            </p>
            <div className="lb-hero__cta">
              <Link to="/contact" className="lb-btn lb-btn--solid">Get a Free Link Building Consultation <FiArrowRight /></Link>
              <Link to="/contact" className="lb-btn lb-btn--ghost">Talk to an SEO Expert</Link>
            </div>
            <div className="lb-hero__trust">
              <span><FiCheck /> Quality-Focused Strategy</span>
              <span><FiCheck /> Relevant Link Opportunities</span>
              <span><FiCheck /> Transparent Reporting</span>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLETE SOLUTIONS */}
      <section className="lb-tactics">
        <div className="lb-container">
          <div className="lb-head" data-aos="fade-up">
            <h2>Complete Link Building Solutions for Your Website</h2>
            <p className="lb-head__sub">Our backlink building services are designed to support your website's authority through relevant and valuable link opportunities. Every strategy is based on your industry, target audience, competitors, existing backlink profile, and content assets.</p>
          </div>
          <div className="lb-sol-grid">
            {SOLUTIONS.map((s, i) => (
              <div className="lb-sol" key={s.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="lb-sol__icon">{s.icon}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="lb-tactics lb-tactics--alt">
        <div className="lb-container">
          <div className="lb-head" data-aos="fade-up">
            <h2>Why Choose Our Link Building Strategy?</h2>
          </div>
          <div className="lb-sol-grid">
            {WHY_US.map((s, i) => (
              <div className="lb-sol" key={s.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="lb-sol__icon">{s.icon}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS (dark timeline) */}
      <section className="lb-process">
        <div className="lb-container">
          <div className="lb-head lb-head--light" data-aos="fade-up">
            <h2>Our Link Building Process</h2>
            <p className="lb-head__sub lb-head__sub--light">We follow a structured process to identify, evaluate, acquire, and monitor relevant link opportunities.</p>
          </div>
          <div className="lb-process__grid">
            {PROCESS.map((s, i) => (
              <div className="lb-process__step" key={s.t} data-aos="fade-up" data-aos-delay={i * 60}>
                <span className="lb-process__num">{s.n}</span>
                <span className="lb-process__icon">{s.icon}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ETHICAL APPROACH */}
      <section className="lb-tactics">
        <div className="lb-container">
          <div className="lb-head" data-aos="fade-up">
            <h2>Our Approach to Ethical Link Building</h2>
          </div>
          <div className="lb-sol-grid">
            {ETHICS.map((s, i) => (
              <div className="lb-sol" key={s.t} data-aos="fade-up" data-aos-delay={(i % 4) * 70}>
                <span className="lb-sol__icon">{s.icon}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
          <p className="lb-note">
            Google's spam policies specifically identify automated link creation, excessive link exchanges, low-quality
            directories, and paid links intended to manipulate rankings as examples of link spam.
          </p>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="lb-tactics lb-tactics--alt">
        <div className="lb-container">
          <div className="lb-head" data-aos="fade-up">
            <h2>Benefits of Professional Link Building</h2>
          </div>
          <div className="lb-mini-grid">
            {BENEFITS.map((b, i) => (
              <div className="lb-mini" key={b.t} data-aos="fade-up" data-aos-delay={(i % 3) * 60}>
                <span className="lb-mini__icon">{b.icon}</span>
                <div><h3>{b.t}</h3><p>{b.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENT BUSINESSES */}
      <section className="lb-tactics">
        <div className="lb-container">
          <div className="lb-head" data-aos="fade-up">
            <h2>Link Building for Different Businesses</h2>
          </div>
          <div className="lb-mini-grid">
            {BUSINESSES.map((b, i) => (
              <div className="lb-mini" key={b.t} data-aos="fade-up" data-aos-delay={(i % 3) * 60}>
                <span className="lb-mini__icon">{b.icon}</span>
                <div><h3>{b.t}</h3><p>{b.d}</p></div>
              </div>
            ))}
          </div>
          <p className="lb-note">
            Explore our related services:{' '}
            <Link to="/services/seo-services">SEO Services</Link>,{' '}
            <Link to="/services/seo-audit">Free SEO Audit</Link>,{' '}
            <Link to="/services/technical-seo">Technical SEO</Link>,{' '}
            <Link to="/services/local-seo">Local SEO</Link>,{' '}
            <Link to="/services/ecommerce-seo">Ecommerce SEO</Link>,{' '}
            <Link to="/services/social/content-marketing">Content Marketing</Link>,{' '}
            <Link to="/services/website-redesign">Website Redesign</Link>,{' '}
            <Link to="/services/google-ads">Google Ads</Link>, and{' '}
            <Link to="/services/enterprise-seo">Enterprise SEO</Link>.
          </p>
        </div>
      </section>

      <ServiceFaq service="Link Building" faqs={FAQS} />

      <section className="lb-cta">
        <div className="lb-container">
          <div className="lb-cta__box" data-aos="zoom-in">
            <FiLink className="lb-cta__ic" />
            <h2>Build a Stronger Link Profile</h2>
            <p>
              Your website deserves a link-building strategy based on relevance, quality, useful content, and genuine
              outreach rather than shortcuts. Our link building services in Delhi can help you identify relevant
              opportunities, promote valuable content, and build a more sustainable off-page SEO strategy that supports
              your wider organic growth goals.
            </p>
            <div className="lb-hero__cta" style={{ justifyContent: 'center' }}>
              <Link to="/contact" className="lb-btn lb-btn--light">Get Your Free Link Building Consultation <FiArrowUpRight /></Link>
              <Link to="/contact" className="lb-btn lb-btn--ghost" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>Contact Our SEO Team</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
