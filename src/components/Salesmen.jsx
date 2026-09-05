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
import cartIcon from '../assets/CartIcon.svg';
import paymentIcon from '../assets/moneybag.svg';
import chartIcon from '../assets/Chart.svg';
import routesIcon from '../assets/RouteBlack.svg';
import salesmenIcon from '../assets/Salesman.svg';
import Shoopkeeper from '../assets/Shoopkeeper.svg';
import settingsIcon from '../assets/Settings.svg';
import logoutIcon from '../assets/Log out.svg';
import arrowDropUpIcon from '../assets/arrow_drop_up.svg';
import Dropdown from '../assets/Dropdown.svg';
import sIcon from '../assets/sIcon.svg';

// Stat Cards SVGs
import totalSalesmenIcon from '../assets/UsersBlack.svg';
import totalSalesTodayIcon from '../assets/BarChartBlack.svg';
import avgAchievementIcon from '../assets/TrendingUpBlack.svg';

export default function Salesmen() {
  const [activeNav, setActiveNav] = useState('Salesmen');
  const [timeFilter, setTimeFilter] = useState('This Week');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [showAllPerformance, setShowAllPerformance] = useState(false);
  const navigate = useNavigate();

  // Search & Filter States for Salesmen Table
  const [tableSearchQuery, setTableSearchQuery] = useState('');
  const [tableStatusFilter, setTableStatusFilter] = useState('All');
  const [tableSalesmanFilter, setTableSalesmanFilter] = useState('All');
  const [tableAreaFilter, setTableAreaFilter] = useState('All');
  const [showAllTable, setShowAllTable] = useState(false);

  // Backend States
  const [metrics, setMetrics] = useState({ totalSalesmen: 0, totalSalesToday: '₹0', avgAchievement: '0%' });
  const [performanceData, setPerformanceData] = useState([]);
  const [salesmenTableData, setSalesmenTableData] = useState([]);
  const [uniqueTableSalesmen, setUniqueTableSalesmen] = useState([]);
  const [uniqueTableAreas, setUniqueTableAreas] = useState([]);
  const [uniqueTableStatuses, setUniqueTableStatuses] = useState(['Active', 'On Route', 'Completed', 'Pending']);

  // Fetch Salesmen Data from Backend API
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/v1/salesmen-page/?timeFilter=${encodeURIComponent(timeFilter)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMetrics(data.metrics);
          setPerformanceData(data.salesPerformance || []);
          setSalesmenTableData(data.salesmenTable || []);
          setUniqueTableSalesmen(data.dropdowns.salesmen || []);
          setUniqueTableAreas(data.dropdowns.areas || []);
        }
      })
      .catch((err) => console.error("Failed to fetch salesmen data:", err));
  }, [timeFilter]);

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

  const displayPerformance = showAllPerformance ? performanceData : performanceData.slice(0, 3);

  // Working Search & Filter Logic for Salesmen Table
  const filteredSalesmenTable = salesmenTableData.filter((item) => {
    const query = tableSearchQuery.toLowerCase().trim();
    const matchesSearch = !query || (
      item.salesman.toLowerCase().includes(query) ||
      item.area.toLowerCase().includes(query) ||
      item.status.toLowerCase().includes(query) ||
      item.sales.toLowerCase().includes(query) ||
      item.target.toLowerCase().includes(query) ||
      item.achievement.toLowerCase().includes(query) ||
      String(item.shops).includes(query) ||
      String(item.orders).includes(query)
    );

    const matchesStatus = tableStatusFilter === 'All' || item.status.toLowerCase() === tableStatusFilter.toLowerCase();
    const matchesSalesman = tableSalesmanFilter === 'All' || item.salesman.toLowerCase() === tableSalesmanFilter.toLowerCase();
    const matchesArea = tableAreaFilter === 'All' || item.area.toLowerCase() === tableAreaFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesSalesman && matchesArea;
  });

  const isTableFiltered = tableSearchQuery !== '' || tableStatusFilter !== 'All' || tableSalesmanFilter !== 'All' || tableAreaFilter !== 'All';

  const displaySalesmenTable = (showAllTable || isTableFiltered)
    ? filteredSalesmenTable
    : filteredSalesmenTable.slice(0, 5);

  const handleClearTableFilters = () => {
    setTableSearchQuery('');
    setTableStatusFilter('All');
    setTableSalesmanFilter('All');
    setTableAreaFilter('All');
    setShowAllTable(false);
  };

  const getTableStatusColor = (status) => {
    const s = String(status).toLowerCase();
    if (s === 'active') return 'text-[#EB9F30] font-semibold';
    if (s === 'completed') return 'text-[#22A847] font-semibold';
    if (s === 'on route') return 'text-[#D71920] font-semibold';
    if (s === 'pending') return 'text-[#D7262D] font-semibold';
    return 'text-gray-700 font-semibold';
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
          <button type="button" onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} className="md:hidden p-1.5 rounded-lg bg-white/10 text-white focus:outline-none cursor-pointer" aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
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
        <aside className={`fixed md:sticky top-[58px] md:top-[66px] left-0 z-40 h-[calc(100vh-58px)] md:h-[calc(100vh-66px)] w-64 bg-white border-r border-gray-200 flex flex-col justify-between p-5 transition-transform duration-300 ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <nav className="space-y-1.5 text-left">
            {navItems.map((item) => {
              const isActive = activeNav === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => { setActiveNav(item.name); setIsMobileNavOpen(false); if (item.path && item.path !== '#' && item.path !== '/salesmen') navigate(item.path); }}
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

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6 text-left">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Salesmen</h1>
              <p className="text-xs sm:text-sm text-black font-normal mt-1">Manage your sales team and track their performance.</p>
            </div>

            {/* Grid Container: Left (3 Stat Cards) & Right (Sales Performance) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
              
              {/* LEFT: 3 Stat Summary Cards */}
              <div className="lg:col-span-5 space-y-4 sm:space-y-5">
                <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 flex items-start justify-between transition hover:shadow-md">
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-semibold text-black">Total Salesmen</p>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">{metrics.totalSalesmen}</h3>
                    <p className="text-[11px] sm:text-xs text-gray-400 font-normal pt-2">All registered salesmen</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#F8CECE] flex items-center justify-center shrink-0 p-2.5">
                    <img src={totalSalesmenIcon} alt="Total Salesmen" className="w-full h-full object-contain" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 flex items-start justify-between transition hover:shadow-md">
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-semibold text-black">Total Sales Today</p>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">{metrics.totalSalesToday}</h3>
                    <p className="text-[11px] sm:text-xs text-gray-400 font-normal pt-2">Sales generated by all salesmen today</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#CCE6D2] flex items-center justify-center shrink-0 p-2.5">
                    <img src={totalSalesTodayIcon} alt="Total Sales Today" className="w-full h-full object-contain" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 flex items-start justify-between transition hover:shadow-md">
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-semibold text-black">Average Achievement</p>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">{metrics.avgAchievement}</h3>
                    <p className="text-[11px] sm:text-xs text-gray-400 font-normal pt-2">Average target achievement</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#DCD6FB] flex items-center justify-center shrink-0 p-2.5">
                    <img src={avgAchievementIcon} alt="Average Achievement" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>

              {/* RIGHT: Sales Performance Section */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">Sales Performance</h3>
                  <div className="relative inline-flex items-center">
                    <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)} className="bg-white border border-gray-200 hover:border-gray-300 rounded-lg px-3.5 py-1.5 pr-8 text-xs sm:text-sm font-medium text-gray-700 cursor-pointer focus:outline-none shadow-2xs appearance-none">
                      <option value="This Week">This Week</option>
                      <option value="This Month">This Month</option>
                      <option value="Today">Today</option>
                      <option value="This Year">This Year</option>
                    </select>
                    <img src={Dropdown} alt="" className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none object-contain" />
                  </div>
                </div>

                <div className="space-y-4">
                  {displayPerformance.length > 0 ? (
                    displayPerformance.map((item, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-xl p-4 sm:p-5 bg-white space-y-2.5 transition hover:border-gray-300">
                        <div className="text-sm sm:text-base font-bold text-gray-900">{item.name}</div>
                        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-gray-800">
                          <span>{item.sales}</span>
                          <span>{item.target}</span>
                        </div>
                        <div className="flex items-center space-x-3.5 pt-1">
                          <div className="flex-1 h-3 sm:h-3.5 bg-[#BDBDBD] rounded-full overflow-hidden">
                            <div className="h-full bg-[#FEC26C99] rounded-full transition-all duration-500 ease-out" style={{ width: `${item.pct}%` }} />
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-gray-900 min-w-[32px] text-right">{item.pct}%</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-6 text-gray-500 text-sm">No performance records found.</p>
                  )}
                </div>

                {performanceData.length > 3 && (
                  <div className="pt-2 flex justify-center">
                    <button type="button" onClick={() => setShowAllPerformance(!showAllPerformance)} className="bg-[#D71920] hover:bg-[#B9151B] text-white text-xs sm:text-sm font-medium py-2.5 px-6 rounded-md inline-flex items-center space-x-2 shadow-sm transition-all duration-200 cursor-pointer">
                      <span>{showAllPerformance ? 'Show Less' : 'View All'}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* SALESMEN TABLE SECTION */}
            <div className="bg-white p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6 text-left">
              <div className="flex flex-col space-y-4">
                <div className="relative max-w-sm w-full border border-gray-300 rounded-full flex items-center px-4 py-2 bg-white shadow-2xs focus-within:border-gray-400 transition-colors">
                  <img src={sIcon} alt="search" className="w-4 h-4 shrink-0 object-contain" />
                  <input type="text" value={tableSearchQuery} onChange={(e) => setTableSearchQuery(e.target.value)} placeholder="Search Salesmen...." className="text-xs sm:text-sm text-gray-800 outline-none w-full ml-2.5 bg-transparent placeholder-gray-400 font-normal" />
                  {tableSearchQuery && <button type="button" onClick={() => setTableSearchQuery('')} className="text-gray-400 hover:text-gray-600 text-xs font-bold px-1 cursor-pointer">×</button>}
                </div>

                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <div className="relative inline-block">
                    <select value={tableStatusFilter} onChange={(e) => setTableStatusFilter(e.target.value)} className="appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-md px-3.5 py-1.5 pr-8 text-xs font-medium text-gray-700 cursor-pointer shadow-2xs focus:outline-none">
                      <option value="All">Status</option>
                      {uniqueTableStatuses.map((st, i) => <option key={i} value={st}>{st}</option>)}
                    </select>
                    <img src={arrowDropUpIcon} alt="dropdown arrow" className="w-5 h-5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none object-contain" />
                  </div>

                  <div className="relative inline-block">
                    <select value={tableSalesmanFilter} onChange={(e) => setTableSalesmanFilter(e.target.value)} className="appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-md px-3.5 py-1.5 pr-8 text-xs font-medium text-gray-700 cursor-pointer shadow-2xs focus:outline-none">
                      <option value="All">Salesman</option>
                      {uniqueTableSalesmen.map((sm, i) => <option key={i} value={sm}>{sm}</option>)}
                    </select>
                    <img src={arrowDropUpIcon} alt="dropdown arrow" className="w-5 h-5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none object-contain" />
                  </div>

                  <div className="relative inline-block">
                    <select value={tableAreaFilter} onChange={(e) => setTableAreaFilter(e.target.value)} className="appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-md px-3.5 py-1.5 pr-8 text-xs font-medium text-gray-700 cursor-pointer shadow-2xs focus:outline-none">
                      <option value="All">Area</option>
                      {uniqueTableAreas.map((ar, i) => <option key={i} value={ar}>{ar}</option>)}
                    </select>
                    <img src={arrowDropUpIcon} alt="dropdown arrow" className="w-5 h-5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none object-contain" />
                  </div>

                  <button type="button" onClick={handleClearTableFilters} className="bg-[#D9D9D9] hover:bg-gray-300 text-gray-800 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-md shadow-2xs transition-colors cursor-pointer">
                    Clear
                  </button>
                </div>
              </div>

              <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-center border-collapse min-w-[780px]">
                  <thead>
                    <tr className="bg-[#D9D9D9] text-gray-900 text-xs sm:text-sm font-bold">
                      <th className="py-3.5 px-4 sm:px-6">Salesman</th>
                      <th className="py-3.5 px-4 sm:px-6">Area</th>
                      <th className="py-3.5 px-4 sm:px-6">Shops</th>
                      <th className="py-3.5 px-4 sm:px-6">Orders</th>
                      <th className="py-3.5 px-4 sm:px-6">Sales</th>
                      <th className="py-3.5 px-4 sm:px-6">Target</th>
                      <th className="py-3.5 px-4 sm:px-6">Achievement</th>
                      <th className="py-3.5 px-4 sm:px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-xs sm:text-sm font-medium text-gray-800 bg-white">
                    {displaySalesmenTable.length > 0 ? (
                      displaySalesmenTable.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">
<Link 
  to={`/salesman/${item.id}`} 
  className=" font-bold transition-colors cursor-pointer"
>
  {item.salesman}
</Link>
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.area}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.shops}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.orders}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.sales}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.target}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.achievement}</td>
                          <td className="py-3.5 px-4 sm:px-6">
                            <span className={getTableStatusColor(item.status)}>{item.status}</span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="8" className="text-center py-8 text-gray-500 font-medium">No matching salesmen records found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="pt-1">
                <button type="button" onClick={() => setShowAllTable(!showAllTable)} className="bg-[#D71920] hover:bg-[#B9151B] text-white text-xs sm:text-sm font-medium py-2 px-4 rounded-md inline-flex items-center space-x-2 shadow-sm transition-all duration-200 cursor-pointer">
                  <span>{showAllTable ? 'Show Less' : 'View All'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}