<?php
$files = scandir('uploads/');
unset($files[0]); // Remove '.'
unset($files[1]); // Remove '..'

header('Content-Type: application/json');
echo json_encode(['files' => $files]);
?>