<?php
session_start();
header("Content-Type:application/json");
require_once("../init.php");
@$uid=$_SESSION["uid"];
$output=[
    "data"=>[],
    "count"=>0
];
if($uid){//用户在线即将该用户的对应的所有收藏内容及对应商品详情应客户端请求相应进行返回
    $sql="SELECT COUNT(*) FROM bs_collection WHERE user_id=$uid";
    $result=sql_execute($sql);
    $output["count"]=$result[0]["COUNT(*)"];
    $sql="SELECT lid,user_id,product_id,md,subtitle,price,fixprice FROM bs_collection WHERE user_id=$uid";
    $output["data"]=sql_execute($sql);
    echo json_encode($output);
}else echo null;//用户不在线 收藏夹初始化的请求返回空
