import React from 'react'
import './GamesSection.css'

function GamesSection() {
  return (
    <section className="games-section" id="games">
      <div className="games-container">
        {/* Section Header */}
        <div className="games-header">
          <h2 className="games-title">
            <span className="title-text">Découvrez nos</span>
            <span className="title-gradient">Jeux Disponibles</span>
          </h2>
          <p className="games-description">
            Plongez dans l'univers du gaming compétitif avec nos jeux les plus populaires. Chaque titre offre une expérience unique et des défis passionnants.
          </p>
        </div>

        {/* Games Grid */}
        <div className="games-grid">
          {/* CS2 Card */}
          <div className="game-card cs2">
            <div className="game-image">
              <div className="game-logo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div className="game-overlay">
                <div className="game-status">
                  <div className="status-dot green"></div>
                  <span>En Ligne</span>
                </div>
              </div>
            </div>
            <div className="game-info">
              <h3 className="game-name">Counter-Strike 2</h3>
              <p className="game-description">Tactical FPS compétitif</p>
              <div className="game-stats">
                <div className="stat">
                  <span className="stat-label">Joueurs</span>
                  <span className="stat-value">1.2M</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Rating</span>
                  <span className="stat-value">4.8/5</span>
                </div>
              </div>
              <button className="play-game-btn">
                <svg className="play-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
                <span>Jouer</span>
              </button>
            </div>
          </div>

          {/* Valorant Card */}
          <div className="game-card valorant">
            <div className="game-image">
              <div className="game-logo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div className="game-overlay">
                <div className="game-status">
                  <div className="status-dot green"></div>
                  <span>En Ligne</span>
                </div>
              </div>
            </div>
            <div className="game-info">
              <h3 className="game-name">Valorant</h3>
              <p className="game-description">FPS tactique avec agents</p>
              <div className="game-stats">
                <div className="stat">
                  <span className="stat-label">Joueurs</span>
                  <span className="stat-value">850K</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Rating</span>
                  <span className="stat-value">4.7/5</span>
                </div>
              </div>
              <button className="play-game-btn">
                <svg className="play-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
                <span>Jouer</span>
              </button>
            </div>
          </div>

          {/* League of Legends Card */}
          <div className="game-card lol">
            <div className="game-image">
              <div className="game-logo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 12h8"/>
                  <path d="M12 8v8"/>
                </svg>
              </div>
              <div className="game-overlay">
                <div className="game-status">
                  <div className="status-dot green"></div>
                  <span>En Ligne</span>
                </div>
              </div>
            </div>
            <div className="game-info">
              <h3 className="game-name">League of Legends</h3>
              <p className="game-description">MOBA stratégique</p>
              <div className="game-stats">
                <div className="stat">
                  <span className="stat-label">Joueurs</span>
                  <span className="stat-value">2.1M</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Rating</span>
                  <span className="stat-value">4.6/5</span>
                </div>
              </div>
              <button className="play-game-btn">
                <svg className="play-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
                <span>Jouer</span>
              </button>
            </div>
          </div>

          {/* Dota 2 Card */}
          <div className="game-card dota2">
            <div className="game-image">
              <div className="game-logo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                  <path d="M4 22h16"/>
                  <path d="M10 14.66V17c0 .55.47.98.97 1.21l1.03.4c.5.23 1.03.23 1.53 0l1.03-.4c.5-.23.97-.66.97-1.21v-2.34"/>
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                </svg>
              </div>
              <div className="game-overlay">
                <div className="game-status">
                  <div className="status-dot green"></div>
                  <span>En Ligne</span>
                </div>
              </div>
            </div>
            <div className="game-info">
              <h3 className="game-name">Dota 2</h3>
              <p className="game-description">MOBA complexe</p>
              <div className="game-stats">
                <div className="stat">
                  <span className="stat-label">Joueurs</span>
                  <span className="stat-value">680K</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Rating</span>
                  <span className="stat-value">4.5/5</span>
                </div>
              </div>
              <button className="play-game-btn">
                <svg className="play-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
                <span>Jouer</span>
              </button>
            </div>
          </div>

          {/* Apex Legends Card */}
          <div className="game-card apex">
            <div className="game-image">
              <div className="game-logo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <div className="game-overlay">
                <div className="game-status">
                  <div className="status-dot green"></div>
                  <span>En Ligne</span>
                </div>
              </div>
            </div>
            <div className="game-info">
              <h3 className="game-name">Apex Legends</h3>
              <p className="game-description">Battle Royale</p>
              <div className="game-stats">
                <div className="stat">
                  <span className="stat-label">Joueurs</span>
                  <span className="stat-value">920K</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Rating</span>
                  <span className="stat-value">4.4/5</span>
                </div>
              </div>
              <button className="play-game-btn">
                <svg className="play-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
                <span>Jouer</span>
              </button>
            </div>
          </div>

          {/* Rocket League Card */}
          <div className="game-card rocket">
            <div className="game-image">
              <div className="game-logo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div className="game-overlay">
                <div className="game-status">
                  <div className="status-dot green"></div>
                  <span>En Ligne</span>
                </div>
              </div>
            </div>
            <div className="game-info">
              <h3 className="game-name">Rocket League</h3>
              <p className="game-description">Football avec voitures</p>
              <div className="game-stats">
                <div className="stat">
                  <span className="stat-label">Joueurs</span>
                  <span className="stat-value">450K</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Rating</span>
                  <span className="stat-value">4.3/5</span>
                </div>
              </div>
              <button className="play-game-btn">
                <svg className="play-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
                <span>Jouer</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section Footer */}
        <div className="games-footer">
          <div className="total-stats">
            <div className="total-stat">
              <div className="total-value">6</div>
              <div className="total-label">Jeux Disponibles</div>
            </div>
            <div className="total-stat">
              <div className="total-value">6.2M</div>
              <div className="total-label">Joueurs Actifs</div>
            </div>
            <div className="total-stat">
              <div className="total-value">4.6/5</div>
              <div className="total-label">Note Moyenne</div>
            </div>
          </div>
          <button className="view-all-btn">
            <span>Voir Tous les Jeux</span>
            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default GamesSection
