<?php
	session_start();
	header("Content-Type:application/json");
	/*获取来自客户端的数据*/
	@$uname=$_REQUEST["uname"];
	@$upwd=$_REQUEST["upwd"];
	@$v = $_REQUEST["vcode"];//输入次数
    @$code = $_REQUEST["code"];//用户输入的验证码

    if($v>4){
         @$sessionFailCount = $_SESSION["failCount"];//来自code_gg.php生成的验证码
         if($sessionFailCount!=$code){
            echo '{"code":-2,"msg":"验证码有误"}';
            exit;
         }
    }

	/*连接到数据库*/
	require_once("../init.php");
	/*编写sql语句*/
	$sql="SELECT * FROM bs_user WHERE uname='$uname' AND upwd='$upwd'";
	/*获取sql语句查询结果*/
	$result=sql_execute($sql);
	/*反馈结果给客户端*/
	if($result){
	    $_SESSION["uid"]=$result[0]["uid"];//登录成功就将uid存入session中
		$uid = $result[0]["uid"];
        echo json_encode(["code"=>1,"msg"=>"登录成功，即将去往首页","uid"=>$uid,"uname"=>$uname]);
	}else{
		echo json_encode(["code"=>-2,"msg"=>"用户名或密码有误"]);
	}
?>