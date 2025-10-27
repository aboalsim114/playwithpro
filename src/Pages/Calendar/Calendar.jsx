import React, { useState } from 'react';
import { GAMES } from '../DashboardUser/constants';

// Configuration de la localisation française
const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

const WEEKDAYS_SHORT = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

// Fonctions utilitaires pour les dates
const formatDate = (date) => {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    weekday: date.getDay()
  };
};

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

const isSameDay = (date1, date2) => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

const isToday = (date) => {
  const today = new Date();
  return isSameDay(date, today);
};

const addMonths = (date, months) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

// Données d'exemple pour les RDV payés
const initialEvents = [
  {
    id: 1,
    title: 'Session CS2 avec ProPlayer',
    start: new Date(2024, 11, 15, 14, 0),
    end: new Date(2024, 11, 15, 15, 0),
    resource: {
      game: 'CS2',
      pro: 'ProPlayer',
      type: 'coaching',
      price: 50,
      playerName: 'AlexGamer',
      status: 'paid',
      paymentDate: new Date(2024, 11, 10),
      duration: 60
    }
  },
  {
    id: 2,
    title: 'Match Valorant - Tournoi',
    start: new Date(2024, 11, 18, 20, 0),
    end: new Date(2024, 11, 18, 22, 0),
    resource: {
      game: 'Valorant',
      pro: 'ValorantPro',
      type: 'match',
      price: 75,
      playerName: 'SarahPro',
      status: 'paid',
      paymentDate: new Date(2024, 11, 12),
      duration: 120
    }
  },
  {
    id: 3,
    title: 'Coaching LoL - Stratégie',
    start: new Date(2024, 11, 20, 16, 0),
    end: new Date(2024, 11, 20, 17, 30),
    resource: {
      game: 'LoL',
      pro: 'LoLMaster',
      type: 'coaching',
      price: 60,
      playerName: 'MikeRising',
      status: 'paid',
      paymentDate: new Date(2024, 11, 14),
      duration: 90
    }
  },
  {
    id: 4,
    title: 'Session Fortnite - Build',
    start: new Date(2024, 11, 22, 19, 0),
    end: new Date(2024, 11, 22, 20, 0),
    resource: {
      game: 'Fortnite',
      pro: 'FortniteBuilder',
      type: 'coaching',
      price: 40,
      playerName: 'EmmaBuilder',
      status: 'paid',
      paymentDate: new Date(2024, 11, 16),
      duration: 60
    }
  },
  {
    id: 5,
    title: 'Session Apex Legends',
    start: new Date(2024, 11, 25, 15, 0),
    end: new Date(2024, 11, 25, 16, 30),
    resource: {
      game: 'Apex',
      pro: 'ApexChampion',
      type: 'coaching',
      price: 55,
      playerName: 'TomLegend',
      status: 'paid',
      paymentDate: new Date(2024, 11, 18),
      duration: 90
    }
  }
];

const CalendarComponent = () => {
  const [events, setEvents] = useState(initialEvents);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterGame, setFilterGame] = useState('all');

  // Filtrer les événements par jeu et ne garder que les RDV payés
  const filteredEvents = events.filter(event => {
    const gameMatch = filterGame === 'all' || event.resource?.game === filterGame;
    const isPaid = event.resource?.status === 'paid';
    return gameMatch && isPaid;
  });

  // Obtenir les événements pour une date donnée
  const getEventsForDate = (date) => {
    return filteredEvents.filter(event => isSameDay(event.start, date));
  };

  // Générer les jours du mois
  const generateCalendarDays = () => {
    const { year, month } = formatDate(currentDate);
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    // Jours du mois précédent
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
    
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const date = new Date(prevYear, prevMonth, day);
      days.push({ date, isCurrentMonth: false, isToday: isToday(date) });
    }

    // Jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({ date, isCurrentMonth: true, isToday: isToday(date) });
    }

    // Jours du mois suivant pour compléter la grille
    const remainingDays = 42 - days.length; // 6 semaines * 7 jours
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(nextYear, nextMonth, day);
      days.push({ date, isCurrentMonth: false, isToday: isToday(date) });
    }

    return days;
  };

  // Navigation
  const goToPreviousMonth = () => {
    setCurrentDate(addMonths(currentDate, -1));
  };

  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Gestionnaire pour la sélection d'un événement
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  // Fermer la modal d'événement
  const closeEventModal = () => {
    setSelectedEvent(null);
  };

  // Supprimer un événement
  const deleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    setSelectedEvent(null);
  };

  // Styles pour les jeux
  const gameColors = {
    'CS2': 'from-red-500/80 to-red-600/80',
    'Valorant': 'from-purple-500/80 to-purple-600/80',
    'LoL': 'from-blue-500/80 to-blue-600/80',
    'Fortnite': 'from-green-500/80 to-green-600/80',
    'Apex': 'from-orange-500/80 to-orange-600/80',
    'FIFA': 'from-yellow-500/80 to-yellow-600/80',
    'COD': 'from-gray-500/80 to-gray-600/80'
  };

  const gameBorders = {
    'CS2': 'border-red-400/50',
    'Valorant': 'border-purple-400/50',
    'LoL': 'border-blue-400/50',
    'Fortnite': 'border-green-400/50',
    'Apex': 'border-orange-400/50',
    'FIFA': 'border-yellow-400/50',
    'COD': 'border-gray-400/50'
  };

  const calendarDays = generateCalendarDays();
  const { year, month } = formatDate(currentDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-64 relative z-10">
        {/* Header Section avec Liquid Glass */}
        <div className="flex-shrink-0 backdrop-blur-xl bg-white/5 border-b border-white/10 p-4 sm:p-6 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                📅 RDV Payés
              </h1>
              <p className="text-gray-300/80 text-sm sm:text-base">
                Consultez vos rendez-vous payés avec les pros
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <select
                value={filterGame}
                onChange={(e) => setFilterGame(e.target.value)}
                className="px-3 sm:px-4 py-2 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 text-sm sm:text-base hover:bg-white/15"
              >
                <option value="all">Tous les jeux</option>
                {Object.entries(GAMES).map(([key, game]) => (
                  <option key={key} value={key} className="bg-gray-800">
                    {game.emoji} {game.fullName}
                  </option>
                ))}
              </select>
              
              <div className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 backdrop-blur-sm bg-green-500/20 border border-green-400/30 rounded-xl">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300 text-xs sm:text-sm font-medium">RDV Payés</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="flex-1">
          <div className="overflow-y-auto">
            <div className="p-4 sm:p-6">
              {/* Stats Cards avec Liquid Glass */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300/80 text-xs sm:text-sm font-medium">RDV Payés</p>
                      <p className="text-2xl sm:text-3xl font-bold text-white">{filteredEvents.length}</p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 backdrop-blur-sm bg-green-500/20 rounded-xl flex items-center justify-center border border-green-400/30">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300/80 text-xs sm:text-sm font-medium">Coaching</p>
                      <p className="text-2xl sm:text-3xl font-bold text-white">
                        {filteredEvents.filter(e => e.resource?.type === 'coaching').length}
                      </p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 backdrop-blur-sm bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-400/30">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300/80 text-xs sm:text-sm font-medium">Matchs</p>
                      <p className="text-2xl sm:text-3xl font-bold text-white">
                        {filteredEvents.filter(e => e.resource?.type === 'match').length}
                      </p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 backdrop-blur-sm bg-red-500/20 rounded-xl flex items-center justify-center border border-red-400/30">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300/80 text-xs sm:text-sm font-medium">Total dépensé</p>
                      <p className="text-2xl sm:text-3xl font-bold text-white">
                        {filteredEvents.reduce((sum, event) => sum + (event.resource?.price || 0), 0)}€
                      </p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 backdrop-blur-sm bg-yellow-500/20 rounded-xl flex items-center justify-center border border-yellow-400/30">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendar Container avec Liquid Glass */}
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10 shadow-2xl">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={goToPreviousMonth}
                      className="backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-2 transition-all duration-300 hover:scale-105"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      {MONTHS[month]} {year}
                    </h2>
                    
                    <button
                      onClick={goToNextMonth}
                      className="backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-2 transition-all duration-300 hover:scale-105"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  
                  <button
                    onClick={goToToday}
                    className="backdrop-blur-sm bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 rounded-xl px-4 py-2 text-purple-300 font-medium transition-all duration-300 hover:scale-105"
                  >
                    Aujourd'hui
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {WEEKDAYS_SHORT.map((day) => (
                    <div key={day} className="p-3 text-center text-gray-300/80 font-medium text-sm">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((dayData, index) => {
                    const dayEvents = getEventsForDate(dayData.date);
                    return (
                      <div
                        key={index}
                        className={`min-h-[100px] p-2 rounded-xl transition-all duration-300 hover:bg-white/5 ${
                          dayData.isCurrentMonth 
                            ? 'text-white' 
                            : 'text-gray-500/50'
                        } ${
                          dayData.isToday 
                            ? 'backdrop-blur-sm bg-purple-500/20 border border-purple-400/30' 
                            : 'hover:backdrop-blur-sm hover:bg-white/5'
                        }`}
                      >
                        <div className={`text-sm font-medium mb-1 ${
                          dayData.isToday ? 'text-purple-300' : ''
                        }`}>
                          {dayData.date.getDate()}
                        </div>
                        
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              onClick={() => handleSelectEvent(event)}
                              className={`bg-gradient-to-r ${gameColors[event.resource?.game] || 'from-gray-500/80 to-gray-600/80'} backdrop-blur-sm rounded-lg p-1 cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg border ${gameBorders[event.resource?.game] || 'border-gray-400/50'}`}
                            >
                              <div className="text-white text-xs font-medium truncate">
                                {event.title}
                              </div>
                              <div className="text-white/80 text-xs">
                                {event.start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          ))}
                          
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-400">
                              +{dayEvents.length - 2} autres
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Modal avec Liquid Glass */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 sm:p-6 max-w-lg w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-white/20">
            <div className="flex justify-between items-start sm:items-center mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 backdrop-blur-sm bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-green-400/30">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white truncate">Détails du RDV</h3>
                  <p className="text-green-300 text-xs sm:text-sm">Rendez-vous payé</p>
                </div>
              </div>
              <button
                onClick={closeEventModal}
                className="text-gray-400 hover:text-gray-200 transition-colors p-1 hover:bg-white/10 rounded-lg flex-shrink-0 ml-2"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* Session Info */}
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
                <h4 className="text-white font-semibold text-base sm:text-lg mb-2 truncate">{selectedEvent.title}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl">{GAMES[selectedEvent.resource?.game]?.emoji || '🎮'}</span>
                  <span className="text-gray-300 text-sm sm:text-base">{selectedEvent.resource?.game}</span>
                </div>
              </div>

              {/* Player & Pro Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="backdrop-blur-sm bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
                  <label className="text-xs sm:text-sm font-medium text-gray-300 block mb-2">Joueur</label>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 backdrop-blur-sm bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-400/30">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-white font-semibold text-sm sm:text-base truncate">{selectedEvent.resource?.playerName}</span>
                  </div>
                </div>

                <div className="backdrop-blur-sm bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
                  <label className="text-xs sm:text-sm font-medium text-gray-300 block mb-2">Pro Player</label>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 backdrop-blur-sm bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-purple-400/30">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <span className="text-white font-semibold text-sm sm:text-base truncate">{selectedEvent.resource?.pro}</span>
                  </div>
                </div>
              </div>

              {/* Session Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="backdrop-blur-sm bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
                  <label className="text-xs sm:text-sm font-medium text-gray-300 block mb-2">Type</label>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${selectedEvent.resource?.type === 'coaching' ? 'bg-blue-400' : 'bg-red-400'} flex-shrink-0`}></div>
                    <span className="text-white font-semibold capitalize text-sm sm:text-base">{selectedEvent.resource?.type}</span>
                  </div>
                </div>

                <div className="backdrop-blur-sm bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
                  <label className="text-xs sm:text-sm font-medium text-gray-300 block mb-2">Durée</label>
                  <span className="text-white font-semibold text-sm sm:text-base">{selectedEvent.resource?.duration} min</span>
                </div>
              </div>

              {/* Date & Time */}
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
                <label className="text-xs sm:text-sm font-medium text-gray-300 block mb-2">Date et heure</label>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-white font-semibold text-sm sm:text-base">
                    {selectedEvent.start.toLocaleDateString('fr-FR')} à {selectedEvent.start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-300 text-xs sm:text-sm">
                    Fin prévue à {selectedEvent.end.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              {/* Payment Info */}
              <div className="backdrop-blur-sm bg-green-500/10 border border-green-400/30 rounded-xl p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-green-300 block mb-1">Montant payé</label>
                    <span className="text-green-300 font-bold text-xl sm:text-2xl">{selectedEvent.resource?.price}€</span>
                  </div>
                  <div className="text-left sm:text-right">
                    <label className="text-xs sm:text-sm font-medium text-green-300 block mb-1">Payé le</label>
                    <span className="text-green-300 text-xs sm:text-sm">
                      {selectedEvent.resource?.paymentDate.toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-6 sm:mt-8">
              <button
                onClick={() => deleteEvent(selectedEvent.id)}
                className="flex-1 backdrop-blur-sm bg-red-500/20 hover:bg-red-500/30 text-red-300 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl transition-all duration-300 font-medium flex items-center justify-center gap-2 text-sm sm:text-base border border-red-400/30 hover:scale-105"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="hidden xs:inline">Annuler le RDV</span>
                <span className="xs:hidden">Annuler</span>
              </button>
              <button
                onClick={closeEventModal}
                className="flex-1 backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl transition-all duration-300 font-medium text-sm sm:text-base border border-white/20 hover:scale-105"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;