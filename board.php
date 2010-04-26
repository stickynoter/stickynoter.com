<?
session_start();
$username = $_SESSION['username'];

include("includes/db.php");

if (!$username) {
	die("You are not logged in!");	
}

$action = $_GET['action'];

if ($action == "delete") {
	$delete_id = $_POST['id'];
	
	// make sure user owns note
	$noteOwner = mysql_query("SELECT * FROM notes WHERE id='$delete_id' AND username='$username' LIMIT 1");
	$shouldBeOne = mysql_num_rows($noteOwner);
	
	if ($shouldBeOne != 1) {
		echo '0';	
	} else {
		mysql_query("DELETE FROM notes WHERE id='$delete_id' LIMIT 1");
		echo '1';
	}
	die();
}

// get notes
$getNotes = mysql_query("SELECT * FROM notes WHERE username='$username'");
while ($notesResults = mysql_fetch_array($getNotes)) {
	// note information
	$note_id = $notesResults['id'];
	$note_text = $notesResults['text'];
	$note_name = $notesResults['username'];
	$note_color = $notesResults['color'];
	$note_xyz = $notesResults['xyz'];
	$note_time = date("M j, Y (g:ia)", strtotime($notesResults['time']));
	
	// The xyz column holds the position and z-index in the form 200x100x10:
	list($left,$top,$zindex) = explode('x',$notesResults['xyz']);
	//$note_text = str_replace($note_text,"\n",'<br />');
	echo '
		<div id="'.$note_id.'" class="note '.$note_color.'" style="left:'.$left.'px;top:'.$top.'px;z-index:'.$zindex.'">
		<div class="closeNote" title="'.$note_id.'"><img src="img/delete.png" alt="delete note" /></div>
			<p class="noteInner">'./*htmlspecialchars(*/$note_text/*)*/.'</p>
			<div class="time">'.$note_time.'</div>
			<span class="data">'.$note_id.'</span>
		</div>
	';

}
?>