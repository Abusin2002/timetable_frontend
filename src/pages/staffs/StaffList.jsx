import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import api from '../../api';


const ListStaffs = () => {
  // Mock data - replace with actual data
  // const staffs = [
  //   { id: 1, name: 'John Smith', email: 'john@school.com', phone: '+1234567890', department: 'teaching', position: 'Math Teacher', joinDate: '2022-01-15' },
  //   { id: 2, name: 'Sarah Johnson', email: 'sarah@school.com', phone: '+1234567891', department: 'teaching', position: 'Science Teacher', joinDate: '2021-08-20' },
  //   { id: 3, name: 'Mike Wilson', email: 'mike@school.com', phone: '+1234567892', department: 'administration', position: 'Principal', joinDate: '2020-03-10' },
  //   { id: 4, name: 'Emily Brown', email: 'emily@school.com', phone: '+1234567893', department: 'support', position: 'Accountant', joinDate: '2023-02-28' },
  // ];

  // const getDepartmentBadge = (dept) => {
  //   const badges = {
  //     teaching: 'bg-primary',
  //     administration: 'bg-success',
  //     support: 'bg-info'
  //   };
  //   return badges[dept] || 'bg-secondary';
  // };

  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStaffs = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/staffs", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStaffs(res.data);
    } catch (err) {
      console.error("Error fetching staffs:", err);
      toast.error("❌ Failed to fetch staff list");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStaffs();
  }, [fetchStaffs]);

  if (loading) return <p>Loading staff list...</p>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>All Staff Members</h2>
        <button className="btn btn-primary">
          <i className="bi bi-person-plus me-2"></i>

          <Link
          to={'/add-staff'}
          ><span className='text-light'> Add New Staff</span></Link>
         
        </button>
      </div>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-primary">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Contact</th>
                  {/* <th>Department</th>
                  <th>Position</th>
                  <th>Join Date</th>
                  <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {staffs.map(staff => (
                  <tr key={staff.id}>
                    <td>{staff.id}</td>
                    <td>
                      <strong>{staff.name}</strong>
                    </td>
                    <td>
                      <div>{staff.email}</div>
                      <small className="text-muted">{staff.phone}</small>
                    </td>
                    
                  
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

export default ListStaffs;