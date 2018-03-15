<?php
session_start();
header("Content-Type:application/json");
require_once("../init.php");
@$uid=$_SESSION["uid"];
@$lid=$_REQUEST["lid"];//某条收藏的id
@$arr=$_REQUEST['ids'];

//$array=explode(separator,$string);
//$string=implode(glue,$array);

$sql="DELETE FROM bs_collection WHERE lid IN($arr)";
$result=sql_execute($sql);
if($result) echo '{"msg":"删除成功"}';
