<?php
	session_start();//打开session
    header("Content-Type:application/json");
	require_once("../init.php");
	@$uid=$_SESSION["uid"];//取得session中的uid
	if($uid){//如果uid存在
		$sql="SELECT uname FROM bs_user WHERE uid=$uid";
		$result=sql_execute($sql);
		echo json_encode(["ok"=>1,"uname"=>$result[0]["uname"]]);//返回对应姓名
	}
	else
		echo json_encode(["ok"=>0,"uname"=>""]);//uid不存在返回为空
?>