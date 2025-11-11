import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Dashboard({ userType }) {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Finir les exercices de mathématiques', status: 'en cours', priority: 'high' },
    { id: 2, title: 'Lire le chapitre 3 d\'histoire', status: 'à faire', priority: 'medium' },
    { id: 3, title: 'Préparer l\'exposé de français', status: 'à faire', priority: 'high' },
  ]);

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const events = [
    { id: 1, title: 'Session de tutorat - Mathématiques', date: 'Aujourd\'hui', time: '14:00' },
    { id: 2, title: 'Révisions - Histoire', date: 'Demain', time: '10:00' },
    { id: 3, title: 'Cours de français', date: '15 Nov', time: '15:30' },
  ];

  const unreadMessages = 3;

  return (
    <div className="h-full overflow-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Bonjour, Jean ! 👋
        </h1>
        <p className="text-gray-600 mt-1">
          {userType === 'student' 
            ? 'Voici un récapitulatif de tes activités'
            : 'Voici un récapitulatif de vos activités'
          }
        </p>
      </div>

      {/* Main content */}
      <div className="p-6 pb-20 md:pb-6">
        {/* Stats Cards - One line avec badge en coin */}
        <div className="grid grid-cols-1 min-[900px]:grid-cols-3 gap-6 mb-6">
          {/* Messages non lus */}
          <Link to="/chat" className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 md:p-6 border border-gray-200 relative">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 relative">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {unreadMessages > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {unreadMessages}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">{unreadMessages}</h3>
                <p className="text-gray-600 text-xs md:text-sm">Messages non lus</p>
              </div>
            </div>
          </Link>

          {/* Tâches en cours */}
          <Link to="/tasks" className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 md:p-6 border border-gray-200">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">{tasks.length}</h3>
                <p className="text-gray-600 text-xs md:text-sm">Tâches actives</p>
              </div>
            </div>
          </Link>

          {/* Événements à venir */}
          <Link to="/calendar" className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 md:p-6 border border-gray-200">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">{events.length}</h3>
                <p className="text-gray-600 text-xs md:text-sm">Événements prochains</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Main widgets grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Widget Tâches */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Mes tâches</h2>
                <Link to="/tasks" className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold">
                  Voir tout →
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{task.title}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            task.status === 'en cours'
                              ? 'bg-blue-100 text-blue-700'
                              : task.status === 'terminé'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {task.status}
                        </span>
                        {task.priority === 'high' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                            Priorité haute
                          </span>
                        )}
                      </div>
                    </div>
                    {/* Icônes de statut */}
                    <div className="flex items-center gap-1 ml-3">
                      <button
                        onClick={() => handleStatusChange(task.id, 'à faire')}
                        className={`p-1.5 rounded transition-colors ${
                          task.status === 'à faire'
                            ? 'bg-gray-200 text-gray-700'
                            : 'text-gray-300 hover:text-gray-500'
                        }`}
                        title="À faire"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleStatusChange(task.id, 'en cours')}
                        className={`p-1.5 rounded transition-colors ${
                          task.status === 'en cours'
                            ? 'bg-blue-200 text-blue-700'
                            : 'text-gray-300 hover:text-gray-500'
                        }`}
                        title="En cours"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleStatusChange(task.id, 'terminé')}
                        className={`p-1.5 rounded transition-colors ${
                          task.status === 'terminé'
                            ? 'bg-green-200 text-green-700'
                            : 'text-gray-300 hover:text-gray-500'
                        }`}
                        title="Terminé"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Widget Événements prochains */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Événements prochains</h2>
                <Link to="/calendar" className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold">
                  Calendrier →
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-xs text-gray-500">{event.date}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{event.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/chat"
            state={{ openModal: true }}
            className="flex items-center space-x-3 p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-indigo-500 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Envoyer un message</p>
              <p className="text-xs text-gray-500">À votre tuteur</p>
            </div>
          </Link>

          <Link
            to="/tasks"
            state={{ openModal: true }}
            className="flex items-center space-x-3 p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-indigo-500 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Créer une tâche</p>
              <p className="text-xs text-gray-500">Organiser votre travail</p>
            </div>
          </Link>

          <Link
            to="/calendar"
            state={{ openModal: true }}
            className="flex items-center space-x-3 p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-indigo-500 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Ajouter un événement</p>
              <p className="text-xs text-gray-500">Planifier une session</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
