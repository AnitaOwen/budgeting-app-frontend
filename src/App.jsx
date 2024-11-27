import { useState } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import './App.css'
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {

  return ( 
    <>
    <Routes>
      <Route path="/login" element={<Login />} /> 
      <Route path="/register" element={<Register />} /> 
      <Route path="/dashboard" element={<Dashboard />} /> 
    </Routes>
    </>
  )
}

export default App
