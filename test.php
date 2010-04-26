<?php
session_start();

echo '
<p>
<strong>session:</strong> '.$_SESSION['username'].'
<br />
<strong>cookie:</strong> ' .$_COOKIE['username'] .'
</p>
';