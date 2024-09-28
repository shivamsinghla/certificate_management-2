// src/App.js
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import StudentPortal from "./StudentPortal";
import CertificateTemplate from "./CertificateTemplate";
import CertificateGenerator from './CertificateGenerator';
import Admin from "./Admin";
import Adminlogin from "./Adminlogin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-auth-init" />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/student" element={<StudentPortal />} />
        <Route path="/certificate/:id" element={<CertificateTemplate />} />
        <Route path="/certificate-generator" element={<CertificateGenerator />} />
        <Route path="/admin-auth-init" element={<Admin/>} />
        <Route path="/admin-auth" element={<Adminlogin/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
