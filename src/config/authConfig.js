// Configuration de l'authentification pour PlayWithPro

export const authConfig = {
  // URL de l'API
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  
  // Configuration des tokens
  tokenConfig: {
    accessTokenExpiry: process.env.REACT_APP_ACCESS_TOKEN_EXPIRY || '15m',
    refreshTokenExpiry: process.env.REACT_APP_REFRESH_TOKEN_EXPIRY || '7d',
  },
  
  // Configuration du localStorage
  storageKeys: {
    authToken: 'playwithpro_auth_token',
    refreshToken: 'playwithpro_refresh_token',
    user: 'playwithpro_user',
    rememberMe: 'playwithpro_remember_me',
  },
  
  // Configuration des routes
  routes: {
    login: '/connexion',
    register: '/inscription',
    dashboard: '/dashboard',
    profile: '/profil',
    forgotPassword: '/mot-de-passe-oublie',
    resetPassword: '/reinitialiser-mot-de-passe',
  },
  
  // Configuration des messages d'erreur
  errorMessages: {
    networkError: 'Erreur de connexion. Vérifiez votre connexion internet.',
    serverError: 'Erreur du serveur. Veuillez réessayer plus tard.',
    unauthorized: 'Email ou mot de passe incorrect.',
    forbidden: 'Vous n\'avez pas les permissions nécessaires.',
    notFound: 'Ressource non trouvée.',
    conflict: 'Cette ressource existe déjà.',
    timeout: 'La requête a pris trop de temps. Veuillez réessayer.',
    default: 'Une erreur inattendue est survenue.',
  },
  
  // Configuration de la validation
  validation: {
    password: {
      minLength: 8,
      maxLength: 128,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
    },
    email: {
      maxLength: 254,
    },
    username: {
      minLength: 3,
      maxLength: 30,
      pattern: /^[a-zA-Z0-9_]+$/,
    },
    name: {
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-ZÀ-ÿ\s\-']+$/,
    },
  },
  
  // Configuration des services externes
  externalServices: {
    discord: {
      clientId: process.env.REACT_APP_DISCORD_CLIENT_ID,
      redirectUri: `${window.location.origin}/auth/discord/callback`,
    },
    steam: {
      apiKey: process.env.REACT_APP_STEAM_API_KEY,
      redirectUri: `${window.location.origin}/auth/steam/callback`,
    },
  },
  
  // Configuration de sécurité
  security: {
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60 * 1000, // 15 minutes
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 heures
    requireEmailVerification: true,
    requireStrongPassword: true,
  },
  
  // Configuration des notifications
  notifications: {
    showSuccessMessages: true,
    showErrorMessages: true,
    autoHideDelay: 5000,
    position: 'top-right',
  },
};

export default authConfig;
