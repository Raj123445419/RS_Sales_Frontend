import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// Page-specific Assets
import arrowDropUpIcon from '../../assets/arrow_drop_up.svg';
import Dropdown from '../../assets/Dropdown.svg';
import sIcon from '../../assets/sIcon.svg';

export default function RoutePage() {
  const [timeFilter, setTimeFilter] = useState('This Week');
  const [hoveredRoute, setHoveredRoute] = useState(null);
  const navigate = useNavigate();

  // Search & Filter States for Routes
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [salesmanFilter, setSalesmanFilter] = useState('All');
  const [areaFilter, setAreaFilter] = useState('All');
  const [routeFilter, setRouteFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  // Backend States
  const [routeStatusData, setRouteStatusData] = useState({ total: 0, categories: [] });
  const [routesList, setRoutesList] = useState([]);
  const [routesAndShopsList, setRoutesAndShopsList] = useState([]);
  const [routePerformanceData, setRoutePerformanceData] = useState([]);
  
  // Dynamic Dropdown Options from Backend
  const [uniqueSalesmen, setUniqueSalesmen] = useState([]);
  const [uniqueAreas, setUniqueAreas] = useState([]);
  const [uniqueRoutes, setUniqueRoutes] = useState([]);
  const [uniqueShops, setUniqueShops] = useState([]);

  // States for Routes & Shops Section
  const [shopFilter, setShopFilter] = useState('All');
  const [shopSalesmanFilter, setShopSalesmanFilter] = useState('All');
  const [shopAreaFilter, setShopAreaFilter] = useState('All');
  const [shopRouteFilter, setShopRouteFilter] = useState('All');
  const [showAllShops, setShowAllShops] = useState(false);

  // Fetch Route Data from Backend API
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/v1/routes-page/?search=${encodeURIComponent(searchQuery)}&status=${encodeURIComponent(statusFilter)}&salesman=${encodeURIComponent(salesmanFilter)}&area=${encodeURIComponent(areaFilter)}&route=${encodeURIComponent(routeFilter)}&timeFilter=${encodeURIComponent(timeFilter)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRouteStatusData(data.routeStatus);
          setRoutesList(data.routes || []);
          setRoutesAndShopsList(data.routesAndShops || []);
          setRoutePerformanceData(data.routePerformance || []);
          setUniqueSalesmen(data.dropdowns.salesmen || []);
          setUniqueAreas(data.dropdowns.areas || []);
          setUniqueRoutes(data.dropdowns.routes || []);
          setUniqueShops(data.dropdowns.shops || []);
        }
      })
      .catch((err) => console.error("Failed to fetch routes data:", err));
  }, [searchQuery, statusFilter, salesmanFilter, areaFilter, routeFilter, timeFilter]);

  const isFiltered = searchQuery !== '' || statusFilter !== 'All' || salesmanFilter !== 'All' || areaFilter !== 'All' || routeFilter !== 'All';
  const displayRoutes = (showAll || isFiltered) ? routesList : routesList.slice(0, 5);

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setSalesmanFilter('All');
    setAreaFilter('All');
    setRouteFilter('All');
    setShowAll(false);
  };

  // Filter for Routes & Shops
  const filteredRoutesAndShops = routesAndShopsList.filter((item) => {
    const matchesShop = shopFilter === 'All' || item.shop.toLowerCase() === shopFilter.toLowerCase();
    const matchesSalesman = shopSalesmanFilter === 'All' || item.salesman.toLowerCase() === shopSalesmanFilter.toLowerCase();
    const matchesArea = shopAreaFilter === 'All' || item.area.toLowerCase() === shopAreaFilter.toLowerCase();
    const matchesRoute = shopRouteFilter === 'All' || item.route.toLowerCase() === shopRouteFilter.toLowerCase();
    return matchesShop && matchesSalesman && matchesArea && matchesRoute;
  });

  const isShopsFiltered = shopFilter !== 'All' || shopSalesmanFilter !== 'All' || shopAreaFilter !== 'All' || shopRouteFilter !== 'All';
  const displayRoutesAndShops = (showAllShops || isShopsFiltered) ? filteredRoutesAndShops : filteredRoutesAndShops.slice(0, 5);

  const handleClearShopsFilters = () => {
    setShopFilter('All');
    setShopSalesmanFilter('All');
    setShopAreaFilter('All');
    setShopRouteFilter('All');
    setShowAllShops(false);
  };

  const getStatusColor = (status) => {
    const s = String(status).toLowerCase();
    if (s === 'active') return 'text-[#EB9F30] font-semibold';
    if (s === 'completed') return 'text-[#22A847] font-semibold';
    if (s === 'pending') return 'text-[#D7262D] font-semibold';
    return 'text-gray-700 font-semibold';
  };

  // Donut SVG configuration
  const radius = 64;
  const strokeWidth = 34;
  const circumference = 2 * Math.PI * radius;

  let cumulativeOffset = 0;
  const segments = (routeStatusData.categories || []).map((cat) => {
    const strokeDasharray = `${(cat.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -cumulativeOffset;
    cumulativeOffset += (cat.percentage / 100) * circumference;
    return { ...cat, strokeDasharray, strokeDashoffset };
  });

  return (
    <Navbar activeNav="Routes">
      <div className="max-w-7xl mx-auto space-y-6 text-left">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Route</h1>
          <p className="text-xs sm:text-sm text-gray-500 font-normal mt-1">Plan, assign and monitor daily sales routes.</p>
        </div>

        {/* Content Row: Donut Chart & Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
          <div className="lg:col-span-5 flex flex-col items-center justify-center py-4">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 200 200">
                {segments.map((segment) => (
                  <circle
                    key={segment.label}
                    cx="100" cy="100" r={radius}
                    fill="transparent"
                    stroke={segment.color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={segment.strokeDasharray}
                    strokeDashoffset={segment.strokeDashoffset}
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-xs sm:text-sm text-gray-500 font-medium">Total Routes</span>
                <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-0.5">{routeStatusData.total}</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-6 sm:space-x-8 mt-6">
              {(routeStatusData.categories || []).map((cat) => (
                <div key={cat.label} className={`flex items-center space-x-2 `}>
                  <span className="w-3 h-3 rounded-[2px] shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="text-xs sm:text-sm font-semibold text-gray-800">{cat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Route Performance Overview Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Route Performance Overview</h3>
              <div className="relative inline-flex items-center">
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="bg-white border border-gray-200 hover:border-gray-300 rounded-lg px-3.5 py-1.5 pr-8 text-xs sm:text-sm font-medium text-gray-700 cursor-pointer focus:outline-none shadow-2xs appearance-none"
                >
                  <option value="This Week">This Week</option>
                  <option value="This Month">This Month</option>
                  <option value="Today">Today</option>
                  <option value="This Year">This Year</option>
                </select>
                <img
                  src={Dropdown}
                  alt=""
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 items-center text-xs sm:text-sm font-bold text-gray-900 pb-4 mb-4 border-b border-transparent">
              <div className="col-span-3">Route</div>
              <div className="col-span-8">Performance</div>
              <div className="col-span-1 text-right"></div>
            </div>

            <div className="space-y-6">
              {routePerformanceData.length > 0 ? (
                routePerformanceData.map((item) => (
                  <div key={item.name} onMouseEnter={() => setHoveredRoute(item.name)} onMouseLeave={() => setHoveredRoute(null)} className="grid grid-cols-12 items-center text-xs sm:text-sm font-medium text-gray-800 transition">
                    <div className="col-span-3 text-gray-800 font-semibold truncate pr-2">
                      {item.name}
                    </div>
                    <div className="col-span-8 pr-4">
                      <div className="w-full h-4 bg-transparent rounded-[2px] overflow-hidden flex items-center">
                        <div className="h-full bg-[#6E473B] rounded-[2px] transition-all duration-500 ease-out" style={{ width: `${item.performance}%`, opacity: hoveredRoute && hoveredRoute !== item.name ? 0.75 : 1 }} />
                      </div>
                    </div>
                    <div className="col-span-1 text-right font-semibold text-gray-800">{item.performance}%</div>
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-gray-500 text-sm">No performance data found.</p>
              )}
            </div>
          </div>
        </div>

            {/* ROUTES TABLE SECTION */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6 text-left">
              <div className="flex flex-col space-y-4">
                <div className="relative max-w-sm w-full border border-gray-300 rounded-full flex items-center px-4 py-2 bg-white shadow-2xs focus-within:border-gray-400 transition-colors">
                  <img src={sIcon} alt="search" className="w-4 h-4 shrink-0 object-contain" />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search Routes...." className="text-xs sm:text-sm text-gray-800 outline-none w-full ml-2.5 bg-transparent placeholder-gray-400 font-normal" />
                  {searchQuery && <button type="button" onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600 text-xs font-bold px-1 cursor-pointer">×</button>}
                </div>

                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <div className="relative inline-block">
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-md px-3.5 py-1.5 pr-8 text-xs font-medium text-gray-700 cursor-pointer shadow-2xs focus:outline-none">
                      <option value="All">Status</option>
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <img src={arrowDropUpIcon} alt="dropdown arrow" className="w-5 h-5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none object-contain" />
                  </div>

                  <div className="relative inline-block">
                    <select value={salesmanFilter} onChange={(e) => setSalesmanFilter(e.target.value)} className="appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-md px-3.5 py-1.5 pr-8 text-xs font-medium text-gray-700 cursor-pointer shadow-2xs focus:outline-none">
                      <option value="All">Salesman</option>
                      {uniqueSalesmen.map((sm, i) => <option key={i} value={sm}>{sm}</option>)}
                    </select>
                    <img src={arrowDropUpIcon} alt="dropdown arrow" className="w-5 h-5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none object-contain" />
                  </div>

                  <div className="relative inline-block">
                    <select value={areaFilter} onChange={(e) => setAreaFilter(e.target.value)} className="appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-md px-3.5 py-1.5 pr-8 text-xs font-medium text-gray-700 cursor-pointer shadow-2xs focus:outline-none">
                      <option value="All">Area</option>
                      {uniqueAreas.map((ar, i) => <option key={i} value={ar}>{ar}</option>)}
                    </select>
                    <img src={arrowDropUpIcon} alt="dropdown arrow" className="w-5 h-5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none object-contain" />
                  </div>

                  <div className="relative inline-block">
                    <select value={routeFilter} onChange={(e) => setRouteFilter(e.target.value)} className="appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-md px-3.5 py-1.5 pr-8 text-xs font-medium text-gray-700 cursor-pointer shadow-2xs focus:outline-none">
                      <option value="All">Route</option>
                      {uniqueRoutes.map((rt, i) => <option key={i} value={rt}>{rt}</option>)}
                    </select>
                    <img src={arrowDropUpIcon} alt="dropdown arrow" className="w-5 h-5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none object-contain" />
                  </div>

                  <button type="button" onClick={handleClearFilters} className={`border rounded-md px-3.5 py-1.5 text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer shadow-2xs ${isFiltered ? 'bg-red-50 border-red-300 text-red-600 hover:bg-red-100' : 'bg-[#D9D9D9] border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
                    <span>Clear</span>
                  </button>
                </div>
              </div>

              <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-center border-collapse min-w-[750px]">
                  <thead>
                    <tr className="bg-[#D9D9D9] text-gray-900 text-xs sm:text-sm font-bold">
                      <th className="py-3.5 px-4 sm:px-6">Route ID</th>
                      <th className="py-3.5 px-4 sm:px-6">Area</th>
                      <th className="py-3.5 px-4 sm:px-6">Salesman</th>
                      <th className="py-3.5 px-4 sm:px-6">Shops</th>
                      <th className="py-3.5 px-4 sm:px-6">Visited</th>
                      <th className="py-3.5 px-4 sm:px-6">Sales</th>
                      <th className="py-3.5 px-4 sm:px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-xs sm:text-sm font-medium text-gray-800 bg-white">
                    {displayRoutes.length > 0 ? (
                      displayRoutes.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-bold">
                            {item.route_id || item.route}
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.area}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.salesman}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.shops}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.visited}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.sales}</td>
                          <td className="py-3.5 px-4 sm:px-6"><span className={getStatusColor(item.status)}>{item.status}</span></td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="7" className="text-center py-8 text-gray-500 font-medium">No matching routes found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="pt-1">
                <button type="button" onClick={() => setShowAll(!showAll)} className="bg-[#D71920] hover:bg-[#B9151B] text-white text-xs sm:text-sm font-medium py-2 px-4 rounded-md inline-flex items-center space-x-2 shadow-sm transition-all duration-200 cursor-pointer">
                  <span>{showAll ? 'Show Less' : 'View All'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              </div>
            </div>

            {/* ROUTES & SHOPS SECTION */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6 text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Routes & Shops</h2>

              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <div className="relative inline-block">
                  <select value={shopFilter} onChange={(e) => setShopFilter(e.target.value)} className="appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-md px-3.5 py-1.5 pr-8 text-xs font-medium text-gray-700 cursor-pointer shadow-2xs focus:outline-none">
                    <option value="All">Shop</option>
                    {uniqueShops.map((sh, i) => <option key={i} value={sh}>{sh}</option>)}
                  </select>
                  <img src={arrowDropUpIcon} alt="dropdown arrow" className="w-5 h-5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none object-contain" />
                </div>

                <div className="relative inline-block">
                  <select value={shopSalesmanFilter} onChange={(e) => setShopSalesmanFilter(e.target.value)} className="appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-md px-3.5 py-1.5 pr-8 text-xs font-medium text-gray-700 cursor-pointer shadow-2xs focus:outline-none">
                    <option value="All">Salesman</option>
                    {uniqueSalesmen.map((sm, i) => <option key={i} value={sm}>{sm}</option>)}
                  </select>
                  <img src={arrowDropUpIcon} alt="dropdown arrow" className="w-5 h-5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none object-contain" />
                </div>

                <div className="relative inline-block">
                  <select value={shopAreaFilter} onChange={(e) => setShopAreaFilter(e.target.value)} className="appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-md px-3.5 py-1.5 pr-8 text-xs font-medium text-gray-700 cursor-pointer shadow-2xs focus:outline-none">
                    <option value="All">Area</option>
                    {uniqueAreas.map((ar, i) => <option key={i} value={ar}>{ar}</option>)}
                  </select>
                  <img src={arrowDropUpIcon} alt="dropdown arrow" className="w-5 h-5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none object-contain" />
                </div>

                <div className="relative inline-block">
                  <select value={shopRouteFilter} onChange={(e) => setShopRouteFilter(e.target.value)} className="appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-md px-3.5 py-1.5 pr-8 text-xs font-medium text-gray-700 cursor-pointer shadow-2xs focus:outline-none">
                    <option value="All">Route</option>
                    {uniqueRoutes.map((rt, i) => <option key={i} value={rt}>{rt}</option>)}
                  </select>
                  <img src={arrowDropUpIcon} alt="dropdown arrow" className="w-5 h-5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none object-contain" />
                </div>

                <button type="button" onClick={handleClearShopsFilters} className={`border rounded-md px-3.5 py-1.5 text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer shadow-2xs ${isShopsFiltered ? 'bg-red-50 border-red-300 text-red-600 hover:bg-red-100' : 'bg-[#D9D9D9] border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
                  <span>Clear</span>
                </button>
              </div>

              <div className="w-full overflow-x-auto rounded-xl border border-gray-300">
                <table className="w-full text-center border-collapse min-w-[650px]">
                  <thead>
                    <tr className="text-gray-900 text-xs sm:text-sm font-bold border-b border-gray-300">
                      <th className="py-3.5 px-4 sm:px-6 border-r bg-[#F4F1EF] border-gray-300 w-1/4">Route</th>
                      <th className="py-3.5 px-4 sm:px-6 border-r border-gray-300 w-1/4">Area</th>
                      <th className="py-3.5 px-4 sm:px-6 border-r border-gray-300 bg-[#F4F1EF] w-1/4">Shop</th>
                      <th className="py-3.5 px-4 sm:px-6 w-1/4">Salesman</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300 text-xs sm:text-sm font-medium text-gray-800 bg-white">
                    {displayRoutesAndShops.length > 0 ? (
                      displayRoutesAndShops.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                          {/* Route ID in Route column */}
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 bg-[#F4F1EF] font-bold border-r border-gray-300">
                            {item.route_id || item.route}
                          </td>
                          {/* Area Name in Area column */}
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium border-r border-gray-300">
                            {item.area}
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium bg-[#F4F1EF] border-r border-gray-300">{item.shop}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.salesman}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="4" className="text-center py-8 text-gray-500 font-medium">No matching routes or shops found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="pt-1">
                <button type="button" onClick={() => setShowAllShops(!showAllShops)} className="bg-[#D71920] hover:bg-[#B9151B] text-white text-xs sm:text-sm font-medium py-2 px-4 rounded-md inline-flex items-center space-x-2 shadow-sm transition-all duration-200 cursor-pointer">
                  <span>{showAllShops ? 'Show Less' : 'View All'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              </div>
            </div>

          </div>
    </Navbar>
  );
}