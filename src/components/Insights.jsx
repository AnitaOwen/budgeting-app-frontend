import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Insights = () => {
    const [insights, setInsights] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const URL = import.meta.env.VITE_BASE_URL;
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const response = await fetch(`${URL}/api/transactions/${id}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error status: ${response.status}`);
                }

                const data = await response.json();
                setInsights(JSON.parse(data));
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchInsights();

    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % insights.length);
        }, 9500); 

        return () => clearInterval(interval); 
    }, [insights.length]);

    return (
        <>
        {insights.length > 0 && (
            <div className="bg-light">
                <h6 className="m-4 p-4" style={{lineHeight: "2rem"}}>{insights[currentIndex]}</h6>
            </div>
        )}
        </>
    );
};

export default Insights;