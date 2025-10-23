import React from 'react';
import { USER_STATS } from '../constants';

const UserBanner = () => {
  const renderFloatingParticles = () => (
    <div className="floating-particles">
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className={`particle particle-${i + 1}`}></div>
      ))}
    </div>
  );

  const renderGeometricShapes = () => (
    <div className="geometric-shapes">
      {Array.from({ length: 7 }, (_, i) => (
        <div key={i} className={`shape shape-${i + 1}`}></div>
      ))}
    </div>
  );

  const renderDataStreams = () => (
    <div className="data-streams">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className={`data-stream stream-${i + 1}`}></div>
      ))}
    </div>
  );

  const renderHolographicGrid = () => (
    <div className="holographic-grid">
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className={`grid-line grid-line-${i + 1}`}></div>
      ))}
    </div>
  );

  const renderEnergyWaves = () => (
    <div className="energy-waves">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className={`wave wave-${i + 1}`}></div>
      ))}
    </div>
  );

  const renderNeuralNetwork = () => (
    <div className="neural-network">
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className={`neural-node node-${i + 1}`}></div>
      ))}
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className={`neural-connection connection-${i + 1}`}></div>
      ))}
    </div>
  );

  const renderQuantumDots = () => (
    <div className="quantum-dots">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className={`quantum-dot dot-${i + 1}`}></div>
      ))}
    </div>
  );

  const renderHolographicOrbs = () => (
    <div className="holographic-orbs">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className={`orb orb-${i + 1}`}></div>
      ))}
    </div>
  );

  return (
    <div className="user-banner">
      <div className="user-banner-background">
        <div className="user-banner-pattern"></div>
        <div className="user-banner-glow"></div>
        
        {renderFloatingParticles()}
        {renderGeometricShapes()}
        {renderDataStreams()}
        {renderHolographicGrid()}
        {renderEnergyWaves()}
        {renderNeuralNetwork()}
        {renderQuantumDots()}
        {renderHolographicOrbs()}
      </div>
      
      <div className="user-clean-card">
        <div className="clean-header">
          <div className="clean-avatar">
            <div className="avatar-circle">MJ</div>
            <div className="avatar-status"></div>
          </div>
          
          <div className="clean-info">
            <h1 className="clean-name">Mark Johnson</h1>
            <p className="clean-title">Joueur Professionnel</p>
            <div className="clean-meta">
              <span className="meta-badge">Niveau {USER_STATS.level}</span>
              <span className="meta-badge">{USER_STATS.rank}</span>
              <span className="meta-badge">{USER_STATS.region}</span>
            </div>
          </div>
        </div>
        
        <div className="clean-stats">
          <div className="stat-row">
            <div className="stat">
              <div className="stat-value">{USER_STATS.matches}</div>
              <div className="stat-label">Matchs</div>
            </div>
            <div className="stat">
              <div className="stat-value">{USER_STATS.winRate}%</div>
              <div className="stat-label">Taux de Victoire</div>
            </div>
            <div className="stat">
              <div className="stat-value">{USER_STATS.rating}</div>
              <div className="stat-label">Note</div>
            </div>
          </div>
        </div>
        
        <div className="clean-actions">
          <button className="clean-btn primary">Message</button>
          <button className="clean-btn secondary">Voir le Profil</button>
        </div>
      </div>
      
      <div className="user-stats">
        <div className="stats-header">
          <h4 className="stats-title">Performance</h4>
          <div className="stats-period">Ce Mois</div>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-value">{USER_STATS.matches}</span>
              <span className="stat-label">Matchs</span>
              <div className="stat-trend positive">+12%</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-value">{USER_STATS.winRate}%</span>
              <span className="stat-label">Taux de Victoire</span>
              <div className="stat-trend positive">+5%</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-value">{USER_STATS.rating}</span>
              <span className="stat-label">Note</span>
              <div className="stat-trend positive">+0.3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBanner;
