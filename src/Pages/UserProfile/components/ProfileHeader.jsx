import React, { useState, useRef } from 'react'
import DefaultAvatar from './DefaultAvatar'

function ProfileHeader({ userData, activeTab, onTabChange }) {
  const [avatarError, setAvatarError] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const fileInputRef = useRef(null)
  
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

  // Fonctions pour l'upload de photo
  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
      setShowUploadModal(true)
    }
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleSavePhoto = () => {
    // TODO: Implémenter l'upload réel vers le serveur
    console.log('Saving photo:', previewImage)
    // Simuler l'upload
    setShowDefaultAvatar(false)
    setAvatarError(false)
    setShowUploadModal(false)
    setPreviewImage(null)
  }

  const handleCancelUpload = () => {
    setPreviewImage(null)
    setShowUploadModal(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
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
    { id: 'settings', label: 'Paramètres', icon: '⚙️' }
  ]

  return (
    <div className="w-full max-w-full mx-auto px-0 py-6">
      {/* Compact Card Design */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
        {/* User Identity Card */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="relative group">
              {/* Avatar avec overlay d'upload au survol */}
              <div 
                className="relative cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={handleUploadClick}
              >
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
                    className="w-24 h-24 rounded-xl object-cover border-2 border-white/20 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:brightness-75"
                    onError={handleAvatarError}
                    onLoad={handleAvatarLoad}
                  />
                )}
                
                {/* Overlay d'upload au survol */}
                <div className={`absolute inset-0 rounded-xl bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                  isDragging ? 'opacity-100' : ''
                }`}>
                  <div className="text-center">
                    <div className="text-3xl mb-2 animate-bounce">📷</div>
                    <div className="text-white text-xs font-bold">Click to upload</div>
                  </div>
                </div>

                {/* Indicateur de drag & drop */}
                {isDragging && (
                  <div className="absolute inset-0 rounded-xl border-4 border-dashed border-cyan-400 bg-cyan-400/20 flex items-center justify-center animate-pulse">
                    <div className="text-center">
                      <div className="text-4xl mb-2">⬇️</div>
                      <div className="text-white font-bold">Drop your photo here</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Badge de statut en ligne */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-gray-800 rounded-full flex items-center justify-center z-20">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>

              {/* Bouton d'upload flottant */}
              <button
                onClick={handleUploadClick}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg hover:scale-110 transition-all duration-300 z-30 border-2 border-gray-800"
                title="Upload photo"
              >
                <span className="text-xs">📷</span>
              </button>

              {/* Input file caché */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
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

        {/* Stats Cards Row - Design Ultra Fun 🎉 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          {/* Card 1: Parties - Style Arcade 🎮 */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 rounded-2xl p-5 border-4 border-blue-400/50 hover:border-blue-300 transition-all duration-500 hover:scale-110 hover:rotate-[-2deg] hover:shadow-[0_0_40px_rgba(59,130,246,0.8)]">
            {/* Effet de glow animé */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-cyan-400/30 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>
            
            {/* Particules flottantes */}
            <div className="absolute top-2 right-2 text-xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}>✨</div>
            <div className="absolute bottom-2 left-2 text-lg animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.5s' }}>⭐</div>
            
            <div className="relative z-10 flex flex-col items-center text-center space-y-3">
              {/* Emoji géant avec animation */}
              <div className="text-5xl mb-2 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 animate-bounce" style={{ animationDuration: '2s' }}>
                🎮
              </div>
              
              {/* Nombre avec effet de glow */}
              <div className="relative">
                <div className="text-3xl font-black text-white drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] group-hover:text-blue-200 transition-all duration-300 group-hover:scale-110">
                  {userData.stats.gamesPlayed}
                </div>
                {/* Effet de glow derrière le texte */}
                <div className="absolute inset-0 text-3xl font-black text-blue-400 blur-xl opacity-50 group-hover:opacity-100 transition-opacity">
                  {userData.stats.gamesPlayed}
                </div>
              </div>
              
              {/* Label avec badge */}
              <div className="relative">
                <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30">
                  <span className="text-xs font-bold text-white uppercase tracking-widest">Parties</span>
                </div>
                <div className="absolute -top-1 -right-1 text-sm animate-spin" style={{ animationDuration: '3s' }}>🎯</div>
              </div>
            </div>
          </div>

          {/* Card 2: Victoires - Style Champion 🏆 */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-2xl p-5 border-4 border-yellow-400/50 hover:border-yellow-300 transition-all duration-500 hover:scale-110 hover:rotate-[2deg] hover:shadow-[0_0_40px_rgba(234,179,8,0.8)]">
            {/* Effet de glow animé */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-orange-400/30 to-red-400/30 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>
            
            {/* Particules flottantes */}
            <div className="absolute top-2 left-2 text-xl animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.2s' }}>🔥</div>
            <div className="absolute bottom-2 right-2 text-lg animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2.3s' }}>💫</div>
            
            <div className="relative z-10 flex flex-col items-center text-center space-y-3">
              {/* Emoji géant avec animation */}
              <div className="text-5xl mb-2 group-hover:scale-125 group-hover:rotate-[-12deg] transition-all duration-500 animate-bounce" style={{ animationDuration: '2.5s' }}>
                🏆
              </div>
              
              {/* Nombre avec effet de glow */}
              <div className="relative">
                <div className="text-3xl font-black text-white drop-shadow-[0_0_10px_rgba(234,179,8,0.8)] group-hover:text-yellow-200 transition-all duration-300 group-hover:scale-110">
                  {userData.stats.winRate}%
                </div>
                {/* Effet de glow derrière le texte */}
                <div className="absolute inset-0 text-3xl font-black text-yellow-400 blur-xl opacity-50 group-hover:opacity-100 transition-opacity">
                  {userData.stats.winRate}%
                </div>
              </div>
              
              {/* Label avec badge */}
              <div className="relative">
                <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30">
                  <span className="text-xs font-bold text-white uppercase tracking-widest">Victoires</span>
                </div>
                <div className="absolute -top-1 -left-1 text-sm animate-pulse">👑</div>
              </div>
            </div>
          </div>

          {/* Card 3: Heures - Style Energy ⏱️ */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-2xl p-5 border-4 border-green-400/50 hover:border-green-300 transition-all duration-500 hover:scale-110 hover:rotate-[-2deg] hover:shadow-[0_0_40px_rgba(34,197,94,0.8)]">
            {/* Effet de glow animé */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 via-emerald-400/30 to-teal-400/30 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>
            
            {/* Particules flottantes */}
            <div className="absolute top-3 right-3 text-xl animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '2.1s' }}>⚡</div>
            <div className="absolute bottom-3 left-3 text-lg animate-bounce" style={{ animationDelay: '1.3s', animationDuration: '2.4s' }}>💚</div>
            
            <div className="relative z-10 flex flex-col items-center text-center space-y-3">
              {/* Emoji géant avec animation */}
              <div className="text-5xl mb-2 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 animate-spin" style={{ animationDuration: '4s' }}>
                ⏱️
              </div>
              
              {/* Nombre avec effet de glow */}
              <div className="relative">
                <div className="text-3xl font-black text-white drop-shadow-[0_0_10px_rgba(34,197,94,0.8)] group-hover:text-green-200 transition-all duration-300 group-hover:scale-110">
                  {userData.stats.totalHours}h
                </div>
                {/* Effet de glow derrière le texte */}
                <div className="absolute inset-0 text-3xl font-black text-green-400 blur-xl opacity-50 group-hover:opacity-100 transition-opacity">
                  {userData.stats.totalHours}h
                </div>
              </div>
              
              {/* Label avec badge */}
              <div className="relative">
                <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30">
                  <span className="text-xs font-bold text-white uppercase tracking-widest">Heures</span>
                </div>
                <div className="absolute -top-1 -right-1 text-sm animate-bounce" style={{ animationDuration: '1.5s' }}>🚀</div>
              </div>
            </div>
          </div>

          {/* Card 4: Rang - Style Premium 💎 */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 rounded-2xl p-5 border-4 border-pink-400/50 hover:border-pink-300 transition-all duration-500 hover:scale-110 hover:rotate-[2deg] hover:shadow-[0_0_40px_rgba(236,72,153,0.8)]">
            {/* Effet de glow animé */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400/30 via-purple-400/30 to-indigo-400/30 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>
            
            {/* Particules flottantes */}
            <div className="absolute top-2 left-2 text-xl animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '2.3s' }}>💎</div>
            <div className="absolute bottom-2 right-2 text-lg animate-bounce" style={{ animationDelay: '1.2s', animationDuration: '2.6s' }}>✨</div>
            <div className="absolute top-1/2 right-1 text-xs animate-spin" style={{ animationDuration: '3s' }}>💫</div>
            
            <div className="relative z-10 flex flex-col items-center text-center space-y-3">
              {/* Emoji géant avec animation */}
              <div className="text-5xl mb-2 group-hover:scale-125 group-hover:rotate-[-12deg] transition-all duration-500 animate-bounce" style={{ animationDuration: '2.8s' }}>
                💎
              </div>
              
              {/* Nombre avec effet de glow */}
              <div className="relative">
                <div className="text-3xl font-black text-white drop-shadow-[0_0_10px_rgba(236,72,153,0.8)] group-hover:text-pink-200 transition-all duration-300 group-hover:scale-110">
                  {userData.stats.rank}
                </div>
                {/* Effet de glow derrière le texte */}
                <div className="absolute inset-0 text-3xl font-black text-pink-400 blur-xl opacity-50 group-hover:opacity-100 transition-opacity">
                  {userData.stats.rank}
                </div>
              </div>
              
              {/* Label avec badge */}
              <div className="relative">
                <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30">
                  <span className="text-xs font-bold text-white uppercase tracking-widest">Rang</span>
                </div>
                <div className="absolute -top-1 -left-1 text-sm animate-pulse">👑</div>
                <div className="absolute -bottom-1 -right-1 text-xs animate-spin" style={{ animationDuration: '2s' }}>🌟</div>
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

      {/* Modal d'upload de photo - Design Fun & Ludique */}
      {showUploadModal && (
        <div 
          className="fixed inset-0 bg-gradient-to-br from-purple-900/40 via-pink-900/40 to-cyan-900/40 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={handleCancelUpload}
        >
          <div 
            className="relative w-full max-w-lg animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fond animé avec formes géométriques */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-500/20 rounded-[3rem] blur-3xl"></div>
            
            {/* Container principal avec style cartoon */}
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-4 border-pink-500/50 rounded-[3rem] p-8 shadow-[0_0_50px_rgba(236,72,153,0.5)]">
              {/* Étoiles animées en arrière-plan */}
              <div className="absolute inset-0 overflow-hidden rounded-[3rem] pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-yellow-400 text-2xl animate-pulse"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.3}s`,
                      animationDuration: `${1 + Math.random() * 2}s`
                    }}
                  >
                    ✨
                  </div>
                ))}
              </div>

              {/* Header avec style fun */}
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center space-x-4">
                  {/* Icône animée avec rotation */}
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-pink-500/50 transform rotate-12 hover:rotate-[-12deg] transition-transform duration-300">
                      📸
                    </div>
                    {/* Badge animé */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold animate-bounce">
                      NEW
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                      🎨 PHOTO TIME!
                    </h2>
                    <p className="text-gray-300 text-sm mt-1 flex items-center gap-2">
                      <span className="animate-bounce">🚀</span>
                      Let's make you look awesome!
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCancelUpload}
                  className="w-12 h-12 rounded-full bg-red-500/20 hover:bg-red-500/40 border-2 border-red-400 text-red-400 hover:text-red-300 text-2xl transition-all duration-300 hover:rotate-180 hover:scale-125 flex items-center justify-center font-bold shadow-lg"
                >
                  ✕
                </button>
              </div>

              {/* Preview de l'image avec style fun */}
              {previewImage && (
                <div className="mb-6 relative z-10">
                  <div className="relative group">
                    {/* Image avec bordure animée */}
                    <div className="relative rounded-3xl overflow-hidden border-4 border-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.6)] transform rotate-[-2deg] group-hover:rotate-2 transition-transform duration-300">
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="w-full h-64 object-cover"
                      />
                      {/* Overlay avec texte fun */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-6">
                        <div>
                          <div className="text-white font-black text-xl mb-1 flex items-center gap-2">
                            <span className="text-2xl animate-spin">🌟</span>
                            LOOKIN' GOOD!
                          </div>
                          <div className="text-pink-300 text-sm font-bold">This is gonna be EPIC!</div>
                        </div>
                      </div>
                    </div>
                    {/* Stickers décoratifs */}
                    <div className="absolute -top-4 -right-4 text-4xl animate-bounce" style={{ animationDuration: '1.5s' }}>💯</div>
                    <div className="absolute -bottom-4 -left-4 text-3xl animate-pulse">🔥</div>
                  </div>
                </div>
              )}

              {/* Zone de drop avec style fun */}
              {!previewImage && (
                <div 
                  className={`mb-6 relative z-10 rounded-3xl p-12 text-center border-4 border-dashed transition-all duration-300 cursor-pointer transform ${
                    isDragging 
                      ? 'border-cyan-400 bg-cyan-500/20 scale-105 rotate-2' 
                      : 'border-pink-400/50 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-cyan-500/10 hover:border-pink-400 hover:bg-pink-500/20 hover:scale-105 hover:-rotate-1'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={handleUploadClick}
                >
                  {/* Icône principale avec animation */}
                  <div className="relative inline-block mb-6">
                    <div className="text-8xl animate-bounce" style={{ animationDuration: '1.2s' }}>
                      📷
                    </div>
                    {/* Effet de lueur */}
                    <div className="absolute inset-0 text-8xl opacity-30 blur-2xl animate-pulse">📷</div>
                  </div>
                  
                  {/* Texte avec emojis animés */}
                  <div className="space-y-3">
                    <div className="text-white font-black text-2xl flex items-center justify-center gap-3">
                      <span className="animate-bounce" style={{ animationDelay: '0s' }}>🎯</span>
                      <span>DRAG & DROP</span>
                      <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎯</span>
                    </div>
                    <div className="text-pink-300 font-bold text-lg flex items-center justify-center gap-2">
                      <span className="animate-pulse">⚡</span>
                      or click to choose
                      <span className="animate-pulse">⚡</span>
                    </div>
                    <div className="text-gray-400 text-sm mt-4 flex items-center justify-center gap-2">
                      <span>📁</span>
                      <span>JPG • PNG • GIF</span>
                      <span className="text-yellow-400 animate-pulse">⭐</span>
                      <span>Max 5MB</span>
                    </div>
                  </div>
                  
                  {/* Lignes décoratives */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-pink-400/50 rounded-tl-lg"></div>
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-400/50 rounded-tr-lg"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-purple-400/50 rounded-bl-lg"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-pink-400/50 rounded-br-lg"></div>
                </div>
              )}

              {/* Boutons d'action avec style fun */}
              <div className="flex space-x-4 pt-6 border-t-2 border-pink-500/30 relative z-10">
                {previewImage && (
                  <>
                    <button
                      onClick={handleSavePhoto}
                      className="group flex-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 border-4 border-white/20 text-white font-black py-5 px-6 rounded-2xl transition-all duration-300 hover:scale-110 hover:rotate-1 hover:shadow-[0_0_30px_rgba(236,72,153,0.8)] flex items-center justify-center space-x-3 transform"
                    >
                      <span className="text-2xl group-hover:animate-spin">💾</span>
                      <span className="text-lg">SAVE IT!</span>
                      <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity">✨</span>
                    </button>
                    <button
                      onClick={handleCancelUpload}
                      className="px-6 py-5 bg-gray-700/50 border-4 border-gray-600/50 hover:border-red-400 hover:bg-red-500/20 text-gray-300 hover:text-red-300 font-bold rounded-2xl transition-all duration-300 hover:scale-110 hover:rotate-[-2deg]"
                    >
                      NOPE
                    </button>
                  </>
                )}
                {!previewImage && (
                  <button
                    onClick={handleUploadClick}
                    className="group w-full bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-cyan-500/30 border-4 border-pink-400/50 hover:border-pink-400 text-white font-black py-5 px-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] flex items-center justify-center space-x-3"
                  >
                    <span className="text-2xl group-hover:animate-bounce">📁</span>
                    <span className="text-lg">BROWSE FILES</span>
                    <span className="text-xl group-hover:animate-pulse">🚀</span>
                  </button>
                )}
              </div>

              {/* Effet de particules flottantes */}
              <div className="absolute inset-0 overflow-hidden rounded-[3rem] pointer-events-none">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full opacity-60 animate-float"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: `${3 + Math.random() * 2}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileHeader