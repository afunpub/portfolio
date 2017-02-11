<?php
// Copyright 2001-2003 Interakt Online. All rights reserved.
	
	session_start();
	include("functions.inc.php");
	include_once("languages/".((isset($_SESSION['KTML2security'][$_GET['counter']]['language']))? $_SESSION['KTML2security'][$_GET['counter']]['language']:"english").".inc.php");	
?>
<html>
	<head>
		<link href="styles/main.css" rel="stylesheet" type="text/css">
<?php
	$KT_PATH_VAR = $_SESSION["KTML2security"][$_GET['counter']]['path_'.$_GET['submode']];
	$initDir = str_replace("/rdframes.php", "", $_SERVER['PHP_SELF']);
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
	
	if ($_GET['submode'] == "img") {
		$url="http".(($KT_https == true) ? "s" : "" )."://".$_SERVER['HTTP_HOST'].$NEXT_PATH;
	} else {
		$url="http".(($KT_https == true) ? "s" : "" )."://".$_SERVER['HTTP_HOST'].$NEXT_PATH;
	}
	if (preg_match('/\/$/', $url)) {
		$url = substr($url, 0, sizeof($url)-2);
	}
?>	
	<script>
		function IsDigit(event) {
	  	return ((event.keyCode >= 48) && (event.keyCode <= 57));
		}
	</script>
	</head>
	<body class="body">
<?php if ($_GET['submode']== "img") { 
	$ca = isset($_GET['calign']) ? $_GET['calign'] : '';
?>
		<form name="frmImagePick" method="post" action="">	
			<table class="ktml_table">
				<tr>
			    <td valign="top" align="left" colspan="2" nowrap> <label class="ktml_label"><?php echo (isset($KT_Messages["Enter Full Url"]))? $KT_Messages["Enter Full Url"] : "Enter Full Url"; ?> :</label><br>
			      <input type="text" class="ktml_input"  size="60" name="ImgUrl" style="width : 400px;" value="<?php if (isset($_GET['param1']) && $_GET['param1'] != "" ) { echo $url.stripslashes($_GET['param1']); } else if (isset($_GET['urlPath'])) { echo $_GET['urlPath']; } ?>">
			      <br><label class="ktml_label"><?php echo (isset($KT_Messages["Alternate Text"]))? $KT_Messages["Alternate Text"] : "Alternate Text"; ?>:</label><br>
			      <input type="text" class="ktml_input"  size="40" name="AltText" style="width : 300px;" value="<?php if (isset($_GET['calt']) && $_GET['calt'] != "" ) { echo $_GET['calt']; }?>">
			    </td>
			  </tr>
			  <tr>
			    <td valign="top" align="left" colspan="2">
			      <table border=0 cellpadding=2 cellspacing=2>
			        <tr>
			          <td nowrap>
			            <fieldset class="ktml_fieldset"><legend class="ktml_legend"><?php echo (isset($KT_Messages["Layout"]))? $KT_Messages["Layout"] : "Layout"; ?></legend>
			              <table border="0" cellpadding=2 cellspacing=2 class="ktml_table">
			                <tr>
			                  <td><label class="ktml_label"><?php echo (isset($KT_Messages["Alignment"]))? $KT_Messages["Alignment"] : "Alignment"; ?>:</label></td>
			                  <td>
			                  	<select class="ktml_select" name="ImgAlign" style="width : 80px;">
		                        <option value="" <?php if (!strcmp("", $ca)) {echo "SELECTED";}?>><?php echo (isset($KT_Messages["Default"]))? $KT_Messages["Default"] : "Default"; ?></option>
		                        <option value="baseline" <?php if (!strcmp("baseline", $ca)) {echo "SELECTED";}?>><?php echo (isset($KT_Messages["Baseline"]))? $KT_Messages["Baseline"] : "Baseline"; ?></option>
		                        <option value="top" <?php if (!strcmp("top", $ca)) {echo "SELECTED";}?>><?php echo (isset($KT_Messages["Top"]))? $KT_Messages["Top"] : "Top"; ?></option>
		                        <option value="middle" <?php if (!strcmp("middle", $ca)) {echo "SELECTED";}?>><?php echo (isset($KT_Messages["Middle"]))? $KT_Messages["Middle"] : "Middle"; ?></option>
		                        <option value="bottom" <?php if (!strcmp("bottom", $ca)) {echo "SELECTED";}?>><?php echo (isset($KT_Messages["Bottom"]))? $KT_Messages["Bottom"] : "Bottom"; ?></option>
		                        <option value="texttop" <?php if (!strcmp("texttop", $ca)) {echo "SELECTED";}?>><?php echo (isset($KT_Messages["Texttop"]))? $KT_Messages["Texttop"] : "Texttop"; ?></option>
		                        <option value="absmiddle" <?php if (!strcmp("absmiddle", $ca)) {echo "SELECTED";}?>><?php echo (isset($KT_Messages["AbsoluteMiddle"]))? $KT_Messages["AbsoluteMiddle"] : "AbsoluteMiddle"; ?></option>
		                        <option value="absbottom" <?php if (!strcmp("absbottom", $ca)) {echo "SELECTED";}?>><?php echo (isset($KT_Messages["AbsoluteBottom"]))? $KT_Messages["AbsoluteBottom"] : "AbsoluteBottom"; ?></option>
		                        <option value="left" <?php if (!strcmp("left", $ca)) {echo "SELECTED";}?>><?php echo (isset($KT_Messages["Left"]))? $KT_Messages["Left"] : "Left"; ?></option>
		                        <option value="right" <?php if (!strcmp("right", $ca)) {echo "SELECTED";}?>><?php echo (isset($KT_Messages["Right"]))? $KT_Messages["Right"] : "Right"; ?></option>
		                      </select>
			                  </td>
			                	<td nowrap><label class="ktml_label"><?php echo (isset($KT_Messages["Width"]))? $KT_Messages["Width"] : "Width"; ?>:</label></td>
			                	<td><input type="text" class="ktml_input"  size=2 name=ImgWidth onkeypress="event.returnValue=IsDigit(event);" style="width : 80px;" value="<?php if (isset($_GET['xul']) && $_GET['xul'] != "null" ) { echo $_GET['xul']; } ?>"></td>
			                </tr>
			                <tr>
			                  <td nowrap><label class="ktml_label"><?php echo (isset($KT_Messages["Border Thickness"]))? $KT_Messages["Border Thickness"] : "Border Thickness"; ?>:</label></td>
			                  <td><input type="text" class="ktml_input"  size=2 name=ImgBorder  onkeypress="event.returnValue=IsDigit(event);" style="width : 80px;" value="<?php if ((isset($_GET['cborder']) && $_GET['cborder'] != "" )) {echo $_GET['cborder'];} else { echo '0';} ?>"></td>
			                	<td nowrap><label class="ktml_label"><?php echo (isset($KT_Messages["Height"]))? $KT_Messages["Height"] : "Height"; ?>:</label></td>
			                	<td><input type="text" class="ktml_input"  size=2 name=ImgHeight onkeypress="event.returnValue=IsDigit(event);" style="width : 80px;" value="<?php if (isset($_GET['yul']) && $_GET['yul'] != "null" ) { echo $_GET['yul']; } ?>"></td>
			                </tr>
			              </table>
			            </fieldset>
			          </td>
			        </tr>
							<tr>
			          <td>
				          <input type="button" class="ktml_button" id="Ok" onclick="parent.submitImage();" value="<?php echo (isset($KT_Messages["OK"]))? $KT_Messages["OK"] : "OK"; ?>">
				          <input type="button" class="ktml_button" onclick="parent.close();" value="<?php echo (isset($KT_Messages["Cancel"]))? $KT_Messages["Cancel"] : "Cancel"; ?>">
				          <input type="button" class="ktml_button" onclick="parent.openHelp('insertimagepopup')" value="<?php echo (isset($KT_Messages["Help"]))? $KT_Messages["Help"] : "Help"; ?>">
			          </td>
							</tr>
			      </table>
			    </td>
			  </tr>
			</table>
		</form>
<?php } else if ($_GET['submode']=="file") { ?>
		<form name="frmFilePick" method="post" action="">
			<table class="ktml_table">
				<tr>
					<td align="right">
							<label class="ktml_label">
								<?php echo (isset($KT_Messages["File:"]))? $KT_Messages["File:"] : "File:"; ?>
							</label>
					</td>
					<td>
						<input type="text" name="FileUrl" value="<?php if (isset($_GET['param1']) && $_GET['param1'] != "" ) { echo $url.$_GET['param1']; } ?>" size="80" class="ktml_input">
					</td>
				</tr>
				<tr>
					<td align="right">
							<label class="ktml_label">
								<?php echo (isset($KT_Messages["Target:"]))? $KT_Messages["Target:"] : "Target:"; ?>
							</label>
					</td>
					<td>
						<select class="ktml_select" name="LinkTarget">
							<option value=""><?php echo (isset($KT_Messages["normal"]))? $KT_Messages["normal"] : "normal"; ?></option>
							<option value="_blank"><?php echo (isset($KT_Messages["new window"]))? $KT_Messages["new window"] : "new window"; ?></option>
							<option value="_top"><?php echo (isset($KT_Messages["current window"]))? $KT_Messages["current window"] : "current window"; ?></option>
							<option value="_self"><?php echo (isset($KT_Messages["current frame"]))? $KT_Messages["current frame"] : "current frame"; ?></option>
							<option value="_parent"><?php echo (isset($KT_Messages["parent frame"]))? $KT_Messages["parent frame"] : "parent frame"; ?></option>
						</select>
					</td>
				</tr>
				<tr>
					<td>
					</td>
					<td>
						<input class="ktml_button" type="button" id="Ok" onclick="parent.submitFileLink();" value="<?php echo (isset($KT_Messages["OK"]))? $KT_Messages["OK"] : "OK"; ?>">&#160;
						<input class="ktml_button" type="button" id="Cancel" onclick="parent.close();" value="<?php echo (isset($KT_Messages["Cancel"]))? $KT_Messages["Cancel"] : "Cancel"; ?>">
      					<input class="ktml_button" type="button" id="Help" onclick="parent.openHelp('insertfile')" value="<?php echo (isset($KT_Messages["Help"]))? $KT_Messages["Help"] : "Help"; ?>">
					</td>
				</tr>
			</table>
		</form>
<?php } ?>
	</body>
</html>
