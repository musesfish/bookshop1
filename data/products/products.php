<?php
	header("Content-Type:application/json");
	require_once("../init.php");

	$output=[
		"count"=>0,
		"pageSize"=>5,
		"pageCount"=>0,
		"pageNo"=>0,
		"data"=>[]
	];
	@$classify=urldecode($_REQUEST["classify"]);
	@$author=urldecode($_REQUEST["author"]);
    @$discount=urldecode($_REQUEST["discount"]);
    @$public=urldecode($_REQUEST["public"]);

    @$priced=urldecode($_REQUEST["priced"]);
    @$publicd=urldecode($_REQUEST["publicd"]);
    @$authord=urldecode($_REQUEST["authord"]);
    @$discountd=urldecode($_REQUEST["discountd"]);

	@$hprice=intval($_REQUEST["hprice"]);
	@$lprice=intval($_REQUEST["lprice"]);

	@$kw=urldecode($_REQUEST["kw"]);
	@$pno=$_REQUEST["pno"];
	@$fid=$_REQUEST["fid"];

	if(!$pno) $pno=0;

	$sql="SELECT * FROM bs_book WHERE 1=1";
	if($kw){
		$kws=explode(" ",$kw);//js:split
		for($i=0;$i<count($kws);$i++){
			$kws[$i]=" title LIKE '%".$kws[$i]."%'";
		}
		$where=" AND".implode(" AND",$kws);//js:join  where  title like '%apple%' and  title like '%i5%'
		$sql=$sql.$where;
	}

	if($fid){
		$where=" AND family_id='$fid'";
		$sql=$sql.$where;
	}

    if($classify){
        $sql=$sql." AND classification='$classify'";
    }

    if($author){
        $sql=$sql." AND author='$author'";
    }

    if($public){
        $sql=$sql." AND publish='$public'";
    }

    if($discount){
        $sql=$sql." AND discount='$discount'";
    }

    if($lprice&&$hprice){
        $sql=$sql." AND price>$lprice AND price<$hprice";
    }

    if($priced=="d"){
        $sql=$sql." ORDER BY price DESC";
    }else if($priced=="u"){
    	$sql=$sql." ORDER BY price ASC";
    }

    if($authord=="d"){
        $sql=$sql." ORDER BY author DESC";
    }else if($authord=="u"){
        $sql=$sql." ORDER BY author ASC";
     }

    if($publicd=="d"){
        $sql=$sql." ORDER BY publish DESC";
    }else if($publicd=="u"){
         $sql=$sql." ORDER BY publish ASC";
    }

    if($discountd=="d"){
        $sql=$sql." ORDER BY discount DESC";
    }else if($discountd=="u"){
         $sql=$sql." ORDER BY discount ASC";
    }

	$output["count"]=count(sql_execute($sql));//总数据数
	$output["pageCount"]=ceil($output["count"]/$output["pageSize"]);//页码数
	$output["pageNo"]=$pno;//当前页码
	$sql=$sql." LIMIT ".($pno*$output["pageSize"]).",".$output["pageSize"];// limit 0,5;
	$output["data"]=sql_execute($sql);//当页数据

	//echo $sql;
	//echo "\n\n";
	echo json_encode($output);
?>