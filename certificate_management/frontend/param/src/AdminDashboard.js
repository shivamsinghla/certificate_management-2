import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "./AdminDashboard.css"; // Import CSS file
import Header from "./Header";

const AdminDashboard = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [logs, setLogs] = useState([]); // Initialize as an empty array

  const handleFileChange = (event) => {
    setExcelFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!excelFile) {
      setUploadStatus("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("excelFile", excelFile);

    try {
      const response = await axios.post("http://localhost:3010/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      // Ensure logs is an array
      const fetchedLogs = Array.isArray(response.data.logs) ? response.data.logs : [];
      setUploadStatus("File uploaded successfully!");
      setLogs(fetchedLogs);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Error uploading file: " + error.message);
    }
  };

  return (
    <>
    
    <div className="container">
      <h1>Admin Dashboard</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Excel File</button>
      <p className="upload-status">{uploadStatus}</p>

      <nav>
        <Link to="/student">Go to Student Portal</Link>
        <br />
        <Link to="/certificate-generator">Generate Certificates</Link>
      </nav>

      {Array.isArray(logs) && logs.length > 0 && (
        <div>
          <h2>Upload Logs</h2>
          <ul>
            {logs.map((log, index) => (
              <li key={index}>{log}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </>
  );
};

export default AdminDashboard;