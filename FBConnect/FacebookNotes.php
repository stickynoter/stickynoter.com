<!--Andrews beautiful js framework, tell me if you like!-->
	<link href="./FBConnect/facebooknotes.css" type="text/css" rel="stylesheet" />
	<script type="text/javascript" src="http://www.stickynoter.com/FBConnect/lib/Groove.js"></script>
	<script type="text/javascript" language="JavaScript">
		function addNotes(){
			//gets LI elements that have notes info in them.
			var contentArray = document.getElementById('fbNotes').childNodes[1].childNodes;
			for (var i = 0; i < contentArray.length; i++) {
				//navigating dom to get to the checkbox
				var doImport = contentArray[i].firstChild.firstChild;
				//navigating dom to get to the note text/html
				var item = contentArray[i].childNodes[1].childNodes[1];
				
				//check to see if it needs to be imported...
				if (doImport.checked) {
					var pars = "zindex=1&body="+encodeURIComponent(item.innerHTML)+"&color=facebook&imported=true";
					//execution functions for stages of AJAX call
					//(init,exec,working,error,location,params)
					var postObjects = {
						checkboxDiv : doImport.parentNode,
						location:"./ajax/post.php",
						init: function(){
							//removes the checkbox...
							this.checkboxDiv.removeChild(this.checkboxDiv.firstChild);
							//create new working gif image..
							var workingGif = document.createElement("img");
							
							this.checkboxDiv.appendChild(workingGif);
							//need to add the element before src assignment for IE compatibility
							workingGif.src = "./FBConnect/lib/images/loader.gif";
							//workingGif.alt = "Working!";
						},
						exec: function(){
							this.checkboxDiv.removeChild(this.checkboxDiv.firstChild);
							var doneGif = document.createElement("img");
							
							this.checkboxDiv.appendChild(doneGif);
							//need to add the element before src assignment for IE compatibility
							doneGif.src = "./FBConnect/done.gif";
							//doneGif.alt = "Done!";
						},
						working: function(){},
						error : function(){},
						params: pars
					}
					Groove.Request.onComplete = function(){
						refreshNotes();
						//alert("All notes have been imported. You will have to refresh the page... currently working on that.");
					}
					//Syncs notes
					var syncNotes = {
						checkboxDiv : doImport.parentNode,
						location:"./FBConnect/sync.php?u="+ <?php $username ?> + "&sync=" + contentArray[i].childNodes[2],
						init: function(){
							//removes the checkbox...
							this.checkboxDiv.removeChild(this.checkboxDiv.firstChild);
							//create new working gif image..
							var workingGif = document.createElement("img");
							
							this.checkboxDiv.appendChild(workingGif);
							//need to add the element before src assignment for IE compatibility
							workingGif.src = "./FBConnect/lib/images/loader.gif";
							//workingGif.alt = "Working!";
						},
						exec: function(){
							this.checkboxDiv.removeChild(this.checkboxDiv.firstChild);
							var doneGif = document.createElement("img");
							
							this.checkboxDiv.appendChild(doneGif);
							//need to add the element before src assignment for IE compatibility
							doneGif.src = "./FBConnect/done.gif";
							//doneGif.alt = "Done!";
						},
						working: function(){},
						error : function(){}
					}
					
					//executes post to cache notes
					Groove.Request.Post(postObjects);// Depricated... no longer are the notes cached.
					
					//Executes the sync request to sync the notes
					//Groove.Request.Get(syncNotes);
				}
			}
			return false;
		}
	</script>
	<?php
		// the facebook client library
		include_once './FBConnect/facebook-platform/php/facebook.php';
		
		// some basic library functions
		include_once './FBConnect/facebook-platform/footprints/lib.php';
		
		// this defines some of your basic setup
		include_once './FBConnect/facebook-platform/footprints/config.php';
		
		$facebook = new Facebook($api_key, $secret);
		//$facebook->require_frame();
		//if(!$fb_user){
		//	$fb_user = $facebook->require_login();
		//}
		$loggedin = false;
		try{
			$notes = $facebook->api_client->notes_get('','');
			$loggedin = true;
		}catch(Exception $e){
			$loggedin = false;
		}
		//print "<form action='#' method='POST'>";
		
		if($loggedin){
			//print "<h2>Hi <fb:name firstnameonly=\"true\" uid=\"loggedinuser\" useyou=\"false\"/>!</h2><br/>";
			//print "<form action='http://www.stickynoter.com/FBConnect/noJSPost.php' method='post'>";
			if($notes){
				print "<div id=\"fbNotes\">";
				print "<h4>Please select the notes you would like to import.</h4>";
				print "<ul>";
				/*
				include("../includes/db.php");
				
				//get the currently imported notes
				
				$_handle = mysql_query("SELECT note_id FROM facebook_notes where username = '".$username."'");
				$_notes = array();
				$_numnotes = mysql_rows_affected($_handle);
				
				for($j=0;$j<$_numnotes;$j++){
					$_notestemp = mysql_fetch_array($_handle);
					$_notes = $_notestemp['note_id'];
				}*/
				for($i=0;$i< count($notes);$i++ ){
					
					
					
					/*	$imported = false;
					if(in_array($notes[$i]['note_id'],$_notes)){
						$imported = true;
					}
							$imported = false // the note is inherently not imported
							open connection
							run query to see if note_id is in facebook_notes
							if it is
							$imported = true
					*/
					print "<li class='fbNote'>";
						print "<div class='import'>";
							//if($imported){
								print "<input type='checkbox' name='import' />";
							//}else{
								//print "<img src=\"./FBConnect/done.gif\" alt=\"Done!\" />							
							//}
						print "</div>";
						print "<div class='info'>";
							print "<p>".$notes[$i]['title']."</p>";
							print "<p class='content' name='noteText'>".$notes[$i]['content_html']."</p>";
						print "</div>";
						//print "<input type='hidden' value='".$notes[$i]['note_id']."' />";
						
						//print "<input class='import' type='checkbox' name='import' />";
					//print "<p style='font-size:10px;'>Date Created".$notes[$i]['created_time']."</p>";
					print "</li>";
				}
				print "</ul>";
				
				print "</div>";
				print "<p>";
					print "<input type='submit' value='Import to Stickynoter' onclick='addNotes();' />";
				print "</p>"; 
				print "<p class=\"important\">";
				print "NOTE: By clicking the Import to Stickynoter button you are consenting that you allow ".
				"stickynoter to store the data you are importing indefinately or untill you delete the sticky ".
				" note.";
				print "</p>";
				//print "</form>";
				//print "</form>";
				print "<!--<fb:prompt-permission perms=\"create_note\">Add Notes to Facebook</fb:prompt-permission>-->";
			}else{
				print "<h4>You have no notes to import.</h4> <p>Try logging into Facebook and create some notes.</p>";
			}
		}else{
			print "<h4>How do I import Facebook Notes?</h4><br /><p>Please click on the Facebook connect button in your profile page. You may access the profile page by clicking on the profile link on the top of the page.</p>";
		}
		
	?>
	<!--<div style="padding: 10px;">
	<?php
	  	print $notes 
	?>
	  <h2>Hi <fb:name firstnameonly="true" uid="loggedinuser" useyou="false"/>!</h2><br/>
	</div>-->
	
