const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploadedFiles'));
  },
  filename: function (req, file, cb) {
    // Set the filename for the uploaded file (e.g., timestamp + original name)
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Define the route to handle file uploads
router.post('/', upload.single('file'), (req, res) => {
  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({ message: 'File uploaded successfully' });
});

router.use('/uploadedFiles', express.static(path.join(__dirname, 'uploadedfiles')));

module.exports = router;
