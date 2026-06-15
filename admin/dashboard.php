<?php
/**
 * DigionTop Admin Panel — Dashboard
 */
require_once __DIR__ . '/config/auth.php';
require_once __DIR__ . '/config/database.php';
requireLogin();

// ---- Fetch stats ----------------------------------------
$stats = [];

$counts = [
    'leads'       => 'SELECT COUNT(*) FROM contact_leads',
    'blog'        => 'SELECT COUNT(*) FROM blog_posts',
    'testimonials'=> 'SELECT COUNT(*) FROM testimonials',
    'portfolio'   => 'SELECT COUNT(*) FROM portfolio_items',
];
foreach ($counts as $key => $sql) {
    try {
        $stats[$key] = (int) $pdo->query($sql)->fetchColumn();
    } catch (PDOException $e) {
        $stats[$key] = 0;
    }
}

// New leads count
try {
    $stats['new_leads'] = (int) $pdo->query("SELECT COUNT(*) FROM contact_leads WHERE status = 'new'")->fetchColumn();
} catch (PDOException $e) {
    $stats['new_leads'] = 0;
}

// ---- Recent leads (last 10) -----------------------------
$recentLeads = [];
try {
    $recentLeads = $pdo->query(
        "SELECT id, full_name, email, phone, service_interested, budget_range, status, created_at
         FROM contact_leads
         ORDER BY created_at DESC
         LIMIT 10"
    )->fetchAll();
} catch (PDOException $e) { /* table may not exist yet */ }

// ---- Recent blog posts (last 5) -------------------------
$recentPosts = [];
try {
    $recentPosts = $pdo->query(
        "SELECT id, title, category, status, created_at
         FROM blog_posts
         ORDER BY created_at DESC
         LIMIT 5"
    )->fetchAll();
} catch (PDOException $e) { /* table may not exist yet */ }

// ---- Layout vars ----------------------------------------
$pageTitle = 'Dashboard';
$activeNav = 'dashboard';
require_once __DIR__ . '/includes/layout_header.php';
?>

<!-- Stats grid -->
<div class="stats-grid">
    <div class="stat-card">
        <div class="stat-icon">&#128222;</div>
        <div class="stat-info">
            <div class="stat-value"><?= $stats['leads'] ?></div>
            <div class="stat-label">Total Leads</div>
        </div>
    </div>
    <div class="stat-card">
        <div class="stat-icon">&#128203;</div>
        <div class="stat-info">
            <div class="stat-value"><?= $stats['blog'] ?></div>
            <div class="stat-label">Blog Posts</div>
        </div>
    </div>
    <div class="stat-card">
        <div class="stat-icon">&#11088;</div>
        <div class="stat-info">
            <div class="stat-value"><?= $stats['testimonials'] ?></div>
            <div class="stat-label">Testimonials</div>
        </div>
    </div>
    <div class="stat-card">
        <div class="stat-icon">&#128084;</div>
        <div class="stat-info">
            <div class="stat-value"><?= $stats['portfolio'] ?></div>
            <div class="stat-label">Portfolio Items</div>
        </div>
    </div>
    <div class="stat-card" style="border-left-color:#1565c0;">
        <div class="stat-icon" style="background:rgba(21,101,192,.1);">&#128276;</div>
        <div class="stat-info">
            <div class="stat-value" style="color:#1565c0;"><?= $stats['new_leads'] ?></div>
            <div class="stat-label">New / Unread Leads</div>
        </div>
    </div>
</div>

<!-- Two-column layout -->
<div style="display:grid; grid-template-columns:1fr 340px; gap:24px; align-items:start;">

    <!-- Recent leads -->
    <div class="card">
        <div class="card-header">
            <h2>&#128222; Recent Leads</h2>
            <a href="leads.php" class="btn btn-sm btn-outline">View All</a>
        </div>
        <div class="table-wrap">
            <?php if (empty($recentLeads)): ?>
                <p style="padding:20px; color:#aaa;">No leads yet. They will appear here once your contact form receives submissions.</p>
            <?php else: ?>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Service</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                <?php foreach ($recentLeads as $lead): ?>
                    <tr>
                        <td class="fw-bold"><?= htmlspecialchars($lead['full_name']) ?></td>
                        <td><?= htmlspecialchars($lead['email']) ?></td>
                        <td><?= htmlspecialchars($lead['service_interested'] ?? '—') ?></td>
                        <td><span class="badge badge-<?= $lead['status'] ?>"><?= ucfirst($lead['status']) ?></span></td>
                        <td class="text-muted"><?= date('d M', strtotime($lead['created_at'])) ?></td>
                        <td><a href="leads.php?view=<?= $lead['id'] ?>" class="btn btn-sm btn-outline">View</a></td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
            <?php endif; ?>
        </div>
    </div>

    <!-- Recent blog posts -->
    <div class="card">
        <div class="card-header">
            <h2>&#128203; Recent Posts</h2>
            <a href="blog/list.php" class="btn btn-sm btn-outline">View All</a>
        </div>
        <div class="card-body" style="padding:0;">
            <?php if (empty($recentPosts)): ?>
                <p style="padding:20px; color:#aaa;">No posts yet.</p>
            <?php else: ?>
            <ul style="border-top:1px solid #eee;">
                <?php foreach ($recentPosts as $post): ?>
                <li style="padding:12px 18px; border-bottom:1px solid #eee; display:flex; justify-content:space-between; align-items:center; gap:10px;">
                    <div>
                        <div style="font-size:.85rem; font-weight:700; line-height:1.3;"><?= htmlspecialchars($post['title']) ?></div>
                        <div style="font-size:.75rem; color:#aaa; margin-top:2px;"><?= htmlspecialchars($post['category']) ?> &bull; <?= date('d M Y', strtotime($post['created_at'])) ?></div>
                    </div>
                    <span class="badge badge-<?= $post['status'] ?>"><?= ucfirst($post['status']) ?></span>
                </li>
                <?php endforeach; ?>
            </ul>
            <?php endif; ?>
        </div>
        <div style="padding:12px 18px; border-top:1px solid #eee;">
            <a href="blog/edit.php" class="btn btn-primary btn-sm">+ New Post</a>
        </div>
    </div>

</div>

<?php require_once __DIR__ . '/includes/layout_footer.php'; ?>
