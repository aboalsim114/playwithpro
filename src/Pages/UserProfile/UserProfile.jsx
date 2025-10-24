import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './UserProfile.css'

// Import des composants modulaires
import ProfileHeader from './components/ProfileHeader'
import ProfileStats from './components/ProfileStats'
import ProfileGames from './components/ProfileGames'
import ProfileAchievements from './components/ProfileAchievements'
import ProfileSettings from './components/ProfileSettings'
import LoadingSpinner from './components/LoadingSpinner'
import AvatarDemo from './components/AvatarDemo'

function UserProfile() {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  // Simulation du chargement des données utilisateur
  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true)
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Données simulées pour la démo
      // Test différents scénarios d'avatar selon l'ID
      const avatarScenarios = {
        '1': null, // Pas d'avatar
        '2': '', // Avatar vide
        '3': '/api/placeholder/150/150', // Placeholder
        '4': 'https://invalid-url.com/avatar.jpg', // URL invalide
        '5': 'https://via.placeholder.com/150/00ff88/ffffff?text=GP', // Avatar valide
      }
      
      setUserData({
        id: id,
        username: 'GamerPro_' + id,
        fullName: 'Alexandre Dubois',
        email: 'alex.dubois@email.com',
        avatar: avatarScenarios[id] || null, // Test différents scénarios
        joinDate: '2024-01-15',
        userType: 'pro', // 'gamer', 'pro', 'streamer'
        level: 42,
        xp: 15420,
        xpToNext: 580,
        stats: {
          gamesPlayed: 127,
          winRate: 78.5,
          totalHours: 342,
          rank: 'Diamond III',
          favoriteGame: 'Valorant'
        },
        achievements: [
          { id: 1, name: 'First Victory', icon: '🏆', unlocked: true, date: '2024-01-16' },
          { id: 2, name: 'Win Streak', icon: '🔥', unlocked: true, date: '2024-02-03' },
          { id: 3, name: 'Pro Gamer', icon: '💎', unlocked: false, date: null }
        ],
        recentGames: [
          { id: 1, name: 'Valorant', result: 'Victory', duration: '32:15', date: '2024-03-15' },
          { id: 2, name: 'CS2', result: 'Defeat', duration: '28:42', date: '2024-03-14' },
          { id: 3, name: 'League of Legends', result: 'Victory', duration: '45:30', date: '2024-03-13' }
        ]
      })
      setIsLoading(false)
    }

    loadUserData()
  }, [id])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!userData) {
    return (
      <div className="user-profile">
        <div className="profile-error">
          <h2>Utilisateur non trouvé</h2>
          <p>L'utilisateur avec l'ID #{id} n'existe pas.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="user-profile">
      {/* Enhanced Gaming Background Effects */}
      <div className="profile-background">
        <div className="neural-network"></div>
        <div className="energy-waves"></div>
        <div className="floating-particles"></div>
        <div className="cyber-grid"></div>
        <div className="holographic-overlay"></div>
      </div>

      <div className="profile-container">
        {/* Gaming Header with enhanced effects */}
        <ProfileHeader 
          userData={userData}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Advanced Flexible Gaming Layout */}
        <div className="profile-main-content">
          {activeTab === 'overview' && (
            <div className="advanced-dashboard">
              {/* Top Stats Banner */}
              <div className="stats-banner">
                <div className="banner-stats">
                  <div className="banner-stat-item">
                    <div className="stat-icon">🎮</div>
                    <div className="stat-info">
                      <div className="stat-number">{userData.stats.gamesPlayed}</div>
                      <div className="stat-label">Parties</div>
                    </div>
                    <div className="stat-trend positive">+12%</div>
                  </div>
                  <div className="banner-stat-item">
                    <div className="stat-icon">🏆</div>
                    <div className="stat-info">
                      <div className="stat-number">{userData.stats.winRate}%</div>
                      <div className="stat-label">Victoires</div>
                    </div>
                    <div className="stat-trend positive">+5%</div>
                  </div>
                  <div className="banner-stat-item">
                    <div className="stat-icon">⏱️</div>
                    <div className="stat-info">
                      <div className="stat-number">{userData.stats.totalHours}h</div>
                      <div className="stat-label">Heures</div>
                    </div>
                    <div className="stat-trend positive">+8h</div>
                  </div>
                  <div className="banner-stat-item">
                    <div className="stat-icon">💎</div>
                    <div className="stat-info">
                      <div className="stat-number">{userData.stats.rank}</div>
                      <div className="stat-label">Rang</div>
                    </div>
                    <div className="stat-trend positive">↑2</div>
                  </div>
                </div>
                <div className="banner-actions">
                  <button className="banner-action-btn primary">
                    <span className="btn-icon">⚡</span>
                    <span className="btn-text">Quick Match</span>
                  </button>
                  <button className="banner-action-btn secondary">
                    <span className="btn-icon">🏆</span>
                    <span className="btn-text">Tournaments</span>
                  </button>
                </div>
              </div>

              {/* Adaptive Content Grid */}
              <div className="adaptive-grid">
                {/* Main Content Area */}
                <div className="main-content-area">
                  <div className="content-module stats-module">
                    <ProfileStats userData={userData} />
                  </div>
                  <div className="content-module games-module">
                    <ProfileGames userData={userData} />
                  </div>
                </div>

                {/* Sidebar Area */}
                <div className="sidebar-area">
                  <div className="sidebar-module quick-actions-module">
                    <div className="module-header">
                      <h3>Actions Rapides</h3>
                      <div className="module-indicator"></div>
                    </div>
                    <div className="quick-actions-list">
                      <div className="quick-action-item">
                        <div className="action-icon">⚡</div>
                        <div className="action-content">
                          <div className="action-title">Quick Match</div>
                          <div className="action-subtitle">Partie rapide</div>
                        </div>
                        <div className="action-arrow">→</div>
                      </div>
                      <div className="quick-action-item">
                        <div className="action-icon">🏆</div>
                        <div className="action-content">
                          <div className="action-title">Tournaments</div>
                          <div className="action-subtitle">Compétitions</div>
                        </div>
                        <div className="action-arrow">→</div>
                      </div>
                      <div className="quick-action-item">
                        <div className="action-icon">📊</div>
                        <div className="action-content">
                          <div className="action-title">Analytics</div>
                          <div className="action-subtitle">Statistiques</div>
                        </div>
                        <div className="action-arrow">→</div>
                      </div>
                      <div className="quick-action-item">
                        <div className="action-icon">🎯</div>
                        <div className="action-content">
                          <div className="action-title">Training</div>
                          <div className="action-subtitle">Entraînement</div>
                        </div>
                        <div className="action-arrow">→</div>
                      </div>
                    </div>
                  </div>

                  <div className="sidebar-module activity-module">
                    <div className="module-header">
                      <h3>Activité Live</h3>
                      <div className="live-status">
                        <div className="status-dot"></div>
                        <span>En ligne</span>
                      </div>
                    </div>
                    <div className="activity-timeline">
                      <div className="timeline-item">
                        <div className="timeline-icon">🎮</div>
                        <div className="timeline-content">
                          <div className="timeline-text">Partie en cours sur <strong>Valorant</strong></div>
                          <div className="timeline-time">Il y a 2 min</div>
                        </div>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-icon">🏆</div>
                        <div className="timeline-content">
                          <div className="timeline-text">Victoire contre <strong>ProGamer123</strong></div>
                          <div className="timeline-time">Il y a 15 min</div>
                        </div>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-icon">📈</div>
                        <div className="timeline-content">
                          <div className="timeline-text">Nouveau rang: <strong>Diamond III</strong></div>
                          <div className="timeline-time">Il y a 1h</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sidebar-module achievements-preview">
                    <div className="module-header">
                      <h3>Succès Récents</h3>
                      <div className="achievement-count">3/5</div>
                    </div>
                    <div className="achievements-grid">
                      <div className="achievement-item unlocked">
                        <div className="achievement-icon">🏆</div>
                        <div className="achievement-name">First Victory</div>
                      </div>
                      <div className="achievement-item unlocked">
                        <div className="achievement-icon">🔥</div>
                        <div className="achievement-name">Win Streak</div>
                      </div>
                      <div className="achievement-item locked">
                        <div className="achievement-icon">💎</div>
                        <div className="achievement-name">Pro Gamer</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'achievements' && (
            <div className="achievements-section">
              <ProfileAchievements achievements={userData.achievements} />
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="settings-section">
              <ProfileSettings userData={userData} />
            </div>
          )}
          
          {/* Démonstration des avatars par défaut */}
          {activeTab === 'overview' && (
            <div className="avatar-demo-section">
              <AvatarDemo />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
