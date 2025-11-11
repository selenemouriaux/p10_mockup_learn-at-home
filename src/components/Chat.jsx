import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Chat({ userType }) {
  const location = useLocation();
  const [selectedContact, setSelectedContact] = useState(1);
  const [messageText, setMessageText] = useState('');
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [showContactList, setShowContactList] = useState(true);
  const [selectedRecipients, setSelectedRecipients] = useState([]);

  // Ouvrir le modal si on vient du Dashboard
  useEffect(() => {
    if (location.state?.openModal) {
      setShowNewMessageModal(true);
    }
  }, [location]);

  // Liste des destinataires disponibles
  const availableRecipients = userType === 'student'
    ? [
        { id: 'marie', name: 'Marie Leclerc (Tuteur)' },
        { id: 'sophie', name: 'Sophie Dubois (Tuteur)' }
      ]
    : [
        { id: 'thomas', name: 'Thomas Martin (Élève)' },
        { id: 'emma', name: 'Emma Rousseau (Élève)' },
        { id: 'lucas', name: 'Lucas Bernard (Élève)' }
      ];

  const handleAddRecipient = (e) => {
    const recipientId = e.target.value;
    const recipient = availableRecipients.find(r => r.id === recipientId);
    if (recipient && !selectedRecipients.find(r => r.id === recipientId)) {
      setSelectedRecipients([...selectedRecipients, recipient]);
    }
    e.target.value = ''; // Reset dropdown
  };

  const handleRemoveRecipient = (recipientId) => {
    setSelectedRecipients(selectedRecipients.filter(r => r.id !== recipientId));
  };

  const contacts = [
    {
      id: 1,
      name: 'Marie Leclerc',
      type: 'tutor',
      lastMessage: 'Super ! À demain pour la session',
      time: '10:30',
      unread: 0,
      online: true
    },
    {
      id: 2,
      name: 'Thomas Martin',
      type: 'student',
      lastMessage: 'Merci pour ton aide !',
      time: 'Hier',
      unread: 2,
      online: false
    },
    { 
      id: 3, 
      name: 'Sophie Dubois', 
      type: 'tutor',
      lastMessage: 'N\'oublie pas de réviser le chapitre 3',
      time: '15 Nov',
      unread: 0,
      online: true
    },
  ];

  const messages = [
    {
      id: 1,
      sender: 'other',
      senderName: 'Marie Leclerc',
      text: 'Bonjour Jean ! Comment vas-tu ?',
      time: '10:20',
      read: true
    },
    {
      id: 2,
      sender: 'me',
      text: 'Salut Marie ! Ça va bien merci, et toi ?',
      time: '10:22',
      read: true
    },
    {
      id: 3,
      sender: 'other',
      senderName: 'Marie Leclerc',
      text: 'Très bien ! J\'ai préparé des exercices pour notre session de demain',
      time: '10:25',
      read: true
    },
    {
      id: 4,
      sender: 'me',
      text: 'Super ! À demain pour la session',
      time: '10:30',
      read: true
    },
  ];

  const selectedContactData = contacts.find(c => c.id === selectedContact);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      // Logique d'envoi de message
      setMessageText('');
    }
  };

  return (
    <div className="h-full flex bg-white">
      {/* Liste des conversations - Sidebar */}
      <div className={`w-full md:w-80 border-r border-gray-200 flex flex-col ${!showContactList ? 'hidden md:flex' : ''}`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            <button
              onClick={() => setShowNewMessageModal(true)}
              className="w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              title="Nouveau contact"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <button
            onClick={() => setShowNewMessageModal(true)}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Nouveau message</span>
          </button>
        </div>

        {/* Liste des contacts */}
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => {
                setSelectedContact(contact.id);
                setShowContactList(false);
              }}
              className={`w-full p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors text-left ${
                selectedContact === contact.id ? 'bg-indigo-50' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600 font-semibold">
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {contact.name}
                    </h3>
                    <span className="text-xs text-gray-500">{contact.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                    {contact.unread > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-indigo-600 rounded-full">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Zone de conversation */}
      <div className={`flex flex-col flex-1 ${showContactList ? 'hidden md:flex' : ''}`}>
        {selectedContactData ? (
          <>
            {/* Header de la conversation */}
            <div className="p-6 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowContactList(true)}
                  className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg mr-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 font-semibold text-sm">
                        {selectedContactData.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    {selectedContactData.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">{selectedContactData.name}</h2>
                    <p className="text-xs text-gray-500">
                      {selectedContactData.online ? 'En ligne' : 'Hors ligne'}
                    </p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end space-x-2 max-w-md ${message.sender === 'me' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Avatar */}
                    {message.sender === 'other' && (
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-600 font-semibold text-xs">
                          {message.senderName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}

                    {/* Bulle de message */}
                    <div>
                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          message.sender === 'me'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-gray-900 border border-gray-200'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                      <div className={`flex items-center space-x-2 mt-1 px-2 ${message.sender === 'me' ? 'justify-end' : ''}`}>
                        <span className="text-xs text-gray-500">{message.time}</span>
                        {message.sender === 'me' && (
                          <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Zone de saisie */}
            <div className="p-4 bg-white border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <div className="flex-1 relative">
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Votre message..."
                    rows="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-gray-500">Sélectionnez une conversation</p>
            </div>
          </div>
        )}
      </div>

      {/* Modale Nouveau Message */}
      {showNewMessageModal && (
        <div
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowNewMessageModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Nouveau message</h2>
                <button
                  onClick={() => setShowNewMessageModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destinataire(s)
                </label>
                <select
                  onChange={handleAddRecipient}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  defaultValue=""
                >
                  <option value="" disabled>Sélectionner un contact...</option>
                  {availableRecipients.map((recipient) => (
                    <option key={recipient.id} value={recipient.id}>
                      {recipient.name}
                    </option>
                  ))}
                </select>
                {/* Liste des destinataires sélectionnés */}
                {selectedRecipients.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedRecipients.map((recipient) => (
                      <div
                        key={recipient.id}
                        className="group inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium"
                      >
                        <span>{recipient.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveRecipient(recipient.id)}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                placeholder="Tapez votre message..."
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none mb-4"
              />
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowNewMessageModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={() => setShowNewMessageModal(false)}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
