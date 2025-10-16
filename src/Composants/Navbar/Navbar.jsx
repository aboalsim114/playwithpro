import { useState, useEffect, useCallback, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // Navigation items with icons and routes
  const navItems = useMemo(() => [
    { id: 'home', label: 'Accueil', icon: '🏠', path: '/' },
    { id: 'games', label: 'Jeux', icon: '🎮', path: '/games' },
    { id: 'about', label: 'À Propos', icon: 'ℹ️', path: '/about' },
    { id: 'contact', label: 'Contact', icon: '📞', path: '/contact' }
  ], [])

  // Handle scroll to update navbar state
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    setIsScrolled(scrollY > 50)
  }, [])

  // Check if current route is active
  const isActiveRoute = (path) => {
    return location.pathname === path
  }

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Close mobile menu when clicking outside
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Handle escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsMobileMenuOpen(false)
    }
  }

  // Add event listeners
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleScroll])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      {/* Minimalist Glass Navbar */}
      <nav className={`minimal-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-wrapper">
          {/* Logo Section */}
          <div className="logo-section">
            <Link to="/" className="logo-container">
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
              <span className="logo-text">PlayWithPro</span>
            </Link>
          </div>

          {/* Center Navigation */}
          <div className="center-nav">
            <div className="nav-items">
              {navItems.map((item, index) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`nav-link ${isActiveRoute(item.path) ? 'active' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="link-icon">{item.icon}</span>
                  <span className="link-text">{item.label}</span>
                  <div className="link-underline"></div>
                </Link>
              ))}
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
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="search-input"
                aria-label="Rechercher"
              />
            </div>

            {/* Menu Toggle for Mobile */}
            <button 
              className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>

            {/* User Menu */}
            <div className="user-menu">
              <button className="user-avatar" aria-label="User menu">
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <div className="mobile-logo">
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
                <span className="logo-text">PlayWithPro</span>
              </div>
              <button 
                className="mobile-menu-close"
                onClick={closeMobileMenu}
                aria-label="Close mobile menu"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="mobile-menu-content">
              <div className="mobile-nav-items">
                {navItems.map((item, index) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`mobile-nav-link ${isActiveRoute(item.path) ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="link-icon">{item.icon}</span>
                    <span className="link-text">{item.label}</span>
                    <div className="link-underline"></div>
                  </Link>
                ))}
              </div>

              <div className="mobile-menu-search">
                <div className="search-box">
                  <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Rechercher..." 
                    className="search-input"
                    aria-label="Rechercher"
                  />
                </div>
              </div>
            </div>

            <div className="mobile-menu-footer">
              <button className="mobile-user-button">
                <div className="avatar-circle">
                  <svg className="avatar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <span>Mon Profil</span>
                <div className="status-indicator"></div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
