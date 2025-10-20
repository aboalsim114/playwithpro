// Hook personnalisé pour simplifier l'utilisation de Formik avec Redux
import { useCallback } from 'react';
import { useFormikErrorHandler } from '../components/FormikField';

export const useFormikForm = () => {
  const { handleFieldError, handleGlobalError } = useFormikErrorHandler();

  // Hook pour la gestion des soumissions de formulaire avec Redux
  const createSubmitHandler = useCallback((dispatch, action, onSuccess) => {
    return async (values, { setSubmitting, setFieldError, setStatus }) => {
      try {
        const result = await dispatch(action(values)).unwrap();
        
        if (onSuccess) {
          onSuccess(result);
        }
        
        setStatus({ success: true });
      } catch (error) {
        console.error('Erreur de soumission:', error);
        
        // Gérer les erreurs spécifiques aux champs
        handleFieldError(setFieldError, error);
        
        // Gérer les erreurs globales
        const globalError = handleGlobalError(error);
        setStatus({ error: globalError });
      } finally {
        setSubmitting(false);
      }
    };
  }, [handleFieldError, handleGlobalError]);

  // Hook pour la validation en temps réel
  const createValidationHandler = useCallback((schema) => {
    return async (values) => {
      try {
        await schema.validate(values, { abortEarly: false });
        return {};
      } catch (errors) {
        const validationErrors = {};
        
        if (errors.inner) {
          errors.inner.forEach((error) => {
            if (error.path) {
              validationErrors[error.path] = error.message;
            }
          });
        }
        
        return validationErrors;
      }
    };
  }, []);

  // Hook pour la gestion des erreurs de réseau
  const handleNetworkError = useCallback((error, setStatus) => {
    if (error.code === 'NETWORK_ERROR' || !navigator.onLine) {
      setStatus({ 
        error: 'Erreur de connexion. Vérifiez votre connexion internet.' 
      });
    } else if (error.status >= 500) {
      setStatus({ 
        error: 'Erreur du serveur. Veuillez réessayer plus tard.' 
      });
    } else if (error.status === 429) {
      setStatus({ 
        error: 'Trop de tentatives. Veuillez patienter avant de réessayer.' 
      });
    }
  }, []);

  // Hook pour la gestion des erreurs de validation côté serveur
  const handleServerValidationErrors = useCallback((error, setFieldError) => {
    if (error.validationErrors) {
      Object.keys(error.validationErrors).forEach(field => {
        setFieldError(field, error.validationErrors[field]);
      });
    }
  }, []);

  // Hook pour la gestion des erreurs d'authentification
  const handleAuthErrors = useCallback((error, setFieldError) => {
    if (error.status === 401) {
      setFieldError('password', 'Email ou mot de passe incorrect');
    } else if (error.status === 403) {
      setFieldError('email', 'Compte non autorisé');
    } else if (error.status === 409) {
      if (error.message?.includes('email')) {
        setFieldError('email', 'Cette adresse email est déjà utilisée');
      } else if (error.message?.includes('username')) {
        setFieldError('username', 'Ce nom d\'utilisateur est déjà pris');
      }
    }
  }, []);

  // Hook pour la gestion des erreurs de rate limiting
  const handleRateLimitError = useCallback((error, setStatus) => {
    if (error.status === 429) {
      const retryAfter = error.headers?.['retry-after'] || 60;
      setStatus({ 
        error: `Trop de tentatives. Réessayez dans ${retryAfter} secondes.` 
      });
    }
  }, []);

  // Hook pour la gestion des erreurs de validation de mot de passe
  const handlePasswordValidationErrors = useCallback((error, setFieldError) => {
    if (error.message?.includes('password')) {
      if (error.message.includes('weak')) {
        setFieldError('password', 'Le mot de passe est trop faible');
      } else if (error.message.includes('common')) {
        setFieldError('password', 'Ce mot de passe est trop commun');
      } else if (error.message.includes('length')) {
        setFieldError('password', 'Le mot de passe doit contenir au moins 8 caractères');
      }
    }
  }, []);

  // Hook pour la gestion des erreurs de format
  const handleFormatErrors = useCallback((error, setFieldError) => {
    if (error.message?.includes('email')) {
      setFieldError('email', 'Format d\'email invalide');
    } else if (error.message?.includes('phone')) {
      setFieldError('phone', 'Format de téléphone invalide');
    } else if (error.message?.includes('age')) {
      setFieldError('age', 'Âge invalide');
    }
  }, []);

  // Hook pour la gestion des erreurs de conditions d'utilisation
  const handleTermsErrors = useCallback((error, setFieldError) => {
    if (error.message?.includes('terms')) {
      setFieldError('terms', 'Vous devez accepter les conditions d\'utilisation');
    }
  }, []);

  // Hook pour la gestion des erreurs de captcha
  const handleCaptchaErrors = useCallback((error, setStatus) => {
    if (error.message?.includes('captcha')) {
      setStatus({ 
        error: 'Vérification captcha échouée. Veuillez réessayer.' 
      });
    }
  }, []);

  // Hook pour la gestion des erreurs de maintenance
  const handleMaintenanceError = useCallback((error, setStatus) => {
    if (error.status === 503) {
      setStatus({ 
        error: 'Service en maintenance. Veuillez réessayer plus tard.' 
      });
    }
  }, []);

  // Hook pour la gestion des erreurs de version
  const handleVersionError = useCallback((error, setStatus) => {
    if (error.status === 426) {
      setStatus({ 
        error: 'Version de l\'application obsolète. Veuillez la mettre à jour.' 
      });
    }
  }, []);

  return {
    createSubmitHandler,
    createValidationHandler,
    handleNetworkError,
    handleServerValidationErrors,
    handleAuthErrors,
    handleRateLimitError,
    handlePasswordValidationErrors,
    handleFormatErrors,
    handleTermsErrors,
    handleCaptchaErrors,
    handleMaintenanceError,
    handleVersionError,
    handleFieldError,
    handleGlobalError
  };
};

export default useFormikForm;
