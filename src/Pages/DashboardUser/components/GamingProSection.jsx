import React from 'react';

const GamingProSection = () => {
  const renderGamingBackground = () => (
    <div className="gaming-background">
      <div className="cyber-grid"></div>
      <div className="neon-particles">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>
      <div className="energy-waves">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className={`wave wave-${i + 1}`}></div>
        ))}
      </div>
      <div className="holographic-lines">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className={`line line-${i + 1}`}></div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex-1 p-6">
      <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl overflow-hidden min-h-[400px]">
        {renderGamingBackground()}
        
        <div className="relative z-10 p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Gaming Pro Section</h2>
          <p className="text-gray-300 mb-8">Advanced gaming features and professional tools</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Pro Analytics</h3>
              <p className="text-gray-300 text-sm">Advanced performance tracking and insights</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-1.306-.835-2.418-2-2.83M7 20v-2c0-1.306.835-2.418 2-2.83m0 0a3 3 0 015.356-1.857M9 15a3 3 0 015.356-1.857" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Team Management</h3>
              <p className="text-gray-300 text-sm">Organize and manage your gaming teams</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Achievements</h3>
              <p className="text-gray-300 text-sm">Track your gaming achievements and milestones</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamingProSection;
