<?php

$host = "mysql";
$user = "root";
$pass = "root";
$db   = "honey_store";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Database Connection Failed");
}

?>
