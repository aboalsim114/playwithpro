import './Navbar.css'

function Navbar() {
  return (
    <>
      {/* Header Bar */}
      <div className="header-bar">
        <div className="header-left">
          <span className="ai-badge">AI</span>
          <span className="header-title">Premium E-Sport Navbar Design</span>
          <svg className="chevron-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
        <div className="header-right">
          <button className="share-btn">
            <svg className="share-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16,6 12,2 8,6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-content">
          {/* Brand/Logo */}
          <div className="navbar-brand">
            <div className="gamepad-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
                <circle cx="6" cy="8" r="1"/>
                <circle cx="10" cy="8" r="1"/>
                <circle cx="14" cy="8" r="1"/>
                <circle cx="18" cy="8" r="1"/>
                <circle cx="6" cy="12" r="1"/>
                <circle cx="10" cy="12" r="1"/>
                <circle cx="14" cy="12" r="1"/>
                <circle cx="18" cy="12" r="1"/>
              </svg>
            </div>
            <span className="brand-name">NEXUS</span>
          </div>

          {/* Navigation Links */}
          <div className="navbar-links">
            <a href="#tournaments" className="nav-link active">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                <path d="M4 22h16"/>
                <path d="M10 14.66V17c0 .55.47.98.97 1.21l1.03.4c.5.23 1.03.23 1.53 0l1.03-.4c.5-.23.97-.66.97-1.21v-2.34"/>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
              </svg>
              <span>Tournaments</span>
            </a>
            <a href="#teams" className="nav-link">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span>Teams</span>
            </a>
            <a href="#shop" className="nav-link">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <span>Shop</span>
            </a>
            <a href="#news" className="nav-link">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>
              </svg>
              <span>News</span>
            </a>
          </div>

          {/* Utility Elements */}
          <div className="navbar-utils">
            {/* Search Bar */}
            <div className="search-container">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <input type="text" placeholder="Search..." className="search-input" />
            </div>

            {/* Notifications */}
            <button className="notification-btn">
              <svg className="notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className="notification-badge"></span>
            </button>

            {/* Player Profile */}
            <button className="player-btn">
              <svg className="player-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span>Player</span>
            </button>

            {/* Join Now Button */}
            <button className="join-btn">
              <span>Join Now</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
