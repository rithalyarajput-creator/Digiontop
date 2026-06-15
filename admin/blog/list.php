<?php
/**
 * DigionTop Admin Panel — Blog Posts List
 */
require_once dirname(__DIR__) . '/config/auth.php';
require_once dirname(__DIR__) . '/config/database.php';
requireLogin();

$message = '';
$msgType = 'success';

// ---- Delete post --------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_id'])) {
    $deleteId = (int) $_POST['delete_id'];
    try {
        $pdo->prepare("DELETE FROM blog_posts WHERE id = ?")->execute([$deleteId]);
        $message = 'Post deleted successfully.';
    } catch (PDOException $e) {
        $message = 'Error deleting post.';
        $msgType = 'danger';
    }
}

// ---- Toggle status ------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['toggle_id'])) {
    $toggleId = (int) $_POST['toggle_id'];
    try {
        $pdo->prepare(
            "UPDATE blog_posts
             SET status = IF(status = 'published', 'draft', 'published'),
                 updated_at = NOW()
             WHERE id = ?"
        )->execute([$toggleId]);
        $message = 'Post status updated.';
    } catch (PDOException $e) {
        $message = 'Error updating status.';
        $msgType = 'danger';
    }
}

// ---- Filters & pagination -----------------------------------------------
$statusFilter = $_GET['status'] ?? '';
$searchQuery  = trim($_GET['q'] ?? '');
$page         = max(1, (int) ($_GET['page'] ?? 1));
$perPage      = 20;
$offset       = ($page - 1) * $perPage;

$where  = [];
$params = [];

if (in_array($statusFilter, ['draft', 'published'], true)) {
    $where[]  = 'status = ?';
    $params[] = $statusFilter;
}
if ($searchQuery) {
    $where[]  = '(title LIKE ? OR category LIKE ?)';
    $params[] = "%{$searchQuery}%";
    $params[] = "%{$searchQuery}%";
}

$whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

try {
    $countStmt = $pdo->prepare("SELECT COUNT(*) FROM blog_posts {$whereClause}");
    $countStmt->execute($params);
    $totalRows  = (int) $countStmt->fetchColumn();
    $totalPages = (int) ceil($totalRows / $perPage);

    $stmt = $pdo->prepare(
        "SELECT id, title, slug, category, status, created_at, updated_at
         FROM blog_posts {$whereClause}
         ORDER BY created_at DESC
         LIMIT {$perPage} OFFSET {$offset}"
    );
    $stmt->execute($params);
    $posts = $stmt->fetchAll();
} catch (PDOException $e) {
    $posts      = [];
    $totalRows  = 0;
    $totalPages = 1;
    $message    = 'Could not load posts. Please run install.sql first.';
    $msgType    = 'danger';
}

$pageTitle = 'Blog Posts';
$activeNav = 'blog';
require_once dirname(__DIR__) . '/includes/layout_header.php';
?>

<div class="page-header">
    <h1>&#128203; Blog Posts <?php if ($totalRows): ?><span style="font-size:.9rem;font-weight:400;color:#aaa;">(<?= $totalRows ?>)</span><?php endif; ?></h1>
    <a href="edit.php" class="btn btn-primary">+ New Post</a>
</div>

<?php if ($message): ?>
    <div class="alert alert-<?= $msgType ?>"><?= htmlspecialchars($message) ?></div>
<?php endif; ?>

<!-- Filters -->
<div class="filter-bar">
    <form method="GET" action="list.php" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
        <input type="text" name="q" value="<?= htmlspecialchars($searchQuery) ?>" placeholder="Search title or category...">
        <select name="status">
            <option value="">All Statuses</option>
            <option value="published" <?= $statusFilter === 'published' ? 'selected' : '' ?>>Published</option>
            <option value="draft"     <?= $statusFilter === 'draft'     ? 'selected' : '' ?>>Draft</option>
        </select>
        <button type="submit" class="btn btn-primary btn-sm">Filter</button>
        <a href="list.php" class="btn btn-outline btn-sm">Clear</a>
    </form>
</div>

<div class="card">
    <div class="table-wrap">
        <?php if (empty($posts)): ?>
            <p style="padding:24px; color:#aaa; text-align:center;">No posts found. <a href="edit.php">Create your first post.</a></p>
        <?php else: ?>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Slug</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            <?php foreach ($posts as $post): ?>
                <tr>
                    <td class="text-muted"><?= $post['id'] ?></td>
                    <td class="fw-bold" style="max-width:240px;">
                        <?= htmlspecialchars($post['title']) ?>
                    </td>
                    <td><?= htmlspecialchars($post['category']) ?></td>
                    <td>
                        <code style="font-size:.75rem; background:#f3f4f6; padding:2px 6px; border-radius:4px;">
                            <?= htmlspecialchars($post['slug']) ?>
                        </code>
                    </td>
                    <td><span class="badge badge-<?= $post['status'] ?>"><?= ucfirst($post['status']) ?></span></td>
                    <td class="text-muted"><?= date('d M Y', strtotime($post['created_at'])) ?></td>
                    <td class="text-muted"><?= date('d M Y', strtotime($post['updated_at'])) ?></td>
                    <td>
                        <div style="display:flex;gap:6px;flex-wrap:wrap;">
                            <a href="edit.php?id=<?= $post['id'] ?>" class="btn btn-sm btn-dark">Edit</a>

                            <form method="POST" style="display:inline;">
                                <input type="hidden" name="toggle_id" value="<?= $post['id'] ?>">
                                <button type="submit" class="btn btn-sm btn-outline">
                                    <?= $post['status'] === 'published' ? 'Unpublish' : 'Publish' ?>
                                </button>
                            </form>

                            <form method="POST" style="display:inline;"
                                  onsubmit="return confirm('Delete \'<?= addslashes($post['title']) ?>\'? This cannot be undone.');">
                                <input type="hidden" name="delete_id" value="<?= $post['id'] ?>">
                                <button type="submit" class="btn btn-sm btn-danger">Delete</button>
                            </form>
                        </div>
                    </td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
        <?php endif; ?>
    </div>

    <!-- Pagination -->
    <?php if ($totalPages > 1): ?>
    <div style="padding:16px 20px; border-top:1px solid #eee;">
        <div class="pagination">
            <?php if ($page > 1): ?>
                <a href="?page=<?= $page-1 ?>&status=<?= urlencode($statusFilter) ?>&q=<?= urlencode($searchQuery) ?>">&laquo;</a>
            <?php endif; ?>
            <?php for ($i = max(1,$page-2); $i <= min($totalPages,$page+2); $i++): ?>
                <?php if ($i === $page): ?>
                    <span class="current"><?= $i ?></span>
                <?php else: ?>
                    <a href="?page=<?= $i ?>&status=<?= urlencode($statusFilter) ?>&q=<?= urlencode($searchQuery) ?>"><?= $i ?></a>
                <?php endif; ?>
            <?php endfor; ?>
            <?php if ($page < $totalPages): ?>
                <a href="?page=<?= $page+1 ?>&status=<?= urlencode($statusFilter) ?>&q=<?= urlencode($searchQuery) ?>">&raquo;</a>
            <?php endif; ?>
        </div>
    </div>
    <?php endif; ?>
</div>

<?php require_once dirname(__DIR__) . '/includes/layout_footer.php'; ?>
