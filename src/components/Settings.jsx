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

// Settings Specific Icons
import personalProfileIcon from '../assets/personal profile.svg';
import shieldIcon from '../assets/Shild.svg';
import lockIcon from '../assets/Lock.svg';
import rightLineIcon from '../assets/rightLine.svg';
import person from '../assets/icon (13).svg';
import Dropdown from '../assets/Dropdown.svg';
import eyeOffIcon from '../assets/Eye off.svg';

export default function Settings() {
  const [activeNav, setActiveNav] = useState('Settings');
  const [activeCategory, setActiveCategory] = useState('Personal Settings');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'Super Administrator',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(() => localStorage.getItem('global_company_logo') || null);
  const [baseCurrency, setBaseCurrency] = useState('Indian Rupee [INR]');
  const [timeZone, setTimeZone] = useState('Asia/Kolkata [IST]');
  const [generalNotifications, setGeneralNotifications] = useState({
    email: true,
    sms: false,
    inApp: true,
  });

  // Security State
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);

  // Roles & Permissions Matrix State
  const [permissions, setPermissions] = useState([
    { permission: 'View Dashboard', admin: true, salesmen: true, shopkeeper: true },
    { permission: 'Manage Shops', admin: true, salesmen: false, shopkeeper: false },
    { permission: 'Edit Products', admin: true, salesmen: true, shopkeeper: false },
    { permission: 'Process Payments', admin: true, salesmen: true, shopkeeper: true },
    { permission: 'System Settings', admin: true, salesmen: false, shopkeeper: false },
  ]);

  // Fetch initial profile & permissions data from backend
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/v1/settings/')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success) {
          if (data.profile) {
            setFormData({
              fullName: data.profile.fullName || '',
              email: data.profile.email || '',
              phone: data.profile.phone || '',
              role: data.profile.role || 'Super Administrator',
            });
          }
          if (data.permissions) {
            setPermissions(data.permissions);
          }
          if (data.is2FAEnabled !== undefined) {
            setIs2FAEnabled(data.is2FAEnabled);
          }
          if (data.baseCurrency) {
            setBaseCurrency(data.baseCurrency);
          }
          if (data.timeZone) {
            setTimeZone(data.timeZone);
          }
          if (data.generalNotifications) {
            setGeneralNotifications(data.generalNotifications);
          }
          if (data.companyLogo) {
            setCompanyLogo(data.companyLogo);
          }
        }
      })
      .catch((err) => console.error("Failed to fetch settings:", err));
  }, []);

  const togglePermission = (index, role) => {
    const updatedPermissions = permissions.map((row, idx) =>
      idx === index ? { ...row, [role]: !row[role] } : row
    );
    setPermissions(updatedPermissions);

    // Save permissions to backend
    fetch('http://127.0.0.1:8000/api/v1/settings/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'permissions', permissions: updatedPermissions }),
    }).catch(err => console.error("Error saving permissions:", err));
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

  const settingsCategories = [
    { name: 'Personal Settings', icon: person },
    { name: 'Roles & Permissions', icon: shieldIcon },
    { name: 'General Settings', icon: settingsIcon },
    { name: 'Security', icon: lockIcon },
  ];

  const handleLogout = () => {
    localStorage.removeItem('shopzee_user');
    navigate('/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleDiscardPhoto = () => {
    setProfileImage(null);
  };

  const handleDiscardAll = () => {
    setProfileImage(null);
  };

  const handleCompanyLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCompanyLogo(imageUrl);
      localStorage.setItem('global_company_logo', imageUrl);

      fetch('http://127.0.0.1:8000/api/v1/settings/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logo', logoUrl: imageUrl }),
      }).catch((err) => console.error("Error updating logo:", err));
    }
  };

  const toggleNotification = (key) => {
    const updated = { ...generalNotifications, [key]: !generalNotifications[key] };
    setGeneralNotifications(updated);

    fetch('http://127.0.0.1:8000/api/v1/settings/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'notifications', notifications: updated }),
    }).catch((err) => console.error("Error saving notifications:", err));
  };

  const handleCurrencyChange = (val) => {
    setBaseCurrency(val);
    fetch('http://127.0.0.1:8000/api/v1/settings/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'localization', baseCurrency: val, timeZone }),
    }).catch(err => console.error("Error saving currency:", err));
  };

  const handleTimeZoneChange = (val) => {
    setTimeZone(val);
    fetch('http://127.0.0.1:8000/api/v1/settings/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'localization', baseCurrency, timeZone: val }),
    }).catch(err => console.error("Error saving timezone:", err));
  };

  const handleSave = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    fetch('http://127.0.0.1:8000/api/v1/settings/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'profile',
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        baseCurrency,
        timeZone,
        generalNotifications,
        companyLogo,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('All changes saved successfully and updated in Admin Panel!');
        } else {
          alert('Failed to save settings: ' + (data.error || 'Unknown error'));
        }
      })
      .catch((err) => console.error("Error saving settings:", err));
  };

  const handleUpdatePassword = () => {
    if (!securityData.currentPassword || !securityData.newPassword || !securityData.confirmPassword) {
      alert('Please fill in all password fields!');
      return;
    }

    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('New password and confirm password do not match!');
      return;
    }

    fetch('http://127.0.0.1:8000/api/v1/settings/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'password',
        currentPassword: securityData.currentPassword,
        newPassword: securityData.newPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('Password updated successfully in database!');
          setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } else {
          alert('Failed to update password: ' + (data.error || 'Unknown error'));
        }
      })
      .catch((err) => console.error("Error updating password:", err));
  };

  const scrollToSection = (catName) => {
    setActiveCategory(catName);
    const idMap = {
      'Personal Settings': 'personal-settings',
      'Roles & Permissions': 'roles-permissions',
      'General Settings': 'general-settings',
      'Security': 'security',
    };
    const el = document.getElementById(idMap[catName]);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
          <button
            type="button"
            onClick={() => navigate('/notifications')}
            className="p-1 hover:opacity-85 transition cursor-pointer"
            aria-label="Notifications"
          >
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
        
        {/* SIDEBAR NAVIGATION */}
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
                    if (item.path && item.path !== '#' && item.path !== '/settings') navigate(item.path);
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
            
            {/* Top Page Header & Global Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Settings</h1>
                <p className="text-xs sm:text-sm text-gray-500 font-normal">
                  Manage your account and system preferences
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={handleDiscardAll}
                  className="text-[#D71920] border border-gray-300 bg-white hover:bg-gray-50 px-6 py-2 rounded-lg text-xs sm:text-sm font-medium transition cursor-pointer shadow-2xs"
                >
                  Discard
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-[#D71920] hover:bg-[#B9151B] text-white px-6 py-2 rounded-lg text-xs sm:text-sm font-medium transition cursor-pointer shadow-sm"
                >
                  Save All Changes
                </button>
              </div>
            </div>

            {/* TWO COLUMNS SETTINGS LAYOUT */}
            <div className="flex flex-col lg:flex-row items-start gap-6 pt-1">
              
              {/* LEFT COLUMN: Settings Categories */}
              <div className="w-full lg:w-72 space-y-3.5 shrink-0">
                {settingsCategories.map((cat) => {
                  const isActive = activeCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => scrollToSection(cat.name)}
                      className={`w-full bg-white rounded-2xl p-4 sm:p-5 border transition-all duration-200 flex items-center space-x-4 cursor-pointer text-left ${
                        isActive
                          ? 'border-gray-300 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 shadow-2xs'
                      }`}
                    >
                      <div className="w-6 h-6 flex items-center justify-center shrink-0">
                        <img src={cat.icon} alt={cat.name} className="w-5 h-5 object-contain" />
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-gray-900 leading-tight">
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* RIGHT COLUMN: Settings Content Panels */}
              <div className="flex-1 w-full space-y-6 text-left">
                
                {/* 1. PERSONAL SETTINGS PANEL */}
                <div id="personal-settings" className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6 sm:space-y-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    Personal Settings
                  </h2>

                  <div className="flex items-center space-x-5 sm:space-x-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#C8BCB3] overflow-hidden flex items-center justify-center shrink-0 border border-gray-200">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <img src={personalProfileIcon} alt="Profile" className="w-9 h-9 sm:w-11 sm:h-11 object-contain" />
                      )}
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                        Profile Photo
                      </h4>
                      <div className="flex items-center space-x-3">
                        <label className="bg-[#D71920] hover:bg-[#B9151B] text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-lg cursor-pointer transition shadow-sm inline-block">
                          <span>Upload Photo</span>
                          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>
                        <button
                          type="button"
                          onClick={handleDiscardPhoto}
                          className="text-[#D71920] border border-gray-300 bg-white hover:bg-gray-50 text-xs sm:text-sm font-medium px-4 py-2 rounded-lg cursor-pointer transition shadow-2xs"
                        >
                          Discard
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pt-2">
                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm font-semibold text-gray-900 block">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-gray-800 bg-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm font-semibold text-gray-900 block">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-gray-800 bg-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm font-semibold text-gray-900 block">Phone Number</label>
                      <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white">
                        <span className="px-3.5 py-2.5 bg-gray-50 text-gray-700 text-xs sm:text-sm border-r border-gray-300">+91</span>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 text-xs sm:text-sm text-gray-800 bg-transparent"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm font-semibold text-gray-900 block">Role</label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        readOnly
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-gray-700 bg-gray-50/50"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={handleSave}
                      className="bg-[#D71920] hover:bg-[#B9151B] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-lg shadow-sm cursor-pointer"
                    >
                      Save Profile
                    </button>
                  </div>
                </div>

                {/* 2. ROLES & PERMISSIONS PANEL */}
                <div id="roles-permissions" className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    Roles & Permissions
                  </h2>

                  <div className="w-full overflow-x-auto rounded-xl border border-gray-300">
                    <table className="w-full text-center border-collapse min-w-[520px]">
                      <thead>
                        <tr className="bg-[#D9D9D9] text-gray-900 text-xs sm:text-sm font-bold">
                          <th className="py-4 px-6 text-left">Permission</th>
                          <th className="py-4 px-6 text-center">Admin</th>
                          <th className="py-4 px-6 text-center">Salesmen</th>
                          <th className="py-4 px-6 text-center">Shopkeeper</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-xs sm:text-sm font-medium text-gray-800 bg-white">
                        {permissions.map((item, idx) => (
                          <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                            <td className="py-4 px-6 text-left text-gray-900 font-semibold text-xs sm:text-sm">
                              {item.permission}
                            </td>
                            <td className="py-4 px-6 text-center">
                              <button
                                type="button"
                                onClick={() => togglePermission(idx, 'admin')}
                                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-[3px] flex items-center justify-center transition cursor-pointer mx-auto ${
                                  item.admin ? 'bg-[#F1898F]' : 'bg-[#BDBDBD]'
                                }`}
                              >
                                {item.admin && <img src={rightLineIcon} alt="checked" className="w-3.5 h-2.5 object-contain" />}
                              </button>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <button
                                type="button"
                                onClick={() => togglePermission(idx, 'salesmen')}
                                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-[3px] flex items-center justify-center transition cursor-pointer mx-auto ${
                                  item.salesmen ? 'bg-[#F1898F]' : 'bg-[#BDBDBD]'
                                }`}
                              >
                                {item.salesmen && <img src={rightLineIcon} alt="checked" className="w-3.5 h-2.5 object-contain" />}
                              </button>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <button
                                type="button"
                                onClick={() => togglePermission(idx, 'shopkeeper')}
                                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-[3px] flex items-center justify-center transition cursor-pointer mx-auto ${
                                  item.shopkeeper ? 'bg-[#F1898F]' : 'bg-[#BDBDBD]'
                                }`}
                              >
                                {item.shopkeeper && <img src={rightLineIcon} alt="checked" className="w-3.5 h-2.5 object-contain" />}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 3. GENERAL SETTINGS PANEL */}
                <div id="general-settings" className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6 text-left">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">General Settings</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 pt-1">
                    
                    {/* Left Column: Localization & Brand Identity */}
                    <div className="space-y-4">
                      <div className="border-b border-gray-200 pb-2">
                        <span className="text-xs sm:text-sm font-semibold text-gray-800">Localization</span>
                      </div>

                      {/* Base Currency */}
                      <div className="space-y-1.5">
                        <label className="text-xs sm:text-sm font-bold text-gray-900 block">Base Currency</label>
                        <div className="relative">
                          <select
                            value={baseCurrency}
                            onChange={(e) => handleCurrencyChange(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-800 bg-white focus:outline-none focus:border-gray-400 appearance-none pr-10 cursor-pointer transition"
                          >
                            <option value="Indian Rupee [INR]">Indian Rupee [INR]</option>
                            <option value="US Dollar [USD]">US Dollar [USD]</option>
                            <option value="Euro [EUR]">Euro [EUR]</option>
                            <option value="British Pound [GBP]">British Pound [GBP]</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Time Zone */}
                      <div className="space-y-1.5">
                        <label className="text-xs sm:text-sm font-bold text-gray-900 block">Time Zone</label>
                        <div className="relative">
                          <select
                            value={timeZone}
                            onChange={(e) => handleTimeZoneChange(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-800 bg-white focus:outline-none focus:border-gray-400 appearance-none pr-10 cursor-pointer transition"
                          >
                            <option value="Asia/Kolkata [IST]">Asia/Kolkata [IST]</option>
                            <option value="UTC">UTC</option>
                            <option value="America/New_York [EST]">America/New_York [EST]</option>
                            <option value="Europe/London [GMT]">Europe/London [GMT]</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Brand Identity */}
                      <div className="pt-2 space-y-2.5">
                        <label className="text-xs sm:text-sm font-bold text-gray-900 block">Brand Identity</label>
                        <div className="flex items-center space-x-4">
                          {/* Logo Preview Container */}
                          <div className="w-24 h-14 rounded-md bg-[#C8BCB3] overflow-hidden flex items-center justify-center shrink-0 border border-gray-200 shadow-2xs">
                            {companyLogo ? (
                              <img src={companyLogo} alt="Company Logo" className="w-full h-full object-contain p-1" />
                            ) : (
                              <span className="text-xs sm:text-sm font-medium text-gray-800">Logo</span>
                            )}
                          </div>

                          {/* Company Logo Action */}
                          <div className="space-y-1.5">
                            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight">Company Logo</h4>
                            <label className="bg-[#D71920] hover:bg-[#B9151B] text-white text-xs font-semibold px-4 py-1.5 rounded-md cursor-pointer transition shadow-2xs inline-block">
                              <span>Update Logo</span>
                              <input type="file" accept="image/*" onChange={handleCompanyLogoUpload} className="hidden" />
                            </label>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Right Column: Notifications */}
                    <div className="space-y-4">
                      <div className="border-b border-gray-200 pb-2">
                        <span className="text-xs sm:text-sm font-semibold text-gray-800">Notifications</span>
                      </div>

                      <div className="space-y-4 pt-1">
                        {/* Email Notifications */}
                        <div
                          onClick={() => toggleNotification('email')}
                          className="flex items-center space-x-3.5 cursor-pointer select-none group"
                        >
                          <div
                            className={`w-5 h-5 rounded-[3px] flex items-center justify-center transition cursor-pointer ${
                              generalNotifications.email ? 'bg-[#F1898F]' : 'bg-[#BDBDBD]'
                            }`}
                          >
                            {generalNotifications.email && (
                              <img src={rightLineIcon} alt="checked" className="w-3.5 h-2.5 object-contain" />
                            )}
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-gray-800">
                            Email Notifications
                          </span>
                        </div>

                        {/* SMS Alerts */}
                        <div
                          onClick={() => toggleNotification('sms')}
                          className="flex items-center space-x-3.5 cursor-pointer select-none group"
                        >
                          <div
                            className={`w-5 h-5 rounded-[3px] flex items-center justify-center transition cursor-pointer ${
                              generalNotifications.sms ? 'bg-[#F1898F]' : 'bg-[#BDBDBD]'
                            }`}
                          >
                            {generalNotifications.sms && (
                              <img src={rightLineIcon} alt="checked" className="w-3.5 h-2.5 object-contain" />
                            )}
                          </div>
                          <div className="text-xs sm:text-sm">
                            <span className="font-semibold text-gray-800">SMS Alerts </span>
                            <span className="text-gray-400 font-normal">(Critical Only)</span>
                          </div>
                        </div>

                        {/* In-App Notifications */}
                        <div
                          onClick={() => toggleNotification('inApp')}
                          className="flex items-center space-x-3.5 cursor-pointer select-none group"
                        >
                          <div
                            className={`w-5 h-5 rounded-[3px] flex items-center justify-center transition cursor-pointer ${
                              generalNotifications.inApp ? 'bg-[#F1898F]' : 'bg-[#BDBDBD]'
                            }`}
                          >
                            {generalNotifications.inApp && (
                              <img src={rightLineIcon} alt="checked" className="w-3.5 h-2.5 object-contain" />
                            )}
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-gray-800">
                            In-App Notifications
                          </span>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>

                {/* 4. SECURITY PANEL */}
                <div id="security" className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6 text-left">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Security</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 pt-1">
                    
                    {/* Left Column: Change Password */}
                    <div className="space-y-4">
                      <div className="border-b border-gray-200 pb-2">
                        <span className="text-xs sm:text-sm font-semibold text-gray-800">Change Password</span>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs sm:text-sm font-bold text-gray-900 block">Current Password</label>
                        <div className="relative">
                          <input
                            type={showPassword.current ? 'text' : 'password'}
                            name="currentPassword"
                            placeholder="Current Password"
                            value={securityData.currentPassword}
                            onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400 bg-white pr-12 transition"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => ({ ...prev, current: !prev.current }))}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-600 hover:text-gray-900 cursor-pointer focus:outline-none"
                            aria-label="Toggle Current Password Visibility"
                          >
                            {showPassword.current ? (
                              <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            ) : (
                              <img src={eyeOffIcon} alt="Hide password" className="w-5 h-5 object-contain" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs sm:text-sm font-bold text-gray-900 block">New Password</label>
                        <div className="relative">
                          <input
                            type={showPassword.new ? 'text' : 'password'}
                            name="newPassword"
                            placeholder="New Password"
                            value={securityData.newPassword}
                            onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400 bg-white pr-12 transition"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => ({ ...prev, new: !prev.new }))}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-600 hover:text-gray-900 cursor-pointer focus:outline-none"
                            aria-label="Toggle New Password Visibility"
                          >
                            {showPassword.new ? (
                              <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            ) : (
                              <img src={eyeOffIcon} alt="Hide password" className="w-5 h-5 object-contain" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs sm:text-sm font-bold text-gray-900 block">Confirm Password</label>
                        <div className="relative">
                          <input
                            type={showPassword.confirm ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={securityData.confirmPassword}
                            onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400 bg-white pr-12 transition"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => ({ ...prev, confirm: !prev.confirm }))}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-600 hover:text-gray-900 cursor-pointer focus:outline-none"
                            aria-label="Toggle Confirm Password Visibility"
                          >
                            {showPassword.confirm ? (
                              <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            ) : (
                              <img src={eyeOffIcon} alt="Hide password" className="w-5 h-5 object-contain" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={handleUpdatePassword}
                          className="bg-[#D71920] hover:bg-[#B9151B] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm transition cursor-pointer"
                        >
                          Update Password
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Two-Factor Authentication */}
                    <div className="space-y-4">
                      <div className="border-b border-gray-200 pb-2">
                        <span className="text-xs sm:text-sm font-semibold text-gray-800">Two-Factor Authentication</span>
                      </div>

                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-md">
                        Add an extra layer of security to your account by enabling 2FA. You will receive a code via SMS or Authenticator app when logging in.
                      </p>

                      <div className="border border-gray-300 rounded-full px-5 py-2.5 flex items-center justify-between max-w-sm bg-white shadow-2xs mt-4">
                        <span className="text-xs sm:text-sm font-normal text-gray-800">
                          Authenticator App
                        </span>
                        
                        <button
                          type="button"
                          onClick={() => {
                            const nextState = !is2FAEnabled;
                            setIs2FAEnabled(nextState);
                            fetch('http://127.0.0.1:8000/api/v1/settings/', {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ action: '2fa', is2FAEnabled: nextState }),
                            }).catch((err) => console.error("Error updating 2FA:", err));
                          }}
                          className={`w-10 h-5.5 rounded-full border transition-colors flex items-center p-0.5 cursor-pointer focus:outline-none ${
                            is2FAEnabled
                              ? 'bg-gray-100 border-gray-400 justify-end'
                              : 'bg-gray-100 border-gray-300 justify-start'
                          }`}
                          aria-label="Toggle Authenticator App 2FA"
                        >
                          <div
                            className={`w-4 h-4 rounded-full transition-transform ${
                              is2FAEnabled ? 'bg-[#4A4A4A]' : 'bg-gray-400'
                            }`}
                          />
                        </button>
                      </div>

                    </div>

                  </div>
                </div>

              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}