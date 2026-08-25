import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, User } from 'lucide-react';

import logoImg from '../assets/rs-logo.png';
import login from '../assets/login.svg';
import cart from '../assets/cart.svg';
import Arrowrightcircle from '../assets/Arrowrightcircle.svg';
import contactBg from '../assets/image 47.png';
import salesmenImg from '../assets/image 48.png';
import Phonecall from '../assets/Phonecall.svg';
import mail from '../assets/mail.svg';
import whatsapp from '../assets/mingcute_whatsapp-fill.svg';
import location_on from '../assets/location_on.svg';
import HeadPhon from '../assets/HeadPhon.svg';
import Phonecallwhite from '../assets/Phonecallwhite.svg';
import mailoutline from '../assets/mailoutline.svg';
import instagram from '../assets/instagram.svg';
import facebook from '../assets/facebook.svg';
import Vector from '../assets/Vector.svg';

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    subject: '',
    description: ''
  });

  useEffect(() => {
    const user = localStorage.getItem('shopzee_user');
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('shopzee_user');
    setLoggedInUser(null);
    navigate('/login');
  };

  const getAvatarInitials = () => {
    if (!loggedInUser) return 'RS';
    const identifier = loggedInUser.username || loggedInUser.email || 'RS';
    return identifier.substring(0, 2).toUpperCase();
  };

  const getUserRoleBadge = () => {
    if (!loggedInUser) return { bg: 'bg-gray-600', label: 'User' };
    return loggedInUser.role === 'admin'
      ? { bg: 'bg-green-600', label: 'Admin' }
      : { bg: 'bg-blue-600', label: 'Member' };
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Enquiry Form Submitted:', formData);
    alert('Thank you! Your enquiry has been submitted successfully.');
    setFormData({
      name: '',
      companyName: '',
      email: '',
      phone: '',
      subject: '',
      description: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#E9E1D4] text-gray-900 flex flex-col justify-between overflow-x-hidden max-w-full" style={{ fontFamily: 'Arial, sans-serif !important', fontWeight: 400, letterSpacing: 'normal' }}>
      
      {/* Top Header & Navbar */}
      <div className="w-full relative">
        <nav className="w-full bg-[#161616] backdrop-blur-sm z-50 transition-all duration-300">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-19 items-center relative">
              <Link to="/" className="flex items-center space-x-2 group pl-0 sm:pl-2">
                <img src={logoImg} alt="RS Logo" className="h-16 w-16 sm:h-20 sm:w-20 object-contain transform group-hover:scale-105 transition duration-300" />
              </Link>

              <div className="hidden md:flex space-x-8 font-medium text-black absolute left-1/2 transform -translate-x-1/2">
                <Link to="/" className="hover:text-[#FEC26C] text-[#B2B2B2] transition duration-200">Home</Link>
                <Link to="/about" className="hover:text-[#FEC26C] text-[#B2B2B2] transition duration-200">About</Link>
                <Link to="/products" className="hover:text-[#FEC26C] text-[#B2B2B2] transition duration-200">Products</Link>
                <Link to="/gallery" className="hover:text-[#FEC26C] text-[#B2B2B2] transition duration-200">Gallery</Link>
                <Link to="/contact" className="text-[#FEC26C] font-semibold transition hover:text-[#B2B2B2]">Contact Us</Link>
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
              <Link to="/about" onClick={() => setIsOpen(false)} className="block text-white hover:text-red-400 py-2.5 px-3 rounded-lg">About</Link>
              <Link to="/products" onClick={() => setIsOpen(false)} className="block text-white hover:text-red-400 py-2.5 px-3 rounded-lg">Products</Link>
              <Link to="/gallery" onClick={() => setIsOpen(false)} className="block text-white hover:text-red-400 py-2.5 px-3 rounded-lg">Gallery</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-[#FEC26C] font-semibold py-2.5 px-3 rounded-lg bg-white/10">Contact Us</Link>

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
      </div>

      {/* ================= HERO BANNER SECTION (LAYER 1: image 47, LAYER 2: image 48, LAYER 3: Content) ================= */}
      <section className="w-full relative flex-grow min-h-[460px] sm:min-h-[520px] md:min-h-[560px] lg:min-h-[600px] flex items-center overflow-hidden select-none bg-[#EDE7DD]">
        
        {/* Layer 1 (Furthest Back): Background Image (image 47.png) */}
        <img
          src={contactBg}
          alt="Contact Background Texture"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        />

        {/* Layer 2 (Middle): Employees Illustration (image 48.png) placed crisp at bottom-right */}
        <div className="absolute right-0 sm:right-[2%] lg:right-[3%] xl:right-[5%] bottom-0 pointer-events-none z-10 flex justify-end items-end">
          <img
            src={salesmenImg}
            alt="Ravi Sales Team"
            className="w-[260px] sm:w-[320px] md:w-[390px] lg:w-[450px] xl:w-[500px] drop-shadow-sm select-none"
          />
        </div>

        {/* Layer 3 (Top / Foreground): Centered Content, Title & Button */}
        <div className="max-w-7xl -mt-20 mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 py-10 sm:py-14">
          <div className="w-full lg:w-[68%] xl:w-[65%] flex flex-col items-center justify-center text-center mx-auto lg:mx-0">
            
            {/* Tagline */}
            <span className="block text-xs sm:text-sm font-semibold tracking-widest text-[#E50914] uppercase mb-2 sm:mb-3">
              GET IN TOUCH
            </span>
            
            {/* Main Headline (Exactly 1 Line) */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[38px] font-bold text-gray-900 tracking-tight leading-tight mb-3 sm:mb-4 lg:whitespace-nowrap">
              Let's Talk About Your Beverage Business.
            </h1>
            
            {/* Description (Exactly 2 Lines) */}
            <p className="text-xs sm:text-sm md:text-base text-gray-800 font-normal leading-relaxed mb-6 sm:mb-9 text-center m-auto sm:w-160">
              Whether you're looking for beverage products, sales support, or a reliable <br className="hidden sm:inline" />
              distribution partner, we're here to help.
            </p>

            {/* CTA Button (Centered) */}
            <a
              href="mailto:ravisales@gmail.com"
              className="inline-flex items-center space-x-3 bg-[#D71920] hover:bg-[#B9151B] text-white text-xs sm:text-sm font-medium px-7 sm:px-8 py-2.5 sm:py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <span>Get an Enquiry</span>
              <img src={Arrowrightcircle} alt="Arrow" className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>

          </div>
        </div>

      </section>

      {/* ================= CONTACT DETAILS & FORM SECTION (MATCHING SCREENSHOT) ================= */}
      <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: 4 Cards (2x2) */}
          <div className="lg:col-span-6 mt-6 sm:mt-12 lg:mt-20 relative flex justify-center lg:justify-start w-full">
            {/* 2x2 Grid (Strictly 2 Columns on all devices) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-6 w-full max-w-[520px] relative z-10">
              
              {/* Card 1: Call Us */}
              <div
                className="bg-[#D3C2A8] w-full max-w-[240px] sm:w-60 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 sm:p-7 flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl transition-all duration-300 transform-gpu hover:-translate-y-1 hover:scale-[1.02] cursor-pointer will-change-transform mx-auto"
                style={{ backfaceVisibility: 'hidden', WebkitFontSmoothing: 'subpixel-antialiased' }}
              >
                <img src={Phonecall} alt="Call" className="w-6 h-6 sm:w-8 sm:h-8 mb-1.5 sm:mb-2.5 object-contain" />
                <h4 className="font-semibold text-xs sm:text-sm text-gray-900 mb-0.5 sm:mb-1">Call Us</h4>
                <a href="tel:+919999900000" className="text-[10px] sm:text-xs md:text-sm font-bold text-gray-900 hover:underline break-all sm:break-normal">+91 99999 00000</a>
              </div>

              {/* Card 2: Email Us */}
              <div
                className="bg-[#D3C2A8] w-full max-w-[240px] sm:w-60 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 sm:p-7 flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl transition-all duration-300 transform-gpu hover:-translate-y-1 hover:scale-[1.02] cursor-pointer will-change-transform mx-auto"
                style={{ backfaceVisibility: 'hidden', WebkitFontSmoothing: 'subpixel-antialiased' }}
              >
                <img src={mail} alt="Email" className="w-6 h-6 sm:w-8 sm:h-8 mb-1.5 sm:mb-2.5 object-contain" />
                <h4 className="font-semibold text-xs sm:text-sm text-gray-900 mb-0.5 sm:mb-1">Email Us</h4>
                <a href="mailto:ravisales@gamil.com" className="text-[10px] sm:text-xs md:text-sm font-bold text-gray-900 hover:underline break-all sm:break-normal">ravisales@gamil.com</a>
              </div>

              {/* Card 3: Message Us */}
              <div
                className="bg-[#D3C2A8] w-full max-w-[240px] sm:w-60 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 sm:p-7 flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl transition-all duration-300 transform-gpu hover:-translate-y-1 hover:scale-[1.02] cursor-pointer will-change-transform mx-auto"
                style={{ backfaceVisibility: 'hidden', WebkitFontSmoothing: 'subpixel-antialiased' }}
              >
                <img src={whatsapp} alt="Message" className="w-6 h-6 sm:w-8 sm:h-8 mb-1.5 sm:mb-2.5 object-contain" />
                <h4 className="font-semibold text-xs sm:text-sm text-gray-900 mb-0.5 sm:mb-1">Message Us</h4>
                <a href="https://wa.me/919999900000" target="_blank" rel="noopener noreferrer" className="text-[10px] sm:text-xs md:text-sm font-bold text-gray-900 hover:underline break-all sm:break-normal">+91 99999 00000</a>
              </div>

              {/* Card 4: Visit us */}
              <div
                className="bg-[#D3C2A8] w-full max-w-[240px] sm:w-60 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 sm:p-7 flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl transition-all duration-300 transform-gpu hover:-translate-y-1 hover:scale-[1.02] cursor-pointer will-change-transform mx-auto"
                style={{ backfaceVisibility: 'hidden', WebkitFontSmoothing: 'subpixel-antialiased' }}
              >
                <img src={location_on} alt="Visit" className="w-6 h-6 sm:w-8 sm:h-8 mb-1.5 sm:mb-2.5 object-contain" />
                <h4 className="font-semibold text-xs sm:text-sm text-gray-900 mb-0.5 sm:mb-1">Visit us</h4>
                <p className="text-[10px] sm:text-xs md:text-sm font-bold text-gray-900">Ahmedabad, Gujarat</p>
              </div>

            </div>
          </div>

          {/* Right Column: Tell Us How We Can Help Form */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
              Tell Us How <span className="text-[#E50914]">We Can Help.</span>
            </h2>

            <p
              className="text-gray-900 mb-6 sm:mb-8"
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: '100%',
                letterSpacing: '0.04em'
              }}
            >
              Have a question, requirement,<br />
              or business opportunity?
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Name & Company Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your Name"
                    className="w-full bg-[#F5F2EB] border border-gray-300/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black transition shadow-inner"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-1">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter Company Name"
                    className="w-full bg-[#F5F2EB] border border-gray-300/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black transition shadow-inner"
                 required />
                </div>
              </div>

              {/* Row 2: Email & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="abc@gmail.com"
                    className="w-full bg-[#F5F2EB] border border-gray-300/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black transition shadow-inner"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-1">Phone Number</label>
                  <div className="flex rounded-xl overflow-hidden border border-gray-300/80 bg-[#F5F2EB] focus-within:ring-1 focus-within:ring-black">
                    <span className="px-3 py-2.5 text-xs sm:text-sm font-semibold text-gray-800 border-r border-gray-300/80 bg-[#ECE7DC] flex items-center select-none">+91</span>
                    <input
                      type="number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder=""
                      className="w-full px-3 py-2.5 text-xs sm:text-sm bg-transparent focus:outline-none text-gray-900" required
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Subject */}
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full bg-[#F5F2EB] border border-gray-300/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black transition shadow-inner"
               required />
              </div>

              {/* Row 4: Description */}
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1">Description</label>
                <textarea
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="w-full bg-[#F5F2EB] border border-gray-300/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black resize-none transition shadow-inner"
               required ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="bg-[#D71920] hover:bg-[#B9151B] text-white font-semibold text-xs sm:text-sm px-7 py-2 rounded-full shadow-md transition-all duration-300 cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Banner: Looking for a reliable beverage sales partner? */}
        <div className="w-full mt-14 sm:mt-18">
          <div className="bg-[#E4C495] rounded-2xl sm:rounded-3xl py-8 sm:py-10 px-6 sm:px-12 text-center shadow-sm">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              Looking for a reliable beverage sales partner?
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-800 font-medium mt-2">
              Let's connect and explore how we can work together.
            </p>
          </div>
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
