<?php
/**
 * DigionTop Admin Panel — Contact Leads
 */
require_once __DIR__ . '/config/auth.php';
require_once __DIR__ . '/config/database.php';
requireLogin();

$message = '';
$msgType = 'success';

// ---- Handle status update -----------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'], $_POST['lead_id'])) {
    $leadId    = (int) $_POST['lead_id'];
    $action    = $_POST['action'];
    $validStatus = ['contacted', 'converted', 'closed', 'new'];

    if (in_array($action, $validStatus, true)) {
        try {
            $stmt = $pdo->prepare("UPDATE contact_leads SET status = ? WHERE id = ?");
            $stmt->execute([$action, $leadId]);
            $message = 'Lead status updated to "' . ucfirst($action) . '".';
        } catch (PDOException $e) {
            $message = 'Error updating lead: ' . $e->getMessage();
            $msgType = 'danger';
        }
    }
}

// ---- Handle delete -------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_id'])) {
    $deleteId = (int) $_POST['delete_id'];
    try {
        $pdo->prepare("DELETE FROM contact_leads WHERE id = ?")->execute([$deleteId]);
        $message = 'Lead deleted.';
    } catch (PDOException $e) {
        $message = 'Error deleting lead.';
        $msgType = 'danger';
    }
}

// ---- Filters & pagination -----------------------------------------------
$statusFilter  = $_GET['status'] ?? '';
$searchQuery   = trim($_GET['q'] ?? '');
$page          = max(1, (int) ($_GET['page'] ?? 1));
$perPage       = 20;
$offset        = ($page - 1) * $perPage;
$validStatuses = ['new', 'contacted', 'converted', 'closed'];

$where  = [];
$params = [];

if ($statusFilter && in_array($statusFilter, $validStatuses, true)) {
    $where[]  = 'status = ?';
    $params[] = $statusFilter;
}
if ($searchQuery) {
    $where[]  = '(full_name LIKE ? OR email LIKE ? OR business_name LIKE ?)';
    $params[] = "%{$searchQuery}%";
    $params[] = "%{$searchQuery}%";
    $params[] = "%{$searchQuery}%";
}

$whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

try {
    $totalRows = (int) $pdo->prepare("SELECT COUNT(*) FROM contact_leads {$whereClause}")->execute($params)
                    ? $pdo->prepare("SELECT COUNT(*) FROM contact_leads {$whereClause}")->execute($params) || true
                    : 0;

    // Re-run properly
    $countStmt = $pdo->prepare("SELECT COUNT(*) FROM contact_leads {$whereClause}");
    $countStmt->execute($params);
    $totalRows = (int) $countStmt->fetchColumn();

    $totalPages = (int) ceil($totalRows / $perPage);

    $stmt = $pdo->prepare(
        "SELECT * FROM contact_leads {$whereClause}
         ORDER BY created_at DESC
         LIMIT {$perPage} OFFSET {$offset}"
    );
    $stmt->execute($params);
    $leads = $stmt->fetchAll();
} catch (PDOException $e) {
    $leads = [];
    $totalRows  = 0;
    $totalPages = 1;
    $message    = 'Could not load leads. Please run install.sql first.';
    $msgType    = 'danger';
}

// ---- View single lead ---------------------------------------------------
$viewLead = null;
if (isset($_GET['view'])) {
    $viewId = (int) $_GET['view'];
    try {
        $s = $pdo->prepare("SELECT * FROM contact_leads WHERE id = ?");
        $s->execute([$viewId]);
        $viewLead = $s->fetch();
    } catch (PDOException $e) { /* silently ignore */ }
}

// ---- Layout vars --------------------------------------------------------
$pageTitle = 'Contact Leads';
$activeNav = 'leads';
require_once __DIR__ . '/includes/layout_header.php';
?>

<div class="page-header">
    <h1>&#128222; Contact Leads <?php if ($totalRows): ?><span style="font-size:.9rem;font-weight:400;color:#aaa;">(<?= $totalRows ?>)</span><?php endif; ?></h1>
    <a href="leads.php" class="btn btn-outline btn-sm">Clear Filters</a>
</div>

<?php if ($message): ?>
    <div class="alert alert-<?= $msgType ?>"><?= htmlspecialchars($message) ?></div>
<?php endif; ?>

<!-- Filter bar -->
<div class="filter-bar">
    <form method="GET" action="leads.php" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
        <input type="text" name="q" value="<?= htmlspecialchars($searchQuery) ?>" placeholder="Search name, email, business...">
        <select name="status">
            <option value="">All Statuses</option>
            <?php foreach ($validStatuses as $s): ?>
                <option value="<?= $s ?>" <?= $statusFilter === $s ? 'selected' : '' ?>><?= ucfirst($s) ?></option>
            <?php endforeach; ?>
        </select>
        <button type="submit" class="btn btn-primary btn-sm">Filter</button>
    </form>
</div>

<div class="card">
    <div class="table-wrap">
        <?php if (empty($leads)): ?>
            <p style="padding:24px; color:#aaa; text-align:center;">No leads found for the selected filters.</p>
        <?php else: ?>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Service</th>
                    <th>Budget</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            <?php foreach ($leads as $lead): ?>
                <tr>
                    <td class="text-muted"><?= $lead['id'] ?></td>
                    <td>
                        <strong><?= htmlspecialchars($lead['full_name']) ?></strong>
                        <?php if ($lead['business_name']): ?>
                            <br><span class="text-muted" style="font-size:.75rem;"><?= htmlspecialchars($lead['business_name']) ?></span>
                        <?php endif; ?>
                    </td>
                    <td><a href="mailto:<?= htmlspecialchars($lead['email']) ?>" style="color:#1565c0;"><?= htmlspecialchars($lead['email']) ?></a></td>
                    <td><?= htmlspecialchars($lead['phone'] ?? '—') ?></td>
                    <td><?= htmlspecialchars($lead['service_interested'] ?? '—') ?></td>
                    <td><?= htmlspecialchars($lead['budget_range'] ?? '—') ?></td>
                    <td class="text-muted" style="white-space:nowrap;"><?= date('d M Y', strtotime($lead['created_at'])) ?></td>
                    <td><span class="badge badge-<?= $lead['status'] ?>"><?= ucfirst($lead['status']) ?></span></td>
                    <td>
                        <div style="display:flex;gap:6px;flex-wrap:wrap;">
                            <a href="leads.php?view=<?= $lead['id'] ?>&status=<?= urlencode($statusFilter) ?>&q=<?= urlencode($searchQuery) ?>&page=<?= $page ?>"
                               class="btn btn-sm btn-outline">View</a>

                            <?php if ($lead['status'] !== 'contacted'): ?>
                            <form method="POST" style="display:inline;">
                                <input type="hidden" name="lead_id" value="<?= $lead['id'] ?>">
                                <input type="hidden" name="action"  value="contacted">
                                <button class="btn btn-sm btn-dark" type="submit">Contacted</button>
                            </form>
                            <?php endif; ?>

                            <?php if ($lead['status'] !== 'converted'): ?>
                            <form method="POST" style="display:inline;">
                                <input type="hidden" name="lead_id" value="<?= $lead['id'] ?>">
                                <input type="hidden" name="action"  value="converted">
                                <button class="btn btn-sm btn-success" type="submit">Converted</button>
                            </form>
                            <?php endif; ?>

                            <form method="POST" style="display:inline;"
                                  onsubmit="return confirm('Delete this lead permanently?');">
                                <input type="hidden" name="delete_id" value="<?= $lead['id'] ?>">
                                <button class="btn btn-sm btn-danger" type="submit">Delete</button>
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

<!-- ---- View Lead Modal ------------------------------------------------- -->
<?php if ($viewLead): ?>
<div class="modal-backdrop open" id="leadModal">
    <div class="modal">
        <div class="modal-header">
            <h3>Lead Details — <?= htmlspecialchars($viewLead['full_name']) ?></h3>
            <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <div class="detail-grid">
                <div class="detail-row">
                    <label>Full Name</label>
                    <p><?= htmlspecialchars($viewLead['full_name']) ?></p>
                </div>
                <div class="detail-row">
                    <label>Business Name</label>
                    <p><?= htmlspecialchars($viewLead['business_name'] ?? 'N/A') ?></p>
                </div>
                <div class="detail-row">
                    <label>Email</label>
                    <p><a href="mailto:<?= htmlspecialchars($viewLead['email']) ?>" style="color:#1565c0;"><?= htmlspecialchars($viewLead['email']) ?></a></p>
                </div>
                <div class="detail-row">
                    <label>Phone</label>
                    <p><?= htmlspecialchars($viewLead['phone'] ?? 'N/A') ?></p>
                </div>
                <div class="detail-row">
                    <label>Service Interested</label>
                    <p><?= htmlspecialchars($viewLead['service_interested'] ?? 'N/A') ?></p>
                </div>
                <div class="detail-row">
                    <label>Budget Range</label>
                    <p><?= htmlspecialchars($viewLead['budget_range'] ?? 'N/A') ?></p>
                </div>
                <div class="detail-row">
                    <label>Status</label>
                    <p><span class="badge badge-<?= $viewLead['status'] ?>"><?= ucfirst($viewLead['status']) ?></span></p>
                </div>
                <div class="detail-row">
                    <label>Source</label>
                    <p><?= htmlspecialchars($viewLead['source'] ?? 'website') ?></p>
                </div>
                <div class="detail-row">
                    <label>Submitted</label>
                    <p><?= date('d M Y, H:i', strtotime($viewLead['created_at'])) ?></p>
                </div>
            </div>
            <?php if ($viewLead['message']): ?>
            <div style="margin-top:16px;">
                <label style="font-size:.72rem; text-transform:uppercase; letter-spacing:.4px; color:#aaa; font-weight:700;">Message</label>
                <p style="margin-top:6px; background:#f8f9fa; border-radius:6px; padding:12px; font-size:.9rem; line-height:1.6;">
                    <?= nl2br(htmlspecialchars($viewLead['message'])) ?>
                </p>
            </div>
            <?php endif; ?>
        </div>
        <div class="modal-footer">
            <a href="mailto:<?= htmlspecialchars($viewLead['email']) ?>" class="btn btn-primary">Reply by Email</a>

            <?php if ($viewLead['status'] !== 'converted'): ?>
            <form method="POST">
                <input type="hidden" name="lead_id" value="<?= $viewLead['id'] ?>">
                <input type="hidden" name="action"  value="converted">
                <button class="btn btn-success" type="submit">Mark Converted</button>
            </form>
            <?php endif; ?>

            <?php if ($viewLead['status'] !== 'contacted'): ?>
            <form method="POST">
                <input type="hidden" name="lead_id" value="<?= $viewLead['id'] ?>">
                <input type="hidden" name="action"  value="contacted">
                <button class="btn btn-dark" type="submit">Mark Contacted</button>
            </form>
            <?php endif; ?>

            <button class="btn btn-outline" onclick="closeModal()">Close</button>
        </div>
    </div>
</div>
<script>
function closeModal() {
    window.location.href = 'leads.php?status=<?= urlencode($statusFilter) ?>&q=<?= urlencode($searchQuery) ?>&page=<?= $page ?>';
}
</script>
<?php endif; ?>

<?php require_once __DIR__ . '/includes/layout_footer.php'; ?>
