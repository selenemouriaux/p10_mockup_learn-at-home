import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Calendar({ userType }) {
  const location = useLocation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddEvent, setShowAddEvent] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedEvent, setSelectedEvent] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [showMenu, setShowMenu] = useState(null);
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  // Ouvrir le modal si on vient du Dashboard
  useEffect(() => {
    if (location.state?.openModal) {
      setShowAddEvent(true);
    }
  }, [location]);

  // Liste des participants disponibles
  const availableParticipants = userType === 'student'
    ? ['Marie Leclerc (Tuteur)', 'Sophie Dubois (Tuteur)']
    : ['Thomas Martin (Élève)', 'Emma Rousseau (Élève)', 'Lucas Bernard (Élève)'];

  const handleAddParticipant = (e) => {
    const participant = e.target.value;
    if (participant && !selectedParticipants.includes(participant)) {
      setSelectedParticipants([...selectedParticipants, participant]);
    }
    e.target.value = ''; // Reset dropdown
  };

  const handleRemoveParticipant = (participant) => {
    setSelectedParticipants(selectedParticipants.filter(p => p !== participant));
  };

  const events = [
    {
      id: 1,
      title: 'Session de tutorat - Maths',
      date: '2025-11-15',
      time: '14:00',
      color: 'indigo',
      description: 'Révision des équations du second degré',
      participants: ['Marie Leclerc']
    },
    {
      id: 2,
      title: 'Révisions Histoire',
      date: '2025-11-16',
      time: '10:00',
      color: 'emerald',
      description: 'Révision sur la Révolution française',
      participants: ['Sophie Dubois']
    },
    {
      id: 3,
      title: 'Cours de français',
      date: '2025-11-17',
      time: '15:30',
      color: 'amber',
      description: 'Les auteurs du 19ème siècle',
      participants: ['Marie Leclerc']
    },
    {
      id: 4,
      title: 'Examen Mathématiques',
      date: '2025-11-20',
      time: '09:00',
      color: 'red',
      description: 'Examen final du trimestre',
      participants: []
    },
    {
      id: 5,
      title: 'Devoirs de physique',
      date: '2025-11-18',
      time: '16:00',
      color: 'blue',
      description: 'Exercices sur la mécanique',
      participants: []
    },
    {
      id: 6,
      title: 'Session d\'anglais',
      date: '2025-11-19',
      time: '14:30',
      color: 'purple',
      description: 'Pratique de conversation',
      participants: ['Marie Leclerc']
    },
  ];

  // Génération des jours du mois
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Jours du mois précédent
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ day: null, isCurrentMonth: false });
    }
    
    // Jours du mois actuel
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const dayEvents = events.filter(e => e.date === dateStr);
      days.push({ 
        day: i, 
        isCurrentMonth: true,
        date: dateStr,
        events: dayEvents,
        isToday: new Date().toDateString() === new Date(year, month, i).toDateString()
      });
    }

    return days;
  };

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  const days = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div className="h-full overflow-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Calendrier</h1>
            <p className="text-gray-600 mt-1">Gérez vos rendez-vous et événements</p>
          </div>
          <button
            onClick={() => setShowAddEvent(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Nouvel événement</span>
          </button>
        </div>
      </div>

      <div className="p-6 pb-20 md:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendrier principal */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Navigation du calendrier */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={previousMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Grille du calendrier */}
            <div className="grid grid-cols-7 gap-2">
              {/* Noms des jours */}
              {dayNames.map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}

              {/* Jours du mois */}
              {days.map((dayData, index) => (
                <div
                  key={index}
                  className={`min-h-24 p-2 border border-gray-200 rounded-lg ${
                    !dayData.isCurrentMonth ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'
                  } ${dayData.isToday ? 'ring-2 ring-indigo-600' : ''}`}
                >
                  {dayData.day && (
                    <>
                      <div className={`text-sm font-semibold mb-1 ${
                        dayData.isToday ? 'text-indigo-600' : 'text-gray-900'
                      }`}>
                        {dayData.day}
                      </div>
                      <div className="space-y-1">
                        {dayData.events?.map((event) => (
                          <button
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            className={`text-xs p-1 rounded bg-${event.color}-100 text-${event.color}-700 truncate hover:bg-${event.color}-200 transition-colors text-left w-full`}
                          >
                            {event.time}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Liste des événements à venir */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Événements à venir</h3>
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className={`w-3 h-3 rounded-full bg-${event.color}-500 mt-1`}></div>
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowMenu(showMenu === event.id ? null : event.id);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                      {showMenu === event.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEvent(event);
                              setShowMenu(null);
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Modifier
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowMenu(null);
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Supprimer
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{event.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal d'ajout d'événement */}
      {showAddEvent && (
        <div
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddEvent(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Nouvel événement</h3>
              <button
                onClick={() => setShowAddEvent(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Nom de l'événement"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heure
                </label>
                <input
                  type="time"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Participants
                </label>
                <select
                  onChange={handleAddParticipant}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  defaultValue=""
                >
                  <option value="" disabled>Sélectionner un participant...</option>
                  {availableParticipants.map((participant) => (
                    <option key={participant} value={participant}>
                      {participant}
                    </option>
                  ))}
                </select>
                {/* Liste des participants sélectionnés */}
                {selectedParticipants.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedParticipants.map((participant) => (
                      <div
                        key={participant}
                        className="group inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium"
                      >
                        <span>{participant}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveParticipant(participant)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-700 hover:text-indigo-900"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (optionnel)
                </label>
                <textarea
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                  placeholder="Ajouter des détails..."
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddEvent(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAddEvent(false);
                  }}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modale de détail d'événement */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Détails de l'événement</h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{selectedEvent.title}</h4>
                <p className="text-sm text-gray-600">{selectedEvent.description}</p>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{new Date(selectedEvent.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{selectedEvent.time}</span>
              </div>

              {selectedEvent.participants && selectedEvent.participants.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="font-medium">Participants :</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.participants.map((participant, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700"
                      >
                        {participant}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => {
                    setSelectedEvent(null);
                    setShowAddEvent(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Modifier
                </button>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
