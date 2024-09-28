// src/CertificateGenerator.js
import React, { useState, useRef } from 'react';

const CertificateGenerator = () => {
    const [studentName, setStudentName] = useState('');
    const [courseName, setCourseName] = useState('');
    const canvasRef = useRef(null);

    const generateCertificate = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = '/template.jpeg';  // Path to your template image

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
            const studentNameY = 300; // Y-coordinate for student name
            const courseNameX = canvas.width / 2; // X-coordinate for course name
            const courseNameY = 400; // Y-coordinate for course name

            // Draw student name
            ctx.fillText(studentName, studentNameX, studentNameY);
            // Draw course name
            ctx.fillText(courseName, courseNameX, courseNameY);
        };

        img.onerror = (error) => {
            console.error('Image failed to load:', error);
        };
    };

    const downloadCertificate = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png'); // Convert canvas to image URL
        link.download = 'certificate.png'; // File name for download
        link.click(); // Trigger download
    };

    return (
        <div>
            <h1>Certificate Generator</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault(); // Prevent form submission
                    generateCertificate(); // Generate the certificate
                }}
            >
                <div>
                    <label>
                        Student Name:
                        <input
                            type="text"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Course Name:
                        <input
                            type="text"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Generate Certificate</button>
            </form>
            <button onClick={downloadCertificate}>Download Certificate</button>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
    );
};

export default CertificateGenerator;
