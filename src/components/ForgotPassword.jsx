import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = ({setShowForgotPassword}) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState({});
    const URL = import.meta.env.VITE_BASE_URL;

    const handleChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const options = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email}),
        };

        try{
            const res = await fetch(`${URL}/api/auth/forgot-password`, options);
            const data = await res.json();

            if(res.ok) {
                setMessage({ type: "success", text: data.message });
            } else {
                setMessage({ type: "error", text: data.message || "An error occurred." });
            }
        } catch(error) {
            setMessage({ type: "error", text: "Failed to send the request. Please try again later." })
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="card-body p-3 p-sm-4">
            <p className="text-center mb-4 mt-3 fs-4">Request a password reset</p>
            <form onSubmit={handleSubmit}>
                <input 
                    className="form-control form-control-lg mb-3 mt-4"
                    type="email" 
                    value={email}
                    placeholder="Enter your email"
                    onChange={handleChange}
                    autoComplete="email"
                    required
                />
                <button className="btn btn-info btn-lg w-100 mb-4 mt-3" disabled={loading} >
                    {loading ? "Sending Email" : "Submit"}
                </button>
                {message.text && (
                    <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"} mt-3`}>
                        {message.text}
                    </div>
                )}
            </form>

            
            <div className="text-center mt-4">
                Don't have an account? <Link to="/register">Register</Link>
            </div>
            <div className="text-center">
                <button className="btn btn-link p-0 mt-3 mb-2" onClick={() => setShowForgotPassword(false)}>
                Log in to your account
                </button>
            </div>
        </div>
  )
}

export default ForgotPassword;