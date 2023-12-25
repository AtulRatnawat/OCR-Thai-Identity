require('dotenv').config();

const connectToDB =  require('./src/database');

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

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

//Model
const Entry = require('./models/entryModel');
const ImgData = require('./models/ImgDataModel');
const router = express.Router();



//API's

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    // Process the image using the Google Vision API here
    // Use req.file.buffer to get the image buffer
    const [result] = await client.labelDetection(req.file.buffer);
    
    // Extract labels from the API response
    const labels = result.labelAnnotations.map(annotation => annotation.description);

    res.json({ labels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
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

/*------------------------------------------------------- */

//Save The Image in the database
app.post('/api/saveImage', upload.single('image'), async (req, res) => {
  try {
    // Access the uploaded image data from req.file.buffer
    const base64String = req.file.buffer.toString('base64');
    const binaryData = Buffer.from(base64String, 'base64');

    // Save the binary image data to MongoDB using the model
    const newImgData = new ImgData({ imageData: binaryData });
    const savedImgData = await newImgData.save();

    res.status(201).json(savedImgData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/getImageData/:id', async (req, res) => {
  try {
    const imageId = req.params.id;

    // Find the ImgData document by ID
    const imgData = await ImgData.findOne({ _id: imageId });

    if (!imgData) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Send the image data as a response
    const base64String = imgData.imageData.toString('base64');
    res.status(200).json({ imageData: base64String });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


/*------------------------------------------------------------------------------------------*/


const CREDENTIALS = JSON.parse(JSON.stringify(
  {
    "type": "service_account",
    "project_id": "omega-buckeye-341405",
    "private_key_id": "308da733362a880c98545f2463b8a5cfeaa8f686",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCpTMhol/cEgcpg\nZPIG24kd7wEdHYaRa5qoW/ub4L8bydU1RvxSUvux8ziaq/lMk8RYAtOb0LYx/du4\ntHWFw/Z21d4Nt6SdcPlN4AooRIYGOOHd+LNnvPZOzZjxeoyY6OOftULL88O9TNsD\njERiV01gzmbn+OEsmP00e192KoWpB4vvsoc1WDSFF9ROG8Bc0Oxx/L7CAMYwa2KH\nL3LXzg9TOfGaxV+5c6drFu1+1D2qHnebDOllx0vq+7PGDcdy6TGezjSe5a87mTZ0\ni0ANykNj0QeI6P84i3Xm5O5Kfy1xUEXUYHOwRy2RnUynuvtamQCB7qcz4oFdSH7D\n7SrqeW0DAgMBAAECggEAA8DlDJSZ8GqkPwDd8NL7NkOvRaL68cxt8F+hs3IHKqmN\n5ZF+VKDsXaSj06IOc+kuyDi/0kuNToxvS6gMlvuiQj45nxo8NxVjIZve/cePJSIr\nt80kxR8GYvbh9jCeX2GCcm8FXRo5c7/5dxmsBnYjDAtncqss6t01d+1oT2lf70Bn\nUCvV7eHlsXUMkgYzXZ0hGiSRgm/fXbNBkYnj7EvtT5xoeOr7wkRg48KqK7nHOp1C\nkbX6emyVJU9+BGB61rii5CEeb8f0Bavh6fjzbrjjKkxPYgCcRMmMWdlvk5rA8NTz\nNgyvEp4+4EEMsUEpyouU/Zs6STVz+MnwZB8lmVT1SQKBgQDjqFCDBCPPZ+M/qGCn\nTfF/K6YVbb/2zUOX6y77IfqWeV0P58lgMelAk5Ko4c6yJpvVQpJTLP2b43P8MGgO\njRAhlb5LCz0Kll0cVCl0lPfxKVNRsgx6DO3m3E75y1RfB4RqCwKFKPWFgSpbGdze\neUZvfEX2rSehL7dJEKf49eXnLwKBgQC+YI0qH0OfMYMnwDMDPlspCthlfv/U7KXk\n5b5Q6ohPLRKao2ZLxj00QG0zGh+g8HvoHvICJ1Wn8ZIN8HjuxpQ94qbOG/V+1NJ2\neWFe/4xlDD8LPCuUmtJj+0uHbgTUegZYWdviUYaaDrNC5imwZnRMzfIAnVPzVvym\n+lrqVspibQKBgHYN9VpLjkpipByBs0VvDNmWh/S6yf4w6WlhYyaFs03Ot6yk1O+W\nUk/Tdw0us6H8lXjcocaSIR1ysNXJQFyzV/cikOCXflr8KGKlXi3/hie/9135B7FO\n/RtniWjNwP3ahxb6iJ8G43MMzSsa2Udg+l6bwiguGMvkU5aHFaPr2AGvAoGAeiQ6\nDX9XhEhg7Fz8naUhGZjys1Oi0bouyUe5LfL7F0lEuWACXrVGSULYjMPC7R+9b3SD\nMmyIISL04OqavB89tuK2wF/hxsjGaup/VVLBgYc034FwOHyIZUsx7ybgBG5xqbel\nQnOp1yd9TXub3aguD6TGEizeUq5JlNvk/ppGaJUCgYEAi1zr0NeWlaMp8frjXhyF\nGzkt5nl3hnADoyRB1XPA2VrG6G3BnfbDR8XnH4WAkeqgboJiNACnUV9D9OqbU996\nWXm0/SC65S5mfSKJ+4GPjGSR8OUQK6+Kx/Jj5tZJnVOKHYz4Dkr7spX+eRNi7o03\nVgsiH7u1SwMoEcHhs0zysSg=\n-----END PRIVATE KEY-----\n",
      "client_email": "quala-project@omega-buckeye-341405.iam.gserviceaccount.com",
      "client_id": "102692756936972640090",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/quala-project%40omega-buckeye-341405.iam.gserviceaccount.com",
      "universe_domain": "googleapis.com"
  }
  ))
  const CONFIG = {
    credentials: {
      private_key: CREDENTIALS.private_key,
      client_email: CREDENTIALS.client_email
    }
  }
  
  const { ImageAnnotatorClient } = require('@google-cloud/vision');
  const vision = new ImageAnnotatorClient(CONFIG);
  const client = new ImageAnnotatorClient(CONFIG);
app.post('/api/fetch', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log(req.file);

    const { buffer } = req.file;
    const base64EncodedImage = req.file.buffer.toString('base64');
    
    console.log(buffer);

    const result = await vision.textDetection(base64EncodedImage);

    console.log(result);


    if (!result.fullTextAnnotation) {
      console.log('Text annotation not found in the image');
      return res.status(400).json({ error: 'Text annotation not found in the image' });
    }

    const stringResult = result.fullTextAnnotation.text;
    console.log(stringResult);

    const identificationNumber = searchBefore(stringResult, 'Identification Number');
    const name = searchAfter(stringResult, 'Name');
    const lastName = searchAfter(stringResult, 'Last name');
    const birthDate = searchAfter(stringResult, 'Date of Birth');
    const issueDate = searchBefore(stringResult, 'Date of Issue');
    const expiryDate = searchBefore(stringResult, 'Date of Expiry');

    const idCard = new IdCard({
      identification_number: identificationNumber,
      name: name,
      last_name: lastName,
      date_of_birth: birthDate,
      date_of_issue: issueDate,
      date_of_expiry: expiryDate,
    });

    await idCard.save();
    res.json(idCard);
  } catch (error) {
    console.error('Error processing image details:');
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});






/*-------------------------------------------------------------------------------------------*/

// Connection Port

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.timeout = 60000; // Set timeout to 60 seconds



function searchAfter(stringResult, search_String) {
  let ans = "";
  let index = stringResult.lastIndexOf(search_String);
  index += search_String.length + 1;

  while (stringResult[index] != '\n') {
      ans += stringResult[index];
      index++;
  }
  return ans;
}


function searchBefore(stringResult, searchString) {
  let it = stringResult.lastIndexOf(searchString);
  if(it==-1){
      searchString = "Date of issue";
      return searchBefore(stringResult,searchString);
  }

  it -= 2;   
  let ascii_i = stringResult.charCodeAt(it) ;
  let ascii_i1 = stringResult.charCodeAt(it-1) ;
  // console.log("ascii_i",ascii_i);
  // console.log("ascii_i1",ascii_i1);
  
  let ans = "",reversed="";
  if ((ascii_i >= 48 && ascii_i <= 57)||(ascii_i1 >= 48 && ascii_i1 <= 57) ) {
      while (stringResult[it] != '\n') {
          ans += stringResult[it];
          it--;
      }
      // console.log(ans);
      reversed = ans.split('').reduce((acc, char) => char + acc, '');
  }
  else{
      if(searchString==="Identification Number")
      reversed = searchAfter(stringResult, "Thai National ID Card");
      else{
          reversed = searchAfter(stringResult,searchString);
      }
  }
  return reversed;
}