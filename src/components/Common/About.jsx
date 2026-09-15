import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';

import abbanner from '../../assets/about banner.png';
import whoWeAreImg from '../../assets/About WhoWeAre.png';
import mid from '../../assets/about mid.png';
import last from '../../assets/about last.png';
import Arrowrightcircle from '../../assets/ArrowRightCircleWhite.svg';
import Phonecall from '../../assets/PhoneCallBlack.svg';
import connectcontacts from '../../assets/connectcontacts.svg';
import planlight from '../../assets/planlight.svg';
import boxlinear from '../../assets/boxlinear.svg';
import lighttruck from '../../assets/DeliveryTruckBlack.svg';

export default function About() {
  return (
    <div className="bg-[#E9E1D4] text-gray-900 relative overflow-x-hidden min-h-screen flex flex-col justify-between" style={{ fontFamily: 'Arial, sans-serif !important', fontWeight: 400, letterSpacing: 'normal' }}>
      
      {/* ================= HERO & HEADER BANNER ================= */}
      <div className="w-full relative">
        <div
          className="w-full relative bg-cover bg-center bg-no-repeat flex flex-col justify-between min-h-[560px] sm:min-h-[640px] md:min-h-[700px] lg:min-h-[780px]"
          style={{
            backgroundImage: `url(${abbanner})`,
          }}
        >
          {/* Unified Navbar */}
          <Navbar />

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
      <section className=" py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left: Illustration Image */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <img
              src={whoWeAreImg}
              alt="Who We Are - Partner in Beverage Sales"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full object-contain"
            />
          </div>

          {/* Middle: Text Content */}
          <div className="lg:col-span-4 text-center lg:text-left space-y-3 sm:space-y-4">
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-gray-700 block">
              Who We Are
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
              A Reliable Partner in <br />
              <span className="text-[#E62429]">Beverage Sales</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed max-w-md mx-auto lg:mx-0">
              Ravi Sales works across the beverage market to connect products with businesses
            </p>
          </div>

          {/* Right: 3 Feature Cards */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-5">
            <div className="bg-[#E4C495] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm">
              <p className="text-xs sm:text-sm text-gray-800 leading-relaxed text-left">
                We make beverage products more accessible while supporting the sales and distribution
              </p>
            </div>

            <div className="bg-[#E4C495] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm">
              <p className="text-xs sm:text-sm text-gray-800 leading-relaxed text-left">
                We focus on creating reliable connections between beverage brands and markets.
              </p>
            </div>

            <div className="bg-[#E4C495] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm">
              <p className="text-xs sm:text-sm text-gray-800 leading-relaxed text-left">
                Our approach is built around dependable service, strong relationships, and a clear understanding
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT WE DO & APPROACH & WHY US ================= */}
      <div className="bg-[#E9E1D4] text-gray-900 py-10 sm:py-16 overflow-x-hidden ">
        
        {/* 1. What We Do: Card with Image (Flush to Left Screen Edge) */}
        <div className="w-full pb-6">
          <div className="w-full lg:w-[86%] xl:w-[82%] 2xl:w-[78%] mr-auto bg-[#F6F3EE] rounded-l-none rounded-r-[35px] sm:rounded-r-[60px] lg:rounded-r-[90px] shadow-sm py-8 sm:py-12 lg:py-16 pl-4 sm:pl-10 md:pl-14 lg:pl-20 xl:pl-28 pr-4 sm:pr-8 lg:pr-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Text Content */}
              <div className="space-y-5 sm:space-y-6 lg:space-y-7">
                <div>
                  <span className="text-xs sm:text-sm font-semibold tracking-wider text-gray-700 block">
                    What We do
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mt-2 leading-tight max-w-xl">
                    More Than <span className="text-[#E62429]">Moving Products.</span>
                  </h2>
                </div>

                <div className="space-y-4 sm:space-y-5 text-xs sm:text-sm text-gray-700 leading-relaxed">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">Sales</h4>
                    <p className="text-gray-700">We support beverage brands by helping their products reach the right businesses and market opportunities through focused sales efforts.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">Distribution</h4>
                    <p className="text-gray-700">We help ensure products move efficiently through the market, supporting reliable availability for retailers and business partners.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">Market Reach</h4>
                    <p className="text-gray-700">We build connections between beverage brands and businesses, helping products expand their presence across different markets.</p>
                  </div>
                </div>
              </div>

              {/* Right Illustration */}
              <div className="flex justify-center lg:justify-end items-center">
                <img 
                  src={mid} 
                  alt="Moving Products Illustration" 
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain max-h-[360px] sm:max-h-[400px]"
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

          {/* 4 Approach Grid Items */}
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
        <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-[#F6F3EE] shadow-sm space-y-8 sm:space-y-10 mt-12 sm:mt-16">
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
                className="w-full max-w-md object-contain max-h-full"
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

      {/* Unified Footer */}
      <Footer />
    </div>
  );
}