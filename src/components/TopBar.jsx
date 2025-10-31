import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProfile } from '../api';

const TopBar = () => {

  // const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

   const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          toast.warning("Please log in to view your profile");
          return;
        }

        const data = await getProfile();
        setUser(data.user || data);      
        console.error("Profile fetch error:", err);
        toast.error(err.response?.data?.message || "❌ Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []); 

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };


  

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>No user data found.</p>;
  return (
    <nav className="navbar navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Time Table Creator</span>
        <div className="d-flex align-items-center">
          <div className="text-white me-3">
            <div className="fw-bold">{user?.name}</div>
            <small>{user?.email}</small>
          </div>
          <button 
            className="btn btn-outline-light btn-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;