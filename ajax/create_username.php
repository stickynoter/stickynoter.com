<?php
session_start();
// db
include("../includes/db.php");

// If magic_quotes setting is on, strip the leading slashes that are automatically added to the string:
$username = stripslashes($_POST['username']);
$password = stripslashes($_POST['password']);

// if nothing was submitted
if (!$username || !$password) {
	die("no");	
}

// make sure username is not taken
$checkUsername = mysql_query("SELECT * FROM users WHERE username='$username' LIMIT 1");
$there = mysql_num_rows($checkUsername);

if ($there != 0) {
	die("no");	
}

// create user
mysql_query("INSERT INTO users SET
					id='',
					username='$username',
					password='$password'");
mysql_query("insert into users_facebook (username) values ('$username')");

$_SESSION['username'] = $username;

echo $username;
?>