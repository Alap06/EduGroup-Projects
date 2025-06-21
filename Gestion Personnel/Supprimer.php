<?php
$con=mysqli_connect("localhost","root","","gestion_personnel") or die("ùmochkel connexion "); 
//recupiration  champ 
$c=$_POST['codemp'];
//verification apres suppresion
$res=mysqli_query($con,"SELECT * FROM employe WHERE codemp='$c'");
if (!$res) {
    echo "<h1>erreur de requete </h1>";
}
if (mysqli_num_rows($res) != 0) {
    mysqli_query($con,"DELETE FROM employe WHERE codemp='$c'");
    if (mysqli_affected_rows($con) >0) {
        echo "<h1>suppresion effectue avec succes</h1>";
    }else {
        echo "<h1>mochkel fi suppresion </h1>";
    }
}
mysqli_close($con);
?>