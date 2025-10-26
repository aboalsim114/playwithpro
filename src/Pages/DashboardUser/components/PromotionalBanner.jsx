import React from 'react';

const PromotionalBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 rounded-2xl p-6 mb-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-2 right-4 w-24 h-24 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-2 left-4 w-16 h-16 bg-purple-500 rounded-full blur-2xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white mb-2">
            Jouez avec les meilleurs pros e-Sport !
          </h1>
          <p className="text-gray-300 text-sm mb-3">
            Réservez une session de coaching personnalisée ou jouez directement avec un pro. Sessions de 15min à 1h disponibles.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
            Réserver maintenant
          </button>
        </div>
        
        {/* Decorative Elements */}
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center transform rotate-12 shadow-2xl">
            <div className="w-28 h-28 bg-gradient-to-br from-white to-gray-200 rounded-xl flex items-center justify-center transform -rotate-12">
              <div className="text-center text-gray-800">
                <div className="text-2xl mb-1">🎮</div>
                <div className="text-xs font-bold">PRO</div>
                <div className="text-xs">MATCH</div>
              </div>
            </div>
          </div>
          {/* Floating items */}
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-blue-500 rounded-lg transform rotate-45 animate-bounce"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 -right-4 w-3 h-3 bg-yellow-400 rounded transform rotate-45 animate-ping"></div>
        </div>
      </div>
      
      {/* Badge */}
      <div className="absolute top-3 right-3 bg-gray-800 text-gray-300 px-2 py-1 rounded-lg text-xs font-medium">
        ⚡ Sessions en direct
      </div>
    </div>
  );
};

export default PromotionalBanner;
