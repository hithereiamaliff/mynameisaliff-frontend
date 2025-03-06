import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Welcome } from './pages/Welcome';
import { MDAC } from './pages/MDAC';
import { WelcomeToMalaysia } from './pages/WelcomeToMalaysia';
import { VisaCheck } from './pages/VisaCheck';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/mdac" element={<MDAC />} />
        <Route path="/visa-check" element={<VisaCheck />} />
        <Route path="/welcome-to-malaysia" element={<WelcomeToMalaysia />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App