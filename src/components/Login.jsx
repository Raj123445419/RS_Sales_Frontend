import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Lock, Mail, ArrowRight, AlertTriangle } from 'lucide-react';

export default function Login() {
  const [identifier, setIdentifier] = useState(''); // Email અથવા Username
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('shopkeeper'); // shopkeeper / salesman / admin
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      // Django ના users API પરથી ડેટા ફેચ કરવો
      const response = await fetch('http://127.0.0.1:8000/api/v1/users/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to connect to backend server');
      }

      const usersList = await response.json();

      // યુઝરનેમ અથવા ઈમેલ અને સિલેક્ટ કરેલો રોલ ડેટાબેઝમાં મેચ કરવો
      const matchedUser = usersList.find(
        (u) => 
          (u.email === identifier || u.username === identifier) && 
          u.role === role
      );

      if (!matchedUser) {
        if (role === 'admin') {
          setErrorMessage('You are not in admin list or data');
        } else {
          setErrorMessage(`Invalid credentials or you are not registered as a ${role}.`);
        }
        setIsLoading(false);
        return;
      }

      // Successful Login: Save user details in localStorage
      const userDataToStore = {
        id: matchedUser.id,
        username: matchedUser.username || identifier,
        email: matchedUser.email || identifier,
        role: matchedUser.role || role
      };

      localStorage.setItem('shopzee_user', JSON.stringify(userDataToStore));
      
      alert(`Successfully logged in as ${role.charAt(0).toUpperCase() + role.slice(1)}!`);
      navigate('/');

    } catch (error) {
      console.error(error);
      setErrorMessage('Backend server error. Please ensure Django is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-gray-900 flex flex-col justify-between">
      
      {/* Top Logo Header - Responsive */}
      <div className="p-6">
        <Link to="/" className="inline-flex items-center space-x-2">
          <ShoppingBag className="h-8 w-8 text-indigo-400" />
          <span className="text-2xl font-bold text-white tracking-wider">
            Shop<span className="text-indigo-400 hidden sm:inline">Zee</span>
          </span>
        </Link>
      </div>

      {/* Login Card Section */}
      <div className="flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 border border-gray-100 transform transition-all">
          
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
            <p className="text-gray-500 text-sm mt-2">Login to manage your orders, ledger & deliveries</p>
          </div>

          {/* Danger Error Message Box */}
          {errorMessage && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-start space-x-3 transition-all">
              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <div className="text-sm font-medium text-red-800">
                {errorMessage}
              </div>
            </div>
          )}

          {/* Role Selector Tabs */}
          <div className="grid grid-cols-3 gap-2 bg-gray-100 p-1.5 rounded-xl mb-6 text-sm font-medium">
            <button
              type="button"
              onClick={() => { setRole('shopkeeper'); setErrorMessage(''); }}
              className={`py-2 rounded-lg transition-all ${role === 'shopkeeper' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Shopkeeper
            </button>
            <button
              type="button"
              onClick={() => { setRole('salesman'); setErrorMessage(''); }}
              className={`py-2 rounded-lg transition-all ${role === 'salesman' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Salesman
            </button>
            <button
              type="button"
              onClick={() => { setRole('admin'); setErrorMessage(''); }}
              className={`py-2 rounded-lg transition-all ${role === 'admin' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email / Username</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail className="h-5 w-5" />
                </span>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter your email or username"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-sm transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock className="h-5 w-5" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-sm transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-indigo-500/30 transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <span>{isLoading ? 'Verifying...' : `Sign In as ${role.charAt(0).toUpperCase() + role.slice(1)}`}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-gray-500">
        <p>&copy; 2026 ShopZee. All rights reserved.</p>
      </footer>

    </div>
  );
}