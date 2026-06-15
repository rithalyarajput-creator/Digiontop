-- ============================================================
-- DigionTop Admin Panel — Database Installation Script
-- Run this once to create all required tables.
-- Compatible with MySQL 5.7+ / MariaDB 10.3+
-- ============================================================

-- Create & select the database
CREATE DATABASE IF NOT EXISTS `digiontop_db`
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE `digiontop_db`;

-- ------------------------------------------------------------
-- 1. admin_users
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_users` (
    `id`         INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    `username`   VARCHAR(80)     NOT NULL UNIQUE,
    `password`   VARCHAR(255)    NOT NULL COMMENT 'bcrypt hash',
    `created_at` DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed the default admin account
-- Password: DigiOnTop@2025!  (bcrypt, cost=12)
INSERT IGNORE INTO `admin_users` (`username`, `password`)
VALUES (
    'digiontop_admin',
    '$2y$12$YQv8z1H9KpL3mN0xR4wJiOQ7bT2uV5sA6dC8eF1gH3jK4lM5nO6pQ'
);

-- ------------------------------------------------------------
-- 2. blog_posts
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `blog_posts` (
    `id`          INT UNSIGNED     NOT NULL AUTO_INCREMENT,
    `title`       VARCHAR(255)     NOT NULL,
    `slug`        VARCHAR(255)     NOT NULL UNIQUE,
    `excerpt`     TEXT             NULL,
    `content`     LONGTEXT         NOT NULL,
    `category`    VARCHAR(100)     NOT NULL DEFAULT 'General',
    `image_url`   VARCHAR(500)     NULL,
    `status`      ENUM('draft','published') NOT NULL DEFAULT 'draft',
    `created_at`  DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP
                                   ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_status`   (`status`),
    INDEX `idx_category` (`category`),
    INDEX `idx_slug`     (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 3. contact_leads
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `contact_leads` (
    `id`                 INT UNSIGNED   NOT NULL AUTO_INCREMENT,
    `full_name`          VARCHAR(150)   NOT NULL,
    `business_name`      VARCHAR(200)   NULL,
    `email`              VARCHAR(200)   NOT NULL,
    `phone`              VARCHAR(30)    NULL,
    `service_interested` VARCHAR(150)   NULL,
    `budget_range`       VARCHAR(80)    NULL,
    `message`            TEXT           NULL,
    `source`             VARCHAR(100)   NULL DEFAULT 'website',
    `status`             ENUM('new','contacted','converted','closed')
                                        NOT NULL DEFAULT 'new',
    `created_at`         DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_status`      (`status`),
    INDEX `idx_email`       (`email`),
    INDEX `idx_created_at`  (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 4. testimonials
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `testimonials` (
    `id`               INT UNSIGNED   NOT NULL AUTO_INCREMENT,
    `client_name`      VARCHAR(150)   NOT NULL,
    `client_role`      VARCHAR(150)   NULL,
    `client_location`  VARCHAR(150)   NULL,
    `testimonial_text` TEXT           NOT NULL,
    `rating`           TINYINT        NOT NULL DEFAULT 5
                                      COMMENT '1-5 stars',
    `is_featured`      TINYINT(1)     NOT NULL DEFAULT 0,
    `created_at`       DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_featured` (`is_featured`),
    INDEX `idx_rating`   (`rating`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 5. portfolio_items
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio_items` (
    `id`          INT UNSIGNED   NOT NULL AUTO_INCREMENT,
    `title`       VARCHAR(255)   NOT NULL,
    `category`    VARCHAR(100)   NOT NULL DEFAULT 'General',
    `description` TEXT           NULL,
    `image_url`   VARCHAR(500)   NULL,
    `client_name` VARCHAR(150)   NULL,
    `results`     TEXT           NULL COMMENT 'Key results / metrics achieved',
    `is_featured` TINYINT(1)     NOT NULL DEFAULT 0,
    `created_at`  DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `idx_category` (`category`),
    INDEX `idx_featured` (`is_featured`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
