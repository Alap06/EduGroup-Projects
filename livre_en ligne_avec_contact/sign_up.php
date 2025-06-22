<?php
session_start();

// Configuration de la base de données
$servername = "localhost"; // ou l'adresse de votre serveur
$username = "root"; // votre nom d'utilisateur DB
$password = ""; // votre mot de passe DB
$dbname = "contact_cour";

// Créer une connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Variable pour stocker les messages
$message = "";

// Vérifier si le formulaire est soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer et nettoyer les données du formulaire
    $cin = $_POST['cin'];
    $nom_prenom = $_POST['nom_prenom'] ;
    $email = $_POST['email'];
    $mot_passe = $_POST['mot_passe'];

    // Déterminer le rôle
    $role = (substr($email, -6) === 'hideya') ? 'admin' : 'utilisateur';

    // Vérifier si l'email ou le CIN existe déjà
    $stmt = $conn->prepare("SELECT * FROM etudiant WHERE email = '$email' OR cin = '$cin'");
    if ($stmt === false) {
        die("Erreur de préparation : " . $conn->error);
    }

    // Exécuter la requête
    if (!$stmt->execute()) {
        die("Erreur lors de l'exécution de la requête : " . $stmt->error);
    }

    $result = $stmt->get_result();
    if ($result === false) {
        die("Erreur lors de la récupération des résultats : " . $stmt->error);
    }

    if ($result->num_rows > 0) {
        $message = "Cet email ou CIN est déjà utilisé.";
    } else {
       // Hachage du mot de passe avec sha1 (non recommandé pour les mots de passe)
       $mot_passe_hache = sha1($mot_passe);

        // Préparer et lier pour l'insertion
        $stmt = $conn->prepare("INSERT INTO etudiant (cin, nom_prenom, email, mot_passe, role) VALUES ('$cin','$nom_prenom', '$email','$mot_passe','$role')");
        if ($stmt === false) {
            die("Erreur de préparation : " . $conn->error);
        }


        // Exécuter la requête d'insertion
        if ($stmt->execute()) {
            // Rediriger vers la bonne page
            if ($role === 'admin') {
                header("Location: index.html");
            } 
            exit; // Terminer le script après la redirection
        } else {
            $message = "Erreur lors de l'inscription : " . $stmt->error;
        }
    }

    // Fermer la déclaration
    $stmt->close();
}

// Afficher le message (optionnel)
if (!empty($message)) {
    echo $message;
}

// Fermer la connexion
$conn->close();
?>