import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import MemoryLane from './components/MemoryLane';
import ReasonsPage from './components/ReasonsPage';
import ApologyLetter from './components/ApologyLetter';
import PromisePage from './components/PromisePage';
import SurprisePage from './components/SurprisePage';
import FloatingHearts from './components/FloatingHearts';
import PhotoGallery from './components/PhotoGallery';
import LoveNavbar from './components/LoveNavbar';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-pink-200">
        <LoveNavbar />
        <FloatingHearts />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/memories" element={<MemoryLane />} />
            <Route path="/reasons" element={<ReasonsPage />} />
            <Route path="/apology" element={<ApologyLetter />} />
            <Route path="/promises" element={<PromisePage />} />
            <Route path="/surprise" element={<SurprisePage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
