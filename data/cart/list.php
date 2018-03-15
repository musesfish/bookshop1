<?php
session_start();
header("Content-Type:application/json");
require_once("../init.php");
@$uid=$_SESSION["uid"];
$output=[
    "data"=>[],
    "hcount"=>0
];
if($uid){//用户在线即将该用户的对应的所有购物车内容及对应商品详情应客户端请求相应进行返回
    $sql="SELECT cid,bid,title,price,fixprice,count,md,subtitle,classification FROM bs_shopping_cart INNER JOIN bs_book ON bid=product_id WHERE user_id=$uid";
    $output["data"]=sql_execute($sql);
    $sql="SELECT SUM(count) AS count FROM bs_shopping_cart WHERE user_id=$uid";
    $output["hcount"]=sql_execute($sql)[0]["count"];
    echo json_encode($output);
}else echo null;//用户不在线 购物车初始化的请求返回空
