// Middleware pour gérer automatiquement l'authentification
import { refreshAuthToken, clearCredentials } from '../slices/authSlice';
import authService from '../../services/authService';

export const authMiddleware = (store) => (next) => (action) => {
  // Intercepter les actions qui peuvent nécessiter un token valide
  const actionsRequiringAuth = [
    'user/updateProfile',
    'user/changePassword',
    'user/deleteAccount',
    // Ajouter d'autres actions qui nécessitent une authentification
  ];

  // Vérifier si l'action nécessite une authentification
  const requiresAuth = actionsRequiringAuth.some(actionType => 
    action.type.startsWith(actionType)
  );

  if (requiresAuth) {
    const state = store.getState();
    const { token, refreshToken } = state.auth;

    // Si pas de token, rediriger vers la connexion
    if (!token) {
      store.dispatch(clearCredentials());
      return next(action);
    }

    // Vérifier si le token est expiré (simulation - en réalité, il faudrait décoder le JWT)
    const isTokenExpired = () => {
      // Pour l'instant, on simule une vérification
      // En production, il faudrait décoder le JWT et vérifier l'expiration
      return false;
    };

    if (isTokenExpired() && refreshToken) {
      // Tenter de rafraîchir le token
      store.dispatch(refreshAuthToken())
        .unwrap()
        .then(() => {
          // Token rafraîchi avec succès, continuer avec l'action
          return next(action);
        })
        .catch(() => {
          // Échec du rafraîchissement, déconnecter l'utilisateur
          store.dispatch(clearCredentials());
          return next(action);
        });
      return;
    }
  }

  return next(action);
};

export default authMiddleware;
