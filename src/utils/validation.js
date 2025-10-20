// Utilitaires de validation pour les formulaires PlayWithPro

// Messages d'erreur personnalisés
export const validationMessages = {
  required: 'Ce champ est obligatoire',
  email: 'Veuillez entrer une adresse email valide',
  password: {
    minLength: 'Le mot de passe doit contenir au moins 8 caractères',
    maxLength: 'Le mot de passe ne peut pas dépasser 128 caractères',
    hasUppercase: 'Le mot de passe doit contenir au moins une majuscule',
    hasLowercase: 'Le mot de passe doit contenir au moins une minuscule',
    hasNumber: 'Le mot de passe doit contenir au moins un chiffre',
    hasSpecialChar: 'Le mot de passe doit contenir au moins un caractère spécial',
    common: 'Ce mot de passe est trop commun, veuillez en choisir un autre',
  },
  confirmPassword: 'Les mots de passe ne correspondent pas',
  name: {
    minLength: 'Le nom doit contenir au moins 2 caractères',
    maxLength: 'Le nom ne peut pas dépasser 50 caractères',
    invalid: 'Le nom ne peut contenir que des lettres, espaces et tirets',
  },
  username: {
    minLength: 'Le nom d\'utilisateur doit contenir au moins 3 caractères',
    maxLength: 'Le nom d\'utilisateur ne peut pas dépasser 30 caractères',
    invalid: 'Le nom d\'utilisateur ne peut contenir que des lettres, chiffres et underscores',
    taken: 'Ce nom d\'utilisateur est déjà pris',
  },
  phone: 'Veuillez entrer un numéro de téléphone valide',
  age: {
    min: 'Vous devez avoir au moins 13 ans',
    max: 'L\'âge maximum autorisé est 120 ans',
  },
  terms: 'Vous devez accepter les conditions d\'utilisation',
};

// Fonctions de validation individuelles
export const validators = {
  // Validation d'email
  email: (value) => {
    if (!value) return validationMessages.required;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : validationMessages.email;
  },

  // Validation de mot de passe
  password: (value) => {
    if (!value) return validationMessages.required;
    
    const errors = [];
    
    if (value.length < 8) {
      errors.push(validationMessages.password.minLength);
    }
    
    if (value.length > 128) {
      errors.push(validationMessages.password.maxLength);
    }
    
    if (!/[A-Z]/.test(value)) {
      errors.push(validationMessages.password.hasUppercase);
    }
    
    if (!/[a-z]/.test(value)) {
      errors.push(validationMessages.password.hasLowercase);
    }
    
    if (!/\d/.test(value)) {
      errors.push(validationMessages.password.hasNumber);
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
      errors.push(validationMessages.password.hasSpecialChar);
    }
    
    // Mots de passe communs à éviter
    const commonPasswords = [
      'password', '123456', '123456789', 'qwerty', 'abc123',
      'password123', 'admin', 'letmein', 'welcome', 'monkey'
    ];
    
    if (commonPasswords.includes(value.toLowerCase())) {
      errors.push(validationMessages.password.common);
    }
    
    return errors.length > 0 ? errors[0] : null;
  },

  // Validation de confirmation de mot de passe
  confirmPassword: (value, originalPassword) => {
    if (!value) return validationMessages.required;
    return value === originalPassword ? null : validationMessages.confirmPassword;
  },

  // Validation de nom
  name: (value) => {
    if (!value) return validationMessages.required;
    
    if (value.length < 2) {
      return validationMessages.name.minLength;
    }
    
    if (value.length > 50) {
      return validationMessages.name.maxLength;
    }
    
    const nameRegex = /^[a-zA-ZÀ-ÿ\s\-']+$/;
    return nameRegex.test(value) ? null : validationMessages.name.invalid;
  },

  // Validation de nom d'utilisateur
  username: (value) => {
    if (!value) return validationMessages.required;
    
    if (value.length < 3) {
      return validationMessages.username.minLength;
    }
    
    if (value.length > 30) {
      return validationMessages.username.maxLength;
    }
    
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    return usernameRegex.test(value) ? null : validationMessages.username.invalid;
  },

  // Validation de téléphone
  phone: (value) => {
    if (!value) return null; // Optionnel
    
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(value.replace(/[\s\-\(\)]/g, '')) ? null : validationMessages.phone;
  },

  // Validation d'âge
  age: (value) => {
    if (!value) return validationMessages.required;
    
    const age = parseInt(value);
    
    if (isNaN(age)) {
      return 'Veuillez entrer un âge valide';
    }
    
    if (age < 13) {
      return validationMessages.age.min;
    }
    
    if (age > 120) {
      return validationMessages.age.max;
    }
    
    return null;
  },

  // Validation de checkbox (conditions d'utilisation)
  terms: (value) => {
    return value ? null : validationMessages.terms;
  },

  // Validation générique pour champs requis
  required: (value) => {
    return value ? null : validationMessages.required;
  },
};

// Fonction pour valider un objet de formulaire
export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;

  Object.keys(validationRules).forEach(field => {
    const rule = validationRules[field];
    const value = formData[field];
    
    let error = null;
    
    if (typeof rule === 'function') {
      error = rule(value);
    } else if (typeof rule === 'object') {
      // Règle complexe avec dépendances
      if (rule.validator) {
        error = rule.validator(value, formData[rule.dependsOn]);
      }
    }
    
    if (error) {
      errors[field] = error;
      isValid = false;
    }
  });

  return { errors, isValid };
};

// Règles de validation prédéfinies pour les formulaires
export const validationRules = {
  login: {
    email: validators.email,
    password: validators.required,
  },
  
  register: {
    name: validators.name,
    email: validators.email,
    username: validators.username,
    password: validators.password,
    confirmPassword: {
      validator: validators.confirmPassword,
      dependsOn: 'password'
    },
    age: validators.age,
    phone: validators.phone,
    terms: validators.terms,
  },
  
  forgotPassword: {
    email: validators.email,
  },
  
  resetPassword: {
    password: validators.password,
    confirmPassword: {
      validator: validators.confirmPassword,
      dependsOn: 'password'
    },
  },
  
  profile: {
    name: validators.name,
    email: validators.email,
    username: validators.username,
    phone: validators.phone,
  },
};

// Fonction pour obtenir un message d'erreur spécifique selon le type d'erreur
export const getErrorMessage = (error) => {
  if (!error) return null;
  
  // Si c'est un objet d'erreur avec type et message
  if (typeof error === 'object' && error.message) {
    return error.message;
  }
  
  // Si c'est une chaîne simple
  if (typeof error === 'string') {
    return error;
  }
  
  return 'Une erreur est survenue';
};

// Fonction pour formater les erreurs d'API
export const formatApiError = (error) => {
  if (!error) return null;
  
  // Erreur de réseau
  if (error.message === 'Network Error' || error.code === 'NETWORK_ERROR') {
    return 'Erreur de connexion. Vérifiez votre connexion internet.';
  }
  
  // Erreur de timeout
  if (error.code === 'TIMEOUT') {
    return 'La requête a pris trop de temps. Veuillez réessayer.';
  }
  
  // Erreur de validation côté serveur
  if (error.status === 400 && error.data?.errors) {
    const firstError = Object.values(error.data.errors)[0];
    return Array.isArray(firstError) ? firstError[0] : firstError;
  }
  
  // Erreur d'authentification
  if (error.status === 401) {
    return 'Email ou mot de passe incorrect.';
  }
  
  // Erreur d'autorisation
  if (error.status === 403) {
    return 'Vous n\'avez pas les permissions nécessaires.';
  }
  
  // Erreur de ressource non trouvée
  if (error.status === 404) {
    return 'Ressource non trouvée.';
  }
  
  // Erreur de conflit
  if (error.status === 409) {
    return 'Cette ressource existe déjà.';
  }
  
  // Erreur de serveur
  if (error.status >= 500) {
    return 'Erreur du serveur. Veuillez réessayer plus tard.';
  }
  
  // Message par défaut
  return error.message || 'Une erreur inattendue est survenue.';
};

export default {
  validators,
  validationRules,
  validateForm,
  getErrorMessage,
  formatApiError,
  validationMessages,
};
