import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { useAuth } from '../../store/hooks'
import { loginUser, clearError, forgotPassword } from '../../store/slices/authSlice'
import { formatApiError } from '../../utils/validation'
import { loginSchema, forgotPasswordSchema, initialValues, getFieldError, hasFieldError } from '../../schemas/validationSchemas'
import '../../Composants/Hero/Hero.css'

// Gaming Background (same as Hero section)
const GamingBackground = () => (
  <div className="absolute inset-0">
    {/* Animated Grid Background */}
    <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
    
    {/* Neon Orbs */}
    <div className="absolute top-20 right-20 w-32 h-32 bg-cyan-400 rounded-full filter blur-3xl opacity-60 animate-pulse"></div>
    <div className="absolute bottom-32 left-16 w-24 h-24 bg-pink-400 rounded-full filter blur-2xl opacity-70 animate-pulse animation-delay-2000"></div>
    <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-green-400 rounded-full filter blur-xl opacity-50 animate-pulse animation-delay-4000"></div>
    
    {/* Scanlines Effect */}
    <div className="absolute inset-0 bg-scanlines opacity-10"></div>
    
    {/* Corner Neon Accents */}
    <div className="absolute top-0 left-0 w-32 h-1 bg-gradient-to-r from-cyan-400 to-transparent"></div>
    <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-l from-pink-400 to-transparent"></div>
    <div className="absolute bottom-0 left-0 w-32 h-1 bg-gradient-to-r from-green-400 to-transparent"></div>
    <div className="absolute bottom-0 right-0 w-32 h-1 bg-gradient-to-l from-yellow-400 to-transparent"></div>
  </div>
)

function Connexion() {
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('')
  const { user, error } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  useEffect(() => {
    return () => {
      clearError()
    }
  }, [])

  const handleLoginSubmit = async (values, { setSubmitting }) => {
    try {
      await loginUser(values)
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleForgotPasswordSubmit = async (values, { setSubmitting }) => {
    try {
      await forgotPassword(values.email)
      setForgotPasswordMessage('Un email de réinitialisation a été envoyé à votre adresse email.')
    } catch (error) {
      console.error('Forgot password error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <GamingBackground />
      
      {/* Gaming Interface */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8 pt-24">
        {/* Gaming Border Container */}
        <div className="gaming-border-container">
          <div className="gaming-border-frame">
            {/* Corner Decorations */}
            <div className="gaming-corner gaming-corner-tl"></div>
            <div className="gaming-corner gaming-corner-tr"></div>
            <div className="gaming-corner gaming-corner-bl"></div>
            <div className="gaming-corner gaming-corner-br"></div>
            
            {/* Side Borders with Animated Elements */}
            <div className="gaming-side-border gaming-side-border-top"></div>
            <div className="gaming-side-border gaming-side-border-bottom"></div>
            <div className="gaming-side-border gaming-side-border-left"></div>
            <div className="gaming-side-border gaming-side-border-right"></div>
            
            {/* Content Container */}
            <div className="gaming-content-container">
          
         
          
          {/* Gaming Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Gaming Stats */}
            <div className="space-y-8">
            
              
              {/* Feature Cards - Fun Interactive Design */}
              <div className="space-y-4">
                {/* Match avec un Pro */}
                <div className="group relative feature-card-fun">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-black/40 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-5 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:scale-[1.02] hover:-translate-y-1">
                    <div className="flex items-start space-x-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                          <span className="text-2xl animate-bounce">🎮</span>
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black animate-ping"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-bold text-lg group-hover:text-cyan-300 transition-colors">Match avec un Pro</h4>
                          <div className="flex gap-1">
                            <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 text-xs rounded-full border border-cyan-400/30">15min</span>
                            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-400/30">30min</span>
                            <span className="px-2 py-0.5 bg-pink-500/20 text-pink-300 text-xs rounded-full border border-pink-400/30">1h</span>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">Réservez un pro pour une partie et montez en compétence</p>
                        <div className="mt-2 flex items-center gap-2 text-xs text-cyan-400/70">
                          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                          <span>Pros disponibles maintenant</span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-2xl pointer-events-none"></div>
                  </div>
                </div>
                
                {/* Coaching Personnalisé */}
                <div className="group relative feature-card-fun">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-black/40 backdrop-blur-xl border border-purple-400/30 rounded-2xl p-5 hover:border-purple-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-[1.02] hover:-translate-y-1">
                    <div className="flex items-start space-x-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-400 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                          <span className="text-2xl animate-pulse">🧠</span>
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-black animate-pulse"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-bold text-lg group-hover:text-purple-300 transition-colors">Coaching Personnalisé</h4>
                          <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-300 text-xs rounded-full border border-yellow-400/30 animate-pulse">NEW</span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">Sessions d'apprentissage avec feedback détaillé et stratégies avancées</p>
                        <div className="mt-2 flex items-center gap-3 text-xs">
                          <span className="text-purple-300 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                            Expert
                          </span>
                          <span className="text-pink-300 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/></svg>
                            Sessions
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-2xl pointer-events-none"></div>
                  </div>
                </div>
                
                {/* Classements & Badges */}
                <div className="group relative feature-card-fun">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-black/40 backdrop-blur-xl border border-yellow-400/30 rounded-2xl p-5 hover:border-yellow-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] hover:scale-[1.02] hover:-translate-y-1">
                    <div className="flex items-start space-x-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/50 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                          <span className="text-2xl animate-spin-slow">🏆</span>
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full border-2 border-black animate-bounce"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-bold text-lg group-hover:text-yellow-300 transition-colors">Classements & Badges</h4>
                          <div className="flex gap-1">
                            <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-300 text-xs rounded-full border border-yellow-400/30">Gold</span>
                            <span className="px-2 py-0.5 bg-gray-500/20 text-gray-300 text-xs rounded-full border border-gray-400/30">Silver</span>
                            <span className="px-2 py-0.5 bg-orange-500/20 text-orange-300 text-xs rounded-full border border-orange-400/30">Bronze</span>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">Système de progression pour pros et joueurs avec récompenses</p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-black flex items-center justify-center text-xs">🥇</div>
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 border-2 border-black flex items-center justify-center text-xs">🥈</div>
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-600 to-orange-800 border-2 border-black flex items-center justify-center text-xs">🥉</div>
                          </div>
                          <span className="text-xs text-yellow-400/70">+12 badges débloqués</span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-bl-2xl pointer-events-none"></div>
                  </div>
                </div>
              </div>
              
          
            </div>
            
            {/* Right Side - Gaming Login Form */}
            <div className="relative">
              <div className="gaming-panel p-8">
                {/* Form Header */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-cyan-400 via-pink-500 to-green-400 rounded-2xl flex items-center justify-center shadow-2xl">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">Connexion</h2>
                  <p className="text-gray-300/70">Accède à ton univers gaming</p>
              </div>
              
                {/* Error Message */}
            {error && (
                  <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl backdrop-blur-sm relative z-10">
                    <div className="flex items-center space-x-3 text-red-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium">{formatApiError(error)}</span>
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
                        <label htmlFor="email" className="block text-sm font-medium text-cyan-300">
                      Email
                    </label>
                        <div className="relative group">
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="votre@email.com"
                      disabled={isSubmitting}
                            className={`w-full px-6 py-4 bg-black/40 border border-cyan-400/30 rounded-xl text-white placeholder-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 backdrop-blur-sm transition-all duration-300 group-hover:bg-black/60 ${
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
                          <p className="text-red-400 text-sm">{getFieldError(touched, errors, 'email')}</p>
                    )}
                  </div>
                  
                      {/* Password Field */}
                      <div className="space-y-3">
                        <label htmlFor="password" className="block text-sm font-medium text-cyan-300">
                      Mot de passe
                    </label>
                        <div className="relative group">
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      disabled={isSubmitting}
                            className={`w-full px-6 py-4 bg-black/40 border border-cyan-400/30 rounded-xl text-white placeholder-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 backdrop-blur-sm transition-all duration-300 group-hover:bg-black/60 ${
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
                          <p className="text-red-400 text-sm">{getFieldError(touched, errors, 'password')}</p>
                    )}
                  </div>
                  
                      {/* Options */}
                      <div className="flex items-center justify-between">
                     
                    <button 
                      type="button" 
                          className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>
                  
                      {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                        className="w-full liquid-glass-button-primary"
                  >
                        <div className="relative flex items-center justify-center space-x-3">
                    {isSubmitting ? (
                      <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              <span>Connexion...</span>
                      </>
                    ) : (
                      <>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                              <span>Se connecter</span>
                      </>
                    )}
                        </div>
                  </button>
                </Form>
              )}
            </Formik>
            
                {/* Footer */}
                <div className="mt-8 space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-cyan-400/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-transparent text-cyan-300/50">ou</span>
                    </div>
              </div>
                  
                  <p className="text-center text-gray-300/70">
                    Nouveau sur PlayWithPro ?{' '}
                    <Link to="/inscription" className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors duration-200">
                      Rejoindre la plateforme
                    </Link>
                  </p>
                  
                  {/* Social Login */}
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center space-x-3 py-3 px-4 bg-black/40 hover:bg-black/60 border border-cyan-400/30 rounded-xl transition-all duration-300 hover:scale-105 group">
                      <svg className="w-5 h-5 text-[#5865f2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                      <span className="text-white font-bold">Discord</span>
                </button>
                    
                    <button className="flex items-center justify-center space-x-3 py-3 px-4 bg-black/40 hover:bg-black/60 border border-cyan-400/30 rounded-xl transition-all duration-300 hover:scale-105 group">
                      <svg className="w-5 h-5 text-[#1b2838]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    <path d="M8.5 12c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5-3.5-1.57-3.5-3.5z"/>
                  </svg>
                      <span className="text-white font-bold">Steam</span>
                </button>
                  </div>
                </div>
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
              <h3>Réinitialiser le mot de passe</h3>
              <button 
                className="modal-close"
                onClick={() => setShowForgotPassword(false)}
              >
                ×
              </button>
            </div>
            
            {forgotPasswordMessage ? (
            <div className="modal-body">
                <p className="text-green-600">{forgotPasswordMessage}</p>
                <button 
                  className="btn btn-primary w-full mt-4"
                  onClick={() => setShowForgotPassword(false)}
                >
                  Fermer
                </button>
                </div>
            ) : (
              <Formik
                initialValues={initialValues.forgotPassword}
                validationSchema={forgotPasswordSchema}
                onSubmit={handleForgotPasswordSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="modal-body">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Votre adresse email"
                        disabled={isSubmitting}
                        className="form-control"
                      />
                    </div>
                    
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowForgotPassword(false)}
                        disabled={isSubmitting}
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Envoi...' : 'Envoyer'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Connexion