<?php
session_start();
header("Content-Type:application/json");
require_once("../init.php");
@$uid=$_SESSION["uid"];

$mypic = $_FILES["avatar"];
//echo json_encode($mypic);
if(!empty($mypic)){
    $picname = $_FILES['avatar']['name'];
    $picsize = $_FILES['avatar']['size'];
    if ($picsize > 512000) {
        echo '{"code":-1,"msg",""图片大小不能超过500k"}';
        exit;
    }
    $type = strstr($picname, '.');
    if ($type != ".gif" && $type != ".jpg"&& $type != ".png") {
        echo '{"code":-2,"msg","上传文件格式不正确"}';
        exit;
    }
    $pics =  time().rand(1,9999). $type;
    //上传路径
    $pic_path = "img/avatar/". $pics;
    move_uploaded_file($mypic["tmp_name"],"../../".$pic_path);
//    echo json_encode($pic_path);

    if($uid){
        $sql = "UPDATE  bs_user SET avatar='$pic_path' ";
        $sql .= " WHERE uid = $uid";
        $result=mysqli_query($conn,$sql);
        $row=mysqli_affected_rows($conn);
        if($row){
            echo '{"code":1,"msg":"上传成功"}';
        }else{
            echo '{"code":0,"msg":"上传失败"}';
        }
    }
}
?>