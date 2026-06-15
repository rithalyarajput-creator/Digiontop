import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiGet, apiPost, apiPut } from '../api';

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const EMPTY = {
  title: '', slug: '', category: 'General', excerpt: '',
  content: '', image_url: '', status: 'draft',
};

export default function BlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [slugTouched, setSlugTouched] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const post = await apiGet(`/blog?id=${id}`);
          setForm({ ...EMPTY, ...post });
          setSlugTouched(true);
        } catch (err) {
          setError(err.message);
        }
      })();
    }
  }, [id]);

  function update(field, value) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'title' && !slugTouched) next.slug = slugify(value);
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

  return (
    <div>
      <h1 className="admin-page-title">{id ? 'Edit Post' : 'New Post'}</h1>
      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      <form className="admin-form" onSubmit={handleSubmit}>
        <label className="admin-field">
          <span>Title</span>
          <input value={form.title} onChange={(e) => update('title', e.target.value)} required />
        </label>

        <label className="admin-field">
          <span>Slug</span>
          <input
            value={form.slug}
            onChange={(e) => { setSlugTouched(true); update('slug', e.target.value); }}
            placeholder="auto-generated-from-title"
          />
        </label>

        <label className="admin-field">
          <span>Category</span>
          <input value={form.category} onChange={(e) => update('category', e.target.value)} />
        </label>

        <label className="admin-field">
          <span>Excerpt</span>
          <textarea rows="2" value={form.excerpt} onChange={(e) => update('excerpt', e.target.value)} />
        </label>

        <label className="admin-field">
          <span>Content</span>
          <textarea rows="12" value={form.content} onChange={(e) => update('content', e.target.value)} required />
        </label>

        <label className="admin-field">
          <span>Image URL</span>
          <input value={form.image_url} onChange={(e) => update('image_url', e.target.value)} placeholder="https://…" />
        </label>

        <label className="admin-field">
          <span>Status</span>
          <select value={form.status} onChange={(e) => update('status', e.target.value)}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>

        <div className="admin-form__actions">
          <button type="button" className="admin-btn" onClick={() => navigate('/admin/blog')}>Cancel</button>
          <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
            {saving ? 'Saving…' : 'Save Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
