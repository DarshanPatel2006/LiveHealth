import React, { useState, useEffect } from "react";
import Navbar from '../components/NavbarDoctor';
import Footer from '../components/Footer';
import { useDarkMode } from '../components/DarkModeContext';
import BASE_URL from "../config";


function Appointmentsd() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const doctorEmail = localStorage.getItem('email') || '';
  const { darkMode } = useDarkMode();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/appointments/?doctor=${doctorEmail}`);
      const data = await res.json();
      setAppointments(data.appointments || []);
    } catch {
      setAppointments([]);
    }
    setLoading(false);
  };

  const updateStatus = async (appt, status) => {
    await fetch(`${BASE_URL}/appointments/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _id: appt._id,
        status,
      }),
    });
    fetchAppointments();
  };

  return (
    <>
      <Navbar />

      <div className="pd2-container mt-5">

        <h1 className="pd2-title">Appointments</h1>

        {loading ? (
          <p>Loading...</p>
        ) : appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <div className="appt-grid">

            {appointments.map((appt) => (
              <div key={appt._id} className="appt-card">

                <h3>{appt.patient}</h3>

                <p><strong>Date:</strong> {appt.date}</p>
                <p><strong>Time:</strong> {appt.time}</p>
                <p><strong>Reason:</strong> {appt.reason}</p>

                <span className={`appt-status ${appt.status.toLowerCase()}`}>
                  {appt.status}
                </span>

                {appt.status === "Pending" && (
                  <div className="appt-actions">
                    <button onClick={() => updateStatus(appt, "Accepted")}>
                      Accept
                    </button>
                    <button onClick={() => updateStatus(appt, "Rejected")}>
                      Reject
                    </button>
                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </div>

      <Footer />
    </>
  );
}

export default Appointmentsd;