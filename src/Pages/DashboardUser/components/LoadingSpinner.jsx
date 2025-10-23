import React from 'react';

const LoadingSpinner = () => (
  <div className="dashboard-container">
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <p>Loading dashboard...</p>
    </div>
  </div>
);

export default LoadingSpinner;
