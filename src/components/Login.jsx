import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import userLogInPostFetch from "../helpers/userLogInPostFetch";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  
  function handleChange(event) {
    setUser({ ...user, [event.target.id]: event.target.value });
  }

  // Login Function
  async function handleSubmit(e) {
    e.preventDefault();

    userLogInPostFetch(user, navigate);
  }
  
  //Demo User Login Function
  async function handleDemoSignIn(e) {
    e.preventDefault();
    const user = { email: "aveniia@gmail.com", password: "password" };
    userLogInPostFetch(user, navigate);
  }

  return (
    <div className="min-vh-100 d-flex align-items-center p-3 bg-info bg-opacity-25">
      <div className="card shadow-sm mx-auto" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="card-body p-3 p-sm-4">

          <h2 className="text-center mb-4 fs-3">Login</h2>

          <div className="text-center mb-4">
            Don't have an account? <Link to="/register">Register</Link>
            <br />
            <button 
              className="btn btn-link text-secondary p-0 mt-2"
              onClick={handleDemoSignIn}
            >
              Try Demo User
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <input
              className="form-control form-control-lg mb-3"
              id="email"
              value={user.email}
              type="email"
              placeholder="Email"
              onChange={handleChange}
              autoComplete="email"
              required
            />
            <input
              className="form-control form-control-lg mb-3"
              id="password"
              value={user.password}
              type="password"
              placeholder="Password"
              onChange={handleChange}
              autoComplete="current-password"
              required
            />

            <button className="btn btn-info btn-lg w-100">Login</button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;