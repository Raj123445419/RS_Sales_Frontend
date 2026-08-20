import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Package, AlertCircle, Menu, X, LogOut, Phone, Mail, MapPin, Eye, ShoppingCart, Zap } from 'lucide-react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  const searchRef = useRef(null);
  const productRefs = useRef({});

  useEffect(() => {
    const user = localStorage.getItem('shopzee_user');
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }

    fetch('http://127.0.0.1:8000/api/v1/products/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products from backend server');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const handleAddToCartAndRedirect = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('shopzee_cart')) || [];
    const itemIndex = existingCart.findIndex((item) => item.id === product.id);

    if (itemIndex > -1) {
      existingCart[itemIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('shopzee_cart', JSON.stringify(existingCart));
    navigate('/cart');
  };

  const handleBuyNow = (product) => {
    // Order page implementation placeholder
    navigate('/order');
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectSuggestion = (product) => {
    setSearchTerm('');
    if (productRefs.current[product.id]) {
      productRefs.current[product.id].scrollIntoView({ behavior: 'smooth', block: 'center' });
      productRefs.current[product.id].classList.add('ring-4', 'ring-indigo-500');
      setTimeout(() => {
        if (productRefs.current[product.id]) {
          productRefs.current[product.id].classList.remove('ring-4', 'ring-indigo-500');
        }
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between overflow-x-hidden max-w-full">
      
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="flex justify-between h-16 items-center">
            
            {/* Logo */}
            <div className="flex items-center space-x-2 pl-2">
              <ShoppingBag className="h-7 w-7 text-indigo-600 shrink-0" />
              <span className="text-xl sm:text-2xl font-bold text-gray-900 tracking-wider">
                Shop<span className="text-indigo-600">Zee</span>
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-6 lg:space-x-8 font-medium text-gray-700">
              <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
              <Link to="/about" className="hover:text-indigo-600 transition">About</Link>
              <Link to="/products" className="text-indigo-600 font-semibold hover:text-indigo-700 transition">Product</Link>
              <Link to="/product-detail" className="hover:text-indigo-600 transition">Product Detail</Link>
              <Link to="/gallery" className="hover:text-indigo-600 transition">Gallery</Link>
              <Link to="/contact" className="hover:text-indigo-600 transition">Contact</Link>
            </div>

            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center space-x-4 pr-2">
              <Link to="/cart" className="relative p-2 text-gray-700 hover:text-indigo-600 hover:scale-110 transition duration-200">
                <ShoppingBag className="h-6 w-6" />
              </Link>

              {loggedInUser ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-full shadow-inner border border-gray-200" title={`${loggedInUser.username || loggedInUser.email} (${getUserRoleBadge().label})`}>
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

            {/* Mobile Menu Button */}
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
                className="text-gray-700 hover:text-indigo-600 focus:outline-none p-1.5 transition active:scale-95"
              >
                {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 py-4 px-6 pb-6' : 'max-h-0 opacity-0 py-0 px-6'}`}>
          <div className="space-y-2">
            <Link to="/" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-indigo-600 py-2.5 px-3 rounded-lg">Home</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-indigo-600 py-2.5 px-3 rounded-lg">About</Link>
            <Link to="/products" onClick={() => setIsOpen(false)} className="block text-indigo-600 font-semibold py-2.5 px-3 rounded-lg bg-indigo-50">Product</Link>
            <Link to="/product-detail" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-indigo-600 py-2.5 px-3 rounded-lg">Product Detail</Link>
            <Link to="/gallery" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-indigo-600 py-2.5 px-3 rounded-lg">Gallery</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-indigo-600 py-2.5 px-3 rounded-lg">Contact</Link>
            <div className="pt-3 pb-2">
              {loggedInUser ? (
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="w-full flex items-center justify-center space-x-2 bg-red-50 text-red-600 py-3 rounded-lg font-medium hover:bg-red-100 transition"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="block text-center bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 shadow-md">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Success Notification Alert Popup */}
      {successMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center space-x-3 transition-all animate-bounce max-w-[90vw]">
          <ShoppingBag className="h-6 w-6 shrink-0" />
          <span className="font-semibold text-sm sm:text-base">{successMessage}</span>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-grow overflow-x-hidden">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 sm:mb-10 gap-4 sm:gap-6">
          <div className="w-full md:w-auto text-center md:text-left">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900">Our Products</h1>
            <p className="text-gray-500 text-xs sm:text-base mt-1 sm:mt-2">Browse our exclusive wholesale collection directly from inventory</p>
          </div>

          {/* Search Bar with Image Dropdown Suggestions */}
          <div className="relative w-full md:w-96" ref={searchRef}>
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Search className="h-5 w-5" />
            </span>
            <input
              type="text"
              placeholder="Search products or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm bg-white shadow-sm"
            />

            {/* Dropdown Suggestions with Show Detail Button */}
            {searchTerm.trim() !== '' && (
              <div className="absolute left-0 right-0 mt-2 bg-sky-100/95 backdrop-blur-md border border-sky-300 rounded-2xl shadow-2xl max-h-80 overflow-y-auto z-50 p-2 space-y-2">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="flex items-center justify-between p-2 hover:bg-sky-200/80 rounded-xl transition gap-2"
                    >
                      <div
                        onClick={() => handleSelectSuggestion(prod)}
                        className="flex items-center space-x-3 cursor-pointer overflow-hidden flex-1"
                      >
                        <div className="h-12 w-12 rounded-lg bg-gray-200 overflow-hidden shrink-0 border border-sky-300">
                          {prod.image ? (
                            <img src={prod.image} alt={prod.name} className="h-full w-full object-cover" />
                          ) : (
                            <Package className="h-full w-full p-2 text-gray-400" />
                          )}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="font-bold text-gray-900 text-sm truncate">{prod.name}</span>
                          <span className="text-xs text-indigo-700 font-medium">SKU: {prod.sku} | ₹{prod.selling_price}</span>
                        </div>
                      </div>

                      {/* Show Detail Button */}
                      <Link
                        to={`/product/${prod.id}`}
                        onClick={() => setSearchTerm('')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 flex items-center space-x-1 shadow transition active:scale-95"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Show Detail</span>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-600 text-xs font-medium">
                    No products found matching "{searchTerm}"
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {loading && (
          <div className="text-center py-24">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-indigo-600 border-t-transparent"></div>
            <p className="text-gray-500 mt-4 text-sm font-medium">Loading products from backend...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 sm:p-5 rounded-r-xl flex items-center space-x-3 my-8">
            <AlertCircle className="h-6 w-6 text-red-500 shrink-0" />
            <p className="text-xs sm:text-sm font-medium text-red-800">{error}. Please ensure Django server is running.</p>
          </div>
        )}

        {/* Product Grid: Changed from 2 columns on mobile to 1 column with Left Image / Right Details layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              ref={(el) => (productRefs.current[product.id] = el)}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 flex flex-row sm:flex-col justify-between hover:shadow-2xl hover:border-indigo-200"
            >
              
              {/* Image Section: Left side on mobile, Top on desktop */}
              <div className="relative w-36 sm:w-full h-36 sm:h-52 bg-gray-100 overflow-hidden group shrink-0">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                    <Package className="h-8 w-8 sm:h-10 sm:w-10 mb-1" />
                    <span className="text-[10px] sm:text-xs">No Image</span>
                  </div>
                )}
                
                {/* Dynamic Stock Badge */}
                <span className="absolute top-2 left-2 sm:left-auto sm:right-2 text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow truncate max-w-[100px] bg-indigo-600 text-white">
                  {product.category_name || 'General'}
                </span>

                {/* Show Details appears on Image Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center">
                  <Link
                    to={`/product/${product.id}`}
                    className="bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white px-4 py-2.5 rounded-full shadow-lg font-semibold text-xs sm:text-sm flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Show Details</span>
                  </Link>
                </div>
              </div>

              {/* Lower/Right Content Box */}
              <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between hover:bg-indigo-50/30 transition-colors duration-300">
                <div>
                  <h3 className="text-xs sm:text-base font-bold text-gray-900 line-clamp-1 mb-1">{product.name}</h3>
                  <p className="text-[10px] sm:text-xs text-gray-400 mb-2 sm:mb-3 truncate">SKU: {product.sku}</p>
                  
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-1.5">
                      <span className="text-[10px] sm:text-xs text-gray-400 line-through">₹{product.mrp}</span>
                      <span className="text-xs sm:text-lg font-extrabold text-indigo-600">₹{product.selling_price}</span>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row space-y-1.5 sm:space-y-0 sm:space-x-2">
                  <button 
                    onClick={() => handleBuyNow(product)}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1.5 sm:py-2 rounded-xl transition duration-200 text-[11px] sm:text-sm flex items-center justify-center space-x-1 shadow-sm"
                  >
                    <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>Buy Now</span>
                  </button>
                  <button
                    onClick={() => handleAddToCartAndRedirect(product)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-1.5 sm:py-2 rounded-xl transition duration-200 text-[11px] sm:text-sm flex items-center justify-center space-x-1 text-center"
                  >
                    <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-8 pb-6 border-t border-gray-800 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="hidden sm:grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <ShoppingBag className="h-6 w-6 text-indigo-400 shrink-0" />
                <span className="text-lg font-bold tracking-wider">Shop<span className="text-indigo-400">Zee</span></span>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Your ultimate B2B Order, Sales, and Delivery Management System designed to accelerate your wholesale and retail business growth.
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
              <Link to="/products" className="text-indigo-400 font-medium transition-all">Products</Link>
              <Link to="/product-detail" className="hover:text-indigo-400 transition-all">Product Detail</Link>
              <Link to="/contact" className="hover:text-indigo-400 transition-all">Contact</Link>
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