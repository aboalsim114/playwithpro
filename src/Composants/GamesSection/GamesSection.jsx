import React from 'react'

// Liquid Glass Gaming Styles
const liquidGamingStyles = `
  /* Gaming Border Container Styles */
  .gaming-border-container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 2rem;
  }

  .gaming-border-frame {
    position: relative;
    background: rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 2rem;
    backdrop-filter: blur(20px) saturate(180%);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      inset 0 -1px 0 rgba(255, 255, 255, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .gaming-border-frame::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.1), 
      rgba(255, 255, 255, 0.05),
      rgba(6, 182, 212, 0.1),
      rgba(236, 72, 153, 0.1)
    );
    border-radius: 20px;
    padding: 1px;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: xor;
    -webkit-mask-composite: xor;
    animation: liquid-glass-flow 6s ease-in-out infinite;
  }

  .gaming-border-frame::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      transparent 30%, 
      rgba(255, 255, 255, 0.1) 50%, 
      transparent 70%
    );
    border-radius: 20px;
    animation: liquid-glass-shimmer 4s ease-in-out infinite;
    pointer-events: none;
  }

  /* Gaming Corner Decorations - Liquid Glass Style */
  .gaming-corner {
    position: absolute;
    width: 30px;
    height: 30px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    z-index: 10;
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.05);
  }

  .gaming-corner-tl {
    top: -1px;
    left: -1px;
    border-right: none;
    border-bottom: none;
    border-color: rgba(6, 182, 212, 0.3);
    border-top-left-radius: 12px;
    box-shadow: 
      0 0 10px rgba(6, 182, 212, 0.2),
      inset 0 0 10px rgba(6, 182, 212, 0.1);
  }

  .gaming-corner-tr {
    top: -1px;
    right: -1px;
    border-left: none;
    border-bottom: none;
    border-color: rgba(236, 72, 153, 0.3);
    border-top-right-radius: 12px;
    box-shadow: 
      0 0 10px rgba(236, 72, 153, 0.2),
      inset 0 0 10px rgba(236, 72, 153, 0.1);
  }

  .gaming-corner-bl {
    bottom: -1px;
    left: -1px;
    border-right: none;
    border-top: none;
    border-color: rgba(16, 185, 129, 0.3);
    border-bottom-left-radius: 12px;
    box-shadow: 
      0 0 10px rgba(16, 185, 129, 0.2),
      inset 0 0 10px rgba(16, 185, 129, 0.1);
  }

  .gaming-corner-br {
    bottom: -1px;
    right: -1px;
    border-left: none;
    border-top: none;
    border-color: rgba(245, 158, 11, 0.3);
    border-bottom-right-radius: 12px;
    box-shadow: 
      0 0 10px rgba(245, 158, 11, 0.2),
      inset 0 0 10px rgba(245, 158, 11, 0.1);
  }

  /* Gaming Side Borders with Liquid Glass Animation */
  .gaming-side-border {
    position: absolute;
    z-index: 5;
  }

  .gaming-side-border-top {
    top: 0;
    left: 40px;
    right: 40px;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(6, 182, 212, 0.3), 
      rgba(236, 72, 153, 0.3), 
      rgba(16, 185, 129, 0.3), 
      rgba(245, 158, 11, 0.3), 
      transparent
    );
    animation: liquid-border-flow 8s linear infinite;
  }

  .gaming-side-border-bottom {
    bottom: 0;
    left: 40px;
    right: 40px;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(245, 158, 11, 0.3), 
      rgba(16, 185, 129, 0.3), 
      rgba(236, 72, 153, 0.3), 
      rgba(6, 182, 212, 0.3), 
      transparent
    );
    animation: liquid-border-flow 8s linear infinite reverse;
  }

  .gaming-side-border-left {
    left: 0;
    top: 40px;
    bottom: 40px;
    width: 1px;
    background: linear-gradient(180deg, 
      transparent, 
      rgba(6, 182, 212, 0.3), 
      rgba(236, 72, 153, 0.3), 
      rgba(16, 185, 129, 0.3), 
      rgba(245, 158, 11, 0.3), 
      transparent
    );
    animation: liquid-border-flow-vertical 8s linear infinite;
  }

  .gaming-side-border-right {
    right: 0;
    top: 40px;
    bottom: 40px;
    width: 1px;
    background: linear-gradient(180deg, 
      transparent, 
      rgba(245, 158, 11, 0.3), 
      rgba(16, 185, 129, 0.3), 
      rgba(236, 72, 153, 0.3), 
      rgba(6, 182, 212, 0.3), 
      transparent
    );
    animation: liquid-border-flow-vertical 8s linear infinite reverse;
  }

  /* Gaming Content Container */
  .gaming-content-container {
    position: relative;
    z-index: 10;
    width: 100%;
  }

  /* Liquid Glass Animations */
  @keyframes liquid-glass-flow {
    0%, 100% { 
      background-position: 0% 50%; }
    50% { 
      background-position: 100% 50%; }
  }

  @keyframes liquid-glass-shimmer {
    0%, 100% { 
      transform: translateX(-100%); }
    50% { 
      transform: translateX(100%); }
  }

  @keyframes liquid-border-flow {
    0% { 
      background-position: 0% 50%; }
    100% { 
      background-position: 100% 50%; }
  }

  @keyframes liquid-border-flow-vertical {
    0% { 
      background-position: 50% 0%; }
    100% { 
      background-position: 50% 100%; }
  }

  .liquid-gaming-section {
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
    position: relative;
    overflow: hidden;
  }
  
  .liquid-gaming-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
    animation: liquidFlow 20s ease-in-out infinite;
  }
  
  @keyframes liquidFlow {
    0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
    25% { transform: translateX(20px) translateY(-10px) rotate(1deg); }
    50% { transform: translateX(-10px) translateY(20px) rotate(-1deg); }
    75% { transform: translateX(15px) translateY(10px) rotate(0.5deg); }
  }
  
  .liquid-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .liquid-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  .liquid-card:hover::before {
    transform: translateX(100%);
  }
  
  .liquid-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  
  .liquid-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(40px);
    animation: float 6s ease-in-out infinite;
  }
  
  .liquid-orb-1 {
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(120, 119, 198, 0.4) 0%, transparent 70%);
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }
  
  .liquid-orb-2 {
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, rgba(255, 119, 198, 0.3) 0%, transparent 70%);
    top: 60%;
    right: 15%;
    animation-delay: 2s;
  }
  
  .liquid-orb-3 {
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, rgba(120, 219, 255, 0.4) 0%, transparent 70%);
    bottom: 20%;
    left: 20%;
    animation-delay: 4s;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    25% { transform: translateY(-20px) translateX(10px); }
    50% { transform: translateY(0px) translateX(-10px); }
    75% { transform: translateY(20px) translateX(5px); }
  }
  
  .liquid-text {
    background: linear-gradient(45deg, #ffffff, #a0a0a0, #ffffff);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: liquidText 3s ease-in-out infinite;
  }
  
  @keyframes liquidText {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  .liquid-button {
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.2));
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .liquid-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  .liquid-button:hover::before {
    left: 100%;
  }
  
  .liquid-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`

function GamesSection() {
  return (
    <>
      <style>{liquidGamingStyles}</style>
      <section className="liquid-gaming-section min-h-screen relative" id="games">
        {/* Liquid Glass Orbs */}
        <div className="liquid-orb liquid-orb-1"></div>
        <div className="liquid-orb liquid-orb-2"></div>
        <div className="liquid-orb liquid-orb-3"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8 pt-24">
          {/* Gaming Border Container */}
          <div className="gaming-border-container">
            <div className="gaming-border-frame">
              {/* Corner Decorations */}
              <div className="gaming-corner gaming-corner-tl"></div>
              <div className="gaming-corner gaming-corner-tr"></div>
              <div className="gaming-corner gaming-corner-bl"></div>
              <div className="gaming-corner gaming-corner-br"></div>
              
              {/* Side Borders with Animated Elements */}
              <div className="gaming-side-border gaming-side-border-top"></div>
              <div className="gaming-side-border gaming-side-border-bottom"></div>
              <div className="gaming-side-border gaming-side-border-left"></div>
              <div className="gaming-side-border gaming-side-border-right"></div>
              
              {/* Content Container */}
              <div className="gaming-content-container">
                <div className="container mx-auto px-6 py-20">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-block mb-8">
              <span className="liquid-text text-sm font-semibold uppercase tracking-wider px-4 py-2 rounded-full border border-white/20">
                Gaming Universe
              </span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black mb-8">
              <span className="liquid-text block">Liquid</span>
              <span className="liquid-text block">Gaming</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Plongez dans l'univers du gaming liquide où chaque mouvement est fluide, 
              chaque action est précise, et chaque victoire est épique.
            </p>
          </div>

          {/* Games Grid - Liquid Glass Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
            {/* CS2 Card - Liquid Glass */}
            <div className="liquid-card group">
              <div className="p-8">
                {/* Game Icon */}
                <div className="w-16 h-16 mb-6 mx-auto bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center border border-blue-400/30">
                  <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>

                {/* Game Info */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                    Counter-Strike 2
                  </h3>
                  <p className="text-white/60 text-sm mb-4">Tactical FPS compétitif</p>
                  
                  {/* Status */}
                  <div className="inline-flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-400/30 mb-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm">En ligne</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-xl font-bold text-white">1.2M</div>
                    <div className="text-xs text-white/60">Joueurs</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-xl font-bold text-white">4.8/5</div>
                    <div className="text-xs text-white/60">Rating</div>
                  </div>
                </div>

                {/* Liquid Button */}
                <button className="liquid-button w-full text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5,3 19,12 5,21"/>
                  </svg>
                  <span>Jouer Maintenant</span>
                </button>
              </div>
            </div>

            {/* Valorant Card - Liquid Glass */}
            <div className="liquid-card group">
              <div className="p-8">
                {/* Game Icon */}
                <div className="w-16 h-16 mb-6 mx-auto bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center border border-red-400/30">
                  <svg className="w-8 h-8 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>

                {/* Game Info */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-300 transition-colors duration-300">
                    Valorant
                  </h3>
                  <p className="text-white/60 text-sm mb-4">FPS tactique avec agents</p>
                  
                  {/* Status */}
                  <div className="inline-flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-400/30 mb-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm">En ligne</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-xl font-bold text-white">850K</div>
                    <div className="text-xs text-white/60">Joueurs</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-xl font-bold text-white">4.7/5</div>
                    <div className="text-xs text-white/60">Rating</div>
                  </div>
                </div>

                {/* Liquid Button */}
                <button className="liquid-button w-full text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5,3 19,12 5,21"/>
                  </svg>
                  <span>Jouer Maintenant</span>
                </button>
              </div>
            </div>

            {/* League of Legends Card - Liquid Glass */}
            <div className="liquid-card group">
              <div className="p-8">
                {/* Game Icon */}
                <div className="w-16 h-16 mb-6 mx-auto bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center border border-yellow-400/30">
                  <svg className="w-8 h-8 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 12h8"/>
                    <path d="M12 8v8"/>
                  </svg>
                </div>

                {/* Game Info */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                    League of Legends
                  </h3>
                  <p className="text-white/60 text-sm mb-4">MOBA stratégique</p>
                  
                  {/* Status */}
                  <div className="inline-flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-400/30 mb-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm">En ligne</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-xl font-bold text-white">2.1M</div>
                    <div className="text-xs text-white/60">Joueurs</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-xl font-bold text-white">4.6/5</div>
                    <div className="text-xs text-white/60">Rating</div>
                  </div>
                </div>

                {/* Liquid Button */}
                <button className="liquid-button w-full text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5,3 19,12 5,21"/>
                  </svg>
                  <span>Jouer Maintenant</span>
                </button>
              </div>
            </div>

            {/* Dota 2 Card - Liquid Glass */}
            <div className="liquid-card group">
              <div className="p-8">
                {/* Game Icon */}
                <div className="w-16 h-16 mb-6 mx-auto bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-2xl flex items-center justify-center border border-purple-400/30">
                  <svg className="w-8 h-8 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                    <path d="M4 22h16"/>
                    <path d="M10 14.66V17c0 .55.47.98.97 1.21l1.03.4c.5.23 1.03.23 1.53 0l1.03-.4c.5-.23.97-.66.97-1.21v-2.34"/>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                  </svg>
                </div>

                {/* Game Info */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                    Dota 2
                  </h3>
                  <p className="text-white/60 text-sm mb-4">MOBA complexe</p>
                  
                  {/* Status */}
                  <div className="inline-flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-400/30 mb-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm">En ligne</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-xl font-bold text-white">680K</div>
                    <div className="text-xs text-white/60">Joueurs</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-xl font-bold text-white">4.5/5</div>
                    <div className="text-xs text-white/60">Rating</div>
                  </div>
                </div>

                {/* Liquid Button */}
                <button className="liquid-button w-full text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5,3 19,12 5,21"/>
                  </svg>
                  <span>Jouer Maintenant</span>
                </button>
              </div>
            </div>

            {/* Apex Legends Card - Liquid Glass */}
            <div className="liquid-card group">
              <div className="p-8">
                {/* Game Icon */}
                <div className="w-16 h-16 mb-6 mx-auto bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl flex items-center justify-center border border-orange-400/30">
                  <svg className="w-8 h-8 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                    <line x1="12" y1="22.08" x2="12" y2="12"/>
                  </svg>
                </div>

                {/* Game Info */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
                    Apex Legends
                  </h3>
                  <p className="text-white/60 text-sm mb-4">Battle Royale</p>
                  
                  {/* Status */}
                  <div className="inline-flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-400/30 mb-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm">En ligne</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-xl font-bold text-white">920K</div>
                    <div className="text-xs text-white/60">Joueurs</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-xl font-bold text-white">4.4/5</div>
                    <div className="text-xs text-white/60">Rating</div>
                  </div>
                </div>

                {/* Liquid Button */}
                <button className="liquid-button w-full text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5,3 19,12 5,21"/>
                  </svg>
                  <span>Jouer Maintenant</span>
                </button>
              </div>
            </div>

            {/* Rocket League Card - Liquid Glass */}
            <div className="liquid-card group">
              <div className="p-8">
                {/* Game Icon */}
                <div className="w-16 h-16 mb-6 mx-auto bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center border border-cyan-400/30">
                  <svg className="w-8 h-8 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>

                {/* Game Info */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                    Rocket League
                  </h3>
                  <p className="text-white/60 text-sm mb-4">Football avec voitures</p>
                  
                  {/* Status */}
                  <div className="inline-flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-400/30 mb-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm">En ligne</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-xl font-bold text-white">450K</div>
                    <div className="text-xs text-white/60">Joueurs</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-xl font-bold text-white">4.3/5</div>
                    <div className="text-xs text-white/60">Rating</div>
                  </div>
                </div>

                {/* Liquid Button */}
                <button className="liquid-button w-full text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5,3 19,12 5,21"/>
                  </svg>
                  <span>Jouer Maintenant</span>
                </button>
              </div>
            </div>
          </div>

          {/* Liquid Glass Footer */}
          <div className="liquid-card mt-20">
            <div className="p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                <div className="text-center group">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-2xl flex items-center justify-center border border-cyan-400/30">
                    <svg className="w-10 h-10 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div className="text-5xl font-black text-white mb-3 group-hover:scale-110 transition-transform duration-300">6</div>
                  <div className="text-white/60 font-medium">Jeux Liquides</div>
                </div>
                
                <div className="text-center group">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center border border-purple-400/30">
                    <svg className="w-10 h-10 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <div className="text-5xl font-black text-white mb-3 group-hover:scale-110 transition-transform duration-300">6.2M</div>
                  <div className="text-white/60 font-medium">Joueurs Actifs</div>
                </div>
                
                <div className="text-center group">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-500/20 to-pink-600/20 rounded-2xl flex items-center justify-center border border-pink-400/30">
                    <svg className="w-10 h-10 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div className="text-5xl font-black text-white mb-3 group-hover:scale-110 transition-transform duration-300">4.6/5</div>
                  <div className="text-white/60 font-medium">Note Moyenne</div>
                </div>
              </div>
              
              <div className="text-center">
                <button className="liquid-button text-white font-bold py-4 px-12 rounded-2xl flex items-center gap-4 mx-auto">
                  <span>Explorer l'Univers Gaming</span>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
      </section>
    </>
  )
}

export default GamesSection