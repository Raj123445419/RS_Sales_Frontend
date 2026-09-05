import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Header & Navigation Assets
import logoImg from '../assets/rs-logo.png';
import bellIcon from '../assets/BellBlack.svg';
import goldBellIcon from '../assets/BellGold.svg';
import adminAvatar from '../assets/AdminAvatarBlack.svg';
import goldUserIcon from '../assets/UserGold.svg';
import goldCircle from '../assets/CircleGold.svg';
import dashboardIcon from '../assets/HomeBlack.svg';
import boxIcon from '../assets/BoxBlack.svg';
import cartIcon from '../assets/CartIcon.svg';
import paymentIcon from '../assets/moneybag.svg';
import chartIcon from '../assets/Chart.svg';
import routesIcon from '../assets/RouteBlack.svg';
import salesmenIcon from '../assets/Salesman.svg';
import Shoopkeeper from '../assets/Shoopkeeper.svg';
import settingsIcon from '../assets/Settings.svg';
import logoutIcon from '../assets/Log out.svg';

// Requested Page-specific SVGs

import PhoneBlack from '../assets/PhoneBlack.svg';
import arrowLeftIcon from '../assets/ArrowUpBlack.svg';
import editIcon from '../assets/EditWhite.svg';
import employeeIdIcon from '../assets/UserBlack.svg';
import emailIcon from '../assets/EmailBlack.svg';
import locationIcon from '../assets/LocationPinBlack.svg';
import calendarIcon from '../assets/CalendarBlack.svg';
import totalSalesIcon from '../assets/BarChartBlack.svg';
import ordersBagIcon from '../assets/BagBlack.svg';
import targetBullseyeIcon from '../assets/TargetBlack.svg';
import walletIcon from '../assets/WalletPurple.svg';
import ordersBagOrangeIcon from '../assets/BagOrange.svg';
import Redperson from '../assets/Redperson.svg';

export default function Shopkeeper1() {
  const { id } = useParams();
  const [activeNav, setActiveNav] = useState('Shopkeepers');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navigate = useNavigate();

  // Shopkeeper Details State
  const [shopkeeperData, setShopkeeperData] = useState({
    id: id || '1',
    initials: 'RP',
    name: 'Rahul Patel',
    shopName: 'Patel General Store',
    location: 'Satellite, Ahmedabad, Gujarat',
    assignedSalesman: 'Amit Shah',
    ownerName: 'Rahul Patel',
    email: 'rahul.patel@ravisales.com',
    phone: '+91 98765 43210',
    shopType: 'General Store',
    shopAddress: 'Satellite, Ahmedabad, Gujarat',
    joinedDate: '12 January 2026',
    status: 'Active'
  });

  // 4 Stat Cards Metrics
  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    ordersGrowth: '0 this month',
    totalPurchase: '₹0',
    purchasePeriod: 'This year',
    outstanding: '₹0',
    outstandingStatus: 'Payment due',
    lastOrderDate: 'N/A',
    lastOrderAmount: '₹0'
  });

  // Recent Orders State
  const [recentOrders, setRecentOrders] = useState([]);

  // Recent Visits State
  const [recentVisits, setRecentVisits] = useState([]);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    shopName: '',
    email: '',
    phone: '',
    shopType: 'General Store',
    shopAddress: '',
    assignedSalesman: '',
    status: 'Active'
  });

  // Load initial form data when shopkeeperData changes
  useEffect(() => {
    setEditForm({
      name: shopkeeperData.name || '',
      shopName: shopkeeperData.shopName || '',
      email: shopkeeperData.email || '',
      phone: shopkeeperData.phone || '',
      shopType: shopkeeperData.shopType || 'General Store',
      shopAddress: shopkeeperData.shopAddress || '',
      assignedSalesman: shopkeeperData.assignedSalesman || '',
      status: shopkeeperData.status || 'Active'
    });
  }, [shopkeeperData]);

  // Fetch dynamic data from Backend based on shopkeeper ID
  useEffect(() => {
    if (id) {
      fetch(`http://127.0.0.1:8000/api/v1/shopkeeper-detail/${id}/`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.success) {
            if (data.shopkeeper) setShopkeeperData(data.shopkeeper);
            if (data.metrics) setMetrics(data.metrics);
            if (data.recentOrders) setRecentOrders(data.recentOrders);
            if (data.recentVisits) setRecentVisits(data.recentVisits);
          }
        })
        .catch((err) => console.error("Failed to fetch shopkeeper details:", err));
    }
  }, [id]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    fetch(`http://127.0.0.1:8000/api/v1/shopkeepers-update/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shopName: editForm.shopName,
        ownerName: editForm.name,
        shopkeeper: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
        shopType: editForm.shopType,
        address: editForm.shopAddress,
        salesman: editForm.assignedSalesman,
        status: editForm.status
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setShopkeeperData((prev) => ({
            ...prev,
            name: editForm.name,
            ownerName: editForm.name,
            shopName: editForm.shopName,
            email: editForm.email,
            phone: editForm.phone,
            shopType: editForm.shopType,
            shopAddress: editForm.shopAddress,
            location: editForm.shopAddress,
            assignedSalesman: editForm.assignedSalesman,
            status: editForm.status
          }));
          setIsEditModalOpen(false);
        } else {
          alert('Failed to update profile: ' + (data.error || 'Unknown error'));
        }
      })
      .catch((err) => console.error("Error updating shopkeeper:", err));
  };

  const getOrderStatusColor = (status) => {
    const s = String(status || '').toLowerCase();
    if (s === 'completed') return 'text-[#22A847] font-semibold';
    if (s === 'scheduled') return 'text-[#EB9F30] font-semibold';
    if (s === 'pending') return 'text-[#D71920] font-semibold';
    return 'text-gray-700 font-semibold';
  };

  const navItems = [
    { name: 'Dashboard', icon: dashboardIcon, path: '/AdminDashboard' },
    { name: 'Inventory', icon: boxIcon, path: '#' },
    { name: 'Orders', icon: cartIcon, path: '/orders' },
    { name: 'Routes', icon: routesIcon, path: '/routes' },
    { name: 'Salesmen', icon: salesmenIcon, path: '/salesmen' },
    { name: 'Shopkeepers', icon: Shoopkeeper, path: '/shopkeepers' },
    { name: 'Payments', icon: paymentIcon, path: '#' },
    { name: 'Reports', icon: chartIcon, path: '#' },
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
        {/* SIDEBAR NAVIGATION */}
        <aside
          className={`fixed md:sticky top-[58px] md:top-[66px] left-0 z-40 h-[calc(100vh-58px)] md:h-[calc(100vh-66px)] w-64 bg-white border-r border-gray-200 flex flex-col justify-between p-5 transition-transform duration-300 ${
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
                    if (item.path && item.path !== '#') navigate(item.path);
                  }}
                  className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition cursor-pointer ${
                    isActive ? 'text-[#000000] bg-[#76544359] font-bold' : 'text-[#201C18] hover:bg-gray-100/70 hover:text-black'
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
            
            {/* TOP ACTION BAR: BACK ARROW & EDIT PROFILE BUTTON */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate('/shopkeepers')}
                className="p-2 -ml-2 rounded-lg hover:bg-gray-200/60 transition cursor-pointer flex items-center justify-center"
                aria-label="Go Back"
              >
                <img src={arrowLeftIcon} alt="Back" className="w-5 h-5 object-contain" />
              </button>

              <button
                type="button"
                onClick={() => setIsEditModalOpen(true)}
                className="bg-[#D71920] hover:bg-[#B9151B] text-white text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-lg flex items-center space-x-2 shadow-xs transition cursor-pointer"
              >
                <span>Edit profile</span>
                <img src={editIcon} alt="Edit" className="w-4 h-4 object-contain" />
              </button>
            </div>

            {/* SHOPKEEPER DETAILS PROFILE CARD */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-gray-100 space-y-6">
              
              {/* Profile Header Row */}
              <div className="flex items-center space-x-4 sm:space-x-5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F4C5C6] flex items-center justify-center text-[#8E2F32] font-bold text-lg sm:text-xl shrink-0">
                  {shopkeeperData.initials || 'RP'}
                </div>
                <div className="space-y-0.5">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{shopkeeperData.name}</h2>
                  <p className="text-sm font-medium text-gray-700">{shopkeeperData.shopName}</p>
                  
                  {/* Meta Location & Salesman */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 font-normal pt-0.5">
                    <span className="inline-flex items-center space-x-1">
                      <img src={locationIcon} alt="Location" className="w-3.5 h-3.5 object-contain" />
                      <span>{shopkeeperData.location}</span>
                    </span>
                    <span className="inline-flex items-center space-x-1">
                      <img src={employeeIdIcon} alt="Salesman" className="w-3.5 h-3.5 object-contain" />
                      <span>Assigned to {shopkeeperData.assignedSalesman}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* 3 Column Detailed Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 sm:gap-y-5 gap-x-6 sm:gap-x-8 text-xs sm:text-sm text-gray-800 pt-2 border-t border-gray-50">
                
                {/* Column 1 */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2.5">
                    <img src={employeeIdIcon} alt="Owner Name" className="w-4 h-4 object-contain shrink-0" />
                    <div>
                      <span className="font-bold text-gray-900">Owner Name:</span>{' '}
                      <span className="font-normal text-gray-700">{shopkeeperData.ownerName}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5">
                    <img src={emailIcon} alt="Email" className="w-4 h-4 object-contain shrink-0" />
                    <div>
                      <span className="font-bold text-gray-900">Email:</span>{' '}
                      <span className="font-normal text-gray-700 underline underline-offset-2 cursor-pointer">{shopkeeperData.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5">
                    <img src={PhoneBlack} alt="Phone" className="w-5 h-5 object-contain shrink-0" />
                    <div>
                      <span className="font-bold text-gray-900">Phone:</span>{' '}
                      <span className="font-normal text-gray-700">{shopkeeperData.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2.5">
                    <img src={targetBullseyeIcon} alt="Shop Name" className="w-4 h-4 object-contain shrink-0" />
                    <div>
                      <span className="font-bold text-gray-900">Shop Name:</span>{' '}
                      <span className="font-normal text-gray-700">{shopkeeperData.shopName}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5">
                    <img src={ordersBagIcon} alt="Shop Type" className="w-4 h-4 object-contain shrink-0" />
                    <div>
                      <span className="font-bold text-gray-900">Shop Type:</span>{' '}
                      <span className="font-normal text-gray-700">{shopkeeperData.shopType}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5">
                    <img src={locationIcon} alt="Shop Address" className="w-4 h-4 object-contain shrink-0" />
                    <div>
                      <span className="font-bold text-gray-900">Shop Address:</span>{' '}
                      <span className="font-normal text-gray-700">{shopkeeperData.shopAddress}</span>
                    </div>
                  </div>
                </div>

                {/* Column 3 */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2.5">
                    <img src={totalSalesIcon} alt="Assigned Salesman" className="w-4 h-4 object-contain shrink-0" />
                    <div>
                      <span className="font-bold text-gray-900">Assigned Salesman:</span>{' '}
                      <span className="font-normal text-gray-700">{shopkeeperData.assignedSalesman}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5">
                    <img src={calendarIcon} alt="Joined Date" className="w-4 h-4 object-contain shrink-0" />
                    <div>
                      <span className="font-bold text-gray-900">Joined Date:</span>{' '}
                      <span className="font-normal text-gray-700">{shopkeeperData.joinedDate}</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* 4 STAT CARDS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 pt-1">
              
              {/* Card 1: Total Orders */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center space-x-4 transition hover:shadow-sm">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#FFF4E5] flex items-center justify-center shrink-0">
                  <img src={ordersBagOrangeIcon} alt="Total Orders" className="w-6 h-6 object-contain" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-semibold text-gray-700">Total Orders</p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">{metrics.totalOrders}</h3>
                  <p className="text-[11px] sm:text-xs font-semibold text-[#22A847]">{metrics.ordersGrowth}</p>
                </div>
              </div>

              {/* Card 2: Total Purchase */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center space-x-4 transition hover:shadow-sm">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#E6F8E9] flex items-center justify-center shrink-0 text-[#22A847] font-bold text-xl">
                  ₹
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-semibold text-gray-700">Total Purchase</p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">{metrics.totalPurchase}</h3>
                  <p className="text-[11px] sm:text-xs font-semibold text-[#22A847]">{metrics.purchasePeriod}</p>
                </div>
              </div>

              {/* Card 3: Outstanding */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center space-x-4 transition hover:shadow-sm">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#FCE8EA] flex items-center justify-center shrink-0">
                  <img src={Redperson} alt="Outstanding" className="w-7 h-7 object-contain" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-semibold text-gray-700">Outstanding</p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">{metrics.outstanding}</h3>
                  <p className="text-[11px] sm:text-xs font-semibold text-[#D71920]">{metrics.outstandingStatus}</p>
                </div>
              </div>

              {/* Card 4: Last Order */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center space-x-4 transition hover:shadow-sm">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#ECE6FF] flex items-center justify-center shrink-0">
                  <img src={walletIcon} alt="Last Order" className="w-7 h-6 object-contain" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-semibold text-gray-700">Last Order</p>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight">{metrics.lastOrderDate}</h3>
                  <p className="text-[11px] sm:text-xs font-semibold text-[#8B5CF6]">{metrics.lastOrderAmount}</p>
                </div>
              </div>

            </div>

            {/* RECENT ORDERS TABLE SECTION */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-gray-100 space-y-6 text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Recent Orders</h2>
              <div className="w-full overflow-x-auto rounded-xl border border-gray-300 overflow-hidden">
                <table className="w-full text-center border-collapse min-w-[680px]">
                  <thead>
                    <tr className="bg-[#D9D9D9] text-gray-900 text-xs sm:text-sm font-bold">
                      <th className="py-3.5 px-4 sm:px-6">Order ID</th>
                      <th className="py-3.5 px-4 sm:px-6">Date</th>
                      <th className="py-3.5 px-4 sm:px-6">Items</th>
                      <th className="py-3.5 px-4 sm:px-6">Order Value</th>
                      <th className="py-3.5 px-4 sm:px-6">Payment</th>
                      <th className="py-3.5 px-4 sm:px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-xs sm:text-sm font-medium text-gray-800 bg-white">
                    {recentOrders.length > 0 ? (
                      recentOrders.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-bold">{item.orderId}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-800 font-medium">{item.date}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-800 font-medium">{item.items}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-bold">{item.orderValue}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-800 font-medium">{item.payment}</td>
                          <td className="py-3.5 px-4 sm:px-6">
                            <span className={getOrderStatusColor(item.status)}>{item.status}</span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-8 text-gray-500 font-medium">
                          No recent orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RECENT VISIT TABLE SECTION */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-gray-100 space-y-6 text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Recent Visit</h2>
              <div className="w-full overflow-x-auto rounded-xl border border-gray-300 overflow-hidden">
                <table className="w-full text-center border-collapse min-w-[550px]">
                  <thead>
                    <tr className="bg-[#D9D9D9] text-gray-900 text-xs sm:text-sm font-bold">
                      <th className="py-3.5 px-4 sm:px-6">Date</th>
                      <th className="py-3.5 px-4 sm:px-6">Salesman</th>
                      <th className="py-3.5 px-4 sm:px-6">Purpose</th>
                      <th className="py-3.5 px-4 sm:px-6">Outcome</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-xs sm:text-sm font-medium text-gray-800 bg-white">
                    {recentVisits.length > 0 ? (
                      recentVisits.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.date}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-800 font-medium">{item.salesman}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-800 font-medium">{item.purpose}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.outcome}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center py-8 text-gray-500 font-medium">
                          No recent visits found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 text-left animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900">Edit Shopkeeper Profile</h3>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Owner Name *</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2 outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Shop Name *</label>
                <input
                  type="text"
                  required
                  value={editForm.shopName}
                  onChange={(e) => setEditForm({ ...editForm, shopName: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2 outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2 outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2 outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Shop Type</label>
                  <input
                    type="text"
                    value={editForm.shopType}
                    onChange={(e) => setEditForm({ ...editForm, shopType: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2 outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Assigned Salesman</label>
                  <input
                    type="text"
                    value={editForm.assignedSalesman}
                    onChange={(e) => setEditForm({ ...editForm, assignedSalesman: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2 outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Shop Address</label>
                <input
                  type="text"
                  value={editForm.shopAddress}
                  onChange={(e) => setEditForm({ ...editForm, shopAddress: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2 outline-none focus:border-red-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#D71920] hover:bg-[#B9151B] text-white font-semibold shadow-sm cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}