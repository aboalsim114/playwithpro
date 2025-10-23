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
  GAMING: {
    title: 'Gaming',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
      { id: 'matches', label: 'Matches', icon: 'matches' },
      { id: 'coaching', label: 'Coaching', icon: 'coaching' },
      { id: 'rankings', label: 'Rankings', icon: 'rankings' }
    ]
  },
  FEATURES: {
    title: 'Features',
    items: [
      { id: 'chat', label: 'Chat', icon: 'chat' },
      { id: 'replays', label: 'Replays', icon: 'replays' },
      { id: 'payments', label: 'Payments', icon: 'payments' },
      { id: 'profile', label: 'Profile', icon: 'profile' }
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
  dashboard: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
  ),
  matches: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  ),
  coaching: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  ),
  rankings: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  ),
  chat: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  ),
  replays: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  ),
  payments: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  ),
  profile: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  )
};
