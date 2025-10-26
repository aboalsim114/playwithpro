import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
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

// Gaming-themed Background Animations
const GamingBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    {/* Animated Grid Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 opacity-20 animate-pulse" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
    </div>

    {/* Floating Gaming Elements */}
    <div className="absolute top-20 left-10 animate-bounce">
      <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg rotate-45 opacity-20 animate-spin-slow">
        <svg className="w-full h-full text-white p-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
          <path d="M4 22h16"/>
          <path d="M10 14.66V17c0 .55.47.98.97 1.21l1.03.4c.5.23 1.03.23 1.53 0l1.03-.4c.5-.23.97-.66.97-1.21v-2.34"/>
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
        </svg>
      </div>
    </div>

    <div className="absolute top-40 right-20 animate-pulse">
      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full opacity-30 animate-ping">
        <svg className="w-full h-full text-white p-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
          <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
        </svg>
      </div>
    </div>

    <div className="absolute bottom-32 left-20 animate-bounce">
      <div className="w-14 h-14 bg-gradient-to-r from-yellow-400 to-orange-500 transform rotate-12 opacity-25">
        <svg className="w-full h-full text-white p-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 3h12l4 6-10 13L2 9l4-6z"/>
          <path d="M11 3L8 9l4 13 4-13-3-6"/>
          <path d="M2 9h20"/>
        </svg>
      </div>
    </div>

    <div className="absolute top-60 right-10 animate-pulse">
      <div className="w-10 h-16 bg-gradient-to-r from-green-400 to-emerald-500 opacity-20 animate-spin-slow">
        <svg className="w-full h-full text-white p-1" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.5 2L20 7.5L14.5 13"/>
          <path d="M20 7.5H4"/>
          <path d="M4 7.5L9.5 13"/>
        </svg>
      </div>
    </div>

    {/* Particle System */}
    <div className="absolute inset-0">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60 animate-ping`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>

    {/* Energy Waves */}
    <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-cyan-500/20 to-transparent animate-wave"></div>
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-purple-500/20 to-transparent animate-wave-delayed"></div>
    </div>

    {/* Glitch Effects */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500 animate-glitch-1"></div>
      <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-blue-500 animate-glitch-2"></div>
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-green-500 animate-glitch-3"></div>
    </div>

    {/* Neural Network Lines */}
    <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(0, 255, 255, 0.3)"/>
          <stop offset="50%" stopColor="rgba(155, 95, 255, 0.2)"/>
          <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)"/>
        </linearGradient>
      </defs>
      <g className="animate-pulse">
        <line x1="10" y1="20" x2="30" y2="40" stroke="url(#neuralGradient)" strokeWidth="0.5"/>
        <line x1="30" y1="40" x2="50" y2="30" stroke="url(#neuralGradient)" strokeWidth="0.5"/>
        <line x1="50" y1="30" x2="70" y2="50" stroke="url(#neuralGradient)" strokeWidth="0.5"/>
        <line x1="70" y1="50" x2="90" y2="30" stroke="url(#neuralGradient)" strokeWidth="0.5"/>
        <line x1="20" y1="60" x2="40" y2="80" stroke="url(#neuralGradient)" strokeWidth="0.5"/>
        <line x1="40" y1="80" x2="60" y2="70" stroke="url(#neuralGradient)" strokeWidth="0.5"/>
        <line x1="60" y1="70" x2="80" y2="90" stroke="url(#neuralGradient)" strokeWidth="0.5"/>
      </g>
    </svg>
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
    <div className="min-h-screen relative overflow-hidden pt-20">
      <GamingBackground />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-2 sm:p-4 lg:p-6">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
            
            {/* Left Side - Gaming Visual */}
            <div className="hidden lg:block relative">
              <div className="relative bg-gradient-to-br from-slate-900/90 via-purple-900/90 to-slate-900/90 backdrop-blur-xl rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 border border-cyan-500/20 shadow-2xl">
                {/* Gaming Header */}
                <div className="text-center mb-6 lg:mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-3 lg:mb-4 animate-pulse">
                    <svg className="w-8 h-8 lg:w-10 lg:h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                      <path d="M4 22h16"/>
                      <path d="M10 14.66V17c0 .55.47.98.97 1.21l1.03.4c.5.23 1.03.23 1.53 0l1.03-.4c.5-.23.97-.66.97-1.21v-2.34"/>
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                    </svg>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
                    Rejoins l'Élite
                  </h1>
                  <p className="text-gray-300 text-base lg:text-lg">
                    Deviens un champion e-sport
                  </p>
                </div>

                {/* Gaming Stats */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-6 lg:mb-8">
                  <div className="text-center p-2 sm:p-3 lg:p-4 bg-slate-800/50 rounded-lg border border-cyan-500/20">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-cyan-400">10K+</div>
                    <div className="text-xs sm:text-sm text-gray-400">Joueurs</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 lg:p-4 bg-slate-800/50 rounded-lg border border-purple-500/20">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-400">500+</div>
                    <div className="text-xs sm:text-sm text-gray-400">Tournois</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 lg:p-4 bg-slate-800/50 rounded-lg border border-pink-500/20">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-pink-400">50+</div>
                    <div className="text-xs sm:text-sm text-gray-400">Jeux</div>
                  </div>
                </div>

                {/* Gaming Elements */}
                <div className="relative h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-slate-800/50 to-purple-900/50 rounded-lg lg:rounded-xl overflow-hidden border border-cyan-500/20">
                  <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300FFFF' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`
                  }}></div>
                  
                  {/* Floating Gaming Icons */}
                  <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg animate-bounce">
                    <svg className="w-full h-full text-white p-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
                    </svg>
                  </div>
                  
                  <div className="absolute top-8 right-6 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse">
                    <svg className="w-full h-full text-white p-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 3h12l4 6-10 13L2 9l4-6z"/>
                    </svg>
                  </div>
                  
                  <div className="absolute bottom-6 left-8 w-7 h-7 bg-gradient-to-r from-green-400 to-emerald-500 rounded animate-spin-slow">
                    <svg className="w-full h-full text-white p-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.5 2L20 7.5L14.5 13"/>
                    </svg>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 w-5 h-5 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-ping">
                    <svg className="w-full h-full text-white p-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>

                  {/* Center Gaming Text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2 animate-pulse">
                        E-SPORT
                      </div>
                      <div className="text-sm sm:text-base lg:text-lg text-gray-300">
                        Légende en devenir
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                  <div className="flex items-center text-gray-300 text-sm sm:text-base">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 sm:mr-3 animate-pulse"></div>
                    <span>Compétitions internationales</span>
                  </div>
                  <div className="flex items-center text-gray-300 text-sm sm:text-base">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 sm:mr-3 animate-pulse"></div>
                    <span>Équipes professionnelles</span>
                  </div>
                  <div className="flex items-center text-gray-300 text-sm sm:text-base">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mr-2 sm:mr-3 animate-pulse"></div>
                    <span>Prix et récompenses</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Registration Form */}
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-xl rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 border border-cyan-500/20 shadow-2xl">
                <div className="text-center mb-6 lg:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
                    Créer un compte
                  </h2>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Rejoins la communauté gaming
                  </p>
                </div>
              
                {error && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center text-red-400 text-sm sm:text-base">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <span className="break-words">{formatApiError(error)}</span>
                    </div>
                  </div>
                )}
            
                <Formik
                  initialValues={initialValues.register}
                  validationSchema={registerSchema}
                  onSubmit={handleRegisterSubmit}
                >
                  {({ values, errors, touched, isSubmitting, setFieldValue, setFieldError, setFieldTouched }) => (
                    <Form className="space-y-4 sm:space-y-6">
                      {/* Name and Username Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-300">
                            <svg className="w-4 h-4 mr-2 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 text-sm sm:text-base ${
                              hasFieldError(touched, errors, 'name') 
                                ? 'border-red-500 focus:ring-red-500' 
                                : 'border-gray-600 hover:border-cyan-500/50'
                            }`}
                            onChange={(e) => handleFieldChange('name', e.target.value, setFieldValue, setFieldError, setFieldTouched)}
                            onBlur={(e) => handleFieldBlur('name', e.target.value, setFieldError, setFieldTouched)}
                          />
                          {getFieldError(touched, errors, 'name') && (
                            <div className="text-red-400 text-sm flex items-center">
                              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                              </svg>
                              {getFieldError(touched, errors, 'name')}
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="username" className="flex items-center text-sm font-medium text-gray-300">
                            <svg className="w-4 h-4 mr-2 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                              <circle cx="12" cy="7" r="4"/>
                              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                            Nom d'utilisateur
                          </label>
                          <div className="relative" ref={usernameInputRef}>
                            <Field
                              type="text"
                              id="username"
                              name="username"
                              placeholder="Votre pseudo gaming"
                              disabled={isSubmitting}
                              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 text-sm sm:text-base ${
                                hasFieldError(touched, errors, 'username') 
                                  ? 'border-red-500 focus:ring-red-500' 
                                  : 'border-gray-600 hover:border-purple-500/50'
                              }`}
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
                            <div className="text-red-400 text-sm flex items-center">
                              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                              </svg>
                              {getFieldError(touched, errors, 'username')}
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Email Field */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-300">
                          <svg className="w-4 h-4 mr-2 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 text-sm sm:text-base ${
                            hasFieldError(touched, errors, 'email') 
                              ? 'border-red-500 focus:ring-red-500' 
                              : 'border-gray-600 hover:border-blue-500/50'
                          }`}
                          onChange={(e) => handleFieldChange('email', e.target.value, setFieldValue, setFieldError, setFieldTouched)}
                          onBlur={(e) => handleFieldBlur('email', e.target.value, setFieldError, setFieldTouched)}
                        />
                        {getFieldError(touched, errors, 'email') && (
                          <div className="text-red-400 text-sm flex items-center">
                            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            {getFieldError(touched, errors, 'email')}
                          </div>
                        )}
                      </div>
                      {/* Password Fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-2">
                          <label htmlFor="password" className="flex items-center text-sm font-medium text-gray-300">
                            <svg className="w-4 h-4 mr-2 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                              <circle cx="12" cy="16" r="1"/>
                              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                            Mot de passe
                          </label>
                          <div className="relative">
                            <Field
                              type={showPassword ? "text" : "password"}
                              id="password"
                              name="password"
                              placeholder="••••••••"
                              disabled={isSubmitting}
                              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 bg-slate-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 text-sm sm:text-base ${
                                hasFieldError(touched, errors, 'password') 
                                  ? 'border-red-500 focus:ring-red-500' 
                                  : 'border-gray-600 hover:border-green-500/50'
                              }`}
                              onChange={(e) => handleFieldChange('password', e.target.value, setFieldValue, setFieldError, setFieldTouched)}
                              onBlur={(e) => handleFieldBlur('password', e.target.value, setFieldError, setFieldTouched)}
                            />
                            <button
                              type="button"
                              className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                              onClick={() => setShowPassword(!showPassword)}
                              disabled={isSubmitting}
                            >
                              {showPassword ? (
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                  <line x1="1" y1="1" x2="23" y2="23"/>
                                </svg>
                              ) : (
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                            <div className="text-red-400 text-sm flex items-center">
                              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                              </svg>
                              {getFieldError(touched, errors, 'password')}
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="confirmPassword" className="flex items-center text-sm font-medium text-gray-300">
                            <svg className="w-4 h-4 mr-2 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                              <circle cx="12" cy="16" r="1"/>
                              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                            Confirmer
                          </label>
                          <div className="relative">
                            <Field
                              type={showConfirmPassword ? "text" : "password"}
                              id="confirmPassword"
                              name="confirmPassword"
                              placeholder="••••••••"
                              disabled={isSubmitting}
                              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 bg-slate-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 text-sm sm:text-base ${
                                hasFieldError(touched, errors, 'confirmPassword') 
                                  ? 'border-red-500 focus:ring-red-500' 
                                  : 'border-gray-600 hover:border-orange-500/50'
                              }`}
                              onChange={(e) => handleFieldChange('confirmPassword', e.target.value, setFieldValue, setFieldError, setFieldTouched)}
                              onBlur={(e) => handleFieldBlur('confirmPassword', e.target.value, setFieldError, setFieldTouched)}
                            />
                            <button
                              type="button"
                              className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              disabled={isSubmitting}
                            >
                              {showConfirmPassword ? (
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                  <line x1="1" y1="1" x2="23" y2="23"/>
                                </svg>
                              ) : (
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                  <circle cx="12" cy="12" r="3"/>
                                </svg>
                              )}
                            </button>
                          </div>
                          {getFieldError(touched, errors, 'confirmPassword') && (
                            <div className="text-red-400 text-sm flex items-center">
                              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                              </svg>
                              {getFieldError(touched, errors, 'confirmPassword')}
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Age and Phone Fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-2">
                          <label htmlFor="age" className="flex items-center text-sm font-medium text-gray-300">
                            <svg className="w-4 h-4 mr-2 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 text-sm sm:text-base ${
                              hasFieldError(touched, errors, 'age') 
                                ? 'border-red-500 focus:ring-red-500' 
                                : 'border-gray-600 hover:border-pink-500/50'
                            }`}
                            onChange={(e) => handleFieldChange('age', e.target.value, setFieldValue, setFieldError, setFieldTouched)}
                            onBlur={(e) => handleFieldBlur('age', e.target.value, setFieldError, setFieldTouched)}
                          />
                          {getFieldError(touched, errors, 'age') && (
                            <div className="text-red-400 text-sm flex items-center">
                              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                              </svg>
                              {getFieldError(touched, errors, 'age')}
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="phone" className="flex items-center text-sm font-medium text-gray-300">
                            <svg className="w-4 h-4 mr-2 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 text-sm sm:text-base ${
                              hasFieldError(touched, errors, 'phone') 
                                ? 'border-red-500 focus:ring-red-500' 
                                : 'border-gray-600 hover:border-indigo-500/50'
                            }`}
                            onChange={(e) => handleFieldChange('phone', e.target.value, setFieldValue, setFieldError, setFieldTouched)}
                            onBlur={(e) => handleFieldBlur('phone', e.target.value, setFieldError, setFieldTouched)}
                          />
                          {getFieldError(touched, errors, 'phone') && (
                            <div className="text-red-400 text-sm flex items-center">
                              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                              </svg>
                              {getFieldError(touched, errors, 'phone')}
                            </div>
                          )}
                        </div>
                      </div>
              
                      {/* Submit Button */}
                      <button 
                        type="submit" 
                        className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 text-sm sm:text-base"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Création du compte...</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                              <circle cx="9" cy="7" r="4"/>
                              <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                            <span>Rejoindre l'équipe</span>
                          </>
                        )}
                      </button>
                </Form>
              )}
            </Formik>
            
                      {/* Footer */}
                      <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-600"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-slate-900/95 text-gray-400">ou</span>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-gray-300 text-sm sm:text-base">
                            Déjà membre ? 
                            <Link to="/connexion" className="ml-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                              Se connecter
                            </Link>
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <button className="flex items-center justify-center space-x-2 py-2.5 sm:py-3 px-3 sm:px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 text-sm sm:text-base">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                            </svg>
                            <span>Discord</span>
                          </button>
                          
                          <button className="flex items-center justify-center space-x-2 py-2.5 sm:py-3 px-3 sm:px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors duration-200 text-sm sm:text-base">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                              <path d="M8.5 12c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5-3.5-1.57-3.5-3.5z"/>
                            </svg>
                            <span>Steam</span>
                          </button>
                        </div>
                      </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes wave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes wave-delayed {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          25% { transform: translate(2px, -2px); }
          50% { transform: translate(-2px, 2px); }
          75% { transform: translate(-2px, -2px); }
        }
        
        @keyframes glitch-3 {
          0%, 100% { transform: translate(0); }
          33% { transform: translate(-2px, 2px); }
          66% { transform: translate(2px, -2px); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-wave {
          animation: wave 3s ease-in-out infinite;
        }
        
        .animate-wave-delayed {
          animation: wave-delayed 3s ease-in-out infinite 1.5s;
        }
        
        .animate-glitch-1 {
          animation: glitch-1 2s infinite;
        }
        
        .animate-glitch-2 {
          animation: glitch-2 2.5s infinite;
        }
        
        .animate-glitch-3 {
          animation: glitch-3 3s infinite;
        }
        
        /* Optimisations pour mobile */
        @media (max-width: 768px) {
          .animate-spin-slow,
          .animate-wave,
          .animate-wave-delayed,
          .animate-glitch-1,
          .animate-glitch-2,
          .animate-glitch-3 {
            animation-duration: 4s;
          }
          
          /* Réduire les animations sur mobile pour économiser la batterie */
          .animate-pulse {
            animation-duration: 3s;
          }
          
          .animate-bounce {
            animation-duration: 2s;
          }
        }
        
        /* Améliorer la performance des animations */
        .animate-spin-slow,
        .animate-wave,
        .animate-wave-delayed,
        .animate-glitch-1,
        .animate-glitch-2,
        .animate-glitch-3,
        .animate-pulse,
        .animate-bounce {
          will-change: transform;
        }
        
        /* Optimisation pour les appareils avec préférence de mouvement réduit */
        @media (prefers-reduced-motion: reduce) {
          .animate-spin-slow,
          .animate-wave,
          .animate-wave-delayed,
          .animate-glitch-1,
          .animate-glitch-2,
          .animate-glitch-3,
          .animate-pulse,
          .animate-bounce {
            animation: none;
          }
        }
        
      `}</style>
    </div>
  )
}

export default Inscription
