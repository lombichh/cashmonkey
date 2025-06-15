import React, { useState } from 'react';
import { 
  Bell,
  Plus,
  Minus,
  TrendingUp,
  CreditCard, 
  FileText, 
  DollarSign,
  Home,
  BarChart3,
  Tv,
  Heart,
  Car,
  X
} from 'lucide-react';
import PageLayout from '../components/PageLayout';

const RemindersPage = () => {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      name: 'Paga rata del mutuo',
      category: 'Casa',
      dueDate: '15/07/2025',
      amount: -2500.00,
      icon: Home
    },
    {
      id: 2,
      name: 'Versa soldi nel piano d\'accumulo',
      category: 'Finanza',
      dueDate: '31/07/2025',
      amount: -300.00,
      icon: BarChart3
    },
    {
      id: 3,
      name: 'Paga abbonamento Netflix',
      category: 'Svago',
      dueDate: '01/07/2025',
      amount: -19.99,
      icon: Tv
    },
    {
      id: 4,
      name: 'Riscuoti affitto giugno',
      category: 'Svago',
      dueDate: '11/06/2025',
      amount: 1280.00,
      icon: Home
    },
    {
      id: 5,
      name: 'Paga abbonamento palestra',
      category: 'Salute',
      dueDate: '12/06/2025',
      amount: -80.00,
      icon: Heart
    },
    {
      id: 6,
      name: 'Paga visita medica',
      category: 'Salute',
      dueDate: '31/07/2025',
      amount: -50.00,
      icon: Heart
    },
    {
      id: 7,
      name: 'Rinnova assicurazione auto',
      category: 'Trasporti',
      dueDate: '15/08/2025',
      amount: -1550.00,
      icon: Car
    }
  ]);

  const parseDate = (dmy) => {
      const [day, month, year] = dmy.split("/").map(Number);
      return new Date(year, month - 1, day);
  }

  reminders.sort((a, b) => parseDate(a.dueDate) - parseDate(b.dueDate));

  const [showAddModal, setShowAddModal] = useState(false);
  const [newReminder, setNewReminder] = useState({
    name: '',
    category: 'Casa',
    dueDate: '',
    amount: '',
    icon: Home
  });

  const getCategoryColor = (category) => {
    const colors = {
      'Casa': 'bg-blue-100 text-blue-800',
      'Finanza': 'bg-orange-100 text-orange-800',
      'Svago': 'bg-purple-100 text-purple-800',
      'Salute': 'bg-green-100 text-green-800',
      'Trasporti': 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getIconForCategory = (category) => {
    const icons = {
      'Casa': Home,
      'Finanza': BarChart3,
      'Svago': Tv,
      'Salute': Heart,
      'Trasporti': Car
    };
    return icons[category] || Bell;
  };

  const removeReminder = (id) => {
    setReminders(reminders => reminders.filter(reminder => reminder.id !== id));
  };

  const formatAmount = (amount) => {
    const formatted = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(Math.abs(amount));
    
    return amount >= 0 ? `+ ${formatted}` : `- ${formatted}`;
  };

  const isOverdue = (dateString) => {
    const today = new Date();
    const dueDate = new Date(dateString.split('/').reverse().join('-'));
    return dueDate < today;
  };

  const getDaysUntilDue = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dateString.split('/').reverse().join('-'));
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleAddReminder = () => {
    if (!newReminder.name || !newReminder.dueDate || !newReminder.amount) return;
    
    const newId = Math.max(...reminders.map(r => r.id), 0) + 1;
    const amountValue = parseFloat(newReminder.amount);
    
    setReminders([...reminders, {
      id: newId,
      name: newReminder.name,
      category: newReminder.category,
      dueDate: newReminder.dueDate,
      amount: amountValue,
      icon: getIconForCategory(newReminder.category)
    }]);
    
    setNewReminder({
      name: '',
      category: 'Casa',
      dueDate: '',
      amount: '',
      icon: Home
    });

    reminders.sort((a, b) => parseDate(a.dueDate) - parseDate(b.dueDate));
    
    setShowAddModal(false);
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    if (value.length <= 10) {
      // Formattazione automatica della data nel formato GG/MM/AAAA
      let formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`;
      }
      if (formattedValue.length > 5) {
        formattedValue = `${formattedValue.slice(0, 5)}/${formattedValue.slice(5, 9)}`;
      }
      setNewReminder({...newReminder, dueDate: formattedValue});
    }
  };

  const totalAmount = reminders.reduce((sum, reminder) => sum + reminder.amount, 0);
  const upcomingReminders = reminders.filter(r => getDaysUntilDue(r.dueDate) <= 7 && getDaysUntilDue(r.dueDate) >= 0);
  const overdueReminders = reminders.filter(r => getDaysUntilDue(r.dueDate) < 0);

  return (
    <PageLayout currentPage="promemoria">
      <div className="flex h-screen bg-gray-50">

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">Promemoria</h2>
              </div>
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Aggiungi
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="p-6 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Bell className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Totale promemoria</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {reminders.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Bell className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">In scadenza (7 giorni)</p>
                    <p className="text-2xl font-semibold text-orange-600">
                      {upcomingReminders.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reminders Table */}
          <div className="px-6 pb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Table Header */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-4">
                    <h3 className="text-sm font-medium text-gray-700">Nome</h3>
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-sm font-medium text-gray-700">Categoria</h3>
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-sm font-medium text-gray-700">Scadenza</h3>
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-sm font-medium text-gray-700">Importo</h3>
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-sm font-medium text-gray-700">Azioni</h3>
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {reminders.map((reminder) => {
                  const IconComponent = reminder.icon;
                  const daysUntil = getDaysUntilDue(reminder.dueDate);
                  const isOverdueItem = daysUntil < 0;
                  const isUpcoming = daysUntil <= 7 && daysUntil >= 0;
                  
                  return (
                    <div 
                      key={reminder.id} 
                      className={`px-6 py-4 transition-colors ${
                        isOverdueItem ? 'bg-red-50 hover:bg-red-100' : 
                        isUpcoming ? 'bg-orange-50 hover:bg-orange-100' : 
                        'hover:bg-gray-50'
                      }`}
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-4 flex items-center">
                          <div className={`p-2 rounded-lg mr-3 ${
                            isOverdueItem ? 'bg-red-100' : 
                            isUpcoming ? 'bg-orange-100' : 
                            'bg-gray-100'
                          }`}>
                            <IconComponent className={`w-5 h-5 ${
                              isOverdueItem ? 'text-red-600' : 
                              isUpcoming ? 'text-orange-600' : 
                              'text-gray-600'
                            }`} />
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {reminder.name}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(reminder.category)}`}>
                            {reminder.category}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <div className="flex flex-col">
                            <span className={`text-sm ${
                              isOverdueItem ? 'text-red-600 font-medium' : 
                              isUpcoming ? 'text-orange-600 font-medium' : 
                              'text-gray-900'
                            }`}>
                              {reminder.dueDate}
                            </span>
                            {isOverdueItem && (
                              <span className="text-xs text-red-500">
                                {Math.abs(daysUntil)} giorni fa
                              </span>
                            )}
                            {isUpcoming && daysUntil > 0 && (
                              <span className="text-xs text-orange-500">
                                in {daysUntil} giorni
                              </span>
                            )}
                            {daysUntil === 0 && (
                              <span className="text-xs text-red-500 font-medium">
                                Oggi!
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-span-2">
                          <span className={`text-sm font-medium ${
                            reminder.amount >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formatAmount(reminder.amount)}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <button
                            onClick={() => removeReminder(reminder.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                            title="Rimuovi promemoria"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-end items-center">
                  <span className="text-sm font-medium text-gray-600 mr-4">
                    Totale importi:
                  </span>
                  <span className={`text-lg font-semibold ${
                    totalAmount >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatAmount(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Empty State */}
              {reminders.length === 0 && (
                <div className="px-6 py-12 text-center">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nessun promemoria impostato
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Inizia aggiungendo il tuo primo promemoria per non dimenticare pagamenti importanti
                  </p>
                  <button 
                    onClick={() => setShowAddModal(true)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Aggiungi promemoria
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Reminder Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Aggiungi promemoria</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="reminder-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome promemoria *
                </label>
                <input
                  type="text"
                  id="reminder-name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Es: Pagamento affitto"
                  value={newReminder.name}
                  onChange={(e) => setNewReminder({...newReminder, name: e.target.value})}
                />
              </div>
              
              <div>
                <label htmlFor="reminder-category" className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria *
                </label>
                <select
                  id="reminder-category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={newReminder.category}
                  onChange={(e) => setNewReminder({
                    ...newReminder, 
                    category: e.target.value,
                    icon: getIconForCategory(e.target.value)
                  })}
                >
                  <option value="Casa">Casa</option>
                  <option value="Finanza">Finanza</option>
                  <option value="Svago">Svago</option>
                  <option value="Salute">Salute</option>
                  <option value="Trasporti">Trasporti</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="reminder-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Data scadenza (GG/MM/AAAA) *
                </label>
                <input
                  type="text"
                  id="reminder-date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="GG/MM/AAAA"
                  value={newReminder.dueDate}
                  onChange={handleDateChange}
                  maxLength="10"
                />
              </div>
              
              <div>
                <label htmlFor="reminder-amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Importo (€) *
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">€</span>
                  </div>
                  <input
                    type="number"
                    id="reminder-amount"
                    className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    value={newReminder.amount}
                    onChange={(e) => setNewReminder({...newReminder, amount: e.target.value})}
                    step="0.01"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <select
                      className="h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={newReminder.amount >= 0 ? 'income' : 'expense'}
                      onChange={(e) => {
                        const currentAmount = parseFloat(newReminder.amount) || 0;
                        const newAmount = e.target.value === 'income' ? 
                          Math.abs(currentAmount) : 
                          -Math.abs(currentAmount);
                        setNewReminder({...newReminder, amount: newAmount.toString()});
                      }}
                    >
                      <option value="expense">Uscita</option>
                      <option value="income">Entrata</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Annulla
              </button>
              <button
                onClick={handleAddReminder}
                disabled={!newReminder.name || !newReminder.dueDate || !newReminder.amount}
                className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
                  newReminder.name && newReminder.dueDate && newReminder.amount ? 
                  'bg-blue-600 hover:bg-blue-700' : 
                  'bg-blue-400 cursor-not-allowed'
                }`}
              >
                Aggiungi promemoria
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default RemindersPage;