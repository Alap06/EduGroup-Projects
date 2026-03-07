<?php

$conn = mysqli_connect('localhost', "root", "");

if (!$conn) {
    die("La connexion à la base de données a échoué : " . mysqli_connect_error());
}
echo "Connexion établie avec succès";
mysql_select_db("sale_sport");
$usr = $_POST['user'];
$mp = $_POST['pass'];

/*if (isset($_POST['user'])) {
    $usr = $_POST['user'];
    echo "La valeur saisie est : " . $usr;
} else {
    echo "Aucune email reçue.";
}
if (isset($_POST['pass'])) {
    $mp = $_POST['pass'];
    echo "La valeur saisie est : " . $mp;
} else {
    echo "Aucune password reçue.";
}*/

$res=mysql_quary("select * from sale_sport where email='$user and password='$pass");
if (mysql_num_rows($res)>0) {
    # code...
    require 'index.html';
    
}else {
    # code...o
    echo "email dija n'existe";
}
?>
