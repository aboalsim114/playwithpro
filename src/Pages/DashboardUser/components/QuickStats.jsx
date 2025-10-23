import React from 'react';
import { USER_STATS } from '../constants';

const QuickStats = () => {
  const stats = [
    {
      icon: '🏆',
      value: `${USER_STATS.winRate}%`,
      label: 'Victoires'
    },
    {
      icon: '⚡',
      value: USER_STATS.matches,
      label: 'Matchs'
    },
    {
      icon: '⭐',
      value: USER_STATS.rating,
      label: 'Note'
    }
  ];

  return (
    <div className="quick-stats-section">
      <div className="quick-stats-card">
        <h3 className="quick-stats-title">📊 Aperçu Rapide</h3>
        <div className="quick-stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="quick-stat">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
