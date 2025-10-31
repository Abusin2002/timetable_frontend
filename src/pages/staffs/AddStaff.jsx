import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api';

const AddStaff = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("token"); // get JWT token from sessionStorage

      const res = await api.post(
        "/staffs",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      
       toast.success("✅ Staff added successfully!");
        setFormData({ name: "", email: "", phone: "" });

      // if (res.status === 200 || res.status === 201) {
      //   toast.success("✅ Staff added successfully!");
      //   setFormData({ name: "", email: "", phone: "" });
      // } else {
      //   toast.warning("⚠️ Something went wrong while adding staff!");
      // }
    } catch (error) {
      console.error("Error adding staff:", error);
      if (error.response) {
        toast.error(`❌ Failed: ${error.response.data.message || "Server error"}`);
      } else {
        toast.error("❌ Network error, please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Add New Staff Member</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
            </div>
            
            <button type="submit" className="btn btn-primary">Add Staff Member</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStaff;