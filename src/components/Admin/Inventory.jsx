import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// Page-specific Assets
import boxIcon from '../../assets/BoxBlack.svg';
import totalItemsIcon from '../../assets/BagOrange.svg';
import inStockIcon from '../../assets/UserGreen.svg';
import lowStockIcon from '../../assets/TargetRed.svg';
import outOfStockIcon from '../../assets/WalletPurple.svg';
import searchIcon from '../../assets/Search.svg';
import arrowDropUpIcon from '../../assets/arrow_drop_up.svg';
import editIcon from '../../assets/EditGray.svg';

export default function Inventory() {
  const navigate = useNavigate();

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [restockQty, setRestockQty] = useState('');

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    category: 'Soft Drinks',
    unitSize: '500ml',
    price: '',
    mrp: '',
    stock: '',
    minThreshold: '20',
    batchNo: '',
    expiryDate: ''
  });

  // Initial Inventory Dataset
  const [inventoryList, setInventoryList] = useState([
    { id: 1, sku: 'SKU-CC-500', name: 'Coca-Cola Bottle', category: 'Soft Drinks', unitSize: '500ml', price: '₹40', mrp: '₹45', stock: 420, minThreshold: 50, batchNo: 'BTH-2026-04', lastRestocked: '12 Sep 2026', status: 'In Stock' },
    { id: 2, sku: 'SKU-TU-225', name: 'Thums Up PET', category: 'Soft Drinks', unitSize: '2.25L', price: '₹95', mrp: '₹100', stock: 18, minThreshold: 30, batchNo: 'BTH-2026-08', lastRestocked: '08 Sep 2026', status: 'Low Stock' },
    { id: 3, sku: 'SKU-SP-750', name: 'Sprite Lemon-Lime', category: 'Soft Drinks', unitSize: '750ml', price: '₹45', mrp: '₹50', stock: 260, minThreshold: 40, batchNo: 'BTH-2026-11', lastRestocked: '14 Sep 2026', status: 'In Stock' },
    { id: 4, sku: 'SKU-MZ-600', name: 'Maaza Mango Drink', category: 'Juices', unitSize: '600ml', price: '₹38', mrp: '₹42', stock: 0, minThreshold: 25, batchNo: 'BTH-2026-02', lastRestocked: '28 Aug 2026', status: 'Out of Stock' },
    { id: 5, sku: 'SKU-FN-125', name: 'Fanta Orange Spark', category: 'Soft Drinks', unitSize: '1.25L', price: '₹65', mrp: '₹70', stock: 14, minThreshold: 20, batchNo: 'BTH-2026-09', lastRestocked: '05 Sep 2026', status: 'Low Stock' },
    { id: 6, sku: 'SKU-KN-100', name: 'Kinley Packaged Water', category: 'Packaged Water', unitSize: '1L', price: '₹18', mrp: '₹20', stock: 680, minThreshold: 100, batchNo: 'BTH-2026-15', lastRestocked: '15 Sep 2026', status: 'In Stock' },
    { id: 7, sku: 'SKU-LM-500', name: 'Limca Fresh Lemon', category: 'Soft Drinks', unitSize: '500ml', price: '₹40', mrp: '₹45', stock: 195, minThreshold: 35, batchNo: 'BTH-2026-03', lastRestocked: '10 Sep 2026', status: 'In Stock' },
    { id: 8, sku: 'SKU-MM-100', name: 'Minute Maid Pulpy Orange', category: 'Juices', unitSize: '1L', price: '₹85', mrp: '₹95', stock: 8, minThreshold: 20, batchNo: 'BTH-2026-07', lastRestocked: '01 Sep 2026', status: 'Low Stock' },
    { id: 9, sku: 'SKU-DC-300', name: 'Diet Coke Can', category: 'Soft Drinks', unitSize: '300ml', price: '₹55', mrp: '₹60', stock: 140, minThreshold: 30, batchNo: 'BTH-2026-12', lastRestocked: '11 Sep 2026', status: 'In Stock' },
    { id: 10, sku: 'SKU-SW-300', name: 'Schweppes Tonic Water', category: 'Soda & Mixers', unitSize: '300ml', price: '₹60', mrp: '₹65', stock: 0, minThreshold: 15, batchNo: 'BTH-2026-01', lastRestocked: '20 Aug 2026', status: 'Out of Stock' }
  ]);

  // Categories list
  const categories = ['All', 'Soft Drinks', 'Juices', 'Packaged Water', 'Soda & Mixers', 'Energy Drinks'];

  // Metrics Calculation
  const totalProductsCount = inventoryList.length;
  const inStockCount = inventoryList.filter(i => i.stock > i.minThreshold).length;
  const lowStockCount = inventoryList.filter(i => i.stock > 0 && i.stock <= i.minThreshold).length;
  const outOfStockCount = inventoryList.filter(i => i.stock === 0).length;

  // Filter & Search Logic
  const filteredProducts = inventoryList.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || item.name.toLowerCase().includes(q) || item.sku.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
    const matchesCategory = categoryFilter === 'All' || item.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesStatus = statusFilter === 'All' || item.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesCategory && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'stock-asc') return a.stock - b.stock;
    if (sortBy === 'stock-desc') return b.stock - a.stock;
    return 0;
  });

  // Handle Quick Restock Submission
  const handleRestockSubmit = (e) => {
    e.preventDefault();
    if (!selectedProduct || !restockQty || isNaN(restockQty)) return;
    const addQty = parseInt(restockQty, 10);
    setInventoryList(prev => prev.map(item => {
      if (item.id === selectedProduct.id) {
        const newStock = item.stock + addQty;
        const newStatus = newStock === 0 ? 'Out of Stock' : newStock <= item.minThreshold ? 'Low Stock' : 'In Stock';
        return { ...item, stock: newStock, status: newStatus, lastRestocked: 'Today' };
      }
      return item;
    }));
    setIsRestockModalOpen(false);
    setRestockQty('');
    setSelectedProduct(null);
  };

  // Handle Add Product Submission
  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock) {
      alert('Please fill in required fields.');
      return;
    }
    const stockNum = parseInt(formData.stock, 10) || 0;
    const thresholdNum = parseInt(formData.minThreshold, 10) || 20;
    const newStatus = stockNum === 0 ? 'Out of Stock' : stockNum <= thresholdNum ? 'Low Stock' : 'In Stock';

    const newProd = {
      id: Date.now(),
      sku: formData.sku || `SKU-${Date.now().toString().slice(-4)}`,
      name: formData.name,
      category: formData.category,
      unitSize: formData.unitSize || 'Bottle',
      price: formData.price.startsWith('₹') ? formData.price : `₹${formData.price}`,
      mrp: formData.mrp ? (formData.mrp.startsWith('₹') ? formData.mrp : `₹${formData.mrp}`) : `₹${formData.price}`,
      stock: stockNum,
      minThreshold: thresholdNum,
      batchNo: formData.batchNo || 'BTH-NEW',
      lastRestocked: 'Today',
      status: newStatus
    };

    setInventoryList([newProd, ...inventoryList]);
    setIsAddModalOpen(false);
    setFormData({
      sku: '',
      name: '',
      category: 'Soft Drinks',
      unitSize: '500ml',
      price: '',
      mrp: '',
      stock: '',
      minThreshold: '20',
      batchNo: '',
      expiryDate: ''
    });
  };

  // Helper for Status Badge Color
  const getStatusBadge = (status) => {
    if (status === 'In Stock') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (status === 'Low Stock') return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-rose-50 text-rose-700 border-rose-200';
  };

  return (
    <Navbar activeNav="Inventory">
      <div className="max-w-7xl mx-auto space-y-6 text-left">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Inventory</h1>
            <p className="text-xs sm:text-sm text-gray-600 font-normal mt-1">Track warehouse stock levels, category distribution, and low-stock alerts.</p>
          </div>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#D71920] hover:bg-[#B9151B] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-lg shadow-sm flex items-center space-x-2 transition cursor-pointer self-start sm:self-auto"
          >
            <span>+ Add Product</span>
          </button>
        </div>

        {/* 4 STAT CARDS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
          
          {/* Card 1: Total SKUs */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center space-x-4 transition hover:shadow-sm">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#FFF4E5] flex items-center justify-center shrink-0">
              <img src={totalItemsIcon} alt="Total Items" className="w-6 h-6 object-contain" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Products</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">{totalProductsCount}</h3>
              <p className="text-[11px] sm:text-xs text-gray-400 font-normal">Active SKUs cataloged</p>
            </div>
          </div>

          {/* Card 2: In Stock */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center space-x-4 transition hover:shadow-sm">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#E6F8E9] flex items-center justify-center shrink-0">
              <img src={inStockIcon} alt="In Stock" className="w-6 h-6 object-contain" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm font-medium text-gray-600">In Stock</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-600 leading-tight">{inStockCount}</h3>
              <p className="text-[11px] sm:text-xs text-gray-400 font-normal">Optimal inventory</p>
            </div>
          </div>

          {/* Card 3: Low Stock Alert */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center space-x-4 transition hover:shadow-sm">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#FCE8EA] flex items-center justify-center shrink-0">
              <img src={lowStockIcon} alt="Low Stock" className="w-6 h-6 object-contain" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Low Stock Alert</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-600 leading-tight">{lowStockCount}</h3>
              <p className="text-[11px] sm:text-xs text-gray-400 font-normal">Below minimum threshold</p>
            </div>
          </div>

          {/* Card 4: Out of Stock */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center space-x-4 transition hover:shadow-sm">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#ECE6FF] flex items-center justify-center shrink-0">
              <img src={outOfStockIcon} alt="Out of Stock" className="w-6 h-6 object-contain" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Out of Stock</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-rose-600 leading-tight">{outOfStockCount}</h3>
              <p className="text-[11px] sm:text-xs text-gray-400 font-normal">Urgent restock needed</p>
            </div>
          </div>

        </div>

        {/* MAIN TABLE CONTAINER */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 space-y-5">
          
          {/* Controls Bar: Search & Filter Dropdowns */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search by product name, SKU, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D71920]"
              />
              <img src={searchIcon} alt="search" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3">
              
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-3.5 py-2 pr-8 text-xs font-medium text-gray-700 cursor-pointer hover:border-gray-400 focus:outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
                  ))}
                </select>
                <img src={arrowDropUpIcon} alt="arrow" className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-3.5 py-2 pr-8 text-xs font-medium text-gray-700 cursor-pointer hover:border-gray-400 focus:outline-none"
                >
                  <option value="All">All Status</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
                <img src={arrowDropUpIcon} alt="arrow" className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Sort By */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-3.5 py-2 pr-8 text-xs font-medium text-gray-700 cursor-pointer hover:border-gray-400 focus:outline-none"
                >
                  <option value="name">Sort: Name (A-Z)</option>
                  <option value="stock-asc">Stock: Low to High</option>
                  <option value="stock-desc">Stock: High to Low</option>
                </select>
                <img src={arrowDropUpIcon} alt="arrow" className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Clear Filters */}
              {(searchQuery || categoryFilter !== 'All' || statusFilter !== 'All') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('All');
                    setStatusFilter('All');
                  }}
                  className="text-xs text-[#D71920] font-semibold hover:underline cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

          </div>

          {/* Inventory Table */}
          <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="bg-[#D9D9D9] text-gray-900 text-xs sm:text-sm font-bold">
                  <th className="py-3.5 px-4 sm:px-6">Product & SKU</th>
                  <th className="py-3.5 px-4 sm:px-6">Category</th>
                  <th className="py-3.5 px-4 sm:px-6">Unit / MRP</th>
                  <th className="py-3.5 px-4 sm:px-6">In Stock</th>
                  <th className="py-3.5 px-4 sm:px-6">Min Threshold</th>
                  <th className="py-3.5 px-4 sm:px-6">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-xs sm:text-sm font-medium text-gray-800 bg-white">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-gray-50/80 transition">
                      <td className="py-3.5 px-4 sm:px-6">
                        <div>
                          <span className="font-bold text-gray-900 block">{prod.name}</span>
                          <span className="text-xs text-gray-500 font-normal">{prod.sku} • {prod.unitSize}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-gray-700">{prod.category}</td>
                      <td className="py-3.5 px-4 sm:px-6">
                        <span className="font-semibold text-gray-900">{prod.price}</span>
                        <span className="text-xs text-gray-400 block line-through">{prod.mrp}</span>
                      </td>
                      <td className="py-3.5 px-4 sm:px-6">
                        <span className={`text-base font-extrabold ${prod.stock === 0 ? 'text-rose-600' : prod.stock <= prod.minThreshold ? 'text-amber-600' : 'text-gray-900'}`}>
                          {prod.stock}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">units</span>
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-gray-600">{prod.minThreshold} units</td>
                      <td className="py-3.5 px-4 sm:px-6">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(prod.status)}`}>
                          {prod.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedProduct(prod);
                              setRestockQty('');
                              setIsRestockModalOpen(true);
                            }}
                            className="bg-[#D71920] hover:bg-[#B9151B] text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow-2xs transition cursor-pointer"
                          >
                            + Restock
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-gray-500">
                      No products found matching the criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Summary */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
            <span>Showing {filteredProducts.length} of {inventoryList.length} products</span>
            <span>Total Units In Warehouse: {inventoryList.reduce((acc, curr) => acc + curr.stock, 0).toLocaleString()}</span>
          </div>

        </div>

        {/* RESTOCK MODAL */}
        {isRestockModalOpen && selectedProduct && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-200 text-left space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-lg font-bold text-gray-900">Restock Product</h3>
                <button
                  onClick={() => setIsRestockModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900">{selectedProduct.name}</p>
                <p className="text-xs text-gray-500">SKU: {selectedProduct.sku} • Current Stock: {selectedProduct.stock} units</p>
              </div>

              <form onSubmit={handleRestockSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Add Stock Quantity (Units) *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    placeholder="e.g. 50"
                    value={restockQty}
                    onChange={(e) => setRestockQty(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D71920]"
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsRestockModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#D71920] hover:bg-[#B9151B] text-white px-5 py-2 text-xs font-semibold rounded-lg shadow-sm transition cursor-pointer"
                  >
                    Confirm Restock
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ADD PRODUCT MODAL */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-200 text-left space-y-4 my-8">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-lg font-bold text-gray-900">Add New Product to Inventory</h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddProductSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Coca-Cola 750ml"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#D71920]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">SKU / Code</label>
                    <input
                      type="text"
                      placeholder="e.g. SKU-CC-750"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#D71920]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#D71920]"
                    >
                      <option value="Soft Drinks">Soft Drinks</option>
                      <option value="Juices">Juices</option>
                      <option value="Packaged Water">Packaged Water</option>
                      <option value="Soda & Mixers">Soda & Mixers</option>
                      <option value="Energy Drinks">Energy Drinks</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Unit / Size</label>
                    <input
                      type="text"
                      placeholder="e.g. 750ml"
                      value={formData.unitSize}
                      onChange={(e) => setFormData({ ...formData, unitSize: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#D71920]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Selling Price (₹) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 45"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#D71920]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">MRP (₹)</label>
                    <input
                      type="text"
                      placeholder="e.g. 50"
                      value={formData.mrp}
                      onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#D71920]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Initial Stock (Units) *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      placeholder="e.g. 100"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#D71920]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Min Threshold Alert</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="e.g. 20"
                      value={formData.minThreshold}
                      onChange={(e) => setFormData({ ...formData, minThreshold: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#D71920]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#D71920] hover:bg-[#B9151B] text-white px-5 py-2 text-xs font-semibold rounded-lg shadow-sm transition cursor-pointer"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </Navbar>
  );
}
