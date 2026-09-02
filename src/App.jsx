import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from "./components/Login";
import './App.css';
import Products from "./components/Products";
import About from "./components/About";
import ScrollToTop from './components/ScrollToTop';
import Contact from "./components/Contact";
import Gallery from "./components/Gallery";
import Cocacola from './components/Cocacola';
import AdminDashboard from './components/AdminDashboard';
import Orders from './components/Orders';
import RoutePage from './components/Route';
import Salesmen from './components/Salesmen';
import Shopkeepers from './components/Shopkeepers';


import Salesmen1 from './components/Salesmen1';
import Shopkeeper1 from './components/Shopkeeper1';
import Notification from './components/Notification';
import Settings from './components/Settings';
// import Salesmen2 from './components/Salesmen2';
// import Salesmen3 from './components/Salesmen3';


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/Cocacola" element={<Cocacola />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/routes" element={<RoutePage />} />
        <Route path="/shopkeepers" element={<Shopkeepers />} />
        
        {/* Main Salesmen Page */}
        <Route path="/salesmen" element={<Salesmen />} />
        
        {/* Different Pages for Each Salesman */}
        <Route path="/salesman/:id" element={<Salesmen1 />} />
        <Route path="/shopkeeper/:id" element={<Shopkeeper1 />} />
        <Route path="/shopkeeper1" element={<Shopkeeper1 />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/settings" element={<Settings />} />
        {/* <Route path="/salesmen2" element={<Salesmen2 />} />
        <Route path="/salesmen3" element={<Salesmen3 />} /> */}
      </Routes>
    </Router>
  );
}

export default App;