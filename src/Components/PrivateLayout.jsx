import React from 'react'
import Sidebar from '../Pages/DashboardUser/components/Sidebar'
import MobileMenuToggle from '../Pages/DashboardUser/components/MobileMenuToggle'
import { useDashboard } from '../Pages/DashboardUser/hooks/useDashboard'

const PrivateLayout = ({ children }) => {
  const {
    activeNav,
    userType,
    isMobileMenuOpen,
    setUserType,
    handleNavClick,
    toggleMobileMenu
  } = useDashboard()

  return (
    <div className="dashboard-container">
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      {/* Mobile Menu Toggle */}
      <MobileMenuToggle onToggle={toggleMobileMenu} />
      
      {/* Sidebar */}
      <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen}
        userType={userType}
        activeNav={activeNav}
        onNavClick={handleNavClick}
        onUserTypeChange={setUserType}
      />

      {/* Main Content */}
      <main id="main-content" className="main-content" role="main">
        {children}
      </main>
    </div>
  )
}

export default PrivateLayout
