import React, { useState } from 'react'
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
      case 'pro': return 'bg-orange-500'
      case 'streamer': return 'bg-purple-500'
      default: return 'bg-green-500'
    }
  }

  const getUserTypeGradient = (type) => {
    switch (type) {
      case 'pro': return 'from-orange-500 to-red-500'
      case 'streamer': return 'from-purple-500 to-pink-500'
      default: return 'from-green-500 to-emerald-500'
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
    { id: 'settings', label: 'Paramètres', icon: '⚙️' }
  ]

  return (
    <div className="w-full max-w-full mx-auto px-0 py-6">
      {/* Compact Card Design */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
        {/* User Identity Card */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="relative">
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
                  className="w-24 h-24 rounded-xl object-cover border-2 border-white/20 shadow-lg"
                  onError={handleAvatarError}
                  onLoad={handleAvatarLoad}
                />
              )}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-gray-800 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-bold text-white mb-1">{userData.fullName}</h1>
              <p className="text-lg text-gray-300 mb-3">@{userData.username}</p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                <span className={`px-3 py-1 rounded-full text-white font-bold text-xs shadow-lg ${getUserTypeColor(userData.userType)}`}>
                  {getUserTypeLabel(userData.userType)}
                </span>
                <span className="px-3 py-1 bg-gray-700/50 text-white rounded-full text-xs font-medium">
                  Niveau {userData.level}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          <div className="bg-gray-700/50 rounded-lg p-3 border border-white/10 hover:bg-gray-700/70 transition-all duration-300">
            <div className="flex items-center gap-2">
              <div className="text-lg">🎮</div>
              <div>
                <div className="text-lg font-bold text-white">{userData.stats.gamesPlayed}</div>
                <div className="text-xs text-gray-400">Parties</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-3 border border-white/10 hover:bg-gray-700/70 transition-all duration-300">
            <div className="flex items-center gap-2">
              <div className="text-lg">🏆</div>
              <div>
                <div className="text-lg font-bold text-white">{userData.stats.winRate}%</div>
                <div className="text-xs text-gray-400">Victoires</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-3 border border-white/10 hover:bg-gray-700/70 transition-all duration-300">
            <div className="flex items-center gap-2">
              <div className="text-lg">⏱️</div>
              <div>
                <div className="text-lg font-bold text-white">{userData.stats.totalHours}h</div>
                <div className="text-xs text-gray-400">Heures</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-3 border border-white/10 hover:bg-gray-700/70 transition-all duration-300">
            <div className="flex items-center gap-2">
              <div className="text-lg">💎</div>
              <div>
                <div className="text-lg font-bold text-white">{userData.stats.rank}</div>
                <div className="text-xs text-gray-400">Rang</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mt-6">
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
            <span className="text-lg">⚡</span>
            <span>Quick Match</span>
          </button>
          <button className="px-4 py-2 bg-gray-700/50 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:bg-gray-600/50 hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
            <span className="text-lg">🏆</span>
            <span>Tournois</span>
          </button>
          <button className="px-4 py-2 bg-gray-700/50 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:bg-gray-600/50 hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
            <span className="text-lg">📊</span>
            <span>Stats</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex bg-gray-800 backdrop-blur-xl border border-gray-700 rounded-xl p-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === tab.id 
                ? 'bg-purple-500 text-white shadow-lg' 
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default ProfileHeader