<?php
session_start();
$username = $_SESSION['username'];

// db
include("../includes/db.php");

// Checking whether all input variables are in place:
if (!is_numeric($_POST['zindex']) || !isset($_POST['body']) || !in_array($_POST['color'], array('yellow','green','blue','pink','facebook'))) {
	die("Did not work");
}

if (ini_get('magic_quotes_gpc')) {
	$_POST['body'] = stripslashes($_POST['body']);
}

// Escaping the input data:
$body = mysql_real_escape_string(strip_tags($_POST['body']));
$color = mysql_real_escape_string($_POST['color']);
$zindex = (int)$_POST['zindex'];

$randomX = rand(1,800);
$randomY = rand(1,300);
$xyz = $randomX.'x'.$randomY.'x'.$zindex;

mysql_query("INSERT INTO notes SET
				id='',
				text='".htmlspecialchars($body)."',
				username='$username',
				color='$color',
				xyz='$xyz'");

if (mysql_affected_rows($link) == 1) {
	echo mysql_insert_id($link);
			//Facebook Stuff
			$handle = mysql_query("select post_to,birthday,events from users_facebook where username = '$username'");
			$fbSettings = mysql_fetch_assoc($handle);
					include_once '../FBConnect/facebook-platform/php/facebook.php';
					// some basic library functions
					include_once '../FBConnect/facebook-platform/footprints/lib.php';
					// this defines some of your basic setup
					include_once '../FBConnect/facebook-platform/footprints/config.php';
					
					$facebook = new Facebook($api_key, $secret);
					try{
						$notePermission = $facebook->api_client->users_hasAppPermission('create_note','');
					}catch(Exception $ex){
						$notePermission = "0";
					}
			if(($fbSettings['post_to'] == "1")&&($notePermission == "1")){
				if(!isset($_POST['imported'])){
					$appuser = $facebook->api_client->users_getLoggedInUser();
					$title = "Created @ Stickynoter.com on ".date("F j g:i a");
					$facebook->api_client->notes_create($title, $body, $appuser);
				}
			}
			//End Facebook Stuff
}
else {
	echo "Did not work";
}
