<?
session_start();
if (empty($_COOKIE['username']) && !(empty($useranme))) {
	setcookie("username", $username, time()+31536000);
}
if (empty($_SESSION['username']) && !(empty($_COOKIE['username']))) {
	$_SESSION['username'] = $_COOKIE['username'];
}
$username = $_SESSION['username'];
// include db
include("includes/db.php");

// get action
$action = $_GET['action'];
if ($action == "updateChat") {
	// get chat messages
	$chatMessages = mysql_query("SELECT * FROM chat ORDER BY id DESC LIMIT 50");
	while ($chatMessagesResults = mysql_fetch_array($chatMessages)) {
		// chat message info	
		$chat_username = $chatMessagesResults['username'];
		$chat_messsage = $chatMessagesResults['message'];
		$chat_time = date("g:i:sa", strtotime($chatMessagesResults['time']));
		
		echo '
		<strong>'.$chat_username.'</strong> ('.$chat_time.'): '.$chat_messsage.'
		<br />
		';
	}
	die();
} 

if ($action == "post") {
	// post chat info
	$message = htmlspecialchars(strip_tags($_POST['message']));
	
	mysql_query("INSERT INTO chat SET
		id='',
		username='$username',
		message='$message'");
	
	die();
}
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>stickynoter - development chat</title>

<link rel="stylesheet" type="text/css" href="/css/styles.css" />
<link rel="stylesheet" type="text/css" href="/fancybox/jquery.fancybox-1.2.6.css" media="screen" />

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.0/jquery.min.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js"></script>
<script type="text/javascript" src="/fancybox/jquery.fancybox-1.2.6.pack.js"></script>

<script type="text/javascript" src="js/script.js"></script>
<script type="text/javascript">
function updateChat() {
	$.post('chat.php?action=updateChat', {}, function(data) {
		$('#chatBox').html(data);
	});
	setTimeout('updateChat()', 1000);
}

$(function() {
	updateChat();
	$('#submit').attr('disabled', true);
	$('#message').focus();
	
	$('#message').keypress(function() {
		$('#submit').removeAttr('disabled');						  
	});
	
	$('#submit').submit(function() {
		if (jQuery.trim($('#message').val()) == "") {
			return false;
		}
		$.post('chat.php?action=post', {
			message : $('#message').val(),
			success : function(data) {
				$('#chatBox').html(data);
				$('#message').val("");
				$('#message').focus();
			}
		});
		return false;
	});	
});
</script>

<style type="text/css">
#chatWrapper {
	width: 1000px;
	min-height: 500px;
	background-color:#FDFB8C;
	border:1px solid #DEDC65;
	margin: 20px 0;
}

#chatBox {
	height: 450px;
	padding: 15px;
	overflow: scroll;
	overflow-x: hidden;
}

#chatControls {
	display: table;
	margin: 15px;
	padding: 10px;
	background-color:#f0f0f0;
	border:1px solid #f0f0f0;
	
	-moz-box-shadow:2px 2px 0 #DDDDDD;
	-webkit-box-shadow:2px 2px 0 #DDDDDD;
	box-shadow:2px 2px 0 #DDDDDD;
}

#message {
	height: auto;
	width: auto;
	border: 1px solid #333;
}

input[type=text] {
	background-color:#FCFCFC;
	border:1px solid #AAAAAA;
	float: left;
	margin: 0 5px 0 0;
	padding: 5px;
	width: 300px;
}
</style>

</head>

<body>

<div id="header">
	<div class="container">
    	<div id="menu">
        	<ul>
            <?
            if ($username) {
				echo '
				<li>Hello <strong>'. $username .'</strong></li>
				<li><a href="http://www.stickynoter.com">Board</a></li>
				<li><a href="logout.php">Logout</a></li>
				';
			} else {
				echo '
				<li><a id="createUser" href="create_user.html">Sign Up</a></li>
				<li><a id="userLogin" href="login_user.html">Login</a></lI>
				';
			}
			?>
            	<li><a id="stats" href="stats.php">Stats</a></li>
            </ul>
    	</div>
	<h1><a href="http://www.stickynoter.com">stickynoter</a></h1>
    </div>
</div>
   
<div id="main">
	<h2>stickynoter development chat</h2>
    questions/comments appreciated
    
    <div id="chatWrapper">
    <?
	if ($username) {
		
		echo '
		<form action="" id="submit">
			<div id="chatBox">
			loading chat...
			</div>
			<div id="chatControls">
			<input type="text" id="message" name="message" size="100" />
			<!-- <input type="submit" name="submit" value="post message" />-->
			</div>
		</form>
		';
	} else {
		echo 'You must be logged in to participate in our development chat.';	
	}
	?>
    </div>
</div>

<div id="footer">
	<div class="container">
    	<div id="homepage">
        Make us your homepage
        </div>
	Copyright wwww.stickynoter.com
	</div>
</div>


</body>
</html>
