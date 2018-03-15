<?php
    header("Content-Type:application/json");
    require("../init.php");
    @$kw=$_REQUEST["kw"];
    $sql="SELECT title,author,bid FROM bs_book WHERE title LIKE '$kw%' LIMIT 8";
    $result=sql_execute($sql);
    echo json_encode($result);