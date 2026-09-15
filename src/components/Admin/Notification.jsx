import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// Page-specific Icons
import NotificationStar from '../../assets/NotificationStar.svg';
import StarGold from '../../assets/StarGold.svg';
import Dropdown from '../../assets/Dropdown.svg';
import sIcon from '../../assets/sIcon.svg';

export default function Notification() {
  const [activeTab, setActiveTab] = useState('All'); // 'All' | 'Unread' | 'Important'
  const [timeFilter, setTimeFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Notifications state from backend
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications from backend API
  const fetchNotifications = () => {
    fetch(`http://127.0.0.1:8000/api/v1/notifications-page/?tab=${encodeURIComponent(activeTab)}&timeFilter=${encodeURIComponent(timeFilter)}&search=${encodeURIComponent(searchQuery)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && data.notifications) {
          setNotifications(data.notifications);
        }
      })
      .catch((err) => console.error("Failed to fetch notifications:", err));
  };

  useEffect(() => {
    fetchNotifications();
  }, [activeTab, timeFilter, searchQuery]);

  // Toggle star / important status
  const toggleStar = (e, id) => {
    e.stopPropagation();
    const item = notifications.find(n => n.id === id);
    if (!item) return;

    const newImportance = !item.isImportant;

    fetch(`http://127.0.0.1:8000/api/v1/notification-action/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isImportant: newImportance })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setNotifications((prev) =>
            prev.map((n) => n.id === id ? { ...n, isImportant: newImportance } : n)
          );
        }
      })
      .catch(err => console.error("Error updating importance:", err));
  };

  // Toggle read / unread status on click
  const toggleReadStatus = (id) => {
    const item = notifications.find(n => n.id === id);
    if (!item) return;

    const newReadStatus = !item.isRead;

    fetch(`http://127.0.0.1:8000/api/v1/notification-action/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isRead: newReadStatus })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setNotifications((prev) =>
            prev.map((n) => n.id === id ? { ...n, isRead: newReadStatus } : n)
          );
        }
      })
      .catch(err => console.error("Error updating read status:", err));
  };

  const groups = Array.from(new Set(notifications.map((n) => n.group)));

  return (
    <Navbar activeNav="Notifications">
      <div className="max-w-7xl mx-auto space-y-6 text-left">
            
            {/* Page Title & Subtitle */}
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Notifications</h1>
              <p className="text-xs sm:text-sm text-gray-500 font-normal">
                Stay updated with the latest activities, alerts, and updates.
              </p>
            </div>

            {/* Tabs, Time Filter & Search Bar Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-3">
              
              {/* Left Tabs */}
              <div className="flex items-center space-x-8">
                {['All', 'Unread', 'Important'].map((tab) => {
                  const isCurrent = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`text-sm sm:text-base font-semibold pb-3 -mb-3.5 transition cursor-pointer relative ${
                        isCurrent
                          ? 'text-gray-900 font-bold border-b-2 border-[#D71920]'
                          : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              {/* Right: Dropdown & Search Bar */}
              <div className="flex flex-wrap items-center gap-3">
                
                {/* Time Filter Dropdown */}
                <div className="relative inline-block">
                  <select
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-lg px-3.5 py-1.5 pr-8 text-xs sm:text-sm font-medium text-gray-700 cursor-pointer shadow-2xs focus:outline-none"
                  >
                    <option value="Today">Today</option>
                    <option value="Yesterday">Yesterday</option>
                    <option value="This Week">This Week</option>
                    <option value="This Month">This Month</option>
                    <option value="All">All Time</option>
                  </select>
                  <img
                    src={Dropdown}
                    alt="dropdown arrow"
                    className="w-2.5 h-2 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none object-contain"
                  />
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-64 md:w-72 border border-gray-300 rounded-full flex items-center px-4 py-2 bg-white shadow-2xs focus-within:border-gray-400 transition-colors">
                  <img src={sIcon} alt="search" className="w-4 h-4 shrink-0 object-contain text-gray-500 mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Notification...."
                    className="text-xs sm:text-sm text-gray-800 outline-none w-full bg-transparent placeholder-gray-400 font-normal"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-gray-400 hover:text-gray-600 text-xs font-bold px-1 cursor-pointer"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* NOTIFICATIONS LIST CONTAINER */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
              
              {groups.length > 0 ? (
                groups.map((groupName) => {
                  const groupItems = notifications.filter((n) => n.group === groupName);
                  if (groupItems.length === 0) return null;

                  return (
                    <div key={groupName} className="space-y-3">
                      <h3 className="text-sm font-bold text-gray-900 tracking-tight">{groupName}</h3>

                      <div className="space-y-3 sm:space-y-4">
                        {groupItems.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => toggleReadStatus(item.id)}
                            className="border border-gray-200 rounded-2xl p-4 sm:p-5 bg-white flex items-center justify-between transition hover:border-gray-300 hover:shadow-2xs cursor-pointer group"
                          >
                            <div className="flex items-center space-x-4 min-w-0">
                              <div className="w-12 h-12 rounded-full bg-[#FCE8EA] flex items-center justify-center shrink-0">
                                <span className="text-[#D71920] font-bold text-sm sm:text-base">{item.initials}</span>
                              </div>

                              <div className="truncate">
                                <h4
                                  className={`text-sm sm:text-base transition leading-tight ${
                                    item.isRead ? 'text-gray-500 font-semibold' : 'text-gray-900 font-bold'
                                  }`}
                                >
                                  {item.shopName}
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5 truncate">
                                  {item.message}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col items-end justify-between self-stretch shrink-0 pl-3 space-y-3">
                              <div className="flex items-center space-x-2">
                                <span className="text-[11px] sm:text-xs text-gray-400 font-normal whitespace-nowrap">
                                  {item.time}
                                </span>
                                {!item.isRead && (
                                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#4338CA] shrink-0" />
                                )}
                              </div>

                              <button
                                type="button"
                                onClick={(e) => toggleStar(e, item.id)}
                                className="p-1 hover:scale-115 transition transform cursor-pointer"
                                aria-label={item.isImportant ? 'Unstar notification' : 'Star notification'}
                              >
                                <img
                                  src={item.isImportant ? StarGold : NotificationStar}
                                  alt="Star"
                                  className="w-5 h-5 object-contain"
                                />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-gray-400 text-sm">
                  No notifications found.
                </div>
              )}

              

            </div>



          </div>
    </Navbar>
  );
}