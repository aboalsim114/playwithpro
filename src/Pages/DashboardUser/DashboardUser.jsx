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
