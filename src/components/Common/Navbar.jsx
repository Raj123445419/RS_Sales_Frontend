import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Menu, X, User } from 'lucide-react';

import logoImg from '../../assets/rs-logo.png';
import login from '../../assets/login.svg';
import cart from '../../assets/CartGold.svg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem('shopzee_user');
    if (user) {
      try {
        setLoggedInUser(JSON.parse(user));
      } catch (e) {
        console.error('Error parsing user from localStorage', e);
      }
    }
  }, []);

  const getAvatarInitials = () => {
    if (!loggedInUser) return "RS";
    const name = loggedInUser.username || loggedInUser.email || "RS";
    return name.substring(0, 2).toUpperCase();
  };

  const getUserRoleBadge = () => {
    if (!loggedInUser) return { bg: "bg-gray-600", label: "User" };
    return loggedInUser.role === "admin"
      ? { bg: "bg-green-600", label: "Admin" }
      : loggedInUser.role === "salesman"
        ? { bg: "bg-blue-600", label: "Salesman" }
        : { bg: "bg-purple-600", label: "Shopkeeper" };
  };

  const handleLogout = () => {
    localStorage.removeItem('shopzee_user');
    setLoggedInUser(null);
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products', matches: ['/products', '/Cocacola', '/cocacola'] },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isLinkActive = (item) => {
    if (item.matches) {
      return item.matches.some(m => location.pathname.toLowerCase() === m.toLowerCase());
    }
    return location.pathname === item.path;
  };

  return (
    <nav className="w-full bg-[#161616] backdrop-blur-sm z-50 transition-all duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-19 items-center relative">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group pl-0 sm:pl-2">
            <img
              src={logoImg}
              alt="RS Logo"
              className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 font-medium text-black absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((item) => {
              const active = isLinkActive(item);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`transition duration-200 ${
                    active
                      ? 'text-[#FEC26C] font-semibold'
                      : 'text-[#B2B2B2] hover:text-[#FEC26C]'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Actions (User / Login & Cart) */}
          <div className="hidden md:flex items-center space-x-4 pr-0 sm:pr-2">
            {loggedInUser ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-white/20 px-3 py-1.5 rounded-full shadow-inner border border-white/10">
                  <div className="h-8 w-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs shadow">
                    {getAvatarInitials()}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-white leading-tight truncate max-w-[90px]">
                      {loggedInUser.username || loggedInUser.email}
                    </span>
                    <span className={`text-[9px] font-extrabold text-white px-1.5 py-0.2 rounded w-fit ${getUserRoleBadge().bg}`}>
                      {getUserRoleBadge().label}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-red-500 hover:bg-red-900 text-white px-3 py-2 rounded-lg font-medium transition text-sm cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="relative rounded-full hover:scale-105 transition duration-300 shadow-sm"
                title="Login"
              >
                <img src={login} alt="Login" className="w-[35px] h-[35px]" />
              </Link>
            )}

            <Link
              to="/products"
              className="relative p-3 hover:scale-105 transition duration-300 shadow-sm"
              title="Cart"
            >
              <img src={cart} alt="Cart" className="w-[40px] h-[30px]" />
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center space-x-3 pr-2">
            <Link to="/products" className="p-2">
              <img src={cart} alt="Cart" className="h-7 w-7" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-red-400 focus:outline-none p-2 rounded-lg bg-white/20 cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden bg-black/90 backdrop-blur-md border-t border-white/10 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[450px] opacity-100 py-4 px-6' : 'max-h-0 opacity-0 py-0 px-6'
        }`}
      >
        <div className="space-y-2 text-left">
          {navLinks.map((item) => {
            const active = isLinkActive(item);
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2.5 px-3 rounded-lg text-sm ${
                  active
                    ? 'text-[#FEC26C] font-semibold bg-white/10'
                    : 'text-white hover:text-red-400'
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          <div className="pt-2 flex items-center space-x-3">
            {loggedInUser ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 bg-red-500/20 text-white py-2.5 rounded-lg font-medium text-sm"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center bg-white/20 text-white p-3 rounded-full shadow-md w-12 h-12"
              >
                <User className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
