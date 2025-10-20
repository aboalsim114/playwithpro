// Service d'authentification pour PlayWithPro
// Ce service gère toutes les interactions avec l'API d'authentification

import authConfig from '../config/authConfig';

const API_BASE_URL = authConfig.apiUrl;

// Configuration par défaut pour les requêtes
const defaultConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Fonction utilitaire pour gérer les réponses d'erreur
const handleApiError = async (response) => {
  if (!response.ok) {
    let errorMessage = 'Une erreur est survenue';
    
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {
      // Si on ne peut pas parser le JSON, utiliser le message par défaut
      errorMessage = response.statusText || errorMessage;
    }
    
    throw new Error(errorMessage);
  }
  
  return response.json();
};

// Service d'authentification
export const authService = {
  /**
   * Connexion d'un utilisateur
   * @param {Object} credentials - { email, password }
   * @returns {Promise<Object>} - { user, token, refreshToken }
   */
  async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        ...defaultConfig,
        body: JSON.stringify(credentials),
      });

      const data = await handleApiError(response);
      
      // Stocker le token dans le localStorage si la connexion réussit
      if (data.token) {
        localStorage.setItem(authConfig.storageKeys.authToken, data.token);
      }
      
      if (data.refreshToken) {
        localStorage.setItem(authConfig.storageKeys.refreshToken, data.refreshToken);
      }
      
      return data;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  },

  /**
   * Inscription d'un nouvel utilisateur
   * @param {Object} userData - { email, password, name, ... }
   * @returns {Promise<Object>} - { user, token, refreshToken }
   */
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        ...defaultConfig,
        body: JSON.stringify(userData),
      });

      const data = await handleApiError(response);
      
      // Stocker le token dans le localStorage si l'inscription réussit
      if (data.token) {
        localStorage.setItem(authConfig.storageKeys.authToken, data.token);
      }
      
      if (data.refreshToken) {
        localStorage.setItem(authConfig.storageKeys.refreshToken, data.refreshToken);
      }
      
      return data;
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      throw error;
    }
  },

  /**
   * Déconnexion de l'utilisateur
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      const token = localStorage.getItem(authConfig.storageKeys.authToken);
      
      if (token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            ...defaultConfig.headers,
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      // On continue même si la déconnexion côté serveur échoue
    } finally {
      // Nettoyer le localStorage dans tous les cas
      this.clearAuthData();
    }
  },

  /**
   * Rafraîchir le token d'authentification
   * @returns {Promise<Object>} - { token, refreshToken }
   */
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem(authConfig.storageKeys.refreshToken);
      
      if (!refreshToken) {
        throw new Error('Aucun refresh token disponible');
      }

      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        ...defaultConfig,
        body: JSON.stringify({ refreshToken }),
      });

      const data = await handleApiError(response);
      
      // Mettre à jour les tokens
      if (data.token) {
        localStorage.setItem(authConfig.storageKeys.authToken, data.token);
      }
      
      if (data.refreshToken) {
        localStorage.setItem(authConfig.storageKeys.refreshToken, data.refreshToken);
      }
      
      return data;
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error);
      // Si le refresh échoue, déconnecter l'utilisateur
      this.clearAuthData();
      throw error;
    }
  },

  /**
   * Vérifier si l'utilisateur est authentifié
   * @returns {Promise<Object>} - { user, isAuthenticated }
   */
  async verifyAuth() {
    try {
      const token = localStorage.getItem(authConfig.storageKeys.authToken);
      
      if (!token) {
        return { user: null, isAuthenticated: false };
      }

      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: 'GET',
        headers: {
          ...defaultConfig.headers,
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // Token invalide, nettoyer le localStorage
        this.clearAuthData();
        return { user: null, isAuthenticated: false };
      }

      const data = await response.json();
      return { user: data.user, isAuthenticated: true };
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'authentification:', error);
      return { user: null, isAuthenticated: false };
    }
  },

  /**
   * Demander une réinitialisation de mot de passe
   * @param {string} email - Email de l'utilisateur
   * @returns {Promise<void>}
   */
  async forgotPassword(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        ...defaultConfig,
        body: JSON.stringify({ email }),
      });

      await handleApiError(response);
    } catch (error) {
      console.error('Erreur lors de la demande de réinitialisation:', error);
      throw error;
    }
  },

  /**
   * Réinitialiser le mot de passe
   * @param {Object} resetData - { token, newPassword }
   * @returns {Promise<void>}
   */
  async resetPassword(resetData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        ...defaultConfig,
        body: JSON.stringify(resetData),
      });

      await handleApiError(response);
    } catch (error) {
      console.error('Erreur lors de la réinitialisation du mot de passe:', error);
      throw error;
    }
  },

  /**
   * Obtenir le token actuel depuis le localStorage
   * @returns {string|null}
   */
  getToken() {
    return localStorage.getItem(authConfig.storageKeys.authToken);
  },

  /**
   * Obtenir l'utilisateur stocké dans le localStorage
   * @returns {Object|null}
   */
  getStoredUser() {
    try {
      const userStr = localStorage.getItem(authConfig.storageKeys.user);
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Erreur lors de la lecture de l\'utilisateur stocké:', error);
      return null;
    }
  },

  /**
   * Stocker les informations utilisateur dans le localStorage
   * @param {Object} user - Informations utilisateur
   */
  storeUser(user) {
    localStorage.setItem(authConfig.storageKeys.user, JSON.stringify(user));
  },

  /**
   * Nettoyer toutes les données d'authentification
   */
  clearAuthData() {
    localStorage.removeItem(authConfig.storageKeys.authToken);
    localStorage.removeItem(authConfig.storageKeys.refreshToken);
    localStorage.removeItem(authConfig.storageKeys.user);
    localStorage.removeItem(authConfig.storageKeys.rememberMe);
  }
};

export default authService;
