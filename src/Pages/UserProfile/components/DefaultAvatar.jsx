import React from 'react'

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

  const sizeClasses = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-12 h-12 text-base',
    large: 'w-16 h-16 text-xl',
    xlarge: 'w-20 h-20 text-2xl'
  }

  return (
    <div className={`relative ${sizeClasses[size] || sizeClasses.large}`}>
      <div 
        className="w-full h-full rounded-full flex items-center justify-center font-bold text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          boxShadow: `0 0 20px ${colors.glow}`
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-white/30"></div>
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/30"></div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/30"></div>
        </div>
        <div className="relative z-10">
          {initials}
        </div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
      </div>
      <div className="absolute inset-0 rounded-full border-2 border-white/30"></div>
    </div>
  )
}

export default DefaultAvatar
