import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api';

const AddClass = () => {
  const [value, setValue] = useState('');

 const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/classes/create",
        { value: Number(value) }, // send only numeric class value
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

       toast.success("✅ Class added successfully!");
        setValue("");
      // if (res.status === 200 || res.status === 201) {
       
      // } else {
      //   toast.warning("⚠️ Something went wrong while adding the class!");
      // }
    } catch (error) {
      console.error("Error adding class:", error);
      if (error.response) {
        toast.error(`❌ ${error.response.data.message || "Server error"}`);
      } else {
        toast.error("❌ Network error. Try again.");
      }
    }
  };

  return (
    <div>
      <h2>Add New Class</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Class Name (1-12)</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., 5 , 12"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
              />
            </div>
          
            <button type="submit" className="btn btn-primary">Add Class</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClass;