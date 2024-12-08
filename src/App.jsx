import { Routes, Route } from "react-router-dom";
import './App.css';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import VerifyEmail from "./components/VerifyEmail";
import FourOFour from "./components/FourOFour";
import NavBar from './components/NavBar';
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {

  return ( 
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register />} /> 
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="*" element={<FourOFour />} />
      </Routes>
      <ToastContainer 
        position="top-right" 
        autoClose={3500} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="light"
      />
    </>
  )
}

export default App
