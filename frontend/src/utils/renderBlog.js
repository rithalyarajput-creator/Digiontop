/* Shared blog content renderer — supports HTML, Markdown, or plain text.
   Used by the public BlogPost page AND the admin editor preview so they match. */

function inline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, '$1<em>$2</em>')
    .replace(/`([^`]+?)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

export function renderBlogContent(raw) {
  if (!raw) return '';
  // Only treat as "already full HTML" when it uses BLOCK-level tags
  // (real HTML documents). Content that just sprinkles inline tags like
  // <strong>/<em>/<a> among Markdown must STILL be markdown-converted —
  // otherwise the # and ** would show raw. inline() leaves those tags alone.
  const hasBlockHtml = /<(p|h[1-6]|ul|ol|li|blockquote|div|table|pre)\b/i.test(raw);
  if (hasBlockHtml) return raw;

  const lines = raw.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const t = line.trim();

    if (/^```/.test(t)) {
      const code = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i].trim())) { code.push(lines[i]); i++; }
      i++;
      const esc = code.join('\n').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      out.push(`<pre class="blog-code"><code>${esc}</code></pre>`);
      continue;
    }
    if (/^#{1,6}\s+/.test(t)) {
      // page already has an <h1> (the post title), so start content at h2:
      // #→h2, ##→h2, ###→h3, ####→h4
      const level = t.match(/^#+/)[0].length;
      const h = Math.min(Math.max(level, 2), 4);
      out.push(`<h${h}>${inline(t.replace(/^#+\s+/, ''))}</h${h}>`);
      i++; continue;
    }
    if (/^>\s?/.test(t)) {
      const quote = [];
      while (i < lines.length && /^>\s?/.test(lines[i].trim())) { quote.push(lines[i].trim().replace(/^>\s?/, '')); i++; }
      out.push(`<blockquote>${inline(quote.join(' '))}</blockquote>`);
      continue;
    }
    if (/^([-*+]\s+|\d+\.\s+)/.test(t)) {
      const ordered = /^\d+\.\s+/.test(t);
      const items = [];
      while (i < lines.length && /^([-*+]\s+|\d+\.\s+)/.test(lines[i].trim())) {
        items.push(`<li>${inline(lines[i].trim().replace(/^([-*+]\s+|\d+\.\s+)/, ''))}</li>`);
        i++;
      }
      out.push(`<${ordered ? 'ol' : 'ul'}>${items.join('')}</${ordered ? 'ol' : 'ul'}>`);
      continue;
    }
    if (t === '') { i++; continue; }
    const para = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^(#{1,6}\s+|>\s?|```|[-*+]\s+|\d+\.\s+)/.test(lines[i].trim())
    ) { para.push(lines[i].trim()); i++; }
    const text = para.join(' ');
    const looksHeading =
      para.length === 1 && text.length < 70 && !/[.!?:]$/.test(text) &&
      /^[A-Z0-9]/.test(text) && text.split(' ').length <= 9 && !/[*`\[]/.test(text);
    if (looksHeading) out.push(`<h2>${inline(text)}</h2>`);
    else out.push(`<p>${inline(text)}</p>`);
  }
  return out.join('\n');
}
