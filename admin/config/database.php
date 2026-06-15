<?php
/**
 * DigionTop Admin Panel - Database Configuration
 * PDO connection with error handling
 */

define('DB_HOST', 'localhost');
define('DB_NAME', 'digiontop_db');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

function getDBConnection(): PDO {
    static $pdo = null;

    if ($pdo !== null) {
        return $pdo;
    }

    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=' . DB_CHARSET;

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci",
    ];

    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        // Log error securely — do not expose credentials in output
        error_log('[DigionTop DB Error] ' . $e->getMessage());
        die(json_encode([
            'success' => false,
            'message' => 'Database connection failed. Please contact the administrator.'
        ]));
    }
}

// Expose a global $pdo for convenience in procedural scripts
$pdo = getDBConnection();
