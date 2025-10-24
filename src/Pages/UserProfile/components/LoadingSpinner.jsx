import React from 'react'
import './LoadingSpinner.css'

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="loading-background">
        <div className="neural-network"></div>
        <div className="energy-waves"></div>
        <div className="floating-particles"></div>
      </div>
      
      <div className="loading-content">
        <div className="loading-spinner">
          <div className="spinner-ring">
            <div className="spinner-ring-inner"></div>
          </div>
          <div className="spinner-glow"></div>
        </div>
        
        <div className="loading-text">
          <h2 className="loading-title">Chargement du profil</h2>
          <p className="loading-subtitle">Récupération des données utilisateur...</p>
        </div>
        
        <div className="loading-progress">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <span className="progress-text">Chargement en cours...</span>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner
