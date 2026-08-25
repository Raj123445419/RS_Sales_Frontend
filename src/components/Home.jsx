import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, User } from 'lucide-react';

import logoImg from '../assets/rs-logo.png';
import login from '../assets/login.svg';
import cart from '../assets/cart.svg';
import heroBg from '../assets/hero-bg.png';
import coco from '../assets/coco-cola.png';
import sprite from '../assets/sprite.png';
import pepsi from '../assets/pepsi.png';
import fanta from '../assets/fanta.png';
import last from '../assets/delivery-man.png';
import handshake from '../assets/handshake.svg';
import home from '../assets/home.svg';
import cal from '../assets/cal.svg';
import customer from '../assets/customer1.svg';
import Phonecall from '../assets/Phonecall.svg';
import Arrowrightcircle from '../assets/Arrowrightcircle.svg';
import Arrowrightcirclered from '../assets/Arrowrightcirclered.svg';
import Shoppingcart from '../assets/Shopping cart.svg';
import Truck from '../assets/Truck.svg';
import Globe from '../assets/Globe.svg';
import body from '../assets/delivery-truck.png';
import storethin from '../assets/storethin.svg';
import cartoutline from '../assets/cartoutline.svg';
import hotelbell from '../assets/hotelbell.svg';
import cafeteria from '../assets/cafeteria.svg';
import cyberbuilding from '../assets/cyberbuilding.svg';
import Arrowrightcircleblack from '../assets/Arrowrightcircleblack.svg';
import HeadPhon from '../assets/HeadPhon.svg';
import mailoutline from '../assets/mailoutline.svg';
import Phonecallwhite from '../assets/Phonecallwhite.svg';
import instagram from '../assets/instagram.svg';
import facebook from '../assets/facebook.svg';
import Vector from '../assets/Vector.svg';

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
          className="w-full relative bg-cover bg-center bg-no-repeat flex flex-col justify-between min-h-[560px] sm:min-h-[640px] md:min-h-[720px] lg:min-h-[820px] xl:min-h-[920px]"
          style={{
            backgroundImage: `url(${heroBg})`,
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
                  <Link to="/" className="text-[#FEC26C] font-semibold transition hover:text-[#B2B2B2]">Home</Link>
                  <Link to="/about" className="hover:text-[#FEC26C] text-[#B2B2B2] transition duration-200">About</Link>
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
                <Link to="/" onClick={() => setIsOpen(false)} className="block text-[#FEC26C] font-semibold py-2.5 px-3 rounded-lg bg-white/10">Home</Link>
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

          {/* Hero Content */}
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16 lg:py-24 flex items-center flex-grow">
            <div className="max-w-xl space-y-4 sm:space-y-6 text-center sm:text-left mx-auto sm:mx-0">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                Delivering <br />
                <span className="text-red-600">Quality Drinks,</span> <br />
                Every Time
              </h1>
              <p className="text-slate-900 lg:text-black text-sm sm:text-base lg:text-lg max-w-lg">
                Ravi Sales is a trusted distributor of quality beverages, delivering your favorite brands with reliability and excellence.
              </p>

              <div className="flex flex-row items-center justify-center sm:justify-start gap-3 sm:gap-4 pt-2">
                <Link to="/contact" className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-lg transition duration-300 flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base">
                  <span>Get a Quote</span>
                  <img src={Arrowrightcircle} className="h-6 w-6 sm:h-[35px] sm:w-[35px]" alt="arrow" />
                </Link>
                <a href="tel:+919999900000" className="bg-[#FEC26C] hover:bg-amber-300 rounded-full shadow-md transition duration-300 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                  <img src={Phonecall} className="h-5 w-5" alt="phone" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20 pb-8 sm:pb-12" style={{ fontFamily: 'Arial, sans-serif !important', fontWeight: 400, letterSpacing: 'normal' }}>
        <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          <div className="flex items-center space-x-2.5 sm:space-x-4 p-2 sm:p-4 border-r border-b md:border-b-0 border-gray-100">
            <img src={handshake} className="h-8 w-8 sm:h-12 sm:w-12 text-black shrink-0" alt="trust" />
            <div className="text-left">
              <h3 className="text-xl sm:text-3xl font-bold text-black">10+</h3>
              <p className="text-[11px] sm:text-sm text-black font-medium mt-0.5 sm:mt-1">Years of Trust</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 sm:space-x-4 p-2 sm:p-4 border-b md:border-b-0 md:border-r border-gray-100">
            <img src={home} className="h-8 w-8 sm:h-12 sm:w-12 text-black shrink-0" alt="retailers" />
            <div className="text-left">
              <h3 className="text-xl sm:text-3xl font-bold text-red-600">500+</h3>
              <p className="text-[11px] sm:text-sm text-black font-medium mt-0.5 sm:mt-1">Retailers Served</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 sm:space-x-4 p-2 sm:p-4 border-r md:border-r border-gray-100">
            <img src={cal} className="h-8 w-8 sm:h-12 sm:w-12 shrink-0" alt="brands" />
            <div className="text-left">
              <h3 className="text-xl sm:text-3xl font-bold text-black">25+</h3>
              <p className="text-[11px] sm:text-sm text-black font-medium mt-0.5 sm:mt-1">Brands Available</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 sm:space-x-4 p-2 sm:p-4">
            <img src={customer} className="h-8 w-8 sm:h-12 sm:w-12 shrink-0" alt="satisfaction" />
            <div className="text-left">
              <h3 className="text-xl sm:text-3xl font-bold text-red-600">100%</h3>
              <p className="text-[11px] sm:text-sm text-black font-medium mt-0.5 sm:mt-1">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Range */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" style={{ fontFamily: 'Arial, sans-serif' }}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider mb-1">
              Our Product Range
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold text-black leading-tight">
              Beverages for <br />
              <span className="text-red-600">Every Need</span>
            </h2>
          </div>

          <button
            className="self-start sm:self-auto flex items-center text-[#D71920] space-x-3 sm:space-x-5 border-2 sm:border-3 border-black px-5 sm:px-7 py-1.5 rounded-full text-xs sm:text-sm font-bold hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
            onClick={() => navigate('/products')}
          >
            <span>View All Products</span>
            <img src={Arrowrightcirclered} className="h-6 w-6 sm:h-[32px] sm:w-[32px]" alt="arrow" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          <div className="rounded-3xl p-3 sm:p-6 flex flex-col bg-[#FFFFFF] items-center justify-between border border-black/10 shadow-sm">
            <div className="relative w-full h-44 sm:h-52 flex items-center justify-center my-2">
              <img
                src={coco}
                alt="Coco Cola"
                className="max-h-40 sm:max-h-48 w-auto max-w-full object-contain drop-shadow-xl hover:-translate-y-2 transition-transform duration-300 z-10"
              />
            </div>
            <div className="text-center mt-3 sm:mt-4 w-full">
              <h3 className="text-sm sm:text-lg font-bold text-black mb-2 sm:mb-3">Coco Cola</h3>
              <button onClick={() => navigate('/products')} className="w-full py-2 bg-[#E62429] text-white text-xs sm:text-sm font-bold rounded-lg shadow hover:bg-red-700 transition-colors uppercase tracking-wider cursor-pointer">
                shop
              </button>
            </div>
          </div>

          <div className="rounded-3xl p-3 sm:p-6 flex bg-[#FFFFFF] flex-col items-center justify-between border border-black/10 shadow-sm">
            <div className="relative w-full h-44 sm:h-52 flex items-center justify-center my-2">
              <img
                src={sprite}
                alt="Sprite"
                className="max-h-40 sm:max-h-48 w-auto max-w-full object-contain drop-shadow-xl hover:-translate-y-2 transition-transform duration-300 z-10"
              />
            </div>
            <div className="text-center mt-3 sm:mt-4 w-full">
              <h3 className="text-sm sm:text-lg font-bold text-black mb-2 sm:mb-3">Sprite</h3>
              <button onClick={() => navigate('/products')} className="w-full py-2 bg-[#2B8A3E] text-white text-xs sm:text-sm font-bold rounded-lg shadow hover:bg-green-700 transition-colors uppercase tracking-wider cursor-pointer">
                shop
              </button>
            </div>
          </div>

          <div className="rounded-3xl p-3 sm:p-6 bg-[#FFFFFF] flex flex-col items-center justify-between border border-black/10 shadow-sm">
            <div className="relative w-full h-44 sm:h-52 flex items-center justify-center my-2">
              <img
                src={pepsi}
                alt="Pepsi"
                className="max-h-40 sm:max-h-48 w-auto max-w-full object-contain drop-shadow-xl hover:-translate-y-2 transition-transform duration-300 z-10"
              />
            </div>
            <div className="text-center mt-3 sm:mt-4 w-full">
              <h3 className="text-sm sm:text-lg font-bold text-black mb-2 sm:mb-3">Pepsi</h3>
              <button onClick={() => navigate('/products')} className="w-full py-2 bg-[#3B30B5] text-white text-xs sm:text-sm font-bold rounded-lg shadow hover:bg-indigo-800 transition-colors uppercase tracking-wider cursor-pointer">
                shop
              </button>
            </div>
          </div>

          <div className="rounded-3xl p-3 sm:p-6 bg-[#FFFFFF] flex flex-col items-center justify-between border border-black/10 shadow-sm">
            <div className="relative w-full h-44 sm:h-52 flex items-center justify-center my-2">
              <img
                src={fanta}
                alt="Fanta"
                className="max-h-40 sm:max-h-48 w-auto max-w-full object-contain drop-shadow-xl hover:-translate-y-3 transition-transform duration-400 z-10"
              />
            </div>
            <div className="text-center mt-3 sm:mt-4 w-full">
              <h3 className="text-sm sm:text-lg font-bold text-black mb-2 sm:mb-3">Fanta</h3>
              <button onClick={() => navigate('/products')} className="w-full py-2 bg-[#EC6608] text-white text-xs sm:text-sm font-bold rounded-lg shadow hover:bg-orange-600 transition-colors uppercase tracking-wider cursor-pointer">
                shop
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center border border-gray-100">
          <div className="space-y-4">
            <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider">
              What we do
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-black leading-tight">
              From Beverage Brands to <br />
              <span className="text-red-600">the Market.</span>
            </h2>
            <p className="text-xs sm:text-base text-gray-600 leading-relaxed pt-1 sm:pt-2">
              Ravi Sales helps beverage brands reach the right markets by managing sales, distribution and business relationships. We connect products with retailers and businesses, helping create a smoother path from brand to customer.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="bg-[#A48355BD] transition-all rounded-2xl p-4 sm:p-5 flex items-center space-x-4 sm:space-x-5 shadow-sm border border-[#e6d3bc]/50 min-h-[5rem]">
              <img src={Shoppingcart} className="h-8 w-8 sm:h-10 sm:w-10 shrink-0" alt="Sales" />
              <div className="flex flex-col justify-center">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">Sales</h3>
                <p className="text-xs sm:text-sm text-gray-700 mt-0.5 sm:mt-1 leading-normal">
                  We help beverage products reach the right customers and business partners through focused sales support.
                </p>
              </div>
            </div>

            <div className="bg-[#A48355BD] transition-all rounded-2xl p-4 sm:p-5 flex items-center space-x-4 sm:space-x-5 shadow-sm border border-[#e6d3bc]/50 min-h-[5rem]">
              <img src={Truck} className="h-8 w-8 sm:h-10 sm:w-10 shrink-0" alt="Distribution" />
              <div className="flex flex-col justify-center">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">Distribution</h3>
                <p className="text-xs sm:text-sm text-gray-700 mt-0.5 sm:mt-1 leading-normal">
                  We help move products efficiently across the market, supporting reliable availability for retailers and businesses.
                </p>
              </div>
            </div>

            <div className="bg-[#A48355BD] transition-all rounded-2xl p-4 sm:p-5 flex items-center space-x-4 sm:space-x-5 shadow-sm border border-[#e6d3bc]/50 min-h-[5rem]">
              <img src={Globe} className="h-8 w-8 sm:h-10 sm:w-10 shrink-0" alt="Market Reach" />
              <div className="flex flex-col justify-center">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">Market Reach</h3>
                <p className="text-xs sm:text-sm text-gray-700 mt-0.5 sm:mt-1 leading-normal">
                  We build connection between beverage brands and businesses to expand product availability and market presence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex justify-center">
            <img
              src={body}
              alt="Delivery Van"
              className="w-full max-w-sm sm:max-w-md lg:max-w-lg object-contain drop-shadow-2xl rounded-3xl"
            />
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">
                Why Choose Us
              </p>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-black leading-tight">
                Your Growth is <span className="text-red-600 decoration-2">Our Priority</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
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

      {/* Who we serve & Let's grow together */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">
                Who we serve
              </p>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-black leading-tight">
                Serving Businesses <br />
                <span className="text-red-600">Across Industries</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-6 pt-2 sm:pt-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl sm:rounded-3xl shadow-[0_0_20px_rgba(239,68,68,0.3)] border-2 border-red-500 flex items-center justify-center hover:scale-105 transition-all duration-300">
                  <img src={storethin} className="h-8 w-8 sm:h-10 sm:w-10" alt="Retail Stores" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-black mt-2 sm:mt-3 text-center">Retail Stores</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl sm:rounded-3xl shadow-[0_0_20px_rgba(239,68,68,0.3)] border-2 border-red-500 flex items-center justify-center hover:scale-105 transition-all duration-300">
                  <img src={cartoutline} className="h-8 w-8 sm:h-10 sm:w-10" alt="Super Market" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-black mt-2 sm:mt-3 text-center">Super Market</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl sm:rounded-3xl shadow-[0_0_20px_rgba(239,68,68,0.3)] border-2 border-red-500 flex items-center justify-center hover:scale-105 transition-all duration-300">
                  <img src={hotelbell} className="h-8 w-8 sm:h-10 sm:w-10" alt="Restaurants" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-black mt-2 sm:mt-3 text-center">Restaurants</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl sm:rounded-3xl shadow-[0_0_20px_rgba(239,68,68,0.3)] border-2 border-red-500 flex items-center justify-center hover:scale-105 transition-all duration-300">
                  <img src={cafeteria} className="h-8 w-8 sm:h-10 sm:w-10" alt="Cafes & Hotels" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-black mt-2 sm:mt-3 text-center">Cafes & Hotels</span>
              </div>

              <div className="flex flex-col items-center col-span-2 sm:col-span-1 justify-self-center sm:justify-self-auto w-full sm:w-auto">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl sm:rounded-3xl shadow-[0_0_20px_rgba(239,68,68,0.3)] border-2 border-red-500 flex items-center justify-center hover:scale-105 transition-all duration-300 mx-auto">
                  <img src={cyberbuilding} className="h-8 w-8 sm:h-10 sm:w-10" alt="Institutions" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-black mt-2 sm:mt-3 text-center">Institutions</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#E62429] text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-3 sm:space-y-4 z-10">
              <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
                Let’s Grow <br />
                <span className="text-amber-200">Together</span>
              </h2>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                Join hands with Ravi Sales and take your business to the next level.
              </p>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4 pt-6 sm:pt-8 z-10">
              <button
                onClick={() => navigate('/contact')}
                className="bg-[#FEC26C] text-black hover:bg-amber-100 font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-lg transition flex items-center space-x-2 text-xs sm:text-sm cursor-pointer"
              >
                <span>Get a Quote</span>
                <img src={Arrowrightcircleblack} className="h-6 w-6 sm:h-7 sm:w-7" alt="arrow" />
              </button>
              <a
                href="tel:+919999900000"
                className="bg-[#FEC26C] hover:bg-white/30 text-white p-2.5 sm:p-3 rounded-full transition flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 shadow"
              >
                <img src={Phonecall} className="h-4 w-4 sm:h-5 sm:w-5" alt="phone" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Ravi Sales Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4">
            <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider">
              About Ravi Sales
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-black leading-tight">
              A Sales Partner Built for the <br />
              <span className="text-red-600">Beverage Market.</span>
            </h2>
            <p className="text-xs sm:text-base text-gray-600 leading-relaxed pt-1 sm:pt-2">
              Ravi Sales is focused on helping beverage brands and businesses connect through efficient sales, distribution and market support. Our approach is simple — build strong partnerships, deliver reliably and help products reach more customers.
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src={last}
              alt="Beverage Delivery Partner"
              className="w-full max-w-sm sm:max-w-md object-contain drop-shadow-xl rounded-3xl"
            />
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-[#E4C495] border border-black/10 rounded-3xl p-6 sm:p-10 lg:p-12 text-center shadow-sm relative overflow-hidden">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">
            LET'S WORK TOGETHER
          </p>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-black mb-3">
            Ready to Grow Your Beverage Business?
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 max-w-xl mx-auto">
            Whether you’re a beverage brand looking to expand or a business looking for reliable product supply, let’s start a conversation.
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