import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart, ArrowRight, Phone, Mail, LogOut, Menu, X, User, Handshake,
  Store, CalendarCheck, Truck, Globe, Utensils, Building2, Headphones,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import logoImg from '../assets/rs-logo.png';
import product from '../assets/product.png';
import coco from '../assets/2.png';
import pepsi from '../assets/3.png';
import sprite from '../assets/4.png';
import fanta from '../assets/5.png';
import nescafe from '../assets/6.png';
import bisleri from '../assets/7.png';
import botels from '../assets/8.png';
import coffee from '../assets/9.png';
import water from '../assets/10.png';
import co from '../assets/11.png';
import pep from '../assets/13.png';
import bis from '../assets/14.png';
import drink from '../assets/15.png';
import or from '../assets/16.png';
import late from '../assets/17.png';
import mocha from '../assets/18.png';
import bisl from '../assets/19.png';
import beans from '../assets/20.png';

export default function products() {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
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

  // Small Screen Scroll function
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const products = [
    {
      id: 1,
      category: 'Carbonated',
      name: 'Coco Cola',
      sizes: '250ml - 500ml - 1L',
      image: co, 
    },
    {
      id: 2,
      category: 'Coffee',
      name: 'Nescafe',
      sizes: '250ml - 500ml - 1L',
      image: coffee,
    },
    {
      id: 3,
      category: 'Carbonated',
      name: 'Pepsi',
      sizes: '250ml - 500ml - 1L',
      image: pep,
    },
{
      id: 4,
      category: 'Water',
      name: 'Bisleri',
      sizes: '250ml - 500ml - 1L',
      image: bis,
    
    
    },
  ];

  // ફિલ્ટર કરેલી પ્રોડક્ટ્સ
  const filteredProducts = activeTab === 'All' 
    ? products 
    : products.filter(item => item.category === activeTab);

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

      {/* BRAND LOGOS BAR */}
      <div className="w-full h-auto min-h-[120px] sm:h-[100px] bg-[#E4C495]/90 backdrop-blur-sm px-4 py-4 sm:py-0 flex items-center justify-center overflow-hidden pointer-events-auto">
        <div className="max-w-7xl w-full flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-between gap-4 sm:gap-6 opacity-90">
          <div className="h-[80px] sm:h-[110px] flex items-center justify-center">
            <img src={coco} alt="Coca-Cola" className="h-full w-auto object-contain transform transition-transform duration-300 hover:scale-110" />
          </div>
          <div className="h-[40px] sm:h-[50px] flex items-center justify-center">
            <img src={pepsi} alt="Pepsi" className="h-full w-auto object-contain transform transition-transform duration-300 hover:scale-110" />
          </div>
          <div className="h-[35px] sm:h-[50px] flex items-center justify-center">
            <img src={sprite} alt="Sprite" className="h-full w-auto object-contain transform transition-transform duration-300 hover:scale-110" />
          </div>
          <div className="h-[60px] sm:h-[80px] flex items-center justify-center">
            <img src={fanta} alt="Fanta" className="h-full w-auto object-contain transform transition-transform duration-300 hover:scale-110" />
          </div>
          <div className="h-[60px] sm:h-[80px] flex items-center justify-center">
            <img src={nescafe} alt="Nescafe" className="h-full w-auto object-contain transform transition-transform duration-300 hover:scale-110" />
          </div>
          <div className="h-[50px] sm:h-[60px] flex items-center justify-center">
            <img src={bisleri} alt="Bisleri" className="h-full w-auto object-contain transform transition-transform duration-300 hover:scale-110" />
          </div>
        </div>
      </div>

      {/* OUR CATEGORIES SECTION */}
      <section className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F0E6] relative">
        <div className="max-w-7xl mx-auto text-center">
          
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-gray-600 uppercase mb-2">
            Our Categories
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-12 sm:mb-16">
            Explore Our Range
          </h2>

          <div className="relative">
            <button 
              onClick={() => scroll('left')}
              className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 -ml-2 z-10 bg-white/80 hover:bg-black hover:text-white text-gray-900 p-2 rounded-full shadow-md border border-gray-300 transition-all duration-300"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button 
              onClick={() => scroll('right')}
              className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 -mr-2 z-10 bg-white/80 hover:bg-black hover:text-white text-gray-900 p-2 rounded-full shadow-md border border-gray-300 transition-all duration-300"
              aria-label="Scroll Right"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div 
              ref={scrollRef}
              className="flex md:grid grid-cols-1 md:grid-cols-[4fr_3fr_3fr] gap-6 sm:gap-8 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-none px-2 sm:px-0 pb-4 md:pb-0 items-stretch"
            >
              
              {/* Card 1: Botels */}
              <div className="min-w-[85%] sm:min-w-[70%] md:min-w-0 snap-center bg-[#F5F0E6] border border-gray-400/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between items-start text-left relative shadow-sm hover:shadow-md transition duration-300 group">
                <div className="w-full h-36 sm:h-44 flex items-center justify-center my-4">
                  <img 
                    src={botels} 
                    alt="Carbonated Drinks" 
                    className="max-h-50 max-w-full object-contain transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <div className="w-full flex items-end justify-between mt-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                    Carbonated<br />Drinks
                  </h3>
                  <Link 
                    to="/products" 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-400 flex items-center justify-center text-gray-900 bg-transparent hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              {/* Card 2: Coffee */}
              <div className="min-w-[85%] sm:min-w-[70%] md:min-w-0 snap-center bg-[#F5F0E6] border border-gray-400/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between items-start text-left relative shadow-sm hover:shadow-md transition duration-300 group">
                <div className="w-full h-36 sm:h-44 flex items-center justify-center my-7">
                  <img 
                    src={coffee} 
                    alt="Coffee" 
                    className="max-h-50 max-w-full object-contain transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <div className="w-full flex items-end justify-between mt-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                    Coffee
                  </h3>
                  <Link 
                    to="/products" 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-400 flex items-center justify-center text-gray-900 bg-transparent hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              {/* Card 3: Water */}
              <div className="min-w-[85%] sm:min-w-[70%] md:min-w-0 snap-center bg-[#F5F0E6] border border-gray-400/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between items-start text-left relative shadow-sm hover:shadow-md transition duration-300 group">
                <div className="w-full h-36 sm:h-44 flex items-center justify-center">
                  <img 
                    src={water} 
                    alt="Packaged Water" 
                    className="max-h-65 max-w-full object-contain m-auto transition-transform duration-500 mr-9 group-hover:scale-105" 
                  />
                </div>
                <div className="w-full flex items-end justify-between mt-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                    Packaged<br />Water
                  </h3>
                  <Link 
                    to="/products" 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-400 flex items-center justify-center text-gray-900 bg-transparent hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F0E6]">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 sm:mb-14 gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Featured Products
            </h2>

            <div className="flex flex-wrap items-center gap-2 bg-[#D8D3CB] p-1.5 rounded-full">
              {['All', 'Carbonated', 'Coffee', 'Water'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-[#E5383B] text-white shadow-sm'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((productItem) => (
              <div 
                key={productItem.id}
                className="bg-[#FFFFFF99] border border-gray-300/80 rounded-3xl p-4 sm:p-6 flex flex-row sm:flex-col justify-between items-center sm:items-stretch shadow-sm hover:shadow-md transition duration-300 group gap-4"
              >
                {/* મોબાઈલમાં ઈમેજ ડાબી બાજુ (order-1) રહેશે અને સાઈઝ નાની થઈ જશે */}
                <div className="w-28 sm:w-full h-32 sm:h-52 bg-[#E5E1D8] rounded-2xl flex items-center justify-center p-3 overflow-hidden relative order-1 flex-shrink-0">
                  {productItem.isBackground ? (
                    <div 
                      className="w-full h-full bg-center bg-contain bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${productItem.image})` }}
                    />
                  ) : (
                    <img 
                      src={productItem.image} 
                      alt={productItem.name} 
                      style={productItem.imgStyle || {}}
                      className="max-h-full max-w-full object-contain m-auto transition-transform duration-500 group-hover:scale-105" 
                    />
                  )}
                </div>

                {/* મોબાઈલમાં ડિટેલ્સ જમણી બાજુ (order-2) રહેશે */}
                <div className="flex-1 order-2 text-left">
                  <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1">
                    {productItem.name}
                  </h3>
                  <p className="text-[11px] sm:text-sm text-gray-600 mb-3 sm:mb-6">
                    {productItem.sizes}
                  </p>

                  <Link 
                    to="/products" 
                    className="flex items-center justify-between text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-[#E5383B] transition-colors duration-300 pt-2 sm:pt-3 border-t border-gray-300/60"
                  >
                    <span>View Product</span>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-gray-400 flex items-center justify-center group-hover:bg-gray-900 group-hover:border-gray-900 group-hover:text-white transition-all duration-300">
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

{/*  */}
{/*  */}
{/*  */}
<div className="w-full bg-[#F5F0E6] p-4 sm:p-6 flex justify-center">

  <div className="w-full max-w-7xl flex flex-col sm:flex-row bg-[#E4C495] rounded-3xl overflow-visible items-center relative shadow-md">


    <div className="w-full sm:w-1/2 h-[300px] sm:h-[400px] -mt-10 sm:-mt-14 sm:-mb-6 flex items-center justify-center p-2 sm:p-4">
      <img 
        src={drink}  
        alt="Carbonated Drinks"
        className="scale-x-[-1] max-h-[120%] max-w-[120%] sm:max-h-[200%] sm:max-w-[200%] object-contain filter drop-shadow-lg"
      />
    </div>

  
    <div className="w-full sm:w-1/2 p-8 sm:p-14 flex flex-col sm:mr-20 justify-center text-left">
      <p className="text-xs sm:text-sm font-semibold text-gray-800 uppercase tracking-wider mb-2">
        Carbonated Drinks
      </p>
      
      <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
        Refreshment in <br />
        <span className="text-[#D71920]">every size.</span>
      </h2>

      <p className="text-sm sm:text-base text-gray-700 mb-6 leading-relaxed">
        Explore a wide range of popular carbonated beverages from some of the world's most recognized brands.
      </p>

      <p className="text-xs sm:text-sm font-medium text-gray-900 mb-8">
        Coca-Cola <span className="mx-1.5">•</span> Pepsi <span className="mx-1.5">•</span> Fanta <span className="mx-1.5">•</span> Sprite
      </p>

      <div>
        <Link 
          to="/products" 
          className="inline-flex items-center space-x-2 bg-[#D71920] hover:bg-red-800 text-white text-sm font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300 group"
        >
          <span>View Range</span>
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </Link>
      </div>
    </div>

  </div>
</div>
{/*  */}
{/*  */}
{/* PART */}
<div className='bg-[#524646C4] h-auto lg:h-110 mt-0 mb-30 sm:mt-10 flex flex-col lg:flex-row items-center py-10 lg:py-0 gap-10 lg:gap-0'>

  <div className="p-6 sm:p-10 w-full lg:w-[40%] h-full flex items-center">
    <div className="w-full min-h-[350px] relative flex flex-col justify-center p-6 overflow-hidden rounded-xl">
      
      {/* Background Image with 1px Blur Effect */}
      <div 
        className="absolute inset-0 bg-contain bg-center bg-no-repeat filter blur-[1px] scale-105 pointer-events-none"
        style={{ backgroundImage: `url(${beans})` }}
      ></div>

      {/* Content Container (Text remains completely clear and sharp) */}
      <div className="relative z-10 ml-2 sm:ml-6 lg:ml-10">
        <h2 className="text-3xl sm:text-5xl font-black text-[#E4C495] tracking-tight mb-3 drop-shadow-md font-sans">
          NESCAFÉ
        </h2>
        <p className="text-sm sm:text-base text-[#f3ede2] mb-8 leading-relaxed font-normal max-w-[320px] drop-shadow">
          Classic instant coffee with a rich, bold and aromatic taste.
        </p>
        <div>
          <Link 
            to="/products" 
            className="inline-flex items-center space-x-3 bg-[#e31b23] hover:bg-red-700 text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 group"
          >
            <span>View More</span>
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="h-3 w-3 text-white" />
            </div>
          </Link>
        </div>
      </div>

    </div>
  </div>

  {/* Right Section: Three Product Cards */}
  <div className="w-full lg:w-[60%] grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-center px-4 sm:px-10 lg:px-4 lg:pr-10">
    
    {/* Card 1: Original */}
    <div 
      className="rounded-2xl p-4 flex flex-col justify-between items-center text-left mx-auto w-full max-w-[220px] h-[270px]"
      style={{ 
        backgroundColor: '#E4DFD5', 
        boxShadow: '0 15px 30px -5px #76544380' 
      }}
    >
      <div className="w-full h-36 flex items-center justify-center mb-2">
        <img src={or} alt="Original" className="max-h-[145px] object-contain filter drop-shadow-[0_10px_10px_rgba(0,0,0,1)]" />
      </div>
      <div className="w-full">
        <p className="text-[10px] text-zinc-600 uppercase font-semibold tracking-wider">Nescafe</p>
        <h3 className="text-base font-bold text-zinc-900 mb-0.5">Original</h3>
        <p className="text-[11px] text-zinc-700 leading-tight">Rich & classic coffee</p>
      </div>
    </div>

    {/* Card 2: Latte */}
    <div 
      className="rounded-2xl p-4 flex flex-col justify-between items-center text-left mx-auto w-full max-w-[220px] h-[270px]"
      style={{ 
        backgroundColor: '#E4DFD5', 
        boxShadow: '0 15px 30px -5px #76544380' 
      }}
    >
      <div className="w-full h-36 flex items-center justify-center mb-2">
        <img src={late} alt="Latte" className="max-h-[145px] object-contain filter drop-shadow-[0_10px_10px_rgba(0,0,0,1)]" />
      </div>
      <div className="w-full">
        <p className="text-[10px] text-zinc-600 uppercase font-semibold tracking-wider">Nescafe</p>
        <h3 className="text-base font-bold text-zinc-900 mb-0.5">Latte</h3>
        <p className="text-[11px] text-zinc-700 leading-tight">Smooth & creamy coffee</p>
      </div>
    </div>

    {/* Card 3: Mocha (Colspan 2 on mobile/tablet so it centers automatically, and col-span-1 on lg desktop) */}
    <div 
      className="col-span-2 lg:col-span-1 rounded-2xl p-4 flex flex-col justify-between items-center text-left mx-auto w-full max-w-[220px] h-[270px]"
      style={{ 
        backgroundColor: '#E4DFD5', 
        boxShadow: '0 15px 30px -5px #76544380' 
      }}
    >
      <div className="w-full h-36 flex items-center justify-center mb-2">
        <img src={mocha} alt="Mocha" className="max-h-[145px] object-contain filter drop-shadow-[0_10px_10px_rgba(0,0,0,1)]" />
      </div>
      <div className="w-full">
        <p className="text-[10px] text-zinc-600 uppercase font-semibold tracking-wider">Nescafe</p>
        <h3 className="text-base font-bold text-zinc-900 mb-0.5">Mocha</h3>
        <p className="text-[11px] text-zinc-700 leading-tight">Coffee with rich chocolate</p>
      </div>
    </div>

  </div>

</div>
{/*  */}
{/*  */}
{/* PART */}





<div className="w-full bg-[#EFECE6] py-10 pl-4 sm:pl-8 lg:pl-16 pr-0 flex items-center justify-between overflow-hidden font-sans">
  <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
    
    {/* Left Section: Headings and Paragraph */}
    <div className="w-full lg:w-[32%] flex flex-col justify-center text-left px-4 lg:px-0">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#C91C1C] tracking-tight leading-[1.05] mb-4">
        LET'S GET <br />
        YOUR <br />
        PRODUCTS <br />
        MOVING.
      </h1>
      <p className="text-xs sm:text-sm text-[#4A453F] font-medium leading-relaxed max-w-[280px]">
        Looking for a reliable beverage partner? <br />
        Let's connect and grow together.
      </p>
    </div>

    {/* Right Section: Attached to right edge, rounded left side, square right side */}
    <div className="w-full lg:w-[68%] bg-[#DCD6CC] rounded-l-[40px] sm:rounded-l-[60px] rounded-r-none p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 relative shadow-sm">
      
      {/* Group of Bisleri Bottles Image */}
      <div className="w-full lg:w-[55%] flex items-center justify-center">
        <img 
          src={bisl} 
          alt="Bisleri Products" 
          className="w-full max-w-[420px] h-auto object-contain filter drop-shadow-md" 
        />
      </div>

      {/* Right Content: Exact Right-Aligned Text matching the reference image */}
      <div className="w-full lg:w-[45%] flex flex-col items-end text-right">
        <h2 className="text-2xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight mb-7 whitespace-nowrap">
          Water for <span className="text-[#C91C1C]">Every Need.</span>
        </h2>
        
        {/* Sizes matching the image (Right Aligned with dashes) */}
        <div className="text-[11px] sm:text-xs font-bold text-[#333333] tracking-wider mb-2 flex items-center space-x-1.5 justify-end">
          <span>250ml</span>
          <span className="text-zinc-500">-</span>
          <span>500ml</span>
          <span className="text-zinc-500">-</span>
          <span>1L</span>
          <span className="text-zinc-500">-</span>
          <span>2L</span>
        </div>

        {/* Description matching the image (Right Aligned) */}
        <p className="text-[11px] sm:text-xs text-[#555555] font-normal leading-relaxed mb-6 max-w-[260px] text-right">
          Clean, convenient hydration for every occasion, available in multiple pack sizes.
        </p>

        {/* Arrow Button Link (Right Aligned) */}
        <div className="flex justify-end w-full">
          <Link 
            to="/products" 
            className="w-9 h-9 rounded-full border border-[#333333] flex items-center justify-center hover:bg-[#333333] hover:text-white transition-all duration-300 group"
          >
            <ArrowRight className="h-4 w-4 text-[#333333] group-hover:text-white transition-colors" />
          </Link>
        </div>
      </div>

    </div>

  </div>
</div>
{/*  */}
{/*  */}
{/*  */}






<div className="w-full bg-[#E62429] py-8 px-4 sm:px-8 shadow-xl mt-12">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left items-center text-white">
    <div className="flex items-center justify-center md:justify-start space-x-4">
      <div className="bg-white/10 p-3 rounded-full">
        <Headphones className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-xs text-white/80 font-medium">Have Any Questions?</p>
        <h4 className="text-base sm:text-lg font-bold">We’er Here to Help!</h4>
      </div>
    </div>

    <div className="flex items-center justify-center space-x-4">
      <div className="bg-white/10 p-3 rounded-full">
        <Phone className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-xs text-white/80 font-medium">Call Us Now</p>
        <a href="tel:+919999900000" className="text-base sm:text-lg font-bold hover:underline">
          +91 99999 00000
        </a>
      </div>
    </div>

    <div className="flex items-center justify-center md:justify-end space-x-4">
      <div className="bg-white/10 p-3 rounded-full">
        <Mail className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-xs text-white/80 font-medium">Email Us</p>
        <a href="mailto:ravisales@gmail.com" className="text-base sm:text-lg font-bold hover:underline">
          ravisales@gmail.com
        </a>
      </div>
    </div>
  </div>
</div>




<footer className="bg-[#1A1A1A] text-white pt-10 pb-2">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-12 gap-8 pb-6 md:pb-12 border-b border-white/10">
    
    {/* Logo & Info */}
    <div className="col-span-2 md:col-span-5 space-y-2 md:space-y-4">
      <Link to="/" className="flex items-center space-x-2 group pl-0 sm:pl-2 inline-block">
        <img src={logoImg} alt="RS Logo" className="h-14 w-14 sm:h-25 sm:w-25 object-contain transform group-hover:scale-105 transition duration-300" />
      </Link>
      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
        Beverage sales and distribution, connecting trusted brands with growing markets.
      </p>

      <div className="flex space-x-4 pt-1">
        <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition border border-white/10">
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
        </a>
        <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition border border-white/10">
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
        <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition border border-white/10">
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
      </div>
    </div>

    {/* Quick Links (Flex wrapper ઉમેર્યું જેથી મોબાઇલ પર વ્યવસ્થિત સેન્ટરમાં/અલાઈન રહે) */}
    <div className="col-span-1 md:col-span-2 space-y-2 md:space-y-3 flex flex-col items-center md:items-start text-center md:text-left">
      <div className="w-full">
        <h4 className="text-sm font-bold tracking-wider uppercase text-white mb-2">Quick Links</h4>
        <ul className="space-y-1.5 md:space-y-2 text-xs sm:text-sm text-gray-400">
          <li><button onClick={() => navigate('/')} className="hover:text-white transition">Home</button></li>
          <li><button onClick={() => navigate('/about')} className="hover:text-white transition">About Us</button></li>
          <li><button onClick={() => navigate('/products')} className="hover:text-white transition">Products</button></li>
          <li><button onClick={() => navigate('/contact')} className="hover:text-white transition">Contact Us</button></li>
        </ul>
      </div>
    </div>

    {/* Products (Flex wrapper ઉમેર્યું જેથી મોબાઇલ પર વ્યવસ્થિત સેન્ટરમાં/અલાઈન રહે) */}
    <div className="col-span-1 md:col-span-2 space-y-2 md:space-y-3 flex flex-col items-center md:items-start text-center md:text-left">
      <div className="w-full">
        <h4 className="text-sm font-bold tracking-wider uppercase text-white mb-2">Products</h4>
        <ul className="space-y-1.5 md:space-y-2 text-xs sm:text-sm text-gray-400">
          <li><button onClick={() => navigate('/products')} className="hover:text-white transition">All Products</button></li>
          <li><button onClick={() => navigate('/products')} className="hover:text-white transition">Beverage Brands</button></li>
          <li><button onClick={() => navigate('/products')} className="hover:text-white transition">Product Categories</button></li>
          <li><button onClick={() => navigate('/products')} className="hover:text-white transition">Pack Sizes</button></li>
        </ul>
      </div>
    </div>

    {/* Get in Touch */}
    <div className="col-span-2 md:col-span-3 space-y-2 md:space-y-3 text-center md:text-left">
      <h4 className="text-sm font-bold tracking-wider uppercase text-white">Get in Touch</h4>
      <div className="space-y-1.5 md:space-y-2 text-xs sm:text-sm text-gray-400">
        <p><strong className="text-white">Phone:</strong><br />+91 99999 00000</p>
        <p><strong className="text-white">Email Id:</strong><br />ravisales@gmail.com</p>
        <p><strong className="text-white">Address:</strong><br />Ahmedabad, Gujarat, India</p>
      </div>
    </div>

  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white">
    <p className="hover:text-red-400">© 2026 Ravi Sales. All Rights Reserved.</p>
    <div className="flex space-x-6 mt-3 sm:mt-0">
      <a href="#" className="text-white hover:text-red-400 transition">Privacy Policy</a>
      <span className="text-white">|</span>
      <a href="#" className="text-white hover:text-red-400 transition">Terms & Conditions</a>
    </div>
  </div>
</footer>









{/*  */}
{/*  */}
{/*  */}
    </div>
  );
}
