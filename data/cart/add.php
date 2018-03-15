<?php
session_start();
header("Content-Type:text/plain");
require_once("../init.php");
$uid=$_SESSION["uid"];
@$bid=$_REQUEST["bid"];
$sql_has="SELECT * FROM bs_shopping_cart WHERE product_id=$bid AND user_id=$uid";//根据客户端的用户id以及商品id找对应的用户购物车
$sql_insert="INSERT INTO bs_shopping_cart(cid,user_id,product_id,count) VALUES(null,$uid,$bid,1)";//如果没有对应购物车id则插入对应的购物车
$sql_update="UPDATE bs_shopping_cart SET count=count+1 WHERE product_id=$bid AND user_id=$uid";//如果有了对应的id就直接进行更新对应商品数量操作
if(count(sql_execute($sql_has)))
  sql_execute($sql_update);
else
  sql_execute($sql_insert);
//如果购物车中没有，就insert
//否则 就update