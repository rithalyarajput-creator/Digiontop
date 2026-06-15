<?php
/**
 * DigionTop Admin Panel — Add / Edit Blog Post
 */
require_once dirname(__DIR__) . '/config/auth.php';
require_once dirname(__DIR__) . '/config/database.php';
requireLogin();

$message    = '';
$msgType    = 'success';
$isEdit     = false;
$postId     = 0;

// Default empty post
$post = [
    'id'        => 0,
    'title'     => '',
    'slug'      => '',
    'excerpt'   => '',
    'content'   => '',
    'category'  => '',
    'image_url' => '',
    'status'    => 'draft',
];

// ---- Load existing post for editing ------------------------------------
if (isset($_GET['id'])) {
    $postId = (int) $_GET['id'];
    try {
        $stmt = $pdo->prepare("SELECT * FROM blog_posts WHERE id = ?");
        $stmt->execute([$postId]);
        $existing = $stmt->fetch();
        if ($existing) {
            $post   = $existing;
            $isEdit = true;
        } else {
            $message = 'Post not found.';
            $msgType = 'danger';
        }
    } catch (PDOException $e) {
        $message = 'Error loading post: ' . $e->getMessage();
        $msgType = 'danger';
    }
}

// ---- Handle form submission --------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title     = trim($_POST['title']     ?? '');
    $slug      = trim($_POST['slug']      ?? '');
    $excerpt   = trim($_POST['excerpt']   ?? '');
    $content   = trim($_POST['content']   ?? '');
    $category  = trim($_POST['category']  ?? '');
    $imageUrl  = trim($_POST['image_url'] ?? '');
    $status    = in_array($_POST['status'] ?? '', ['draft', 'published']) ? $_POST['status'] : 'draft';
    $editId    = (int) ($_POST['post_id'] ?? 0);

    // Auto-generate slug if empty
    if (empty($slug)) {
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $title), '-'));
    }

    // Basic validation
    if (empty($title)) {
        $message = 'Title is required.';
        $msgType = 'danger';
    } elseif (empty($content)) {
        $message = 'Content is required.';
        $msgType = 'danger';
    } else {
        // Ensure slug uniqueness (exclude current record on edit)
        try {
            $slugCheck = $pdo->prepare(
                "SELECT COUNT(*) FROM blog_posts WHERE slug = ? AND id != ?"
            );
            $slugCheck->execute([$slug, $editId]);
            if ((int) $slugCheck->fetchColumn() > 0) {
                $slug .= '-' . time(); // make unique
            }

            if ($editId > 0) {
                // UPDATE
                $stmt = $pdo->prepare(
                    "UPDATE blog_posts
                     SET title=?, slug=?, excerpt=?, content=?, category=?, image_url=?, status=?, updated_at=NOW()
                     WHERE id=?"
                );
                $stmt->execute([$title, $slug, $excerpt, $content, $category, $imageUrl, $status, $editId]);
                $message = 'Post updated successfully.';
                $isEdit  = true;
                $postId  = $editId;
            } else {
                // INSERT
                $stmt = $pdo->prepare(
                    "INSERT INTO blog_posts (title, slug, excerpt, content, category, image_url, status)
                     VALUES (?, ?, ?, ?, ?, ?, ?)"
                );
                $stmt->execute([$title, $slug, $excerpt, $content, $category, $imageUrl, $status]);
                $postId = (int) $pdo->lastInsertId();
                $isEdit = true;
                $message = 'Post created successfully!';
            }

            // Refresh post data
            $stmt2 = $pdo->prepare("SELECT * FROM blog_posts WHERE id = ?");
            $stmt2->execute([$postId]);
            $post = $stmt2->fetch();

        } catch (PDOException $e) {
            $message = 'Database error: ' . $e->getMessage();
            $msgType = 'danger';
            // Keep form values
            $post = array_merge($post, compact('title','slug','excerpt','content','category','imageUrl','status'));
        }
    }
}

$pageTitle = $isEdit ? 'Edit Post' : 'New Post';
$activeNav = 'blog';
require_once dirname(__DIR__) . '/includes/layout_header.php';
?>

<div class="page-header">
    <h1>&#128203; <?= $isEdit ? 'Edit Post' : 'New Blog Post' ?></h1>
    <a href="list.php" class="btn btn-outline btn-sm">&#8592; Back to Posts</a>
</div>

<?php if ($message): ?>
    <div class="alert alert-<?= $msgType ?>"><?= htmlspecialchars($message) ?></div>
<?php endif; ?>

<div style="display:grid; grid-template-columns:1fr 300px; gap:24px; align-items:start;">

    <!-- Main form -->
    <div class="card">
        <div class="card-header"><h2>Post Content</h2></div>
        <div class="card-body">
            <form method="POST" action="edit.php<?= $isEdit ? '?id=' . $postId : '' ?>" novalidate>
                <input type="hidden" name="post_id" value="<?= $post['id'] ?? 0 ?>">

                <div class="form-group">
                    <label for="title">Title <span style="color:#dc3545;">*</span></label>
                    <input type="text" id="title" name="title" class="form-control"
                           value="<?= htmlspecialchars($post['title']) ?>"
                           placeholder="Enter post title..."
                           oninput="autoSlug(this.value)"
                           required>
                </div>

                <div class="form-group">
                    <label for="slug">URL Slug <span style="color:#dc3545;">*</span></label>
                    <input type="text" id="slug" name="slug" class="form-control"
                           value="<?= htmlspecialchars($post['slug']) ?>"
                           placeholder="auto-generated-from-title">
                    <p class="form-hint">Only lowercase letters, numbers, and hyphens. Auto-generated from title.</p>
                </div>

                <div class="form-group">
                    <label for="excerpt">Excerpt / Meta Description</label>
                    <textarea id="excerpt" name="excerpt" class="form-control" rows="3"
                              placeholder="Short summary (shown in listings and SEO)..."><?= htmlspecialchars($post['excerpt'] ?? '') ?></textarea>
                </div>

                <div class="form-group">
                    <label for="content">Content <span style="color:#dc3545;">*</span></label>
                    <textarea id="content" name="content" class="form-control" rows="16"
                              placeholder="Write your blog post content here..."><?= htmlspecialchars($post['content'] ?? '') ?></textarea>
                    <p class="form-hint">HTML is supported.</p>
                </div>

                <div style="display:flex; gap:12px; justify-content:flex-end; margin-top:8px;">
                    <a href="list.php" class="btn btn-outline">Cancel</a>
                    <button type="submit" name="status_override" value="draft" class="btn btn-dark">Save as Draft</button>
                    <button type="submit" class="btn btn-primary">
                        <?= $isEdit ? 'Update Post' : 'Publish Post' ?>
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Sidebar settings -->
    <div>
        <div class="card" style="margin-bottom:16px;">
            <div class="card-header"><h2>Settings</h2></div>
            <div class="card-body">
                <!-- Status is set via the form inside the main card;
                     this sidebar shows meta controls only -->
                <div class="form-group">
                    <label for="category_s">Category</label>
                    <select id="category_s" name="category" class="form-control"
                            form="post-meta-form">
                        <?php
                        $cats = ['General','SEO','Social Media','PPC / Ads','Web Design','Content Marketing','Case Study','News'];
                        foreach ($cats as $c): ?>
                            <option value="<?= $c ?>" <?= ($post['category'] ?? '') === $c ? 'selected' : '' ?>><?= $c ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="form-group">
                    <label for="image_url_s">Featured Image URL</label>
                    <input type="url" id="image_url_s" name="image_url" class="form-control"
                           form="post-meta-form"
                           value="<?= htmlspecialchars($post['image_url'] ?? '') ?>"
                           placeholder="https://...">
                </div>

                <div class="form-group">
                    <label for="status_s">Status</label>
                    <select id="status_s" name="status" class="form-control"
                            form="post-meta-form">
                        <option value="draft"     <?= ($post['status'] ?? '') === 'draft'     ? 'selected' : '' ?>>Draft</option>
                        <option value="published" <?= ($post['status'] ?? '') === 'published' ? 'selected' : '' ?>>Published</option>
                    </select>
                </div>

                <button type="submit" form="post-meta-form" class="btn btn-primary" style="width:100%;">
                    <?= $isEdit ? 'Update Post' : 'Save Post' ?>
                </button>
            </div>
        </div>

        <?php if ($post['image_url']): ?>
        <div class="card">
            <div class="card-header"><h2>Image Preview</h2></div>
            <div class="card-body" style="padding:12px;">
                <img src="<?= htmlspecialchars($post['image_url']) ?>"
                     alt="Featured Image"
                     style="border-radius:6px; width:100%; object-fit:cover; max-height:160px;">
            </div>
        </div>
        <?php endif; ?>
    </div>

</div>

<!-- Hidden meta form that targets the same POST endpoint
     so sidebar controls are submitted together with content -->
<form id="post-meta-form" method="POST"
      action="edit.php<?= $isEdit ? '?id=' . $postId : '' ?>" style="display:none;">
    <input type="hidden" name="post_id"  value="<?= $post['id'] ?? 0 ?>">
    <!-- title, slug, excerpt, content are rendered above in the main form;
         JS copies their values before this form submits -->
    <input type="hidden" name="title"    id="meta_title">
    <input type="hidden" name="slug"     id="meta_slug">
    <input type="hidden" name="excerpt"  id="meta_excerpt">
    <input type="hidden" name="content"  id="meta_content">
</form>

<script>
/* Auto-generate slug from title */
function autoSlug(value) {
    const slug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    document.getElementById('slug').value = slug;
}

/* Copy main-form values into the hidden meta-form before it submits */
document.getElementById('post-meta-form').addEventListener('submit', function(e) {
    document.getElementById('meta_title').value   = document.getElementById('title').value;
    document.getElementById('meta_slug').value    = document.getElementById('slug').value;
    document.getElementById('meta_excerpt').value = document.getElementById('excerpt').value;
    document.getElementById('meta_content').value = document.getElementById('content').value;
});
</script>

<?php require_once dirname(__DIR__) . '/includes/layout_footer.php'; ?>
