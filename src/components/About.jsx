import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart, ArrowRight, Phone, Mail, LogOut, Menu, X, User, Handshake,
  Store, CalendarCheck, Truck, Globe, Utensils, Coffee, Building2, Headphones,
   FileText, Box,
} from 'lucide-react';
import logoImg from '../assets/rs-logo.png';
import abbanner from '../assets/about banner.png';
import mid from '../assets/about mid.png';
import last from '../assets/about last.png';

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
    <div className="bg-[#F5F0E6] text-gray-900 relative overflow-x-hidden" style={{ fontFamily: 'Arial, sans-serif !important', fontWeight: 400, letterSpacing: 'normal' }}>
      <div className="w-full relative">
        <div
          className="w-full relative bg-cover bg-center bg-no-repeat flex flex-col justify-between"
          style={{
            backgroundImage: `url(${abbanner})`,
            aspectRatio: '1922 / 1049'
          }}
        >
          <nav className="w-full bg-black/20 backdrop-blur-sm z-50 transition-all duration-300">
            <div className="w-full px-3 sm:px-6 lg:px-8">
              <div className="flex justify-between h-19 items-center relative">
                <Link to="/" className="flex items-center space-x-2 group pl-0 sm:pl-2">
                  <img src={logoImg} alt="RS Logo" className="h-16 w-16 sm:h-20 sm:w-20 object-contain transform group-hover:scale-105 transition duration-300" />
                </Link>

                <div className="hidden md:flex space-x-8 font-medium text-black absolute left-1/2 transform -translate-x-1/2">
                  <Link to="/" className="hover:text-white transition duration-200">Home</Link>
                  <Link to="/about" className="text-white font-semibold transition hover:text-black">About</Link>
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
                <Link to="/" onClick={() => setIsOpen(false)} className="block text-white hover:text-red-400 py-2.5 px-3 rounded-lg">Home</Link>
                <Link to="/about" onClick={() => setIsOpen(false)} className="block text-red-400 font-semibold py-2.5 px-3 rounded-lg bg-white/10">About</Link>
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

         <div className="max-w-7xl w-full mx-auto px-4 sm:px-12 lg:px-12 py-8 sm:py-12 flex items-center flex-grow">
            <div className="max-w-2xl space-y-6 text-center sm:text-left lg:-mt-8 lg:-ml-20 w-full">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-gray-500 uppercase">
                About Ravi Sales
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                Connecting Beverage Brands <br className="hidden sm:block" />
                <span className="text-[#E62429]">With Growing Markets.</span>
              </h1>
              <p className="text-xs sm:text-base text-gray-600 max-w-xl mx-auto sm:mx-0 leading-relaxed">
                Ravi Sales is a beverage sales and distribution agency focused on connecting trusted beverage brands with retailers, businesses, and markets through reliable sales and distribution.
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
                <Link to="/contact" className="bg-[#E62429] hover:bg-red-700 text-white font-bold py-3 px-6 sm:px-8 rounded-full shadow-lg transition flex items-center justify-between space-x-4">
                  <span>Get a Quote</span>
                  <span className="border border-white p-2 rounded-full flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </span>
                </Link>
                <a href="tel:+919999900000" className="bg-[#FEC26C] hover:bg-amber-200 text-amber-800 p-3.5 rounded-full shadow transition flex items-center justify-center">
                  <Phone className="h-5 w-5" />
                </a>
              </div>

              {/* Statistics Counters matching the image */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 border-t border-gray-300 max-w-md mx-auto sm:mx-0">
                <div className="text-center sm:text-left border-r border-gray-300 pr-2 sm:pr-4 flex flex-col items-center sm:items-start justify-center">
                  <h3 className="text-xl sm:text-3xl font-black text-gray-900">10+</h3>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Brands</p>
                </div>
                <div className="text-center sm:text-left border-r border-gray-300 pr-2 sm:pr-4 flex flex-col items-center sm:items-start justify-center">
                  <h3 className="text-xl sm:text-3xl font-black text-gray-900">50+</h3>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Products</p>
                </div>
                <div className="text-center sm:text-left flex flex-col items-center sm:items-start justify-center">
                  <h3 className="text-xl sm:text-3xl font-black text-gray-900">100+</h3>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Retail Partners</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

{/* ================= 3. WHO WE ARE SECTION (Cards Below) ================= */}
      <section className="bg-[#EFECE6] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">Who We Are</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900">
              A Reliable Partner in Beverage Sales & Distribution.
            </h2>
          </div>

          {/* 3 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-[#E4C495] hover:bg-[#D9C4A3] transition-all rounded-2xl p-6 sm:p-8 text-left shadow-sm flex flex-col justify-between max-w-xs mx-auto w-full">
              <p className="text-xs sm:text-sm text-gray-800 leading-relaxed text-center">
                Ravi Sales works across the beverage market to connect products with businesses and customers. We focus on creating reliable connections between beverage brands and markets.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#E4C495] hover:bg-[#D9C4A3] transition-all rounded-2xl p-6 sm:p-8 text-left shadow-sm flex flex-col max-w-xs mx-auto justify-between w-full">
              <p className="text-xs sm:text-sm text-gray-800 leading-relaxed text-center">
                With a diverse range of products and pack sizes, we make beverage products more accessible while supporting the sales and distribution needs of our valued business partners.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#E4C495] hover:bg-[#D9C4A3] transition-all rounded-2xl p-6 sm:p-8 text-left shadow-sm flex max-w-xs mx-auto flex-col justify-between w-full">
              <p className="text-xs sm:text-sm text-gray-800 leading-relaxed text-center">
                Our approach is built around dependable service, strong relationships, and a clear understanding of market requirements. We work to create lasting value for every business partnership.
              </p>
            </div>

          </div>

        </div>
      </section>

{/* Secound part */}
<div className="bg-[#E9E1D4] text-gray-900 py-12 overflow-x-hidden">
  
  {/* ---------------- 1. FIRST PART: Image & Text Section ---------------- */}
  <div className="w-full pl-0 py-12">
    <div className="bg-[#F6F3EE] rounded-r-[50px] sm:rounded-r-[80px] sm:p-0 shadow-md w-full max-w-[1200px] h-auto lg:h-[450px] -ml-4 sm:-ml-6 lg:-ml-8 flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
        
        {/* Left Text Content */}
        <div className="lg:ml-30 space-y-4 w-full lg:w-[600px] sm:space-y-6 px-6 sm:px-0">
          <div>
            <span className="text-xs sm:text-sm font-bold tracking-widest text-black uppercase">
              What We Do
            </span>
            <h2 className="text-1xl sm:text-3xl lg:text-[35px] font-extrabold text-gray-900 mt-2 leading-tight whitespace-normal sm:whitespace-nowrap">
              More Than <span className="text-[#E62429]">Moving Products.</span>
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
            <div>
              <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-0.5">Sales</h4>
              <p className="text-gray-600">We support beverage brands by helping their products reach the right businesses and market opportunities through focused sales efforts.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-0.5">Distribution</h4>
              <p className="text-gray-600">We help ensure products move efficiently through the market, supporting reliable availability for retailers and business partners.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-0.5">Market Reach</h4>
              <p className="text-gray-600">We build connections between beverage brands and businesses, helping products expand their presence across different markets.</p>
            </div>
          </div>
        </div>

        {/* Right Image/Illustration */}
        <div className="lg:justify-end flex justify-center px-6 sm:px-0">
          <img 
            src={mid} 
            alt="Moving Products Illustration" 
            className="max-w-xs sm:max-w-sm lg:ml-0 lg:max-w-md object-contain max-h-[380px]"
          />
        </div>

      </div>
    </div>
  </div>


      {/* ---------------- 2. SECOND PART: Our Approach Section ---------------- */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-12 mt-6">
        <div>
          <span className="text-xs sm:text-sm font-bold tracking-widest text-gray-500 uppercase">
            Our Approach
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
            Simple Principles. <span className="text-[#E62429]">Strong Partnerships.</span>
          </h2>
        </div>

        {/* 4 Approach Grid Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 text-left">
              
          {/* Item 01 */}
          <div className="p-2 space-y-2">
            <span className="text-black font-extrabold text-2xl sm:text-2xl block">01 — Reliability</span>
            <h3 className="font-bold text-black text-sm">We Value Consistency</h3>
            <p className="text-xs sm:text-sm font-normal text-black leading-relaxed">
              Reliable service and dependable product availability are at the heart of the way we work.
            </p>
          </div>

          {/* Item 03 */}
          <div className="p-2 space-y-2">
            <span className="text-black font-extrabold text-2xl sm:text-2xl block">03 — Market Understanding</span>
            <h3 className="font-bold text-black text-sm">We Know the Market</h3>
            <p className="text-xs sm:text-sm font-normal text-black leading-relaxed">
              Understanding customer and business requirements helps us connect products with the right opportunities.
            </p>
          </div>

          {/* Item 02 */}
          <div className="p-2 space-y-2">
            <span className="text-black font-extrabold text-2xl sm:text-2xl block">02 — Relationships</span>
            <h3 className="font-bold text-black text-sm">We Build Partnerships</h3>
            <p className="text-xs sm:text-sm font-normal text-black leading-relaxed">
              We believe long-term relationships create stronger opportunities for brands and businesses.
            </p>
          </div>

          {/* Item 04 */}
          <div className="p-2 space-y-2">
            <span className="text-black font-extrabold text-2xl sm:text-2xl block">04 — Growth</span>
            <h3 className="font-bold text-black text-sm">We Think Long Term</h3>
            <p className="text-xs sm:text-sm font-normal text-black leading-relaxed">
              Our focus is not just on selling products, but on creating sustainable growth for the businesses we work with.
            </p>
          </div>

        </div>

      </div>


      {/* ---------------- 3. THIRD PART: Why Ravi Sales Section ---------------- */}
     <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-12 lg:px-20 py-12 bg-[#F6F3EE] space-y-8 mt-12">
 
  {/* Section Header */}
  <div className="text-left">
    <span className="text-xs sm:text-sm font-bold tracking-widest text-gray-500 uppercase">
      Why Ravi Sales
    </span>
    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
      Built Around Your Market.
    </h2>
  </div>

  {/* 4 Red Cards Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
    
    {/* Card 1 */}
    <div className="bg-[#D9534F] hover:bg-[#C9302C] text-white transition-all rounded-3xl p-8 sm:p-10 h-70 w-70 text-center shadow-lg flex flex-col justify-between">
      <div>
        <h3 className="font-extrabold text-lg sm:text-xl mb-4 leading-snug">
          Diverse Product Portfolio
        </h3>
        <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
          A wide range of beverage products and pack sizes gives businesses more choices to meet different customer needs.
        </p>
      </div>
    </div>

    {/* Card 2 */}
    <div className="bg-[#D9534F] hover:bg-[#C9302C] text-white transition-all rounded-3xl p-8 sm:p-10 h-70 w-70 text-center shadow-lg flex flex-col justify-between">
      <div>
        <h3 className="font-extrabold text-lg sm:text-xl mb-4 leading-snug">
          Reliable Distribution
        </h3>
        <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
          We focus on efficient product movement and consistent supply to support our business partners.
        </p>
      </div>
    </div>

    {/* Card 3 */}
    <div className="bg-[#D9534F] hover:bg-[#C9302C] text-white transition-all rounded-3xl p-8 sm:p-10 h-70 w-70 text-center shadow-lg flex flex-col justify-between">
      <div>
        <h3 className="font-extrabold text-lg sm:text-xl mb-4 leading-snug">
          Strong Business Relationships
        </h3>
        <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
          We value long-term relationships with brands, retailers, and businesses.
        </p>
      </div>
    </div>

    {/* Card 4 */}
    <div className="bg-[#D9534F] hover:bg-[#C9302C] text-white transition-all rounded-3xl p-8 sm:p-10 h-70 w-70 text-center shadow-lg flex flex-col justify-between">
      <div>
        <h3 className="font-extrabold text-lg sm:text-xl mb-4 leading-snug">
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


{/*  */}
{/*  */}
{/* THIRD PART */}


<div className="bg-[#E9E1D4] text-gray-900 space-y-20 overflow-x-hidden" style={{ fontFamily: 'Arial, sans-serif !important' }}>
     
<div className="max-w-7xl mx-25 px-4 sm:px-8 lg:px-0 text-left space-y-7">
  {/* sm:ml-12 અથવા sm:ml-20 વાપરવાથી ટાઇટલ જમણી બાજુ ખસશે */}
  <div className="sm:mr-80 ml-0">
    <span className=" sm:text-sm font-bold tracking-widest text-gray-500 uppercase">
      How We Work
    </span>
    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
      From Brand to <span className="text-[#E62429]">Market.</span>
    </h2>
  </div>

  {/* Timeline Container */}
<div className="relative pt-6 sm:px-15">
    
  {/* 4 Steps Grid - gap-24 થી વચ્ચેની જગ્યા હજુ વધારે વધી ગઈ છે */}
  <div className="grid mr-4 sm:mx-10 grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-40 sm:gap-24 relative">
    
    {/* Line - જગ્યા વધવાને કારણે લાઈનની લંબાઈ અને પોઝિશન અપડેટ કરી દીધી છે */}
    <div className="hidden lg:block absolute top-[40px] left-[12%] right-[12%] h-[2px] bg-black z-0 pointer-events-none"></div>

    {/* Step 01 */}
    <div className="flex flex-col items-center text-center space-y-1 relative z-10">
      <div className="w-20 h-20 rounded-full bg-[#E4C495] flex items-center justify-center text-gray-900 shadow-md mb-2 transition-transform duration-300 hover:scale-110 cursor-pointer">
        <Handshake className="w-8 h-8" />
      </div>
      <span className="text-sm font-black text-black tracking-wider">01</span>
      <h3 className="font-extrabold text-base text-gray-900">Connect</h3>
      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-[240px]">
        Understand the brand, product, and market requirements.
      </p>
    </div>

    {/* Step 02 */}
    <div className="flex flex-col items-center text-center space-y-1 relative z-10">
      <div className="w-20 h-20 rounded-full bg-[#E4C495] flex items-center justify-center text-gray-900 shadow-md mb-2 transition-transform duration-300 hover:scale-110 cursor-pointer">
        <FileText className="w-8 h-8" />
      </div>
      <span className="text-sm font-black text-black tracking-wider">02</span>
      <h3 className="font-extrabold text-base text-gray-900">Plan</h3>
      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-[240px]">
        Identify suitable sales and distribution opportunities.
      </p>
    </div>

    {/* Step 03 */}
    <div className="flex flex-col items-center text-center space-y-1 relative z-10">
      <div className="w-20 h-20 rounded-full bg-[#E4C495] flex items-center justify-center text-gray-900 shadow-md mb-2 transition-transform duration-300 hover:scale-110 cursor-pointer">
        <Box className="w-8 h-8" />
      </div>
      <span className="text-sm font-black text-black tracking-wider">03</span>
      <h3 className="font-extrabold text-base text-gray-900">Distribute</h3>
      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-[240px]">
        Move products efficiently through the market.
      </p>
    </div>

    {/* Step 04 */}
    <div className="flex flex-col items-center text-center space-y-1 relative z-10">
      <div className="w-20 h-20 rounded-full bg-[#E4C495] flex items-center justify-center text-gray-900 shadow-md mb-2 transition-transform duration-300 hover:scale-110 cursor-pointer">
        <Truck className="w-8 h-8" />
      </div>
      <span className="text-sm font-black text-black tracking-wider">04</span>
      <h3 className="font-extrabold text-base text-gray-900">Reach</h3>
      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-[240px]">
        Connect products with retailers, businesses, and customers.
      </p>
    </div>

  </div>
</div>

</div>



      {/* --- 2. Illustration & Vision / Mission Section --- */}
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Illustration */}
          <div className="flex justify-center">
            <img 
              src={last} 
              alt="Vision Mission Illustration" 
              className="w-full max-w-md object-contain max-h-[400px]"
            />
          </div>

          {/* Right Vision & Mission Red Boxes */}
          <div className="space-y-6">
            
            {/* Our Vision Box */}
            <div className="bg-[#D71920] text-white rounded-3xl w-full sm:w-180 p-6 sm:p-8 shadow-lg">
              <h3 className="font-extrabold text-lg sm:text-xl tracking-wide uppercase text-[#FEC26C]">
                OUR VISION
              </h3>
              <h4 className="font-bold text-sm sm:text-base">
                To Build Stronger Connections Between Beverage Brands and Growing Markets.
              </h4>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed mt-3">
                We aim to create a reliable and connected beverage distribution network where quality products can reach more businesses and customers.
              </p>
            </div>

            {/* Our Mission Box */}
            <div className="bg-[#D71920] text-white rounded-3xl p-6 w-full sm:w-180 sm:p-8 shadow-lg">
              <h3 className="font-extrabold text-lg sm:text-xl tracking-wide uppercase text-[#FEC26C]">
                OUR MISSION
              </h3>
              <h4 className="font-bold text-sm sm:text-base">
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
{/*  */}
{/*  */}
{/*  */}
{/* Last Part */}




      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div className="bg-[#E4C495] border border-black/10 rounded-3xl p-8 sm:p-12 text-center shadow-sm relative overflow-hidden">
    <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">
      LET'S WORK TOGETHER
    </p>
    <h2 className="text-2xl sm:text-4xl font-extrabold text-black mb-3">
      Ready to Grow With Ravi Sales?
    </h2>
    <p className="text-xs sm:text-sm text-gray-700 max-w-xl mx-auto">
     Whether you're a beverage brand looking to expand your market or a business looking for reliable beverage supply, we'd love to hear from you.
    </p>
  </div>
</section>

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
          <li><button onClick={() => navigate('/contact')} className="">Contact Us</button></li>
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