import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart, ArrowRight, Phone, Mail, LogOut, Menu, X, User, Handshake,
  Store, CalendarCheck, Truck, Globe, Utensils, Coffee, Building2, Headphones
} from 'lucide-react';
import logoImg from '../assets/rs-logo.png';
import heroBg from '../assets/hero-bg.png';
import coco from '../assets/coco-cola.png';
import sprite from '../assets/sprite.png';
import pepsi from '../assets/pepsi.png';
import body from '../assets/delivery-truck.png';
import fanta from '../assets/fanta.png';
import last from '../assets/delivery-man.png';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('shopzee_user');
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  const getAvatarInitials = () => {
    if (!loggedInUser) return "RS";
    const name = loggedInUser.username || loggedInUser.email || "RS";
    return name.substring(0, 2).toUpperCase();
  };

  const getUserRoleBadge = () => {
    if (!loggedInUser) return { bg: "bg-gray-600", label: "User" };
    return loggedInUser.role === 'admin'
      ? { bg: "bg-green-600", label: "Admin" }
      : { bg: "bg-blue-600", label: "Member" };
  };

  const handleLogout = () => {
    localStorage.removeItem('shopzee_user');
    setLoggedInUser(null);
    navigate('/login');
  };

  return (
    <div className="bg-[#F5F0E6] text-gray-900 relative overflow-x-hidden" style={{ fontFamily: 'Arial, sans-serif !important', fontWeight: 400, letterSpacing: 'normal' }}>
      <div className="w-full relative">
        <div
          className="w-full relative bg-cover bg-center bg-no-repeat flex flex-col justify-between"
          style={{
            backgroundImage: `url(${heroBg})`,
            aspectRatio: '1922 / 1049'
          }}
        >
          <nav className="w-full bg-black/20 backdrop-blur-sm z-50 transition-all duration-300">
            <div className="w-full px-3 sm:px-6 lg:px-8">
              <div className="flex justify-between h-19 items-center relative">
                <Link to="/" className="flex items-center space-x-2 group pl-0 sm:pl-2">
                  <img src={logoImg} alt="RS Logo" className="h-20 w-20 object-contain transform group-hover:scale-105 transition duration-300" />
                </Link>

                <div className="hidden md:flex space-x-8 font-medium text-white absolute left-1/2 transform -translate-x-1/2">
                  <Link to="/" className="hover:text-red-400 transition duration-200">Home</Link>
                  <Link to="/about" className="text-red-400 font-semibold transition hover:text-red-500">About</Link>
                  <Link to="/products" className="hover:text-red-400 transition duration-200">Products</Link>
                  <Link to="/gallery" className="hover:text-red-400 transition duration-200">Gallery</Link>
                  <Link to="/contact" className="hover:text-red-400 transition duration-200">Contact Us</Link>
                </div>

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
                      <button onClick={handleLogout} className="flex items-center space-x-1 bg-red-500 hover:bg-red-900 text-white px-3 py-2 rounded-lg font-medium transition text-sm">
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  ) : (
                    <Link to="/login" className="relative p-3 bg-white/20 rounded-full text-white hover:text-red-400 hover:bg-black/40 hover:scale-105 transition duration-300 shadow-sm" title="Login">
                      <User className="h-5 w-5" />
                    </Link>
                  )}

                  <Link to="/cart" className="relative p-3 bg-white/20 rounded-full text-white hover:text-red-400 hover:bg-black/40 hover:scale-105 transition duration-300 shadow-sm" title="Cart">
                    <ShoppingCart className="h-5 w-5" />
                  </Link>
                </div>

                <div className="flex md:hidden items-center space-x-3 pr-2">
                  <Link to="/cart" className="p-2 bg-white/20 rounded-full text-white hover:text-red-400">
                    <ShoppingCart className="h-5 w-5" />
                  </Link>
                  <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-red-400 focus:outline-none p-2 rounded-lg bg-white/20">
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </div>
              </div>
            </div>

            <div className={`md:hidden bg-black/90 backdrop-blur-md border-t border-white/10 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[450px] opacity-100 py-4 px-6' : 'max-h-0 opacity-0 py-0 px-6'}`}>
              <div className="space-y-2">
                <Link to="/" onClick={() => setIsOpen(false)} className="block text-red-400 font-semibold py-2.5 px-3 rounded-lg bg-white/10">Home</Link>
                <Link to="/about" onClick={() => setIsOpen(false)} className="block text-white hover:text-red-400 py-2.5 px-3 rounded-lg">About</Link>
                <Link to="/products" onClick={() => setIsOpen(false)} className="block text-white hover:text-red-400 py-2.5 px-3 rounded-lg">Products</Link>
                <Link to="/gallery" onClick={() => setIsOpen(false)} className="block text-white hover:text-red-400 py-2.5 px-3 rounded-lg">Gallery</Link>
                <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-white hover:text-red-400 py-2.5 px-3 rounded-lg">Contact Us</Link>

                <div className="pt-2 flex items-center space-x-3">
                  {loggedInUser ? (
                    <button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full flex items-center justify-center space-x-2 bg-red-500/20 text-white py-2.5 rounded-lg font-medium">
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  ) : (
                    <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center bg-white/20 text-white p-3 rounded-full shadow-md w-12 h-12">
                      <User className="h-5 w-5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </nav>

          <div className="max-w-7xl w-full mx-auto px-6 sm:px-12 lg:px-12 py-12 flex items-center flex-grow">
            <div className="max-w-xl space-y-6 text-center sm:text-left">
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                Delivering <br />
                <span className="text-red-600">Quality Drinks,</span> <br />
                Every Time
              </h1>
              <p className="text-slate-900 lg:text-black text-base sm:text-lg">
                Ravi Sales is a trusted distributor of quality beverages, delivering your favorite brands with reliability and excellence.
              </p>

              <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-4 pt-2">
                <Link to="/contact" className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-full shadow-lg transition duration-300 flex items-center justify-center space-x-3">
                  <span>Get a Quote</span>
                  <span className="border border-white/40 p-1.5 rounded-full flex items-center justify-center">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
                <a href="tel:+919999900000" className="bg-amber-200 hover:bg-amber-300 text-amber-900 font-bold p-3.5 rounded-full shadow-md transition duration-300 flex items-center justify-center w-14 h-14 mx-auto sm:mx-0">
                  <Phone className="h-5 w-5 text-red-600" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>














      
    </div>
  );
}