<?
// session
session_start();

// user
//$username = $_SESSION['username'];
$username = $_COOKIE['username'];

// db
include("includes/db.php");

// no user
if (!$username) {
	die("You are currently not logged in.");
}

// get current status
$current_status = mysql_query("SELECT * FROM users WHERE username='$username' LIMIT 1");
$current_status = mysql_fetch_array($current_status);
$current_status = $current_status['board_status'];

$action = $_GET['action'];
?>

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.0/jquery.min.js"></script>
<script type="text/javascript">
	// share options
	
	$(function() {
		var selected = $('.board_status option:selected').val();
		if (selected == 0) {
			$('#searchUsers').hide();	
		} else {
			$('#searchUsers').show();
		}
		
	 	$('.board_status').change(function() {
			var newSelected = $('.board_status option:selected').val();
			if (newSelected == 1) {
				$('#searchUsers').show();	
			} else {
				$('#searchUsers').hide();	
			}
	 	});
	});
	
</script>

<div id="share">

    <h3 class="popupTitle">Sticky Board Share Options</h3>
    <br />
    
    You can share your sticky board with friends, family, or whoever you want and they will be able to see your sticky board, but not make any changes to it.
    <br />
    <br />
    
    <strong>Private</strong>: no one can view your sticky board except for you and you must be logged in to view it.
    <br />
    <strong>Public</strong>: you can choose users who have signed up at stickynoter and if they are logged in they can view your board, but not make any changes to it.
    <br />
    <br />
    <label for="board_status">Current status:</label>
    <select name="board_status" class="board_status">
    <?
    if ($current_status == 0) {
        echo '
         <option name="private" id="private" value="0">Private</option>
         <option name="public" id="public" value="1">Public</option>
        ';
    } else {
        echo '
        <option name="public" id="public" value="1">Public</option>
        <option name="private" id="private" value="0">Private</option>
        ';
    }
    ?>
    </select>
	
    <br />
    <br />
    
	<div id="searchUsers">
    <strong>Search Users:</strong> <input type="text" name="searchUsername">
    </div>
</div>
