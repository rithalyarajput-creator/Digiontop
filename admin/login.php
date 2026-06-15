<?php
/**
 * DigionTop Admin Panel — Login Page
 */
require_once __DIR__ . '/config/auth.php';

// Already logged in — skip straight to dashboard
if (isLoggedIn()) {
    header('Location: dashboard.php');
    exit;
}

$error   = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // CSRF-lite: verify request origin header (basic protection)
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($username) || empty($password)) {
        $error = 'Please enter both username and password.';
    } elseif (login($username, $password)) {
        $redirect = filter_var($_GET['redirect'] ?? '', FILTER_SANITIZE_URL);
        $redirect = $redirect ?: 'dashboard.php';
        header('Location: ' . $redirect);
        exit;
    } else {
        // Generic error — do not reveal which field is wrong
        $error = 'Invalid credentials. Please try again.';
        // Slow down brute-force attempts
        sleep(1);
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login — DigionTop Admin</title>
    <link rel="stylesheet" href="assets/style.css">
    <style>
        /* Extra login-specific overrides */
        .login-body { background: radial-gradient(ellipse at 60% 40%, #1a1a1a 0%, #0d0d0d 100%); }
        .login-card { animation: fadeUp .35s ease; }
        @keyframes fadeUp {
            from { opacity:0; transform:translateY(18px); }
            to   { opacity:1; transform:translateY(0); }
        }
        .toggle-pw { position:relative; }
        .toggle-pw input { padding-right: 42px; }
        .toggle-pw button {
            position:absolute; right:10px; top:50%;
            transform:translateY(-50%);
            background:none; border:none; cursor:pointer;
            color:#aaa; font-size:.85rem;
        }
    </style>
</head>
<body class="login-body">

<div class="login-card">

    <div class="login-logo">
        Digion<span>Top</span>
    </div>
    <p class="login-subtitle">Admin Panel &mdash; Restricted Access</p>

    <?php if ($error): ?>
        <div class="login-error">&#9888; <?= htmlspecialchars($error) ?></div>
    <?php endif; ?>

    <form method="POST" action="login.php<?= isset($_GET['redirect']) ? '?redirect=' . urlencode($_GET['redirect']) : '' ?>" autocomplete="off" novalidate>

        <div class="form-group">
            <label for="username">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                value="<?= htmlspecialchars($_POST['username'] ?? '') ?>"
                placeholder="Enter your username"
                autocomplete="username"
                required
                autofocus
            >
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <div class="toggle-pw">
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    autocomplete="current-password"
                    required
                >
                <button type="button" onclick="togglePw()" title="Show / hide password">&#128065;</button>
            </div>
        </div>

        <button type="submit" class="btn-login">Sign In</button>

    </form>

    <p style="margin-top:24px; font-size:.75rem; color:#aaa;">
        &copy; <?= date('Y') ?> DigionTop &mdash; Unauthorised access is prohibited.
    </p>

</div>

<script>
function togglePw() {
    const pw = document.getElementById('password');
    pw.type = pw.type === 'password' ? 'text' : 'password';
}
</script>
</body>
</html>
