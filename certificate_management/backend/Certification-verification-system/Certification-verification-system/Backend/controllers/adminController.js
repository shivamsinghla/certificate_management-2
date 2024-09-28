// backend/controllers/adminController.js
const XLSX = require('xlsx');
const Certificate = require('../models/certificate');
const path = require('path');
const fs = require('fs');

exports.uploadExcel = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    for (const row of data) {
      const { certificateId, studentName, internshipDomain, startDate, endDate } = row;
      const certificate = new Certificate({ certificateId, studentName, internshipDomain, startDate, endDate });
      await certificate.save();
    }

    fs.unlinkSync(filePath); // Remove the file after processing
    res.status(200).json({ message: 'File processed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error processing file' });
  }
};