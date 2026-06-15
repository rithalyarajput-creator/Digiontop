import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { apiGet, apiPut, apiDelete } from '../api';

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      setPosts(await apiGet('/blog'));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function toggleStatus(post) {
    const status = post.status === 'published' ? 'draft' : 'published';
    try {
      await apiPut('/blog', { id: post.id, status });
      setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, status } : p)));
    } catch (err) {
      alert(err.message);
    }
  }

  async function remove(id) {
    if (!confirm('Delete this post?')) return;
    try {
      await apiDelete(`/blog?id=${id}`);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <div className="admin-page-head">
        <h1 className="admin-page-title">Blog Posts</h1>
        <Link to="/admin/blog/new" className="admin-btn admin-btn--primary"><FiPlus /> New Post</Link>
      </div>

      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>Title</th><th>Category</th><th>Status</th><th>Date</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan="5" className="admin-table__empty">Loading…</td></tr>}
            {!loading && posts.length === 0 && (
              <tr><td colSpan="5" className="admin-table__empty">No posts yet.</td></tr>
            )}
            {posts.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.category}</td>
                <td>
                  <button
                    className={`admin-badge admin-badge--${p.status === 'published' ? 'converted' : 'new'}`}
                    onClick={() => toggleStatus(p)}
                    title="Click to toggle"
                  >
                    {p.status}
                  </button>
                </td>
                <td>{new Date(p.created_at).toLocaleDateString()}</td>
                <td className="admin-actions">
                  <Link to={`/admin/blog/edit/${p.id}`} className="admin-icon-btn" title="Edit"><FiEdit2 /></Link>
                  <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => remove(p.id)} title="Delete"><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
