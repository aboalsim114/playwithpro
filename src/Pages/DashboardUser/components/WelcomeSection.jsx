import React from 'react';

const WelcomeSection = () => (
  <div className="welcome-section">
    <div className="welcome-card">
      <div className="welcome-header">
        <h2 className="welcome-title">🎮 Prêt à Jouer avec les Pros !</h2>
        <p className="welcome-subtitle">
          Bon retour, Mark ! Réserve une session avec des joueurs professionnels ou reçois un coaching personnalisé.
        </p>
      </div>
      <div className="welcome-actions">
        <button className="action-button primary">
          <span className="button-icon">👥</span>
          <span className="button-text">Trouver un Pro</span>
        </button>
        <button className="action-button secondary">
          <span className="button-icon">🎯</span>
          <span className="button-text">Réserver Coaching</span>
        </button>
      </div>
    </div>
  </div>
);

export default WelcomeSection;
