import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// Page-specific Assets
import arrowDropUpIcon from '../../assets/arrow_drop_up.svg';
import sIcon from '../../assets/sIcon.svg';

// Requested Specific Stat & Action SVGs
import totalShopkeepersIcon from '../../assets/UserOrange.svg';
import activeShopkeepersIcon from '../../assets/UserGreen.svg';
import pendingVisitsIcon from '../../assets/TargetRed.svg';
import ordersThisMonthIcon from '../../assets/WalletPurple.svg';
import editShopkeeperIcon from '../../assets/EditGray.svg';

export default function Shopkeepers() {
  const [timeFilter, setTimeFilter] = useState('This Month');
  const navigate = useNavigate();

  // Search & Filter States for Table
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [salesmanFilter, setSalesmanFilter] = useState('All');
  const [routeFilter, setRouteFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  // Top 4 Stat Cards Metrics
  const [metrics, setMetrics] = useState({
    totalShopkeepers: 0,
    activeShopkeepers: 0,
    pendingVisits: 0,
    ordersThisMonth: '₹0'
  });

  // Table Data State
  const [shopkeepersList, setShopkeepersList] = useState([]);

  // Dropdown options
  const [salesmanOptions, setSalesmanOptions] = useState([]);
  const [routeOptions, setRouteOptions] = useState([]);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingShopkeeper, setEditingShopkeeper] = useState(null);

  // Comprehensive Form State mapped to backend Customer fields
  const [formData, setFormData] = useState({
    shopName: '',
    shopkeeper: '',
    ownerName: '',
    businessType: '',
    gstNumber: '',
    address: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
    salesman: '',
    route: '',
    creditLimit: '50000',
    outstanding: '₹0',
    orders: 0,
    status: 'Active'
  });

  // Fetch dynamic data from Backend API
  const fetchShopkeepersData = () => {
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
      .catch((err) => console.error("Failed to fetch shopkeepers:", err));
  };

  useEffect(() => {
    fetchShopkeepersData();
  }, [searchQuery, statusFilter, salesmanFilter, routeFilter, timeFilter]);

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

  const displayShopkeepers = filteredShopkeepers;

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setSalesmanFilter('All');
    setRouteFilter('All');
    setShowAll(false);
  };

  const handleOpenAddModal = () => {
    setFormData({
      shopName: '',
      shopkeeper: '',
      ownerName: '',
      businessType: 'Retail',
      gstNumber: '',
      address: '',
      area: '',
      city: '',
      state: 'Gujarat',
      pincode: '',
      salesman: salesmanOptions[0] || '',
      route: routeOptions[0] || '',
      creditLimit: '50000',
      outstanding: '₹0',
      orders: 0,
      status: 'Active'
    });
    setIsAddModalOpen(true);
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/api/v1/shopkeepers-add/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsAddModalOpen(false);
          fetchShopkeepersData();
        } else {
          alert('Failed to add shop: ' + (data.error || 'Unknown error'));
        }
      })
      .catch((err) => {
        console.error("Error adding shopkeeper:", err);
        setIsAddModalOpen(false);
      });
  };

  const handleOpenEditModal = (shop) => {
    setEditingShopkeeper(shop);
    setFormData({
      shopName: shop.shopName || '',
      shopkeeper: shop.shopkeeper || shop.ownerName || '',
      ownerName: shop.ownerName || shop.shopkeeper || '',
      businessType: shop.businessType || '',
      gstNumber: shop.gstNumber || '',
      address: shop.address || '',
      area: shop.area || '',
      city: shop.city || '',
      state: shop.state || '',
      pincode: shop.pincode || '',
      salesman: shop.salesman || salesmanOptions[0] || '',
      route: shop.route || routeOptions[0] || '',
      creditLimit: shop.creditLimit || '50000',
      outstanding: shop.outstanding || '₹0',
      orders: shop.orders || 0,
      status: shop.status || 'Active'
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingShopkeeper) return;

    fetch(`http://127.0.0.1:8000/api/v1/shopkeepers-update/${editingShopkeeper.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsEditModalOpen(false);
          fetchShopkeepersData();
        } else {
          alert('Failed to update shop: ' + (data.error || 'Unknown error'));
        }
      })
      .catch((err) => console.error("Error updating shopkeeper:", err));
  };

  return (
    <Navbar activeNav="Customers">
      <div className="max-w-7xl mx-auto space-y-6 text-left">
            
            {/* Page Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Customers</h1>
              <p className="text-xs sm:text-sm text-gray-600 font-normal mt-1">Manage customers, registered shops, assigned routes, and business activity.</p>
            </div>

            {/* 4 STAT CARDS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 pt-1">
              
              {/* Card 1: Total Customers */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center space-x-4 transition hover:shadow-sm">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#FFF4E5] flex items-center justify-center shrink-0">
                  <img src={totalShopkeepersIcon} alt="Total Customers" className="w-6 h-6 object-contain" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Total Customers</p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">{metrics.totalShopkeepers}</h3>
                  <p className="text-[11px] sm:text-xs text-gray-400 font-normal">Registered shops</p>
                </div>
              </div>

              {/* Card 2: Active Customers */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center space-x-4 transition hover:shadow-sm">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#E6F8E9] flex items-center justify-center shrink-0">
                  <img src={activeShopkeepersIcon} alt="Active Customers" className="w-6 h-6 object-contain" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Active Customers</p>
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
                  <img src={sIcon} alt="search" className="w-4 h-4 shrink-0 object-contain" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Shopkeepers...."
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
                  <div className="relative inline-block">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-md px-3.5 py-1.5 pr-8 text-xs font-medium text-gray-700 cursor-pointer shadow-2xs focus:outline-none"
                    >
                      <option value="All">Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <img src={arrowDropUpIcon} alt="dropdown arrow" className="w-5 h-5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none object-contain" />
                  </div>

                  {/* Salesman Dropdown */}
                  <div className="relative inline-block">
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
                    <img src={arrowDropUpIcon} alt="dropdown arrow" className="w-5 h-5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none object-contain" />
                  </div>

                  {/* Routes Dropdown */}
                  <div className="relative inline-block">
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
                    <img src={arrowDropUpIcon} alt="dropdown arrow" className="w-5 h-5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none object-contain" />
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

            </div>

          </div>

      {/* ADD SHOP MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 text-left my-8">
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

            <form onSubmit={handleSaveAdd} className="space-y-3 text-xs sm:text-sm max-h-[75vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Shop Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.shopName}
                    onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                    placeholder="e.g. Patel General Store"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Shopkeeper/Owner *</label>
                  <input
                    type="text"
                    required
                    value={formData.shopkeeper}
                    onChange={(e) => setFormData({ ...formData, shopkeeper: e.target.value, ownerName: e.target.value })}
                    placeholder="e.g. Rahul Patel"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Business Type</label>
                  <input
                    type="text"
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    placeholder="e.g. Retail / Grocery"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">GST Number</label>
                  <input
                    type="text"
                    value={formData.gstNumber}
                    onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                    placeholder="e.g. 24AAAAA0000A1Z5"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. Shop No 4, Market Road"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Area</label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="e.g. Maninagar"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Ahmedabad"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="e.g. Gujarat"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="e.g. 380008"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Salesman</label>
                  <select
                    value={formData.salesman}
                    onChange={(e) => setFormData({ ...formData, salesman: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500 bg-white"
                  >
                    <option value="">Select Salesman</option>
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500 bg-white"
                  >
                    <option value="">Select Route</option>
                    {routeOptions.map((rt, i) => (
                      <option key={i} value={rt}>{rt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Credit Limit</label>
                  <input
                    type="text"
                    value={formData.creditLimit}
                    onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 text-left my-8">
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

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs sm:text-sm max-h-[75vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Shop Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.shopName}
                    onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Shopkeeper/Owner *</label>
                  <input
                    type="text"
                    required
                    value={formData.shopkeeper}
                    onChange={(e) => setFormData({ ...formData, shopkeeper: e.target.value, ownerName: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Business Type</label>
                  <input
                    type="text"
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">GST Number</label>
                  <input
                    type="text"
                    value={formData.gstNumber}
                    onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Area</label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Salesman</label>
                  <select
                    value={formData.salesman}
                    onChange={(e) => setFormData({ ...formData, salesman: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500 bg-white"
                  >
                    <option value="">Select Salesman</option>
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500 bg-white"
                  >
                    <option value="">Select Route</option>
                    {routeOptions.map((rt, i) => (
                      <option key={i} value={rt}>{rt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Credit Limit</label>
                  <input
                    type="text"
                    value={formData.creditLimit}
                    onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
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
    </Navbar>
  );
}