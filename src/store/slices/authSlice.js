import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

// État initial
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  refreshToken: null,
  loading: false,
  error: null,
  rememberMe: false,
  lastLoginAttempt: null,
};

// Actions asynchrones
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password, rememberMe = false }, { rejectWithValue }) => {
    try {
      const data = await authService.login({ email, password });
      
      // Stocker l'utilisateur si "Se souvenir de moi" est coché
      if (rememberMe && data.user) {
        authService.storeUser(data.user);
      }
      
      return {
        ...data,
        rememberMe
      };
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        type: 'login_error',
        timestamp: new Date().toISOString()
      });
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await authService.register(userData);
      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        type: 'register_error',
        timestamp: new Date().toISOString()
      });
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return null;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        type: 'logout_error',
        timestamp: new Date().toISOString()
      });
    }
  }
);

// Nouvelle action pour vérifier l'authentification au chargement
export const verifyAuth = createAsyncThunk(
  'auth/verifyAuth',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authService.verifyAuth();
      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        type: 'verify_error',
        timestamp: new Date().toISOString()
      });
    }
  }
);

// Nouvelle action pour rafraîchir le token
export const refreshAuthToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authService.refreshToken();
      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        type: 'refresh_error',
        timestamp: new Date().toISOString()
      });
    }
  }
);

// Nouvelle action pour la réinitialisation de mot de passe
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      await authService.forgotPassword(email);
      return { message: 'Email de réinitialisation envoyé' };
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        type: 'forgot_password_error',
        timestamp: new Date().toISOString()
      });
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (state, action) => {
      const { user, token, refreshToken } = action.payload;
      state.user = user;
      state.token = token;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.rememberMe = false;
      authService.clearAuthData();
    },
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload;
    },
    initializeAuth: (state) => {
      // Initialiser l'état depuis le localStorage
      const token = authService.getToken();
      const user = authService.getStoredUser();
      
      if (token && user) {
        state.token = token;
        state.user = user;
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.lastLoginAttempt = new Date().toISOString();
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.rememberMe = action.payload.rememberMe;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.rememberMe = false;
        state.error = null;
      })
      // Verify Auth
      .addCase(verifyAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.user = action.payload.user;
        if (action.payload.isAuthenticated) {
          state.token = authService.getToken();
        }
      })
      .addCase(verifyAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
      })
      // Refresh Token
      .addCase(refreshAuthToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(refreshAuthToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        authService.clearAuthData();
      })
      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearError, 
  setCredentials, 
  clearCredentials, 
  setRememberMe, 
  initializeAuth 
} = authSlice.actions;
export default authSlice.reducer;
