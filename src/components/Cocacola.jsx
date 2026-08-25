import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, User } from 'lucide-react';

// Header & Footer Assets
import logoImg from '../assets/rs-logo.png';
import login from '../assets/login.svg';
import cart from '../assets/cart.svg';
import HeadPhon from '../assets/HeadPhon.svg';
import Phonecallwhite from '../assets/Phonecallwhite.svg';
import mailoutline from '../assets/mailoutline.svg';
import instagram from '../assets/instagram.svg';
import facebook from '../assets/facebook.svg';
import Vector from '../assets/Vector.svg';

// Coca-Cola Product Assets
import cokeHeroMain from '../assets/image 75.png';
import thumb1 from '../assets/image 77.png';
import thumb2 from '../assets/image 79.png';
import thumb3 from '../assets/image 78.png';
import thumb4 from '../assets/image 80.png';
import starIcon from '../assets/Star Icon.svg';
import addIcon from '../assets/add.svg';
import minusIcon from '../assets/Icon (3).svg';

export default function Cocacola() {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(cokeHeroMain);
  const [selectedSize, setSelectedSize] = useState('500 ml');
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

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

  // Pricing based on selected size
  const getPrice = () => {
    switch (selectedSize) {
      case '250 ml':
        return 20;
      case '500 ml':
        return 40;
      case '750 ml':
        return 60;
      default:
        return 40;
    }
  };

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const thumbnails = [
    { id: 1, img: thumb1 },
    { id: 2, img: thumb2 },
    { id: 3, img: thumb3 },
    { id: 4, img: thumb4 },
  ];

  return (
    <div className="min-h-screen bg-[#EDE7DD] text-gray-900 flex flex-col justify-between overflow-x-hidden max-w-full font-sans select-none">

      {/* ================= TOP HEADER & NAVBAR ================= */}
      <div className="w-full relative">
        <nav className="w-full bg-[#161616] backdrop-blur-sm z-50 transition-all duration-300">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-19 items-center relative">

              {/* Brand Logo */}
              <Link to="/" className="flex items-center space-x-2 group pl-0 sm:pl-2">
                <img src={logoImg} alt="RS Logo" className="h-16 w-16 sm:h-20 sm:w-20 object-contain transform group-hover:scale-105 transition duration-300" />
              </Link>

              {/* Desktop Nav Links */}
              <div className="hidden md:flex space-x-8 font-medium text-black absolute left-1/2 transform -translate-x-1/2">
                <Link to="/" className="hover:text-[#FEC26C] text-[#B2B2B2] transition duration-200">Home</Link>
                <Link to="/about" className="hover:text-[#FEC26C] text-[#B2B2B2] transition duration-200">About</Link>
                <Link to="/products" className="text-[#FEC26C] font-semibold transition hover:text-[#B2B2B2]">Products</Link>
                <Link to="/gallery" className="hover:text-[#FEC26C] text-[#B2B2B2] transition duration-200">Gallery</Link>
                <Link to="/contact" className="hover:text-[#FEC26C] text-[#B2B2B2] transition duration-200">Contact Us</Link>
              </div>

              {/* User Profile / Login & Cart */}
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

              {/* Mobile Menu Button */}
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

          {/* Mobile Menu Dropdown */}
          <div className={`md:hidden bg-black/90 backdrop-blur-md border-t border-white/10 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[450px] opacity-100 py-4 px-6' : 'max-h-0 opacity-0 py-0 px-6'}`}>
            <div className="space-y-2">
              <Link to="/" onClick={() => setIsOpen(false)} className="block text-white hover:text-red-400 py-2.5 px-3 rounded-lg">Home</Link>
              <Link to="/about" onClick={() => setIsOpen(false)} className="block text-white hover:text-red-400 py-2.5 px-3 rounded-lg">About</Link>
              <Link to="/products" onClick={() => setIsOpen(false)} className="block text-[#FEC26C] font-semibold py-2.5 px-3 rounded-lg bg-white/10">Products</Link>
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
      </div>

      {/* ================= HERO PRODUCT SHOWCASE (COPY-TO-COPY FROM SCREENSHOT) ================= */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 md:py-20 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column: Big Splash Image + 4 Thumbnails */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start">

            {/* Big Main Image Container */}
            <div className="w-full max-w-[500px] aspect-[1.15/1] rounded-2xl overflow-hidden shadow-md bg-[#E61B23] flex items-center justify-center p-2">
              <img
                src={selectedImage}
                alt="Coca-Cola Original Taste"
                className="w-full h-full object-cover rounded-xl transition-all duration-300"
              />
            </div>

            {/* 4 Thumbnails Gallery */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4 mt-4 w-full max-w-[500px]">
              {thumbnails.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedImage(item.img)}
                  className={`bg-white rounded-xl p-1.5 sm:p-2 border transition-all duration-200 cursor-pointer aspect-square flex items-center justify-center overflow-hidden hover:scale-105 ${selectedImage === item.img ? 'border-2 border-[#E50914] shadow-md' : 'border-gray-200/80 hover:border-gray-400'
                    }`}
                >
                  <img
                    src={item.img}
                    alt={`Thumbnail ${item.id}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Product Info, Size Selector & CTA */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">

            {/* Category Tag */}
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-gray-700 uppercase mb-1">
              COCA-COLA
            </span>

            {/* Product Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-2">
              Coca-Cola <span className="text-[#E61B23]">Original Taste</span>
            </h1>

            {/* Star Rating */}
            <div className="flex items-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <img key={i} src={starIcon} alt="star" className="w-4 h-4 object-contain" />
              ))}
            </div>

            {/* Price */}
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              ₹{getPrice()}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-700 max-w-md leading-relaxed mb-6">
              The iconic sparkling soft drink with its distinctive taste, made to refresh and bring people together.
            </p>

            {/* Size Selector */}
            <div className="mb-6">
              <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2.5">
                Choose Size
              </label>
              <div className="flex items-center space-x-2 sm:space-x-3">
                {['250 ml', '500 ml', '750 ml'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${selectedSize === size
                      ? 'bg-[#BFAEA0] text-white font-bold rounded-full px-5 py-1.5 shadow-sm'
                      : 'text-gray-800 hover:text-black px-3 py-1.5'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">

              {/* Quantity Box (+ 01 -) */}
              <div className="flex items-center border border-gray-300/90 rounded-lg bg-white px-3 py-2 space-x-3 shadow-inner">
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="text-gray-700 hover:text-black transition cursor-pointer p-0.5"
                  title="Increase quantity"
                >
                  <img src={addIcon} alt="+" className="w-3.5 h-3.5 object-contain" />
                </button>

                <span className="text-xs sm:text-sm font-bold text-gray-900 min-w-[20px] text-center select-none">
                  {quantity < 10 ? `0${quantity}` : quantity}
                </span>

                <button
                  type="button"
                  onClick={handleDecrement}
                  className="text-gray-700 hover:text-black transition cursor-pointer p-0.5"
                  title="Decrease quantity"
                >
                  <img src={minusIcon} alt="-" className="w-3.5 h-3.5 object-contain" />
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                type="button"
                onClick={() => alert(`Proceeding to buy ${quantity}x Coca-Cola Original Taste (${selectedSize})`)}
                className="bg-[#D71920] hover:bg-[#B9151B] text-white font-bold text-xs sm:text-sm px-8 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                Buy Now
              </button>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={() => alert(`Added ${quantity}x Coca-Cola Original Taste (${selectedSize}) to cart!`)}
                className="bg-[#B4B4B4] hover:bg-[#A0A0A0] text-white font-bold text-xs sm:text-sm px-8 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                Add to Cart
              </button>

            </div>

          </div>

        </div>
      </main>

      {/* ================= HELP BAR ================= */}
      <div className="w-full bg-[#E62429] py-6 sm:py-8 px-4 sm:px-8 shadow-xl mt-8">
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

        {/* Bottom Bar */}
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