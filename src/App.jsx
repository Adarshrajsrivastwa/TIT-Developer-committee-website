import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/Theme/ThemeContext.jsx';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/HomePage.jsx';
import About from './pages/About';
import Mentors from './pages/Mentors';
import Events from './pages/Events';
import HallOfFame from './pages/HallOfFame';
import Testimonials from './pages/Testimonials';
import JoinUs from './pages/JoinUs';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/events" element={<Events />} />
            <Route path="/hall-of-fame" element={<HallOfFame />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/join-us" element={<JoinUs />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;