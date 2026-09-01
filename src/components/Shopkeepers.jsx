import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Header & Navigation Assets
import logoImg from '../assets/rs-logo.png';
import bellIcon from '../assets/BellBlack.svg';
import goldBellIcon from '../assets/BellGold.svg';
import adminAvatar from '../assets/AdminAvatarBlack.svg';
import goldUserIcon from '../assets/UserGold.svg';
import goldCircle from '../assets/CircleGold.svg';
import dashboardIcon from '../assets/HomeBlack.svg';
import boxIcon from '../assets/BoxBlack.svg';
import routesIcon from '../assets/RouteBlack.svg';
import salesmenIcon from '../assets/SalesmanProfileBlack.svg';
import shopkeepersIcon from '../assets/ShopkeeperProfileBlack.svg';
import settingsIcon from '../assets/Settings.svg';
import logoutIcon from '../assets/Log out.svg';
import dropDownArrowIcon from '../assets/ChevronDownBlack.svg';

// Requested Specific Stat & Action SVGs
import totalShopkeepersIcon from '../assets/UserOrange.svg';
import activeShopkeepersIcon from '../assets/UserGreen.svg';
import pendingVisitsIcon from '../assets/TargetRed.svg';
import ordersThisMonthIcon from '../assets/WalletPurple.svg';
import editShopkeeperIcon from '../assets/EditGray.svg';

export default function Shopkeepers() {
  const [activeNav, setActiveNav] = useState('Shopkeepers');
  const [timeFilter, setTimeFilter] = useState('This Month');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navigate = useNavigate();

  // Search & Filter States for Table
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [salesmanFilter, setSalesmanFilter] = useState('All');
  const [routeFilter, setRouteFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  // Top 4 Stat Cards Metrics
  const [metrics, setMetrics] = useState({
    totalShopkeepers: 124,
    activeShopkeepers: 221,
    pendingVisits: 18,
    ordersThisMonth: '₹4.82L'
  });

  // Table Data matching exact reference screenshot
  const [shopkeepersList, setShopkeepersList] = useState([
    {
      id: 1,
      shopName: 'Patel General Store',
      shopkeeper: 'Rahul Patel',
      salesman: 'Rahul Patel',
      route: 'RT-001',
      outstanding: '₹12,000',
      orders: 18,
      status: 'Active'
    },
    {
      id: 2,
      shopName: 'Patel General Store',
      shopkeeper: 'Rahul Patel',
      salesman: 'Rahul Patel',
      route: 'RT-001',
      outstanding: '₹12,000',
      orders: 18,
      status: 'Active'
    },
    {
      id: 3,
      shopName: 'Patel General Store',
      shopkeeper: 'Rahul Patel',
      salesman: 'Rahul Patel',
      route: 'RT-001',
      outstanding: '₹12,000',
      orders: 18,
      status: 'Inactive'
    },
    {
      id: 4,
      shopName: 'Patel General Store',
      shopkeeper: 'Rahul Patel',
      salesman: 'Rahul Patel',
      route: 'RT-001',
      outstanding: '₹12,000',
      orders: 18,
      status: 'Active'
    },
    {
      id: 5,
      shopName: 'Patel General Store',
      shopkeeper: 'Rahul Patel',
      salesman: 'Rahul Patel',
      route: 'RT-001',
      outstanding: '₹12,000',
      orders: 18,
      status: 'Inactive'
    },
    {
      id: 6,
      shopName: 'Patel General Store',
      shopkeeper: 'Rahul Patel',
      salesman: 'Rahul Patel',
      route: 'RT-001',
      outstanding: '₹12,000',
      orders: 18,
      status: 'Active'
    },
    {
      id: 7,
      shopName: 'Patel General Store',
      shopkeeper: 'Rahul Patel',
      salesman: 'Rahul Patel',
      route: 'RT-001',
      outstanding: '₹12,000',
      orders: 18,
      status: 'Active'
    }
  ]);

  // Dropdown options
  const [salesmanOptions, setSalesmanOptions] = useState([
    'Rahul Patel',
    'Amit Sharma',
    'Suresh Kumar',
    'Vikas Patel'
  ]);
  const [routeOptions, setRouteOptions] = useState([
    'RT-001',
    'RT-002',
    'RT-003',
    'RT-004'
  ]);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingShopkeeper, setEditingShopkeeper] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    shopName: '',
    shopkeeper: '',
    salesman: '',
    route: '',
    outstanding: '₹0',
    orders: 0,
    status: 'Active'
  });

  // Fetch dynamic data if API backend is running
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/v1/shopkeepers-page/?search=${encodeURIComponent(searchQuery)}&status=${encodeURIComponent(statusFilter)}&salesman=${encodeURIComponent(salesmanFilter)}&route=${encodeURIComponent(routeFilter)}&timeFilter=${encodeURIComponent(timeFilter)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success) {
          if (data.metrics) setMetrics(data.metrics);
          if (data.shopkeepers) setShopkeepersList(data.shopkeepers);
          if (data.dropdowns?.salesmen) setSalesmanOptions(data.dropdowns.salesmen);
          if (data.dropdowns?.routes) setRouteOptions(data.dropdowns.routes);
        }
      })
      .catch(() => {
        // Use default data
      });
  }, [searchQuery, statusFilter, salesmanFilter, routeFilter, timeFilter]);

  const navItems = [
    { name: 'Dashboard', icon: dashboardIcon, path: '/AdminDashboard' },
    { name: 'Orders', icon: boxIcon, path: '/orders' },
    { name: 'Routes', icon: routesIcon, path: '/routes' },
    { name: 'Salesmen', icon: salesmenIcon, path: '/salesmen' },
    { name: 'Shopkeepers', icon: shopkeepersIcon, path: '/shopkeepers' },
    { name: 'Notifications', icon: bellIcon, path: '/notifications' },
    { name: 'Settings', icon: settingsIcon, path: '/settings' },
  ];

  // Filtering Logic
  const filteredShopkeepers = shopkeepersList.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || (
      item.shopName?.toLowerCase().includes(query) ||
      item.shopkeeper?.toLowerCase().includes(query) ||
      item.salesman?.toLowerCase().includes(query) ||
      item.route?.toLowerCase().includes(query) ||
      item.outstanding?.toLowerCase().includes(query) ||
      String(item.orders).includes(query) ||
      item.status?.toLowerCase().includes(query)
    );

    const matchesStatus = statusFilter === 'All' || item.status?.toLowerCase() === statusFilter.toLowerCase();
    const matchesSalesman = salesmanFilter === 'All' || item.salesman?.toLowerCase() === salesmanFilter.toLowerCase();
    const matchesRoute = routeFilter === 'All' || item.route?.toLowerCase() === routeFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesSalesman && matchesRoute;
  });

  const isFiltered = searchQuery !== '' || statusFilter !== 'All' || salesmanFilter !== 'All' || routeFilter !== 'All';
  const displayShopkeepers = (showAll || isFiltered) ? filteredShopkeepers : filteredShopkeepers.slice(0, 5);

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setSalesmanFilter('All');
    setRouteFilter('All');
    setShowAll(false);
  };

  const handleOpenEditModal = (shop) => {
    setEditingShopkeeper(shop);
    setFormData({
      shopName: shop.shopName || '',
      shopkeeper: shop.shopkeeper || '',
      salesman: shop.salesman || salesmanOptions[0] || '',
      route: shop.route || routeOptions[0] || '',
      outstanding: shop.outstanding || '₹0',
      orders: shop.orders || 0,
      status: shop.status || 'Active'
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingShopkeeper) return;

    setShopkeepersList((prev) =>
      prev.map((item) =>
        item.id === editingShopkeeper.id
          ? { ...item, ...formData }
          : item
      )
    );
    setIsEditModalOpen(false);
  };

  const handleOpenAddModal = () => {
    setFormData({
      shopName: '',
      shopkeeper: '',
      salesman: salesmanOptions[0] || 'Rahul Patel',
      route: routeOptions[0] || 'RT-001',
      outstanding: '₹0',
      orders: 0,
      status: 'Active'
    });
    setIsAddModalOpen(true);
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    const newId = shopkeepersList.length + 1;
    const newShop = {
      id: newId,
      ...formData
    };

    setShopkeepersList([newShop, ...shopkeepersList]);
    setIsAddModalOpen(false);
  };

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
        <aside className={`fixed md:sticky top-[58px] md:top-[80px] left-0 z-40 h-[calc(100vh-58px)] md:h-[calc(100vh-80px)] w-64 bg-white border-r border-gray-200 flex flex-col justify-between p-5 transition-transform duration-300 ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
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
                    isActive ? 'text-[#D71920] bg-red-50/60 font-bold' : 'text-[#201C18] hover:bg-gray-100/70 hover:text-black'
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
            
            {/* Page Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Shopkeepers</h1>
              <p className="text-xs sm:text-sm text-gray-600 font-normal mt-1">Manage shopkeepers, assigned salesmen, visits, and business activity.</p>
            </div>

            {/* 4 STAT CARDS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 pt-1">
              
              {/* Card 1: Total Shopkeepers */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center space-x-4 transition hover:shadow-sm">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#FFF4E5] flex items-center justify-center shrink-0">
                  <img src={totalShopkeepersIcon} alt="Total Shopkeepers" className="w-6 h-6 object-contain" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Total Shopkeepers</p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">{metrics.totalShopkeepers}</h3>
                  <p className="text-[11px] sm:text-xs text-gray-400 font-normal">Registered shops</p>
                </div>
              </div>

              {/* Card 2: Active Shopkeepers */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center space-x-4 transition hover:shadow-sm">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#E6F8E9] flex items-center justify-center shrink-0">
                  <img src={activeShopkeepersIcon} alt="Active Shopkeepers" className="w-6 h-6 object-contain" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Active Shopkeepers</p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">{metrics.activeShopkeepers}</h3>
                  <p className="text-[11px] sm:text-xs text-gray-400 font-normal">Currently active</p>
                </div>
              </div>

              {/* Card 3: Pending Visits */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center space-x-4 transition hover:shadow-sm">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#FCE8EA] flex items-center justify-center shrink-0">
                  <img src={pendingVisitsIcon} alt="Pending Visits" className="w-7 h-7 object-contain" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Pending Visits</p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">{metrics.pendingVisits}</h3>
                  <p className="text-[11px] sm:text-xs text-gray-400 font-normal">Visits scheduled today</p>
                </div>
              </div>

              {/* Card 4: Orders This Month */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center space-x-4 transition hover:shadow-sm">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#ECE6FF] flex items-center justify-center shrink-0">
                  <img src={ordersThisMonthIcon} alt="Orders This Month" className="w-7 h-6 object-contain" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Orders This Month</p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">{metrics.ordersThisMonth}</h3>
                  <p className="text-[11px] sm:text-xs text-gray-400 font-normal">Total order value</p>
                </div>
              </div>

            </div>

            {/* SHOPKEEPERS EXACT REFERENCE TABLE SECTION */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6 text-left">
              
              {/* Search Bar on Top */}
              <div>
                <div className="relative max-w-sm w-full border border-gray-300 rounded-full flex items-center px-4 py-2 bg-white shadow-2xs focus-within:border-gray-400 transition-colors">
                  <svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M16.65 11a5.65 5.65 0 11-11.3 0 5.65 5.65 0 0111.3 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Orders...."
                    className="text-xs sm:text-sm text-gray-800 outline-none w-full ml-2.5 bg-transparent placeholder-gray-400 font-normal"
                  />
                  {searchQuery && (
                    <button type="button" onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600 text-xs font-bold px-1 cursor-pointer">
                      ×
                    </button>
                  )}
                </div>
              </div>

              {/* Filters Row + Add Shop Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  
                  {/* Status Dropdown */}
                  <div className="relative">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-md px-3.5 py-1.5 pr-8 text-xs font-medium text-gray-700 cursor-pointer shadow-2xs focus:outline-none"
                    >
                      <option value="All">Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <img src={dropDownArrowIcon} alt="arrow" className="w-2.5 h-2 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                  </div>

                  {/* Salesman Dropdown */}
                  <div className="relative">
                    <select
                      value={salesmanFilter}
                      onChange={(e) => setSalesmanFilter(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-md px-3.5 py-1.5 pr-8 text-xs font-medium text-gray-700 cursor-pointer shadow-2xs focus:outline-none"
                    >
                      <option value="All">Salesman</option>
                      {salesmanOptions.map((sm, i) => (
                        <option key={i} value={sm}>{sm}</option>
                      ))}
                    </select>
                    <img src={dropDownArrowIcon} alt="arrow" className="w-2.5 h-2 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                  </div>

                  {/* Routes Dropdown */}
                  <div className="relative">
                    <select
                      value={routeFilter}
                      onChange={(e) => setRouteFilter(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-md px-3.5 py-1.5 pr-8 text-xs font-medium text-gray-700 cursor-pointer shadow-2xs focus:outline-none"
                    >
                      <option value="All">Routes</option>
                      {routeOptions.map((rt, i) => (
                        <option key={i} value={rt}>{rt}</option>
                      ))}
                    </select>
                    <img src={dropDownArrowIcon} alt="arrow" className="w-2.5 h-2 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                  </div>

                  {/* Clear Button */}
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="bg-[#D9D9D9] hover:bg-gray-300 text-gray-800 text-xs sm:text-sm font-medium px-4 py-1.5 rounded-md shadow-2xs transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                </div>

                {/* + Add Shop Red Button */}
                <button
                  type="button"
                  onClick={handleOpenAddModal}
                  className="bg-[#D71920] hover:bg-[#B9151B] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 rounded-md shadow-2xs flex items-center space-x-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <span>+ Add Shop</span>
                </button>
              </div>

              {/* Exact Shopkeepers Data Table */}
              <div className="w-full overflow-x-auto rounded-xl border border-gray-300">
                <table className="w-full text-center border-collapse min-w-[780px]">
                  <thead>
                    <tr className="bg-[#D9D9D9] text-gray-900 text-xs sm:text-sm font-bold">
                      <th className="py-3.5 px-4 sm:px-6">Shop Name</th>
                      <th className="py-3.5 px-4 sm:px-6">Shopkeeper</th>
                      <th className="py-3.5 px-4 sm:px-6">Salesman</th>
                      <th className="py-3.5 px-4 sm:px-6">Route</th>
                      <th className="py-3.5 px-4 sm:px-6">Outstanding</th>
                      <th className="py-3.5 px-4 sm:px-6">Orders</th>
                      <th className="py-3.5 px-4 sm:px-6">Status</th>
                      <th className="py-3.5 px-4 sm:px-6 text-right pr-6 sm:pr-8"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-xs sm:text-sm font-medium text-gray-800 bg-white">
                    {displayShopkeepers.length > 0 ? (
                      displayShopkeepers.map((shop, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 font-bold text-gray-900">
                            <Link to={`/shopkeeper/${shop.id}`} className="hover:text-[#D71920] transition-colors cursor-pointer">
                              {shop.shopName}
                            </Link>
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-800">
                            <Link to={`/shopkeeper/${shop.id}`} className="hover:text-[#D71920] transition-colors cursor-pointer">
                              {shop.shopkeeper}
                            </Link>
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-800">{shop.salesman}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-800">{shop.route}</td>
                          <td className="py-3.5 px-4 sm:px-6 font-bold text-gray-900">{shop.outstanding}</td>
                          <td className="py-3.5 px-4 sm:px-6 font-medium text-gray-900">{shop.orders}</td>
                          <td className="py-3.5 px-4 sm:px-6">
                            <span className={shop.status === 'Active' ? 'text-[#22A847] font-semibold' : 'text-[#D71920] font-semibold'}>
                              {shop.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-right pr-6 sm:pr-8">
                            <button
                              type="button"
                              onClick={() => handleOpenEditModal(shop)}
                              className="hover:opacity-75 transition cursor-pointer p-1 inline-flex items-center justify-center text-gray-500 hover:text-[#D71920]"
                              aria-label="Edit shopkeeper"
                            >
                              <img src={editShopkeeperIcon} alt="edit" className="w-5 h-5 object-contain" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-8 text-gray-500 font-medium">
                          No matching records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* View All Red Button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowAll(!showAll)}
                  className="bg-[#D71920] hover:bg-[#B9151B] text-white text-xs sm:text-sm font-medium py-2.5 px-5 rounded-md inline-flex items-center space-x-2 shadow-xs transition-all duration-200 cursor-pointer"
                >
                  <span>{showAll ? 'Show Less' : 'View All'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

            </div>

          </div>
        </main>
      </div>

      {/* ADD SHOP MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 text-left animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900">Add New Shop</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAdd} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Shop Name *</label>
                <input
                  type="text"
                  required
                  value={formData.shopName}
                  onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                  placeholder="e.g. Patel General Store"
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2 outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Shopkeeper Name *</label>
                <input
                  type="text"
                  required
                  value={formData.shopkeeper}
                  onChange={(e) => setFormData({ ...formData, shopkeeper: e.target.value })}
                  placeholder="e.g. Rahul Patel"
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2 outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Salesman</label>
                  <select
                    value={formData.salesman}
                    onChange={(e) => setFormData({ ...formData, salesman: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2 outline-none focus:border-red-500 bg-white"
                  >
                    {salesmanOptions.map((sm, i) => (
                      <option key={i} value={sm}>{sm}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Route</label>
                  <select
                    value={formData.route}
                    onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2 outline-none focus:border-red-500 bg-white"
                  >
                    {routeOptions.map((rt, i) => (
                      <option key={i} value={rt}>{rt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Outstanding</label>
                  <input
                    type="text"
                    value={formData.outstanding}
                    onChange={(e) => setFormData({ ...formData, outstanding: e.target.value })}
                    placeholder="e.g. ₹12,000"
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2 outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Orders</label>
                  <input
                    type="number"
                    value={formData.orders}
                    onChange={(e) => setFormData({ ...formData, orders: parseInt(e.target.value) || 0 })}
                    placeholder="e.g. 18"
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2 outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2 outline-none focus:border-red-500 bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#D71920] hover:bg-[#B9151B] text-white font-semibold shadow-sm cursor-pointer"
                >
                  Add Shop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT SHOP MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 text-left animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900">Edit Shop Details</h3>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Shop Name *</label>
                <input
                  type="text"
                  required
                  value={formData.shopName}
                  onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2 outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Shopkeeper Name *</label>
                <input
                  type="text"
                  required
                  value={formData.shopkeeper}
                  onChange={(e) => setFormData({ ...formData, shopkeeper: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2 outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Salesman</label>
                  <select
                    value={formData.salesman}
                    onChange={(e) => setFormData({ ...formData, salesman: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2 outline-none focus:border-red-500 bg-white"
                  >
                    {salesmanOptions.map((sm, i) => (
                      <option key={i} value={sm}>{sm}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Route</label>
                  <select
                    value={formData.route}
                    onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2 outline-none focus:border-red-500 bg-white"
                  >
                    {routeOptions.map((rt, i) => (
                      <option key={i} value={rt}>{rt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Outstanding</label>
                  <input
                    type="text"
                    value={formData.outstanding}
                    onChange={(e) => setFormData({ ...formData, outstanding: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2 outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Orders</label>
                  <input
                    type="number"
                    value={formData.orders}
                    onChange={(e) => setFormData({ ...formData, orders: parseInt(e.target.value) || 0 })}
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2 outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2 outline-none focus:border-red-500 bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
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
