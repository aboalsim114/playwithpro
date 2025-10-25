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
    <div className="bg-gray-800/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 relative overflow-hidden">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 via-orange-500 to-purple-600 animate-pulse"></div>
      
      <div className="text-center mb-8">
        <h2 className="flex items-center justify-center gap-3 text-3xl font-bold text-indigo-100 mb-2 drop-shadow-lg">
          <span className="text-4xl animate-bounce">⚙️</span>
          Paramètres du profil
        </h2>
        <p className="text-slate-400 text-base">Personnalisez votre expérience de jeu</p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Notifications Settings */}
        <div className="bg-black/20 rounded-xl p-6 border border-white/20 transition-all duration-300 hover:bg-black/30 hover:shadow-lg">
          <div className="mb-6 pb-4 border-b border-white/20">
            <h3 className="flex items-center gap-3 text-xl font-semibold text-indigo-100 mb-2">
              <span className="text-2xl text-green-400">🔔</span>
              Notifications
            </h3>
            <p className="text-slate-400 text-sm">Configurez les notifications que vous souhaitez recevoir</p>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/20 transition-all duration-300 hover:bg-black/30 hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex-1 flex flex-col gap-1">
                <h4 className="text-indigo-100 text-lg font-semibold">Invitations de jeu</h4>
                <p className="text-slate-400 text-sm">Recevoir des notifications pour les invitations de jeu</p>
              </div>
              <label className="relative inline-block w-12 h-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.gameInvites}
                  onChange={(e) => handleSettingChange('notifications', 'gameInvites', e.target.checked)}
                  className="opacity-0 w-0 h-0"
                />
                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 border border-white/20 hover:shadow-lg ${
                  settings.notifications.gameInvites 
                    ? 'bg-green-400 shadow-lg shadow-green-400/30' 
                    : 'bg-black/30'
                }`}>
                  <span className={`absolute h-4 w-4 left-0.5 bottom-0.5 rounded-full transition-all duration-300 ${
                    settings.notifications.gameInvites 
                      ? 'bg-white translate-x-6' 
                      : 'bg-slate-400'
                  }`}></span>
                </span>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/20 transition-all duration-300 hover:bg-black/30 hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex-1 flex flex-col gap-1">
                <h4 className="text-indigo-100 text-lg font-semibold">Succès débloqués</h4>
                <p className="text-slate-400 text-sm">Notifications pour les nouveaux succès</p>
              </div>
              <label className="relative inline-block w-12 h-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.achievements}
                  onChange={(e) => handleSettingChange('notifications', 'achievements', e.target.checked)}
                  className="opacity-0 w-0 h-0"
                />
                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 border border-white/20 hover:shadow-lg ${
                  settings.notifications.achievements 
                    ? 'bg-green-400 shadow-lg shadow-green-400/30' 
                    : 'bg-black/30'
                }`}>
                  <span className={`absolute h-4 w-4 left-0.5 bottom-0.5 rounded-full transition-all duration-300 ${
                    settings.notifications.achievements 
                      ? 'bg-white translate-x-6' 
                      : 'bg-slate-400'
                  }`}></span>
                </span>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/20 transition-all duration-300 hover:bg-black/30 hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex-1 flex flex-col gap-1">
                <h4 className="text-indigo-100 text-lg font-semibold">Messages</h4>
                <p className="text-slate-400 text-sm">Notifications pour les nouveaux messages</p>
              </div>
              <label className="relative inline-block w-12 h-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.messages}
                  onChange={(e) => handleSettingChange('notifications', 'messages', e.target.checked)}
                  className="opacity-0 w-0 h-0"
                />
                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 border border-white/20 hover:shadow-lg ${
                  settings.notifications.messages 
                    ? 'bg-green-400 shadow-lg shadow-green-400/30' 
                    : 'bg-black/30'
                }`}>
                  <span className={`absolute h-4 w-4 left-0.5 bottom-0.5 rounded-full transition-all duration-300 ${
                    settings.notifications.messages 
                      ? 'bg-white translate-x-6' 
                      : 'bg-slate-400'
                  }`}></span>
                </span>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/20 transition-all duration-300 hover:bg-black/30 hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex-1 flex flex-col gap-1">
                <h4 className="text-indigo-100 text-lg font-semibold">Marketing</h4>
                <p className="text-slate-400 text-sm">Notifications marketing et promotions</p>
              </div>
              <label className="relative inline-block w-12 h-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.marketing}
                  onChange={(e) => handleSettingChange('notifications', 'marketing', e.target.checked)}
                  className="opacity-0 w-0 h-0"
                />
                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 border border-white/20 hover:shadow-lg ${
                  settings.notifications.marketing 
                    ? 'bg-green-400 shadow-lg shadow-green-400/30' 
                    : 'bg-black/30'
                }`}>
                  <span className={`absolute h-4 w-4 left-0.5 bottom-0.5 rounded-full transition-all duration-300 ${
                    settings.notifications.marketing 
                      ? 'bg-white translate-x-6' 
                      : 'bg-slate-400'
                  }`}></span>
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-black/20 rounded-xl p-6 border border-white/20 transition-all duration-300 hover:bg-black/30 hover:shadow-lg">
          <div className="mb-6 pb-4 border-b border-white/20">
            <h3 className="flex items-center gap-3 text-xl font-semibold text-indigo-100 mb-2">
              <span className="text-2xl text-blue-400">🔒</span>
              Confidentialité
            </h3>
            <p className="text-slate-400 text-sm">Contrôlez qui peut voir vos informations</p>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/20 transition-all duration-300 hover:bg-black/30 hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex-1 flex flex-col gap-1">
                <h4 className="text-indigo-100 text-lg font-semibold">Statut en ligne</h4>
                <p className="text-slate-400 text-sm">Afficher votre statut en ligne aux autres joueurs</p>
              </div>
              <label className="relative inline-block w-12 h-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.privacy.showOnlineStatus}
                  onChange={(e) => handleSettingChange('privacy', 'showOnlineStatus', e.target.checked)}
                  className="opacity-0 w-0 h-0"
                />
                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 border border-white/20 hover:shadow-lg ${
                  settings.privacy.showOnlineStatus 
                    ? 'bg-green-400 shadow-lg shadow-green-400/30' 
                    : 'bg-black/30'
                }`}>
                  <span className={`absolute h-4 w-4 left-0.5 bottom-0.5 rounded-full transition-all duration-300 ${
                    settings.privacy.showOnlineStatus 
                      ? 'bg-white translate-x-6' 
                      : 'bg-slate-400'
                  }`}></span>
                </span>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/20 transition-all duration-300 hover:bg-black/30 hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex-1 flex flex-col gap-1">
                <h4 className="text-indigo-100 text-lg font-semibold">Activité de jeu</h4>
                <p className="text-slate-400 text-sm">Partager vos parties en cours avec vos amis</p>
              </div>
              <label className="relative inline-block w-12 h-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.privacy.showGameActivity}
                  onChange={(e) => handleSettingChange('privacy', 'showGameActivity', e.target.checked)}
                  className="opacity-0 w-0 h-0"
                />
                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 border border-white/20 hover:shadow-lg ${
                  settings.privacy.showGameActivity 
                    ? 'bg-green-400 shadow-lg shadow-green-400/30' 
                    : 'bg-black/30'
                }`}>
                  <span className={`absolute h-4 w-4 left-0.5 bottom-0.5 rounded-full transition-all duration-300 ${
                    settings.privacy.showGameActivity 
                      ? 'bg-white translate-x-6' 
                      : 'bg-slate-400'
                  }`}></span>
                </span>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/20 transition-all duration-300 hover:bg-black/30 hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex-1 flex flex-col gap-1">
                <h4 className="text-indigo-100 text-lg font-semibold">Succès publics</h4>
                <p className="text-slate-400 text-sm">Permettre aux autres de voir vos succès</p>
              </div>
              <label className="relative inline-block w-12 h-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.privacy.showAchievements}
                  onChange={(e) => handleSettingChange('privacy', 'showAchievements', e.target.checked)}
                  className="opacity-0 w-0 h-0"
                />
                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 border border-white/20 hover:shadow-lg ${
                  settings.privacy.showAchievements 
                    ? 'bg-green-400 shadow-lg shadow-green-400/30' 
                    : 'bg-black/30'
                }`}>
                  <span className={`absolute h-4 w-4 left-0.5 bottom-0.5 rounded-full transition-all duration-300 ${
                    settings.privacy.showAchievements 
                      ? 'bg-white translate-x-6' 
                      : 'bg-slate-400'
                  }`}></span>
                </span>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/20 transition-all duration-300 hover:bg-black/30 hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex-1 flex flex-col gap-1">
                <h4 className="text-indigo-100 text-lg font-semibold">Demandes d'amis</h4>
                <p className="text-slate-400 text-sm">Autoriser les demandes d'amis d'autres joueurs</p>
              </div>
              <label className="relative inline-block w-12 h-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.privacy.allowFriendRequests}
                  onChange={(e) => handleSettingChange('privacy', 'allowFriendRequests', e.target.checked)}
                  className="opacity-0 w-0 h-0"
                />
                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 border border-white/20 hover:shadow-lg ${
                  settings.privacy.allowFriendRequests 
                    ? 'bg-green-400 shadow-lg shadow-green-400/30' 
                    : 'bg-black/30'
                }`}>
                  <span className={`absolute h-4 w-4 left-0.5 bottom-0.5 rounded-full transition-all duration-300 ${
                    settings.privacy.allowFriendRequests 
                      ? 'bg-white translate-x-6' 
                      : 'bg-slate-400'
                  }`}></span>
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Preferences Settings */}
        <div className="bg-black/20 rounded-xl p-6 border border-white/20 transition-all duration-300 hover:bg-black/30 hover:shadow-lg">
          <div className="mb-6 pb-4 border-b border-white/20">
            <h3 className="flex items-center gap-3 text-xl font-semibold text-indigo-100 mb-2">
              <span className="text-2xl text-purple-400">🎨</span>
              Préférences
            </h3>
            <p className="text-slate-400 text-sm">Personnalisez l'apparence et le comportement</p>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/20 transition-all duration-300 hover:bg-black/30 hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex-1 flex flex-col gap-1">
                <h4 className="text-indigo-100 text-lg font-semibold">Thème</h4>
                <p className="text-slate-400 text-sm">Choisissez votre thème préféré</p>
              </div>
              <select 
                className="bg-black/30 border border-white/20 rounded-lg text-indigo-100 px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-300 hover:bg-black/40 hover:border-green-400 hover:shadow-lg focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/30 min-w-[150px]"
                value={settings.preferences.theme}
                onChange={(e) => handleSettingChange('preferences', 'theme', e.target.value)}
              >
                <option value="dark" className="bg-gray-800 text-indigo-100">Sombre</option>
                <option value="light" className="bg-gray-800 text-indigo-100">Clair</option>
                <option value="auto" className="bg-gray-800 text-indigo-100">Automatique</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/20 transition-all duration-300 hover:bg-black/30 hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex-1 flex flex-col gap-1">
                <h4 className="text-indigo-100 text-lg font-semibold">Langue</h4>
                <p className="text-slate-400 text-sm">Langue de l'interface</p>
              </div>
              <select 
                className="bg-black/30 border border-white/20 rounded-lg text-indigo-100 px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-300 hover:bg-black/40 hover:border-green-400 hover:shadow-lg focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/30 min-w-[150px]"
                value={settings.preferences.language}
                onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
              >
                <option value="fr" className="bg-gray-800 text-indigo-100">Français</option>
                <option value="en" className="bg-gray-800 text-indigo-100">English</option>
                <option value="es" className="bg-gray-800 text-indigo-100">Español</option>
                <option value="de" className="bg-gray-800 text-indigo-100">Deutsch</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/20 transition-all duration-300 hover:bg-black/30 hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex-1 flex flex-col gap-1">
                <h4 className="text-indigo-100 text-lg font-semibold">Fuseau horaire</h4>
                <p className="text-slate-400 text-sm">Fuseau horaire pour les horaires de jeu</p>
              </div>
              <select 
                className="bg-black/30 border border-white/20 rounded-lg text-indigo-100 px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-300 hover:bg-black/40 hover:border-green-400 hover:shadow-lg focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/30 min-w-[150px]"
                value={settings.preferences.timezone}
                onChange={(e) => handleSettingChange('preferences', 'timezone', e.target.value)}
              >
                <option value="Europe/Paris" className="bg-gray-800 text-indigo-100">Europe/Paris</option>
                <option value="America/New_York" className="bg-gray-800 text-indigo-100">America/New_York</option>
                <option value="America/Los_Angeles" className="bg-gray-800 text-indigo-100">America/Los_Angeles</option>
                <option value="Asia/Tokyo" className="bg-gray-800 text-indigo-100">Asia/Tokyo</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center mt-8 pt-8 border-t border-white/20">
          <button 
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-400 to-orange-500 text-white border-none rounded-xl text-lg font-semibold cursor-pointer transition-all duration-300 shadow-lg relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl"
            onClick={handleSaveSettings}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
            <span className="text-2xl">💾</span>
            Sauvegarder les paramètres
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings