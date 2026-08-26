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

// Overview Cards Assets
import boxOrdersIcon from '../assets/bx_box.svg';
import pendingClockIcon from '../assets/Vector (3).svg';
import cartOutlineIcon from '../assets/tabler_truck-loading (2).svg';
import taskCompleteIcon from '../assets/carbon_task-complete.svg';
import dropdownIcon from '../assets/icon (7).svg';
import arrowRightWhiteIcon from '../assets/Arrow up.svg';

export default function Orders() {
  const [activeNav, setActiveNav] = useState('Orders');
  const [timeFilter, setTimeFilter] = useState('This Week');
  const [selectedCard, setSelectedCard] = useState('Processing');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [salesmanFilter, setSalesmanFilter] = useState('All');
  const [shopkeeperFilter, setShopkeeperFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [hoveredBar, setHoveredBar] = useState(null);
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

  const overviewCards = [
    {
      id: 'total',
      title: 'Total Orders',
      value: '1,240',
      icon: boxOrdersIcon,
      bg: 'bg-[#DCD6FB]',
      barColor: 'bg-[#9D8AF5]',
      bars: [40, 65, 85, 100],
    },
    {
      id: 'pending',
      title: 'Pending',
      value: '42',
      icon: pendingClockIcon,
      bg: 'bg-[#F8CECE]',
      barColor: 'bg-[#EF7C7C]',
      bars: [50, 75, 45, 100],
    },
    {
      id: 'processing',
      title: 'Processing',
      value: '560',
      icon: cartOutlineIcon,
      bg: 'bg-[#F8DCB4]',
      barColor: 'bg-[#E8AF67]',
      bars: [40, 65, 85, 100],
    },
    {
      id: 'delivered',
      title: 'Delivered',
      value: '340',
      icon: taskCompleteIcon,
      bg: 'bg-[#CCE6D2]',
      barColor: 'bg-[#7BC28B]',
      bars: [40, 65, 85, 100],
    },
  ];

  const orderValueData = [
    { day: 'Mon', value: 38000, height: 125 },
    { day: 'Tue', value: 28000, height: 95 },
    { day: 'Wed', value: 48000, height: 160 },
    { day: 'Thu', value: 18000, height: 60 },
    { day: 'Fri', value: 25000, height: 85 },
    { day: 'Sat', value: 35000, height: 115 },
    { day: 'Sun', value: 12000, height: 42 },
  ];

  const ordersList = [
    {
      id: '#RS1024',
      customer: 'Patel Mart',
      salesman: 'Rahul',
      products: 'Coco Cola + 2 more',
      qty: '24 × 450',
      amount: '₹12,000',
      status: 'Delivered',
      statusColor: 'text-[#16A34A]',
      date: '24 Aug',
    },
    {
      id: '#RS1024',
      customer: 'Patel Mart',
      salesman: 'Rahul',
      products: 'Coco Cola + 2 more',
      qty: '24 × 450',
      amount: '₹12,000',
      status: 'Pending',
      statusColor: 'text-[#E53E3E]',
      date: '24 Aug',
    },
    {
      id: '#RS1024',
      customer: 'Patel Mart',
      salesman: 'Rahul',
      products: 'Coco Cola + 2 more',
      qty: '24 × 450',
      amount: '₹12,000',
      status: 'Delivered',
      statusColor: 'text-[#16A34A]',
      date: '24 Aug',
    },
    {
      id: '#RS1024',
      customer: 'Patel Mart',
      salesman: 'Rahul',
      products: 'Coco Cola + 2 more',
      qty: '24 × 450',
      amount: '₹12,000',
      status: 'Processing',
      statusColor: 'text-[#D97706]',
      date: '24 Aug',
    },
    {
      id: '#RS1024',
      customer: 'Patel Mart',
      salesman: 'Rahul',
      products: 'Coco Cola + 2 more',
      qty: '24 × 450',
      amount: '₹12,000',
      status: 'Processing',
      statusColor: 'text-[#D97706]',
      date: '24 Aug',
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('shopzee_user');
    navigate('/login');
  };

  // Filter orders by search & status
  const filteredOrders = ordersList.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.salesman.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.products.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' ||
      order.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F5F6F8] flex flex-col font-sans">
      
      {/* ================= TOP HEADER NAVBAR ================= */}
      <header className="w-full h-20 bg-[#181818] text-white px-4 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between shadow-md sticky top-0 z-50">
        {/* Left: RS Logo & Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="md:hidden p-1.5 rounded-lg bg-white/10 text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to="/AdminDashboard" className="flex items-center">
            <img src={logoImg} alt="RS Logo" className="h-12 sm:h-20 w-auto object-contain transition-transform hover:scale-105" />
          </Link>
        </div>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center space-x-5 sm:space-x-7">
          {/* Bell Notification */}
          <button
            type="button"
            className="p-1 hover:opacity-85 transition cursor-pointer"
          >
            <img src={goldBellIcon} alt="Notifications" className="w-7 h-7 object-contain" />
          </button>

          {/* Admin Profile */}
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

      {/* ================= MAIN CONTAINER ================= */}
      <div className="flex-1 flex w-full relative">
        
        {/* ================= LEFT SIDEBAR ================= */}
        <aside
          className={`fixed md:sticky top-[58px] md:top-[66px] left-0 z-40 h-[calc(100vh-58px)] md:h-[calc(100vh-66px)] w-64 bg-white border-r border-gray-200 flex flex-col justify-between p-5 transition-transform duration-300 ${
            isMobileNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          {/* Navigation Links */}
          <nav className="space-y-1.5 text-left">
            {navItems.map((item) => {
              const isActive = activeNav === item.name || item.name === 'Orders';
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    setActiveNav(item.name);
                    setIsMobileNavOpen(false);
                    if (item.path) {
                      navigate(item.path);
                    }
                  }}
                  className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition cursor-pointer ${
                    isActive
                      ? 'text-[#D71920] bg-red-50/60 font-bold'
                      : 'text-[#201C18] hover:bg-gray-100/70 hover:text-black'
                  }`}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-5 h-5 object-contain"
                  />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Bottom Sidebar: Admin Profile & Logout */}
          <div className="pt-6 border-t border-gray-100 space-y-4 text-left">
            <div className="flex items-center space-x-3 px-2">
              <img src={adminAvatar} alt="Admin Profile" className="w-10 h-10 object-contain" />
              <div>
                <h4 className="text-sm font-bold text-gray-900 leading-tight">Admin</h4>
                <span className="text-xs text-gray-500 font-normal">Administrator</span>
              </div>
            </div>

            {/* Log Out Pill Button */}
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

        {/* Mobile Backdrop */}
        {isMobileNavOpen && (
          <div
            onClick={() => setIsMobileNavOpen(false)}
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
          />
        )}

        {/* ================= MAIN CONTENT AREA ================= */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">

            {/* Top Row: Page Title */}
            <div className="text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Orders
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                Manage and track all orders
              </p>
            </div>

            {/* Middle Section: Overview (2x2 Grid) + Order Value Bar Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Column: Overview 2x2 Cards (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between text-left">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Overview
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                  {overviewCards.map((card) => {
                    const isSelected = selectedCard === card.title;
                    return (
                      <div
                        key={card.id}
                        onClick={() => setSelectedCard(card.title)}
                        className={`rounded-2xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden cursor-pointer transition-all duration-200 ${card.bg} ${
                          isSelected
                            ? 'border-2 border-[#0095FF] shadow-sm'
                            : 'border border-transparent hover:shadow-md'
                        }`}
                      >
                        {/* Top Area: Title, Value & Icon */}
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs font-semibold text-gray-700">{card.title}</p>
                            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">
                              {card.value}
                            </h3>
                          </div>

                          <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0">
                            <img src={card.icon} alt={card.title} className="w-full h-full object-contain" />
                          </div>
                        </div>

                        {/* Bottom-right Mini 4-Bar Graph Illustration */}
                        <div className="flex items-end justify-end space-x-1.5 h-10 mt-4 self-end">
                          {card.bars.map((h, i) => (
                            <div
                              key={i}
                              className={`w-1.5 sm:w-2 rounded-t-sm ${card.barColor}`}
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Order Value Bar Chart Card (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-100 flex flex-col justify-between text-left">
                {/* Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Order Value</h3>
                    <p className="text-xs text-gray-500 font-medium">
                      Track order revenue over time
                    </p>
                  </div>

                  {/* Dropdown Filter */}
                  <div className="relative inline-block self-start sm:self-auto">
                    <select
                      value={timeFilter}
                      onChange={(e) => setTimeFilter(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-8 text-xs font-semibold text-gray-700 cursor-pointer focus:outline-none shadow-sm"
                    >
                      <option value="This Week">This Week</option>
                      <option value="This Month">This Month</option>
                      <option value="This Year">This Year</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                      <img src={dropdownIcon} alt="arrow" className="w-2.5 h-2.5 opacity-60" />
                    </div>
                  </div>
                </div>

                {/* SVG Vertical Bar Chart */}
                <div className="w-full relative mt-2">
                  <svg viewBox="0 0 520 240" className="w-full h-auto overflow-visible select-none">
                    {/* Horizontal Grid lines & Y-Axis Labels */}
                    {[
                      { label: '50k', y: 30 },
                      { label: '40k', y: 70 },
                      { label: '30k', y: 110 },
                      { label: '20k', y: 150 },
                      { label: '10k', y: 190 },
                    ].map((grid) => (
                      <g key={grid.label}>
                        <text
                          x="35"
                          y={grid.y + 4}
                          textAnchor="end"
                          className="text-[11px] fill-gray-600 font-medium"
                        >
                          {grid.label}
                        </text>
                        <line
                          x1="50"
                          y1={grid.y}
                          x2="495"
                          y2={grid.y}
                          stroke="#E5E7EB"
                          strokeWidth="1"
                        />
                      </g>
                    ))}

                    {/* Vertical Bars for Days (Mon - Sun) */}
                    {orderValueData.map((bar, idx) => {
                      const barWidth = 18;
                      const x = 70 + idx * 62;
                      const barHeight = (bar.value / 50000) * 160;
                      const y = 190 - barHeight;

                      return (
                        <g
                          key={bar.day}
                          className="cursor-pointer group"
                          onMouseEnter={() => setHoveredBar(bar)}
                          onMouseLeave={() => setHoveredBar(null)}
                        >
                          {/* Warm Mocha / Taupe Rounded Bar */}
                          <rect
                            x={x}
                            y={y}
                            width={barWidth}
                            height={barHeight}
                            rx="9"
                            ry="9"
                            fill="#BFA997"
                            className="transition-all duration-200 group-hover:fill-[#A8917F]"
                          />
                          {/* Day Label on X Axis */}
                          <text
                            x={x + barWidth / 2}
                            y="225"
                            textAnchor="middle"
                            className="text-xs fill-gray-800 font-semibold"
                          >
                            {bar.day}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Tooltip on hover */}
                  {hoveredBar && (
                    <div
                      className="absolute bg-gray-900 text-white text-[11px] font-bold py-1 px-2.5 rounded shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full"
                      style={{
                        left: `${((70 + orderValueData.findIndex((b) => b.day === hoveredBar.day) * 62 + 9) / 520) * 100}%`,
                        top: `${((190 - (hoveredBar.value / 50000) * 160) / 240) * 100}%`,
                      }}
                    >
                      {hoveredBar.day}: ₹{hoveredBar.value.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Bottom Section: Search & Filter Bar + Orders Table */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-100 space-y-6 text-left">
              
              {/* Search Bar & Filter Controls Row */}
              <div className="space-y-4">
                {/* Search Input Bar (Pill shaped) */}
                <div className="relative max-w-sm w-full border border-gray-300 rounded-full flex items-center px-4 py-2 bg-white shadow-xs focus-within:border-gray-400">
                  <svg
                    className="w-4 h-4 text-gray-500 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-4.35-4.35M16.65 11a5.65 5.65 0 11-11.3 0 5.65 5.65 0 0111.3 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Orders...."
                    className="text-xs sm:text-sm text-gray-800 outline-none w-full ml-2.5 bg-transparent placeholder-gray-400 font-medium"
                  />
                </div>

                {/* Filter Dropdowns in a Row */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  {/* Status */}
                  <div className="relative">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-7 text-xs font-semibold text-gray-700 cursor-pointer shadow-xs focus:outline-none"
                    >
                      <option value="All">Status</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                    </select>
                    <img
                      src={dropdownIcon}
                      alt="arrow"
                      className="w-2.5 h-2.5 opacity-60 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
                    />
                  </div>

                  {/* Salesman */}
                  <div className="relative">
                    <select
                      value={salesmanFilter}
                      onChange={(e) => setSalesmanFilter(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-7 text-xs font-semibold text-gray-700 cursor-pointer shadow-xs focus:outline-none"
                    >
                      <option value="All">Salesman</option>
                      <option value="Rahul">Rahul</option>
                      <option value="Jay">Jay</option>
                    </select>
                    <img
                      src={dropdownIcon}
                      alt="arrow"
                      className="w-2.5 h-2.5 opacity-60 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
                    />
                  </div>

                  {/* Shopkeeper */}
                  <div className="relative">
                    <select
                      value={shopkeeperFilter}
                      onChange={(e) => setShopkeeperFilter(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-7 text-xs font-semibold text-gray-700 cursor-pointer shadow-xs focus:outline-none"
                    >
                      <option value="All">Shopkeeper</option>
                      <option value="Patel Mart">Patel Mart</option>
                    </select>
                    <img
                      src={dropdownIcon}
                      alt="arrow"
                      className="w-2.5 h-2.5 opacity-60 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
                    />
                  </div>

                  {/* Payment */}
                  <div className="relative">
                    <select
                      value={paymentFilter}
                      onChange={(e) => setPaymentFilter(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-7 text-xs font-semibold text-gray-700 cursor-pointer shadow-xs focus:outline-none"
                    >
                      <option value="All">Payment</option>
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="COD">COD</option>
                    </select>
                    <img
                      src={dropdownIcon}
                      alt="arrow"
                      className="w-2.5 h-2.5 opacity-60 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
                    />
                  </div>

                  {/* Date */}
                  <div className="relative">
                    <select
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-7 text-xs font-semibold text-gray-700 cursor-pointer shadow-xs focus:outline-none"
                    >
                      <option value="All">Date</option>
                      <option value="24 Aug">24 Aug</option>
                      <option value="This Week">This Week</option>
                      <option value="This Month">This Month</option>
                    </select>
                    <img
                      src={dropdownIcon}
                      alt="arrow"
                      className="w-2.5 h-2.5 opacity-60 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
                    />
                  </div>
                </div>
              </div>

              {/* Orders Table */}
              <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-left border-collapse min-w-[750px]">
                  <thead>
                    <tr className="bg-[#D9D9D9] text-gray-800 text-xs sm:text-sm font-bold">
                      <th className="py-3.5 px-4 sm:px-6">Order Id</th>
                      <th className="py-3.5 px-4 sm:px-6">Customer</th>
                      <th className="py-3.5 px-4 sm:px-6">Salesman</th>
                      <th className="py-3.5 px-4 sm:px-6">Products</th>
                      <th className="py-3.5 px-4 sm:px-6">Qty. / Size</th>
                      <th className="py-3.5 px-4 sm:px-6">Amount</th>
                      <th className="py-3.5 px-4 sm:px-6">Status</th>
                      <th className="py-3.5 px-4 sm:px-6">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-xs sm:text-sm font-medium text-gray-800 bg-white">
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/70 transition">
                          <td className="py-3.5 px-4 sm:px-6 font-semibold text-gray-900">{order.id}</td>
                          <td className="py-3.5 px-4 sm:px-6 font-medium text-gray-800">{order.customer}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-800 font-medium">{order.salesman}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-700">{order.products}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-700">{order.qty}</td>
                          <td className="py-3.5 px-4 sm:px-6 font-semibold text-gray-900">{order.amount}</td>
                          <td className={`py-3.5 px-4 sm:px-6 font-semibold ${order.statusColor}`}>
                            {order.status}
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-700 font-medium">{order.date}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-6 text-gray-500 font-medium">
                          No matching orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* View All Red Pill Button */}
              <div className="pt-2">
                <button
                  type="button"
                  className="bg-[#D71920] hover:bg-[#B9151B] text-white px-5 py-2.5 rounded-lg font-semibold text-xs sm:text-sm flex items-center space-x-2 shadow-xs hover:shadow transition cursor-pointer"
                >
                  <span>View All</span>
                  <img src={arrowRightWhiteIcon} alt="arrow right" className="w-4 h-4 object-contain" />
                </button>
              </div>

            </div>

          </div>
        </main>

      </div>

    </div>
  );
}
