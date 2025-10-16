import React from 'react'
import './Inscription.css'
import Navbar from '../../Composants/Navbar/Navbar'

function Inscription() {
  return (
    <div>
      <Navbar />
      <div className="inscription-page">
        <div className="inscription-container">
          <div className="inscription-header">
            <h1>Inscription</h1>
            <p>Rejoins la communauté PlayWithPro</p>
          </div>
          
          <div className="inscription-form">
            <form>
              <div className="form-group">
                <label htmlFor="username">Nom d'utilisateur</label>
                <input type="text" id="username" name="username" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input type="password" id="password" name="password" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required />
              </div>
              
              <button type="submit" className="inscription-btn">
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inscription
