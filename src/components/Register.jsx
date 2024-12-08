import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token")
  const navigate = useNavigate();

  const [user, setUser] = useState({ email: "", password: "", first_name: "", last_name: ""});
  const [passwordStrength, setPasswordStrength] = useState("");

  function handleChange(event) {
    setUser({ ...user, [event.target.id]: event.target.value });

    if (event.target.id === 'password') {
      const password = event.target.value;
      let strength = "";
      let color = "";
      
      if (password.length >= 8 && 
          /[A-Z]/.test(password) && 
          /[a-z]/.test(password) && 
          /\d/.test(password) && 
          /[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        strength = "Strong";
        color = "text-success";
      } else if (password.length >= 6) {
        strength = "Medium";
        color = "text-warning";
      } else if (password.length > 0) {
        strength = "Weak";
        color = "text-danger";
      }
      
      setPasswordStrength({ text: strength, color });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    try {
      const res = await fetch(`${URL}/api/auth/register`, options);

      const data = await res.json();

      if (data.message) {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("There is already an account with this email");
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
            <div className="mb-3">
              <input
                className="form-control form-control-lg mb-1"
                id="password"
                value={user.password}
                type="password"
                placeholder="Password (8+ characters)"
                onChange={handleChange}
                required
              />
              {passwordStrength.text && (
                <div className={`${passwordStrength.color} fs-6`}>
                  Password strength: {passwordStrength.text}
                </div>
              )}
            </div>
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
