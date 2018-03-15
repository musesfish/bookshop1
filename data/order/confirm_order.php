<?php   
    session_start();
    header("Content-Type:application/json");
    require_once("../init.php");
    $uid=$_SESSION["uid"];
   // @$uid=$_REQUEST["uid"];
    @$arr=$_REQUEST["str"];
//    output=[
//        "address"=>{},
//        "products"=>{
//            {},
//            {}
//        }
//    ];
    $sql="SELECT * FROM bs_receiver_address WHERE user_id=$uid AND is_default=1";
    $result=sql_execute($sql);
    $output["address"]=$result;
    //echo json_encode($output);
    if(!$result){
        echo '{"code":"0","msg":"请先填写收货地址！"}';
    }else{
        @$address_id=$output["address"][0]["aid"];
        $sql="INSERT INTO bs_order VALUES(NULL,$uid,$address_id,'1',now(),'','','')";
        $result=sql_execute($sql);
        $aid=mysqli_insert_id($conn);
        //echo $aid;
        //echo count($arr);
        if($result && $aid){
            for($i=0;$i<count($arr);$i++){
               //echo $arr[$i]["bid"];
               $bid=$arr[$i]["bid"];
               $count=$arr[$i]["count"];
                $sql="INSERT INTO bs_order_detail VALUES(NULL,$aid,$bid,$count)";
                $result=sql_execute($sql);
            }
        }
      // echo $result;
        $sql="SELECT o.aid,d.count,b.md,b.subtitle,b.price,b.bid ";
        $sql .= "FROM bs_order o,bs_order_detail d,bs_book b ";
        $sql .= "WHERE d.order_id=o.aid AND d.product_id=b.bid AND o.aid=$aid";
        $result=sql_execute($sql);
        //echo $sql;
        //echo json_encode($result);

        $output["products"]=$result;
        echo json_encode($output);
    }



