import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Header & Navigation Assets
import logoImg from '../../assets/rs-logo.png';
import bellIcon from '../../assets/BellBlack.svg';
import goldBellIcon from '../../assets/BellGold.svg';
import adminAvatar from '../../assets/AdminAvatarBlack.svg';
import goldUserIcon from '../../assets/UserGold.svg';
import goldCircle from '../../assets/CircleGold.svg';
import dashboardIcon from '../../assets/HomeBlack.svg';
import boxIcon from '../../assets/BoxBlack.svg';
import cartIcon from '../../assets/CartIcon.svg';
import routesIcon from '../../assets/RouteBlack.svg';
import customersIcon from '../../assets/Shoopkeeper.svg';
import paymentIcon from '../../assets/moneybag.svg';
import chartIcon from '../../assets/BarChartBlack.svg';
import settingsIcon from '../../assets/Settings.svg';
import logoutIcon from '../../assets/Log out.svg';

export default function Navbar({ children, activeNav }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('shopzee_user');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: dashboardIcon, path: '/AdminDashboard' },
    { name: 'Inventory', icon: boxIcon, path: '/inventory' },
    { name: 'Orders', icon: cartIcon, path: '/orders' },
    { name: 'Routes', icon: routesIcon, path: '/routes' },
    { name: 'Customers', icon: customersIcon, path: '/customers' },
    { name: 'Payments', icon: paymentIcon, path: '/payments' },
    { name: 'Reports', icon: chartIcon, path: '/reports' },
    { name: 'Notifications', icon: bellIcon, path: '/notifications' },
    { name: 'Settings', icon: settingsIcon, path: '/settings' },
  ];

  // Detect active item if not explicitly passed
  const getActiveNavName = () => {
    if (activeNav) return activeNav;
    const path = location.pathname.toLowerCase();
    if (path.includes('inventory')) return 'Inventory';
    if (path.includes('order')) return 'Orders';
    if (path.includes('route')) return 'Routes';
    if (path.includes('customer') || path.includes('shopkeeper')) return 'Customers';
    if (path.includes('payment')) return 'Payments';
    if (path.includes('report')) return 'Reports';
    if (path.includes('notification')) return 'Notifications';
    if (path.includes('setting')) return 'Settings';
    return 'Dashboard';
  };

  const currentActive = getActiveNavName();

  return (
    <div className="min-h-screen bg-[#F5F6F8] flex flex-col font-sans">
      {/* TOP HEADER */}
      <header className="w-full h-20 bg-[#181818] text-white px-4 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between shadow-md sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="md:hidden p-1.5 rounded-lg bg-white/10 text-white focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to="/AdminDashboard" className="flex items-center">
            <img
              src={logoImg}
              alt="RS Logo"
              className="h-12 sm:h-20 w-auto object-contain"
            />
          </Link>
        </div>

        <div className="flex items-center space-x-5 sm:space-x-7">
          <button
            type="button"
            onClick={() => navigate('/notifications')}
            className="p-1 hover:opacity-85 transition cursor-pointer"
            aria-label="Notifications"
          >
            <img src={goldBellIcon} alt="Notifications" className="w-7 h-7 object-contain" />
          </button>
          <div className="flex items-center space-x-3 text-left">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
              <img src={goldCircle} alt="circle border" className="absolute inset-0 w-full h-full object-contain" />
              <img src={goldUserIcon} alt="Admin" className="w-5 h-5 object-contain relative z-10" />
            </div>
            <div className="hidden sm:block">
              <h4 className="text-sm font-bold text-white leading-tight">Admin</h4>
              <span className="text-[11px] text-gray-400 font-normal">Administrator</span>
            </div>
          </div>
        </div>
      </header>

      {/* CONTAINER WITH SIDEBAR & MAIN CONTENT */}
      <div className="flex-1 flex w-full relative">
        {/* SIDEBAR NAVIGATION */}
        <aside
          className={`fixed md:sticky top-20 left-0 z-40 h-[calc(100vh-5rem)] w-60 sm:w-64 bg-white border-r border-gray-200 flex flex-col justify-between p-3.5 sm:p-4 transition-transform duration-300 shrink-0 overflow-y-auto ${
            isMobileNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <nav className="space-y-1 text-left">
            {navItems.map((item) => {
              const isActive = currentActive === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    setIsMobileNavOpen(false);
                    if (item.path && item.path !== '#' && item.path !== location.pathname) {
                      navigate(item.path);
                    }
                  }}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                    isActive
                      ? 'text-[#201C18] bg-[#C8BEB7] font-bold shadow-2xs'
                      : 'text-[#201C18] hover:bg-gray-100/70 hover:text-black'
                  }`}
                >
                  <img src={item.icon} alt={item.name} className="w-4.5 h-4.5 object-contain shrink-0" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-gray-100 space-y-2.5 text-left mt-2 shrink-0">
            <div className="flex items-center space-x-3 px-1">
              <img src={adminAvatar} alt="Admin Profile" className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-full border border-gray-200 shrink-0" />
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight truncate">Admin</h4>
                <span className="text-[11px] text-gray-500 font-normal block truncate">Administrator</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full bg-[#D71920] hover:bg-[#B9151B] text-white text-xs sm:text-sm font-semibold py-2 px-4 rounded-full flex items-center justify-center space-x-2 shadow-sm hover:shadow transition cursor-pointer"
            >
              <img src={logoutIcon} alt="logout" className="w-3.5 h-3.5 object-contain" />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* MOBILE BACKDROP */}
        {isMobileNavOpen && (
          <div
            onClick={() => setIsMobileNavOpen(false)}
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
          />
        )}

        {/* MAIN PAGE CONTENT - Unified Page Scroll */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
