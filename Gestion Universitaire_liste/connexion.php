<?php
/*
    Gestion Universitaire
    Author: Ala Amara
    Date: 2023-09-10
*/
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "gestion_univ";

$conn = mysqli_connect($host, $user, $pass, $dbname);

if (!$conn) {
    die("Erreur de connexion : " . mysqli_connect_error());
}
?>