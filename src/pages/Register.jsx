import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api";

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await  registerUser(name, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container-fluid bg-gray min-vh-100 py-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6 col-lg-4">
          <div className="card border-0 shadow-lg p-3 mb-5 bg-body-tertiary rounded" style={{ borderRadius: '15px' }}>
            <div className="card-body p-5">
              <h2 className="card-title text-center text-primary mb-4 fw-bold">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input 
                    id="name"
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter your full name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input 
                    id="email"
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 position-relative">
                  <input 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control form-control-lg pe-5"
                    placeholder="Enter your password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary border-0 position-absolute top-50 end-0 translate-middle-y"
                    onClick={togglePasswordVisibility}
                    style={{ zIndex: 5, marginTop: '8px' }}
                  >
                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                  </button>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 py-3 fw-bold mt-3"
                >
                  Register
                </button>
                {error && (
                  <div className="alert alert-danger mt-3 mb-0" role="alert">
                    {error}
                  </div>
                )}
              </form>
              <p className="text-center mt-4 mb-0">
                Already have an account?{" "}
                <Link to="/login" className="text-primary text-decoration-none fw-bold">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}