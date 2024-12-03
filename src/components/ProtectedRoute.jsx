import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login")
  }

  return children;
};

export default ProtectedRoute