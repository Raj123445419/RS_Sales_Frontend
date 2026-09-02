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
import salesmenIcon from '../assets/Salesman.svg';
import Shoopkeeper from '../assets/Shoopkeeper.svg';
import settingsIcon from '../assets/Settings.svg';
import logoutIcon from '../assets/Log out.svg';

// Overview Cards Assets
import boxOrdersIcon from '../assets/bx_box.svg';
import pendingClockIcon from '../assets/HistoryBlack.svg';
import cartOutlineIcon from '../assets/TruckLoadingBlack.svg';
import taskCompleteIcon from '../assets/carbon_task-complete.svg';
import sIcon from '../assets/sIcon.svg';
import Dropdown from '../assets/Dropdown.svg';
import arrowDropUpIcon from '../assets/arrow_drop_up.svg';
import editIcon from '../assets/EditGray.svg';
import plusIcon from '../assets/AddWhite.svg';

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
  const [showAll, setShowAll] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [hoveredBar, setHoveredBar] = useState(null);
  
  // New Order Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrderCustomer, setNewOrderCustomer] = useState('');
  const [newOrderSalesman, setNewOrderSalesman] = useState('');
  const [newOrderProduct, setNewOrderProduct] = useState('');
  const [newOrderQuantity, setNewOrderQuantity] = useState('');
  const [newOrderStatus, setNewOrderStatus] = useState('');
  const [newOrderDiscountVal, setNewOrderDiscountVal] = useState('');
  const [newOrderDiscountType, setNewOrderDiscountType] = useState('');
  const [newOrderTaxVal, setNewOrderTaxVal] = useState('');
  const [newOrderTaxType, setNewOrderTaxType] = useState('');

  // Edit Order Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editOrderId, setEditOrderId] = useState(null);
  const [editOrderCustomer, setEditOrderCustomer] = useState('');
  const [editOrderSalesman, setEditOrderSalesman] = useState('');
  const [editOrderProduct, setEditOrderProduct] = useState('');
  const [editOrderQuantity, setEditOrderQuantity] = useState('');
  const [editOrderStatus, setEditOrderStatus] = useState('');
  const [editOrderDiscountVal, setEditOrderDiscountVal] = useState('');
  const [editOrderDiscountType, setEditOrderDiscountType] = useState('');
  const [editOrderTaxVal, setEditOrderTaxVal] = useState('');

  const navigate = useNavigate();

  // Backend States
  const [metrics, setMetrics] = useState({ total: '0', pending: '0', processing: '0', delivered: '0' });
  const [ordersList, setOrdersList] = useState([]);
  const [salesmenOptions, setSalesmenOptions] = useState([]);
  const [shopkeeperOptions, setShopkeeperOptions] = useState([]);
  const [productsOptions, setProductsOptions] = useState([]); 
  const [orderValueData, setOrderValueData] = useState([]);

  // Fetch Orders & Chart Data from Backend API
  const fetchOrdersData = () => {
    fetch(`http://127.0.0.1:8000/api/v1/orders-page/?search=${encodeURIComponent(searchQuery)}&status=${encodeURIComponent(statusFilter)}&salesman=${encodeURIComponent(salesmanFilter)}&shopkeeper=${encodeURIComponent(shopkeeperFilter)}&payment=${encodeURIComponent(paymentFilter)}&date=${encodeURIComponent(dateFilter)}&timeFilter=${encodeURIComponent(timeFilter)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMetrics(data.metrics);
          setOrdersList(data.orders || []);
          setSalesmenOptions(data.dropdowns.salesmen || []);
          setShopkeeperOptions(data.dropdowns.shopkeepers || []);
          setProductsOptions(data.dropdowns.products || []); 
          setOrderValueData(data.orderValueChart || []);
        }
      })
      .catch((err) => console.error("Failed to fetch orders data:", err));
  };

  useEffect(() => {
    fetchOrdersData();
  }, [searchQuery, statusFilter, salesmanFilter, shopkeeperFilter, paymentFilter, dateFilter, timeFilter]);

  // Handle Create New Order Submit
  const handleCreateOrder = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/api/v1/orders/create/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        shopkeeper: newOrderCustomer || shopkeeperOptions[0],
        salesman: newOrderSalesman || salesmenOptions[0],
        product_id: newOrderProduct,
        quantity: newOrderQuantity ? parseInt(newOrderQuantity) : 1,
        status: newOrderStatus || 'placed',
        discount_value: newOrderDiscountVal ? parseFloat(newOrderDiscountVal) : 0,
        discount_type: newOrderDiscountType || 'rs',
        tax_value: newOrderTaxVal ? parseFloat(newOrderTaxVal) : 0,
        tax_type: newOrderTaxType || 'percent'
      })
    })
    .then(async res => {
      const textResponse = await res.text();
      try {
        const data = JSON.parse(textResponse);
        if (data.success) {
          setIsModalOpen(false);
          setNewOrderCustomer('');
          setNewOrderSalesman('');
          setNewOrderProduct('');
          setNewOrderQuantity('');
          setNewOrderStatus('');
          setNewOrderDiscountVal('');
          setNewOrderDiscountType('');
          setNewOrderTaxVal('');
          setNewOrderTaxType('');
          fetchOrdersData(); 
        } else {
          alert('Backend Error: ' + (data.error || textResponse));
        }
      } catch (parseErr) {
        alert('Server Error: Check Console');
      }
    })
    .catch(err => console.error(err));
  };

// Open Edit Modal and Set Existing Values
  const handleOpenEditModal = (order) => {
    const rawId = order.raw_id || order.id.replace('#', '');
    setEditOrderId(rawId);
    setEditOrderCustomer(order.customer || '');
    setEditOrderSalesman(order.salesman || '');
    setEditOrderStatus(order.status ? order.status.toLowerCase().replace(' ', '_') : 'placed');
    setEditOrderQuantity(order.quantity !== undefined ? order.quantity : 1);
    setEditOrderDiscountVal(order.discount_value !== undefined ? order.discount_value : '');
    setEditOrderDiscountType(order.discount_type || 'rs');
    setEditOrderTaxVal(order.tax_value !== undefined ? order.tax_value : '');
    
    setIsEditModalOpen(true);
  };

  // Handle Update Order Submit
  const handleUpdateOrder = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:8000/api/v1/orders/${editOrderId}/update/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        shopkeeper: editOrderCustomer,
        salesman: editOrderSalesman,
        product_id: editOrderProduct,
        quantity: editOrderQuantity ? parseInt(editOrderQuantity) : 1,
        status: editOrderStatus,
        discount_value: editOrderDiscountVal ? parseFloat(editOrderDiscountVal) : 0,
        discount_type: editOrderDiscountType,
        tax_value: editOrderTaxVal ? parseFloat(editOrderTaxVal) : 0,
        tax_type: 'percent'
      })
    })
    .then(async res => {
      const textResponse = await res.text();
      try {
        const data = JSON.parse(textResponse);
        if (data.success) {
          setIsEditModalOpen(false);
          fetchOrdersData();
        } else {
          alert('Update Error: ' + (data.error || textResponse));
        }
      } catch (e) {
        alert('Server Error during update');
      }
    })
    .catch(err => console.error(err));
  };

  const navItems = [
    { name: 'Dashboard', icon: dashboardIcon, path: '/AdminDashboard' },
    { name: 'Orders', icon: boxIcon, path: '/orders' },
    { name: 'Routes', icon: routesIcon, path: '/routes' },
    { name: 'Salesmen', icon: salesmenIcon, path: '/salesmen' },
    { name: 'Shopkeepers', icon: Shoopkeeper, path: '/shopkeepers' },
    { name: 'Notifications', icon: bellIcon, path: '/notifications' },
    { name: 'Settings', icon: settingsIcon, path: '/settings' },
  ];

  const overviewCards = [
    { id: 'total', title: 'Total Orders', value: metrics.total, icon: boxOrdersIcon, bg: 'bg-[#DCD6FB]', barColor: 'bg-[#9D8AF5]', bars: [40, 65, 85, 100] },
    { id: 'pending', title: 'Pending', value: metrics.pending, icon: pendingClockIcon, bg: 'bg-[#F8CECE]', barColor: 'bg-[#EF7C7C]', bars: [50, 75, 45, 100] },
    { id: 'processing', title: 'Processing', value: metrics.processing, icon: cartOutlineIcon, bg: 'bg-[#F8DCB4]', barColor: 'bg-[#E8AF67]', bars: [40, 65, 85, 100] },
    { id: 'delivered', title: 'Delivered', value: metrics.delivered, icon: taskCompleteIcon, bg: 'bg-[#CCE6D2]', barColor: 'bg-[#7BC28B]', bars: [40, 65, 85, 100] },
  ];

  const handleLogout = () => {
    localStorage.removeItem('shopzee_user');
    navigate('/login');
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setSalesmanFilter('All');
    setShopkeeperFilter('All');
    setPaymentFilter('All');
    setDateFilter('All');
    setShowAll(false);
  };

  const getStatusColor = (status) => {
    const s = String(status || '').toLowerCase();
    if (s === 'delivered' || s === 'completed') return 'text-[#2DA12F] font-semibold';
    if (s === 'processing' || s === 'scheduled') return 'text-[#EB9F30] font-semibold';
    if (s === 'pending') return 'text-[#D71920] font-semibold';
    if (s === 'placed') return 'text-[#5E35B1] font-semibold';
    if (s === 'confirmed') return 'text-[#00838F] font-semibold';
    if (s === 'ready for delivery') return 'text-[#C2185B] font-semibold';
    if (s === 'out for delivery') return 'text-[#FBC02D] font-semibold';
    if (s === 'cancelled') return 'text-[#D71920] font-semibold';
    if (s === 'returned') return 'text-[#616161] font-semibold';
    return 'text-gray-700 font-semibold';
  };

  const isFiltered = searchQuery !== '' || statusFilter !== 'All' || salesmanFilter !== 'All' || shopkeeperFilter !== 'All' || paymentFilter !== 'All' || dateFilter !== 'All';
  const displayOrders = (showAll || isFiltered) ? ordersList : ordersList.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#F5F6F8] flex flex-col font-sans">
      
      {/* HEADER */}
      <header className="w-full h-20 bg-[#181818] text-white px-4 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between shadow-md sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <button type="button" onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} className="md:hidden p-1.5 rounded-lg bg-white/10 text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <Link to="/AdminDashboard" className="flex items-center">
            <img src={logoImg} alt="RS Logo" className="h-12 sm:h-20 w-auto object-contain transition-transform hover:scale-105" />
          </Link>
        </div>

        <div className="flex items-center space-x-5 sm:space-x-7">
          <button type="button" className="p-1 hover:opacity-85 transition cursor-pointer"><img src={goldBellIcon} alt="Notifications" className="w-7 h-7 object-contain" /></button>
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

      {/* CONTAINER */}
      <div className="flex-1 flex w-full relative">

        {/* SIDEBAR */}
        <aside className={`fixed md:sticky top-[58px] md:top-[66px] left-0 z-40 h-[calc(100vh-58px)] md:h-[calc(100vh-66px)] w-64 bg-white border-r border-gray-200 flex flex-col justify-between p-5 transition-transform duration-300 ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <nav className="space-y-1.5 text-left">
            {navItems.map((item) => {
              const isActive = activeNav === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => { setActiveNav(item.name); setIsMobileNavOpen(false); if (item.path) navigate(item.path); }}
                  className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition cursor-pointer ${isActive ? 'text-[#000000] bg-[#76544359] font-bold' : 'text-[#201C18] hover:bg-gray-100/70 hover:text-black'}`}
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
              <div><h4 className="text-sm font-bold text-gray-900 leading-tight">Admin</h4><span className="text-xs text-gray-500 font-normal">Administrator</span></div>
            </div>
            <button type="button" onClick={handleLogout} className="w-full bg-[#D71920] hover:bg-[#B9151B] text-white text-xs sm:text-sm font-semibold py-2.5 px-5 rounded-full flex items-center justify-center space-x-2.5 shadow-sm hover:shadow transition cursor-pointer">
              <img src={logoutIcon} alt="logout" className="w-4 h-4 object-contain" />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {isMobileNavOpen && <div onClick={() => setIsMobileNavOpen(false)} className="fixed inset-0 bg-black/40 z-30 md:hidden" />}

        {/* MAIN CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">

            <div className="text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Orders</h1>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">Manage and track all orders</p>
            </div>

            {/* OVERVIEW CARDS & CHART */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

              <div className="lg:col-span-5 flex flex-col justify-between text-left">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                  {overviewCards.map((card) => (
                    <div key={card.id} onClick={() => setSelectedCard(card.title)} className={`rounded-2xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden cursor-pointer transition-all duration-200 ${card.bg} border border-transparent hover:shadow-md`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs font-semibold text-gray-700">{card.title}</p>
                          <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">{card.value}</h3>
                        </div>
                        <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0">
                          <img src={card.icon} alt={card.title} className="w-full h-full object-contain" />
                        </div>
                      </div>
                      <div className="flex items-end justify-end space-x-1.5 h-10 mt-4 self-end">
                        {card.bars.map((h, i) => (
                          <div key={i} className={`w-1.5 sm:w-2 rounded-t-sm ${card.barColor}`} style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Value Chart */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-7 shadow-sm border border-gray-100 flex flex-col justify-between text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Order Value</h3>
                    <p className="text-xs text-gray-500 font-medium">Track order revenue over time</p>
                  </div>
                  <div className="relative inline-block">
                    <select
                      value={timeFilter}
                      onChange={(e) => setTimeFilter(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-lg px-3.5 py-1.5 pr-8 text-xs font-semibold text-gray-700 cursor-pointer focus:outline-none shadow-sm"
                    >
                      <option value="This Week">This Week</option>
                      <option value="This Month">This Month</option>
                      <option value="This Year">This Year</option>
                    </select>
                    <img src={Dropdown} alt="arrow" className="w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none object-contain" />
                  </div>
                </div>

                <div className="w-full relative mt-2">
                  <svg viewBox="0 0 520 240" className="w-full h-auto overflow-visible select-none">
                    {[{ label: '50k', y: 30 }, { label: '40k', y: 70 }, { label: '30k', y: 110 }, { label: '20k', y: 150 }, { label: '10k', y: 190 }].map((grid) => (
                      <g key={grid.label}>
                        <text x="35" y={grid.y + 4} textAnchor="end" className="text-[11px] fill-gray-600 font-medium">{grid.label}</text>
                        <line x1="50" y1={grid.y} x2="495" y2={grid.y} stroke="#E5E7EB" strokeWidth="1" />
                      </g>
                    ))}

                    {orderValueData.map((bar, idx) => {
                      const barWidth = 18;
                      const x = 70 + idx * (420 / Math.max(orderValueData.length, 1));
                      const maxVal = 50000;
                      const clampedVal = Math.min(Math.max(bar.value, 0), maxVal);
                      const barHeight = (clampedVal / maxVal) * 160;
                      const y = 190 - barHeight;

                      return (
                        <g key={idx} className="cursor-pointer group" onMouseEnter={() => setHoveredBar(bar)} onMouseLeave={() => setHoveredBar(null)}>
                          <rect x={x} y={y} width={barWidth} height={barHeight} rx="9" ry="9" fill="#BFA997" className="transition-all duration-200 group-hover:fill-[#A8917F]" />
                          <text x={x + barWidth / 2} y="225" textAnchor="middle" className="text-xs fill-gray-800 font-semibold">{bar.day}</text>
                        </g>
                      );
                    })}
                  </svg>

                  {hoveredBar && (
                    <div className="absolute bg-gray-900 text-white text-[11px] font-bold py-1 px-2.5 rounded shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full">
                      {hoveredBar.day}: ₹{hoveredBar.value.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* SEARCH & FILTERS + TABLE */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-100 space-y-6 text-left">

              <div className="space-y-4">
                <div className="relative w-full sm:max-w-xs md:max-w-sm border border-gray-300 rounded-full flex items-center px-4 py-2 bg-white shadow-2xs focus-within:border-gray-400 transition-colors">
                  <img src={sIcon} alt="search" className="w-4 h-4 object-contain shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Orders...."
                    className="text-xs sm:text-sm text-gray-800 outline-none w-full ml-2.5 bg-transparent placeholder-gray-400 font-normal"
                  />
                  {searchQuery && (
                    <button type="button" onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600 text-xs font-bold px-1 cursor-pointer">×</button>
                  )}
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                    
                    {/* Status Dropdown */}
                    <div className="relative inline-block">
                      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-md px-3.5 py-1.5 pr-8 text-xs font-medium text-gray-700 cursor-pointer shadow-2xs focus:outline-none">
                        <option value="All">Status</option>
                        <option value="Placed">Placed</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Ready for Delivery">Ready for Delivery</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Pending">Pending</option>
                        <option value="Returned">Returned</option>
                      </select>
                      <img src={arrowDropUpIcon} alt="arrow" className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none object-contain" />
                    </div>

                    {/* Salesman Dropdown */}
                    <div className="relative inline-block">
                      <select value={salesmanFilter} onChange={(e) => setSalesmanFilter(e.target.value)} className="appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-md px-3.5 py-1.5 pr-8 text-xs font-medium text-gray-700 cursor-pointer shadow-2xs focus:outline-none">
                        <option value="All">Salesman</option>
                        {salesmenOptions.map((sm, i) => <option key={i} value={sm}>{sm}</option>)}
                      </select>
                      <img src={arrowDropUpIcon} alt="arrow" className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none object-contain" />
                    </div>

                    {/* Shopkeeper Dropdown */}
                    <div className="relative inline-block">
                      <select value={shopkeeperFilter} onChange={(e) => setShopkeeperFilter(e.target.value)} className="appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-md px-3.5 py-1.5 pr-8 text-xs font-medium text-gray-700 cursor-pointer shadow-2xs focus:outline-none">
                        <option value="All">Shopkeeper</option>
                        {shopkeeperOptions.map((shop, i) => <option key={i} value={shop}>{shop}</option>)}
                      </select>
                      <img src={arrowDropUpIcon} alt="arrow" className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none object-contain" />
                    </div>

                    {/* Payment Dropdown */}
                    <div className="relative inline-block">
                      <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)} className="appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-md px-3.5 py-1.5 pr-8 text-xs font-medium text-gray-700 cursor-pointer shadow-2xs focus:outline-none">
                        <option value="All">Payment</option>
                        <option value="Pending">Pending</option>
                        <option value="Partial">Partial</option>
                        <option value="Paid">Paid</option>
                        <option value="Failed">Failed</option>
                        <option value="Refunded">Refunded</option>
                      </select>
                      <img src={arrowDropUpIcon} alt="arrow" className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none object-contain" />
                    </div>

                    {/* Date Dropdown */}
                    <div className="relative inline-block">
                      <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-md px-3.5 py-1.5 pr-8 text-xs font-medium text-gray-700 cursor-pointer shadow-2xs focus:outline-none">
                        <option value="All">Date</option>
                        <option value="Today">Today</option>
                        <option value="This Week">This Week</option>
                        <option value="This Month">This Month</option>
                        <option value="This Year">This Year</option>
                      </select>
                      <img src={arrowDropUpIcon} alt="arrow" className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none object-contain" />
                    </div>

                    <button type="button" onClick={handleClearFilters} className="bg-[#D9D9D9] hover:bg-gray-300 text-gray-800 text-xs font-medium px-3.5 py-1.5 rounded-md shadow-2xs transition-colors cursor-pointer">
                      Clear
                    </button>
                  </div>

                  {/* + New Order Button */}
                  <button type="button" onClick={() => setIsModalOpen(true)} className="bg-[#D71920] hover:bg-[#B9151B] text-white text-xs sm:text-sm font-semibold py-1.5 px-4 rounded-lg flex items-center justify-center space-x-2 shadow-sm transition cursor-pointer self-start lg:self-auto shrink-0">
                    <img src={plusIcon} alt="add" className="w-5 h-5 object-contain" />
                    <span>New Order</span>
                  </button>
                </div>
              </div>

              {/* Orders Table */}
              <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-center border-collapse min-w-[750px]">
                  <thead>
                    <tr className="bg-[#D9D9D9] text-gray-900 text-xs sm:text-sm font-bold">
                      <th className="py-3.5 px-4 sm:px-6">Order Id</th>
                      <th className="py-3.5 px-4 sm:px-6">Date</th>
                      <th className="py-3.5 px-4 sm:px-6">Customer</th>
                      <th className="py-3.5 px-4 sm:px-6">Salesman</th>
                      <th className="py-3.5 px-4 sm:px-6">Amount</th>
                      <th className="py-3.5 px-4 sm:px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-xs sm:text-sm font-medium text-gray-800 bg-white">
                    {displayOrders.length > 0 ? (
                      displayOrders.map((order, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 font-bold text-gray-900">{order.id}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{order.date}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{order.customer}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{order.salesman}</td>
                          <td className="py-3.5 px-4 sm:px-6 font-bold text-gray-900">{order.amount}</td>
                          <td className="py-3.5 px-4 sm:px-6 relative text-center">
                            <span className={getStatusColor(order.status)}>{order.status}</span>
                            {/* Edit Button linked with handleOpenEditModal */}
                            <button 
                              type="button" 
                              onClick={() => handleOpenEditModal(order)}
                              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 hover:opacity-75 transition cursor-pointer p-0.5" 
                              aria-label="Edit order"
                            >
                              <img src={editIcon} alt="edit" className="w-5 h-5 object-contain" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="6" className="text-center py-6 text-gray-500 font-medium">No orders found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="pt-1">
                <button type="button" onClick={() => setShowAll(!showAll)} className="bg-[#D71920] hover:bg-[#B9151B] text-white text-xs sm:text-sm font-semibold py-2 px-4 rounded-md inline-flex items-center space-x-2 shadow-sm transition-all duration-200 cursor-pointer">
                  <span>{showAll ? 'Show Less' : 'View All'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              </div>

            </div>

          </div>
        </main>

      </div>

      {/* NEW ORDER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 transition-all duration-300">
          <div className="bg-white rounded-3xl p-7 sm:p-9 max-w-xl w-full space-y-6 text-left shadow-2xl border border-gray-100 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">Create New Order</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 hover:text-[#D71920] text-gray-500 flex items-center justify-center font-bold text-lg transition cursor-pointer">×</button>
            </div>
            
            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Customer / Shopkeeper</label>
                <select value={newOrderCustomer} onChange={(e) => setNewOrderCustomer(e.target.value)} className="w-full border-2 border-gray-200 hover:border-gray-300 focus:border-[#D71920] rounded-xl p-3 text-sm bg-gray-50/50 outline-none transition cursor-pointer">
                  <option value="" disabled selected>Select Customer / Shopkeeper</option>
                  {shopkeeperOptions.map((shop, i) => <option key={i} value={shop}>{shop}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Salesman</label>
                <select value={newOrderSalesman} onChange={(e) => setNewOrderSalesman(e.target.value)} className="w-full border-2 border-gray-200 hover:border-gray-300 focus:border-[#D71920] rounded-xl p-3 text-sm bg-gray-50/50 outline-none transition cursor-pointer">
                  <option value="" disabled selected>Select Salesman</option>
                  {salesmenOptions.map((sm, i) => <option key={i} value={sm}>{sm}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Product</label>
                  <select value={newOrderProduct} onChange={(e) => setNewOrderProduct(e.target.value)} className="w-full border-2 border-gray-200 hover:border-gray-300 focus:border-[#D71920] rounded-xl p-3 text-sm bg-gray-50/50 outline-none transition cursor-pointer">
                    <option value="" disabled selected>Select Product</option>
                    {productsOptions.map((prod) => (
                      <option key={prod.id} value={prod.id}>{prod.name} (₹{prod.selling_price})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Quantity</label>
                  <input type="number" min="1" value={newOrderQuantity} onChange={(e) => setNewOrderQuantity(e.target.value)} placeholder="Enter quantity" className="w-full border-2 border-gray-200 hover:border-gray-300 focus:border-[#D71920] rounded-xl p-3 text-sm bg-gray-50/50 outline-none transition" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Order Status</label>
                  <select value={newOrderStatus} onChange={(e) => setNewOrderStatus(e.target.value)} className="w-full border-2 border-gray-200 hover:border-gray-300 focus:border-[#D71920] rounded-xl p-3 text-sm bg-gray-50/50 outline-none transition cursor-pointer">
                    <option value="" disabled selected>Select Status</option>
                    <option value="placed">Placed</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="ready_for_delivery">Ready for Delivery</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Discount Type</label>
                  <select value={newOrderDiscountType} onChange={(e) => setNewOrderDiscountType(e.target.value)} className="w-full border-2 border-gray-200 hover:border-gray-300 focus:border-[#D71920] rounded-xl p-3 text-sm bg-gray-50/50 outline-none transition cursor-pointer">
                    <option value="" disabled selected>Select Discount Type</option>
                    <option value="rs">₹ (Rupees)</option>
                    <option value="percent">% (Percentage)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Discount Value</label>
                  <input type="number" step="0.01" value={newOrderDiscountVal} onChange={(e) => setNewOrderDiscountVal(e.target.value)} placeholder="Enter discount value" className="w-full border-2 border-gray-200 hover:border-gray-300 focus:border-[#D71920] rounded-xl p-3 text-sm bg-gray-50/50 outline-none transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Tax Value (%)</label>
                  <input type="number" step="0.01" value={newOrderTaxVal} onChange={(e) => setNewOrderTaxVal(e.target.value)} placeholder="Enter tax percentage" className="w-full border-2 border-gray-200 hover:border-gray-300 focus:border-[#D71920] rounded-xl p-3 text-sm bg-gray-50/50 outline-none transition" />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-5 border-t border-gray-100 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl border-2 border-gray-200 hover:bg-gray-100 text-xs font-bold text-gray-700 cursor-pointer">Cancel</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#D71920] hover:bg-[#B9151B] text-white text-xs font-bold shadow-lg cursor-pointer">Save Order</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT ORDER MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 transition-all duration-300">
          <div className="bg-white rounded-3xl p-7 sm:p-9 max-w-xl w-full space-y-6 text-left shadow-2xl border border-gray-100 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">Edit Order #{editOrderId}</h3>
              <button type="button" onClick={() => setIsEditModalOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 hover:text-[#D71920] text-gray-500 flex items-center justify-center font-bold text-lg transition cursor-pointer">×</button>
            </div>
            
            <form onSubmit={handleUpdateOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Customer / Shopkeeper</label>
                <select value={editOrderCustomer} onChange={(e) => setEditOrderCustomer(e.target.value)} className="w-full border-2 border-gray-200 hover:border-gray-300 focus:border-[#D71920] rounded-xl p-3 text-sm bg-gray-50/50 outline-none transition cursor-pointer">
                  {shopkeeperOptions.map((shop, i) => <option key={i} value={shop}>{shop}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Salesman</label>
                <select value={editOrderSalesman} onChange={(e) => setEditOrderSalesman(e.target.value)} className="w-full border-2 border-gray-200 hover:border-gray-300 focus:border-[#D71920] rounded-xl p-3 text-sm bg-gray-50/50 outline-none transition cursor-pointer">
                  {salesmenOptions.map((sm, i) => <option key={i} value={sm}>{sm}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Product</label>
                  <select value={editOrderProduct} onChange={(e) => setEditOrderProduct(e.target.value)} className="w-full border-2 border-gray-200 hover:border-gray-300 focus:border-[#D71920] rounded-xl p-3 text-sm bg-gray-50/50 outline-none transition cursor-pointer">
                    <option value="">Keep Existing Product</option>
                    {productsOptions.map((prod) => (
                      <option key={prod.id} value={prod.id}>{prod.name} (₹{prod.selling_price})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Quantity</label>
                  <input type="number" min="1" value={editOrderQuantity} onChange={(e) => setEditOrderQuantity(e.target.value)} className="w-full border-2 border-gray-200 hover:border-gray-300 focus:border-[#D71920] rounded-xl p-3 text-sm bg-gray-50/50 outline-none transition" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Order Status</label>
                  <select value={editOrderStatus} onChange={(e) => setEditOrderStatus(e.target.value)} className="w-full border-2 border-gray-200 hover:border-gray-300 focus:border-[#D71920] rounded-xl p-3 text-sm bg-gray-50/50 outline-none transition cursor-pointer">
                    <option value="placed">Placed</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="ready_for_delivery">Ready for Delivery</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Discount Type</label>
                  <select value={editOrderDiscountType} onChange={(e) => setEditOrderDiscountType(e.target.value)} className="w-full border-2 border-gray-200 hover:border-gray-300 focus:border-[#D71920] rounded-xl p-3 text-sm bg-gray-50/50 outline-none transition cursor-pointer">
                    <option value="rs">₹ (Rupees)</option>
                    <option value="percent">% (Percentage)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Discount Value</label>
                  <input type="number" step="0.01" value={editOrderDiscountVal} onChange={(e) => setEditOrderDiscountVal(e.target.value)} className="w-full border-2 border-gray-200 hover:border-gray-300 focus:border-[#D71920] rounded-xl p-3 text-sm bg-gray-50/50 outline-none transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Tax Value (%)</label>
                  <input type="number" step="0.01" value={editOrderTaxVal} onChange={(e) => setEditOrderTaxVal(e.target.value)} className="w-full border-2 border-gray-200 hover:border-gray-300 focus:border-[#D71920] rounded-xl p-3 text-sm bg-gray-50/50 outline-none transition" />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-5 border-t border-gray-100 mt-6">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-5 py-2.5 rounded-xl border-2 border-gray-200 hover:bg-gray-100 text-xs font-bold text-gray-700 cursor-pointer">Cancel</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#D71920] hover:bg-[#B9151B] text-white text-xs font-bold shadow-lg cursor-pointer">Update Order</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}