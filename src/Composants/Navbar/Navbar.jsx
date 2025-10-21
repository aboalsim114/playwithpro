import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'
import { useIsAuthenticated, useCurrentUser } from '../../store/hooks'

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const location = useLocation()
  const userMenuRef = useRef(null)
  
  // Redux state
  const isAuthenticated = useIsAuthenticated()
  const currentUser = useCurrentUser()

  // Navigation items with icons and routes
  const navItems = useMemo(() => {
    if (isAuthenticated) {
      return [
        { id: 'profile', label: 'Profil', icon: '👤', path: '/profile' },
        { id: 'dashboard', label: 'Tableau de bord', icon: '📊', path: '/dashboard' }
      ]
    } else {
      return []
    }
  }, [isAuthenticated])

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

  // Toggle user menu
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  // Close user menu when clicking outside
  const closeUserMenu = () => {
    setIsUserMenuOpen(false)
  }

  // Handle escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsMobileMenuOpen(false)
      setIsUserMenuOpen(false)
    }
  }

  // Check if this is a page refresh or first load
  useEffect(() => {
    const hasBeenLoaded = sessionStorage.getItem('navbar-loaded')
    
    if (!hasBeenLoaded) {
      // First load - allow animations
      setShouldAnimate(true)
      sessionStorage.setItem('navbar-loaded', 'true')
    } else {
      // Page refresh - skip animations
      setShouldAnimate(false)
      setIsInitialized(true)
    }
  }, [])

  // Add event listeners and check initial scroll position
  useEffect(() => {
    // Check initial scroll position on mount
    const initialScrollY = window.scrollY
    setIsScrolled(initialScrollY > 50)
    
    // Mark as initialized after animations complete (only if animating)
    if (shouldAnimate) {
      const initTimer = setTimeout(() => {
        setIsInitialized(true)
      }, 800) // Wait for all animations to complete (0.6s + buffer)
      
      return () => clearTimeout(initTimer)
    }
  }, [shouldAnimate])
  
  // Add scroll and keyboard event listeners
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleScroll])

  // Handle click outside user menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isUserMenuOpen])

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
      <nav className={`minimal-navbar ${isScrolled ? 'scrolled' : ''} ${shouldAnimate ? 'animate' : 'no-animate'}`}>
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
                  className={`nav-link ${isActiveRoute(item.path) ? 'active' : ''} ${shouldAnimate ? 'animate' : 'no-animate'}`}
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

            {/* User Avatar */}
            <div className="user-menu" ref={userMenuRef}>
              <button 
                className="user-avatar"
                onClick={toggleUserMenu}
                aria-label="User menu"
                aria-expanded={isUserMenuOpen}
              >
                <div className="avatar-circle">
                  {isAuthenticated && currentUser?.avatar ? (
                    <img 
                      src={currentUser.avatar} 
                      alt="User avatar" 
                      className="avatar-image"
                    />
                  ) : (
                    <svg className="avatar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  )}
                </div>
                <div className="status-indicator"></div>
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="user-dropdown">
                  <div className="dropdown-content">
                    {isAuthenticated ? (
                      <>
                        <div className="user-info">
                          <div className="user-name">{currentUser?.name || 'Utilisateur'}</div>
                          <div className="user-email">{currentUser?.email || ''}</div>
                        </div>
                        <div className="dropdown-divider"></div>
                        <Link 
                          to="/profile" 
                          className="dropdown-item"
                          onClick={closeUserMenu}
                        >
                          <span className="item-icon">👤</span>
                          <span className="item-text">Mon Profil</span>
                        </Link>
                        <Link 
                          to="/dashboard" 
                          className="dropdown-item"
                          onClick={closeUserMenu}
                        >
                          <span className="item-icon">📊</span>
                          <span className="item-text">Tableau de bord</span>
                        </Link>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item logout-item">
                          <span className="item-icon">🚪</span>
                          <span className="item-text">Déconnexion</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <Link 
                          to="/connexion" 
                          className="dropdown-item"
                          onClick={closeUserMenu}
                        >
                          <span className="item-icon">🔑</span>
                          <span className="item-text">Connexion</span>
                        </Link>
                        <Link 
                          to="/inscription" 
                          className="dropdown-item"
                          onClick={closeUserMenu}
                        >
                          <span className="item-icon">📝</span>
                          <span className="item-text">Inscription</span>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
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
                    className={`mobile-nav-link ${isActiveRoute(item.path) ? 'active' : ''} ${shouldAnimate ? 'animate' : 'no-animate'}`}
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
              {isAuthenticated ? (
                <div className="mobile-user-section">
                  <div className="mobile-user-info">
                    <div className="avatar-circle">
                      {currentUser?.avatar ? (
                        <img 
                          src={currentUser.avatar} 
                          alt="User avatar" 
                          className="avatar-image"
                        />
                      ) : (
                        <svg className="avatar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                      )}
                    </div>
                    <div className="user-details">
                      <div className="user-name">{currentUser?.name || 'Utilisateur'}</div>
                      <div className="user-email">{currentUser?.email || ''}</div>
                    </div>
                    <div className="status-indicator"></div>
                  </div>
                  <div className="mobile-user-actions">
                    <Link to="/profile" className="mobile-user-action" onClick={closeMobileMenu}>
                      <span className="action-icon">👤</span>
                      <span>Mon Profil</span>
                    </Link>
                    <Link to="/dashboard" className="mobile-user-action" onClick={closeMobileMenu}>
                      <span className="action-icon">📊</span>
                      <span>Tableau de bord</span>
                    </Link>
                    <button className="mobile-user-action logout-action">
                      <span className="action-icon">🚪</span>
                      <span>Déconnexion</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mobile-auth-section">
                  <Link to="/connexion" className="mobile-auth-button" onClick={closeMobileMenu}>
                    <span className="auth-icon">🔑</span>
                    <span>Connexion</span>
                  </Link>
                  <Link to="/inscription" className="mobile-auth-button" onClick={closeMobileMenu}>
                    <span className="auth-icon">📝</span>
                    <span>Inscription</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
