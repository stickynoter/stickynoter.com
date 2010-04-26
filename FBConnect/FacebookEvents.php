<?php
		session_start();
		$username = $_SESSION['username'];
		include("../includes/db.php");
				
				//get the currently imported notes
				$handle = mysql_query("select post_to,birthday,events from users_facebook where username = '$username'");
				$fbSettings = mysql_fetch_assoc($handle);
				$_handle = mysql_query("SELECT * FROM facebook_events where username = '".$username."'");
				//print $_handle;
				$_events = array();
				$_numevents = mysql_affected_rows($link);
//				print "(1)";
				for($j=0;$j<$_numevents;$j++){
					$_eventtmp = mysql_fetch_array($_handle);
					$_events[$j] = $_eventtmp['eid'];
				}
//				print "(2)";
		include_once './facebook-platform/php/facebook.php';
		
		// some basic library functions
		include_once './facebook-platform/footprints/lib.php';
		
		// this defines some of your basic setup
		include_once './facebook-platform/footprints/config.php';
		
		$facebook = new Facebook($api_key, $secret);
		$loggedin = false;
		try{
			$events = $facebook->api_client->events_get('','','','','');
			$loggedin = true;
		}catch(Exception $e){
			$loggedin = false;
		}
		if($loggedin){
//			print "(3)";
			if($fbSettings['events'] == "1"){
				if(!empty($events)){
	//				print "(4)";
					$current = time();
	//				print "(5 c=".count($events).")";
					for($i=0;$i<count($events);$i++){
						
						$tmpTimestamp = $events[$i]['start_time'];
						$difference = $tmpTimestamp - $current;
	//					print " t=".$difference;
						
						if(!in_array($events[$i]['eid'],$_events)){
							if(($difference > 0) && $difference < (86400*2)){
								
								$eid = $events[$i]['eid'];
								$day = date("m-d-Y", $tmpTimestamp);
								$time = date("h:i a", $tmpTimestamp);
								$host = $events[$i]['host'];
								$event = $events[$i]['name'];
								$location = $events[$i]['location'];
								$body = "<h5>Dont Forget!</h5><p style=\"font-size:10px;overflow:auto;\">".
								$host." is hosting an event.<br /><br />".
								"Event: ".$event." <br />".
								"Location: ".$location."<br />".
								"Time: <span style=\"font-size:9px;\">".$day." @ ".$time."</span></p>";
								
								//print "u=$username";
								//print " e=".$events[$i]['eid'];
								//print "before u=".$_SESSION['username'].",eid=$eid <br />";
								$vari = mysql_query("INSERT INTO facebook_events (username,eid) values
												(
												'$username',
												'$eid'
												)");
								//print "after";
								
								//make db call
								$randomX = rand(1,800);
								$randomY = rand(1,300);
								$xyz = $randomX.'x'.$randomY.'x'.$zindex;
								
								$vari = mysql_query("INSERT INTO notes (text, username, color, xyz) values (
												'".$body."',
												'".$username."',
												'facebook',
												'".$xyz."'
												)");
								//print $vari;
							}
							
						}
					}
	//				print "(6)";
				}
			}
			if($fbSettings['birthday'] == "1"){
				//			print "(7)";
				$appuser = $facebook->api_client->users_getLoggedInUser();
				//print "-----";
				//print $appuser;
				//print "-----";
				$time = time();
				$today = date("F j");
				$tomorrow = date("F j", ($time+(86400)));
				$todaylength = strlen($today);
				$tomorrowlength = strlen($tomorrow);
	//			print "--$today-$todaylength---$tomorrow-$tomorrowlength";
				$fql = 'SELECT uid FROM user WHERE (strpos(birthday, "'.$today.'") = 0 AND strlen(birthday) = \''.$todaylength.'\' OR strpos(birthday, "'.$today.'") = 0 ) AND uid IN (SELECT uid2 FROM friend WHERE uid1 = '.$appuser.')';			
				$todaybdays = $facebook->api_client->fql_query($fql);
				$fql = 'SELECT uid FROM user WHERE (strpos(birthday, "'.$tomorrow.'") = 0 AND strlen(birthday) = \''.$tomorrowlength.'\' OR strpos(birthday, "'.$tomorrow.'") = 0 ) AND uid IN (SELECT uid2 FROM friend WHERE uid1 = '.$appuser.')';
				$tomorrowbdays = $facebook->api_client->fql_query($fql);
				//print_r($todaybdays);
	//			print "------";
				//print_r($tomorrowbdays);
				
				
				//get birthdays added already
				$query = "select * from facebook_birthdays where username = '$username'";
				$_handle = mysql_query($query);
				$bdaynotes = array();
						$_numevents = mysql_affected_rows($link);
		//				print "(1)";
						for($j=0;$j<$_numevents;$j++){
							$bdaynotestmp = mysql_fetch_array($_handle);
							$bdaynotes[$j] = $bdaynotestmp['eid'];
						}
				print "(1)";
				//add birthdays that are happening today
	//			print count($todaybdays);
	//			print_r($todaybdays);
				if(!empty($todaybdays)){
					for($i=0;$i<count($todaybdays);$i++){
						if(!in_array($todaybdays[$i]['uid'],$bdaynotes)){
							$friend = $facebook->api_client->users_getInfo($todaybdays[$i]['uid'],"first_name,last_name,");
							
	//				print "(2)";		
							$friendbday = "<h5>Birthday Reminder!</h5>".
							"<p><span style=\"font-size:12px;\">".$friend[0]['first_name']." ".$friend[0]['last_name']."'s birthday is $today.</span></p>";
							
							//save birthday in note form
										$randomX = rand(1,800);
										$randomY = rand(1,300);
										$xyz = $randomX.'x'.$randomY.'x'.$zindex;
					print "(3)";					
										$vari = mysql_query("INSERT INTO notes (text, username, color, xyz) values (
														'".$friendbday."',
														'".$username."',
														'facebook',
														'".$xyz."'
														)");
						}
					}
				}
	//			print count($tomorrowbdays);
	//			print_r($tomorrowbdays);
	//			print($tomorrow);
				if(!empty($tomorrowbdays)){
					for($i=0;$i<count($tomorrowbdays);$i++){
	//				print "(4)";
						if(!in_array($tomorrowbdays[$i]['uid'],$bdaynotes)){
							$friend = $facebook->api_client->users_getInfo($tomorrowbdays[$i]['uid'],"first_name,last_name,");
							print_r($friend);
				print "(5)";		
							//insert into db so that this horribly programed code knows its there.
							$query = "insert into facebook_birthdays (eid, username) values (".$tomorrowbdays[$i]['uid'].",'".$username."')";
							mysql_query($query);
					print "(6)";		
							$friendbday = "<h5>Birthday Reminder!</h5>".
							"<p><span style='font-size:12px;'>".$friend[0]['first_name']." ".$friend[0]['last_name']."'s birthday is $tomorrow.</span></p>";
	//				print $friendbday;		
							//save birthday reminder
										$randomX = rand(1,800);
										$randomY = rand(1,300);
										$xyz = $randomX.'x'.$randomY.'x'.$zindex;
										$query = "INSERT INTO notes (text, username, color, xyz) values (
														\"".$friendbday."\",
														'".$username."',
														'facebook',
														'".$xyz."'
														)";
										$vari = mysql_query($query);
										print $vari ."!!".$query;
				print "(7)";
						}
					}
				}
			}

			
		
			
		}
//		print "(8)";
		//"SELECT uid FROM user WHERE (strpos(birthday, "$today") = 0 AND strlen(birthday) = $todaylength OR strpos(birthday, "$today,") = 0 ) AND uid IN (SELECT uid2 FROM friend WHERE uid1 = $app_user)
?>