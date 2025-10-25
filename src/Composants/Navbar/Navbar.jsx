import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
      <nav className={`fixed top-2 sm:top-5 left-1/2 transform -translate-x-1/2 w-[98%] sm:w-[95%] max-w-6xl h-14 sm:h-16 glass-bg backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl shadow-lg z-50 transition-all duration-300 ${
        isScrolled ? 'top-1 sm:top-2.5 bg-white/8 border-white/30 shadow-2xl' : ''
      } ${shouldAnimate ? 'animate-slide-down' : ''}`}>
        <div className="w-full h-full flex items-center justify-between px-3 sm:px-6 relative z-10">
          {/* Logo Section */}
          <div className="flex items-center z-20">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 cursor-pointer transition-all duration-150 hover:-translate-y-0.5">
              <div className="w-6 h-6 sm:w-8 sm:h-8 gaming-gradient rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/20 rounded-lg"></div>
                <svg className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 stroke-white stroke-2.5 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
              <span className="text-white text-lg sm:text-xl font-bold tracking-tight drop-shadow-sm">PlayWithPro</span>
            </Link>
          </div>

          {/* Center Navigation - Hidden on mobile, visible on tablet and desktop */}
          <div className="hidden md:flex items-center z-20">
            <div className="flex items-center gap-4 lg:gap-8">
              {navItems.map((item, index) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`relative flex items-center gap-2 px-3 py-2 text-gray-300 text-sm font-medium transition-all duration-150 cursor-pointer bg-transparent border-none rounded-lg hover:text-white hover:bg-white/5 hover:-translate-y-0.5 ${
                    isActiveRoute(item.path) ? 'text-white bg-indigo-500/10' : ''
                  }`}
                >
                  <span className="text-base transition-all duration-150 hover:scale-110">{item.icon}</span>
                  <span className="relative z-10">{item.label}</span>
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 gaming-gradient rounded-sm transition-all duration-300 ${
                    isActiveRoute(item.path) ? 'scale-x-100' : 'scale-x-0'
                  }`}></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4 z-20">
            {/* Search - Hidden on mobile, visible on tablet and desktop */}
            <div className="hidden sm:flex relative items-center glass-bg border border-white/20 rounded-xl px-3 py-2 pl-10 transition-all duration-150 hover:glass-bg-hover hover:border-white/30 focus-within:glass-bg-hover focus-within:border-indigo-500 focus-within:shadow-lg focus-within:shadow-indigo-500/20">
              <svg className="absolute left-3 w-4 h-4 stroke-gray-400 stroke-2 z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="bg-transparent border-none outline-none text-white text-sm font-normal w-32 lg:w-44 placeholder-gray-400"
                aria-label="Rechercher"
              />
            </div>

            {/* User Avatar */}
            <div className="relative flex items-center" ref={userMenuRef}>
              <button 
                className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 glass-bg border border-white/20 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-150 hover:glass-bg-hover hover:border-white/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-transparent"
                onClick={toggleUserMenu}
                aria-label="User menu"
                aria-expanded={isUserMenuOpen}
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 gaming-gradient rounded-md flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/20 rounded-md"></div>
                  {isAuthenticated && currentUser?.avatar ? (
                    <img 
                      src={currentUser.avatar} 
                      alt="User avatar" 
                      className="w-full h-full object-cover rounded-md relative z-10"
                    />
                  ) : (
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-white stroke-2 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  )}
                </div>
                <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 border-2 border-gray-800 rounded-full animate-pulse"></div>
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute top-full right-0 mt-2 min-w-60 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 animate-fade-in">
                  <div className="p-2">
                    {isAuthenticated ? (
                      <>
                        <div className="p-3 bg-white/5 rounded-lg mb-2">
                          <div className="text-white text-sm font-semibold mb-0.5">{currentUser?.name || 'Utilisateur'}</div>
                          <div className="text-gray-400 text-xs">{currentUser?.email || ''}</div>
                        </div>
                        <div className="h-px bg-white/10 my-2"></div>
                        <Link 
                          to="/profile" 
                          className="flex items-center gap-3 p-3 text-gray-300 text-sm font-medium rounded-lg transition-all duration-150 hover:bg-white/10 hover:text-white hover:translate-x-1 cursor-pointer bg-none border-none w-full text-left"
                          onClick={closeUserMenu}
                        >
                          <span className="text-base w-5 text-center">👤</span>
                          <span className="flex-1">Mon Profil</span>
                        </Link>
                        <Link 
                          to="/dashboard" 
                          className="flex items-center gap-3 p-3 text-gray-300 text-sm font-medium rounded-lg transition-all duration-150 hover:bg-white/10 hover:text-white hover:translate-x-1 cursor-pointer bg-none border-none w-full text-left"
                          onClick={closeUserMenu}
                        >
                          <span className="text-base w-5 text-center">📊</span>
                          <span className="flex-1">Tableau de bord</span>
                        </Link>
                        <div className="h-px bg-white/10 my-2"></div>
                        <button className="flex items-center gap-3 p-3 text-red-400 text-sm font-medium rounded-lg transition-all duration-150 hover:bg-red-500/10 hover:text-red-300 hover:translate-x-1 cursor-pointer bg-none border-none w-full text-left">
                          <span className="text-base w-5 text-center">🚪</span>
                          <span className="flex-1">Déconnexion</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <Link 
                          to="/connexion" 
                          className="flex items-center gap-3 p-3 text-gray-300 text-sm font-medium rounded-lg transition-all duration-150 hover:bg-white/10 hover:text-white hover:translate-x-1 cursor-pointer bg-none border-none w-full text-left"
                          onClick={closeUserMenu}
                        >
                          <span className="text-base w-5 text-center">🔑</span>
                          <span className="flex-1">Connexion</span>
                        </Link>
                        <Link 
                          to="/inscription" 
                          className="flex items-center gap-3 p-3 text-gray-300 text-sm font-medium rounded-lg transition-all duration-150 hover:bg-white/10 hover:text-white hover:translate-x-1 cursor-pointer bg-none border-none w-full text-left"
                          onClick={closeUserMenu}
                        >
                          <span className="text-base w-5 text-center">📝</span>
                          <span className="flex-1">Inscription</span>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Menu Toggle for Mobile - Visible on mobile and tablet */}
            <button 
              className={`flex md:hidden flex-col justify-center items-center w-8 h-8 sm:w-10 sm:h-10 glass-bg border border-white/20 rounded-lg cursor-pointer transition-all duration-150 hover:glass-bg-hover hover:border-white/30 ${
                isMobileMenuOpen ? 'bg-indigo-500 border-indigo-500' : ''
              }`}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`w-3.5 h-0.5 sm:w-4.5 sm:h-0.5 bg-white rounded-sm transition-all duration-150 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-0.5'}`}></span>
              <span className={`w-3.5 h-0.5 sm:w-4.5 sm:h-0.5 bg-white rounded-sm transition-all duration-150 ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'mb-0.5'}`}></span>
              <span className={`w-3.5 h-0.5 sm:w-4.5 sm:h-0.5 bg-white rounded-sm transition-all duration-150 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Background Blur */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/2 to-white/5 pointer-events-none z-0"></div>
        
        {/* Subtle Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 animate-fade-in" onClick={closeMobileMenu}>
          <div className="fixed top-0 right-0 w-72 sm:w-80 h-full bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-l border-white/10 flex flex-col animate-slide-in-right shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 gaming-gradient rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/20 rounded-lg"></div>
                  <svg className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 stroke-white stroke-2.5 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
                <span className="text-white text-lg sm:text-xl font-bold">PlayWithPro</span>
              </div>
              <button 
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-150 hover:bg-white/20 hover:border-white/30"
                onClick={closeMobileMenu}
                aria-label="Close mobile menu"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 stroke-white stroke-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
              <div className="flex flex-col gap-2 mb-6 sm:mb-8">
                {navItems.map((item, index) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`flex items-center gap-3 p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl text-gray-300 text-sm sm:text-base font-medium transition-all duration-150 hover:bg-white/10 hover:border-white/20 hover:text-white hover:translate-x-1 cursor-pointer relative ${
                      isActiveRoute(item.path) ? 'bg-indigo-500/20 border-indigo-500 text-white' : ''
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-base sm:text-lg transition-all duration-150 hover:scale-110">{item.icon}</span>
                    <span>{item.label}</span>
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 gaming-gradient rounded-sm transition-all duration-300 ${
                      isActiveRoute(item.path) ? 'scale-x-100' : 'scale-x-0'
                    }`}></div>
                  </Link>
                ))}
              </div>

              <div className="mb-4 sm:mb-6">
                <div className="relative flex items-center glass-bg border border-white/10 rounded-xl px-3 py-2.5 sm:py-3 pl-8 sm:pl-10 w-full">
                  <svg className="absolute left-2.5 sm:left-3 w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-gray-400 stroke-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Rechercher..." 
                    className="w-full text-white text-sm sm:text-base placeholder-gray-400 bg-transparent border-none outline-none"
                    aria-label="Rechercher"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t border-white/10">
              {isAuthenticated ? (
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl relative">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 gaming-gradient rounded-md flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/20 rounded-md"></div>
                      {currentUser?.avatar ? (
                        <img 
                          src={currentUser.avatar} 
                          alt="User avatar" 
                          className="w-full h-full object-cover rounded-md relative z-10"
                        />
                      ) : (
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-white stroke-2 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-white text-sm sm:text-base font-semibold mb-0.5">{currentUser?.name || 'Utilisateur'}</div>
                      <div className="text-gray-400 text-xs sm:text-sm">{currentUser?.email || ''}</div>
                    </div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex flex-col gap-1.5 sm:gap-2">
                    <Link to="/profile" className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-white/5 border border-white/10 rounded-lg text-gray-300 text-xs sm:text-sm font-medium transition-all duration-150 hover:bg-white/10 hover:border-white/20 hover:text-white hover:translate-x-1 cursor-pointer bg-none border-none w-full text-left" onClick={closeMobileMenu}>
                      <span className="text-sm sm:text-base w-4 sm:w-5 text-center">👤</span>
                      <span>Mon Profil</span>
                    </Link>
                    <Link to="/dashboard" className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-white/5 border border-white/10 rounded-lg text-gray-300 text-xs sm:text-sm font-medium transition-all duration-150 hover:bg-white/10 hover:border-white/20 hover:text-white hover:translate-x-1 cursor-pointer bg-none border-none w-full text-left" onClick={closeMobileMenu}>
                      <span className="text-sm sm:text-base w-4 sm:w-5 text-center">📊</span>
                      <span>Tableau de bord</span>
                    </Link>
                    <button className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-white/5 border border-white/10 rounded-lg text-red-400 text-xs sm:text-sm font-medium transition-all duration-150 hover:bg-red-500/10 hover:text-red-300 hover:translate-x-1 cursor-pointer bg-none border-none w-full text-left">
                      <span className="text-sm sm:text-base w-4 sm:w-5 text-center">🚪</span>
                      <span>Déconnexion</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <Link to="/connexion" className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl text-white text-sm sm:text-base font-medium transition-all duration-150 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 cursor-pointer relative" onClick={closeMobileMenu}>
                    <span className="text-base sm:text-lg w-5 sm:w-6 text-center">🔑</span>
                    <span>Connexion</span>
                  </Link>
                  <Link to="/inscription" className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl text-white text-sm sm:text-base font-medium transition-all duration-150 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 cursor-pointer relative" onClick={closeMobileMenu}>
                    <span className="text-base sm:text-lg w-5 sm:w-6 text-center">📝</span>
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