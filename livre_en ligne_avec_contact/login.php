<?php
// Connexion à la base de données avec PDO
try {
    $conn = new PDO("mysql:host=localhost;dbname=contact_cour", "root", "");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Vérifier si le formulaire est soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $mot_passe = isset($_POST['mot_passe']) ? $_POST['mot_passe'] : '';

    // Préparer la requête pour vérifier l'email et le mot de passe
    $stmt = $conn->prepare("SELECT * FROM etudiant WHERE email = :email AND mot_passe = :mot_passe");
    $stmt->bindValue(':email', $email);
    $stmt->bindValue(':mot_passe', $mot_passe);
    
    // Exécuter la requête
    $stmt->execute();

    // Vérifier si l'utilisateur existe
    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Démarrer la session
        session_start();
        $_SESSION['user'] = $row;

        // Rediriger vers des scripts PHP pour une meilleure organisation
        if ($row['role'] === 'admin') {
            header("Location: Administration\index_admin.html");
        } else {
            header("Location: index.html");
        }
        exit();
    } else {
        echo "Email ou mot de passe incorrect.";
    }
}

// Fermer la connexion
$conn = null;
?>