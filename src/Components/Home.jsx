import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';

const App = () => {
  const [image, setImage] = useState(null);
  const [labels, setLabels] = useState([]);

  const handleDrop = async acceptedFiles => {
    const formData = new FormData();
    formData.append('image', acceptedFiles[0]);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setLabels(response.data.labels);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={{ border: '1px solid black', padding: '20px' }}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop an image here, or click to select one</p>
          </div>
        )}
      </Dropzone>

      {image && (
        <div>
          <h2>Image Preview:</h2>
          <img src={image.preview} alt="Uploaded" style={{ width: '100%' }} />
        </div>
      )}

      {labels.length > 0 && (
        <div>
          <h2>Labels:</h2>
          <ul>
            {labels.map((label, index) => (
              <li key={index}>{label}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
