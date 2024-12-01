import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import userLogInWithVerificationToken from "../helpers/userLoginWithVerificationToken";

const VerifyEmail = () => {
    const [verificationStatus, setVerificationStatus] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 

    const URL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();
    const { token } = useParams();
    

    useEffect(() => {
        console.log("VERIFY EMAIL PARAMS TOKEN", token)
        if (!token) {
            setError("Verification token is missing.");
            setIsLoading(false);
            navigate("/login");
            return;
        }

        const verifyUser = async () => {
            try {
                  const res = await fetch(`${URL}/api/auth/verify-email/token-check`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${token}` 
                    },
                  });

                if (!res.ok) {
                    throw new Error("Verification failed");
                }

                const data = await res.json();
                console.log("user data", data.user);
                console.log("data", data);

                localStorage.setItem("token", data.token);

                setVerificationStatus(data.message);
                navigate(`/dashboard/${data.user.id}`); 
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false); 
            }
        };

        verifyUser();
    }, [token]);

    return (
        <div className="min-vh-100 d-flex align-items-center p-3 bg-info bg-opacity-25">
            <div className="card shadow-sm mx-auto" style={{ width: "100%", maxWidth: "400px" }}>
                <div className="card-body p-3 p-sm-4">
                    <h2 className="text-center mb-4 fs-3">Email Verification</h2>
                    {isLoading && <div className="text-center">Verifying...</div>} 
                    {verificationStatus && !isLoading && (
                        <div className="alert alert-success">
                            {verificationStatus} Redirecting you to your dashboard...
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
