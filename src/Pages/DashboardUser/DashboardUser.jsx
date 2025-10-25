import React from 'react';

// Import components
import Header from './components/Header';
import UserBanner from './components/UserBanner';
import LoadingSpinner from './components/LoadingSpinner';
import WelcomeSection from './components/WelcomeSection';
import QuickStats from './components/QuickStats';
import GamingProSection from './components/GamingProSection';
import Footer from './components/Footer';

// Import hooks
import { useDashboard } from './hooks/useDashboard';

function DashboardUser() {
  const {
    // State
    userType,
    isLoading,
    currentGame,
    isGameDropdownOpen,
    
    // Actions
    toggleGameDropdown,
    selectGame
  } = useDashboard();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="dashboard-content">
      {/* Header */}
      <Header 
        userType={userType}
        currentGame={currentGame}
        isGameDropdownOpen={isGameDropdownOpen}
        onGameDropdownToggle={toggleGameDropdown}
        onGameSelect={selectGame}
      />

      <br />
      <br />

      {/* User Banner */}
      <UserBanner />
      <br />
      <br />

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
    </div>
  );
}

export default DashboardUser;
