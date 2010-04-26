<?
session_start();

$username= $_SESSION['username'];
// include db
include("includes/db.php");

include_once './FBConnect/facebook-platform/php/facebook.php';
// some basic library functions
include_once './FBConnect/facebook-platform/footprints/lib.php';
// this defines some of your basic setup
include_once './FBConnect/facebook-platform/footprints/config.php';

$facebook = new Facebook($api_key, $secret);
$loggedon = false;
try{
$notePermission = $facebook->api_client->users_hasAppPermission('create_note','');
$loggedon = true;
}catch(Exception $e){
$notePermission = '0';
}

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>stickynoter - profile</title>

<META HTTP-EQUIV="EXPIRES" CONTENT="Thu, 1 Jan 1970 00:00:01 GMT" />
<META HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE" />
<META HTTP-EQUIV="PRAGMAS" CONTENT="NO-CACHE" />


<link type="text/css" href="./themes/base/ui.all.css" rel="stylesheet" />
<link rel="stylesheet" type="text/css" href="css/googleCSS.css" />
<link rel="stylesheet" type="text/css" href="css/searchCSS.css" />
<link rel="stylesheet" type="text/css" href="css/styles.css" />
<link rel="stylesheet" type="text/css" href="/fancybox/jquery.fancybox-1.2.6.css" media="screen" />
<link rel="stylesheet" type="text/css" media="screen" href="css/dock-example1.css" />
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.0/jquery.min.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js"></script>
<script type="text/javascript" src="fancybox/jquery.fancybox-1.2.6.pack.js"></script>
<script type="text/javascript" src="js/fisheye-iutil.min.js"></script>
<script type="text/javascript" src="js/dock-example1.js"></script>
<script type="text/javascript" src="js/script.js"></script>
<script type="text/javascript" src="js/share.js"></script>
<script type="text/javascript" src="js/GoogleJS.js"></script>
<script type="text/javascript" src="js/OnLoad.js"></script>
<script type="text/javascript" language="JavaScript" src="./FBConnect/lib/Groove.js"></script>
<script type="text/javascript" language="JavaScript">
	function main(){
		document.getElementById("post_to").onclick = function(){
			var post_to = {
						checkboxDiv: null,
						location:"./FBConnect/FacebookSettings.php?action=flip&option=",
						init: function(){
							this.checkboxDiv.firstChild.style.display = "none";
							this.checkboxDiv.childNodes[1].style.display = "inline";
							
						},
						exec: function(){
							this.checkboxDiv.firstChild.style.display = "inline-block";
							this.checkboxDiv.childNodes[1].style.display = "none";
						},
						working: function(){},
						error : function(){}
			}
			post_to.checkboxDiv = this.parentNode;
			post_to.location += this.id;
			<?php 
			
			//if($notePermission == "1"){
				print "Groove.Request.Get(post_to);";
			//}
			
			?>
			
		};
		document.getElementById("birthday").onclick = function(){
			var birthday = {
						checkboxDiv: null,
						location:"./FBConnect/FacebookSettings.php?action=flip&option=",
						init: function(){
							this.checkboxDiv.firstChild.style.display = "none";
							this.checkboxDiv.childNodes[1].style.display = "inline";
							
						},
						exec: function(){
							this.checkboxDiv.firstChild.style.display = "inline-block";
							this.checkboxDiv.childNodes[1].style.display = "none";
						},
						working: function(){},
						error : function(){}
			}
			birthday.checkboxDiv = this.parentNode;
			birthday.location += this.id;
			Groove.Request.Get(birthday);
		};
		document.getElementById("events").onclick = function(){
			var events = {
						checkboxDiv: null,
						location:"./FBConnect/FacebookSettings.php?action=flip&option=",
						init: function(){
							this.checkboxDiv.firstChild.style.display = "none";
							this.checkboxDiv.childNodes[1].style.display = "inline";
							
						},
						exec: function(){
							this.checkboxDiv.firstChild.style.display = "inline-block";
							this.checkboxDiv.childNodes[1].style.display = "none";
						},
						working: function(){},
						error : function(){}
			}
			events.checkboxDiv = this.parentNode;
			events.location += this.id;
			Groove.Request.Get(events);
		};
	}
</script>
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
	?>
	<div class="profileSection">
		<h2>Stickynoter Application Settings</h2>
	</div>
	<div id="accordionRocks">
		<h4><a href="#" class="pad">Stickynoter Settings</a></h4>
		<div>
			<div class="profileSub">
				<p>
					Username: <?php print $username ?>
				</p>
			</div>
		</div>
        
        <h4><a href="#" class="pad">Share Settings</a></h4>
		<div>
			<div class="profileSub" style="min-height: 100px">
				<p>
					<div style="float: right; margin-left: 10px; width: 200px; display: table">
                    <ul id="friendList" style="display: table;">
                    <?
					$getFriends = mysql_query("SELECT * FROM friends WHERE username='$username'");
					while ($getFriendsResults = mysql_fetch_array($getFriends)) {
						// friend info
						$friend_id = $getFriendsResults['id'];
						$friend_user = $getFriendsResults['friend'];
						
						echo '
						<li>'.$friend_user.' (<a href="#" title="'.$friend_id.'">delete</a>)</li>
						';
					}
					
					if (!$friend_id) {
						echo '<span id="noFriends">You have not shared your profile with anyone yet.</a>';
					}
					?>
                    </ul>
                    </div>
                    
                    Enter a user to share your profile with: 
                    <input type="text" id="addedFriend" size="30" />
                    <input type="button" id="addFriend" value="Add!" />
                    <div id="addedResults"></div>
				</p>
			</div>
		</div>
		<h4><a href="#" class="pad">Dock Settings</a></h4>
		<div>
			<div class="profileSub" style="min-height: 100px">
					<p>
						Bookmark Dock Entrys:
						<div style=" margin-left: 30px; display: table">
	                    <ul id="docklist" style="display: table;list-style-type:none;">
	                    <?
						$items =false;
						$getDock = mysql_query("SELECT * FROM marks WHERE username='$username'");
						while ($getDockResults = mysql_fetch_array($getDock)) {
							// friend info
							$dock_id = $getDockResults['id'];
							$dock_url = $getDockResults['text'];
							
							echo '
							<li>'.$dock_url.' (<a href="#" title="'.$dock_id.'">delete</a>)</li>
							';
							$items = true;
						}
				
						if (!$items){
							echo '<span id="noFriends">You have not added any bookmarks to your dock yet.</a>';
						}
						?>
	                    </ul>
	                    </div>
					</p>
			</div>
		</div>
		<!--Facebook Settings-->
		<h4><a href="#" class="pad">Facebook Settings</a></h4>
		<div>
		<?php 
		//get settings in db..
		$handle = mysql_query("select post_to,birthday,events from users_facebook where username = '$username'");
		$fbSettings = mysql_fetch_assoc($handle);
		
		//print settings
			print '<div id="fblogon" class="profileSub">
					  <h5>Login to Facebook:</h5>
					  <p>
					  <a href="#" onclick="FB.Connect.requireSession(); return false;" class="fbconnect_login_button FBConnectButton FBConnectButton_Small">
					  		<span id="RES_ID_fb_login_text" class="FBConnectButton_Text">Login to Facebook</span>
					  	</a>
					  </p>
				</div>';			
			print '<div id="fboptions" class="profileSub">
						<h5 class="pad">Facebook Options:</h5>
						<p>
						
								<p><input id="post_to" type="checkbox" name="post_to" ';
								if($notePermission == "0"){
									print " disabled='' ";
								}
								if($fbSettings['post_to'] == "1"){
									print "checked='checked'";
								}
								print '
								 /><img src="./FBConnect/lib/images/loader.gif" style="display:none;" /> Enable Stickynoter to Post Stickynotes to Facebook<span class="subscript">(1)</span></p>
								<p><input id="birthday" type="checkbox" name="bdays" ';
								//if($loggedon){
								//	print " disabled='' ";
								//}
								if($fbSettings['birthday'] == "1"){
									print "checked='checked'";
								}
								print '
								/><img src="./FBConnect/lib/images/loader.gif" style="display:none;" /> Enable Facebook Friends Birthday Reminders<span class="subscript">(2)</span></p>
								<p><input id="events" type="checkbox" name="events" ';
								//if($loggedon){
								//	print " disabled='' ";
								//}
								if($fbSettings['events'] == "1"){
									print "checked='checked'";
								}
								print '
								/><img src="./FBConnect/lib/images/loader.gif" style="display:none;" /> Enable Facebook Event Reminders<span class="subscript">(3)</span></p>
								<p>Note: A checkmark implies the service is enabled.
									<p>
									<span class="subscript">(1)</span>Stickynoter needs <a onclick="FB.Connect.showPermissionDialog(\'create_note\',function(perms){if(perms){document.getElementById(\'post_to\').disabled = false;}}); return false;" href="#">Special Permissions</a> to post the notes you create on Stickynoter to Facebook.
									</p>
									<p>
									<span class="subscript">(2)</span>This feature will access your friends birthdays from Facebook without notification.
									If this option is selected the information will be stored in a sticky note and will stay on stickynoter untill you delete the stickynote containting the information or remove yourself as an app user.
									</p>
									<p>
									<span class="subscript">(3)</span> This feature will access your events from Facebook without notification and add the most recent up coming events to your sticky note board.
									If this option is selected the information will be stored in a sticky note and will stay on stickynoter untill you delete the stickynote containting the information or remove yourself as an app user.
									</p>
								</p>
						</p>
				  </div>';
		?>
		<!--End Facebook Settings-->
        
		<?php
		} else {
			//include("welcome.php");	
		}
	    ?>
		
	    </div>
    </div>
</div>

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
					  "function loggedOut(){  var FacebookLoggedOn = false; var logon = document.getElementById('fblogon'); logon.style.display = 'block'; }".
					  "FB.init(\"303ad0f99d69ce526c3dfa5f281ee6da\", \"http://www.stickynoter.com/xd_receiver.htm\",{".
					  	"\"ifUserConnected\": loggedIn,".
						"\"ifUserNotConnected\":loggedOut".
					  "});".
				"</script>";
	} 
		
?>
<!-- Accordion Script... i know, i know -->
<script>
$(document).ready(function(){
    $("#accordionRocks").accordion({ autoHeight: false });
  });
</script>
</body>
</html>