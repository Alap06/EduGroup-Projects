<?php
$con=mysqli_connect("localhost","root","","gestion_personnel") or die("ùmochkel connexion "); 
//recupiration  champ 
$c=$_POST['c'];
$v=$_POST['v'];

//verification apres suppresion
$res=mysqli_query($con,"SELECT * FROM employe WHERE $c like'$v'");
if (!$res) {
    echo "<h1>erreur de requete </h1>";
}
if (mysqli_num_rows($res) > 0) {
    echo "<h1>hathya tableau</h1>" ;
    echo " <table border='1' >
        <tr>
            <th>Code</th>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Date</th>
            <th>Adrese</th>
            <th>Salaire</th>
        </tr>";
        while ($t=mysqli_fetch_array($res)) {
            echo "<tr>";
            echo "<td>".$t[0]."</td>";
            echo "<td>".$t[1]."</td>";
            echo "<td>".$t[2]."</td>";
            echo "<td>".$t[3]."</td>";
            echo "<td>".$t[4]."</td>";
            echo "<td>".$t[5]."</td>";
            echo "</tr>";
        }
    echo"</table>";
    
}else{
    echo "<h1>Acune resultat mouch mawjouuuddd </h1>";
}
mysqli_close($con);
?>