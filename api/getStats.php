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

// Query to get the number of runs
$runsSql = "SELECT COUNT(*) as runs FROM runs";
$runsResult = $conn->query($runsSql);
$runs = $runsResult->fetch_assoc()['runs'] ?? '0'; // Default value is '0'

// Query to get the best time
$bestTimeSql = "SELECT MIN(time) as bestTime FROM runs";
$bestTimeResult = $conn->query($bestTimeSql);
$bestTime = $bestTimeResult->fetch_assoc()['bestTime'] ?? '00:00:00'; // Default value is 'N/A'

// Query to get the average time
$avgTimeSql = "SELECT SEC_TO_TIME(AVG(TIME_TO_SEC(time))) as avgTime FROM runs";
$avgTimeResult = $conn->query($avgTimeSql);
$avgTime = $avgTimeResult->fetch_assoc()['avgTime'] ?? '00:00:00'; // Default value is 'N/A'

$data = array(
  'runs' => $runs,
  'bestTime' => $bestTime,
  'averageTime' => $avgTime
);

echo json_encode($data);

$conn->close();
?>
