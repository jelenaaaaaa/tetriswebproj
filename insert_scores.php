<?php
include("db_config.php");
$name = "";
$score = "";
//$level = "";

if(isset($_POST['uname']))
    $name=mysqli_real_escape_string($connection,$_POST['uname']);

if(isset($_POST['currentscore']))
    $score=mysqli_real_escape_string($connection,$_POST['currentscore']);

/*
if(isset($_POST['currentlevel']))
    $level=mysqli_real_escape_string($connection,$_POST['currentlevel']);
*/

if(!empty($name))
{
    $sql = "INSERT INTO userdata(username,score,datetime) VALUES ('$name','$score',CURRENT_TIME)";
        /*
        When level is included in the database:

        $sql = "INSERT INTO userdata(username,score,datetime,level) VALUES ('$name','$score',CURRENT_TIME,'$level')";

         */
    $result= mysqli_query($connection,$sql) or die(mysqli_error($connection));
    echo "<br>Your score has been remembered!";
}

else{
    echo "empty!<br>";
}

?>
