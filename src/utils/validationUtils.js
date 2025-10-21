// Utilitaires de validation avancée pour le formulaire d'inscription

// Fonction de debounce pour éviter les appels trop fréquents
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Validation de la force du mot de passe
export const calculatePasswordStrength = (password) => {
  if (!password) return { score: 0, level: 'empty', feedback: [] };

  let score = 0;
  const feedback = [];

  // Longueur
  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('Au moins 8 caractères');
  }

  if (password.length >= 12) {
    score += 1;
  }

  // Majuscules
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Une majuscule');
  }

  // Minuscules
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Une minuscule');
  }

  // Chiffres
  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push('Un chiffre');
  }

  // Caractères spéciaux
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Un caractère spécial');
  }

  // Mots de passe communs
  const commonPasswords = [
    'password', '123456', '123456789', 'qwerty', 'abc123', 
    'password123', 'admin', 'letmein', 'welcome', 'monkey'
  ];
  
  if (commonPasswords.some(common => password.toLowerCase().includes(common))) {
    score = Math.max(0, score - 2);
    feedback.push('Évitez les mots de passe courants');
  }

  // Déterminer le niveau
  let level;
  if (score <= 2) level = 'weak';
  else if (score <= 4) level = 'medium';
  else if (score <= 5) level = 'strong';
  else level = 'very-strong';

  return { score, level, feedback };
};

// Génération de suggestions de noms d'utilisateur
export const generateUsernameSuggestions = (baseUsername, existingUsernames = []) => {
  if (!baseUsername) return [];

  const suggestions = [];
  const cleanBase = baseUsername.toLowerCase().replace(/[^a-z0-9_]/g, '');

  // Ajouter des variantes avec des chiffres
  for (let i = 1; i <= 5; i++) {
    const suggestion = `${cleanBase}${i}`;
    if (!existingUsernames.includes(suggestion)) {
      suggestions.push(suggestion);
    }
  }

  // Ajouter des variantes avec des suffixes gaming
  const gamingSuffixes = ['pro', 'gamer', 'player', 'master', 'legend', 'king', 'queen'];
  gamingSuffixes.forEach(suffix => {
    const suggestion = `${cleanBase}${suffix}`;
    if (!existingUsernames.includes(suggestion) && suggestions.length < 8) {
      suggestions.push(suggestion);
    }
  });

  // Ajouter des variantes avec des préfixes
  const gamingPrefixes = ['pro', 'elite', 'super', 'mega', 'ultra'];
  gamingPrefixes.forEach(prefix => {
    const suggestion = `${prefix}${cleanBase}`;
    if (!existingUsernames.includes(suggestion) && suggestions.length < 8) {
      suggestions.push(suggestion);
    }
  });

  return suggestions.slice(0, 6); // Limiter à 6 suggestions
};

// Validation en temps réel avec debounce
export const createRealTimeValidator = (validationFn, delay = 500) => {
  return debounce((value, setFieldError, setFieldTouched) => {
    const error = validationFn(value);
    if (error) {
      setFieldError(error);
    } else {
      setFieldError(undefined);
    }
    setFieldTouched(true);
  }, delay);
};

// Validation au blur
export const createBlurValidator = (validationFn) => {
  return (value, setFieldError, setFieldTouched) => {
    const error = validationFn(value);
    if (error) {
      setFieldError(error);
    } else {
      setFieldError(undefined);
    }
    setFieldTouched(true);
  };
};

// Validation différée (évite la validation à chaque frappe)
export const createDeferredValidator = (validationFn, delay = 1000) => {
  return debounce((value, setFieldError, setFieldTouched) => {
    const error = validationFn(value);
    if (error) {
      setFieldError(error);
    } else {
      setFieldError(undefined);
    }
    setFieldTouched(true);
  }, delay);
};

// Fonctions de validation spécifiques
export const validateUsername = (username) => {
  if (!username) return 'Le nom d\'utilisateur est requis';
  if (username.length < 3) return 'Le nom d\'utilisateur doit contenir au moins 3 caractères';
  if (username.length > 30) return 'Le nom d\'utilisateur ne peut pas dépasser 30 caractères';
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Le nom d\'utilisateur ne peut contenir que des lettres, chiffres et underscores';
  return null;
};

export const validateEmail = (email) => {
  if (!email) return 'L\'email est requis';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Format d\'email invalide';
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'Le mot de passe est requis';
  if (password.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères';
  if (password.length > 128) return 'Le mot de passe ne peut pas dépasser 128 caractères';
  if (!/[A-Z]/.test(password)) return 'Le mot de passe doit contenir au moins une majuscule';
  if (!/[a-z]/.test(password)) return 'Le mot de passe doit contenir au moins une minuscule';
  if (!/\d/.test(password)) return 'Le mot de passe doit contenir au moins un chiffre';
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return 'Le mot de passe doit contenir au moins un caractère spécial';
  return null;
};

export const validateName = (name) => {
  if (!name) return 'Le nom est requis';
  if (name.length < 2) return 'Le nom doit contenir au moins 2 caractères';
  if (name.length > 50) return 'Le nom ne peut pas dépasser 50 caractères';
  if (!/^[a-zA-ZÀ-ÿ\s\-']+$/.test(name)) return 'Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes';
  return null;
};

export const validateAge = (age) => {
  if (!age) return 'L\'âge est requis';
  const ageNum = parseInt(age);
  if (isNaN(ageNum)) return 'L\'âge doit être un nombre valide';
  if (ageNum < 13) return 'Vous devez avoir au moins 13 ans';
  if (ageNum > 120) return 'L\'âge ne peut pas dépasser 120 ans';
  return null;
};

export const validatePhone = (phone) => {
  if (!phone) return null; // Optionnel
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) return 'Format de téléphone invalide';
  return null;
};
