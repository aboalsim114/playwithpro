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
            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search players, pros, or games..." 
            />
          </div>
          <div className="header-actions">
            <div className="game-selector">
              <select 
                value={currentGame} 
                onChange={(e) => setCurrentGame(e.target.value)}
                className="game-select"
              >
                <option value="CS2">CS2</option>
                <option value="Valorant">Valorant</option>
                <option value="LoL">League of Legends</option>
                <option value="Fortnite">Fortnite</option>
                <option value="Apex">Apex Legends</option>
                <option value="FIFA">FIFA</option>
                <option value="COD">Call of Duty</option>
              </select>
            </div>
          
            <svg className="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 00-15 0v5h5l-5 5-5-5h5v-5a7.5 7.5 0 0115 0v5z" />
            </svg>
            <div className="user-avatar">MJ</div>
          </div>
        </header>

        {/* User Banner */}
        <div className="user-banner">
          <div className="user-info">
            <div className="user-avatar-large">MJ</div>
            <div className="user-details">
              <h3>Mark Johnson</h3>
              <p>mark@playwithpro.com</p>
              <div className="user-badges">
                <span className={`badge ${userType}`}>
                  {userType === 'player' ? '👾 Player' : userType === 'pro' ? '🏆 Pro Player' : '🎥 Streamer'}
                </span>
                <span className="rank-badge">Rank: Gold III</span>
              </div>
            </div>
          </div>
          <div className="user-stats">
            <div className="stat-item">
              <span className="stat-value">127</span>
              <span className="stat-label">Matches</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">89%</span>
              <span className="stat-label">Win Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">4.8</span>
              <span className="stat-label">Rating</span>
            </div>
          </div>
        </div>

        {/* Flexible Content Grid */}
        <div className="content-grid">
          {/* Welcome Card - Full width on mobile, half on desktop */}
          <div className="card welcome-card grid-item grid-item--welcome">
            <h2 className="welcome-title">🎮 Ready to Play with Pros!</h2>
            <p className="welcome-subtitle">Welcome back, Mark! Book a session with professional players or get personalized coaching.</p>
            <div className="welcome-actions">
              <button className="welcome-button primary">Find Pro Player</button>
              <button className="welcome-button secondary">Book Coaching</button>
            </div>
          </div>

          {/* E-Sport Stats Card - Responsive grid */}
          <div className="card gaming-stats-card grid-item grid-item--stats">
            <div className="stats-header">
              <h3 className="stats-title">🏆 E-Sport Performance</h3>
              <p className="stats-subtitle">Your {currentGame} stats and progress this week</p>
            </div>
            <div className="stats-grid">
              <div className="stat-item">
                <svg className="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <div className="stat-content">
                  <h4>Win Rate</h4>
                  <p>89%</p>
                  <div className="stat-progress">
                    <div className="stat-progress-bar" style={{width: '89%'}}></div>
                  </div>
                </div>
              </div>
              
              <div className="stat-item">
                <svg className="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <div className="stat-content">
                  <h4>K/D Ratio</h4>
                  <p>2.4</p>
                </div>
              </div>
              
              <div className="stat-item">
                <svg className="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <div className="stat-content">
                  <h4>Rank Progress</h4>
                  <p>76%</p>
                  <div className="stat-progress">
                    <div className="stat-progress-bar" style={{width: '76%'}}></div>
                  </div>
                </div>
              </div>
              
              <div className="stat-item">
                <svg className="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <div className="stat-content">
                  <h4>Avg Score</h4>
                  <p>1,247</p>
                </div>
              </div>
              
              <div className="stat-item">
                <svg className="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="stat-content">
                  <h4>Sessions Booked</h4>
                  <p>12</p>
                </div>
              </div>
              
              <div className="stat-item">
                <svg className="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="stat-content">
                  <h4>Coaching Hours</h4>
                  <p>8.5h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Player Profile Card - Responsive */}
          <div className="card profile-info-card grid-item grid-item--profile">
            <h3 className="profile-info-title">👤 Player Profile</h3>
            <p className="profile-info-description">
              Hi, I'm Mark Johnson, an avid gamer looking to improve my skills and play with professional players. I'm passionate about competitive gaming and always seeking to learn from the best.
            </p>
            <div className="profile-details">
              <div className="profile-detail">
                <span className="profile-detail-label">Gaming Name:</span>
                <span className="profile-detail-value">MarkJ_Pro</span>
              </div>
              <div className="profile-detail">
                <span className="profile-detail-label">Main Game:</span>
                <span className="profile-detail-value">{currentGame}</span>
              </div>
              <div className="profile-detail">
                <span className="profile-detail-label">Rank:</span>
                <span className="profile-detail-value">Gold III</span>
              </div>
              <div className="profile-detail">
                <span className="profile-detail-label">Region:</span>
                <span className="profile-detail-value">Europe</span>
              </div>
            </div>
            <div className="social-links">
              <button className="social-link">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button className="social-link">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </button>
              <button className="social-link">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Available Pro Players Section - Flexible Grid */}
        <div className="matches-section">
          <div className="card matches-card">
            <h3 className="matches-title">🏆 Available Pro Players</h3>
            <p className="matches-subtitle">Book a session with professional e-sport players</p>
            <div className="matches-grid">
              <div className="match-card">
                <div className="match-header">
                  <div className="pro-info">
                    <div className="pro-avatar">S1</div>
                    <div className="pro-details">
                      <h4>Shroud</h4>
                      <p>CS2 Pro • Rank: Global Elite</p>
                      <div className="pro-rating">⭐⭐⭐⭐⭐ 4.9</div>
                    </div>

                  </div>
                  <div className="match-price">$25/h</div>
                </div>
                <div className="match-options">
                  <button className="time-option">15 min - $6</button>
                  <button className="time-option">30 min - $12</button>
                  <button className="time-option">1h - $25</button>
                </div>
                <button className="book-match-btn">Book Session</button>
              </div>
              
              <div className="match-card">
                <div className="match-header">
                  <div className="pro-info">
                    <div className="pro-avatar">N1</div>
                    <div className="pro-details">
                      <h4>Ninja</h4>
                      <p>Fortnite Pro • Rank: Champion</p>
                      <div className="pro-rating">⭐⭐⭐⭐⭐ 4.8</div>
                    </div>
                  </div>
                  <div className="match-price">$30/h</div>
                </div>
                <div className="match-options">
                  <button className="time-option">15 min - $8</button>
                  <button className="time-option">30 min - $15</button>
                  <button className="time-option">1h - $30</button>
                </div>
                <button className="book-match-btn">Book Session</button>
              </div>
              
              <div className="match-card">
                <div className="match-header">
                  <div className="pro-info">
                    <div className="pro-avatar">F1</div>
                    <div className="pro-details">
                      <h4>Faker</h4>
                      <p>LoL Pro • Rank: Challenger</p>
                      <div className="pro-rating">⭐⭐⭐⭐⭐ 5.0</div>
                    </div>
                  </div>
                  <div className="match-price">$50/h</div>
                </div>
                <div className="match-options">
                  <button className="time-option">15 min - $12</button>
                  <button className="time-option">30 min - $25</button>
                  <button className="time-option">1h - $50</button>
                </div>
                <button className="book-match-btn">Book Session</button>
              </div>
            </div>
          </div>
        </div>

        {/* Settings and Coaching Section - Flexible Grid */}
        <div className="settings-section">
        

         
        </div>

        {/* Footer */}
        <footer className="dashboard-footer">
          <div className="footer-text">© 2024, Made with ❤️ by PLAY-WITH-PRO - Connecting gamers with professionals</div>
          <div className="footer-links">
            <button className="footer-link">Pro Players</button>
            <button className="footer-link">Coaching</button>
            <button className="footer-link">Support</button>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default DashboardUser;
