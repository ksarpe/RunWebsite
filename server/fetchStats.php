<?php
header('Content-Type: application/json');

// Database credentials
$servername = "hosting2385319.online.pro";
$username = "00896778_amdin";
$password = "Omoplata999@";
$dbname = "00896778_amdin";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Define your SQL query here
$sql = "SELECT * FROM run_data"; // Replace with your actual SQL query

$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
  // Output data of each row
  while($row = $result->fetch_assoc()) {
    array_push($data, $row);
  }
} else {
  echo "0 results";
}

echo json_encode($data);

$conn->close();
?>
