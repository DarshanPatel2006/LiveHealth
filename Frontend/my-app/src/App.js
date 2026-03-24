import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DiseaseSelect from './pages/DiseaseSelect';
import MedicalNews from './pages/MedicalNews';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import Appointmentpatient from './pages/Appointments'
import Appointmentdoctor from './pages/Appointmentsd'

import { DarkModeProvider } from './components/DarkModeContext';
import Diseasepost from './pages/Diseasepost';

function App() {
  return (
    <DarkModeProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/disease-select" element={<DiseaseSelect />} />
            <Route path="/disease-post" element={<Diseasepost />} />
            <Route path="/DoctorDashboard" element={<DoctorDashboard />} />
            <Route path="/PatientDashboard" element={<PatientDashboard />} />
            <Route path="/patient/news" element={<MedicalNews />} />
            <Route path="/doctor/news" element={<MedicalNews />} />

            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/Appointment-patient" element={<Appointmentpatient />} />
            <Route path="/Appointment-doctor" element={<Appointmentdoctor />} />
            {/* Add routes for 'doctors' and 'recommendations' if implemented */}
          </Routes>
        </BrowserRouter>
      </div>
    </DarkModeProvider>
  );
}

export default App;