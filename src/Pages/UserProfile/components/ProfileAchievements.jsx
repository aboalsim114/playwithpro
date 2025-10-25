import React from 'react'

function ProfileAchievements({ achievements }) {
  const unlockedCount = achievements.filter(achievement => achievement.unlocked).length
  const totalCount = achievements.length
  const progressPercentage = (unlockedCount / totalCount) * 100

  const formatDate = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <span className="text-3xl">🏆</span>
          Succès et récompenses
        </h2>
        <p className="text-gray-600">
          {unlockedCount} sur {totalCount} succès débloqués
        </p>
      </div>

      {/* Progress Overview */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Progression globale</span>
          <span className="text-sm font-bold text-blue-600">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {achievements.map((achievement, index) => (
          <div 
            key={achievement.id}
            className={`p-6 rounded-xl border-2 transition-all duration-300 ${
              achievement.unlocked 
                ? 'bg-green-50 border-green-200 shadow-lg' 
                : 'bg-gray-50 border-gray-200'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <span className={`text-4xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                  {achievement.icon}
                </span>
                {achievement.unlocked && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">{achievement.name}</h3>
                {achievement.unlocked ? (
                  <div>
                    <span className="text-sm text-green-600 font-medium">
                      Débloqué le {formatDate(achievement.date)}
                    </span>
                    <div className="mt-2">
                      <span className="text-sm text-green-600 font-medium">🎉 Félicitations !</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="text-sm text-gray-500">Verrouillé</span>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-300 h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">0%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <div className="text-3xl mb-2">🏆</div>
          <div className="text-2xl font-bold text-blue-600 mb-1">{unlockedCount}</div>
          <div className="text-sm text-blue-700">Succès débloqués</div>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-6 text-center">
          <div className="text-3xl mb-2">🎯</div>
          <div className="text-2xl font-bold text-orange-600 mb-1">{totalCount - unlockedCount}</div>
          <div className="text-sm text-orange-700">En cours</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-6 text-center">
          <div className="text-3xl mb-2">📈</div>
          <div className="text-2xl font-bold text-green-600 mb-1">{Math.round(progressPercentage)}%</div>
          <div className="text-sm text-green-700">Complétion</div>
        </div>
      </div>

      {/* Next Achievement Hint */}
      {unlockedCount < totalCount && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🎯</span>
            <h3 className="text-xl font-bold">Prochain objectif</h3>
          </div>
          <div>
            <p className="text-blue-100 mb-4">Continuez à jouer pour débloquer de nouveaux succès !</p>
            <button className="bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
              <span className="text-xl">🚀</span>
              Jouer maintenant
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileAchievements
