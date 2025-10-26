import React from 'react';

const PromotionalBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 rounded-2xl p-6 mb-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-2 right-4 w-24 h-24 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-2 left-4 w-16 h-16 bg-blue-500 rounded-full blur-2xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white mb-2">
            Free tournament with valuable prizes
          </h1>
          <p className="text-gray-300 text-sm mb-3">
            San Quentin 2 is live - win mystery chests packed with prizes worth over €1000!
          </p>
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25">
            Play now
          </button>
        </div>
        
        {/* Decorative Elements */}
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center transform rotate-12 shadow-2xl">
            <div className="w-28 h-28 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center transform -rotate-12">
              <div className="text-white text-center">
                <div className="text-xl mb-1">🎮</div>
                <div className="text-xs font-bold">MYSTERY</div>
                <div className="text-xs">CHEST</div>
              </div>
            </div>
          </div>
          {/* Floating items */}
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-blue-500 rounded-lg transform rotate-45 animate-bounce"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 -right-4 w-3 h-3 bg-yellow-400 rounded transform rotate-45 animate-ping"></div>
        </div>
      </div>
      
      {/* Date Badge */}
      <div className="absolute top-3 right-3 bg-gray-800 text-gray-300 px-2 py-1 rounded-lg text-xs font-medium">
        24 Sept - 1 Oct
      </div>
    </div>
  );
};

export default PromotionalBanner;
