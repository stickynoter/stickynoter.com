<?
session_start();
$expire = time()+60*60*24*30;
setcookie("username", "", $expire);
$_SESSION['username'] = "";

header("Location: http://www.stickynoter.com");