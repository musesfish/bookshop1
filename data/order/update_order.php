<?php
    session_start();
    header("Content-Type:application/json");
    require_once("../init.php");
    $uid=$_SESSION["uid"];
    @$aid=$_REQUEST["aid"];
    @$updateOrder=$_REQUEST["updateOrder"];

    if($updateOrder=="1"){
        $sql="UPDATE bs_order SET status='5' WHERE aid=$aid";
        $result=sql_execute($sql);
        $row=mysqli_affected_rows($conn);
        if($result && $row){
            echo '{"code":1,"msg":"订单已取消！"}';
        }
    }else if($updateOrder=="2"){
        $sql="DELETE FROM bs_order_detail WHERE order_id=$aid";
        $result=sql_execute($sql);
        $sql="DELETE FROM bs_order WHERE aid=$aid";
        $result=sql_execute($sql);
        if($result){
            echo '{"code":1,"msg":"已成功删除此订单记录！"}';
        }
    }else if($updateOrder=="3"){
        $sql="UPDATE bs_order SET status='2' WHERE aid=$aid";
        $result=sql_execute($sql);
        $row=mysqli_affected_rows($conn);
        if($result && $row){
            echo '{"code":1,"msg":"支付成功，订单已准备发货！"}';
        }
    }

