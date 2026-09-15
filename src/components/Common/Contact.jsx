import React, { useState } from 'react';

import Navbar from './Navbar';
import Footer from './Footer';

import Arrowrightcircle from '../../assets/ArrowRightCircleWhite.svg';
import contactBg from '../../assets/image 47.png';
import salesmenImg from '../../assets/image 48.png';
import Phonecall from '../../assets/Phone.svg';
import mail from '../../assets/MailBlack.svg';
import whatsapp from '../../assets/mingcute_whatsapp-fill.svg';
import location_on from '../../assets/location_on.svg';

export default function Contact() {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    subject: '',
    description: ''
  });

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
        {/* Unified Navbar */}
        <Navbar />
      </div>

      {/* ================= HERO BANNER SECTION ================= */}
      <section className="w-full relative flex-grow min-h-[460px] sm:min-h-[520px] md:min-h-[560px] lg:min-h-[600px] flex items-center overflow-hidden select-none bg-[#EDE7DD]">
        
        {/* Layer 1 (Furthest Back): Background Image */}
        <img
          src={contactBg}
          alt="Contact Background Texture"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        />

        {/* Layer 2 (Middle): Employees Illustration */}
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
            
            {/* Main Headline */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[38px] font-bold text-gray-900 tracking-tight leading-tight mb-3 sm:mb-4 lg:whitespace-nowrap">
              Let's Talk About Your Beverage Business.
            </h1>
            
            {/* Description */}
            <p className="text-xs sm:text-sm md:text-base text-gray-800 font-normal leading-relaxed mb-6 sm:mb-9 text-center m-auto sm:w-160">
              Whether you're looking for beverage products, sales support, or a reliable <br className="hidden sm:inline" />
              distribution partner, we're here to help.
            </p>

            {/* CTA Button */}
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

      {/* ================= CONTACT DETAILS & FORM SECTION ================= */}
      <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: 4 Cards (2x2) */}
          <div className="lg:col-span-6 mt-6 sm:mt-12 lg:mt-20 relative flex justify-center lg:justify-start w-full">
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
                <a href="mailto:ravisales@gmail.com" className="text-[10px] sm:text-xs md:text-sm font-bold text-gray-900 hover:underline break-all sm:break-normal">ravisales@gmail.com</a>
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
                    required
                  />
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
                      className="w-full px-3 py-2.5 text-xs sm:text-sm bg-transparent focus:outline-none text-gray-900"
                      required
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
                  required
                />
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
                  required
                ></textarea>
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

        {/* Bottom Banner */}
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

      {/* Unified Footer */}
      <Footer />
    </div>
  );
}
