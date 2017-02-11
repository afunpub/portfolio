<?php
// Copyright 2001-2004 Interakt Online. All rights reserved.
// verify if the  editor images directory exists
// 
if (file_exists($dirDepth."images/editor_images")) {
	$relativeImagePath = $dirDepth."images/editor_images";	
} else {
	$relativeImagePath = "img/ktml_images";
}
// $relativeImagePath
// general actions string
$evstr = "onmouseover=\"hndlr_buttonMouseOver(this);\" onmousedown=\"hndlr_buttonMouseDown(this);\"	onmouseup=\"hndlr_buttonMouseUp(this);\" onmouseout=\"hndlr_buttonMouseOut(this);\"	onfocus=\"\" ";
?>

<script>
function showToolbarButton(bName, bId, helpId, command) {
	document.write('<img <?php echo $evstr; ?> class="toolbaritem_flat" src="<?php echo $relativeImagePath ?>/'+bId+'.gif" alt="'+bName+'" title="'+bName+'" kttype="btn" id="'+bId+'" cid="'+command+'" onclick="if ( pageLoded() &amp;&amp; ktml_<?php echo $objectName; ?>.util_checkFocus(this, true)) { if (ktml_<?php echo $objectName; ?>.toolbar.checkHelp(this, event)) { ktml_<?php echo $objectName; ?>.toolbar.showHelp(\''+helpId+'\'); } else { ktml_<?php echo $objectName; ?>.logic_doFormat(\''+command+'\') }}" align="absmiddle"/>');
}
</script>

<table border="0" cellpadding="0" cellspacing="0" class="toolbar" width="100%" onselectstart="return false;" oncontextmenu="return false;">
	<tr class="ktml_bg">
		<td nowrap="true">
		<span name="Property_first_<?php echo $objectName; ?>" id="Property_first_<?php echo $objectName; ?>" unselectable="on" onselectstart="return false;" ondragstart="return false;" ondragover="return false;" ondrop="return false;" onbeforeeditfocus="return false" style="display: none;"><a target="_blank" href="http://www.interaktonline.com/products/KTML?from=ktml" title="<?php echo (isset($KT_Messages["About Ktml"])) ? $KT_Messages["About Ktml"] : "About Ktml"; ?>"><img alt="<?php echo (isset($KT_Messages["About Ktml"])) ? $KT_Messages["About Ktml"] : "About Ktml"; ?>" height="10" border="0" src="<?php echo $relativeImagePath; ?>/aboutktml.gif"/></a></span>
		<span name="Property_<?php echo $objectName; ?>" id="Property_<?php echo $objectName; ?>" unselectable="on" onselectstart="return false;" ondragstart="return false;" ondragover="return false;" ondrop="return false;" onbeforeeditfocus="return false">
<?php 
echo '<script>';
if (in_array("Cut",$display) || $display[0] =="ALL" ) {
	echo 'showToolbarButton("'.(isset($KT_Messages["Cut"]) ? $KT_Messages["Cut"] : "Cut").'", "cut", "cutcopypaste", "Cut");';
} 
if (in_array("Copy",$display) || $display[0] =="ALL" ) {
	echo 'showToolbarButton("'.(isset($KT_Messages["Copy"]) ? $KT_Messages["Copy"] : "Copy").'", "copy", "cutcopypaste", "Copy");';
} 
if (in_array("Paste",$display) || $display[0] =="ALL" ) {
	echo 'showToolbarButton("'.(isset($KT_Messages["Paste"]) ? $KT_Messages["Paste"] : "Paste").'", "paste", "cutcopypaste", "Paste");';
}
if (in_array("Undo",$display) || $display[0] =="ALL" ) {
	echo 'showToolbarButton("'.(isset($KT_Messages["Undo"]) ? $KT_Messages["Undo"] : "Undo").'", "undo", "undoredo", "Undo");';
}
if (in_array("Redo",$display) || $display[0] =="ALL" ) {
	echo 'showToolbarButton("'.(isset($KT_Messages["Redo"]) ? $KT_Messages["Redo"] : "Redo").'", "redo", "undoredo", "Redo");';
}
echo "</script>";
if (in_array("Insert Image",$display) || $display[0] =="ALL" ) {?><img <?php echo $evstr; ?> class="toolbaritem_flat" 
			 src="<?php echo $relativeImagePath ?>/image.gif" 
			 alt="<?php echo (isset($KT_Messages["InsertImage"])) ? $KT_Messages["InsertImage"] : "Insert Image"; ?>" 
			 title="<?php echo (isset($KT_Messages["InsertImage"])) ? $KT_Messages["InsertImage"] : "Insert Image"; ?>" 
			 kttype="btn" id="insertimage" cid="InsertImage"
			 onclick="if ( pageLoded() && <?php echo 'ktml_'.$objectName; ?>.util_checkFocus(this, true)) { if (<?php echo 'ktml_'.$objectName; ?>.toolbar.checkHelp(this, event)) { <?php echo 'ktml_'.$objectName; ?>.toolbar.showHelp('insertimage'); } else { <?php echo 'ktml_'.$objectName; ?>.logic_openInsertImage(<?php echo $counter; ?>); }}" 
			 align="absmiddle"/><?php 
}
if (in_array("Insert Table",$display) || $display[0] =="ALL" ) {?><img <?php echo $evstr; ?> class="toolbaritem_flat" 
			 src="<?php echo $relativeImagePath ?>/instable.gif" 
			 alt="<?php echo (isset($KT_Messages["InsertTable"])) ? $KT_Messages["InsertTable"] : "Insert Table"; ?>" 
			 title="<?php echo (isset($KT_Messages["InsertTable"])) ? $KT_Messages["InsertTable"] : "Insert Table"; ?>" 
			 kttype="btn" id="inserttable" cid="instable"
			 onclick="if ( pageLoded() && <?php echo 'ktml_'.$objectName; ?>.util_checkFocus(this, true)) { if (<?php echo 'ktml_'.$objectName; ?>.toolbar.checkHelp(this, event)) { <?php echo 'ktml_'.$objectName; ?>.toolbar.showHelp('inserttable'); } else { <?php echo 'ktml_'.$objectName; ?>.logic_InsertTable(<?php echo $counter; ?>); }}" 
			 align="absmiddle"/><?php 
}
echo '<script>';
if (in_array("Bullet List",$display) || $display[0] =="ALL" ) {
	echo 'showToolbarButton("'.(isset($KT_Messages["BulletList"]) ? $KT_Messages["BulletList"] : "Bullet List").'", "bulletlist", "bulletlist", "InsertUnorderedList");';
}
if (in_array("Numbered List",$display) || $display[0] =="ALL" ) {
	echo 'showToolbarButton("'.(isset($KT_Messages["NumberedList"]) ? $KT_Messages["NumberedList"] : "Numbered List").'", "numberlist", "numberlist", "InsertOrderedList");';
}
if (in_array("Indent",$display) || $display[0] =="ALL" ) {
	echo 'showToolbarButton("'.(isset($KT_Messages["Indent"]) ? $KT_Messages["Indent"] : "Indent").'", "indent", "indentation", "Indent");';
}
if (in_array("Outdent",$display) || $display[0] =="ALL" ) {
	echo 'showToolbarButton("'.(isset($KT_Messages["Outdent"]) ? $KT_Messages["Outdent"] : "Outdent").'", "outdent", "indentation", "Outdent");';
}
if (in_array("HR",$display) || $display[0] =="ALL" ) {
	echo 'showToolbarButton("'.(isset($KT_Messages["HorizontalLine"]) ? $KT_Messages["HorizontalLine"] : "Horizontal Line").'", "hr", "horline", "InsertHorizontalRule");';
}
if (in_array("Align Left",$display) || $display[0] =="ALL" ) {
	echo 'showToolbarButton("'.(isset($KT_Messages["AlignLeft"]) ? $KT_Messages["AlignLeft"] : "Align Left").'", "alignleft", "paralign", "JustifyLeft");';
}
if (in_array("Align Center",$display) || $display[0] =="ALL" ) {
	echo 'showToolbarButton("'.(isset($KT_Messages["AlignCenter"]) ? $KT_Messages["AlignCenter"] : "Align Center").'", "aligncenter", "paralign", "JustifyCenter");';
}
if (in_array("Align Right",$display) || $display[0] =="ALL" ) {
	echo 'showToolbarButton("'.(isset($KT_Messages["AlignRight"]) ? $KT_Messages["AlignRight"] : "Align Right").'", "alignright", "paralign", "JustifyRight");';
}
if (in_array("Align Justify",$display) || $display[0] =="ALL" ) {
	echo 'showToolbarButton("'.(isset($KT_Messages["AlignJustify"]) ? $KT_Messages["AlignJustify"] : "Align Justify").'", "alignjust", "paralign", "JustifyFull");';
}
if (in_array("Toggle Vis/Invis",$display) || $display[0] =="ALL" ) {
	echo 'showToolbarButton("'.(isset($KT_Messages["ToggleVisible"]) ? $KT_Messages["ToggleVisible"] : "Toggle Visible").'", "togglevisible", "toggleinvis", "toggleInvisibles");';
}
if (in_array("Toggle WYSIWYG",$display) || $display[0] =="ALL" ) {
	echo 'showToolbarButton("'.(isset($KT_Messages["ToggleEditMode"]) ? $KT_Messages["ToggleEditMode"] : "Toggle Edit Mode").'", "html", "toggleedit", "toggleEditMode");';
}
if (in_array("Clean Word",$display) || $display[0] =="ALL" ) {
	echo 'showToolbarButton("'.(isset($KT_Messages["CleanHTMLContent"]) ? $KT_Messages["CleanHTMLContent"] : "CleanHTMLContent - word").'", "cleanword", "cleanup", "CleanHTML");';
}
echo '</script>';
?><img <?php echo $evstr; ?> class="toolbaritem_flat" 
			 src="<?php echo $relativeImagePath ?>/about.gif" 
			 alt="<?php echo (isset($KT_Messages["About"])) ? $KT_Messages["About"] : "About"; ?>" 
			 title="<?php echo (isset($KT_Messages["About"])) ? $KT_Messages["About"] : "About"; ?>" 
			 kttype="btn" id="about" cid="about"
			 onclick="if ( pageLoded() && <?php echo 'ktml_'.$objectName; ?>.util_checkFocus(this, true)) { ui_openAboutBox(); }" 
			 align="absmiddle"/><img <?php echo $evstr; ?> class="toolbaritem_flat" 
			 src="<?php echo $relativeImagePath ?>/help.gif" 
			 alt="<?php echo (isset($KT_Messages["Help"])) ? $KT_Messages["Help"] : "Help"; ?>" 
			 title="<?php echo (isset($KT_Messages["Help"])) ? $KT_Messages["Help"] : "Help"; ?>" 
			 kttype="btn" id="<?php echo 'ktml_'.$objectName; ?>_help" cid="help"
			 onclick="if ( pageLoded() && <?php echo 'ktml_'.$objectName; ?>.toolbar.getHelpMode()) {<?php echo 'ktml_'.$objectName; ?>.toolbar.setHelpMode(false); } else { <?php echo 'ktml_'.$objectName; ?>.toolbar.setHelpMode(true); }" 
			 align="absmiddle"/><br style="clear:both;"/><?php if (in_array("Heading List",$display) || $display[0] =="ALL" ) {
?><select class="ktml_select" 
ktml_object_name="<?php echo 'ktml_'.$objectName; ?>"
help_id="html_tags"
hdr_type="widget" hdr_stype="html"
name="property_heading"	cid="property_heading" kttype="slc" id="property_heading" 
onclick="if ( pageLoded() && <?php echo 'ktml_'.$objectName; ?>.toolbar.checkHelp(this, event)) { <?php echo 'ktml_'.$objectName; ?>.toolbar.showHelp('html_tags');return false; }"
onchange="<?php echo 'ktml_'.$objectName; ?>.logic_doFormat('InsertHeading',this.value)"
>
<option value="<p>" HTMLValue="&lt;p style=&quot;margin:0px 0px 0px 0px&quot;&gt;Normal&lt;/p&gt;">Normal</option>
<option value="<p>" HTMLValue="&lt;p style=&quot;margin:0px 0px 0px 0px&quot;&gt;Paragraph&lt;/p&gt;">Paragraph</option>
<option value="<h1>" HTMLValue="&lt;h1 style=&quot;margin:0px 0px 0px 0px&quot;&gt;Heading 1&lt;/h1&gt;">Heading 1</option>
<option value="<h2>" HTMLValue="&lt;h2 style=&quot;margin:0px 0px 0px 0px&quot;&gt;Heading 2&lt;/h2&gt;">Heading 2</option>		
<option value="<h3>" HTMLValue="&lt;h3 style=&quot;margin:0px 0px 0px 0px&quot;&gt;Heading 3&lt;/h3&gt;">Heading 3</option>
<option value="<h4>" HTMLValue="&lt;h4 style=&quot;margin:0px 0px 0px 0px&quot;&gt;Heading 4&lt;/h4&gt;">Heading 4</option>
<option value="<h5>" HTMLValue="&lt;h5 style=&quot;margin:0px 0px 0px 0px&quot;&gt;Heading 5&lt;/h5&gt;">Heading 5</option>
<option value="<h6>" HTMLValue="&lt;h6 style=&quot;margin:0px 0px 0px 0px&quot;&gt;Heading 6&lt;/h6&gt;">Heading 6</option>
<option value="<address>" HTMLValue="&lt;address&gt;Address&lt;/address&gt;">Address</option>
<option value="<pre>" HTMLValue="&lt;pre style=&quot;margin:0px 0px 0px 0px&quot;&gt;Formatted&lt;/pre&gt;">Formatted</option>  
<option value="<div>" HTMLValue="&lt;pre style=&quot;margin:0px 0px 0px 0px&quot;&gt;DIV&lt;/div&gt;">DIV</option>  
</select><?php 
}
@include($dirDepth."includes/ktedit/cssdropdown.php");

if (in_array("Font Type",$display) || $display[0] =="ALL" ){
?><select class="ktfonts ktml_select"
ktml_object_name="<?php echo 'ktml_'.$objectName; ?>"
help_id="fontface"
hdr_type="widget" hdr_stype="html"
name="property_font_type"  kttype="slc" id="property_font_type" cid="Fontname"
style="width:160px"
onclick="if ( pageLoded() && <?php echo 'ktml_'.$objectName; ?>.toolbar.checkHelp(this, event)) { <?php echo 'ktml_'.$objectName; ?>.toolbar.showHelp('fontface');return false; } else { return true; }"
onchange="<?php echo 'ktml_'.$objectName; ?>.logic_doFormat('FontName',this.value);" >
<option value="" selected="true" HTMLValue="<?php echo (isset($KT_Messages["Select Font..."])) ? $KT_Messages["Select Font..."] : "Select Font..."; ?>"><?php echo (isset($KT_Messages["Select Font..."])) ? $KT_Messages["Select Font..."] : "Select Font..."; ?></option>
<option value="Arial,Helvetica,sans-serif" HTMLValue="&lt;font face=&quot;Arial&quot;&gt;Arial, Helvetica, sans-serif&lt;/font&gt;">Arial, Helvetica, sans-serif</option>
<option value="Times New Roman,Times,serif" HTMLValue="&lt;font face=&quot;Times New Roman&quot;&gt;Times New Roman, Times, serif&lt;/font&gt;">Times New Roman, Times, serif</option>
<option value="Courier New,Courier,mono" HTMLValue="&lt;font face=&quot;Courier New&quot;&gt;Courier New, Courier, mono&lt;/font&gt;">Courier New, Courier, mono</option>
<option value="Georgia" HTMLValue="&lt;font face=&quot;Georgia&quot;&gt;Georgia&lt;/font&gt;">Georgia</option>
<option value="Verdana,Helvetica" HTMLValue="&lt;font face=&quot;Verdana&quot;&gt;Verdana, Helvetica&lt;/font&gt;">Verdana, Helvetica</option>
<option value="System" HTMLValue="&lt;font face=&quot;System&quot;&gt;System&lt;/font&gt;">System</option>
</select><?php } ?><?php if (in_array("Font Size",$display) || $display[0] =="ALL" ) {?><select class="ktfonts ktml_select"
ktml_object_name="<?php echo 'ktml_'.$objectName; ?>"
help_id="fontsize"
hdr_type="widget" hdr_stype="html"
name="property_size" id="property_size" 
style="width:64px" kttype="slc" cid="FontSize"
onclick="if ( pageLoded() && <?php echo 'ktml_'.$objectName; ?>.toolbar.checkHelp(this, event)) { <?php echo 'ktml_'.$objectName; ?>.toolbar.showHelp('fontsize');return false; } else { return true; }"
onchange="<?php echo 'ktml_'.$objectName; ?>.logic_doFormat('FontSize',this.value);" >
<option value="" selected="true" HTMLValue="<?php echo (isset($KT_Messages["Select Size..."])) ? $KT_Messages["Select Size..."] : "Select Size..."; ?>"><?php echo (isset($KT_Messages["Select Size..."])) ? $KT_Messages["Select Size..."] : "Select Size..."; ?></option>
<option value="1" HTMLValue="&lt;font size=&quot;1&quot;&gt;1 (8px)&lt;/font&gt;">1 (8px)</option>
<option value="2" HTMLValue="&lt;font size=&quot;2&quot;&gt;2 (11px)&lt;/font&gt;">2 (11px)</option>
<option value="3" HTMLValue="&lt;font size=&quot;3&quot;&gt;3 (14px)&lt;/font&gt;">3 (14px)</option>
<option value="4" HTMLValue="&lt;font size=&quot;4&quot;&gt;4 (16px)&lt;/font&gt;">4 (16px)</option>
<option value="5" HTMLValue="&lt;font size=&quot;5&quot;&gt;5 (20px)&lt;/font&gt;">5 (20px)</option>
<option value="6" HTMLValue="&lt;font size=&quot;6&quot;&gt;6 (24px)&lt;/font&gt;">6 (24px)</option>
</select><?php } ?><?php
echo '<script>';
if (in_array("Insert Link",$display) || $display[0] =="ALL" ) { 
	echo 'showToolbarButton("'.(isset($KT_Messages["InsertLink"]) ? $KT_Messages["InsertLink"] : "InsertLink").'", "link", "insertlink", "InsertLink");';
}
if (in_array("Bold",$display) || $display[0] =="ALL" ) {
	echo 'showToolbarButton("'.(isset($KT_Messages["Bold"]) ? $KT_Messages["Bold"] : "Bold").'", "bold", "basicformat", "Bold");';
}
if (in_array("Italic",$display) || $display[0] =="ALL" ) {
	echo 'showToolbarButton("'.(isset($KT_Messages["Italic"]) ? $KT_Messages["Italic"] : "Italic").'", "italic", "basicformat", "Italic");';
}
if (in_array("Underline",$display) || $display[0] =="ALL" ) {
	echo 'showToolbarButton("'.(isset($KT_Messages["Underline"]) ? $KT_Messages["Underline"] : "Underline").'", "underline", "basicformat", "Underline");';
}
if (in_array("Foreground Color",$display) || $display[0] =="ALL" ) {
	echo 'showToolbarButton("'.(isset($KT_Messages["ForegroundColor"]) ? $KT_Messages["ForegroundColor"] : "ForegroundColor").'", "fgcolor", "colors", "ForeColor");';
}
if (in_array("Background Color",$display) || $display[0] =="ALL" ) {
	echo 'showToolbarButton("'.(isset($KT_Messages["BackgroundColor"]) ? $KT_Messages["BackgroundColor"] : "BackgroundColor").'", "bgcolor", "colors", "BackColor");';
}
echo '</script>';
?><?php if (isset($moduleexists['spellchecker']) && $moduleexists['spellchecker']) {
			include ($dirDepth."includes/ktedit/modules/spellchecker/ui.php");
			echo "<script LANGUAGE=\"JavaScript\" src=\"".$dirDepth."includes/ktedit/modules/spellchecker/scripts.js\"></script>";
} ?><?php if (isset($moduleexists['templates']) && $moduleexists['templates']) {
			echo '<br/>';
			include ($dirDepth."includes/ktedit/modules/templates/ui.php");
			echo '<script LANGUAGE="JavaScript" src="'.$dirDepth.'includes/ktedit/modules/templates/scripts.js"></script>';
		} ?></span>
		</td>
	</tr>
</table>
<div id="<?php echo 'ktml_'.$objectName; ?>_ccdiv" name="<?php echo 'ktml_'.$objectName; ?>_ccdiv" class="cc_container invisible ktml_bg" style="width: 340px; height: 230px;display: none;" >
</div>
<!-- end toolbar code -->
<style>
#Properties_td_<?php echo $objectName; ?> {
	height: 75px; 
	font-size: 12px; 
	text-align: justify;
}
	#Properties_td_<?php echo $objectName; ?> td {
		white-space: nowrap ! important;
	}
	#Properties_table_<?php echo $objectName; ?> td {
		white-space: nowrap ! important;
	}
</style>
