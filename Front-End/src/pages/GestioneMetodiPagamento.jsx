import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Minus, 
  TrendingUp, 
  Bell, 
  FileText, 
  DollarSign,
  Building,
  Banknote,
  X
} from 'lucide-react';
import PageLayout from '../components/PageLayout';

const PaymentMethodsPage = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, name: 'American Express', type: 'CARTACREDITO', icon: CreditCard },
    { id: 2, name: 'Revolut', type: 'CARTADEBITO', icon: CreditCard },
    { id: 3, name: 'Postepay', type: 'CARTADEBITO', icon: CreditCard },
    { id: 4, name: 'Salvadanaio', type: 'CONTANTI', icon: DollarSign },
    { id: 5, name: 'Bonifici SEPA', type: 'BONIFICO', icon: Building },
    { id: 6, name: 'Bonifici SWIFT', type: 'BONIFICO', icon: Building }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newMethod, setNewMethod] = useState({
    name: '',
    type: 'CARTACREDITO'
  });

  const getTypeColor = (type) => {
    switch (type) {
      case 'CARTACREDITO':
        return 'bg-blue-100 text-blue-800';
      case 'CARTADEBITO':
        return 'bg-green-100 text-green-800';
      case 'CONTANTI':
        return 'bg-yellow-100 text-yellow-800';
      case 'BONIFICO':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const removePaymentMethod = (id) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
  };

  const handleAddMethod = () => {
    if (!newMethod.name) return;
    
    const newId = Math.max(...paymentMethods.map(m => m.id), 0) + 1;
    let icon = CreditCard;
    
    if (newMethod.type === 'CONTANTI') icon = DollarSign;
    if (newMethod.type === 'BONIFICO') icon = Building;
    
    setPaymentMethods([...paymentMethods, {
      id: newId,
      name: newMethod.name,
      type: newMethod.type,
      icon
    }]);
    
    setNewMethod({ name: '', type: 'CARTACREDITO' });
    setShowAddModal(false);
  };

  return (
    <PageLayout currentPage="metodi-pagamento">
      <div className="flex h-screen bg-gray-50">      
        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">Metodi pagamento</h2>
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

          {/* Content */}
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Table Header */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">
                    <h3 className="text-sm font-medium text-gray-700">Nome</h3>
                  </div>
                  <div className="col-span-4">
                    <h3 className="text-sm font-medium text-gray-700">Tipo</h3>
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-sm font-medium text-gray-700">Azioni</h3>
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {paymentMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <div key={method.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-6 flex items-center">
                          <div className={`p-2 rounded-lg mr-3 ${
                            method.type === 'CARTACREDITO' ? 'bg-blue-100' :
                            method.type === 'CARTADEBITO' ? 'bg-green-100' :
                            method.type === 'CONTANTI' ? 'bg-yellow-100' :
                            'bg-purple-100'
                          }`}>
                            <IconComponent className={`w-5 h-5 ${
                              method.type === 'CARTACREDITO' ? 'text-blue-600' :
                              method.type === 'CARTADEBITO' ? 'text-green-600' :
                              method.type === 'CONTANTI' ? 'text-yellow-600' :
                              'text-purple-600'
                            }`} />
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {method.name}
                          </span>
                        </div>
                        <div className="col-span-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(method.type)}`}>
                            {method.type}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <button
                            onClick={() => removePaymentMethod(method.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                            title="Rimuovi metodo di pagamento"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Empty State */}
              {paymentMethods.length === 0 && (
                <div className="px-6 py-12 text-center">
                  <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nessun metodo di pagamento
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Inizia aggiungendo il tuo primo metodo di pagamento
                  </p>
                  <button 
                    onClick={() => setShowAddModal(true)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Aggiungi metodo
                  </button>
                </div>
              )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Carte di credito</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {paymentMethods.filter(m => m.type === 'CARTACREDITO').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CreditCard className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Carte di debito</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {paymentMethods.filter(m => m.type === 'CARTADEBITO').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Banknote className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Contanti</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {paymentMethods.filter(m => m.type === 'CONTANTI').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Building className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Bonifici</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {paymentMethods.filter(m => m.type === 'BONIFICO').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Payment Method Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Aggiungi metodo di pagamento</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="method-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome metodo
                </label>
                <input
                  type="text"
                  id="method-name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Es: Carta di credito principale"
                  value={newMethod.name}
                  onChange={(e) => setNewMethod({...newMethod, name: e.target.value})}
                />
              </div>
              
              <div>
                <label htmlFor="method-type" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo di pagamento
                </label>
                <select
                  id="method-type"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={newMethod.type}
                  onChange={(e) => setNewMethod({...newMethod, type: e.target.value})}
                >
                  <option value="CARTACREDITO">Carta di credito</option>
                  <option value="CARTADEBITO">Carta di debito</option>
                  <option value="CONTANTI">Contanti</option>
                  <option value="BONIFICO">Bonifico bancario</option>
                </select>
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
                onClick={handleAddMethod}
                disabled={!newMethod.name}
                className={`px-4 py-2 rounded-md text-sm font-medium text-white ${newMethod.name ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 cursor-not-allowed'}`}
              >
                Aggiungi metodo
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default PaymentMethodsPage;