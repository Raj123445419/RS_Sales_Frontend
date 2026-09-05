import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

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

// Page-specific SVGs
import arrowLeftIcon from '../assets/ArrowUpBlack.svg';
import editIcon from '../assets/EditWhite.svg';
import employeeIdIcon from '../assets/UserBlack.svg';
import emailIcon from '../assets/EmailBlack.svg';
import assignedRouteIcon from '../assets/RouteBlack.svg';
import roleIcon from '../assets/BarChartBlack.svg';
import phoneIcon from '../assets/PhoneBlack.svg';
import locationIcon from '../assets/LocationPinBlack.svg';
import statusIcon from '../assets/TargetBlack.svg';
import calendarIcon from '../assets/CalendarBlack.svg';
import totalSalesIcon from '../assets/BarChartBlack.svg';
import ordersBagIcon from '../assets/BagBlack.svg';
import targetBullseyeIcon from '../assets/TargetBlack.svg';

export default function Salesmen1() {
  const { id } = useParams();
  const [activeNav, setActiveNav] = useState('Salesmen');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navigate = useNavigate();

  // Backend States
  const [salesman, setSalesman] = useState(null);
  const [metrics, setMetrics] = useState({ totalSales: '₹0', ordersCompleted: 0, targetAchievement: '0%', targetAmount: '₹0' });
  const [todaysVisits, setTodaysVisits] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  // Edit Profile Modal States
  const [dropdownOptions, setDropdownOptions] = useState({ routes: [], roles: [] });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '', phone: '', role: '', assigned_route: '', status: 'Active' });
  const [isSaving, setIsSaving] = useState(false);

  const fetchSalesmanData = () => {
    fetch(`http://127.0.0.1:8000/api/v1/salesman-detail/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSalesman(data.salesman);
          setMetrics(data.metrics || { totalSales: '₹0', ordersCompleted: 0, targetAchievement: '0%', targetAmount: '₹0' });
          setTodaysVisits(data.todaysVisits || []);
          setRecentOrders(data.recentOrders || []);
          
          if (data.dropdowns) {
            setDropdownOptions(data.dropdowns);
          }

          setEditForm({
            name: data.salesman.name || '',
            email: data.salesman.email || '',
            phone: data.salesman.phone || '', 
            role: data.salesman.role || 'Salesman',         
            assigned_route: data.salesman.assigned_route || 'Unassigned', 
            status: data.salesman.status || 'Active'
          });
        }
      })
      .catch((err) => console.error("Failed to fetch salesman details:", err));
  };

  useEffect(() => {
    if (id) {
      fetchSalesmanData();
    }
  }, [id]);

  // Handle Edit Form Submission
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setIsSaving(true);

    fetch(`http://127.0.0.1:8000/api/v1/salesman-update/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editForm),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSaving(false);
        if (data.success) {
          setIsEditModalOpen(false);
          fetchSalesmanData();
        } else {
          alert('Failed to update profile: ' + (data.error || 'Unknown error'));
        }
      })
      .catch((err) => {
        setIsSaving(false);
        console.error("Error updating profile:", err);
      });
  };

  const getStatusColor = (status) => {
    const s = String(status).toLowerCase();
    if (s === 'completed' || s === 'delivered' || s === 'active') return 'text-[#22A847] font-semibold';
    if (s === 'scheduled' || s === 'processing') return 'text-[#EB9F30] font-semibold';
    if (s === 'pending' || s === 'inactive') return 'text-[#D7262D] font-semibold';
    return 'text-gray-700 font-semibold';
  };

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

  const handleLogout = () => {
    localStorage.removeItem('shopzee_user');
    navigate('/login');
  };

  if (!salesman) {
    return <div className="min-h-screen flex items-center justify-center font-bold text-gray-700">Loading salesman details...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F5F6F8] flex flex-col font-sans">
      {/* TOP HEADER */}
      <header className="w-full h-20 bg-[#181818] text-white px-4 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between shadow-md sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="md:hidden p-1.5 rounded-lg bg-white/10 text-white focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
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
        <aside
          className={`fixed md:sticky top-[58px] md:top-[66px] left-0 z-40 h-[calc(100vh-58px)] md:h-[calc(100vh-66px)] w-64 bg-white border-r border-gray-200 flex flex-col justify-between p-5 transition-transform duration-300 ${
            isMobileNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <nav className="space-y-1.5 text-left">
            {navItems.map((item) => {
              const isActive = activeNav === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    setActiveNav(item.name);
                    setIsMobileNavOpen(false);
                    if (item.path && item.path !== '#') navigate(item.path);
                  }}
                  className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition cursor-pointer ${
                    isActive
                      ? 'text-[#000000] bg-[#76544359] font-bold'
                      : 'text-[#201C18] hover:bg-gray-100/70 hover:text-black'
                  }`}
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
              <div>
                <h4 className="text-sm font-bold text-gray-900 leading-tight">Admin</h4>
                <span className="text-xs text-gray-500 font-normal">Administrator</span>
              </div>
            </div>
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

        {isMobileNavOpen && (
          <div onClick={() => setIsMobileNavOpen(false)} className="fixed inset-0 bg-black/40 z-30 md:hidden" />
        )}

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6 text-left">
            
            {/* TOP BAR */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate('/salesmen')}
                className="p-2 -ml-2 rounded-lg hover:bg-gray-200/60 transition cursor-pointer flex items-center justify-center"
                aria-label="Go Back"
              >
                <img src={arrowLeftIcon} alt="Back" className="w-5 h-5 object-contain" />
              </button>

              <button
                type="button"
                onClick={() => setIsEditModalOpen(true)}
                className="bg-[#D71920] hover:bg-[#B9151B] text-white text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-lg flex items-center space-x-2 shadow-sm transition cursor-pointer"
              >
                <span>Edit profile</span>
                <img src={editIcon} alt="Edit" className="w-4 h-4 object-contain" />
              </button>
            </div>

            {/* SALESMAN DETAILS CARD */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-gray-100 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F4C5C6] flex items-center justify-center text-[#8E2F32] font-bold text-lg sm:text-xl shrink-0">
                  {salesman?.initials || 'RP'}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{salesman?.name}</h2>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">{salesman?.employee_id} | Salesman</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 gap-x-8 text-xs sm:text-sm text-gray-800 pt-2">
                <div className="flex items-center space-x-2.5">
                  <img src={employeeIdIcon} alt="Employee ID" className="w-4 h-4 object-contain shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900">Employee ID:</span>{' '}
                    <span className="font-normal text-gray-700">{salesman?.employee_id}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <img src={emailIcon} alt="Email" className="w-5 h-5 object-contain shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900">Email:</span>{' '}
                    <span className="font-normal text-gray-700 underline underline-offset-2 cursor-pointer">{salesman?.email}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <img src={assignedRouteIcon} alt="Assigned Route" className="w-5 h-5 object-contain shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900">Assigned Route:</span>{' '}
                    <span className="font-normal text-gray-700">{salesman?.assigned_route}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <img src={roleIcon} alt="Role" className="w-5 h-5 object-contain shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900">Role:</span>{' '}
                    <span className="font-normal text-gray-700">{salesman?.role}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <img src={phoneIcon} alt="Phone" className="w-5 h-5 object-contain shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900">Phone:</span>{' '}
                    <span className="font-normal text-gray-700">{salesman?.phone}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <img src={locationIcon} alt="Assigned Area" className="w-5 h-5 object-contain shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900">Assigned Area:</span>{' '}
                    <span className="font-normal text-gray-700">{salesman?.assigned_area}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <img src={statusIcon} alt="Status" className="w-5 h-5 object-contain shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900">Status:</span>{' '}
                    <span className={`font-semibold ${salesman?.status === 'Active' ? 'text-[#22A847]' : 'text-[#D7262D]'}`}>{salesman?.status}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <img src={calendarIcon} alt="Joined Date" className="w-5 h-5 object-contain shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900">Joined Date:</span>{' '}
                    <span className="font-normal text-gray-700">{salesman?.joined_date}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* THREE METRIC CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-gray-100 flex flex-col justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#FCD8D8] flex items-center justify-center shrink-0">
                    <img src={totalSalesIcon} alt="Total Sales" className="w-6 h-6 object-contain" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-700">Total Sales</p>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-0.5">{metrics?.totalSales || '₹0'}</h3>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-gray-100 flex flex-col justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#FDE9C4] flex items-center justify-center shrink-0">
                    <img src={ordersBagIcon} alt="Orders Completed" className="w-6 h-6 object-contain" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-700">Orders Completed</p>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-0.5">{metrics?.ordersCompleted || 0}</h3>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-gray-100 flex flex-col justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#DDD2F3] flex items-center justify-center shrink-0">
                    <img src={targetBullseyeIcon} alt="Target Achievement" className="w-6 h-6 object-contain" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-700">Target Achievement</p>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-0.5">{metrics?.targetAchievement || '0%'}</h3>
                  </div>
                </div>
                <div className="mt-4 pt-1 text-xs font-medium text-gray-500">
                  Target: <span className="font-semibold text-gray-700">{metrics?.targetAmount || '₹0'}</span>
                </div>
              </div>
            </div>

            {/* TODAY'S VISIT TABLE SECTION */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-gray-100 space-y-6 text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Today's Visit</h2>
              <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-center border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-[#D9D9D9] text-gray-900 text-xs sm:text-sm font-bold">
                      <th className="py-3.5 px-4 sm:px-6">Shopkeeper</th>
                      <th className="py-3.5 px-4 sm:px-6">Area</th>
                      <th className="py-3.5 px-4 sm:px-6">Visit Time</th>
                      <th className="py-3.5 px-4 sm:px-6">Order Value</th>
                      <th className="py-3.5 px-4 sm:px-6">Visit Type</th>
                      <th className="py-3.5 px-4 sm:px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-xs sm:text-sm font-medium text-gray-800 bg-white">
                    {todaysVisits.length > 0 ? (
                      todaysVisits.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.shopkeeper}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.area}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.visitTime}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.orderValue}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.visitType}</td>
                          <td className="py-3.5 px-4 sm:px-6"><span className={getStatusColor(item.status)}>{item.status}</span></td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="6" className="text-center py-8 text-gray-500 font-medium">No visits found for today.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RECENT ORDERS TABLE SECTION */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-gray-100 space-y-6 text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Recent Orders</h2>
              <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-center border-collapse min-w-[650px]">
                  <thead>
                    <tr className="bg-[#D9D9D9] text-gray-900 text-xs sm:text-sm font-bold">
                      <th className="py-3.5 px-4 sm:px-6">Order ID</th>
                      <th className="py-3.5 px-4 sm:px-6">Shopkeeper</th>
                      <th className="py-3.5 px-4 sm:px-6">Date</th>
                      <th className="py-3.5 px-4 sm:px-6">Amount</th>
                      <th className="py-3.5 px-4 sm:px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-xs sm:text-sm font-medium text-gray-800 bg-white">
                    {recentOrders.length > 0 ? (
                      recentOrders.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-bold">{item.orderId}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.shopkeeper}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.date}</td>
                          <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium">{item.amount}</td>
                          <td className="py-3.5 px-4 sm:px-6"><span className={getStatusColor(item.status)}>{item.status}</span></td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="5" className="text-center py-8 text-gray-500 font-medium">No recent orders found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-6 text-left shadow-xl">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Edit Salesman Profile</h3>
              <button 
                type="button" 
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={editForm.name} 
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={editForm.email} 
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="text" 
                  value={editForm.phone} 
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Role Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Role</label>
                  <select 
                    value={editForm.role} 
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black bg-white cursor-pointer"
                  >
                    <option value="">Select Role</option>
                    {dropdownOptions.roles.map((roleOpt, idx) => (
                      <option key={idx} value={roleOpt}>{roleOpt}</option>
                    ))}
                  </select>
                </div>

                {/* Assigned Route Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Assigned Route</label>
                  <select 
                    value={editForm.assigned_route} 
                    onChange={(e) => setEditForm({ ...editForm, assigned_route: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black bg-white cursor-pointer"
                  >
                    <option value="">Select Route</option>
                    <option value="Unassigned">Unassigned</option>
                    {dropdownOptions.routes.map((routeOpt, idx) => (
                      <option key={idx} value={routeOpt}>{routeOpt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Status</label>
                <select 
                  value={editForm.status} 
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black bg-white cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  type="button" 
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="bg-[#D71920] hover:bg-[#B9151B] text-white text-xs sm:text-sm font-semibold px-5 py-2 rounded-lg transition cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}