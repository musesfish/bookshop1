<?php
	header("Content-Type:application/json");
	require_once("../init.php");
	@$bid=$_REQUEST["bid"];//拿到商品id
	if($bid){
		$sql="SELECT * FROM bs_book WHERE bid=$bid";//从商品表得出对应商品信息
		$output["book"]=sql_execute($sql)[0];
		$sql="SELECT * FROM bs_book_family";
		$output["family"]=sql_execute($sql);
		$sql="SELECT * FROM bs_book LIMIT 9";
		$output["all"]=sql_execute($sql);
		$sql="SELECT * FROM bs_book LIMIT 12";
		$output["books"]=sql_execute($sql);
		$sql="SELECT u.user_name,u.avatar,c.comment FROM bs_user u,bs_comment c WHERE u.uid=c.user_id AND product_id=$bid";
		$output["comments"]=sql_execute($sql);
		$sql="SELECT COUNT(*) FROM bs_comment WHERE product_id=$bid";
		$output["commentCount"]=sql_execute($sql)[0]["COUNT(*)"];
		//var_dump($output);//测试
        echo json_encode($output);
	}else{
		echo "[]";
	}
?>