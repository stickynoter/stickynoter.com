<?
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



// include db
include("includes/db.php");
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>stickynoter</title>

<META HTTP-EQUIV="EXPIRES" CONTENT="Thu, 1 Jan 1970 00:00:01 GMT" />
<META HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE" />
<META HTTP-EQUIV="PRAGMAS" CONTENT="NO-CACHE" />


<link rel="stylesheet" type="text/css" href="css/googleCSS.css" />
<link rel="stylesheet" type="text/css" href="css/searchCSS.css" />
<link rel="stylesheet" type="text/css" href="css/styles.css" />
<link rel="stylesheet" type="text/css" href="/fancybox/jquery.fancybox-1.2.6.css" media="screen" />
<link rel="stylesheet" type="text/css" media="screen" href="css/dock-example1.css" />
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.0/jquery.min.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js"></script>
<!--<script type="text/javascript" src="http://www.google.com/jsapi?key=ABQIAAAAm13OU4FOLNtVi43IMpFSLhRBFeWkDduMAgYjRXYQTmto1B_ZPRS0LqOKkij386CTJihamlHc4JTcQg"></script>-->
<script type="text/javascript" src="fancybox/jquery.fancybox-1.2.6.pack.js"></script>
<script type="text/javascript" src="js/fisheye-iutil.min.js"></script>
<script type="text/javascript" src="js/dock-example1.js"></script>
<script type="text/javascript" src="js/script.js"></script>
<script type="text/javascript" src="js/GoogleJS.js"></script>
<script type="text/javascript" src="js/OnLoad.js"></script>
</head>

<body>

<div id="header">
	<div class="container">
    	<div id="menu">
	       <ul>
            <?
            if ($username) {
				include('menu.user.php');
			} else {
				echo '
				<li><a id="createUser" href="create_user.html">Sign Up</a></li>
				<li><a id="userLogin" href="login_user.html">Login</a></lI>
				';
			}
			?>
            </ul>
    	</div>
	<h1><a href="http://www.stickynoter.com">stickynoter</a></h1>
    </div>
</div>

<div id="main">




	<?
	if (!(empty($username))) {
		include("board.php");			
	} else {
		include("welcome.php");	
	}
    ?>
</div>

	<!--  <div id="fblogon" style="padding:0px 4px;float:left;"><fb:login-button onlogin="this.parentNode.parentNode.removeChild(this.parentNode);"></fb:login-button></div>-->
<div id="footer">
 			
<div class="container">
<div id="dock">
     <?
            if ($username) {
           	echo '

          	<div id="webresultscontainer" style="display:none;">
           		<div id="results">
           			<div id="webresults" class="cse"></div>
           		</div>
       		</div>
			<a id="LaunchFancyBox" style="display:none;" href="./blank.html">Launch Fancybox</a>
			<div class="cse">
				<div id="content">
					<img src="./FBConnect/lib/images/loader.gif" alt="Loading"/>
				</div>
			</div> 
			
			';
			include('footer.user.php');
			} else {
				echo '
				<div id="dock"><div id="copyright">Copyright 2010 Stickynoter</div>
				 				 <div class="dock-container">
								 </div>
				';
			}
			?>
			</div>  
	</div>	         

	</div>


<!--Needed for Facebook Connect-->
<?
if (!(empty($username))) {
		print "<script src=\"http://static.ak.connect.facebook.com/js/api_lib/v0.4/FeatureLoader.js.php\" type=\"text/javascript\"></script>".
				"<script type=\"text/javascript\">".
					  "function loggedIn(){  var FacebookLoggedOn = true; var logon = document.getElementById('fblogon'); logon.parentNode.removeChild(logon); }".
					  "function loggedOut(){  var FacebookLoggedOn = false; }".
					  "FB.init(\"303ad0f99d69ce526c3dfa5f281ee6da\", \"http://www.stickynoter.com/xd_receiver.htm\",{".
					  	"\"ifUserConnected\": loggedIn,".
						"\"ifUserNotConnected\":loggedOut".
					  "});".
				"</script>";
	} 
?>

</body>
</html>
