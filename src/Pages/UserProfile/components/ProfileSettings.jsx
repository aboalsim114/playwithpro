import React, { useState } from 'react'

function ProfileSettings({ userData }) {
  const [settings, setSettings] = useState({
    notifications: {
      gameInvites: true,
      achievements: true,
      messages: false,
      marketing: false
    },
    privacy: {
      showOnlineStatus: true,
      showGameActivity: true,
      showAchievements: true,
      allowFriendRequests: true
    },
    preferences: {
      theme: 'dark',
      language: 'fr',
      timezone: 'Europe/Paris'
    }
  })

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }))
  }

  const handleSaveSettings = () => {
    // Simulation de la sauvegarde
    console.log('Sauvegarde des paramètres:', settings)
    // Ici vous ajouteriez l'appel API pour sauvegarder
  }

  return (
    <div className="bg-gradient-to-br from-gray-800/20 via-purple-900/10 to-gray-800/20 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
      {/* Animated gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-yellow-400 via-orange-500 via-pink-500 to-purple-600 animate-pulse"></div>
      
      {/* Floating particles/confetti effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-green-400/40 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-20 right-20 w-2 h-2 bg-orange-400/40 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-purple-400/40 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}></div>
        <div className="absolute top-1/2 right-10 w-2 h-2 bg-pink-400/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '4.5s' }}></div>
      </div>
      
      {/* Header with fun animations */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-block relative">
          <h2 className="flex items-center justify-center gap-3 text-4xl font-bold bg-gradient-to-r from-green-400 via-orange-400 to-purple-400 bg-clip-text text-transparent mb-3 drop-shadow-2xl animate-pulse">
            <span className="text-5xl animate-spin hover:animate-bounce cursor-pointer transition-all duration-300 hover:scale-110 inline-block">⚙️</span>
            <span className="hover:scale-105 transition-transform duration-300 inline-block">Paramètres du profil</span>
          </h2>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
        </div>
        <p className="text-slate-300 text-lg mt-4 font-medium">🎮 Personnalisez votre expérience de jeu 🎮</p>
      </div>

      <div className="flex flex-col gap-8 relative z-10">
        {/* Notifications Settings */}
        <div className="bg-gradient-to-br from-green-900/20 via-black/30 to-purple-900/20 rounded-2xl p-6 border-2 border-green-400/30 transition-all duration-500 hover:border-green-400/60 hover:shadow-2xl hover:shadow-green-500/20 hover:scale-[1.01] relative overflow-hidden group">
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <div className="mb-6 pb-4 border-b-2 border-green-400/30 relative">
            <h3 className="flex items-center gap-3 text-2xl font-bold mb-2">
              <span className="text-3xl animate-bounce hover:animate-spin cursor-pointer transition-all duration-300 hover:scale-125 inline-block">🔔</span>
              <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 inline-block">Notifications</span>
            </h3>
            <p className="text-slate-300 text-sm font-medium">✨ Configurez les notifications que vous souhaitez recevoir ✨</p>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-black/30 via-green-900/20 to-black/30 rounded-xl border-2 border-green-400/20 transition-all duration-300 hover:border-green-400/60 hover:bg-gradient-to-r hover:from-green-900/30 hover:via-green-800/20 hover:to-green-900/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/20 group/item">
              <div className="flex-1 flex flex-col gap-2">
                <h4 className="text-green-100 text-lg font-bold flex items-center gap-2">
                  <span className="text-xl group-hover/item:animate-bounce inline-block">🎮</span>
                  <span className="group-hover/item:scale-105 transition-transform duration-300 inline-block">Invitations de jeu</span>
                </h4>
                <p className="text-slate-300 text-sm">Recevoir des notifications pour les invitations de jeu</p>
              </div>
              <label className="relative inline-block w-14 h-7 cursor-pointer group/toggle">
                <input
                  type="checkbox"
                  checked={settings.notifications.gameInvites}
                  onChange={(e) => handleSettingChange('notifications', 'gameInvites', e.target.checked)}
                  className="opacity-0 w-0 h-0"
                />
                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-500 border-2 hover:shadow-lg ${
                  settings.notifications.gameInvites 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg shadow-green-400/50 border-green-400/50' 
                    : 'bg-black/40 border-white/20 group-hover/toggle:border-green-400/50'
                }`}>
                  <span className={`absolute h-5 w-5 left-0.5 top-0.5 rounded-full transition-all duration-500 flex items-center justify-center ${
                    settings.notifications.gameInvites 
                      ? 'bg-white translate-x-7 shadow-lg' 
                      : 'bg-slate-400 group-hover/toggle:bg-green-300'
                  }`}>
                    {settings.notifications.gameInvites && <span className="text-xs">✓</span>}
                  </span>
                </span>
              </label>
            </div>

            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-black/30 via-yellow-900/20 to-black/30 rounded-xl border-2 border-yellow-400/20 transition-all duration-300 hover:border-yellow-400/60 hover:bg-gradient-to-r hover:from-yellow-900/30 hover:via-yellow-800/20 hover:to-yellow-900/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-500/20 group/item">
              <div className="flex-1 flex flex-col gap-2">
                <h4 className="text-yellow-100 text-lg font-bold flex items-center gap-2">
                  <span className="text-xl group-hover/item:animate-bounce inline-block">🏆</span>
                  <span className="group-hover/item:scale-105 transition-transform duration-300 inline-block">Succès débloqués</span>
                </h4>
                <p className="text-slate-300 text-sm">Notifications pour les nouveaux succès</p>
              </div>
              <label className="relative inline-block w-14 h-7 cursor-pointer group/toggle">
                <input
                  type="checkbox"
                  checked={settings.notifications.achievements}
                  onChange={(e) => handleSettingChange('notifications', 'achievements', e.target.checked)}
                  className="opacity-0 w-0 h-0"
                />
                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-500 border-2 hover:shadow-lg ${
                  settings.notifications.achievements 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg shadow-yellow-400/50 border-yellow-400/50' 
                    : 'bg-black/40 border-white/20 group-hover/toggle:border-yellow-400/50'
                }`}>
                  <span className={`absolute h-5 w-5 left-0.5 top-0.5 rounded-full transition-all duration-500 flex items-center justify-center ${
                    settings.notifications.achievements 
                      ? 'bg-white translate-x-7 shadow-lg' 
                      : 'bg-slate-400 group-hover/toggle:bg-yellow-300'
                  }`}>
                    {settings.notifications.achievements && <span className="text-xs">✓</span>}
                  </span>
                </span>
              </label>
            </div>

            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-black/30 via-blue-900/20 to-black/30 rounded-xl border-2 border-blue-400/20 transition-all duration-300 hover:border-blue-400/60 hover:bg-gradient-to-r hover:from-blue-900/30 hover:via-blue-800/20 hover:to-blue-900/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20 group/item">
              <div className="flex-1 flex flex-col gap-2">
                <h4 className="text-blue-100 text-lg font-bold flex items-center gap-2">
                  <span className="text-xl group-hover/item:animate-bounce inline-block">💬</span>
                  <span className="group-hover/item:scale-105 transition-transform duration-300 inline-block">Messages</span>
                </h4>
                <p className="text-slate-300 text-sm">Notifications pour les nouveaux messages</p>
              </div>
              <label className="relative inline-block w-14 h-7 cursor-pointer group/toggle">
                <input
                  type="checkbox"
                  checked={settings.notifications.messages}
                  onChange={(e) => handleSettingChange('notifications', 'messages', e.target.checked)}
                  className="opacity-0 w-0 h-0"
                />
                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-500 border-2 hover:shadow-lg ${
                  settings.notifications.messages 
                    ? 'bg-gradient-to-r from-blue-400 to-cyan-500 shadow-lg shadow-blue-400/50 border-blue-400/50' 
                    : 'bg-black/40 border-white/20 group-hover/toggle:border-blue-400/50'
                }`}>
                  <span className={`absolute h-5 w-5 left-0.5 top-0.5 rounded-full transition-all duration-500 flex items-center justify-center ${
                    settings.notifications.messages 
                      ? 'bg-white translate-x-7 shadow-lg' 
                      : 'bg-slate-400 group-hover/toggle:bg-blue-300'
                  }`}>
                    {settings.notifications.messages && <span className="text-xs">✓</span>}
                  </span>
                </span>
              </label>
            </div>

            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-black/30 via-pink-900/20 to-black/30 rounded-xl border-2 border-pink-400/20 transition-all duration-300 hover:border-pink-400/60 hover:bg-gradient-to-r hover:from-pink-900/30 hover:via-pink-800/20 hover:to-pink-900/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/20 group/item">
              <div className="flex-1 flex flex-col gap-2">
                <h4 className="text-pink-100 text-lg font-bold flex items-center gap-2">
                  <span className="text-xl group-hover/item:animate-bounce inline-block">🎁</span>
                  <span className="group-hover/item:scale-105 transition-transform duration-300 inline-block">Marketing</span>
                </h4>
                <p className="text-slate-300 text-sm">Notifications marketing et promotions</p>
              </div>
              <label className="relative inline-block w-14 h-7 cursor-pointer group/toggle">
                <input
                  type="checkbox"
                  checked={settings.notifications.marketing}
                  onChange={(e) => handleSettingChange('notifications', 'marketing', e.target.checked)}
                  className="opacity-0 w-0 h-0"
                />
                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-500 border-2 hover:shadow-lg ${
                  settings.notifications.marketing 
                    ? 'bg-gradient-to-r from-pink-400 to-rose-500 shadow-lg shadow-pink-400/50 border-pink-400/50' 
                    : 'bg-black/40 border-white/20 group-hover/toggle:border-pink-400/50'
                }`}>
                  <span className={`absolute h-5 w-5 left-0.5 top-0.5 rounded-full transition-all duration-500 flex items-center justify-center ${
                    settings.notifications.marketing 
                      ? 'bg-white translate-x-7 shadow-lg' 
                      : 'bg-slate-400 group-hover/toggle:bg-pink-300'
                  }`}>
                    {settings.notifications.marketing && <span className="text-xs">✓</span>}
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-gradient-to-br from-blue-900/20 via-black/30 to-indigo-900/20 rounded-2xl p-6 border-2 border-blue-400/30 transition-all duration-500 hover:border-blue-400/60 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.01] relative overflow-hidden group">
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <div className="mb-6 pb-4 border-b-2 border-blue-400/30 relative">
            <h3 className="flex items-center gap-3 text-2xl font-bold mb-2">
              <span className="text-3xl animate-bounce hover:animate-spin cursor-pointer transition-all duration-300 hover:scale-125 inline-block">🔒</span>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 inline-block">Confidentialité</span>
            </h3>
            <p className="text-slate-300 text-sm font-medium">🛡️ Contrôlez qui peut voir vos informations 🛡️</p>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-black/30 via-blue-900/20 to-black/30 rounded-xl border-2 border-blue-400/20 transition-all duration-300 hover:border-blue-400/60 hover:bg-gradient-to-r hover:from-blue-900/30 hover:via-blue-800/20 hover:to-blue-900/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20 group/item">
              <div className="flex-1 flex flex-col gap-2">
                <h4 className="text-blue-100 text-lg font-bold flex items-center gap-2">
                  <span className="text-xl group-hover/item:animate-bounce inline-block">🟢</span>
                  <span className="group-hover/item:scale-105 transition-transform duration-300 inline-block">Statut en ligne</span>
                </h4>
                <p className="text-slate-300 text-sm">Afficher votre statut en ligne aux autres joueurs</p>
              </div>
              <label className="relative inline-block w-14 h-7 cursor-pointer group/toggle">
                <input
                  type="checkbox"
                  checked={settings.privacy.showOnlineStatus}
                  onChange={(e) => handleSettingChange('privacy', 'showOnlineStatus', e.target.checked)}
                  className="opacity-0 w-0 h-0"
                />
                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-500 border-2 hover:shadow-lg ${
                  settings.privacy.showOnlineStatus 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg shadow-green-400/50 border-green-400/50' 
                    : 'bg-black/40 border-white/20 group-hover/toggle:border-blue-400/50'
                }`}>
                  <span className={`absolute h-5 w-5 left-0.5 top-0.5 rounded-full transition-all duration-500 flex items-center justify-center ${
                    settings.privacy.showOnlineStatus 
                      ? 'bg-white translate-x-7 shadow-lg' 
                      : 'bg-slate-400 group-hover/toggle:bg-blue-300'
                  }`}>
                    {settings.privacy.showOnlineStatus && <span className="text-xs">✓</span>}
                  </span>
                </span>
              </label>
            </div>

            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-black/30 via-blue-900/20 to-black/30 rounded-xl border-2 border-blue-400/20 transition-all duration-300 hover:border-blue-400/60 hover:bg-gradient-to-r hover:from-blue-900/30 hover:via-blue-800/20 hover:to-blue-900/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20 group/item">
              <div className="flex-1 flex flex-col gap-2">
                <h4 className="text-blue-100 text-lg font-bold flex items-center gap-2">
                  <span className="text-xl group-hover/item:animate-bounce inline-block">🎯</span>
                  <span className="group-hover/item:scale-105 transition-transform duration-300 inline-block">Activité de jeu</span>
                </h4>
                <p className="text-slate-300 text-sm">Partager vos parties en cours avec vos amis</p>
              </div>
              <label className="relative inline-block w-14 h-7 cursor-pointer group/toggle">
                <input
                  type="checkbox"
                  checked={settings.privacy.showGameActivity}
                  onChange={(e) => handleSettingChange('privacy', 'showGameActivity', e.target.checked)}
                  className="opacity-0 w-0 h-0"
                />
                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-500 border-2 hover:shadow-lg ${
                  settings.privacy.showGameActivity 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg shadow-green-400/50 border-green-400/50' 
                    : 'bg-black/40 border-white/20 group-hover/toggle:border-blue-400/50'
                }`}>
                  <span className={`absolute h-5 w-5 left-0.5 top-0.5 rounded-full transition-all duration-500 flex items-center justify-center ${
                    settings.privacy.showGameActivity 
                      ? 'bg-white translate-x-7 shadow-lg' 
                      : 'bg-slate-400 group-hover/toggle:bg-blue-300'
                  }`}>
                    {settings.privacy.showGameActivity && <span className="text-xs">✓</span>}
                  </span>
                </span>
              </label>
            </div>

            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-black/30 via-blue-900/20 to-black/30 rounded-xl border-2 border-blue-400/20 transition-all duration-300 hover:border-blue-400/60 hover:bg-gradient-to-r hover:from-blue-900/30 hover:via-blue-800/20 hover:to-blue-900/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20 group/item">
              <div className="flex-1 flex flex-col gap-2">
                <h4 className="text-blue-100 text-lg font-bold flex items-center gap-2">
                  <span className="text-xl group-hover/item:animate-bounce inline-block">⭐</span>
                  <span className="group-hover/item:scale-105 transition-transform duration-300 inline-block">Succès publics</span>
                </h4>
                <p className="text-slate-300 text-sm">Permettre aux autres de voir vos succès</p>
              </div>
              <label className="relative inline-block w-14 h-7 cursor-pointer group/toggle">
                <input
                  type="checkbox"
                  checked={settings.privacy.showAchievements}
                  onChange={(e) => handleSettingChange('privacy', 'showAchievements', e.target.checked)}
                  className="opacity-0 w-0 h-0"
                />
                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-500 border-2 hover:shadow-lg ${
                  settings.privacy.showAchievements 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg shadow-green-400/50 border-green-400/50' 
                    : 'bg-black/40 border-white/20 group-hover/toggle:border-blue-400/50'
                }`}>
                  <span className={`absolute h-5 w-5 left-0.5 top-0.5 rounded-full transition-all duration-500 flex items-center justify-center ${
                    settings.privacy.showAchievements 
                      ? 'bg-white translate-x-7 shadow-lg' 
                      : 'bg-slate-400 group-hover/toggle:bg-blue-300'
                  }`}>
                    {settings.privacy.showAchievements && <span className="text-xs">✓</span>}
                  </span>
                </span>
              </label>
            </div>

            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-black/30 via-blue-900/20 to-black/30 rounded-xl border-2 border-blue-400/20 transition-all duration-300 hover:border-blue-400/60 hover:bg-gradient-to-r hover:from-blue-900/30 hover:via-blue-800/20 hover:to-blue-900/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20 group/item">
              <div className="flex-1 flex flex-col gap-2">
                <h4 className="text-blue-100 text-lg font-bold flex items-center gap-2">
                  <span className="text-xl group-hover/item:animate-bounce inline-block">👥</span>
                  <span className="group-hover/item:scale-105 transition-transform duration-300 inline-block">Demandes d'amis</span>
                </h4>
                <p className="text-slate-300 text-sm">Autoriser les demandes d'amis d'autres joueurs</p>
              </div>
              <label className="relative inline-block w-14 h-7 cursor-pointer group/toggle">
                <input
                  type="checkbox"
                  checked={settings.privacy.allowFriendRequests}
                  onChange={(e) => handleSettingChange('privacy', 'allowFriendRequests', e.target.checked)}
                  className="opacity-0 w-0 h-0"
                />
                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-500 border-2 hover:shadow-lg ${
                  settings.privacy.allowFriendRequests 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg shadow-green-400/50 border-green-400/50' 
                    : 'bg-black/40 border-white/20 group-hover/toggle:border-blue-400/50'
                }`}>
                  <span className={`absolute h-5 w-5 left-0.5 top-0.5 rounded-full transition-all duration-500 flex items-center justify-center ${
                    settings.privacy.allowFriendRequests 
                      ? 'bg-white translate-x-7 shadow-lg' 
                      : 'bg-slate-400 group-hover/toggle:bg-blue-300'
                  }`}>
                    {settings.privacy.allowFriendRequests && <span className="text-xs">✓</span>}
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Preferences Settings */}
        <div className="bg-gradient-to-br from-purple-900/20 via-black/30 to-pink-900/20 rounded-2xl p-6 border-2 border-purple-400/30 transition-all duration-500 hover:border-purple-400/60 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.01] relative overflow-hidden group">
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <div className="mb-6 pb-4 border-b-2 border-purple-400/30 relative">
            <h3 className="flex items-center gap-3 text-2xl font-bold mb-2">
              <span className="text-3xl animate-bounce hover:animate-spin cursor-pointer transition-all duration-300 hover:scale-125 inline-block">🎨</span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 inline-block">Préférences</span>
            </h3>
            <p className="text-slate-300 text-sm font-medium">✨ Personnalisez l'apparence et le comportement ✨</p>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-black/30 via-purple-900/20 to-black/30 rounded-xl border-2 border-purple-400/20 transition-all duration-300 hover:border-purple-400/60 hover:bg-gradient-to-r hover:from-purple-900/30 hover:via-purple-800/20 hover:to-purple-900/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20 group/item">
              <div className="flex-1 flex flex-col gap-2">
                <h4 className="text-purple-100 text-lg font-bold flex items-center gap-2">
                  <span className="text-xl group-hover/item:animate-bounce inline-block">🌙</span>
                  <span className="group-hover/item:scale-105 transition-transform duration-300 inline-block">Thème</span>
                </h4>
                <p className="text-slate-300 text-sm">Choisissez votre thème préféré</p>
              </div>
              <select 
                className="bg-gradient-to-br from-black/40 to-purple-900/30 border-2 border-purple-400/30 rounded-xl text-purple-100 px-5 py-3 text-sm font-bold cursor-pointer transition-all duration-300 hover:bg-gradient-to-br hover:from-purple-900/40 hover:to-purple-800/30 hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/30 focus:outline-none focus:border-purple-400 focus:shadow-xl focus:shadow-purple-500/40 min-w-[160px] hover:scale-105"
                value={settings.preferences.theme}
                onChange={(e) => handleSettingChange('preferences', 'theme', e.target.value)}
              >
                <option value="dark" className="bg-gray-800 text-purple-100">🌙 Sombre</option>
                <option value="light" className="bg-gray-800 text-purple-100">☀️ Clair</option>
                <option value="auto" className="bg-gray-800 text-purple-100">🔄 Automatique</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-black/30 via-purple-900/20 to-black/30 rounded-xl border-2 border-purple-400/20 transition-all duration-300 hover:border-purple-400/60 hover:bg-gradient-to-r hover:from-purple-900/30 hover:via-purple-800/20 hover:to-purple-900/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20 group/item">
              <div className="flex-1 flex flex-col gap-2">
                <h4 className="text-purple-100 text-lg font-bold flex items-center gap-2">
                  <span className="text-xl group-hover/item:animate-bounce inline-block">🌍</span>
                  <span className="group-hover/item:scale-105 transition-transform duration-300 inline-block">Langue</span>
                </h4>
                <p className="text-slate-300 text-sm">Langue de l'interface</p>
              </div>
              <select 
                className="bg-gradient-to-br from-black/40 to-purple-900/30 border-2 border-purple-400/30 rounded-xl text-purple-100 px-5 py-3 text-sm font-bold cursor-pointer transition-all duration-300 hover:bg-gradient-to-br hover:from-purple-900/40 hover:to-purple-800/30 hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/30 focus:outline-none focus:border-purple-400 focus:shadow-xl focus:shadow-purple-500/40 min-w-[160px] hover:scale-105"
                value={settings.preferences.language}
                onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
              >
                <option value="fr" className="bg-gray-800 text-purple-100">🇫🇷 Français</option>
                <option value="en" className="bg-gray-800 text-purple-100">🇬🇧 English</option>
                <option value="es" className="bg-gray-800 text-purple-100">🇪🇸 Español</option>
                <option value="de" className="bg-gray-800 text-purple-100">🇩🇪 Deutsch</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-black/30 via-purple-900/20 to-black/30 rounded-xl border-2 border-purple-400/20 transition-all duration-300 hover:border-purple-400/60 hover:bg-gradient-to-r hover:from-purple-900/30 hover:via-purple-800/20 hover:to-purple-900/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20 group/item">
              <div className="flex-1 flex flex-col gap-2">
                <h4 className="text-purple-100 text-lg font-bold flex items-center gap-2">
                  <span className="text-xl group-hover/item:animate-bounce inline-block">🕐</span>
                  <span className="group-hover/item:scale-105 transition-transform duration-300 inline-block">Fuseau horaire</span>
                </h4>
                <p className="text-slate-300 text-sm">Fuseau horaire pour les horaires de jeu</p>
              </div>
              <select 
                className="bg-gradient-to-br from-black/40 to-purple-900/30 border-2 border-purple-400/30 rounded-xl text-purple-100 px-5 py-3 text-sm font-bold cursor-pointer transition-all duration-300 hover:bg-gradient-to-br hover:from-purple-900/40 hover:to-purple-800/30 hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/30 focus:outline-none focus:border-purple-400 focus:shadow-xl focus:shadow-purple-500/40 min-w-[160px] hover:scale-105"
                value={settings.preferences.timezone}
                onChange={(e) => handleSettingChange('preferences', 'timezone', e.target.value)}
              >
                <option value="Europe/Paris" className="bg-gray-800 text-purple-100">🇫🇷 Europe/Paris</option>
                <option value="America/New_York" className="bg-gray-800 text-purple-100">🇺🇸 America/New_York</option>
                <option value="America/Los_Angeles" className="bg-gray-800 text-purple-100">🇺🇸 America/Los_Angeles</option>
                <option value="Asia/Tokyo" className="bg-gray-800 text-purple-100">🇯🇵 Asia/Tokyo</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center mt-8 pt-8 border-t-2 border-white/30 relative z-10">
          <button 
            className="flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-green-400 via-yellow-400 via-orange-500 via-pink-500 to-purple-600 text-white border-none rounded-2xl text-xl font-bold cursor-pointer transition-all duration-500 shadow-2xl relative overflow-hidden group hover:-translate-y-2 hover:shadow-2xl hover:scale-105 animate-pulse hover:animate-none"
            onClick={handleSaveSettings}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            <span className="text-3xl animate-bounce group-hover:animate-spin inline-block">💾</span>
            <span className="relative z-10 drop-shadow-lg">Sauvegarder les paramètres</span>
            <span className="text-2xl animate-pulse group-hover:animate-bounce inline-block">✨</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings