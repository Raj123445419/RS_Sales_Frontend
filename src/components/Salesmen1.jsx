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

// Page-specific SVGs (using exclusively the provided SVGs)
import arrowLeftIcon from '../assets/Arrowleft.svg';
import editIcon from '../assets/Edit.svg';
import employeeIdIcon from '../assets/icon (13).svg';
import emailIcon from '../assets/Icon (11).svg';
import assignedRouteIcon from '../assets/Vector (8).svg';
import roleIcon from '../assets/Vector (7).svg';
import phoneIcon from '../assets/Phone (2).svg';
import locationIcon from '../assets/Icon (10).svg';
import statusIcon from '../assets/Icon (12).svg';
import calendarIcon from '../assets/Vector (9).svg';
import totalSalesIcon from '../assets/Vector (7).svg';
import ordersBagIcon from '../assets/Icon (9).svg';
import targetBullseyeIcon from '../assets/Icon (8).svg';

export default function Salesmen1() {
  const [activeNav, setActiveNav] = useState('Salesmen');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navigate = useNavigate();

  const [todaysVisits, setTodaysVisits] = useState([
    { shopkeeper: 'Patel General Store', area: 'Satellite', visitTime: '09:30 AM', orderValue: '₹12,500', visitType: 'Order Visit', status: 'Pending' },
    { shopkeeper: 'Patel General Store', area: 'Satellite', visitTime: '09:30 AM', orderValue: '₹12,500', visitType: 'Follow-up', status: 'Scheduled' },
    { shopkeeper: 'Patel General Store', area: 'Satellite', visitTime: '09:30 AM', orderValue: '₹12,500', visitType: 'Collection', status: 'Completed' },
    { shopkeeper: 'Patel General Store', area: 'Satellite', visitTime: '09:30 AM', orderValue: '₹12,500', visitType: 'Order Visit', status: 'Scheduled' },
    { shopkeeper: 'Patel General Store', area: 'Satellite', visitTime: '09:30 AM', orderValue: '₹12,500', visitType: 'Order Visit', status: 'Completed' },
  ]);

  const [recentOrders, setRecentOrders] = useState([
    { orderId: '#RS1024', shopkeeper: 'Patel General Store', date: '26 Aug 2026', amount: '₹12,500', status: 'Pending' },
    { orderId: '#RS1024', shopkeeper: 'Patel General Store', date: '26 Aug 2026', amount: '₹12,500', status: 'Processing' },
    { orderId: '#RS1024', shopkeeper: 'Patel General Store', date: '26 Aug 2026', amount: '₹12,500', status: 'Delivered' },
    { orderId: '#RS1024', shopkeeper: 'Patel General Store', date: '26 Aug 2026', amount: '₹12,500', status: 'Processing' },
    { orderId: '#RS1024', shopkeeper: 'Patel General Store', date: '26 Aug 2026', amount: '₹12,500', status: 'Delivered' },
  ]);

  const getStatusColor = (status) => {
    const s = String(status).toLowerCase();
    if (s === 'completed' || s === 'delivered') return 'text-[#22A847] font-semibold';
    if (s === 'scheduled' || s === 'processing') return 'text-[#EB9F30] font-semibold';
    if (s === 'pending') return 'text-[#D7262D] font-semibold';
    return 'text-gray-700 font-semibold';
  };

  const navItems = [
    { name: 'Dashboard', icon: dashboardIcon, path: '/AdminDashboard' },
    { name: 'Orders', icon: boxIcon, path: '/orders' },
    { name: 'Routes', icon: routesIcon, path: '/routes' },
    { name: 'Salesmen', icon: salesmenIcon, path: '/salesmen' },
    { name: 'Shopkeepers', icon: shopkeepersIcon, path: '/shopkeepers' },
    { name: 'Notifications', icon: bellIcon, path: '/notifications' },
    { name: 'Settings', icon: settingsIcon, path: '/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('shopzee_user');
    navigate('/login');
  };

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

        {isMobileNavOpen && (
          <div onClick={() => setIsMobileNavOpen(false)} className="fixed inset-0 bg-black/40 z-30 md:hidden" />
        )}

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6 text-left">
            
            {/* TOP BAR: BACK ARROW & EDIT PROFILE BUTTON */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate('/salesmen')}
                className="p-2 -ml-2 rounded-lg hover:bg-gray-200/60 transition cursor-pointer flex items-center justify-center"
                aria-label="Go Back"
              >
                <img src={arrowLeftIcon} alt="Back" className="w-6 h-6 object-contain rotate-180" />
              </button>

              <button
                type="button"
                className="bg-[#D71920] hover:bg-[#B9151B] text-white text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-lg flex items-center space-x-2 shadow-sm transition cursor-pointer"
              >
                <span>Edit profile</span>
                <img src={editIcon} alt="Edit" className="w-4 h-4 object-contain" />
              </button>
            </div>

            {/* SALESMAN DETAILS CARD */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-gray-100 space-y-6">
              {/* Profile Header (Avatar + Name & Role) */}
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F4C5C6] flex items-center justify-center text-[#8E2F32] font-bold text-lg sm:text-xl shrink-0">
                  RP
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">Rahul Patel</h2>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">RS-SM-024 | Salesman</p>
                </div>
              </div>

              {/* Information Grid: 3 Columns x 3 Rows */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 gap-x-8 text-xs sm:text-sm text-gray-800 pt-2">
                {/* Row 1 - Col 1 */}
                <div className="flex items-center space-x-2.5">
                  <img src={employeeIdIcon} alt="Employee ID" className="w-5 h-5 object-contain shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900">Employee ID:</span>{' '}
                    <span className="font-normal text-gray-700">RS-SM-024</span>
                  </div>
                </div>

                {/* Row 1 - Col 2 */}
                <div className="flex items-center space-x-2.5">
                  <img src={emailIcon} alt="Email" className="w-5 h-5 object-contain shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900">Email:</span>{' '}
                    <span className="font-normal text-gray-700 underline underline-offset-2 cursor-pointer">rahul.patel@ravisales.com</span>
                  </div>
                </div>

                {/* Row 1 - Col 3 */}
                <div className="flex items-center space-x-2.5">
                  <img src={assignedRouteIcon} alt="Assigned Route" className="w-5 h-5 object-contain shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900">Assigned Route:</span>{' '}
                    <span className="font-normal text-gray-700">Route 05</span>
                  </div>
                </div>

                {/* Row 2 - Col 1 */}
                <div className="flex items-center space-x-2.5">
                  <img src={roleIcon} alt="Role" className="w-5 h-5 object-contain shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900">Role:</span>{' '}
                    <span className="font-normal text-gray-700">Salesman</span>
                  </div>
                </div>

                {/* Row 2 - Col 2 */}
                <div className="flex items-center space-x-2.5">
                  <img src={phoneIcon} alt="Phone" className="w-5 h-5 object-contain shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900">Phone:</span>{' '}
                    <span className="font-normal text-gray-700">+91 98765 43210</span>
                  </div>
                </div>

                {/* Row 2 - Col 3 */}
                <div className="flex items-center space-x-2.5">
                  <img src={locationIcon} alt="Assigned Area" className="w-5 h-5 object-contain shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900">Assigned Area:</span>{' '}
                    <span className="font-normal text-gray-700">Navrangpura</span>
                  </div>
                </div>

                {/* Row 3 - Col 1 */}
                <div className="flex items-center space-x-2.5">
                  <img src={statusIcon} alt="Status" className="w-5 h-5 object-contain shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900">Status:</span>{' '}
                    <span className="font-normal text-gray-700">Active</span>
                  </div>
                </div>

                {/* Row 3 - Col 2 */}
                <div className="flex items-center space-x-2.5">
                  <img src={calendarIcon} alt="Joined Date" className="w-5 h-5 object-contain shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900">Joined Date:</span>{' '}
                    <span className="font-normal text-gray-700">12 March 2025</span>
                  </div>
                </div>

                {/* Row 3 - Col 3 (Empty) */}
                <div></div>
              </div>
            </div>

            {/* THREE METRIC CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {/* Card 1: Total Sales */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-gray-100 flex flex-col justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#FCD8D8] flex items-center justify-center shrink-0">
                    <img src={totalSalesIcon} alt="Total Sales" className="w-6 h-6 object-contain" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-700">Total Sales</p>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-0.5">1,23,000</h3>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-5 pt-1">
                  <span className="text-xs font-semibold text-[#22A847]">
                    +12.5% <span className="font-normal text-gray-500">from last month</span>
                  </span>
                  {/* Red Sparkline */}
                  <svg className="w-20 h-9" viewBox="0 0 80 36" fill="none">
                    <path
                      d="M2 30L14 26L26 29L38 15L50 20L62 8L78 2"
                      stroke="#EF4444"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Card 2: Orders Completed */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-gray-100 flex flex-col justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#FDE9C4] flex items-center justify-center shrink-0">
                    <img src={ordersBagIcon} alt="Orders Completed" className="w-6 h-6 object-contain" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-700">Orders Completed</p>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-0.5">186</h3>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-5 pt-1">
                  <span className="text-xs font-semibold text-[#22A847]">
                    +8.2% <span className="font-normal text-gray-500">from last month</span>
                  </span>
                  {/* Orange Sparkline */}
                  <svg className="w-20 h-9" viewBox="0 0 80 36" fill="none">
                    <path
                      d="M2 30L14 26L26 29L38 15L50 20L62 8L78 4"
                      stroke="#F59E0B"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Card 3: Target Achievement */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-gray-100 flex flex-col justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#DDD2F3] flex items-center justify-center shrink-0">
                    <img src={targetBullseyeIcon} alt="Target Achievement" className="w-6 h-6 object-contain" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-700">Target Achievement</p>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-0.5">87%</h3>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-5 pt-1">
                  <span className="text-xs font-medium text-gray-500">
                    Target: <span className="font-semibold text-gray-700">₹1,50,000</span>
                  </span>
                  {/* Purple Sparkline */}
                  <svg className="w-20 h-9" viewBox="0 0 80 36" fill="none">
                    <path
                      d="M2 30L14 26L26 29L38 15L50 20L62 8L78 4"
                      stroke="#6366F1"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* TODAY'S VISIT TABLE SECTION */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-gray-100 space-y-6 text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Today's Visit</h2>

              <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-center border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-[#D9D9D9] text-gray-900 text-xs sm:text-sm font-bold">
                      <th className="py-3.5 px-4 sm:px-6">Shopkeeper</th>
                      <th className="py-3.5 px-4 sm:px-6">Area</th>
                      <th className="py-3.5 px-4 sm:px-6">Visit Time</th>
                      <th className="py-3.5 px-4 sm:px-6">Order Value</th>
                      <th className="py-3.5 px-4 sm:px-6">Visit Type</th>
                      <th className="py-3.5 px-4 sm:px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-xs sm:text-sm font-medium text-gray-800 bg-white">
                    {todaysVisits.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.shopkeeper}</td>
                        <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.area}</td>
                        <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.visitTime}</td>
                        <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.orderValue}</td>
                        <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.visitType}</td>
                        <td className="py-3.5 px-4 sm:px-6">
                          <span className={getStatusColor(item.status)}>{item.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RECENT ORDERS TABLE SECTION */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-gray-100 space-y-6 text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Recent Orders</h2>

              <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-center border-collapse min-w-[650px]">
                  <thead>
                    <tr className="bg-[#D9D9D9] text-gray-900 text-xs sm:text-sm font-bold">
                      <th className="py-3.5 px-4 sm:px-6">Order ID</th>
                      <th className="py-3.5 px-4 sm:px-6">Shopkeeper</th>
                      <th className="py-3.5 px-4 sm:px-6">Date</th>
                      <th className="py-3.5 px-4 sm:px-6">Amount</th>
                      <th className="py-3.5 px-4 sm:px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-xs sm:text-sm font-medium text-gray-800 bg-white">
                    {recentOrders.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-bold">{item.orderId}</td>
                        <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.shopkeeper}</td>
                        <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.date}</td>
                        <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.amount}</td>
                        <td className="py-3.5 px-4 sm:px-6">
                          <span className={getStatusColor(item.status)}>{item.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
