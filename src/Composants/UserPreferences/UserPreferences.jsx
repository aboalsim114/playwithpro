import React from 'react'
import { useUser } from '../../store/hooks'
import { setTheme, setLanguage, toggleNotifications } from '../../store/slices/userSlice'

function UserPreferences() {
  const { preferences, dispatch } = useUser()

  const handleThemeChange = (theme) => {
    dispatch(setTheme(theme))
  }

  const handleLanguageChange = (language) => {
    dispatch(setLanguage(language))
  }

  const handleNotificationToggle = () => {
    dispatch(toggleNotifications())
  }

  return (
    <div className="user-preferences" style={{
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      margin: '20px 0'
    }}>
      <h3>Préférences Utilisateur</h3>
      
      <div className="preference-group" style={{ marginBottom: '15px' }}>
        <label>Thème :</label>
        <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
          <button
            onClick={() => handleThemeChange('light')}
            style={{
              padding: '8px 16px',
              backgroundColor: preferences.theme === 'light' ? '#007bff' : '#e9ecef',
              color: preferences.theme === 'light' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clair
          </button>
          <button
            onClick={() => handleThemeChange('dark')}
            style={{
              padding: '8px 16px',
              backgroundColor: preferences.theme === 'dark' ? '#007bff' : '#e9ecef',
              color: preferences.theme === 'dark' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Sombre
          </button>
        </div>
      </div>

      <div className="preference-group" style={{ marginBottom: '15px' }}>
        <label>Langue :</label>
        <select
          value={preferences.language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          style={{
            padding: '8px',
            marginTop: '5px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div>

      <div className="preference-group">
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="checkbox"
            checked={preferences.notifications}
            onChange={handleNotificationToggle}
          />
          Notifications activées
        </label>
      </div>

      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
        <h4>État actuel :</h4>
        <pre style={{ fontSize: '12px', margin: 0 }}>
          {JSON.stringify(preferences, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export default UserPreferences
