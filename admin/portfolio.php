<?php
/**
 * DigionTop Admin Panel — Portfolio Items
 */
require_once __DIR__ . '/config/auth.php';
require_once __DIR__ . '/config/database.php';
requireLogin();

$message = '';
$msgType = 'success';

// ---- Delete -------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_id'])) {
    try {
        $pdo->prepare("DELETE FROM portfolio_items WHERE id = ?")->execute([(int)$_POST['delete_id']]);
        $message = 'Portfolio item deleted.';
    } catch (PDOException $e) { $message = 'Error deleting item.'; $msgType = 'danger'; }
}

// ---- Toggle featured ----------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['toggle_featured'])) {
    try {
        $pdo->prepare("UPDATE portfolio_items SET is_featured = NOT is_featured WHERE id = ?")
            ->execute([(int)$_POST['toggle_featured']]);
        $message = 'Featured status updated.';
    } catch (PDOException $e) { $message = 'Error.'; $msgType = 'danger'; }
}

// ---- Save (add / edit) --------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save_portfolio'])) {
    $editId   = (int) ($_POST['portfolio_id'] ?? 0);
    $title    = trim($_POST['title']       ?? '');
    $category = trim($_POST['category']    ?? '');
    $desc     = trim($_POST['description'] ?? '');
    $imgUrl   = trim($_POST['image_url']   ?? '');
    $client   = trim($_POST['client_name'] ?? '');
    $results  = trim($_POST['results']     ?? '');
    $featured = isset($_POST['is_featured']) ? 1 : 0;

    if (empty($title)) {
        $message = 'Title is required.';
        $msgType = 'danger';
    } else {
        try {
            if ($editId > 0) {
                $pdo->prepare(
                    "UPDATE portfolio_items SET title=?,category=?,description=?,image_url=?,
                     client_name=?,results=?,is_featured=? WHERE id=?"
                )->execute([$title,$category,$desc,$imgUrl,$client,$results,$featured,$editId]);
                $message = 'Portfolio item updated.';
            } else {
                $pdo->prepare(
                    "INSERT INTO portfolio_items (title,category,description,image_url,client_name,results,is_featured)
                     VALUES (?,?,?,?,?,?,?)"
                )->execute([$title,$category,$desc,$imgUrl,$client,$results,$featured]);
                $message = 'Portfolio item added.';
            }
        } catch (PDOException $e) {
            $message = 'Database error: ' . $e->getMessage();
            $msgType = 'danger';
        }
    }
}

// ---- Load for edit modal ------------------------------------------------
$editItem = null;
if (isset($_GET['edit'])) {
    try {
        $s = $pdo->prepare("SELECT * FROM portfolio_items WHERE id = ?");
        $s->execute([(int)$_GET['edit']]);
        $editItem = $s->fetch();
    } catch (PDOException $e) {}
}

// ---- Load all -----------------------------------------------------------
$categoryFilter = $_GET['category'] ?? '';
$where  = [];
$params = [];
if ($categoryFilter) {
    $where[]  = 'category = ?';
    $params[] = $categoryFilter;
}
$whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

try {
    $items = $pdo->prepare("SELECT * FROM portfolio_items {$whereClause} ORDER BY is_featured DESC, created_at DESC");
    $items->execute($params);
    $portfolioItems = $items->fetchAll();

    $categories = $pdo->query("SELECT DISTINCT category FROM portfolio_items ORDER BY category")->fetchAll(PDO::FETCH_COLUMN);
} catch (PDOException $e) {
    $portfolioItems = [];
    $categories = [];
    $message  = 'Could not load portfolio items. Run install.sql first.';
    $msgType  = 'danger';
}

$pageTitle = 'Portfolio';
$activeNav = 'portfolio';
require_once __DIR__ . '/includes/layout_header.php';
?>

<div class="page-header">
    <h1>&#128084; Portfolio Items</h1>
    <button class="btn btn-primary" onclick="openAddModal()">+ Add Item</button>
</div>

<?php if ($message): ?>
    <div class="alert alert-<?= $msgType ?>"><?= htmlspecialchars($message) ?></div>
<?php endif; ?>

<!-- Category filter -->
<?php if (!empty($categories)): ?>
<div class="filter-bar" style="margin-bottom:20px;">
    <a href="portfolio.php" class="btn btn-sm <?= !$categoryFilter ? 'btn-primary' : 'btn-outline' ?>">All</a>
    <?php foreach ($categories as $cat): ?>
        <a href="portfolio.php?category=<?= urlencode($cat) ?>"
           class="btn btn-sm <?= $categoryFilter === $cat ? 'btn-primary' : 'btn-outline' ?>">
            <?= htmlspecialchars($cat) ?>
        </a>
    <?php endforeach; ?>
</div>
<?php endif; ?>

<div class="card">
    <div class="table-wrap">
        <?php if (empty($portfolioItems)): ?>
            <p style="padding:24px; color:#aaa; text-align:center;">No portfolio items yet. Add your first project!</p>
        <?php else: ?>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Client</th>
                    <th>Featured</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            <?php foreach ($portfolioItems as $item): ?>
                <tr>
                    <td class="text-muted"><?= $item['id'] ?></td>
                    <td>
                        <?php if ($item['image_url']): ?>
                            <img src="<?= htmlspecialchars($item['image_url']) ?>"
                                 alt="<?= htmlspecialchars($item['title']) ?>"
                                 style="width:64px; height:44px; object-fit:cover; border-radius:4px;">
                        <?php else: ?>
                            <div style="width:64px;height:44px;background:#eee;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#bbb;font-size:.7rem;">No img</div>
                        <?php endif; ?>
                    </td>
                    <td class="fw-bold"><?= htmlspecialchars($item['title']) ?></td>
                    <td><?= htmlspecialchars($item['category']) ?></td>
                    <td><?= htmlspecialchars($item['client_name'] ?? '—') ?></td>
                    <td>
                        <form method="POST" style="display:inline;">
                            <input type="hidden" name="toggle_featured" value="<?= $item['id'] ?>">
                            <button type="submit" class="btn btn-sm <?= $item['is_featured'] ? 'btn-primary' : 'btn-outline' ?>">
                                <?= $item['is_featured'] ? 'Featured' : 'Feature' ?>
                            </button>
                        </form>
                    </td>
                    <td class="text-muted"><?= date('d M Y', strtotime($item['created_at'])) ?></td>
                    <td>
                        <div style="display:flex;gap:6px;flex-wrap:wrap;">
                            <a href="?edit=<?= $item['id'] ?>" class="btn btn-sm btn-dark">Edit</a>
                            <form method="POST" style="display:inline;"
                                  onsubmit="return confirm('Delete this portfolio item?');">
                                <input type="hidden" name="delete_id" value="<?= $item['id'] ?>">
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
</div>

<!-- Add / Edit Modal -->
<div class="modal-backdrop <?= $editItem ? 'open' : '' ?>" id="portfolioModal">
    <div class="modal">
        <div class="modal-header">
            <h3><?= $editItem ? 'Edit Portfolio Item' : 'Add Portfolio Item' ?></h3>
            <button class="modal-close" onclick="closePortfolioModal()">&times;</button>
        </div>
        <form method="POST" action="portfolio.php">
            <input type="hidden" name="save_portfolio" value="1">
            <input type="hidden" name="portfolio_id"
                   value="<?= $editItem ? $editItem['id'] : 0 ?>">
            <div class="modal-body">
                <div class="form-grid">
                    <div class="form-group full">
                        <label>Project Title *</label>
                        <input type="text" name="title" class="form-control"
                               value="<?= htmlspecialchars($editItem['title'] ?? '') ?>"
                               placeholder="E.g. SEO Campaign for TechCorp" required>
                    </div>
                    <div class="form-group">
                        <label>Category</label>
                        <select name="category" class="form-control">
                            <?php
                            $cats = ['SEO','Social Media','PPC / Ads','Web Design','Content Marketing','Email Marketing','Other'];
                            foreach ($cats as $c): ?>
                                <option value="<?= $c ?>" <?= ($editItem['category'] ?? '') === $c ? 'selected' : '' ?>><?= $c ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Client Name</label>
                        <input type="text" name="client_name" class="form-control"
                               value="<?= htmlspecialchars($editItem['client_name'] ?? '') ?>"
                               placeholder="Client or company name">
                    </div>
                    <div class="form-group full">
                        <label>Image URL</label>
                        <input type="url" name="image_url" class="form-control"
                               value="<?= htmlspecialchars($editItem['image_url'] ?? '') ?>"
                               placeholder="https://...">
                    </div>
                    <div class="form-group full">
                        <label>Description</label>
                        <textarea name="description" class="form-control" rows="3"
                                  placeholder="Brief project description..."><?= htmlspecialchars($editItem['description'] ?? '') ?></textarea>
                    </div>
                    <div class="form-group full">
                        <label>Results / Key Metrics</label>
                        <textarea name="results" class="form-control" rows="3"
                                  placeholder="E.g. +180% organic traffic in 3 months, 4.2x ROAS..."><?= htmlspecialchars($editItem['results'] ?? '') ?></textarea>
                    </div>
                    <div class="form-group full">
                        <label>
                            <input type="checkbox" name="is_featured" value="1"
                                   <?= ($editItem['is_featured'] ?? 0) ? 'checked' : '' ?>>
                            &nbsp;Show as Featured on website
                        </label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline" onclick="closePortfolioModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">
                    <?= $editItem ? 'Update' : 'Add' ?> Item
                </button>
            </div>
        </form>
    </div>
</div>

<script>
function openAddModal() {
    document.getElementById('portfolioModal').classList.add('open');
}
function closePortfolioModal() {
    document.getElementById('portfolioModal').classList.remove('open');
    if (history.pushState) {
        history.pushState({}, '', 'portfolio.php');
    }
}
</script>

<?php require_once __DIR__ . '/includes/layout_footer.php'; ?>
