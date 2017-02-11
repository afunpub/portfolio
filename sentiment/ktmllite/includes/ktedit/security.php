<?php
	if(!isset($_SESSION["KTML2security"])) {
		die('You don\'t have credentials to access this part of the editor. Please click <a href=# onclick="window.close()">here</a> to close this window');
	}
	$KT_PATH_VAR = @$_SESSION["KTML2security"][$_GET['counter']]['path_'.@$_GET['submode']];
	if (isset($ALT_PATH)) {
		$KT_PATH_VAR = $ALT_PATH . $KT_PATH_VAR;
	}
	//the checks must be made with realpaths
	$minPath = realpath($KT_PATH_VAR);
	$realPath = realpath($KT_PATH_VAR . "/" . @$_GET['currentPath']);
	if ($_SESSION["KTML2security"][$_GET['counter']]['right_image'] == 1) {
		$secTest = strstr($realPath, $minPath);
	} else {
		$secTest = false;
	}
	$sessionTest = isset($_SESSION["KTML2security"]) && isset($_GET['counter']) && isset($_SESSION["KTML2security"][$_GET['counter']]);

	if (!$secTest) {
	  //echo "KT_PATH_VAR: $KT_PATH_VAR<br>";
	  //echo "minPath: $minPath<br>";
	  //echo "realPath: $realPath<br>";
	}
?>
