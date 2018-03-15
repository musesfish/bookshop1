<?php
	$uname=$_REQUEST['uname'];
	$uid=$_REQUEST['uid'];
	$user_name=$_REQUEST['user_name'];
	$email=$_REQUEST['email'];
	$gender=$_REQUEST['gender'];
	$phone=$_REQUEST['phone'];
	$avatar=$_REQUEST['avatar'];
	@$currenPage=$_REQUEST['currentPage'];
	require_once('../init.php');
	$sql="UPDATE bs_user SET uname='$uname',avatar='$avatar',phone='$phone',email='$email',user_name='$user_name',gender='$gender' WHERE uid=$uid";
	$result=sql_execute($sql);
	$row=mysqli_affected_rows($conn);
	if($result==false){
		echo "<script>alert('请检查'.$sql);location.href='../../admin.html';</script>";
	}else{
		if($row!=""){
			echo "<script>alert('修改成功');location.href='../../admin.html';</script>";
		}else{
			echo "<script>alert('修改失败');location.href='../../admin.html';</script>";
		}
	}
?>