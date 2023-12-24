require('dotenv').config();

const connectToDB =  require('./database');

connectToDB();

// feature/OCR-Recognition

const express = require('express');
var cors = require('cors');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');

const app = express();
const storage = new Storage();
app.use(cors());

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Process the image using the Google Vision API here
    // Use req.file.buffer to get the image buffer
    // const [result] = await client.labelDetection(req.file.buffer);
    
    // // Extract labels from the API response
    // const labels = result.labelAnnotations.map(annotation => annotation.description);

    // res.json({ labels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});