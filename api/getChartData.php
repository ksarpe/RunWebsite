<?php
header('Content-Type: application/json');

$servername = "hosting2385319.online.pro";
$username = "00896778_amdin";
$password = "Omoplata999@";
$dbname = "00896778_amdin";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT day, time FROM runs";
$result = $conn->query($sql);

$runs = array();

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    array_push($runs, array('day' => $row['day'], 'time' => $row['time']));
  }
}

echo json_encode($runs);

$conn->close();
?>
