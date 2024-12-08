import { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const UpdatePasswordForm = ({id, setShowPasswordForm}) => {
    const URL = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [passwordStrength, setPasswordStrength] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(""); 
    
    const handleTextChange = (event) => {
        setFormData({ ...formData, [event.target.id]: event.target.value});

        if (event.target.id === 'newPassword') {
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
        if (event.target.id === 'confirmPassword') {
            const password = event.target.value;
            if(password === formData.newPassword){
                setPasswordMatch(true);
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!passwordMatch) {
            toast.error("New password and confirm password must match.")
            return;
        }

        setLoading(true); 

        try {
            const response = await fetch(`${URL}/api/auth/update-password/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword,
                }),
            })

            if (!response.ok) {
                throw new Error(`Failed to update password: ${response.status}`);
            }

            const data = await response.json();

            if(data.id){
                setFormData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                })
                setMessage("Password updated successfully!"); 
                
            }  
        } catch (error) {
            toast.error("Incorrect password, Please try again.")
        } finally {
            setLoading(false);
            setShowPasswordForm(false);
        }
    };
    
    return (
        <div className="container d-flex justify-content-center mb-5">
            <form
                className="card p-4 shadow-sm"
                style={{ maxWidth: "500px", width: "100%" }}
                onSubmit={handleSubmit}
            >
                <h3 className="text-center mb-4">Update Password</h3>
                <div className="mb-3">
                <label htmlFor="currentPassword" className="form-label">
                    Current Password
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleTextChange}
                    required
                />
                </div>
                <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                    New Password
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleTextChange}
                    required
                />
                {passwordStrength.text && (
                    <div className={`${passwordStrength.color} fs-6`}>
                        Password strength: {passwordStrength.text}
                    </div>
                )}
                </div>
                <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                    Confirm New Password
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleTextChange}
                    required
                />
                {formData.confirmPassword && (
                    <div className={`${passwordMatch ? "text-success" : "text-danger"} fs-6 mt-2`}>
                        {passwordMatch ? "Passwords match" : "Passwords do not match"}
                    </div>
                )}
                </div>

                {message && (
                    <div className="alert alert-success mt-3">{message}</div> 
                )}

                <button type="submit" className="btn btn-info" disabled={loading}>
                    {loading ? "Updating..." : "Submit"} 
                </button>

                {loading && <div className="text-center mt-3">Please wait...</div>} 
                
            </form>
        </div>
    )
}

export default UpdatePasswordForm