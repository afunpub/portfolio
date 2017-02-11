<?php
// Copyright 2001-2003 Interakt Online. All rights reserved.
	//makes the session_variables accessible to the user
	session_start();
?><?php
	include("functions.inc.php");
	include_once("languages/".((isset($_SESSION['KTML2security']) && isset($_SESSION['KTML2security'][$_GET['counter']]['language']))? $_SESSION['KTML2security'][$_GET['counter']]['language']:"english").".inc.php"); 
	require_once('security.php');
	$cborder = isset($_GET['imgborder']) ?  $_GET['imgborder'] : '';
	$calign = isset($_GET['imgalign']) ?  $_GET['imgalign'] : '';
	$calt = isset($_GET['imgalt']) ?  $_GET['imgalt'] : '';
	if (isset($_GET['imgpath']) && $_GET['imgpath'] != '') {
	} else {

		$KT_PATH_VAR = $_SESSION["KTML2security"][$_GET['counter']]['path_'.$_GET['submode']];
		$initDir = str_replace("/dirbrowser.php", "", $_SERVER['PHP_SELF']);
		$numReps = preg_match_all("/\.\.\//", $KT_PATH_VAR, $tmparr);
		$numBack = count($tmparr[0]);
		$arra = explode("/", $initDir);
		$NEXT_PATH = "";
		for ($i=0;$i<count($arra)- $numBack;$i++) {
			$NEXT_PATH .= $arra[$i]."/";
		}
		$NEXT_PATH.= str_replace("../", "", $KT_PATH_VAR); 
		//patch for PHP Installed as CGI on Linux
		if (!preg_match("#^/#", $NEXT_PATH)) {
			 $NEXT_PATH = "/" . $NEXT_PATH;
		}	

		if (isset($_SESSION["KTML2security"][$_GET['counter']]['currentPath'])) {
			$tmp1 = $NEXT_PATH . $_SESSION["KTML2security"][$_GET['counter']]['currentPath'];
			$tmp1 = preg_replace('/(\/+)/', '/', $tmp1);
			$tmp1 = 'http://'.$_SERVER['SERVER_NAME'] . $tmp1 . '/_doesnot.gif';
			$_GET['imgpath'] = $tmp1;
			$_GET['imgpath'] = $tmp1;
		}
	}
?>
<html>
	<head>
		<title>KTML Editor</title>
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<?php
if (isset($secTest)) {
?>
<script>
	
	function openHelp(helpStr) {
		if (typeof dialogArguments != "undefined") {
			dialogArguments.ktmls[<?php echo $_GET['counter']; ?>].toolbar.showHelp(helpStr);
		} else {
			window.opener.ktmls[<?php echo $_GET['counter']; ?>].toolbar.showHelp(helpStr);
		}
	}
	function submitImage() {
	  var arr = new Array();
		if (!window.frames['props'].document.forms['frmImagePick']) {
			window.setTimeout("submitImage()", 100);
			return;
		}
	  arr["AltText"] = window.frames['props'].document.forms['frmImagePick'].AltText.value;
	  arr["ImgUrl"] = window.frames['props'].document.forms['frmImagePick'].ImgUrl.value;
	  arr["ImgBorder"] = window.frames['props'].document.forms['frmImagePick'].ImgBorder.value;
	  arr["ImgAlign"] = window.frames['props'].document.forms['frmImagePick'].ImgAlign[window.frames['props'].document.forms['frmImagePick'].ImgAlign.selectedIndex].value;
	  arr["ImgHeight"] = window.frames['props'].document.forms['frmImagePick'].ImgHeight.value;
	  arr["ImgWidth"] = window.frames['props'].document.forms['frmImagePick'].ImgWidth.value;
	  arr["ImgAlign"] = window.frames['props'].document.forms['frmImagePick'].ImgAlign[window.frames['props'].document.forms['frmImagePick'].ImgAlign.selectedIndex].value;
	  if (arr["ImgUrl"] != "" && arr["ImgWidth"] < 3001 && arr["ImgHeight"] < 3001) {
			if (window.opener) {
				var ktml = window.opener.ktmls[<?php echo $_GET['counter']; ?>];
			} else {
				var ktml = dialogArguments.ktmls[<?php echo $_GET['counter']; ?>];
			}
			ktml.logic_InsertImage(arr);
			window.close();
		} else {
			return false;
		}
	}
	function submitFileLink() {
		var arr = new Array();
		if (!window.frames['props'].document.forms['frmFilePick']) {
			window.setTimeout("submitFileLink()", 100);
			return;
		}
	<?php if ($KT_flinkmode == "simple") { ?>
		arr["href"] = window.frames['props'].document.forms['frmFilePick'].FileUrl.value;
	<?php } elseif ($KT_flinkmode == "complex") { ?>
		//arr["href"] = "<?php echo $KT_flinkprefix ?>?fl=" + escape(document.frames['props'].document.forms['frmFilePick'].FileUrl.value);
		torepl = "<?php echo $KT_flinktoreplace ?>";
		fullurl = window.frames['props'].document.forms['frmFilePick'].FileUrl.value;
		nm = fullurl.substr(fullurl.indexOf(torepl)+torepl.length+1);
		arr["href"] = "<?php echo $KT_flinkprefix ?>" + escape(nm);
	<?php } ?>
		if (window.opener) {
			var ktml = window.opener.ktmls[<?php echo $_GET['counter']; ?>];
		} else {
			var ktml = dialogArguments.ktmls[<?php echo $_GET['counter']; ?>];
		}
		arr["target"] = window.frames['props'].document.forms['frmFilePick'].LinkTarget.value;
		ktml.propertieslink.href_changed(arr['href']);
		ktml.propertieslink.target_changed(arr['target']);
		ktml.propertieslink.update();
		/*

		if (window.opener) {	
			window.opener.util_setInput(window.opener.document.getElementById('<?php echo (isset($_GET['elname'])? $_GET['elname'] :'') ?>'), arr["href"]);
			ktml.propertieslink.href_changed(window.opener.document.getElementById('<?php echo (isset($_GET['elname'])? $_GET['elname'] :''); ?>').value);
		} else {
			dialogArguments.util_setInput(dialogArguments.document.getElementById('<?php echo (isset($_GET['elname'])? $_GET['elname'] :''); ?>'), arr["href"]);
			ktml.propertieslink.href_changed(dialogArguments.document.getElementById('<?php echo (isset($_GET['elname'])? $_GET['elname'] :''); ?>').value);
		}
		*/
	  //ktml.logic_InsertLinkToFile(arr);
	  window.close();	
	}

	function switchMenu(param1) {
		window.frames['menu'].location = 'menu.php?currentPath='+unescape(param1)+'&mode=<?php echo $_GET['mode']; ?>&submode=<?php echo $_GET['submode']; ?>&counter=<?php echo $_GET['counter']; ?>';
	}
	//updates left frame
	function updL(param1) {
		window.frames['menu'].location = 'menu.php?currentPath='+unescape(param1)+'&mode=<?php echo $_GET['mode']; ?>&submode=<?php echo $_GET['submode']; ?>&counter=<?php echo $_GET['counter']; ?>';
		window.frames['showpath'].location = 'showpath.php?currentPath='+unescape(param1)+'&mode=<?php echo $_GET['mode']; ?>&submode=<?php echo $_GET['submode']; ?>&counter=<?php echo $_GET['counter']; ?>';	
	}
	//updates right frame
	function updR(param1) {
		var str = (param1 != "") ? 'currentPath='+unescape(param1) : "" ;
		window.frames['centru'].location = 'filelist.php?'+str+'&mode=<?php echo $_GET['mode']; ?>&submode=<?php echo $_GET['submode']; ?>&counter=<?php echo $_GET['counter']; ?>&counter=<?php echo $_GET['counter']; ?>&'+Math.random();
		window.frames['showpath'].location = 'showpath.php?currentPath='+unescape(param1)+'&mode=<?php echo $_GET['mode']; ?>&submode=<?php echo $_GET['submode']; ?>&counter=<?php echo $_GET['counter']; ?>';	
	}
	//updates left and right frames
	function updLR(param1) {
		window.frames['menu'].location = 'menu.php?currentPath='+unescape(param1)+'&mode=<?php echo $_GET['mode']; ?>&submode=<?php echo $_GET['submode']; ?>&counter=<?php echo $_GET['counter']; ?>';
		window.frames['centru'].location = 'filelist.php?currentPath='+unescape(param1)+'&mode=<?php echo $_GET['mode']; ?>&submode=<?php echo $_GET['submode']; ?>&counter=<?php echo $_GET['counter']; ?>';	
		window.frames['showpath'].location = 'showpath.php?currentPath='+unescape(param1)+'&mode=<?php echo $_GET['mode']; ?>&submode=<?php echo $_GET['submode']; ?>&counter=<?php echo $_GET['counter']; ?>';	
	}	
	function loadHTML(param1){
		arra = param1.split(".");
		ext = arra[arra.length-1];
		switch (ext) {
			case "html":
			break;
			case "htm":
			break;
			case "gif":
			case "jpg":
			case "jpeg":
			case "bmp":
			case "png":
				window.frames['centru'].location = 'filelist.php?param1='+param1+'&type=img&mode=<?php echo $_GET['mode']; ?>&submode=<?php echo $_GET['submode']; ?>&counter=<?php echo $_GET['counter']; ?>';
				<?php if ($_GET['mode']=="img") { ?>
				window.frames['props'].location = 'rdframes.php?mode=<?php echo $_GET['mode'] ?>&submode=<?php echo $_GET['submode'] ?>&param1='+param1+'&type=img&counter=<?php echo $_GET['counter']; ?>';
				<?php } ?>
			break;
				default:window.frames['centru'].location = 'filelist.php?param1='+param1+'&type=file&mode=<?php echo $_GET['mode']; ?>&submode=<?php echo $_GET['submode']; ?>&counter=<?php echo $_GET['counter']; ?>';
			break;
		}
	}
	function updateImgPropFrame(param1, ex, ey) {
		window.frames['props'].location = 'rdframes.php?calt=<?php echo $calt; ?>&cborder=<?php echo $cborder; ?>&calign=<?php echo $calign; ?>&mode=<?php echo $_GET['mode'];?>&submode=<?php echo $_GET['submode']; ?>&param1='+param1+'&type=img&xul='+ex+'&yul='+ey+'&counter=<?php echo $_GET['counter']; ?>';
	}
	function updateFilePropFrame(param1) {
		window.frames['props'].location = 'rdframes.php?mode=<?php echo $_GET['mode'];?>&submode=<?php echo $_GET['submode']; ?>&param1='+param1+'&type=img&counter=<?php echo $_GET['counter']; ?>';
	}
</script>
<?php
	}
?>
</head>
<?php
$arandom = rand();
if (isset($secTest)) {
?>
<?php if ($_GET['submode'] == 'file') { ?>
<frameset rows="20px, 350px, 100px" frameborder="YES" border="0" framespacing="1">
	<frame name="showpath" scrolling="AUTO" src="showpath.php?mode=<?php echo $_GET['mode']; ?>&submode=<?php echo $_GET['submode']; ?>&random=<?php echo $arandom; ?>&counter=<?php echo $_GET['counter']; ?>">
	<frameset cols="25%,75%,0%" frameborder="YES" border="1" framespacing="1"> 
		<frame name="menu" scrolling="AUTO" src="menu.php?mode=<?php echo $_GET['mode']; ?>&submode=<?php echo $_GET['submode']; ?>&counter=<?php echo $_GET['counter']; ?>&random=<?php echo $arandom; ?>">
		<frameset rows="90%,10%" frameborder="NO"  border="0" framespacing="0">
			<frame name="centru" scrolling="AUTO" noresize="true" src="filelist.php?mode=<?php echo $_GET['mode']; ?>&submode=<?php echo $_GET['submode'] ?>&counter=<?php echo $_GET['counter']; ?>&random=<?php echo $arandom; ?>">
			<frame name="buttons" scrolling="AUTO" noresize="true" src="buttons.php?mode=<?php echo $_GET['mode']; ?>&submode=<?php echo $_GET['submode'] ?>&counter=<?php echo $_GET['counter']; ?>&random=<?php echo $arandom; ?>">
		</frameset>
		<frame name="action" scrolling="NO" noresize src="action.php?counter=<?php echo $_GET['counter']; ?>&random=<?php echo $arandom; ?>">
	</frameset>
	<frame name="props" scrolling="NO" src="rdframes.php?mode=<?php echo $_GET['mode'] ?>&submode=<?php echo $_GET['submode']; ?>&counter=<?php echo $_GET['counter']; ?>&random=<?php echo $arandom; ?>">
</frameset>
<?php 
} else {
	//TODO de vb cu body? ce face bucata asta 
	$tarr = explode("../", $KT_PATH_VAR);
	$lastdir = $tarr[count($tarr)-1];
	$tarr = array();
	$urlPath = '';
	if($lastdir != '' && isset($_GET['imgpath'])) {
		$tarr = explode($lastdir, $_GET['imgpath']);
	}
	if(count($tarr) <= 1) {
		$urlPath = isset($_GET['imgpath']) ? $_GET['imgpath'] : '';
		$cpath = '';
		$cfile = '';
	} else {
		$lastdir = $tarr[count($tarr)-1];
		$ix = strrpos($lastdir, "/");
		if($ix === false) {
			$cpath = '';
			$cfile = $lastdir;
		} else {
			$cpath = substr($lastdir, 0, $ix);
			$cfile = substr($lastdir, $ix+1);
		}
	}
?>
<frameset rows="20px, 350px, 214px" frameborder="YES" border="1" framespacing="1">
	<frame name="showpath" scrolling="AUTO" src="showpath.php?currentPath=<?php echo $cpath;?>&mode=<?php echo $_GET['mode']; ?>&submode=<?php echo $_GET['submode']; ?>&counter=<?php echo $_GET['counter']; ?>&random=<?php echo $arandom; ?>">
	<frameset cols="25%,75%,0%" frameborder="YES" border="1" framespacing="1"> 
		<frame name="menu" scrolling="AUTO" src="menu.php?currentPath=<?php echo $cpath;?>&mode=<?php echo $_GET['mode']; ?>&submode=<?php echo $_GET['submode']; ?>&counter=<?php echo $_GET['counter']; ?>&random=<?php echo $arandom; ?>">
		<frameset rows="90%,10%" frameborder="NO" border="0" framespacing="0">
			<frame name="centru" scrolling="AUTO" noresize="true" src="filelist.php?currentFile=<?php echo $cfile;?>&currentPath=<?php echo $cpath;?>&mode=<?php echo $_GET['mode']; ?>&submode=<?php echo $_GET['submode'] ?>&counter=<?php echo $_GET['counter']; ?>&random=<?php echo $arandom; ?>">
			<frame name="buttons" scrolling="AUTO" noresize="true" src="buttons.php?mode=<?php echo $_GET['mode']; ?>&submode=<?php echo $_GET['submode'] ?>&counter=<?php echo $_GET['counter']; ?>&random=<?php echo $arandom; ?>">
		</frameset>
		<frame name="action" scrolling="NO" noresize src="action.php?counter=<?php echo $_GET['counter']; ?>&random=<?php echo $arandom; ?>">
	</frameset>
	<frame name="props" scrolling="NO" src="rdframes.php?calt=<?php echo $calt; ?>&cborder=<?php echo $cborder; ?>&calign=<?php echo $calign; ?>&urlPath=<?php echo $urlPath; ?>&mode=<?php echo $_GET['mode'] ?>&submode=<?php echo $_GET['submode']; ?>&counter=<?php echo $_GET['counter']; ?>&random=<?php echo $arandom; ?>">
</frameset>
<?php } ?>
<noframes>
	<body class="body">
		<?php echo (isset($KT_Messages["No frame support"]))? $KT_Messages["No frame support"] : "Your browser does not support frames!" ?>
	</body>
</noframes>
<?php
} else {
?>
<body class="body">
	<?php echo (isset($KT_Messages["No credentials"]))? $KT_Messages["No credentials"] :
	'You don\'t have credentials to access this part of the editor. Please click <a href=# onclick="window.close()">here</a> to close this window'
	?>
</body>
<?php
}
?>
</html>
