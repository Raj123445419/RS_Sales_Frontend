import React, { useState, useRef, useEffect } from 'react';
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
import salesmanAvatar from '../assets/Frame Frist.svg';
import salesmanCircle from '../assets/Ellipse 6 (2).svg';
import shopkeepersIcon from '../assets/carbon_customer.svg';
import settingsIcon from '../assets/Settings.svg';
import logoutIcon from '../assets/Log out.svg';
import calendarIcon from '../assets/material-symbols-light_event-note-outline.svg';

// Stat Cards Assets
import rupeeIcon from '../assets/mdi_rupee.svg';
import ordersBagIcon from '../assets/Icon (1).svg';
import customersGreenIcon from '../assets/icon (5).svg';
import walletIcon from '../assets/solar_wallet-outline.svg';

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [timeFilter, setTimeFilter] = useState('This Week');
  const dateInputRef = useRef(null);

  const [metrics, setMetrics] = useState({
    total_sales: '₹0',
    total_orders: '0',
    customers: '0',
    pending_payment: '₹0'
  });
  const [salesOverview, setSalesOverview] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [salesmenPerformance, setSalesmenPerformance] = useState([]);

  const getISODate = (d = new Date()) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDate = (dateStringOrObj) => {
    if (!dateStringOrObj) return '';
    const parts = String(dateStringOrObj).split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const monthIndex = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${day} ${monthNames[monthIndex] || ''} ${year}`;
    }
    const d = new Date(dateStringOrObj);
    const day = d.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${day} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
  };

  const [rawDate, setRawDate] = useState(getISODate());
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setRawDate(getISODate());

    fetch(`http://127.0.0.1:8000/api/v1/dashboard-stats/?filter=${encodeURIComponent(timeFilter)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMetrics(data.metrics);
          setSalesOverview(data.salesOverview || []);
          setRecentOrders(data.recentOrders);
          setTopProducts(data.topProducts);
          setSalesmenPerformance(data.salesmenPerformance);
        }
      })
      .catch((err) => console.error("Failed to fetch dashboard stats:", err));
  }, [timeFilter]);

  // Frontend helper to colorize order statuses properly
  const getStatusColor = (statusText) => {
    const s = String(statusText).toLowerCase();
    if (s.includes('placed')) return 'text-blue-600 font-bold';
    if (s.includes('confirmed')) return 'text-indigo-600 font-bold';
    if (s.includes('processing')) return 'text-amber-600 font-bold';
    if (s.includes('ready')) return 'text-purple-600 font-bold';
    if (s.includes('out')) return 'text-cyan-600 font-bold';
    if (s.includes('delivered')) return 'text-emerald-600 font-bold';
    if (s.includes('completed')) return 'text-green-600 font-bold';
    if (s.includes('cancelled')) return 'text-rose-600 font-bold';
    if (s.includes('returned')) return 'text-red-600 font-bold';
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

  const statCards = [
    { id: 1, title: 'Total Sales', value: metrics.total_sales, change: '3.4%', isPositive: true, icon: rupeeIcon, iconBg: 'bg-[#FCE8EA]', sparklineColor: '#EF4444', sparklinePoints: 'M 0 20 L 15 15 L 30 18 L 45 6 L 60 2' },
    { id: 2, title: 'Total Orders', value: metrics.total_orders, change: '3.4%', isPositive: true, icon: ordersBagIcon, iconBg: 'bg-[#FFF4E5]', sparklineColor: '#F59E0B', sparklinePoints: 'M 0 22 L 15 17 L 30 20 L 45 8 L 60 3' },
    { id: 3, title: 'Customers', value: metrics.customers, change: '3.4%', isPositive: true, icon: customersGreenIcon, iconBg: 'bg-[#E6F8E9]', sparklineColor: '#22C55E', sparklinePoints: 'M 0 20 L 15 18 L 30 14 L 45 15 L 60 4' },
    { id: 4, title: 'Pending Payment', value: metrics.pending_payment, change: '3.4%', isPositive: false, icon: walletIcon, iconBg: 'bg-[#ECE6FF]', sparklineColor: '#8B5CF6', sparklinePoints: 'M 0 22 L 15 16 L 30 21 L 45 10 L 60 4' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('shopzee_user');
    navigate('/login');
  };

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
        <aside className={`fixed md:sticky top-[58px] md:top-[66px] left-0 z-40 h-[calc(100vh-58px)] md:h-[calc(100vh-66px)] w-64 bg-white border-r border-gray-200 flex flex-col justify-between p-5 transition-transform duration-300 ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <nav className="space-y-1.5 text-left">
            {navItems.map((item) => {
              const isActive = activeNav === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => { setActiveNav(item.name); setIsMobileNavOpen(false); if (item.path !== '/AdminDashboard') navigate(item.path); }}
                  className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition cursor-pointer ${isActive ? 'text-[#D71920] bg-red-50/60 font-bold' : 'text-[#201C18] hover:bg-gray-100/70 hover:text-black'}`}
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

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-left tracking-tight">Dashboard</h1>
              <div onClick={() => dateInputRef.current?.showPicker?.() || dateInputRef.current?.click()} className="relative inline-flex items-center space-x-2.5 bg-white border border-gray-300 rounded-xl px-4 py-2.5 shadow-sm text-xs sm:text-sm font-medium text-gray-700 cursor-pointer self-start sm:self-auto hover:border-gray-400 transition group select-none">
                <img src={calendarIcon} alt="calendar" className="w-5 h-5 object-contain pointer-events-none" />
                <span className="font-semibold text-gray-900 pointer-events-none">{formatDate(rawDate)}</span>
                <svg className="w-4 h-4 text-gray-500 ml-1 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                <input ref={dateInputRef} type="date" value={rawDate} onChange={(e) => { if (e.target.value) setRawDate(e.target.value); }} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
              </div>
            </div>

            {/* Metric Summary Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {statCards.map((card) => (
                <div key={card.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition duration-200">
                  <div className="flex items-start space-x-3.5 mb-3 text-left">
                    <div className={`w-11 h-11 rounded-full ${card.iconBg} flex items-center justify-center shrink-0`}>
                      <img src={card.icon} alt={card.title} className="w-5 h-5 object-contain" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">{card.title}</p>
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 leading-tight mt-0.5">{card.value}</h3>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className={`text-xs font-bold flex items-center space-x-1 ${card.isPositive ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                      <span>{card.isPositive ? '▲' : '▼'}</span>
                      <span>{card.change}</span>
                      <span className="text-[11px] text-gray-500 font-normal ml-1">vs last month</span>
                    </span>
                    <svg viewBox="0 0 60 25" className="w-14 h-6 overflow-visible">
                      <path d={card.sparklinePoints} fill="none" stroke={card.sparklineColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* CHARTS ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

              {/* Sales Overview Line Chart */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-100 flex flex-col justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 text-left">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Sales Overview</h3>
                    <p className="text-xs text-gray-500 font-medium">Track your sales performance overtime</p>
                  </div>
                  <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)} className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-700 cursor-pointer focus:outline-none">
                    <option value="This Week">This Week</option>
                    <option value="This Month">This Month</option>
                    <option value="This Year">This Year</option>
                  </select>
                </div>

                <div className="w-full relative mt-2">
                  <svg viewBox="0 0 520 240" className="w-full h-auto overflow-visible select-none">
                    {[{ label: '50k', y: 30 }, { label: '40k', y: 70 }, { label: '30k', y: 110 }, { label: '20k', y: 150 }, { label: '10k', y: 190 }].map((grid) => (
                      <g key={grid.label}>
                        <text x="35" y={grid.y + 4} textAnchor="end" className="text-[11px] fill-gray-600 font-medium">{grid.label}</text>
                        <line x1="50" y1={grid.y} x2="495" y2={grid.y} stroke="#E5E7EB" strokeWidth="1" />
                      </g>
                    ))}

                    {salesOverview.length > 0 && (() => {
                      const maxVal = 50000;
                      const pts = salesOverview.map((item, idx) => {
                        const x = 75 + idx * (420 / Math.max(salesOverview.length - 1, 1));
                        const clampedVal = Math.min(Math.max(item.value, 0), maxVal);
                        const y = 190 - (clampedVal / maxVal) * 160;
                        return { x, y, label: item.label, value: item.value };
                      });
                      const pathStr = pts.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');

                      return (
                        <g>
                          <path d={pathStr} fill="none" stroke="#D71920" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0px 4px 6px rgba(215, 25, 32, 0.25))' }} />
                          {pts.map((pt, i) => (
                            <g key={i}>
                              <circle cx={pt.x} cy={pt.y} r="4.5" fill="#D71920" stroke="#FFFFFF" strokeWidth="2" className="cursor-pointer transition-transform hover:scale-125" onMouseEnter={() => setHoveredPoint({ day: pt.label, value: `₹${pt.value.toLocaleString()}`, x: pt.x, y: pt.y })} onMouseLeave={() => setHoveredPoint(null)} />
                              <text x={pt.x} y="225" textAnchor="middle" className="text-xs fill-gray-800 font-semibold">{pt.label}</text>
                            </g>
                          ))}
                        </g>
                      );
                    })()}
                  </svg>

                  {hoveredPoint && (
                    <div className="absolute bg-gray-900 text-white text-[11px] font-bold py-1 px-2 rounded shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full" style={{ left: `${(hoveredPoint.x / 520) * 100}%`, top: `${(hoveredPoint.y / 240) * 100}%` }}>
                      {hoveredPoint.day}: {hoveredPoint.value}
                    </div>
                  )}
                </div>
              </div>

{/* Top Selling Products */}
              <div className="lg:col-span-5 flex flex-col justify-start text-left pt-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Top Selling Products</h3>
                <div className="flex flex-col sm:flex-row items-center justify-start gap-8 sm:gap-10">
                  
                  {/* CSS Conic Gradient Donut Chart (બિના કિસી વ્હાઈટ ગેપ કે) */}
                  <div className="relative w-52 h-52 sm:w-64 sm:h-64 shrink-0 flex items-center justify-center">
                    <div 
                      className="w-44 h-44 sm:w-56 sm:h-56 rounded-full flex items-center justify-center relative shadow-inner"
                      style={{
                        background: topProducts.length === 0 
                          ? '#E5E7EB' 
                          : (() => {
                              let accumulatedPercent = 0;
                              const gradientStops = topProducts.map((prod) => {
                                const start = accumulatedPercent;
                                accumulatedPercent += prod.pct;
                                const end = accumulatedPercent;
                                return `${prod.color} ${start}% ${end}%`;
                              });
                              return `conic-gradient(${gradientStops.join(', ')})`;
                            })()
                      }}
                    >
                      {/* વચ્ચેનો સફેદ ભાગ જેથી ડૉનટ (Donut) શેપ બની રહે */}
                      <div className="w-28 h-28 sm:w-36 sm:h-36 bg-white rounded-full shadow-sm flex items-center justify-center"></div>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-5 text-left">
                    {topProducts.length > 0 ? topProducts.map((prod) => (
                      <div key={prod.name} className="flex items-center space-x-4 text-sm sm:text-base font-semibold text-gray-900">
                        <span className="w-4 h-4 rounded-[3px] shrink-0" style={{ backgroundColor: prod.color }} />
                        <span className="min-w-[90px] text-gray-900 font-medium">{prod.name}</span>
                        <span className="font-semibold text-gray-900 ml-4 text-right">{prod.count}</span>
                      </div>
                    )) : (
                      <p className="text-sm text-gray-500">No sales recorded yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* RECENT ORDERS SECTION */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-100 text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-5 tracking-tight">Recent Orders</h3>
              <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-left border-collapse min-w-[650px]">
                  <thead>
                    <tr className="bg-[#D9D9D9] text-gray-800 text-xs sm:text-sm font-bold">
                      <th className="py-3.5 px-4 sm:px-6">Order Id</th>
                      <th className="py-3.5 px-4 sm:px-6">Customer</th>
                      <th className="py-3.5 px-4 sm:px-6">Product</th>
                      <th className="py-3.5 px-4 sm:px-6">Qty./Size</th>
                      <th className="py-3.5 px-4 sm:px-6">Amount</th>
                      <th className="py-3.5 px-4 sm:px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-xs sm:text-sm font-medium text-gray-800 bg-white">
                    {recentOrders.length > 0 ? recentOrders.map((order, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/70 transition">
                        <td className="py-3.5 px-4 sm:px-6 font-semibold text-gray-900">{order.id}</td>
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-gray-800">{order.customer}</td>
                        <td className="py-3.5 px-4 sm:px-6 text-gray-700">{order.product}</td>
                        <td className="py-3.5 px-4 sm:px-6 text-gray-700">{order.qty}</td>
                        <td className="py-3.5 px-4 sm:px-6 font-semibold text-gray-900">{order.amount}</td>
                        <td className={`py-3.5 px-4 sm:px-6 ${getStatusColor(order.status)}`}>{order.status}</td>
                      </tr>
                    )) : (
                      <tr><td colSpan="6" className="text-center py-4 text-gray-500">No recent orders found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SALESMEN PERFORMANCE SECTION */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-100 text-left max-w-3xl">
              <h3 className="text-xl font-bold text-gray-900 mb-5 tracking-tight">Salesmen Performance</h3>
              <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="bg-[#E8E1DE78] border-b border-gray-200 text-xs sm:text-sm font-bold text-gray-800">
                      <th className="py-3.5 px-4 sm:px-6 border-r border-gray-200 w-44">Salesman</th>
                      <th className="py-3.5 px-4 sm:px-6 border-r bg-white border-gray-200">Sales</th>
                      <th className="py-3.5 px-4 sm:px-6 border-r border-gray-200">Target</th>
                      <th className="py-3.5 px-4 sm:px-6 bg-white">Achiev</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-xs sm:text-sm font-medium text-gray-800 bg-white">
                    {salesmenPerformance.length > 0 ? salesmenPerformance.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/70 transition">
                        <td className="py-3 px-4 sm:px-6 bg-[#E8E1DE78] border-r border-gray-200 font-semibold text-gray-900">
                          <div className="flex items-center space-x-3">
                            <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0">
                              <img src={salesmanCircle} alt="circle" className="absolute inset-0 w-full h-full object-contain" />
                              <img src={salesmanAvatar} alt={item.name} className="w-4 h-4 sm:w-4.5 sm:h-4.5 object-contain relative z-10" />
                            </div>
                            <span>{item.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 sm:px-6 border-r border-gray-200 font-medium text-gray-900">{item.sales}</td>
                        <td className="py-3 px-4 sm:px-6 border-r bg-[#E8E1DE78] border-gray-200 font-medium text-gray-900">{item.target}</td>
                        <td className="py-3 px-4 sm:px-6">
                          <div className="flex items-center space-x-3">
                            <span className="min-w-[36px] font-semibold text-gray-900">{item.achiev}</span>
                            <div className="w-24 sm:w-32 bg-gray-100 h-2 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${item.barColor}`} style={{ width: `${item.pct}%` }} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan="4" className="text-center py-4 text-gray-500">No salesmen performance data.</td></tr>
                    )}
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