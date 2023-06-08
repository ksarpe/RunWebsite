<?php
header('Content-Type: application/json');

$env = parse_ini_file(__DIR__ . '/../config/.env');
$servername = $env['DB_HOST'];
$dbname   = $env['DB_DATABASE'];
$username = $env['DB_USERNAME'];
$password = $env['DB_PASSWORD'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Define your SQL query here
$sql = "SELECT * FROM runs"; // Replace with your actual SQL query

$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
  // Output data of each row
  while($row = $result->fetch_assoc()) {
    array_push($data, $row);
  }
}

echo json_encode($data);

$conn->close();
?>
