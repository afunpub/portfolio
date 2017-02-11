<?php require_once('Connections/sentimentcn.php'); ?>
<?php
$colname_detailrs = "1";
if (isset($HTTP_GET_VARS['ID'])) {
  $colname_detailrs = (get_magic_quotes_gpc()) ? $HTTP_GET_VARS['ID'] : addslashes($HTTP_GET_VARS['ID']);
}
mysql_select_db($database_sentimentcn, $sentimentcn);
$query_detailrs = sprintf("SELECT * FROM profile WHERE ID = %s", $colname_detailrs);
$detailrs = mysql_query($query_detailrs, $sentimentcn) or die(mysql_error());
$row_detailrs = mysql_fetch_assoc($detailrs);
$totalRows_detailrs = mysql_num_rows($detailrs);
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=big5">
<title>無標題文件</title>
</head>

<body>
<table width="95%" border="1" cellspacing="0" bordercolor="#000000">
  <tr> 
    <td>班級</td>
    <td><?php echo $row_detailrs['Grade']; ?>年<?php echo $row_detailrs['Class']; ?>班</td>
    <td>姓名</td>
    <td><?php echo $row_detailrs['Student']; ?></td>
    <td>閱讀主題</td>
    <td><?php echo $row_detailrs['Topic']; ?></td>
  </tr>
  <tr> 
    <td>書名</td>
    <td><?php echo $row_detailrs['Title']; ?></td>
    <td>作者</td>
    <td><?php echo $row_detailrs['Name']; ?></td>
    <td>認證老師</td>
    <td><?php echo $row_detailrs['Teacher']; ?></td>
  </tr>
  <tr> 
    <td colspan="6">閱讀心得簡述</td>
  </tr>
  <tr> 
    <td colspan="6"><?php echo $row_detailrs['Content']; ?></td>
  </tr>
</table>
<div align="right"> 心得發表時間<?php echo $row_detailrs['Date']; ?> </div>
</body>
</html>
<?php
mysql_free_result($detailrs);
?>

