import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Tasks({ userType }) {
  const location = useLocation();
  const [filter, setFilter] = useState('all'); // all, todo, inProgress, done
  const [showAddTask, setShowAddTask] = useState(false);
  const [showTaskMenu, setShowTaskMenu] = useState(null);
  const [taskValidations, setTaskValidations] = useState({}); // {taskId: 'validated' | 'rework'}

  // Ouvrir le modal si on vient du Dashboard
  useEffect(() => {
    if (location.state?.openModal) {
      setShowAddTask(true);
    }
  }, [location]);

  // Tâches mockées pour ÉLÈVE
  const [studentTasks, setStudentTasks] = useState([
    {
      id: 1,
      title: 'Exercices de mathématiques chapitre 5',
      description: 'Pages 45-48, tous les exercices',
      status: 'inProgress',
      priority: 'high',
      dueDate: '2024-11-15',
      assignedBy: 'Marie Leclerc', // Assignée par tuteur
    },
    {
      id: 2,
      title: 'Préparer l\'exposé de français',
      description: 'Thème: Les auteurs du 19ème siècle',
      status: 'todo',
      priority: 'high',
      dueDate: '2024-11-20',
      assignedBy: 'Sophie Dubois', // Assignée par tuteur
    },
    {
      id: 3,
      title: 'Lire le chapitre 3 d\'histoire',
      description: 'La Révolution française - Prendre des notes',
      status: 'todo',
      priority: 'medium',
      dueDate: '2024-11-18',
      assignedBy: null, // Tâche personnelle de l'élève
    },
    {
      id: 4,
      title: 'Réviser les verbes irréguliers en anglais',
      description: 'Liste complète pages 120-125',
      status: 'done',
      priority: 'medium',
      dueDate: '2024-11-10',
      assignedBy: null, // Tâche personnelle de l'élève
    },
  ]);

  // Tâches mockées pour TUTEUR
  const [tutorTasks, setTutorTasks] = useState([
    {
      id: 1,
      title: 'Préparer la séance de mathématiques',
      description: 'Révision des équations du second degré',
      status: 'inProgress',
      priority: 'high',
      dueDate: '2024-11-14',
      assignedBy: null, // Tâche personnelle du tuteur
    },
    {
      id: 2,
      title: 'Corriger les devoirs d\'histoire',
      description: 'Devoir sur la Révolution française',
      status: 'todo',
      priority: 'medium',
      dueDate: '2024-11-16',
      assignedBy: null, // Tâche personnelle du tuteur
    },
    {
      id: 3,
      title: 'Planifier les sessions de la semaine',
      description: 'Organiser les créneaux avec les élèves',
      status: 'done',
      priority: 'low',
      dueDate: '2024-11-12',
      assignedBy: null, // Tâche personnelle du tuteur
    },
  ]);

  // Tâches soumises par les élèves (pour validation tuteur)
  const submittedTasks = [
    {
      id: 101,
      studentName: 'Thomas Martin',
      title: 'Devoir de mathématiques',
      description: 'Exercices sur les fractions',
      submittedDate: '2024-11-13',
      priority: 'high',
    },
    {
      id: 102,
      studentName: 'Emma Rousseau',
      title: 'Exposé d\'histoire',
      description: 'La Seconde Guerre mondiale',
      submittedDate: '2024-11-12',
      priority: 'medium',
    },
  ];

  const tasks = userType === 'student' ? studentTasks : tutorTasks;

  const handleStatusChange = (taskId, newStatus) => {
    if (userType === 'student') {
      setStudentTasks(studentTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      ));
    } else {
      setTutorTasks(tutorTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      ));
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'amber';
      case 'low': return 'emerald';
      default: return 'gray';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return 'Haute';
      case 'medium': return 'Moyenne';
      case 'low': return 'Basse';
      default: return priority;
    }
  };

  return (
    <div className="h-full overflow-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mes tâches</h1>
            <p className="text-gray-600 mt-1">Organisez votre travail scolaire</p>
          </div>
          <button
            onClick={() => setShowAddTask(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Nouvelle tâche</span>
          </button>
        </div>
      </div>

      <div className="p-6 pb-20 md:pb-6">
        {/* Filtres */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Toutes ({tasks.length})
          </button>
          <button
            onClick={() => setFilter('todo')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'todo'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            À faire ({tasks.filter(t => t.status === 'todo').length})
          </button>
          <button
            onClick={() => setFilter('inProgress')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'inProgress'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            En cours ({tasks.filter(t => t.status === 'inProgress').length})
          </button>
          <button
            onClick={() => setFilter('done')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'done'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Terminées ({tasks.filter(t => t.status === 'done').length})
          </button>
        </div>

        {/* Liste des tâches */}
        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow ${
                  task.status === 'done' ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  {/* Contenu gauche */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`text-lg font-semibold ${
                        task.status === 'done' ? 'line-through text-gray-500' : 'text-gray-900'
                      }`}>
                        {task.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 text-sm mb-3">{task.description}</p>

                    {/* Tags et infos */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-${getPriorityColor(task.priority)}-100 text-${getPriorityColor(task.priority)}-700`}>
                        Priorité {getPriorityLabel(task.priority)}
                      </span>
                      <span className="inline-flex items-center space-x-1 text-xs text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{new Date(task.dueDate).toLocaleDateString('fr-FR')}</span>
                      </span>
                      {task.assignedBy && (
                        <span className="inline-flex items-center space-x-1 text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>Assignée par {task.assignedBy}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Icônes de statut à droite */}
                  <div className="flex items-center gap-2 ml-4">
                    {/* À faire */}
                    <button
                      onClick={() => handleStatusChange(task.id, 'todo')}
                      className={`p-2 rounded-lg transition-colors ${
                        task.status === 'todo'
                          ? 'bg-gray-100 text-gray-700'
                          : 'text-gray-300 hover:text-gray-400'
                      }`}
                      title="À faire"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </button>

                    {/* En cours */}
                    <button
                      onClick={() => handleStatusChange(task.id, 'inProgress')}
                      className={`p-2 rounded-lg transition-colors ${
                        task.status === 'inProgress'
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-300 hover:text-gray-400'
                      }`}
                      title="En cours"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>

                    {/* Terminé / Soumettre */}
                    <button
                      onClick={() => handleStatusChange(task.id, 'done')}
                      className={`p-2 rounded-lg transition-colors ${
                        task.status === 'done'
                          ? task.assignedBy
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'bg-green-100 text-green-700'
                          : 'text-gray-300 hover:text-gray-400'
                      }`}
                      title={task.assignedBy ? 'Soumettre' : 'Terminé'}
                    >
                      {task.assignedBy ? (
                        // Icône "soumettre/poster" pour tâches assignées par tuteur
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      ) : (
                        // Icône "check" pour tâches personnelles
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>

                    {/* Menu 3 points */}
                    <div className="relative">
                      <button
                        onClick={() => setShowTaskMenu(showTaskMenu === task.id ? null : task.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                      {showTaskMenu === task.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                          {task.assignedBy ? (
                            // Menu pour tâches assignées par tuteur
                            <button
                              onClick={() => setShowTaskMenu(null)}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Demander de l'aide
                            </button>
                          ) : (
                            // Menu pour tâches auto-assignées
                            <>
                              <button
                                onClick={() => setShowTaskMenu(null)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Modifier
                              </button>
                              <button
                                onClick={() => setShowTaskMenu(null)}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Supprimer
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-gray-500">Aucune tâche dans cette catégorie</p>
            </div>
          )}
        </div>

        {/* Section tâches à valider pour TUTEUR */}
        {userType === 'tutor' && submittedTasks.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tâches à valider</h2>
            <div className="space-y-4">
              {submittedTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-xl shadow-sm border-2 border-indigo-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                          {task.studentName}
                        </span>
                        <span className="text-xs text-gray-500">
                          Soumis le {new Date(task.submittedDate).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {task.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                    </div>

                    {/* Actions validation */}
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => setTaskValidations({...taskValidations, [task.id]: 'validated'})}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                          taskValidations[task.id] === 'validated'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        title={taskValidations[task.id] === 'validated' ? 'Validé' : 'Valider'}
                      >
                        {taskValidations[task.id] === 'validated' ? 'Validé' : 'Valider'}
                        {taskValidations[task.id] === 'validated' && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={() => setTaskValidations({...taskValidations, [task.id]: 'rework'})}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                          taskValidations[task.id] === 'rework'
                            ? 'bg-amber-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        title={taskValidations[task.id] === 'rework' ? 'À retravailler' : 'Insuffisant'}
                      >
                        {taskValidations[task.id] === 'rework' ? 'À retravailler' : 'Insuffisant'}
                        {taskValidations[task.id] === 'rework' && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal d'ajout de tâche */}
      {showAddTask && (
        <div
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddTask(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Nouvelle tâche</h3>
              <button
                onClick={() => setShowAddTask(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="space-y-4">
              {userType === 'tutor' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigner à
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option>Moi-même</option>
                    <option>Thomas Martin</option>
                    <option>Emma Rousseau</option>
                    <option>Lucas Bernard</option>
                  </select>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Nom de la tâche"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Détails de la tâche"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date d'échéance
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priorité
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="low">Basse</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Haute</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddTask(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAddTask(false);
                  }}
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
