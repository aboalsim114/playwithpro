import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import './Inscription.css'
import { useAuth } from '../../store/hooks'
import { registerUser, clearError } from '../../store/slices/authSlice'
import { formatApiError } from '../../utils/validation'
import { registerSchema, initialValues, getFieldError, hasFieldError } from '../../schemas/validationSchemas'
import PasswordStrengthIndicator from '../../Composants/PasswordStrengthIndicator/PasswordStrengthIndicator'
import UsernameSuggestions from '../../Composants/UsernameSuggestions/UsernameSuggestions'
import { 
  createRealTimeValidator, 
  createBlurValidator, 
  validateUsername,
  validateEmail,
  validateName,
  validateAge,
  validatePhone
} from '../../utils/validationUtils'

// Gaming-themed SVG Illustrations
const GamingIllustrations = () => (
  <div className="gaming-illustrations">
    {/* Floating Gaming Elements */}
    <div className="floating-element controller-1">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
        <path d="M4 22h16"/>
        <path d="M10 14.66V17c0 .55.47.98.97 1.21l1.03.4c.5.23 1.03.23 1.53 0l1.03-.4c.5-.23.97-.66.97-1.21v-2.34"/>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
      </svg>
    </div>
    
    <div className="floating-element rocket-1">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
    </div>
    
    <div className="floating-element diamond-1">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 3h12l4 6-10 13L2 9l4-6z"/>
        <path d="M11 3L8 9l4 13 4-13-3-6"/>
        <path d="M2 9h20"/>
      </svg>
    </div>
    
    <div className="floating-element sword-1">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.5 2L20 7.5L14.5 13"/>
        <path d="M20 7.5H4"/>
        <path d="M4 7.5L9.5 13"/>
        <path d="M9.5 13L4 18.5"/>
        <path d="M9.5 13L15 18.5"/>
      </svg>
    </div>
    
    {/* Neural Network Background */}
    <div className="neural-network">
      <svg viewBox="0 0 400 300" className="neural-svg">
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 255, 255, 0.3)"/>
            <stop offset="50%" stopColor="rgba(155, 95, 255, 0.2)"/>
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)"/>
          </linearGradient>
        </defs>
        <g className="neural-nodes">
          <circle cx="50" cy="50" r="3" fill="url(#neuralGradient)"/>
          <circle cx="150" cy="80" r="3" fill="url(#neuralGradient)"/>
          <circle cx="250" cy="60" r="3" fill="url(#neuralGradient)"/>
          <circle cx="350" cy="90" r="3" fill="url(#neuralGradient)"/>
          <circle cx="80" cy="150" r="3" fill="url(#neuralGradient)"/>
          <circle cx="180" cy="180" r="3" fill="url(#neuralGradient)"/>
          <circle cx="280" cy="160" r="3" fill="url(#neuralGradient)"/>
          <circle cx="120" cy="220" r="3" fill="url(#neuralGradient)"/>
          <circle cx="220" cy="240" r="3" fill="url(#neuralGradient)"/>
          <circle cx="320" cy="220" r="3" fill="url(#neuralGradient)"/>
        </g>
        <g className="neural-connections">
          <line x1="50" y1="50" x2="150" y2="80" stroke="url(#neuralGradient)" strokeWidth="1" opacity="0.6"/>
          <line x1="150" y1="80" x2="250" y2="60" stroke="url(#neuralGradient)" strokeWidth="1" opacity="0.6"/>
          <line x1="250" y1="60" x2="350" y2="90" stroke="url(#neuralGradient)" strokeWidth="1" opacity="0.6"/>
          <line x1="50" y1="50" x2="80" y2="150" stroke="url(#neuralGradient)" strokeWidth="1" opacity="0.6"/>
          <line x1="150" y1="80" x2="180" y2="180" stroke="url(#neuralGradient)" strokeWidth="1" opacity="0.6"/>
          <line x1="250" y1="60" x2="280" y2="160" stroke="url(#neuralGradient)" strokeWidth="1" opacity="0.6"/>
          <line x1="80" y1="150" x2="120" y2="220" stroke="url(#neuralGradient)" strokeWidth="1" opacity="0.6"/>
          <line x1="180" y1="180" x2="220" y2="240" stroke="url(#neuralGradient)" strokeWidth="1" opacity="0.6"/>
          <line x1="280" y1="160" x2="320" y2="220" stroke="url(#neuralGradient)" strokeWidth="1" opacity="0.6"/>
        </g>
      </svg>
    </div>
    
    {/* Energy Waves */}
    <div className="energy-waves">
      <div className="wave wave-1"></div>
      <div className="wave wave-2"></div>
      <div className="wave wave-3"></div>
    </div>
  </div>
)

function Inscription() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showUsernameSuggestions, setShowUsernameSuggestions] = useState(false)
  const [usernameFocused, setUsernameFocused] = useState(false)
  const [existingUsernames] = useState(['admin', 'test', 'user', 'gamer', 'player']) // Simulé
  
  const { isAuthenticated, error, dispatch } = useAuth()
  const navigate = useNavigate()
  const usernameInputRef = useRef(null)

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  // Nettoyer les erreurs quand le composant se monte
  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  // Gérer la fermeture des suggestions quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (usernameInputRef.current && !usernameInputRef.current.contains(event.target)) {
        setShowUsernameSuggestions(false)
        setUsernameFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Créer les validateurs avec debounce
  const realTimeValidators = {
    username: createRealTimeValidator(validateUsername, 500),
    email: createRealTimeValidator(validateEmail, 500),
    name: createRealTimeValidator(validateName, 500),
    age: createRealTimeValidator(validateAge, 500),
    phone: createRealTimeValidator(validatePhone, 500)
  }

  const blurValidators = {
    username: createBlurValidator(validateUsername),
    email: createBlurValidator(validateEmail),
    name: createBlurValidator(validateName),
    age: createBlurValidator(validateAge),
    phone: createBlurValidator(validatePhone)
  }


  const handleRegisterSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      await dispatch(registerUser({
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.password,
        age: parseInt(values.age),
        phone: values.phone || undefined
      })).unwrap()
      
      // La redirection se fera automatiquement via useEffect
    } catch (error) {
      console.error('Erreur d\'inscription:', error)
      
      // Gérer les erreurs spécifiques aux champs
      if (error.message?.includes('email')) {
        setFieldError('email', 'Cette adresse email est déjà utilisée')
      } else if (error.message?.includes('username')) {
        setFieldError('username', 'Ce nom d\'utilisateur est déjà pris')
      } else if (error.message?.includes('name')) {
        setFieldError('name', 'Erreur avec le nom')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleUsernameSuggestionSelect = (suggestion, setFieldValue) => {
    setFieldValue('username', suggestion)
    setShowUsernameSuggestions(false)
    setUsernameFocused(false)
  }

  const handleFieldChange = (fieldName, value, setFieldValue, setFieldError, setFieldTouched) => {
    setFieldValue(fieldName, value)
    
    // Validation en temps réel avec debounce
    if (realTimeValidators[fieldName]) {
      realTimeValidators[fieldName](value, setFieldError, setFieldTouched)
    }
  }

  const handleFieldBlur = (fieldName, value, setFieldError, setFieldTouched) => {
    // Validation au blur
    if (blurValidators[fieldName]) {
      blurValidators[fieldName](value, setFieldError, setFieldTouched)
    }
    
    // Gérer les suggestions de nom d'utilisateur
    if (fieldName === 'username') {
      setUsernameFocused(false)
      if (value && value.length >= 2) {
        setShowUsernameSuggestions(true)
      } else {
        setShowUsernameSuggestions(false)
      }
    }
  }

  const handleFieldFocus = (fieldName) => {
    if (fieldName === 'username') {
      setUsernameFocused(true)
      setShowUsernameSuggestions(true)
    }
  }

  return (
    <div>
    
      <div className="inscription-page">
        <GamingIllustrations />
        <div className="inscription-grid">
          {/* Section gauche - Design futuriste avec vidéo */}
          <div className="futuristic-video-section">
            <div className="cyber-container">
              {/* Grille cyberpunk en arrière-plan */}
              <div className="cyber-grid">
                <div className="grid-line horizontal line-1"></div>
                <div className="grid-line horizontal line-2"></div>
                <div className="grid-line horizontal line-3"></div>
                <div className="grid-line vertical line-4"></div>
                <div className="grid-line vertical line-5"></div>
                <div className="grid-line vertical line-6"></div>
              </div>
              
              {/* Vidéo principale */}
              <div className="video-hologram">
                <video 
                  className="cyber-video"
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Cdefs%3E%3ClinearGradient id='cyber' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2300FFFF;stop-opacity:0.3'/%3E%3Cstop offset='50%25' style='stop-color:%23FF00FF;stop-opacity:0.2'/%3E%3Cstop offset='100%25' style='stop-color:%2300FF00;stop-opacity:0.1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23cyber)'/%3E%3C/svg%3E"
                  onError={(e) => {
                    console.log('Erreur de chargement vidéo:', e);
                    e.target.src = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
                  }}
                >
                  <source src="/videos/csgo-legends.3840x2160.mp4" type="video/mp4" />
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture vidéo.
                </video>
                
                {/* Effet de scan */}
                <div className="scan-line"></div>
                
                {/* Hologramme overlay */}
                <div className="hologram-overlay">
                  <div className="data-stream">
                    <div className="data-line line-1"></div>
                    <div className="data-line line-2"></div>
                    <div className="data-line line-3"></div>
                    <div className="data-line line-4"></div>
                    <div className="data-line line-5"></div>
                  </div>
                </div>
              </div>
              
              {/* Contenu futuriste */}
              <div className="cyber-content">
                <div className="neon-frame">
                  <div className="corner corner-tl"></div>
                  <div className="corner corner-tr"></div>
                  <div className="corner corner-bl"></div>
                  <div className="corner corner-br"></div>
                  
                  <div className="content-inner">
                    <div className="cyber-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    
                    <div className="cyber-text">
                      <h2 className="neon-title">
                        <span className="glitch" data-text="JOIN THE MATRIX">JOIN THE MATRIX</span>
                      </h2>
                      <p className="cyber-subtitle">Enter the digital realm of competitive gaming</p>
                    </div>
                    
                    <div className="stats-grid">
                      <div className="stat-item">
                        <div className="stat-number">10K+</div>
                        <div className="stat-label">Players</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-number">500+</div>
                        <div className="stat-label">Tournaments</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-number">24/7</div>
                        <div className="stat-label">Active</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Effets cyberpunk */}
              <div className="cyber-effects">
                <div className="glitch-effect glitch-1"></div>
                <div className="glitch-effect glitch-2"></div>
                <div className="glitch-effect glitch-3"></div>
              </div>
              
              {/* Particules énergétiques */}
              <div className="energy-particles">
                <div className="energy-dot dot-1"></div>
                <div className="energy-dot dot-2"></div>
                <div className="energy-dot dot-3"></div>
                <div className="energy-dot dot-4"></div>
                <div className="energy-dot dot-5"></div>
                <div className="energy-dot dot-6"></div>
                <div className="energy-dot dot-7"></div>
                <div className="energy-dot dot-8"></div>
                <div className="energy-dot dot-9"></div>
                <div className="energy-dot dot-10"></div>
              </div>
            </div>
          </div>
          
          {/* Section droite - Formulaire */}
          <div className="form-section">
            <div className="form-container">
              <div className="form-header">
                <h2>Créer un compte</h2>
                <p>Remplis les informations ci-dessous</p>
              </div>
              
              <div className="inscription-form">
            {error && (
              <div className="error-message" style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: '#EF4444',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                backdropFilter: 'blur(10px)'
              }}>
                {formatApiError(error)}
              </div>
            )}
            
            <Formik
              initialValues={initialValues.register}
              validationSchema={registerSchema}
              onSubmit={handleRegisterSubmit}
            >
              {({ values, errors, touched, isSubmitting, setFieldValue, setFieldError, setFieldTouched }) => (
                <Form>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                        Nom complet
                      </label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Votre nom complet"
                        disabled={isSubmitting}
                        className={hasFieldError(touched, errors, 'name') ? 'error' : ''}
                        onChange={(e) => handleFieldChange('name', e.target.value, setFieldValue, setFieldError, setFieldTouched)}
                        onBlur={(e) => handleFieldBlur('name', e.target.value, setFieldError, setFieldTouched)}
                      />
                      {getFieldError(touched, errors, 'name') && (
                        <div className="field-error">
                          {getFieldError(touched, errors, 'name')}
                        </div>
                      )}
                    </div>
                    
                    <div className="form-group username-group">
                      <label htmlFor="username">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        Nom d'utilisateur
                      </label>
                      <div className="username-input-container" ref={usernameInputRef}>
                        <Field
                          type="text"
                          id="username"
                          name="username"
                          placeholder="Votre pseudo gaming"
                          disabled={isSubmitting}
                          className={hasFieldError(touched, errors, 'username') ? 'error' : ''}
                          onChange={(e) => handleFieldChange('username', e.target.value, setFieldValue, setFieldError, setFieldTouched)}
                          onBlur={(e) => handleFieldBlur('username', e.target.value, setFieldError, setFieldTouched)}
                          onFocus={() => handleFieldFocus('username')}
                        />
                        <UsernameSuggestions
                          username={values.username}
                          onSuggestionSelect={(suggestion) => handleUsernameSuggestionSelect(suggestion, setFieldValue)}
                          isVisible={showUsernameSuggestions && usernameFocused}
                          existingUsernames={existingUsernames}
                        />
                      </div>
                      {getFieldError(touched, errors, 'username') && (
                        <div className="field-error">
                          {getFieldError(touched, errors, 'username')}
                        </div>
                      )}
                    </div>
                  </div>
              
                  <div className="form-group">
                    <label htmlFor="email">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                      Email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="votre@email.com"
                      disabled={isSubmitting}
                      className={hasFieldError(touched, errors, 'email') ? 'error' : ''}
                      onChange={(e) => handleFieldChange('email', e.target.value, setFieldValue, setFieldError, setFieldTouched)}
                      onBlur={(e) => handleFieldBlur('email', e.target.value, setFieldError, setFieldTouched)}
                    />
                    {getFieldError(touched, errors, 'email') && (
                      <div className="field-error">
                        {getFieldError(touched, errors, 'email')}
                      </div>
                    )}
                  </div>
              
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="password">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                          <circle cx="12" cy="16" r="1"/>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        Mot de passe
                      </label>
                      <div className="password-input">
                        <Field
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          placeholder="••••••••"
                          disabled={isSubmitting}
                          className={hasFieldError(touched, errors, 'password') ? 'error' : ''}
                          onChange={(e) => handleFieldChange('password', e.target.value, setFieldValue, setFieldError, setFieldTouched)}
                          onBlur={(e) => handleFieldBlur('password', e.target.value, setFieldError, setFieldTouched)}
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isSubmitting}
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
                      </div>
                      <PasswordStrengthIndicator 
                        password={values.password} 
                        showFeedback={true}
                      />
                      {getFieldError(touched, errors, 'password') && (
                        <div className="field-error">
                          {getFieldError(touched, errors, 'password')}
                        </div>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="confirmPassword">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                          <circle cx="12" cy="16" r="1"/>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        Confirmer
                      </label>
                      <div className="password-input">
                        <Field
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder="••••••••"
                          disabled={isSubmitting}
                          className={hasFieldError(touched, errors, 'confirmPassword') ? 'error' : ''}
                          onChange={(e) => handleFieldChange('confirmPassword', e.target.value, setFieldValue, setFieldError, setFieldTouched)}
                          onBlur={(e) => handleFieldBlur('confirmPassword', e.target.value, setFieldError, setFieldTouched)}
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          disabled={isSubmitting}
                        >
                          {showConfirmPassword ? (
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
                      </div>
                      {getFieldError(touched, errors, 'confirmPassword') && (
                        <div className="field-error">
                          {getFieldError(touched, errors, 'confirmPassword')}
                        </div>
                      )}
                    </div>
                  </div>
              
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="age">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12,6 12,12 16,14"/>
                        </svg>
                        Âge
                      </label>
                      <Field
                        type="number"
                        id="age"
                        name="age"
                        placeholder="18"
                        min="13"
                        max="120"
                        disabled={isSubmitting}
                        className={hasFieldError(touched, errors, 'age') ? 'error' : ''}
                        onChange={(e) => handleFieldChange('age', e.target.value, setFieldValue, setFieldError, setFieldTouched)}
                        onBlur={(e) => handleFieldBlur('age', e.target.value, setFieldError, setFieldTouched)}
                      />
                      {getFieldError(touched, errors, 'age') && (
                        <div className="field-error">
                          {getFieldError(touched, errors, 'age')}
                        </div>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        Téléphone (optionnel)
                      </label>
                      <Field
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+33 6 12 34 56 78"
                        disabled={isSubmitting}
                        className={hasFieldError(touched, errors, 'phone') ? 'error' : ''}
                        onChange={(e) => handleFieldChange('phone', e.target.value, setFieldValue, setFieldError, setFieldTouched)}
                        onBlur={(e) => handleFieldBlur('phone', e.target.value, setFieldError, setFieldTouched)}
                      />
                      {getFieldError(touched, errors, 'phone') && (
                        <div className="field-error">
                          {getFieldError(touched, errors, 'phone')}
                        </div>
                      )}
                    </div>
                  </div>
              
                  <div className="form-group">
                    <label className="checkbox-container">
                      <Field
                        type="checkbox"
                        name="terms"
                        disabled={isSubmitting}
                        className={hasFieldError(touched, errors, 'terms') ? 'error' : ''}
                      />
                      <span className="checkmark"></span>
                      J'accepte les <Link to="/conditions" className="terms-link">conditions d'utilisation</Link> et la <Link to="/privacy" className="terms-link">politique de confidentialité</Link>
                    </label>
                    {getFieldError(touched, errors, 'terms') && (
                      <div className="field-error">
                        {getFieldError(touched, errors, 'terms')}
                      </div>
                    )}
                  </div>
                  
                  <button 
                    type="submit" 
                    className="inscription-btn"
                    disabled={isSubmitting}
                    style={{ opacity: isSubmitting ? 0.7 : 1 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="loading-spinner"></div>
                        Création du compte...
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        Rejoindre l'équipe
                      </>
                    )}
                  </button>
                </Form>
              )}
            </Formik>
            
                <div className="form-footer">
                  <div className="divider">
                    <span>ou</span>
                  </div>
                  <p>Déjà membre ? <Link to="/connexion">Se connecter</Link></p>
                  <div className="social-login">
                    <button className="social-btn discord">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                      Discord
                    </button>
                    <button className="social-btn steam">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        <path d="M8.5 12c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5-3.5-1.57-3.5-3.5z"/>
                      </svg>
                      Steam
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inscription
