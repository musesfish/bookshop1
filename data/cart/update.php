<?php
session_start();
header("Content-Type:application/json");
//header("Content-Type:text/plain");
require_once("../init.php");
@$uid=$_SESSION["uid"];
@$clearA=$_REQUEST["clearA"];
@$clearO=$_REQUEST["clearO"];
@$clearS=$_REQUEST["clearS"];
@$arr=$_REQUEST['arr'];
@$cid=$_REQUEST["cid"];//来自客户端的用户购物车的id号
@$count=$_REQUEST["count"];//来自客户端的对应购物车的商品数量

$sql_update="UPDATE bs_shopping_cart SET count=$count WHERE cid=$cid";
$sql_delete="DELETE FROM bs_shopping_cart WHERE cid=$cid";
$sql_deleteA="DELETE FROM bs_shopping_cart WHERE user_id=$uid";
$sql_deleteO="DELETE FROM bs_shopping_cart WHERE cid=$cid";
$sql_deleteS="DELETE FROM bs_shopping_cart WHERE cid IN($arr)";

if($count)//当数量为0时即为false那么就是删除操作 否则就是更新操作
  sql_execute($sql_update);
else
  sql_execute($sql_delete);

if($clearA&&$uid)//假如从session拿得到用户的id而且接收到前端传来的clearA 执行清空该用户所有购物车内容操作
  sql_execute($sql_deleteA);

if($clearO&&$cid)//假如从接收到前端传来的clearO及cid 执行清空该用户所有购物车内容操作
   sql_execute($sql_deleteO);

if($clearS&&$arr){//假如从接收到前端传来的clearO及cid 执行清空该用户所有购物车内容操作
   sql_execute($sql_deleteS);
   echo json_encode($arr);
}
echo $arr;