import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import userLogInPostFetch from "../helpers/userLogInPostFetch.js.";


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
        const errorMessage = await res.text(); 
        alert(`Login failed: ${errorMessage}`);
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
    <div className="mt-5 text-center container-sm">
      <h5 className="mt-4 mb-5">
        Already have an account? <Link to="/login">Login</Link>
      </h5>
      {/* <h4 className="mb-2 mt-5">Register</h4> */}
      <form onSubmit={handleSubmit} className="row justify-content-center">
        <div className="col-md-6">
          <div className="mb-3">
            <input
            className="form-control text-center"
              id="email"
              value={user.email}
              type="email"
              placeholder="email"
              onChange={handleChange}
              autoComplete="email"
            />
          </div>
          <div className="mb-3">
            <input
            className="form-control text-center"
              id="password"
              value={user.password}
              type="password"
              placeholder="password"
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>
          <div className="mb-3">
            <input
            className="form-control text-center"
              id="first_name"
              value={user.first_name}
              type="text"
              placeholder="first name"
              onChange={handleChange}
              autoComplete="given-name"
            />
          </div>
          <div className="mb-3">
            <input
            className="form-control text-center"
              id="last_name"
              value={user.last_name}
              type="text"
              placeholder="last name"
              onChange={handleChange}
              autoComplete="last-name"
            />
          </div>
        </div>
        <div>
          <button className="btn btn-info btn-sm">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
