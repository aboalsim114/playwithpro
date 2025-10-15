import './Navbar.css'

function Navbar() {
  return (
    <>
      {/* Minimalist Glass Navbar */}
      <nav className="minimal-navbar">
        <div className="navbar-wrapper">
          {/* Logo Section */}
          <div className="logo-section">
            <div className="logo-container">
              <div className="logo-symbol">
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
              <span className="logo-text">NEXUS</span>
            </div>
          </div>

          {/* Center Navigation */}
          <div className="center-nav">
            <div className="nav-items">
              <a href="#tournaments" className="nav-link active">
                <span className="link-text">Tournois</span>
                <div className="link-underline"></div>
              </a>
              <a href="#teams" className="nav-link">
                <span className="link-text">Équipes</span>
                <div className="link-underline"></div>
              </a>
              <a href="#shop" className="nav-link">
                <span className="link-text">Boutique</span>
                <div className="link-underline"></div>
              </a>
              <a href="#news" className="nav-link">
                <span className="link-text">Actualités</span>
                <div className="link-underline"></div>
              </a>
            </div>
          </div>

          {/* Right Actions */}
          <div className="right-actions">
            {/* Search */}
            <div className="search-box">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <input type="text" placeholder="Rechercher..." className="search-input" />
            </div>

            {/* Menu Toggle for Mobile */}
            <button className="menu-toggle">
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>

            {/* User Menu */}
            <div className="user-menu">
              <button className="user-avatar">
                <div className="avatar-circle">
                  <svg className="avatar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="status-indicator"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Background Blur */}
        <div className="navbar-blur"></div>
        
        {/* Subtle Border */}
        <div className="navbar-border"></div>
      </nav>
    </>
  )
}

export default Navbar
