<?php 
session_start();
if($_SERVER['PHP_AUTH_USER'] !="admin" || $_SERVER['PHP_AUTH_PW'] !="jwes")
{
header("WWW-Authenticate: Basic realm=��������");
header("HTTP/1.0 401 Unauthorized");
die("���g���Ҫ��s��");
}
else
{
$_SESSION['Authdone']=true;
header("Location:indexall.php");
}
?>
