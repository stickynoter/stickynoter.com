<?
session_start();
$username = $_SESSION['username'];
?>
<li><strong><a href="http://www.stickynoter.com/<? echo $username; ?>">Hello <? echo $username; ?></strong></strong></li>
<li><a id="addNote" href="add_note.php">Add a Note</a></li>
<!--<li><a id="addMark" href="add_bookmark.html">Add a Bookmark</a></li>-->
<li><a href="chat.php">Development Chat</a></li>
<li><a id="profile" href="profile.php">Profile</a></li>
<li class="rssFeed"><a href="rss.php">Feed</a></li>
<li><a href="logout.php">Logout</a></li>
