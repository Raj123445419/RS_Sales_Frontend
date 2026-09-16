import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// Page-specific Assets
import rupeeIcon from '../../assets/mdi_rupee.svg';
import totalOrdersIcon from '../../assets/BagOrange.svg';
import activeShopsIcon from '../../assets/UserGreen.svg';
import aovIcon from '../../assets/WalletPurple.svg';
import routesIcon from '../../assets/RouteBlack.svg';
import arrowDropUpIcon from '../../assets/arrow_drop_up.svg';
import chartIcon from '../../assets/BarChartBlack.svg';

export default function Reports() {
  const navigate = useNavigate();

  // Filters
  const [timeFilter, setTimeFilter] = useState('This Month');
  const [reportCategory, setReportCategory] = useState('All');
  const [isExporting, setIsExporting] = useState(false);

  // Summary Metrics
  const metrics = {
    grossSales: '₹48.6L',
    salesGrowth: '+18.4%',
    totalOrders: '1,420',
    ordersGrowth: '+12.1%',
    aov: '₹3,422',
    aovGrowth: '+5.6%',
    activeRoutes: '4 Routes',
    shopsCovered: '380 Shops'
  };

  // Monthly Revenue Trend Data for SVG Chart
  const monthlyRevenueData = [
    { month: 'Apr', sales: 32, collections: 28 },
    { month: 'May', sales: 38, collections: 34 },
    { month: 'Jun', sales: 42, collections: 39 },
    { month: 'Jul', sales: 45, collections: 41 },
    { month: 'Aug', sales: 44, collections: 40 },
    { month: 'Sep', sales: 48.6, collections: 45.2 }
  ];

  // Route Performance Data
  const routePerformance = [
    { route: 'Route A - Satellite', orders: 480, revenue: '₹18.4L', share: 38, color: '#D71920' },
    { route: 'Route B - Vastrapur', orders: 390, revenue: '₹14.2L', share: 29, color: '#F59E0B' },
    { route: 'Route C - Maninagar', orders: 310, revenue: '₹9.8L', share: 20, color: '#10B981' },
    { route: 'Route D - Bodakdev', orders: 240, revenue: '₹6.2L', share: 13, color: '#8B5CF6' }
  ];

  // Detailed Report Rows
  const reportRows = [
    { id: 1, period: 'Sep 2026 (MTD)', route: 'All Routes', orders: '1,420', grossSales: '₹48,60,000', collections: '₹40,10,000', outstanding: '₹8,50,000', fulfillment: '98.4%' },
    { id: 2, period: 'Sep 2026 (MTD)', route: 'Route A - Satellite', orders: '480', grossSales: '₹18,40,000', collections: '₹15,20,000', outstanding: '₹3,20,000', fulfillment: '99.1%' },
    { id: 3, period: 'Sep 2026 (MTD)', route: 'Route B - Vastrapur', orders: '390', grossSales: '₹14,20,000', collections: '₹11,80,000', outstanding: '₹2,40,000', fulfillment: '98.0%' },
    { id: 4, period: 'Sep 2026 (MTD)', route: 'Route C - Maninagar', orders: '310', grossSales: '₹9,80,000', collections: '₹8,10,000', outstanding: '₹1,70,000', fulfillment: '97.8%' },
    { id: 5, period: 'Sep 2026 (MTD)', route: 'Route D - Bodakdev', orders: '240', grossSales: '₹6,20,000', collections: '₹5,00,000', outstanding: '₹1,20,000', fulfillment: '98.7%' },
    { id: 6, period: 'Aug 2026', route: 'All Routes', orders: '1,310', grossSales: '₹44,10,000', collections: '₹41,20,000', outstanding: '₹2,90,000', fulfillment: '97.9%' },
    { id: 7, period: 'Jul 2026', route: 'All Routes', orders: '1,280', grossSales: '₹42,50,000', collections: '₹40,80,000', outstanding: '₹1,70,000', fulfillment: '98.2%' }
  ];

  const handleExport = (type) => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`Report exported successfully as ${type}!`);
    }, 1000);
  };

  return (
    <Navbar activeNav="Reports">
      <div className="max-w-7xl mx-auto space-y-6 text-left">
        
        {/* Page Header & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Reports & Analytics</h1>
            <p className="text-xs sm:text-sm text-gray-600 font-normal mt-1">Comprehensive sales insights, route performance, revenue breakdown, and audits.</p>
          </div>

          <div className="flex items-center space-x-3 self-start sm:self-auto">
            {/* Time Filter Select */}
            <div className="relative">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3.5 py-2 pr-8 text-xs font-semibold text-gray-700 cursor-pointer hover:border-gray-400 focus:outline-none shadow-2xs"
              >
                <option value="This Month">This Month</option>
                <option value="Last Month">Last Month</option>
                <option value="This Quarter">This Quarter</option>
                <option value="This Year">This Year</option>
              </select>
              <img src={arrowDropUpIcon} alt="arrow" className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Export Report Buttons */}
            <button
              type="button"
              disabled={isExporting}
              onClick={() => handleExport('PDF')}
              className="bg-white border border-gray-300 hover:border-gray-400 text-gray-800 text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg shadow-2xs transition cursor-pointer"
            >
              Export PDF
            </button>
            <button
              type="button"
              disabled={isExporting}
              onClick={() => handleExport('CSV / Excel')}
              className="bg-[#D71920] hover:bg-[#B9151B] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 rounded-lg shadow-sm transition cursor-pointer"
            >
              {isExporting ? 'Exporting...' : 'Export Excel'}
            </button>
          </div>
        </div>

        {/* 4 STAT SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
          
          {/* Card 1: Gross Sales */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between transition hover:shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Gross Sales</p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mt-1">{metrics.grossSales}</h3>
              </div>
              <div className="w-11 h-11 rounded-full bg-[#FCE8EA] flex items-center justify-center shrink-0">
                <img src={rupeeIcon} alt="Sales" className="w-5 h-5 object-contain" />
              </div>
            </div>
            <div className="pt-2 text-xs font-semibold text-emerald-600 flex items-center space-x-1">
              <span>▲ {metrics.salesGrowth}</span>
              <span className="text-gray-400 font-normal">vs last month</span>
            </div>
          </div>

          {/* Card 2: Total Orders */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between transition hover:shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Delivered Orders</p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mt-1">{metrics.totalOrders}</h3>
              </div>
              <div className="w-11 h-11 rounded-full bg-[#FFF4E5] flex items-center justify-center shrink-0">
                <img src={totalOrdersIcon} alt="Orders" className="w-5 h-5 object-contain" />
              </div>
            </div>
            <div className="pt-2 text-xs font-semibold text-emerald-600 flex items-center space-x-1">
              <span>▲ {metrics.ordersGrowth}</span>
              <span className="text-gray-400 font-normal">fulfilled successfully</span>
            </div>
          </div>

          {/* Card 3: Average Order Value */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between transition hover:shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Avg Order Value</p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mt-1">{metrics.aov}</h3>
              </div>
              <div className="w-11 h-11 rounded-full bg-[#ECE6FF] flex items-center justify-center shrink-0">
                <img src={aovIcon} alt="AOV" className="w-5 h-5 object-contain" />
              </div>
            </div>
            <div className="pt-2 text-xs font-semibold text-emerald-600 flex items-center space-x-1">
              <span>▲ {metrics.aovGrowth}</span>
              <span className="text-gray-400 font-normal">per transaction</span>
            </div>
          </div>

          {/* Card 4: Route Coverage */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between transition hover:shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Active Coverage</p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mt-1">{metrics.activeRoutes}</h3>
              </div>
              <div className="w-11 h-11 rounded-full bg-[#E6F8E9] flex items-center justify-center shrink-0">
                <img src={activeShopsIcon} alt="Coverage" className="w-5 h-5 object-contain" />
              </div>
            </div>
            <div className="pt-2 text-xs font-normal text-gray-500">
              <span className="font-semibold text-gray-800">{metrics.shopsCovered}</span> across Ahmedabad
            </div>
          </div>

        </div>

        {/* CHARTS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Revenue & Collection Comparison Bar Chart */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Revenue & Collections Trend</h3>
                <p className="text-xs text-gray-500">Monthly gross sales vs actual collected amounts (in Lakhs)</p>
              </div>
              <div className="flex items-center space-x-4 text-xs font-semibold">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-xs bg-[#D71920]"></span>
                  <span className="text-gray-700">Gross Sales</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-xs bg-emerald-600"></span>
                  <span className="text-gray-700">Collections</span>
                </div>
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="w-full pt-4">
              <div className="grid grid-cols-6 gap-2 sm:gap-4 items-end h-48 border-b border-gray-200 pb-2">
                {monthlyRevenueData.map((item, idx) => {
                  const maxVal = 60;
                  const salesHeight = (item.sales / maxVal) * 100;
                  const collHeight = (item.collections / maxVal) * 100;
                  return (
                    <div key={idx} className="flex flex-col items-center h-full justify-end group">
                      <div className="flex items-end space-x-1.5 w-full justify-center h-full">
                        <div
                          style={{ height: `${salesHeight}%` }}
                          className="w-3.5 sm:w-5 bg-[#D71920] rounded-t-sm transition-all duration-300 group-hover:opacity-90"
                          title={`Sales: ₹${item.sales}L`}
                        ></div>
                        <div
                          style={{ height: `${collHeight}%` }}
                          className="w-3.5 sm:w-5 bg-emerald-600 rounded-t-sm transition-all duration-300 group-hover:opacity-90"
                          title={`Collections: ₹${item.collections}L`}
                        ></div>
                      </div>
                      <span className="text-xs font-semibold text-gray-700 mt-2">{item.month}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[11px] text-gray-400 pt-1">
                <span>0L</span>
                <span>20L</span>
                <span>40L</span>
                <span>60L</span>
              </div>
            </div>
          </div>

          {/* Route-wise Distribution */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Route Revenue Share</h3>
              <p className="text-xs text-gray-500 mb-5">Sales distribution by operational territory</p>

              <div className="space-y-4">
                {routePerformance.map((rt) => (
                  <div key={rt.route} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-gray-900">{rt.route}</span>
                      <span className="text-gray-700">{rt.revenue} ({rt.share}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${rt.share}%`, backgroundColor: rt.color }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 border-t border-gray-100 mt-4 text-xs text-gray-500 flex justify-between items-center">
              <span>Total Route Turnover</span>
              <span className="font-bold text-gray-900 text-sm">₹48.60 Lakhs</span>
            </div>
          </div>

        </div>

        {/* DETAILED REPORTS DATA TABLE */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Territory & Periodical Audit Log</h3>
            <span className="text-xs text-gray-500">Auto-calculated financial statements</span>
          </div>

          <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="bg-[#D9D9D9] text-gray-900 text-xs sm:text-sm font-bold">
                  <th className="py-3.5 px-4 sm:px-6">Period</th>
                  <th className="py-3.5 px-4 sm:px-6">Route Territory</th>
                  <th className="py-3.5 px-4 sm:px-6">Orders</th>
                  <th className="py-3.5 px-4 sm:px-6">Gross Sales</th>
                  <th className="py-3.5 px-4 sm:px-6">Collections</th>
                  <th className="py-3.5 px-4 sm:px-6">Outstanding</th>
                  <th className="py-3.5 px-4 sm:px-6">Fulfillment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-xs sm:text-sm font-medium text-gray-800 bg-white">
                {reportRows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/80 transition">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-gray-900">{row.period}</td>
                    <td className="py-3.5 px-4 sm:px-6 text-gray-800">{row.route}</td>
                    <td className="py-3.5 px-4 sm:px-6 text-gray-700">{row.orders}</td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-gray-900">{row.grossSales}</td>
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-emerald-600">{row.collections}</td>
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#D71920]">{row.outstanding}</td>
                    <td className="py-3.5 px-4 sm:px-6">
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {row.fulfillment}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </Navbar>
  );
}
