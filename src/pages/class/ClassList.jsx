import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import api from '../../api';

const ListClasses = () => {
  // Mock data - replace with actual data
  // const classes = [
  //   { id: 1, name: 'Grade 1', section: 'A', capacity: 30, currentStudents: 25 },
  //   { id: 2, name: 'Grade 1', section: 'B', capacity: 30, currentStudents: 28 },
  //   { id: 3, name: 'Grade 2', section: 'A', capacity: 35, currentStudents: 32 },
  // ];


   const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/classes/my", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Sort by value ascending
        const sorted = [...res.data].sort((a, b) => a.value - b.value);
        setClasses(sorted);
      } catch (error) {
        console.error("Error fetching classes:", error);
        toast.error("❌ Failed to fetch class list");
      }
    };

    fetchClasses();
  }, []);
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>All Classes</h2>
        <button className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          <Link to="/add-class" className="text-white text-decoration-none">  
          <span className='text-light'>Add New Class</span>
          </Link>
          
        </button>
      </div>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-primary">
                <tr>
                  <th>ID</th>
                  <th>Classes</th>
                  {/* <th>Section</th>
                  <th>Capacity</th>
                  <th>Current Students</th>
                  <th>Availability</th>
                  <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {classes.map((cls,index) => (
                  <tr key={cls.id}>
                    <td>{index+1}</td>
                    <td>
                      <strong>{cls.value}</strong>
                    </td>
                    {/* <td>Section {cls.section}</td>
                    <td>{cls.capacity}</td>
                    <td>{cls.currentStudents}</td>
                    <td>
                      <span className={`badge ${cls.currentStudents < cls.capacity ? 'bg-success' : 'bg-danger'}`}>
                        {cls.currentStudents < cls.capacity ? 'Available' : 'Full'}
                      </span>
                    </td> */}
                    {/* <td>
                      <button className="btn btn-sm btn-outline-primary me-1">
                        <i className="bi bi-pencil"></i> Edit
                      </button>
                      <button className="btn btn-sm btn-outline-danger">
                        <i className="bi bi-trash"></i> Delete
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListClasses;