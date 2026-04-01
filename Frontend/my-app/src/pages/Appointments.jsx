import React, { useState, useEffect } from 'react';
import NavbarPatient from '../components/NavbarPatient';
import { useDarkMode } from '../components/DarkModeContext';
import "../App.css";
import BASE_URL from "../config";


function Appointments() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    patient: localStorage.getItem('email') || '',
    doctor: '',
    date: '',
    time: '',
    reason: '',
  });

  const { darkMode } = useDarkMode();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const docRes = await fetch(`${BASE_URL}/doctors/`);
    const docData = await docRes.json();
    setDoctors(docData.doctors || []);

    const apptRes = await fetch(`${BASE_URL}/appointments/?patient=` + form.patient);
    const apptData = await apptRes.json();
    setAppointments(apptData.appointments || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // ✅ Empty check
    if (!form.doctor || !form.date || !form.time || !form.reason) {
      alert("⚠️ Please fill all fields");
      return;
    }
  
    // ✅ Date validation (no past date)
    const selectedDate = new Date(form.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    if (selectedDate < today) {
      alert("❌ Past date allowed nahi hai");
      return;
    }
  
    // ✅ Time validation (8 AM to 10 PM)
    const [hour] = form.time.split(":").map(Number);
  
    if (hour < 8 || hour > 22) {
      alert("⏰ Appointment time 8 AM se 10 PM ke beech hona chahiye");
      return;
    }
  
    try {
      const response = await fetch(`${BASE_URL}/appointments/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("✅ Appointment booked successfully!");
        setForm({
          patient: localStorage.getItem('email') || '',
          doctor: '',
          date: '',
          time: '',
          reason: '',
        });
        fetchData();
      } else {
        alert(data.message || "❌ Failed to book appointment");
      }
    } catch (error) {
      console.error(error);
      alert("🚫 Server error");
    }
  };
  return (
    <>
      <NavbarPatient />

      <div className="pd2-container mt-5">

        {/* 🔥 TITLE */}
        <h1 className="pd2-title">Book Appointment</h1>

        {/* 🔥 DOCTORS */}
        <div className="appt-grid">
          {doctors.map((doc) => (
            <div
              key={doc.email}
              className="appt-card"
              onClick={() => setForm({ ...form, doctor: doc.email })}
            >
              <h3>Dr. {doc.name}</h3>
              <p>{doc.specialty}</p>
            </div>
          ))}
        </div>

        {/* 🔥 FORM */}
        <form onSubmit={handleSubmit} className="dp-form">

          <input value={form.patient} readOnly />

          <select
            value={form.doctor}
            onChange={(e) => setForm({ ...form, doctor: e.target.value })}
          >
            <option>Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc.email} value={doc.email}>
                {doc.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <input
            type="time"
            min="08:00"
            max="22:00"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />

          <textarea
            placeholder="Reason"
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
          />

          <button>Send Appointment</button>

        </form>

        {/* 🔥 APPOINTMENT CARDS */}
        <div className="appt-grid">

          {appointments.map((appt) => (
            <div key={appt._id} className="appt-card">

              <h3>
                Dr. {
                  doctors.find(d => d.email === appt.doctor)?.name || appt.doctor
                }
              </h3>

              <p>{appt.date} • {appt.time}</p>
              <p>{appt.reason}</p>

              <span className={`appt-status ${appt.status.toLowerCase()}`}>
                {appt.status}
              </span>

            </div>
          ))}

        </div>

      </div>
    </>
  );
}

export default Appointments;