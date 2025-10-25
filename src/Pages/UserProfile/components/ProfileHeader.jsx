import React, { useState } from 'react'
import './ProfileHeader.css'
import DefaultAvatar from './DefaultAvatar'

function ProfileHeader({ userData, activeTab, onTabChange }) {
  const [avatarError, setAvatarError] = useState(false)
  
  // Fonction pour déterminer si on doit afficher l'avatar par défaut
  const shouldShowDefaultAvatar = () => {
    if (!userData.avatar) return true
    if (userData.avatar === '') return true
    if (userData.avatar === '/api/placeholder/150/150') return true
    if (avatarError) return true
    return false
  }

  const [showDefaultAvatar, setShowDefaultAvatar] = useState(shouldShowDefaultAvatar())

  const getUserTypeColor = (type) => {
    switch (type) {
      case 'pro': return 'var(--pro-orange)'
      case 'streamer': return 'var(--streamer-purple)'
      default: return 'var(--gaming-green)'
    }
  }

  const handleAvatarError = () => {
    console.log('Avatar failed to load, showing default avatar')
    setAvatarError(true)
    setShowDefaultAvatar(true)
  }

  const handleAvatarLoad = () => {
    console.log('Avatar loaded successfully')
    setAvatarError(false)
    setShowDefaultAvatar(false)
  }

  // Mettre à jour l'état quand les données utilisateur changent
  React.useEffect(() => {
    setShowDefaultAvatar(shouldShowDefaultAvatar())
  }, [userData.avatar, avatarError])

  const getUserTypeLabel = (type) => {
    switch (type) {
      case 'pro': return 'PRO GAMER'
      case 'streamer': return 'STREAMER'
      default: return 'GAMER'
    }
  }

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: '📊' },
    { id: 'achievements', label: 'Succès', icon: '🏆' },
    { id: 'settings', label: 'Paramètres', icon: '⚙️' }
  ]

  return (
    <div className="profile-header">
      {/* Minimalist Card Design */}
      <div className="header-card">
        {/* User Identity Card */}
        <div className="identity-card">
          <div className="avatar-section">
            <div className="avatar-wrapper">
              {showDefaultAvatar ? (
                <DefaultAvatar 
                  username={userData.username}
                  userType={userData.userType}
                  size="large"
                />
              ) : (
                <img 
                  src={userData.avatar} 
                  alt={`Avatar de ${userData.username}`}
                  className="user-avatar"
                  onError={handleAvatarError}
                  onLoad={handleAvatarLoad}
                />
              )}
              <div className="status-indicator online"></div>
            </div>
            <div className="user-info">
              <h1 className="user-name">{userData.fullName}</h1>
              <p className="user-handle">@{userData.username}</p>
              <div className="user-badges">
                <span 
                  className="user-badge"
                  style={{ 
                    backgroundColor: getUserTypeColor(userData.userType),
                    color: 'white'
                  }}
                >
                  {getUserTypeLabel(userData.userType)}
                </span>
                <span className="level-badge">Niveau {userData.level}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards Row */}
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon">🎮</div>
            <div className="stat-content">
              <div className="stat-value">{userData.stats.gamesPlayed}</div>
              <div className="stat-label">Parties</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <div className="stat-value">{userData.stats.winRate}%</div>
              <div className="stat-label">Victoires</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <div className="stat-value">{userData.stats.totalHours}h</div>
              <div className="stat-label">Heures</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💎</div>
            <div className="stat-content">
              <div className="stat-value">{userData.stats.rank}</div>
              <div className="stat-label">Rang</div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-label">Progression</span>
            <span className="progress-percentage">
              {Math.round((userData.xp / (userData.xp + userData.xpToNext)) * 100)}%
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ 
                width: `${(userData.xp / (userData.xp + userData.xpToNext)) * 100}%`,
                backgroundColor: getUserTypeColor(userData.userType)
              }}
            ></div>
          </div>
          <div className="progress-info">
            <span className="current-xp">{userData.xp.toLocaleString()} XP</span>
            <span className="next-level">Niveau {userData.level + 1} dans {userData.xpToNext} XP</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="action-btn primary">
            <span className="btn-icon">⚡</span>
            <span className="btn-text">Quick Match</span>
          </button>
          <button className="action-btn secondary">
            <span className="btn-icon">🏆</span>
            <span className="btn-text">Tournois</span>
          </button>
          <button className="action-btn tertiary">
            <span className="btn-icon">📊</span>
            <span className="btn-text">Stats</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="profile-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-text">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default ProfileHeader
