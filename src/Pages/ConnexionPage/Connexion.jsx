import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import './Connexion.css'
import Navbar from '../../Composants/Navbar/Navbar'
import { useAuth } from '../../store/hooks'
import { loginUser, clearError, forgotPassword } from '../../store/slices/authSlice'
import { formatApiError } from '../../utils/validation'
import { loginSchema, forgotPasswordSchema, initialValues, getFieldError, hasFieldError } from '../../schemas/validationSchemas'

// Gaming-themed SVG Illustrations
const GamingIllustrations = () => (
  <div className="gaming-illustrations">
    {/* Floating Gaming Elements */}
    <div className="floating-element gamepad-1">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="6" y1="11" x2="10" y2="11"/>
        <line x1="8" y1="9" x2="8" y2="13"/>
        <line x1="15" y1="12" x2="15.01" y2="12"/>
        <line x1="18" y1="10" x2="18.01" y2="10"/>
        <path d="M17.32 5H6.68a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h10.64a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z"/>
      </svg>
    </div>
    
    <div className="floating-element trophy-1">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
        <path d="M4 22h16"/>
        <path d="M10 14.66V17c0 .55.47.98.97 1.21l1.03.4c.5.23 1.03.23 1.53 0l1.03-.4c.5-.23.97-.66.97-1.21v-2.34"/>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
      </svg>
    </div>
    
    <div className="floating-element shield-1">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    </div>
    
    <div className="floating-element star-1">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    </div>
    
    <div className="floating-element server-1">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="4" rx="1"/>
        <rect x="2" y="7" width="20" height="4" rx="1"/>
        <rect x="2" y="11" width="20" height="4" rx="1"/>
        <line x1="6" y1="5" x2="6.01" y2="5"/>
        <line x1="6" y1="9" x2="6.01" y2="9"/>
        <line x1="6" y1="13" x2="6.01" y2="13"/>
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

function Connexion() {
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('')
  
  const { isAuthenticated, error, dispatch } = useAuth()
  const navigate = useNavigate()

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
    <div>
    
      <div className="connexion-page">
        <GamingIllustrations />
        <div className="connexion-container">
          <div className="connexion-header">
            <div className="header-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                <path d="M6 21v-2a4 4 0 0 1 4-4h.5"/>
              </svg>
            </div>
            <h1>Connexion</h1>
            <p>Rejoins l'élite du gaming compétitif</p>
          </div>
          
          <div className="connexion-form">
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
              initialValues={initialValues.login}
              validationSchema={loginSchema}
              onSubmit={handleLoginSubmit}
            >
              {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                <Form>
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
                    />
                    {getFieldError(touched, errors, 'email') && (
                      <div className="field-error">
                        {getFieldError(touched, errors, 'email')}
                      </div>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="password">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <circle cx="12" cy="16" r="1"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                      Mot de passe
                    </label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      disabled={isSubmitting}
                      className={hasFieldError(touched, errors, 'password') ? 'error' : ''}
                    />
                    {getFieldError(touched, errors, 'password') && (
                      <div className="field-error">
                        {getFieldError(touched, errors, 'password')}
                      </div>
                    )}
                  </div>
                  
                  <div className="form-options">
                    <label className="checkbox-container">
                      <Field
                        type="checkbox"
                        name="remember"
                        disabled={isSubmitting}
                      />
                      <span className="checkmark"></span>
                      Se souvenir de moi
                    </label>
                    <button 
                      type="button" 
                      className="forgot-password"
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="connexion-btn"
                    disabled={isSubmitting}
                    style={{ opacity: isSubmitting ? 0.7 : 1 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="loading-spinner"></div>
                        Connexion...
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                          <polyline points="10,17 15,12 10,7"/>
                          <line x1="15" y1="12" x2="3" y2="12"/>
                        </svg>
                        Entrer dans l'arène
                      </>
                    )}
                  </button>
                </Form>
              )}
            </Formik>
            
            <div className="connexion-footer">
              <div className="divider">
                <span>ou</span>
              </div>
              <p>Nouveau sur PlayWithPro ? <Link to="/inscription">Rejoindre l'équipe</Link></p>
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
