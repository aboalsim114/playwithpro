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
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">📊 Aperçu Rapide</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl">{stat.icon}</div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
