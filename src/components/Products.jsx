import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart, ArrowRight, Phone, Mail, LogOut, Menu, X, User, Handshake,
  Store, CalendarCheck, Truck, Globe, Utensils, Building2, Headphones, ArrowUpRight
} from 'lucide-react';
import logoImg from '../assets/rs-logo.png';
import product from '../assets/product.png';
import coco from '../assets/2.png';
import pepsi from '../assets/3.png';
import sprite from '../assets/4.png';
import fanta from '../assets/5.png';
import nescafe from '../assets/6.png';
import bisleri from '../assets/7.png';

// નવી કેટેગરી ઇમેજ ઇમ્પોર્ટ
import botels from '../assets/8.png';
import coffee from '../assets/9.png';
import water from '../assets/10.png';

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
          className="w-full relative h-[400px] sm:h-[700px] lg:h-[790px] bg-cover bg-center lg:bg-bottom bg-no-repeat flex flex-col justify-between"
          style={{
            backgroundImage: `url(${product})`,
            aspectRatio: '1922 / 1049'
          }}
        >
          <nav className="w-full bg-black/20 backdrop-blur-sm z-50 transition-all duration-300">
            <div className="w-full px-3 sm:px-6 lg:px-8">
              <div className="flex justify-between h-19 items-center relative">
                <Link to="/" className="flex items-center space-x-2 group pl-0 sm:pl-2">
                  <img src={logoImg} alt="RS Logo" className="h-20 w-20 object-contain transform group-hover:scale-105 transition duration-300" />
                </Link>

                <div className="hidden md:flex space-x-8 font-medium text-black absolute left-1/2 transform -translate-x-1/2">
                  <Link to="/" className="hover:text-white transition duration-200">Home</Link>
                  <Link to="/about" className="hover:text-white transition duration-200">About</Link>
                  <Link to="/products" className="text-white font-semibold transition hover:text-black">Products</Link>
                  <Link to="/gallery" className="hover:text-white transition duration-200">Gallery</Link>
                  <Link to="/contact" className="hover:text-white transition duration-200">Contact Us</Link>
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
                <Link to="/" onClick={() => setIsOpen(false)} className="block text-white hover:text-red-400 py-2.5 px-3 rounded-lg">Home</Link>
                <Link to="/about" onClick={() => setIsOpen(false)} className="block text-white hover:text-red-400 py-2.5 px-3 rounded-lg">About</Link>
                <Link to="/products" onClick={() => setIsOpen(false)} className="block text-red-400 font-semibold py-2.5 px-3 rounded-lg bg-white/10">Products</Link>
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

          {/* Hero Section Content (Text) */}
          <div className="absolute inset-0 flex flex-col space-y-50 justify-between pt-30 sm:pt-40 pointer-events-none">
            <div className="text-center px-4 pointer-events-auto">
              <p className="text-xs sm:text-xl font-medium tracking-widest text-gray-700 uppercase">
                Carbonated <span className="mx-1.5">•</span> Coffee <span className="mx-1.5">•</span> Package Water
              </p>
              
              <h1 className="font-black text-gray-900 tracking-tight leading-none pt-2" style={{ fontSize: '32px' }}>
                <span className='text-xl sm:text-4xl flex flex-col'>ONE RANGE.</span>
                <span className="text-[#D71920] text-xl sm:text-4xl block mt-1 sm:mt-2">EVERY SIZE.</span>
              </h1>

              <p className="text-xs sm:text-base font-semibold text-gray-700 pt-2">
                Explore Our Range
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BRAND LOGOS BAR (Responsive & Fixed Height concept with wrap support) */}
      <div className="w-full h-auto min-h-[120px] sm:h-[100px] bg-[#E4C495]/90 backdrop-blur-sm px-4 py-4 sm:py-0 flex items-center justify-center overflow-hidden pointer-events-auto">
        <div className="max-w-7xl w-full flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-between gap-4 sm:gap-6 opacity-90">
          
          <div className="h-[40px] sm:h-[60px] flex items-center justify-center">
            <img src={coco} alt="Coca-Cola" className="h-full w-auto object-contain" />
          </div>
          
          <div className="h-[35px] sm:h-[50px] flex items-center justify-center">
            <img src={pepsi} alt="Pepsi" className="h-full w-auto object-contain" />
          </div>
          
          <div className="h-[35px] sm:h-[50px] flex items-center justify-center">
            <img src={sprite} alt="Sprite" className="h-full w-auto object-contain" />
          </div>
          
          <div className="h-[35px] sm:h-[50px] flex items-center justify-center">
            <img src={fanta} alt="Fanta" className="h-full w-auto object-contain" />
          </div>
          
          <div className="h-[40px] sm:h-[60px] flex items-center justify-center">
            <img src={nescafe} alt="Nescafe" className="h-full w-auto object-contain" />
          </div>
          
          <div className="h-[35px] sm:h-[50px] flex items-center justify-center">
            <img src={bisleri} alt="Bisleri" className="h-full w-auto object-contain" />
          </div>

        </div>
      </div>

      {/* OUR CATEGORIES SECTION */}
      <section className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F0E6]">
        <div className="max-w-7xl mx-auto text-center">
          
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-gray-600 uppercase mb-2">
            Our Categories
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-12 sm:mb-16">
            Explore Our Range
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            
            {/* Card 1: Botels */}
            <div className="bg-[#F5F0E6] border border-gray-400/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between items-start text-left relative shadow-sm hover:shadow-md transition duration-300 group">
              <div className="w-full h-48 sm:h-56 flex items-center justify-center my-4">
                <img 
                  src={botels} 
                  alt="Carbonated Drinks" 
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              <div className="w-full flex items-end justify-between mt-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                  Carbonated<br />Drinks
                </h3>
                <Link 
                  to="/products" 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-400 flex items-center justify-center text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition duration-300"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Card 2: Coffee */}
            <div className="bg-[#F5F0E6] border border-gray-400/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between items-start text-left relative shadow-sm hover:shadow-md transition duration-300 group">
              <div className="w-full h-48 sm:h-56 flex items-center justify-center my-4">
                <img 
                  src={coffee} 
                  alt="Coffee" 
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              <div className="w-full flex items-end justify-between mt-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                  Coffee
                </h3>
                <Link 
                  to="/products" 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-400 flex items-center justify-center text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition duration-300"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Card 3: Water */}
            <div className="bg-[#F5F0E6] border border-gray-400/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between items-start text-left relative shadow-sm hover:shadow-md transition duration-300 group">
              <div className="w-full h-48 sm:h-56 flex items-center justify-center my-4">
                <img 
                  src={water} 
                  alt="Packaged Water" 
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              <div className="w-full flex items-end justify-between mt-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                  Packaged<br />Water
                </h3>
                <Link 
                  to="/products" 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-400 flex items-center justify-center text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition duration-300"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}