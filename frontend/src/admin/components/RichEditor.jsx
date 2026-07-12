import { useRef, useEffect } from 'react';

/**
 * Word-like WYSIWYG editor built on contentEditable + execCommand.
 * - What you see is what gets saved (HTML) and what shows on the blog.
 * - Toolbar: headings, bold, italic, lists, quote, link.
 * - Paste is cleaned to plain-ish HTML so pasted Word/Docs text stays tidy.
 */
export default function RichEditor({ value, onChange, placeholder = 'Write your blog post…' }) {
  const ref = useRef(null);

  // Load incoming value only when it differs from what's already shown
  // (prevents the caret from jumping while typing).
  useEffect(() => {
    const el = ref.current;
    if (el && value !== el.innerHTML) {
      el.innerHTML = value || '';
    }
  }, [value]);

  function emit() {
    if (ref.current) onChange(ref.current.innerHTML);
  }

  function cmd(command, arg) {
    ref.current?.focus();
    document.execCommand(command, false, arg);
    emit();
  }

  function block(tag) {
    ref.current?.focus();
    // formatBlock needs the tag wrapped in <> in most browsers
    document.execCommand('formatBlock', false, `<${tag}>`);
    emit();
  }

  function addLink() {
    const url = window.prompt('Link URL:', 'https://');
    if (url) cmd('createLink', url);
  }

  // Tags we keep from pasted content (Word/Google Docs/websites). Everything
  // else (span, div wrappers, style/class attrs, MS Office junk) is stripped,
  // but the structure — bold, italic, links, headings, lists, quotes — stays.
  const KEEP_TAGS = new Set(['P','BR','B','STRONG','I','EM','U','A','UL','OL','LI','H1','H2','H3','H4','BLOCKQUOTE']);

  function cleanNode(node) {
    // Text node: keep as-is
    if (node.nodeType === Node.TEXT_NODE) return document.createTextNode(node.textContent);

    if (node.nodeType !== Node.ELEMENT_NODE) return null;

    const tag = node.tagName;
    const children = Array.from(node.childNodes).map(cleanNode).filter(Boolean);

    if (KEEP_TAGS.has(tag)) {
      const el = document.createElement(tag === 'STRONG' ? 'b' : tag === 'EM' ? 'i' : tag.toLowerCase());
      if (tag === 'A') {
        const href = node.getAttribute('href');
        if (href) el.setAttribute('href', href);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
      }
      children.forEach((c) => el.appendChild(c));
      return el;
    }

    // Bold/italic signalled only via inline style (common from Word/Docs) —
    // preserve the emphasis even though we drop the wrapping span/div.
    const style = node.getAttribute && node.getAttribute('style');
    const isBold = style && /font-weight:\s*(bold|[6-9]00)/i.test(style);
    const isItalic = style && /font-style:\s*italic/i.test(style);
    let wrapped = children;
    if (isBold) { const b = document.createElement('b'); wrapped.forEach((c) => b.appendChild(c)); wrapped = [b]; }
    if (isItalic) { const i = document.createElement('i'); wrapped.forEach((c) => i.appendChild(c)); wrapped = [i]; }

    // Block-level wrapper (div, span, headings we don't keep, table cells, etc.)
    // — unwrap it but keep its children/text so nothing is lost.
    const frag = document.createDocumentFragment();
    wrapped.forEach((c) => frag.appendChild(c));
    return frag;
  }

  function onPaste(e) {
    e.preventDefault();
    const cd = e.clipboardData || window.clipboardData;
    const rawHtml = cd.getData('text/html');

    let html;
    if (rawHtml) {
      // Parse the pasted HTML (from Word, Google Docs, a webpage…) and rebuild
      // it using only the safe tags above — this is what keeps bold/links/
      // headings intact while dropping MS Office's messy markup.
      const doc = new DOMParser().parseFromString(rawHtml, 'text/html');
      const container = document.createElement('div');
      Array.from(doc.body.childNodes).forEach((n) => {
        const cleaned = cleanNode(n);
        if (cleaned) container.appendChild(cleaned);
      });
      html = container.innerHTML;
      // Collapse stray empty paragraphs Word tends to leave behind
      html = html.replace(/<p>(&nbsp;|\s)*<\/p>/gi, '');
    } else {
      const text = cd.getData('text/plain');
      html = text
        .split(/\n\s*\n/)
        .map((p) => `<p>${p.replace(/\n/g, '<br>')}</p>`)
        .join('');
    }

    document.execCommand('insertHTML', false, html);
    emit();
  }

  const TOOLS = [
    { label: 'H1', title: 'Main heading', fn: () => block('h1') },
    { label: 'H2', title: 'Heading', fn: () => block('h2') },
    { label: 'H3', title: 'Sub-heading', fn: () => block('h3') },
    { label: 'P', title: 'Normal text', fn: () => block('p') },
    { label: 'B', title: 'Bold', fn: () => cmd('bold'), bold: true },
    { label: 'I', title: 'Italic', fn: () => cmd('italic'), italic: true },
    { label: 'U', title: 'Underline', fn: () => cmd('underline') },
    { label: '• List', title: 'Bullet list', fn: () => cmd('insertUnorderedList') },
    { label: '1. List', title: 'Numbered list', fn: () => cmd('insertOrderedList') },
    { label: 'Quote', title: 'Quote', fn: () => block('blockquote') },
    { label: 'Link', title: 'Insert link', fn: addLink },
    { label: 'Clear', title: 'Clear formatting', fn: () => cmd('removeFormat') },
  ];

  return (
    <div className="richedit">
      <div className="richedit__toolbar">
        {TOOLS.map((t) => (
          <button
            key={t.label}
            type="button"
            className="richedit__btn"
            title={t.title}
            onMouseDown={(e) => { e.preventDefault(); t.fn(); }}
          >
            {t.bold ? <b>B</b> : t.italic ? <i>I</i> : t.label}
          </button>
        ))}
      </div>
      <div
        ref={ref}
        className="richedit__area blogpost-content"
        contentEditable
        suppressContentEditableWarning
        onInput={emit}
        onBlur={emit}
        onPaste={onPaste}
        data-placeholder={placeholder}
      />
    </div>
  );
}
