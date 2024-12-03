import { Routes, Route, useNavigate } from "react-router-dom";
import './App.css'
import Login from './components/login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import VerifyEmail from "./components/VerifyEmail";
import ProtectedRoute from "./components/ProtectedRoute";
import FourOFour from "./components/FourOFour";
import NavBar from './components/NavBar';

function App() {

  return ( 
    <>
    <NavBar />
    <Routes>
      <Route path="/login" element={<Login />} /> 
      <Route path="/register" element={<Register />} /> 
      {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/dashboard/:id" element={<Dashboard />} />
      {/* </Route> */}
      <Route path="/verify-email/:token" element={<VerifyEmail />} />
      <Route path="*" element={<FourOFour />} />
    </Routes>
    </>
  )
}

export default App
