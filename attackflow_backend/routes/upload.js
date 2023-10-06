const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Check if a file was uploaded
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }


    const filePath = req.file.path;
    fs.readFile(filePath, 'utf8', (err, fileContent) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading file' });
        }


        console.log('File content:', fileContent);


        res.json({ message: 'File uploaded successfully',
        fileContent: fileContent});
    });
});

router.use('/uploadedFiles', express.static(path.join(__dirname, 'uploadedfiles')));

module.exports = router;
