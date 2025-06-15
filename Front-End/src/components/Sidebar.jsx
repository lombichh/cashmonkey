import React from 'react';
import { 
  Home,
  Users,
  Shield,
  BarChart3,
  Bell,
  Settings,
  TrendingUp, 
  CreditCard, 
  Wallet, 
  Target, 
  ArrowUpRight,
  ArrowDownLeft,
  LogOut
} from 'lucide-react';

const Sidebar = ({ currentPage }) => {
  const sidebarItems = [
    { id: 'movimenti', label: 'Movimenti', icon: TrendingUp, path: '/movimenti' },
    { id: 'metodi-pagamento', label: 'Metodi pagamento', icon: CreditCard, path: '/metodi' },
    { id: 'saldo', label: 'Saldo', icon: Wallet, path: '/saldo' },
    { id: 'obiettivo-economico', label: 'Obiettivo economico', icon: Target, path: '/obiettivo' },
    { id: 'promemoria', label: 'Promemoria', icon: Bell, path: '/promemoria' },
    { id: 'resoconti', label: 'Resoconti', icon: BarChart3, path: '/resoconti' },
  ].map(item => ({
    ...item,
    active: currentPage === item.id
  }));

  const handleNavigation = (path) => {
    // For client-side routing (if using React Router)
    // window.history.pushState({}, '', path);
    
    // For simple page navigation (change based on your setup)
    window.location.href = path;
  };

  const handleLogout = async () => {
    try {
      // Call the logout API endpoint
      const response = await fetch('/api/FiltroRichieste/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include session cookies
      });

      if (response.ok) {
        // Clear any local storage/session storage if you're using them
        localStorage.clear();
        sessionStorage.clear();
        
        // Redirect to login page
        window.location.href = '/';
      } else {
        console.error('Logout failed');
        // Still redirect to login even if API call fails
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error during logout:', error);
      // Redirect to login page even if there's an error
      window.location.href = '/';
    }
  };

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-800">CashMonkey</h1>
      </div>
      
      <nav className="mt-8 flex-1">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleNavigation(item.path)}
            className={`flex items-center px-6 py-3 text-sm font-medium cursor-pointer transition-all duration-200 ${
              item.active
                ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-700 font-semibold shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:border-r-2 hover:border-gray-300'
            }`}
          >
            <item.icon className={`w-5 h-5 mr-3 ${
              item.active ? 'text-blue-700' : 'text-gray-500'
            }`} />
            {item.label}
            {item.active && (
              <div className="bg-blue-700"></div>
            )}
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="border-t border-gray-200 p-4">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;