// Hook pour initialiser l'authentification au démarrage de l'application
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAuth, verifyAuth } from '../store/slices/authSlice';

export const useAuthInitialization = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialiser l'état d'authentification depuis le localStorage
    dispatch(initializeAuth());
    
    // Vérifier la validité du token avec le serveur
    dispatch(verifyAuth());
  }, [dispatch]);
};

export default useAuthInitialization;
