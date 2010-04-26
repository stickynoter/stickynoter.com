<?php
session_start();
//chache issue fixed.
if (isset($_SESSION['username']) && !(isset($_COOKIE['username']))) {
	$expire = time()+60*60*24*30;
	setcookie("username", $_SESSION['username'], $expire);
	$username = $_SESSION['username'];
}
else{//this else statement fixed the cache issue because otherwise the null value in _cookie was overwriting the username var.
	$_SESSION['username'] = $_COOKIE['username'];
	$username = $_COOKIE['username'];
}

include('includes/db.php');

$username = $_SESSION['username'];
header("Content-Type: application/rss+xml");
header("Content-Type: text/xml");
header("Content-Type: application/xml");
header("Content-Type: application/atom+xml");

print '<?xml version="1.0" encoding="UTF-8" ?>';
print '<rss version="2.0">';

print '<channel>';
print "<title>$username's Stickynotes</title>";
print "<description>This is the notes of  $username that they have chosen for public use.</description>";
print "<link>http://www.stickynoter.com/rss/$username </link>";
print "<lastBuildDate>".date("M, d Y: g a", time())."</lastBuildDate>";
print "<pubDate>".date("M, d Y: g a", time())."</pubDate>";

$get = mysql_query("SELECT * FROM notes WHERE username='$username'");
while ($results = mysql_fetch_array($get)) {
		print "<item>";
		print "<title>Stickynoter Note</title>";
		print "<description>".mysql_escape_string($results['text'])."</description>";
		print "<link>none</link>";
		print "<guid isPermaLink=\"false\">".rand(0, 45738348)."</guid>";
		print "<pubDate>".$results['time']."</pubDate>";
		print "</item>";
}

print "</channel>";
print "</rss>";

?>