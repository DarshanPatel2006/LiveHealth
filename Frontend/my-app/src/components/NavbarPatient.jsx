import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";
import img from '../assets/logo.png'

function NavbarPatient() {
  const navigate = useNavigate();

  return (
    <div className="nav2-container">

      {/* LOGO */}
      <div className="nav2-left">
        <img
          src= {img}
          alt="logo"
        />
        <span>Jeevixa</span>
      </div>

      {/* LINKS */}
      <div className="nav2-links">

        <NavLink to="/PatientDashboard">Home</NavLink>
        <NavLink to="/disease-select">Diagnosis</NavLink>
        <NavLink to="/Appointment-patient">Appointments</NavLink>
        <NavLink to="/patient/news">News</NavLink>

        <button onClick={() => navigate("/")}>
          Logout
        </button>

      </div>

    </div>
  );
}

export default NavbarPatient;