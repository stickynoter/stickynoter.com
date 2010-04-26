<?php

// Get these from http://developers.facebook.com
$api_key = "303ad0f99d69ce526c3dfa5f281ee6da";
$secret = "39d3871c9df91679f934309958e2c8eb";

/* While you're there, you'll also want to set up your callback url to the url
 * of the directory that contains Footprints' index.php, and you can set the
 * framed page URL to whatever you want.  You should also swap the references
 * in the code from http://apps.facebook.com/footprints/ to your framed page URL. */

// The IP address of your database
$db_ip = 'localhost';           

$db_user = 'root';
$db_pass = 'YOUR_DB_PASSWORD';

// the name of the database that you create for footprints.
$db_name = 'footprints';

/* create this table on the database:
CREATE TABLE `footprints` (
  `from` int(11) NOT NULL default '0',
  `to` int(11) NOT NULL default '0',
  `time` int(11) NOT NULL default '0',
  KEY `from` (`from`),
  KEY `to` (`to`)
)
*/
