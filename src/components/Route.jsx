import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Header & Navigation Assets
import logoImg from '../assets/rs-logo.png';
import bellIcon from '../assets/Bell.svg';
import goldBellIcon from '../assets/Bell (2).svg';
import adminAvatar from '../assets/Group 2.svg';
import goldUserIcon from '../assets/Frame.svg';
import goldCircle from '../assets/Ellipse 6.svg';
import dashboardIcon from '../assets/Icon (4).svg';
import boxIcon from '../assets/Box.svg';
import routesIcon from '../assets/Vector (2).svg';
import salesmenIcon from '../assets/iconamoon_profile-bold.svg';
import shopkeepersIcon from '../assets/carbon_customer.svg';
import settingsIcon from '../assets/Settings.svg';
import logoutIcon from '../assets/Log out.svg';

export default function RoutePage() {
  const [activeNav, setActiveNav] = useState('Routes');
  const [timeFilter, setTimeFilter] = useState('This Week');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [hoveredRoute, setHoveredRoute] = useState(null);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', icon: dashboardIcon, path: '/AdminDashboard' },
    { name: 'Orders', icon: boxIcon, path: '/orders' },
    { name: 'Routes', icon: routesIcon, path: '/routes' },
    { name: 'Salesmen', icon: salesmenIcon, path: '/salesmen' },
    { name: 'Shopkeepers', icon: shopkeepersIcon, path: '/shopkeepers' },
    { name: 'Notifications', icon: bellIcon, path: '/notifications' },
    { name: 'Settings', icon: settingsIcon, path: '/settings' },
  ];

  // Route Status Data for Donut Chart
  const routeStatusData = {
    total: 24,
    categories: [
      { label: 'Active', count: 6, color: '#3525BE', percentage: 25 },
      { label: 'Completed', count: 12, color: '#22A847', percentage: 50 },
      { label: 'Pending', count: 6, color: '#D7262D', percentage: 25 },
    ]
  };

  // Route Performance Data
  const routePerformanceData = [
    { name: 'Satellite', performance: 100 },
    { name: 'Vastrapur', performance: 60 },
    { name: 'Bodakdev', performance: 80 },
    { name: 'Thaltej', performance: 70 },
  ];

  const handleLogout = () => {
    localStorage.removeItem('shopzee_user');
    navigate('/login');
  };

  // Donut SVG configuration
  const radius = 64;
  const strokeWidth = 34;
  const circumference = 2 * Math.PI * radius;

  // Calculate segment offsets
  let cumulativeOffset = 0;
  const segments = routeStatusData.categories.map((cat) => {
    const strokeDasharray = `${(cat.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -cumulativeOffset;
    cumulativeOffset += (cat.percentage / 100) * circumference;
    return {
      ...cat,
      strokeDasharray,
      strokeDashoffset,
    };
  });

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
            <img src={logoImg} alt="RS Logo" className="h-12 sm:h-20 w-auto object-contain transition-transform hover:scale-105" />
          </Link>
        </div>

        <div className="flex items-center space-x-5 sm:space-x-7">
          <button type="button" className="p-1 hover:opacity-85 transition cursor-pointer" aria-label="Notifications">
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

      {/* BODY CONTAINER */}
      <div className="flex-1 flex w-full relative">
        {/* SIDEBAR */}
        <aside
          className={`fixed md:sticky top-[58px] md:top-[80px] left-0 z-40 h-[calc(100vh-58px)] md:h-[calc(100vh-80px)] w-64 bg-white border-r border-gray-200 flex flex-col justify-between p-5 transition-transform duration-300 ${
            isMobileNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <nav className="space-y-1.5 text-left">
            {navItems.map((item) => {
              const isActive = activeNav === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    setActiveNav(item.name);
                    setIsMobileNavOpen(false);
                    if (item.path) navigate(item.path);
                  }}
                  className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition cursor-pointer ${
                    isActive
                      ? 'text-[#D71920] bg-red-50/60 font-bold'
                      : 'text-[#201C18] hover:bg-gray-100/70 hover:text-black'
                  }`}
                >
                  <img src={item.icon} alt={item.name} className="w-5 h-5 object-contain" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-gray-100 space-y-4 text-left">
            <div className="flex items-center space-x-3 px-2">
              <img src={adminAvatar} alt="Admin Profile" className="w-10 h-10 object-contain" />
              <div>
                <h4 className="text-sm font-bold text-gray-900 leading-tight">Admin</h4>
                <span className="text-xs text-gray-500 font-normal">Administrator</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full bg-[#D71920] hover:bg-[#B9151B] text-white text-xs sm:text-sm font-semibold py-2.5 px-5 rounded-full flex items-center justify-center space-x-2.5 shadow-sm hover:shadow transition cursor-pointer"
            >
              <img src={logoutIcon} alt="logout" className="w-4 h-4 object-contain" />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Mobile backdrop */}
        {isMobileNavOpen && (
          <div
            onClick={() => setIsMobileNavOpen(false)}
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
          />
        )}

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-5 sm:p-8 lg:p-10 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8 text-left">
            {/* Page Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Route</h1>
              <p className="text-xs sm:text-sm text-gray-500 font-normal mt-1">
                Plan, assign and monitor daily sales routes.
              </p>
            </div>

            {/* Content Row: Donut Chart & Performance Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
              {/* LEFT: Donut Chart Section */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center py-4">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 200 200">
                    {segments.map((segment) => (
                      <circle
                        key={segment.label}
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="transparent"
                        stroke={segment.color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={segment.strokeDasharray}
                        strokeDashoffset={segment.strokeDashoffset}
                        className="transition-all duration-300 hover:opacity-90 cursor-pointer"
                        onMouseEnter={() => setHoveredSegment(segment.label)}
                        onMouseLeave={() => setHoveredSegment(null)}
                      />
                    ))}
                  </svg>

                  {/* Center Text inside Donut */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    <span className="text-xs sm:text-sm text-gray-500 font-medium">Total Routes</span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-0.5">
                      {routeStatusData.total}
                    </span>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center space-x-6 sm:space-x-8 mt-6">
                  {routeStatusData.categories.map((cat) => (
                    <div
                      key={cat.label}
                      className={`flex items-center space-x-2 cursor-pointer transition ${
                        hoveredSegment && hoveredSegment !== cat.label ? 'opacity-40' : 'opacity-100'
                      }`}
                      onMouseEnter={() => setHoveredSegment(cat.label)}
                      onMouseLeave={() => setHoveredSegment(null)}
                    >
                      <span
                        className="w-3 h-3 rounded-[2px] shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="text-xs sm:text-sm font-semibold text-gray-800">{cat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: Route Performance Overview Card */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                {/* Card Header with Dropdown */}
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    Route Performance Overview
                  </h3>
                  <div className="relative">
                    <select
                      value={timeFilter}
                      onChange={(e) => setTimeFilter(e.target.value)}
                      className="bg-white border border-gray-200 hover:border-gray-300 rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-medium text-gray-700 cursor-pointer focus:outline-none pr-8 appearance-none shadow-2xs"
                    >
                      <option value="This Week">This Week</option>
                      <option value="This Month">This Month</option>
                      <option value="Today">Today</option>
                      <option value="This Year">This Year</option>
                    </select>
                    <svg
                      className="w-4 h-4 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-12 items-center text-xs sm:text-sm font-bold text-gray-900 pb-4 mb-4 border-b border-transparent">
                  <div className="col-span-3 sm:col-span-3">Route</div>
                  <div className="col-span-7 sm:col-span-8">Performance</div>
                  <div className="col-span-2 sm:col-span-1 text-right"></div>
                </div>

                {/* Route Rows */}
                <div className="space-y-6">
                  {routePerformanceData.map((item) => (
                    <div
                      key={item.name}
                      onMouseEnter={() => setHoveredRoute(item.name)}
                      onMouseLeave={() => setHoveredRoute(null)}
                      className="grid grid-cols-12 items-center text-xs sm:text-sm font-medium text-gray-800 transition"
                    >
                      {/* Route Name */}
                      <div className="col-span-3 sm:col-span-3 text-gray-800 font-semibold truncate pr-2">
                        {item.name}
                      </div>

                      {/* Performance Bar */}
                      <div className="col-span-7 sm:col-span-8 pr-4">
                        <div className="w-full h-4 bg-transparent rounded-[2px] overflow-hidden flex items-center">
                          <div
                            className="h-full bg-[#6E473B] rounded-[2px] transition-all duration-500 ease-out"
                            style={{
                              width: `${item.performance}%`,
                              opacity: hoveredRoute && hoveredRoute !== item.name ? 0.75 : 1,
                            }}
                          />
                        </div>
                      </div>

                      {/* Percentage Value */}
                      <div className="col-span-2 sm:col-span-1 text-right font-semibold text-gray-800">
                        {item.performance}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
