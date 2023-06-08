<?php

header('Content-Type: application/json');

// Database credentials
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

// Query to get the total calories
$caloriesSql = "SELECT SUM(calories) as calories FROM runs";
$caloriesResult = $conn->query($caloriesSql);
$calories = $caloriesResult->fetch_assoc()['calories'] ?? '0'; // Default value is '0'

// Latest weight
$lastDaySql = "SELECT weight FROM weight";
$lastDayResult = $conn->query($lastDaySql);
$weight = $lastDayResult->fetch_assoc()['weight'] ?? '0'; // Default value is '0'


$data = array(
  'runs' => $runs,
  'bestTime' => $bestTime,
  'averageTime' => $avgTime,
  'calories' => $calories,
  'weight' => $weight,
);

echo json_encode($data);

$conn->close();
?>
