const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const xlsx = require('xlsx');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables
const secretekey = process.env.SECRETEKEY;
// Initialize Express app
const app = express();
const port = process.env.PORT || 3008;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a route for the root URL ("/")
app.get('/', (req, res) => {
  res.send('Welcome to the Certificate API!');
});

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define a schema and model for certificates
const certificateSchema = new mongoose.Schema({
  certificateId: String,
  studentName: String,
  internshipDomain: String,
  startDate: Date,
  endDate: Date
});

const Certificate = mongoose.model('Certificate', certificateSchema);

// API Endpoints
// Upload Excel file
app.post('/admincheck',(req,res)=>{
  const {adminUsername,pass} = req.body;
  if(adminUsername=="Admin"&&pass=="Admin@123"){
    const token = jwt.sign({"user":adminUsername},secretekey)
    console.log(token)
    res.status(200).json({"data":token})
  }
})

app.post('/upload', upload.single('excelFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const workbook = xlsx.readFile(req.file.path);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);

  Certificate.insertMany(data)
    .then(() => res.status(200).json({ message: 'Data successfully uploaded' }))
    .catch(err => res.status(500).json({ message: 'Failed to upload data', error: err }));
});

// Retrieve certificate details by ID
app.get('/certificate/:id', async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ certificateId: req.params.id });
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    res.json({"data":certificate});
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving certificate', error: err });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
