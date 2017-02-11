<?php require_once('Connections/sentimentcn.php'); ?>
<?php
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

if ((isset($HTTP_GET_VARS['ID'])) && ($HTTP_GET_VARS['ID'] != "")) {
  $deleteSQL = sprintf("DELETE FROM profile WHERE ID=%s",
                       GetSQLValueString($HTTP_GET_VARS['ID'], "int"));

  mysql_select_db($database_sentimentcn, $sentimentcn);
  $Result1 = mysql_query($deleteSQL, $sentimentcn) or die(mysql_error());

  $deleteGoTo = "indexall.php";
  if (isset($HTTP_SERVER_VARS['QUERY_STRING'])) {
    $deleteGoTo .= (strpos($deleteGoTo, '?')) ? "&" : "?";
    $deleteGoTo .= $HTTP_SERVER_VARS['QUERY_STRING'];
  }
  header(sprintf("Location: %s", $deleteGoTo));
}

$colname_delrs = "1";
if (isset($HTTP_GET_VARS['ID'])) {
  $colname_delrs = (get_magic_quotes_gpc()) ? $HTTP_GET_VARS['ID'] : addslashes($HTTP_GET_VARS['ID']);
}
mysql_select_db($database_sentimentcn, $sentimentcn);
$query_delrs = sprintf("SELECT ID, Title, Student FROM profile WHERE ID = %s", $colname_delrs);
$delrs = mysql_query($query_delrs, $sentimentcn) or die(mysql_error());
$row_delrs = mysql_fetch_assoc($delrs);
$totalRows_delrs = mysql_num_rows($delrs);
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=big5">
<title>無標題文件</title>
</head>

<body>
<form name="form1" method="post" action="">
  <table width="95%" border="1">
    
    <tr>
      <td>書名</td>
      <td><?php echo $row_delrs['Title']; ?></td>
    </tr>
    <tr>
      <td>姓名</td>
      <td><?php echo $row_delrs['Student']; ?></td>
    </tr>
  </table>
  <p>
    <input name="Del" type="submit" id="Del" value="刪除">
  </p>
</form>
</body>
</html>
<?php
mysql_free_result($delrs);
?>

