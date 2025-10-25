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
   
    gradient: "Comment ça marche"
  },
  description: "Découvrez comment réserver un joueur professionnel en 4 étapes simples. De la sélection de votre jeu préféré à l'analyse de votre performance, notre plateforme vous connecte avec les meilleurs pros de l'e-sport pour une expérience gaming exceptionnelle."
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
    title: "1. Choisis ton Jeu",
    description: "Sélectionnez parmi notre catalogue de jeux populaires : CS2, Valorant, League of Legends, Fortnite, Apex Legends, FIFA, Call of Duty. Chaque jeu dispose de ses propres spécialistes certifiés.",
    icon: "gamepad",
    color: "neon-blue"
  },
  {
    id: "select-pro",
    number: "🏆", 
    title: "2. Sélectionne ton Pro",
    description: "Parcourez notre base de données de joueurs professionnels vérifiés. Consultez leurs profils, statistiques, spécialités et disponibilités. Réservez votre session (15min, 30min, 1h ou plus).",
    icon: "trophy",
    color: "neon-purple"
  },
  {
    id: "coaching-session",
    number: "🧠",
    title: "3. Session de Coaching", 
    description: "Jouez avec votre coach pro en temps réel. Recevez des conseils personnalisés, des stratégies avancées et un feedback détaillé pour améliorer vos performances et votre gameplay.",
    icon: "brain",
    color: "neon-orange"
  },
  {
    id: "replay-video",
    number: "🎥",
    title: "4. Analyse Complète",
    description: "Recevez automatiquement l'enregistrement complet de votre session. Analysez vos mouvements, décisions et progrès avec les commentaires détaillés de votre coach pro.",
    icon: "video",
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
  brain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-4.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-4.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
    </svg>
  ),
  video: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 8l-6 4 6 4V8z"/>
      <rect x="2" y="6" width="14" height="12" rx="2"/>
    </svg>
  )
};
