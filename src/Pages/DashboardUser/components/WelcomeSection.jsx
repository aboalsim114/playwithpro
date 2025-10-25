import React from 'react';

const WelcomeSection = () => (
  <div className="p-6">
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-4">🎮 Prêt à Jouer avec les Pros !</h2>
        <p className="text-blue-100 text-lg">
          Bon retour, Mark ! Réserve une session avec des joueurs professionnels ou reçois un coaching personnalisé.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="flex items-center gap-3 bg-white text-blue-600 py-4 px-6 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
          <span className="text-2xl">👥</span>
          <span>Trouver un Pro</span>
        </button>
        <button className="flex items-center gap-3 bg-transparent border-2 border-white text-white py-4 px-6 rounded-xl font-semibold hover:bg-white/10 transition-colors">
          <span className="text-2xl">🎯</span>
          <span>Réserver Coaching</span>
        </button>
      </div>
    </div>
  </div>
);

export default WelcomeSection;
