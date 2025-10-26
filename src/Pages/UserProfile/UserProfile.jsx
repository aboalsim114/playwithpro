import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// Import des composants modulaires
import ProfileSidebar from './components/ProfileSidebar'
import ProfileTopBar from './components/ProfileTopBar'
import ProfileRightSidebar from './components/ProfileRightSidebar'
import ProfileHeader from './components/ProfileHeader'
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
    <div className="h-screen bg-gray-900 flex overflow-hidden">
     
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Top Bar */}
        <div className="flex-shrink-0">
          <ProfileTopBar userData={userData} />
        </div>
        
        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Central Content */}
          <div 
            className="flex-1 overflow-y-auto"
            style={{
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none', /* IE and Edge */
              WebkitScrollbar: 'none', /* Chrome, Safari, Opera */
            }}
          >
            <div className="p-6">
              {/* Profile Header */}
              <ProfileHeader 
                userData={userData}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              {/* Tab Content */}
              <div className="mt-8">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* About Me Section */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <span className="text-xl">👤</span>
                        À propos de moi
                      </h3>
                      <p className="text-gray-300 mb-4">
                        Salut, je m'appelle {userData.fullName} mais certains me connaissent peut-être sous le nom de {userData.username}. 
                        Je suis un passionné de gaming et j'adore relever des défis dans les jeux compétitifs. 
                        Mon objectif est de devenir l'un des meilleurs joueurs de ma région !
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-700 rounded-lg p-4">
                          <div className="text-gray-400 text-sm">Rejoint</div>
                          <div className="text-white font-semibold">
                            {new Date(userData.joinDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </div>
                        </div>
                        <div className="bg-gray-700 rounded-lg p-4">
                          <div className="text-gray-400 text-sm">Localisation</div>
                          <div className="text-white font-semibold">Paris, France</div>
                        </div>
                        <div className="bg-gray-700 rounded-lg p-4">
                          <div className="text-gray-400 text-sm">Site web</div>
                          <div className="text-white font-semibold">playwithpro.com</div>
                        </div>
                      </div>
                    </div>

                   
                  </div>
                )}
                
                {/* {activeTab === 'achievements' && (
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <ProfileAchievements achievements={userData.achievements} />
                  </div>
                )} */}
                
                {activeTab === 'games' && (
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <ProfileGames recentGames={userData.recentGames} />
                  </div>
                )}
                
                {activeTab === 'settings' && (
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <ProfileSettings userData={userData} />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Sidebar */}
          <div 
            className="w-80 flex-shrink-0 overflow-y-auto"
            style={{
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none', /* IE and Edge */
              WebkitScrollbar: 'none', /* Chrome, Safari, Opera */
            }}
          >
            <div className="p-6">
              <ProfileRightSidebar userData={userData} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Global Styles */}
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        
        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
          background-color: #0b0f1a;
          overflow: hidden;
        }
        
        #root {
          height: 100%;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1f2937;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #8A2BE2;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #9932CC;
        }
        
        /* Glow effects */
        .glow-purple {
          box-shadow: 0 0 20px rgba(138, 43, 226, 0.3);
        }
        
        .glow-blue {
          box-shadow: 0 0 20px rgba(0, 191, 255, 0.3);
        }
        
        /* Animations */
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(138, 43, 226, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(138, 43, 226, 0.8);
          }
        }
        
        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .ml-64 {
            margin-left: 0;
          }
          
          .w-80 {
            width: 18rem;
          }
          
          .flex {
            flex-direction: column;
          }
          
          .flex-1 {
            height: calc(100vh - 4rem);
          }
        }
        
        @media (max-width: 768px) {
          .grid-cols-5 {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .w-80 {
            width: 100%;
          }
          
          .flex-col {
            flex-direction: column;
          }
          
          .h-screen {
            height: 100vh;
          }
          
          .p-6 {
            padding: 1rem;
          }
        }
        
        @media (max-width: 640px) {
          .grid-cols-5 {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .text-2xl {
            font-size: 1.5rem;
          }
          
          .text-xl {
            font-size: 1.25rem;
          }
        }
        
        @media (max-width: 480px) {
          .grid-cols-5 {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .gap-3 {
            gap: 0.5rem;
          }
          
          .p-3 {
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default UserProfile
