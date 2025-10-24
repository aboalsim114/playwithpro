import React from 'react'
import './DefaultAvatar.css'

function DefaultAvatar({ username, userType, size = 'large' }) {
  // Générer les initiales à partir du nom d'utilisateur
  const getInitials = (name) => {
    if (!name) return '??'
    return name
      .split('_')
      .map(part => part.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2)
  }

  // Couleurs selon le type d'utilisateur
  const getUserTypeColors = (type) => {
    switch (type) {
      case 'pro':
        return {
          primary: '#ff6b35',
          secondary: '#e55a2b',
          glow: 'rgba(255, 107, 53, 0.3)'
        }
      case 'streamer':
        return {
          primary: '#8b5cf6',
          secondary: '#7c3aed',
          glow: 'rgba(139, 92, 246, 0.3)'
        }
      default:
        return {
          primary: '#00ff88',
          secondary: '#00cc6a',
          glow: 'rgba(0, 255, 136, 0.3)'
        }
    }
  }

  const colors = getUserTypeColors(userType)
  const initials = getInitials(username)

  return (
    <div className={`default-avatar ${size}`}>
      <div 
        className="avatar-background"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          boxShadow: `0 0 20px ${colors.glow}`
        }}
      >
        <div className="avatar-pattern">
          <div className="pattern-line"></div>
          <div className="pattern-line"></div>
          <div className="pattern-line"></div>
        </div>
        <div className="avatar-initials">
          {initials}
        </div>
        <div className="avatar-glow"></div>
      </div>
      <div className="avatar-ring"></div>
    </div>
  )
}

export default DefaultAvatar
