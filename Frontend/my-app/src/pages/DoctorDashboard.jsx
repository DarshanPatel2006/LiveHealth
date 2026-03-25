import React from "react";
import NavbarDoctor from "../components/NavbarDoctor";
import Footer from "../components/Footer";
import "../App.css";
import img from "../assets/ai-health.jpg";

function DoctorDashboard() {
  return (
    <>
      <NavbarDoctor />

      {/* ✅ SINGLE CONTAINER */}
      <div className="pd2-container">

        {/* TITLE */}
        <h1 className="pd2-title" style={{ marginTop: "100px" }}>
          Doctor Dashboard
        </h1>

        {/* MAIN CARD */}
        <div className="pd2-main-card">
          <div className="pd2-main-text">
            <span className="pd2-tag">Doctor Panel</span>

            <h1 className="pd2-title">Doctor Dashboard</h1>

            <p>
              This dashboard allows you to efficiently manage patient appointments,
              review requests, communicate with patients, and publish verified
              medical knowledge to guide them better.
            </p>

            <ul className="pd2-list">
              <li>✔ Handle patient requests in real-time</li>
              <li>✔ Provide guidance through disease recommendations</li>
              <li>✔ Maintain professional digital workflow</li>
            </ul>

            <a href="/Appointment-doctor" className="pd2-btn">
              Manage Appointments →
            </a>
          </div>

          <div className="pd2-main-img">
            <img src={img} alt="AI Health" />
          </div>
        </div>

        {/* GRID */}
        <div className="pd2-grid">

          <div className="pd2-card">
            <span className="pd2-tag">Appointments</span>
            <h2>Patient Requests</h2>
            <p>View, accept or reject patient bookings.</p>

            <ul className="pd2-list">
              <li>✔ View all incoming requests</li>
              <li>✔ Accept or reject instantly</li>
              <li>✔ Track appointment status</li>
            </ul>

            <a href="/Appointment-doctor" className="pd2-link">Open →</a>
          </div>

          <div className="pd2-card">
            <span className="pd2-tag">Medical Content</span>
            <h2>Disease Recommendations</h2>

            <p>Add verified disease info for patients.</p>

            <ul className="pd2-list">
              <li>✔ Publish disease info</li>
              <li>✔ Add symptoms & causes</li>
              <li>✔ Help patients understand</li>
            </ul>

            <a href="/disease-post" className="pd2-link">Post →</a>
          </div>

        </div>

        {/* INFO */}
        <div className="pd2-info">
          <h2>Doctor Capabilities</h2>

          <div className="pd2-info-grid">
            <div>✔ Manage appointments</div>
            <div>✔ Provide recommendations</div>
            <div>✔ Improve communication</div>
            <div>✔ Deliver better care</div>
          </div>
        </div>

        {/* TEAM */}
        <div className="pd2-team">

          <div className="pd2-team-card">
            <h3>Appointments</h3>
          </div>

          <div className="pd2-team-card">
            <h3>Patients</h3>
          </div>

          <div className="pd2-team-card">
            <h3>Reports</h3>
          </div>

          <div className="pd2-team-card highlight">
            <h3>More Tools →</h3>
          </div>

        </div>

        <Footer />
      </div>
    </>
  );
}

export default DoctorDashboard;