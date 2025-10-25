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
        

              {/* Main Content Grid - Single Column Layout */}
              <div className="main-content-grid">
                {/* About Me Module */}
                <div className="content-module about-me-module">
                  <div className="module-header">
                    <h3>À propos de moi</h3>
                    <div className="module-indicator"></div>
                  </div>
                  <div className="about-content">
                    <p className="about-text">
                      Salut, je m'appelle {userData.fullName} mais certains me connaissent peut-être sous le nom de {userData.username}. 
                      Je suis un passionné de gaming et j'adore relever des défis dans les jeux compétitifs. 
                      Mon objectif est de devenir l'un des meilleurs joueurs de ma région !
                    </p>
                    <div className="about-details">
                      <div className="detail-item">
                        <span className="detail-label">Rejoint:</span>
                        <span className="detail-value">{new Date(userData.joinDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Localisation:</span>
                        <span className="detail-value">Paris, France</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Site web:</span>
                        <span className="detail-value">playwithpro.com</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* My Profile Module */}
                <div className="content-module my-profile-module">
                  <div className="module-header">
                    <h3>{userData.fullName}</h3>
                    <div className="profile-tabs">
                      <button className="tab-btn active">Mon Profil</button>
                      <button className="tab-btn">Public</button>
                      <button className="tab-btn">Confidentialité</button>
                    </div>
                  </div>
                  <div className="profile-post-section">
                    <div className="post-input-container">
                      <textarea 
                        className="post-input" 
                        placeholder={`Qu'est-ce qui vous passe par la tête, ${userData.fullName.split(' ')[0]} ?`}
                        rows="3"
                      ></textarea>
                      <button className="post-btn">Publier</button>
                    </div>
                    <div className="reaction-buttons">
                      <button className="reaction-btn smile">😊</button>
                      <button className="reaction-btn heart">❤️</button>
                      <button className="reaction-btn like">👍</button>
                    </div>
                    <div className="activity-filters">
                      <button className="filter-btn active">Toutes les mises à jour</button>
                      <button className="filter-btn">Amis</button>
                      <button className="filter-btn">Groupes</button>
                      <button className="filter-btn">Tout</button>
                    </div>
                  </div>
                  
                  {/* Live Activities */}
                  <div className="live-activities">
                    <div className="activity-item">
                      <div className="activity-icon">🎮</div>
                      <div className="activity-content">
                        <div className="activity-text">Partie en cours sur <strong>Valorant</strong></div>
                        <div className="activity-time">Il y a 2 min</div>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon">🏆</div>
                      <div className="activity-content">
                        <div className="activity-text">Victoire contre <strong>ProGamer123</strong></div>
                        <div className="activity-time">Il y a 15 min</div>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon">📈</div>
                      <div className="activity-content">
                        <div className="activity-text">Nouveau rang: <strong>Diamond III</strong></div>
                        <div className="activity-time">Il y a 1h</div>
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
          
        
        </div>
      </div>
    </div>
  )
}

export default UserProfile
