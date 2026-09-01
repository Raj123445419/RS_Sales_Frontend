import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, User } from 'lucide-react';
import logoImg from '../assets/rs-logo.png';
import abbanner from '../assets/about banner.png';
import mid from '../assets/about mid.png';
import last from '../assets/about last.png';
import login from '../assets/login.svg';
import cart from '../assets/CartGold.svg';
import HeadPhon from '../assets/HeadPhon.svg';
import Phonecallwhite from '../assets/PhoneCallWhite.svg';
import mailoutline from '../assets/MailWhite.svg';
import instagram from '../assets/instagram.svg';
import facebook from '../assets/facebook.svg';
import Vector from '../assets/Vector.svg';
import Arrowrightcircle from '../assets/ArrowRightCircleWhite.svg';
import Phonecall from '../assets/PhoneCallBlack.svg';
import connectcontacts from '../assets/connectcontacts.svg';
import planlight from '../assets/planlight.svg';
import boxlinear from '../assets/boxlinear.svg';
import lighttruck from '../assets/DeliveryTruckBlack.svg';

export default function About() {
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
    <div className="bg-[#F5F0E6] text-gray-900 relative overflow-x-hidden min-h-screen" style={{ fontFamily: 'Arial, sans-serif !important', fontWeight: 400, letterSpacing: 'normal' }}>
      
      {/* ================= HERO & HEADER BANNER ================= */}
      <div className="w-full relative">
        <div
          className="w-full relative bg-cover bg-center bg-no-repeat flex flex-col justify-between min-h-[560px] sm:min-h-[640px] md:min-h-[700px] lg:min-h-[780px]"
          style={{
            backgroundImage: `url(${abbanner})`,
          }}
        >
          {/* Navbar */}
          <nav className="w-full bg-[#161616] backdrop-blur-sm z-50 transition-all duration-300">
            <div className="w-full px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-19 items-center relative">
                <Link to="/" className="flex items-center space-x-2 group pl-0 sm:pl-2">
                  <img src={logoImg} alt="RS Logo" className="h-16 w-16 sm:h-20 sm:w-20 object-contain transform group-hover:scale-105 transition duration-300" />
                </Link>

                <div className="hidden md:flex space-x-8 font-medium text-black absolute left-1/2 transform -translate-x-1/2">
                  <Link to="/" className="hover:text-[#FEC26C] text-[#B2B2B2] transition duration-200">Home</Link>
                  <Link to="/about" className="text-[#FEC26C] font-semibold transition hover:text-[#B2B2B2]">About</Link>
                  <Link to="/products" className="hover:text-[#FEC26C] text-[#B2B2B2] transition duration-200">Products</Link>
                  <Link to="/gallery" className="hover:text-[#FEC26C] text-[#B2B2B2] transition duration-200">Gallery</Link>
                  <Link to="/contact" className="hover:text-[#FEC26C] text-[#B2B2B2] transition duration-200">Contact Us</Link>
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
                      <button onClick={handleLogout} className="flex items-center space-x-1 bg-red-500 hover:bg-red-900 text-white px-3 py-2 rounded-lg font-medium transition text-sm cursor-pointer">
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
                    to="/cart"
                    className="relative p-3 hover:scale-105 transition duration-300 shadow-sm"
                    title="Cart"
                  >
                    <img src={cart} alt="Cart" className="w-[40px] h-[30px]" />
                  </Link>
                </div>

                <div className="flex md:hidden items-center space-x-3 pr-2">
                  <Link to="/cart" className="p-2">
                    <img src={cart} alt="Cart" className="h-7 w-7" />
                  </Link>
                  <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-red-400 focus:outline-none p-2 rounded-lg bg-white/20 cursor-pointer">
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </div>
              </div>
            </div>

            <div className={`md:hidden bg-black/90 backdrop-blur-md border-t border-white/10 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[450px] opacity-100 py-4 px-6' : 'max-h-0 opacity-0 py-0 px-6'}`}>
              <div className="space-y-2">
                <Link to="/" onClick={() => setIsOpen(false)} className="block text-white hover:text-red-400 py-2.5 px-3 rounded-lg">Home</Link>
                <Link to="/about" onClick={() => setIsOpen(false)} className="block text-[#FEC26C] font-semibold py-2.5 px-3 rounded-lg bg-white/10">About</Link>
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

          {/* Hero Content */}
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16 md:py-20 flex items-center flex-grow">
            <div className="max-w-2xl space-y-5 sm:space-y-6 text-center sm:text-left w-full">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-gray-600 uppercase">
                About Ravi Sales
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                Connecting Beverage Brands <br className="hidden sm:block" />
                <span className="text-[#E62429]">With Growing Markets.</span>
              </h1>
              <p className="text-xs sm:text-base text-gray-700 max-w-xl mx-auto sm:mx-0 leading-relaxed font-medium">
                Ravi Sales is a beverage sales and distribution agency focused on connecting trusted beverage brands with retailers, businesses, and markets through reliable sales and distribution.
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
                <Link to="/contact" className="bg-[#E62429] hover:bg-red-700 text-white font-bold py-3 px-6 sm:px-8 rounded-full shadow-lg transition duration-300 flex items-center justify-between space-x-4">
                  <span>Get a Quote</span>
                  <img src={Arrowrightcircle} className="h-6 w-6 sm:h-7 sm:w-7 text-white" alt="arrow" />
                </Link>
                <a href="tel:+919999900000" className="bg-[#FEC26C] hover:bg-amber-300 text-amber-900 p-3 sm:p-3.5 rounded-full shadow transition duration-300 flex items-center justify-center" title="Call Us">
                  <img src={Phonecall} className="h-5 w-5 sm:h-6 sm:w-6" alt="call" />
                </a>
              </div>

              {/* Statistics Counters */}
              <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-6 border-t border-gray-300/80 max-w-md mx-auto sm:mx-0">
                <div className="text-center sm:text-left border-r border-gray-300/80 pr-2 sm:pr-4 flex flex-col items-center sm:items-start justify-center">
                  <h3 className="text-xl sm:text-3xl font-black text-gray-900">10+</h3>
                  <p className="text-[10px] sm:text-xs text-gray-600 font-semibold">Brands</p>
                </div>
                <div className="text-center sm:text-left border-r border-gray-300/80 pr-2 sm:pr-4 flex flex-col items-center sm:items-start justify-center">
                  <h3 className="text-xl sm:text-3xl font-black text-gray-900">50+</h3>
                  <p className="text-[10px] sm:text-xs text-gray-600 font-semibold">Products</p>
                </div>
                <div className="text-center sm:text-left flex flex-col items-center sm:items-start justify-center">
                  <h3 className="text-xl sm:text-3xl font-black text-gray-900">100+</h3>
                  <p className="text-[10px] sm:text-xs text-gray-600 font-semibold">Retail Partners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= WHO WE ARE SECTION ================= */}
      <section className="bg-[#EFECE6] py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-10 sm:space-y-12">
          <div className="space-y-3">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-gray-500 uppercase">Who We Are</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 max-w-3xl mx-auto leading-tight">
              A Reliable Partner in Beverage Sales & Distribution.
            </h2>
          </div>

          {/* 3 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-[#E4C495] hover:bg-[#D9C4A3] transition-all duration-300 rounded-2xl p-6 sm:p-8 text-center shadow-sm flex flex-col justify-between w-full">
              <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                Ravi Sales works across the beverage market to connect products with businesses and customers. We focus on creating reliable connections between beverage brands and markets.
              </p>
            </div>

            <div className="bg-[#E4C495] hover:bg-[#D9C4A3] transition-all duration-300 rounded-2xl p-6 sm:p-8 text-center shadow-sm flex flex-col justify-between w-full">
              <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                With a diverse range of products and pack sizes, we make beverage products more accessible while supporting the sales and distribution needs of our valued business partners.
              </p>
            </div>

            <div className="bg-[#E4C495] hover:bg-[#D9C4A3] transition-all duration-300 rounded-2xl p-6 sm:p-8 text-center shadow-sm flex flex-col justify-between w-full">
              <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                Our approach is built around dependable service, strong relationships, and a clear understanding of market requirements. We work to create lasting value for every business partnership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT WE DO & APPROACH & WHY US ================= */}
      <div className="bg-[#E9E1D4] text-gray-900 py-10 sm:py-16 overflow-x-hidden">
        
        {/* 1. What We Do: Card with Image */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-[#F6F3EE] rounded-3xl sm:rounded-[40px] shadow-md p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Text Content */}
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <span className="text-xs sm:text-sm font-bold tracking-widest text-gray-500 uppercase">
                    What We Do
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mt-2 leading-tight">
                    More Than <span className="text-[#E62429]">Moving Products.</span>
                  </h2>
                </div>

                <div className="space-y-4 text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">Sales</h4>
                    <p className="text-gray-600">We support beverage brands by helping their products reach the right businesses and market opportunities through focused sales efforts.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">Distribution</h4>
                    <p className="text-gray-600">We help ensure products move efficiently through the market, supporting reliable availability for retailers and business partners.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">Market Reach</h4>
                    <p className="text-gray-600">We build connections between beverage brands and businesses, helping products expand their presence across different markets.</p>
                  </div>
                </div>
              </div>

              {/* Right Illustration */}
              <div className="flex justify-center items-center">
                <img 
                  src={mid} 
                  alt="Moving Products Illustration" 
                  className="w-full max-w-xs sm:max-w-sm lg:max-w-md object-contain max-h-[360px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Our Approach Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-10 sm:space-y-12 mt-12 sm:mt-16">
          <div>
            <span className="text-xs sm:text-sm font-bold tracking-widest text-gray-500 uppercase">
              Our Approach
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mt-2 leading-tight">
              Simple Principles. <span className="text-[#E62429]">Strong Partnerships.</span>
            </h2>
          </div>

          {/* 4 Approach Grid Items (Sequential Order) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 text-left">
            {/* Item 01 */}
            <div className="bg-[#F6F3EE] sm:bg-transparent rounded-2xl p-4 sm:p-2 space-y-2">
              <span className="text-black font-extrabold text-xl sm:text-2xl block">01 — Reliability</span>
              <h3 className="font-bold text-black text-sm sm:text-base">We Value Consistency</h3>
              <p className="text-xs sm:text-sm font-normal text-gray-700 leading-relaxed">
                Reliable service and dependable product availability are at the heart of the way we work.
              </p>
            </div>

            {/* Item 02 */}
            <div className="bg-[#F6F3EE] sm:bg-transparent rounded-2xl p-4 sm:p-2 space-y-2">
              <span className="text-black font-extrabold text-xl sm:text-2xl block">02 — Relationships</span>
              <h3 className="font-bold text-black text-sm sm:text-base">We Build Partnerships</h3>
              <p className="text-xs sm:text-sm font-normal text-gray-700 leading-relaxed">
                We believe long-term relationships create stronger opportunities for brands and businesses.
              </p>
            </div>

            {/* Item 03 */}
            <div className="bg-[#F6F3EE] sm:bg-transparent rounded-2xl p-4 sm:p-2 space-y-2">
              <span className="text-black font-extrabold text-xl sm:text-2xl block">03 — Market Understanding</span>
              <h3 className="font-bold text-black text-sm sm:text-base">We Know the Market</h3>
              <p className="text-xs sm:text-sm font-normal text-gray-700 leading-relaxed">
                Understanding customer and business requirements helps us connect products with the right opportunities.
              </p>
            </div>

            {/* Item 04 */}
            <div className="bg-[#F6F3EE] sm:bg-transparent rounded-2xl p-4 sm:p-2 space-y-2">
              <span className="text-black font-extrabold text-xl sm:text-2xl block">04 — Growth</span>
              <h3 className="font-bold text-black text-sm sm:text-base">We Think Long Term</h3>
              <p className="text-xs sm:text-sm font-normal text-gray-700 leading-relaxed">
                Our focus is not just on selling products, but on creating sustainable growth for the businesses we work with.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Why Ravi Sales Section */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-[#F6F3EE] rounded-3xl sm:rounded-[40px] shadow-sm space-y-8 sm:space-y-10 mt-12 sm:mt-16">
          <div className="text-center sm:text-left">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-gray-500 uppercase">
              Why Ravi Sales
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mt-2">
              Built Around Your Market.
            </h2>
          </div>

          {/* 4 Red Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#D9534F] hover:bg-[#C9302C] text-white transition-all duration-300 rounded-3xl p-6 sm:p-8 min-h-[240px] sm:min-h-[260px] text-center shadow-md flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-base sm:text-lg mb-3 leading-snug">
                  Diverse Product Portfolio
                </h3>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                  A wide range of beverage products and pack sizes gives businesses more choices to meet different customer needs.
                </p>
              </div>
            </div>

            <div className="bg-[#D9534F] hover:bg-[#C9302C] text-white transition-all duration-300 rounded-3xl p-6 sm:p-8 min-h-[240px] sm:min-h-[260px] text-center shadow-md flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-base sm:text-lg mb-3 leading-snug">
                  Reliable Distribution
                </h3>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                  We focus on efficient product movement and consistent supply to support our business partners.
                </p>
              </div>
            </div>

            <div className="bg-[#D9534F] hover:bg-[#C9302C] text-white transition-all duration-300 rounded-3xl p-6 sm:p-8 min-h-[240px] sm:min-h-[260px] text-center shadow-md flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-base sm:text-lg mb-3 leading-snug">
                  Strong Business Relationships
                </h3>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                  We value long-term relationships with brands, retailers, and businesses.
                </p>
              </div>
            </div>

            <div className="bg-[#D9534F] hover:bg-[#C9302C] text-white transition-all duration-300 rounded-3xl p-6 sm:p-8 min-h-[240px] sm:min-h-[260px] text-center shadow-md flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-base sm:text-lg mb-3 leading-snug">
                  Market-Focused Service
                </h3>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                  We understand that every market has different requirements, and we work with a practical, business-focused approach.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ================= HOW WE WORK & VISION/MISSION ================= */}
      <div className="bg-[#E9E1D4] text-gray-900 py-10 sm:py-16 space-y-16 sm:space-y-24 overflow-x-hidden">
        
        {/* How We Work Timeline */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left space-y-8 sm:space-y-12">
          <div>
            <span className="text-xs sm:text-sm font-bold tracking-widest text-gray-500 uppercase">
              How We Work
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mt-2">
              From Brand to <span className="text-[#E62429]">Market.</span>
            </h2>
          </div>

          {/* Timeline Steps */}
          <div className="relative">
            {/* Desktop Connector Line */}
            <div className="hidden lg:block absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-black/30 z-0 pointer-events-none"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
              {/* Step 01 */}
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-20 h-20 rounded-full bg-[#E4C495] flex items-center justify-center text-gray-900 shadow-md mb-2 transition-transform duration-300 hover:scale-110 cursor-pointer">
                  <img src={connectcontacts} className="w-8 h-8" alt="connect" />
                </div>
                <span className="text-sm font-black text-black tracking-wider">01</span>
                <h3 className="font-extrabold text-base sm:text-lg text-gray-900">Connect</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-[240px]">
                  Understand the brand, product, and market requirements.
                </p>
              </div>

              {/* Step 02 */}
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-20 h-20 rounded-full bg-[#E4C495] flex items-center justify-center text-gray-900 shadow-md mb-2 transition-transform duration-300 hover:scale-110 cursor-pointer">
                  <img src={planlight} className="w-8 h-8" alt="plan" />
                </div>
                <span className="text-sm font-black text-black tracking-wider">02</span>
                <h3 className="font-extrabold text-base sm:text-lg text-gray-900">Plan</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-[240px]">
                  Identify suitable sales and distribution opportunities.
                </p>
              </div>

              {/* Step 03 */}
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-20 h-20 rounded-full bg-[#E4C495] flex items-center justify-center text-gray-900 shadow-md mb-2 transition-transform duration-300 hover:scale-110 cursor-pointer">
                  <img src={boxlinear} className="w-8 h-8" alt="distribute" />
                </div>
                <span className="text-sm font-black text-black tracking-wider">03</span>
                <h3 className="font-extrabold text-base sm:text-lg text-gray-900">Distribute</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-[240px]">
                  Move products efficiently through the market.
                </p>
              </div>

              {/* Step 04 */}
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-20 h-20 rounded-full bg-[#E4C495] flex items-center justify-center text-gray-900 shadow-md mb-2 transition-transform duration-300 hover:scale-110 cursor-pointer">
                  <img src={lighttruck} className="w-8 h-8" alt="reach" />
                </div>
                <span className="text-sm font-black text-black tracking-wider">04</span>
                <h3 className="font-extrabold text-base sm:text-lg text-gray-900">Reach</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-[240px]">
                  Connect products with retailers, businesses, and customers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision / Mission Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Left Illustration */}
            <div className="flex justify-center order-2 lg:order-1">
              <img 
                src={last} 
                alt="Vision Mission Illustration" 
                className="w-full max-w-md object-contain max-h-[380px]"
              />
            </div>

            {/* Right Vision & Mission Red Boxes */}
            <div className="space-y-6 order-1 lg:order-2">
              {/* Our Vision Box */}
              <div className="bg-[#D71920] text-white rounded-3xl w-full p-6 sm:p-8 shadow-lg">
                <h3 className="font-extrabold text-lg sm:text-xl tracking-wide uppercase text-[#FEC26C]">
                  OUR VISION
                </h3>
                <h4 className="font-bold text-sm sm:text-base mt-1">
                  To Build Stronger Connections Between Beverage Brands and Growing Markets.
                </h4>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed mt-3">
                  We aim to create a reliable and connected beverage distribution network where quality products can reach more businesses and customers.
                </p>
              </div>

              {/* Our Mission Box */}
              <div className="bg-[#D71920] text-white rounded-3xl w-full p-6 sm:p-8 shadow-lg">
                <h3 className="font-extrabold text-lg sm:text-xl tracking-wide uppercase text-[#FEC26C]">
                  OUR MISSION
                </h3>
                <h4 className="font-bold text-sm sm:text-base mt-1">
                  To Make Beverage Distribution More Accessible, Reliable, and Market-Focused.
                </h4>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed mt-3">
                  We are committed to supporting beverage brands and business partners through dependable sales, distribution, and long-term relationships.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ================= CTA SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-[#E4C495] border border-black/10 rounded-3xl p-8 sm:p-12 text-center shadow-sm relative overflow-hidden">
          <p className="text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-widest mb-2">
            LET'S WORK TOGETHER
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-black mb-3">
            Ready to Grow With Ravi Sales?
          </h2>
          <p className="text-xs sm:text-sm text-gray-800 max-w-xl mx-auto leading-relaxed">
            Whether you're a beverage brand looking to expand your market or a business looking for reliable beverage supply, we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* ================= HELP BAR ================= */}
      <div className="w-full bg-[#E62429] py-6 sm:py-8 px-4 sm:px-8 shadow-xl mt-4 sm:mt-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-center text-white">
          <div className="flex items-center justify-start sm:justify-center md:justify-start space-x-4 max-w-[280px] sm:max-w-none mx-auto w-full md:mx-0">
            <div className="bg-white/10 p-3 rounded-full shrink-0 flex items-center justify-center">
              <img src={HeadPhon} className="h-7 w-7 sm:h-8 sm:w-8 text-white" alt="headphones" />
            </div>
            <div className="text-left">
              <p className="text-xs text-white/80 font-medium">Have Any Questions?</p>
              <h4 className="text-base sm:text-lg font-bold whitespace-nowrap">We're Here to Help!</h4>
            </div>
          </div>

          <div className="flex items-center justify-start sm:justify-center md:justify-center space-x-4 max-w-[280px] sm:max-w-none mx-auto w-full">
            <div className="bg-white/10 p-3 rounded-full shrink-0 flex items-center justify-center">
              <img src={Phonecallwhite} className="h-7 w-7 sm:h-8 sm:w-8 text-white" alt="call" />
            </div>
            <div className="text-left">
              <p className="text-xs text-white/80 font-medium">Call Us Now</p>
              <a href="tel:+919999900000" className="text-base sm:text-lg font-bold hover:underline whitespace-nowrap">
                +91 99999 00000
              </a>
            </div>
          </div>

          <div className="flex items-center justify-start sm:justify-center md:justify-end space-x-4 max-w-[280px] sm:max-w-none mx-auto w-full md:mx-0">
            <div className="bg-white/10 p-3 rounded-full shrink-0 flex items-center justify-center">
              <img src={mailoutline} className="h-7 w-7 sm:h-8 sm:w-8 text-white" alt="email" />
            </div>
            <div className="text-left">
              <p className="text-xs text-white/80 font-medium">Email Us</p>
              <a href="mailto:ravisales@gmail.com" className="text-base sm:text-lg font-bold hover:underline">
                ravisales@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#1A1A1A] text-white pt-8 sm:pt-12 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-12 gap-8 pb-8 md:pb-12 border-b border-white/10">
          {/* Logo & Info */}
          <div className="col-span-2 md:col-span-5 space-y-3 md:space-y-4">
            <Link to="/" className="flex items-center space-x-2 group pl-0 sm:pl-2 inline-block">
              <img src={logoImg} alt="RS Logo" className="h-14 w-14 sm:h-20 sm:w-20 object-contain transform group-hover:scale-105 transition duration-300" />
            </Link>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
              Beverage sales and distribution, connecting trusted brands with growing markets.
            </p>

            <div className="flex space-x-4 pt-1">
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition hover:opacity-80">
                <img src={instagram} alt="Instagram" className="h-6 w-6 sm:h-7 sm:w-7" />
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition hover:opacity-80">
                <img src={facebook} alt="Facebook" className="h-6 w-6 sm:h-7 sm:w-7" />
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition hover:opacity-80">
                <img src={Vector} alt="Vector" className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-2 space-y-2 md:space-y-3 flex flex-col items-start text-left">
            <div className="w-full">
              <h4 className="text-sm font-bold tracking-wider uppercase text-white mb-2">Quick Links</h4>
              <ul className="space-y-1.5 md:space-y-2 text-xs sm:text-sm text-gray-400">
                <li><button onClick={() => navigate('/')} className="hover:text-white transition cursor-pointer">Home</button></li>
                <li><button onClick={() => navigate('/about')} className="hover:text-white transition cursor-pointer">About Us</button></li>
                <li><button onClick={() => navigate('/products')} className="hover:text-white transition cursor-pointer">Products</button></li>
                <li><button onClick={() => navigate('/gallery')} className="hover:text-white transition cursor-pointer">Gallery</button></li>
                <li><button onClick={() => navigate('/contact')} className="hover:text-white transition cursor-pointer">Contact Us</button></li>
              </ul>
            </div>
          </div>

          {/* Products */}
          <div className="col-span-1 md:col-span-2 space-y-2 md:space-y-3 flex flex-col items-start text-left">
            <div className="w-full">
              <h4 className="text-sm font-bold tracking-wider uppercase text-white mb-2">Products</h4>
              <ul className="space-y-1.5 md:space-y-2 text-xs sm:text-sm text-gray-400">
                <li><button onClick={() => navigate('/products')} className="hover:text-white transition cursor-pointer">All Products</button></li>
                <li><button onClick={() => navigate('/products')} className="hover:text-white transition cursor-pointer">Beverage Brands</button></li>
                <li><button onClick={() => navigate('/products')} className="hover:text-white transition cursor-pointer">Product Categories</button></li>
                <li><button onClick={() => navigate('/products')} className="hover:text-white transition cursor-pointer">Pack Sizes</button></li>
              </ul>
            </div>
          </div>

          {/* Get in Touch */}
          <div className="col-span-2 md:col-span-3 space-y-2 md:space-y-3 text-left">
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