<?php
	header("Content-Type:application/json");
	require_once("../init.php");
	@$kw=$_REQUEST["term"];
	$sql="SELECT bid,price,title FROM bs_book";
	if($kw){
		$kws=explode(" ",$kw);//js:split
		for($i=0;$i<count($kws);$i++){
			$kws[$i]=" title LIKE '%".$kws[$i]."%'";
		}
		$where=" WHERE ".implode(" and ",$kws);//js:join  where  title like '%apple%' and  title like '%i5%'
		$sql=$sql.$where;
	}
	$sql=$sql." ORDER BY price DESC LIMIT 10 ";
	echo json_encode(sql_execute($sql));
?>