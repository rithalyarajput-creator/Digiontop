import Seo from '../components/Seo';
import '../styles/Legal.css';

const UPDATED = 'July 2026';

export default function PrivacyPolicy() {
  return (
    <main className="legal-page">
      <Seo
        title="Privacy Policy"
        description="Read DigionTop's privacy policy to understand what information we collect, how we use it, and how we protect it."
        path="/privacy-policy"
      />
      <div className="legal-container">
        <div className="legal-header">
          <h1>Privacy Policy</h1>
          <p>Last updated: {UPDATED}</p>
        </div>

        <div className="legal-body">
          <h2>1. Who We Are</h2>
          <p>
            DigionTop ("we", "us", "our") is a digital marketing agency operating at
            digiontop.com. This policy explains what information we collect when you visit
            our website or contact us, how we use it, and the choices you have.
          </p>

          <h2>2. Information We Collect</h2>
          <p>When you use our website, we may collect:</p>
          <ul>
            <li><strong>Information you provide</strong> — your name, email, phone number, business name and message when you fill out our contact form, request a consultation, or use our free SEO Audit tool.</li>
            <li><strong>Automatic information</strong> — pages visited, time spent on pages, device type, browser, and approximate location (city/country), collected to understand how visitors use our site.</li>
            <li><strong>Newsletter signups</strong> — your email address, if you choose to subscribe.</li>
          </ul>
          <p>We do not collect payment information — we do not process payments on this website.</p>

          <h2>3. How We Use Your Information</h2>
          <ul>
            <li>To respond to your enquiries and provide the services you request.</li>
            <li>To send you updates or marketing communications, only if you've opted in (e.g. newsletter signup) — you can unsubscribe anytime.</li>
            <li>To understand website traffic and improve our content and services.</li>
            <li>To comply with legal obligations where required.</li>
          </ul>

          <h2>4. Cookies &amp; Tracking</h2>
          <p>
            Our website uses basic, privacy-respecting analytics to understand which pages
            are visited and how long visitors stay, so we can improve the site. We do not
            sell your data to third parties, and we do not use tracking for advertising
            purposes beyond what's described here.
          </p>

          <h2>5. Sharing Your Information</h2>
          <p>
            We do not sell, rent, or trade your personal information. We may share
            information with trusted service providers (such as our email or hosting
            providers) solely to operate our website and respond to your enquiries, and
            only to the extent necessary for that purpose.
          </p>

          <h2>6. Data Security</h2>
          <p>
            We take reasonable technical and organisational measures to protect your
            information from unauthorised access, alteration, or disclosure. No method of
            transmission over the internet is 100% secure, but we work to protect your data
            to industry standards.
          </p>

          <h2>7. Your Rights</h2>
          <p>
            You can ask us at any time to access, correct, or delete the personal
            information we hold about you, or to unsubscribe from communications. Contact
            us at <a href="mailto:digiontop.agency@gmail.com">digiontop.agency@gmail.com</a>{' '}
            to make a request.
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Any changes will be posted on this
            page with an updated "last updated" date.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, reach out at{' '}
            <a href="mailto:digiontop.agency@gmail.com">digiontop.agency@gmail.com</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
