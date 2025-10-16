import { useDispatch, useSelector } from 'react-redux';

// Hook personnalisé pour utiliser le dispatch avec le bon type
export const useAppDispatch = () => useDispatch();

// Hook personnalisé pour utiliser le selector avec le bon type
export const useAppSelector = useSelector;

// Hooks spécifiques pour l'authentification
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  
  return {
    ...auth,
    dispatch,
  };
};

// Hooks spécifiques pour l'utilisateur
export const useUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  
  return {
    ...user,
    dispatch,
  };
};

// Hook pour vérifier si l'utilisateur est connecté
export const useIsAuthenticated = () => {
  return useAppSelector((state) => state.auth.isAuthenticated);
};

// Hook pour obtenir les informations de l'utilisateur connecté
export const useCurrentUser = () => {
  return useAppSelector((state) => state.auth.user);
};

// Hook pour obtenir le token d'authentification
export const useAuthToken = () => {
  return useAppSelector((state) => state.auth.token);
};
