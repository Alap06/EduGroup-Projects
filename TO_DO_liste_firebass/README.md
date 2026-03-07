# 📝 To-Do App Fullstack

Application de gestion de tâches complète avec **React.js**, **Node.js/Express**, et **Firebase Firestore**.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?logo=firebase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss)

---

## 📋 Fonctionnalités

- ✅ **Create** : Ajouter une nouvelle tâche
- ✅ **Read** : Lister toutes les tâches
- ✅ **Update** : Modifier une tâche existante
- ✅ **Delete** : Supprimer une tâche
- ✅ **Toggle** : Marquer une tâche comme terminée
- ✅ **Filter** : Filtrer par statut (toutes, en cours, terminées)
- ✅ **Notifications** : Toast pour les actions
- ✅ **Validation** : Formulaires validés

---

## 🗂️ Structure du Projet

```
TO_DO_liste_firebass/
├── backend/                    # API Node.js + Express
│   ├── config/
│   │   ├── firebase.js         # Configuration Firebase Admin
│   │   └── serviceAccountKey.json  # Clé Firebase (à créer)
│   ├── middleware/
│   │   └── errorHandler.js     # Gestion des erreurs
│   ├── routes/
│   │   └── tasks.js            # Routes CRUD
│   ├── server.js               # Point d'entrée
│   └── package.json
├── frontend/                   # React + Vite + TailwindCSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── Toast.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
├── firebase-config/            # Configs Firebase
│   ├── firestore.rules
│   └── serviceAccountKey.json.example
└── README.md
```

---

## 🔧 Prérequis

- **Node.js** v18 ou supérieur
- **npm** ou **yarn**
- **Compte Firebase** avec un projet créé

---

## 🔥 Configuration Firebase

### Étape 1 : Créer un projet Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquez sur **"Ajouter un projet"**
3. Donnez un nom à votre projet
4. Désactivez Google Analytics (optionnel)
5. Cliquez sur **"Créer le projet"**

### Étape 2 : Activer Firestore

1. Dans le menu gauche, cliquez sur **"Firestore Database"**
2. Cliquez sur **"Créer une base de données"**
3. Sélectionnez **"Mode test"** (pour le développement)
4. Choisissez votre région (ex: `europe-west1`)
5. Cliquez sur **"Activer"**

### Étape 3 : Générer la clé de service

1. Cliquez sur l'icône ⚙️ **Paramètres du projet** (en haut à gauche)
2. Allez dans l'onglet **"Comptes de service"**
3. Cliquez sur **"Générer une nouvelle clé privée"**
4. Confirmez et téléchargez le fichier JSON
5. **Renommez** le fichier en `serviceAccountKey.json`
6. **Placez** ce fichier dans `backend/config/serviceAccountKey.json`

> ⚠️ **IMPORTANT** : Ne partagez JAMAIS ce fichier ! Ajoutez-le à `.gitignore`

### Étape 4 : Configurer les règles Firestore

1. Dans Firestore, allez dans l'onglet **"Règles"**
2. Copiez le contenu de `firebase-config/firestore.rules`
3. Collez et cliquez sur **"Publier"**

---

## 🚀 Installation et Exécution

### 1. Cloner ou créer le projet

```bash
cd d:/Project\ web/TO_DO_liste_firebass
```

### 2. Installer les dépendances Backend

```bash
cd backend
npm install
```

### 3. Configurer Firebase

Placez votre fichier `serviceAccountKey.json` dans `backend/config/`

### 4. Lancer le Backend

```bash
npm run dev
```

Le serveur démarre sur **http://localhost:5000**

### 5. Installer les dépendances Frontend (nouveau terminal)

```bash
cd frontend
npm install
```

### 6. Lancer le Frontend

```bash
npm run dev
```

L'application démarre sur **http://localhost:5173**

---

## 📡 API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/tasks` | Récupérer toutes les tâches |
| `GET` | `/api/tasks/:id` | Récupérer une tâche par ID |
| `POST` | `/api/tasks` | Créer une nouvelle tâche |
| `PUT` | `/api/tasks/:id` | Mettre à jour une tâche |
| `DELETE` | `/api/tasks/:id` | Supprimer une tâche |

### Exemple de requête POST

```json
{
  "title": "Apprendre React",
  "description": "Suivre un tutoriel complet"
}
```

---

## 📝 Structure des données Firestore

Collection: `tasks`

```json
{
  "id": "auto-generated",
  "title": "string (requis)",
  "description": "string (optionnel)",
  "completed": "boolean",
  "createdAt": "ISO date string",
  "updatedAt": "ISO date string"
}
```

---

## 🛠️ Technologies Utilisées

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Firebase Admin SDK** - Connexion à Firestore
- **CORS** - Gestion des requêtes cross-origin
- **dotenv** - Variables d'environnement

### Frontend
- **React 18** - Bibliothèque UI
- **Vite** - Build tool rapide
- **TailwindCSS 3** - Framework CSS utility-first
- **React Router 6** - Routing

---

## 🎨 Captures d'écran

L'interface utilise un design moderne avec:
- 🌙 Mode sombre (dark mode)
- ✨ Effets glassmorphism
- 🎭 Animations fluides
- 📱 Design responsive

---

## 📄 Licence

MIT License - Libre d'utilisation

---

## 🤝 Support

Si vous avez des questions, n'hésitez pas à ouvrir une issue!
