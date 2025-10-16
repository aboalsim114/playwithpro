import React from 'react'
import './Connexion.css'
import Navbar from '../../Composants/Navbar/Navbar'

function Connexion() {
  return (
    <div>
      <Navbar />
      <div className="connexion-page">
        <div className="connexion-container">
          <div className="connexion-header">
            <h1>Connexion</h1>
            <p>Connecte-toi à ton compte PlayWithPro</p>
          </div>
          
          <div className="connexion-form">
            <form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input type="password" id="password" name="password" required />
              </div>
              
              <div className="form-options">
                <label className="checkbox-container">
                  <input type="checkbox" name="remember" />
                  <span className="checkmark"></span>
                  Se souvenir de moi
                </label>
                <a href="#" className="forgot-password">Mot de passe oublié ?</a>
              </div>
              
              <button type="submit" className="connexion-btn">
                Se connecter
              </button>
            </form>
            
            <div className="connexion-footer">
              <p>Pas encore de compte ? <a href="/inscription">S'inscrire</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Connexion
