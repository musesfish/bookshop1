<?php
    session_start();
    header("Content-Type:application/json");
    require_once("../init.php");
    $uid=$_SESSION["uid"];
//    @$uid=$_REQUEST["uid"];
//    $aids=[0,1,2,3,...];
//    $orders=[
//        aids[0]=>{
//            dids[0]=>{ },
//            dids[1]=>{ },
//            ...
//        },
//        aids[1]=>{
//
//        },
//        ...
//    ];
      $sql="SELECT aid FROM bs_order WHERE user_id=$uid";
      $result=sql_execute($sql);
      for($i=0;$i<count($result);$i++){
        $orders[]=$result[$i]["aid"];
      }
      //var_dump($orders);
      for($j=0;$j<count($orders);$j++){
            $sql="SELECT o.status,o.aid,d.count,b.md,b.subtitle,b.price,a.receiver,b.bid ";
            $sql .= "FROM bs_order o,bs_order_detail d,bs_book b,bs_receiver_address a ";
            $sql .= "WHERE d.order_id=o.aid AND o.user_id=$uid AND d.product_id=b.bid AND a.aid=o.address_id ";
            $sql .= "AND o.aid=$orders[$j]";
            $result=sql_execute($sql);
            //echo json_encode($result);
            $orders[$j]=$result;
            //var_dump($orders);
      }
echo json_encode($orders);


//    $sql="SELECT o.status,o.aid,d.count,b.md,b.subtitle,b.price,a.receiver,b.bid ";
//    $sql .= "FROM bs_order o,bs_order_detail d,bs_book b,bs_receiver_address a ";
//    $sql .= "WHERE d.order_id=o.aid AND o.user_id=$uid AND d.product_id=b.bid AND a.aid=o.address_id ";
//    echo $sql;
//    $result=sql_execute($sql);
//    echo json_encode($result);
?>