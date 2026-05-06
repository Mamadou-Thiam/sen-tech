# SEN TECH PLATFORM - Plateforme de Formation IT

Plateforme digitale dédiée à la vente et à la gestion de formations en technologies de l'information (IT).

## Fonctionnalités

### Pour les étudiants
- Inscription et connexion sécurisées
- Parcourir les formations par catégories (Développement Web, Cloud, Cybersécurité, Data, etc.)
- Consultation du contenu des formations (vidéos, documents, modules)
- Suivi des accès avec durée de validité
- Espace personnel avec historique des accès

### Pour les administrateurs
- Tableau de bord avec statistiques
- Gestion complète des formations (CRUD)
- Organisation des contenus par catégories
- Création et gestion des comptes étudiants
- Attribution des accès aux formations
- Définition et ajustement des durées d'accès
- Prolongation des accès expirés

## Technologies utilisées

### Backend
- Node.js avec Express
- MongoDB avec Mongoose
- JWT pour l'authentification
- bcryptjs pour le hachage des mots de passe

### Frontend
- React.js avec Vite
- React Router pour la navigation
- Axios pour les appels API
- CSS vanilla pour le style

## Installation

### Prérequis
- Node.js installé
- MongoDB installé et démarré

### Backend
```bash
cd backend
npm install
npm run dev
```
Le serveur démarre sur http://localhost:5000

### Frontend
```bash
cd frontend
npm install
npm run dev
```
L'application démarre sur http://localhost:3000

### Configuration
Créer un fichier `.env` dans le dossier backend :
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/sen-tech-platform
JWT_SECRET=votre_secret_key
NODE_ENV=development
```

## Modèle de fonctionnement

1. L'étudiant s'inscrit et paie la formation en dehors de la plateforme
2. L'administrateur valide le paiement et crée l'accès
3. L'étudiant consulte le contenu selon la durée définie
4. L'accès expire automatiquement à la fin de la période

## Évolutions futures
- Intégration de paiements en ligne (Mobile Money, Cartes)
- Gestion autonome des inscriptions
- Suivi de progression
- Évaluations et quiz
- Certifications
