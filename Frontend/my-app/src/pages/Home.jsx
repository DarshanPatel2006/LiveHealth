import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../App.css";
import img1 from "../assets/ai.jpg"
import img2 from "../assets/doctor.jpg"
import img3 from "../assets/health.jpg"
import img4 from "../assets/ai-bot.png"
import { useEffect, useRef } from "react";
import BASE_URL from "../config";



import ParticlesComponent from "../components/Particles.jsx";
import NavbarHome from "../components/NavbarHome";

function Home() {
  const navigate = useNavigate();



  const timelineRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      const bot = document.querySelector(".floating-ai");

      if (bot) {
        bot.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.3 }
    );

    items.forEach((item) => observer.observe(item));
  }, []);

  useEffect(() => {
    const cursor = document.querySelector(".cursor-glow");

    const moveCursor = (e) => {
      if (cursor) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
      }
    };

    window.addEventListener("mousemove", moveCursor);

    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>

      <NavbarHome />

      <div className="cursor-glow"></div>
      {/* 🔥 HERO */}
      <section className="home-hero">
        <ParticlesComponent />
        {/* PARTICLES */}
        <div className="hero-particles"></div>

        {/* GLASS EARTH */}
        <div className="hero-earth"></div>

        {/* CONTENT */}
        <div className="hero-content">
          <h1>
            Transform Healthcare <br /> With AI
          </h1>

          <p className="mx-5">
            Diagnose diseases, connect with doctors, and manage your
            health intelligently.
          </p>

          <button onClick={() => navigate("/signup")}>
            Get Started →
          </button>
        </div>

      </section>

      <div className="floating-ai">
        <img src={img4} alt="AI Bot" />
      </div>

      <section className="timeline">

        {/* ITEM 1 */}
        <div className="timeline-item fade-item">

          <div className="timeline-content ">
            <h2>AI Disease Detection</h2>

            <p>
              Our intelligent system analyzes symptoms using machine learning
              to provide accurate disease predictions.
            </p>

            <ul className="tl-list">
              <li>✔ Smart symptom analysis</li>
              <li>✔ ML-based prediction model</li>
              <li>✔ Fast and reliable results</li>
            </ul>
          </div>

          <div className="timeline-dot"></div>

          <div className="timeline-content right">
            <img src={img1} alt="" />
          </div>

        </div>

        {/* ITEM 2 */}
        <div className="timeline-item fade-item">

          <div className="timeline-content left">
            <img src={img2} alt="" />
          </div>

          <div className="timeline-dot"></div>

          <div className="timeline-content right">
            <h2>Smart Appointments</h2>

            <p>
              Book and manage doctor appointments seamlessly with a smooth
              and intuitive experience.
            </p>

            <ul className="tl-list">
              <li>✔ Easy doctor selection</li>
              <li>✔ Real-time booking</li>
              <li>✔ Track appointment status</li>
            </ul>
          </div>

        </div>

        {/* ITEM 3 */}
        <div className="timeline-item fade-item">

          <div className="timeline-content">
            <h2>Doctor Insights</h2>

            <p>
              Doctors can publish verified medical knowledge to guide patients
              and improve healthcare understanding.
            </p>

            <ul className="tl-list">
              <li>✔ Verified recommendations</li>
              <li>✔ Disease awareness</li>
              <li>✔ Better patient guidance</li>
            </ul>
          </div>

          <div className="timeline-dot"></div>

          <div className="timeline-content right">
            <img src={img3} alt="" />
          </div>

        </div>

      </section>

      {/* 🔥 FINAL CTA */}
      <section className="home-cta">

        <h2>Start Your AI Health Journey Today</h2>

        <button onClick={() => navigate("/signup")}>
          Create Account →
        </button>

      </section>

      <Footer />
    </>
  );
}

export default Home;