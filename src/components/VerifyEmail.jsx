import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
    const { token } = useParams();
    const URL = import.meta.env.VITE_BASE_URL;
    
    const [verificationStatus, setVerificationStatus] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            setError("Verification token is missing.");
            setIsLoading(false);
            return;
        }

        const verifyUser = async () => {
            try {
                // Send the token to the backend to verify the user
                const res = await fetch(`${URL}/api/auth/verify-email/${token}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    throw new Error("Verification failed");
                }

                const data = await res.json();
                setVerificationStatus(data.message);

                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false); 
            }
        };

        verifyUser();
    }, [token, navigate]);

    return (
        <div className="min-vh-100 d-flex align-items-center p-3 bg-info bg-opacity-25">
            <div className="card shadow-sm mx-auto" style={{ width: "100%", maxWidth: "400px" }}>
                <div className="card-body p-3 p-sm-4">
                    <h2 className="text-center mb-4 fs-3">Email Verification</h2>
                    {isLoading && <div className="text-center">Verifying...</div>} 
                    {verificationStatus && !isLoading && (
                        <div className="alert alert-success">
                            {verificationStatus} Redirecting you to the login page...
                        </div>
                    )}
                    {error && !isLoading && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
