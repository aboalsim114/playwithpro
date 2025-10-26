import React from 'react'
import './NotFound.css'

function NotFound() {
  return (
    <div className="not-found-container pt-20">
      {/* Background avec effet de liquid glass */}
      <div className="liquid-glass-background">
        <div className="glass-blob blob-1"></div>
        <div className="glass-blob blob-2"></div>
        <div className="glass-blob blob-3"></div>
        <div className="glass-blob blob-4"></div>
      </div>

      {/* Contenu principal */}
      <div className="not-found-content">
        <div className="glass-card">
          <div className="error-code">
            <span className="code-number">4</span>
            <div className="code-zero">
              <div className="zero-ring"></div>
            </div>
            <span className="code-number">4</span>
          </div>
          
          <h1 className="error-title">Page non trouvée</h1>
          <p className="error-description">
            Désolé, la page que vous recherchez semble avoir disparu dans les limbes du cyberespace.
          </p>
          
          <div className="error-actions">
            <button className="glass-button primary">
              <span>Retour à l'accueil</span>
              <div className="button-glow"></div>
            </button>
            <button className="glass-button secondary">
              <span>Page précédente</span>
            </button>
          </div>
        </div>

        {/* Éléments décoratifs */}
        <div className="floating-elements">
          <div className="floating-icon">🔍</div>
          <div className="floating-icon">💫</div>
          <div className="floating-icon">🌌</div>
          <div className="floating-icon">✨</div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
