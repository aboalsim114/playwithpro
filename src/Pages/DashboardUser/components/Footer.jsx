import React from 'react';

const Footer = () => (
  <footer className="bg-gray-50 border-t border-gray-200 px-6 py-4">
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-gray-600 text-sm">
        © 2024, Fait avec ❤️ par PLAY-WITH-PRO - Connecter les joueurs avec les professionnels
      </div>
      <div className="flex gap-6">
        <button className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
          Joueurs Pro
        </button>
        <button className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
          Coaching
        </button>
        <button className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
          Support
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
