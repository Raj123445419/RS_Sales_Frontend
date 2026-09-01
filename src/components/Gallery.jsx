import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, User, ZoomIn, ChevronDown } from 'lucide-react';
import logoImg from '../assets/rs-logo.png';
import login from '../assets/login.svg';
import cart from '../assets/CartGold.svg';
import HeadPhon from '../assets/HeadPhon.svg';
import Phonecallwhite from '../assets/PhoneCallWhite.svg';
import mailoutline from '../assets/MailWhite.svg';
import instagram from '../assets/instagram.svg';
import facebook from '../assets/facebook.svg';
import Vector from '../assets/Vector.svg';
import Galler1 from '../assets/Gallery1.png';
import Truck from '../assets/Truck.png';
import Gall3 from '../assets/Gall3.png';
import bulkpepsi from '../assets/bulkpepsi.png';
import bulk from '../assets/bulk.png';

// Gallery Grid Assets
import imgPepsiTruckWorker from '../assets/901af9373f4a9b83e7923b4aff3951659f397119.png';
import imgNescafeHand from '../assets/b2ee0264b599357b577b1a4b1f401b3642468e6a.png';
import imgBisleriStand from '../assets/6925868788c86ea54c2a8c7e49000b59f3ef811d.png';
import imgSodaShelf from '../assets/e7b13255f21583014dc755b7d08342a74eed2e09.png';
import imgPepsiWorker from '../assets/b2931aa7507945e6d62760c56c76d3ab9b02c7dc.png';
import imgCokeTruckUnload from '../assets/d2e814c030a5694bdb9a6c0c90f9adf35d79d2fd.png';
import imgPepsiDeliveryCart from '../assets/85b3ecff424799803987874e0b9026d9ce4b438a.png';
import imgSupermarketShelf from '../assets/7ddd7444fb8ba5fd98d5765a4edbf1f0d26c72d4.png';
import imgBisleriCases from '../assets/bf8c27f41fe5d0bbe79947090084570f1d7b49e2.png';
import imgFantaBottles from '../assets/ca4862b1faf335de5acb1cf52329787aa883b7ee.png';

// Extra assets for load more & filter
import imgNescafeCan from '../assets/7574ab435ee379df1c0d3167330120d1251dd00e.png';
import imgBisleriBottle from '../assets/20003b8ed60628677773bbd71cae23b4d30ae20d.png';
import imgCokeCan from '../assets/7d62af2da34e532fa599c4e4bf488afcd6f0e0a7.png';
import fantaCan from '../assets/f7440f7e3c08c94c5a55efbb02e220210c426a99.png';
import pepsiCan from '../assets/9b4d03d095c14b70b64f4889ac725b01d5e6ce81.png';

export default function Gallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showMore, setShowMore] = useState(false);
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

  const categories = ['All', 'Cold Drinks', 'Coffee', 'Water'];

  // Categorized items for category-specific view
  const categoryData = {
    'Cold Drinks': [
      { id: 1, title: 'Pepsi Logistics & Supply', img: imgPepsiTruckWorker },
      { id: 4, title: 'Canned Beverages Assortment', img: imgSodaShelf },
      { id: 5, title: 'Pepsi Merchandising Specialist', img: imgPepsiWorker },
      { id: 6, title: 'Coca-Cola Distribution Truck', img: imgCokeTruckUnload },
      { id: 7, title: 'Pepsi Store Delivery Handling', img: imgPepsiDeliveryCart },
      { id: 8, title: 'Retail Beverage Shelves & Packs', img: imgSupermarketShelf },
      { id: 10, title: 'Fanta Orange Wholesale Stock', img: imgFantaBottles },
    ],
    'Coffee': [
      { id: 2, title: 'Nescafe Mocha Chill Can', img: imgNescafeHand },
      { id: 21, title: 'Nescafe Ready-to-Drink Mocha', img: Gall3 }
    ],
    'Water': [
      { id: 3, title: 'Bisleri Mountain Display Stand', img: imgBisleriStand },
      { id: 9, title: 'Bisleri Water Bundles Stack', img: imgBisleriCases },
    ]
  };

  const brandShowcase = [
    {
      id: 'fanta',
      name: 'Fanta',
      image: fantaCan,
      bgColor: 'bg-[#FF7700]',
      bgStyle: { backgroundColor: '#FA6800' }
    },
    {
      id: 'bisleri',
      name: 'Bisleri',
      image: imgBisleriBottle,
      bgColor: 'bg-[#CDC7BE]',
      bgStyle: { backgroundColor: '#CDC7BE' }
    },
    {
      id: 'coco-cola',
      name: 'Coco Cola',
      image: imgCokeCan,
      bgColor: 'bg-[#E31B23]',
      bgStyle: { backgroundColor: '#E31B23' }
    },
    {
      id: 'nescafe',
      name: 'Nescafe',
      image: imgNescafeCan,
      bgColor: 'bg-[#DFB27D]',
      bgStyle: { backgroundColor: '#DFB27D' }
    },
    {
      id: 'pepsi',
      name: 'Pepsi',
      image: pepsiCan,
      bgColor: 'bg-[#353BEB]',
      bgStyle: { backgroundColor: '#353BEB' }
    }
  ];

  return (
    <div className="min-h-screen bg-[#EDE7DD] text-gray-900 relative overflow-x-hidden flex flex-col justify-between" style={{ fontFamily: 'Arial, sans-serif !important', fontWeight: 400, letterSpacing: 'normal' }}>

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
                <Link to="/gallery" className="text-[#FEC26C] font-semibold transition hover:text-[#B2B2B2]">Gallery</Link>
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
              <Link to="/" onClick={() => setIsOpen(false)} className="block text-white hover:text-red-400 py-2.5 px-3 rounded-lg">Home</Link>
              <Link to="/about" onClick={() => setIsOpen(false)} className="block text-white hover:text-red-400 py-2.5 px-3 rounded-lg">About</Link>
              <Link to="/products" onClick={() => setIsOpen(false)} className="block text-white hover:text-red-400 py-2.5 px-3 rounded-lg">Products</Link>
              <Link to="/gallery" onClick={() => setIsOpen(false)} className="block text-[#FEC26C] font-semibold py-2.5 px-3 rounded-lg bg-white/10">Gallery</Link>
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

        {/* HERO SECTION */}
        <section className="w-full relative pt-4 sm:pt-8 md:pt-10 pb-6 sm:pb-10 overflow-hidden select-none">
          
          <div className="w-full flex flex-col lg:flex-row items-center justify-between">
            
            {/* Left Column: Full-bleed from left screen edge with Ribbon and 4 Cards locked together */}
            <div className="w-full lg:w-[54%] xl:w-[50%] flex justify-start items-center">
              <div className="relative w-full max-w-[580px] sm:max-w-[660px] md:max-w-[720px] lg:max-w-[760px] aspect-[1.42/1] select-none">

                {/* Ribbon Image anchored at absolute left (shifted slightly upwards) */}
                <img
                  src={Galler1}
                  alt="Ribbon Background"
                  className="absolute -top-[5%] sm:-top-[15%] left-0 w-full h-[105%] object-contain object-left pointer-events-none z-0"
                />

                {/* Card 1: Coca-Cola Truck (Positioned right next to the loop) */}
                <div className="absolute top-[25%] left-[19%] w-[28%] aspect-[16/10.2] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl z-10 transform hover:scale-[1.03] transition-all duration-300 bg-white/20 border border-black/5">
                  <img
                    src={Truck}
                    alt="Coca-Cola Truck"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Card 2: Person holding beverage can (Top-Right, higher up) */}
                <div className="absolute top-[3%] left-[49%] w-[21%] aspect-[1/1.38] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl z-10 transform hover:scale-[1.03] transition-all duration-300 bg-white/20 border border-black/5">
                  <img
                    src={Gall3}
                    alt="Person with beverage"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Card 3: Pepsi Cans (Bottom-Left, under truck) */}
                <div className="absolute top-[53%] left-[30%] w-[17%] aspect-[1/1.12] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl z-10 transform hover:scale-[1.03] transition-all duration-300 bg-white/20 border border-black/5">
                  <img
                    src={bulkpepsi}
                    alt="Pepsi Cans"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Card 4: Store Shelf / Supermarket (Bottom-Right, under Nescafe girl) */}
                <div className="absolute top-[48%] left-[49%] w-[28%] aspect-[16/10.5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl z-10 transform hover:scale-[1.03] transition-all duration-300 bg-white/20 border border-black/5">
                  <img
                    src={bulk}
                    alt="Store Beverage Shelf"
                    className="w-full h-full object-cover"
                  />
                </div>

              </div>
            </div>

            {/* Right Side: Title & Description */}
            <div className="w-full lg:w-[46%] xl:w-[50%] flex flex-col items-center lg:items-start text-center lg:text-left px-6 sm:px-10 lg:px-8 xl:px-16 mt-6 lg:mt-0 z-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[54px] font-bold text-gray-900 tracking-tight leading-[1.15] mb-2 sm:mb-3">
                Moments Behind
                <span className="block text-[#E50914] mt-1 sm:mt-2">Ravi Sales</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-700 font-normal leading-relaxed max-w-lg mt-3 sm:mt-4">
                Explore our products, beverage range, and the work behind keeping businesses connected with the right products.
              </p>
            </div>

          </div>

          {/* Filter Pills */}
          <div className="w-full flex justify-center items-center mt-8 sm:mt-12 md:mt-14 px-4">
            <div className="inline-flex items-center gap-1 sm:gap-2 bg-[#BDB0A0]/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-sm max-w-full overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 sm:px-7 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${activeCategory === category
                    ? 'bg-[#E50914] text-white shadow-md'
                    : 'text-gray-900 hover:text-black hover:bg-black/5'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

        </section>

        {/* GALLERY IMAGE GRID SECTION */}
        <section className="w-full pb-16 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* White Container Box Matching Screenshot */}
            <div className="bg-white p-5 sm:p-7 md:p-9 shadow-sm">

              {activeCategory === 'All' ? (
                /* EXACT 3-COLUMN MASONRY MATCHING SCREENSHOT */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-start">

                  {/* Column 1 (Left Column) */}
                  <div className="flex flex-col space-y-5 sm:space-y-6">
                    {/* Item 1: Pepsi Warehouse Worker */}
                    <div
                      onClick={() => setSelectedImage({ img: imgPepsiTruckWorker, title: 'Pepsi Logistics & Supply' })}
                      className="w-full h-[200px] sm:h-[230px] md:h-[240px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transform hover:scale-[1.015] transition-all duration-300 bg-gray-50 shadow-xs"
                    >
                      <img
                        src={imgPepsiTruckWorker}
                        alt="Pepsi Logistics & Supply"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item 2: Nescafe Mocha Hand */}
                    <div
                      onClick={() => setSelectedImage({ img: imgNescafeHand, title: 'Nescafe Mocha Chill' })}
                      className="w-full h-[260px] sm:h-[300px] md:h-[320px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transform hover:scale-[1.015] transition-all duration-300 bg-gray-50 shadow-xs"
                    >
                      <img
                        src={imgNescafeHand}
                        alt="Nescafe Mocha Can"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item 3: Bisleri Stand */}
                    <div
                      onClick={() => setSelectedImage({ img: imgBisleriStand, title: 'Bisleri Mountain Display Stand' })}
                      className="w-full h-[380px] sm:h-[440px] md:h-[470px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transform hover:scale-[1.015] transition-all duration-300 bg-gray-50 shadow-xs"
                    >
                      <img
                        src={imgBisleriStand}
                        alt="Bisleri Stand"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>

                  {/* Column 2 (Middle Column) */}
                  <div className="flex flex-col space-y-5 sm:space-y-6">
                    {/* Item 4: Soda Cans Shelf */}
                    <div
                      onClick={() => setSelectedImage({ img: imgSodaShelf, title: 'Canned Beverages Assortment' })}
                      className="w-full h-[220px] sm:h-[265px] md:h-[285px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transform hover:scale-[1.015] transition-all duration-300 bg-gray-50 shadow-xs"
                    >
                      <img
                        src={imgSodaShelf}
                        alt="Soda Cans Shelf"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item 5: Pepsi Worker (Smiling Merchandiser) */}
                    <div
                      onClick={() => setSelectedImage({ img: imgPepsiWorker, title: 'Pepsi Merchandising Specialist' })}
                      className="w-full h-[320px] sm:h-[375px] md:h-[405px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transform hover:scale-[1.015] transition-all duration-300 bg-gray-50 shadow-xs"
                    >
                      <img
                        src={imgPepsiWorker}
                        alt="Pepsi Merchandiser"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item 6: Coca-Cola Truck Unloading */}
                    <div
                      onClick={() => setSelectedImage({ img: imgCokeTruckUnload, title: 'Coca-Cola Distribution Truck' })}
                      className="w-full h-[185px] sm:h-[220px] md:h-[245px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transform hover:scale-[1.015] transition-all duration-300 bg-gray-50 shadow-xs"
                    >
                      <img
                        src={imgCokeTruckUnload}
                        alt="Coca-Cola Truck Delivery"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item 7: Pepsi Delivery Cart (Slim Wide Banner) */}
                    <div
                      onClick={() => setSelectedImage({ img: imgPepsiDeliveryCart, title: 'Pepsi Store Delivery' })}
                      className="w-full h-[60px] sm:h-[65px] md:h-[70px] lg:h-[70px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transform hover:scale-[1.015] transition-all duration-300 bg-gray-50 shadow-xs"
                    >
                      <img
                        src={imgPepsiDeliveryCart}
                        alt="Pepsi Delivery"
                        className="w-full h-full object-cover object-[center_28%]"
                      />
                    </div>


                  </div>

                  {/* Column 3 (Right Column) */}
                  <div className="flex flex-col space-y-5 sm:space-y-6">
                    {/* Item 8: Supermarket Shelf */}
                    <div
                      onClick={() => setSelectedImage({ img: imgSupermarketShelf, title: 'Retail Beverage Shelves & Packs' })}
                      className="w-full h-[260px] sm:h-[310px] md:h-[340px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transform hover:scale-[1.015] transition-all duration-300 bg-gray-50 shadow-xs"
                    >
                      <img
                        src={imgSupermarketShelf}
                        alt="Supermarket Shelf"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item 9: Bisleri Water Cases */}
                    <div
                      onClick={() => setSelectedImage({ img: imgBisleriCases, title: 'Bisleri Water Bundles Stack' })}
                      className="w-full h-[260px] sm:h-[310px] md:h-[345px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transform hover:scale-[1.015] transition-all duration-300 bg-gray-50 shadow-xs"
                    >
                      <img
                        src={imgBisleriCases}
                        alt="Bisleri Cases"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item 10: Fanta Orange Bottles (Cropped bottom to remove black watermark line) */}
                    <div
                      onClick={() => setSelectedImage({ img: imgFantaBottles, title: 'Fanta Orange Wholesale Stock' })}
                      className="w-full h-[255px] sm:h-[305px] md:h-[345px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transform hover:scale-[1.015] transition-all duration-300 bg-gray-50 shadow-xs relative"
                    >
                      <img
                        src={imgFantaBottles}
                        alt="Fanta Orange Bottles"
                        className="w-full h-full object-cover object-top scale-[1.08] origin-top"
                      />
                    </div>
                  </div>

                </div>
              ) : (
                /* Filtered Category Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryData[activeCategory]?.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedImage({ img: item.img, title: item.title })}
                      className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs cursor-pointer transform hover:scale-[1.02] transition-all duration-300 bg-gray-50"
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-64 sm:h-72 md:h-80 object-cover block"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                        <ZoomIn className="text-white h-8 w-8 mb-2" />
                        <h4 className="text-white font-bold text-sm sm:text-base">{item.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Load More Button */}
              <div className="flex justify-center items-center mt-8 sm:mt-12">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="px-8 py-2.5 rounded-full border border-gray-400 hover:border-black text-gray-800 hover:text-black text-sm font-medium transition-all duration-300 flex items-center gap-2 hover:bg-gray-50 cursor-pointer shadow-xs"
                >
                  <span>{showMore ? 'Show Less' : 'Load More'}</span>
                  <ChevronDown className={`h-4 w-4 transform transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} />
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black text-white rounded-full transition duration-200 z-10 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
              <img
                src={selectedImage.img}
                alt={selectedImage.title}
                className="w-full max-h-[75vh] object-contain bg-black/10"
              />
              <div className="p-4 bg-white flex justify-between items-center">
                <h3 className="font-bold text-gray-900 text-base sm:text-lg">{selectedImage.title}</h3>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Brand Showcase Section */}
      <section className="w-full py-8 sm:py-12 lg:py-16 bg-[#EDE7DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header with Horizontal Line */}
          <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight whitespace-nowrap">
              Brand Showcase
            </h2>
            <div className="h-[1.5px] bg-[#BFB7AB] flex-1"></div>
          </div>

          {/* 5 Brand Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5 lg:gap-6">
            {brandShowcase.map((brand, index) => (
              <div
                key={brand.id}
                className={`bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 md:p-3.5 hover:shadow-[0_15px_35px_0px_rgba(255,255,255,1)] transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col items-center justify-between group ${index === 4 ? 'col-span-2 sm:col-span-1 max-w-[220px] sm:max-w-none mx-auto w-full' : ''
                  }`}
              >
                {/* Inner Colored Rounded Box with Product Image */}
                <div
                  className="w-full aspect-[307/369] rounded-xl sm:rounded-2xl flex items-center justify-center p-1.5 sm:p-2 relative overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]"
                  style={brand.bgStyle}
                >
                  {/* Soft White Glow Behind Product */}

                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="relative z-10 max-h-[97%] max-w-[97%] object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Brand Title */}
                <div className="pt-2.5 sm:pt-3 pb-0.5 sm:pb-1 text-center w-full">
                  <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900 tracking-tight">
                    {brand.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Looking for a Reliable Distribution Partner? Sub-Section */}
          <div className="mt-12 sm:mt-16 md:mt-20 text-center max-w-3xl mx-auto px-4">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Looking for a Reliable Distribution Partner?
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-700 font-normal leading-relaxed mt-2.5 sm:mt-3.5 max-w-2xl mx-auto">
              Let's work together to create stronger connections between products,<br className="hidden sm:inline" /> businesses, and growing markets.
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
