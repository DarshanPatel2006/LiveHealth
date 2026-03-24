import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";
import img from '../assets/logo.png'


function NavbarDoctor() {
  const navigate = useNavigate();
  

  return (
    <div className="nav2-container">

      {/* LEFT */}
      <div className="nav2-left">
        <img
          src= {img}         
          alt="doctor"
        />
        <span>Jeevixa
        </span>
      </div>

      {/* LINKS */}
      <div className="nav2-links">

        <NavLink to="/DoctorDashboard">Dashboard</NavLink>
        <NavLink to="/disease-post">Disease Post</NavLink>
        <NavLink to="/Appointment-doctor">Appointments</NavLink>
        <NavLink to="/doctor/news">News</NavLink>

        <button onClick={() => navigate("/")}>
          Logout
        </button>

      </div>

    </div>
  );
}

export default NavbarDoctor;