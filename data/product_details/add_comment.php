<?php
session_start();
header("Content-Type:application/json");
require_once("../init.php");
$uid=$_SESSION["uid"];
@$bid=$_REQUEST["bid"];
@$comment=$_REQUEST["comment"];
$sql_has="SELECT * FROM bs_comment WHERE product_id=$bid AND user_id=$uid";
$sql_insert="INSERT INTO bs_comment(cid,user_id,product_id,comment) VALUES(null,$uid,$bid,'".$comment."')";//如果没有对应购物车id则插入对应的购物车
if(!count(sql_execute($sql_has))){
  $result=sql_execute($sql_insert);
  $row=mysqli_insert_id($conn);
  if($result){
    if($row>0){
        echo '{"code":"1","msg":"感谢您的评价"}';
    }else{
        echo '{"code":"0","msg":"网络故障，稍后重试"}';
    }
  }else{
    echo '{"code":"0","msg":"后台服务器忙，暂时无法连接$sql_insert"}';
  }
}
else{
  echo '{"code":"0","msg":"您已对此书进行过评价"}';
}
//如果购物车中没有，就insert
//否则 就update