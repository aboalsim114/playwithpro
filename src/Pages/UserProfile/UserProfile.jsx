import React from 'react'
import { useParams } from 'react-router-dom'
import './UserProfile.css'

function UserProfile() {
  const { id } = useParams()

  return (
    <div className="user-profile">
      <div className="profile-content">
        <div className="profile-header">
          <h1>Profil Utilisateur #{id}</h1>
          <p>Page de profil en cours de développement...</p>
        </div>
        
        <div className="profile-body">
          <div className="profile-card">
            <h2>Informations du profil</h2>
            <p>ID utilisateur: {id}</p>
            <p>Cette page affichera les informations détaillées de l'utilisateur.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
