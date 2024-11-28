import { useState } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import './App.css'
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import NavBar from './components/NavBar';

function App() {

  return ( 
    <>
    <NavBar />
    <Routes>
      <Route path="/login" element={<Login />} /> 
      <Route path="/register" element={<Register />} /> 
      <Route path="/dashboard" element={<Dashboard />} /> 
      {/* <Route path="*" element={<FourOFour />} /> */}
    </Routes>
    </>
  )
}

export default App
