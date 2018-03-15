<?php
	header("Content-Type:application/json");
	require_once("../init.php");
	$output=[
		"recommended"=>[],
		"new_arrival"=>[],
		"top_sale"=>[],
		"all"=>[],
		"allreverse"=>[],
		"family"=>[]
	];
	$sql="SELECT * FROM bs_index_product WHERE seq_recommended>0 ORDER BY seq_recommended DESC LIMIT 6";
	$output["recommended"]=sql_execute($sql);
	$sql="SELECT * FROM bs_index_product WHERE seq_new_arrival>0 ORDER BY seq_new_arrival LIMIT 6";
	$output["new_arrival"]=sql_execute($sql);
	$sql="SELECT * FROM bs_index_product WHERE seq_top_sale>0 ORDER BY seq_top_sale LIMIT 6";
	$output["top_sale"]=sql_execute($sql);
	$sql="SELECT * FROM bs_index_product";
	$output["all"]=sql_execute($sql);
	$sql="SELECT * FROM bs_index_product ORDER BY pid DESC";
	$output["allreverse"]=sql_execute($sql);
	$sql="SELECT * FROM bs_book_family";
	$output["family"]=sql_execute($sql);
	echo json_encode($output);
?>