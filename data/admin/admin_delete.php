<?php
	$arr=$_REQUEST['arr'];
	require_once("../init.php");
	$sql="DELETE FROM bs_user WHERE uid IN($arr)";
	$result=sql_execute($sql);
	$row=mysqli_affected_rows($conn);
	if($result==true){
		if($row!=0){
		echo "删除成功";
		}else{
			echo "删除失败";;
		}
	}else{
		echo "请检查sql语句$sql";
	}
?>