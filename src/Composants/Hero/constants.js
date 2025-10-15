// Hero component constants
export const HERO_CONTENT = {
  title: {
    text: "Entrez dans le",
    gradient: "Champ de Bataille"
  },
  description: "Découvrez le gaming compétitif de nouvelle génération. Rejoignez des millions de joueurs, grimpez dans les classements et remportez la victoire.",
  buttons: {
    play: "Jouer Maintenant - Gratuit",
    explore: "Explorer les Modes"
  }
};

export const STATUS_INDICATORS = [
  {
    id: "server-status",
    type: "dot",
    color: "green",
    text: "Serveur En Ligne"
  },
  {
    id: "trending",
    type: "icon",
    icon: "🔥",
    text: "Tendance #1"
  },
  {
    id: "event-timer",
    type: "icon", 
    icon: "⏰",
    text: "Événement se termine dans 2h 45m"
  }
];

export const FEATURE_CARDS = [
  {
    id: "combat-5v5",
    icon: "combat",
    title: "Combats 5v5",
    description: "Combat en équipe",
    color: "orange"
  },
  {
    id: "ranked-mode",
    icon: "star",
    title: "Mode Classé", 
    description: "Grimpez au sommet",
    color: "yellow"
  },
  {
    id: "heroes",
    icon: "shield",
    title: "50+ Héros",
    description: "Capacités uniques", 
    color: "blue"
  },
  {
    id: "esports",
    icon: "trophy",
    title: "Prêt pour l'Esport",
    description: "Tournois professionnels",
    color: "purple"
  }
];

export const STATISTICS = [
  {
    id: "active-players",
    label: "Joueurs Actifs",
    value: "2.8M",
    change: "+12%",
    changeType: "positive"
  },
  {
    id: "daily-matches", 
    label: "Matchs Quotidiens",
    value: "450K",
    change: "+8%",
    changeType: "positive"
  },
  {
    id: "wait-time",
    label: "Temps d'Attente Moyen", 
    value: "45s",
    change: "-15%",
    changeType: "negative"
  }
];

// SVG Icons as constants
export const SVG_ICONS = {
  play: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="5,3 19,12 5,21"/>
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  ),
  combat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55.47.98.97 1.21l1.03.4c.5.23 1.03.23 1.53 0l1.03-.4c.5-.23.97-.66.97-1.21v-2.34"/>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55.47.98.97 1.21l1.03.4c.5.23 1.03.23 1.53 0l1.03-.4c.5-.23.97-.66.97-1.21v-2.34"/>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
  )
};
