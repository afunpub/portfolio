<?php 
session_start();
if($_SERVER['PHP_AUTH_USER'] !="admin" || $_SERVER['PHP_AUTH_PW'] !="jwes")
{
header("WWW-Authenticate: Basic realm=身分驗證");
header("HTTP/1.0 401 Unauthorized");
die("未經驗證的存取");
}
else
{
$_SESSION['Authdone']=true;
header("Location:indexall.php");
}
?>
