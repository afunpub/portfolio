
<?php require_once('Connections/sentimentcn.php'); ?>
<?php
$currentPage = $HTTP_SERVER_VARS["PHP_SELF"];

@session_start();
$maxRows_sentimentrs = 10;
$pageNum_sentimentrs = 0;
if (isset($HTTP_GET_VARS['pageNum_sentimentrs'])) {
  $pageNum_sentimentrs = $HTTP_GET_VARS['pageNum_sentimentrs'];
}
$startRow_sentimentrs = $pageNum_sentimentrs * $maxRows_sentimentrs;

mysql_select_db($database_sentimentcn, $sentimentcn);
$query_sentimentrs = "SELECT * FROM profile ORDER BY `Date` DESC";
$query_limit_sentimentrs = sprintf("%s LIMIT %d, %d", $query_sentimentrs, $startRow_sentimentrs, $maxRows_sentimentrs);
$sentimentrs = mysql_query($query_limit_sentimentrs, $sentimentcn) or die(mysql_error());
$row_sentimentrs = mysql_fetch_assoc($sentimentrs);

if (isset($HTTP_GET_VARS['totalRows_sentimentrs'])) {
  $totalRows_sentimentrs = $HTTP_GET_VARS['totalRows_sentimentrs'];
} else {
  $all_sentimentrs = mysql_query($query_sentimentrs);
  $totalRows_sentimentrs = mysql_num_rows($all_sentimentrs);
}
$totalPages_sentimentrs = ceil($totalRows_sentimentrs/$maxRows_sentimentrs)-1;

$queryString_sentimentrs = "";
if (!empty($HTTP_SERVER_VARS['QUERY_STRING'])) {
  $params = explode("&", $HTTP_SERVER_VARS['QUERY_STRING']);
  $newParams = array();
  foreach ($params as $param) {
    if (stristr($param, "pageNum_sentimentrs") == false && 
        stristr($param, "totalRows_sentimentrs") == false) {
      array_push($newParams, $param);
    }
  }
  if (count($newParams) != 0) {
    $queryString_sentimentrs = "&" . implode("&", $newParams);
  }
}
$queryString_sentimentrs = sprintf("&totalRows_sentimentrs=%d%s", $totalRows_sentimentrs, $queryString_sentimentrs);
?>


<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=big5">
<title>�L���D���</title>
</head>

<body>
<p> 
  <?php include("head.php"); ?>
</p>
<p align="right"><a href="./">�^����</a> <a href="add.php"> �ڭn�o���߱o</a>&nbsp;&nbsp;<a href="logo.php">�޲z�̵n�J</a></p>
<p>�`�@��<?php echo $totalRows_sentimentrs ?> ����ơA�ثe�b��<?php echo ($startRow_sentimentrs + 1) ?>�����<?php echo min($startRow_sentimentrs + $maxRows_sentimentrs, $totalRows_sentimentrs) ?>���C </p>
<table width="95%" border="1">
  <tr bgcolor="#00FF00"> 
    <td>�D�D</td>
    <td>�ѦW</td>
    <td>�~��</td>
    <td>�ǥ�</td>
    <td>�{�ҦѮv</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <?php do { ?>
  <tr> 
    <td><a href="index_topic.php?Topic=<?php echo $row_sentimentrs['Topic']; ?>"><?php echo $row_sentimentrs['Topic']; ?></a></td>
    <td><a href="detail.php?ID=<?php echo $row_sentimentrs['ID']; ?>" target="_blank"><?php echo $row_sentimentrs['Title'];?></a></td>
    <td><?php echo $row_sentimentrs['Grade']; ?></td>
    <td><?php echo $row_sentimentrs['Student']; ?></td>
    <td><?php echo $row_sentimentrs['Teacher']; ?></td>
    <td>&nbsp;</td>
    <td>&nbsp;<?php if (isset($_SESSION['Authdone'])){?>
	<a href=javascript:if(confirm("�T�w�n�R����?"))location="del.php?ID=<?php echo $row_sentimentrs['ID']; ?>">�R��</a>
	<?php }?>
	</td>
  </tr>
  <?php } while ($row_sentimentrs = mysql_fetch_assoc($sentimentrs)); ?>
  
</table>
<table width="95%" border="0">
  <tr>
    <td><?php if ($pageNum_sentimentrs > 0) { // Show if not first page ?>
      <div align="center"> <a href="<?php printf("%s?pageNum_sentimentrs=%d%s", $currentPage, 0, $queryString_sentimentrs); ?>">�Ĥ@��</a> 
      </div>
      <?php } // Show if not first page ?></td>
    <td> <?php if ($pageNum_sentimentrs > 0) { // Show if not first page ?>
      <div align="center"> <a href="<?php printf("%s?pageNum_sentimentrs=%d%s", $currentPage, max(0, $pageNum_sentimentrs - 1), $queryString_sentimentrs); ?>">�W�@��</a></div>
      <?php } // Show if not first page ?></td>
    <td> <?php if ($pageNum_sentimentrs < $totalPages_sentimentrs) { // Show if not last page ?>
      <div align="center"> <a href="<?php printf("%s?pageNum_sentimentrs=%d%s", $currentPage, min($totalPages_sentimentrs, $pageNum_sentimentrs + 1), $queryString_sentimentrs); ?>">�U�@��</a></div>
      <?php } // Show if not last page ?></td>
    <td> <?php if ($pageNum_sentimentrs < $totalPages_sentimentrs) { // Show if not last page ?>
      <div align="center"> <a href="<?php printf("%s?pageNum_sentimentrs=%d%s", $currentPage, $totalPages_sentimentrs, $queryString_sentimentrs); ?>">�̫�@��</a></div>
      <?php } // Show if not last page ?></td>
  </tr>
</table>
</body>
</html>
<?php
mysql_free_result($sentimentrs);
?>

