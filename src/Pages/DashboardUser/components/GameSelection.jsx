import React, { useState } from 'react';
import './GameSelection.css';

const GameSelection = () => {
  const [activeFilter, setActiveFilter] = useState('most-popular');

  const filterTabs = [
    { id: 'most-popular', label: 'Plus populaires' },
    { id: 'most-action', label: 'Plus d\'action' },
    { id: 'coaching', label: 'Coaching' },
    { id: 'matches', label: 'Matchs' }
  ];

  // Configuration des skins/thèmes par jeu avec couleurs pour styles inline
  const getGameSkin = (gameName) => {
    const skins = {
      'CS2': {
        gradient: 'from-orange-500/20 via-red-500/20 to-orange-600/20',
        gradientFull: 'from-orange-500 via-red-500 to-orange-600',
        borderColor: 'rgba(249, 115, 22, 0.5)',
        glowColor: 'rgba(249, 115, 22, 0.3)',
        accentColor: '#fb923c',
        bgGradient: 'from-gray-900/95 via-red-900/30 to-gray-900/95'
      },
      'Valorant': {
        gradient: 'from-red-500/20 via-pink-500/20 to-red-600/20',
        gradientFull: 'from-red-500 via-pink-500 to-red-600',
        borderColor: 'rgba(239, 68, 68, 0.5)',
        glowColor: 'rgba(239, 68, 68, 0.3)',
        accentColor: '#f87171',
        bgGradient: 'from-gray-900/95 via-red-900/30 to-gray-900/95'
      },
      'LoL': {
        gradient: 'from-blue-500/20 via-cyan-500/20 to-blue-600/20',
        gradientFull: 'from-blue-500 via-cyan-500 to-blue-600',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        glowColor: 'rgba(59, 130, 246, 0.3)',
        accentColor: '#60a5fa',
        bgGradient: 'from-gray-900/95 via-blue-900/30 to-gray-900/95'
      },
      'Fortnite': {
        gradient: 'from-purple-500/20 via-pink-500/20 to-purple-600/20',
        gradientFull: 'from-purple-500 via-pink-500 to-purple-600',
        borderColor: 'rgba(168, 85, 247, 0.5)',
        glowColor: 'rgba(168, 85, 247, 0.3)',
        accentColor: '#a78bfa',
        bgGradient: 'from-gray-900/95 via-purple-900/30 to-gray-900/95'
      },
      'Apex': {
        gradient: 'from-yellow-500/20 via-orange-500/20 to-yellow-600/20',
        gradientFull: 'from-yellow-500 via-orange-500 to-yellow-600',
        borderColor: 'rgba(234, 179, 8, 0.5)',
        glowColor: 'rgba(234, 179, 8, 0.3)',
        accentColor: '#fbbf24',
        bgGradient: 'from-gray-900/95 via-orange-900/30 to-gray-900/95'
      },
      'FIFA': {
        gradient: 'from-green-500/20 via-emerald-500/20 to-green-600/20',
        gradientFull: 'from-green-500 via-emerald-500 to-green-600',
        borderColor: 'rgba(34, 197, 94, 0.5)',
        glowColor: 'rgba(34, 197, 94, 0.3)',
        accentColor: '#4ade80',
        bgGradient: 'from-gray-900/95 via-green-900/30 to-gray-900/95'
      },
      'COD': {
        gradient: 'from-gray-500/20 via-slate-500/20 to-gray-600/20',
        gradientFull: 'from-gray-500 via-slate-500 to-gray-600',
        borderColor: 'rgba(107, 114, 128, 0.5)',
        glowColor: 'rgba(107, 114, 128, 0.3)',
        accentColor: '#d1d5db',
        bgGradient: 'from-gray-900/95 via-slate-900/30 to-gray-900/95'
      },
      'Rocket League': {
        gradient: 'from-indigo-500/20 via-blue-500/20 to-indigo-600/20',
        gradientFull: 'from-indigo-500 via-blue-500 to-indigo-600',
        borderColor: 'rgba(99, 102, 241, 0.5)',
        glowColor: 'rgba(99, 102, 241, 0.3)',
        accentColor: '#818cf8',
        bgGradient: 'from-gray-900/95 via-indigo-900/30 to-gray-900/95'
      },
      'Overwatch': {
        gradient: 'from-cyan-500/20 via-blue-500/20 to-cyan-600/20',
        gradientFull: 'from-cyan-500 via-blue-500 to-cyan-600',
        borderColor: 'rgba(6, 182, 212, 0.5)',
        glowColor: 'rgba(6, 182, 212, 0.3)',
        accentColor: '#22d3ee',
        bgGradient: 'from-gray-900/95 via-cyan-900/30 to-gray-900/95'
      },
      'Dota 2': {
        gradient: 'from-violet-500/20 via-purple-500/20 to-violet-600/20',
        gradientFull: 'from-violet-500 via-purple-500 to-violet-600',
        borderColor: 'rgba(139, 92, 246, 0.5)',
        glowColor: 'rgba(139, 92, 246, 0.3)',
        accentColor: '#a78bfa',
        bgGradient: 'from-gray-900/95 via-violet-900/30 to-gray-900/95'
      },
      'Rainbow Six': {
        gradient: 'from-amber-500/20 via-yellow-500/20 to-amber-600/20',
        gradientFull: 'from-amber-500 via-yellow-500 to-amber-600',
        borderColor: 'rgba(245, 158, 11, 0.5)',
        glowColor: 'rgba(245, 158, 11, 0.3)',
        accentColor: '#fbbf24',
        bgGradient: 'from-gray-900/95 via-amber-900/30 to-gray-900/95'
      },
      'PUBG': {
        gradient: 'from-teal-500/20 via-cyan-500/20 to-teal-600/20',
        gradientFull: 'from-teal-500 via-cyan-500 to-teal-600',
        borderColor: 'rgba(20, 184, 166, 0.5)',
        glowColor: 'rgba(20, 184, 166, 0.3)',
        accentColor: '#2dd4bf',
        bgGradient: 'from-gray-900/95 via-teal-900/30 to-gray-900/95'
      },
      'Minecraft': {
        gradient: 'from-emerald-500/20 via-green-500/20 to-emerald-600/20',
        gradientFull: 'from-emerald-500 via-green-500 to-emerald-600',
        borderColor: 'rgba(16, 185, 129, 0.5)',
        glowColor: 'rgba(16, 185, 129, 0.3)',
        accentColor: '#34d399',
        bgGradient: 'from-gray-900/95 via-emerald-900/30 to-gray-900/95'
      },
      'Among Us': {
        gradient: 'from-rose-500/20 via-pink-500/20 to-rose-600/20',
        gradientFull: 'from-rose-500 via-pink-500 to-rose-600',
        borderColor: 'rgba(244, 63, 94, 0.5)',
        glowColor: 'rgba(244, 63, 94, 0.3)',
        accentColor: '#fb7185',
        bgGradient: 'from-gray-900/95 via-rose-900/30 to-gray-900/95'
      },
      'Fall Guys': {
        gradient: 'from-fuchsia-500/20 via-pink-500/20 to-fuchsia-600/20',
        gradientFull: 'from-fuchsia-500 via-pink-500 to-fuchsia-600',
        borderColor: 'rgba(217, 70, 239, 0.5)',
        glowColor: 'rgba(217, 70, 239, 0.3)',
        accentColor: '#f0abfc',
        bgGradient: 'from-gray-900/95 via-fuchsia-900/30 to-gray-900/95'
      }
    };
    return skins[gameName] || skins['CS2'];
  };

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

      {/* Game Cards Grid - Design Premium avec Skins Personnalisés - Grid 3 colonnes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gameCards.map((game, index) => {
          const skin = getGameSkin(game.name);
          // Utiliser l'image locale si disponible (dans /public/game-images/), sinon utiliser l'URL
          const imageSrc = game.image && game.image.startsWith('/game-images/') 
            ? game.image 
            : (game.imageUrl || game.image);
          
          return (
            <div
              key={game.id}
              className="group relative cursor-pointer"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Carte avec design premium personnalisé - Format plus grand */}
              <div 
                className="relative bg-gradient-to-br from-gray-900/95 to-gray-900/95 rounded-2xl overflow-hidden border border-gray-700/50 shadow-xl transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 backdrop-blur-sm game-card"
                style={{
                  '--border-color': skin.borderColor,
                  '--glow-color': skin.glowColor,
                  '--accent-color': skin.accentColor
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = skin.borderColor;
                  e.currentTarget.style.boxShadow = `0 25px 50px -12px ${skin.glowColor}, 0 0 0 1px ${skin.borderColor}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(55, 65, 81, 0.5)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                }}
              >
                {/* Effet de brillance animé */}
                <div className={`absolute inset-0 bg-gradient-to-r ${skin.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Image du jeu avec ratio 16:9 pour format plus large */}
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-800">
                  {/* Image avec effet parallax */}
                  <div className="absolute inset-0 transform group-hover:scale-110 transition-transform duration-700 ease-out">
                    <img 
                      src={imageSrc} 
                      alt={game.fullName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const placeholder = e.target.parentElement.querySelector('.image-placeholder');
                        if (placeholder) {
                          placeholder.style.display = 'flex';
                        }
                      }}
                    />
                  </div>
                  
                  {/* Placeholder */}
                  <div className="image-placeholder hidden absolute inset-0 w-full h-full items-center justify-center text-xl font-bold text-gray-500 bg-gradient-to-br from-gray-800 to-gray-900">
                    {game.name}
                  </div>
                  
                  {/* Overlay gradient dynamique */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${skin.bgGradient} opacity-80 group-hover:opacity-60 transition-opacity duration-500`}></div>
                  
                  {/* Lignes animées au hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div 
                      className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent to-transparent animate-shimmer"
                      style={{ background: `linear-gradient(to right, transparent, ${skin.borderColor}, transparent)` }}
                    ></div>
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent to-transparent animate-shimmer"
                      style={{ 
                        background: `linear-gradient(to right, transparent, ${skin.borderColor}, transparent)`,
                        animationDelay: '0.5s' 
                      }}
                    ></div>
                  </div>
                  
                  {/* Badge trophée amélioré - Plus grand */}
                  {game.hasTrophy && (
                    <div className="absolute top-3 left-3 z-10 transform group-hover:scale-110 transition-transform duration-300">
                      <div className="relative">
                        <div className="absolute inset-0 bg-yellow-500 rounded-xl blur-md opacity-75 animate-pulse"></div>
                        <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl px-3 py-1.5 shadow-2xl flex items-center gap-1.5 border border-yellow-300/50">
                          <svg className="w-4 h-4 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          <span className="text-xs font-bold text-white drop-shadow-lg">PRO</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Indicateur online amélioré - Plus grand */}
                  <div className="absolute top-3 right-3 z-10">
                    <div className="relative transform group-hover:scale-110 transition-transform duration-300">
                      <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                      <div className="relative bg-gradient-to-br from-green-400 to-green-600 rounded-full w-4 h-4 border-2 border-white/90 shadow-lg"></div>
                      <div className="absolute inset-0 bg-green-400 rounded-full blur-sm opacity-50"></div>
                    </div>
                  </div>
                  
                  {/* Nombre de pros online visible sur l'image */}
                  <div className="absolute bottom-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/60 backdrop-blur-md rounded-lg px-3 py-1.5 flex items-center gap-2 border border-white/20">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-50"></div>
                        <div className="relative bg-green-500 rounded-full w-2 h-2"></div>
                      </div>
                      <span className="text-white text-sm font-bold">{game.prosOnline} pros en ligne</span>
                    </div>
                  </div>
                  
                  {/* Barre de progression stylisée avec gradient personnalisé - Plus épaisse */}
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-900/90 backdrop-blur-sm">
                    <div 
                      className={`h-full bg-gradient-to-r ${skin.gradientFull} transition-all duration-700 relative overflow-hidden`}
                      style={{ width: `${(game.prosOnline / 15) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-white/40 animate-shimmer"></div>
                      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-transparent to-white/20"></div>
                    </div>
                  </div>
                  
                  {/* Particules animées au hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full animate-float"
                        style={{
                          backgroundColor: skin.borderColor,
                          left: `${20 + i * 30}%`,
                          top: `${30 + i * 20}%`,
                          animationDelay: `${i * 0.3}s`,
                          animationDuration: `${2 + i * 0.5}s`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                {/* Contenu texte avec design amélioré - Plus d'espace */}
                <div className={`relative p-5 bg-gradient-to-b ${skin.bgGradient} backdrop-blur-sm border-t border-gray-700/30`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 
                        className="text-white font-bold text-lg mb-1 transition-colors duration-300 drop-shadow-lg group-hover:scale-105 inline-block"
                        style={{ color: 'inherit' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = skin.accentColor; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'white'; }}
                      >
                        {game.name}
                      </h3>
                      <p className="text-gray-300 text-sm group-hover:text-gray-100 transition-colors duration-300">{game.fullName}</p>
                    </div>
                    <div 
                      className="flex items-center gap-1.5 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg ml-3 flex-shrink-0"
                      style={{ 
                        background: `linear-gradient(to right, ${skin.borderColor.replace('0.5', '0.3')}, ${skin.glowColor.replace('0.3', '0.3')})`,
                        border: `1px solid ${skin.borderColor.replace('0.5', '0.3')}`
                      }}
                    >
                      <svg className="w-4 h-4 text-yellow-400 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span className="text-yellow-400 text-sm font-bold drop-shadow-md">{game.prosOnline}</span>
                    </div>
                  </div>
                  
                  {/* Statistiques supplémentaires */}
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <span>Actif</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span>Classé</span>
                    </div>
                  </div>
                  
                  {/* Ligne décorative */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(to right, transparent, ${skin.borderColor.replace('0.5', '0.5')}, transparent)` }}
                  ></div>
                </div>
                
                {/* Bordure lumineuse au hover - Plus épaisse */}
                <div 
                  className="absolute inset-0 rounded-2xl border-2 border-opacity-0 group-hover:border-opacity-100 transition-all duration-500 pointer-events-none"
                  style={{ borderColor: skin.borderColor }}
                ></div>
                
                {/* Effet de glow externe au hover - Plus prononcé */}
                <div 
                  className="absolute -inset-2 bg-gradient-to-r rounded-2xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10"
                  style={{ background: `linear-gradient(to right, ${skin.borderColor.replace('0.5', '0.4')}, ${skin.glowColor.replace('0.3', '0.4')}, ${skin.borderColor.replace('0.5', '0.4')})` }}
                ></div>
                
                {/* Effet de scan au hover */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 pointer-events-none">
                  <div 
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent to-transparent animate-scan"
                    style={{ background: `linear-gradient(to right, transparent, ${skin.borderColor.replace('0.5', '0.7')}, transparent)` }}
                  ></div>
                </div>
                
                {/* Effet de brillance diagonale */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, transparent 30%, ${skin.borderColor.replace('0.5', '0.1')} 50%, transparent 70%)`
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Styles CSS personnalisés pour animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-scan {
          animation: scan 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default GameSelection;
