<?php
session_start();
header("Content-Type:application/json");
require_once("../init.php");
@$uid=$_SESSION["uid"];

@$update_basic=$_REQUEST["update_basic"];
@$insert_address=$_REQUEST["insert_address"];
@$update_address=$_REQUEST["update_address"];
@$delete_address=$_REQUEST["delete_address"];

    @$user_id=$_REQUEST["user_id"];
    @$aid=$_REQUEST["aid"];
    @$receiver=$_REQUEST["receiver"];
    @$province=$_REQUEST["province"];
    @$city=$_REQUEST["city"];
    @$county=$_REQUEST["county"];
    @$address=$_REQUEST["address"];
    @$cellphone=$_REQUEST["cellphone"];
    @$postcode=$_REQUEST["postcode"];
    @$is_default=$_REQUEST["is_default"];

if($update_basic){
    $user_name=$_REQUEST["user_name"];
    $gender=$_REQUEST["gender"];
    $phone=$_REQUEST["phone"];
    $email=$_REQUEST["email"];
    $sql="UPDATE bs_user SET user_name='$user_name',gender='$gender',phone='$phone',email='$email' WHERE uid=$uid";
    $result=sql_execute($sql);
    if($result){
        echo '{"code":"1","msg":"修改成功"}';
    }
}else if($insert_address){
    if($is_default){
        $sql="UPDATE bs_receiver_address SET is_default=0 WHERE user_id=$uid";
        sql_execute($sql);
    }
    $sql="INSERT INTO bs_receiver_address VALUES(null,$uid,'$receiver','$province','$city','$county','$address','$cellphone','','$postcode','',$is_default)";
    $result=sql_execute($sql);
    $row=mysqli_insert_id($conn);
    if($result && $row){
        echo '{"code":"1","msg":"添加成功"}';
    }
}else if($update_address){
    if($is_default){
        $sql="UPDATE bs_receiver_address SET is_default=0 WHERE user_id=$uid";
        sql_execute($sql);
    }
    $sql="UPDATE bs_receiver_address SET receiver='$receiver',province='$province',city='$city',county='$county',address='$address',cellphone='$cellphone',postcode='$postcode',is_default='$is_default' WHERE aid=$aid";
    $result=sql_execute($sql);
    if($result){
        echo '{"code":"1","msg":"修改成功"}';
    }
}else if($delete_address){
    $sql="DELETE FROM bs_receiver_address WHERE aid=$aid";
    $result=sql_execute($sql);
    $row=mysqli_affected_rows($conn);
    if($result && $row){
        echo '{"code":"1","msg":"删除成功"}';
    }
}else{
    $sql="SELECT * FROM bs_user WHERE uid=$uid";
    $output["basic"]=sql_execute($sql);
    $sql="SELECT * FROM bs_receiver_address WHERE user_id=$uid";
    $output["address"]=sql_execute($sql);
    echo json_encode($output);
}