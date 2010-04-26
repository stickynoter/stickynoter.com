<?
include("includes/db.php");

echo '
<h3 class="popupTitle">Stats</h3>
<br />
';

$totalNotes = mysql_query("SELECT * FROM notes");
$totalNotes = mysql_num_rows($totalNotes);

$totalUsers = mysql_query("SELECT * FROM users");
$totalUsers = mysql_num_rows($totalUsers);

echo '
<ul>
	<li>Total Notes: <strong>'.$totalNotes.'</strong></li>
	<li>Total Users: <strong>'.$totalUsers.'</strong></li>
</ul>

<br />

More stats will come soon and they will look nicer.  For now, this is what you get.
';

?>