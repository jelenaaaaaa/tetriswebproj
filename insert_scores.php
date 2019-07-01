<?php
include("db_config.php");
$name = "";
$score = "";

if(isset($_POST['uname']))
    $name=mysqli_real_escape_string($connection,$_POST['uname']);

if(isset($_POST['currentscore']))
    $score=mysqli_real_escape_string($connection,$_POST['currentscore']);

if(!empty($name))
{
    $sql = "INSERT INTO userdata(username,score,datetime) VALUES ('$name','$score',CURRENT_TIME)";
    $result= mysqli_query($connection,$sql) or die(mysqli_error($connection));
    echo "<br>Your score has been remembered!";
}

else{
    echo "empty!<br>";
}



?>