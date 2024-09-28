// backend/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Route for retrieving certificate by ID
router.get('/certificate/:certificateId', studentController.getCertificateById);

module.exports = router;