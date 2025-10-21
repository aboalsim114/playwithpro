# Formulaire d'Inscription - PlayWithPro

## Vue d'ensemble

Le formulaire d'inscription de PlayWithPro est entièrement configuré avec Redux et prêt pour l'intégration avec l'API backend. Il inclut toutes les fonctionnalités modernes d'authentification et une interface gaming immersive.

## Fonctionnalités

### ✅ Inscription complète
- Inscription avec nom, nom d'utilisateur, email, mot de passe
- Validation côté client et serveur
- Gestion des erreurs robuste
- Messages d'erreur personnalisés

### ✅ Champs avancés
- Nom complet avec validation
- Nom d'utilisateur unique
- Email avec validation format
- Mot de passe sécurisé avec indicateur de force
- Confirmation de mot de passe
- Âge avec validation (minimum 13 ans)
- Téléphone optionnel
- Acceptation des conditions d'utilisation

### ✅ Interface utilisateur
- Design gaming moderne avec glassmorphism
- Animations fluides et effets visuels
- Éléments flottants gaming (contrôleur, fusée, diamant, épée)
- Réseau neuronal animé en arrière-plan
- Vagues d'énergie dynamiques
- Responsive design complet

### ✅ Fonctionnalités avancées
- **Validation en temps réel avancée** avec debouncing (500ms)
- **Validation au blur** (quand l'utilisateur quitte le champ)
- **Validation différée** (évite la validation à chaque frappe - 1000ms)
- **Indicateurs visuels de force du mot de passe** en temps réel
- **Suggestions automatiques** pour les noms d'utilisateur disponibles
- Affichage/masquage des mots de passe
- Gestion des états de chargement
- Protection contre les erreurs réseau
- Intégration avec les services sociaux (Discord, Steam)

## Structure des fichiers

```
src/Pages/InscriptionPage/
├── Inscription.jsx          # Composant principal
├── Inscription.css          # Styles avec thème gaming
└── README.md               # Cette documentation

src/Composants/
├── PasswordStrengthIndicator/
│   ├── PasswordStrengthIndicator.jsx
│   └── PasswordStrengthIndicator.css
└── UsernameSuggestions/
    ├── UsernameSuggestions.jsx
    └── UsernameSuggestions.css

src/utils/
├── validation.js           # Utilitaires de validation (partagé)
└── validationUtils.js      # Nouveaux utilitaires de validation avancée

src/services/
└── authService.js          # Service API d'authentification (partagé)

src/store/slices/
└── authSlice.js            # Slice Redux pour l'authentification (partagé)

src/config/
└── authConfig.js           # Configuration d'authentification (partagé)
```

## Champs du formulaire

### Champs obligatoires
- **Nom complet** : 2-50 caractères, lettres, espaces, tirets et apostrophes
- **Nom d'utilisateur** : 3-30 caractères, lettres, chiffres et underscores
- **Email** : Format email valide
- **Mot de passe** : Minimum 8 caractères avec majuscules, minuscules, chiffres et caractères spéciaux
- **Confirmation mot de passe** : Doit correspondre au mot de passe
- **Âge** : Entre 13 et 120 ans
- **Conditions d'utilisation** : Obligatoire

### Champs optionnels
- **Téléphone** : Format international valide

## Validation

### Types de validation
- **Validation en temps réel** : Avec debouncing de 500ms pour éviter les appels trop fréquents
- **Validation au blur** : Validation immédiate quand l'utilisateur quitte le champ
- **Validation différée** : Validation avec délai de 1000ms pour les champs moins critiques
- **Validation de force du mot de passe** : Calcul en temps réel avec indicateurs visuels

### Règles de validation
- **Nom** : Lettres, espaces, tirets et apostrophes uniquement
- **Nom d'utilisateur** : Lettres, chiffres et underscores uniquement
- **Email** : Format RFC 5322
- **Mot de passe** : 
  - Minimum 8 caractères
  - Maximum 128 caractères
  - Au moins une majuscule
  - Au moins une minuscule
  - Au moins un chiffre
  - Au moins un caractère spécial
  - Pas de mots de passe communs
  - **Indicateur de force** : Faible, Moyen, Fort, Très fort
- **Âge** : Entre 13 et 120 ans
- **Téléphone** : Format international (optionnel)

### Messages d'erreur
- Messages personnalisés en français
- Validation en temps réel avec debouncing
- Indicateurs visuels d'erreur avec animations
- Formatage automatique des erreurs API
- **Suggestions de noms d'utilisateur** : Génération automatique de variantes disponibles

## Interface utilisateur

### Design gaming
- **Thème** : Cyberpunk/Gaming avec couleurs néon
- **Glassmorphism** : Effets de verre avec transparence
- **Animations** : Transitions fluides et effets visuels
- **Éléments flottants** : Icônes gaming animées
- **Réseau neuronal** : Arrière-plan animé
- **Vagues d'énergie** : Effets de particules

### Responsive design
- **Desktop** : Layout en grille avec champs côte à côte
- **Tablet** : Adaptation des colonnes
- **Mobile** : Layout vertical optimisé
- **Accessibilité** : Support des préférences utilisateur

## Intégration Redux

### Actions utilisées
- `registerUser` : Inscription d'un nouvel utilisateur
- `clearError` : Nettoyage des erreurs

### État géré
- `loading` : État de chargement
- `error` : Messages d'erreur
- `isAuthenticated` : État d'authentification

### Redirection automatique
- Redirection vers la page d'accueil après inscription réussie
- Redirection si déjà connecté

## Configuration API

### Endpoint d'inscription
```javascript
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "age": 25,
  "phone": "+33123456789" // optionnel
}
```

### Réponse attendue
```javascript
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "age": 25,
    "phone": "+33123456789"
  },
  "token": "jwt_access_token",
  "refreshToken": "jwt_refresh_token"
}
```

## Utilisation

### Import du composant
```jsx
import Inscription from './Pages/InscriptionPage/Inscription';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/inscription" element={<Inscription />} />
      </Routes>
    </Router>
  );
}
```

### Hook d'authentification
```jsx
import { useAuth } from './store/hooks';

function MyComponent() {
  const { loading, error, dispatch } = useAuth();
  
  // Le composant Inscription gère automatiquement l'état
  return <Inscription />;
}
```

## Personnalisation

### Variables CSS
```css
:root {
  --primary-cyan: #00FFFF;
  --primary-violet: #9B5FFF;
  --accent-orange: #FF6B35;
  --accent-green: #00FF88;
  /* ... autres variables */
}
```

### Messages de validation
```javascript
// Dans src/utils/validation.js
export const validationMessages = {
  name: {
    minLength: 'Le nom doit contenir au moins 2 caractères',
    maxLength: 'Le nom ne peut pas dépasser 50 caractères',
    invalid: 'Le nom ne peut contenir que des lettres, espaces et tirets',
  },
  // ... autres messages
};
```

## Tests

### Tests unitaires recommandés
- Validation des formulaires
- Gestion des erreurs
- Intégration Redux
- Responsive design

### Tests d'intégration
- Flux complet d'inscription
- Validation côté serveur
- Redirection après inscription

## Déploiement

### Prérequis
1. API backend configurée
2. Variables d'environnement définies
3. Service d'authentification fonctionnel

### Checklist
- [ ] URL de l'API configurée
- [ ] Validation côté serveur implémentée
- [ ] Tests passent
- [ ] Performance optimisée
- [ ] Accessibilité vérifiée

## Support

### Dépannage
1. Vérifier la configuration de l'API
2. Consulter les logs de la console
3. Vérifier les variables d'environnement
4. Tester la connectivité réseau

### Messages d'erreur courants
- **Email déjà utilisé** : L'email est déjà associé à un compte
- **Nom d'utilisateur pris** : Le nom d'utilisateur est déjà utilisé
- **Mot de passe faible** : Le mot de passe ne respecte pas les critères
- **Âge insuffisant** : L'utilisateur doit avoir au moins 13 ans

## Changelog

### Version 1.1.0 - Validation Avancée
- ✅ **Validation en temps réel avancée** avec debouncing (500ms)
- ✅ **Validation au blur** (quand l'utilisateur quitte le champ)
- ✅ **Validation différée** (évite la validation à chaque frappe - 1000ms)
- ✅ **Indicateur de force du mot de passe** en temps réel avec feedback visuel
- ✅ **Suggestions automatiques** pour les noms d'utilisateur disponibles
- ✅ Composants réutilisables (PasswordStrengthIndicator, UsernameSuggestions)
- ✅ Utilitaires de validation avancés (validationUtils.js)
- ✅ Animations et transitions améliorées
- ✅ Gestion des états de validation (validating, valid, invalid)
- ✅ Interface utilisateur optimisée pour l'expérience utilisateur

### Version 1.0.0
- ✅ Configuration complète avec Redux
- ✅ Service API d'authentification
- ✅ Validation des formulaires avancée
- ✅ Interface gaming moderne
- ✅ Champs complets (nom, username, email, password, age, phone)
- ✅ Validation en temps réel
- ✅ Gestion des erreurs robuste
- ✅ Animations et effets visuels
- ✅ Responsive design
- ✅ Accessibilité
- ✅ Intégration services sociaux
- ✅ Documentation complète
