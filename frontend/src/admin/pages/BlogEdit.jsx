import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiGet, apiPost, apiPut } from '../api';

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
  status: 'draft',
};

const CATEGORIES = ['General', 'SEO', 'Social Media', 'Website Development', 'E-Commerce', 'Digital Marketing', 'Case Study'];

export default function BlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [slugTouched, setSlugTouched] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [editorMode, setEditorMode] = useState('simple'); // 'simple' | 'html'
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (id) {
      apiGet(`/blog?id=${id}`)
        .then((post) => { setForm({ ...EMPTY, ...post }); setSlugTouched(true); })
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
    setSaving(true);
    try {
      if (id) {
        await apiPut('/blog', { id: Number(id), ...form });
      } else {
        await apiPost('/blog', form);
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
    if (wrap) {
      inserted = `<${tag}>${selected || 'Text here'}</${tag}>`;
    } else {
      inserted = `<${tag} />`;
    }
    const newContent = form.content.substring(0, start) + inserted + form.content.substring(end);
    update('content', newContent);
  }

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
              <input
                value={form.title}
                onChange={(e) => update('title', e.target.value)}
                placeholder="Enter blog post title..."
                required
              />
            </label>

            <div className="blogedit__row">
              <label className="admin-field">
                <span>Author Name</span>
                <input
                  value={form.author}
                  onChange={(e) => update('author', e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                />
              </label>
              <label className="admin-field">
                <span>Category</span>
                <select value={form.category} onChange={(e) => update('category', e.target.value)}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
            </div>

            <label className="admin-field">
              <span>Slug (URL)</span>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ color: '#888', fontSize: 13 }}>/blog/</span>
                <input
                  style={{ flex: 1 }}
                  value={form.slug}
                  onChange={(e) => { setSlugTouched(true); update('slug', e.target.value); }}
                  placeholder="auto-generated-from-title"
                />
              </div>
            </label>

            <label className="admin-field">
              <span>Excerpt (short description)</span>
              <textarea rows="2" value={form.excerpt} onChange={(e) => update('excerpt', e.target.value)} placeholder="Brief description shown in blog listing..." />
            </label>
          </div>

          {/* ── FEATURED IMAGE ── */}
          <div className="blogedit__section">
            <h2 className="blogedit__section-title">Featured Image</h2>
            <label className="admin-field">
              <span>Image URL</span>
              <input
                value={form.image_url}
                onChange={(e) => update('image_url', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
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
              <button type="button"
                className={`blogedit__tab${editorMode === 'simple' ? ' blogedit__tab--active' : ''}`}
                onClick={() => setEditorMode('simple')}>
                Simple Editor
              </button>
              <button type="button"
                className={`blogedit__tab${editorMode === 'html' ? ' blogedit__tab--active' : ''}`}
                onClick={() => setEditorMode('html')}>
                HTML Editor
              </button>
            </div>

            {editorMode === 'html' && (
              <div className="blogedit__toolbar">
                {[['h2','H2',true],['h3','H3',true],['p','P',true],['strong','Bold',true],['em','Italic',true],['ul','List',false],['li','List Item',true],['a','Link',true],['img','Image',false],['blockquote','Quote',true]].map(([tag, label, wrap]) => (
                  <button key={tag} type="button" className="blogedit__tool-btn" onClick={() => insertHtml(tag, wrap)}>
                    {label}
                  </button>
                ))}
              </div>
            )}

            <textarea
              id="blog-content"
              rows={editorMode === 'html' ? 20 : 14}
              value={form.content}
              onChange={(e) => update('content', e.target.value)}
              placeholder={editorMode === 'html'
                ? '<h2>Your heading</h2>\n<p>Your paragraph...</p>'
                : 'Write your blog post content here...\n\nYou can use simple paragraphs. Switch to HTML editor for more formatting options.'}
              className="blogedit__textarea"
              required
            />
            <p className="blogedit__hint">
              {editorMode === 'simple'
                ? 'Simple text editor — each paragraph will be wrapped automatically.'
                : 'HTML editor — use tags like <h2>, <p>, <strong>, <ul><li>, <a href="">, <img src="">.'}
            </p>
          </div>

          {/* ── SEO ── */}
          <div className="blogedit__section">
            <h2 className="blogedit__section-title">SEO Settings</h2>
            <label className="admin-field">
              <span>Meta Title</span>
              <input
                value={form.meta_title}
                onChange={(e) => update('meta_title', e.target.value)}
                placeholder="SEO title (recommended: 50-60 chars)"
                maxLength={70}
              />
              <small style={{color: form.meta_title.length > 60 ? '#e53935' : '#888'}}>{form.meta_title.length}/60 chars</small>
            </label>
            <label className="admin-field">
              <span>Meta Description</span>
              <textarea
                rows="2"
                value={form.meta_description}
                onChange={(e) => update('meta_description', e.target.value)}
                placeholder="SEO description (recommended: 150-160 chars)"
                maxLength={170}
              />
              <small style={{color: form.meta_description.length > 160 ? '#e53935' : '#888'}}>{form.meta_description.length}/160 chars</small>
            </label>
          </div>

          {/* ── PUBLISH ── */}
          <div className="blogedit__section blogedit__section--publish">
            <h2 className="blogedit__section-title">Publish Settings</h2>
            <label className="admin-field">
              <span>Status</span>
              <select value={form.status} onChange={(e) => update('status', e.target.value)}>
                <option value="draft">📝 Draft (not visible publicly)</option>
                <option value="published">✅ Published (live on website)</option>
              </select>
            </label>
            <div className="admin-form__actions">
              <button type="button" className="admin-btn" onClick={() => navigate('/admin/blog')}>Cancel</button>
              <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
                {saving ? 'Saving…' : id ? '💾 Update Post' : '🚀 Publish Post'}
              </button>
            </div>
          </div>
        </form>

        {/* Preview Panel */}
        {preview && (
          <div className="blogedit__preview">
            <h3 className="blogedit__preview-title">Preview</h3>
            <div className="blogedit__preview-card">
              <div className="blogedit__preview-img">
                {form.image_url ? <img src={form.image_url} alt="" /> : <span>📝</span>}
              </div>
              <div className="blogedit__preview-body">
                {form.category && <span className="blogedit__preview-cat">{form.category}</span>}
                <h4>{form.title || 'Post Title'}</h4>
                {form.author && <p style={{fontSize:12,color:'#888'}}>✍ {form.author}</p>}
                <span className="blogedit__preview-read">Read More →</span>
              </div>
            </div>
            {form.content && (
              <div className="blogedit__preview-content">
                <h4>Content Preview:</h4>
                <div dangerouslySetInnerHTML={{ __html: form.content.replace(/\n/g, '<br/>') }} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
