import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import img from '../assets/logo.png'

function NavbarHome() {
  const navigate = useNavigate();

  return (
    <div className="nav3-container">

      {/* LEFT */}
      <div className="nav3-left">
        <img
          src= {img}
          alt="logo"
        />
      </div>

      {/* CENTER TITLE */}
      <div className="nav3-center">
        <h2 className="pd2-title">Jeevixa</h2>
      </div>

      {/* RIGHT */}
      <div className="nav3-right">
        <button onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="signup" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>

    </div>
  );
}

export default NavbarHome;