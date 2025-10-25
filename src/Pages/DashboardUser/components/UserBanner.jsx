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
    <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)]"></div>
        
        {renderFloatingParticles()}
        {renderGeometricShapes()}
        {renderDataStreams()}
        {renderHolographicGrid()}
        {renderEnergyWaves()}
        {renderNeuralNetwork()}
        {renderQuantumDots()}
        {renderHolographicOrbs()}
      </div>
      
      <div className="relative z-10 p-8">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                MJ
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-2">Mark Johnson</h1>
              <p className="text-gray-300 mb-4">Joueur Professionnel</p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Niveau {USER_STATS.level}</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">{USER_STATS.rank}</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">{USER_STATS.region}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{USER_STATS.matches}</div>
              <div className="text-gray-300 text-sm">Matchs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{USER_STATS.winRate}%</div>
              <div className="text-gray-300 text-sm">Taux de Victoire</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{USER_STATS.rating}</div>
              <div className="text-gray-300 text-sm">Note</div>
            </div>
          </div>
          
          <div className="flex gap-4 mt-6">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
              Message
            </button>
            <button className="flex-1 bg-transparent border border-white/30 text-white hover:bg-white/10 py-3 px-6 rounded-lg font-semibold transition-colors">
              Voir le Profil
            </button>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-white">Performance</h4>
            <div className="text-gray-300 text-sm">Ce Mois</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-2xl font-bold text-white block">{USER_STATS.matches}</span>
                  <span className="text-gray-300 text-sm">Matchs</span>
                </div>
              </div>
              <div className="text-green-400 text-sm font-medium">+12%</div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <span className="text-2xl font-bold text-white block">{USER_STATS.winRate}%</span>
                  <span className="text-gray-300 text-sm">Taux de Victoire</span>
                </div>
              </div>
              <div className="text-green-400 text-sm font-medium">+5%</div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div>
                  <span className="text-2xl font-bold text-white block">{USER_STATS.rating}</span>
                  <span className="text-gray-300 text-sm">Note</span>
                </div>
              </div>
              <div className="text-green-400 text-sm font-medium">+0.3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBanner;
