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
$req1="SELECT * FROM employe WHERE codemp='$c'";
$res=mysqli_query($con,$req1);
if (mysqli_num_rows($res)>0) {
    $res2=mysqli_query($con,"UPDATE `employe` SET nomemp='$nom',prenemp='$pre',adremp= '$adr',dnemp='$d',salaire='$sal' WHERE codemp='$c'");
    if (mysqli_affected_rows($con)) { 
        echo "L'employé a été Modifier  avec succès!" . mysqli_error($con);
    }else {
        echo "mocchkel fi Modificaticon " ;
    }
}
else {
    echo "Cet employé n existe pas!";
}
mysqli_close($con);
?>