<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://www.facebook.com/2008/fbml">
<head>
	<title>Facebook Test</title>
</head>
<body>
	<div id="login">
		<div><fb:login-button onlogin="window.location = '.';"></fb:login-button></div>
	</div>
	<?php
		//include("./FacebookNotes.php"); 
		include("./FacebookEvents.php");
	?>
</body>
</html>
