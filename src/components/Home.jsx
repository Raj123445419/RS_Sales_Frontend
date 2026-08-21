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

                <div className="hidden md:flex space-x-8 font-medium text-black absolute left-1/2 transform -translate-x-1/2">
                  <Link to="/" className="text-white font-semibold transition hover:text-black">Home</Link>
                  <Link to="/about" className="hover:text-white transition duration-200">About</Link>
                  <Link to="/products" className="hover:text-white transition duration-200">Products</Link>
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-7 relative z-20 pb-12" style={{ fontFamily: 'Arial, sans-serif !important', fontWeight: 400, letterSpacing: 'normal' }}>
        <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center space-x-3 p-2 sm:p-4 border-r border-b md:border-b-0 md:border-r border-gray-100">
            <Handshake className="h-7 w-7 sm:h-9 sm:w-9 text-black shrink-0" />
            <div className="text-left">
              <h3 className="text-xl sm:text-3xl font-bold text-black">10+</h3>
              <p className="text-xs sm:text-sm text-black font-medium mt-0.5 sm:mt-1">Years of Trust</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-2 sm:p-4 border-b md:border-b-0 md:border-r border-gray-100">
            <Store className="h-7 w-7 sm:h-9 sm:w-9 text-black shrink-0" />
            <div className="text-left">
              <h3 className="text-xl sm:text-3xl font-bold text-red-600">500+</h3>
              <p className="text-xs sm:text-sm text-black font-medium mt-0.5 sm:mt-1">Retailers Served</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-2 sm:p-4 border-r md:border-r border-gray-100">
            <CalendarCheck className="h-7 w-7 sm:h-9 sm:w-9 text-black shrink-0" />
            <div className="text-left">
              <h3 className="text-xl sm:text-3xl font-bold text-black">25+</h3>
              <p className="text-xs sm:text-sm text-black font-medium mt-0.5 sm:mt-1">Brands Available</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-2 sm:p-4">
            <User className="h-7 w-7 sm:h-9 sm:w-9 text-black shrink-0" />
            <div className="text-left">
              <h3 className="text-xl sm:text-3xl font-bold text-red-600">100%</h3>
              <p className="text-xs sm:text-sm text-black font-medium mt-0.5 sm:mt-1">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" style={{ fontFamily: 'Arial, sans-serif' }}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider mb-1">
              Our Product Range
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-black leading-tight">
              Beverages for <br />
              <span className="text-red-600">Every Need</span>
            </h2>
          </div>

          <button
            className="self-start md:self-auto flex items-center text-red-600 space-x-5 border-2 border-black px-7 py-1.5 rounded-full text-sm font-bold hover:bg-red-600 hover:text-white transition-all duration-300"
            onClick={() => navigate('/products')}
          >
            <span>View All Products</span>
            <span className="border border-red/40 p-1.5 rounded-full flex items-center justify-center">
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-[#E8B4AC] rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-between border border-black/10 shadow-sm">
            <div className="relative w-full h-60 sm:h-52 flex items-center justify-center my-2">
              <div className="absolute w-32 h-32 sm:w-36 sm:h-36 bg-[#E62429] rounded-full"></div>
              <img
                src={coco}
                alt="Coco Cola"
                style={{ height: '190px', width: 'auto', maxWidth: 'none' }}
                className="relative h-47 sm:h-44 object-contain drop-shadow-xl hover:-translate-y-2 transition-transform duration-300 z-10"
              />
            </div>
            <div className="text-center mt-4 w-full">
              <h3 className="text-base sm:text-lg font-bold text-black mb-3">Coco Cola</h3>
              <button onClick={() => navigate('/products')} className="w-full py-2 bg-[#E62429] text-white text-xs sm:text-sm font-bold rounded-lg shadow hover:bg-red-700 transition-colors">
                shop
              </button>
            </div>
          </div>

          <div className="bg-[#C5D8B6] rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-between border border-black/10 shadow-sm">
            <div className="relative w-full h-60 sm:h-52 flex items-center justify-center my-2">
              <div className="absolute w-32 h-32 sm:w-36 sm:h-36 bg-[#2B8A3E] rounded-full"></div>
              <img
                src={sprite}
                alt="Sprite"
                style={{ height: '205px', width: 'auto', maxWidth: 'none' }}
                className="relative h-56 object-contain drop-shadow-xl hover:-translate-y-2 transition-transform duration-300 z-10"
              />
            </div>
            <div className="text-center mt-4 w-full">
              <h3 className="text-base sm:text-lg font-bold text-black mb-3">Sprite</h3>
              <button onClick={() => navigate('/products')} className="w-full py-2 bg-[#2B8A3E] text-white text-xs sm:text-sm font-bold rounded-lg shadow hover:bg-green-700 transition-colors">
                shop
              </button>
            </div>
          </div>

          <div className="bg-[#CBC3E3] rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-between border border-black/10 shadow-sm">
            <div className="relative w-full h-60 sm:h-52 flex items-center justify-center my-2">
              <div className="absolute w-32 h-32 sm:w-36 sm:h-36 bg-[#3B30B5] rounded-full"></div>
              <img
                src={pepsi}
                alt="Pepsi"
                style={{ height: '190px', width: 'auto', maxWidth: 'none' }}
                className="relative h-56 sm:h-44 object-contain drop-shadow-xl hover:-translate-y-2 transition-transform duration-300 z-10"
              />
            </div>
            <div className="text-center mt-4 w-full">
              <h3 className="text-base sm:text-lg font-bold text-black mb-3">Pepsi</h3>
              <button onClick={() => navigate('/products')} className="w-full py-2 bg-[#3B30B5] text-white text-xs sm:text-sm font-bold rounded-lg shadow hover:bg-indigo-800 transition-colors">
                shop
              </button>
            </div>
          </div>

          <div className="bg-[#F3D2B3] rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-between border border-black/10 shadow-sm">
            <div className="relative w-full h-60 sm:h-52 flex items-center justify-center my-2">
              <div className="absolute w-32 h-32 sm:w-36 sm:h-36 bg-[#EC6608] rounded-full"></div>
              <img
                src={fanta}
                alt="Fanta"
                style={{ height: '190px', width: 'auto', maxWidth: 'none' }}
                className="relative h-56 sm:h-44 object-contain drop-shadow-xl hover:-translate-y-3 transition-transform duration-400 z-10"
              />
            </div>
            <div className="text-center mt-4 w-full">
              <h3 className="text-base sm:text-lg font-bold text-black mb-3">Fanta</h3>
              <button onClick={() => navigate('/products')} className="w-full py-2 bg-[#EC6608] text-white text-xs sm:text-sm font-bold rounded-lg shadow hover:bg-orange-600 transition-colors">
                shop
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border border-gray-100">
          <div className="space-y-4">
            <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider">
              What we do
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black leading-tight">
              From Beverage Brands to <br />
              <span className="">the Market.</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed pt-2">
              Ravi Sales helps beverage brands reach the right markets by managing sales, distribution and business relationships. We connect products with retailers and businesses, helping create a smoother path from brand to customer.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-[#A48355BD] hover:bg-[#e2dccf] transition-all rounded-2xl p-4 sm:p-5 flex items-center space-x-5 shadow-sm h-auto sm:h-28 overflow-hidden">
              <div className="bg-white/80 p-3.5 rounded-xl shadow-sm text-black shrink-0">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-bold text-black leading-tight">Sales</h3>
                <p className="text-xs sm:text-sm text-gray-700 mt-1">
                  We help beverage products reach the right customers and business partners through focused sales support.
                </p>
              </div>
            </div>

            <div className="bg-[#A48355BD] hover:bg-[#e2dccf] transition-all rounded-2xl p-4 sm:p-5 flex items-center space-x-5 shadow-sm h-auto sm:h-28 overflow-hidden">
              <div className="bg-white/80 p-3.5 rounded-xl shadow-sm text-black shrink-0">
                <Truck className="h-6 w-6" />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-bold text-black leading-tight">Distribution</h3>
                <p className="text-xs sm:text-sm text-gray-700 mt-1">
                  We help move products efficiently across the market, supporting reliable availability for retailers and businesses.
                </p>
              </div>
            </div>

            <div className="bg-[#A48355BD] hover:bg-[#e2dccf] transition-all rounded-2xl p-4 sm:p-5 flex items-center space-x-5 shadow-sm h-auto sm:h-28 overflow-hidden">
              <div className="bg-white/80 p-3.5 rounded-xl shadow-sm text-black shrink-0">
                <Globe className="h-6 w-6" />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-bold text-black leading-tight">Market Reach</h3>
                <p className="text-xs sm:text-sm text-gray-700 mt-1">
                  We build connection between beverage brands and businesses to expand product availability and market presence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img
              src={body}
              alt="Delivery Van"
              className="w-full max-w-lg object-contain drop-shadow-2xl rounded-3xl"
            />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">
                Why Choose Us
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black leading-tight">
                Your Growth is <span className="text-red-600 decoration-2">Our Priority</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-1 border-l-2 border-black/20 pl-4">
                <h4 className="text-sm font-bold text-black">01 — Diverse Portfolio</h4>
                <p className="text-xs text-gray-600">Multiple Brands. Multiple Choices.</p>
              </div>
              <div className="space-y-1 border-l-2 border-black/20 pl-4">
                <h4 className="text-sm font-bold text-black">02 — Reliable Supply</h4>
                <p className="text-xs text-gray-600">Products Where They Need to Be.</p>
              </div>
              <div className="space-y-1 border-l-2 border-black/20 pl-4">
                <h4 className="text-sm font-bold text-black">03 — Strong Relationships</h4>
                <p className="text-xs text-gray-600">Partnerships That Matter.</p>
              </div>
              <div className="space-y-1 border-l-2 border-black/20 pl-4">
                <h4 className="text-sm font-bold text-black">04 — Market-Focused Approach</h4>
                <p className="text-xs text-gray-600">Understanding the Market.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">
                Who we serve
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black leading-tight">
                Serving Businesses <br />
                <span className="text-red-600">Across Industries</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 pt-4">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-[0_0_20px_rgba(239,68,68,0.4)] border-2 border-red-500 flex items-center justify-center hover:scale-105 transition-all duration-300">
                  <Store className="h-9 w-9 text-gray-500" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-black mt-3 text-center">Retail Stores</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-[0_0_20px_rgba(239,68,68,0.4)] border-2 border-red-500 flex items-center justify-center hover:scale-105 transition-all duration-300">
                  <ShoppingCart className="h-9 w-9 text-gray-500" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-black mt-3 text-center">Super Market</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-[0_0_20px_rgba(239,68,68,0.4)] border-2 border-red-500 flex items-center justify-center hover:scale-105 transition-all duration-300">
                  <Utensils className="h-9 w-9 text-gray-500" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-black mt-3 text-center">Restaurants</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-[0_0_20px_rgba(239,68,68,0.4)] border-2 border-red-500 flex items-center justify-center hover:scale-105 transition-all duration-300">
                  <Coffee className="h-9 w-9 text-gray-500" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-black mt-3 text-center">Cafes & Hotels</span>
              </div>

              <div className="flex flex-col items-center col-span-2 sm:col-span-1 sm:col-auto justify-self-center sm:justify-self-auto w-full sm:w-auto">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-[0_0_20px_rgba(239,68,68,0.4)] border-2 border-red-500 flex items-center justify-center hover:scale-105 transition-all duration-300 mx-auto">
                  <Building2 className="h-9 w-9 text-gray-500" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-black mt-3 text-center">Institutions</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#E62429] text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4 z-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Let’s Grow <br />
                <span className="text-amber-200">Together</span>
              </h2>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                Join hands with Ravi Sales and take your business to the next level.
              </p>
            </div>

            <div className="flex items-center space-x-4 pt-8 z-10">
              <button
                onClick={() => navigate('/contact')}
                className="bg-white text-black hover:bg-amber-100 font-bold px-6 py-3 rounded-full shadow-lg transition flex items-center space-x-2 text-sm"
              >
                <span>Get a Quote</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="tel:+919999900000"
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition flex items-center justify-center w-12 h-12 shadow"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider">
              About Ravi Sales
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black leading-tight">
              A Sales Partner Built for the <br />
              <span className="text-red-600">Beverage Market.</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed pt-2">
              Ravi Sales is focused on helping beverage brands and businesses connect through efficient sales, distribution and market support. Our approach is simple — build strong partnerships, deliver reliably and help products reach more customers.
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src={last}
              alt="Beverage Delivery Partner"
              className="w-full max-w-md object-contain drop-shadow-xl rounded-3xl"
            />
          </div>
        </div>
      </section>












      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div className="bg-[#E4C495] border border-black/10 rounded-3xl p-8 sm:p-12 text-center shadow-sm relative overflow-hidden">
    <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">
      LET'S WORK TOGETHER
    </p>
    <h2 className="text-2xl sm:text-4xl font-extrabold text-black mb-3">
      Ready to Grow Your Beverage Business?
    </h2>
    <p className="text-xs sm:text-sm text-gray-700 max-w-xl mx-auto">
      Whether you’re a beverage brand looking to expand or a business looking for reliable product supply, let’s start a conversation.
    </p>
  </div>
</section>


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








  </div>
  );
}