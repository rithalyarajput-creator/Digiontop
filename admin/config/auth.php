<?php
/**
 * DigionTop Admin Panel - Authentication
 * Session-based login / logout helpers
 *
 * Default credentials:
 *   Username : digiontop_admin
 *   Password : DigiOnTop@2025!
 *
 * To change the password, generate a new hash:
 *   php -r "echo password_hash('YOUR_PASSWORD', PASSWORD_BCRYPT);"
 * then update ADMIN_PASSWORD_HASH below.
 */

define('ADMIN_USERNAME',      'digiontop_admin');
define('ADMIN_PASSWORD_HASH', '$2y$12$YQv8z1H9KpL3mN0xR4wJiOQ7bT2uV5sA6dC8eF1gH3jK4lM5nO6pQ'); // DigiOnTop@2025!
define('SESSION_TIMEOUT',     3600); // 1 hour in seconds

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start([
        'cookie_httponly' => true,
        'cookie_samesite' => 'Strict',
        'use_strict_mode' => true,
    ]);
}

/**
 * Attempt to log in with provided credentials.
 *
 * @param string $username
 * @param string $password
 * @return bool
 */
function login(string $username, string $password): bool {
    if ($username !== ADMIN_USERNAME) {
        return false;
    }

    if (!password_verify($password, ADMIN_PASSWORD_HASH)) {
        return false;
    }

    // Regenerate session ID to prevent fixation
    session_regenerate_id(true);

    $_SESSION['admin_logged_in'] = true;
    $_SESSION['admin_username']  = $username;
    $_SESSION['login_time']      = time();
    $_SESSION['last_activity']   = time();

    return true;
}

/**
 * Destroy the current admin session and redirect to login.
 */
function logout(): void {
    $_SESSION = [];

    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params['path'],
            $params['domain'],
            $params['secure'],
            $params['httponly']
        );
    }

    session_destroy();
    header('Location: ' . getAdminBaseUrl() . '/login.php');
    exit;
}

/**
 * Check whether the current visitor is an authenticated admin.
 * Also enforces session timeout.
 *
 * @return bool
 */
function isLoggedIn(): bool {
    if (empty($_SESSION['admin_logged_in'])) {
        return false;
    }

    // Enforce idle timeout
    if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity']) > SESSION_TIMEOUT) {
        logout(); // redirects
    }

    $_SESSION['last_activity'] = time();
    return true;
}

/**
 * Redirect to the login page if the visitor is not authenticated.
 * Call this at the top of every protected page.
 */
function requireLogin(): void {
    if (!isLoggedIn()) {
        $returnTo = urlencode($_SERVER['REQUEST_URI'] ?? '');
        header('Location: ' . getAdminBaseUrl() . '/login.php?redirect=' . $returnTo);
        exit;
    }
}

/**
 * Detect the base URL of the admin panel at runtime.
 *
 * @return string  e.g. "https://example.com/admin"
 */
function getAdminBaseUrl(): string {
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host   = $_SERVER['HTTP_HOST'] ?? 'localhost';
    // Walk up from current script to the admin/ directory
    $script = $_SERVER['SCRIPT_NAME'] ?? '';
    $base   = rtrim(dirname(dirname($script)), '/');
    return $scheme . '://' . $host . $base . '/admin';
}
