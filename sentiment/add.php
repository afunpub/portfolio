<?php require_once('Connections/sentimentcn.php'); ?>
<?php
//KTML include files
require_once('ktmllite/includes/ktedit/activex.php');

function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
{
  $theValue = (!get_magic_quotes_gpc()) ? addslashes($theValue) : $theValue;

  switch ($theType) {
    case "text":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;    
    case "long":
    case "int":
      $theValue = ($theValue != "") ? intval($theValue) : "NULL";
      break;
    case "double":
      $theValue = ($theValue != "") ? "'" . doubleval($theValue) . "'" : "NULL";
      break;
    case "date":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;
    case "defined":
      $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
      break;
  }
  return $theValue;
}

$editFormAction = $HTTP_SERVER_VARS['PHP_SELF'];
if (isset($HTTP_SERVER_VARS['QUERY_STRING'])) {
  $editFormAction .= "?" . $HTTP_SERVER_VARS['QUERY_STRING'];
}

if ((isset($HTTP_POST_VARS["MM_insert"])) && ($HTTP_POST_VARS["MM_insert"] == "form1")) {
  $insertSQL = sprintf("INSERT INTO profile (`Date`, Topic, Title, Content, Name, Student, Grade, `Class`, Teacher) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
                       GetSQLValueString($HTTP_POST_VARS['Date'], "date"),
                       GetSQLValueString($HTTP_POST_VARS['Topic'], "text"),
                       GetSQLValueString($HTTP_POST_VARS['Title'], "text"),
                       GetSQLValueString($HTTP_POST_VARS['Content'], "text"),
                       GetSQLValueString($HTTP_POST_VARS['Name'], "text"),
                       GetSQLValueString($HTTP_POST_VARS['Student'], "text"),
                       GetSQLValueString($HTTP_POST_VARS['Grade'], "text"),
                       GetSQLValueString($HTTP_POST_VARS['Class'], "text"),
                       GetSQLValueString($HTTP_POST_VARS['Teacher'], "text"));

  mysql_select_db($database_sentimentcn, $sentimentcn);
  $Result1 = mysql_query($insertSQL, $sentimentcn) or die(mysql_error());

  $insertGoTo = "indexall.php";
  if (isset($HTTP_SERVER_VARS['QUERY_STRING'])) {
    $insertGoTo .= (strpos($insertGoTo, '?')) ? "&" : "?";
    $insertGoTo .= $HTTP_SERVER_VARS['QUERY_STRING'];
  }
  header(sprintf("Location: %s", $insertGoTo));
}

mysql_select_db($database_sentimentcn, $sentimentcn);
$query_addrs = "SELECT Topic FROM topic";
$addrs = mysql_query($query_addrs, $sentimentcn) or die(mysql_error());
$row_addrs = mysql_fetch_assoc($addrs);
$totalRows_addrs = mysql_num_rows($addrs);
 
$Grade=array("一","二","三","四","五","六");
$Class=array("忠","孝","仁","愛");
?>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=big5">
<title>無標題文件</title>
</head>

<body>
<form name="form1" method="POST" action="<?php echo $editFormAction; ?>">
  <table width="95%" border="1" cellspacing="0" bordercolor="#000000">
    <tr> 
      <td>班級</td>
      <td> <select name="Grade" id="Grade">
          <?php 
		  foreach($Grade as $val){echo "<option value=\"$val\" selected>$val</option>";}
		  ?>
        </select>
        年 <select name="Class" id="Class">
          <?php 
		  foreach($Class as $val){echo "<option value=\"$val\" selected>$val</option>";}
		  ?>
        </select>
        班 </td>
      <td>姓名</td>
      <td> <input name="Student" type="text" id="Student"></td>
      <td>閱讀主題</td>
      <td> <select name="Topic" id="Topic">
          <?php
do {  
?>
          <option value="<?php echo $row_addrs['Topic']?>"<?php if (!(strcmp($row_addrs['Topic'], $row_addrs['Topic']))) {echo "SELECTED";} ?>><?php echo $row_addrs['Topic']?></option>
          <?php
} while ($row_addrs = mysql_fetch_assoc($addrs));
  $rows = mysql_num_rows($addrs);
  if($rows > 0) {
      mysql_data_seek($addrs, 0);
	  $row_addrs = mysql_fetch_assoc($addrs);
  }
?>
        </select></td>
    </tr>
    <tr> 
      <td>書名</td>
      <td> <input name="Title" type="text" id="Title"></td>
      <td>作者</td>
      <td> <input name="Name" type="text" id="Name"></td>
      <td>認證教師</td>
      <td> <input name="Teacher" type="text" id="Teacher"></td>
    </tr>
    <tr> 
      <td colspan="6"><div align="center">閱讀心得簡述</div></td>
    </tr>
    <tr> 
      <td height="80" colspan="6"> <div align="center">
          <input name="Content" type="hidden" id="Content" value=" ">
          <?php 
   $KT_display = "Cut,Copy,Paste,Insert Table,Toggle Vis/Invis,Toggle WYSIWYG,Bold,Italic,Underline,Align Left,Align Center,Align Right,Align Justify,Background Color,Foreground Color,Undo,Redo,Bullet List,Numbered List,Indent,Outdent,HR,Font Type,Font Size,Insert Link,Clean Word,Heading List";
   showActivex('Content', 650, 350, false,$KT_display, "ktmllite/", "", "../../../ktmllite/images/uploads/", "../../../ktmllite/files/uploads/",1, "", -1, "english", "yes", "no");
?>
          <input type="submit" name="Submit" value="送出">
          <input type="reset" name="Submit2" value="重設">
        </div></td>
    </tr>
  </table>
  <p> 
    <input name="Date" type="hidden" id="Date" value="<?php echo date("Y-m-d H:i:s");?>">
  </p>
  <input type="hidden" name="MM_insert" value="form1">
</form>
</body>
</html>
<?php
mysql_free_result($addrs);
?>

