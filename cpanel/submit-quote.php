<?php
header('Content-Type: application/json; charset=utf-8');

function respond($status, $data) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['success' => false, 'message' => 'POST requests only.']);
}

$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > 30000) {
    respond(413, ['success' => false, 'message' => 'Request is too large.']);
}

$input = json_decode($raw, true);
if (!is_array($input)) {
    respond(400, ['success' => false, 'message' => 'Invalid request data.']);
}

$fields = ['name', 'email', 'phone', 'message', 'company', 'country', 'categories', 'quantity', 'botcheck'];
$values = [];
foreach ($fields as $field) {
    $value = $input[$field] ?? '';
    if (!is_string($value)) {
        respond(400, ['success' => false, 'message' => 'Invalid field data.']);
    }
    $values[$field] = trim($value);
}

if ($values['botcheck'] !== '') {
    respond(400, ['success' => false, 'message' => 'Invalid submission.']);
}

if ($values['name'] === '' || $values['message'] === '' || $values['phone'] === '' ||
    !filter_var($values['email'], FILTER_VALIDATE_EMAIL)) {
    respond(422, ['success' => false, 'message' => 'Please check the required fields.']);
}

$submission = [
    'id' => bin2hex(random_bytes(8)),
    'submitted_at' => gmdate('c'),
    'name' => $values['name'],
    'email' => $values['email'],
    'phone' => $values['phone'],
    'company' => $values['company'],
    'country' => $values['country'],
    'categories' => $values['categories'],
    'quantity' => $values['quantity'],
    'message' => $values['message']
];

$dataFile = '/home/prasineint/quote-data/quote-submissions.json';
$handle = fopen($dataFile, 'c+');
if ($handle === false || !flock($handle, LOCK_EX)) {
    respond(500, ['success' => false, 'message' => 'Could not save the submission.']);
}

$existing = stream_get_contents($handle);
$submissions = ($existing === '' || $existing === false) ? [] : json_decode($existing, true);
if (!is_array($submissions)) {
    flock($handle, LOCK_UN);
    fclose($handle);
    respond(500, ['success' => false, 'message' => 'The submissions file is not valid JSON.']);
}

$submissions[] = $submission;
$json = json_encode($submissions, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
if ($json === false) {
    flock($handle, LOCK_UN);
    fclose($handle);
    respond(500, ['success' => false, 'message' => 'Could not encode the submission.']);
}

rewind($handle);
ftruncate($handle, 0);
$written = fwrite($handle, $json);
fflush($handle);
flock($handle, LOCK_UN);
fclose($handle);

if ($written !== strlen($json)) {
    respond(500, ['success' => false, 'message' => 'Could not save the submission.']);
}

respond(200, ['success' => true, 'saved' => true]);
