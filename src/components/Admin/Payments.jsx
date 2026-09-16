import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// Page-specific Assets
import rupeeIcon from '../../assets/mdi_rupee.svg';
import totalReceivedIcon from '../../assets/UserGreen.svg';
import outstandingIcon from '../../assets/TargetRed.svg';
import dueThisWeekIcon from '../../assets/BagOrange.svg';
import overdueIcon from '../../assets/WalletPurple.svg';
import searchIcon from '../../assets/Search.svg';
import arrowDropUpIcon from '../../assets/arrow_drop_up.svg';
import greenSideIcon from '../../assets/ADGreen Side.svg';

export default function Payments() {
  const navigate = useNavigate();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [methodFilter, setMethodFilter] = useState('All');
  const [routeFilter, setRouteFilter] = useState('All');

  // Modal States
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [isAgingModalOpen, setIsAgingModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Form State for Recording Payment
  const [paymentForm, setPaymentForm] = useState({
    customer: '',
    shopName: '',
    invoiceId: '',
    amount: '',
    method: 'UPI',
    referenceNo: '',
    notes: ''
  });

  // Mock Payments Dataset
  const [paymentsList, setPaymentsList] = useState([
    { id: 1, invoiceId: 'INV-2026-894', customer: 'Rahul Patel', shopName: 'Patel General Store', route: 'Route A - Satellite', totalAmount: '₹24,500', receivedAmount: '₹24,500', dueAmount: '₹0', method: 'UPI', date: '15 Sep 2026', status: 'Paid' },
    { id: 2, invoiceId: 'INV-2026-893', customer: 'Suresh Shah', shopName: 'Shah Provision Store', route: 'Route B - Vastrapur', totalAmount: '₹18,000', receivedAmount: '₹10,000', dueAmount: '₹8,000', method: 'Cash', date: '14 Sep 2026', status: 'Partial' },
    { id: 3, invoiceId: 'INV-2026-890', customer: 'Pravin Mehta', shopName: 'Mehta Daily Needs', route: 'Route C - Maninagar', totalAmount: '₹35,200', receivedAmount: '₹0', dueAmount: '₹35,200', method: 'Bank Transfer', date: '10 Sep 2026', status: 'Pending' },
    { id: 4, invoiceId: 'INV-2026-886', customer: 'Jayesh Dave', shopName: 'Shreeji Super Mart', route: 'Route A - Satellite', totalAmount: '₹42,000', receivedAmount: '₹0', dueAmount: '₹42,000', method: 'Cheque', date: '01 Aug 2026', status: 'Overdue' },
    { id: 5, invoiceId: 'INV-2026-885', customer: 'Mukesh Prajapati', shopName: 'Maruti Mart', route: 'Route D - Bodakdev', totalAmount: '₹15,400', receivedAmount: '₹15,400', dueAmount: '₹0', method: 'UPI', date: '13 Sep 2026', status: 'Paid' },
    { id: 6, invoiceId: 'INV-2026-882', customer: 'Dharmesh Joshi', shopName: 'Joshi Cold Drinks', route: 'Route B - Vastrapur', totalAmount: '₹28,600', receivedAmount: '₹15,000', dueAmount: '₹13,600', method: 'Cash', date: '12 Sep 2026', status: 'Partial' },
    { id: 7, invoiceId: 'INV-2026-880', customer: 'Kiran Desai', shopName: 'Desai Sweet & Snacks', route: 'Route C - Maninagar', totalAmount: '₹55,000', receivedAmount: '₹0', dueAmount: '₹55,000', method: 'Cheque', date: '20 Jul 2026', status: 'Overdue' },
    { id: 8, invoiceId: 'INV-2026-878', customer: 'Harish Soni', shopName: 'Soni Refreshments', route: 'Route D - Bodakdev', totalAmount: '₹12,800', receivedAmount: '₹12,800', dueAmount: '₹0', method: 'UPI', date: '11 Sep 2026', status: 'Paid' }
  ]);

  const routes = ['All', 'Route A - Satellite', 'Route B - Vastrapur', 'Route C - Maninagar', 'Route D - Bodakdev'];

  // Filtered Payments Logic
  const filteredPayments = paymentsList.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || item.customer.toLowerCase().includes(q) || item.shopName.toLowerCase().includes(q) || item.invoiceId.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'All' || item.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesMethod = methodFilter === 'All' || item.method.toLowerCase() === methodFilter.toLowerCase();
    const matchesRoute = routeFilter === 'All' || item.route.toLowerCase() === routeFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesMethod && matchesRoute;
  });

  // Handle Record Payment Form Submit
  const handleRecordPaymentSubmit = (e) => {
    e.preventDefault();
    if (!paymentForm.shopName || !paymentForm.amount) {
      alert('Please fill in required payment details.');
      return;
    }

    const newPayment = {
      id: Date.now(),
      invoiceId: paymentForm.invoiceId || `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      customer: paymentForm.customer || paymentForm.shopName,
      shopName: paymentForm.shopName,
      route: 'Route A - Satellite',
      totalAmount: `₹${paymentForm.amount}`,
      receivedAmount: `₹${paymentForm.amount}`,
      dueAmount: '₹0',
      method: paymentForm.method,
      date: 'Today',
      status: 'Paid'
    };

    setPaymentsList([newPayment, ...paymentsList]);
    setIsRecordModalOpen(false);
    setPaymentForm({
      customer: '',
      shopName: '',
      invoiceId: '',
      amount: '',
      method: 'UPI',
      referenceNo: '',
      notes: ''
    });
  };

  const getStatusBadge = (status) => {
    if (status === 'Paid') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (status === 'Partial') return 'bg-blue-50 text-blue-700 border-blue-200';
    if (status === 'Pending') return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-rose-50 text-rose-700 border-rose-200';
  };

  const getMethodBadge = (method) => {
    if (method === 'UPI') return 'bg-purple-50 text-purple-700';
    if (method === 'Cash') return 'bg-emerald-50 text-emerald-700';
    if (method === 'Bank Transfer') return 'bg-blue-50 text-blue-700';
    return 'bg-orange-50 text-orange-700';
  };

  return (
    <Navbar activeNav="Payments">
      <div className="max-w-7xl mx-auto space-y-6 text-left">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Payments</h1>
            <p className="text-xs sm:text-sm text-gray-600 font-normal mt-1">Track collections, customer receivables, aging breakdown, and settlement statuses.</p>
          </div>
          <div className="flex items-center space-x-3 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setIsAgingModalOpen(true)}
              className="bg-white border border-gray-300 hover:border-gray-400 text-gray-800 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg shadow-2xs flex items-center space-x-1.5 transition cursor-pointer"
            >
              <span>Aging Report</span>
              <img src={greenSideIcon} alt="view" className="w-2 h-2.5 object-contain" />
            </button>
            <button
              type="button"
              onClick={() => setIsRecordModalOpen(true)}
              className="bg-[#D71920] hover:bg-[#B9151B] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-lg shadow-sm transition cursor-pointer"
            >
              <span>+ Record Payment</span>
            </button>
          </div>
        </div>

        {/* 4 STAT CARDS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
          
          {/* Card 1: Total Received */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center space-x-4 transition hover:shadow-sm">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#E6F8E9] flex items-center justify-center shrink-0">
              <img src={totalReceivedIcon} alt="Total Received" className="w-6 h-6 object-contain" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Received (MTD)</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-600 leading-tight">₹32.4L</h3>
              <p className="text-[11px] sm:text-xs text-gray-400 font-normal">Across 142 transactions</p>
            </div>
          </div>

          {/* Card 2: Outstanding Payments */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center space-x-4 transition hover:shadow-sm">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#FCE8EA] flex items-center justify-center shrink-0">
              <img src={outstandingIcon} alt="Outstanding" className="w-6 h-6 object-contain" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Outstanding Amount</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#D71920] leading-tight">₹8.5L</h3>
              <p className="text-[11px] sm:text-xs text-gray-400 font-normal">Pending from 38 shops</p>
            </div>
          </div>

          {/* Card 3: Due This Week */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center space-x-4 transition hover:shadow-sm">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#FFF4E5] flex items-center justify-center shrink-0">
              <img src={dueThisWeekIcon} alt="Due This Week" className="w-6 h-6 object-contain" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Due This Week</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-600 leading-tight">₹3.2L</h3>
              <p className="text-[11px] sm:text-xs text-gray-400 font-normal">18 invoices due for collection</p>
            </div>
          </div>

          {/* Card 4: Overdue (>30 Days) */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center space-x-4 transition hover:shadow-sm">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#ECE6FF] flex items-center justify-center shrink-0">
              <img src={overdueIcon} alt="Overdue" className="w-6 h-6 object-contain" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Overdue (30+ Days)</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-purple-600 leading-tight">₹1.8L</h3>
              <p className="text-[11px] sm:text-xs text-gray-400 font-normal">High priority follow-up</p>
            </div>
          </div>

        </div>

        {/* MAIN TABLE CONTAINER */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 space-y-5">
          
          {/* Controls Bar: Search & Filter Dropdowns */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search by customer, shop name, or invoice..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D71920]"
              />
              <img src={searchIcon} alt="search" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3">
              
              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-3.5 py-2 pr-8 text-xs font-medium text-gray-700 cursor-pointer hover:border-gray-400 focus:outline-none"
                >
                  <option value="All">All Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Partial">Partial</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option>
                </select>
                <img src={arrowDropUpIcon} alt="arrow" className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Payment Method Filter */}
              <div className="relative">
                <select
                  value={methodFilter}
                  onChange={(e) => setMethodFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-3.5 py-2 pr-8 text-xs font-medium text-gray-700 cursor-pointer hover:border-gray-400 focus:outline-none"
                >
                  <option value="All">All Methods</option>
                  <option value="UPI">UPI</option>
                  <option value="Cash">Cash</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cheque">Cheque</option>
                </select>
                <img src={arrowDropUpIcon} alt="arrow" className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Route Filter */}
              <div className="relative">
                <select
                  value={routeFilter}
                  onChange={(e) => setRouteFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-3.5 py-2 pr-8 text-xs font-medium text-gray-700 cursor-pointer hover:border-gray-400 focus:outline-none"
                >
                  {routes.map((rt) => (
                    <option key={rt} value={rt}>{rt === 'All' ? 'All Routes' : rt}</option>
                  ))}
                </select>
                <img src={arrowDropUpIcon} alt="arrow" className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Reset Filter Button */}
              {(searchQuery || statusFilter !== 'All' || methodFilter !== 'All' || routeFilter !== 'All') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('All');
                    setMethodFilter('All');
                    setRouteFilter('All');
                  }}
                  className="text-xs text-[#D71920] font-semibold hover:underline cursor-pointer"
                >
                  Reset
                </button>
              )}

            </div>

          </div>

          {/* Payments Table */}
          <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse min-w-[780px]">
              <thead>
                <tr className="bg-[#D9D9D9] text-gray-900 text-xs sm:text-sm font-bold">
                  <th className="py-3.5 px-4 sm:px-6">Invoice ID</th>
                  <th className="py-3.5 px-4 sm:px-6">Customer & Shop</th>
                  <th className="py-3.5 px-4 sm:px-6">Route</th>
                  <th className="py-3.5 px-4 sm:px-6">Total Amount</th>
                  <th className="py-3.5 px-4 sm:px-6">Outstanding</th>
                  <th className="py-3.5 px-4 sm:px-6">Method</th>
                  <th className="py-3.5 px-4 sm:px-6">Date</th>
                  <th className="py-3.5 px-4 sm:px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-xs sm:text-sm font-medium text-gray-800 bg-white">
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((pay) => (
                    <tr key={pay.id} className="hover:bg-gray-50/80 transition">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-gray-900">{pay.invoiceId}</td>
                      <td className="py-3.5 px-4 sm:px-6">
                        <div>
                          <span className="font-semibold text-gray-900 block">{pay.shopName}</span>
                          <span className="text-xs text-gray-500 font-normal">{pay.customer}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-gray-700 text-xs">{pay.route}</td>
                      <td className="py-3.5 px-4 sm:px-6 font-semibold text-gray-900">{pay.totalAmount}</td>
                      <td className="py-3.5 px-4 sm:px-6">
                        <span className={`font-extrabold ${pay.dueAmount === '₹0' ? 'text-gray-400' : 'text-[#D71920]'}`}>
                          {pay.dueAmount}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 sm:px-6">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${getMethodBadge(pay.method)}`}>
                          {pay.method}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-gray-600">{pay.date}</td>
                      <td className="py-3.5 px-4 sm:px-6">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(pay.status)}`}>
                          {pay.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-8 text-gray-500">
                      No payment records found matching the criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Summary Footer */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
            <span>Showing {filteredPayments.length} of {paymentsList.length} transactions</span>
            <span>Total Outstanding in view: ₹{filteredPayments.reduce((sum, p) => sum + (parseInt(p.dueAmount.replace(/[^0-9]/g, ''), 10) || 0), 0).toLocaleString()}</span>
          </div>

        </div>

        {/* AGING REPORT MODAL */}
        {isAgingModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-xl border border-gray-200 text-left space-y-5 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Payment Aging Analysis</h3>
                  <p className="text-xs text-gray-500">Breakdown of outstanding balance ₹8.5L by aging buckets</p>
                </div>
                <button
                  onClick={() => setIsAgingModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {/* 0-30 Days Bucket */}
                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                  <div className="flex justify-between text-sm font-semibold mb-1">
                    <span className="text-gray-800">0 - 30 Days (Current)</span>
                    <span className="text-emerald-700 font-bold">₹4.2L (49%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '49%' }}></div>
                  </div>
                </div>

                {/* 31-60 Days Bucket */}
                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                  <div className="flex justify-between text-sm font-semibold mb-1">
                    <span className="text-gray-800">31 - 60 Days</span>
                    <span className="text-amber-700 font-bold">₹2.5L (29%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '29%' }}></div>
                  </div>
                </div>

                {/* 61-90 Days Bucket */}
                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                  <div className="flex justify-between text-sm font-semibold mb-1">
                    <span className="text-gray-800">61 - 90 Days</span>
                    <span className="text-orange-700 font-bold">₹1.1L (13%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-orange-500 h-full rounded-full" style={{ width: '13%' }}></div>
                  </div>
                </div>

                {/* 90+ Days Overdue Bucket */}
                <div className="bg-rose-50/50 p-3.5 rounded-xl border border-rose-200">
                  <div className="flex justify-between text-sm font-semibold mb-1">
                    <span className="text-rose-900 font-bold">90+ Days (Severe Overdue)</span>
                    <span className="text-rose-700 font-extrabold">₹0.7L (9%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-rose-600 h-full rounded-full" style={{ width: '9%' }}></div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAgingModalOpen(false)}
                  className="bg-gray-900 text-white px-5 py-2 text-xs font-semibold rounded-lg shadow-sm hover:bg-gray-800 transition cursor-pointer"
                >
                  Close Report
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RECORD PAYMENT MODAL */}
        {isRecordModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-200 text-left space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-lg font-bold text-gray-900">Record New Payment</h3>
                <button
                  onClick={() => setIsRecordModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleRecordPaymentSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Shop / Customer Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Patel General Store"
                    value={paymentForm.shopName}
                    onChange={(e) => setPaymentForm({ ...paymentForm, shopName: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#D71920]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Amount Collected (₹) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 15000"
                      value={paymentForm.amount}
                      onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#D71920]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Payment Method</label>
                    <select
                      value={paymentForm.method}
                      onChange={(e) => setPaymentForm({ ...paymentForm, method: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#D71920]"
                    >
                      <option value="UPI">UPI</option>
                      <option value="Cash">Cash</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cheque">Cheque</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Reference / Txn ID</label>
                  <input
                    type="text"
                    placeholder="e.g. UPI-99882312"
                    value={paymentForm.referenceNo}
                    onChange={(e) => setPaymentForm({ ...paymentForm, referenceNo: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#D71920]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Remarks / Note</label>
                  <textarea
                    rows="2"
                    placeholder="Payment details or settlement remarks..."
                    value={paymentForm.notes}
                    onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#D71920]"
                  ></textarea>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsRecordModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#D71920] hover:bg-[#B9151B] text-white px-5 py-2 text-xs font-semibold rounded-lg shadow-sm transition cursor-pointer"
                  >
                    Save Payment
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
