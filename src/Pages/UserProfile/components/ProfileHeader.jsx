import React from 'react'
import './ProfileHeader.css'

function ProfileHeader({ userData, activeTab, onTabChange }) {
  const getUserTypeColor = (type) => {
    switch (type) {
      case 'pro': return 'var(--pro-orange)'
      case 'streamer': return 'var(--streamer-purple)'
      default: return 'var(--gaming-green)'
    }
  }

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
      {/* User Info Section */}
      <div className="profile-user-info">
        <div className="profile-avatar-section">
          <div className="profile-avatar-container">
            <img 
              src={userData.avatar} 
              alt={`Avatar de ${userData.username}`}
              className="profile-avatar"
            />
            <div 
              className="profile-level-badge"
              style={{ backgroundColor: getUserTypeColor(userData.userType) }}
            >
              {userData.level}
            </div>
          </div>
          <div className="profile-user-details">
            <h1 className="profile-username">{userData.username}</h1>
            <div className="profile-user-meta">
              <span 
                className="profile-user-type"
                style={{ color: getUserTypeColor(userData.userType) }}
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

        {/* XP Progress Bar */}
        <div className="profile-xp-section">
          <div className="profile-xp-info">
            <span className="profile-xp-current">{userData.xp.toLocaleString()} XP</span>
            <span className="profile-xp-next">+{userData.xpToNext} pour le niveau {userData.level + 1}</span>
          </div>
          <div className="profile-xp-bar">
            <div 
              className="profile-xp-progress"
              style={{ 
                width: `${(userData.xp / (userData.xp + userData.xpToNext)) * 100}%`,
                backgroundColor: getUserTypeColor(userData.userType)
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
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
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default ProfileHeader
