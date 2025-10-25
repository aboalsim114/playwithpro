import React from 'react'
import DefaultAvatar from './DefaultAvatar'

function AvatarDemo() {
  const demoUsers = [
    { username: 'GamerPro_123', userType: 'gamer' },
    { username: 'ProPlayer_456', userType: 'pro' },
    { username: 'StreamerQueen_789', userType: 'streamer' },
    { username: 'CyberNinja', userType: 'gamer' },
    { username: 'EliteGamer', userType: 'pro' }
  ]

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Démonstration des Avatars par Défaut</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoUsers.map((user, index) => (
          <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <DefaultAvatar 
              username={user.username}
              userType={user.userType}
              size="medium"
            />
            <div>
              <div className="font-semibold text-gray-900">{user.username}</div>
              <div className="text-sm text-gray-600 capitalize">{user.userType}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AvatarDemo
