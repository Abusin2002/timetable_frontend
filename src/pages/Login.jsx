import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api";

export default function Login() {
  // const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const res=await loginUser(email, password);
      sessionStorage.setItem("token", res.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.error("Login error:", err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="row min-vh-100 justify-content-center align-items-center">
        <div className="col-md-6 col-lg-4">
          <div className="card border-0 shadow-lg p-3 mb-5 bg-body-tertiary rounded" style={{ borderRadius: '15px' }}>
            <div className="card-body p-4">
              <h2 className="card-title text-center text-primary mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input 
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 position-relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    className="form-control form-control-lg pe-5"
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary border-0 position-absolute top-50 end-0 translate-middle-y"
                    onClick={togglePasswordVisibility}
                    style={{ zIndex: 5 }}
                  >
                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                  </button>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 py-2 fw-semibold"
                >
                  Login
                </button>
                {error && (
                  <div className="alert alert-danger mt-3 mb-0" role="alert">
                    {error}
                  </div>
                )}
              </form>
              <p className="text-center mt-3 mb-0">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary text-decoration-none fw-bold">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}