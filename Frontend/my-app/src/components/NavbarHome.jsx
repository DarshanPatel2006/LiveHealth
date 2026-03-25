import React,{ useState} from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import img from '../assets/logo.png'

function NavbarHome() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="nav3-container">
  
        {/* LEFT */}
        <div className="nav3-left">
          <img src={img} alt="logo" />
        </div>
  
        {/* CENTER */}
        <div className="nav3-center">
          <h2 className="pd2-title">Jeevixa</h2>
        </div>
  
        {/* RIGHT */}
        <div className="nav3-right">
  
          {/* Hamburger */}
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>
  
          {/* Desktop buttons */}
          <div className="nav-buttons">
            <button onClick={() => navigate("/login")}>Login</button>
            <button className="signup" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>
  
        </div>
      </div>
  
      {/* MOBILE MENU BELOW NAVBAR */}
      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      )}
    </>
  );
}

export default NavbarHome;