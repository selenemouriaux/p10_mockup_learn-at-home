# Learn@Home - Maquettes React

Application de maquettes interactives pour le projet Learn@Home, développée avec React et Tailwind CSS.

## 📋 Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn
- Un projet Vite déjà initialisé

## 🚀 Installation

### 1. Copier les fichiers dans votre projet Vite

Copiez tous les fichiers téléchargés dans votre projet Vite existant :

```
votre-projet/
├── src/
│   ├── components/
│   │   ├── LoginPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Chat.jsx
│   │   ├── Calendar.jsx
│   │   ├── Tasks.jsx
│   │   └── Navigation.jsx
│   ├── App.jsx
│   └── index.css
```

### 2. Installer les dépendances

```bash
npm install react-router-dom
```

### 3. Configurer Tailwind CSS

Si Tailwind n'est pas déjà configuré dans votre projet :

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Ensuite, mettez à jour votre `tailwind.config.js` :

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 4. Mettre à jour main.jsx

Assurez-vous que votre `src/main.jsx` importe bien le CSS :

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

## 🎨 Lancer l'application

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 📱 Fonctionnalités

### Pages disponibles

1. **Page de connexion** (`/login`)
   - Formulaire de connexion
   - Sélection du type d'utilisateur (Élève/Bénévole)
   - Lien mot de passe oublié
   - Lien création de compte

2. **Tableau de bord** (`/dashboard`)
   - Vue d'ensemble des activités
   - Widget messages non lus
   - Widget tâches en cours
   - Widget événements prochains
   - Actions rapides

3. **Messagerie** (`/chat`)
   - Liste des conversations
   - Interface de chat en temps réel
   - Photos de profil
   - Indicateurs de lecture
   - Horodatage des messages

4. **Calendrier** (`/calendar`)
   - Vue mensuelle
   - Liste des événements à venir
   - Ajout d'événements
   - Navigation entre les mois
   - Accès aux calendriers des élèves (pour bénévoles)

5. **Gestion des tâches** (`/tasks`)
   - Liste des tâches
   - Filtres par statut
   - Création de tâches
   - Marquage comme terminée
   - Gestion des priorités
   - Assignation (pour bénévoles)

### Navigation

- **Desktop** : Barre latérale gauche
- **Mobile** : Barre de navigation inférieure

## 🎭 Tester les différents profils

Par défaut, l'application démarre en mode "Élève". Pour tester le profil "Bénévole" :

1. Sur la page de connexion, sélectionnez "Bénévole"
2. Entrez n'importe quel email/mot de passe (c'est une maquette)
3. Cliquez sur "Se connecter"

Les différences entre les profils :
- **Élève** : Peut uniquement créer des tâches pour lui-même
- **Bénévole** : Peut créer des tâches pour ses élèves et accéder à leurs calendriers

## 🎨 Personnalisation

### Couleurs

Les couleurs principales sont définies dans les classes Tailwind :
- **Primary** : Indigo (bg-indigo-600, text-indigo-600)
- **Success** : Emerald (bg-emerald-600)
- **Warning** : Amber (bg-amber-600)
- **Danger** : Red (bg-red-600)

Pour changer les couleurs, modifiez les classes Tailwind dans les composants.

### Design

Le design utilise :
- Police : Système par défaut (Arial, Helvetica)
- Espacement : Système standard Tailwind
- Bordures : Arrondies (rounded-lg, rounded-xl)
- Ombres : Douces (shadow-sm, shadow-md)

## 📦 Structure des composants

```
App.jsx
├── LoginPage.jsx (Page de connexion)
└── Authenticated Layout
    ├── Navigation.jsx (Sidebar + Mobile nav)
    ├── Dashboard.jsx (Tableau de bord)
    ├── Chat.jsx (Messagerie)
    ├── Calendar.jsx (Calendrier)
    └── Tasks.jsx (Gestion des tâches)
```

## 🔧 Développement futur

Pour connecter ces maquettes à un vrai backend :

1. Remplacer les données statiques par des appels API
2. Implémenter l'authentification réelle
3. Ajouter la gestion d'état (Redux, Zustand, etc.)
4. Connecter les WebSockets pour le chat en temps réel
5. Implémenter la persistance des données

## 📝 Notes

- Les données affichées sont des données de démonstration
- Aucune donnée n'est sauvegardée (rechargement = reset)
- L'authentification est simulée (pas de vérification)
- Toutes les interactions sont des simulations

## 🎯 Utilisation pour présentation

Pour présenter ces maquettes :

1. Lancez l'application (`npm run dev`)
2. Ouvrez votre navigateur en mode plein écran
3. Naviguez entre les pages pour montrer les fonctionnalités
4. Basculez entre desktop et mobile avec les DevTools (F12)
5. Connectez-vous en tant qu'Élève puis Bénévole pour montrer les différences

## 📸 Screenshots

Pour capturer des screenshots pour votre présentation :
- Desktop : Utilisez la résolution 1920x1080
- Mobile : Utilisez iPhone 12 Pro (390x844) dans les DevTools

## 🆘 Support

Si vous rencontrez des problèmes :

1. Vérifiez que toutes les dépendances sont installées
2. Assurez-vous que Tailwind est bien configuré
3. Vérifiez que tous les fichiers sont dans les bons dossiers
4. Supprimez `node_modules` et réinstallez : `rm -rf node_modules && npm install`

---

Bon courage pour votre présentation ! 🚀
