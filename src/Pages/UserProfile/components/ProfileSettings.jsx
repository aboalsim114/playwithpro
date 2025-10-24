import React, { useState } from 'react'
import './ProfileSettings.css'

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
    <div className="profile-settings">
      <div className="settings-header">
        <h2 className="settings-title">
          <span className="settings-icon">⚙️</span>
          Paramètres du profil
        </h2>
        <p className="settings-subtitle">Personnalisez votre expérience de jeu</p>
      </div>

      <div className="settings-content">
        {/* Notifications Settings */}
        <div className="settings-section">
          <div className="section-header">
            <h3 className="section-title">
              <span className="section-icon">🔔</span>
              Notifications
            </h3>
            <p className="section-description">Configurez les notifications que vous souhaitez recevoir</p>
          </div>
          
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-info">
                <h4 className="setting-name">Invitations de jeu</h4>
                <p className="setting-description">Recevoir des notifications pour les invitations de jeu</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.notifications.gameInvites}
                  onChange={(e) => handleSettingChange('notifications', 'gameInvites', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4 className="setting-name">Succès débloqués</h4>
                <p className="setting-description">Notifications pour les nouveaux succès</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.notifications.achievements}
                  onChange={(e) => handleSettingChange('notifications', 'achievements', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4 className="setting-name">Messages</h4>
                <p className="setting-description">Notifications pour les nouveaux messages</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.notifications.messages}
                  onChange={(e) => handleSettingChange('notifications', 'messages', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4 className="setting-name">Marketing</h4>
                <p className="setting-description">Notifications marketing et promotions</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.notifications.marketing}
                  onChange={(e) => handleSettingChange('notifications', 'marketing', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="settings-section">
          <div className="section-header">
            <h3 className="section-title">
              <span className="section-icon">🔒</span>
              Confidentialité
            </h3>
            <p className="section-description">Contrôlez qui peut voir vos informations</p>
          </div>
          
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-info">
                <h4 className="setting-name">Statut en ligne</h4>
                <p className="setting-description">Afficher votre statut en ligne aux autres joueurs</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.privacy.showOnlineStatus}
                  onChange={(e) => handleSettingChange('privacy', 'showOnlineStatus', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4 className="setting-name">Activité de jeu</h4>
                <p className="setting-description">Partager vos parties en cours avec vos amis</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.privacy.showGameActivity}
                  onChange={(e) => handleSettingChange('privacy', 'showGameActivity', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4 className="setting-name">Succès publics</h4>
                <p className="setting-description">Permettre aux autres de voir vos succès</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.privacy.showAchievements}
                  onChange={(e) => handleSettingChange('privacy', 'showAchievements', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4 className="setting-name">Demandes d'amis</h4>
                <p className="setting-description">Autoriser les demandes d'amis d'autres joueurs</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.privacy.allowFriendRequests}
                  onChange={(e) => handleSettingChange('privacy', 'allowFriendRequests', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Preferences Settings */}
        <div className="settings-section">
          <div className="section-header">
            <h3 className="section-title">
              <span className="section-icon">🎨</span>
              Préférences
            </h3>
            <p className="section-description">Personnalisez l'apparence et le comportement</p>
          </div>
          
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-info">
                <h4 className="setting-name">Thème</h4>
                <p className="setting-description">Choisissez votre thème préféré</p>
              </div>
              <select 
                className="setting-select"
                value={settings.preferences.theme}
                onChange={(e) => handleSettingChange('preferences', 'theme', e.target.value)}
              >
                <option value="dark">Sombre</option>
                <option value="light">Clair</option>
                <option value="auto">Automatique</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4 className="setting-name">Langue</h4>
                <p className="setting-description">Langue de l'interface</p>
              </div>
              <select 
                className="setting-select"
                value={settings.preferences.language}
                onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="de">Deutsch</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4 className="setting-name">Fuseau horaire</h4>
                <p className="setting-description">Fuseau horaire pour les horaires de jeu</p>
              </div>
              <select 
                className="setting-select"
                value={settings.preferences.timezone}
                onChange={(e) => handleSettingChange('preferences', 'timezone', e.target.value)}
              >
                <option value="Europe/Paris">Europe/Paris</option>
                <option value="America/New_York">America/New_York</option>
                <option value="America/Los_Angeles">America/Los_Angeles</option>
                <option value="Asia/Tokyo">Asia/Tokyo</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="settings-actions">
          <button className="save-button" onClick={handleSaveSettings}>
            <span className="button-icon">💾</span>
            Sauvegarder les paramètres
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings
