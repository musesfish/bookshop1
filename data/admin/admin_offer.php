<?php
	@$uid=$_REQUEST['uid'];
	@$avatar=$_REQUEST['avatar'];
	@$uname=$_REQUEST['uname'];
	@$user_name=$_REQUEST['user_name'];
	@$gender=$_REQUEST['gender'];
	@$email=$_REQUEST['email'];
	@$phone=$_REQUEST['phone'];
	$upwd='123456';
	if($uid==""||$avatar==""||$uname==""||$user_name==""||$gender==""||$email==""||$phone==""){
		echo "alert('用户信息没填全');location.href='admin.html';";
	}
	require_once('../init.php');
	$sql="INSERT INTO bs_user VALUES (NULL,'$uname','$upwd','$email','$phone','$avatar','$user_name','$gender')";
	$result=sql_execute($sql);
	$row=mysqli_insert_id($conn);
	if($result==false){
		echo "请检查sql语句：$sql";
	}else{
		if($row!=""){
			echo "添加用户成功";
		}else{
			echo "添加用户失败";
		}
	}
?>