import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Phone, Mail, MapPin, LogOut, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  // Form States
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('shopzee_user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setLoggedInUser(parsedUser);
      // જો યુઝર લોગિન હોય તો ઓટોમેટિક નામ અને ઈમેઈલ ફોર્મમાં ભરી દો
      setFormData((prev) => ({
        ...prev,
        name: parsedUser.username || '',
        email: parsedUser.email || ''
      }));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('shopzee_user');
    setLoggedInUser(null);
    alert('Logged out successfully!');
    navigate('/');
  };

  const getAvatarInitials = () => {
    const identifier = loggedInUser?.username || loggedInUser?.email || 'U';
    return identifier.substring(0, 2).toUpperCase();
  };

  const getUserRoleBadge = () => {
    const role = (loggedInUser?.role || loggedInUser?.user_type || 'shopkeeper').toLowerCase();
    if (role.includes('admin')) return { label: 'ADM', bg: 'bg-purple-700' };
    if (role.includes('sales')) return { label: 'SLS', bg: 'bg-blue-600' };
    return { label: 'SHP', bg: 'bg-emerald-600' };
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // અહીં તમે બેકએન્ડ API કોલ કરી શકો છો
    console.log('Contact Form Submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between overflow-x-hidden max-w-full">
      
      {/* Responsive Navbar / Header */}
      <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2 pl-2">
              <ShoppingBag className="h-7 w-7 text-indigo-600 shrink-0" />
              <span className="text-xl sm:text-2xl font-bold text-gray-900 tracking-wider">
                Shop<span className="text-indigo-600">Zee</span>
              </span>
            </div>

            <div className="hidden md:flex space-x-6 lg:space-x-8 font-medium text-gray-700">
              <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
              <Link to="/about" className="hover:text-indigo-600 transition">About</Link>
              <Link to="/products" className="hover:text-indigo-600 transition">Product</Link>
              <Link to="/product-detail" className="hover:text-indigo-600 transition">Product Detail</Link>
              <Link to="/gallery" className="hover:text-indigo-600 transition">Gallery</Link>
              <Link to="/contact" className="text-indigo-600 font-semibold hover:text-indigo-700 transition">Contact</Link>
            </div>

            <div className="hidden md:flex items-center space-x-4 pr-2">
              <Link to="/cart" className="relative p-2 text-gray-700 hover:text-indigo-600 hover:scale-110 transition duration-200">
                <ShoppingBag className="h-6 w-6" />
              </Link>

              {loggedInUser ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-full shadow-inner border border-gray-200">
                    <div className="h-8 w-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow tracking-wider">
                      {getAvatarInitials()}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-gray-800 leading-tight truncate max-w-[90px]">
                        {loggedInUser.username || loggedInUser.email}
                      </span>
                      <span className={`text-[9px] font-extrabold text-white px-1.5 py-0.2 rounded w-fit ${getUserRoleBadge().bg}`}>
                        {getUserRoleBadge().label}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg font-medium transition text-sm"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link to="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 hover:shadow-lg transition duration-200">
                  Login
                </Link>
              )}
            </div>

            <div className="flex md:hidden items-center space-x-2 pr-1">
              <Link to="/cart" className="relative p-1.5 text-gray-700 hover:text-indigo-600 active:scale-95 transition">
                <ShoppingBag className="h-6 w-6" />
              </Link>
              {loggedInUser && (
                <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full border border-gray-200">
                  <div className="h-6 w-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px] shadow">
                    {getAvatarInitials()}
                  </div>
                  <span className={`text-[8px] font-extrabold text-white px-1 py-0.2 rounded ${getUserRoleBadge().bg}`}>
                    {getUserRoleBadge().label}
                  </span>
                </div>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-indigo-600 active:text-indigo-700 focus:outline-none p-1.5 transition active:scale-95"
              >
                {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>

        <div className={`md:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 py-4 px-6' : 'max-h-0 opacity-0 py-0 px-6'}`}>
          <div className="space-y-2">
            <Link to="/" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-indigo-600 py-2.5 px-3 rounded-lg">Home</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-indigo-600 py-2.5 px-3 rounded-lg">About</Link>
            <Link to="/products" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-indigo-600 py-2.5 px-3 rounded-lg">Product</Link>
            <Link to="/product-detail" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-indigo-600 py-2.5 px-3 rounded-lg">Product Detail</Link>
            <Link to="/gallery" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-indigo-600 py-2.5 px-3 rounded-lg">Gallery</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-indigo-600 font-semibold py-2.5 px-3 rounded-lg bg-indigo-50">Contact</Link>
            <div className="pt-2">
              {loggedInUser ? (
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="w-full flex items-center justify-center space-x-2 bg-red-50 text-red-600 py-3 rounded-lg font-medium hover:bg-red-100 transition duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="block text-center bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area (Contact Us) */}
      <div className="w-full max-w-full">
        
        {/* Header Banner */}
        <section className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-3">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Get in Touch</h1>
            <p className="text-indigo-100 text-sm sm:text-base max-w-xl mx-auto">
              Have questions about our products, orders, or partnership opportunities? We'd love to hear from you!
            </p>
          </div>
        </section>

        {/* Contact Info & Form Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Contact Details Card */}
            <div className="lg:col-span-1 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Contact Information</h3>
                <p className="text-gray-500 text-sm mb-8">Fill out the form or reach out to us directly through details below.</p>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Our Location</h4>
                      <p className="text-gray-600 text-sm">Ahmedabad, Gujarat, India</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Phone Number</h4>
                      <p className="text-gray-600 text-sm">+91 98765 43210</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Email Address</h4>
                      <p className="text-gray-600 text-sm">support@shopzee.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Business Hours</span>
                <p className="text-sm font-semibold text-gray-700 mt-1">Monday – Saturday: 9:00 AM – 7:00 PM</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h3>
              <p className="text-gray-500 text-sm mb-6">We usually respond within 24 business hours.</p>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-xl flex items-center space-x-4 my-8">
                  <CheckCircle className="h-8 w-8 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-base">Message Sent Successfully!</h4>
                    <p className="text-sm text-emerald-700">Thank you for reaching out. Our team will contact you shortly.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-gray-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-gray-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="What is this regarding?"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-gray-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                    <textarea
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Type your message here..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-gray-50/50 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center space-x-2 w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-indigo-200 transition duration-300"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>

      </div>

      {/* Responsive Footer */}
      <footer className="bg-gray-900 text-white pt-8 pb-6 border-t border-gray-800 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden sm:grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <ShoppingBag className="h-6 w-6 text-indigo-400 shrink-0" />
                <span className="text-lg font-bold tracking-wider">Shop<span className="text-indigo-400">Zee</span></span>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Your ultimate B2B Order, Sales, and Delivery Management System designed to accelerate wholesale and retail business growth.
              </p>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-3 text-indigo-300">Quick Links</h4>
              <ul className="space-y-1.5 text-sm text-gray-400">
                <li><Link to="/" className="hover:text-white transition-all">Home</Link></li>
                <li><Link to="/about" className="hover:text-white transition-all">About Us</Link></li>
                <li><Link to="/products" className="hover:text-white transition-all">Products</Link></li>
                <li><Link to="/product-detail" className="hover:text-white transition-all">Product Detail</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-all">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-3 text-indigo-300">Contact Info</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-indigo-400 shrink-0" />
                  <span>Ahmedabad, Gujarat, India</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-indigo-400 shrink-0" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-indigo-400 shrink-0" />
                  <span>support@shopzee.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="sm:hidden text-center space-y-3 mb-6">
            <div className="flex items-center justify-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-indigo-400 shrink-0" />
              <span className="text-base font-bold tracking-wider">Shop<span className="text-indigo-400">Zee</span></span>
            </div>
            <p className="text-gray-400 text-xs px-4">
              Smart Order, Sales & Delivery Management System.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-300 pt-1">
              <Link to="/" className="hover:text-indigo-400 transition-all">Home</Link>
              <Link to="/about" className="hover:text-indigo-400 transition-all">About</Link>
              <Link to="/products" className="hover:text-indigo-400 transition-all">Products</Link>
              <Link to="/product-detail" className="hover:text-indigo-400 transition-all">Product Detail</Link>
              <Link to="/contact" className="text-indigo-400 font-medium transition-all">Contact</Link>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-4 text-center text-xs text-gray-500">
            <p>&copy; 2026 ShopZee. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}