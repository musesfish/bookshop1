<?php
	/*服务器端响应回来的数据是JSON格式，需增加响应消息头*/
	header("Content-Type:application/json");
	/*获取来自客户端数据*/
	@$pageSize=$_REQUEST['pageSize'];
	@$currentPage=$_REQUEST['currentPage'];
	@$search=$_REQUEST['search'];
	/*初始化每页显示行数及当前页码和搜索条件*/
	if($pageSize==""){
		$pageSize=10;
	}
	if($currentPage==""){
		$currentPage=1;
	}
	if($search==""){
		$search="'%'";
	}else{
		$search="'$search%'";
	}
	/*sql语句分页变量*/
	$start=($currentPage-1)*$pageSize;
	/*连接到数据库*/
	require_once('../init.php');
	/*分页查询数据的sql语句*/
	$sql="SELECT * FROM bs_user WHERE uname LIKE $search LIMIT $start,$pageSize";
	/*获取到当前页的相关数据*/
	$array=sql_execute($sql);
	
	/*用户表的用户数量的sql语句*/
	$sql="SELECT COUNT(*) FROM bs_user";
	$row=sql_execute($sql);
	/*获取到用户总数*/
	$total=$row[0]['COUNT(*)'];
	/*向下取整得到页数*/
	$totalPage=ceil($total/$pageSize);
	/*首页*/
	$firstPage=1;
	/*上一页*/
	$prePage=1;
	if($currentPage!=1){
		$prePage=$currentPage-1;
	}
	/*下一页*/
	$nextPage=$totalPage;
	if($currentPage!=$totalPage){
		$nextPage=$currentPage+1;
	}

	/*最新一个用户的id号的sql语句*/
	$sql="SELECT MAX(uid) FROM bs_user";
	/*获取到最新一个用户的id号*/
	$uid=sql_execute($sql)[0]['MAX(uid)'];

	/*将 首页上一页下一页总页数用户id 编成json格式字符串*/
	$pageInfo="{\"firstPage\":$firstPage,\"prePage\":$prePage,\"nextPage\":$nextPage,\"totalPage\":$totalPage,\"uid\":$uid}";
	/*将上面的字符串加入到 当前页数据 的数组的尾部*/
	array_push($array,$pageInfo);
	/*向客户端反馈涵盖所有查询数据的 json格式的字符串*/
	echo json_encode($array);
?>
