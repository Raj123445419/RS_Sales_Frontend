import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Common Components
import ScrollToTop from './components/Common/ScrollToTop';
import Home from './components/Common/Home';
import About from './components/Common/About';
import Products from './components/Common/Products';
import Contact from './components/Common/Contact';
import Gallery from './components/Common/Gallery';
import Cocacola from './components/Common/Cocacola';
import Login from './components/Common/Login';

// Admin Components
import AdminDashboard from './components/Admin/AdminDashboard';
import Orders from './components/Admin/Orders';
import RoutePage from './components/Admin/Route';
import Salesmen from './components/Admin/Salesmen';
import Salesmen1 from './components/Admin/Salesmen1';
import Shopkeepers from './components/Admin/Shopkeepers';
import Shopkeeper1 from './components/Admin/Shopkeeper1';
import Notification from './components/Admin/Notification';
import Settings from './components/Admin/Settings';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/Cocacola" element={<Cocacola />} />
        <Route path="/cocacola" element={<Cocacola />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard Routes */}
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/routes" element={<RoutePage />} />
        <Route path="/route" element={<RoutePage />} />
        <Route path="/salesmen" element={<Salesmen />} />
        <Route path="/salesman/:id" element={<Salesmen1 />} />
        <Route path="/salesman1" element={<Salesmen1 />} />
        <Route path="/shopkeepers" element={<Shopkeepers />} />
        <Route path="/shopkeeper/:id" element={<Shopkeeper1 />} />
        <Route path="/shopkeeper1" element={<Shopkeeper1 />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;