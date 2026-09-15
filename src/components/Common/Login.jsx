import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/rs-logo.png';
import image74 from '../../assets/image 74.png';
import EyeOffIcon from '../../assets/Eye off.svg';

export default function Login() {
  const [identifier, setIdentifier] = useState(''); // Email or Username
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      // POST request મોકલીને બેકએન્ડ પાસે પાસવર્ડ વેરીફાય કરાવો
      const response = await fetch('http://127.0.0.1:8000/api/v1/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMessage(data.error || 'Failed to login. Please try again.');
        setIsLoading(false);
        return;
      }

      // 4. Save User Session (રોલ બેકએન્ડથી ઓટો-ડિટેક્ટ થઈને આવશે)
      const userDataToStore = {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        role: data.user.role
      };

      localStorage.setItem('shopzee_user', JSON.stringify(userDataToStore));
      
      // Success alert displaying who logged in
      alert(data.message); 
      navigate('/AdminDashboard');

    } catch (error) {
      console.error(error);
      setErrorMessage('Backend server error. Please ensure Django is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EDE7DD] text-gray-900 flex flex-col lg:flex-row items-stretch justify-between overflow-x-hidden select-none font-sans">
      
      {/* ================= LEFT SIDE: TAGLINE & IMAGE 74 ================= */}
      <div className="w-full lg:w-[50%] flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16 xl:p-20">
        
        <div className="pt-2 sm:pt-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
            Powering Beverage Sales.
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E50914] tracking-tight leading-tight mt-0.5">
            Connecting Every Market.
          </h2>
        </div>

        <div className="mt-20 mb-auto flex items-center justify-start">
          <img
            src={image74}
            alt="Business Partnership"
            className="w-full max-w-[460px] sm:max-w-[500px] md:max-w-[540px] lg:max-w-[560px] object-contain drop-shadow-sm select-none"
          />
        </div>
      </div>

      {/* ================= RIGHT SIDE: CURVED TAUPE CONTAINER & LOGIN CARD ================= */}
      <div className="w-full lg:w-[50%] h-70 bg-[#BFAFA0] lg:rounded-tl-[100px] xl:rounded-l-[80px] flex flex-col justify-center items-center p-6 sm:p-10 lg:p-14 xl:p-16 shadow-2xl relative min-h-[600px] lg:min-h-screen">
        
        <div className="mb-6 sm:mb-8">
          <Link to="/" className="inline-block transform hover:scale-105 transition duration-300">
            <img src={logoImg} alt="RS Logo" className="h-16 w-16 sm:h-20 sm:w-20 object-contain drop-shadow-md mx-auto" />
          </Link>
        </div>

        <div className="w-full max-w-[420px] text-left mb-5 sm:mb-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Welcome Back
          </h3>
          <p className="text-xs sm:text-sm text-gray-800 font-normal mt-1">
            Sign in to continue to your Ravi Sales account.
          </p>
        </div>

        <div className="w-full max-w-[420px] bg-amber-50 border border-[#7C7162]/60 rounded-3xl p-6 sm:p-8 shadow-sm">
          
          {errorMessage && (
            <div className="mb-4 bg-red-500/15 border border-red-500 text-red-800 text-xs p-3 rounded-xl font-medium leading-relaxed text-left">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 text-left">
               Enter Your Email
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="abc@gmail.com or username"
                className="w-full bg-[#F5F2EB] border border-gray-300/80 rounded-xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black shadow-inner transition"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 text-left">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full bg-[#F5F2EB] border border-gray-300/80 rounded-xl px-4 py-2.5 sm:py-3 pr-11 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black shadow-inner transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  <img src={EyeOffIcon} alt="Toggle Password" className={`w-5 h-5 transition opacity-70 hover:opacity-100 ${showPassword ? 'brightness-75' : ''}`} />
                </button>
              </div>
            </div>

            <div className="flex justify-start">
              <button
                type="button"
                onClick={() => alert('Please contact Ravi Sales support to reset your password.')}
                className="text-[11px] sm:text-xs text-gray-800 hover:text-[#E50914] font-medium transition cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#D71920] hover:bg-[#B9151B] text-white font-bold text-xs sm:text-sm px-9 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}