<?php
    header("Content-Type:application/json");
    require("../init.php");
    $sql="SELECT * FROM bs_book_family";
    $output=sql_execute($sql);
    echo json_encode($output);