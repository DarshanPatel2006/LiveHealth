import React, { useEffect, useState } from "react";
import NavbarDoctor from "../components/NavbarDoctor";
import Footer from "../components/Footer";
import axios from "axios";
import "../App.css";
import BASE_URL from "../config";


const doctorEmail = localStorage.getItem("email");

function DiseasePost() {
  const [formData, setFormData] = useState({
    category: "",
    id: "",
    name: "",
    description: "",
    symptoms: "",
    email: doctorEmail,
  });

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/recommendations/?email=${doctorEmail}`
      );
      setPosts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePost = async () => {
    try {
      await axios.post(`${BASE_URL}/recommendations/`, formData);
      alert("Posted successfully!");
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavbarDoctor />

      <div className="pd2-container mt-5">

        {/* 🔥 TITLE */}
        <h1 className="pd2-title">Disease Recommendations</h1>

        {/* 🔥 FORM */}
        <div className="dp-form">

          <input
            placeholder="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />

          <input
            placeholder="Disease ID"
            value={formData.id}
            onChange={(e) =>
              setFormData({ ...formData, id: e.target.value })
            }
          />

          <input
            placeholder="Disease Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <textarea
            placeholder="Description"
            rows="3"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <textarea
            placeholder="Symptoms (comma separated)"
            rows="3"
            value={formData.symptoms}
            onChange={(e) =>
              setFormData({ ...formData, symptoms: e.target.value })
            }
          />

          <button onClick={handlePost}>Post Recommendation</button>

        </div>

        {/* 🔥 POSTS */}
        <div className="dp-grid">

          {posts.length === 0 ? (
            <p>No posts yet</p>
          ) : (
            posts.map((rec) => (
              <div key={rec.id} className="dp-card">

                <h3>{rec.name}</h3>

                <span className="dp-tag">{rec.category}</span>

                <p><strong>Symptoms:</strong> {rec.symptoms}</p>

                <p>{rec.description}</p>

              </div>
            ))
          )}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default DiseasePost;