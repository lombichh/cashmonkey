import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Filter,
  User,
  Clock,
  FileText,
  Zap,
  Plus,
  LogIn,
  UserPlus,
  Bell,
  Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LogPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('02/04/2025 - 08/05/2025');

  const logEntries = [
    {
      id: 1,
      type: 'Manuale',
      operation: 'Aggiunta movimento',
      details: 'data: 01/01/2025, categoria: svago, metodo: Re...',
      date: '01/01/2025',
      time: '10:50',
      user: 'mariorossi',
      icon: Plus
    },
    {
      id: 2,
      type: 'Automatica',
      operation: 'Generazione resoconto annuale',
      details: 'username: mariorossi',
      date: '01/01/2025',
      time: '00:00',
      user: 'fine anno',
      icon: FileText
    },
    {
      id: 3,
      type: 'Automatica',
      operation: 'Generazione resoconto mensile',
      details: 'username: mariorossi',
      date: '01/01/2025',
      time: '00:00',
      user: 'fine mese',
      icon: FileText
    },
    {
      id: 4,
      type: 'Automatica',
      operation: 'Generazione resoconto annuale',
      details: 'username: frodobaggins',
      date: '01/01/2025',
      time: '00:00',
      user: 'fine anno',
      icon: FileText
    },
    {
      id: 5,
      type: 'Automatica',
      operation: 'Generazione resoconto mensile',
      details: 'username: frodobaggins',
      date: '01/01/2025',
      time: '00:00',
      user: 'fine mese',
      icon: FileText
    },
    {
      id: 6,
      type: 'Manuale',
      operation: 'Aggiunta movimento',
      details: 'data: 31/12/2024, categoria: finanza, metodo: B...',
      date: '31/12/2024',
      time: '15:12',
      user: 'federicoferro',
      icon: Plus
    },
    {
      id: 7,
      type: 'Manuale',
      operation: 'Login',
      details: '',
      date: '31/12/2024',
      time: '10:23',
      user: 'matteolombardi',
      icon: LogIn
    },
    {
      id: 8,
      type: 'Manuale',
      operation: 'Registrazione',
      details: '',
      date: '30/12/2024',
      time: '15:50',
      user: 'matteolombardi',
      icon: UserPlus
    },
    {
      id: 9,
      type: 'Manuale',
      operation: 'Aggiunta promemoria',
      details: 'nome: Paga rata del mutuo, categoria: Casa, te...',
      date: '30/12/2024',
      time: '15:35',
      user: 'frodobaggins',
      icon: Bell
    },
    {
      id: 10,
      type: 'Manuale',
      operation: 'Rimozione obiettivo economico',
      details: 'nome: Seconda casa, termine: 31/12/...',
      date: '29/12/2024',
      time: '19:57',
      user: 'federicoferro',
      icon: Trash2
    }
  ];

  const getTypeStyle = (type) => {
    return type === 'Automatica' 
      ? 'bg-green-50 text-green-700 border-green-200' 
      : 'bg-blue-50 text-blue-700 border-blue-200';
  };

  const filteredEntries = logEntries.filter(entry => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'automatica') return entry.type === 'Automatica';
    if (activeFilter === 'manuale') return entry.type === 'Manuale';
    return true;
  });

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/sicurezza');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Log Attività</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Date Range Selector */}
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-4 py-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">{selectedDateRange}</span>
              </div>
              
              {/* Filter Buttons */}
              <button
                onClick={() => setActiveFilter('automatica')}
                className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                  activeFilter === 'automatica' 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50'
                }`}
              >
                Operazioni automatiche
              </button>
              
              <button
                onClick={() => setActiveFilter('manuale')}
                className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                  activeFilter === 'manuale' 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50'
                }`}
              >
                Operazioni manuali
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 border-b">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm font-semibold text-gray-700">
              <div className="col-span-2">Tipo</div>
              <div className="col-span-4">Operazione</div>
              <div className="col-span-3">Data e ora</div>
              <div className="col-span-3">Utente/Evento</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {filteredEntries.map((entry) => (
              <div key={entry.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                {/* Type */}
                <div className="col-span-2">
                  <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border ${getTypeStyle(entry.type)}`}>
                    {entry.type === 'Automatica' ? (
                      <Zap className="w-3 h-3" />
                    ) : (
                      <User className="w-3 h-3" />
                    )}
                    <span>{entry.type}</span>
                  </span>
                </div>

                {/* Operation */}
                <div className="col-span-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-1 bg-gray-100 rounded">
                      <entry.icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 mb-1">{entry.operation}</p>
                      {entry.details && (
                        <p className="text-sm text-gray-500 truncate max-w-md" title={entry.details}>
                          {entry.details}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="col-span-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{entry.date}</p>
                      <p className="text-sm text-gray-500">{entry.time}</p>
                    </div>
                  </div>
                </div>

                {/* User/Event */}
                <div className="col-span-3">
                  <div className="flex items-center space-x-2">
                    {entry.type === 'Automatica' ? (
                      <Zap className="w-3 h-3" />
                    ) : (
                      <User className="w-3 h-3" />
                    )}
                    <span className="font-medium text-gray-700">{entry.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border p-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{filteredEntries.length}</p>
              <p className="text-sm text-gray-600">Operazioni totali</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {filteredEntries.filter(e => e.type === 'Automatica').length}
              </p>
              <p className="text-sm text-gray-600">Operazioni automatiche</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {filteredEntries.filter(e => e.type === 'Manuale').length}
              </p>
              <p className="text-sm text-gray-600">Operazioni manuali</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogPage;