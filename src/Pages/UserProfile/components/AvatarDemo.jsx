import React from 'react'
import DefaultAvatar from './DefaultAvatar'
import './AvatarDemo.css'

function AvatarDemo() {
  const demoUsers = [
    { username: 'GamerPro_123', userType: 'gamer' },
    { username: 'ProPlayer_456', userType: 'pro' },
    { username: 'StreamerQueen_789', userType: 'streamer' },
    { username: 'CyberNinja', userType: 'gamer' },
    { username: 'EliteGamer', userType: 'pro' }
  ]

  return (
    <div className="avatar-demo">
      <h3>Démonstration des Avatars par Défaut</h3>
      <div className="demo-grid">
        {demoUsers.map((user, index) => (
          <div key={index} className="demo-item">
            <DefaultAvatar 
              username={user.username}
              userType={user.userType}
              size="medium"
            />
            <div className="demo-info">
              <div className="demo-username">{user.username}</div>
              <div className="demo-type">{user.userType}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AvatarDemo
