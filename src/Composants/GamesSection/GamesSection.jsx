import React from 'react'

function GamesSection() {
  return (
    <section className="py-20 px-4" id="games">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="text-white">Découvrez nos</span>
            <span className="block bg-gradient-to-r from-green-400 via-orange-500 to-purple-600 bg-clip-text text-transparent">
              Jeux Disponibles
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Plongez dans l'univers du gaming compétitif avec nos jeux les plus populaires. Chaque titre offre une expérience unique et des défis passionnants.
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* CS2 Card */}
          <div className="glass-card group hover:scale-105 transition-all duration-300">
            <div className="relative h-48 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl mb-6 overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">En Ligne</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Counter-Strike 2</h3>
              <p className="text-gray-400 mb-4">Tactical FPS compétitif</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">1.2M</div>
                  <div className="text-sm text-gray-400">Joueurs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">4.8/5</div>
                  <div className="text-sm text-gray-400">Rating</div>
                </div>
              </div>
              <button className="w-full gaming-button flex items-center justify-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
                <span>Jouer</span>
              </button>
            </div>
          </div>

          {/* Valorant Card */}
          <div className="glass-card group hover:scale-105 transition-all duration-300">
            <div className="relative h-48 bg-gradient-to-br from-red-600 to-red-800 rounded-xl mb-6 overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">En Ligne</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Valorant</h3>
              <p className="text-gray-400 mb-4">FPS tactique avec agents</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">850K</div>
                  <div className="text-sm text-gray-400">Joueurs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">4.7/5</div>
                  <div className="text-sm text-gray-400">Rating</div>
                </div>
              </div>
              <button className="w-full gaming-button flex items-center justify-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
                <span>Jouer</span>
              </button>
            </div>
          </div>

          {/* League of Legends Card */}
          <div className="glass-card group hover:scale-105 transition-all duration-300">
            <div className="relative h-48 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-xl mb-6 overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 12h8"/>
                  <path d="M12 8v8"/>
                </svg>
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">En Ligne</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">League of Legends</h3>
              <p className="text-gray-400 mb-4">MOBA stratégique</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">2.1M</div>
                  <div className="text-sm text-gray-400">Joueurs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">4.6/5</div>
                  <div className="text-sm text-gray-400">Rating</div>
                </div>
              </div>
              <button className="w-full gaming-button flex items-center justify-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
                <span>Jouer</span>
              </button>
            </div>
          </div>

          {/* Dota 2 Card */}
          <div className="glass-card group hover:scale-105 transition-all duration-300">
            <div className="relative h-48 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl mb-6 overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                  <path d="M4 22h16"/>
                  <path d="M10 14.66V17c0 .55.47.98.97 1.21l1.03.4c.5.23 1.03.23 1.53 0l1.03-.4c.5-.23.97-.66.97-1.21v-2.34"/>
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                </svg>
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">En Ligne</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Dota 2</h3>
              <p className="text-gray-400 mb-4">MOBA complexe</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">680K</div>
                  <div className="text-sm text-gray-400">Joueurs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">4.5/5</div>
                  <div className="text-sm text-gray-400">Rating</div>
                </div>
              </div>
              <button className="w-full gaming-button flex items-center justify-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
                <span>Jouer</span>
              </button>
            </div>
          </div>

          {/* Apex Legends Card */}
          <div className="glass-card group hover:scale-105 transition-all duration-300">
            <div className="relative h-48 bg-gradient-to-br from-orange-600 to-orange-800 rounded-xl mb-6 overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">En Ligne</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Apex Legends</h3>
              <p className="text-gray-400 mb-4">Battle Royale</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">920K</div>
                  <div className="text-sm text-gray-400">Joueurs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">4.4/5</div>
                  <div className="text-sm text-gray-400">Rating</div>
                </div>
              </div>
              <button className="w-full gaming-button flex items-center justify-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
                <span>Jouer</span>
              </button>
            </div>
          </div>

          {/* Rocket League Card */}
          <div className="glass-card group hover:scale-105 transition-all duration-300">
            <div className="relative h-48 bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-xl mb-6 overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">En Ligne</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Rocket League</h3>
              <p className="text-gray-400 mb-4">Football avec voitures</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">450K</div>
                  <div className="text-sm text-gray-400">Joueurs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">4.3/5</div>
                  <div className="text-sm text-gray-400">Rating</div>
                </div>
              </div>
              <button className="w-full gaming-button flex items-center justify-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
                <span>Jouer</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section Footer */}
        <div className="glass-card p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">6</div>
              <div className="text-gray-400">Jeux Disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">6.2M</div>
              <div className="text-gray-400">Joueurs Actifs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">4.6/5</div>
              <div className="text-gray-400">Note Moyenne</div>
            </div>
          </div>
          <div className="text-center">
            <button className="gaming-button flex items-center gap-3 mx-auto">
              <span>Voir Tous les Jeux</span>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GamesSection