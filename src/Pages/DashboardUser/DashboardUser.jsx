import React, { useState } from 'react'
import './DashboardUser.css'

const DashboardUser = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [userStats] = useState({
    level: 15,
    xp: 2450,
    nextLevelXp: 3000,
    totalMatches: 47,
    winRate: 68,
    totalCoaching: 12,
    badges: 8,
    rank: 'Diamond',
    nextRank: 'Master'
  })

  const [recentMatches] = useState([
    { id: 1, game: 'CS2', pro: 'ProGamer_CS', duration: '1h', date: '2024-01-15', status: 'completed', rating: 5, result: 'Victory' },
    { id: 2, game: 'Valorant', pro: 'AimMaster', duration: '30min', date: '2024-01-14', status: 'completed', rating: 4, result: 'Victory' },
    { id: 3, game: 'LoL', pro: 'LeaguePro', duration: '45min', date: '2024-01-13', status: 'scheduled', rating: null, result: null }
  ])

  const [availablePros] = useState([
    { id: 1, name: 'ProGamer_CS', game: 'CS2', rating: 4.9, price: 25, online: true, speciality: 'AWP Specialist', matches: 1247, winRate: 89 },
    { id: 2, name: 'AimMaster', game: 'Valorant', rating: 4.8, price: 20, online: true, speciality: 'Duelist', matches: 892, winRate: 85 },
    { id: 3, name: 'LeaguePro', game: 'LoL', rating: 4.9, price: 30, online: false, speciality: 'Mid Lane', matches: 1563, winRate: 92 },
    { id: 4, name: 'FortniteKing', game: 'Fortnite', rating: 4.7, price: 18, online: true, speciality: 'Builder', matches: 743, winRate: 78 }
  ])

  const xpPercentage = (userStats.xp / userStats.nextLevelXp) * 100

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="user-profile">
            <div className="profile-avatar">
              <span>U</span>
              <div className="online-status"></div>
            </div>
            <div className="profile-info">
              <h3>Joueur</h3>
              <p>Niveau {userStats.level}</p>
            </div>
          </div>
          <div className="rank-badge">
            <span className="rank-text">{userStats.rank}</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <div className="nav-icon">🏠</div>
            <span>Accueil</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'book' ? 'active' : ''}`}
            onClick={() => setActiveTab('book')}
          >
            <div className="nav-icon">🎯</div>
            <span>Réserver</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <div className="nav-icon">📊</div>
            <span>Historique</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'coaching' ? 'active' : ''}`}
            onClick={() => setActiveTab('coaching')}
          >
            <div className="nav-icon">🧠</div>
            <span>Coaching</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <div className="nav-icon">⚙️</div>
            <span>Profil</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="xp-progress-container">
            <div className="xp-label">Progression</div>
            <div className="xp-bar-container">
              <div className="xp-bar">
                <div className="xp-fill" style={{ width: `${xpPercentage}%` }}></div>
              </div>
              <span className="xp-text">{userStats.xp}/{userStats.nextLevelXp}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="top-bar-left">
            <h1 className="page-title">
              {activeTab === 'overview' && 'Tableau de Bord'}
              {activeTab === 'book' && 'Réserver un Pro'}
              {activeTab === 'history' && 'Historique'}
              {activeTab === 'coaching' && 'Coaching'}
              {activeTab === 'profile' && 'Profil'}
            </h1>
            <p className="page-subtitle">
              {activeTab === 'overview' && 'Vue d\'ensemble de votre activité'}
              {activeTab === 'book' && 'Trouvez le pro parfait pour vous'}
              {activeTab === 'history' && 'Vos matchs et sessions précédentes'}
              {activeTab === 'coaching' && 'Améliorez vos compétences'}
              {activeTab === 'profile' && 'Gérez vos informations'}
            </p>
          </div>
          <div className="top-bar-right">
            <div className="quick-actions">
              <button className="action-btn">
                <span className="btn-icon">🔔</span>
                <span className="notification-badge">3</span>
              </button>
              <button className="action-btn">
                <span className="btn-icon">💬</span>
              </button>
              <button className="action-btn primary">
                <span className="btn-icon">+</span>
                <span>Nouveau Match</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {activeTab === 'overview' && (
            <div className="overview-content">
              {/* Stats Cards */}
              <div className="stats-section">
                <div className="stat-card">
                  <div className="stat-icon">🎮</div>
                  <div className="stat-content">
                    <div className="stat-number">{userStats.totalMatches}</div>
                    <div className="stat-label">Matchs Joués</div>
                  </div>
                  <div className="stat-trend positive">+12%</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🏆</div>
                  <div className="stat-content">
                    <div className="stat-number">{userStats.winRate}%</div>
                    <div className="stat-label">Taux de Victoire</div>
                  </div>
                  <div className="stat-trend positive">+5%</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🧠</div>
                  <div className="stat-content">
                    <div className="stat-number">{userStats.totalCoaching}</div>
                    <div className="stat-label">Sessions Coaching</div>
                  </div>
                  <div className="stat-trend positive">+3</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🏅</div>
                  <div className="stat-content">
                    <div className="stat-number">{userStats.badges}</div>
                    <div className="stat-label">Badges Obtenus</div>
                  </div>
                  <div className="stat-trend neutral">+1</div>
                </div>
              </div>

              {/* Main Grid */}
              <div className="main-grid">
                {/* Recent Matches */}
                <div className="grid-card large">
                  <div className="card-header">
                    <h3>Matchs Récents</h3>
                    <button className="view-all">Voir tout</button>
                  </div>
                  <div className="matches-container">
                    {recentMatches.map(match => (
                      <div key={match.id} className="match-card">
                        <div className="match-game-info">
                          <div className="game-icon">
                            {match.game === 'CS2' ? '🔫' : match.game === 'Valorant' ? '🎯' : '⚔️'}
                          </div>
                          <div className="game-details">
                            <h4>{match.game}</h4>
                            <p>Avec {match.pro}</p>
                          </div>
                        </div>
                        <div className="match-result">
                          {match.result && (
                            <span className={`result-badge ${match.result.toLowerCase()}`}>
                              {match.result === 'Victory' ? 'Victoire' : 'Défaite'}
                            </span>
                          )}
                          <span className="match-duration">{match.duration}</span>
                        </div>
                        <div className="match-rating">
                          {match.rating && (
                            <div className="stars">
                              {'★'.repeat(match.rating)}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Pros */}
                <div className="grid-card">
                  <div className="card-header">
                    <h3>Pros Disponibles</h3>
                    <button className="view-all">Voir tout</button>
                  </div>
                  <div className="pros-container">
                    {availablePros.slice(0, 3).map(pro => (
                      <div key={pro.id} className="pro-item">
                        <div className="pro-avatar">
                          <span>{pro.name.charAt(0)}</span>
                          <div className={`status-dot ${pro.online ? 'online' : 'offline'}`}></div>
                        </div>
                        <div className="pro-info">
                          <h4>{pro.name}</h4>
                          <p>{pro.speciality}</p>
                          <div className="pro-stats">
                            <span>★ {pro.rating}</span>
                            <span>{pro.matches} matchs</span>
                          </div>
                        </div>
                        <div className="pro-price">
                          <span>{pro.price}€/h</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Chart */}
                <div className="grid-card">
                  <div className="card-header">
                    <h3>Performance</h3>
                  </div>
                  <div className="performance-chart">
                    <div className="chart-placeholder">
                      <div className="chart-icon">📈</div>
                      <p>Graphique de performance</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid-card">
                  <div className="card-header">
                    <h3>Actions Rapides</h3>
                  </div>
                  <div className="quick-actions-grid">
                    <button className="quick-action-btn">
                      <span className="action-icon">🎯</span>
                      <span>Nouveau Match</span>
                    </button>
                    <button className="quick-action-btn">
                      <span className="action-icon">🧠</span>
                      <span>Coaching</span>
                    </button>
                    <button className="quick-action-btn">
                      <span className="action-icon">💬</span>
                      <span>Chat</span>
                    </button>
                    <button className="quick-action-btn">
                      <span className="action-icon">📹</span>
                      <span>Replays</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'book' && (
            <div className="booking-content">
              <div className="booking-header">
                <h2>Trouvez votre Pro</h2>
                <p>Sélectionnez un joueur professionnel pour votre prochaine session</p>
              </div>
              
              <div className="filters-section">
                <div className="filter-group">
                  <label>Jeu</label>
                  <select className="filter-select">
                    <option value="">Tous les jeux</option>
                    <option value="CS2">CS2</option>
                    <option value="Valorant">Valorant</option>
                    <option value="LoL">League of Legends</option>
                    <option value="Fortnite">Fortnite</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Prix</label>
                  <select className="filter-select">
                    <option value="">Tous les prix</option>
                    <option value="0-20">0-20€/h</option>
                    <option value="20-30">20-30€/h</option>
                    <option value="30+">30€+/h</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Disponibilité</label>
                  <select className="filter-select">
                    <option value="">Tous</option>
                    <option value="online">En ligne</option>
                    <option value="offline">Hors ligne</option>
                  </select>
                </div>
              </div>

              <div className="pros-grid">
                {availablePros.map(pro => (
                  <div key={pro.id} className="pro-card">
                    <div className="pro-card-header">
                      <div className="pro-avatar-large">
                        <span>{pro.name.charAt(0)}</span>
                        <div className={`status-indicator ${pro.online ? 'online' : 'offline'}`}></div>
                      </div>
                      <div className="pro-info-large">
                        <h3>{pro.name}</h3>
                        <p>{pro.speciality}</p>
                        <div className="pro-rating-large">
                          <span>★ {pro.rating}</span>
                          <span>({pro.matches} matchs)</span>
                        </div>
                      </div>
                      <div className="pro-price-large">
                        <span className="price">{pro.price}€</span>
                        <span className="price-unit">/heure</span>
                      </div>
                    </div>
                    <div className="pro-stats-row">
                      <div className="stat-item">
                        <span className="stat-label">Win Rate</span>
                        <span className="stat-value">{pro.winRate}%</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Matchs</span>
                        <span className="stat-value">{pro.matches}</span>
                      </div>
                    </div>
                    <div className="pro-actions">
                      <button className="book-btn">Réserver</button>
                      <button className="profile-btn">Profil</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="history-content">
              <div className="history-header">
                <h2>Historique des Matchs</h2>
                <p>Retracez votre parcours et analysez vos performances</p>
              </div>
              
              <div className="history-filters">
                <div className="filter-group">
                  <label>Jeu</label>
                  <select className="filter-select">
                    <option value="">Tous les jeux</option>
                    <option value="CS2">CS2</option>
                    <option value="Valorant">Valorant</option>
                    <option value="LoL">League of Legends</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Période</label>
                  <select className="filter-select">
                    <option value="">Toutes les dates</option>
                    <option value="week">Cette semaine</option>
                    <option value="month">Ce mois</option>
                    <option value="year">Cette année</option>
                  </select>
                </div>
              </div>

              <div className="history-list">
                {recentMatches.map(match => (
                  <div key={match.id} className="history-item">
                    <div className="history-game">
                      <div className="game-icon-large">
                        {match.game === 'CS2' ? '🔫' : match.game === 'Valorant' ? '🎯' : '⚔️'}
                      </div>
                      <div className="game-details">
                        <h4>{match.game}</h4>
                        <p>Avec {match.pro}</p>
                        <span className="match-date">{match.date}</span>
                      </div>
                    </div>
                    <div className="history-stats">
                      <div className="stat">
                        <span className="stat-label">Durée</span>
                        <span className="stat-value">{match.duration}</span>
                      </div>
                      {match.result && (
                        <div className="stat">
                          <span className="stat-label">Résultat</span>
                          <span className={`stat-value ${match.result.toLowerCase()}`}>
                            {match.result === 'Victory' ? 'Victoire' : 'Défaite'}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="history-actions">
                      {match.rating && (
                        <div className="rating-display">
                          {'★'.repeat(match.rating)}
                        </div>
                      )}
                      <div className="action-buttons">
                        <button className="action-btn-small">Replay</button>
                        <button className="action-btn-small">Évaluer</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'coaching' && (
            <div className="coaching-content">
              <div className="coaching-header">
                <h2>Sessions de Coaching</h2>
                <p>Améliorez vos compétences avec nos experts</p>
              </div>
              
              <div className="coaching-options">
                <div className="coaching-card">
                  <div className="coaching-icon">🎯</div>
                  <h3>Coaching Personnalisé</h3>
                  <p>Sessions d'apprentissage avec feedback détaillé et conseils personnalisés</p>
                  <div className="coaching-features">
                    <span>• Analyse de gameplay</span>
                    <span>• Conseils stratégiques</span>
                    <span>• Exercices pratiques</span>
                  </div>
                  <div className="coaching-price">À partir de 25€/h</div>
                  <button className="coaching-btn">Réserver</button>
                </div>
                
                <div className="coaching-card">
                  <div className="coaching-icon">📹</div>
                  <h3>Analyse de Replay</h3>
                  <p>Analyse détaillée de vos parties précédentes avec commentaires experts</p>
                  <div className="coaching-features">
                    <span>• Analyse complète</span>
                    <span>• Points d'amélioration</span>
                    <span>• Rapport détaillé</span>
                  </div>
                  <div className="coaching-price">À partir de 15€/session</div>
                  <button className="coaching-btn">Réserver</button>
                </div>
                
                <div className="coaching-card">
                  <div className="coaching-icon">🏆</div>
                  <h3>Coaching de Compétition</h3>
                  <p>Préparation intensive pour les tournois et compétitions</p>
                  <div className="coaching-features">
                    <span>• Stratégies avancées</span>
                    <span>• Gestion du stress</span>
                    <span>• Préparation mentale</span>
                  </div>
                  <div className="coaching-price">À partir de 40€/h</div>
                  <button className="coaching-btn">Réserver</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="profile-content">
              <div className="profile-header">
                <h2>Profil Utilisateur</h2>
                <p>Gérez vos informations et préférences</p>
              </div>
              
              <div className="profile-grid">
                <div className="profile-card">
                  <h3>Informations Personnelles</h3>
                  <div className="profile-form">
                    <div className="form-group">
                      <label>Nom d'utilisateur</label>
                      <input type="text" defaultValue="Joueur" />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" defaultValue="joueur@example.com" />
                    </div>
                    <div className="form-group">
                      <label>Jeu Principal</label>
                      <select>
                        <option>CS2</option>
                        <option>Valorant</option>
                        <option>LoL</option>
                        <option>Fortnite</option>
                      </select>
                    </div>
                    <button className="save-btn">Sauvegarder</button>
                  </div>
                </div>
                
                <div className="profile-card">
                  <h3>Préférences</h3>
                  <div className="preferences">
                    <div className="preference-item">
                      <label>Notifications par email</label>
                      <input type="checkbox" defaultChecked />
                    </div>
                    <div className="preference-item">
                      <label>Notifications push</label>
                      <input type="checkbox" defaultChecked />
                    </div>
                    <div className="preference-item">
                      <label>Mode sombre</label>
                      <input type="checkbox" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardUser
