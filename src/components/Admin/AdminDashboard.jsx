import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// Page-specific Assets
import calendarIcon from '../../assets/material-symbols-light_event-note-outline.svg';
import Dropdown from '../../assets/Dropdown.svg';
import rupeeIcon from '../../assets/mdi_rupee.svg';
import ordersBagIcon from '../../assets/BagOrange.svg';
import customersGreenIcon from '../../assets/UserGreen.svg';
import walletIcon from '../../assets/WalletPurple.svg';
import adWhiteCart from '../../assets/ADWhite Cart.svg';
import adRedHouse from '../../assets/ADRed House.svg';
import adRedPluceUser from '../../assets/ADRed PluceUser.svg';
import adRedShape from '../../assets/ADRed Shape.svg';
import adRedR from '../../assets/ADRed R.svg';
import adGreenSide from '../../assets/ADGreen Side.svg';

export default function AdminDashboard() {
  const [timeFilter, setTimeFilter] = useState('This Week');

  const [metrics, setMetrics] = useState({
    total_sales: '₹0',
    total_orders: '0',
    customers: '0',
    pending_payment: '₹0'
  });
  const [salesOverview, setSalesOverview] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  
  // ફાઇનાન્સિયલ ડેટા માટે નવા સ્ટેટ્સ ઉમેર્યા
  const [financials, setFinancials] = useState({
    outstanding_payments: '₹0',
    monthly_sales_mtd: '₹0',
    target_percentage: 0
  });

  const getTodayFormattedDate = () => {
    const d = new Date();
    const day = d.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const year = d.getFullYear();
    return `${day} ${monthNames[d.getMonth()]} ${year}`;
  };

  const [hoveredPoint, setHoveredPoint] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      fetch(`http://127.0.0.1:8000/api/admin/dashboard/?filter=${encodeURIComponent(timeFilter)}`)      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMetrics(data.metrics);
          setSalesOverview(data.salesOverview || []);
          setTopProducts(data.topProducts || []);

          // બેકડેન્ડથી આવતા ફાઇનાન્સિયલ ડેટાને અહીં સેટ કર્યો છે
          setFinancials({
            outstanding_payments: data.metrics.pending_payment,
            monthly_sales_mtd: data.metrics.total_sales, // અથવા જો અલગ હોય તો તે મુજબ
            target_percentage: data.targetPercentage || 65 // જો બેકડેન્ડમાંથી પર્સન્ટેજ ન આવતા હોય તો ડિફોલ્ટ અથવા ગણતરી
          });
        }
      })
      .catch((err) => console.error("Failed to fetch dashboard stats:", err));
  }, [timeFilter]);

  const statCards = [
    { id: 1, title: 'Total Sales', value: metrics.total_sales, change: '3.4%', isPositive: true, icon: rupeeIcon, iconBg: 'bg-[#FCE8EA]', sparklineColor: '#EF4444', sparklinePoints: 'M 0 20 L 15 15 L 30 18 L 45 6 L 60 2' },
    { id: 2, title: 'Total Orders', value: metrics.total_orders, change: '3.4%', isPositive: true, icon: ordersBagIcon, iconBg: 'bg-[#FFF4E5]', sparklineColor: '#F59E0B', sparklinePoints: 'M 0 22 L 15 17 L 30 20 L 45 8 L 60 3' },
    { id: 3, title: 'Customers', value: metrics.customers, change: '3.4%', isPositive: true, icon: customersGreenIcon, iconBg: 'bg-[#E6F8E9]', sparklineColor: '#22C55E', sparklinePoints: 'M 0 20 L 15 18 L 30 14 L 45 15 L 60 4' },
    { id: 4, title: 'Pending Payment', value: metrics.pending_payment, change: '3.4%', isPositive: false, icon: walletIcon, iconBg: 'bg-[#ECE6FF]', sparklineColor: '#8B5CF6', sparklinePoints: 'M 0 22 L 15 16 L 30 21 L 45 10 L 60 4' },
  ];

  return (
    <Navbar activeNav="Dashboard">
      <div className="max-w-7xl mx-auto space-y-6">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-left tracking-tight">Dashboard</h1>
              <div className="inline-flex items-center space-x-2.5 bg-white border border-gray-300 rounded-xl px-4 py-2.5 shadow-2xs text-xs sm:text-sm font-semibold text-gray-900 select-none self-start sm:self-auto pointer-events-none">
                <img src={calendarIcon} alt="calendar" className="w-5 h-5 object-contain" />
                <span>{getTodayFormattedDate()}</span>
              </div>
            </div>

            {/* Metric Summary Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
              {statCards.map((card) => (
                <div key={card.id} className="bg-white rounded-lg p-4 sm:p-5 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition duration-200">
                  <div className="flex items-start space-x-3.5 mb-3 text-left">
                    <div className={`w-11 h-11 rounded-full ${card.iconBg} flex items-center justify-center shrink-0`}>
                      <img src={card.icon} alt={card.title} className="w-5 h-5 object-contain" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">{card.title}</p>
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 leading-tight mt-0.5">{card.value}</h3>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 pt-1">
                    <span className={`text-xs font-bold flex items-center space-x-1 shrink-0 ${card.isPositive ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                      <span>{card.isPositive ? '▲' : '▼'}</span>
                      <span>{card.change}</span>
                      <span className="text-[11px] text-gray-500 font-normal ml-0.5 whitespace-nowrap">vs last month</span>
                    </span>
                    <div className="w-10 sm:w-12 h-5 shrink-0 flex items-center">
                      <svg viewBox="0 0 60 25" className="w-full h-full">
                        <path d={card.sparklinePoints} fill="none" stroke={card.sparklineColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CHARTS ROW */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">

              {/* Sales Overview Line Chart */}
              <div className="xl:col-span-7 bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-100 flex flex-col justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 text-left">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Sales Overview</h3>
                    <p className="text-xs text-gray-500 font-medium">Track your sales performance overtime</p>
                  </div>
                  <div className="relative inline-block">
                    <select
                      value={timeFilter}
                      onChange={(e) => setTimeFilter(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded px-3.5 py-1.5 pr-7 text-xs font-semibold text-gray-700 cursor-pointer focus:outline-none"
                    >
                      <option value="This Week">This Week</option>
                      <option value="This Month">This Month</option>
                      <option value="This Year">This Year</option>
                    </select>
                    <img src={Dropdown} alt="arrow" className="w-2.5 h-2 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none object-contain" />
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
                              <circle cx={pt.x} cy={pt.y} r="4.5" fill="#D71920" stroke="#FFFFFF" strokeWidth="2" onMouseEnter={() => setHoveredPoint({ day: pt.label, value: `₹${pt.value.toLocaleString()}`, x: pt.x, y: pt.y })} onMouseLeave={() => setHoveredPoint(null)} />
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
              <div className="xl:col-span-5 flex flex-col justify-start text-left pt-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Top Selling Products</h3>
                <div className="flex flex-col sm:flex-row items-center justify-start gap-8 sm:gap-12">
                  
                  {/* CSS Conic Gradient Donut Chart */}
                  <div className="relative w-56 h-56 sm:w-64 sm:h-64 shrink-0 flex items-center justify-center">
                    <div 
                      className="w-52 h-52 sm:w-60 sm:h-60 rounded-full flex items-center justify-center relative shadow-md"
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
                      <div className="w-32 h-32 sm:w-36 sm:h-36 bg-[#F5F6F8] rounded-full shadow-inner flex items-center justify-center"></div>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-5 text-left flex-1 min-w-0">
                    {topProducts.length > 0 ? [...topProducts].sort((a, b) => b.pct - a.pct).map((prod) => (
                      <div key={prod.name} className="flex items-center space-x-4 text-sm sm:text-base font-semibold text-gray-900">
                        <span className="w-4 h-4 rounded-[4px] shrink-0 shadow-2xs" style={{ backgroundColor: prod.color }} />
                        <span className="min-w-[90px] text-gray-900 font-medium">{prod.name}</span>
                        <span className="font-bold text-gray-900 ml-4 text-right">{prod.count}</span>
                      </div>
                    )) : (
                      <p className="text-sm text-gray-500">No sales recorded yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS & FINANCIALS SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              
              {/* Quick Actions Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-100 flex flex-col justify-between text-left">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                  
                  {/* Create Order Red Button */}
                  <div className="flex justify-center mb-6">
                    <button
                      onClick={() => navigate('/orders')}
                      className="bg-[#D71920] hover:bg-[#b8141a] text-white px-8 py-3 rounded-lg font-medium text-sm sm:text-base flex items-center justify-center space-x-3 shadow-sm transition-all duration-150 cursor-pointer"
                    >
                      <img src={adWhiteCart} alt="Create Order" className="w-5 h-5 object-contain" />
                      <span>Create Order</span>
                    </button>
                  </div>

                  {/* 2x2 Action Buttons Grid */}
                  <div className="grid grid-cols-2 gap-4 sm:gap-5">
                    <button
                      onClick={() => navigate('/customers')}
                      className="bg-[#E5E5E5] hover:bg-[#dedede] border border-gray-300 rounded-xl p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all duration-150 cursor-pointer group"
                    >
                      <img src={adRedHouse} alt="Add Shop" className="w-7 h-7 sm:w-8 sm:h-8 object-contain mb-2.5 transition-transform group-hover:scale-105" />
                      <span className="text-xs sm:text-sm font-semibold text-gray-800">Add Shop</span>
                    </button>

                    <button
                      onClick={() => navigate('/salesmen')}
                      className="bg-[#E5E5E5] hover:bg-[#dedede] border border-gray-300 rounded-xl p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all duration-150 cursor-pointer group"
                    >
                      <img src={adRedPluceUser} alt="Add Salesman" className="w-7 h-7 sm:w-8 sm:h-8 object-contain mb-2.5 transition-transform group-hover:scale-105" />
                      <span className="text-xs sm:text-sm font-semibold text-gray-800">Add Salesman</span>
                    </button>

                    <button
                      onClick={() => navigate('/inventory')}
                      className="bg-[#E5E5E5] hover:bg-[#dedede] border border-gray-300 rounded-xl p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all duration-150 cursor-pointer group"
                    >
                      <img src={adRedShape} alt="Add Product" className="w-7 h-7 sm:w-8 sm:h-8 object-contain mb-2.5 transition-transform group-hover:scale-105" />
                      <span className="text-xs sm:text-sm font-semibold text-gray-800">Add Product</span>
                    </button>

                    <button
                      onClick={() => navigate('/routes')}
                      className="bg-[#E5E5E5] hover:bg-[#dedede] border border-gray-300 rounded-xl p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all duration-150 cursor-pointer group"
                    >
                      <img src={adRedR} alt="Assign Route" className="w-7 h-7 sm:w-8 sm:h-8 object-contain mb-2.5 transition-transform group-hover:scale-105" />
                      <span className="text-xs sm:text-sm font-semibold text-gray-800">Assign Route</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Financials Card (ಬૅકએન્ડ ડેટા સાથે અપડેટ કરેલ) */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-100 flex flex-col justify-between text-left">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Financials</h3>
                  
                  {/* Outstanding Payments Box */}
                  <div className="bg-[#E5E5E5] border border-gray-300 rounded-xl p-4 sm:p-5 text-left mb-4 sm:mb-5">
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Outstanding Payments</p>
                    <div className="flex items-end justify-between mt-2">
                      <h4 className="text-2xl sm:text-3xl font-bold text-[#D71920] tracking-tight">{metrics.pending_payment}</h4>
                      <button 
                        onClick={() => navigate('/payments')}
                        className="flex items-center space-x-1.5 text-xs sm:text-sm text-[#2DA12F] font-semibold hover:underline cursor-pointer pb-0.5"
                      >
                        <span>View Aging Report</span>
                        <img src={adGreenSide} alt="arrow" className="w-2 h-2.5 object-contain" />
                      </button>
                    </div>
                  </div>

                  {/* Monthly Sales (MTD) Box */}
                  <div className="bg-[#E5E5E5] border border-gray-300 rounded-xl p-4 sm:p-5 text-left">
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Monthly Sales (MTD)</p>
                    <h4 className="text-2xl sm:text-3xl font-bold text-[#D71920] tracking-tight mt-2 mb-3">{metrics.total_sales}</h4>
                    
                    {/* Progress bar */}
                    <div>
                      <div className="w-full bg-white rounded-full h-3 overflow-hidden p-0.5 shadow-inner">
                        <div 
                          className="bg-[#D71920] h-full rounded-full transition-all duration-500" 
                          style={{ width: `${financials.target_percentage}%` }}
                        />
                      </div>
                      <p className="text-[11px] sm:text-xs text-gray-600 font-medium text-right mt-1.5">{financials.target_percentage}% of Target</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
    </Navbar>
  );
}