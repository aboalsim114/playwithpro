import React from 'react';

const ProfileSidebar = ({ 
  activeTab, 
  onTabChange,
  userData 
}) => {
  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: '📊' },
    { id: 'achievements', label: 'Succès', icon: '🏆' },
    { id: 'games', label: 'Jeux', icon: '🎮' },
    { id: 'settings', label: 'Paramètres', icon: '⚙️' }
  ];

  const renderTabItem = (tab) => (
    <button 
      key={tab.id}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-all duration-300 ${
        activeTab === tab.id 
          ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25' 
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
      onClick={() => onTabChange(tab.id)}
    >
      <span className="text-xl">{tab.icon}</span>
      <span className="font-medium">{tab.label}</span>
    </button>
  );

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gray-800 border-r border-gray-700 z-40">
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">PLAY-WITH-PRO</div>
            <div className="text-sm text-gray-300 font-medium">E-Sport Platform</div>
          </div>
        </div>
        
        {/* User Profile Summary */}
        <div className="p-4 border-b border-gray-700">
          <div className="bg-gray-700 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {userData?.username?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <div className="text-white text-sm font-medium">{userData?.fullName || 'Utilisateur'}</div>
                <div className="text-gray-400 text-xs">@{userData?.username || 'username'}</div>
                <div className="text-gray-400 text-xs">Niveau {userData?.level || 1}</div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>{userData?.stats?.gamesPlayed || 0} parties</span>
              <span>{userData?.stats?.winRate || 0}% victoires</span>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {tabs.map(renderTabItem)}
        </nav>
        
        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-700">
          <div className="space-y-2">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Quick Match
            </button>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Support
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
