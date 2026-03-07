<?php

$conn = mysqli_connect('localhost', "root", "");

if (!$conn) {
    die("La connexion à la base de données a échoué : " . mysqli_connect_error());
}

echo "Connexion établie avec succès";
mysql_select_db("sale_sport");

$usr = $_POST['user'];
$em = $_POST['ema'];
$mp = $_POST['pass'];

$res=mysql_quary("select * from sale_sport where email='$em' and password='$pass' ");
if (mysql_umber_rows($res)>0) {
    # code...
    echo "Ce personne est dija existente";
}else {
    # code...
    mysql_quary("insert Into user values(,'$usr','$em','$mp') ");
    if (mysql_affrcted_rows()) {
        # code...
        echo "Ajouté avec succès";
        require "log_sign.html";
    }
}
?>
