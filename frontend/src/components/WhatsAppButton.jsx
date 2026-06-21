import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppButton.css';

const PHONE = '919217594664'; // +91 9217594664
const MESSAGE = encodeURIComponent("Hi DigionTop! I'm interested in your digital marketing services. Please share details.");

export default function WhatsAppButton() {
  return (
    <a
      className="wa-fab"
      href={`https://wa.me/${PHONE}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <FaWhatsapp />
      <span className="wa-fab__pulse" />
    </a>
  );
}
