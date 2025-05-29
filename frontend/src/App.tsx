import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Projects from './pages/Projects';
import Statistics from './pages/Statistics';
import GettingStarted from './pages/GettingStarted';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<GettingStarted />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
