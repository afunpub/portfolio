<?php require_once('Connections/sentimentcn.php'); ?>
<?php require_once('Connections/sentimentcn.php'); ?>

<?php
$currentPage = $HTTP_SERVER_VARS["PHP_SELF"];

$maxRows_topicrs = 10;
$pageNum_topicrs = 0;
if (isset($HTTP_GET_VARS['pageNum_topicrs'])) {
  $pageNum_topicrs = $HTTP_GET_VARS['pageNum_topicrs'];
}
$startRow_topicrs = $pageNum_topicrs * $maxRows_topicrs;

$colname_topicrs = "1";
if (isset($HTTP_GET_VARS['Topic'])) {
  $colname_topicrs = (get_magic_quotes_gpc()) ? $HTTP_GET_VARS['Topic'] : addslashes($HTTP_GET_VARS['Topic']);
}
mysql_select_db($database_sentimentcn, $sentimentcn);
$query_topicrs = sprintf("SELECT * FROM profile WHERE Topic = '%s'", $colname_topicrs);
$query_limit_topicrs = sprintf("%s LIMIT %d, %d", $query_topicrs, $startRow_topicrs, $maxRows_topicrs);
$topicrs = mysql_query($query_limit_topicrs, $sentimentcn) or die(mysql_error());
$row_topicrs = mysql_fetch_assoc($topicrs);

if (isset($HTTP_GET_VARS['totalRows_topicrs'])) {
  $totalRows_topicrs = $HTTP_GET_VARS['totalRows_topicrs'];
} else {
  $all_topicrs = mysql_query($query_topicrs);
  $totalRows_topicrs = mysql_num_rows($all_topicrs);
}
$totalPages_topicrs = ceil($totalRows_topicrs/$maxRows_topicrs)-1;

$queryString_topicrs = "";
if (!empty($HTTP_SERVER_VARS['QUERY_STRING'])) {
  $params = explode("&", $HTTP_SERVER_VARS['QUERY_STRING']);
  $newParams = array();
  foreach ($params as $param) {
    if (stristr($param, "pageNum_topicrs") == false && 
        stristr($param, "totalRows_topicrs") == false) {
      array_push($newParams, $param);
    }
  }
  if (count($newParams) != 0) {
    $queryString_topicrs = "&" . implode("&", $newParams);
  }
}
$queryString_topicrs = sprintf("&totalRows_topicrs=%d%s", $totalRows_topicrs, $queryString_topicrs);
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=big5">
<title>�L���D���</title>
</head>

<body>
<table width="95%" border="1">
  <tr bgcolor="#00FF00"> 
    <td>�D�D</td>
    <td>�ѦW</td>
    <td>�~��</td>
    <td>�ǥ�</td>
    <td>�{�ҦѮv</td>
  </tr>
  <?php do { ?>
  <tr> 
    <td><?php echo $row_topicrs['Topic']; ?></td>
    <td><a href="detail.php?ID=<?php echo $row_topicrs['ID']; ?>"><?php echo $row_topicrs['Title']; ?></a></td>
    <td><?php echo $row_topicrs['Grade']; ?></td>
    <td><?php echo $row_topicrs['Student']; ?></td>
    <td><?php echo $row_topicrs['Teacher']; ?></td>
  </tr>
  <?php } while ($row_topicrs = mysql_fetch_assoc($topicrs)); ?>
</table>
<table width="95%" border="0">
  <tr>
    <td><?php if ($pageNum_topicrs > 0) { // Show if not first page ?>
      <div align="center"> <a href="<?php printf("%s?pageNum_topicrs=%d%s", $currentPage, 0, $queryString_topicrs); ?>">�Ĥ@��</a> 
      </div>
      <?php } // Show if not first page ?></td>
    <td> <?php if ($pageNum_topicrs > 0) { // Show if not first page ?>
      <div align="center"> <a href="<?php printf("%s?pageNum_topicrs=%d%s", $currentPage, max(0, $pageNum_topicrs - 1), $queryString_topicrs); ?>">�W�@��</a></div>
      <?php } // Show if not first page ?></td>
    <td> <?php if ($pageNum_topicrs < $totalPages_topicrs) { // Show if not last page ?>
      <div align="center"> <a href="<?php printf("%s?pageNum_topicrs=%d%s", $currentPage, min($totalPages_topicrs, $pageNum_topicrs + 1), $queryString_topicrs); ?>">�U�@��</a></div>
      <?php } // Show if not last page ?></td>
    <td> <?php if ($pageNum_topicrs < $totalPages_topicrs) { // Show if not last page ?>
      <div align="center"> <a href="<?php printf("%s?pageNum_topicrs=%d%s", $currentPage, $totalPages_topicrs, $queryString_topicrs); ?>">�̫�@��</a></div>
      <?php } // Show if not last page ?></td>
  </tr>
</table>
<p>&nbsp;</p>
</body>
</html>
<?php
mysql_free_result($topicrs);
?>

