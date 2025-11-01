import React, { useState } from 'react';

const GameSelection = () => {
  const [activeFilter, setActiveFilter] = useState('most-popular');

  const filterTabs = [
    { id: 'most-popular', label: 'Plus populaires' },
    { id: 'most-action', label: 'Plus d\'action' },
    { id: 'coaching', label: 'Coaching' },
    { id: 'matches', label: 'Matchs' }
  ];

  // URLs d'images des jeux - vous pouvez remplacer par des images locales dans /public/game-images/
  const gameCards = [
    { id: 1, name: 'CS2', image: '/game-images/cs2.png', imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg', fullName: 'Counter-Strike 2', prosOnline: 12, hasTrophy: true },
    { id: 2, name: 'Valorant', image: '/game-images/valorant.png', imageUrl: 'https://images.contentstack.io/v3/assets/blt0eb2a2986b796d29/blt01985f0a0e0f0ffc/60ee0e2faf4c0f4f8e8a8b2c/VALORANT_2021_Ep5_Act2_PlayVALORANT_1920x1080.jpg', fullName: 'Valorant', prosOnline: 8, hasTrophy: false },
    { id: 3, name: 'LoL', image: '/game-images/lol.png', imageUrl: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg', fullName: 'League of Legends', prosOnline: 15, hasTrophy: true },
    { id: 4, name: 'Fortnite', image: '/game-images/fortnite.png', imageUrl: 'https://cdn2.unrealengine.com/fortnite-og-image-1920x1080-1920x1080-52c5c681f93e.jpg', fullName: 'Fortnite', prosOnline: 6, hasTrophy: false },
    { id: 5, name: 'Apex', image: '/game-images/apex.png', imageUrl: 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/apex-featured-image-16x9.jpg.adapt.crop16x9.1023w.jpg', fullName: 'Apex Legends', prosOnline: 9, hasTrophy: false },
    { id: 6, name: 'FIFA', image: '/game-images/fifa.png', imageUrl: 'https://www.ea.com/ea-sports-fc/fc-24/news/articles/fc24-hero-image.jpg', fullName: 'FIFA', prosOnline: 4, hasTrophy: false },
    { id: 7, name: 'COD', image: '/game-images/cod.png', imageUrl: 'https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/hero/mw3/MWIII-001-REVEAL-TOUTLEMONDE-004.jpg', fullName: 'Call of Duty', prosOnline: 7, hasTrophy: true },
    { id: 8, name: 'Rocket League', image: '/game-images/rocket-league.png', imageUrl: 'https://cdn2.unrealengine.com/rocket-league-og-image-1920x1080-1920x1080-87826c7513b6.jpg', fullName: 'Rocket League', prosOnline: 3, hasTrophy: false },
    { id: 9, name: 'Overwatch', image: '/game-images/overwatch.png', imageUrl: 'https://bnetcmsus-a.akamaihd.net/cms/blog_header/ox/OXJNXGDLWGDB1648078807786.jpg', fullName: 'Overwatch 2', prosOnline: 5, hasTrophy: false },
    { id: 10, name: 'Dota 2', image: '/game-images/dota2.png', imageUrl: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota2_social.jpg', fullName: 'Dota 2', prosOnline: 11, hasTrophy: true },
    { id: 11, name: 'Rainbow Six', image: '/game-images/rainbow-six.png', imageUrl: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/70wFhLRYR9Gxn0qRGpOQK8/68ca2941c3d02579472d0e74b74ea36a/r6s-homepage-hero.jpg', fullName: 'Rainbow Six Siege', prosOnline: 6, hasTrophy: false },
    { id: 12, name: 'PUBG', image: '/game-images/pubg.png', imageUrl: 'https://cdn2.unrealengine.com/pubg-og-image-1920x1080-1920x1080-87826c7513b6.jpg', fullName: 'PUBG', prosOnline: 4, hasTrophy: false },
    { id: 13, name: 'Minecraft', image: '/game-images/minecraft.png', imageUrl: 'https://www.minecraft.net/content/dam/games/minecraft/key-art/Vanilla_PMP_KeyArt_1167x650.jpg', fullName: 'Minecraft', prosOnline: 2, hasTrophy: false },
    { id: 14, name: 'Among Us', image: '/game-images/among-us.png', imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/945360/header.jpg', fullName: 'Among Us', prosOnline: 1, hasTrophy: false },
    { id: 15, name: 'Fall Guys', image: '/game-images/fall-guys.png', imageUrl: 'https://cdn2.unrealengine.com/fallguys-og-image-1920x1080-1920x1080-87826c7513b6.jpg', fullName: 'Fall Guys', prosOnline: 3, hasTrophy: false }
  ];

  return (
    <div className="mb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Choisir un jeu</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1.5 rounded-lg transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filtres
          </button>
          <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1.5 rounded-lg transition-colors text-sm">
            <span>Voir tous</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm ${
              activeFilter === tab.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-5 gap-3">
        {gameCards.map((game) => {
          // Utiliser l'image locale si disponible (dans /public/game-images/), sinon utiliser l'URL
          // Priorité: image locale > imageUrl
          const imageSrc = game.image && game.image.startsWith('/game-images/') 
            ? game.image 
            : (game.imageUrl || game.image);
          
          return (
            <div
              key={game.id}
              className="relative rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group overflow-hidden aspect-square"
            >
              {/* Image en plein écran en arrière-plan */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={imageSrc} 
                  alt={game.fullName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    // En cas d'erreur de chargement, afficher un placeholder
                    e.target.style.display = 'none';
                    const placeholder = e.target.parentElement.parentElement.querySelector('.image-placeholder');
                    if (placeholder) {
                      placeholder.style.display = 'flex';
                    }
                  }}
                />
                {/* Placeholder si l'image ne charge pas */}
                <div className="image-placeholder hidden absolute inset-0 w-full h-full items-center justify-center text-2xl font-bold text-gray-400 bg-gradient-to-br from-gray-700 to-gray-800">
                  {game.name}
                </div>
              </div>
              
              {/* Overlay sombre pour la lisibilité du texte */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 rounded-xl"></div>
              
              {/* Contenu texte superposé */}
              <div className="relative z-10 h-full flex flex-col justify-end p-3">
                {/* Game Name */}
                <div className="text-center">
                  <div className="text-white text-sm font-bold mb-0.5 drop-shadow-lg">{game.name}</div>
                  <div className="text-gray-200 text-xs drop-shadow-md">{game.prosOnline} pros</div>
                </div>
              </div>
              
              {/* Status Icons */}
              {game.hasTrophy && (
                <div className="absolute top-2 left-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center z-20 shadow-lg">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              )}
              
              {/* Online Indicator */}
              <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse z-20 shadow-lg border-2 border-white/50"></div>
              
              {/* Hover Effect - Amélioré pour couvrir toute la carte */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/50 via-blue-500/30 to-blue-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10"></div>
              {/* Bordure lumineuse au survol */}
              <div className="absolute inset-0 border-2 border-blue-400/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameSelection;
