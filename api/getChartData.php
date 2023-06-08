<?php
header('Content-Type: application/json');

$env = parse_ini_file(__DIR__ . '/../config/.env');
$servername = $env['DB_HOST'];
$dbname   = $env['DB_DATABASE'];
$username = $env['DB_USERNAME'];
$password = $env['DB_PASSWORD'];

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
