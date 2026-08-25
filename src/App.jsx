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
      </Routes>
    </Router>
  );
}

export default App;