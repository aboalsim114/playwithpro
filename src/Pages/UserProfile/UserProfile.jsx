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
      setUserData({
        id: id,
        username: 'GamerPro_' + id,
        fullName: 'Alexandre Dubois',
        email: 'alex.dubois@email.com',
        avatar: '/api/placeholder/150/150',
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
      {/* Background Effects */}
      <div className="profile-background">
        <div className="neural-network"></div>
        <div className="energy-waves"></div>
        <div className="floating-particles"></div>
      </div>

      <div className="profile-container">
        {/* Header avec navigation */}
        <ProfileHeader 
          userData={userData}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Contenu principal */}
        <div className="profile-main-content">
          {activeTab === 'overview' && (
            <div className="profile-overview">
              <ProfileStats userData={userData} />
              <ProfileGames userData={userData} />
            </div>
          )}
          
          {activeTab === 'achievements' && (
            <ProfileAchievements achievements={userData.achievements} />
          )}
          
          {activeTab === 'settings' && (
            <ProfileSettings userData={userData} />
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
