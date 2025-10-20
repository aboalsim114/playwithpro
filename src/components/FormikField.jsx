// Composant utilitaire pour les champs Formik avec gestion d'erreurs améliorée
import React from 'react';
import { Field, useField } from 'formik';

// Composant pour les champs de saisie avec gestion d'erreurs
export const FormikInput = ({ 
  label, 
  icon, 
  type = 'text', 
  placeholder, 
  disabled = false,
  className = '',
  ...props 
}) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={field.name}>
          {icon}
          {label}
        </label>
      )}
      <Field
        {...field}
        {...props}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`${className} ${hasError ? 'error' : ''}`}
      />
      {hasError && (
        <div className="field-error">
          {meta.error}
        </div>
      )}
    </div>
  );
};

// Composant pour les champs de mot de passe avec toggle de visibilité
export const FormikPasswordField = ({ 
  label, 
  icon, 
  placeholder, 
  disabled = false,
  showPassword = false,
  onTogglePassword,
  className = '',
  ...props 
}) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={field.name}>
          {icon}
          {label}
        </label>
      )}
      <div className="password-input">
        <Field
          {...field}
          {...props}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          disabled={disabled}
          className={`${className} ${hasError ? 'error' : ''}`}
        />
        {onTogglePassword && (
          <button
            type="button"
            className="password-toggle"
            onClick={onTogglePassword}
            disabled={disabled}
          >
            {showPassword ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        )}
      </div>
      {hasError && (
        <div className="field-error">
          {meta.error}
        </div>
      )}
    </div>
  );
};

// Composant pour les checkboxes avec gestion d'erreurs
export const FormikCheckbox = ({ 
  label, 
  disabled = false,
  className = '',
  children,
  ...props 
}) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;

  return (
    <div className="form-group">
      <label className={`checkbox-container ${className}`}>
        <Field
          {...field}
          {...props}
          type="checkbox"
          disabled={disabled}
          className={hasError ? 'error' : ''}
        />
        <span className="checkmark"></span>
        {label}
        {children}
      </label>
      {hasError && (
        <div className="field-error">
          {meta.error}
        </div>
      )}
    </div>
  );
};

// Composant pour les boutons de soumission avec état de chargement
export const FormikSubmitButton = ({ 
  children, 
  loadingText = 'Chargement...',
  disabled = false,
  className = '',
  ...props 
}) => {
  return (
    <button 
      type="submit" 
      className={className}
      disabled={disabled}
      style={{ opacity: disabled ? 0.7 : 1 }}
      {...props}
    >
      {disabled ? (
        <>
          <div className="loading-spinner"></div>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
};

// Hook personnalisé pour la gestion des erreurs de formulaire
export const useFormikErrorHandler = () => {
  const handleFieldError = (setFieldError, error) => {
    if (error.message?.includes('email')) {
      setFieldError('email', 'Cette adresse email est déjà utilisée');
    } else if (error.message?.includes('username')) {
      setFieldError('username', 'Ce nom d\'utilisateur est déjà pris');
    } else if (error.message?.includes('password')) {
      setFieldError('password', 'Mot de passe incorrect');
    } else if (error.message?.includes('name')) {
      setFieldError('name', 'Erreur avec le nom');
    } else if (error.message?.includes('age')) {
      setFieldError('age', 'Erreur avec l\'âge');
    } else if (error.message?.includes('phone')) {
      setFieldError('phone', 'Erreur avec le numéro de téléphone');
    } else if (error.message?.includes('terms')) {
      setFieldError('terms', 'Vous devez accepter les conditions');
    }
  };

  const handleGlobalError = (error) => {
    // Gestion des erreurs globales (non liées à un champ spécifique)
    if (error.message?.includes('network')) {
      return 'Erreur de connexion. Vérifiez votre connexion internet.';
    } else if (error.message?.includes('server')) {
      return 'Erreur du serveur. Veuillez réessayer plus tard.';
    } else if (error.message?.includes('timeout')) {
      return 'Délai d\'attente dépassé. Veuillez réessayer.';
    }
    return error.message || 'Une erreur inattendue s\'est produite.';
  };

  return {
    handleFieldError,
    handleGlobalError
  };
};

// Composant pour afficher les erreurs globales
export const FormikGlobalError = ({ error, className = '' }) => {
  if (!error) return null;

  return (
    <div className={`global-error ${className}`}>
      {error}
    </div>
  );
};

export default {
  FormikInput,
  FormikPasswordField,
  FormikCheckbox,
  FormikSubmitButton,
  useFormikErrorHandler,
  FormikGlobalError
};
