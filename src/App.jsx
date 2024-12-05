import { Routes, Route } from "react-router-dom";
import './App.css';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import VerifyEmail from "./components/VerifyEmail";
// import ProtectedRoute from "./components/ProtectedRoute";
import FourOFour from "./components/FourOFour";
import NavBar from './components/NavBar';
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";


function App() {

  return ( 
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register />} /> 
      {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/dashboard/:id" element={<Dashboard />} />
      <Route path="/verify-email/:token" element={<VerifyEmail />} />
      <Route path="*" element={<FourOFour />} />
    </Routes>
    </>
  )
}

export default App
