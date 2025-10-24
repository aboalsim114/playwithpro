import React from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../DashboardUser/components/Sidebar'
import MobileMenuToggle from '../DashboardUser/components/MobileMenuToggle'
import { useDashboard } from '../DashboardUser/hooks/useDashboard'
import './UserProfile.css'

function UserProfile() {
  const { id } = useParams()
  
  const {
    activeNav,
    userType,
    isMobileMenuOpen,
    setUserType,
    handleNavClick,
    toggleMobileMenu
  } = useDashboard()

  return (
    <div className="user-profile">
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
        <div className="profile-content">
          <div className="profile-header">
            <h1>Profil Utilisateur #{id}</h1>
            <p>Page de profil en cours de développement...</p>
          </div>
          
          <div className="profile-body">
            <div className="profile-card">
              <h2>Informations du profil</h2>
              <p>ID utilisateur: {id}</p>
              <p>Cette page affichera les informations détaillées de l'utilisateur.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default UserProfile
