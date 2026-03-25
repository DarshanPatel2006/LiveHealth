import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";
import img from "../assets/logo.png";

function NavbarDoctor() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="nav2-container">

        {/* LEFT */}
        <div className="nav2-left">
          <img src={img} alt="doctor" />
        </div>

        {/* CENTER TITLE */}
        <div className="nav2-center">
          <h2 className="pd2-title">Jeevixa</h2>
        </div>

        {/* LINKS */}
        <div className="nav2-links">

          {/* Desktop links */}
          <NavLink to="/DoctorDashboard">Dashboard</NavLink>
          <NavLink to="/disease-post">Disease Post</NavLink>
          <NavLink to="/Appointment-doctor">Appointments</NavLink>
          <NavLink to="/doctor/news">News</NavLink>

          <button onClick={() => navigate("/")}>
            Logout
          </button>

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
          <NavLink to="/DoctorDashboard">Dashboard</NavLink>
          <NavLink to="/disease-post">Disease Post</NavLink>
          <NavLink to="/Appointment-doctor">Appointments</NavLink>
          <NavLink to="/doctor/news">News</NavLink>

          <button onClick={() => navigate("/")}>
            Logout
          </button>
        </div>
      )}
    </>
  );
}

export default NavbarDoctor;