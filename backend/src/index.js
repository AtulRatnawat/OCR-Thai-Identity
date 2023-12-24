require('dotenv').config();

const connectToDB =  require('./database');

connectToDB();

// feature/OCR-Recognition

const express = require('express');
var cors = require('cors');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');

const app = express();
const {storage} = new Storage();
app.use(cors());
app.use(express.json());

const { ImageAnnotatorClient } = require('@google-cloud/vision');

const client = new ImageAnnotatorClient();

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

//Model
const Entry = require('../models/entryModel');

const router = express.Router();


//API's

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Process the image using the Google Vision API here
    // Use req.file.buffer to get the image buffer
    const [result] = await client.labelDetection(req.file.buffer);
    
    // Extract labels from the API response
    const labels = result.labelAnnotations.map(annotation => annotation.description);

    res.json({ labels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Errorrrrrrrrrrr' });
  }
});




// --------------------------------------------------------------------------------------------------------

/* Api for fetching Previous Records (History Page) */

// Get all entries
app.get('/api/entries', async (req, res) => {
  try {
    const entries = await Entry.find();
    res.json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new entry
app.post('/api/entries', async (req, res) => {
  const newEntry = new Entry(req.body);
  try {
    const savedEntry = await newEntry.save();
    res.json(savedEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// DELETE endpoint to delete an entry by ID
app.delete('/api/entries/:identificationNumber', async (req, res) => {
  try {
    const identificationNumber = req.params.identificationNumber;
    
    // Assuming 'identificationNumber' is the correct field in your model
    const deletedEntry = await Entry.findOneAndDelete({ identificationNumber });

    if (!deletedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    res.status(200).json({ message: 'Entry deleted successfully', deletedEntry });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/* ---------------------------------------------------------------------------------------------------------*/

// Get the Success OCR Operations
// Get the Success OCR Operations
app.get('/api/successRate', async (req, res) => {
  try {
    const totalEntries = await Entry.countDocuments();
    
    // Assuming isSuccess is stored as a boolean
    const successfulEntries = await Entry.countDocuments({ isSuccess: true });

    // // Assuming isSuccess is stored as a string
    // const successfulEntries = await Entry.countDocuments({ isSuccess: 'true' });

    const failedEntries = totalEntries - successfulEntries;

    // console.log(totalEntries);
    // console.log(successfulEntries);

    const successRate = (successfulEntries / totalEntries) * 100 || 0;

    res.json({
      successfulOperations: successfulEntries,
      failedOperations: failedEntries,
      successRate: successRate.toFixed(2), // Round-Off to two decimal places
    });
  } catch (error) {
    console.error('Error fetching success rate:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Connection Port

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.timeout = 60000; // Set timeout to 60 seconds