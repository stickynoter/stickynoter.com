

<?php
echo '

 				 <div class="dock-container">
				<a class="dock-item" href="add_bookmark.php" id="addMark"><span>Add Bookmark</span><img src="images/dock/Upload.png" alt="Add Bookmark" /></a> 
';


include("includes/db.php");
$username = $_SESSION['username'];
// get notes
$getMarks = mysql_query("SELECT * FROM marks WHERE username='$username'");
while ($marksResults = mysql_fetch_array($getMarks)) {
	// note information
	$mark_text = $marksResults['text'];
	//$mark_url = $marksResults['url'];


	echo '
	<a class="dock-item" href="http://'.$mark_text.'" target="_blank"><span>'.$mark_text.'</span><img src="http://images.websnapr.com/?size=T&key=W7t3bcZKFC9f&url='.$mark_text.'" alt="'.$mark_text.'" /></a> 
	
	';

}

echo '
				 </div>	
								';

?>