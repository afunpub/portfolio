<?php require_once('Connections/sentimentcn.php'); ?>
<?php
mysql_select_db($database_sentimentcn, $sentimentcn);
$query_chart = "SELECT Grade ,COUNT(*) AS Total FROM sentimentdb.profile GROUP BY Grade";
$chart = mysql_query($query_chart, $sentimentcn) or die(mysql_error());
$row_chart = mysql_fetch_assoc($chart);
$totalRows_chart = mysql_num_rows($chart);
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=big5">
<title>無標題文件</title>
</head>

<body>

</body>
</html>
<?php
mysql_free_result($chart);
?>

