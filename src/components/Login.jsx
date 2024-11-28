import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import userLogInPostFetch from "../helpers/userLogInPostFetch.js.";

const Login = () => {

    const [user, setUser] = useState({ email: "", password: "" });
    
    const URL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();
    

  
    function handleChange(event) {
      setUser({ ...user, [event.target.id]: event.target.value });
    }

    // Login Function
    async function handleSubmit(e) {
      e.preventDefault();
      if (!user.email|| !user.password) {
        alert("You must enter an email and password");
        return;
      }
      userLogInPostFetch(user, URL, navigate);
    }
  
    //Demo User Login Function
    async function handleDemoSignIn(e) {
      e.preventDefault();
      const user = { email: "demo@me.com", password: "password" };
      userLogInPostFetch(user, URL, navigate);
    }

    return (
        <div className="mt-5 container-sm text-center">
          <h2 className="mt-4 mb-4">Welcome!</h2>
          <button onClick={handleDemoSignIn} className="btn btn-dark btn-sm mb-4">Demo User</button>
          {/* <h4 className="mt-4">Login</h4> */}
          <form onSubmit={handleSubmit} className="row justify-content-center">
            <div className="col-md-6">
              <div className="mb-3">
                <input
                  className="form-control text-center"
                  id="email"
                  value={user.email}
                  type="email"
                  placeholder="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 mt-3">
                <input
                className="form-control text-center"
                  id="password"
                  type="password"
                  placeholder="password"
                  onChange={handleChange}
                  autoComplete="current-password"
                />
              </div>
            </div>
            <div>
              <button className="btn btn-info btn-sm mb-4">Log In</button>
    
            </div>
            
          </form>
          <h5>
            No Account? <Link to="/register">Register</Link>
          </h5>
        </div>
      );
    };

export default Login;