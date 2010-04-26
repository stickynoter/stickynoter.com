<?
include('includes/db.php');

// get last id
$getID = mysql_query("SELECT id FROM notes ORDER BY id DESC LIMIT 1");
$getID = mysql_fetch_array($getID);
$lastID = $getID['id'];
$lastID = $lastID + 1;
?>

	<h3 class="popupTitle">[<a href="#"  onclick = "document.getElementById('wrapper').style.display = '';document.getElementById('previewImport').style.display = 'none';return false;">Add New Note</a>] [<a href="#" onclick = "if(true){document.getElementById('wrapper').style.display = 'none';document.getElementById('previewImport').style.display = '';}else{alert('Login with the Facebook Connect Button');}return false;">Import Facebook</a>]</h3>

<div id="wrapper" style="padding:0px;margin:0px;">
	<!-- The preview: -->
	<div id="previewNote" class="note yellow" style="left:0;top:65px;z-index:1;">
	<div class="closeNote" title="<? echo $lastID; ?>"><img src="img/delete.png" alt="delete note" /></div>
		<div class="body"></div>
		<div class="time">Right now</div>
		<span class="data"></span>
	</div>
	
	<div id="noteData"> <!-- Holds the form -->
	<form action="" method="post" class="note-form" onsubmit="return false;">
	
	<label for="note-body">Text of the note</label>
	<textarea name="note-body" id="note-body" class="pr-body" cols="30" rows="6"></textarea>
	
	<label>Color</label> <!-- Clicking one of the divs changes the color of the preview -->
	<div class="color yellow"></div>
	<div class="color blue"></div>
	<div class="color green"></div>
	<div class="color pink"></div>
	
	<!-- The green submit button: -->
	<a id="note-submit" href="" class="green-button">Submit</a>
	
	</form>
	</div>
	
</div>
<div id="previewImport" style="display:none;">
	<? include("./FBConnect/FacebookNotes.php"); ?>
</div>
<script>
	$('.note-form').live('submit',function(e){e.preventDefault(); return false;});
</script>