import React, { useState } from 'react';
import { 
  TrendingUp,
  Plus,
  Filter,
  Minus,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard, 
  Bell, 
  FileText, 
  DollarSign,
  Building,
  X
} from 'lucide-react';
import PageLayout from '../components/PageLayout';

const MovementsPage = () => {
  const [allMovements, setAllMovements] = useState([
    { id: 1, type: 'income', date: '31/05/2025', category: 'Svago', method: 'Postepay', description: 'Pagamento occasionale', amount: 31.00 },
    { id: 2, type: 'expense', date: '30/05/2025', category: 'Casa', method: 'Revolut', description: 'Spesa settimanale', amount: 400.23 },
    { id: 3, type: 'income', date: '26/05/2025', category: 'Finanza', method: 'Bonifico SEPA', description: 'Lavoro freelance', amount: 54.50 },
    { id: 4, type: 'income', date: '25/05/2025', category: 'Svago', method: 'Contanti', description: 'Regalo compleanno', amount: 12.00 },
    { id: 5, type: 'expense', date: '23/05/2025', category: 'Salute', method: 'Revolut', description: 'Visita medica', amount: 123.00 },
    { id: 6, type: 'expense', date: '20/05/2025', category: 'Trasporti', method: 'Postepay', description: 'Manutenzione bici', amount: 121.30 },
    { id: 7, type: 'income', date: '15/05/2025', category: 'Finanza', method: 'Bonifico SEPA', description: 'Progetto freelance', amount: 450.70 },
    { id: 8, type: 'income', date: '06/05/2025', category: 'Finanza', method: 'Bonifico SEPA', description: 'Stipendio', amount: 2040.20 },
    { id: 9, type: 'expense', date: '04/05/2025', category: 'Casa', method: 'Revolut', description: 'Spesa alimentare', amount: 134.99 },
    { id: 10, type: 'expense', date: '02/05/2025', category: 'Svago', method: 'Revolut', description: 'Abbonamento palestra', amount: 20.99 },
    { id: 11, type: 'income', date: '15/04/2025', category: 'Finanza', method: 'Bonifico SEPA', description: 'Stipendio aprile', amount: 2000.00 },
    { id: 12, type: 'expense', date: '12/03/2025', category: 'Salute', method: 'Contanti', description: 'Farmacia', amount: 36.20 },
    { id: 13, type: 'income', date: '28/02/2025', category: 'Svago', method: 'Contanti', description: 'Regalo compleanno zio', amount: 100.00 },
    { id: 14, type: 'expense', date: '02/01/2025', category: 'Trasporti', method: 'Postepay', description: 'Biglietto treno', amount: 67.40 },
    { id: 15, type: 'income', date: '31/12/2024', category: 'Finanza', method: 'Bonifico SEPA', description: 'Bonus fine anno', amount: 150.00 },
    { id: 16, type: 'expense', date: '27/12/2024', category: 'Svago', method: 'Contanti', description: 'Regali Natale', amount: 45.39 },
    { id: 17, type: 'income', date: '15/12/2024', category: 'Finanza', method: 'Bonifico SEPA', description: 'Lavoro', amount: 249.50 },
    { id: 18, type: 'income', date: '03/12/2024', category: 'Finanza', method: 'Revolut', description: 'Cashback app', amount: 26.50 },
    { id: 19, type: 'expense', date: '29/11/2024', category: 'Casa', method: 'Contanti', description: 'Panificio', amount: 28.50 },
    { id: 20, type: 'expense', date: '20/11/2024', category: 'Salute', method: 'Contanti', description: 'Farmacia', amount: 43.90 },
    { id: 21, type: 'income', date: '11/11/2024', category: 'Finanza', method: 'Bonifico SEPA', description: 'Stipendio', amount: 1900.43 },
    { id: 22, type: 'income', date: '29/10/2024', category: 'Finanza', method: 'Bonifico SEPA', description: 'Progetto breve', amount: 40.50 },
    { id: 23, type: 'income', date: '03/10/2024', category: 'Finanza', method: 'Bonifico SEPA', description: 'Stipendio', amount: 1520.10 },
    { id: 24, type: 'expense', date: '28/09/2024', category: 'Svago', method: 'Revolut', description: 'Hard disk', amount: 425.90 },
    { id: 25, type: 'expense', date: '18/09/2024', category: 'Casa', method: 'Contanti', description: 'Lavanderia', amount: 240.25 },
    { id: 26, type: 'income', date: '07/09/2024', category: 'Finanza', method: 'Bonifico SEPA', description: 'Stipendio', amount: 2609.50 },
    { id: 27, type: 'expense', date: '31/08/2024', category: 'Svago', method: 'Contanti', description: 'Colazione', amount: 8.40 },
    { id: 28, type: 'expense', date: '17/08/2024', category: 'Svago', method: 'Contanti', description: 'Cinema', amount: 44.50 },  // sistemata data da 17/18 a 17/08
    { id: 29, type: 'income', date: '05/07/2024', category: 'Finanza', method: 'Bonifico SEPA', description: 'Stipendio', amount: 1990.99 },
    { id: 30, type: 'income', date: '03/06/2024', category: 'Finanza', method: 'Bonifico SEPA', description: 'Bonus performance', amount: 4000.00 },
    { id: 31, type: 'expense', date: '25/05/2024', category: 'Casa', method: 'Revolut', description: 'Arredamento', amount: 823.19 },
    { id: 32, type: 'income', date: '02/02/2024', category: 'Finanza', method: 'Bonifico SEPA', description: 'Rimborso tasse', amount: 23000.00 }
  ]);

  // Helper function to parse date string to Date object
  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  };
  
  allMovements.sort((a, b) => parseDate(b.date) - parseDate(a.date));

  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [newMovement, setNewMovement] = useState({
    type: 'income',
    date: '',
    category: 'Svago',
    method: 'Postepay',
    description: '',
    amount: ''
  });
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    method: '',
    dateFrom: '',
    dateTo: ''
  });

  // Filter movements based on current filters
  const filteredMovements = allMovements.filter(movement => {
    // Filter by type
    if (filters.type && movement.type !== filters.type) return false;
    
    // Filter by category
    if (filters.category && movement.category !== filters.category) return false;
    
    // Filter by method
    if (filters.method && movement.method !== filters.method) return false;
    
    // Filter by date range
    const movementDate = parseDate(movement.date);
    const fromDate = parseDate(filters.dateFrom);
    const toDate = parseDate(filters.dateTo);
    
    if (fromDate && movementDate < fromDate) return false;
    if (toDate && movementDate > toDate) return false;
    
    return true;
  });

  // Use filtered movements for display
  const movements = filteredMovements;

  const getCategoryColor = (category) => {
    const colors = {
      'Svago': 'bg-purple-100 text-purple-800',
      'Casa': 'bg-blue-100 text-blue-800',
      'Salute': 'bg-green-100 text-green-800',
      'Finanza': 'bg-orange-100 text-orange-800',
      'Trasporti': 'bg-yellow-100 text-yellow-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const removeMovement = (id) => {
    setAllMovements(allMovements => allMovements.filter(movement => movement.id !== id));
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const handleAddMovement = () => {
    if (!newMovement.date || !newMovement.description || !newMovement.amount) return;
    
    const newId = Math.max(...allMovements.map(m => m.id), 0) + 1;
    const newMovementObj = {
      id: newId,
      type: newMovement.type,
      date: newMovement.date,
      category: newMovement.category,
      method: newMovement.method,
      description: newMovement.description,
      amount: parseFloat(newMovement.amount)
    };
    
    setAllMovements([...allMovements, newMovementObj]);
    
    setNewMovement({
      type: 'income',
      date: '',
      category: 'Svago',
      method: 'Postepay',
      description: '',
      amount: ''
    });

    allMovements.sort((a, b) => parseDate(b.date) - parseDate(a.date));

    setShowAddModal(false);
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    if (value.length <= 10) {
      let formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`;
      }
      if (formattedValue.length > 5) {
        formattedValue = `${formattedValue.slice(0, 5)}/${formattedValue.slice(5, 9)}`;
      }
      setNewMovement({...newMovement, date: formattedValue});
    }
  };

  const applyFilters = () => {
    setShowFilterModal(false);
  };

  const resetFilters = () => {
    setFilters({
      type: '',
      category: '',
      method: '',
      dateFrom: '',
      dateTo: ''
    });
  };

  const totalIncome = movements
    .filter(m => m.type === 'income')
    .reduce((sum, m) => sum + m.amount, 0);

  const totalExpenses = movements
    .filter(m => m.type === 'expense')
    .reduce((sum, m) => sum + m.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <PageLayout currentPage="movimenti">
      <div className="flex h-screen bg-gray-50">
        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">Movimenti</h2>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowFilterModal(true)}
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtri
                </button>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Aggiungi
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="p-6 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <ArrowUpRight className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Entrate</p>
                    <p className="text-2xl font-semibold text-green-600">
                      {formatAmount(totalIncome)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <ArrowDownLeft className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Uscite</p>
                    <p className="text-2xl font-semibold text-red-600">
                      {formatAmount(totalExpenses)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${balance >= 0 ? 'bg-blue-100' : 'bg-orange-100'}`}>
                    <DollarSign className={`w-6 h-6 ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Bilancio</p>
                    <p className={`text-2xl font-semibold ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                      {formatAmount(balance)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Movements Table */}
          <div className="px-6 pb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Table Header */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-1">
                    <h3 className="text-sm font-medium text-gray-700">Tipo</h3>
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-sm font-medium text-gray-700">Data</h3>
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-sm font-medium text-gray-700">Categoria</h3>
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-sm font-medium text-gray-700">Metodo</h3>
                  </div>
                  <div className="col-span-3">
                    <h3 className="text-sm font-medium text-gray-700">Descrizione</h3>
                  </div>
                  <div className="col-span-1">
                    <h3 className="text-sm font-medium text-gray-700">Importo</h3>
                  </div>
                  <div className="col-span-1">
                    <h3 className="text-sm font-medium text-gray-700">Azioni</h3>
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {movements.map((movement) => (
                  <div key={movement.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1">
                        {movement.type === 'income' ? (
                          <ArrowUpRight className="w-5 h-5 text-green-600" />
                        ) : (
                          <ArrowDownLeft className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div className="col-span-2">
                        <span className="text-sm text-gray-900">
                          {movement.date}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(movement.category)}`}>
                          {movement.category}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-sm text-gray-900">
                          {movement.method}
                        </span>
                      </div>
                      <div className="col-span-3">
                        <span className="text-sm text-gray-900">
                          {movement.description}
                        </span>
                      </div>
                      <div className="col-span-1">
                        <span className={`text-sm font-medium ${
                          movement.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {formatAmount(movement.amount)}
                        </span>
                      </div>
                      <div className="col-span-1">
                        <button
                          onClick={() => removeMovement(movement.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Rimuovi movimento"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {movements.length === 0 && (
                <div className="px-6 py-12 text-center">
                  <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nessun movimento trovato
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {filters.type || filters.category || filters.method || filters.dateFrom || filters.dateTo 
                      ? "Prova a modificare i filtri" 
                      : "Inizia aggiungendo il tuo primo movimento finanziario"}
                  </p>
                  <button 
                    onClick={() => filters.type || filters.category || filters.method || filters.dateFrom || filters.dateTo 
                      ? resetFilters() 
                      : setShowAddModal(true)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {filters.type || filters.category || filters.method || filters.dateFrom || filters.dateTo 
                      ? "Resetta filtri" 
                      : "Aggiungi movimento"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Movement Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Aggiungi movimento</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setNewMovement({...newMovement, type: 'income'})}
                    className={`flex-1 py-2 px-4 rounded-md border ${
                      newMovement.type === 'income' 
                        ? 'border-green-500 bg-green-50 text-green-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <ArrowUpRight className="inline w-4 h-4 mr-2" />
                    Entrata
                  </button>
                  <button
                    onClick={() => setNewMovement({...newMovement, type: 'expense'})}
                    className={`flex-1 py-2 px-4 rounded-md border ${
                      newMovement.type === 'expense' 
                        ? 'border-red-500 bg-red-50 text-red-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <ArrowDownLeft className="inline w-4 h-4 mr-2" />
                    Uscita
                  </button>
                </div>
              </div>
              
              <div>
                <label htmlFor="movement-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Data (GG/MM/AAAA) *
                </label>
                <input
                  type="text"
                  id="movement-date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="GG/MM/AAAA"
                  value={newMovement.date}
                  onChange={handleDateChange}
                  maxLength="10"
                />
              </div>
              
              <div>
                <label htmlFor="movement-category" className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria *
                </label>
                <select
                  id="movement-category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={newMovement.category}
                  onChange={(e) => setNewMovement({...newMovement, category: e.target.value})}
                >
                  <option value="Svago">Svago</option>
                  <option value="Casa">Casa</option>
                  <option value="Salute">Salute</option>
                  <option value="Finanza">Finanza</option>
                  <option value="Trasporti">Trasporti</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="movement-method" className="block text-sm font-medium text-gray-700 mb-1">
                  Metodo di pagamento *
                </label>
                <select
                  id="movement-method"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={newMovement.method}
                  onChange={(e) => setNewMovement({...newMovement, method: e.target.value})}
                >
                  <option value="Postepay">Postepay</option>
                  <option value="Revolut">Revolut</option>
                  <option value="Salvadanaio">Salvadanaio</option>
                  <option value="Bonifici SEPA">Bonifici SEPA</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="movement-description" className="block text-sm font-medium text-gray-700 mb-1">
                  Descrizione *
                </label>
                <input
                  type="text"
                  id="movement-description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Es: Cena al ristorante"
                  value={newMovement.description}
                  onChange={(e) => setNewMovement({...newMovement, description: e.target.value})}
                />
              </div>
              
              <div>
                <label htmlFor="movement-amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Importo (€) *
                </label>
                <input
                  type="number"
                  id="movement-amount"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                  value={newMovement.amount}
                  onChange={(e) => setNewMovement({...newMovement, amount: e.target.value})}
                  step="0.01"
                />
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
                onClick={handleAddMovement}
                disabled={!newMovement.date || !newMovement.description || !newMovement.amount}
                className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
                  newMovement.date && newMovement.description && newMovement.amount ? 
                  'bg-blue-600 hover:bg-blue-700' : 
                  'bg-blue-400 cursor-not-allowed'
                }`}
              >
                Aggiungi movimento
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Filtra movimenti</h3>
              <button 
                onClick={() => setShowFilterModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="filter-type" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo
                </label>
                <select
                  id="filter-type"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                >
                  <option value="">Tutti</option>
                  <option value="income">Entrate</option>
                  <option value="expense">Uscite</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="filter-date-from" className="block text-sm font-medium text-gray-700 mb-1">
                    Da (GG/MM/AAAA)
                  </label>
                  <input
                    type="text"
                    id="filter-date-from"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="GG/MM/AAAA"
                    value={filters.dateFrom}
                    onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                    maxLength="10"
                  />
                </div>
                <div>
                  <label htmlFor="filter-date-to" className="block text-sm font-medium text-gray-700 mb-1">
                    A (GG/MM/AAAA)
                  </label>
                  <input
                    type="text"
                    id="filter-date-to"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="GG/MM/AAAA"
                    value={filters.dateTo}
                    onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                    maxLength="10"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="filter-category" className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria
                </label>
                <select
                  id="filter-category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                >
                  <option value="">Tutte</option>
                  <option value="Svago">Svago</option>
                  <option value="Casa">Casa</option>
                  <option value="Salute">Salute</option>
                  <option value="Finanza">Finanza</option>
                  <option value="Trasporti">Trasporti</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="filter-method" className="block text-sm font-medium text-gray-700 mb-1">
                  Metodo di pagamento
                </label>
                <select
                  id="filter-method"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={filters.method}
                  onChange={(e) => setFilters({...filters, method: e.target.value})}
                >
                  <option value="">Tutti</option>
                  <option value="Postepay">Postepay</option>
                  <option value="Revolut">Revolut</option>
                  <option value="Salvadanaio">Salvadanaio</option>
                  <option value="Bonifici SEPA">Bonifici SEPA</option>
                </select>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Resetta filtri
              </button>
              <div className="space-x-3">
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Annulla
                </button>
                <button
                  onClick={applyFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Applica filtri
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default MovementsPage;