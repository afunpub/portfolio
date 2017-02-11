<?php
# FileName="Connection_php_mysql.htm"
# Type="MYSQL"
# HTTP="true"
$hostname_sentimentcn = "localhost";
$database_sentimentcn = "sentimentdb";
$username_sentimentcn = "root";
$password_sentimentcn = "pass@jwes";
$sentimentcn = mysql_pconnect($hostname_sentimentcn, $username_sentimentcn, $password_sentimentcn) or die(mysql_error());
?>
