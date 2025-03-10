import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { FirstTimeVisitor } from './pages/FirstTimeVisitor';
import { EntryPoint } from './pages/EntryPoint';
import { Welcome } from './pages/Welcome';
import { MDAC } from './pages/MDAC';
import { AutogateCheck } from './pages/AutogateCheck';
import { AutogateEligible } from './pages/AutogateEligible';
import { AutogateIneligible } from './pages/AutogateIneligible';
import { WelcomeToKL } from './pages/WelcomeToKL';
import { SingaporePassportCheck } from './pages/SingaporePassportCheck';
import { JBAutogateEligible } from './pages/JBAutogateEligible';
import { JBAutogateIneligible } from './pages/JBAutogateIneligible';
import { WelcomeToJB } from './pages/WelcomeToJB';
import { PenangAutogate } from './pages/PenangAutogate';
import { WelcomeToPenang } from './pages/WelcomeToPenang';
import { OtherEntryPoints } from './pages/OtherEntryPoints';
import { WelcomeToMalaysia } from './pages/WelcomeToMalaysia';
import { WelcomeBack } from './pages/WelcomeBack';
import { VisaCheck } from './pages/VisaCheck';
import { VisaQuestion } from './pages/VisaQuestion';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/first-time" element={<FirstTimeVisitor />} />
        <Route path="/entry-point" element={<EntryPoint />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/welcome-back" element={<WelcomeBack />} />
        <Route path="/mdac" element={<MDAC />} />
        <Route path="/visa-check" element={<VisaCheck />} />
        <Route path="/visa-question" element={<VisaQuestion />} />
        <Route path="/autogate-check" element={<AutogateCheck />} />
        <Route path="/autogate-eligible" element={<AutogateEligible />} />
        <Route path="/autogate-ineligible" element={<AutogateIneligible />} />
        <Route path="/welcome-to-kl" element={<WelcomeToKL />} />
        <Route path="/singapore-passport-check" element={<SingaporePassportCheck />} />
        <Route path="/jb-autogate-eligible" element={<JBAutogateEligible />} />
        <Route path="/jb-autogate-ineligible" element={<JBAutogateIneligible />} />
        <Route path="/welcome-to-jb" element={<WelcomeToJB />} />
        <Route path="/penang-autogate" element={<PenangAutogate />} />
        <Route path="/welcome-to-penang" element={<WelcomeToPenang />} />
        <Route path="/other-entry-points" element={<OtherEntryPoints />} />
        <Route path="/welcome-to-malaysia" element={<WelcomeToMalaysia />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App