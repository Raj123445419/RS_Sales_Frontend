import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';

// Header & Footer Assets
import logoImg from '../assets/rs-logo.png';
import login from '../assets/login.svg';
import cart from '../assets/CartGold.svg';
import HeadPhon from '../assets/HeadPhon.svg';
import Phonecallwhite from '../assets/PhoneCallWhite.svg';
import mailoutline from '../assets/MailWhite.svg';
import instagram from '../assets/instagram.svg';
import facebook from '../assets/facebook.svg';
import Vector from '../assets/Vector.svg';

// Coca-Cola Product Assets
import cokeHeroMain from '../assets/image 75.png';
import thumb1 from '../assets/image 77.png';
import thumb2 from '../assets/image 79.png';
import thumb3 from '../assets/image 78.png';
import thumb4 from '../assets/image 80.png';
import starIcon from '../assets/StarDarkGray.svg';
import starIconOutline from '../assets/StarGold.svg';
import addIcon from '../assets/AddBlack.svg';
import minusIcon from '../assets/Icon (3).svg';
import arrowTriangleIcon from '../assets/icon (up dace).svg';
import newPhoneIcon from '../assets/PhoneWhite.svg';
import arrowLeftIcon from '../assets/ArrowUpBlack.svg';
import userIcon from '../assets/UserBlack.svg';

// Related Products Assets
import relatedFanta from '../assets/fanta.png';
import relatedNescafe from '../assets/12.png';
import relatedPepsi from '../assets/pepsi.png';
import relatedBisleri from '../assets/20003b8ed60628677773bbd71cae23b4d30ae20d.png';

export default function Cocacola() {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(cokeHeroMain);
  const [selectedSize, setSelectedSize] = useState('500 ml');
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerEmail, setReviewerEmail] = useState('');
  const [reviewerComment, setReviewerComment] = useState('');
  const [openFaq, setOpenFaq] = useState(0);
  const navigate = useNavigate();

  const relatedProducts = [
    {
      id: 1,
      name: 'Sprite',
      size: '250ml - 500ml - 750ml',
      image: relatedFanta,
      link: '/products',
    },
    {
      id: 2,
      name: 'Nescafe',
      size: '450ml',
      image: relatedNescafe,
      link: '/products',
    },
    {
      id: 3,
      name: 'Pepsi',
      size: '250ml - 500ml - 750ml',
      image: relatedPepsi,
      link: '/products',
    },
    {
      id: 4,
      name: 'Bisleri',
      size: '250ml - 500ml - 750ml',
      image: relatedBisleri,
      link: '/products',
    },
  ];

  const faqs = [
    {
      q: 'What sizes of Coca-Cola are available?',
      a: 'Coca-Cola Original Taste is available in multiple pack sizes, including 250 ml, 500 ml, 750 ml, 1.25 L, and 2.25 L, depending on availability.',
    },
    {
      q: 'Is Coca-Cola available for delivery?',
      a: 'Yes, Coca-Cola is available for delivery across all our standard delivery zones. You can place your order online or contact our sales team.',
    },
    {
      q: 'Can I choose a specific pack size?',
      a: 'Yes, you can choose individual pack sizes (250 ml, 500 ml, 750 ml) or order customized bulk crate quantities directly.',
    },
    {
      q: 'How can I check product availability?',
      a: 'Product availability is displayed in real time on this product page, or you can get in touch with our representative for large bulk inquiries.',
    },
    {
      q: 'Can I order multiple bottles or packs?',
      a: 'Yes, you can select any quantity you need using the quantity selector or contact us for wholesale crate distribution orders.',
    },
  ];

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

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewerName || !reviewerEmail || !reviewerComment) {
      alert('Please fill in all review fields.');
      return;
    }
    alert('Thank you! Your review has been submitted successfully.');
    setReviewerName('');
    setReviewerEmail('');
    setReviewerComment('');
    setRating(0);
  };

  const thumbnails = [
    { id: 1, img: thumb1 },
    { id: 2, img: thumb2 },
    { id: 3, img: thumb3 },
    { id: 4, img: thumb4 },
  ];

  return (
    <div className="min-h-screen bg-[#E9E1D4] text-gray-900 flex flex-col justify-between overflow-x-hidden max-w-full font-sans select-none">

      {/* ================= TOP HEADER & NAVBAR ================= */}
      <div className="w-full relative ">
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
                    <img src={userIcon} alt="user" className="h-5 w-5 object-contain brightness-0 invert" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* ================= HERO PRODUCT SHOWCASE ================= */}
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

      {/* ================= PRODUCT SPECIFICATIONS & DETAILS SECTION ================= */}
      <section className="w-full bg-[#F6F3EE] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-5xl mb-8 sm:mb-10 text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              The Taste <span className="text-[#E61B23]">Everyone Knows</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-black leading-relaxed font-normal">
              Coca-Cola Original Taste is a classic sparkling soft drink known for its distinctive flavour, refreshing character, and familiar taste. With its signature cola flavour and crisp carbonation, it offers a refreshing experience that fits naturally into everyday moments.
            </p>
          </div>

          {/* Specifications Table */}
          <div className="w-full max-w-2xl sm:max-w-3xl mx-auto rounded-2xl overflow-hidden border border-[#CBB8A3] shadow-sm">
            <div className="flex flex-col divide-y divide-[#CBB8A3]">
              {[
                { label: 'Brand', value: 'Coca-Cola' },
                { label: 'Product', value: 'Coca-Cola Original Taste' },
                { label: 'Category', value: 'Soft Drink' },
                { label: 'Type', value: 'Carbonated Soft Drink' },
                { label: 'Packaging', value: 'PET Bottle / Can' },
                { label: 'Available Sizes', value: '250 ML  |  500 ML  |  750 ML' },
                { label: 'Serving Type', value: 'Chilled / Ready to Drink' },
                { label: 'Country of Origin', value: 'India' },
                { label: 'Availability', value: 'In Stock' },
              ].map((row, index) => (
                <div key={index} className="flex flex-row items-center min-h-[44px] sm:min-h-[48px]">
                  {/* Key / Label */}
                  <div className="w-[38%] sm:w-[32%] bg-[#D0BEA7] py-2.5 sm:py-3.5 px-4 sm:px-8 text-left border-r border-[#CBB8A3] self-stretch flex items-center">
                    <span className="text-xs sm:text-sm font-bold text-[#201C18]">
                      {row.label}
                    </span>
                  </div>
                  {/* Value */}
                  <div className="w-[62%] sm:w-[68%] bg-[#EAE0D2] py-2.5 sm:py-3.5 px-4 sm:px-8 text-left self-stretch flex items-center">
                    <span className="text-xs sm:text-sm font-medium text-[#201C18]">
                      {row.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= REVIEWS & CUSTOMER FEEDBACK SECTION ================= */}
      <section className="w-full bg-[#E9E1D4] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top: 2 Cards Row (Rating Summary & Submit Review Form) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-12 sm:mb-16 items-start">
            
            {/* Left Card: Overall Rating & Breakdown */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-100 flex flex-col space-y-6">
              {/* Rating Top Row */}
              <div className="flex items-center space-x-4">
                <span className="text-4xl sm:text-5xl font-black text-gray-900 leading-none">
                  4.8
                </span>
                <div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <img key={i} src={starIcon} alt="star" className="w-4 h-4 object-contain" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 font-medium mt-1">
                    Based on 124 Reviews
                  </p>
                </div>
              </div>

              {/* Progress Bars Breakdown */}
              <div className="space-y-3">
                {[
                  { star: 5, count: 70, pct: 70 },
                  { star: 4, count: 34, pct: 34 },
                  { star: 3, count: 20, pct: 20 },
                  { star: 2, count: 0, pct: 0 },
                  { star: 1, count: 0, pct: 0 },
                ].map((item) => (
                  <div key={item.star} className="flex items-center space-x-3 text-xs text-gray-800 font-medium">
                    <span className="flex items-center space-x-1 min-w-[28px]">
                      <img src={starIcon} alt="star" className="w-3.5 h-3.5 object-contain" />
                      <span className="font-semibold text-gray-900">{item.star}</span>
                    </span>
                    <div className="flex-1 bg-[#C5B5A5] rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#F8A836] h-full rounded-full transition-all duration-500"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                    <span className="min-w-[20px] text-right text-gray-800 font-semibold">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card: Submit Your Review Form */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-100">
              {/* Form Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  Submit Your Review
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold text-gray-600">Add Your Rating</span>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        key={starVal}
                        type="button"
                        onClick={() => setRating(starVal)}
                        onMouseEnter={() => setHoverRating(starVal)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-0.5 cursor-pointer focus:outline-none transition transform hover:scale-110"
                      >
                        <img
                          src={starIconOutline}
                          alt="star"
                          className={`w-5 h-5 object-contain transition-all ${
                            starVal <= (hoverRating || rating)
                              ? 'scale-110 opacity-100 drop-shadow-sm'
                              : 'opacity-60 hover:opacity-100'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your Name"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-red-500 transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="abc@gmail.com"
                      value={reviewerEmail}
                      onChange={(e) => setReviewerEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-red-500 transition"
                      required
                    />
                  </div>
                </div>

                <div className="text-left">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Description"
                    value={reviewerComment}
                    onChange={(e) => setReviewerComment(e.target.value)}
                    className="w-120 h-35 border border-gray-300 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-red-500 transition resize-none"
                    required
                  />
                </div>

                <div className="text-left pt-1">
                  <button
                    type="submit"
                    className="bg-[#D71920] hover:bg-[#B9151B] text-white text-xs sm:text-sm font-bold px-8 py-2.5 rounded-full shadow-sm hover:shadow transition cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>

          </div>

          {/* Bottom: Customer Feedback List */}
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6">
              Customer Feedback
            </h2>

            <div className="space-y-4">
              {[1, 2].map((id) => (
                <div
                  key={id}
                  className="border border-[#BFAFA0]/80 rounded-xl p-5 sm:p-6 bg-transparent"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full border border-gray-400/60 flex items-center justify-center text-gray-600 bg-white/40 shrink-0">
                        <img src={userIcon} alt="user" className="w-5 h-5 object-contain" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 leading-tight">
                          Rahul S
                        </h4>
                        <span className="text-[11px] sm:text-xs text-gray-500 font-normal">
                          Verified Buyer · 2 days ago
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <img key={i} src={starIcon} alt="star" className="w-4 h-4 object-contain" />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-gray-900 mb-1">
                      Great Experience
                    </h5>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                      Great taste and arrived well packed. The bottle was fresh, properly sealed, and in perfect condition when it arrived. The ordering process was smooth, and the delivery was quick. The refreshing taste was exactly as expected, making it a great choice to enjoy with meals or on its own.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Button */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() => alert('Loading more customer feedback...')}
                className="bg-[#4D413A] hover:bg-[#3D332D] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-lg shadow-sm hover:shadow transition cursor-pointer"
              >
                View More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FREQUENTLY ASKED QUESTIONS SECTION ================= */}
      <section className="w-full bg-[#D3B385] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Column: Heading, Subtitle & "Still Have Questions?" Card */}
            <div className="lg:col-span-5 text-left flex flex-col justify-between">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-1">
                  Frequently asked
                </h2>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E61B23] tracking-tight leading-tight mb-3">
                  questions
                </h2>
                <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium mb-8 sm:mb-12">
                  Everything you need to know before placing your order.
                </p>
              </div>

              {/* Still Have Questions Card */}
              <div className="bg-[#F6EFE6] rounded-2xl p-6 sm:p-7 shadow-sm max-w-sm">
                <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-2">
                  Still Have Questions?
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal mb-6">
                  Need help with your order, product availability, or delivery? Get in touch with the Ravi Sales team.
                </p>
                <Link
                  to="/contact"
                  className="bg-[#D71920] hover:bg-[#B9151B] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full inline-flex items-center space-x-2 transition cursor-pointer shadow-sm"
                >
                  <span>Contact Us</span>
                  <img src={newPhoneIcon} alt="phone" className="w-5 h-5 object-contain ml-1" />
                </Link>
              </div>
            </div>

            {/* Right Column: Accordion List */}
            <div className="lg:col-span-7 space-y-3.5 sm:space-y-4 w-full">
              {faqs.map((faq, index) => {
                const isFaqOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="bg-[#F6EFE6] rounded-xl overflow-hidden shadow-sm transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isFaqOpen ? -1 : index)}
                      className="w-full px-5 sm:px-6 py-4 sm:py-4.5 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                    >
                      <span className="text-xs sm:text-sm font-bold text-gray-900 pr-4">
                        {faq.q}
                      </span>
                      <img
                        src={arrowTriangleIcon}
                        alt="toggle"
                        className={`w-3 h-3 object-contain shrink-0 transition-transform duration-300 ${
                          isFaqOpen ? 'rotate-0' : 'rotate-180'
                        }`}
                      />
                    </button>

                    {isFaqOpen && (
                      <div className="px-5 sm:px-6 pb-4 sm:pb-5 pt-0 text-left">
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ================= RELATED PRODUCTS SECTION ================= */}
      <section className="w-full bg-[#E9E1D4] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-left mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Related Products
            </h2>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100/80 flex flex-col justify-between hover:shadow-md transition-shadow duration-300 group"
              >
                {/* Product Image Frame */}
                <div className="w-full bg-[#CECAC5] rounded-2xl p-4 flex items-center justify-center h-48 sm:h-52 mb-4 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Details */}
                <div className="text-left">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-0.5">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium mb-4">
                    {product.size}
                  </p>

                  {/* View Product CTA with Arrowleft.svg */}
                  <Link
                    to={product.link}
                    className="flex items-center justify-between pt-1 group-hover:text-[#D71920] transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-[#D71920] transition-colors">
                      View Product
                    </span>
                    <img
                      src={arrowLeftIcon}
                      alt="view product"
                      className="w-4 h-4 sm:w-5 sm:h-5 object-contain rotate-180 transition-transform group-hover:translate-x-1 shrink-0"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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