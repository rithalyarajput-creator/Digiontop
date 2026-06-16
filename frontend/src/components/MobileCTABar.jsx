import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone } from 'react-icons/fi';
import { FaChartLine } from 'react-icons/fa';
import './MobileCTABar.css';

export default function MobileCTABar() {
  return (
    <div className="mcta">
      <a href="tel:+919217594664" className="mcta__btn mcta__btn--call">
        <FiPhone className="mcta__icon" />
        Call Now
      </a>
      <Link to="/contact" className="mcta__btn mcta__btn--audit">
        <FaChartLine className="mcta__icon" />
        Free Audit
      </Link>
    </div>
  );
}
