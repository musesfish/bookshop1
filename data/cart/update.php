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
@$cid=$_REQUEST["cid"];//���Կͻ��˵��û����ﳵ��id��
@$count=$_REQUEST["count"];//���Կͻ��˵Ķ�Ӧ���ﳵ����Ʒ����

$sql_update="UPDATE bs_shopping_cart SET count=$count WHERE cid=$cid";
$sql_delete="DELETE FROM bs_shopping_cart WHERE cid=$cid";
$sql_deleteA="DELETE FROM bs_shopping_cart WHERE user_id=$uid";
$sql_deleteO="DELETE FROM bs_shopping_cart WHERE cid=$cid";
$sql_deleteS="DELETE FROM bs_shopping_cart WHERE cid IN($arr)";

if($count)//������Ϊ0ʱ��Ϊfalse��ô����ɾ������ ������Ǹ��²���
  sql_execute($sql_update);
else
  sql_execute($sql_delete);

if($clearA&&$uid)//�����session�õõ��û���id���ҽ��յ�ǰ�˴�����clearA ִ����ո��û����й��ﳵ���ݲ���
  sql_execute($sql_deleteA);

if($clearO&&$cid)//����ӽ��յ�ǰ�˴�����clearO��cid ִ����ո��û����й��ﳵ���ݲ���
   sql_execute($sql_deleteO);

if($clearS&&$arr){//����ӽ��յ�ǰ�˴�����clearO��cid ִ����ո��û����й��ﳵ���ݲ���
   sql_execute($sql_deleteS);
   echo json_encode($arr);
}
echo $arr;