import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import userLogInPostFetch from "../helpers/userLogInPostFetch";
import InputEmail from "./InputEmail";
import { toast } from "react-toastify";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "", otp: ""});
  const [mfaRequired, setMfaRequired] = useState(false);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (event) => {
    setUser({ ...user, [event.target.id]: event.target.value });
  }

  const handleLoginResponse = async (data) => {
    try {
      if (data) {
        if (data.message === "OTP sent to your email. Please check your inbox.") {
          setMfaRequired(true);
          setMessage(data.message);
        } 
        if (data.message === "Invalid or expired OTP.") {
          setErrorMessage("Invalid or expired OTP.");
          throw new Error("Invalid or expired OTP. Please Try Again.");
        }
        if (data.message === "Invalid credentials") {
          setErrorMessage("Incorrect username or password.");
          throw new Error("Invalid credentials");
        }
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.user.id); 
          toast.success("Logged in successfully!")
          navigate(`/dashboard/${data.user.id}`);
        }
      }
    } catch (error) {
      setErrorMessage(error.message); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setErrorMessage(null)

    try {
      const data = await userLogInPostFetch(user);
      await handleLoginResponse(data);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setErrorMessage(null)

    try {
      const data = await userLogInPostFetch({ ...user, otp: user.otp });
      await handleLoginResponse(data);

    } catch (error) {
      setErrorMessage("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignIn = async (event)  => {
    event.preventDefault()
    const URL = import.meta.env.VITE_BASE_URL;
  
    const options = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        }
    };
  
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch(`${URL}/api/auth/login/demo-user`, options);
      const data = await response.json();
  
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id)
        toast.success("Logged in successfully!")
        navigate(`/dashboard/${data.user.id}`);
      } else {
        setErrorMessage("Demo login failed.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <div className="min-vh-100 d-flex align-items-center p-3 bg-info bg-opacity-25">
      <div className="card shadow-sm mx-auto" style={{ width: "100%", maxWidth: "400px" }}>
        {showForgotPassword ? <InputEmail setShowForgotPassword={setShowForgotPassword}/> : 
        <div className="card-body p-3 p-sm-4">
          <h2 className="text-center mb-4 fs-3">Login</h2>
          <div className="text-center mb-4">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
          <div className="text-center mb-4">
            <button className="btn btn-link p-0 mt-2" onClick={handleDemoSignIn}>
              Try Demo User
            </button>
          </div>

          {errorMessage && (
            <div className="alert alert-danger text-center" role="alert">
              {errorMessage}
            </div>
          )}
          {message && (
            <div className="alert alert-success text-center" role="alert">
              {message}
            </div>
          )}

          <form onSubmit={mfaRequired ? handleOtpSubmit : handleSubmit}>
            {!mfaRequired ? (
              <>
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
                <button className="btn btn-info btn-lg w-100" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>
              </>
            ) : (
              <>
                <input
                  className="form-control form-control-lg mb-3"
                  id="otp"
                  value={user.otp}
                  type="text"
                  placeholder="Enter OTP"
                  onChange={handleChange}
                  required
                />
                <button className="btn btn-info btn-lg w-100" disabled={loading}>
                  {loading ? "Verifying..." : "Submit"}
                </button>
              </>
            )}
          </form>
          <div className="text-center">
            <button className="btn btn-link p-0 mt-4" onClick={() => setShowForgotPassword(true)}>
              Forgot Password?
            </button>
          </div>
        </div>
        }
      </div>
    </div>
  );
};

export default Login;