import React, { useState } from 'react';
import { 
  TrendingUp, 
  CreditCard, 
  Wallet, 
  Target, 
  Bell, 
  BarChart3,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import PageLayout from '../components/PageLayout'; // Import the layout wrapper

const Resoconti = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  // Dati per il resoconto mensile
  const monthlyData = {
    period: "01/05/2025 - 31/05/2025",
    transactions: [
      { type: 'income', date: '31/05/2025', amount: 31.00 },
      { type: 'expense', date: '30/05/2025', amount: 400.23 },
      { type: 'income', date: '26/05/2025', amount: 54.50 },
      { type: 'income', date: '25/05/2025', amount: 12.00 },
      { type: 'expense', date: '23/05/2025', amount: 123.00 },
      { type: 'expense', date: '20/05/2025', amount: 121.30 },
      { type: 'income', date: '15/05/2025', amount: 450.70 },
      { type: 'income', date: '6/05/2025', amount: 2040.20 },
      { type: 'expense', date: '4/05/2025', amount: 134.99 },
      { type: 'expense', date: '2/05/2025', amount: 20.99 }
    ],
    total: 1787.89,
    trend: 'scarso',
    trendColor: 'text-orange-500'
  };

  // Dati per il resoconto annuale
  const yearlyData = {
    period: "01/01/2024 - 31/12/2024",
    transactions: [
      { type: 'income', date: '31/12/2024', amount: 150.00 },
      { type: 'expense', date: '27/12/2024', amount: 45.39 },
      { type: 'income', date: '15/12/2024', amount: 249.50 },
      { type: 'income', date: '3/12/2024', amount: 26.50 },
      { type: 'expense', date: '29/11/2024', amount: 28.50 },
      { type: 'expense', date: '20/11/2024', amount: 43.90 },
      { type: 'income', date: '11/11/2024', amount: 1900.43 },
      { type: 'income', date: '29/10/2024', amount: 40.50 },
      { type: 'income', date: '3/10/2024', amount: 1520.10 },
      { type: 'expense', date: '28/9/2024', amount: 425.90 },
      { type: 'expense', date: '18/9/2024', amount: 240.25 },
      { type: 'income', date: '7/9/2024', amount: 2609.50 },
      { type: 'expense', date: '31/8/2024', amount: 8.40 },
      { type: 'expense', date: '17/18/2024', amount: 44.50 },
      { type: 'income', date: '5/7/2024', amount: 1990.99 },
      { type: 'income', date: '3/6/2024', amount: 4000.00 },
      { type: 'expense', date: '25/5/2024', amount: 823.19 },
      { type: 'income', date: '2/2/2024', amount: 23000.00 }
    ],
    total: 33827.49,
    trend: 'molto buono',
    trendColor: 'text-green-500'
  };

  const currentData = selectedPeriod === 'monthly' ? monthlyData : yearlyData;

  return (
    <PageLayout currentPage="resoconti">

      <div className="min-h-screen bg-gray-50 flex">

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Resoconti</h1>
            
            {/* Period Selector */}
            <div className="mb-8">
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedPeriod('monthly')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedPeriod === 'monthly'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Mensile
                </button>
                <button
                  onClick={() => setSelectedPeriod('yearly')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedPeriod === 'yearly'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Annuale
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Resoconto Mensile */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Resoconto {selectedPeriod === 'monthly' ? 'mensile' : 'annuale'}
                  </h2>
                </div>
                
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-1">Data inizio:</div>
                  <div className="font-medium text-gray-900">
                    {selectedPeriod === 'monthly' ? '01/05/2025' : '01/01/2024'}
                  </div>
                  <div className="text-sm text-gray-500 mb-1 mt-3">Data fine:</div>
                  <div className="font-medium text-gray-900">
                    {selectedPeriod === 'monthly' ? '31/05/2025' : '31/12/2024'}
                  </div>
                </div>

                {/* Transactions Table */}
                <div className="space-y-1 mb-6">
                  <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-500 pb-2 border-b border-gray-100">
                    <div>Tipo</div>
                    <div>Data</div>
                    <div>Importo</div>
                  </div>
                  
                  {currentData.transactions.map((transaction, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 py-3 text-sm border-b border-gray-50 last:border-b-0">
                      <div className="flex items-center">
                        {transaction.type === 'income' ? (
                          <ArrowUpRight className="w-4 h-4 text-green-500 mr-2" />
                        ) : (
                          <ArrowDownLeft className="w-4 h-4 text-red-500 mr-2" />
                        )}
                      </div>
                      <div className="text-gray-700">{transaction.date}</div>
                      <div className={`font-medium ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        € {transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">Totale:</span>
                    <span className="font-bold text-lg text-green-600">
                      + € {currentData.total.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Andamento:</span>
                    <span className={`text-sm font-medium ${currentData.trendColor} flex items-center`}>
                      {currentData.trend}
                      <div className={`w-2 h-2 rounded-full ml-2 ${
                        currentData.trend === 'molto buono' ? 'bg-green-500' : 'bg-orange-500'
                      }`}></div>
                    </span>
                  </div>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Riepilogo {selectedPeriod === 'monthly' ? 'Mensile' : 'Annuale'}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <ArrowUpRight className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Entrate</span>
                    </div>
                    <span className="font-semibold text-green-600">
                      € {currentData.transactions
                        .filter(t => t.type === 'income')
                        .reduce((sum, t) => sum + t.amount, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center">
                      <ArrowDownLeft className="w-5 h-5 text-red-600 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Uscite</span>
                    </div>
                    <span className="font-semibold text-red-600">
                      € {currentData.transactions
                        .filter(t => t.type === 'expense')
                        .reduce((sum, t) => sum + t.amount, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Bilancio Netto</span>
                    <span className="font-bold text-blue-600">
                      € {currentData.total.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* Trend Indicator */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tendenza periodo:</span>
                    <div className="flex items-center">
                      <span className={`text-sm font-semibold ${currentData.trendColor}`}>
                        {currentData.trend.toUpperCase()}
                      </span>
                      <div className={`w-3 h-3 rounded-full ml-2 ${
                        currentData.trend === 'molto buono' ? 'bg-green-500' : 'bg-orange-500'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Resoconti;