# 📚 Gestionnaire de Favoris (BookMarker)

Une application web moderne et intuitive pour gérer vos bookmarks et favoris, construite avec Vue.js 3, TypeScript et Tailwind CSS.

## ✨ Fonctionnalités

### 🔐 Authentification
- **Connexion/Inscription** : Système d'authentification complet
- **JWT Token** : Gestion sécurisée des sessions
- **Guards de routes** : Protection des pages sensibles
- **Redirection automatique** : Navigation intelligente selon l'état de connexion

### 🏠 Interface Publique
- **Page d'accueil** : Design moderne avec background Galaxy interactif
- **Navigation responsive** : Adaptation mobile/desktop
- **Effets visuels** : Animations et transitions fluides

### 📊 Dashboard Statistique
- **StatCards** : Métriques en temps réel (Total, Lu/Non-lu, En cours)
- **Graphiques Chart.js** : Visualisation de l'activité des 7 derniers jours
- **Répartition des tags** : Distribution des catégories de bookmarks
- **Tags populaires** : Top 5 des tags les plus utilisés
- **Progression de lecture** : Statistiques détaillées des bookmarks en cours

### 🔖 Gestion des Favoris
- **CRUD complet** : Création, lecture, mise à jour, suppression
- **Gestion des statuts** : Non lu → En cours de lecture → Lu
- **Système de tags** : Support des tags multiples (séparés par virgules)
- **Recherche et filtres** : Interface de recherche avancée
- **Menu contextuel** : Actions rapides sur chaque bookmark
- **Interface responsive** : Adaptation à tous les écrans

### 🎨 Interface Utilisateur
- **Design moderne** : Interface épurée et intuitive
- **Composants modulaires** : Architecture réutilisable
- **Skeleton loading** : États de chargement élégants
- **Empty states** : Messages contextuels attractifs
- **Notifications toast** : Feedback utilisateur en temps réel

## 🛠️ Technologies Utilisées

### Frontend
- **Vue.js 3** : Framework JavaScript progressif
- **Composition API** : API moderne de Vue 3
- **TypeScript** : Typage statique et sécurité du code
- **Tailwind CSS** : Framework CSS utilitaire
- **Vue Router 4** : Gestion des routes et navigation
- **Chart.js** : Graphiques interactifs et responsifs

### Backend & API
- **API REST** : Interface de programmation standardisée
- **JWT** : Authentification par token
- **Axios** : Client HTTP pour les requêtes API
- **Intercepteurs** : Gestion automatique des tokens et erreurs

### Outils de Développement
- **Vite** : Build tool ultra-rapide
- **ESLint** : Linting et qualité du code
- **Prettier** : Formatage automatique du code

## 🚀 Installation et Exécution

### Prérequis
- **Node.js** : Version 16 ou supérieure
- **pnpm** : Gestionnaire de paquets (recommandé) ou npm

### 1. Cloner le projet
```bash
git clone <url-du-repo>
cd test-technique-vue-js
```

### 2. Installer les dépendances
```bash
pnpm install
# ou
npm install
```

### 3. Lancer le serveur de développement
```bash
pnpm dev
# ou
npm run dev
```

### 4. Ouvrir l'application
L'application sera accessible à l'adresse : `http://localhost:5174/`

## 📁 Structure du Projet

```
test-technique-vue-js/
├── src/
│   ├── api/
│   │   └── api.ts                 # Configuration Axios et services API
│   ├── components/
│   │   ├── dashboard/             # Composants du dashboard
│   │   │   ├── StatCard.vue       # Carte de statistiques
│   │   │   ├── ActivityChart.vue  # Graphique d'activité
│   │   │   ├── TagDistributionPanel.vue # Panel de distribution des tags
│   │   │   ├── PopularTagsList.vue # Liste des tags populaires
│   │   │   ├── ReadingProgressCard.vue # Carte de progression de lecture
│   │   │   ├── BookmarkCard.vue   # Carte de bookmark individuelle
│   │   │   ├── BookmarksGrid.vue  # Grille des bookmarks
│   │   │   ├── BookmarksSection.vue # Section complète des bookmarks
│   │   │   ├── SearchAndFilters.vue # Recherche et filtres
│   │   │   ├── AddBookmarkModal.vue # Modal d'ajout de bookmark
│   │   │   ├── EditBookmarkModal.vue # Modal d'édition de bookmark
│   │   │   └── BookmarkContextMenu.vue # Menu contextuel des bookmarks
│   │   ├── ui/                    # Composants UI réutilisables
│   │   │   ├── Button.vue         # Bouton personnalisable
│   │   │   ├── Skeleton.vue       # Composant skeleton de base
│   │   │   ├── StatCardSkeleton.vue # Skeleton pour StatCard
│   │   │   ├── TagDistributionSkeleton.vue # Skeleton pour TagDistribution
│   │   │   ├── PopularTagsSkeleton.vue # Skeleton pour PopularTags
│   │   │   ├── BookmarksSkeleton.vue # Skeleton pour la page bookmarks
│   │   │   ├── EmptyState.vue     # État vide réutilisable
│   │   │   ├── BookmarksEmptyState.vue # État vide spécifique aux bookmarks
│   │   │   └── ConfirmationModal.vue # Modal de confirmation
│   │   ├── charts/                # Composants de graphiques
│   │   │   └── ActivityChart.vue  # Graphique Chart.js
│   │   ├── Galaxy/                # Background interactif
│   │   │   └── Galaxy.vue         # Composant WebGL interactif
│   │   └── HeroSection.vue        # Section d'accueil
│   ├── layouts/                   # Layouts de l'application
│   │   └── dashboard-layout.vue   # Layout du dashboard (sidebar + contenu)
│   ├── router/                    # Configuration des routes
│   │   └── index.ts               # Définition des routes et guards
│   ├── views/                     # Pages de l'application
│   │   ├── HomeView.vue           # Page d'accueil
│   │   ├── auth/                  # Pages d'authentification
│   │   │   ├── LoginView.vue      # Page de connexion
│   │   │   └── RegisterView.vue   # Page d'inscription
│   │   └── dashboard/             # Pages du dashboard
│   │       ├── DashboardView.vue  # Page principale du dashboard
│   │       └── BookMarksView.vue  # Page de gestion des bookmarks
│   ├── App.vue                    # Composant racine
│   ├── main.ts                    # Point d'entrée de l'application
│   └── style.css                  # Styles globaux
├── public/                        # Assets statiques
├── package.json                   # Dépendances et scripts
├── tsconfig.json                  # Configuration TypeScript
├── vite.config.ts                 # Configuration Vite
└── README.md                      # Ce fichier
```

## 🔧 Configuration

### Variables d'Environnement
L'API est configurée pour utiliser l'endpoint par défaut :
```
VITE_API_BASE_URL=https://frontend-test-api-eta.vercel.app
```

### Configuration TypeScript
- **Strict mode** activé
- **Composition API** de Vue 3
- **Types stricts** pour une meilleure sécurité du code

### Configuration Vite
- **HMR** (Hot Module Replacement) activé
- **Build optimisé** pour la production
- **Support des composants Vue** et TypeScript

## 📱 Fonctionnalités Détaillées

### Dashboard Statistique
- **Métriques en temps réel** : Total des bookmarks, répartition lu/non-lu
- **Graphique d'activité** : Activité des 7 derniers jours basée sur les vraies données
- **Distribution des tags** : Visualisation de la répartition des catégories
- **Tags populaires** : Classement des tags les plus utilisés

### Gestion des Bookmarks
- **Ajout de bookmarks** : Formulaire complet avec validation
- **Édition en place** : Modification des détails et tags
- **Gestion des statuts** : Changement de statut via menu contextuel
- **Suppression sécurisée** : Confirmation avant suppression
- **Système de tags** : Support des tags multiples et personnalisés

### Interface Utilisateur
- **Design responsive** : Adaptation mobile, tablette et desktop
- **Animations fluides** : Transitions et micro-interactions
- **États de chargement** : Skeletons et spinners élégants
- **Gestion d'erreur** : Messages d'erreur clairs et informatifs

## 🚀 Déploiement

### Build de Production
```bash
pnpm build
# ou
npm run build
```

### Prévisualisation de Production
```bash
pnpm preview
# ou
npm run preview
```

---

**BookMarker** - Gérez vos favoris en toute simplicité ! 🚀
