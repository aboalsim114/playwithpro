import React from 'react'

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)]"></div>
      </div>
      
      <div className="relative z-10 text-center">
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Chargement du profil</h2>
          <p className="text-gray-300 text-lg">Récupération des données utilisateur...</p>
        </div>
        
        <div className="w-64 mx-auto">
          <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
          </div>
          <span className="text-gray-300 text-sm">Chargement en cours...</span>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner
