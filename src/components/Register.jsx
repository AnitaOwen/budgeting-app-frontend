import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import userLogInPostFetch from "../helpers/userLogInPostFetch";


const Register = () => {

  const [user, setUser] = useState({ email: "", password: "", first_name: "", last_name: ""});

  const URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();


  function handleChange(event) {
    setUser({ ...user, [event.target.id]: event.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    };

    try {
      const res = await fetch(`${URL}/api/auth/register`, options);

      if (!res.ok) {
        setUser({ email: "", password: "" });
        throw new Error("Registration failed");
      }

      const data = await res.json();

      if (data.token) {
        // in case there is an old token in the browser, remove it
        localStorage.removeItem("token");
        userLogInPostFetch(user, URL, navigate)
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center p-3 bg-info bg-opacity-25">
      <div className="card shadow-sm mx-auto" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="card-body p-3 p-sm-4">
          <h2 className="text-center mb-4 fs-3">Register</h2>
          <div className="text-center mb-4">
            Already have an account? <Link to="/login">Login</Link>
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
              autoComplete="new-password"
              required
            />
            <input
              className="form-control form-control-lg mb-3"
              id="first_name"
              value={user.first_name}
              type="text"
              placeholder="First Name"
              onChange={handleChange}
              autoComplete="given-name"
              required
            />
            <input
              className="form-control form-control-lg mb-3"
              id="last_name"
              value={user.last_name}
              type="text"
              placeholder="Last Name"
              onChange={handleChange}
              autoComplete="family-name"
              required
            />
            <button className="btn btn-info btn-lg w-100">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
