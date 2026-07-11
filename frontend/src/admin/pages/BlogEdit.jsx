import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiGet, apiPost, apiPut } from '../api';
import { renderBlogContent } from '../../utils/renderBlog';
import RichEditor from '../components/RichEditor';

/* Resize + compress an image file in the browser, return { mime, base64 } */
function compressImage(file, maxWidth = 1600, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxWidth / img.width);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve({ mime: 'image/jpeg', base64: dataUrl.split(',')[1] });
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read image')); };
    img.src = url;
  });
}

function slugify(text) {
  return text.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const EMPTY = {
  title: '',
  slug: '',
  author: '',
  category: 'General',
  excerpt: '',
  content: '',
  image_url: '',
  meta_title: '',
  meta_description: '',
  tags: '',
  scheduled_at: '',
  status: 'draft',
};

const FALLBACK_CATS = ['General', 'SEO', 'Social Media', 'Website Development', 'E-Commerce', 'Digital Marketing', 'Case Study'];

export default function BlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [slugTouched, setSlugTouched] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [editorMode, setEditorMode] = useState('visual'); // 'visual' | 'simple' | 'html'
  const [preview, setPreview] = useState(false);
  const [cats, setCats] = useState(FALLBACK_CATS);
  const [authors, setAuthors] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  async function handleImageUpload(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Please choose an image file.'); return; }
    setError('');
    setUploading(true);
    try {
      const { mime, base64 } = await compressImage(file);
      const resp = await apiPost('/media', { filename: file.name, mime, data: base64 });
      if (resp && resp.url) {
        setForm((p) => ({ ...p, image_url: resp.url }));
      } else {
        setError('Upload failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  useEffect(() => {
    apiGet('/cms?resource=categories').then((c) => { if (c.length) setCats(c.map((x) => x.name)); }).catch(() => {});
    apiGet('/cms?resource=authors').then((a) => setAuthors(a)).catch(() => {});
  }, []);

  useEffect(() => {
    if (id) {
      apiGet(`/blog?id=${id}`)
        .then((post) => {
          setForm({
            ...EMPTY,
            ...post,
            scheduled_at: post.scheduled_at ? toLocalInput(post.scheduled_at) : '',
          });
          setSlugTouched(true);
        })
        .catch((err) => setError(err.message));
    }
  }, [id]);

  function update(field, value) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'title' && !slugTouched) {
        next.slug = slugify(value);
        if (!next.meta_title) next.meta_title = value;
      }
      return next;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (form.status === 'scheduled' && !form.scheduled_at) {
      setError('Please choose a publish date & time for a scheduled post.');
      return;
    }

    setSaving(true);
    const payload = {
      ...form,
      scheduled_at: form.status === 'scheduled' && form.scheduled_at
        ? new Date(form.scheduled_at).toISOString()
        : null,
    };
    try {
      if (id) {
        await apiPut('/blog', { id: Number(id), ...payload });
      } else {
        await apiPost('/blog', payload);
      }
      navigate('/admin/blog');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function insertHtml(tag, wrap = false) {
    const ta = document.getElementById('blog-content');
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = form.content.substring(start, end);
    let inserted;
    if (tag === 'a') {
      inserted = `<a href="https://" target="_blank">${selected || 'link text'}</a>`;
    } else if (tag === 'img') {
      inserted = `<img src="https://" alt="description" />`;
    } else if (wrap) {
      inserted = `<${tag}>${selected || 'Text here'}</${tag}>`;
    } else {
      inserted = `<${tag}></${tag}>`;
    }
    const newContent = form.content.substring(0, start) + inserted + form.content.substring(end);
    update('content', newContent);
    // refocus so the user can keep typing right after formatting
    setTimeout(() => {
      ta.focus();
      const pos = start + inserted.length;
      ta.setSelectionRange(pos, pos);
    }, 0);
  }

  const seoTitle = form.meta_title || form.title || 'Your blog post title';
  const seoDesc = form.meta_description || form.excerpt || 'Your meta description preview will appear here…';
  const seoUrl = `digiontop.com/blog/${form.slug || 'post-url'}`;

  return (
    <div className="blogedit">
      <div className="admin-page-head">
        <h1 className="admin-page-title">{id ? 'Edit Post' : 'New Blog Post'}</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" className="admin-btn" onClick={() => navigate('/admin/blog')}>← Back</button>
          <button type="button" className={`admin-btn${preview ? ' admin-btn--primary' : ''}`} onClick={() => setPreview(v => !v)}>
            {preview ? 'Hide Preview' : 'Preview'}
          </button>
        </div>
      </div>

      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      <div className="blogedit__layout">
        <form className="blogedit__form admin-form" onSubmit={handleSubmit}>

          {/* ── BASIC INFO ── */}
          <div className="blogedit__section">
            <h2 className="blogedit__section-title">Basic Info</h2>

            <label className="admin-field">
              <span>Post Title <span style={{color:'#e53935'}}>*</span></span>
              <input value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="Enter blog post title..." required />
            </label>

            <div className="blogedit__row">
              <label className="admin-field">
                <span>Author</span>
                <select value={form.author} onChange={(e) => update('author', e.target.value)}>
                  <option value="">Select author…</option>
                  {authors.map((a) => <option key={a.id} value={a.name}>{a.name}</option>)}
                  {/* allow keeping an existing custom author value */}
                  {form.author && !authors.some((a) => a.name === form.author) && (
                    <option value={form.author}>{form.author}</option>
                  )}
                </select>
              </label>
              <label className="admin-field">
                <span>Category</span>
                <select value={form.category} onChange={(e) => update('category', e.target.value)}>
                  {cats.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
            </div>

            <label className="admin-field">
              <span>Slug (URL)</span>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ color: '#888', fontSize: 13 }}>/blog/</span>
                <input style={{ flex: 1 }} value={form.slug}
                  onChange={(e) => { setSlugTouched(true); update('slug', e.target.value); }}
                  placeholder="auto-generated-from-title" />
              </div>
            </label>

            <label className="admin-field">
              <span>Excerpt (short description)</span>
              <textarea rows="2" value={form.excerpt} onChange={(e) => update('excerpt', e.target.value)} placeholder="Brief description shown in blog listing..." />
            </label>

            <label className="admin-field">
              <span>Tags (comma separated)</span>
              <input value={form.tags} onChange={(e) => update('tags', e.target.value)} placeholder="seo, marketing, tips" />
            </label>
          </div>

          {/* ── FEATURED IMAGE ── */}
          <div className="blogedit__section">
            <h2 className="blogedit__section-title">Featured Image</h2>
            <div className="blogedit__img-guide">
              Recommended: <strong>1200 × 630 px</strong> · Aspect ratio <strong>16:9</strong> · JPG/PNG/WebP
            </div>
            <div className="blogedit__upload-row">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                className="admin-btn admin-btn--primary"
                onClick={() => fileRef.current && fileRef.current.click()}
                disabled={uploading}
              >
                {uploading ? 'Uploading…' : 'Upload from Computer'}
              </button>
              {form.image_url && !uploading && (
                <button type="button" className="admin-btn" onClick={() => update('image_url', '')}>
                  Remove Image
                </button>
              )}
            </div>
            <label className="admin-field">
              <span>Or paste an Image URL</span>
              <input value={form.image_url} onChange={(e) => update('image_url', e.target.value)} placeholder="https://example.com/image.jpg" />
            </label>
            {form.image_url && (
              <div className="blogedit__img-preview">
                <img src={form.image_url} alt="preview" />
              </div>
            )}
          </div>

          {/* ── CONTENT ── */}
          <div className="blogedit__section">
            <h2 className="blogedit__section-title">Content</h2>
            <div className="blogedit__editor-tabs">
              <button type="button" className={`blogedit__tab${editorMode === 'visual' ? ' blogedit__tab--active' : ''}`} onClick={() => setEditorMode('visual')}>Visual Editor</button>
              <button type="button" className={`blogedit__tab${editorMode === 'simple' ? ' blogedit__tab--active' : ''}`} onClick={() => setEditorMode('simple')}>Text / Markdown</button>
              <button type="button" className={`blogedit__tab${editorMode === 'html' ? ' blogedit__tab--active' : ''}`} onClick={() => setEditorMode('html')}>HTML</button>
            </div>

            {editorMode === 'visual' ? (
              <>
                <RichEditor
                  value={/<(p|h[1-6]|ul|ol|li|blockquote|div|table|pre)\b/i.test(form.content || '') ? form.content : renderBlogContent(form.content)}
                  onChange={(html) => update('content', html)}
                  placeholder="Write your blog post here — select text and click B, H2, List… just like Word."
                />
                <p className="blogedit__hint">
                  Type or paste your text, select it, then click <b>B</b>, <b>H2</b>, <b>• List</b> etc.
                  What you see here is exactly what appears on the blog.
                </p>
              </>
            ) : (
              <>
                {/* symbol-insert toolbar for the raw text / html modes */}
                <div className="blogedit__toolbar">
                  {[['h2','H2',true],['h3','H3',true],['strong','Bold',true],['em','Italic',true],['ul','List',true],['li','List Item',true],['a','Link',true],['img','Image',false],['blockquote','Quote',true]].map(([tag, label, wrap]) => (
                    <button key={tag} type="button" className="blogedit__tool-btn" onClick={() => insertHtml(tag, wrap)} title={`Insert ${label}`}>
                      {label === 'Bold' ? <b>B</b> : label === 'Italic' ? <i>I</i> : label}
                    </button>
                  ))}
                </div>
                <textarea
                  id="blog-content"
                  rows={editorMode === 'html' ? 20 : 14}
                  value={form.content}
                  onChange={(e) => update('content', e.target.value)}
                  placeholder={editorMode === 'html' ? '<h2>Your heading</h2>\n<p>Your paragraph...</p>' : 'Write your blog post content here...'}
                  className="blogedit__textarea"
                />
                <p className="blogedit__hint">
                  Tip: select the text you want to style, then click <b>B</b> (bold), <b>H2</b> (heading), <b>List</b>, etc. to format it.
                </p>
              </>
            )}
          </div>

          {/* ── SEO ── */}
          <div className="blogedit__section">
            <h2 className="blogedit__section-title">SEO Settings</h2>
            <label className="admin-field">
              <span>Meta Title</span>
              <input value={form.meta_title || ''} onChange={(e) => update('meta_title', e.target.value)} placeholder="SEO title (recommended: 50-60 chars)" maxLength={70} />
              <small style={{color: (form.meta_title || '').length > 60 ? '#e53935' : '#888'}}>{(form.meta_title || '').length}/60 chars</small>
            </label>
            <label className="admin-field">
              <span>Meta Description</span>
              <textarea rows="2" value={form.meta_description || ''} onChange={(e) => update('meta_description', e.target.value)} placeholder="SEO description (recommended: 150-160 chars)" maxLength={170} />
              <small style={{color: (form.meta_description || '').length > 160 ? '#e53935' : '#888'}}>{(form.meta_description || '').length}/160 chars</small>
            </label>

            {/* Google SEO preview */}
            <div className="blogedit__seo-preview">
              <p className="blogedit__seo-url">{seoUrl}</p>
              <p className="blogedit__seo-title">{seoTitle}</p>
              <p className="blogedit__seo-desc">{seoDesc}</p>
            </div>
          </div>

          {/* ── PUBLISH ── */}
          <div className="blogedit__section blogedit__section--publish">
            <h2 className="blogedit__section-title">Publish Settings</h2>
            <label className="admin-field">
              <span>Status</span>
              <select value={form.status} onChange={(e) => update('status', e.target.value)}>
                <option value="draft">Draft (not visible publicly)</option>
                <option value="published">Published (live on website)</option>
                <option value="scheduled">Scheduled (publish later)</option>
              </select>
            </label>

            {form.status === 'scheduled' && (
              <label className="admin-field">
                <span>Publish Date &amp; Time</span>
                <input
                  type="datetime-local"
                  value={form.scheduled_at}
                  onChange={(e) => update('scheduled_at', e.target.value)}
                />
                <small style={{ color: '#888' }}>Post will go live at this date &amp; time.</small>
              </label>
            )}

            <div className="admin-form__actions">
              <button type="button" className="admin-btn" onClick={() => navigate('/admin/blog')}>Cancel</button>
              <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
                {saving ? 'Saving…' : id ? 'Update Post' : 'Save Post'}
              </button>
            </div>
          </div>
        </form>

        {/* Preview Panel */}
        {preview && (
          <div className="blogedit__preview">
            <h3 className="blogedit__preview-title">Preview</h3>
            <div className="blogedit__preview-card">
              <div className="blogedit__preview-img-outer">
                <div className="blogedit__preview-img">
                  {form.image_url ? <img src={form.image_url} alt="" /> : <span>IMG</span>}
                </div>
              </div>
              <div className="blogedit__preview-body">
                {form.category && <span className="blogedit__preview-cat">{form.category}</span>}
                <h4>{form.title || 'Post Title'}</h4>
                {form.author && <p style={{fontSize:12,color:'#888'}}>By {form.author}</p>}
                <span className="blogedit__preview-read">Read More →</span>
              </div>
            </div>
            {form.content && (
              <div className="blogedit__preview-content blogpost-content">
                <h4>Content Preview:</h4>
                <div dangerouslySetInnerHTML={{ __html: renderBlogContent(form.content) }} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* Convert an ISO timestamp to the value a datetime-local input expects */
function toLocalInput(iso) {
  try {
    const d = new Date(iso);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch {
    return '';
  }
}
