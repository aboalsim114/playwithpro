import React from 'react'
import './ProfileGames.css'

function ProfileGames({ userData }) {
  const getResultColor = (result) => {
    switch (result.toLowerCase()) {
      case 'victory': return 'var(--gaming-green)'
      case 'defeat': return 'var(--danger-red)'
      default: return 'var(--text-secondary)'
    }
  }

  const getResultIcon = (result) => {
    switch (result.toLowerCase()) {
      case 'victory': return '🏆'
      case 'defeat': return '💔'
      default: return '⚔️'
    }
  }

  const formatDuration = (duration) => {
    return duration
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Hier'
    if (diffDays === 2) return 'Il y a 2 jours'
    if (diffDays <= 7) return `Il y a ${diffDays} jours`
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
  }

  return (
    <div className="profile-games">
      <div className="games-header">
        <h2 className="games-title">
          <span className="games-icon">🎮</span>
          Parties récentes
        </h2>
        <p className="games-subtitle">Vos dernières performances</p>
      </div>

      <div className="games-list">
        {userData.recentGames.map((game, index) => (
          <div 
            key={game.id}
            className="game-item"
            style={{ '--delay': `${index * 0.1}s` }}
          >
            <div className="game-main-info">
              <div className="game-icon-section">
                <span className="game-icon">🎯</span>
              </div>
              <div className="game-details">
                <h3 className="game-name">{game.name}</h3>
                <div className="game-meta">
                  <span className="game-duration">
                    <span className="meta-icon">⏱️</span>
                    {formatDuration(game.duration)}
                  </span>
                  <span className="game-date">
                    <span className="meta-icon">📅</span>
                    {formatDate(game.date)}
                  </span>
                </div>
              </div>
            </div>

            <div className="game-result">
              <div 
                className="result-badge"
                style={{ 
                  backgroundColor: getResultColor(game.result),
                  color: 'white'
                }}
              >
                <span className="result-icon">{getResultIcon(game.result)}</span>
                <span className="result-text">{game.result}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="games-actions">
        <button className="action-button primary">
          <span className="button-icon">🚀</span>
          Nouvelle partie
        </button>
        <button className="action-button secondary">
          <span className="button-icon">📊</span>
          Voir toutes les statistiques
        </button>
      </div>

      {/* Performance Summary */}
      <div className="performance-summary">
        <div className="summary-header">
          <h3>Résumé des performances</h3>
        </div>
        <div className="summary-stats">
          <div className="summary-stat">
            <span className="stat-label">Victoires</span>
            <span className="stat-value" style={{ color: 'var(--gaming-green)' }}>
              {userData.recentGames.filter(g => g.result === 'Victory').length}
            </span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">Défaites</span>
            <span className="stat-value" style={{ color: 'var(--danger-red)' }}>
              {userData.recentGames.filter(g => g.result === 'Defeat').length}
            </span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">Temps total</span>
            <span className="stat-value" style={{ color: 'var(--accent-cyan)' }}>
              {userData.recentGames.reduce((total, game) => {
                const [minutes, seconds] = game.duration.split(':').map(Number)
                return total + minutes + seconds / 60
              }, 0).toFixed(1)}h
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileGames
