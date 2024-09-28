import React, { useState, useRef } from "react";
import axios from "axios";
import "./StudentPortal.css"; // Import CSS file

const StudentPortal = () => {
  const [certificateId, setCertificateId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [internshipDomain, setInternshipDomain] = useState("");
  const canvasRef = useRef(null);

  const generateCertificate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = '/template.jpeg'; // Path to your template image

    img.onload = () => {
      // Set canvas size to match the image size
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0);

      // Set text style
      ctx.font = '30px Arial';  // Font style and size
      ctx.fillStyle = 'black';  // Text color
      ctx.textAlign = 'center';  // Center text alignment

      // Calculate positions based on the canvas size
      const studentNameX = canvas.width / 2; // X-coordinate for student name
      const studentNameY = 510; // Y-coordinate for student name
      const courseNameX = canvas.width / 2; // X-coordinate for course name
      const courseNameY = 697; // Y-coordinate for course name

      // Draw student name
      ctx.fillText(studentName, studentNameX, studentNameY);
      // Draw course name
      ctx.fillText(internshipDomain, courseNameX, courseNameY);
    };

    img.onerror = (error) => {
      console.error('Image failed to load:', error);
    };
  };

  const handleSearch = async () => {
    try {
      const result = await axios.get(`http://localhost:3010/certificate/${certificateId}`);
      const data = result.data.data;
      setStudentName(data.studentName);
      setInternshipDomain(data.internshipDomain);
    } catch (error) {
      console.error('Error fetching certificate data:', error);
    }
  };

  const downloadCertificate = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png'); // Convert canvas to image URL
    link.download = 'certificate.png'; // File name for download
    link.click(); // Trigger download
  };

  return (
    <div className="container">
      <h1>Student Portal</h1>
      <div className="form-group">
        <input
          type="text"
          value={certificateId}
          onChange={(event) => setCertificateId(event.target.value)}
          placeholder="Enter Certificate ID"
        />
        <button onClick={handleSearch} className="btn">Search for Certificate</button>
      </div>
      <div className="certificate-details">
        {studentName && (
          <>
            <h2>Certificate Details</h2>
            <p><strong>Student Name:</strong> {studentName}</p>
            <p><strong>Internship Domain:</strong> {internshipDomain}</p>
            <form onSubmit={(e) => {
                e.preventDefault(); // Prevent form submission
                generateCertificate();
            }}>
              <button type="submit" className="btn">Generate Certificate</button>
            </form>
            <button onClick={downloadCertificate} className="btn">Download Certificate</button>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentPortal;