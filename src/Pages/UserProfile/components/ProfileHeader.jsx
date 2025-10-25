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
    { id: 'achievements', label: 'Succès', icon: '🏆' },
    { id: 'settings', label: 'Paramètres', icon: '⚙️' }
  ]

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Minimalist Card Design */}
      <div className="glass-card mb-8">
        {/* User Identity Card */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 p-8">
          <div className="flex flex-col lg:flex-row items-center gap-6">
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
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-white/20 shadow-2xl"
                  onError={handleAvatarError}
                  onLoad={handleAvatarLoad}
                />
              )}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-gray-800 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold text-white mb-2">{userData.fullName}</h1>
              <p className="text-xl text-gray-300 mb-4">@{userData.username}</p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <span className={`px-4 py-2 rounded-full text-white font-bold text-sm shadow-lg ${getUserTypeColor(userData.userType)}`}>
                  {getUserTypeLabel(userData.userType)}
                </span>
                <span className="px-4 py-2 bg-gray-700/50 text-white rounded-full text-sm font-medium">
                  Niveau {userData.level}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-black/20 rounded-xl p-4 border border-white/10 hover:bg-black/30 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🎮</div>
              <div>
                <div className="text-2xl font-bold text-white">{userData.stats.gamesPlayed}</div>
                <div className="text-sm text-gray-400">Parties</div>
              </div>
            </div>
          </div>
          <div className="bg-black/20 rounded-xl p-4 border border-white/10 hover:bg-black/30 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🏆</div>
              <div>
                <div className="text-2xl font-bold text-white">{userData.stats.winRate}%</div>
                <div className="text-sm text-gray-400">Victoires</div>
              </div>
            </div>
          </div>
          <div className="bg-black/20 rounded-xl p-4 border border-white/10 hover:bg-black/30 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="text-2xl">⏱️</div>
              <div>
                <div className="text-2xl font-bold text-white">{userData.stats.totalHours}h</div>
                <div className="text-sm text-gray-400">Heures</div>
              </div>
            </div>
          </div>
          <div className="bg-black/20 rounded-xl p-4 border border-white/10 hover:bg-black/30 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="text-2xl">💎</div>
              <div>
                <div className="text-2xl font-bold text-white">{userData.stats.rank}</div>
                <div className="text-sm text-gray-400">Rang</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white font-semibold">Progression</span>
            <span className="text-white font-bold">
              {Math.round((userData.xp / (userData.xp + userData.xpToNext)) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-700/30 rounded-full h-3 mb-2">
            <div 
              className={`h-3 rounded-full bg-gradient-to-r ${getUserTypeGradient(userData.userType)} shadow-lg`}
              style={{ 
                width: `${(userData.xp / (userData.xp + userData.xpToNext)) * 100}%`
              }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>{userData.xp.toLocaleString()} XP</span>
            <span>Niveau {userData.level + 1} dans {userData.xpToNext} XP</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="gaming-button flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <span>Quick Match</span>
          </button>
          <button className="px-6 py-3 bg-gray-700/50 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:bg-gray-600/50 hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
            <span className="text-xl">🏆</span>
            <span>Tournois</span>
          </button>
          <button className="px-6 py-3 bg-gray-700/50 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:bg-gray-600/50 hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
            <span className="text-xl">📊</span>
            <span>Stats</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl p-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === tab.id 
                ? 'bg-indigo-500 text-white shadow-lg' 
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="text-xl">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default ProfileHeader