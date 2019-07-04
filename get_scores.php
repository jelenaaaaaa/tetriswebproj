<?php
include("db_config.php");
$sql = "";

$sqls[1] = "SELECT * FROM userdata ORDER BY score DESC LIMIT 5";

/*
When level is included in the database:
$sqls[1] = "SELECT * FROM userdata ORDER BY score,level DESC LIMIT 5";
 */

$sqls[2] = "SELECT * FROM userdata ORDER BY id DESC LIMIT 5";


if(isset($_GET['sql']))
    $sql=mysqli_real_escape_string($connection,$_GET['sql']);


$result= mysqli_query($connection,$sqls[$sql]) or die(mysqli_error($connection));

if (mysqli_num_rows($result)>0)
{
    while ($record = mysqli_fetch_array($result,MYSQLI_BOTH))
    {
        echo "user: $record[username],<br>score: $record[score]<br><hr style='width: 10%'>";

        /*
         When level is included in the database:

        echo "user: $record[username],<br>score: $record[score],<br>level: $level[level]<br><hr style='width: 10%'>";

         */
    }
}

?>
