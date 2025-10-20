// Schémas de validation Yup pour les formulaires PlayWithPro
import * as Yup from 'yup';

// Messages d'erreur personnalisés en français
const frenchMessages = {
  required: 'Ce champ est obligatoire',
  email: 'Veuillez entrer une adresse email valide',
  min: 'Ce champ doit contenir au moins {min} caractères',
  max: 'Ce champ ne peut pas dépasser {max} caractères',
  matches: 'Ce champ ne respecte pas le format requis',
  oneOf: 'Les mots de passe ne correspondent pas',
  minAge: 'Vous devez avoir au moins 13 ans',
  maxAge: 'L\'âge maximum autorisé est 120 ans',
  phone: 'Veuillez entrer un numéro de téléphone valide',
  terms: 'Vous devez accepter les conditions d\'utilisation'
};

// Configuration Yup avec messages français
Yup.setLocale({
  mixed: {
    required: frenchMessages.required,
  },
  string: {
    email: frenchMessages.email,
    min: frenchMessages.min,
    max: frenchMessages.max,
    matches: frenchMessages.matches,
  },
  number: {
    min: frenchMessages.minAge,
    max: frenchMessages.maxAge,
  },
});

// Schéma de validation pour la connexion
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email(frenchMessages.email)
    .required(frenchMessages.required),
  password: Yup.string()
    .required(frenchMessages.required),
  remember: Yup.boolean()
});

// Schéma de validation pour l'inscription
export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères')
    .matches(/^[a-zA-ZÀ-ÿ\s-']+$/, 'Le nom ne peut contenir que des lettres, espaces et tirets')
    .required('Le nom est obligatoire'),
  
  username: Yup.string()
    .min(3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères')
    .max(30, 'Le nom d\'utilisateur ne peut pas dépasser 30 caractères')
    .matches(/^[a-zA-Z0-9_]+$/, 'Le nom d\'utilisateur ne peut contenir que des lettres, chiffres et underscores')
    .required('Le nom d\'utilisateur est obligatoire'),
  
  email: Yup.string()
    .email(frenchMessages.email)
    .max(254, 'L\'email ne peut pas dépasser 254 caractères')
    .required(frenchMessages.required),
  
  password: Yup.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .max(128, 'Le mot de passe ne peut pas dépasser 128 caractères')
    .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .matches(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
    .matches(/\d/, 'Le mot de passe doit contenir au moins un chiffre')
    .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'Le mot de passe doit contenir au moins un caractère spécial')
    .test('not-common', 'Ce mot de passe est trop commun, veuillez en choisir un autre', function(value) {
      const commonPasswords = [
        'password', '123456', '123456789', 'qwerty', 'abc123',
        'password123', 'admin', 'letmein', 'welcome', 'monkey'
      ];
      return !commonPasswords.includes(value?.toLowerCase() || '');
    })
    .required('Le mot de passe est obligatoire'),
  
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Les mots de passe ne correspondent pas')
    .required('La confirmation du mot de passe est obligatoire'),
  
  age: Yup.number()
    .min(13, frenchMessages.minAge)
    .max(120, frenchMessages.maxAge)
    .required('L\'âge est obligatoire'),
  
  phone: Yup.string()
    .matches(/^[+]?[1-9][\d]{0,15}$/, frenchMessages.phone)
    .nullable()
    .optional(),
  
  terms: Yup.boolean()
    .oneOf([true], frenchMessages.terms)
    .required(frenchMessages.terms)
});

// Schéma de validation pour la réinitialisation de mot de passe
export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email(frenchMessages.email)
    .required(frenchMessages.required)
});

// Schéma de validation pour la réinitialisation de mot de passe
export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .max(128, 'Le mot de passe ne peut pas dépasser 128 caractères')
    .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .matches(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
    .matches(/\d/, 'Le mot de passe doit contenir au moins un chiffre')
    .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'Le mot de passe doit contenir au moins un caractère spécial')
    .required('Le mot de passe est obligatoire'),
  
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Les mots de passe ne correspondent pas')
    .required('La confirmation du mot de passe est obligatoire')
});

// Valeurs initiales pour les formulaires
export const initialValues = {
  login: {
    email: '',
    password: '',
    remember: false
  },
  
  register: {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    phone: '',
    terms: false
  },
  
  forgotPassword: {
    email: ''
  },
  
  resetPassword: {
    password: '',
    confirmPassword: ''
  }
};

// Fonction utilitaire pour formater les erreurs Formik
export const formatFormikErrors = (errors) => {
  const formattedErrors = {};
  
  Object.keys(errors).forEach(key => {
    if (typeof errors[key] === 'string') {
      formattedErrors[key] = errors[key];
    } else if (Array.isArray(errors[key])) {
      formattedErrors[key] = errors[key][0];
    } else if (typeof errors[key] === 'object') {
      formattedErrors[key] = Object.values(errors[key])[0];
    }
  });
  
  return formattedErrors;
};

// Fonction utilitaire pour obtenir les erreurs de champ
export const getFieldError = (touched, errors, fieldName) => {
  return touched[fieldName] && errors[fieldName] ? errors[fieldName] : '';
};

// Fonction utilitaire pour vérifier si un champ a une erreur
export const hasFieldError = (touched, errors, fieldName) => {
  return !!(touched[fieldName] && errors[fieldName]);
};

const validationSchemas = {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  initialValues,
  formatFormikErrors,
  getFieldError,
  hasFieldError
};

export default validationSchemas;
