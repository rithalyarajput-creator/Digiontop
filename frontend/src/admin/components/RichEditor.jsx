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

  function onPaste(e) {
    // Prefer plain text so pasted content doesn't drag in messy inline styles
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text/plain');
    // convert double newlines to paragraphs, single to <br>
    const html = text
      .split(/\n\s*\n/)
      .map((p) => `<p>${p.replace(/\n/g, '<br>')}</p>`)
      .join('');
    document.execCommand('insertHTML', false, html);
    emit();
  }

  const TOOLS = [
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
