/**
 * @fileoverview Constants for the How It Works section
 * Contains all static content, steps configuration, and icon definitions
 */

/**
 * Main content configuration for the How It Works section
 * @type {Object}
 * @property {Object} title - Title configuration with text and gradient parts
 * @property {string} title.text - Main title text
 * @property {string} title.gradient - Gradient text part
 * @property {string} description - Section description
 */
export const HOW_IT_WORKS_CONTENT = {
  title: {
    text: "Devenir",
    gradient: "Pro Gamer"
  },
  description: "Rejoins l'élite du gaming compétitif en 4 étapes stratégiques. De la sélection de ton jeu à la domination des serveurs privés, deviens le champion que tu es destiné à être."
};

/**
 * Step configuration for the timeline
 * @type {Array<Object>}
 * @property {string} id - Unique identifier for the step
 * @property {string} number - Emoji number for the step
 * @property {string} title - Step title
 * @property {string} description - Step description
 * @property {string} icon - Icon key for STEP_ICONS
 * @property {string} color - Color theme for the step
 */
export const STEPS = [
  {
    id: "choose-game",
    number: "🎮",
    title: "Sélectionne ton Arsenal",
    description: "Choisis parmi les jeux les plus compétitifs : Valorant, CS2, League of Legends, Fortnite et bien plus",
    icon: "gamepad",
    color: "neon-blue"
  },
  {
    id: "select-pro",
    number: "🏆", 
    title: "Recrute ton Coach Pro",
    description: "Sélectionne un champion professionnel qui te guidera vers la victoire",
    icon: "trophy",
    color: "neon-purple"
  },
  {
    id: "reserve-session",
    number: "⚡",
    title: "Planifie ton Entraînement", 
    description: "Organise tes sessions d'entraînement intensif avec ton coach pro",
    icon: "lightning",
    color: "neon-orange"
  },
  {
    id: "play-private",
    number: "🔥",
    title: "Domine les Serveurs Privés",
    description: "Accède à des serveurs haute performance pour une expérience gaming ultime",
    icon: "server",
    color: "neon-green"
  }
];

/**
 * SVG Icons for each step in the timeline
 * @type {Object}
 * @property {JSX.Element} gamepad - Gamepad icon for game selection step
 * @property {JSX.Element} user - User icon for pro selection step
 * @property {JSX.Element} calendar - Calendar icon for session reservation step
 * @property {JSX.Element} server - Server icon for private server step
 */
export const STEP_ICONS = {
  gamepad: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="6" width="20" height="12" rx="2"/>
      <circle cx="8" cy="12" r="2"/>
      <circle cx="16" cy="12" r="2"/>
      <path d="M12 2v4"/>
      <path d="M12 18v4"/>
      <path d="M6 8h2"/>
      <path d="M16 8h2"/>
      <path d="M6 16h2"/>
      <path d="M16 16h2"/>
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55.47.98.97 1.21l1.03.4c.3.12.6.12.9 0l1.03-.4c.5-.23.97-.66.97-1.21v-2.34"/>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
  ),
  lightning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
    </svg>
  ),
  server: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="4" rx="1"/>
      <rect x="2" y="7" width="20" height="4" rx="1"/>
      <rect x="2" y="11" width="20" height="4" rx="1"/>
      <rect x="2" y="15" width="20" height="4" rx="1"/>
      <circle cx="6" cy="5" r="1"/>
      <circle cx="6" cy="9" r="1"/>
      <circle cx="6" cy="13" r="1"/>
      <circle cx="6" cy="17" r="1"/>
      <path d="M10 5h8"/>
      <path d="M10 9h8"/>
      <path d="M10 13h8"/>
      <path d="M10 17h8"/>
    </svg>
  )
};
