import { Helmet } from 'react-helmet-async';

/**
 * Emits a JSON-LD structured-data block into <head> via react-helmet-async.
 * Renders nothing when `data` is falsy, so callers can guard on missing content
 * (loading states, empty lists) without duplicating the null check.
 */
export default function JsonLd({ data }) {
  if (!data) return null;
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

/** Strip HTML tags / entities from a source string so it is safe as a schema text value. */
export function toPlainText(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}
