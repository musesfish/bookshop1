<?php
    session_start();
	/*用户注册页面*/
	/*连接数据库*/
	require_once('../init.php');
	/*获取来自客户端的数据*/
	@$uname=$_REQUEST['uname'];
	@$upwd=$_REQUEST['upwd'];
	@$email=$_REQUEST['email'];
	@$phone=$_REQUEST['phone'];
	/*做基本判断数据是否重复*/
	if($uname!=null&&$upwd==null){
		$sql="SELECT * FROM bs_user WHERE uname='$uname' ";
		$result=sql_execute($sql);
		if($result!=null)
			echo "0,用户名已被注册！";
		else 
			echo "1,用户名可以使用！" ;
	}
	if($uname!=null&&$upwd!=null&&$email!=null&&$phone!=null){
		$sql="INSERT INTO bs_user VALUES (NULL,'$uname','$upwd','$email','$phone',NULL,NULL,NULL)";
		$result=sql_execute($sql);
		$row=mysqli_insert_id($conn);
		if($result==false){
			echo "请检查sql语句：$sql";
		}else{
			if($row!=""){
				echo $row.','.$uname.','.$upwd;
//				echo "alert('注册成功!即将去往登录页面！');location.href='login.html';";
			}else{
			    echo "注册失败";
//				echo "alert('注册失败');location.href='register.html';";
			}
		}
	}
?>

