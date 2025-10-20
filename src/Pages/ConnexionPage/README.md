# Formulaire de Connexion - PlayWithPro

## Vue d'ensemble

Le formulaire de connexion de PlayWithPro est entièrement configuré avec Redux et prêt pour l'intégration avec l'API backend. Il inclut toutes les fonctionnalités modernes d'authentification.

## Fonctionnalités

### ✅ Authentification complète
- Connexion avec email/mot de passe
- Validation côté client et serveur
- Gestion des erreurs robuste
- Messages d'erreur personnalisés

### ✅ Persistance des données
- Option "Se souvenir de moi"
- Stockage sécurisé des tokens
- Gestion automatique des refresh tokens
- Initialisation automatique au démarrage

### ✅ Interface utilisateur
- Design gaming moderne avec glassmorphism
- Animations fluides et effets visuels
- Responsive design
- Accessibilité optimisée

### ✅ Fonctionnalités avancées
- Réinitialisation de mot de passe
- Validation en temps réel
- Gestion des états de chargement
- Protection contre les erreurs réseau

## Structure des fichiers

```
src/Pages/ConnexionPage/
├── Connexion.jsx          # Composant principal
├── Connexion.css          # Styles avec thème gaming
└── README.md             # Cette documentation

src/services/
└── authService.js        # Service API d'authentification

src/store/slices/
└── authSlice.js          # Slice Redux pour l'authentification

src/utils/
└── validation.js         # Utilitaires de validation

src/config/
└── authConfig.js         # Configuration d'authentification

src/hooks/
└── useAuthInitialization.js # Hook d'initialisation
```

## Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
# URL de l'API backend
REACT_APP_API_URL=http://localhost:3001/api

# URL de base de l'application
REACT_APP_BASE_URL=http://localhost:3000

# Configuration des services externes (optionnel)
REACT_APP_DISCORD_CLIENT_ID=your-discord-client-id
REACT_APP_STEAM_API_KEY=your-steam-api-key
```

### Configuration de l'API

Le service d'authentification est configuré pour communiquer avec les endpoints suivants :

- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription
- `POST /api/auth/logout` - Déconnexion
- `POST /api/auth/refresh` - Rafraîchissement de token
- `GET /api/auth/verify` - Vérification de token
- `POST /api/auth/forgot-password` - Demande de réinitialisation
- `POST /api/auth/reset-password` - Réinitialisation de mot de passe

## Utilisation

### Initialisation dans l'application

```jsx
import { useAuthInitialization } from './hooks/useAuthInitialization';

function App() {
  useAuthInitialization(); // Initialise l'authentification
  
  return (
    // Votre application
  );
}
```

### Utilisation du hook d'authentification

```jsx
import { useAuth } from './store/hooks';

function MyComponent() {
  const { isAuthenticated, user, loading, error, dispatch } = useAuth();
  
  const handleLogin = async (credentials) => {
    try {
      await dispatch(loginUser(credentials)).unwrap();
      // Connexion réussie
    } catch (error) {
      // Gestion des erreurs
    }
  };
  
  return (
    // Votre composant
  );
}
```

## Validation des formulaires

Le système de validation inclut :

- **Email** : Format valide requis
- **Mot de passe** : Minimum 8 caractères, majuscules, minuscules, chiffres, caractères spéciaux
- **Messages d'erreur** : Personnalisés et localisés en français
- **Validation en temps réel** : Erreurs affichées lors de la saisie

## Gestion des erreurs

### Types d'erreurs gérées

- Erreurs de réseau
- Erreurs de validation
- Erreurs d'authentification
- Erreurs de serveur
- Timeouts

### Messages d'erreur

Les messages sont formatés automatiquement selon le type d'erreur :

```javascript
import { formatApiError } from './utils/validation';

const errorMessage = formatApiError(error);
```

## Sécurité

### Tokens

- **Access Token** : Durée de vie courte (15 minutes par défaut)
- **Refresh Token** : Durée de vie longue (7 jours par défaut)
- **Stockage sécurisé** : localStorage avec clés préfixées
- **Rotation automatique** : Refresh tokens renouvelés automatiquement

### Protection

- Validation côté client et serveur
- Protection contre les attaques CSRF
- Limitation du nombre de tentatives de connexion
- Nettoyage automatique des données sensibles

## Personnalisation

### Thème

Le formulaire utilise un système de variables CSS pour faciliter la personnalisation :

```css
:root {
  --primary-cyan: #00FFFF;
  --primary-violet: #9B5FFF;
  --error-red: #EF4444;
  /* ... autres variables */
}
```

### Messages

Les messages peuvent être personnalisés dans `src/utils/validation.js` :

```javascript
export const validationMessages = {
  required: 'Ce champ est obligatoire',
  email: 'Veuillez entrer une adresse email valide',
  // ... autres messages
};
```

## Tests

### Tests unitaires recommandés

- Validation des formulaires
- Gestion des erreurs
- Persistance des données
- Intégration Redux

### Tests d'intégration

- Flux complet de connexion
- Gestion des tokens
- Redirection après connexion

## Déploiement

### Prérequis

1. API backend configurée et accessible
2. Variables d'environnement définies
3. Certificats SSL pour la production

### Checklist de déploiement

- [ ] URL de l'API mise à jour
- [ ] Variables d'environnement configurées
- [ ] Tests passent
- [ ] Performance optimisée
- [ ] Sécurité vérifiée

## Support

Pour toute question ou problème :

1. Vérifiez la configuration de l'API
2. Consultez les logs de la console
3. Vérifiez les variables d'environnement
4. Testez la connectivité réseau

## Changelog

### Version 1.0.0
- ✅ Configuration complète avec Redux
- ✅ Service API d'authentification
- ✅ Validation des formulaires
- ✅ Gestion des erreurs
- ✅ Interface gaming moderne
- ✅ Persistance des données
- ✅ Gestion des tokens
- ✅ Réinitialisation de mot de passe
