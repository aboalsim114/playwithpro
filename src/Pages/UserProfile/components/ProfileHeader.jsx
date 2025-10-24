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
      {/* Enhanced Gaming Header */}
      <div className="gaming-header-bg">
        <div className="cyber-pattern"></div>
        <div className="energy-lines"></div>
      </div>

      {/* User Info Section */}
      <div className="profile-user-info">
        <div className="profile-avatar-section">
          <div className="profile-avatar-container">
            <div className="avatar-ring"></div>
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
                className="profile-avatar"
                onError={handleAvatarError}
                onLoad={handleAvatarLoad}
              />
            )}
            <div 
              className="profile-level-badge"
              style={{ 
                backgroundColor: getUserTypeColor(userData.userType),
                boxShadow: `0 0 20px ${getUserTypeColor(userData.userType)}`
              }}
            >
              <span className="level-number">{userData.level}</span>
              <div className="level-glow"></div>
            </div>
            <div className="user-type-indicator">
              <div 
                className="type-glow"
                style={{ backgroundColor: getUserTypeColor(userData.userType) }}
              ></div>
            </div>
          </div>
          <div className="profile-user-details">
            <h1 className="profile-username">
              <span className="username-text">{userData.username}</span>
              <div className="username-glow"></div>
            </h1>
            <div className="profile-user-meta">
              <span 
                className="profile-user-type"
                style={{ 
                  color: getUserTypeColor(userData.userType),
                  textShadow: `0 0 10px ${getUserTypeColor(userData.userType)}`
                }}
              >
                {getUserTypeLabel(userData.userType)}
              </span>
              <span className="profile-join-date">
                Membre depuis {new Date(userData.joinDate).toLocaleDateString('fr-FR', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced XP Progress Section */}
        <div className="profile-xp-section">
          <div className="xp-header">
            <div className="xp-icon">⚡</div>
            <span className="xp-label">EXPÉRIENCE</span>
          </div>
          <div className="profile-xp-info">
            <span className="profile-xp-current">
              {userData.xp.toLocaleString()} XP
            </span>
            <span className="profile-xp-next">
              +{userData.xpToNext} pour le niveau {userData.level + 1}
            </span>
          </div>
          <div className="profile-xp-bar">
            <div 
              className="profile-xp-progress"
              style={{ 
                width: `${(userData.xp / (userData.xp + userData.xpToNext)) * 100}%`,
                backgroundColor: getUserTypeColor(userData.userType),
                boxShadow: `0 0 15px ${getUserTypeColor(userData.userType)}`
              }}
            >
              <div className="xp-shine"></div>
            </div>
            <div className="xp-particles"></div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Tabs */}
      <nav className="profile-nav" role="tablist">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`profile-nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
          >
            <div className="tab-glow"></div>
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
            <div className="tab-indicator"></div>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default ProfileHeader
