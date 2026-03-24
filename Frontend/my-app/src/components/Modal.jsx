import React from react

function Modal(){
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-2">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold text-primary d-flex align-items-center" to="/DoctorDashboard">
          <img
            src="https://media.istockphoto.com/id/1413129923/vector/avatar-of-a-bearded-doctor-doctor-with-stethoscope-vector-illustration.jpg?s=2048x2048&w=is&k=20&c=24oA4w0xPtBrM0B1JlzLyFPnMmhJcW0TR-coA2Nkksk="
            alt="Logo"
            style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10, border: '2px solid #00b4d8' }}
          />
          Health Portal
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarDoctorNav"
          aria-controls="navbarDoctorNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarDoctorNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 nav nav-pills gap-2">
            <li className="nav-item">
              <NavLink to="/DoctorDashboard" className={({ isActive }) => `nav-link${isActive ? ' active bg-primary text-white rounded-pill' : ' text-primary'}` }>
                <i className="fas fa-home me-1"></i>Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/disease-post" className={({ isActive }) => `nav-link${isActive ? ' active bg-primary text-white rounded-pill' : ' text-primary'}` }>
                <i className="fas fa-notes-medical me-1"></i>Disease Post
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Appointment-doctor" className={({ isActive }) => `nav-link${isActive ? ' active bg-primary text-white rounded-pill' : ' text-primary'}` }>
                <i className="fas fa-calendar-check me-1"></i>Appointments
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/news" className={({ isActive }) => `nav-link${isActive ? ' active bg-primary text-white rounded-pill' : ' text-primary'}` }>
                <i className="fas fa-newspaper me-1"></i>Medical News
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/chat" className={({ isActive }) => `nav-link${isActive ? ' active bg-primary text-white rounded-pill' : ' text-primary'}` }>
                <i className="fas fa-comments me-1"></i>Chat with Doctor
              </NavLink>
            </li>
          </ul>
          <div className="dropdown ms-lg-3">
            <button
              className="btn btn-outline-primary dropdown-toggle d-flex align-items-center"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user-circle me-2"></i>
              Profile
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><NavLink className="dropdown-item" to="/settings">Settings</NavLink></li>
              <li><NavLink className="dropdown-item" to="/help">Help</NavLink></li>
              <li><hr className="dropdown-divider" /></li>
              <li><NavLink className="dropdown-item" to="/">Sign out</NavLink></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
      );
    
}

export default Modal