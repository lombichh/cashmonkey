import React, { useState } from 'react';
import { 
  ChevronLeft,
  Lock,
  Unlock,
  User,
  Search,
  Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UtentiBloccati = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const blockedUsers = [
    { id: 1, username: 'mariorossi', status: 'blocked' },
    { id: 2, username: 'cesaretomasi', status: 'blocked' },
    { id: 3, username: 'frodobaggins', status: 'blocked' },
    { id: 4, username: 'matteolombardi', status: 'blocked' },
    { id: 5, username: 'federicoferro', status: 'blocked' }
  ];

  const [users, setUsers] = useState(blockedUsers);

  const handleUnblockUser = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: 'unblocked' }
        : user
    ));
  };

  const handleBlockUser = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: 'blocked' }
        : user
    ));
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/sicurezza');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center">
            <button 
              onClick={handleBack}
              className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">Utenti bloccati</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cerca utente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* User List Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Card Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Lista Utenti</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {filteredUsers.filter(u => u.status === 'blocked').length} utenti attualmente bloccati
                </p>
              </div>
              <Shield className="w-6 h-6 text-red-500" />
            </div>
          </div>

          {/* User List */}
          <div className="divide-y divide-gray-100">
            {filteredUsers.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Nessun utente trovato</p>
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div key={user.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    {/* User Info */}
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.username}
                        </div>
                        <div className="text-xs text-gray-500">
                          Username
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center">
                      {user.status === 'blocked' ? (
                        <button
                          onClick={() => handleUnblockUser(user.id)}
                          className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <Lock className="w-4 h-4 mr-2" />
                          Sblocca utente
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBlockUser(user.id)}
                          className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          <Unlock className="w-4 h-4 mr-2" />
                          Utente sbloccato
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">UTENTI BLOCCATI</h3>
              <Lock className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-red-600">
              {users.filter(u => u.status === 'blocked').length}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Attualmente non possono accedere
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">UTENTI SBLOCCATI</h3>
              <Unlock className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-600">
              {users.filter(u => u.status === 'unblocked').length}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Recentemente sbloccati
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">TOTALE UTENTI</h3>
              <User className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {users.length}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              In questa lista
            </div>
          </div>
        </div>

        {/* Info Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
          <div className="flex items-start">
            <Shield className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900">Informazioni sui blocchi</h4>
              <p className="text-sm text-blue-700 mt-1">
                Gli utenti bloccati non possono accedere alla piattaforma. 
                Puoi sbloccarli in qualsiasi momento cliccando sul pulsante "Sblocca utente".
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtentiBloccati;