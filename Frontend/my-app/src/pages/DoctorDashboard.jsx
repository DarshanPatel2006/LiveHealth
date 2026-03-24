import React from "react";
import NavbarDoctor from "../components/NavbarDoctor";
import Footer from "../components/Footer";
import "../App.css";
import img from "../assets/ai-health.jpg";
import BASE_URL from "../config";


function DoctorDashboard() {
  return (
    <>
      <NavbarDoctor />
      <div className="pd2-container">
      <h1 className="pd2-title mt-5 ">
  Doctor Dashboard
</h1>

</div>

      <div className="pd2-container ">

        {/* 🔥 MAIN CARD (LIKE PATIENT) */}
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

        {/* 🔥 TWO CARDS (SAME AS PATIENT STRUCTURE) */}
        <div className="pd2-grid">

          {/* APPOINTMENTS */}
          <div className="pd2-card">
            <span className="pd2-tag">Appointments</span>

            <h2>Patient Requests</h2>

            <p>
              View, accept or reject patient bookings and send responses directly.
            </p>

            <ul className="pd2-list">
              <li>✔ View all incoming patient requests</li>
              <li>✔ Accept or reject appointments instantly</li>
              <li>✔ Send feedback or instructions to patients</li>
              <li>✔ Track appointment history and status</li>
            </ul>

            <a href="/Appointment-doctor">Open →</a>
          </div>

          {/* DISEASE POST */}
          <div className="pd2-card">
            <span className="pd2-tag">Medical Content</span>

            <h2>Disease Recommendations</h2>

            <p>
              Add verified disease information to educate and guide patients.
            </p>

            <ul className="pd2-list">
              <li>✔ Publish verified disease information</li>
              <li>✔ Add symptoms, causes, and descriptions</li>
              <li>✔ Help patients understand conditions better</li>
              <li>✔ Build trust through expert knowledge</li>
            </ul>

            <a href="/disease-post">Post →</a>
          </div>

        </div>

        {/* 🔥 INFO STRIP */}
        <div className="pd2-info">
          <h2>Doctor Capabilities</h2>

          <div className="pd2-info-grid">
            <div>✔ Manage and respond to patient appointments</div>
            <div>✔ Provide expert medical recommendations</div>
            <div>✔ Help patients understand diseases better</div>
            <div>✔ Improve healthcare communication</div>
            <div>✔ Build a digital medical presence</div>
            <div>✔ Deliver faster and better patient care</div>
          </div>
        </div>

        {/* 🔥 TEAM STYLE (OPTIONAL SAME AS PATIENT) */}
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