import React from 'react';

const ProfileRightSidebar = ({ userData }) => {
  return (
    <div className="space-y-6">
      {/* Stats Card */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <span className="text-xl">📊</span>
          Statistiques
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Parties jouées</span>
            <span className="text-white font-semibold">{userData?.stats?.gamesPlayed || 0}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Taux de victoire</span>
            <span className="text-white font-semibold">{userData?.stats?.winRate || 0}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Heures totales</span>
            <span className="text-white font-semibold">{userData?.stats?.totalHours || 0}h</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Rang actuel</span>
            <span className="text-white font-semibold">{userData?.stats?.rank || 'Non classé'}</span>
          </div>
        </div>
      </div>

      {/* Recent Games */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <span className="text-xl">🎮</span>
          Parties récentes
        </h3>
        <div className="space-y-3">
          {userData?.recentGames?.slice(0, 3).map((game, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <div>
                <div className="text-white text-sm font-medium">{game.name}</div>
                <div className="text-gray-400 text-xs">{game.duration}</div>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-medium ${
                game.result === 'Victory' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-red-500 text-white'
              }`}>
                {game.result}
              </div>
            </div>
          )) || (
            <div className="text-gray-400 text-sm">Aucune partie récente</div>
          )}
        </div>
      </div>

      {/* Achievements Preview */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <span className="text-xl">🏆</span>
          Succès récents
        </h3>
        <div className="space-y-3">
          {userData?.achievements?.filter(a => a.unlocked).slice(0, 3).map((achievement, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
              <span className="text-2xl">{achievement.icon}</span>
              <div>
                <div className="text-white text-sm font-medium">{achievement.name}</div>
                <div className="text-gray-400 text-xs">{achievement.date}</div>
              </div>
            </div>
          )) || (
            <div className="text-gray-400 text-sm">Aucun succès débloqué</div>
          )}
        </div>
      </div>

 
    </div>
  );
};

export default ProfileRightSidebar;
