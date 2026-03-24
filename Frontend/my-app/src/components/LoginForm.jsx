import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BASE_URL from "../config";


const LoginForm = () => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginForm;
    const newErrors = {};

    if (!validateEmail(email)) newErrors.email = 'Please enter a valid email';
    if (!validatePassword(password)) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // Server call example
    try {
      const response = await fetch(`${BASE_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
    
      const data = await response.json();
      console.log(data)
      localStorage.removeItem('email')
      localStorage.removeItem('name')
      localStorage.removeItem('phone')
      localStorage.setItem('email', data.email)
      localStorage.setItem('name', data.name)
      localStorage.setItem('phone', data.phone)
      console.log(localStorage.getItem('name'))
      console.log(data)
      if (response.ok) {
        alert(data.message,data.role);
    
        // role ke basis pe redirect
        if (data.role === 'patient') {
          navigate('/PatientDashboard');
        } else if (data.role === 'doctor') {
          navigate('/DoctorDashboard');
        } else {
          // default fallback agar koi role nahi mila
          navigate('/');
        }
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Server error during login');
    }
  };    

  return (
    <form onSubmit={handleSubmit} className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="mb-4 text-center">Login</h3>
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          name="email"
          value={loginForm.email}
          onChange={handleChange}
          required
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          name="password"
          value={loginForm.password}
          onChange={handleChange}
          required
        />
        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
      </div>
      <button type="submit" className="btn btn-primary w-100">Login</button>
      <a href="/signup" className='btn btn-outline-dark mt-4'>No Have Account</a>
    </form>
  );
};

export default LoginForm;
