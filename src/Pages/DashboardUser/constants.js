// Configuration des jeux disponibles
export const GAMES = {
  CS2: { name: 'CS2', emoji: '🔫', fullName: 'Counter-Strike 2' },
  Valorant: { name: 'Valorant', emoji: '🎯', fullName: 'Valorant' },
  LoL: { name: 'LoL', emoji: '⚔️', fullName: 'League of Legends' },
  Fortnite: { name: 'Fortnite', emoji: '🏗️', fullName: 'Fortnite' },
  Apex: { name: 'Apex', emoji: '🚀', fullName: 'Apex Legends' },
  FIFA: { name: 'FIFA', emoji: '⚽', fullName: 'FIFA' },
  COD: { name: 'COD', emoji: '💥', fullName: 'Call of Duty' }
};

// Configuration des types d'utilisateurs
export const USER_TYPES = {
  PLAYER: 'player',
  PRO: 'pro',
  STREAMER: 'streamer'
};

// Configuration des sections de navigation
export const NAV_SECTIONS = {
  MAIN: {
    title: '',
    items: [
      { id: 'home', label: 'Home', icon: 'home' },
      { id: 'games', label: 'Games', icon: 'games' },
      { id: 'tournaments', label: 'Tournaments', icon: 'tournaments' },
      { id: 'posts', label: 'Posts', icon: 'posts' },
      { id: 'leadership', label: 'Leadership', icon: 'leadership' },
    ]
  }
};

// Configuration des paramètres par défaut
export const DEFAULT_SETTINGS = {
  notifications: true,
  chatSounds: true,
  matchAlerts: true,
  coachingReminders: true,
  streamAlerts: false,
  paymentAlerts: true,
  rankingUpdates: true,
  replayNotifications: true
};

// Configuration des statistiques utilisateur
export const USER_STATS = {
  matches: 127,
  winRate: 89,
  rating: 4.8,
  level: 42,
  rank: 'Or III',
  region: 'Amérique du Nord'
};

// Configuration des icônes SVG
export const SVG_ICONS = {
  home: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  ),
  games: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4V9a2 2 0 012-2h4a2 2 0 012 2v1M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z" />
  ),
  tournaments: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  ),
  posts: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  ),
  leadership: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  ),
  chat: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  ),
  support: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  ),
  play: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4V9a2 2 0 012-2h4a2 2 0 012 2v1M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z" />
  )
};
