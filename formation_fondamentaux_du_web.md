# Les Fondamentaux du Développement Web

> **Formation complète pour débutants**  
> **Durée estimée :** 40-50 heures  
> **Prérequis :** Aucun

---

## Table des matières

1. [Introduction to the Web](#chapitre-1-introduction-to-the-web)
2. [Git et GitHub](#chapitre-2-introduction-à-git-et-github)
3. [Introduction à CSS](#chapitre-4-introduction-à-css)
4. [Bootstrap](#chapitre-5-bootstrap)
5. [Introduction aux algorithmes](#chapitre-6-introduction-aux-algorithmes-cours-complet)
6. [Structures de données](#chapitre-7-structures-de-données)
7. [JavaScript](#chapitre-8-javascript)
8. [DOM (Document Object Model)](#chapitre-9-dom-document-object-model)
9. [Vibe Coding](#chapitre-10-vibe-coding)
10. [Projet Final Global](#projet-final-global)

---

# Chapitre 1 : Introduction to the Web

## Introduction

Bienvenue dans le monde du développement web ! Avant d'écrire la moindre ligne de code, il est essentiel de comprendre comment fonctionne le web. Ce chapitre vous donnera les bases pour comprendre ce qui se passe lorsque vous tapez une adresse dans votre navigateur.

## Objectifs pédagogiques

- Comprendre le fonctionnement d'internet
- Distinguer client et serveur
- Comprendre le protocole HTTP
- Savoir ce qu'est un navigateur et son rôle

## Contenu détaillé

### 1.1 Comment fonctionne Internet ?

Internet est un réseau mondial d'ordinateurs interconnectés. Imaginez-le comme un immense système postal qui permet aux machines de communiquer entre elles.

```
Votre ordinateur  →  Internet  →  Serveur web
       ↑                                  |
       └────── Réponse ←──────────────────┘
```

**Les éléments clés :**

- **Adresse IP :** Chaque appareil connecté possède une adresse unique (ex: `192.168.1.1`)
- **DNS (Domain Name System) :** Traduit les noms de domaine (ex: `google.com`) en adresses IP
- **Routeurs :** Acheminent les données d'un point à un autre

### 1.2 Le modèle Client/Serveur

C'est le fondement du web :

| Rôle | Description | Exemple |
|------|-------------|---------|
| **Client** | Demande des ressources | Votre navigateur Chrome, Firefox, Safari |
| **Serveur** | Fournit des ressources | Un ordinateur qui stocke un site web |

```
Requête HTTP
[Client/Navigateur] ──────────────────→ [Serveur Web]
                                          │
                                      Traitement
                                          │
Réponse HTTP (HTML, CSS, JS, images)     ↓
[Client/Navigateur] ←────────────────── [Serveur Web]
```

### 1.3 Le protocole HTTP/HTTPS

**HTTP** (HyperText Transfer Protocol) est le langage que le client et le serveur utilisent pour communiquer.

**Structure d'une requête HTTP :**

```
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html
```

**Principales méthodes HTTP :**

| Méthode | Action | Exemple |
|---------|--------|---------|
| `GET` | Récupérer des données | Charger une page |
| `POST` | Envoyer des données | Soumettre un formulaire |
| `PUT` | Mettre à jour | Modifier un profil |
| `DELETE` | Supprimer | Retirer un article |

**HTTPS** = HTTP + **S**écurité (chiffrement des données)

### 1.4 Les navigateurs web

Un navigateur est un logiciel qui :
1. Envoie des requêtes HTTP aux serveurs
2. Reçoit les réponses (HTML, CSS, JavaScript)
3. Affiche la page web de manière visuelle

**Navigateurs populaires :**
- Google Chrome
- Mozilla Firefox
- Safari
- Microsoft Edge
- Brave

## Exemples concrets

### Que se passe-t-il quand vous tapez `www.google.com` ?

```
1. Vous tapez "www.google.com" dans la barre d'adresse
2. Le navigateur interroge le DNS pour trouver l'adresse IP
3. Le DNS répond : 142.250.179.164
4. Le navigateur envoie une requête HTTP à cette adresse
5. Le serveur Google renvoie la page HTML
6. Le navigateur affiche la page
```

### Outils pour explorer le web

**Les outils de développement** (F12 dans votre navigateur) permettent de voir :
- Le code HTML/CSS de n'importe quelle page
- Les requêtes réseau
- Les erreurs JavaScript

## Mini projet pratique

### Exercice : Analyser une page web

1. Ouvrez votre navigateur et allez sur n'importe quel site
2. Appuyez sur `F12` pour ouvrir les outils de développement
3. Explorez l'onglet **Elements** (ou **Inspecteur**)
4. Trouvez :
   - La balise `<title>` de la page
   - Une image et son attribut `src`
   - Un lien et son attribut `href`
5. Dans l'onglet **Network**, rechargez la page et comptez le nombre de requêtes

## Quiz

**Question 1 :** Quel est le rôle d'un serveur web ?
- a) Afficher des pages web
- b) Stocker et fournir des ressources aux clients
- c) Traduire les noms de domaine
- d) Protéger les données

**Question 2 :** Que signifie HTTP ?
- a) HyperText Transfer Protocol
- b) High Tech Modern Protocol
- c) Home Text Transfer Program
- d) Hyper Terminal Transfer Protocol

**Question 3 :** Quelle méthode HTTP utilise-t-on pour envoyer des données via un formulaire ?
- a) GET
- b) POST
- c) PUT
- d) DELETE

**Question 4 :** Quel est le rôle du DNS ?
- a) Afficher les pages web
- b) Traduire les noms de domaine en adresses IP
- c) Sécuriser les connexions
- d) Stocker les fichiers

**Question 5 :** Quelle touche ouvre les outils de développement dans un navigateur ?
- a) F5
- b) F12
- c) Ctrl+S
- d) Alt+Tab

<details>
<summary><strong>Réponses</strong></summary>

1. **b** - Le serveur stocke et fournit des ressources
2. **a** - HyperText Transfer Protocol
3. **b** - POST est utilisé pour envoyer des données
4. **b** - Le DNS traduit les noms de domaine en IP
5. **b** - F12 ouvre les outils de développement
</details>

---

# Chapitre 2 : Introduction à Git et GitHub

🎯 Objectifs du chapitre

À la fin de ce chapitre, l'apprenant sera capable de :

- Comprendre ce qu'est Git
- Utiliser les commandes de base de Git
- Configurer Git correctement
- Comprendre GitHub et travailler avec des dépôts distants

## 1. Comprendre le contrôle de version (VCS)

### Définition

Un système de contrôle de version (VCS) est un outil qui permet de :

- Suivre les modifications du code dans le temps
- Sauvegarder des versions (snapshots)
- Revenir à une version précédente si nécessaire

### Pourquoi utiliser un VCS ?

**Sans VCS :**

- Risque de perte de données
- Multiplication des copies de fichiers
- Difficulté à collaborer

**Avec VCS :**

- Historique clair des modifications
- Collaboration facilitée
- Sécurité du code

## 2. Découverte de Git

### Définition

Git est un système de contrôle de version :

- Gratuit et open source
- Rapide et efficace
- Adapté aux petits comme aux grands projets

### Rôle de Git

- Suivre les versions du code
- Créer des "instantanés" (commits)
- Permettre de revenir en arrière

## 3. Installation de Git

### Windows

- Télécharger et installer Git
- Utiliser CMD ou PowerShell

### Linux

```bash
sudo apt install git-all
```

### Mac

```bash
brew install git
```

## 4. Initialisation d'un projet Git

### Créer un dépôt

```bash
git init
```

➡️ Crée un dossier caché `.git`

## 5. Gestion des fichiers avec Git

### Vérifier l'état du projet

```bash
git status
```

### Ajouter des fichiers

```bash
git add .
```

ou

```bash
git add nom_fichier
```

### Supprimer un fichier du suivi

```bash
git rm --cached nom_fichier
```

## 6. Enregistrement des modifications

### Faire un commit

```bash
git commit -m "message"
```

➡️ Un commit = un snapshot du projet

## 7. États des fichiers

| État | Description |
|------|-------------|
| **Suivi (tracked)** | Déjà ajouté ou validé |
| **Non suivi (untracked)** | Inconnu de Git |
| **Ignoré (ignored)** | Exclu via `.gitignore` |

## 8. Configuration de Git

### Définir utilisateur

```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre@email.com"
```

## 9. Utilisation des alias

### Exemple

```bash
git config --global alias.st status
```

➡️ Permet d'écrire :

```bash
git st
```

## 10. Introduction à GitHub

### Définition

GitHub est une plateforme qui permet :

- D'héberger des projets Git en ligne
- De collaborer avec d'autres développeurs

### Différence Git vs GitHub

| | Git | GitHub |
|---|-----|--------|
| **Type** | Outil local | Plateforme en ligne |
| **Usage** | Contrôle de version | Hébergement et collaboration |

## 11. Travailler avec un dépôt distant

### Ajouter un dépôt distant

```bash
git remote add origin URL_DU_DEPOT
```

### Envoyer le code

```bash
git push origin master
```

## 12. Fonctionnalités GitHub

### Fork

Copier un dépôt dans son compte

### Clone

```bash
git clone URL
```

➡️ Télécharger un projet existant

### Pull Request (PR)

Proposer des modifications à un projet

## 13. Bonnes pratiques

- Faire des commits réguliers
- Écrire des messages clairs
- Utiliser `.gitignore`
- Synchroniser avec GitHub

---

# Chapitre 4 : Introduction à CSS (Cours complet)

## 🎯 Objectifs du chapitre

À la fin de ce chapitre, l'apprenant sera capable de :

- Comprendre ce qu'est CSS
- Relier un fichier HTML à un fichier CSS
- Ajouter du style à une page web
- Modifier les couleurs, textes et espacements
- Utiliser les sélecteurs CSS
- Créer une mise en page simple et moderne
- Comprendre les bases du responsive design

## 1. 🎨 Qu'est-ce que CSS ?

CSS signifie **Cascading Style Sheets**.

CSS est utilisé pour :

- Styliser une page web
- Ajouter des couleurs et des animations
- Modifier les tailles et positions des éléments
- Rendre un site moderne et responsive

> HTML structure le contenu, CSS s'occupe du design.

## 2. 📂 Organisation des fichiers

Dans un projet web, on sépare généralement :

- Le contenu → **HTML**
- Le design → **CSS**

```
mon-projet/
│
├── index.html
└── style.css
```

- `index.html` contient la structure de la page.
- `style.css` contient les styles.

## 3. 🔗 Comment lier HTML et CSS ?

Pour connecter le fichier CSS au fichier HTML, on utilise la balise `<link>` :

```html
<link rel="stylesheet" href="style.css">
```

Cette balise se place dans la partie `<head>` du document HTML.

## 4. 📄 Exemple complet de liaison HTML/CSS

**Fichier HTML : index.html**

```html
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <title>Mon site CSS</title>
</head>

<body>
    <h1>Bienvenue sur mon site</h1>
    <p>Apprentissage du CSS</p>
</body>

</html>
```

**Fichier CSS : style.css**

```css
body {
    background-color: lightgray;
}

h1 {
    color: blue;
    text-align: center;
}

p {
    font-size: 20px;
}
```

## 5. 🔍 Explication de la balise `<link>`

```html
<link rel="stylesheet" href="style.css">
```

| Élément | Rôle |
|---------|------|
| `<link>` | Permet de relier un fichier |
| `rel="stylesheet"` | Indique qu'il s'agit d'un fichier CSS |
| `href="style.css"` | Chemin du fichier CSS |

### 📁 Liaison avec un dossier CSS

```
mon-projet/
│
├── index.html
│
└── css/
    └── style.css
```

```html
<link rel="stylesheet" href="css/style.css">
```

## 6. 🎨 Les différentes façons d'ajouter du CSS

### CSS Inline

Le style est directement écrit dans la balise HTML :

```html
<p style="color: blue;">Bonjour</p>
```

### CSS Interne

Le style est placé dans la balise `<style>` dans le `<head>` :

```html
<head>
    <style>
        p { color: red; }
    </style>
</head>
```

### CSS Externe (Méthode recommandée)

```html
<link rel="stylesheet" href="style.css">
```

## 7. 🏷️ Syntaxe CSS

```
selecteur {
    propriété: valeur;
}
```

**Exemple :**

```css
h1 {
    color: blue;
    font-size: 40px;
}
```

| Élément | Rôle |
|---------|------|
| `h1` | Sélecteur |
| `color` | Propriété |
| `blue` | Valeur |

## 8. 🎨 Les couleurs en CSS

```css
body {
    background-color: lightgray;
}

h1 {
    color: darkblue;
}
```

| Type | Exemple |
|------|---------|
| Nom | `red` |
| HEX | `#ff0000` |
| RGB | `rgb(255,0,0)` |

## 9. 🔠 Modifier le texte

```css
p {
    font-size: 18px;
    font-family: Arial;
    font-weight: bold;
    text-align: center;
}
```

| Propriété | Rôle |
|-----------|------|
| `font-size` | Taille du texte |
| `font-family` | Police |
| `font-weight` | Gras |
| `text-align` | Alignement |

## 10. 📦 Les marges et espacements

```css
div {
    margin: 20px;
    padding: 15px;
}
```

| Propriété | Rôle |
|-----------|------|
| `margin` | Espace extérieur |
| `padding` | Espace intérieur |

## 11. 🖼️ Les bordures

```css
img {
    border: 3px solid black;
}
```

**Structure :** `border: épaisseur style couleur;`

## 12. 🏗️ Les sélecteurs CSS

### Sélecteur par balise

```css
p {
    color: blue;
}
```

### Sélecteur par classe

```html
<p class="texte">Bonjour</p>
```

```css
.texte {
    color: green;
}
```

### Sélecteur par identifiant

```html
<h1 id="titre">Bienvenue</h1>
```

```css
#titre {
    color: red;
}
```

## 13. 📐 Largeur et hauteur

```css
div {
    width: 300px;
    height: 200px;
}
```

## 14. 🧱 Le modèle Box Model

Chaque élément HTML est considéré comme une **boîte**.

Il contient :

1. Le contenu
2. Le padding
3. La bordure
4. La marge

```css
div {
    width: 200px;
    padding: 20px;
    border: 2px solid black;
    margin: 15px;
}
```

## 15. 🌈 Les arrière-plans

### Couleur de fond

```css
body {
    background-color: beige;
}
```

### Image de fond

```css
body {
    background-image: url("image.jpg");
}
```

## 16. 🧭 Introduction à Flexbox

Flexbox permet d'aligner facilement les éléments.

```css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

| Propriété | Rôle |
|-----------|------|
| `display: flex` | Active Flexbox |
| `justify-content` | Alignement horizontal |
| `align-items` | Alignement vertical |

## 17. ✨ Les effets simples

### Hover

```css
button:hover {
    background-color: blue;
    color: white;
}
```

> L'effet apparaît lorsque la souris passe sur l'élément.

## 18. 📱 Introduction au Responsive Design

Le responsive permet d'adapter le site aux téléphones et tablettes.

```css
@media screen and (max-width: 768px) {
    body {
        background-color: lightblue;
    }
}
```

## 19. ⚠️ Erreurs fréquentes

### ❌ Mauvais nom de fichier

```html
<link rel="stylesheet" href="styles.css">
```

Alors que le fichier s'appelle `style.css`.

### ❌ Mauvais emplacement du fichier

Le chemin doit être correct.

### ❌ Oublier la balise `<link>`

Sans liaison, le CSS ne fonctionne pas.

## 20. ✅ Bonnes pratiques CSS

- Séparer HTML et CSS
- Utiliser des noms de classes clairs
- Indenter correctement le code
- Éviter les répétitions
- Organiser les styles par section
- Commenter le code important

## 🧪 Exercice pratique

### Objectif

Créer une page stylisée contenant :

- Un titre coloré
- Un paragraphe
- Une image avec bordure
- Un bouton avec effet hover
- Une liste stylisée

**index.html**

```html
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Mon site CSS</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <h1>Bienvenue sur mon site</h1>
    <p>Je suis en train d'apprendre CSS.</p>
    <img src="image.jpg" alt="image">
    <button>Bouton</button>
    <ul>
        <li>HTML</li>
        <li>CSS</li>
    </ul>
</body>

</html>
```

**style.css**

```css
body {
    font-family: Arial;
    background-color: #f5f5f5;
    text-align: center;
}

h1 {
    color: darkblue;
}

p {
    font-size: 18px;
}

img {
    width: 300px;
    border: 3px solid black;
}

button {
    background-color: black;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: blue;
}

ul {
    list-style: square;
}
```

## ✅ Résumé

Dans ce chapitre, vous avez appris :

- Ce qu'est CSS
- Comment relier HTML et CSS
- Les différentes façons d'ajouter du CSS
- Les couleurs et textes
- Les marges et espacements
- Les sélecteurs CSS
- Le modèle Box Model
- Les bases de Flexbox
- Les effets hover
- Le responsive design
- Les bonnes pratiques CSS

## Quiz

**Question 1 :** Que signifie CSS ?
- a) Computer Style Sheets
- b) Cascading Style Sheets
- c) Creative Style Sheets
- d) Colorful Style Sheets

**Question 2 :** Quelle balise permet de lier un fichier CSS à un fichier HTML ?
- a) `<style>`
- b) `<css>`
- c) `<link>`
- d) `<script>`

**Question 3 :** Quelle propriété CSS change la couleur du texte ?
- a) `text-color`
- b) `font-color`
- c) `color`
- d) `text-style`

**Question 4 :** Quelle est la différence entre `margin` et `padding` ?
- a) Il n'y a pas de différence
- b) `margin` est l'espace intérieur, `padding` l'espace extérieur
- c) `margin` est l'espace extérieur, `padding` l'espace intérieur
- d) Les deux sont identiques

**Question 5 :** Comment sélectionner un élément par sa classe en CSS ?
- a) `#maClasse`
- b) `.maClasse`
- c) `*maClasse`
- d) `&maClasse`

**Question 6 :** Quelle propriété Flexbox permet d'activer le mode flexible ?
- a) `flex-direction`
- b) `display: flex`
- c) `align-items`
- d) `justify-content`

**Question 7 :** Quel sélecteur CSS permet d'appliquer un style au survol d'un élément ?
- a) `:click`
- b) `:hover`
- c) `:focus`
- d) `:active`

**Question 8 :** Que fait `@media screen and (max-width: 768px)` ?
- a) Applique des styles seulement sur les écrans de 768px
- b) Applique des styles quand l'écran fait moins de 768px
- c) Applique des styles quand l'écran fait plus de 768px
- d) Désactive les styles sur mobile

<details>
<summary><strong>Réponses</strong></summary>

1. **b** - Cascading Style Sheets
2. **c** - La balise `<link>` permet de lier un fichier CSS
3. **c** - `color` change la couleur du texte
4. **c** - `margin` est extérieur, `padding` est intérieur
5. **b** - Le point `.` permet de sélectionner par classe
6. **b** - `display: flex` active Flexbox
7. **b** - `:hover` est la pseudo-classe de survol
8. **b** - Applique les styles quand l'écran fait moins de 768px
</details>

---

# Chapitre 5 : Bootstrap

## Introduction

Bootstrap est un framework CSS développé par Twitter qui fournit des composants prêts à l'emploi et un système de grille puissant. Il permet de créer rapidement des interfaces modernes et responsives sans écrire tout le CSS manuellement.

## Objectifs pédagogiques

- Installer et configurer Bootstrap
- Utiliser le système de grille
- Intégrer des composants Bootstrap
- Créer une interface rapidement

## Contenu détaillé

### 4.1 Installation

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mon site Bootstrap</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
</body>
</html>
```

### 4.2 Le système de grille

Bootstrap utilise une grille de 12 colonnes.

```
┌─────────────────────────────────────────┐
│              Container                  │
│  ┌──────────┬──────────┬──────────────┐ │
│  │ Col-4    │ Col-4    │ Col-4        │ │
│  └──────────┴──────────┴──────────────┘ │
│  ┌──────────────────┬──────────────────┐ │
│  │ Col-6            │ Col-6            │ │
│  └──────────────────┴──────────────────┘ │
│  ┌─────────────────────────────────────┐ │
│  │ Col-12                              │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

```html
<div class="container">
    <div class="row">
        <div class="col-4">Colonne 1</div>
        <div class="col-4">Colonne 2</div>
        <div class="col-4">Colonne 3</div>
    </div>

    <div class="row">
        <div class="col-12 col-md-6 col-lg-4">Carte 1</div>
        <div class="col-12 col-md-6 col-lg-4">Carte 2</div>
        <div class="col-12 col-md-6 col-lg-4">Carte 3</div>
    </div>
</div>
```

**Breakpoints Bootstrap :**

| Préfixe | Taille | Périphérique |
|---------|--------|--------------|
| `col-` | < 576px | Mobile |
| `col-sm-` | ≥ 576px | Petit mobile |
| `col-md-` | ≥ 768px | Tablette |
| `col-lg-` | ≥ 992px | Desktop |
| `col-xl-` | ≥ 1200px | Grand écran |
| `col-xxl-` | ≥ 1400px | Très grand écran |

### 4.3 Composants Bootstrap

#### Navbar

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
        <a class="navbar-brand" href="#">MonSite</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item"><a class="nav-link active" href="#">Accueil</a></li>
                <li class="nav-item"><a class="nav-link" href="#">Services</a></li>
                <li class="nav-item"><a class="nav-link" href="#">Contact</a></li>
            </ul>
        </div>
    </div>
</nav>
```

#### Cartes (Cards)

```html
<div class="container">
    <div class="row">
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <img src="image1.jpg" class="card-img-top" alt="Projet 1">
                <div class="card-body">
                    <h5 class="card-title">Projet 1</h5>
                    <p class="card-text">Description du projet...</p>
                    <a href="#" class="btn btn-primary">Voir plus</a>
                </div>
            </div>
        </div>
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <img src="image2.jpg" class="card-img-top" alt="Projet 2">
                <div class="card-body">
                    <h5 class="card-title">Projet 2</h5>
                    <p class="card-text">Description du projet...</p>
                    <a href="#" class="btn btn-primary">Voir plus</a>
                </div>
            </div>
        </div>
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <img src="image3.jpg" class="card-img-top" alt="Projet 3">
                <div class="card-body">
                    <h5 class="card-title">Projet 3</h5>
                    <p class="card-text">Description du projet...</p>
                    <a href="#" class="btn btn-primary">Voir plus</a>
                </div>
            </div>
        </div>
    </div>
</div>
```

#### Boutons

```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-danger">Danger</button>
<button class="btn btn-warning">Warning</button>
<button class="btn btn-info">Info</button>
<button class="btn btn-light">Light</button>
<button class="btn btn-dark">Dark</button>

<button class="btn btn-primary btn-lg">Grand</button>
<button class="btn btn-primary btn-sm">Petit</button>
<button class="btn btn-outline-primary">Outline</button>
```

#### Formulaires

```html
<form class="container mt-4">
    <div class="mb-3">
        <label for="email" class="form-label">Adresse email</label>
        <input type="email" class="form-control" id="email" placeholder="nom@exemple.com">
    </div>
    <div class="mb-3">
        <label for="password" class="form-label">Mot de passe</label>
        <input type="password" class="form-control" id="password">
    </div>
    <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="remember">
        <label class="form-check-label" for="remember">Se souvenir de moi</label>
    </div>
    <button type="submit" class="btn btn-primary">Connexion</button>
</form>
```

#### Alertes

```html
<div class="alert alert-success">Opération réussie !</div>
<div class="alert alert-danger">Une erreur s'est produite.</div>
<div class="alert alert-warning">Attention !</div>
<div class="alert alert-info">Information importante.</div>

<div class="alert alert-warning alert-dismissible fade show">
    Attention ! Pensez à sauvegarder.
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>
```

#### Modale

```html
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
    Ouvrir la modale
</button>

<div class="modal fade" id="myModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Titre de la modale</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <p>Contenu de la modale...</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                <button type="button" class="btn btn-primary">Sauvegarder</button>
            </div>
        </div>
    </div>
</div>
```

#### Tableau

```html
<table class="table table-striped table-hover">
    <thead class="table-dark">
        <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Jean Dupont</td>
            <td>jean@email.com</td>
            <td><button class="btn btn-sm btn-primary">Modifier</button></td>
        </tr>
        <tr>
            <td>2</td>
            <td>Marie Martin</td>
            <td>marie@email.com</td>
            <td><button class="btn btn-sm btn-primary">Modifier</button></td>
        </tr>
    </tbody>
</table>
```

### 4.4 Utilitaires Bootstrap

```html
<div class="mt-3">Margin top 3</div>
<div class="mb-4">Margin bottom 4</div>
<div class="p-2">Padding 2</div>
<div class="px-3 py-2">Padding X=3, Y=2</div>

<p class="text-primary">Bleu</p>
<p class="text-danger">Rouge</p>
<p class="text-success">Vert</p>
<p class="text-center">Centré</p>
<p class="text-end">Aligné à droite</p>

<div class="d-flex justify-content-center align-items-center">
    Centré horizontalement et verticalement
</div>

<div class="d-none">Caché</div>
<div class="d-block">Affiché en bloc</div>
<div class="d-md-none">Caché sur desktop et plus</div>
```

## Exemples concrets

### Page d'accueil complète

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mon Site</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#">MonSite</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link active" href="#">Accueil</a></li>
                    <li class="nav-item"><a class="nav-link" href="#services">Services</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <section class="bg-primary text-white text-center py-5">
        <div class="container">
            <h1 class="display-4 fw-bold">Bienvenue sur MonSite</h1>
            <p class="lead">La solution pour tous vos besoins digitaux</p>
            <a href="#services" class="btn btn-light btn-lg mt-3">Découvrir nos services</a>
        </div>
    </section>

    <section id="services" class="py-5">
        <div class="container">
            <h2 class="text-center mb-5">Nos Services</h2>
            <div class="row">
                <div class="col-md-4 mb-4">
                    <div class="card h-100 text-center p-4">
                        <h3>Web Design</h3>
                        <p>Création de designs modernes et élégants pour votre site web.</p>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card h-100 text-center p-4">
                        <h3>Développement</h3>
                        <p>Développement sur mesure avec les dernières technologies.</p>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card h-100 text-center p-4">
                        <h3>SEO</h3>
                        <p>Optimisation pour les moteurs de recherche et visibilité.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="contact" class="bg-light py-5">
        <div class="container">
            <h2 class="text-center mb-4">Contactez-nous</h2>
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <form>
                        <div class="mb-3">
                            <label class="form-label">Nom</label>
                            <input type="text" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Message</label>
                            <textarea class="form-control" rows="4" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Envoyer</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <footer class="bg-dark text-white text-center py-4">
        <p class="mb-0">&copy; 2025 MonSite. Tous droits réservés.</p>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## Mini projet pratique

### Créer une page "Équipe" avec Bootstrap

Créez une page qui affiche les membres d'une équipe avec :
1. Une navbar responsive
2. Un titre "Notre Équipe" centré
3. Une grille de cartes avec photo, nom, poste et boutons de contact
4. Au moins 6 membres d'équipe
5. Un footer avec les liens sociaux

## Quiz

**Question 1 :** Combien de colonnes contient la grille Bootstrap par défaut ?
- a) 10
- b) 12
- c) 16
- d) 24

**Question 2 :** Quelle classe Bootstrap centre un élément horizontalement ?
- a) `text-center`
- b) `justify-content-center`
- c) Les deux a et b
- d) `center`

**Question 3 :** Que signifie `col-md-6` ?
- a) 6 colonnes sur mobile
- b) 6 colonnes sur tablette et plus
- c) 6 colonnes sur tous les écrans
- d) 60% de largeur

**Question 4 :** Quelle classe rend un bouton rouge dans Bootstrap ?
- a) `btn-red`
- b) `btn-danger`
- c) `btn-error`
- d) `btn-alert`

**Question 5 :** Comment afficher/masquer un élément selon la taille d'écran ?
- a) Avec des media queries personnalisées uniquement
- b) Avec les classes `d-none`, `d-md-block`, etc.
- c) Avec JavaScript uniquement
- d) Ce n'est pas possible

<details>
<summary><strong>Réponses</strong></summary>

1. **b** - La grille Bootstrap a 12 colonnes
2. **c** - Les deux fonctionnent (texte vs flexbox)
3. **b** - `md` = breakpoint tablette (≥ 768px)
4. **b** - `btn-danger` est rouge
5. **b** - Les classes utilitaires de display
</details>

---

# Chapitre 6 : Introduction aux algorithmes (Cours complet)

## 🎯 Objectifs du chapitre

À la fin de ce chapitre, l'apprenant sera capable de :

- Comprendre ce qu'est un algorithme
- Identifier les étapes de résolution d'un problème
- Écrire un algorithme simple en pseudo-code
- Utiliser les variables et opérateurs
- Comprendre les structures conditionnelles
- Utiliser les boucles et structures itératives
- Développer la logique algorithmique

## 1. 🌐 Qu'est-ce qu'un algorithme ?

Le terme **Algorithme** vient du mathématicien arabe Muhammad ibn Musa al-Khwarizmi.

Un algorithme est :

- Une **suite d'instructions** permettant de résoudre un problème en un nombre fini d'étapes
- Une **méthode logique** utilisée avant de programmer

## 2. 📌 Définition simple

Un algorithme sert à :

- Résoudre un problème
- Automatiser une tâche
- Organiser des étapes logiques

> Il est indépendant du langage de programmation.

## 3. 🧠 Exemples d'algorithmes dans la vie réelle

- Préparer un repas
- Suivre un itinéraire GPS
- Retirer de l'argent au distributeur
- Gérer une file d'attente
- Se connecter à un compte

## 4. ✅ Propriétés d'un bon algorithme

Un bon algorithme doit :

- Avoir un nombre fini d'étapes
- Être clair et compréhensible
- Produire un résultat précis
- Être non ambigu
- Être efficace

## 5. 🏗️ Formalisme d'un algorithme

Il existe deux façons de représenter un algorithme :

### L'organigramme

Représentation graphique avec des symboles :

- Rectangle → traitement
- Losange → condition

### Le pseudo-code (Méthode recommandée)

Représentation textuelle proche du langage humain :

```
Début
    Afficher("Bonjour")
Fin
```

## 6. ⚙️ Les phases d'écriture d'un algorithme

### Initialisation (Entrées)

Identifier les données nécessaires. Exemple : prix d'un produit, nom d'un utilisateur.

### Traitement

Appliquer les calculs ou instructions. Exemple : additionner, comparer, multiplier.

### Restitution (Sortie)

Afficher le résultat obtenu.

## 7. 📄 Exemple simple d'algorithme

**Calcul du prix TTC :**

```
Algorithme CalculPrixTTC

Variables :
    prixUnitaire, nombreArticles, tauxTVA : Réel
    prixHT, montantTVA, prixTTC : Réel

Début
    Afficher("Prix unitaire : ")
    Lire(prixUnitaire)

    Afficher("Nombre d'articles : ")
    Lire(nombreArticles)

    Afficher("Taux TVA : ")
    Lire(tauxTVA)

    prixHT ← prixUnitaire * nombreArticles
    montantTVA ← prixHT * tauxTVA
    prixTTC ← prixHT + montantTVA

    Afficher("Le prix TTC est : ", prixTTC)
Fin
```

## 8. 🏛️ Structure générale d'un algorithme

Un algorithme est composé de :

### L'en-tête

Contient le nom de l'algorithme et les variables.

### Le corps

Contient `Début`, les instructions, et `Fin`.

## 9. 💻 Différence entre algorithme et programme

| Algorithme | Programme |
|------------|-----------|
| Méthode logique | Code exécutable |
| Indépendant du langage | Dépend du langage |
| Théorique | Pratique |

> Un programme est la traduction d'un algorithme dans un langage informatique.

## 10. 📦 Les variables

Une **variable** est un espace mémoire permettant de stocker une valeur.

```
VARIABLE age : entier
```

**Caractéristiques d'une variable :** nom, valeur, type.

### Règles de nommage

✅ Correct : `age`, `note1`, `prix_total`

❌ Incorrect : `1age`, `prix-total`, `mon nom`

## 11. 🔢 Les types de variables

| Type | Exemple |
|------|---------|
| Entier | 5 |
| Réel | 3.14 |
| Booléen | VRAI / FAUX |
| Caractère | 'A' |
| Chaîne | "Bonjour" |

## 12. 📌 Les constantes

Une **constante** possède une valeur fixe qui ne change pas.

```
Constante PI = 3.14
```

## 13. ➕ Les opérateurs

| Opérateur | Rôle | Exemple |
|-----------|------|---------|
| `+` | Addition | 5 + 2 |
| `-` | Soustraction | 7 - 3 |
| `*` | Multiplication | 4 * 2 |
| `/` | Division | 10 / 2 |
| `%` | Modulo | 10 % 3 |
| `==` | Égalité | A == B |
| `!=` | Différent | A != B |

## 14. 🔄 L'affectation

L'affectation permet de donner une valeur à une variable.

```
A ← 5
```

> La variable A reçoit la valeur 5.

## 15. 🖊️ Lecture et écriture

### Affichage

```
ECRIRE("Bonjour")
```

### Lecture clavier

```
LIRE(age)
```

## 16. 🧪 Exemple complet

```
VARIABLE A, B : entier

Début
    ECRIRE("Entrer A")
    LIRE(A)

    B ← A * 2

    ECRIRE("Le double est : ", B)
Fin
```

## 17. 🔀 Les structures conditionnelles

Les conditions permettent de prendre des décisions.

### Condition simple : SI

```
SI (A > 0) ALORS
    ECRIRE("Positif")
FIN_SI
```

### Condition alternative : SI...SINON

```
SI (A > 0) ALORS
    ECRIRE("Positif")
SINON
    ECRIRE("Négatif")
FIN_SI
```

### Conditions imbriquées

```
SI (TEMP <= 0) ALORS
    ECRIRE("GLACE")
SINON
    SI (TEMP == 100) ALORS
        ECRIRE("VAPEUR")
    FIN_SI
FIN_SI
```

## 18. 🔁 Les structures itératives (Boucles)

Une boucle permet de répéter des instructions.

### Boucle TANT QUE

```
VARIABLE i, somme : entier

Début
    i ← 0
    somme ← 0

    TANT_QUE (somme < 10)
        i ← i + 1
        somme ← somme + i
    FIN_TANT_QUE

    ECRIRE(i)
Fin
```

> La boucle continue tant que la condition est vraie.

### Boucle POUR

```
POUR i ALLANT_DE 1 A 5
    ECRIRE(i)
FIN_POUR
```

> Répète les instructions un nombre précis de fois.

### Différence entre POUR et TANT QUE

| POUR | TANT QUE |
|------|----------|
| Nombre connu d'itérations | Nombre inconnu d'itérations |
| Boucle définie | Boucle conditionnelle |

## 19. ✅ Bonnes pratiques en algorithmique

- Utiliser des noms clairs
- Indenter le code
- Éviter les répétitions inutiles
- Commenter les parties importantes
- Tester les algorithmes

## 🧪 Exercice pratique

**Objectif :** Créer un algorithme qui demande deux nombres, calcule leur somme, et affiche le résultat.

```
VARIABLE A, B, SOMME : entier

Début
    ECRIRE("Entrer A")
    LIRE(A)

    ECRIRE("Entrer B")
    LIRE(B)

    SOMME ← A + B

    ECRIRE("La somme est : ", SOMME)
Fin
```

## ✅ Résumé

Dans ce chapitre, vous avez appris :

- Ce qu'est un algorithme
- Les variables et constantes
- Les opérateurs
- L'affectation
- Les structures conditionnelles
- Les boucles
- Les bonnes pratiques de logique algorithmique

> L'algorithmique est la base de tous les langages de programmation.

## Quiz

**Question 1 :** Qu'est-ce qu'un algorithme ?
- a) Un langage de programmation
- b) Une suite d'instructions pour résoudre un problème
- c) Un type de variable
- d) Un navigateur web

**Question 2 :** Quel symbole utilise-t-on pour l'affectation en pseudo-code ?
- a) `=`
- b) `←`
- c) `==`
- d) `→`

**Question 3 :** Quel type de variable permet de stocker VRAI ou FAUX ?
- a) Entier
- b) Réel
- c) Booléen
- d) Caractère

**Question 4 :** Quelle structure permet de répéter des instructions ?
- a) SI...SINON
- b) Boucle
- c) Variable
- d) Constante

**Question 5 :** Quelle boucle utiliser quand on connaît le nombre exact d'itérations ?
- a) TANT QUE
- b) POUR
- c) SI
- d) SINON

**Question 6 :** Que signifie le modulo (`%`) ?
- a) La division
- b) Le reste de la division
- c) La multiplication
- d) La soustraction

<details>
<summary><strong>Réponses</strong></summary>

1. **b** - Un algorithme est une suite d'instructions
2. **b** - `←` est le symbole d'affectation
3. **c** - Le type Booléen stocke VRAI ou FAUX
4. **b** - La boucle permet de répéter des instructions
5. **b** - POUR est utilisé quand le nombre est connu
6. **b** - `%` donne le reste de la division
</details>

---

# Chapitre 7 : Structures de données

## Introduction

Les structures de données sont des façons d'organiser et de stocker les informations pour les utiliser efficacement. Ce chapitre explore les deux structures fondamentales : les tableaux et les objets.

## Objectifs pédagogiques

- Comprendre et utiliser les tableaux (arrays)
- Maîtriser les objets (key-value pairs)
- Manipuler des données efficacement
- Choisir la bonne structure selon le besoin

## Contenu détaillé

### 6.1 Les tableaux (Arrays)

```
// Créer un tableau
fruits = ["pomme", "banane", "orange", "fraise"]
nombres = [10, 20, 30, 40, 50]

// Accéder à un élément (index commence à 0)
fruits[0]    → "pomme"
fruits[2]    → "orange"

// Modifier un élément
fruits[1] = "kiwi"
```

#### Opérations sur les tableaux

```
fruits.push("mangue")         // Ajoute à la fin
fruits.unshift("ananas")      // Ajoute au début
fruits.pop()                  // Retire le dernier
fruits.shift()                // Retire le premier
longueur(fruits)              // → 5
fruits.indexOf("orange")      // → 2
fruits.includes("pomme")      // → true
fruits.slice(1, 3)            // → ["kiwi", "orange"]
fruits.join(", ")             // → "pomme, kiwi, orange, fraise"
fruits.reverse()              // Inverse l'ordre
nombres.sort()                // Tri par ordre croissant
```

#### Parcourir un tableau

```
POUR i DE 0 À longueur(fruits) - 1 FAIRE
    AFFICHER fruits[i]
FIN POUR

POUR CHAQUE fruit DANS fruits FAIRE
    AFFICHER fruit
FIN POUR

nombres = [10, 20, 30, 40, 50]
somme = 0
POUR CHAQUE n DANS nombres FAIRE
    somme = somme + n
FIN POUR
AFFICHER "Somme : " + somme
```

### 6.2 Les objets

```
personne = {
    nom: "Dupont",
    prenom: "Jean",
    age: 25,
    email: "jean@email.com",
    adresse: {
        ville: "Paris",
        codePostal: "75001"
    }
}

personne.nom           → "Dupont"
personne["prenom"]     → "Jean"
personne.adresse.ville → "Paris"

personne.age = 26
personne.telephone = "06 12 34 56 78"
```

#### Tableau d'objets

```
utilisateurs = [
    { id: 1, nom: "Dupont", email: "jean@email.com", actif: true },
    { id: 2, nom: "Martin", email: "marie@email.com", actif: true },
    { id: 3, nom: "Bernard", email: "pierre@email.com", actif: false }
]

utilisateurs[0].nom  → "Dupont"

POUR CHAQUE user DANS utilisateurs FAIRE
    SI user.id == 2 ALORS
        AFFICHER user.email
    FIN SI
FIN POUR
```

### 6.3 Manipulation de données

#### Filtrer

```
actifs = []
POUR CHAQUE user DANS utilisateurs FAIRE
    SI user.actif == true ALORS
        actifs.push(user)
    FIN SI
FIN POUR
```

#### Transformer

```
noms = []
POUR CHAQUE user DANS utilisateurs FAIRE
    noms.push(user.nom)
FIN POUR
```

#### Agréger

```
produits = [
    { nom: "Laptop", prix: 899, categorie: "informatique" },
    { nom: "Souris", prix: 29, categorie: "informatique" },
    { nom: "Chaise", prix: 199, categorie: "mobilier" }
]

total = 0
POUR CHAQUE produit DANS produits FAIRE
    total = total + produit.prix
FIN POUR
AFFICHER "Total : " + total
```

## Exemples concrets

### Gestionnaire de tâches

```
taches = [
    { id: 1, texte: "Faire les courses", terminee: false, priorite: "haute" },
    { id: 2, texte: "Réviser le cours de CSS", terminee: true, priorite: "moyenne" },
    { id: 3, texte: "Appeler le dentiste", terminee: false, priorite: "haute" }
]

POUR CHAQUE tache DANS taches FAIRE
    statut = tache.terminee ? "✅" : "⬜"
    AFFICHER statut + " " + tache.texte + " [" + tache.priorite + "]"
FIN POUR

compteur = 0
POUR CHAQUE tache DANS taches FAIRE
    SI tache.terminee == false ALORS
        compteur = compteur + 1
    FIN SI
FIN POUR
AFFICHER "Il reste " + compteur + " tâches à faire"
```

## Mini projet pratique

### Gestionnaire d'inventaire

Créez un programme qui gère un inventaire de produits avec :
1. Un tableau d'objets contenant : nom, prix, quantité, catégorie
2. Au moins 8 produits dans 3 catégories différentes
3. Calculez la valeur totale de l'inventaire (prix × quantité)
4. Affichez les produits dont la quantité est inférieure à 5 (stock faible)
5. Calculez le nombre de produits par catégorie

## Quiz

**Question 1 :** Quel est l'index du premier élément d'un tableau ?
- a) 1
- b) 0
- c) -1
- d) Ça dépend du langage

**Question 2 :** Comment accéder à la propriété `nom` d'un objet `personne` ?
- a) `personne(nom)`
- b) `personne.nom`
- c) `personne->nom`
- d) `nom.personne`

**Question 3 :** Quelle méthode ajoute un élément à la fin d'un tableau ?
- a) `add()`
- b) `append()`
- c) `push()`
- d) `insert()`

**Question 4 :** Quelle structure utiliser pour stocker les informations d'un utilisateur (nom, email, âge) ?
- a) Un tableau
- b) Un objet
- c) Une variable simple
- d) Une boucle

**Question 5 :** Que retourne `["a", "b", "c"].length` ?
- a) 2
- b) 3
- c) 4
- d) undefined

<details>
<summary><strong>Réponses</strong></summary>

1. **b** - Les index commencent à 0
2. **b** - `personne.nom` ou `personne["nom"]`
3. **c** - `push()` ajoute à la fin
4. **b** - Un objet avec des paires clé-valeur
5. **b** - Le tableau a 3 éléments
</details>

---

# Chapitre 8 : JavaScript

## Introduction

JavaScript est le langage de programmation du web. Il permet d'ajouter de l'interactivité à vos pages : réagir aux clics, valider des formulaires, modifier le contenu dynamiquement. Ce chapitre applique les concepts d'algorithmes et de structures de données en JavaScript.

## Objectifs pédagogiques

- Déclarer et utiliser des variables
- Créer et appeler des fonctions
- Maîtriser les conditions et les boucles en JavaScript
- Écrire des scripts fonctionnels

## Contenu détaillé

### 7.1 Les variables

```javascript
// let (variable modifiable)
let age = 25;
age = 26;

// const (constante - ne change pas)
const PI = 3.14159;
const PRENOM = "Jean";

// Types de données
let nombre = 42;
let prix = 19.99;
let texte = "Bonjour";
let estVrai = true;
let rien = null;
let nonDefini = undefined;
let liste = [1, 2, 3];
let objet = { nom: "Jean" };

// Template literals
let nom = "Jean";
let message = `Bonjour ${nom}, vous avez ${age} ans`;
```

### 7.2 Les opérateurs

```javascript
// Arithmétiques
let a = 10 + 5;    // 15
let b = 10 - 5;    // 5
let c = 10 * 5;    // 50
let d = 10 / 5;    // 2
let e = 10 % 3;    // 1 (modulo)
let f = 2 ** 3;    // 8 (puissance)

// Comparaison
console.log(5 === 5);   // true (égalité stricte)
console.log(5 === "5"); // false (types différents)
console.log(5 !== 3);   // true

// Logiques
console.log(true && false);  // false (ET)
console.log(true || false);  // true  (OU)
console.log(!true);          // false (NON)
```

### 7.3 Les fonctions

```javascript
function direBonjour(nom) {
    return `Bonjour ${nom} !`;
}

let message = direBonjour("Jean");
console.log(message);

function calculer(a, b, operation) {
    switch (operation) {
        case "addition": return a + b;
        case "soustraction": return a - b;
        case "multiplication": return a * b;
        case "division":
            if (b !== 0) return a / b;
            return "Division par zéro impossible";
        default: return "Opération inconnue";
    }
}

// Fonction fléchée
const multiplier = (a, b) => a * b;
console.log(multiplier(4, 3));

// Valeur par défaut
function saluer(nom = "visiteur") {
    return `Bonjour ${nom} !`;
}
```

### 7.4 Les conditions

```javascript
let age = 20;

if (age >= 18) {
    console.log("Vous êtes majeur");
} else if (age >= 13) {
    console.log("Vous êtes adolescent");
} else {
    console.log("Vous êtes enfant");
}

// Opérateur ternaire
let statut = age >= 18 ? "majeur" : "mineur";

// Switch
let jour = "lundi";
switch (jour) {
    case "lundi":
        console.log("Début de semaine");
        break;
    case "vendredi":
        console.log("Bientôt le week-end !");
        break;
    case "samedi":
    case "dimanche":
        console.log("Week-end !");
        break;
    default:
        console.log("Jour de semaine");
}
```

### 7.5 Les boucles

```javascript
// for
for (let i = 0; i < 5; i++) {
    console.log("Tour numéro " + i);
}

// Parcourir un tableau
let fruits = ["pomme", "banane", "orange"];

for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

for (let fruit of fruits) {
    console.log(fruit);
}

// while
let compteur = 0;
while (compteur < 5) {
    console.log(compteur);
    compteur++;
}

// Méthodes de tableau
let nombres = [1, 2, 3, 4, 5];

nombres.forEach(function(n) {
    console.log(n * 2);
});

let doubles = nombres.map(n => n * 2);
console.log(doubles); // [2, 4, 6, 8, 10]

let pairs = nombres.filter(n => n % 2 === 0);
console.log(pairs); // [2, 4]

let premier = nombres.find(n => n > 3);
console.log(premier); // 4

let somme = nombres.reduce((total, n) => total + n, 0);
console.log(somme); // 15
```

## Exemples concrets

### Calculatrice

```javascript
function calculatrice() {
    let nombre1 = parseFloat(prompt("Premier nombre :"));
    let operation = prompt("Opération (+, -, *, /) :");
    let nombre2 = parseFloat(prompt("Deuxième nombre :"));
    let resultat;

    switch (operation) {
        case "+": resultat = nombre1 + nombre2; break;
        case "-": resultat = nombre1 - nombre2; break;
        case "*": resultat = nombre1 * nombre2; break;
        case "/":
            resultat = nombre2 !== 0 ? nombre1 / nombre2 : "Division par zéro";
            break;
        default: resultat = "Opération invalide";
    }

    alert(`Résultat : ${resultat}`);
}

calculatrice();
```

### Jeu du nombre mystère

```javascript
function jeuDuNombre() {
    let nombreSecret = Math.floor(Math.random() * 100) + 1;
    let tentatives = 0;
    let trouve = false;

    while (!trouve && tentatives < 10) {
        let guess = parseInt(prompt("Devinez le nombre (1-100) :"));
        tentatives++;

        if (guess === nombreSecret) {
            alert(`Bravo ! Trouvé en ${tentatives} tentatives !`);
            trouve = true;
        } else if (guess < nombreSecret) {
            alert("C'est plus !");
        } else {
            alert("C'est moins !");
        }
    }

    if (!trouve) {
        alert(`Perdu ! Le nombre était ${nombreSecret}`);
    }
}

jeuDuNombre();
```

## Mini projet pratique

### Gestionnaire de notes

Créez un programme JavaScript qui :
1. Stocke les notes d'un étudiant dans un tableau
2. Permet d'ajouter une nouvelle note
3. Calcule la moyenne
4. Trouve la note la plus haute et la plus basse
5. Affiche "Admis" si la moyenne >= 10, sinon "Non admis"

```javascript
let notes = [12, 15, 8, 17, 14];

function ajouterNote(nouvelleNote) { /* À compléter */ }
function calculerMoyenne() { /* À compléter */ }
function obtenirMeilleureNote() { /* À compléter */ }
function obtenirPlusBasseNote() { /* À compléter */ }
function verifierAdmission() { /* À compléter */ }
```

## Quiz

**Question 1 :** Quelle est la différence entre `let` et `const` ?
- a) `let` est pour les nombres, `const` pour les textes
- b) `let` peut être réassigné, `const` non
- c) `const` est plus rapide
- d) Il n'y a aucune différence

**Question 2 :** Que retourne `typeof "Bonjour"` ?
- a) `text`
- b) `character`
- c) `string`
- d) `word`

**Question 3 :** Quelle méthode de tableau crée un nouveau tableau filtré ?
- a) `map()`
- b) `filter()`
- c) `forEach()`
- d) `find()`

**Question 4 :** Que fait `Math.random()` ?
- a) Retourne un nombre entier aléatoire
- b) Retourne un nombre décimal aléatoire entre 0 et 1
- c) Retourne un nombre entre 0 et 100
- d) Mélange un tableau

**Question 5 :** Quelle est la syntaxe correcte pour une fonction fléchée ?
- a) `function => (x) { return x; }`
- b) `(x) => { return x; }`
- c) `arrow function(x) { return x; }`
- d) `fn(x) => x`

<details>
<summary><strong>Réponses</strong></summary>

1. **b** - `let` peut être réassigné, `const` non
2. **c** - `typeof` retourne `"string"`
3. **b** - `filter()` retourne un tableau filtré
4. **b** - Retourne un nombre entre 0 (inclus) et 1 (exclus)
5. **b** - `(x) => { return x; }` ou `x => x`
</details>

---

# Chapitre 9 : DOM (Document Object Model)

## Introduction

Le DOM (Document Object Model) est la représentation de votre page HTML sous forme d'arbre d'objets que JavaScript peut manipuler. C'est le pont entre JavaScript et le HTML : il permet de modifier le contenu, le style et la structure d'une page dynamiquement.

## Objectifs pédagogiques

- Comprendre ce qu'est le DOM
- Sélectionner des éléments du DOM
- Modifier le contenu et le style dynamiquement
- Gérer les événements utilisateur

## Contenu détaillé

### 8.1 Qu'est-ce que le DOM ?

```
document
└── html
    ├── head
    │   ├── meta
    │   └── title → "Ma Page"
    └── body
        ├── h1 → "Bienvenue"
        ├── p → "Un paragraphe"
        └── div
            ├── button → "Cliquez"
            └── span → "Texte"
```

### 8.2 Sélectionner des éléments

```javascript
document.getElementById("titre");
document.getElementsByClassName("item");
document.getElementsByTagName("p");

// Sélecteur CSS (premier élément)
document.querySelector(".menu");
document.querySelector("nav li");

// Tous les éléments correspondants
document.querySelectorAll(".card");
document.querySelectorAll("ul li");

// Parcourir
tous.forEach(element => {
    console.log(element);
});
```

### 8.3 Manipulation du contenu

```javascript
let titre = document.querySelector("#titre");

// Modifier le texte
titre.textContent = "Nouveau titre";

// Modifier le HTML
titre.innerHTML = "Titre avec <strong>gras</strong>";

// Modifier les attributs
let lien = document.querySelector("a");
lien.href = "https://example.com";
lien.setAttribute("target", "_blank");

// Classes CSS
element.classList.add("active");
element.classList.remove("hidden");
element.classList.toggle("visible");
element.classList.contains("active");

// Styles CSS en ligne
element.style.color = "red";
element.style.backgroundColor = "#f0f0f0";
element.style.fontSize = "20px";
```

### 8.4 Créer et supprimer des éléments

```javascript
let nouveauDiv = document.createElement("div");
nouveauDiv.textContent = "Je suis un nouveau div";
nouveauDiv.className = "ma-classe";

document.body.appendChild(nouveauDiv);

let parent = document.querySelector(".container");
let reference = document.querySelector(".element-existant");
parent.insertBefore(nouveauDiv, reference);

let elementASupprimer = document.querySelector(".old");
elementASupprimer.remove();

// Exemple : ajouter une liste dynamique
function ajouterElement(texte) {
    let li = document.createElement("li");
    li.textContent = texte;
    let ul = document.querySelector("#ma-liste");
    ul.appendChild(li);
}

ajouterElement("Premier élément");
ajouterElement("Deuxième élément");
```

### 8.5 Les événements

```javascript
let bouton = document.querySelector("#mon-bouton");

bouton.addEventListener("click", function() {
    alert("Bouton cliqué !");
});

function handleClick() {
    console.log("Cliqué !");
}
bouton.addEventListener("click", handleClick);
bouton.removeEventListener("click", handleClick);
```

#### Événements courants

| Événement | Déclenché quand... |
|-----------|-------------------|
| `click` | On clique sur l'élément |
| `dblclick` | Double-clic |
| `mouseover` | La souris survole |
| `mouseout` | La souris quitte |
| `keydown` | Une touche est enfoncée |
| `keyup` | Une touche est relâchée |
| `submit` | Un formulaire est soumis |
| `change` | La valeur d'un input change |
| `input` | L'utilisateur tape dans un champ |
| `focus` | Un élément reçoit le focus |
| `blur` | Un élément perd le focus |
| `load` | La page a fini de charger |

#### L'objet Event

```javascript
document.querySelector("#formulaire").addEventListener("submit", function(event) {
    event.preventDefault();

    let nom = document.querySelector("#nom").value;
    let email = document.querySelector("#email").value;

    console.log("Nom :", nom);
    console.log("Email :", email);
});

document.querySelector("ul").addEventListener("click", function(event) {
    console.log("Élément cliqué :", event.target);
    console.log("Texte :", event.target.textContent);
});
```

## Exemples concrets

### Compteur interactif

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Compteur</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
        }
        .compteur {
            text-align: center;
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        #valeur { font-size: 72px; font-weight: bold; color: #333; }
        button { font-size: 24px; padding: 10px 20px; margin: 10px; border: none; border-radius: 5px; cursor: pointer; }
        .plus { background-color: #2ecc71; color: white; }
        .moins { background-color: #e74c3c; color: white; }
        .reset { background-color: #95a5a6; color: white; }
    </style>
</head>
<body>
    <div class="compteur">
        <h1>Compteur</h1>
        <p id="valeur">0</p>
        <button class="moins" id="decrementer">-</button>
        <button class="reset" id="reset">Reset</button>
        <button class="plus" id="incrementer">+</button>
    </div>
    <script>
        let count = 0;
        let display = document.querySelector("#valeur");

        function updateDisplay() {
            display.textContent = count;
            if (count > 0) display.style.color = "#2ecc71";
            else if (count < 0) display.style.color = "#e74c3c";
            else display.style.color = "#333";
        }

        document.querySelector("#incrementer").addEventListener("click", () => { count++; updateDisplay(); });
        document.querySelector("#decrementer").addEventListener("click", () => { count--; updateDisplay(); });
        document.querySelector("#reset").addEventListener("click", () => { count = 0; updateDisplay(); });
    </script>
</body>
</html>
```

### Formulaire de validation

```javascript
document.querySelector("#mon-formulaire").addEventListener("submit", function(event) {
    event.preventDefault();

    let nom = document.querySelector("#nom").value;
    let email = document.querySelector("#email").value;
    let message = document.querySelector("#message").value;
    let erreurs = [];

    if (nom.length < 2) erreurs.push("Le nom doit contenir au moins 2 caractères");
    if (!email.includes("@")) erreurs.push("L'email n'est pas valide");
    if (message.length < 10) erreurs.push("Le message doit contenir au moins 10 caractères");

    let zoneErreur = document.querySelector("#erreurs");

    if (erreurs.length > 0) {
        zoneErreur.innerHTML = "";
        erreurs.forEach(erreur => {
            let p = document.createElement("p");
            p.textContent = erreur;
            p.style.color = "red";
            zoneErreur.appendChild(p);
        });
    } else {
        zoneErreur.innerHTML = "<p style='color: green;'>Formulaire envoyé avec succès !</p>";
        document.querySelector("#nom").value = "";
        document.querySelector("#email").value = "";
        document.querySelector("#message").value = "";
    }
});
```

## Mini projet pratique

### Todo List interactive

Créez une application de liste de tâches avec :
1. Un champ input pour ajouter des tâches
2. Un bouton "Ajouter"
3. Chaque tâche affichée avec un bouton "Terminé" et "Supprimer"
4. Un compteur de tâches restantes
5. Un bouton "Supprimer tout"

## Quiz

**Question 1 :** Que représente le DOM ?
- a) Un langage de programmation
- b) La représentation de la page HTML en arbre d'objets
- c) Un framework JavaScript
- d) Un serveur web

**Question 2 :** Quelle méthode sélectionne un élément par son ID ?
- a) `document.querySelector("#id")`
- b) `document.getElementById("id")`
- c) Les deux a et b
- d) `document.select("id")`

**Question 3 :** Que fait `event.preventDefault()` ?
- a) Supprime l'événement
- b) Empêche le comportement par défaut
- c) Arrête la propagation de l'événement
- d) Déclenche l'événement

**Question 4 :** Comment ajouter une classe CSS à un élément ?
- a) `element.class = "ma-classe"`
- b) `element.classList.add("ma-classe")`
- c) `element.addClass("ma-classe")`
- d) `element.style.class = "ma-classe"`

**Question 5 :** Quel événement se déclenche quand l'utilisateur tape dans un champ ?
- a) `click`
- b) `change`
- c) `input`
- d) `keypress`

<details>
<summary><strong>Réponses</strong></summary>

1. **b** - Le DOM est la représentation en arbre de la page
2. **c** - Les deux méthodes fonctionnent
3. **b** - Empêche le comportement par défaut
4. **b** - `classList.add()` est la méthode correcte
5. **c** - `input` se déclenche à chaque frappe
</details>

---

# Chapitre 10 : Vibe Coding

## Introduction

Le "Vibe Coding" est une approche moderne du développement qui met l'accent sur le flow, la productivité et le plaisir de coder. Ce chapitre rassemble les bonnes pratiques, l'organisation du code, le debugging et vous prépare pour le projet final.

## Objectifs pédagogiques

- Adopter les bonnes pratiques de développement
- Organiser son code de manière professionnelle
- Débugger efficacement
- Préparer et réaliser le projet final

## Contenu détaillé

### 9.1 Bonnes pratiques

#### Nommage

```javascript
// ❌ MAUVAIS
let x = 25;
let y = "Jean";
function f(a, b) { return a + b; }

// ✅ BON
let ageUtilisateur = 25;
let nomUtilisateur = "Jean";
function calculerSomme(nombre1, nombre2) { return nombre1 + nombre2; }
```

#### Indentation

```javascript
// ❌ MAUVAIS
function verifier(age){
if(age>=18){
console.log("majeur");
}else{console.log("mineur");}}

// ✅ BON
function verifier(age) {
    if (age >= 18) {
        console.log("majeur");
    } else {
        console.log("mineur");
    }
}
```

#### Commentaires utiles

```javascript
// ❌ MAUVAIS - Commentaire évident
i++; // Incrémente i de 1

// ✅ BON - Explique le POURQUOI
// On commence à 1 car l'index 0 est réservé à l'en-tête
for (let i = 1; i < donnees.length; i++) {
    traiter(donnees[i]);
}
```

### 9.2 Organisation du code

#### Structure d'un projet web

```
mon-projet/
├── index.html
├── css/
│   ├── style.css
│   └── components.css
├── js/
│   ├── main.js
│   ├── utils.js
│   └── app.js
├── images/
│   ├── logo.png
│   └── hero.jpg
└── README.md
```

#### Séparer les responsabilités

```html
<!-- index.html - Structure uniquement -->
<!DOCTYPE html>
<html lang="fr">
<head>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div id="app">
        <h1 id="titre">Mon Application</h1>
        <input type="text" id="input-nom" placeholder="Votre nom">
        <button id="btn-valider">Valider</button>
        <ul id="liste-noms"></ul>
    </div>
    <script src="js/main.js"></script>
</body>
</html>
```

```css
/* css/style.css - Styles uniquement */
body { font-family: 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
#titre { color: #2c3e50; text-align: center; }
button { background-color: #3498db; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
```

```javascript
// js/main.js - Logique uniquement
document.addEventListener("DOMContentLoaded", function() {
    const inputNom = document.querySelector("#input-nom");
    const btnValider = document.querySelector("#btn-valider");
    const listeNoms = document.querySelector("#liste-noms");

    btnValider.addEventListener("click", function() {
        const nom = inputNom.value.trim();
        if (nom === "") {
            alert("Veuillez entrer un nom");
            return;
        }
        const li = document.createElement("li");
        li.textContent = nom;
        listeNoms.appendChild(li);
        inputNom.value = "";
        inputNom.focus();
    });
});
```

### 9.3 Debugging

#### console.log()

```javascript
function calculerMoyenne(notes) {
    console.log("Notes reçues :", notes);
    let somme = 0;
    for (let note of notes) {
        somme += note;
        console.log("Note :", note, "| Somme :", somme);
    }
    let moyenne = somme / notes.length;
    console.log("Moyenne finale :", moyenne);
    return moyenne;
}
```

#### DevTools (F12)

1. Ouvrez les DevTools (F12)
2. Allez dans l'onglet **Sources**
3. Placez un **breakpoint** en cliquant sur une ligne
4. Inspectez les variables, avancez étape par étape

#### Messages d'erreur

```javascript
// SyntaxError - Erreur de syntaxe
let x = ;

// ReferenceError - Variable non définie
console.log(variableInexistante);

// TypeError - Mauvais type
"hello".push(42);
```

#### Tester par étapes

```javascript
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM chargé ✓");

    let bouton = document.querySelector("#mon-bouton");
    console.log("Bouton trouvé :", bouton);

    bouton.addEventListener("click", function() {
        console.log("Bouton cliqué ✓");
        let resultat = traiterDonnees();
        console.log("Résultat :", resultat);
    });
});
```

### 9.4 Checklist avant livraison

- [ ] Code indenté correctement
- [ ] Variables avec noms descriptifs
- [ ] Pas de `console.log()` en production
- [ ] Site responsive (mobile/tablette/desktop)
- [ ] Formulaires validés
- [ ] Images avec attributs `alt`
- [ ] HTML valide (validator.w3.org)
- [ ] Aucune erreur dans la console
- [ ] Testé sur Chrome, Firefox, Safari

## Mini projet pratique

### Débugger un code

Trouvez et corrigez les erreurs dans ce code (au moins 5 erreurs) :

```javascript
function afficherBienvenue(nom)
    console.log("Bonjour " + nom)

let liste = [1, 2, 3, 4, 5]
let resultat = ""

for (let i = 0; i <= liste.length; i++) {
    resultat = resultat + liste[i] + ", "
}

document.querySelector("#resultat").textContent = resultat

let bouton = document.querySelector("#btn")
bouton.addEventListner("click", function() {
    afficherBienvenue("Jean"
})
```

## Quiz

**Question 1 :** Quelle convention de nommage pour les variables en JavaScript ?
- a) `snake_case`
- b) `PascalCase`
- c) `camelCase`
- d) `kebab-case`

**Question 2 :** Quel outil permet de placer des points d'arrêt ?
- a) `console.log()`
- b) Les DevTools (onglet Sources)
- c) Un éditeur de texte
- d) Le terminal

**Question 3 :** Pourquoi séparer HTML, CSS et JavaScript ?
- a) Pour faire plus de fichiers
- b) Pour la maintenance et la lisibilité
- c) Pour ralentir le site
- d) C'est obligatoire

**Question 4 :** Quelle erreur pour une variable non définie ?
- a) `SyntaxError`
- b) `TypeError`
- c) `ReferenceError`
- d) `RuntimeError`

**Question 5 :** Que signifie DRY ?
- a) Don't Repeat Yourself
- b) Do Repeat YAML
- c) Develop Rapidly Yearly
- d) Dynamic Range Yield

<details>
<summary><strong>Réponses</strong></summary>

1. **c** - `camelCase`
2. **b** - Les DevTools (Sources)
3. **b** - Maintenance et lisibilité
4. **c** - `ReferenceError`
5. **a** - Don't Repeat Yourself
</details>

---

# Projet Final Global

## Création d'un site vitrine complet

### Objectif

Créer un site vitrine responsive pour une entreprise fictive en utilisant **HTML, CSS, Bootstrap et JavaScript**.

### Fonctionnalités

1. **Page d'accueil** avec navbar responsive, hero, services, témoignages, contact, footer
2. **Formulaire validé** en JavaScript avec affichage dynamique des erreurs
3. **Responsive** sur mobile, tablette et desktop

### Structure des fichiers

```
projet-final/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
    └── hero.jpg
```

### Code de départ

#### index.html

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DigiTech Solutions</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
            <a class="navbar-brand fw-bold" href="#">DigiTech</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="#accueil">Accueil</a></li>
                    <li class="nav-item"><a class="nav-link" href="#services">Services</a></li>
                    <li class="nav-item"><a class="nav-link" href="#temoignages">Témoignages</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <section id="accueil" class="hero-section d-flex align-items-center">
        <div class="container text-center text-white">
            <h1 class="display-3 fw-bold">DigiTech Solutions</h1>
            <p class="lead">Votre partenaire digital pour réussir votre transformation numérique</p>
            <a href="#services" class="btn btn-primary btn-lg mt-3">Nos Services</a>
        </div>
    </section>

    <section id="services" class="py-5">
        <div class="container">
            <h2 class="text-center mb-5">Nos Services</h2>
            <div class="row" id="services-container"></div>
        </div>
    </section>

    <section id="temoignages" class="py-5 bg-light">
        <div class="container">
            <h2 class="text-center mb-5">Ce que disent nos clients</h2>
            <div id="carouselTemoignages" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner text-center">
                    <div class="carousel-item active">
                        <blockquote class="blockquote">
                            <p>"DigiTech a transformé notre présence en ligne. Excellent travail !"</p>
                            <footer class="blockquote-footer">Marie Dupont, CEO de StartUp</footer>
                        </blockquote>
                    </div>
                    <div class="carousel-item">
                        <blockquote class="blockquote">
                            <p>"Professionnels et réactifs. Notre site est magnifique !"</p>
                            <footer class="blockquote-footer">Pierre Martin, Directeur Commercial</footer>
                        </blockquote>
                    </div>
                    <div class="carousel-item">
                        <blockquote class="blockquote">
                            <p>"Le meilleur investissement que nous ayons fait cette année."</p>
                            <footer class="blockquote-footer">Sophie Bernard, Fondatrice</footer>
                        </blockquote>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselTemoignages" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon"></span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselTemoignages" data-bs-slide="next">
                    <span class="carousel-control-next-icon"></span>
                </button>
            </div>
        </div>
    </section>

    <section id="contact" class="py-5">
        <div class="container">
            <h2 class="text-center mb-5">Contactez-nous</h2>
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <form id="contact-form">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="nom" class="form-label">Nom</label>
                                <input type="text" class="form-control" id="nom" required>
                                <div class="text-danger" id="erreur-nom"></div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" required>
                                <div class="text-danger" id="erreur-email"></div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="sujet" class="form-label">Sujet</label>
                            <select class="form-select" id="sujet">
                                <option value="">Choisir un sujet</option>
                                <option value="devis">Demande de devis</option>
                                <option value="info">Demande d'information</option>
                                <option value="support">Support technique</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="message" class="form-label">Message</label>
                            <textarea class="form-control" id="message" rows="5" required></textarea>
                            <div class="text-danger" id="erreur-message"></div>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Envoyer le message</button>
                    </form>
                    <div id="confirmation" class="alert alert-success mt-3 d-none">
                        Votre message a été envoyé avec succès ! Nous vous répondrons sous 24h.
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer class="bg-dark text-white text-center py-4">
        <div class="container">
            <p class="mb-0">&copy; 2025 DigiTech Solutions. Tous droits réservés.</p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
```

#### css/style.css

```css
:root {
    --primary-color: #3498db;
    --secondary-color: #2c3e50;
    --accent-color: #e74c3c;
}

.hero-section {
    height: 100vh;
    background: linear-gradient(135deg, var(--secondary-color), var(--primary-color));
    margin-top: -76px;
}

.service-card {
    transition: transform 0.3s, box-shadow 0.3s;
    border: none;
    border-radius: 10px;
    overflow: hidden;
}

.service-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.service-icon { font-size: 3rem; margin-bottom: 1rem; }
.carousel-item { padding: 3rem 0; }

#contact-form .form-control:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
}

html { scroll-behavior: smooth; }
.navbar { box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); }
footer { border-top: 3px solid var(--primary-color); }
```

#### js/main.js

```javascript
document.addEventListener("DOMContentLoaded", function() {
    genererServices();
    initialiserFormulaire();
});

const services = [
    { icone: "🌐", titre: "Création de Sites Web", description: "Sites vitrines et e-commerce modernes, responsives et optimisés." },
    { icone: "📱", titre: "Applications Mobiles", description: "Développement d'applications iOS et Android performantes." },
    { icone: "🎨", titre: "Design UI/UX", description: "Interfaces utilisateur élégantes et expériences optimisées." },
    { icone: "🔍", titre: "SEO & Marketing", description: "Optimisation pour les moteurs de recherche et stratégies marketing." },
    { icone: "☁️", titre: "Cloud & Hébergement", description: "Solutions cloud sécurisées et hébergement haute performance." },
    { icone: "🛡️", titre: "Cybersécurité", description: "Protection de vos données et audits de sécurité." }
];

function genererServices() {
    const container = document.querySelector("#services-container");
    services.forEach(function(service) {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-4";
        col.innerHTML = `
            <div class="card service-card h-100 p-4 text-center">
                <div class="card-body">
                    <div class="service-icon">${service.icone}</div>
                    <h5 class="card-title">${service.titre}</h5>
                    <p class="card-text">${service.description}</p>
                    <a href="#contact" class="btn btn-outline-primary">En savoir plus</a>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

function initialiserFormulaire() {
    const formulaire = document.querySelector("#contact-form");

    formulaire.addEventListener("submit", function(event) {
        event.preventDefault();
        let estValide = true;

        document.querySelector("#erreur-nom").textContent = "";
        document.querySelector("#erreur-email").textContent = "";
        document.querySelector("#erreur-message").textContent = "";
        document.querySelector("#confirmation").classList.add("d-none");

        const nom = document.querySelector("#nom").value.trim();
        if (nom.length < 2) {
            document.querySelector("#erreur-nom").textContent = "Le nom doit contenir au moins 2 caractères";
            estValide = false;
        }

        const email = document.querySelector("#email").value.trim();
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            document.querySelector("#erreur-email").textContent = "Veuillez entrer un email valide";
            estValide = false;
        }

        const message = document.querySelector("#message").value.trim();
        if (message.length < 10) {
            document.querySelector("#erreur-message").textContent = "Le message doit contenir au moins 10 caractères";
            estValide = false;
        }

        if (estValide) {
            document.querySelector("#confirmation").classList.remove("d-none");
            formulaire.reset();
            setTimeout(function() {
                document.querySelector("#confirmation").classList.add("d-none");
            }, 5000);
        }
    });
}
```

### Critères d'évaluation

| Critère | Points |
|---------|--------|
| Structure HTML sémantique | /20 |
| Design CSS et Bootstrap | /20 |
| Responsive design | /15 |
| JavaScript (DOM, événements) | /20 |
| Validation du formulaire | /15 |
| Bonnes pratiques et organisation | /10 |
| **TOTAL** | **/100** |

### Extensions bonus

- [ ] Mode sombre (dark mode)
- [ ] Page "À propos" supplémentaire
- [ ] Compteur de visiteurs (localStorage)
- [ ] Animations CSS
- [ ] Filtre de recherche sur les services
- [ ] Système de notation pour les témoignages

---

## Félicitations !

Vous avez terminé la formation **"Les fondamentaux du développement web"** !

Vous êtes maintenant capable de :
- Comprendre comment fonctionne le web
- Structurer des pages avec HTML
- Styliser avec CSS et Bootstrap
- Programmer avec JavaScript
- Manipuler le DOM dynamiquement
- Organiser et déboguer votre code

### Prochaines étapes

1. **JavaScript avancé** : ES6+, Promesses, Async/Await
2. **Framework frontend** : React, Vue.js ou Angular
3. **Backend** : Node.js, PHP, Python
4. **Bases de données** : MySQL, MongoDB
5. **Versionnement** : Git et GitHub
6. **Déploiement** : Netlify, Vercel, Heroku

> **Conseil :** La pratique est la clé ! Codez tous les jours et construisez des projets personnels.

---

*Formation créée en 2025 - Les fondamentaux du développement web*
