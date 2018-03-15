<?php
	header("Content-Type:application/json");
	require_once("../init.php");
	$sql="SELECT * FROM bs_index_carousel LIMIT 6";
	$data=sql_execute($sql);
	echo json_encode($data);
?>