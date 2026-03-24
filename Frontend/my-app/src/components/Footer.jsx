import React from "react";
import "../App.css";
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

function Footer() {
  return (
    <footer className="footer2">

      <div className="footer2-inner">

        {/* LEFT */}
        <div className="footer2-brand">
          Jeevixa
        </div>

        {/* CENTER */}
        <div className="footer2-copy">
          © {new Date().getFullYear()} Jeevixa
        </div>

        {/* RIGHT */}
        <div className="footer2-links">

          <a href="https://www.linkedin.com/in/darshan-patel-6134a6358" target="_blank" rel="noreferrer" className="f-icon fb">
            <i className="fab fa-linkedin"></i>
          </a>

          <a href="https://x.com/PatelDarsh71640" target="_blank" rel="noreferrer" className="f-icon tw">
            <i className="fab fa-twitter"></i>
          </a>

          <a href="https://github.com/DarshanPatel2006" target="_blank" rel="noreferrer" className="f-icon gh">
            <i className="fab fa-github"></i>
          </a>

        </div>

      </div>

    </footer>
  );
}

export default Footer;