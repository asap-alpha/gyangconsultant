<?php
/**
 * Contact-form endpoint for Hostinger (PHP). Receives the JSON enquiry posted by
 * src/composables/contactForm.ts and emails it to the company inbox.
 */
declare(strict_types=1);

const TO = 'info@gyangcorporateconsult.com';
const FROM = 'info@gyangcorporateconsult.com'; // must be a mailbox on this domain or the host rejects it
const MAX_PER_HOUR = 5;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

$raw = file_get_contents('php://input', false, null, 0, 20000);
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    respond(400, ['ok' => false, 'error' => 'Invalid request']);
}

$field = static function (string $key, int $max) use ($data): string {
    $v = $data[$key] ?? '';
    return is_string($v) ? mb_substr(trim($v), 0, $max) : '';
};
$oneLine = static fn (string $s): string => preg_replace('/[\r\n]+/', ' ', $s) ?? '';

// Honeypot: pretend success so bots learn nothing
if ($field('website', 200) !== '') {
    respond(200, ['ok' => true]);
}

$name = $oneLine($field('name', 120));
$organisation = $oneLine($field('organisation', 160));
$email = $field('email', 200);
$phone = $oneLine($field('phone', 40));
$service = $oneLine($field('service', 160));
$message = $field('message', 5000);

$errors = [];
if (mb_strlen($name) < 2) $errors['name'] = 'Enter your full name.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Enter a valid email address.';
if ($phone !== '' && !preg_match('/^\+?[\d\s()-]{7,20}$/', $phone)) $errors['phone'] = 'Enter a valid phone number.';
if (mb_strlen($message) < 10) $errors['message'] = 'Tell us briefly how we can help.';
if ($errors) {
    respond(422, ['ok' => false, 'errors' => $errors]);
}

// Simple per-IP rate limit
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$bucket = sys_get_temp_dir() . '/gcc-enquiry-' . hash('sha256', $ip);
$now = time();
$hits = array_filter(
    array_map('intval', @file($bucket, FILE_IGNORE_NEW_LINES) ?: []),
    static fn (int $t): bool => $t > $now - 3600,
);
if (count($hits) >= MAX_PER_HOUR) {
    respond(429, ['ok' => false, 'error' => 'Too many enquiries. Please try again later.']);
}
$hits[] = $now;
@file_put_contents($bucket, implode("\n", $hits), LOCK_EX);

$subject = 'Website enquiry' . ($service !== '' ? ": $service" : '') . " — $name";
$lines = array_filter([
    'Name' => $name,
    'Organisation' => $organisation,
    'Email' => $email,
    'Phone' => $phone,
    'Service of interest' => $service,
], static fn (string $v): bool => $v !== '');
$body = '';
foreach ($lines as $k => $v) {
    $body .= "$k: $v\n";
}
$body .= "\n$message\n\n--\nSent from the contact form at https://gyangcorporateconsult.com\n";

$headers = implode("\r\n", [
    'From: Gyang Corporate Consult Website <' . FROM . '>',
    'Reply-To: ' . mb_encode_mimeheader($name, 'UTF-8') . " <$email>",
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

$sent = mail(TO, mb_encode_mimeheader($subject, 'UTF-8'), $body, $headers, '-f' . FROM);

if (!$sent) {
    error_log('contact.php: mail() failed');
    respond(502, ['ok' => false, 'error' => 'Could not send right now.']);
}
respond(200, ['ok' => true]);
