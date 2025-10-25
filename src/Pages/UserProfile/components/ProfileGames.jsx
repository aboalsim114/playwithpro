import React from 'react'

function ProfileGames({ userData }) {
  const getResultColor = (result) => {
    switch (result.toLowerCase()) {
      case 'victory': return 'var(--gaming-green)'
      case 'defeat': return 'var(--danger-red)'
      default: return 'var(--text-secondary)'
    }
  }

  const getResultIcon = (result) => {
    switch (result.toLowerCase()) {
      case 'victory': return '🏆'
      case 'defeat': return '💔'
      default: return '⚔️'
    }
  }

  const formatDuration = (duration) => {
    return duration
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Hier'
    if (diffDays === 2) return 'Il y a 2 jours'
    if (diffDays <= 7) return `Il y a ${diffDays} jours`
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <span className="text-3xl">🎮</span>
          Parties récentes
        </h2>
        <p className="text-gray-600">Vos dernières performances</p>
      </div>

      <div className="space-y-4 mb-8">
        {userData.recentGames.map((game, index) => (
          <div 
            key={game.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{game.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <span>⏱️</span>
                    {formatDuration(game.duration)}
                  </span>
                  <span className="flex items-center gap-1">
                    <span>📅</span>
                    {formatDate(game.date)}
                  </span>
                </div>
              </div>
            </div>

            <div 
              className="px-4 py-2 rounded-full text-white font-semibold flex items-center gap-2"
              style={{ 
                backgroundColor: getResultColor(game.result)
              }}
            >
              <span>{getResultIcon(game.result)}</span>
              <span>{game.result}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button className="flex items-center gap-3 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          <span className="text-xl">🚀</span>
          Nouvelle partie
        </button>
        <button className="flex items-center gap-3 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
          <span className="text-xl">📊</span>
          Voir toutes les statistiques
        </button>
      </div>

      {/* Performance Summary */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900">Résumé des performances</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {userData.recentGames.filter(g => g.result === 'Victory').length}
            </div>
            <div className="text-sm text-gray-600">Victoires</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">
              {userData.recentGames.filter(g => g.result === 'Defeat').length}
            </div>
            <div className="text-sm text-gray-600">Défaites</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {userData.recentGames.reduce((total, game) => {
                const [minutes, seconds] = game.duration.split(':').map(Number)
                return total + minutes + seconds / 60
              }, 0).toFixed(1)}h
            </div>
            <div className="text-sm text-gray-600">Temps total</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileGames
