<?php
/**
 * Shared admin layout — top of every protected page.
 *
 * Expects:
 *   $pageTitle   string  — shown in <title> and topbar
 *   $activeNav   string  — key matching a nav item (dashboard|leads|blog|testimonials|portfolio)
 *
 * The including file must have already called requireLogin().
 */

// Resolve path prefix so sidebar links work from sub-directories
$depth       = substr_count(str_replace(realpath(__DIR__ . '/..'), '', realpath(debug_backtrace()[0]['file'])), DIRECTORY_SEPARATOR) - 1;
$prefix      = str_repeat('../', max(0, $depth));
$adminUrl    = rtrim(str_repeat('../', max(0, $depth)), '/') ?: '.';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($pageTitle ?? 'Admin') ?> — DigionTop Admin</title>
    <link rel="stylesheet" href="<?= $prefix ?>assets/style.css">
</head>
<body>
<div class="admin-wrapper">

<!-- Mobile sidebar overlay -->
<div class="sidebar-overlay" id="sidebarOverlay" onclick="closeSidebar()"></div>

<!-- Sidebar -->
<aside class="sidebar" id="sidebar">
    <div class="sidebar-brand">
        <div class="brand-name">Digion<span>Top</span></div>
        <div class="brand-tag">Admin Panel</div>
    </div>

    <nav class="sidebar-nav">
        <p class="nav-section-label">Main</p>

        <ul>
            <li class="nav-item">
                <a href="<?= $prefix ?>dashboard.php" class="<?= ($activeNav ?? '') === 'dashboard' ? 'active' : '' ?>">
                    <span class="nav-icon">&#128202;</span> Dashboard
                </a>
            </li>
        </ul>

        <p class="nav-section-label">Content</p>
        <ul>
            <li class="nav-item">
                <a href="<?= $prefix ?>blog/list.php" class="<?= ($activeNav ?? '') === 'blog' ? 'active' : '' ?>">
                    <span class="nav-icon">&#128203;</span> Blog Posts
                </a>
            </li>
            <li class="nav-item">
                <a href="<?= $prefix ?>testimonials.php" class="<?= ($activeNav ?? '') === 'testimonials' ? 'active' : '' ?>">
                    <span class="nav-icon">&#11088;</span> Testimonials
                </a>
            </li>
            <li class="nav-item">
                <a href="<?= $prefix ?>portfolio.php" class="<?= ($activeNav ?? '') === 'portfolio' ? 'active' : '' ?>">
                    <span class="nav-icon">&#128084;</span> Portfolio
                </a>
            </li>
        </ul>

        <p class="nav-section-label">CRM</p>
        <ul>
            <li class="nav-item">
                <a href="<?= $prefix ?>leads.php" class="<?= ($activeNav ?? '') === 'leads' ? 'active' : '' ?>">
                    <span class="nav-icon">&#128222;</span> Leads
                </a>
            </li>
        </ul>
    </nav>

    <div class="sidebar-footer">
        Logged in as <strong><?= htmlspecialchars($_SESSION['admin_username'] ?? 'Admin') ?></strong><br>
        <a href="<?= $prefix ?>logout.php">&#x21E5; Logout</a>
    </div>
</aside>

<!-- Main content -->
<div class="main-content">

    <!-- Top bar -->
    <header class="topbar">
        <div class="d-flex align-center gap-2">
            <button class="hamburger" onclick="openSidebar()">&#9776;</button>
            <span class="topbar-title"><?= htmlspecialchars($pageTitle ?? 'Admin') ?></span>
        </div>
        <div class="topbar-right">
            <span><?= date('d M Y') ?></span>
            <span class="admin-badge">Admin</span>
        </div>
    </header>

    <!-- Page body injected here -->
    <div class="page-content">
