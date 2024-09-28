// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Route for uploading Excel file
router.post('/upload', upload.single('file'), adminController.uploadExcel);

module.exports = router;