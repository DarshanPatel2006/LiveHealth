import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";
import img from "../assets/logo.png";

function NavbarPatient() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="nav2-container">

        {/* LOGO */}
        <div className="nav2-left">
  <img src={img} alt="logo" />
</div>

{/* CENTER TITLE */}
<div className="nav2-center">
  <h2 className="pd2-title">Jeevixa</h2>
</div>

        {/* LINKS */}
        <div className="nav2-links">

          {/* Desktop Links (UNCHANGED) */}
          <NavLink to="/PatientDashboard">Home</NavLink>
          <NavLink to="/disease-select">Diagnosis</NavLink>
          <NavLink to="/Appointment-patient">Appointments</NavLink>
          <NavLink to="/patient/news">News</NavLink>

          <button onClick={() => navigate("/")}>Logout</button>

          {/* Hamburger */}
          <div
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </div>

        </div>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu">
          <NavLink to="/PatientDashboard">Home</NavLink>
          <NavLink to="/disease-select">Diagnosis</NavLink>
          <NavLink to="/Appointment-patient">Appointments</NavLink>
          <NavLink to="/patient/news">News</NavLink>

          <button onClick={() => navigate("/")}>Logout</button>
        </div>
      )}
    </>
  );
}

export default NavbarPatient;