<?php
// download.php

$filename = $_POST['filename'];
$filepath = "uploads/" . $filename;

if (file_exists($filepath)) {
  header('Content-Description: File Transfer');
  header('Content-Disposition: attachment; filename="'.basename($filepath).'"');
  header('Expires: 0');
  header('Cache-Control: must-revalidate');
  header('Pragma: public');
  header('Content-Length: ' . filesize($filepath));
  readfile($filepath);
  exit;
} else {
  echo "File not found.";
}
?>