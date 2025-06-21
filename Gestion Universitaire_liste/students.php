<?php
/*
    Gestion Universitaire
    Author: Ala Amara
    Date: 2023-09-10
*/
include 'connexion.php'; ?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestion des Étudiants</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
            color: #333;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h2 {
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
        }
        .btn {
            display: inline-block;
            background: #3498db;
            color: white;
            padding: 8px 15px;
            text-decoration: none;
            border-radius: 4px;
            margin: 5px 0;
            transition: background 0.3s;
        }
        .btn:hover {
            background: #2980b9;
        }
        .btn-danger {
            background: #e74c3c;
        }
        .btn-danger:hover {
            background: #c0392b;
        }
        .btn-warning {
            background: #f39c12;
        }
        .btn-warning:hover {
            background: #d35400;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        th, td {
            padding: 12px 15px;
            border: 1px solid #ddd;
            text-align: left;
        }
        th {
            background-color: #3498db;
            color: white;
            font-weight: bold;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        tr:hover {
            background-color: #e3f2fd;
        }
        form {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        input[type="text"],
        input[type="email"],
        input[type="date"] {
            width: 100%;
            padding: 10px;
            margin: 8px 0;
            display: inline-block;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }
        button[type="submit"] {
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        button[type="submit"]:hover {
            background-color: #45a049;
        }
        .form-group {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 15px;
        }
        .actions {
            white-space: nowrap;
        }
        .actions a {
            margin-right: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="index.html" class="btn">Accueil</a>
        <h2>Gestion des Étudiants</h2>

        <form method="POST">
            <div class="form-group">
                <div>
                    <label for="prenom">Prénom</label>
                    <input type="text" id="prenom" name="prenom" placeholder="Prénom" required>
                </div>
                <div>
                    <label for="nom">Nom</label>
                    <input type="text" id="nom" name="nom" placeholder="Nom" required>
                </div>
                <div>
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Email">
                </div>
                <div>
                    <label for="date">Date d'inscription</label>
                    <input type="date" id="date" name="date" required>
                </div>
            </div>
            <button type="submit" name="ajouter">Enregistrer</button>
        </form>

        <?php
        // Handle form submission
        if (isset($_POST['ajouter'])) {
            $prenom = mysqli_real_escape_string($conn, $_POST['prenom']);
            $nom = mysqli_real_escape_string($conn, $_POST['nom']);
            $email = isset($_POST['email']) ? mysqli_real_escape_string($conn, $_POST['email']) : '';
            $date = mysqli_real_escape_string($conn, $_POST['date']);

            $sql = "INSERT INTO students (f_name, l_name, email, subscription)
                    VALUES ('$prenom', '$nom', '$email', '$date')";
            
            if (mysqli_query($conn, $sql)) {
                echo '<p style="color: green;">Étudiant ajouté avec succès!</p>';
            } else {
                echo '<p style="color: red;">Erreur: ' . mysqli_error($conn) . '</p>';
            }
        }

        // Handle delete action
        if (isset($_GET['supprimer'])) {
            $id = (int)$_GET['supprimer'];
            if ($id > 0) {
                $delete_sql = "DELETE FROM students WHERE num=$id";
                if (mysqli_query($conn, $delete_sql)) {
                    echo '<p style="color: green;">Étudiant supprimé avec succès!</p>';
                } else {
                    echo '<p style="color: red;">Erreur lors de la suppression: ' . mysqli_error($conn) . '</p>';
                }
            }
        }
        ?>

        <table>
            <thead>
                <tr>
                    <th><a href="?tri=num">ID</a></th>
                    <th><a href="?tri=f_name">Prénom</a></th>
                    <th><a href="?tri=l_name">Nom</a></th>
                    <th>Email</th>
                    <th><a href="?tri=subscription">Date d'inscription</a></th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php
                // Determine sorting column
                $allowed_sort_columns = ['num', 'f_name', 'l_name', 'subscription'];
                $tri = isset($_GET['tri']) && in_array($_GET['tri'], $allowed_sort_columns) ? $_GET['tri'] : 'num';
                
                // Fetch students data
                $result = mysqli_query($conn, "SELECT * FROM students ORDER BY $tri");
                
                if (mysqli_num_rows($result) > 0) {
                    while ($row = mysqli_fetch_assoc($result)) {
                        echo "<tr>
                            <td>{$row['num']}</td>
                            <td>{$row['f_name']}</td>
                            <td>{$row['l_name']}</td>
                            <td>{$row['email']}</td>
                            <td>{$row['subscription']}</td>
                            <td class='actions'>
                                <a href='?supprimer={$row['num']}' class='btn btn-danger'>Supprimer</a>
                                <a href='modifier.php?id={$row['num']}' class='btn btn-warning'>Modifier</a>
                            </td>
                        </tr>";
                    }
                } else {
                    echo "<tr><td colspan='6'>Aucun étudiant trouvé</td></tr>";
                }
                ?>
            </tbody>
        </table>
    </div>
</body>
</html>