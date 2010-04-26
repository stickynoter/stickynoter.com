<?
// session
session_start();

// user
//$username = $_SESSION['username'];
$username = $_COOKIE['username'];

// db
include("includes/db.php");

$friend = $_GET['friend'];
$action = $_GET['action'];
$dockitem = $_GET['dockitem'];

if ($action == "add") {

	if (!$friend) {
		echo "itDidNotWorkThisIsNotAUsername";
	} else {
		// make sure friend exists
		
		// add friend
		mysql_query("INSERT INTO friends SET 
					id='',
					username='$username',
					friend='$friend'");
					
		echo "$friend";	
	}

} 

if ($action == "delete") {
	if (!$friend) {
		echo "Could not delete";
	} else {
		// get username
		$friendUsername = mysql_query("SELECT * FROM users WHERE id='$friend'");
		while ($friendUsernameResults = mysql_fetch_array($friendUsername)) {
			$friendUsernameIs = $friendUsernameResults['username'];
		}
		
		mysql_query("DELETE FROM friends WHERE id='$friend' LIMIT 1");
		echo "$friendUsernameIs removed";
	}
}

if($action == "deletedockitem"){
	if (!$dockitem) {
		echo "Could not delete";
	} else {
		// get username
		$friendUsername = mysql_query("SELECT * FROM marks WHERE id='$dockitem'");
		while ($friendUsernameResults = mysql_fetch_array($friendUsername)) {
			$friendUsernameIs = $friendUsernameResults['text'];
		}
		
		mysql_query("DELETE FROM marks WHERE id='$dockitem' LIMIT 1");
		echo "$friendUsernameIs removed";
	}
}
?>