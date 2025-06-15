import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    currency: 'EURO',
    initialBalance: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (apiError) setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError('');

    // Validation
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username è richiesto';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password è richiesta';
    }
    if (!formData.initialBalance || isNaN(formData.initialBalance)) {
      newErrors.initialBalance = 'Inserisci un saldo valido';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const currencyEnumMap = {
        EURO: 0,
        STERLINA: 1,
        DOLLARO: 2
      };

      const response = await fetch('http://localhost:5000/api/FiltroRichieste/registra-utente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          valutaRiferimento: currencyEnumMap[formData.currency],
          saldoIniziale: parseFloat(formData.initialBalance)
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Backend error response:', errorData); 
        throw new Error(errorData.message || 'Registrazione fallita');
      }

      // Registration successful - redirect to login
      navigate('/', { state: { registrationSuccess: true } });
      
    } catch (error) {
      console.error('Registration error:', error);
      setApiError(error.message || 'Errore durante la registrazione. Riprova.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Registrazione
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Benvenuto, registrati per iniziare ad usare CashMonkey.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {apiError && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {apiError}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.username ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                Valuta di riferimento
              </label>
              <div className="mt-1">
                <select
                  id="currency"
                  name="currency"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.currency}
                  onChange={handleChange}
                >
                  <option value="EURO">€ Euro</option>
                  <option value="DOLLARO">$ US Dollar</option>
                  <option value="STERLINA">£ British Pound</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="initialBalance" className="block text-sm font-medium text-gray-700">
                Saldo iniziale
              </label>
              <div className="mt-1">
                <input
                  id="initialBalance"
                  name="initialBalance"
                  type="number"
                  step="0.01"
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.initialBalance ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  value={formData.initialBalance}
                  onChange={handleChange}
                />
              </div>
              {errors.initialBalance && (
                <p className="mt-1 text-sm text-red-600">{errors.initialBalance}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isLoading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Registrazione in corso...</span>
                  </div>
                ) : (
                  'Registrati'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Hai già un account?{' '}
              <a 
                href="/" 
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Accedi
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}