import { Link } from 'react-router-dom';
import { FiHome, FiMail } from 'react-icons/fi';
import Seo from '../components/Seo';
import '../styles/NotFound.css';

export default function NotFound() {
  return (
    <main className="nf-page">
      <Seo
        title="Page Not Found"
        description="The page you're looking for doesn't exist or may have moved."
        path="/404"
        noIndex
      />
      <section className="nf-hero">
        <span className="nf-code">404</span>
        <h1 className="nf-heading">This page took a wrong turn</h1>
        <p className="nf-sub">
          The page you're looking for doesn't exist, or it may have moved.
          Let's get you back on track.
        </p>
        <div className="nf-actions">
          <Link to="/" className="nf-btn nf-btn--primary"><FiHome /> Back to Home</Link>
          <Link to="/contact" className="nf-btn nf-btn--ghost"><FiMail /> Contact Us</Link>
        </div>
      </section>
    </main>
  );
}
