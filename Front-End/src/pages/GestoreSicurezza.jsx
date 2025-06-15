import React, { useState } from 'react';
import { Unlock, FileText, ArrowRight, LogOut } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  // const navigate = useNavigate();
  
  const features = [
    {
      id: 'sblocco',
      icon: Unlock,
      title: 'Sblocco utenti',
      description: 'Rimuovi le restrizioni per gli utenti bloccati',
      color: 'blue',
      path: '/sblocco'
    },
    {
      id: 'log',
      icon: FileText,
      title: 'Log',
      description: 'Visualizza il registro delle attività',
      color: 'blue',
      path: '/log'
    }
  ];
  
  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature.id);
  };
  
  const handleContinue = () => {
    const feature = features.find(f => f.id === selectedFeature);
    if (feature) {
      // navigate(feature.path);
      window.location.href = feature.path;
    }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col relative">
      {/* Logout Button - Top Right */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 bg-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md border border-red-200 hover:border-red-300"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              admin
            </h1>
            <p className="text-xl text-gray-600">
              Scegli la funzionalità
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature.id}
                onClick={() => handleFeatureClick(feature)}
                className={`group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-blue-200 ${
                  selectedFeature === feature.id ? 'border-blue-400 shadow-lg' : 'border-transparent'
                }`}
              >
                {/* Feature Icon */}
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-blue-100 rounded-2xl group-hover:bg-blue-200 transition-colors duration-300">
                    <feature.icon className="w-12 h-12 text-blue-600" />
                  </div>
                </div>
                
                {/* Feature Content */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                {/* Hover Arrow */}
                <div className="absolute top-1/2 right-6 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-6 h-6 text-blue-600" />
                </div>
                
                {/* Selection Indicator */}
                {selectedFeature === feature.id && (
                  <div className="absolute top-4 right-4">
                    <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Continue Button */}
          {selectedFeature && (
            <div className="text-center mt-12">
              <button
                onClick={handleContinue}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors duration-300 text-lg shadow-lg hover:shadow-xl"
              >
                Continua
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </button>
            </div>
          )}
          
          {/* Footer */}
          <div className="text-center mt-16">
            <p className="text-gray-500">
              CashMonkey - Gestione Finanziaria Intelligente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;