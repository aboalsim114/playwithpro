import React, { useState, useEffect } from 'react';
import './DashboardUser.css';

function DashboardUser() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [userType, setUserType] = useState('player'); // 'player', 'pro', 'streamer'
  const [settings, setSettings] = useState({
    notifications: true,
    chatSounds: true,
    matchAlerts: true,
    coachingReminders: true,
    streamAlerts: false,
    paymentAlerts: true,
    rankingUpdates: true,
    replayNotifications: true
  });
  const [isLoading, setIsLoading] = useState(true);
  const [currentGame, setCurrentGame] = useState('CS2');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGameDropdownOpen, setIsGameDropdownOpen] = useState(false);
 

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleNavClick = (navItem) => {
    setActiveNav(navItem);
    // Close mobile menu when navigating
    setIsMobileMenuOpen(false);
  };

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      {/* Mobile Menu Toggle */}
      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      {/* ===== SIDEBAR ===== */}
      <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">🎮 PLAY-WITH-PRO</h2>
          <div className="user-type-selector">
            <button 
              className={`user-type-btn ${userType === 'player' ? 'active' : ''}`}
              onClick={() => setUserType('player')}
            >
              👾 Player
            </button>
         
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-section-title">Gaming</div>
            <button 
              className={`nav-item ${activeNav === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleNavClick('dashboard')}
            >
              <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
              </svg>
              <span className="nav-text">Dashboard</span>
            </button>
            <button 
              className={`nav-item ${activeNav === 'matches' ? 'active' : ''}`}
              onClick={() => handleNavClick('matches')}
            >
              <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="nav-text">Matches</span>
            </button>
            <button 
              className={`nav-item ${activeNav === 'coaching' ? 'active' : ''}`}
              onClick={() => handleNavClick('coaching')}
            >
              <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="nav-text">Coaching</span>
            </button>
            <button 
              className={`nav-item ${activeNav === 'rankings' ? 'active' : ''}`}
              onClick={() => handleNavClick('rankings')}
            >
              <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="nav-text">Rankings</span>
            </button>
          </div>
          
          <div className="nav-section">
            <div className="nav-section-title">Features</div>
            <button 
              className={`nav-item ${activeNav === 'chat' ? 'active' : ''}`}
              onClick={() => handleNavClick('chat')}
            >
              <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="nav-text">Chat</span>
            </button>
            <button 
              className={`nav-item ${activeNav === 'replays' ? 'active' : ''}`}
              onClick={() => handleNavClick('replays')}
            >
              <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="nav-text">Replays</span>
            </button>
            <button 
              className={`nav-item ${activeNav === 'payments' ? 'active' : ''}`}
              onClick={() => handleNavClick('payments')}
            >
              <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span className="nav-text">Payments</span>
            </button>
            <button 
              className={`nav-item ${activeNav === 'profile' ? 'active' : ''}`}
              onClick={() => handleNavClick('profile')}
            >
              <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="nav-text">Profile</span>
            </button>
          </div>
        </nav>
        
        {/* Gaming Status Card */}
        <div className="help-card">
          <div className="help-content">
            <svg className="help-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <p className="help-text">Ready to play? Find your next match!</p>
          </div>
          <button className="help-button">FIND MATCH</button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main id="main-content" className="main-content" role="main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="breadcrumb">Gaming / {userType === 'player' ? 'Player Dashboard' : userType === 'pro' ? 'Pro Dashboard' : 'Streamer Dashboard'}</div>
          <div className="search-bar">
            <div className="search-container">
              <div className="search-icon-wrapper">
                <div className="search-icon-container">
            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" strokeWidth="2.5"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m21 21-4.35-4.35"/>
                    <circle cx="11" cy="11" r="3" fill="currentColor" opacity="0.3"/>
            </svg>
                  <div className="search-icon-glow"></div>
                </div>
              </div>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search players, pros, or games..." 
            />
              <div className="search-actions">
                <button className="search-filter-btn" title="Filters">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </button>
                <button className="search-clear-btn" title="Clear">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="header-actions">
            <div className="game-selector">
              <div className="game-dropdown">
                <button 
                  className="game-dropdown-trigger"
                  onClick={() => setIsGameDropdownOpen(!isGameDropdownOpen)}
                >
                  <div className="game-current">
                    <span className="game-emoji">
                      {currentGame === 'CS2' && '🔫'}
                      {currentGame === 'Valorant' && '🎯'}
                      {currentGame === 'LoL' && '⚔️'}
                      {currentGame === 'Fortnite' && '🏗️'}
                      {currentGame === 'Apex' && '🚀'}
                      {currentGame === 'FIFA' && '⚽'}
                      {currentGame === 'COD' && '💥'}
                    </span>
                    <span className="game-name">{currentGame}</span>
                  </div>
                  <svg className={`dropdown-arrow ${isGameDropdownOpen ? 'open' : ''}`} width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`game-dropdown-menu ${isGameDropdownOpen ? 'open' : ''}`}>
                  <div className="game-option" onClick={() => {setCurrentGame('CS2'); setIsGameDropdownOpen(false);}}>
                    <span className="game-emoji">🔫</span>
                    <span className="game-text">CS2</span>
                  </div>
                  <div className="game-option" onClick={() => {setCurrentGame('Valorant'); setIsGameDropdownOpen(false);}}>
                    <span className="game-emoji">🎯</span>
                    <span className="game-text">Valorant</span>
                  </div>
                  <div className="game-option" onClick={() => {setCurrentGame('LoL'); setIsGameDropdownOpen(false);}}>
                    <span className="game-emoji">⚔️</span>
                    <span className="game-text">League of Legends</span>
                  </div>
                  <div className="game-option" onClick={() => {setCurrentGame('Fortnite'); setIsGameDropdownOpen(false);}}>
                    <span className="game-emoji">🏗️</span>
                    <span className="game-text">Fortnite</span>
                  </div>
                  <div className="game-option" onClick={() => {setCurrentGame('Apex'); setIsGameDropdownOpen(false);}}>
                    <span className="game-emoji">🚀</span>
                    <span className="game-text">Apex Legends</span>
                  </div>
                  <div className="game-option" onClick={() => {setCurrentGame('FIFA'); setIsGameDropdownOpen(false);}}>
                    <span className="game-emoji">⚽</span>
                    <span className="game-text">FIFA</span>
                  </div>
                  <div className="game-option" onClick={() => {setCurrentGame('COD'); setIsGameDropdownOpen(false);}}>
                    <span className="game-emoji">💥</span>
                    <span className="game-text">Call of Duty</span>
                  </div>
                </div>
              </div>
            </div>
          
            <svg className="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 00-15 0v5h5l-5 5-5-5h5v-5a7.5 7.5 0 0115 0v5z" />
            </svg>
            <div className="user-avatar">MJ</div>
          </div>
        </header>

        {/* User Banner */}
        <div className="user-banner">
          <div className="user-banner-background">
            <div className="user-banner-pattern"></div>
            <div className="user-banner-glow"></div>
            
            {/* Enhanced Floating Particles */}
            <div className="floating-particles">
              <div className="particle particle-1"></div>
              <div className="particle particle-2"></div>
              <div className="particle particle-3"></div>
              <div className="particle particle-4"></div>
              <div className="particle particle-5"></div>
              <div className="particle particle-6"></div>
              <div className="particle particle-7"></div>
              <div className="particle particle-8"></div>
              <div className="particle particle-9"></div>
              <div className="particle particle-10"></div>
            </div>
            
            {/* Enhanced Geometric Shapes */}
            <div className="geometric-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
              <div className="shape shape-4"></div>
              <div className="shape shape-5"></div>
              <div className="shape shape-6"></div>
              <div className="shape shape-7"></div>
            </div>
            
            {/* Data Streams */}
            <div className="data-streams">
              <div className="data-stream stream-1"></div>
              <div className="data-stream stream-2"></div>
              <div className="data-stream stream-3"></div>
              <div className="data-stream stream-4"></div>
            </div>
            
            {/* Holographic Grid */}
            <div className="holographic-grid">
              <div className="grid-line grid-line-1"></div>
              <div className="grid-line grid-line-2"></div>
              <div className="grid-line grid-line-3"></div>
              <div className="grid-line grid-line-4"></div>
              <div className="grid-line grid-line-5"></div>
            </div>
            
            {/* Energy Waves */}
            <div className="energy-waves">
              <div className="wave wave-1"></div>
              <div className="wave wave-2"></div>
              <div className="wave wave-3"></div>
              <div className="wave wave-4"></div>
            </div>
            
            {/* Neural Network */}
            <div className="neural-network">
              <div className="neural-node node-1"></div>
              <div className="neural-node node-2"></div>
              <div className="neural-node node-3"></div>
              <div className="neural-node node-4"></div>
              <div className="neural-node node-5"></div>
              <div className="neural-connection connection-1"></div>
              <div className="neural-connection connection-2"></div>
              <div className="neural-connection connection-3"></div>
              <div className="neural-connection connection-4"></div>
            </div>
            
            {/* Quantum Dots */}
            <div className="quantum-dots">
              <div className="quantum-dot dot-1"></div>
              <div className="quantum-dot dot-2"></div>
              <div className="quantum-dot dot-3"></div>
              <div className="quantum-dot dot-4"></div>
              <div className="quantum-dot dot-5"></div>
              <div className="quantum-dot dot-6"></div>
            </div>
            
            {/* Holographic Orbs */}
            <div className="holographic-orbs">
              <div className="orb orb-1"></div>
              <div className="orb orb-2"></div>
              <div className="orb orb-3"></div>
            </div>
          </div>
          
          <div className="user-clean-card">
            <div className="clean-header">
              <div className="clean-avatar">
                <div className="avatar-circle">MJ</div>
                <div className="avatar-status"></div>
              </div>
              
              <div className="clean-info">
                <h1 className="clean-name">Mark Johnson</h1>
                <p className="clean-title">Joueur Professionnel</p>
                <div className="clean-meta">
                  <span className="meta-badge">Niveau 42</span>
                  <span className="meta-badge">Or III</span>
                  <span className="meta-badge">Amérique du Nord</span>
                </div>
              </div>
            </div>
            
            <div className="clean-stats">
              <div className="stat-row">
                <div className="stat">
                  <div className="stat-value">127</div>
                  <div className="stat-label">Matchs</div>
                </div>
                <div className="stat">
                  <div className="stat-value">89%</div>
                  <div className="stat-label">Taux de Victoire</div>
                </div>
                <div className="stat">
                  <div className="stat-value">4.8</div>
                  <div className="stat-label">Note</div>
                </div>
              </div>
            </div>
            
            <div className="clean-actions">
              <button className="clean-btn primary">Message</button>
              <button className="clean-btn secondary">Voir le Profil</button>
            </div>
          </div>
          
          <div className="user-stats">
            <div className="stats-header">
              <h4 className="stats-title">Performance</h4>
              <div className="stats-period">Ce Mois</div>
            </div>
            
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="stat-content">
              <span className="stat-value">127</span>
              <span className="stat-label">Matchs</span>
                  <div className="stat-trend positive">+12%</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
            </div>
                <div className="stat-content">
              <span className="stat-value">89%</span>
              <span className="stat-label">Taux de Victoire</span>
                  <div className="stat-trend positive">+5%</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
            </div>
                <div className="stat-content">
              <span className="stat-value">4.8</span>
              <span className="stat-label">Note</span>
                  <div className="stat-trend positive">+0.3</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alternance 1-2-1-2 Layout */}
        <div className="flexible-content">
          {/* 1 GRID - Section pleine largeur */}
          <div className="content-row full-width">
            <div className="welcome-section">
              <div className="welcome-card">
                <div className="welcome-header">
                  <h2 className="welcome-title">🎮 Prêt à Jouer avec les Pros !</h2>
                  <p className="welcome-subtitle">Bon retour, Mark ! Réserve une session avec des joueurs professionnels ou reçois un coaching personnalisé.</p>
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
          </div>
          
          {/* 2 GRID - Deux sections côte à côte */}
          <div className="content-row two-columns">
            <div className="content-column">
              <div className="quick-stats-section">
                <div className="quick-stats-card">
                  <h3 className="quick-stats-title">📊 Aperçu Rapide</h3>
                  <div className="quick-stats-grid">
                    <div className="quick-stat">
                      <div className="stat-icon">🏆</div>
                      <div className="stat-info">
                        <div className="stat-value">89%</div>
                        <div className="stat-label">Victoires</div>
                      </div>
                    </div>
                    <div className="quick-stat">
                      <div className="stat-icon">⚡</div>
                      <div className="stat-info">
                        <div className="stat-value">127</div>
                        <div className="stat-label">Matchs</div>
                      </div>
                    </div>
                    <div className="quick-stat">
                      <div className="stat-icon">⭐</div>
                      <div className="stat-info">
                        <div className="stat-value">4.8</div>
                        <div className="stat-label">Note</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="content-column">
              <div className="gaming-pro-section">
                {/* Gaming Background Effects */}
                <div className="gaming-background">
                  <div className="cyber-grid"></div>
                  <div className="neon-particles">
                    <div className="particle particle-1"></div>
                    <div className="particle particle-2"></div>
                    <div className="particle particle-3"></div>
                    <div className="particle particle-4"></div>
                    <div className="particle particle-5"></div>
                    <div className="particle particle-6"></div>
                    <div className="particle particle-7"></div>
                    <div className="particle particle-8"></div>
                  </div>
                  <div className="energy-waves">
                    <div className="wave wave-1"></div>
                    <div className="wave wave-2"></div>
                    <div className="wave wave-3"></div>
                  </div>
                  <div className="holographic-lines">
                    <div className="line line-1"></div>
                    <div className="line line-2"></div>
                    <div className="line line-3"></div>
                    <div className="line line-4"></div>
                  </div>
                </div>

            
              </div>
            </div>
          </div>
          
       
          
        
          
        
        </div>

     

        {/* Settings and Coaching Section - Flexible Grid */}
        <div className="settings-section">
        

         
        </div>

        {/* Footer */}
        <footer className="dashboard-footer">
          <div className="footer-text">© 2024, Fait avec ❤️ par PLAY-WITH-PRO - Connecter les joueurs avec les professionnels</div>
          <div className="footer-links">
            <button className="footer-link">Joueurs Pro</button>
            <button className="footer-link">Coaching</button>
            <button className="footer-link">Support</button>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default DashboardUser;
