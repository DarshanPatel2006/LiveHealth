import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarPatient from '../components/NavbarPatient';
import { useDarkMode } from '../components/DarkModeContext';
import '../components/Dark.css';
import Footer from '../components/Footer';
import axios from 'axios';
import RobotAssistant from "./RobotAssistant";
import CursorGlow from "../components/CursorGlow";
import AIFace from "../components/AIFace";
import Particles from "../components/Particles";
import {useRef } from "react";
import BASE_URL from "../config";


function DiseaseSelect() {
  const [selectedDiseases, setSelectedDiseases] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSelections, setRecentSelections] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [diseasesFromBackend, setDiseasesFromBackend] = useState([]);
  const [predictedDisease, setPredictedDisease] = useState(null);
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [report, setReport] = useState(null);
  const [treatment, setTreatment] = useState({});
  const [warning, setWarning] = useState(null);
  const [activeTab, setActiveTab] = useState("allopathy");
  const [loading, setLoading] = useState(false);
  const revealRef = useRef();

  const symptomsList = [
    'itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 'joint_pain',
    'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 'burning_micturition', 'spotting_ urination',
    'fatigue', 'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy',
    'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes', 'breathlessness', 'sweating',
    'dehydration', 'indigestion', 'headache', 'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes',
    'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine',
    'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach',
    'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation',
    'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs',
    'fast_heart_rate', 'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool',
    'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs',
    'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails',
    'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips',
    'slurred_speech', 'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints',
    'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness',
    'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'foul_smell_of urine',
    'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)',
    'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain',
    'abnormal_menstruation', 'dischromic _patches', 'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum',
    'rusty_sputum', 'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion',
    'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen',
    'history_of_alcohol_consumption', 'fluid_overload', 'blood_in_sputum', 'prominent_veins_on_calf',
    'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling',
    'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose',
    'yellow_crust_ooze'
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      },
      { threshold: 0.2 }
    );
  
    if (revealRef.current) {
      observer.observe(revealRef.current);
    }
  
  }, []);
  


  useEffect(() => {
    axios.get(`${BASE_URL}/diseases/`)
      .then(response => {
        // Normalize data
        const normalized = response.data.map(disease => ({
          ...disease,
          symptoms: disease.symptoms ? disease.symptoms.split(',').map(s => s.trim()) : [],
        }));
        setDiseasesFromBackend(normalized);
      })
      .catch(error => {
        console.error('Error fetching diseases:', error);
      });
  }, []);

  const handleDiseaseToggle = (diseaseId) => {
    setSelectedDiseases(prev => ({
      ...prev,
      [diseaseId]: !prev[diseaseId]
    }));

    const disease = diseasesFromBackend.find(d => d.id === diseaseId);
    if (disease && !selectedDiseases[diseaseId]) {
      setRecentSelections(prev => [
        { id: diseaseId, name: disease.name, category: disease.category },
        ...prev.filter(item => item.id !== diseaseId).slice(0, 4)
      ]);
    }
  };

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const filteredDiseases = () => {
    return diseasesFromBackend.filter(disease => {
      const matchSearch = disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        disease.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === 'all' || disease.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  };

  // const handlePredictDisease = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:8000/predict/', {
  //       symptoms: selectedSymptoms
  //     });

  //     console.log("API Response:", response.data);

  //     // ✅ NEW STRUCTURE
  //     const disease = response.data.report?.disease || "";
  //     const confidence = response.data.report?.confidence || 0;

  //     const selectedDiseaseNames = Object.keys(selectedDiseases)
  //       .filter((id) => selectedDiseases[id])
  //       .map((id) => {
  //         const diseaseObj = diseasesFromBackend.find((d) => d.id === id);
  //         return diseaseObj?.name?.trim().toLowerCase() || "";
  //       });

  //     const match = selectedDiseaseNames.includes(disease.toLowerCase());

  //     setReport(response.data.report);
  //     setTreatment(response.data.treatment);
  //     setWarning(response.data.warning);

  //   } catch (err) {
  //     console.error(err);
  //     alert('Prediction failed. Check your backend.');
  //   }
  // };

  const handlePredictDisease = async () => {
    try {
      setLoading(true); // 🔥 start loading

      const response = await axios.post(`${BASE_URL}/predict/`, {
        symptoms: selectedSymptoms
      });

      // simulate delay (UX improvement)
      setTimeout(() => {
        setReport(response.data.report);
        setTreatment(response.data.treatment);
        setWarning(response.data.warning);
        setLoading(false);

        // 🔥 auto scroll
        document.getElementById("result-section")?.scrollIntoView({
          behavior: "smooth"
        });

      }, 2000); // 2 sec (you can make 3000–5000)

    } catch (err) {
      console.error(err);
      setLoading(false);
      alert('Prediction failed.');
    }
  };

  const handleTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
  
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
  
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
  
    const rotateX = -(y - centerY) / 40;
const rotateY = (x - centerX) / 40;

    card.style.setProperty("--x", `${x}px`);
  card.style.setProperty("--y", `${y}px`);
  
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  const resetTilt = () => {
    const card = document.querySelector(".tilt-card");
    if (card) {
      card.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
  };



  const allSymptoms = Array.from(
    new Set(diseasesFromBackend.flatMap(d => d.symptoms))
  );

  const uniqueCategories = Array.from(
    new Set(diseasesFromBackend.map(d => d.category))
  );

  return (
    <>
      <NavbarPatient />

      <div className={`main-bg ${darkMode ? "dark-mode" : ""}`}>
        {/* <CursorGlow /> */}

        <div className="container main-content py-3">

  <div className="glass-wrapper" >

    <div className="glass-bg">
        <div ref={revealRef} className="fade-slide-in">
          {/* Header */}
          <div className="hero-section">
            <Particles />
            <AIFace />

            <h1 className="hero-title">
              AI Health Diagnosis
            </h1>

            <p className="hero-sub">
              Accelerate your health insights with AI-powered diagnosis
            </p>

          </div>



          {/* Symptom Selection */}
          <div className="glass-card p-4 mb-4 fade-in">
            <h4 className="mb-3 section-title">🧬 Select Symptoms</h4>

            <div className="symptom-container">
              {symptomsList.map((symptom, index) => {
                const isSelected = selectedSymptoms.includes(symptom);

                return (
                  <span
                    key={index}
                    onClick={() => handleSymptomToggle(symptom)}
                    className={`symptom-chip ${isSelected ? "active" : ""}`}
                  >
                    {symptom.replace(/_/g, " ")}
                  </span>
                );
              })}
            </div>

            <div className="text-center mt-4">
              <button
                className="futuristic-btn"
                onClick={handlePredictDisease}
                disabled={selectedSymptoms.length === 0}
              >
                ⚡ Analyze Symptoms
              </button>
            </div>
          </div>

          {loading && (
            <div className="glass-card p-4 mt-5 text-center loading-box">
              <div className="loader"></div>
              <p className="mt-3">Analyzing symptoms with AI...</p>
            </div>
          )}
        <div id="result-section">
          {report && (
            <div 
            className="glass-card p-4 mt-5 result-panel fade-in tilt-card"
            onMouseMove={(e) => handleTilt(e)}
            onMouseLeave={() => resetTilt()}
          >

              {/* Title */}
              <h2 className="text-center neon-green mb-3">
                🧬 {report.disease}
              </h2>

              {/* Confidence */}
              <div className="mb-4">
                <p className="confidence-text">
                  Confidence: {report.confidence.toFixed(2)}%
                </p>

                <div className="progress futuristic-progress">
                  <div
                    className={`progress-bar ${report.confidence < 40
                      ? "bg-danger"
                      : report.confidence < 70
                        ? "bg-warning"
                        : "bg-success"
                      }`}
                    style={{ width: `${report.confidence}%` }}
                  ></div>
                </div>
              </div>

              {/* Warning */}
              {warning && (
                <div className="warning-box mb-3">
                  ⚠️ {warning}
                </div>
              )}

              {/* Description */}
              <div className="mb-4">
                <h5 className="section-title">📄 Description</h5>
                <p className="muted-text">{report.description}</p>
              </div>

              {/* Tabs */}
              <div className="treatment-tabs">
                {["allopathy", "homeopathy", "diet"].map((tab) => (
                  <button
                    key={tab}
                    className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="tab-content mt-3">
                <p>{treatment[activeTab]}</p>
              </div>

            </div>
          )}
          </div>

        </div>
        </div>
        </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default DiseaseSelect;
