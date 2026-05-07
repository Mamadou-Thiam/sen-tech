const mongoose = require('mongoose');
const Category = require('./models/Category');
const Course = require('./models/Course');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connecté à MongoDB');

    // Créer un utilisateur admin par défaut
    let adminUser = await User.findOne({ email: 'admin@sintech.com' });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      adminUser = await User.create({
        name: 'Admin',
        email: 'admin@sintech.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('✅ Utilisateur admin créé:', adminUser.email, '/ admin123');
    } else {
      console.log('ℹ️ Utilisateur admin existe déjà:', adminUser.email);
    }

    let category = await Category.findOne({ name: "Développement Web" });
    if (!category) {
      category = await Category.create({
        name: "Développement Web",
        description: "Formation complète pour maîtriser les bases du développement web"
      });
      console.log('✅ Catégorie créée:', category.name);
    } else {
      console.log('ℹ️ Catégorie existe déjà:', category.name);
    }

    await Course.deleteMany({ title: "Les fondamentaux du développement web" });
    console.log('🗑️ Ancien cours supprimé');

    const course = await Course.create({
      title: "Les fondamentaux du développement web",
      description: "Formation complète pour débutants : HTML, CSS, Bootstrap, JavaScript, DOM et bonnes pratiques.",
      category: category._id,
      duration: 50,
      price: 0,
      content: [
        {
          type: "module",
          title: "📘 Chapitre 1 : Introduction au Web, Internet et au Développement Web",
          description: "Comprendre Internet, le Web, l'architecture client/serveur et les bases du développement web",
          fullContent: `# 📘 Chapitre 1 : Introduction au Web, Internet et au Développement Web

## 1. 🌐 Internet vs Web : Comprendre la différence

Beaucoup de personnes confondent Internet et le Web, mais ce sont deux notions différentes :

🔹 **Internet**

Internet est un réseau mondial qui connecte des milliards d'ordinateurs et d'appareils.

- Permet de communiquer (emails, réseaux sociaux)
- Permet d'accéder aux informations
- Fonctionne grâce à des câbles physiques (fibre optique, etc.)

👉 Être "en ligne" = être connecté à Internet

🔹 **Le Web (World Wide Web)**

Le Web est un service qui fonctionne sur Internet.

- C'est un ensemble de sites web
- Accessible via un navigateur (Chrome, Firefox…)
- Contient des pages web (texte, images, vidéos…)

👉 Le Web = une partie d'Internet

## 2. ⚙️ Comment fonctionne Internet ?

1. Ton ordinateur envoie une requête
2. Cette requête arrive sur un serveur
3. Le serveur renvoie les données (page web)
4. Tout cela se fait en quelques secondes ⚡

## 3. 🌍 Ce que tu peux faire sur Internet

- Rechercher des informations (Google, Bing)
- Envoyer des emails 📧
- Utiliser les réseaux sociaux (Facebook…)
- Discuter en temps réel (chat)
- Regarder des vidéos (YouTube, Netflix)
- Faire des achats en ligne 🛒
- Gérer tes finances 💳

## 4. 🏗️ Architecture Web : Client / Serveur

🔹 **Client** (Appareil utilisé par l'utilisateur : Navigateur web, Application mobile, Ordinateur)
👉 Envoie des requêtes

🔹 **Serveur** (Ordinateur puissant qui : Stocke les données, Répond aux requêtes, Héberge les sites web)
👉 Envoie les réponses

## 5. 🔗 Protocoles réseau

Les protocoles sont des règles de communication entre machines.
Ils définissent : le format des données, l'adressage, la sécurité.

🔹 **HTTP (HyperText Transfer Protocol)**

C'est le protocole principal du Web.

Méthodes importantes :
- **GET** → récupérer des données
- **POST** → envoyer des données
- **PUT** → modifier des données
- **DELETE** → supprimer des données

## 6. 🔌 API (Application Programming Interface)

Une API permet à deux applications de communiquer.

✔️ **Avantages :** Automatisation, Intégration entre systèmes, Gain de temps, Flexibilité.

🔹 **API REST**
Architecture basée sur HTTP :
- Client / Serveur séparés
- Sans état (stateless)
- Utilise les méthodes HTTP

## 7. 🗄️ Bases de données

🔹 **Définition**
Une base de données permet de : Stocker des données, Organiser les informations, Les manipuler facilement.

🔹 **Types de bases de données**
- **SQL** (relationnelles)
- **NoSQL** (non relationnelles)

🔹 **SQL**
Langage pour interagir avec les bases :
- **CREATE** → créer
- **SELECT** → lire
- **UPDATE** → modifier
- **DELETE** → supprimer

🔹 **NoSQL**
- Flexible
- Utilise JSON
- Ex : MongoDB

🔹 **SGBD (Système de Gestion)**
Exemples : MySQL, PostgreSQL, SQL Server, Oracle.

## 8. 💻 Développement Web

🔹 **Définition**
Créer des sites et applications web.

🔹 **Les 3 couches**
1. **Front-end** (interface utilisateur)
2. **Back-end** (serveur)
3. **Base de données**

🔹 **Types de développeurs**
- Front-end
- Back-end
- Full Stack

🔹 **Compétences clés**
- **HTML** → structure
- **CSS** → design
- **JavaScript** → interaction

## 9. 🛠️ Créer un site web

🔹 **Méthodes**

1. **CMS (sans coder)**
   Exemples : WordPress, Shopify, PrestaShop.
   ✔️ Facile à utiliser | ❌ Moins flexible

2. **Codage manuel**
   ✔️ Flexible | ❌ Plus complexe

## 10. ⚙️ Environnement de développement

Outils essentiels :
- **Éditeur de code :** VS Code
- **Navigateur :** Chrome
- **Versioning :** Git / GitHub

## 11. 🧪 Première page HTML

\`\`\`html
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>
    <h1>Ma première page</h1>
    <p>Ceci est un paragraphe</p>
  </body>
</html>
\`\`\`

## 12. 🧰 GitHub

Plateforme pour :
- Stocker du code
- Collaborer
- Versionner les projets

## ✅ Conclusion

- **Internet** = infrastructure réseau
- **Web** = service accessible via Internet
- **Le développement web repose sur :**
  - HTML, CSS, JavaScript
  - Client / Serveur
  - Bases de données`
        },
        {
          type: "module",
          title: "📘 Chapitre 2 : Introduction à Git et GitHub",
          description: "VCS, commandes de base, GitHub, dépôts distants",
          fullContent: `# 📘 Chapitre 2 : Introduction à Git et GitHub

## 1. 🔄 Comprendre le contrôle de version (VCS)

Un système de contrôle de version (VCS) est un outil qui permet de :

- Suivre les modifications du code dans le temps
- Sauvegarder des versions (snapshots)
- Revenir à une version précédente si nécessaire

🔹 **Sans VCS :**

- Risque de perte de données
- Multiplication des copies de fichiers
- Difficulté à collaborer

🔹 **Avec VCS :**

- Historique clair des modifications
- Collaboration facilitée
- Sécurité du code

## 2. 🐙 Découverte de Git

Git est un système de contrôle de version :

- Gratuit et open source
- Rapide et efficace
- Adapté aux petits comme aux grands projets

🔹 **Rôle de Git :**

- Suivre les versions du code
- Créer des "instantanés" (commits)
- Permettre de revenir en arrière

## 3. ⬇️ Installation de Git

🔹 **Windows :** Télécharger et installer Git, utiliser CMD ou PowerShell

🔹 **Linux :**
\`\`\`bash
sudo apt install git-all
\`\`\`

🔹 **Mac :**
\`\`\`bash
brew install git
\`\`\`

## 4. 📂 Initialisation d'un projet Git

\`\`\`bash
git init
\`\`\`

➡️ Crée un dossier caché \`.git\`

## 5. 📁 Gestion des fichiers avec Git

🔹 **Vérifier l'état du projet :**
\`\`\`bash
git status
\`\`\`

🔹 **Ajouter des fichiers :**
\`\`\`bash
git add .
\`\`\`
ou
\`\`\`bash
git add nom_fichier
\`\`\`

🔹 **Supprimer un fichier du suivi :**
\`\`\`bash
git rm --cached nom_fichier
\`\`\`

## 6. ✅ Enregistrement des modifications (Commits)

\`\`\`bash
git commit -m "message"
\`\`\`

➡️ Un commit = un snapshot du projet

## 7. 🏷️ États des fichiers

| État | Description |
|------|-------------|
| **Suivi (tracked)** | Déjà ajouté ou validé |
| **Non suivi (untracked)** | Inconnu de Git |
| **Ignoré (ignored)** | Exclu via \`.gitignore\` |

## 8. ⚙️ Configuration de Git

\`\`\`bash
git config --global user.name "Votre Nom"
git config --global user.email "votre@email.com"
\`\`\`

## 9. 🔧 Utilisation des alias

\`\`\`bash
git config --global alias.st status
\`\`\`

➡️ Permet d'écrire \`git st\` au lieu de \`git status\`

## 10. 🌐 Introduction à GitHub

GitHub est une plateforme qui permet :

- D'héberger des projets Git en ligne
- De collaborer avec d'autres développeurs

🔹 **Différence Git vs GitHub :**

| | Git | GitHub |
|---|-----|--------|
| **Type** | Outil local | Plateforme en ligne |
| **Usage** | Contrôle de version | Hébergement et collaboration |

## 11. 📡 Travailler avec un dépôt distant

🔹 **Ajouter un dépôt distant :**
\`\`\`bash
git remote add origin URL_DU_DEPOT
\`\`\`

🔹 **Envoyer le code :**
\`\`\`bash
git push origin master
\`\`\`

## 12. 🛠️ Fonctionnalités GitHub

🔹 **Fork :** Copier un dépôt dans son compte

🔹 **Clone :**
\`\`\`bash
git clone URL
\`\`\`
➡️ Télécharger un projet existant

🔹 **Pull Request (PR) :** Proposer des modifications à un projet

## 13. 💡 Bonnes pratiques

- Faire des commits réguliers
- Écrire des messages clairs
- Utiliser \`.gitignore\`
- Synchroniser avec GitHub

## ✅ Conclusion

- **Git** = outil de contrôle de version local
- **GitHub** = plateforme d'hébergement en ligne
- Les commandes essentielles : \`init\`, \`add\`, \`commit\`, \`push\`, \`clone\``
        },
        {
          type: "module",
          title: "📘 Chapitre 3 : Introduction à HTML",
          description: "Structure d'une page web, balises essentielles",
          fullContent: `# 📘 Chapitre 3 : Introduction à HTML (Structure d'une page web)

🎯 **Objectifs du chapitre**

À la fin de ce chapitre, l'apprenant sera capable de :

- Comprendre ce qu'est HTML
- Créer une page web simple
- Utiliser les balises essentielles
- Structurer correctement un document HTML

## 1. 🌐 Qu'est-ce que HTML ?

HTML (HyperText Markup Language) est le langage utilisé pour :

- Structurer le contenu d'une page web
- Organiser les textes, images, liens, etc.

➡️ **HTML n'est pas un langage de programmation, mais un langage de balisage**

## 2. 📄 Structure de base d'un document HTML

Voici la structure minimale d'une page HTML :

\`\`\`html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Ma première page</title>
</head>
<body>
    <h1>Bonjour le monde</h1>
    <p>Ceci est ma première page web.</p>
</body>
</html>
\`\`\`

🔹 **Explication :**

| Élément | Rôle |
|---------|------|
| \`<!DOCTYPE html>\` | Indique qu'il s'agit d'un document HTML5 |
| \`<html>\` | Racine du document |
| \`<head>\` | Informations non visibles (métadonnées) |
| \`<body>\` | Contenu visible |

## 3. 🏷️ Les balises HTML

🔹 **Définition :** Une balise est un élément entouré de \`< >\`

Exemple :

\`\`\`html
<p>Texte</p>
\`\`\`

🔹 **Types de balises :**

| Type | Exemple |
|------|---------|
| **Balise ouvrante** | \`<p>\` |
| **Balise fermante** | \`</p>\` |
| **Balise auto-fermante** | \`<img />\` |

## 4. 📝 Les titres et paragraphes

\`\`\`html
<h1>Titre principal</h1>
<h2>Sous-titre</h2>
<p>Paragraphe de texte</p>
\`\`\`

➡️ Il existe **6 niveaux de titres** (h1 à h6)

## 5. 🔗 Les liens

\`\`\`html
<a href="https://google.com">Aller sur Google</a>
\`\`\`

🔹 **Attribut important :**

| Attribut | Rôle |
|----------|------|
| \`href\` | Lien de destination |

## 6. 🖼️ Les images

\`\`\`html
<img src="image.jpg" alt="Description de l'image">
\`\`\`

🔹 **Attributs :**

| Attribut | Rôle |
|----------|------|
| \`src\` | Chemin de l'image |
| \`alt\` | Description (accessibilité) |

## 7. 📋 Les listes

🔹 **Liste non ordonnée :**

\`\`\`html
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ul>
\`\`\`

🔹 **Liste ordonnée :**

\`\`\`html
<ol>
    <li>Étape 1</li>
    <li>Étape 2</li>
</ol>
\`\`\`

## 8. 📊 Les tableaux

\`\`\`html
<table>
    <tr>
        <th>Nom</th>
        <th>Age</th>
    </tr>
    <tr>
        <td>Mamadou</td>
        <td>25</td>
    </tr>
</table>
\`\`\`

## 9. 📋 Les formulaires

\`\`\`html
<form>
    <label>Nom :</label>
    <input type="text" name="nom">

    <label>Email :</label>
    <input type="email" name="email">

    <button type="submit">Envoyer</button>
</form>
\`\`\`

## 10. 🔧 Les attributs HTML

Les attributs donnent des informations supplémentaires aux balises.

Exemple :

\`\`\`html
<p class="texte">Bonjour</p>
\`\`\`

## 11. 🏗️ Les balises sémantiques

Elles donnent du sens au contenu :

\`\`\`html
<header>En-tête</header>
<nav>Menu</nav>
<main>Contenu principal</main>
<footer>Pied de page</footer>
\`\`\`

## 12. ✅ Bonnes pratiques

- Toujours fermer les balises
- Indenter le code (lisibilité)
- Utiliser des balises sémantiques
- Ajouter des attributs \`alt\` aux images
- Éviter les erreurs de structure

## 🧪 Exercice pratique

🔹 **Objectif :** Créer une page HTML simple contenant :

- Un titre
- Un paragraphe
- Une image
- Un lien
- Une liste

🔹 **Exemple attendu :**

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Mon site</title>
</head>
<body>
    <h1>Bienvenue</h1>
    <p>Je suis en train d'apprendre HTML</p>
    <img src="image.jpg" alt="image">
    <a href="https://google.com">Google</a>
    <ul>
        <li>HTML</li>
        <li>CSS</li>
    </ul>
</body>
</html>
\`\`\`

## ✅ Résumé

Dans ce chapitre, vous avez appris :

- La structure d'une page HTML
- Les balises essentielles
- Comment créer du contenu web
- Les bonnes pratiques`
        },
        {
          type: "module",
          title: "📘 Chapitre 4 : CSS",
          description: "Sélecteurs, box model, Flexbox, responsive",
          fullContent: `# 📘 Chapitre 4 : CSS

## 1. 🎨 Intégrer du CSS

\`\`\`html
<!-- Externe (recommandé) -->
<link rel="stylesheet" href="styles.css">
\`\`\`

## 2. 🔍 Les sélecteurs

\`\`\`css
/* Élément */
p { color: navy; }

/* Classe */
.highlight { background-color: yellow; }

/* ID */
#header { background-color: #333; }

/* Pseudo-classes */
a:hover { color: red; }
li:first-child { font-weight: bold; }
\`\`\`

## 3. 📦 Le Box Model

\`\`\`
┌───────────── MARGIN ─────────────┐
│  ┌────────── BORDER ─────────┐   │
│  │  ┌───── PADDING ─────┐    │   │
│  │  │    CONTENT        │    │   │
│  │  └───────────────────┘    │   │
│  └───────────────────────────┘   │
└──────────────────────────────────┘
\`\`\`

\`\`\`css
.box {
    width: 300px;
    padding: 20px;
    border: 2px solid #333;
    margin: 30px;
    box-sizing: border-box;
}
\`\`\`

## 4. 💪 Flexbox

\`\`\`css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}
\`\`\`

| Propriété | Rôle |
|-----------|------|
| \`justify-content\` | Alignement horizontal |
| \`align-items\` | Alignement vertical |
| \`flex-direction\` | Direction (row/column) |
| \`flex-wrap\` | Retour à la ligne |

## 5. 📱 Responsive Design

\`\`\`css
/* Mobile first */
.container { padding: 15px; }

/* Tablette */
@media (min-width: 768px) {
    .container { max-width: 720px; margin: 0 auto; }
}

/* Desktop */
@media (min-width: 992px) {
    .container { max-width: 960px; }
}
\`\`\`

## ✅ Conclusion

- **CSS** = habillage de la page
- Box Model : content → padding → border → margin
- Flexbox pour la mise en page
- Media queries pour le responsive`
        },
        {
          type: "module",
          title: "📘 Chapitre 5 : Bootstrap",
          description: "Grille, composants, utilitaires",
          fullContent: `# 📘 Chapitre 5 : Bootstrap

## 1. ⚡ Installation

\`\`\`html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
\`\`\`

## 2. 📐 Le système de grille

Bootstrap utilise une grille de **12 colonnes**.

\`\`\`html
<div class="container">
    <div class="row">
        <div class="col-4">1/3</div>
        <div class="col-4">1/3</div>
        <div class="col-4">1/3</div>
    </div>
</div>
\`\`\`

| Préfixe | Taille |
|---------|--------|
| \`col-\` | < 576px |
| \`col-sm-\` | ≥ 576px |
| \`col-md-\` | ≥ 768px |
| \`col-lg-\` | ≥ 992px |
| \`col-xl-\` | ≥ 1200px |

## 3. 🧩 Composants

🔹 **Navbar :**
\`\`\`html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
        <a class="navbar-brand" href="#">MonSite</a>
    </div>
</nav>
\`\`\`

🔹 **Cartes :**
\`\`\`html
<div class="card h-100">
    <div class="card-body">
        <h5 class="card-title">Projet</h5>
        <a href="#" class="btn btn-primary">Voir plus</a>
    </div>
</div>
\`\`\`

🔹 **Boutons :**
\`\`\`html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-danger">Danger</button>
\`\`\`

## ✅ Conclusion

- **Bootstrap** = framework CSS pour aller vite
- Grille de 12 colonnes
- Composants prêts à l'emploi`
        },
        {
          type: "module",
          title: "📘 Chapitre 6 : Introduction aux algorithmes",
          description: "Logique, conditions, boucles",
          fullContent: `# 📘 Chapitre 6 : Introduction aux algorithmes

## 1. 🧠 Qu'est-ce qu'un algorithme ?

Une suite d'instructions pour résoudre un problème.

\`\`\`
ALGORITHME Faire_des_crêpes
  1. Verser la farine
  2. Ajouter les oeufs
  3. Mélanger
  4. Ajouter le lait
  5. Cuire 2 min de chaque côté
\`\`\`

## 2. 📊 Variables et types

\`\`\`
nombre = 42          // Integer
prix = 19.99         // Float
nom = "Alice"        // String
est_vrai = true      // Boolean
liste = [1, 2, 3]    // Array
\`\`\`

## 3. 🔀 Les conditions

\`\`\`
SI age >= 18 ALORS
    AFFICHER "Majeur"
SINON
    AFFICHER "Mineur"
FIN SI
\`\`\`

## 4. 🔁 Les boucles

🔹 **Boucle FOR :**
\`\`\`
POUR i DE 1 À 10 FAIRE
    AFFICHER i
FIN POUR
\`\`\`

🔹 **Boucle WHILE :**
\`\`\`
TANT QUE tentative != secret FAIRE
    DEMANDER "Devinez :"
FIN TANT QUE
\`\`\`

## ✅ Conclusion

- **Algorithme** = suite d'instructions pour résoudre un problème
- Variables, conditions, boucles sont les briques de base`
        },
        {
          type: "module",
          title: "📘 Chapitre 7 : Structures de données",
          description: "Tableaux, objets, manipulation",
          fullContent: `# 📘 Chapitre 7 : Structures de données

## 1. 📋 Les tableaux (Arrays)

\`\`\`
fruits = ["pomme", "banane", "orange"]
fruits[0]    → "pomme"
fruits[1] = "kiwi"   // Modifier
\`\`\`

🔹 **Opérations :** \`push()\`, \`pop()\`, \`shift()\`, \`includes()\`, \`length\`

## 2. 🗂️ Les objets

\`\`\`
personne = {
    nom: "Dupont",
    prenom: "Jean",
    age: 25,
    email: "jean@email.com"
}

personne.nom           → "Dupont"
personne["prenom"]     → "Jean"
\`\`\`

## 3. 📊 Tableau d'objets

\`\`\`
utilisateurs = [
    { id: 1, nom: "Dupont", actif: true },
    { id: 2, nom: "Martin", actif: true },
    { id: 3, nom: "Bernard", actif: false }
]
\`\`\`

## 4. 🔧 Manipulation

🔹 **Filtrer, Transformer, Agréger**

## ✅ Conclusion

- **Tableaux** = listes ordonnées
- **Objets** = paires clé-valeur
- Savoir manipuler les données efficacement`
        },
        {
          type: "module",
          title: "📘 Chapitre 8 : JavaScript",
          description: "Variables, fonctions, conditions, boucles",
          fullContent: `# 📘 Chapitre 8 : JavaScript

## 1. 📝 Les variables

\`\`\`javascript
let age = 25;          // Modifiable
const PI = 3.14159;    // Constante

let nom = "Jean";
let message = \`Bonjour \${nom}\`;  // Template literal
\`\`\`

## 2. ⚙️ Les fonctions

\`\`\`javascript
function direBonjour(nom) {
    return \`Bonjour \${nom} !\`;
}

// Fonction fléchée
const multiplier = (a, b) => a * b;
\`\`\`

## 3. 🔀 Les conditions

\`\`\`javascript
if (age >= 18) {
    console.log("Majeur");
} else {
    console.log("Mineur");
}

// Ternaire
let statut = age >= 18 ? "majeur" : "mineur";
\`\`\`

## 4. 🔁 Les boucles

\`\`\`javascript
for (let i = 0; i < 5; i++) {
    console.log(i);
}

let nombres = [1, 2, 3, 4, 5];
let doubles = nombres.map(n => n * 2);
let pairs = nombres.filter(n => n % 2 === 0);
let somme = nombres.reduce((t, n) => t + n, 0);
\`\`\`

## ✅ Conclusion

- **JavaScript** = langage de programmation du web
- Variables (\`let\`, \`const\`), fonctions, conditions, boucles`
        },
        {
          type: "module",
          title: "📘 Chapitre 9 : DOM (Document Object Model)",
          description: "Sélection, manipulation, événements",
          fullContent: `# 📘 Chapitre 9 : DOM

## 1. 🌳 Qu'est-ce que le DOM ?

Représentation de la page HTML en arbre d'objets manipulable par JavaScript.

## 2. 🔍 Sélectionner des éléments

\`\`\`javascript
document.getElementById("titre");
document.querySelector(".menu");
document.querySelectorAll(".card");
\`\`\`

## 3. ✏️ Manipuler le contenu

\`\`\`javascript
titre.textContent = "Nouveau titre";
element.classList.add("active");
element.style.color = "red";
\`\`\`

## 4. ➕ Créer et supprimer

\`\`\`javascript
let li = document.createElement("li");
li.textContent = "Nouvel élément";
document.querySelector("#ma-liste").appendChild(li);
\`\`\`

## 5. 🖱️ Les événements

\`\`\`javascript
document.querySelector("#btn").addEventListener("click", function() {
    alert("Bouton cliqué !");
});
\`\`\`

🔹 **Événements courants :** \`click\`, \`submit\`, \`input\`, \`change\`, \`mouseover\`

## ✅ Conclusion

- **DOM** = page HTML manipulable en JavaScript
- Sélectionner, modifier, créer/supprimer des éléments
- Réagir aux événements`
        },
        {
          type: "module",
          title: "📘 Chapitre 10 : Vibe Coding",
          description: "Bonnes pratiques, organisation, debugging",
          fullContent: `# 📘 Chapitre 10 : Vibe Coding

## 1. ✅ Bonnes pratiques

🔹 **Nommage descriptif :**
\`\`\`javascript
// ❌ let x = 25;
// ✅ let ageUtilisateur = 25;
\`\`\`

🔹 **Indentation correcte**

## 2. 📁 Organisation du code

\`\`\`
mon-projet/
├── index.html
├── css/style.css
├── js/main.js
└── images/
\`\`\`

## 3. 🐛 Debugging

🔹 **console.log()** pour tracer
🔹 **DevTools (F12)** pour inspecter
🔹 **Breakpoints** pour debugger pas à pas

## ✅ Conclusion

- Noms descriptifs, code organisé
- Séparer HTML, CSS, JavaScript
- Utiliser les DevTools pour debugger`
        },
        {
          type: "module",
          title: "📘 Chapitre 11 : Projet Final Global",
          description: "Création d'un site vitrine complet",
          fullContent: `# 📘 Chapitre 11 : Projet Final Global

## 🎯 Objectif

Créer un site vitrine responsive en utilisant HTML, CSS, Bootstrap et JavaScript.

## 🛠️ Fonctionnalités requises

1. **Navbar responsive** (Bootstrap)
2. **Section Hero** avec image de fond
3. **Section Services** avec cartes
4. **Formulaire de contact** validé en JavaScript
5. **Footer**

## 📋 Critères d'évaluation

| Critère | Points |
|---------|--------|
| Structure HTML | /20 |
| Design CSS/Bootstrap | /20 |
| Responsive | /15 |
| JavaScript/DOM | /20 |
| Validation formulaire | /15 |
| Bonnes pratiques | /10 |
| **TOTAL** | **/100** |

## ✅ Conclusion

- Mettre en pratique tout ce qui a été appris
- Un projet complet pour le portfolio`
        }
      ]
    });
    console.log('✅ Cours créé:', course.title);
    console.log('📖 Nombre de chapitres:', course.content.length);

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Déconnecté de MongoDB');
  }
}

seed();
