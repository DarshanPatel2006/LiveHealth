import React, { useState, useEffect } from 'react';
import NavbarPatient from "../components/NavbarPatient";
import NavbarDoctor from "../components/NavbarDoctor";
import { useLocation } from "react-router-dom";
import Footer from '../components/Footer';
import { useDarkMode } from '../components/DarkModeContext';
import "../App.css";
import img from "../assets/weather.jpg";
import BASE_URL from "../config";



function MedicalNews() {
  const [news, setNews] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const location = useLocation();
  const [active, setActive] = useState("all");

  const { darkMode } = useDarkMode();

  // 🔥 WEATHER API
  useEffect(() => {
    fetch("https://wttr.in/Ahmedabad?format=j1")
      .then(res => res.json())
      .then(data => {
        const today = data.weather[0];
        setWeather({
          temp: today.avgtempC,
          humidity: today.hourly[0].humidity,
        });
      });
  }, []);

  // 🔥 NEWS
  useEffect(() => {
    const mockNews = [
      {
        id: 1,
        title: "Breakthrough in COVID-19 Treatment",
        summary: "Scientists discover new treatment method that shows promising results in clinical trials.",
        date: "2024-03-15",
        source: "Medical Journal",
        category: "Research",
        image: "https://img.freepik.com/free-photo/scientist-working-laboratory_23-2148884482.jpg"
      },
      {
        id: 2,
        title: "New Study on Heart Disease Prevention",
        summary: "Exercise reduces heart disease risk by 40%.",
        date: "2024-03-14",
        source: "Health News",
        category: "Prevention",
        image: "https://img.freepik.com/free-photo/doctor-examining-patient_23-2147756849.jpg"
      },
      {
        id: 3,
        title: "Advances in Cancer Research",
        summary: "New immunotherapy improves survival rates.",
        date: "2024-03-13",
        source: "Cancer Research Today",
        category: "Research",
        image: "https://img.freepik.com/free-photo/medical-banner_23-2149611193.jpg"
      },
      {
        id: 4,
        title: "Revolutionary Diabetes Treatment",
        summary: "New insulin system improves blood sugar control.",
        date: "2024-03-12",
        source: "Diabetes Journal",
        category: "Treatment",
        image: "https://img.freepik.com/free-photo/doctor-giving-injection_23-2147756847.jpg"
      },
      {
        id: 5,
        title: "AI-Powered Diagnosis System",
        summary: "AI achieves 95% accuracy in early disease detection.",
        date: "2024-03-11",
        source: "Tech Health Review",
        category: "Technology",
        image: "https://img.freepik.com/free-photo/artificial-intelligence_23-2149382682.jpg"
      },
      {
        id: 6,
        title: "New Migraine Treatment Protocol",
        summary: "Combined therapy reduces migraines by 70%.",
        date: "2024-03-10",
        source: "Neurology Today",
        category: "Treatment",
        image: "https://img.freepik.com/free-photo/doctor-head_23-2147756845.jpg"
      },
      {
        id: 7,
        title: "Smart Health Monitoring Devices",
        summary: "Wearables predict diseases before symptoms.",
        date: "2024-03-09",
        source: "Digital Health News",
        category: "Technology",
        image: "https://img.freepik.com/free-photo/smart-watch_23-2149431735.jpg"
      },
      {
        id: 8,
        title: "Personalized Medicine Breakthrough",
        summary: "Genetic-based medicine improves treatments.",
        date: "2024-03-08",
        source: "Genetics Medicine",
        category: "Treatment",
        image: "https://img.freepik.com/free-photo/scientist-test-tubes_23-2148884490.jpg"
      },
      {
        id: 9,
        title: "Virtual Reality in Therapy",
        summary: "VR improves recovery and patient engagement.",
        date: "2024-03-07",
        source: "Rehab Tech",
        category: "Technology",
        image: "https://img.freepik.com/free-photo/vr-headset_23-2149382680.jpg"
      }
    ];

    setNews(mockNews);
    setLoading(false);
  }, []);

  const categories = ['all', 'Research', 'Prevention', 'Treatment', 'Technology'];

  const filteredNews = selectedCategory === 'all'
    ? news
    : news.filter(n => n.category === selectedCategory);

    return (
      <>
        {location.pathname.includes("/doctor") ? (
          <NavbarDoctor />
        ) : (
          <NavbarPatient />
        )}
    
        <div className="pd2-container mt-5">
    
          {/* TITLE */}
          <h1 className="pd2-title p-2">Medical News & Insights</h1>
    
          {/* WEATHER */}
          {weather && (
            <div className="pd2-main-card">
    
              <div className="pd2-main-text">
                <h2>Weather & Health</h2>
    
                <p>Temperature: {weather.temp}°C</p>
                <p>Humidity: {weather.humidity}%</p>
    
                <p>
                  Stay hydrated, avoid extreme heat exposure,
                  and maintain a healthy routine.
                </p>
              </div>
    
              <div className="pd2-main-img">
                <img src={img} alt="Weather" />
              </div>
    
            </div>
          )}
    
          {/* 🔥 FILTER BUTTONS (ENHANCED) */}
          <div className="news-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={active === cat ? "active" : ""}
                onClick={() => {
                  setActive(cat);
                  setSelectedCategory(cat);
                }}
              >
                {cat}
              </button>
            ))}
          </div>
    
          {/* NEWS */}
          <div className="appt-grid">
    
            {loading ? (
              <p>Loading...</p>
            ) : (
              filteredNews.map(article => (
                <div className="pd2-card" key={article.id}>
    
                  <img
                    src={article.image}
                    alt=""
                    style={{
                      width: "100%",
                      height: "160px",
                      objectFit: "cover",
                      borderRadius: "12px"
                    }}
                  />
    
                  <span className="pd2-tag">{article.category}</span>
    
                  <h3>{article.title}</h3>
    
                  <p>{article.summary}</p>
    
                  <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                    {article.source} • {article.date}
                  </div>
    
                </div>
              ))
            )}
    
          </div>
    
        </div>
    
        <Footer />
      </>
    );
}

export default MedicalNews;