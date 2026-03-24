import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BASE_URL from "../config";


const SignupForm = () => {
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    specialization: '',
    experience: '',
    clinicAddress: '',
    qualification: '',
    age: '',
    gender: '',
    address: '',
    medicalHistory: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const regexValidators = {
    name: /^[a-zA-Z\s]{3,50}$/, // letters only, 3-50 chars
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // standard email
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/,
    phone: /^[0-9]{10}$/, // 10 digit number
    experience: /^\d{1,2}$/,
    age: /^\d{1,2}$/,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!regexValidators.name.test(formData.name)) newErrors.name = 'Valid name (letters only, min 3 chars)';
    if (!regexValidators.email.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!regexValidators.password.test(formData.password)) newErrors.password = 'Min 8 chars with uppercase, lowercase, number, and symbol';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!regexValidators.phone.test(formData.phone)) newErrors.phone = 'Enter a valid 10-digit phone number';
    if (role === 'doctor' && !regexValidators.experience.test(formData.experience)) newErrors.experience = 'Enter valid experience (1-99)';
    if (role === 'patient' && !regexValidators.age.test(formData.age)) newErrors.age = 'Enter valid age (1-99)';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await fetch(`${BASE_URL}/signup/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate('/login');
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Server error during signup');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '800px' }}>
      {!role ? (
        <>
          <h3 className="mb-4 text-center fw-bold">Choose Your Role</h3>
          <button className="btn btn-primary w-100 mb-3 py-2" onClick={() => setRole('patient')}>
            I'm a Patient
          </button>
          <button className="btn btn-success w-100 py-2" onClick={() => setRole('doctor')}>
            I'm a Doctor
          </button>
          <a href="/login" className="btn btn-outline-dark mt-4 w-100">
            Already Have an Account?
          </a>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white">
          <h3 className="mb-4 text-center text-uppercase fw-semibold">Sign Up as {role}</h3>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} name="name" value={formData.name} onChange={handleChange} required />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" value={formData.email} onChange={handleChange} required />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Phone</label>
              <input type="tel" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} name="phone" value={formData.phone} onChange={handleChange} required />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Password</label>
              <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} name="password" value={formData.password} onChange={handleChange} required />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Confirm Password</label>
              <input type="password" className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
            </div>

            {role === 'doctor' && (
              <>
                <div className="col-md-6 mb-3">
  <label className="form-label">Specialization</label>
  <select
    className="form-select"
    name="specialization"
    value={formData.specialization}
    onChange={handleChange}
    required
  >
    <option value="">-- Select Specialization --</option>

    <optgroup
      label="Available Specializations"
      style={{ maxHeight: '150px', overflowY: 'auto' }} // Won't work in native select
    >
      <option value="Cardiologist">Cardiologist</option>
      <option value="Dermatologist">Dermatologist</option>
      <option value="Endocrinologist">Endocrinologist</option>
      <option value="Gastroenterologist">Gastroenterologist</option>
      <option value="Neurologist">Neurologist</option>
      <option value="Oncologist">Oncologist</option>
      <option value="Orthopedic">Orthopedic</option>
      <option value="Pediatrician">Pediatrician</option>
      <option value="Psychiatrist">Psychiatrist</option>
      <option value="Radiologist">Radiologist</option>
      <option value="Urologist">Urologist</option>
      <option value="General Physician">General Physician</option>
      <option value="ENT Specialist">ENT Specialist</option>
      <option value="Dentist">Dentist</option>
      <option value="Ophthalmologist">Ophthalmologist</option>
      {/* Add more */}
    </optgroup>
  </select>
</div>


                <div className="col-md-6 mb-3">
                  <label className="form-label">Experience (Years)</label>
                  <input type="number" className={`form-control ${errors.experience ? 'is-invalid' : ''}`} name="experience" value={formData.experience} onChange={handleChange} required />
                  {errors.experience && <div className="invalid-feedback">{errors.experience}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Clinic Address</label>
                  <input type="text" className="form-control" name="clinicAddress" value={formData.clinicAddress} onChange={handleChange} required />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Qualification</label>
                  <input type="text" className="form-control" name="qualification" value={formData.qualification} onChange={handleChange} required />
                </div>
              </>
            )}

            {role === 'patient' && (
              <>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Age</label>
                  <input type="number" className={`form-control ${errors.age ? 'is-invalid' : ''}`} name="age" value={formData.age} onChange={handleChange} required />
                  {errors.age && <div className="invalid-feedback">{errors.age}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Gender</label>
                  <select className="form-select" name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="col-md-12 mb-3">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required />
                </div>

                <div className="col-md-12 mb-3">
                  <label className="form-label">Medical History</label>
                  <textarea className="form-control" rows="3" name="medicalHistory" value={formData.medicalHistory} onChange={handleChange}></textarea>
                </div>
              </>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">Sign Up</button>
          <button type="button" className="btn btn-link w-100 mt-2" onClick={() => setRole('')}>← Back to Role Selection</button>
        </form>
      )}
    </div>
  );
};

export default SignupForm;
