import React from 'react'

function ProfileStats({ userData }) {
  const stats = [
    {
      label: 'Parties jouées',
      value: userData.stats.gamesPlayed,
      icon: '🎮',
      color: 'var(--gaming-green)',
      suffix: ' parties'
    },
    {
      label: 'Taux de victoire',
      value: userData.stats.winRate,
      icon: '🏆',
      color: 'var(--pro-orange)',
      suffix: '%'
    },
    {
      label: 'Heures totales',
      value: userData.stats.totalHours,
      icon: '⏱️',
      color: 'var(--accent-cyan)',
      suffix: 'h'
    },
    {
      label: 'Rang actuel',
      value: userData.stats.rank,
      icon: '💎',
      color: 'var(--streamer-purple)',
      suffix: ''
    }
  ]

  const getWinRateColor = (rate) => {
    if (rate >= 80) return 'var(--gaming-green)'
    if (rate >= 60) return 'var(--pro-orange)'
    return 'var(--danger-red)'
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <span className="text-3xl">📊</span>
          Statistiques de jeu
        </h2>
        <p className="text-gray-600">Vos performances en un coup d'œil</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={stat.label}
            className="relative p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{ backgroundColor: stat.color + '20' }}>
                {stat.icon}
              </div>
              <div className="flex-1">
                <div className="text-2xl font-bold text-gray-900">
                  {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                  <span className="text-lg text-gray-600">{stat.suffix}</span>
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
            
            {stat.label === 'Taux de victoire' && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Progression</span>
                  <span className="text-sm font-semibold" style={{ color: getWinRateColor(stat.value) }}>
                    {stat.value}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${stat.value}%`,
                      backgroundColor: getWinRateColor(stat.value)
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Enhanced Favorite Game Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="text-xl font-bold">Jeu favori</h3>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <span className="text-3xl">🎮</span>
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold mb-2">{userData.stats.favoriteGame}</h4>
            <p className="text-blue-100 mb-4">Votre jeu le plus joué cette saison</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-sm text-blue-200">Temps joué</div>
                <div className="text-lg font-bold">342h</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-sm text-blue-200">Victoires</div>
                <div className="text-lg font-bold">127</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileStats
