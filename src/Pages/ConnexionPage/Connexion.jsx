import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Connexion.css'
import Navbar from '../../Composants/Navbar/Navbar'
import { useAuth } from '../../store/hooks'
import { loginUser, clearError } from '../../store/slices/authSlice'

function Connexion() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  })
  
  const { isAuthenticated, loading, error, dispatch } = useAuth()
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      return
    }

    try {
      await dispatch(loginUser({
        email: formData.email,
        password: formData.password
      })).unwrap()
      
      // La redirection se fera automatiquement via useEffect
    } catch (error) {
      console.error('Erreur de connexion:', error)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="connexion-page">
        <div className="connexion-container">
          <div className="connexion-header">
            <h1>Connexion</h1>
            <p>Connecte-toi à ton compte PlayWithPro</p>
          </div>
          
          <div className="connexion-form">
            {error && (
              <div className="error-message" style={{
                backgroundColor: '#fee',
                color: '#c33',
                padding: '10px',
                borderRadius: '4px',
                marginBottom: '20px',
                border: '1px solid #fcc'
              }}>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  value={formData.password}
                  onChange={handleInputChange}
                  required 
                  disabled={loading}
                />
              </div>
              
              <div className="form-options">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    name="remember" 
                    checked={formData.remember}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                  <span className="checkmark"></span>
                  Se souvenir de moi
                </label>
                <a href="#" className="forgot-password">Mot de passe oublié ?</a>
              </div>
              
              <button 
                type="submit" 
                className="connexion-btn"
                disabled={loading}
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>
            
            <div className="connexion-footer">
              <p>Pas encore de compte ? <a href="/inscription">S'inscrire</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Connexion
