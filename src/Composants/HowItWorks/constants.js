// How It Works section constants
export const HOW_IT_WORKS_CONTENT = {
  title: {
    text: "Comment ça",
    gradient: "Marche ?"
  },
  description: "Découvrez comment rejoindre l'action en seulement 4 étapes simples. De la sélection de votre jeu préféré à l'immersion dans des serveurs privés optimisés."
};

export const STEPS = [
  {
    id: "choose-game",
    number: "1️⃣",
    title: "Choisis ton jeu",
    description: "Sélectionne parmi notre large catalogue de jeux compétitifs",
    icon: "gamepad",
    color: "blue"
  },
  {
    id: "select-pro",
    number: "2️⃣", 
    title: "Sélectionne ton pro",
    description: "Choisis un coach professionnel adapté à ton niveau",
    icon: "user",
    color: "purple"
  },
  {
    id: "reserve-session",
    number: "3️⃣",
    title: "Réserve ta session", 
    description: "Planifie ton entraînement selon tes disponibilités",
    icon: "calendar",
    color: "orange"
  },
  {
    id: "play-private",
    number: "4️⃣",
    title: "Joue sur un serveur privé",
    description: "Accède à des serveurs dédiés pour une expérience optimale",
    icon: "server",
    color: "green"
  }
];

// SVG Icons for steps
export const STEP_ICONS = {
  gamepad: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="6" y1="11" x2="10" y2="11"/>
      <line x1="8" y1="9" x2="8" y2="13"/>
      <line x1="15" y1="12" x2="15.01" y2="12"/>
      <line x1="18" y1="10" x2="18.01" y2="10"/>
      <path d="M17.32 5H6.68a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h10.64a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z"/>
      <line x1="6" y1="8" x2="6" y2="16"/>
      <line x1="10" y1="8" x2="10" y2="16"/>
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  server: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="4" rx="1"/>
      <rect x="2" y="7" width="20" height="4" rx="1"/>
      <rect x="2" y="11" width="20" height="4" rx="1"/>
      <line x1="6" y1="5" x2="6.01" y2="5"/>
      <line x1="6" y1="9" x2="6.01" y2="9"/>
      <line x1="6" y1="13" x2="6.01" y2="13"/>
    </svg>
  )
};
