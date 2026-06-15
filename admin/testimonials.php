<?php
/**
 * DigionTop Admin Panel — Testimonials
 */
require_once __DIR__ . '/config/auth.php';
require_once __DIR__ . '/config/database.php';
requireLogin();

$message = '';
$msgType = 'success';

// ---- Delete -------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_id'])) {
    try {
        $pdo->prepare("DELETE FROM testimonials WHERE id = ?")->execute([(int)$_POST['delete_id']]);
        $message = 'Testimonial deleted.';
    } catch (PDOException $e) { $message = 'Error deleting.'; $msgType = 'danger'; }
}

// ---- Toggle featured ----------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['toggle_featured'])) {
    try {
        $pdo->prepare("UPDATE testimonials SET is_featured = NOT is_featured WHERE id = ?")
            ->execute([(int)$_POST['toggle_featured']]);
        $message = 'Featured status updated.';
    } catch (PDOException $e) { $message = 'Error.'; $msgType = 'danger'; }
}

// ---- Save (add / edit) --------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save_testimonial'])) {
    $editId   = (int) ($_POST['testimonial_id'] ?? 0);
    $name     = trim($_POST['client_name']      ?? '');
    $role     = trim($_POST['client_role']      ?? '');
    $location = trim($_POST['client_location']  ?? '');
    $text     = trim($_POST['testimonial_text'] ?? '');
    $rating   = max(1, min(5, (int) ($_POST['rating'] ?? 5)));
    $featured = isset($_POST['is_featured']) ? 1 : 0;

    if (empty($name) || empty($text)) {
        $message = 'Client name and testimonial text are required.';
        $msgType = 'danger';
    } else {
        try {
            if ($editId > 0) {
                $pdo->prepare(
                    "UPDATE testimonials SET client_name=?,client_role=?,client_location=?,
                     testimonial_text=?,rating=?,is_featured=? WHERE id=?"
                )->execute([$name,$role,$location,$text,$rating,$featured,$editId]);
                $message = 'Testimonial updated.';
            } else {
                $pdo->prepare(
                    "INSERT INTO testimonials (client_name,client_role,client_location,testimonial_text,rating,is_featured)
                     VALUES (?,?,?,?,?,?)"
                )->execute([$name,$role,$location,$text,$rating,$featured]);
                $message = 'Testimonial added.';
            }
        } catch (PDOException $e) {
            $message = 'Database error: ' . $e->getMessage();
            $msgType = 'danger';
        }
    }
}

// ---- Load for edit modal ------------------------------------------------
$editTestimonial = null;
if (isset($_GET['edit'])) {
    try {
        $s = $pdo->prepare("SELECT * FROM testimonials WHERE id = ?");
        $s->execute([(int)$_GET['edit']]);
        $editTestimonial = $s->fetch();
    } catch (PDOException $e) {}
}

// ---- Load all -----------------------------------------------------------
try {
    $testimonials = $pdo->query(
        "SELECT * FROM testimonials ORDER BY is_featured DESC, created_at DESC"
    )->fetchAll();
} catch (PDOException $e) {
    $testimonials = [];
    $message      = 'Could not load testimonials. Run install.sql first.';
    $msgType      = 'danger';
}

$pageTitle = 'Testimonials';
$activeNav = 'testimonials';
require_once __DIR__ . '/includes/layout_header.php';
?>

<div class="page-header">
    <h1>&#11088; Testimonials</h1>
    <button class="btn btn-primary" onclick="openAddModal()">+ Add Testimonial</button>
</div>

<?php if ($message): ?>
    <div class="alert alert-<?= $msgType ?>"><?= htmlspecialchars($message) ?></div>
<?php endif; ?>

<div class="card">
    <div class="table-wrap">
        <?php if (empty($testimonials)): ?>
            <p style="padding:24px; color:#aaa; text-align:center;">No testimonials yet. Add your first one!</p>
        <?php else: ?>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Client</th>
                    <th>Role / Company</th>
                    <th>Location</th>
                    <th>Rating</th>
                    <th>Featured</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            <?php foreach ($testimonials as $t): ?>
                <tr>
                    <td class="text-muted"><?= $t['id'] ?></td>
                    <td class="fw-bold"><?= htmlspecialchars($t['client_name']) ?></td>
                    <td><?= htmlspecialchars($t['client_role'] ?? '—') ?></td>
                    <td><?= htmlspecialchars($t['client_location'] ?? '—') ?></td>
                    <td>
                        <?php for ($i=1;$i<=5;$i++): ?>
                            <span style="color:<?= $i<=$t['rating']?'#f5c518':'#ddd'?>;">&#9733;</span>
                        <?php endfor; ?>
                    </td>
                    <td>
                        <form method="POST" style="display:inline;">
                            <input type="hidden" name="toggle_featured" value="<?= $t['id'] ?>">
                            <button type="submit" class="btn btn-sm <?= $t['is_featured'] ? 'btn-primary' : 'btn-outline' ?>">
                                <?= $t['is_featured'] ? 'Featured' : 'Feature' ?>
                            </button>
                        </form>
                    </td>
                    <td class="text-muted"><?= date('d M Y', strtotime($t['created_at'])) ?></td>
                    <td>
                        <div style="display:flex;gap:6px;">
                            <a href="?edit=<?= $t['id'] ?>" class="btn btn-sm btn-dark">Edit</a>
                            <form method="POST" style="display:inline;"
                                  onsubmit="return confirm('Delete this testimonial?');">
                                <input type="hidden" name="delete_id" value="<?= $t['id'] ?>">
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
<div class="modal-backdrop <?= $editTestimonial ? 'open' : '' ?>" id="testimonialModal">
    <div class="modal">
        <div class="modal-header">
            <h3><?= $editTestimonial ? 'Edit Testimonial' : 'Add Testimonial' ?></h3>
            <button class="modal-close" onclick="closeTestimonialModal()">&times;</button>
        </div>
        <form method="POST" action="testimonials.php">
            <input type="hidden" name="save_testimonial" value="1">
            <input type="hidden" name="testimonial_id"
                   value="<?= $editTestimonial ? $editTestimonial['id'] : 0 ?>">
            <div class="modal-body">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Client Name *</label>
                        <input type="text" name="client_name" class="form-control"
                               value="<?= htmlspecialchars($editTestimonial['client_name'] ?? '') ?>"
                               placeholder="John Smith" required>
                    </div>
                    <div class="form-group">
                        <label>Role / Company</label>
                        <input type="text" name="client_role" class="form-control"
                               value="<?= htmlspecialchars($editTestimonial['client_role'] ?? '') ?>"
                               placeholder="CEO at Acme Ltd">
                    </div>
                    <div class="form-group">
                        <label>Location</label>
                        <input type="text" name="client_location" class="form-control"
                               value="<?= htmlspecialchars($editTestimonial['client_location'] ?? '') ?>"
                               placeholder="Dubai, UAE">
                    </div>
                    <div class="form-group">
                        <label>Rating (1-5)</label>
                        <select name="rating" class="form-control">
                            <?php for ($i=5;$i>=1;$i--): ?>
                                <option value="<?= $i ?>" <?= ($editTestimonial['rating'] ?? 5) == $i ? 'selected' : '' ?>>
                                    <?= $i ?> Star<?= $i > 1 ? 's' : '' ?>
                                </option>
                            <?php endfor; ?>
                        </select>
                    </div>
                    <div class="form-group full">
                        <label>Testimonial Text *</label>
                        <textarea name="testimonial_text" class="form-control" rows="5"
                                  placeholder="What the client said..."><?= htmlspecialchars($editTestimonial['testimonial_text'] ?? '') ?></textarea>
                    </div>
                    <div class="form-group full">
                        <label>
                            <input type="checkbox" name="is_featured" value="1"
                                   <?= ($editTestimonial['is_featured'] ?? 0) ? 'checked' : '' ?>>
                            &nbsp;Show as Featured on website
                        </label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline" onclick="closeTestimonialModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">
                    <?= $editTestimonial ? 'Update' : 'Add' ?> Testimonial
                </button>
            </div>
        </form>
    </div>
</div>

<script>
function openAddModal() {
    document.getElementById('testimonialModal').classList.add('open');
}
function closeTestimonialModal() {
    document.getElementById('testimonialModal').classList.remove('open');
    // Remove ?edit param from URL
    if (history.pushState) {
        history.pushState({}, '', 'testimonials.php');
    }
}
</script>

<?php require_once __DIR__ . '/includes/layout_footer.php'; ?>
