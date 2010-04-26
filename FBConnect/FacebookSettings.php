<?php
session_start();

$username= $_SESSION['username'];
// include db
include("../includes/db.php");
$option = mysql_real_escape_string($_GET['option']);

if($_GET['action'] == 'flip'){
	$query = "select $option from users_facebook where username = '$username'";
	//print $query;
	$handle = mysql_query($query);
	
	$value = mysql_fetch_assoc($handle);
	$update = "update users_facebook ";
	$set = "";
	if($value[$option] == "1"){
		$set = "set $option = 0";
	}else{
		$set = "set $option = 1";
	}
	$where = " where username = '$username'";
	$query = $update . $set . $where;
	mysql_query($query);
	//print $query;
	
}
?>