<?php
/**
 * DigionTop — Contact Form API Endpoint
 *
 * Accepts POST requests from the Vercel frontend contact form.
 * Validates, saves to DB, sends email notification, returns JSON.
 *
 * URL: https://yourdomain.com/admin/api/contact.php
 */

// ---- CORS headers for Vercel / external origins -------------------------
$allowedOrigins = [
    'https://www.digiontop.com',
    'https://digiontop.com',
    'https://digiontop.vercel.app',
    // Add staging / preview URLs here:
    // 'https://digiontop-git-main-yourusername.vercel.app',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} else {
    // During local dev, allow all — tighten for production
    header('Access-Control-Allow-Origin: *');
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
header('Access-Control-Max-Age: 86400');
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// ---- Handle preflight ---------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ---- Only accept POST ---------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// ---- Parse JSON body or fall back to $_POST ----------------------------
$raw  = file_get_contents('php://input');
$json = $raw ? json_decode($raw, true) : null;
$data = is_array($json) ? $json : $_POST;

// ---- Rate-limit: simple session-based throttle -------------------------
// (For production, consider Redis / DB-based rate-limiting per IP)
session_start(['cookie_httponly' => true]);
$now        = time();
$windowSecs = 300; // 5-minute window
$maxPerWin  = 3;

if (!isset($_SESSION['contact_submissions'])) {
    $_SESSION['contact_submissions'] = [];
}
// Remove entries older than the window
$_SESSION['contact_submissions'] = array_filter(
    $_SESSION['contact_submissions'],
    fn($t) => ($now - $t) < $windowSecs
);
if (count($_SESSION['contact_submissions']) >= $maxPerWin) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Too many requests. Please try again in a few minutes.']);
    exit;
}

// ---- Helper functions --------------------------------------------------
function sanitize(string $value, int $maxLen = 500): string {
    return mb_substr(strip_tags(trim($value)), 0, $maxLen);
}

function respond(bool $success, string $message, int $httpCode = 200): void {
    http_response_code($httpCode);
    echo json_encode(['success' => $success, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

// ---- Extract & sanitize fields -----------------------------------------
$fullName    = sanitize($data['full_name']          ?? $data['name']    ?? '', 150);
$businessName= sanitize($data['business_name']      ?? $data['company'] ?? '', 200);
$email       = sanitize($data['email']              ?? '', 200);
$phone       = sanitize($data['phone']              ?? '', 30);
$service     = sanitize($data['service_interested'] ?? $data['service'] ?? '', 150);
$budget      = sanitize($data['budget_range']       ?? $data['budget']  ?? '', 80);
$message_text= sanitize($data['message']            ?? '', 2000);
$source      = sanitize($data['source']             ?? 'website', 100);

// Honeypot anti-spam field (hidden field — bots fill it, humans don't)
$honeypot = $data['website_url'] ?? $data['_hp'] ?? '';
if (!empty($honeypot)) {
    // Silently succeed to fool bots
    respond(true, 'Thank you! We will be in touch shortly.');
}

// ---- Validation --------------------------------------------------------
$errors = [];

if (empty($fullName)) {
    $errors[] = 'Full name is required.';
}
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid email address is required.';
}
if (empty($message_text) && empty($service)) {
    $errors[] = 'Please provide a message or select a service.';
}

if (!empty($errors)) {
    respond(false, implode(' ', $errors), 422);
}

// ---- Save to database --------------------------------------------------
$dbFile = dirname(__DIR__) . '/config/database.php';
if (!file_exists($dbFile)) {
    error_log('[DigionTop] database.php not found at: ' . $dbFile);
    respond(false, 'Server configuration error. Please contact us directly.', 500);
}
require_once $dbFile;

try {
    $stmt = $pdo->prepare(
        "INSERT INTO contact_leads
            (full_name, business_name, email, phone, service_interested, budget_range, message, source, status)
         VALUES
            (:full_name, :business_name, :email, :phone, :service, :budget, :message, :source, 'new')"
    );
    $stmt->execute([
        ':full_name'     => $fullName,
        ':business_name' => $businessName,
        ':email'         => $email,
        ':phone'         => $phone,
        ':service'       => $service,
        ':budget'        => $budget,
        ':message'       => $message_text,
        ':source'        => $source,
    ]);
    $leadId = (int) $pdo->lastInsertId();
} catch (PDOException $e) {
    error_log('[DigionTop Contact API] DB error: ' . $e->getMessage());
    respond(false, 'We could not save your submission. Please email us directly.', 500);
}

// ---- Log this submission for rate-limiting ------------------------------
$_SESSION['contact_submissions'][] = $now;

// ---- Send email notification -------------------------------------------
$adminEmail    = 'social.marketing@salarytopup.com';   // change to your real address
$notifySubject = 'New Lead #' . $leadId . ' from DigionTop Website';

$notifyBody = "A new lead has been submitted on DigionTop.com\n\n";
$notifyBody .= "Lead ID       : #{$leadId}\n";
$notifyBody .= "Name          : {$fullName}\n";
if ($businessName) $notifyBody .= "Business      : {$businessName}\n";
$notifyBody .= "Email         : {$email}\n";
if ($phone)        $notifyBody .= "Phone         : {$phone}\n";
if ($service)      $notifyBody .= "Service       : {$service}\n";
if ($budget)       $notifyBody .= "Budget Range  : {$budget}\n";
if ($message_text) $notifyBody .= "\nMessage:\n{$message_text}\n";
$notifyBody .= "\nSource        : {$source}";
$notifyBody .= "\nSubmitted     : " . date('d M Y H:i:s T');
$notifyBody .= "\n\n-- View all leads in the admin panel.";

$headers  = "From: no-reply@digiontop.com\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

@mail($adminEmail, $notifySubject, $notifyBody, $headers);

// ---- Auto-reply to the lead --------------------------------------------
$replySubject = 'Thank you for contacting DigionTop!';
$replyBody    = "Hi {$fullName},\n\n";
$replyBody   .= "Thank you for reaching out to DigionTop! We have received your enquiry";
if ($service) $replyBody .= " about {$service}";
$replyBody   .= " and our team will get back to you within 24 hours.\n\n";
$replyBody   .= "In the meantime, feel free to explore our services and case studies at https://www.digiontop.com\n\n";
$replyBody   .= "Best regards,\n";
$replyBody   .= "The DigionTop Team\n";
$replyBody   .= "https://www.digiontop.com\n";

$replyHeaders  = "From: DigionTop <no-reply@digiontop.com>\r\n";
$replyHeaders .= "Reply-To: social.marketing@salarytopup.com\r\n";
$replyHeaders .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$replyHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";

@mail($email, $replySubject, $replyBody, $replyHeaders);

// ---- Success response --------------------------------------------------
respond(true, 'Thank you! We have received your message and will be in touch within 24 hours.');
