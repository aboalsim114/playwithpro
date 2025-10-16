# Guide Redux Toolkit - PlayWithPro

## 🚀 Installation et Configuration

Redux Toolkit a été installé et configuré dans votre projet avec les packages suivants :
- `@reduxjs/toolkit` - Redux Toolkit
- `react-redux` - Liaison React-Redux

## 📁 Structure des fichiers

```
src/
├── store/
│   ├── index.js              # Configuration du store principal
│   ├── hooks.js              # Hooks personnalisés
│   └── slices/
│       ├── authSlice.js      # Gestion de l'authentification
│       └── userSlice.js      # Gestion des utilisateurs et préférences
```

## 🔧 Utilisation dans les composants

### 1. Hooks disponibles

```javascript
import { 
  useAuth, 
  useUser, 
  useIsAuthenticated, 
  useCurrentUser,
  useAuthToken 
} from '../store/hooks'
```

### 2. Exemple d'utilisation - Authentification

```javascript
import React, { useState } from 'react'
import { useAuth } from '../store/hooks'
import { loginUser, logoutUser } from '../store/slices/authSlice'

function LoginComponent() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const { isAuthenticated, loading, error, dispatch } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await dispatch(loginUser(formData)).unwrap()
      // Connexion réussie
    } catch (error) {
      // Gestion des erreurs
    }
  }

  return (
    <form onSubmit={handleLogin}>
      {/* Votre formulaire */}
      {loading && <p>Connexion...</p>}
      {error && <p>Erreur: {error}</p>}
    </form>
  )
}
```

### 3. Exemple d'utilisation - Préférences utilisateur

```javascript
import React from 'react'
import { useUser } from '../store/hooks'
import { setTheme, toggleNotifications } from '../store/slices/userSlice'

function PreferencesComponent() {
  const { preferences, dispatch } = useUser()

  return (
    <div>
      <button onClick={() => dispatch(setTheme('dark'))}>
        Mode sombre
      </button>
      <button onClick={() => dispatch(toggleNotifications())}>
        {preferences.notifications ? 'Désactiver' : 'Activer'} notifications
      </button>
    </div>
  )
}
```

## 🎯 Actions disponibles

### AuthSlice
- `loginUser(credentials)` - Connexion utilisateur
- `registerUser(userData)` - Inscription utilisateur
- `logoutUser()` - Déconnexion
- `clearError()` - Nettoyer les erreurs
- `setCredentials(user, token)` - Définir les credentials
- `clearCredentials()` - Effacer les credentials

### UserSlice
- `fetchUserProfile(userId)` - Récupérer le profil
- `updateUserProfile(userId, data)` - Mettre à jour le profil
- `updateUserPreferences(userId, preferences)` - Mettre à jour les préférences
- `setTheme(theme)` - Changer le thème
- `setLanguage(language)` - Changer la langue
- `toggleNotifications()` - Basculer les notifications
- `clearUserError()` - Nettoyer les erreurs
- `resetUserState()` - Réinitialiser l'état

## 🔄 État du store

### Auth State
```javascript
{
  isAuthenticated: boolean,
  user: object | null,
  token: string | null,
  loading: boolean,
  error: string | null
}
```

### User State
```javascript
{
  profile: object | null,
  preferences: {
    theme: 'light' | 'dark',
    language: 'fr' | 'en' | 'es',
    notifications: boolean
  },
  loading: boolean,
  error: string | null
}
```

## 🛠️ Ajout de nouveaux slices

Pour ajouter un nouveau slice :

1. Créez le fichier dans `src/store/slices/`
2. Utilisez `createSlice` et `createAsyncThunk`
3. Ajoutez le reducer dans `src/store/index.js`

Exemple :
```javascript
// src/store/slices/exampleSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  loading: false,
  error: null
}

export const fetchData = createAsyncThunk(
  'example/fetchData',
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/data')
      return response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { clearError } = exampleSlice.actions
export default exampleSlice.reducer
```

## 🎨 Intégration avec les composants existants

Les composants suivants ont été mis à jour pour utiliser Redux :
- `Navbar.jsx` - Affichage de l'état de connexion
- `Connexion.jsx` - Gestion de la connexion avec Redux
- `UserPreferences.jsx` - Nouveau composant pour les préférences

## 🔍 Debugging

Pour déboguer votre store Redux, vous pouvez utiliser Redux DevTools :
1. Installez l'extension Redux DevTools dans votre navigateur
2. Le store est déjà configuré pour fonctionner avec les DevTools

## 📝 Notes importantes

- Tous les appels API sont simulés dans les slices
- Remplacez les URLs d'API par vos vraies endpoints
- Les actions asynchrones utilisent `createAsyncThunk` pour une meilleure gestion des états
- Les hooks personnalisés simplifient l'utilisation de Redux dans vos composants
- Le store est configuré avec le middleware par défaut de Redux Toolkit
