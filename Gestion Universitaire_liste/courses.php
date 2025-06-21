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
    <title>Gestion des Cours</title>
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
        h1 {
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
        .btn-success {
            background: #2ecc71;
        }
        .btn-success:hover {
            background: #27ae60;
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
        .form-group {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 15px;
        }
        .form-control {
            width: 100%;
            padding: 10px;
            margin: 8px 0;
            display: inline-block;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }
        .actions {
            white-space: nowrap;
        }
        .actions a {
            margin-right: 5px;
        }
        .alert {
            padding: 10px;
            margin-bottom: 15px;
            border-radius: 4px;
        }
        .alert-success {
            background-color: #d4edda;
            color: #155724;
        }
        .alert-danger {
            background-color: #f8d7da;
            color: #721c24;
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="index.html" class="btn">Accueil</a>
        <h1>Gestion des Cours</h1>

        <form method="POST">
            <div class="form-group">
                <div>
                    <label for="nom_cours">Nom du Cours</label>
                    <input type="text" class="form-control" id="nom_cours" name="nom_cours" placeholder="Nom du cours" required>
                </div>
                <div>
                    <label for="responsable">Responsable</label>
                    <input type="text" class="form-control" id="responsable" name="responsable" placeholder="Responsable" required>
                </div>
            </div>
            <button type="submit" name="ajouter_cours" class="btn btn-success">Ajouter le Cours</button>
        </form>

        <?php
        // Handle form submission
        if (isset($_POST['ajouter_cours'])) {
            $nom_cours = mysqli_real_escape_string($conn, $_POST['nom_cours']);
            $responsable = mysqli_real_escape_string($conn, $_POST['responsable']);
            
            $sql = "INSERT INTO course (name, responsible) VALUES ('$nom_cours', '$responsable')";
            
            if (mysqli_query($conn, $sql)) {
                echo '<div class="alert alert-success">Cours ajouté avec succès!</div>';
            } else {
                echo '<div class="alert alert-danger">Erreur: ' . mysqli_error($conn) . '</div>';
            }
        }

        // Handle delete action
        if (isset($_GET['supprimer'])) {
            $id = (int)$_GET['supprimer'];
            if ($id > 0) {
                $delete_sql = "DELETE FROM course WHERE id=$id";
                if (mysqli_query($conn, $delete_sql)) {
                    echo '<div class="alert alert-success">Cours supprimé avec succès!</div>';
                } else {
                    echo '<div class="alert alert-danger">Erreur lors de la suppression: ' . mysqli_error($conn) . '</div>';
                }
            }
        }
        ?>

        <table>
            <thead>
                <tr>
                    <th><a href="?tri=id">ID</a></th>
                    <th><a href="?tri=name">Cours</a></th>
                    <th><a href="?tri=responsible">Responsable</a></th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php
                // Determine sorting column
                $allowed_sort_columns = ['id', 'name', 'responsible'];
                $tri = isset($_GET['tri']) && in_array($_GET['tri'], $allowed_sort_columns) ? $_GET['tri'] : 'id';
                
                // Fetch courses data
                $result = mysqli_query($conn, "SELECT * FROM course ORDER BY $tri");
                
                if (mysqli_num_rows($result) > 0) {
                    while ($row = mysqli_fetch_assoc($result)) {
                        echo "<tr>
                            <td>{$row['id']}</td>
                            <td>{$row['name']}</td>
                            <td>{$row['responsible']}</td>
                            <td class='actions'>
                                <a href='?supprimer={$row['id']}' class='btn btn-danger'>Supprimer</a>
                                <a href='modifier_cours.php?id={$row['id']}' class='btn btn-warning'>Modifier</a>
                            </td>
                        </tr>";
                    }
                } else {
                    echo "<tr><td colspan='4'>Aucun cours trouvé</td></tr>";
                }
                ?>
            </tbody>
        </table>
    </div>
</body>
</html>