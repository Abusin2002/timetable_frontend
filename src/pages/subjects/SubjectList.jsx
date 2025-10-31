import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api';
import { Link, useLocation } from "react-router-dom";

const ListSubjects = () => {
  // Mock data - replace with actual data
//   const subjects = [
//     { id: 1, name: 'Mathematics' },
//     { id: 2, name: 'Science' },
//     { id: 3, name: 'English' },
//   ];

const [subjects, setSubjects] = useState([]);
const [loading, setLoading] = useState(false);
const [activeView, setActiveView] = useState("");


 const fetchSubjects = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");

      const res = await api.get("/subjects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSubjects(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "❌ Failed to fetch subjects");
      console.log("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  
    fetchSubjects(); // ✅ only fetch when switching to list view
  
}, []);


  if (loading) return <p>Loading subjects...</p>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
  <div className="d-flex align-items-center">
    <i className="bi bi-journal-text display-6 text-primary me-3"></i>
    <div>
      <h2 className="text-primary mb-1 fw-bold" style={{ letterSpacing: "0.5px" }}>
        All Subjects
      </h2>
      <p className="text-muted mb-0">Manage and organize your subjects</p>
    </div>
  </div>
  <button className="btn btn-primary btn-lg">
    <i className="bi bi-plus-circle me-2"></i>
    <Link
    to="/add-subject"
    
    > <span className="fw-medium text-decoration-none text-light" >Add Subject</span>
</Link>
  </button>
</div>
  

  <div className="card shadow-sm border-0">
    <div className="card-body">
      <table className="table table-striped align-middle">
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Subject Code</th>
            <th>Subject Name</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject,index) => (
            <tr
              key={subject._id}
              className="table-row-hover"
              style={{ cursor: "pointer" }}
            >
              <td>{index+1}</td>
              <td>{subject.code}</td>
              <td>{subject.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* Hover effect custom style */}
  <style jsx>{`
    .table-row-hover:hover {
      background-color: #e7f1ff !important; /* light primary hover */
      transform: scale(1.01);
      transition: 0.2s ease-in-out;
    }
  `}</style>
</div>

  );
};

export default ListSubjects;