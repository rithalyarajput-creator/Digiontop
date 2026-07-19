import Seo from '../components/Seo';
import '../styles/Legal.css';

const UPDATED = 'July 2026';

export default function TermsOfService() {
  return (
    <main className="legal-page">
      <Seo
        title="Terms of Service"
        description="Read the terms and conditions that govern your use of the DigionTop website and services."
        path="/terms-of-service"
      />
      <div className="legal-container">
        <div className="legal-header">
          <h1>Terms of Service</h1>
          <p>Last updated: {UPDATED}</p>
        </div>

        <div className="legal-body">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using digiontop.com ("the website"), you agree to be bound by
            these Terms of Service. If you do not agree, please do not use this website.
          </p>

          <h2>2. Our Services</h2>
          <p>
            DigionTop provides digital marketing services including but not limited to SEO,
            social media marketing, website development, e-commerce marketing and paid
            advertising. Specific service scope, deliverables, timelines and pricing for
            any engagement are agreed separately in writing (proposal, quote or contract)
            with each client — this website provides general information only and is not
            itself a service agreement.
          </p>

          <h2>3. Use of This Website</h2>
          <p>You agree to use this website only for lawful purposes. You must not:</p>
          <ul>
            <li>Attempt to gain unauthorised access to any part of the website or its systems.</li>
            <li>Use the website to transmit harmful code, spam, or malicious content.</li>
            <li>Copy, reproduce or republish content from this website without permission.</li>
          </ul>

          <h2>4. Content &amp; Intellectual Property</h2>
          <p>
            All content on this website — including text, graphics, logos, and blog
            articles — is the property of DigionTop unless otherwise stated, and is
            protected by applicable copyright and intellectual property laws. You may not
            use our content for commercial purposes without our written consent.
          </p>

          <h2>5. Blog &amp; Educational Content</h2>
          <p>
            Articles published on our blog are for general informational purposes only and
            do not constitute professional advice specific to your business. Results
            mentioned in case studies or articles are illustrative and not a guarantee of
            similar results for every business.
          </p>

          <h2>6. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites (including social media
            profiles). We are not responsible for the content, accuracy, or practices of
            any linked third-party website.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            DigionTop is not liable for any indirect, incidental, or consequential damages
            arising from your use of this website. The website and its content are provided
            "as is" without warranties of any kind.
          </p>

          <h2>8. Changes to These Terms</h2>
          <p>
            We may revise these Terms of Service at any time. Continued use of the website
            after changes are posted constitutes your acceptance of the updated terms.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These terms are governed by the laws of India. Any disputes arising from the use
            of this website will be subject to the jurisdiction of Indian courts.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            Questions about these Terms of Service can be sent to{' '}
            <a href="mailto:digiontop.agency@gmail.com">digiontop.agency@gmail.com</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
