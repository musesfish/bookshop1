<?php
session_start();
header("Content-Type:application/text");
require_once("../init.php");
@$uid=$_SESSION["uid"];

@$str=$_REQUEST["str"];
@$strArr=explode("__",$str);
@$bid=$strArr[0];//来自客户端的商品id
@$md=$strArr[4];
@$subtitle=$strArr[3];
@$price=$strArr[1];
@$fixprice=$strArr[2];
//echo var_dump($strArr);

$sql_has="SELECT COUNT(*) FROM bs_collection WHERE user_id=$uid AND product_id=$bid";
$sql_add="INSERT INTO bs_collection(lid,user_id,product_id,md,subtitle,price,fixprice) VALUES(null,$uid,$bid,'$md','$subtitle','$price','$fixprice')";

$result=sql_execute($sql_has);
if($result[0]["COUNT(*)"]>0){
    echo "商品已存在收藏夹中";
}else{
   $result=sql_execute($sql_add);
   if($result) echo "添加成功";
}
