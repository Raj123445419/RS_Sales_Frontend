import React from 'react';
import { BrowserRouter as Router, Routes, Route, ScrollRestoration } from 'react-router-dom';
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
import Salesmen1 from './components/Salesmen1';


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
        <Route path="/Orders" element={<Orders />} />
        <Route path="/routes" element={<RoutePage />} />
        <Route path="/Routes" element={<RoutePage />} />
        <Route path="/route" element={<RoutePage />} />
        <Route path="/Route" element={<RoutePage />} />
        <Route path="/salesmen" element={<Salesmen />} />
        <Route path="/salesmen1" element={<Salesmen1 />} />

      </Routes>
    </Router>
  );
}

export default App;