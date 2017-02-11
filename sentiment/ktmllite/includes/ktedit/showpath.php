<?php
// Copyright 2001-2003 Interakt Online. All rights reserved.
	
	session_start();
?><?php
	include("functions.inc.php");
	include_once("languages/".((isset($_SESSION['KTML2security']) && isset($_SESSION['KTML2security'][$_GET['counter']]['language']))? $_SESSION['KTML2security'][$_GET['counter']]['language']:"english").".inc.php"); 
	
?>
<html>
<head>
<link href="styles/main.css" rel="stylesheet" type="text/css">
<?php
	$current_path = (isset($_GET["currentPath"]) ? urldecode($_GET["currentPath"]) : "");
	$dir = "/".$current_path;
	$_SESSION['KTML2security'][$_GET['counter']]['currentPath'] = $dir;
	$_SESSION['KTML2security'][$_GET['counter']]['currentPath'] = $dir;
?>
</head>
<body class="body">
<span class="directory" id="ktml_path"><?php echo (isset($KT_Messages["You are here:"])) ? $KT_Messages["You are here:"] : "You are here:"; ?><?php echo '  '.$dir;?></span>
</body>
