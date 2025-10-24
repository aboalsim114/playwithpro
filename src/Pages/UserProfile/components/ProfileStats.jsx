import React from 'react'
import './ProfileStats.css'

function ProfileStats({ userData }) {
  const stats = [
    {
      label: 'Parties jouées',
      value: userData.stats.gamesPlayed,
      icon: '🎮',
      color: 'var(--gaming-green)',
      suffix: ' parties'
    },
    {
      label: 'Taux de victoire',
      value: userData.stats.winRate,
      icon: '🏆',
      color: 'var(--pro-orange)',
      suffix: '%'
    },
    {
      label: 'Heures totales',
      value: userData.stats.totalHours,
      icon: '⏱️',
      color: 'var(--accent-cyan)',
      suffix: 'h'
    },
    {
      label: 'Rang actuel',
      value: userData.stats.rank,
      icon: '💎',
      color: 'var(--streamer-purple)',
      suffix: ''
    }
  ]

  const getWinRateColor = (rate) => {
    if (rate >= 80) return 'var(--gaming-green)'
    if (rate >= 60) return 'var(--pro-orange)'
    return 'var(--danger-red)'
  }

  return (
    <div className="profile-stats">
      {/* Enhanced Gaming Background */}
      <div className="stats-bg-effects">
        <div className="stats-particles"></div>
        <div className="stats-grid-pattern"></div>
      </div>

      <div className="stats-header">
        <h2 className="stats-title">
          <span className="stats-icon">📊</span>
          <span className="stats-text">Statistiques de jeu</span>
          <div className="stats-glow"></div>
        </h2>
        <p className="stats-subtitle">Vos performances en un coup d'œil</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div 
            key={stat.label}
            className="stat-card"
            style={{ 
              '--delay': `${index * 0.1}s`,
              '--stat-color': stat.color
            }}
          >
            <div className="stat-card-glow"></div>
            <div className="stat-icon-container">
              <div className="stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-icon-ring"></div>
            </div>
            <div className="stat-content">
              <div className="stat-value">
                <span className="stat-number">
                  {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                </span>
                <span className="stat-suffix">{stat.suffix}</span>
              </div>
              <div className="stat-label">{stat.label}</div>
              {stat.label === 'Taux de victoire' && (
                <div 
                  className="stat-progress"
                  style={{ 
                    '--progress': `${stat.value}%`,
                    '--color': getWinRateColor(stat.value)
                  }}
                >
                  <div className="progress-bar">
                    <div className="progress-fill">
                      <div className="progress-shine"></div>
                    </div>
                    <div className="progress-particles"></div>
                  </div>
                  <span className="progress-text">{stat.value}%</span>
                </div>
              )}
            </div>
            <div className="stat-card-border"></div>
          </div>
        ))}
      </div>

      {/* Enhanced Favorite Game Section */}
      <div className="favorite-game-section">
        <div className="favorite-game-card">
          <div className="game-card-glow"></div>
          <div className="favorite-game-header">
            <div className="favorite-game-icon-container">
              <span className="favorite-game-icon">🎯</span>
              <div className="icon-pulse"></div>
            </div>
            <h3>Jeu favori</h3>
          </div>
          <div className="favorite-game-content">
            <div className="game-logo">
              <div className="game-logo-bg"></div>
              <span className="game-icon">🎮</span>
              <div className="game-logo-glow"></div>
            </div>
            <div className="game-info">
              <h4 className="game-name">{userData.stats.favoriteGame}</h4>
              <p className="game-description">Votre jeu le plus joué cette saison</p>
              <div className="game-stats">
                <div className="game-stat">
                  <span className="game-stat-label">Temps joué</span>
                  <span className="game-stat-value">342h</span>
                </div>
                <div className="game-stat">
                  <span className="game-stat-label">Victoires</span>
                  <span className="game-stat-value">127</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileStats
