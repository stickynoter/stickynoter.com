<?php
session_start();
// db
include("../includes/db.php");

// If magic_quotes setting is on, strip the leading slashes that are automatically added to the string:
$username = stripslashes($_POST['username']);
$password = stripslashes($_POST['password']);

if (!$username || !$password) {
	echo "no";	
	die();
}

// make sure password is correct
$getPass = mysql_query("SELECT password AS realPass FROM users WHERE username='$username' LIMIT 1");
$getPass = mysql_fetch_array($getPass);
$realPass = $getPass['realPass'];

if ($realPass == $password) {
	// set user cookie
	$_SESSION['username'] = $username;	
	echo $username;
} else {
	echo "no";
	die();
}
?>