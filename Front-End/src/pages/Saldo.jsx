import React from 'react';
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

const Saldo = () => {
  const sidebarItems = [
    { icon: TrendingUp, label: 'Movimenti', active: false },
    { icon: CreditCard, label: 'Metodi pagamento', active: false },
    { icon: Wallet, label: 'Saldo', active: true },
    { icon: Target, label: 'Obiettivo economico', active: false },
    { icon: Bell, label: 'Promemoria', active: false },
    { icon: BarChart3, label: 'Resoconti', active: false }
  ];

  const saldoAttuale = 189611.78;
  const saldoIniziale = 152000.00;
  const entrate = 40175.92;
  const uscite = 2564.14;

  return (
    <PageLayout currentPage="saldo">
      <div className="min-h-screen bg-gray-50 flex">

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-lg font-medium text-gray-700 mb-6">Saldo attuale:</h1>
              
              {/* Main Balance Display */}
              <div className="flex items-center justify-between">
                <div className="text-6xl font-bold text-gray-900 tracking-tight">
                  € {saldoAttuale.toLocaleString('it-IT', { 
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2 
                  })}
                </div>
                
                {/* Balance Changes */}
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <ArrowUpRight className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-lg font-semibold text-green-600">
                      € {entrate.toLocaleString('it-IT', { 
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <ArrowDownLeft className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-lg font-semibold text-red-600">
                      € {uscite.toLocaleString('it-IT', { 
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2 
                      })}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Initial Balance */}
              <div className="mt-8">
                <span className="text-lg text-gray-600">
                  Saldo iniziale: <span className="font-semibold text-gray-900">
                    € {saldoIniziale.toLocaleString('it-IT', { 
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2 
                    })}
                  </span>
                </span>
              </div>
            </div>

            {/* Balance Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {/* Current Balance Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500">SALDO ATTUALE</h3>
                  <Wallet className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  € {saldoAttuale.toLocaleString('it-IT', { 
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2 
                  })}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Patrimonio totale disponibile
                </div>
              </div>

              {/* Total Income Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500">ENTRATE TOTALI</h3>
                  <ArrowUpRight className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-green-600">
                  € {entrate.toLocaleString('it-IT', { 
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2 
                  })}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Totale incassi dal saldo iniziale
                </div>
              </div>

              {/* Total Expenses Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500">USCITE TOTALI</h3>
                  <ArrowDownLeft className="w-5 h-5 text-red-500" />
                </div>
                <div className="text-2xl font-bold text-red-600">
                  € {uscite.toLocaleString('it-IT', { 
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2 
                  })}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Totale spese dal saldo iniziale
                </div>
              </div>
            </div>           
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Saldo;