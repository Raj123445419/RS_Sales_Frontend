import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

import Navbar from './Navbar';
import Footer from './Footer';

import product from '../../assets/product.png';
import coco from '../../assets/2.png';
import pepsi from '../../assets/3.png';
import sprite from '../../assets/4.png';
import fanta from '../../assets/5.png';
import nescafe from '../../assets/6.png';
import bisleri from '../../assets/7.png';
import botels from '../../assets/8.png';
import coffee from '../../assets/9.png';
import water from '../../assets/10.png';
import co from '../../assets/11.png';
import pep from '../../assets/13.png';
import bis from '../../assets/14.png';
import drink from '../../assets/15.png';
import or from '../../assets/16.png';
import late from '../../assets/17.png';
import mocha from '../../assets/18.png';
import bisl from '../../assets/19.png';
import beans from '../../assets/20.png';
import Icon from '../../assets/ArrowRightCircleBlack.svg';
import Arrowleft from '../../assets/ArrowUpBlack.svg';
import Arrowrightcircle from '../../assets/ArrowRightCircleWhite.svg';
import Arrowrightcircleblack from '../../assets/ArrowRightCircleBlack.svg';

export default function Products() {
  const [activeTab, setActiveTab] = useState('All');

  // Small Screen Scroll function for categories
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
      name: 'Coco Cola',
      category: 'Carbonated',
      sizes: '250ml - 500ml - 1L',
      image: co,
      to: '/Cocacola' 
    },
    {
      id: 2,
      name: 'Nescafe',
      category: 'Coffee',
      sizes: '250ml - 500ml - 1L',
      image: nescafe,
      to: '/gallery' 
    },
    {
      id: 3,
      name: 'Pepsi',
      category: 'Carbonated',
      sizes: '250ml - 500ml - 1L',
      image: pep,
      to: '/gallery' 
    },
    {
      id: 4,
      name: 'Bisleri',
      category: 'Water',
      sizes: '250ml - 500ml - 1L',
      image: bis,
      to: '/gallery' 
    }
  ];

  // Filters
  const filteredProducts = activeTab === 'All' 
    ? products 
    : products.filter(item => item.category === activeTab);

  return (
    <div className="bg-[#F5F0E6] text-gray-900 relative overflow-x-hidden min-h-screen flex flex-col justify-between" style={{ fontFamily: 'Arial, sans-serif !important', fontWeight: 400, letterSpacing: 'normal' }}>
      
      {/* HERO / NAVBAR CONTAINER */}
      <div className="w-full relative">
        <div
          className="w-full relative min-h-[360px] sm:min-h-[550px] lg:min-h-[720px] bg-cover bg-center lg:bg-bottom bg-no-repeat flex flex-col justify-between"
          style={{
            backgroundImage: `url(${product})`,
          }}
        >
          {/* Unified Navbar */}
          <Navbar />

          {/* Hero Section Content (Text) */}
          <div className="w-full flex flex-col justify-center items-center text-center px-4 py-16 mb-70 pointer-events-none">
            <div className="pointer-events-auto max-w-3xl mx-auto space-y-1.5 sm:space-y-3">
              <p className="text-[10px] xs:text-xs sm:text-base md:text-xl font-bold tracking-widest text-gray-800 uppercase">
                Carbonated <span className="mx-1 text-red-600">•</span> Coffee <span className="mx-1 text-red-600">•</span> Packaged Water
              </p>
              
              <h1 className="font-black text-gray-900 tracking-tight leading-tight">
                <span className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl block">ONE RANGE.</span>
                <span className="text-[#D71920] text-2xl xs:text-3xl sm:text-5xl md:text-6xl block mt-0.5 sm:mt-2">EVERY SIZE.</span>
              </h1>

              <p className="text-xs sm:text-base md:text-lg font-semibold text-gray-700 pt-1">
                Explore Our Range
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BRAND LOGOS BAR */}
      <div className="w-full bg-[#E4C495]/90 backdrop-blur-sm px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-center pointer-events-auto shadow-inner">
        <div className="max-w-7xl w-full grid grid-cols-3 sm:grid-cols-6 items-center justify-items-center gap-4 sm:gap-6 md:gap-8 opacity-90">
          <div className="h-10 sm:h-14 md:h-18 flex items-center justify-center">
            <img src={coco} alt="Coca-Cola" className="max-h-full w-auto object-contain transform transition-transform duration-300 hover:scale-110" />
          </div>
          <div className="h-7 sm:h-10 md:h-12 flex items-center justify-center">
            <img src={pepsi} alt="Pepsi" className="max-h-full w-auto object-contain transform transition-transform duration-300 hover:scale-110" />
          </div>
          <div className="h-7 sm:h-10 md:h-12 flex items-center justify-center">
            <img src={sprite} alt="Sprite" className="max-h-full w-auto object-contain transform transition-transform duration-300 hover:scale-110" />
          </div>
          <div className="h-9 sm:h-12 md:h-16 flex items-center justify-center">
            <img src={fanta} alt="Fanta" className="max-h-full w-auto object-contain transform transition-transform duration-300 hover:scale-110" />
          </div>
          <div className="h-9 sm:h-12 md:h-16 flex items-center justify-center">
            <img src={nescafe} alt="Nescafe" className="max-h-full w-auto object-contain transform transition-transform duration-300 hover:scale-110" />
          </div>
          <div className="h-8 sm:h-11 md:h-14 flex items-center justify-center">
            <img src={bisleri} alt="Bisleri" className="max-h-full w-auto object-contain transform transition-transform duration-300 hover:scale-110" />
          </div>
        </div>
      </div>

      {/* OUR CATEGORIES SECTION */}
      <section className="w-full py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F0E6] relative">
        <div className="max-w-7xl mx-auto text-center">
          
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-gray-600 uppercase mb-1 sm:mb-2">
            Our Categories
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-8 sm:mb-14">
            Explore Our Range
          </h2>

          <div className="relative">
            <button 
              onClick={() => scroll('left')}
              className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 -ml-2 z-10 bg-white/90 hover:bg-black hover:text-white text-gray-900 p-2 rounded-full shadow-md border border-gray-300 transition-all duration-300 cursor-pointer"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button 
              onClick={() => scroll('right')}
              className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 -mr-2 z-10 bg-white/90 hover:bg-black hover:text-white text-gray-900 p-2 rounded-full shadow-md border border-gray-300 transition-all duration-300 cursor-pointer"
              aria-label="Scroll Right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div 
              ref={scrollRef}
              className="flex md:grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-none px-2 sm:px-0 pb-4 md:pb-0 items-stretch"
            >
              
              {/* Card 1: Botels */}
              <div className="min-w-[82%] sm:min-w-[70%] md:min-w-0 snap-center bg-[#F5F0E6] border border-gray-400/60 rounded-3xl p-5 sm:p-8 flex flex-col justify-between items-start text-left relative shadow-sm hover:shadow-md transition duration-300 group">
                <div className="w-full h-36 sm:h-44 flex items-center justify-center my-2 sm:my-4">
                  <img 
                    src={botels} 
                    alt="Carbonated Drinks" 
                    className="max-h-40 sm:max-h-50 max-w-full object-contain transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <div className="w-full flex items-end justify-between mt-4 sm:mt-6">
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-900 leading-snug">
                    Carbonated<br />Drinks
                  </h3>
                  <Link 
                    to="/products" 
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  >
                    <img src={Icon} className="h-9 w-9 sm:h-11 sm:w-11" alt="icon" />
                  </Link>
                </div>
              </div>

              {/* Card 2: Coffee */}
              <div className="min-w-[82%] sm:min-w-[70%] md:min-w-0 snap-center bg-[#F5F0E6] border border-gray-400/60 rounded-3xl p-5 sm:p-8 flex flex-col justify-between items-start text-left relative shadow-sm hover:shadow-md transition duration-300 group">
                <div className="w-full h-36 sm:h-44 flex items-center justify-center my-2 sm:my-7">
                  <img 
                    src={coffee} 
                    alt="Coffee" 
                    className="max-h-40 sm:max-h-50 max-w-full object-contain transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <div className="w-full flex items-end justify-between mt-4 sm:mt-6">
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-900 leading-snug">
                    Coffee
                  </h3>
                  <Link 
                    to="/products" 
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  >
                    <img src={Icon} className="h-9 w-9 sm:h-11 sm:w-11" alt="icon" />
                  </Link>
                </div>
              </div>

              {/* Card 3: Water */}
              <div className="min-w-[82%] sm:min-w-[70%] md:min-w-0 snap-center bg-[#F5F0E6] border border-gray-400/60 rounded-3xl p-5 sm:p-8 flex flex-col justify-between items-start text-left relative shadow-sm hover:shadow-md transition duration-300 group">
                <div className="w-full h-36 sm:h-44 flex items-center justify-center my-2">
                  <img 
                    src={water} 
                    alt="Packaged Water" 
                    className="max-h-48 sm:max-h-65 max-w-full object-contain m-auto transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <div className="w-full flex items-end justify-between mt-4 sm:mt-6">
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-900 leading-snug">
                    Packaged<br />Water
                  </h3>
                  <Link 
                    to="/products" 
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  >
                    <img src={Icon} className="h-9 w-9 sm:h-11 sm:w-11" alt="icon" />
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* FEATURED PRODUCTS SECTION */}
      {/* ========================================================================= */}
      <section className="w-full py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F0E6]">
        <div className="max-w-7xl mx-auto">
          
          {/* Header & Filter Tabs */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sm:mb-12 gap-4 sm:gap-6">
            <div>
              <p className="text-xs sm:text-sm font-semibold tracking-wider text-red-600 uppercase mb-1">
                Top Selections
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
                Featured Products
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="w-full md:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#D8D3CB]/90 backdrop-blur-sm p-1.5 rounded-2xl sm:rounded-full shadow-inner min-w-max">
                {['All', 'Carbonated', 'Coffee', 'Water'].map((tab) => {
                  const count = tab === 'All' 
                    ? products.length 
                    : products.filter(item => item.category === tab).length;
                  const isActive = activeTab === tab;

                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex items-center space-x-1.5 sm:space-x-2 px-3.5 sm:px-5 py-2 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer shrink-0 ${
                        isActive
                          ? 'bg-[#E5383B] text-white shadow-md transform scale-[1.02]'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-black/5'
                      }`}
                    >
                      <span>{tab}</span>
                      <span className={`text-[10px] sm:text-xs px-1.5 py-0.2 rounded-full font-bold transition-colors ${
                        isActive ? 'bg-white/25 text-white' : 'bg-black/10 text-gray-700'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((productItem) => (
              <div 
                key={productItem.id}
                className="bg-[#FFFFFFCC] hover:bg-white border border-gray-300/80 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 flex flex-row sm:flex-col justify-between items-center sm:items-stretch shadow-sm hover:shadow-xl transition-all duration-300 group gap-3.5 sm:gap-4"
              >
                {/* Product Image Container */}
                <div className="w-24 xs:w-28 sm:w-full h-28 xs:h-32 sm:h-52 bg-[#E5E1D8] rounded-xl sm:rounded-2xl flex items-center justify-center p-2.5 sm:p-4 overflow-hidden relative shrink-0 transition-colors duration-300 group-hover:bg-[#dfd9ce]">
                  <img 
                    src={productItem.image} 
                    alt={productItem.name} 
                    className="max-h-full max-w-full object-contain m-auto transition-transform duration-500 group-hover:scale-110 drop-shadow-sm" 
                  />
                </div>

                {/* Details Container */}
                <div className="flex-1 sm:w-full flex flex-col justify-between h-full min-w-0 text-left">
                  <div>
                    <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded-full mb-1">
                      {productItem.category}
                    </span>
                    <h3 className="text-sm xs:text-base sm:text-lg lg:text-xl font-bold text-gray-900 leading-snug group-hover:text-[#E5383B] transition-colors truncate sm:whitespace-normal">
                      {productItem.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs lg:text-sm text-gray-600 mt-0.5 mb-2 sm:mb-4 font-medium">
                      {productItem.sizes}
                    </p>
                  </div>

                  {/* View Product Link */}
                  <Link 
                    to={productItem.to || "/gallery"} 
                    className="flex items-center justify-between text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-[#E5383B] transition-colors duration-300 pt-2 sm:pt-3 border-t border-gray-200/80 mt-auto"
                  >
                    <span>View Product</span>
                    <img src={Arrowleft} className="h-4 w-4 sm:h-5 sm:w-5 object-contain rotate-180 transition-transform duration-300 group-hover:translate-x-1 shrink-0" alt="Arrow" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* CARBONATED PROMO BANNER */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#F5F0E6] px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex justify-center">
        <div className="w-full max-w-7xl flex flex-col md:flex-row bg-[#E4C495] rounded-3xl overflow-hidden md:overflow-visible items-center relative shadow-md">
          
          <div className="w-full md:w-1/2 h-[220px] xs:h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px] md:-mt-10 md:-mb-6 flex items-center justify-center p-4">
            <img 
              src={drink}  
              alt="Carbonated Drinks"
              className="scale-x-[-1] max-h-full md:max-h-[140%] max-w-full md:max-w-[140%] object-contain filter drop-shadow-xl"
            />
          </div>

          <div className="w-full md:w-1/2 p-6 sm:p-10 lg:p-14 flex flex-col justify-center text-left">
            <p className="text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">
              Carbonated Drinks
            </p>
            
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-3 sm:mb-4">
              Refreshment in <br />
              <span className="text-[#D71920]">every size.</span>
            </h2>

            <p className="text-xs sm:text-sm lg:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
              Explore a wide range of popular carbonated beverages from some of the world's most recognized brands.
            </p>

            <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-6 sm:mb-8">
              Coca-Cola <span className="mx-1 text-red-600">•</span> Pepsi <span className="mx-1 text-red-600">•</span> Fanta <span className="mx-1 text-red-600">•</span> Sprite
            </p>

            <div>
              <Link 
                to="/products" 
                className="inline-flex items-center space-x-2 bg-[#D71920] hover:bg-red-800 text-white text-xs sm:text-sm font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-md transition-all duration-300 group cursor-pointer"
              >
                <span>View Range</span>
                <img src={Arrowrightcircle} className="h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" alt="arrow" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* NESCAFE COFFEE SECTION */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#524646C4] my-8 sm:my-16 py-8 sm:py-12 lg:py-0 flex flex-col lg:flex-row items-center lg:h-110 gap-8 lg:gap-0">
        <div className="p-4 sm:p-8 lg:p-10 w-full lg:w-[40%] h-full flex items-center">
          <div className="w-full min-h-[260px] sm:min-h-[350px] relative flex flex-col justify-center p-6 overflow-hidden rounded-xl">
            
            {/* Background Image with 1px Blur Effect */}
            <div 
              className="absolute inset-0 bg-contain bg-center bg-no-repeat filter blur-[1px] scale-105 pointer-events-none opacity-40 lg:opacity-100"
              style={{ backgroundImage: `url(${beans})` }}
            ></div>

            {/* Content Container */}
            <div className="relative z-10 ml-0 sm:ml-4 lg:ml-10 text-left">
              <h2 className="text-3xl sm:text-5xl font-black text-[#E4C495] tracking-tight mb-3 drop-shadow-md font-sans">
                NESCAFÉ
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-[#f3ede2] mb-6 sm:mb-8 leading-relaxed font-normal max-w-[320px] drop-shadow">
                Classic instant coffee with a rich, bold and aromatic taste.
              </p>
              <div>
                <Link 
                  to="/products" 
                  className="inline-flex items-center space-x-3 bg-[#e31b23] hover:bg-red-700 text-white text-xs sm:text-sm font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-lg transition-all duration-300 group cursor-pointer"
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
        <div className="w-full lg:w-[60%] grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 items-center px-4 sm:px-8 lg:px-4 lg:pr-10">
          
          {/* Card 1: Original */}
          <div 
            className="rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between items-center text-left mx-auto w-full max-w-[180px] sm:max-w-[220px] h-[240px] sm:h-[270px] transition-transform hover:-translate-y-1 duration-300"
            style={{ 
              backgroundColor: '#E4DFD5', 
              boxShadow: '0 15px 30px -5px #76544380' 
            }}
          >
            <div className="w-full h-28 sm:h-36 flex items-center justify-center mb-2">
              <img src={or} alt="Original" className="max-h-[110px] sm:max-h-[145px] object-contain filter" />
            </div>
            <div className="w-full">
              <p className="text-[9px] sm:text-[10px] text-zinc-600 uppercase font-semibold tracking-wider">Nescafe</p>
              <h3 className="text-sm sm:text-base font-bold text-zinc-900 mb-0.5">Original</h3>
              <p className="text-[10px] sm:text-[11px] text-zinc-700 leading-tight">Rich & classic coffee</p>
            </div>
          </div>

          {/* Card 2: Latte */}
          <div 
            className="rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between items-center text-left mx-auto w-full max-w-[180px] sm:max-w-[220px] h-[240px] sm:h-[270px] transition-transform hover:-translate-y-1 duration-300"
            style={{ 
              backgroundColor: '#E4DFD5', 
              boxShadow: '0 15px 30px -5px #76544380' 
            }}
          >
            <div className="w-full h-28 sm:h-36 flex items-center justify-center mb-2">
              <img src={late} alt="Latte" className="max-h-[110px] sm:max-h-[145px] object-contain filter" />
            </div>
            <div className="w-full">
              <p className="text-[9px] sm:text-[10px] text-zinc-600 uppercase font-semibold tracking-wider">Nescafe</p>
              <h3 className="text-sm sm:text-base font-bold text-zinc-900 mb-0.5">Latte</h3>
              <p className="text-[10px] sm:text-[11px] text-zinc-700 leading-tight">Smooth & creamy coffee</p>
            </div>
          </div>

          {/* Card 3: Mocha */}
          <div 
            className="col-span-2 lg:col-span-1 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between items-center text-left mx-auto w-full max-w-[180px] sm:max-w-[220px] h-[240px] sm:h-[270px] transition-transform hover:-translate-y-1 duration-300"
            style={{ 
              backgroundColor: '#E4DFD5', 
              boxShadow: '0 15px 30px -5px #76544380' 
            }}
          >
            <div className="w-full h-28 sm:h-36 flex items-center justify-center mb-2">
              <img src={mocha} alt="Mocha" className="max-h-[110px] sm:max-h-[145px] object-contain filter" />
            </div>
            <div className="w-full">
              <p className="text-[9px] sm:text-[10px] text-zinc-600 uppercase font-semibold tracking-wider">Nescafe</p>
              <h3 className="text-sm sm:text-base font-bold text-zinc-900 mb-0.5">Mocha</h3>
              <p className="text-[10px] sm:text-[11px] text-zinc-700 leading-tight">Coffee with rich chocolate</p>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* BISLERI / WATER SHOWCASE */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#EFECE6] py-8 sm:py-12 px-4 sm:px-8 lg:px-0 lg:pl-16 flex items-center justify-between overflow-hidden font-sans">
        <div className="w-full max-w-7xl mx-auto lg:max-w-none flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Left Section: Headings and Paragraph */}
          <div className="w-full lg:w-[32%] flex flex-col justify-center text-left">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-[#C91C1C] tracking-tight leading-[1.05] mb-3 sm:mb-4">
              LET'S GET <br />
              YOUR <br />
              PRODUCTS <br />
              MOVING.
            </h2>
            <p className="text-xs sm:text-sm text-[#4A453F] font-medium leading-relaxed max-w-[280px]">
              Looking for a reliable beverage partner? <br />
              Let's connect and grow together.
            </p>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-[68%] bg-[#DCD6CC] rounded-3xl lg:rounded-l-[60px] lg:rounded-r-none p-6 sm:p-10 lg:p-14 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 relative shadow-sm">
            
            {/* Group of Bisleri Bottles Image */}
            <div className="w-full md:w-[55%] flex items-center justify-center">
              <img 
                src={bisl} 
                alt="Bisleri Products" 
                className="w-full max-w-[320px] sm:max-w-[420px] h-auto object-contain filter drop-shadow-md" 
              />
            </div>

            {/* Right Content */}
            <div className="w-full md:w-[45%] flex flex-col items-center md:items-end text-center md:text-right">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A] tracking-tight mb-4 sm:mb-6">
                Water for <span className="text-[#C91C1C]">Every Need.</span>
              </h3>
              
              {/* Sizes */}
              <div className="text-[11px] sm:text-xs font-bold text-[#333333] tracking-wider mb-2 flex items-center space-x-1.5 justify-center md:justify-end">
                <span>250ml</span>
                <span className="text-zinc-500">-</span>
                <span>500ml</span>
                <span className="text-zinc-500">-</span>
                <span>1L</span>
                <span className="text-zinc-500">-</span>
                <span>2L</span>
              </div>

              {/* Description */}
              <p className="text-[11px] sm:text-xs text-[#555555] font-normal leading-relaxed mb-6 max-w-[260px]">
                Clean, convenient hydration for every occasion, available in multiple pack sizes.
              </p>

              {/* Arrow Button Link */}
              <div className="flex justify-center md:justify-end w-full">
                <Link 
                  to="/products" 
                  className="flex items-center justify-center transition-all duration-300 group cursor-pointer"
                >
                  <img src={Arrowrightcircleblack} className="h-8 sm:h-9 text-[#333333] group-hover:scale-110 transition-transform" alt="arrow" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Unified Footer */}
      <Footer />
    </div>
  );
}
