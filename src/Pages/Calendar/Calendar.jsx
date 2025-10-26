import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { GAMES } from '../DashboardUser/constants';

// Composant EventForm adapté au design existant (non utilisé dans cette version)
// const EventForm = ({ onSubmit, onCancel, selectedSlot }) => {
//   // ... code du formulaire ...
// };

// Configuration de la localisation française
moment.locale('fr', {
  months: [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ],
  weekdays: [
    'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'
  ],
  weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
});

const localizer = momentLocalizer(moment);

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
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterGame, setFilterGame] = useState('all');
  const [calendarHeight, setCalendarHeight] = useState(600);

  // Hook pour détecter la taille de l'écran
  useEffect(() => {
    const updateCalendarHeight = () => {
      if (window.innerWidth < 768) {
        setCalendarHeight(400);
      } else if (window.innerWidth < 1024) {
        setCalendarHeight(500);
      } else {
        setCalendarHeight(600);
      }
    };

    updateCalendarHeight();
    window.addEventListener('resize', updateCalendarHeight);

    return () => window.removeEventListener('resize', updateCalendarHeight);
  }, []);

  // Configuration des vues disponibles
  const views = ['month', 'week', 'day', 'agenda'];

  // Styles personnalisés pour les événements adaptés au design existant
  const eventStyleGetter = (event) => {
    const gameColors = {
      'CS2': 'bg-red-500',
      'Valorant': 'bg-purple-500',
      'LoL': 'bg-blue-500',
      'Fortnite': 'bg-green-500',
      'Apex': 'bg-orange-500',
      'FIFA': 'bg-yellow-500',
      'COD': 'bg-gray-500'
    };

    const typeStyles = {
      'coaching': 'border-l-4 border-l-blue-400',
      'match': 'border-l-4 border-l-red-400',
      'tournament': 'border-l-4 border-l-yellow-400'
    };

    const gameColor = gameColors[event.resource?.game] || 'bg-gray-500';
    const typeStyle = typeStyles[event.resource?.type] || 'border-l-4 border-l-gray-400';

    return {
      className: `${gameColor} ${typeStyle} text-white rounded-lg shadow-lg`,
      style: {
        opacity: 0.95,
        borderRadius: '8px',
        border: 'none',
        fontSize: '12px',
        fontWeight: '600',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
      }
    };
  };

  // Gestionnaire pour la sélection d'un événement
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  // Gestionnaire pour la sélection d'un créneau (non utilisé dans cette version)
  // const handleSelectSlot = ({ start, end }) => {
  //   setSelectedSlot({ start, end });
  //   setShowEventForm(true);
  // };

  // Fonction pour créer un nouvel événement (non utilisée dans cette version)
  // const createEvent = (eventData) => {
  //   const newEvent = {
  //     id: Date.now(),
  //     ...eventData,
  //     start: selectedSlot.start,
  //     end: selectedSlot.end,
  //   };
  //   setEvents([...events, newEvent]);
  //   setShowEventForm(false);
  //   setSelectedSlot(null);
  // };

  // Fermer la modal d'événement
  const closeEventModal = () => {
    setSelectedEvent(null);
  };

  // Supprimer un événement
  const deleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    setSelectedEvent(null);
  };

  // Filtrer les événements par jeu et ne garder que les RDV payés
  const filteredEvents = events.filter(event => {
    const gameMatch = filterGame === 'all' || event.resource?.game === filterGame;
    const isPaid = event.resource?.status === 'paid';
    return gameMatch && isPaid;
  });

  return (
    <div className="h-screen bg-gray-900 flex overflow-hidden">
      {/* Main Content Area - Adapté au layout existant */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header Section */}
        <div className="flex-shrink-0 bg-gray-800 border-b border-gray-700 p-6">
          <div className="flex items-center justify-between">
             <div>
               <h1 className="text-3xl font-bold text-white mb-2">
                 📅 RDV Payés
               </h1>
               <p className="text-gray-300">
                 Consultez vos rendez-vous payés avec les pros
               </p>
             </div>
            
            <div className="flex items-center gap-4">
              <select
                value={filterGame}
                onChange={(e) => setFilterGame(e.target.value)}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
              >
                <option value="all">Tous les jeux</option>
                {Object.entries(GAMES).map(([key, game]) => (
                  <option key={key} value={key}>
                    {game.emoji} {game.fullName}
                  </option>
                ))}
              </select>
              
               <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-xl">
                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                 <span className="text-green-400 text-sm font-medium">RDV Payés</span>
               </div>
            </div>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Central Content */}
          <div 
            className="flex-1 overflow-y-auto"
            style={{
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none', /* IE and Edge */
              WebkitScrollbar: 'none', /* Chrome, Safari, Opera */
            }}
          >
            <div className="p-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                 <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
                   <div className="flex items-center justify-between">
                     <div>
                       <p className="text-gray-400 text-sm font-medium">RDV Payés</p>
                       <p className="text-3xl font-bold text-white">{filteredEvents.length}</p>
                     </div>
                     <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                       <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                       </svg>
                     </div>
                   </div>
                 </div>

                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">Coaching</p>
                      <p className="text-3xl font-bold text-white">
                        {filteredEvents.filter(e => e.resource?.type === 'coaching').length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">Matchs</p>
                      <p className="text-3xl font-bold text-white">
                        {filteredEvents.filter(e => e.resource?.type === 'match').length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">Total dépensé</p>
                      <p className="text-3xl font-bold text-white">
                        {filteredEvents.reduce((sum, event) => sum + (event.resource?.price || 0), 0)}€
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendar Container */}
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-lg">
                <Calendar
                  localizer={localizer}
                  events={filteredEvents}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: calendarHeight }}
                  view={view}
                  views={views}
                  date={date}
                  onNavigate={setDate}
                  onView={setView}
                  onSelectEvent={handleSelectEvent}
                   onSelectSlot={() => {}} // Désactivé pour cette version
                  selectable
                  eventPropGetter={eventStyleGetter}
                  messages={{
                    next: "Suivant",
                    previous: "Précédent",
                    today: "Aujourd'hui",
                    month: "Mois",
                    week: "Semaine",
                    day: "Jour",
                    agenda: "Agenda",
                    date: "Date",
                    time: "Heure",
                    event: "Événement",
                    allDay: "Toute la journée",
                    noEventsInRange: "Aucun événement dans cette période"
                  }}
                  className="calendar-dashboard"
                />
              </div>
            </div>
          </div>
          
          {/* Right Sidebar - Adapté au design existant */}
          <div 
            className="w-80 flex-shrink-0 overflow-y-auto bg-gray-800 border-l border-gray-700"
            style={{
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none', /* IE and Edge */
              WebkitScrollbar: 'none', /* Chrome, Safari, Opera */
            }}
          >
            <div className="p-6">
               {/* Prochains RDV */}
               <div className="bg-gray-700 rounded-2xl p-4 mb-6">
                 <div className="flex items-center justify-between mb-3">
                   <h3 className="text-lg font-bold text-white">Prochains RDV</h3>
                   <div className="flex items-center gap-1">
                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                     <span className="text-green-400 text-xs">Payés</span>
                   </div>
                 </div>

                 <div className="space-y-3">
                   {filteredEvents.slice(0, 3).map((event) => (
                     <div key={event.id} className="bg-gray-600 rounded-xl p-3 hover:bg-gray-500 transition-colors cursor-pointer" onClick={() => handleSelectEvent(event)}>
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                           <span className="text-white text-sm font-bold">
                             {GAMES[event.resource?.game]?.emoji || '🎮'}
                           </span>
                         </div>
                         <div className="flex-1">
                           <p className="text-white text-sm font-medium">{event.title}</p>
                           <p className="text-gray-300 text-xs">
                             {moment(event.start).format('DD/MM HH:mm')} - {event.resource?.pro}
                           </p>
                         </div>
                         <div className="text-right">
                           <p className="text-green-400 text-sm font-bold">{event.resource?.price}€</p>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>

            
            </div>
          </div>
        </div>
      </div>


      {/* RDV Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Détails du RDV</h3>
                  <p className="text-green-400 text-sm">Rendez-vous payé</p>
                </div>
              </div>
              <button
                onClick={closeEventModal}
                className="text-gray-400 hover:text-gray-200 transition-colors p-1 hover:bg-gray-700 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Session Info */}
              <div className="bg-gray-700 rounded-xl p-4">
                <h4 className="text-white font-semibold text-lg mb-2">{selectedEvent.title}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{GAMES[selectedEvent.resource?.game]?.emoji || '🎮'}</span>
                  <span className="text-gray-300">{selectedEvent.resource?.game}</span>
                </div>
              </div>

              {/* Player & Pro Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-xl p-4">
                  <label className="text-sm font-medium text-gray-300 block mb-2">Joueur</label>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-white font-semibold">{selectedEvent.resource?.playerName}</span>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-xl p-4">
                  <label className="text-sm font-medium text-gray-300 block mb-2">Pro Player</label>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <span className="text-white font-semibold">{selectedEvent.resource?.pro}</span>
                  </div>
                </div>
              </div>

              {/* Session Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-xl p-4">
                  <label className="text-sm font-medium text-gray-300 block mb-2">Type</label>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${selectedEvent.resource?.type === 'coaching' ? 'bg-blue-500' : 'bg-red-500'}`}></div>
                    <span className="text-white font-semibold capitalize">{selectedEvent.resource?.type}</span>
                  </div>

                </div>

                <div className="bg-gray-700 rounded-xl p-4">
                  <label className="text-sm font-medium text-gray-300 block mb-2">Durée</label>
                  <span className="text-white font-semibold">{selectedEvent.resource?.duration} min</span>
                </div>
              </div>

              {/* Date & Time */}
              <div className="bg-gray-700 rounded-xl p-4">
                <label className="text-sm font-medium text-gray-300 block mb-2">Date et heure</label>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-white font-semibold">
                    {moment(selectedEvent.start).format('DD/MM/YYYY')} à {moment(selectedEvent.start).format('HH:mm')}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-300 text-sm">
                    Fin prévue à {moment(selectedEvent.end).format('HH:mm')}
                  </span>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-green-300 block mb-1">Montant payé</label>
                    <span className="text-green-400 font-bold text-2xl">{selectedEvent.resource?.price}€</span>
                  </div>
                  <div className="text-right">
                    <label className="text-sm font-medium text-green-300 block mb-1">Payé le</label>
                    <span className="text-green-400 text-sm">
                      {moment(selectedEvent.resource?.paymentDate).format('DD/MM/YYYY')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => deleteEvent(selectedEvent.id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-xl transition-all duration-300 font-medium flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Annuler le RDV
              </button>
              <button
                onClick={closeEventModal}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-xl transition-all duration-300 font-medium"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS adapté au design existant */}
      <style jsx global>{`
        .calendar-dashboard {
          background: transparent;
          color: #f9fafb;
          border-radius: 12px;
          overflow: hidden;
        }
        
        .calendar-dashboard .rbc-header {
          background: #374151;
          color: #f9fafb;
          border-bottom: 1px solid #4b5563;
          padding: 16px 8px;
          font-weight: 600;
          font-size: 14px;
        }
        
        .calendar-dashboard .rbc-month-view {
          border: 1px solid #4b5563;
          border-radius: 8px;
          background: #1f2937;
        }
        
        .calendar-dashboard .rbc-date-cell {
          color: #f9fafb;
          padding: 8px;
          transition: all 0.2s ease;
        }
        
        .calendar-dashboard .rbc-date-cell:hover {
          background: rgba(139, 43, 226, 0.1);
          border-radius: 6px;
        }
        
        .calendar-dashboard .rbc-off-range-bg {
          background: #111827;
        }
        
        .calendar-dashboard .rbc-today {
          background: #8A2BE2;
          font-weight: 700;
          color: white;
          border-radius: 6px;
        }
        
        .calendar-dashboard .rbc-toolbar {
          background: #374151;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
          border: 1px solid #4b5563;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        
        .calendar-dashboard .rbc-toolbar button {
          background: #1f2937;
          color: #f9fafb;
          border: 1px solid #4b5563;
          border-radius: 8px;
          padding: 10px 16px;
          margin: 0 4px;
          transition: all 0.2s ease;
          font-weight: 500;
          font-size: 14px;
        }
        
        .calendar-dashboard .rbc-toolbar button:hover {
          background: rgba(139, 43, 226, 0.2);
          border-color: #8A2BE2;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px -1px rgba(139, 43, 226, 0.3);
        }
        
        .calendar-dashboard .rbc-toolbar button.rbc-active {
          background: #8A2BE2;
          border-color: #8A2BE2;
          color: white;
          box-shadow: 0 4px 6px -1px rgba(139, 43, 226, 0.4);
        }
        
        .calendar-dashboard .rbc-toolbar-label {
          color: #f9fafb;
          font-weight: 700;
          font-size: 1.5rem;
        }
        
        .calendar-dashboard .rbc-event {
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
        }
        
        .calendar-dashboard .rbc-event:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.4);
        }
        
        .calendar-dashboard .rbc-time-view {
          border: 1px solid #4b5563;
          border-radius: 8px;
          background: #1f2937;
        }
        
        .calendar-dashboard .rbc-time-header {
          background: #374151;
          border-bottom: 1px solid #4b5563;
        }
        
        .calendar-dashboard .rbc-time-content {
          background: #1f2937;
        }
        
        .calendar-dashboard .rbc-timeslot-group {
          border-bottom: 1px solid #374151;
        }
        
        .calendar-dashboard .rbc-time-slot {
          color: #9ca3af;
          font-size: 12px;
        }
        
        .calendar-dashboard .rbc-current-time-indicator {
          background: #ef4444;
          height: 2px;
          border-radius: 1px;
        }
        
        .calendar-dashboard .rbc-day-bg {
          transition: background-color 0.2s ease;
        }
        
        .calendar-dashboard .rbc-day-bg:hover {
          background-color: rgba(139, 43, 226, 0.1);
        }
        
        .calendar-dashboard .rbc-slot-selection {
          background: rgba(139, 43, 226, 0.2);
          border: 1px dashed #8A2BE2;
        }
        
        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .ml-64 {
            margin-left: 0;
          }
          
          .w-80 {
            width: 18rem;
          }
          
          .flex {
            flex-direction: column;
          }
          
          .flex-1 {
            height: calc(100vh - 4rem);
          }
        }
        
        @media (max-width: 768px) {
          .calendar-dashboard .rbc-toolbar {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          
          .calendar-dashboard .rbc-toolbar button {
            margin: 2px 0;
            flex: 1;
          }
          
          .calendar-dashboard .rbc-toolbar-label {
            font-size: 1.25rem;
            text-align: center;
            margin-bottom: 8px;
          }
          
          .w-80 {
            width: 100%;
          }
          
          .flex-col {
            flex-direction: column;
          }
          
          .h-screen {
            height: 100vh;
          }
          
          .p-6 {
            padding: 1rem;
          }
        }
        
        @media (max-width: 640px) {
          .calendar-dashboard .rbc-header {
            padding: 8px 4px;
            font-size: 12px;
          }
          
          .calendar-dashboard .rbc-date-cell {
            padding: 4px;
            font-size: 12px;
          }
          
          .grid-cols-5 {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .text-2xl {
            font-size: 1.5rem;
          }
          
          .text-xl {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CalendarComponent;