import React from 'react';
import './DashboardUser.css';

// Import components
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import UserBanner from './components/UserBanner';
import LoadingSpinner from './components/LoadingSpinner';
import MobileMenuToggle from './components/MobileMenuToggle';
import WelcomeSection from './components/WelcomeSection';
import QuickStats from './components/QuickStats';
import GamingProSection from './components/GamingProSection';
import Footer from './components/Footer';

// Import hooks
import { useDashboard } from './hooks/useDashboard';

function DashboardUser() {
  const {
    // State
    activeNav,
    userType,
    isLoading,
    currentGame,
    isMobileMenuOpen,
    isGameDropdownOpen,
    
    // Actions
    setUserType,
    handleNavClick,
    toggleMobileMenu,
    toggleGameDropdown,
    selectGame
  } = useDashboard();

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
        {/* Header */}
        <Header 
          userType={userType}
          currentGame={currentGame}
          isGameDropdownOpen={isGameDropdownOpen}
          onGameDropdownToggle={toggleGameDropdown}
          onGameSelect={selectGame}
        />

        {/* User Banner */}
        <UserBanner />

        {/* Flexible Content Layout */}
        <div className="flexible-content">
          {/* Full Width Section */}
          <div className="content-row full-width">
            <WelcomeSection />
          </div>
          
          {/* Two Column Section */}
          <div className="content-row two-columns">
            <div className="content-column">
              <QuickStats />
            </div>
            <GamingProSection />
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}

export default DashboardUser;
