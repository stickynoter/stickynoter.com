<?php
session_start();
$username = $_SESSION['username'];

// db
include("../includes/db.php");

// Checking whether all input variables are in place:
if (!isset($_POST['body'])) {
	die("Did not work");
}

if (ini_get('magic_quotes_gpc')) {
	$_POST['body'] = stripslashes($_POST['body']);
}

// Escaping the input data:
$body = mysql_real_escape_string(strip_tags($_POST['body']));



mysql_query("INSERT INTO marks SET
				text='".htmlspecialchars($body)."',
				username='$username'");

if (mysql_affected_rows($link) == 1) {
	echo mysql_insert_id($link);
			
}
else {
	echo "Did not work at end of mark";
}
