import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Beginner from './pages/Beginner';
import Intermediate from './pages/Intermediate';
import Advanced from './pages/Advanced';
import About from './pages/About';

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/beginner" element={<Beginner />} />
        <Route path="/About" element={<About/>} />
        <Route path="/Intermediate" element={<Intermediate />} />
        <Route path="/Advanced" element={<Advanced />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
