import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);
  const [isTimetableOpen, setIsTimetableOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar bg-light border-end" style={{ width: "280px", minHeight: "100vh" }}>
      <div className="p-4 border-bottom bg-white">
        <h4 className="mb-0 text-primary">
          <i className="bi bi-speedometer2 me-2"></i>
          School Portal
        </h4>
      </div>
      
      <div className="p-3">
        <ul className="list-unstyled mb-0">
          {/* Dashboard */}
          <li className="mb-2">
            <Link 
              to="/dashboard" 
              className={`d-flex align-items-center p-3 text-decoration-none rounded ${
                isActive('/') ? 'bg-primary text-white' : 'text-dark hover-bg'
              }`}
            >
              <i className="bi bi-house-door fs-5 me-3"></i>
              <span className="fw-medium">Dashboard</span>
            </Link>
          </li>

          {/* Time Table Section */}
          <li className="mb-2">
            <button
              className={`d-flex align-items-center justify-content-between w-100 p-3 text-decoration-none rounded border-0 bg-transparent ${
                isTimetableOpen ? 'text-primary' : 'text-dark'
              }`}
              onClick={() => setIsTimetableOpen(!isTimetableOpen)}
            >
              <div className="d-flex align-items-center">
                <i className="bi bi-calendar-week fs-5 me-3"></i>
                <span className="fw-medium">Time Table</span>
              </div>
              <i className={`bi bi-chevron-${isTimetableOpen ? 'down' : 'right'} small`}></i>
            </button>
            
            {isTimetableOpen && (
              <div className="ms-4 mt-2">
                <Link 
                  to="/timetable" 
                  className={`d-flex align-items-center p-2 px-3 text-decoration-none rounded mb-1 ${
                    isActive('/timetable') ? 'bg-primary text-white' : 'text-dark hover-bg'
                  }`}
                >
                  <i className="bi bi-list-ul me-2"></i>
                  <small>List Time Table</small>
                </Link>
                <Link 
                  to="/create-timetable" 
                  className={`d-flex align-items-center p-2 px-3 text-decoration-none rounded ${
                    isActive('/create-timetable') ? 'bg-primary text-white' : 'text-dark hover-bg'
                  }`}
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  <small>Create Time Table</small>
                </Link>
              </div>
            )}
          </li>

          {/* Settings Section */}
          <li className="mb-2">
            <button
              className={`d-flex align-items-center justify-content-between w-100 p-3 text-decoration-none rounded border-0 bg-transparent ${
                isSettingsOpen ? 'text-primary' : 'text-dark'
              }`}
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <div className="d-flex align-items-center">
                <i className="bi bi-gear fs-5 me-3"></i>
                <span className="fw-medium">Settings</span>
              </div>
              <i className={`bi bi-chevron-${isSettingsOpen ? 'down' : 'right'} small`}></i>
            </button>
            
            {isSettingsOpen && (
              <div className="ms-4 mt-2">
                {/* Subjects */}
                <div className="mb-2">
                  <Link 
                    to="/subjects" 
                    className={`d-flex align-items-center p-2 px-3 text-decoration-none rounded ${
                      isActive('/subjects') ? 'bg-info text-white' : 'text-dark hover-bg'
                    }`}
                  >
                    <i className="bi bi-journal-text me-2"></i>
                    <small>Subjects</small>
                  </Link>
                 
                </div>

                {/* Staffs */}
                <div className="mb-2">
                  <Link 
                    to="/staffs" 
                    className={`d-flex align-items-center p-2 px-3 text-decoration-none rounded ${
                      isActive('/staffs') ? 'bg-info text-white' : 'text-dark hover-bg'
                    }`}
                  >
                    <i className="bi bi-people me-2"></i>
                    <small>Staffs</small>
                  </Link>
                 
                </div>

                {/* Classes */}
                <div className="mb-2">
                  <Link 
                    to="/classes" 
                    className={`d-flex align-items-center p-2 px-3 text-decoration-none rounded ${
                      isActive('/classes') ? 'bg-info text-white' : 'text-dark hover-bg'
                    }`}
                  >
                    <i className="bi bi-building me-2"></i>
                    <small>Classes</small>
                  </Link>
                 
                </div>
              </div>
            )}
          </li>

          

          {/* <li className="mb-2">
            <Link 
              to="/profile" 
              className={`d-flex align-items-center p-3 text-decoration-none rounded ${
                isActive('/profile') ? 'bg-primary text-white' : 'text-dark hover-bg'
              }`}
            >
              <i className="bi bi-person-circle fs-5 me-3"></i>
              <span className="fw-medium">Profile</span>
            </Link>
          </li> */}
        </ul>
      </div>

     

      <style jsx>{`
        .hover-bg:hover {
          background-color: rgba(0, 123, 255, 0.1) !important;
          color: #0056b3 !important;
        }
        .sidebar {
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Sidebar;