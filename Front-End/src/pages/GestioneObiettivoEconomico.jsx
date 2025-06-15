import React, { useState } from 'react';
import { 
  TrendingUp, 
  CreditCard, 
  DollarSign, 
  Target, 
  Bell, 
  BarChart3,
  Home,
  X,
  Plus,
  Edit2,
  PieChart,
  Trash2
} from 'lucide-react';
import PageLayout from '../components/PageLayout';

const Dashboard = () => {
  const [selectedGoal, setSelectedGoal] = useState('seconda-casa');
  const [showSetGoalModal, setShowSetGoalModal] = useState(false);
  const [showDeleteGoalModal, setShowDeleteGoalModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [goalForm, setGoalForm] = useState({
    name: 'Seconda casa',
    target: 600000,
    deadline: '2025-12-31',
    current: 189611.78
  });

  // Calcola i dati dell'obiettivo basati sullo stato corrente
  const calculateGoalData = () => {
    if (!goalForm.name) return null;

    const deadlineDate = new Date(goalForm.deadline);
    const today = new Date();
    const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    const remaining = Math.max(goalForm.target - goalForm.current, 0);
    const progress = (goalForm.current / goalForm.target) * 100;

    return {
      name: goalForm.name,
      target: goalForm.target,
      current: goalForm.current,
      remaining: remaining,
      daysLeft: daysLeft > 0 ? daysLeft : 0,
      progress: progress > 100 ? 100 : progress
    };
  };

  const goalData = calculateGoalData();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handleSetGoal = () => {
    // Qui potresti fare una chiamata API per salvare l'obiettivo
    setShowSetGoalModal(false);
  };

  const handleDeleteGoal = () => {
    // Resetta il form dopo la cancellazione
    setGoalForm({
      name: '',
      target: 0,
      deadline: '',
      current: 0
    });
    setShowDeleteGoalModal(false);
  };

  return (
    <PageLayout currentPage="obiettivo-economico">
      <div className="flex h-screen bg-gray-50">

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl">
            {/* Se non c'è un obiettivo impostato */}
            {!goalData ? (
              <div className="text-center py-12">
                <Home className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Nessun obiettivo impostato</h2>
                <p className="text-gray-600 mb-6">Imposta un nuovo obiettivo per iniziare a tracciare i tuoi risparmi</p>
                <button 
                  onClick={() => setShowSetGoalModal(true)}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Imposta obiettivo
                </button>
              </div>
            ) : (
              <>
                {/* Goal Header */}
                <div className="flex items-center space-x-3 mb-8">
                  <div className="p-3 bg-gray-100 rounded-full">
                    <Home className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{goalData.name}</h2>
                    <p className="text-gray-500">Tempo rimanente: {goalData.daysLeft} giorni</p>
                  </div>
                </div>

                {/* Goal Amount */}
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold text-gray-900 mb-2">
                    {formatCurrency(goalData.target)}
                  </div>
                  <div className="text-lg text-gray-600">
                    Saldo mancante: {formatCurrency(goalData.remaining)}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-12">
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${goalData.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-3 text-sm text-gray-600">
                    <span>{formatCurrency(0)}</span>
                    <span className="font-medium">{goalData.progress.toFixed(1)}% completato</span>
                    <span>{formatCurrency(goalData.target)}</span>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Risparmiato</p>
                        <p className="text-xl font-bold text-gray-900">
                          {formatCurrency(goalData.current)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Target className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Rimanente</p>
                        <p className="text-xl font-bold text-gray-900">
                          {formatCurrency(goalData.remaining)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <DollarSign className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Al giorno</p>
                        <p className="text-xl font-bold text-gray-900">
                          {goalData.daysLeft > 0 ? formatCurrency(goalData.remaining / goalData.daysLeft) : formatCurrency(0)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button 
                    onClick={() => setShowSetGoalModal(true)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Edit2 className="w-5 h-5 mr-2" />
                    Imposta obiettivo
                  </button>
                  <button 
                    onClick={() => setShowDeleteGoalModal(true)}
                    className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg border border-gray-300 transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="w-5 h-5 mr-2" />
                    Cancella obiettivo
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Set Goal Modal */}
      {showSetGoalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                {goalData ? 'Modifica obiettivo' : 'Imposta nuovo obiettivo'}
              </h3>
              <button 
                onClick={() => setShowSetGoalModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="goal-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome obiettivo *
                </label>
                <input
                  type="text"
                  id="goal-name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Es: Seconda casa"
                  value={goalForm.name}
                  onChange={(e) => setGoalForm({...goalForm, name: e.target.value})}
                />
              </div>
              
              <div>
                <label htmlFor="goal-amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Importo obiettivo *
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">€</span>
                  </div>
                  <input
                    type="number"
                    id="goal-amount"
                    className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    value={goalForm.target}
                    onChange={(e) => setGoalForm({...goalForm, target: parseFloat(e.target.value) || 0})}
                    step="1000"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="goal-deadline" className="block text-sm font-medium text-gray-700 mb-1">
                  Data obiettivo *
                </label>
                <input
                  type="date"
                  id="goal-deadline"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={goalForm.deadline}
                  onChange={(e) => setGoalForm({...goalForm, deadline: e.target.value})}
                />
              </div>

              <div>
                <label htmlFor="goal-current" className="block text-sm font-medium text-gray-700 mb-1">
                  Importo già risparmiato
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">€</span>
                  </div>
                  <input
                    type="number"
                    id="goal-current"
                    className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    value={goalForm.current}
                    onChange={(e) => setGoalForm({...goalForm, current: parseFloat(e.target.value) || 0})}
                    step="1000"
                  />
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowSetGoalModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Annulla
              </button>
              <button
                onClick={handleSetGoal}
                disabled={!goalForm.name || !goalForm.target || !goalForm.deadline}
                className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
                  goalForm.name && goalForm.target && goalForm.deadline ? 
                  'bg-blue-600 hover:bg-blue-700' : 
                  'bg-blue-400 cursor-not-allowed'
                }`}
              >
                {goalData ? 'Salva modifiche' : 'Conferma obiettivo'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Goal Modal */}
      {showDeleteGoalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Cancella obiettivo</h3>
              <button 
                onClick={() => setShowDeleteGoalModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-red-100 rounded-full mb-4">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  Sei sicuro di voler cancellare questo obiettivo?
                </h4>
                <p className="text-gray-600 mb-4">
                  Tutti i dati associati a questo obiettivo verranno eliminati permanentemente.
                </p>
                <div className="bg-red-50 p-4 rounded-lg w-full">
                  <p className="text-red-600 font-medium">{goalForm.name}</p>
                  <p className="text-red-600">{formatCurrency(goalForm.target)}</p>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteGoalModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Annulla
              </button>
              <button
                onClick={handleDeleteGoal}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
              >
                Conferma cancellazione
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Statistiche dettagliate</h3>
              <button 
                onClick={() => setShowStatsModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-900 mb-3">Progresso nel tempo</h4>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <PieChart className="w-16 h-16 text-gray-400" />
                  <span className="ml-2 text-gray-500">Grafico di progresso</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">Contributi mensili</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Gennaio 2025</span>
                      <span className="text-sm font-medium">€12,450</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Febbraio 2025</span>
                      <span className="text-sm font-medium">€10,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Marzo 2025</span>
                      <span className="text-sm font-medium">€15,780</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Aprile 2025</span>
                      <span className="text-sm font-medium">€18,300</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">Fonti di contributo</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Risparmi personali</span>
                      <span className="text-sm font-medium">€387,040</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Investimenti</span>
                      <span className="text-sm font-medium">€120,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Bonus</span>
                      <span className="text-sm font-medium">€80,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowStatsModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Dashboard;