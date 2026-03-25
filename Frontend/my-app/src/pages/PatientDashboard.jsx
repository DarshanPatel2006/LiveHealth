import React from "react";
import NavbarPatient from "../components/NavbarPatient";
import Footer from "../components/Footer";
import "../App.css";
import img from "../assets/ai-health.jpg";
import BASE_URL from "../config";

import { useNavigate } from "react-router-dom";

function PatientDashboard() {
  const navigate = useNavigate();
  return (
    <>
      <NavbarPatient />
      <h1 className="pd2-title mt-5 pt-5 px-5">
        Patient Dashboard
      </h1>
      <div className="pd2-container">

        {/* 🔥 AI DIAGNOSIS (FULL WIDTH) */}
        <div className="pd2-main-card">
          <div className="pd2-main-text">
            <span className="pd2-tag">AI Feature</span>
            <h1>AI Health Diagnosis</h1>
            <p>
              Detect diseases instantly using AI. Enter symptoms and get accurate
              predictions with treatment suggestions.
            </p>

            <a href="/disease-select" className="pd2-btn">
              Start Diagnosis →
            </a>
          </div>

          <div className="pd2-main-img">
            <img src={img} alt="AI Health" />
          </div>
        </div>

        {/* 🔥 TWO CARDS */}
        <div className="pd2-grid">

          {/* HEALTH STATS */}
          <div className="pd2-card">
            <span className="pd2-tag">Health Stats</span>
            <h2>Weather & Health Insights</h2>
            <p>
              Based on current weather, stay hydrated, avoid pollution, and
              maintain a balanced routine.
            </p>

            <ul>
              <li>🌡 Temperature: 24°C</li>
              <li>💧 Humidity: 68%</li>
              <li>🌫 Air Quality: Moderate</li>
            </ul>
          </div>

          {/* APPOINTMENTS */}
          <div className="pd2-card">
            <span className="pd2-tag">Appointments</span>
            <h2>Doctor Consultation</h2>
            <p>
              Book appointments with verified doctors. Choose time, get approval,
              and consult easily.
            </p>

            <ul>
              <li>✔ Select doctor</li>
              <li>✔ Choose date & time</li>
              <li>✔ Get confirmation</li>
            </ul>
          </div>

        </div>

        {/* 🔥 INFO STRIP */}
        <div className="pd2-info">
          <h2>What You Can Do</h2>

          <div className="pd2-info-grid">
            <div>✔ Free disease prediction</div>
            <div>✔ Book doctor appointments</div>
            <div>✔ Track health insights</div>
            <div>✔ Read latest medical news</div>
          </div>
        </div>

        {/* 🔥 TEAM STYLE CARDS */}
        <div className="pd2-team">

          <div className="pd2-team-card">
            <h3>AI System</h3>
          </div>

          <div className="pd2-team-card">
            <h3>Smart Reports</h3>
          </div>

          <div className="pd2-team-card">
            <h3>Doctor Network</h3>
          </div>

          <div
            className="pd2-team-card highlight"
            onClick={() => navigate("/disease-select")}
          >
            <h3>🔍 Explore Diagnosis →</h3>
          </div>

        </div>

        <Footer />
      </div>
    </>
  );
}

export default PatientDashboard;