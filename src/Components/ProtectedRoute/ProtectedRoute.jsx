import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../store/hooks'
import './ProtectedRoute.css'

const ProtectedRoute = ({ children, redirectTo = '/connexion' }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  // Afficher un loader pendant la vérification de l'authentification
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p className="loading-text">Vérification de l'authentification...</p>
        </div>
      </div>
    )
  }

  // Si pas authentifié, rediriger vers la page de connexion
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  // Si authentifié, afficher le composant enfant
  return children
}

export default ProtectedRoute
