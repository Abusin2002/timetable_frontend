import React, { useState } from 'react';
import api from '../../api';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

const AddSubject = () => {
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const token = localStorage.getItem("token");
        const res=await api.post("/subjects", 
            { name: subjectName,
               code:subjectCode,
             },{
            headers: {
                 "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

      toast.success("✅ Subject added successfully!");
      setSubjectName("");
      setSubjectCode("");
     

    }catch(err){
        const errorMsg =
      err.response?.data?.message || "❌ Something went wrong!";
    toast.warning(errorMsg);
        console.error("Error adding subject:", err);
      
    }
    console.log('Adding subject:', subjectName);
  };

  return (
    <div>
      <h2>Add New Subject</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Subject Name</label>
              <input
                type="text"
                className="form-control"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                required
              />
            </div>
             <div className="mb-3">
              <label className="form-label">Subject Code</label>
              <input
                type="text"
                className="form-control"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Subject</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSubject;