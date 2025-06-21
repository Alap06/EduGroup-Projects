<?php
$con=mysqli_connect("localhost","root","","gestion_personnel") or die("ùmochkel connexion "); 
//recupiration  champ 
$c=$_POST['codemp'];
$nom=$_POST['nom'];
$pre=$_POST['pre'];
$adr=$_POST['adr'];
$d=$_POST['dn'];
$sal=$_POST['sal'];

//verification apres insertion 
$req1="SELECT * FROM employe WHERE codeemp='$c'";
$res=mysqli_query($con,$req1);
if (mysqli_num_rows($res)>0) {
    echo "Cet employé existe déjà!";
}
else {
    $res2=mysqli_query($con,"INSERT INTO employe VALUES ('$c', '$nom', '$pre', '$adr', '$d', '$sal')");
    if (mysqli_affected_rows($con)) { 
        echo "L'employé a été ajouté avec succès!" . mysqli_error($con);
    }else {
        echo "mocchkel fi inbsertion " ;
    }
}
mysqli_close($con);
?>