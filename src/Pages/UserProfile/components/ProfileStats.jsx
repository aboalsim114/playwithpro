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
      <div className="stats-header">
        <h2 className="stats-title">
          <span className="stats-icon">📊</span>
          Statistiques de jeu
        </h2>
        <p className="stats-subtitle">Vos performances en un coup d'œil</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div 
            key={stat.label}
            className="stat-card"
            style={{ '--delay': `${index * 0.1}s` }}
          >
            <div className="stat-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <div className="stat-value">
                {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
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
                    <div className="progress-fill"></div>
                  </div>
                  <span className="progress-text">{stat.value}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Favorite Game Section */}
      <div className="favorite-game-section">
        <div className="favorite-game-card">
          <div className="favorite-game-header">
            <span className="favorite-game-icon">🎯</span>
            <h3>Jeu favori</h3>
          </div>
          <div className="favorite-game-content">
            <div className="game-logo">
              <span className="game-icon">🎮</span>
            </div>
            <div className="game-info">
              <h4 className="game-name">{userData.stats.favoriteGame}</h4>
              <p className="game-description">Votre jeu le plus joué cette saison</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileStats
