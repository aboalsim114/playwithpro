import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { useAuth } from '../../store/hooks'
import { loginUser, clearError, forgotPassword } from '../../store/slices/authSlice'
import { formatApiError } from '../../utils/validation'
import { loginSchema, forgotPasswordSchema, initialValues, getFieldError, hasFieldError } from '../../schemas/validationSchemas'
import './HolographicStyles.css'

// Holographic Gaming Background
const HolographicBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Holographic Grid */}
    <div className="absolute inset-0 opacity-20">
      <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
        {Array.from({ length: 400 }).map((_, i) => (
          <div key={i} className="border border-cyan-400/10 animate-pulse" style={{ animationDelay: `${i * 0.01}s` }}></div>
        ))}
      </div>
    </div>
    
    {/* Floating Holographic Cubes */}
    <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-cyan-400/30 to-blue-500/20 transform rotate-45 animate-holographic-float-1"></div>
    <div className="absolute top-40 right-32 w-12 h-12 bg-gradient-to-br from-purple-400/30 to-pink-500/20 transform rotate-45 animate-holographic-float-2"></div>
    <div className="absolute bottom-32 left-1/3 w-14 h-14 bg-gradient-to-br from-emerald-400/30 to-teal-500/20 transform rotate-45 animate-holographic-float-3"></div>
    <div className="absolute bottom-20 right-1/4 w-10 h-10 bg-gradient-to-br from-yellow-400/30 to-orange-500/20 transform rotate-45 animate-holographic-float-4"></div>
    <div className="absolute top-1/2 left-1/4 w-18 h-18 bg-gradient-to-br from-red-400/30 to-pink-500/20 transform rotate-45 animate-holographic-float-5"></div>
    
    {/* Energy Beams */}
    <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-energy-beam-1"></div>
    <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-400/40 to-transparent animate-energy-beam-2"></div>
    <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-emerald-400/40 to-transparent animate-energy-beam-3"></div>
    
    {/* Holographic Rings */}
    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-cyan-400/20 rounded-full animate-holographic-ring-1"></div>
    <div className="absolute top-3/4 right-1/4 w-48 h-48 border border-purple-400/20 rounded-full animate-holographic-ring-2"></div>
    <div className="absolute bottom-1/4 left-1/4 w-32 h-32 border border-emerald-400/20 rounded-full animate-holographic-ring-3"></div>
    
    {/* Digital Rain Effect */}
    <div className="absolute inset-0 opacity-10">
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className="absolute text-cyan-400 font-mono text-xs animate-digital-rain" style={{ 
          left: `${i * 3.33}%`, 
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${3 + Math.random() * 4}s`
        }}>
          {Array.from({ length: 20 }).map((_, j) => (
            <div key={j} className="opacity-70" style={{ animationDelay: `${j * 0.1}s` }}>
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>
      ))}
    </div>
    
    {/* Holographic Scan Lines */}
    <div className="absolute inset-0">
      <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-scan-line-1"></div>
      <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-scan-line-2"></div>
    </div>
  </div>
)

function Connexion() {
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('')
  
  const { isAuthenticated, error, dispatch } = useAuth()
  const navigate = useNavigate()

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dash-user')
    }
  }, [isAuthenticated, navigate])

  // Nettoyer les erreurs quand le composant se monte
  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const handleLoginSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      await dispatch(loginUser({
        email: values.email,
        password: values.password,
        rememberMe: values.remember
      })).unwrap()
      
      // La redirection se fera automatiquement via useEffect
    } catch (error) {
      console.error('Erreur de connexion:', error)
      
      // Gérer les erreurs spécifiques aux champs
      if (error.message?.includes('email')) {
        setFieldError('email', 'Email ou mot de passe incorrect')
      } else if (error.message?.includes('password')) {
        setFieldError('password', 'Email ou mot de passe incorrect')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleForgotPasswordSubmit = async (values, { setSubmitting, resetForm }) => {
    setForgotPasswordMessage('')
    
    try {
      await dispatch(forgotPassword(values.email)).unwrap()
      setForgotPasswordMessage('Email de réinitialisation envoyé ! Vérifiez votre boîte de réception.')
      resetForm()
    } catch (error) {
      setForgotPasswordMessage(formatApiError(error))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <HolographicBackground />
      
      {/* Holographic Gaming Interface */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl mx-auto">
          
          {/* Holographic Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-black/60 backdrop-blur-xl border border-cyan-400/30 rounded-full mb-8 relative">
              <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
              <span className="text-cyan-400 text-sm font-bold tracking-wider">SYSTÈME HOLOGRAPHIQUE ACTIF</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-transparent rounded-full animate-pulse"></div>
            </div>
       
            
          
          </div>
          
          {/* Holographic Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Holographic Data Panel */}
            <div className="space-y-8">
              {/* System Status */}
              <div className="bg-black/60 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-transparent animate-pulse"></div>
                <div className="relative z-10">
                  <h3 className="text-cyan-400 text-lg font-bold mb-4 flex items-center gap-3">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                    STATUT SYSTÈME
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/40 border border-cyan-400/20 rounded-lg p-4">
                      <div className="text-2xl font-bold text-cyan-400">50K+</div>
                      <div className="text-cyan-300/70 text-sm font-mono">JOUEURS_ACTIFS</div>
                    </div>
                    <div className="bg-black/40 border border-purple-400/20 rounded-lg p-4">
                      <div className="text-2xl font-bold text-purple-400">100+</div>
                      <div className="text-purple-300/70 text-sm font-mono">TOURNOIS</div>
                    </div>
                    <div className="bg-black/40 border border-emerald-400/20 rounded-lg p-4">
                      <div className="text-2xl font-bold text-emerald-400">€1M+</div>
                      <div className="text-emerald-300/70 text-sm font-mono">PRIX_DISTRIBUÉS</div>
                    </div>
                    <div className="bg-black/40 border border-yellow-400/20 rounded-lg p-4">
                      <div className="text-2xl font-bold text-yellow-400">24/7</div>
                      <div className="text-yellow-300/70 text-sm font-mono">SUPPORT</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Holographic Features */}
              <div className="space-y-4">
                <div className="bg-black/60 backdrop-blur-xl border border-purple-400/30 rounded-2xl p-6 hover:border-purple-400/50 transition-all duration-300 group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">PERFORMANCE</div>
                      <div className="text-purple-300/70 text-sm font-mono">Ultra-rapide</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/60 backdrop-blur-xl border border-emerald-400/30 rounded-2xl p-6 hover:border-emerald-400/50 transition-all duration-300 group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">SÉCURITÉ</div>
                      <div className="text-emerald-300/70 text-sm font-mono">Protection maximale</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Holographic Login Interface */}
            <div className="relative">
              <div className="bg-black/60 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                {/* Holographic Scan Lines */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-scan-line-1"></div>
                  <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent animate-scan-line-2"></div>
                  <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent animate-scan-line-1"></div>
                </div>
                
                {/* Interface Header */}
                <div className="text-center mb-8 relative z-10">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-cyan-400 via-purple-500 to-emerald-400 rounded-2xl flex items-center justify-center shadow-2xl relative">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-emerald-400/20 rounded-2xl animate-pulse"></div>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2 font-mono">ACCÈS_SYSTÈME</h2>
                  <p className="text-cyan-300/70 font-mono">&gt; Authentification requise</p>
                </div>
                
                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm relative z-10">
                    <div className="flex items-center space-x-3 text-red-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium font-mono">{formatApiError(error)}</span>
                    </div>
                  </div>
                )}
                
                <Formik
                  initialValues={initialValues.login}
                  validationSchema={loginSchema}
                  onSubmit={handleLoginSubmit}
                >
                  {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                    <Form className="space-y-6 relative z-10">
                      {/* Email Field */}
                      <div className="space-y-3">
                        <label htmlFor="email" className="block text-sm font-medium text-cyan-300 font-mono">
                          &gt; IDENTIFIANT_EMAIL
                        </label>
                        <div className="relative group">
                          <Field
                            type="email"
                            id="email"
                            name="email"
                            placeholder="user@playwithpro.com"
                            disabled={isSubmitting}
                            className={`w-full px-6 py-4 bg-black/40 border border-cyan-400/30 rounded-xl text-white placeholder-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 backdrop-blur-sm transition-all duration-300 font-mono group-hover:bg-black/60 ${
                              hasFieldError(touched, errors, 'email') 
                                ? 'border-red-500 ring-2 ring-red-500/20' 
                                : ''
                            }`}
                          />
                          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                            <svg className="w-5 h-5 text-cyan-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                          </div>
                        </div>
                        {getFieldError(touched, errors, 'email') && (
                          <p className="text-red-400 text-sm font-mono">{getFieldError(touched, errors, 'email')}</p>
                        )}
                      </div>
                      
                      {/* Password Field */}
                      <div className="space-y-3">
                        <label htmlFor="password" className="block text-sm font-medium text-cyan-300 font-mono">
                          &gt; MOT_DE_PASSE
                        </label>
                        <div className="relative group">
                          <Field
                            type="password"
                            id="password"
                            name="password"
                            placeholder="••••••••••••"
                            disabled={isSubmitting}
                            className={`w-full px-6 py-4 bg-black/40 border border-cyan-400/30 rounded-xl text-white placeholder-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 backdrop-blur-sm transition-all duration-300 font-mono group-hover:bg-black/60 ${
                              hasFieldError(touched, errors, 'password') 
                                ? 'border-red-500 ring-2 ring-red-500/20' 
                                : ''
                            }`}
                          />
                          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                            <svg className="w-5 h-5 text-cyan-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </div>
                        </div>
                        {getFieldError(touched, errors, 'password') && (
                          <p className="text-red-400 text-sm font-mono">{getFieldError(touched, errors, 'password')}</p>
                        )}
                      </div>
                      
                      {/* Options */}
                      <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-3 text-sm text-cyan-300/80 cursor-pointer font-mono">
                          <Field
                            type="checkbox"
                            name="remember"
                            disabled={isSubmitting}
                            className="w-5 h-5 text-cyan-400 bg-black/40 border-cyan-400/30 rounded focus:ring-cyan-400/50 focus:ring-2"
                          />
                          <span>SE_SOUVENIR</span>
                        </label>
                        <button 
                          type="button" 
                          className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200 font-mono"
                          onClick={() => setShowForgotPassword(true)}
                        >
                          MOT_DE_PASSE_OUBLIÉ?
                        </button>
                      </div>
                      
                      {/* Submit Button */}
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 hover:from-cyan-600 hover:via-purple-600 hover:to-emerald-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group font-mono tracking-wider"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative flex items-center justify-center space-x-3">
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              <span>AUTHENTIFICATION...</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                              </svg>
                              <span>SE_CONNECTER</span>
                            </>
                          )}
                        </div>
                      </button>
                    </Form>
                  )}
                </Formik>
                
                {/* Footer */}
                <div className="mt-8 space-y-6 relative z-10">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-cyan-400/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-transparent text-cyan-300/50 font-mono">OU</span>
                    </div>
                  </div>
                  
                  <p className="text-center text-cyan-300/70 font-mono">
                    NOUVEAU_UTILISATEUR?{' '}
                    <Link to="/inscription" className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors duration-200">
                      REJOINDRE_LE_SYSTÈME
                    </Link>
                  </p>
                  
                  {/* Social Login */}
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center space-x-3 py-3 px-4 bg-black/40 hover:bg-black/60 border border-cyan-400/30 rounded-xl transition-all duration-300 hover:scale-105 group">
                      <svg className="w-5 h-5 text-[#5865f2]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                      <span className="text-white font-bold font-mono">DISCORD</span>
                    </button>
                    
                    <button className="flex items-center justify-center space-x-3 py-3 px-4 bg-black/40 hover:bg-black/60 border border-cyan-400/30 rounded-xl transition-all duration-300 hover:scale-105 group">
                      <svg className="w-5 h-5 text-[#1b2838]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        <path d="M8.5 12c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5-3.5-1.57-3.5-3.5z"/>
                      </svg>
                      <span className="text-white font-bold font-mono">STEAM</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de réinitialisation de mot de passe */}
      {showForgotPassword && (
        <div className="modal-overlay" onClick={() => setShowForgotPassword(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Mot de passe oublié</h3>
              <button 
                className="modal-close"
                onClick={() => setShowForgotPassword(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <p>Entrez votre adresse email pour recevoir un lien de réinitialisation.</p>
              
              {forgotPasswordMessage && (
                <div className={`message ${forgotPasswordMessage.includes('envoyé') ? 'success' : 'error'}`}>
                  {forgotPasswordMessage}
                </div>
              )}
              
              <Formik
                initialValues={initialValues.forgotPassword}
                validationSchema={forgotPasswordSchema}
                onSubmit={handleForgotPasswordSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="forgot-email">Email</label>
                      <Field
                        type="email"
                        id="forgot-email"
                        name="email"
                        placeholder="votre@email.com"
                        disabled={isSubmitting}
                        className={hasFieldError(touched, errors, 'email') ? 'error' : ''}
                      />
                      {getFieldError(touched, errors, 'email') && (
                        <div className="field-error">
                          {getFieldError(touched, errors, 'email')}
                        </div>
                      )}
                    </div>
                    
                    <div className="modal-actions">
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => setShowForgotPassword(false)}
                        disabled={isSubmitting}
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="btn-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Envoi...' : 'Envoyer'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Connexion
