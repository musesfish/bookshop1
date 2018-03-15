<?php
	$db_host='127.0.0.1';
	$db_user='root';
	$db_password='';
	$db_database='bs';
	$db_port=3306;
	$db_charset='UTF8';
	
	header('Access-Control-Allow-Origin:*');

	$conn=mysqli_connect($db_host,$db_user,$db_password,$db_database,$db_port);
	mysqli_query($conn,"SET NAMES $db_charset");
	function sql_execute($sql){
		global $conn;
		$result=mysqli_query($conn,$sql);
		if(stripos($sql,'SELECT')===0){
			if(!$result){
				return  "查询执行失败！请检查SQL语法：$sql";
			}else{
				return $rowList=mysqli_fetch_all($result,MYSQLI_ASSOC);
			}
		}else{
			return $result;
		}
	}
?>
